/**
 * The copilot's server side. The browser never talks to Claude directly, so the
 * API key stays here.
 *
 *   GET  /api/copilot/status       -> whether setup has been run
 *   POST /api/copilot/chat         -> one question in, a stream of answer events out
 *   POST /api/copilot/tool-result  -> the browser's answer to a request for the person's own data
 *   POST /api/copilot/feedback     -> thumbs up or down on an answer
 *
 * Each copilot conversation is one Managed Agents session. Anthropic runs the
 * agent and its sandbox; this server sends the person's message into the
 * session and relays what the agent does back to the browser.
 *
 * Two kinds of tool call come back to this server instead of running in the
 * sandbox (see CLIENT_TOOLS in tools.ts):
 *   - "read my timeline / notifications": only the browser holds the person's
 *     Bluesky sign-in, so the server asks the browser to fetch the data.
 *   - "draft a post / propose a list": the server shows the draft to the person
 *     as a card. Nothing is published unless they press the button.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { isComplete, readConfig } from "./config.js";
import { PROPOSAL_TOOLS, READ_TOOLS, checkProposal } from "./tools.js";
import { Trace, recordFeedback } from "./trace.js";

const PORT = Number(process.env.PORT ?? 8787);
const MAX_MESSAGE_CHARS = 4000;
const MAX_CONTEXT_CHARS = 2000;
const MAX_TOOL_RESULT_CHARS = 40_000;
/** How long to wait for the browser to return the person's own data. */
const CLIENT_TOOL_TIMEOUT_MS = 25_000;
/** Most a single conversation may cost at list prices, in US cents. 0 turns the cap off. */
const BUDGET_CENTS = Number(process.env.COPILOT_BUDGET_CENTS ?? 150);
/** Questions one network address may ask per window. */
const RATE_LIMIT = Number(process.env.COPILOT_RATE_LIMIT ?? 20);
const RATE_WINDOW_MS = 10 * 60_000;

const app = express();
app.use(express.json({ limit: "256kb" }));

let client: Anthropic | undefined;
function getClient(): Anthropic {
  client ??= new Anthropic();
  return client;
}

/**
 * Sessions this server process created. A browser may only continue a session
 * listed here, so a made-up or stale ID starts a fresh conversation instead of
 * reaching into someone else's.
 */
const knownSessions = new Map<string, { turns: number }>();
/** Sessions with an answer in progress; a second question must wait its turn. */
const busySessions = new Set<string>();
/** Requests for the person's own data that are waiting on the browser. */
const pendingClientTools = new Map<string, (result: { ok: boolean; text: string }) => void>();

const recentQuestions = new Map<string, number[]>();
function overRateLimit(address: string): boolean {
  const now = Date.now();
  const times = (recentQuestions.get(address) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (times.length >= RATE_LIMIT) {
    recentQuestions.set(address, times);
    return true;
  }
  times.push(now);
  recentQuestions.set(address, times);
  return false;
}

app.get("/api/copilot/status", (_req, res) => {
  res.json({ configured: isComplete(readConfig()) });
});

/** What the browser receives, one JSON object per server-sent event. */
type CopilotEvent =
  | { type: "session"; sessionId: string; turn: number; fresh: boolean }
  | { type: "activity"; label: string }
  | { type: "delta"; id: string; text: string }
  | { type: "message"; id: string; text: string }
  | { type: "client_tool"; toolUseId: string; name: string; input: Record<string, unknown> }
  | { type: "proposal"; kind: string; input: Record<string, unknown> }
  | { type: "error"; message: string }
  | { type: "done" };

/** Describe a tool call in words a person browsing Bluesky would recognize. */
function activityLabel(name: string, input: Record<string, unknown>): string {
  if (name === "bash") {
    const command = String(input.command ?? "");
    const match = command.match(/bsky\.py\s+([a-z-]+)(?:\s+(.*))?/);
    if (match) {
      const arg = (match[2] ?? "").split(/\s+--|\s*[|;&]/)[0].replace(/^["']+|["']+$/g, "").slice(0, 60);
      const labels: Record<string, string> = {
        profile: "Looking up the profile of",
        posts: "Reading recent posts from",
        "search-posts": "Searching posts for",
        "search-users": "Searching accounts for",
        post: "Reading the post",
        thread: "Reading the thread",
        "quote-chain": "Following the quote posts back",
        followers: "Listing followers of",
        follows: "Listing accounts followed by",
        likes: "Checking who liked the post",
        reposts: "Checking who reposted the post",
        quotes: "Reading quotes of the post",
        relationship: "Checking who follows whom:",
        feed: "Reading the feed",
        "search-feeds": "Searching feeds for",
        "user-feeds": "Listing feeds made by",
        "user-lists": "Listing lists made by",
        list: "Reading the list",
        trending: "Checking what is trending",
        media: "Looking at the pictures in",
        "read-link": "Reading the linked page",
        "search-starter-packs": "Searching starter packs for",
        "starter-pack": "Reading the starter pack",
        resolve: "Resolving the identity of",
        raw: "Calling the Bluesky API:",
      };
      const label = labels[match[1]];
      const bare = ["post", "thread", "quote-chain", "feed", "list", "trending", "likes", "reposts", "quotes", "read-link", "starter-pack"];
      if (label) return bare.includes(match[1]) ? label : `${label} ${arg.replace(/^https:\/\/bsky\.app\/profile\/([^/]+).*/, "@$1")}`.trim();
    }
    return "Running a lookup";
  }
  if (name === "read") return /\.(jpe?g|png|webp|gif)$/i.test(String(input.file_path ?? input.path ?? "")) ? "Looking at a picture" : "Checking the Bluesky reference notes";
  if (name === "glob" || name === "grep") return "Checking the Bluesky reference notes";
  if (name === "web_search") return `Searching the web for ${String(input.query ?? "").slice(0, 60)}`.trim();
  if (name === "web_fetch") return "Reading a web page";
  if (name === "read_my_timeline") return "Reading your Following timeline";
  if (name === "read_my_notifications") return "Reading your notifications";
  if (name === "draft_post") return "Drafting a post for you to review";
  if (name === "propose_list") return "Putting together a list for you to review";
  return "Working";
}

app.post("/api/copilot/chat", async (req, res) => {
  const config = readConfig();
  if (!isComplete(config)) {
    res.status(503).json({ error: "The copilot is not set up yet. Run `npm run setup` in the app folder, then restart the server." });
    return;
  }
  if (overRateLimit(req.ip ?? "unknown")) {
    res.status(429).json({ error: "You've asked a lot of questions in a short time. Give it a few minutes and try again." });
    return;
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_CHARS) {
    res.status(400).json({ error: `Send a message of 1 to ${MAX_MESSAGE_CHARS} characters.` });
    return;
  }
  const context = typeof req.body?.context === "string" ? req.body.context.slice(0, MAX_CONTEXT_CHARS) : "";
  const requested = typeof req.body?.sessionId === "string" ? req.body.sessionId : "";

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  const emit = (event: CopilotEvent) => res.write(`data: ${JSON.stringify(event)}\n\n`);

  const anthropic = getClient();
  const trace = new Trace(message, context);
  let sessionId = "";
  let finished = false;
  let stream: Awaited<ReturnType<typeof anthropic.beta.sessions.events.stream>> | undefined;
  const answerParts = new Map<string, string>();

  // If the person closes the panel or navigates away mid-answer, stop reading
  // and tell the agent to stop working, so it does not keep spending tokens.
  res.on("close", () => {
    if (finished) return;
    finished = true;
    trace.outcome = "cancelled";
    stream?.controller.abort();
    if (sessionId) {
      busySessions.delete(sessionId);
      anthropic.beta.sessions.events.send(sessionId, { events: [{ type: "user.interrupt" }] }).catch(() => {});
    }
  });

  const answerTool = (toolUseId: string, text: string) =>
    anthropic.beta.sessions.events.send(sessionId, {
      events: [{ type: "user.custom_tool_result", custom_tool_use_id: toolUseId, content: [{ type: "text", text }] }],
    });

  try {
    if (requested && knownSessions.has(requested)) {
      sessionId = requested;
    } else {
      const session = await anthropic.beta.sessions.create({
        agent: { type: "agent", id: config.agentId, version: config.agentVersion },
        environment_id: config.environmentId,
        title: "Cirrus copilot conversation",
        // A hard ceiling on what one conversation can cost, enforced by Anthropic.
        ...(BUDGET_CENTS > 0 ? { budget: { type: "limit" as const, max_list_cost: { amount: String(BUDGET_CENTS), currency: "USD" } } } : {}),
      });
      sessionId = session.id;
      knownSessions.set(sessionId, { turns: 0 });
    }
    if (busySessions.has(sessionId)) {
      emit({ type: "error", message: "The copilot is still answering your last question." });
      return;
    }
    busySessions.add(sessionId);
    const turn = ++knownSessions.get(sessionId)!.turns;
    trace.sessionId = sessionId;
    trace.turn = turn;
    emit({ type: "session", sessionId, turn, fresh: sessionId !== requested });

    // The context block is app-written and marked as such, so the agent can
    // tell it apart from what the person typed.
    const text = context ? `<app_context>\n${context}\n</app_context>\n\n${message}` : message;

    // Open the stream before sending, so no early event is missed.
    stream = await anthropic.beta.sessions.events.stream(sessionId, { event_deltas: ["agent.message"] });
    await anthropic.beta.sessions.events.send(sessionId, {
      events: [{ type: "user.message", content: [{ type: "text", text }] }],
    });

    for await (const event of stream) {
      if (finished) break;
      switch (event.type) {
        case "event_delta":
          if (event.delta.type === "content_delta" && event.delta.content.type === "text") {
            trace.markFirstText();
            emit({ type: "delta", id: event.event_id, text: event.delta.content.text });
          }
          break;

        case "agent.message": {
          // The complete message replaces whatever the deltas previewed.
          const full = event.content.map((block) => (block.type === "text" ? block.text : "")).join("");
          if (full) {
            trace.markFirstText();
            answerParts.set(event.id, full);
            emit({ type: "message", id: event.id, text: full });
          }
          break;
        }

        case "agent.tool_use":
          trace.step(event.name, event.input);
          if (event.evaluated_permission === "ask") {
            // Every enabled tool is pre-approved, so a pause here is unexpected.
            // Nobody is watching to approve it, so refuse.
            await anthropic.beta.sessions.events.send(sessionId, {
              events: [{ type: "user.tool_confirmation", tool_use_id: event.id, result: "deny" }],
            });
          } else {
            emit({ type: "activity", label: activityLabel(event.name, event.input) });
          }
          break;

        case "agent.custom_tool_use": {
          trace.step(event.name, event.input);
          emit({ type: "activity", label: activityLabel(event.name, event.input) });
          if (PROPOSAL_TOOLS.has(event.name)) {
            const problem = checkProposal(event.name, event.input);
            if (problem) {
              await answerTool(event.id, `Not shown: ${problem}`);
            } else {
              emit({ type: "proposal", kind: event.name, input: event.input });
              await answerTool(event.id, "Shown to the person as a card with a button. Nothing has been published. They decide whether to go ahead, and you will not be told what they chose. Tell them in one short sentence that the draft is ready to review.");
            }
          } else if (READ_TOOLS.has(event.name)) {
            const key = `${sessionId}:${event.id}`;
            const result = await new Promise<{ ok: boolean; text: string }>((resolve) => {
              const timer = setTimeout(() => {
                pendingClientTools.delete(key);
                resolve({ ok: false, text: "The app did not answer in time. Tell the person you could not read it and suggest they try again." });
              }, CLIENT_TOOL_TIMEOUT_MS);
              pendingClientTools.set(key, (value) => {
                clearTimeout(timer);
                pendingClientTools.delete(key);
                resolve(value);
              });
              emit({ type: "client_tool", toolUseId: event.id, name: event.name, input: event.input });
            });
            await answerTool(event.id, result.text.slice(0, MAX_TOOL_RESULT_CHARS));
          } else {
            await answerTool(event.id, `There is no tool named ${event.name}.`);
          }
          break;
        }

        case "span.model_request_end":
          trace.addUsage(event.model_usage);
          break;

        case "session.error":
          console.error("session.error", sessionId, event.error);
          trace.errors.push(JSON.stringify(event.error).slice(0, 500));
          break;

        case "session.status_idle": {
          const reason = event.stop_reason.type;
          if (reason === "requires_action") break; // waiting on us; handled above
          trace.outcome = reason;
          if (reason === "refusal") {
            emit({ type: "error", message: "I can't help with that one. Try asking in a different way." });
          } else if (reason === "budget_reached") {
            knownSessions.delete(sessionId);
            emit({ type: "error", message: "This conversation has reached its limit. Start a new chat to keep going." });
          } else if (reason !== "end_turn") {
            emit({ type: "error", message: "I stopped before finishing. Please ask again." });
          }
          finished = true;
          break;
        }

        case "session.status_terminated":
          knownSessions.delete(sessionId);
          trace.outcome = "terminated";
          emit({ type: "error", message: "This conversation ended unexpectedly. Your next question will start a new one." });
          finished = true;
          break;
      }
      if (finished) break;
    }
  } catch (err) {
    if (!finished) {
      console.error("copilot chat failed:", err);
      trace.outcome = "server_error";
      trace.errors.push(err instanceof Error ? err.message : String(err));
      let text = "Something went wrong on my side. Please try again.";
      if (err instanceof Anthropic.AuthenticationError) text = "The server's Claude API key was rejected. Check ANTHROPIC_API_KEY and restart the server.";
      else if (err instanceof Anthropic.NotFoundError) text = "The copilot's agent was not found. Run `npm run setup` again.";
      else if (err instanceof Anthropic.RateLimitError) text = "I'm being rate limited right now. Wait a moment and ask again.";
      else if (err instanceof Anthropic.APIConnectionError) text = "The server could not reach Claude. Check its network connection.";
      emit({ type: "error", message: text });
    }
  } finally {
    const wasOpen = !res.writableEnded;
    finished = true;
    if (sessionId) busySessions.delete(sessionId);
    stream?.controller.abort();
    trace.answer = [...answerParts.values()].join("\n\n");
    trace.save();
    if (wasOpen) {
      emit({ type: "done" });
      res.end();
    }
  }
});

app.post("/api/copilot/tool-result", (req, res) => {
  const { sessionId, toolUseId, ok, text } = req.body ?? {};
  const resolve = pendingClientTools.get(`${sessionId}:${toolUseId}`);
  if (!resolve || typeof text !== "string") {
    res.status(404).json({ error: "No such request is waiting." });
    return;
  }
  resolve({ ok: Boolean(ok), text });
  res.json({ ok: true });
});

app.post("/api/copilot/feedback", (req, res) => {
  const { sessionId, turn, rating, note } = req.body ?? {};
  if (!knownSessions.has(sessionId) || !["up", "down"].includes(rating)) {
    res.status(400).json({ error: "Unknown conversation or rating." });
    return;
  }
  recordFeedback({ sessionId, turn: Number(turn) || 0, rating, note: typeof note === "string" ? note.slice(0, 1000) : "" });
  res.json({ ok: true });
});

// In production the same server also serves the built web app.
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => {
  const ready = isComplete(readConfig());
  console.log(`Copilot server listening on http://localhost:${PORT}` + (ready ? "" : "  (copilot not set up: run `npm run setup`)"));
});

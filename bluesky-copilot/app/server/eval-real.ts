/**
 * Run the eval's test cases through the real copilot agent.
 *
 *   npm run eval:real -- r-real            all cases, written to prompt-tests/v2/runs/r-real/
 *   npm run eval:real -- r-real case-id…   only the named cases
 *
 * The rounds recorded so far used stand-in agents (Claude Code subagents told
 * to follow the copilot's instructions). This script asks the actual agent
 * created by `npm run setup`, so its results show what a person would really
 * get: whether the agent loads the skill unprompted, how long it takes, and
 * what it costs. It writes the same report format as the stand-ins, so the
 * same graders and report page work on it, plus a metrics.json with timings
 * and token counts per case.
 *
 * Each case is one new session with a spend cap. It needs ANTHROPIC_API_KEY.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { isComplete, readConfig } from "./config.js";
import { PROPOSAL_TOOLS } from "./tools.js";

const V2 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../prompt-tests/v2");
const CONCURRENCY = 4;
const BUDGET_CENTS = "150";

interface Case {
  id: string;
  message: string;
}

function loadCases(): Case[] {
  return fs
    .readdirSync(V2)
    .filter((name) => /^cases-.*\.json$/.test(name))
    .sort()
    .flatMap((name) => JSON.parse(fs.readFileSync(path.join(V2, name), "utf8")) as Case[]);
}

async function runCase(client: Anthropic, config: { agentId: string; agentVersion: number; environmentId: string }, testCase: Case) {
  const started = Date.now();
  let firstTextMs: number | null = null;
  const steps: string[] = [];
  const answers = new Map<string, string>();
  const usage = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, modelRequests: 0 };
  let outcome = "unknown";

  const session = await client.beta.sessions.create({
    agent: { type: "agent", id: config.agentId, version: config.agentVersion },
    environment_id: config.environmentId,
    title: `eval: ${testCase.id}`,
    budget: { type: "limit", max_list_cost: { amount: BUDGET_CENTS, currency: "USD" } },
  });
  const stream = await client.beta.sessions.events.stream(session.id);
  await client.beta.sessions.events.send(session.id, {
    events: [{ type: "user.message", content: [{ type: "text", text: testCase.message }] }],
  });

  loop: for await (const event of stream) {
    const at = `${((Date.now() - started) / 1000).toFixed(1)}s`;
    switch (event.type) {
      case "agent.message":
        firstTextMs ??= Date.now() - started;
        answers.set(event.id, event.content.map((block) => (block.type === "text" ? block.text : "")).join(""));
        break;
      case "agent.tool_use":
        steps.push(`${at} ${event.name} ${JSON.stringify(event.input).slice(0, 300)}`);
        if (event.evaluated_permission === "ask") {
          await client.beta.sessions.events.send(session.id, { events: [{ type: "user.tool_confirmation", tool_use_id: event.id, result: "deny" }] });
        }
        break;
      case "agent.custom_tool_use": {
        steps.push(`${at} ${event.name} ${JSON.stringify(event.input).slice(0, 600)}`);
        // No browser is attached in an eval run, so the person's own data is unavailable.
        const text = PROPOSAL_TOOLS.has(event.name)
          ? "Shown to the person as a card with a button. Nothing has been published."
          : "This is a test run with no browser attached, so the person's own data cannot be read. Tell them you could not read it.";
        await client.beta.sessions.events.send(session.id, {
          events: [{ type: "user.custom_tool_result", custom_tool_use_id: event.id, content: [{ type: "text", text }] }],
        });
        break;
      }
      case "span.model_request_end":
        usage.input += event.model_usage.input_tokens ?? 0;
        usage.output += event.model_usage.output_tokens ?? 0;
        usage.cacheRead += event.model_usage.cache_read_input_tokens ?? 0;
        usage.cacheWrite += event.model_usage.cache_creation_input_tokens ?? 0;
        usage.modelRequests += 1;
        break;
      case "session.status_idle":
        if (event.stop_reason.type === "requires_action") break;
        outcome = event.stop_reason.type;
        break loop;
      case "session.status_terminated":
        outcome = "terminated";
        break loop;
    }
  }
  stream.controller.abort();

  const answer = [...answers.values()].filter(Boolean).join("\n\n");
  return { id: testCase.id, sessionId: session.id, outcome, answer, steps, usage, firstTextMs, totalMs: Date.now() - started };
}

async function main() {
  const [round = "r-real", ...only] = process.argv.slice(2);
  const config = readConfig();
  if (!isComplete(config)) throw new Error("Run `npm run setup` first.");
  const client = new Anthropic();
  const cases = loadCases().filter((c) => !only.length || only.includes(c.id));
  const outDir = path.join(V2, "runs", round);
  fs.mkdirSync(outDir, { recursive: true });
  const metrics: unknown[] = [];

  const queue = [...cases];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      for (let next = queue.shift(); next; next = queue.shift()) {
        try {
          const result = await runCase(client, config, next);
          fs.writeFileSync(
            path.join(outDir, `${result.id}.md`),
            `## ANSWER\n${result.answer || `(no answer; the turn ended with: ${result.outcome})`}\n\n## STEPS\n${result.steps.join("\n") || "(no tool calls)"}\n\n` +
              `## EVIDENCE\n(not collected: this run used the real agent, which reports only its answer)\n\n` +
              `## FRICTION\n(not collected) Outcome: ${result.outcome}. First text after ${result.firstTextMs ?? "n/a"} ms, finished after ${result.totalMs} ms. ` +
              `Tokens: ${result.usage.input} in, ${result.usage.output} out, ${result.usage.cacheRead} read from cache, over ${result.usage.modelRequests} model requests.\n`,
          );
          metrics.push({ ...result, answer: undefined, steps: result.steps.length });
          console.log(`${result.id}: ${result.outcome}, ${(result.totalMs / 1000).toFixed(0)}s, ${result.steps.length} tool calls`);
        } catch (err) {
          console.error(`${next.id}: failed:`, err instanceof Error ? err.message : err);
          metrics.push({ id: next.id, outcome: "error", error: err instanceof Error ? err.message : String(err) });
        }
      }
    }),
  );
  fs.writeFileSync(path.join(outDir, "metrics.json"), JSON.stringify(metrics, null, 2) + "\n");
  console.log(`\nWrote ${cases.length} reports to ${outDir}. Grade them with the judge brief, then run build-report.py ${round}.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

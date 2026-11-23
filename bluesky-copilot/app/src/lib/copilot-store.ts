/**
 * State for the copilot panel: the conversation, whether an answer is being
 * written, and what the app knows about the screen the person is looking at.
 */
import { useSyncExternalStore } from "react";
import { getSession, postPath, type PostView } from "./atproto";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  /** Short label shown above a question that was asked about a specific post. */
  about?: string;
  error?: boolean;
}

/** What a screen tells the copilot about itself. */
export interface ScreenContext {
  /** One or two sentences for the agent, including the bsky.app link of what is shown. */
  description: string;
  /** Questions that make sense on this screen, offered as one-tap buttons. */
  suggestions: string[];
}

interface CopilotState {
  open: boolean;
  configured: boolean | null;
  messages: ChatMessage[];
  busy: boolean;
  /** What the agent is doing right now, such as "Reading the thread". */
  activity: string;
  /** A post the next question is about, set by a post's "ask the copilot" button. */
  attached: PostView | null;
  screen: ScreenContext;
}

const DEFAULT_SCREEN: ScreenContext = {
  description: "Screen: the app's home page.",
  suggestions: ["What's trending on Bluesky right now?", "How do custom feeds work?", "How do I use my own domain as my handle?"],
};

let state: CopilotState = {
  // On a wide screen the panel has its own column, so start with it showing.
  open: typeof window !== "undefined" && window.innerWidth > 1260,
  configured: null,
  messages: [],
  busy: false,
  activity: "",
  attached: null,
  screen: DEFAULT_SCREEN,
};
const listeners = new Set<() => void>();
let sessionId = "";
let abort: AbortController | null = null;
let counter = 0;

function set(next: Partial<CopilotState>) {
  state = { ...state, ...next };
  listeners.forEach((fn) => fn());
}

export function useCopilot(): CopilotState {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => state,
  );
}

export const setCopilotOpen = (open: boolean) => set({ open });
export const setScreenContext = (screen: ScreenContext | null) => set({ screen: screen ?? DEFAULT_SCREEN });
export const detachPost = () => set({ attached: null });
export const askCopilotAbout = (post: PostView) => set({ open: true, attached: post });

export function newConversation() {
  abort?.abort();
  sessionId = "";
  set({ messages: [], busy: false, activity: "", attached: null });
}

export function stopAnswer() {
  abort?.abort();
}

export async function checkCopilot() {
  try {
    const response = await fetch("/api/copilot/status");
    set({ configured: response.ok ? Boolean((await response.json()).configured) : false });
  } catch {
    set({ configured: false });
  }
}

function postUrl(post: PostView): string {
  return `https://bsky.app${postPath(post)}`;
}

/** Build the note that tells the agent who is signed in and what is on screen. */
function buildContext(attached: PostView | null): string {
  const session = getSession();
  const lines = [
    session ? `Signed in as @${session.handle} (https://bsky.app/profile/${session.handle}).` : "Not signed in.",
    state.screen.description,
    `Current time: ${new Date().toISOString()} (the person's time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}).`,
  ];
  if (attached) lines.push(`The person tapped "ask the copilot" on this post, so their question is about it: ${postUrl(attached)} by @${attached.author.handle}.`);
  return lines.join("\n");
}

function patchMessage(id: string, patch: Partial<ChatMessage>) {
  set({ messages: state.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)) });
}

export async function ask(question: string) {
  question = question.trim();
  if (!question || state.busy) return;

  const attached = state.attached;
  const answerId = `a${++counter}`;
  set({
    busy: true,
    activity: "Thinking",
    attached: null,
    messages: [
      ...state.messages,
      { id: `u${++counter}`, role: "user", text: question, about: attached ? `About a post by @${attached.author.handle}` : undefined },
      { id: answerId, role: "assistant", text: "" },
    ],
  });

  // The agent may write several messages in one turn, for example a line before
  // a lookup and the answer after it. Keep each by its ID and show them in order.
  const parts = new Map<string, string>();
  const render = () => patchMessage(answerId, { text: [...parts.values()].filter(Boolean).join("\n\n") });
  const fail = (message: string) => {
    const soFar = [...parts.values()].filter(Boolean).join("\n\n");
    patchMessage(answerId, { text: soFar ? `${soFar}\n\n${message}` : message, error: true });
  };

  abort = new AbortController();
  try {
    const response = await fetch("/api/copilot/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message: question, context: buildContext(attached) }),
      signal: abort.signal,
    });
    if (!response.ok || !response.body) {
      const body = await response.json().catch(() => ({}));
      fail(body.error ?? "The copilot is unavailable right now.");
      if (response.status === 503) set({ configured: false });
      return;
    }

    // The server answers with server-sent events: "data: {json}" blocks
    // separated by blank lines.
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += value;
      let end: number;
      while ((end = buffer.indexOf("\n\n")) >= 0) {
        const block = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
        const line = block.split("\n").find((l) => l.startsWith("data: "));
        if (!line) continue;
        const event = JSON.parse(line.slice(6));
        if (event.type === "session") sessionId = event.sessionId;
        else if (event.type === "activity") set({ activity: event.label });
        else if (event.type === "delta") {
          parts.set(event.id, (parts.get(event.id) ?? "") + event.text);
          set({ activity: "" });
          render();
        } else if (event.type === "message") {
          parts.set(event.id, event.text);
          render();
        } else if (event.type === "error") fail(event.message);
      }
    }
    if (![...parts.values()].some(Boolean) && !state.messages.find((m) => m.id === answerId)?.error) {
      fail("The copilot finished without an answer. Please ask again.");
    }
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      if (![...parts.values()].some(Boolean)) patchMessage(answerId, { text: "Stopped.", error: true });
    } else {
      fail("Lost the connection to the copilot. Please try again.");
    }
  } finally {
    abort = null;
    set({ busy: false, activity: "" });
  }
}

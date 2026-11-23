/**
 * A record of each copilot answer, appended to app/traces/YYYY-MM-DD.jsonl.
 *
 * These files are the raw material for improving the copilot: reading real
 * questions and answers is how its failure types are found. Each line holds
 * the question, what the app said was on screen, every tool call, the answer,
 * how long it took and what it cost in tokens. Thumbs up or down from the
 * person are appended to the same file as their own lines.
 *
 * The files contain what people asked, so treat them as private. Set
 * COPILOT_TRACES=off to stop writing them.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../traces");
const ENABLED = process.env.COPILOT_TRACES !== "off";

function append(record: Record<string, unknown>) {
  if (!ENABLED) return;
  try {
    fs.mkdirSync(DIR, { recursive: true });
    const file = path.join(DIR, `${new Date().toISOString().slice(0, 10)}.jsonl`);
    fs.appendFileSync(file, JSON.stringify(record) + "\n");
  } catch (err) {
    console.error("could not write trace:", err);
  }
}

interface Usage {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
}

export class Trace {
  sessionId = "";
  turn = 0;
  answer = "";
  outcome = "unknown";
  errors: string[] = [];
  private started = Date.now();
  private firstTextMs: number | null = null;
  private steps: Array<{ atMs: number; tool: string; input: string }> = [];
  private usage = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, modelRequests: 0 };

  constructor(private question: string, private context: string) {}

  step(tool: string, input: unknown) {
    this.steps.push({ atMs: Date.now() - this.started, tool, input: JSON.stringify(input).slice(0, 600) });
  }

  /** Note when the person first saw text; the wait before it is what feels slow. */
  markFirstText() {
    this.firstTextMs ??= Date.now() - this.started;
  }

  addUsage(usage: Usage) {
    this.usage.input += usage.input_tokens ?? 0;
    this.usage.output += usage.output_tokens ?? 0;
    this.usage.cacheRead += usage.cache_read_input_tokens ?? 0;
    this.usage.cacheWrite += usage.cache_creation_input_tokens ?? 0;
    this.usage.modelRequests += 1;
  }

  save() {
    append({
      kind: "answer",
      time: new Date(this.started).toISOString(),
      sessionId: this.sessionId,
      turn: this.turn,
      question: this.question,
      context: this.context,
      steps: this.steps,
      answer: this.answer,
      answerWords: this.answer.replace(/https?:\/\/\S+/g, "").split(/\s+/).filter(Boolean).length,
      hasSourceLink: /https?:\/\//.test(this.answer),
      outcome: this.outcome,
      errors: this.errors,
      firstTextMs: this.firstTextMs,
      totalMs: Date.now() - this.started,
      usage: this.usage,
    });
  }
}

export function recordFeedback(feedback: { sessionId: string; turn: number; rating: string; note: string }) {
  append({ kind: "feedback", time: new Date().toISOString(), ...feedback });
}

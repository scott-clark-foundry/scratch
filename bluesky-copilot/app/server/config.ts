import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** Folder that holds the skill the copilot agent uses. */
export const SKILL_DIR = path.resolve(here, "../../skill/bluesky");

/** Where `npm run setup` records the IDs of the resources it created. */
export const CONFIG_PATH = path.resolve(here, "../.copilot.json");

/** IDs of the Claude resources the copilot runs on. Written by setup, read by the server. */
export interface CopilotConfig {
  skillId: string;
  environmentId: string;
  agentId: string;
  agentVersion: number;
}

export function readConfig(): Partial<CopilotConfig> {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  } catch {
    return {};
  }
}

export function writeConfig(config: Partial<CopilotConfig>): void {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
}

export function isComplete(config: Partial<CopilotConfig>): config is CopilotConfig {
  return Boolean(config.skillId && config.environmentId && config.agentId && config.agentVersion);
}

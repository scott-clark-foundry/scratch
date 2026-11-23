/**
 * One-time setup for the copilot. Run it with `npm run setup`.
 *
 * It creates three things in your Claude organization and records their IDs in
 * `.copilot.json`, which the server reads on every chat request:
 *
 *   1. the Bluesky skill (uploaded from ../skill/bluesky),
 *   2. an environment: the sandbox settings, including which hosts it may reach,
 *   3. the agent: model, instructions, tools, and the skill.
 *
 * Running it again updates the same three resources in place. Run it again
 * whenever you edit the skill or the instructions below.
 */
import fs from "node:fs";
import path from "node:path";
import Anthropic, { toFile } from "@anthropic-ai/sdk";
import { CONFIG_PATH, SKILL_DIR, readConfig, writeConfig } from "./config.js";

const AGENT_NAME = "Bluesky Copilot";
const ENVIRONMENT_NAME = "bluesky-copilot";

/** The agent's instructions live in their own file so they can be edited and tested without touching code. */
const SYSTEM_PROMPT = fs.readFileSync(new URL("./system-prompt.md", import.meta.url), "utf8").trim();

async function skillFiles() {
  const files = [];
  const root = path.dirname(SKILL_DIR); // upload paths start with "bluesky/"
  for (const entry of fs.readdirSync(SKILL_DIR, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || entry.name.startsWith(".") || entry.parentPath.includes("__pycache__")) continue;
    const full = path.join(entry.parentPath, entry.name);
    files.push(await toFile(fs.readFileSync(full), path.relative(root, full).split(path.sep).join("/")));
  }
  return files;
}

async function main() {
  const client = new Anthropic();
  const config = readConfig();

  // 1. Skill. A new upload to an existing skill becomes its latest version.
  const files = await skillFiles();
  if (config.skillId) {
    const version = await client.skills.versions.create(config.skillId, { files });
    console.log(`Skill ${config.skillId}: uploaded a new version (${version.id})`);
  } else {
    const skill = await client.skills.create({ display_name: "Bluesky", files });
    config.skillId = skill.id;
    writeConfig(config);
    console.log(`Skill created: ${skill.id}`);
  }

  // 2. Environment. The copilot follows the links in posts, which can point at
  // any website, so the sandbox has open outbound network access. That is why
  // nothing secret is ever placed in the sandbox: it holds only the skill.
  const environment = {
    name: ENVIRONMENT_NAME,
    config: {
      type: "cloud" as const,
      networking: { type: "unrestricted" as const },
    },
  };
  if (config.environmentId) {
    await client.beta.environments.update(config.environmentId, environment);
    console.log(`Environment ${config.environmentId}: updated`);
  } else {
    const created = await client.beta.environments.create(environment);
    config.environmentId = created.id;
    writeConfig(config);
    console.log(`Environment created: ${created.id}`);
  }

  // 3. Agent. It may run commands and read files in its sandbox, which is how
  // it runs the skill's script and looks at downloaded images. It may search
  // and fetch the web to check claims and read linked pages. It gets no
  // file-editing tools: answering questions does not need them.
  const agent = {
    name: AGENT_NAME,
    description: "Answers questions about Bluesky inside the Cirrus web app.",
    model: { id: "claude-opus-5-5", effort: "medium" as const },
    system: SYSTEM_PROMPT,
    skills: [{ type: "custom" as const, skill_id: config.skillId, version: "latest" }],
    tools: [
      {
        type: "agent_toolset_20260401" as const,
        default_config: { enabled: true, permission_policy: { type: "always_allow" as const } },
        configs: [
          { name: "web_fetch" as const, enabled: true },
          { name: "web_search" as const, enabled: true },
          { name: "write" as const, enabled: false },
          { name: "edit" as const, enabled: false },
        ],
      },
    ],
  };
  if (config.agentId) {
    const updated = await client.beta.agents.update(config.agentId, agent);
    config.agentVersion = updated.version;
    console.log(`Agent ${updated.id}: now at version ${updated.version}`);
  } else {
    const created = await client.beta.agents.create(agent);
    config.agentId = created.id;
    config.agentVersion = created.version;
    console.log(`Agent created: ${created.id} (version ${created.version})`);
  }
  writeConfig(config);
  console.log(`\nSaved to ${CONFIG_PATH}. Start the app with: npm run dev`);
}

main().catch((err) => {
  if (err instanceof Anthropic.AuthenticationError) {
    console.error("Claude rejected the credentials. Set ANTHROPIC_API_KEY to a valid API key and run setup again.");
  } else if (err instanceof Anthropic.APIError) {
    console.error(`Claude API error ${err.status}: ${err.message}`);
  } else {
    console.error(err instanceof Error ? err.message : err);
  }
  process.exit(1);
});

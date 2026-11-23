# bluesky-copilot

This exploration has two parts that fit together:

1. **`skill/bluesky/`** — an agent skill. A skill is a folder of instructions and scripts that an agent such as Claude Opus 5.5 loads when a task calls for it. This one teaches an agent to answer questions about Bluesky, the social network.
2. **`app/`** — "Cirrus", a web client for Bluesky written from scratch, with a copilot panel. The copilot is a Claude agent that uses the skill from part 1 to answer whatever the person asks while they browse.

Cirrus is an unofficial client. It talks to the real Bluesky network through Bluesky's public API, and it is laid out like the official app (navigation, feed, threads, profiles), but it shares no code, name or artwork with it.

## The skill

```
skill/bluesky/
  SKILL.md               when to use the skill and how to work a question
  scripts/bsky.py        looks up live public Bluesky data; Python standard library only
  reference/concepts.md  how Bluesky works: handles, feeds, moderation, privacy, app passwords
```

The agent reads `SKILL.md` first. For a question about what is on the network (an account, a post, a thread, a topic, a trend) it runs `scripts/bsky.py`. For a question about how Bluesky works it reads `reference/concepts.md`. The script needs no login or API key, because it only reads data that Bluesky serves to signed-out visitors.

Try the script directly:

```bash
cd skill/bluesky
python3 scripts/bsky.py --help
python3 scripts/bsky.py profile bsky.app
python3 scripts/bsky.py thread https://bsky.app/profile/bsky.app/post/3l6oveex3ii2l
python3 scripts/bsky.py search-posts "custom feeds" --sort latest
python3 scripts/bsky.py trending
```

To use the skill in Claude Code, copy the `bluesky` folder into `.claude/skills/` in a project (or `~/.claude/skills/` for all projects). To use it through the Claude API, upload it with the Skills API; `app/server/setup.ts` shows how.

## The app

What it does:

- **Signed out**: browse the Discover feed, open threads and profiles, search posts and people, see trending topics, browse and read custom feeds.
- **Signed in** (with a Bluesky app password): your Following timeline and notifications, plus posting, replying, liking, reposting and following.
- **Copilot**: a panel beside the feed. It knows which screen you are on, so "summarize this thread" or "who is this?" work without pasting a link. Each post also has a ✦ button that asks the copilot about that post. Links in its answers to posts and profiles open inside the app.

### Run it

You need Node 20 or newer and a Claude API key.

```bash
cd app
npm install
export ANTHROPIC_API_KEY=sk-ant-...
npm run setup     # once: uploads the skill and creates the copilot agent
npm run dev       # web app on http://localhost:5173, copilot server on :8787
```

Without the key and the setup step, the app still works as a Bluesky client; the copilot panel explains that it is not connected.

`npm run setup` creates three things in your Claude organization and saves their IDs to `app/.copilot.json` (not committed): the uploaded skill, an environment, and an agent. Run it again after editing the skill or the agent's instructions; it updates the same three in place.

For a single-process deployment, run `npm run build` and then `npm start`. The server on port 8787 then serves the built web app as well as the copilot.

### How the copilot works

```
browser ──question + screen context──▶ app/server ──▶ Claude Managed Agents session
   ▲                                       │                 │ runs scripts/bsky.py
   └────────── answer, streamed ───────────┘                 ▼ in a sandbox
                                                     Bluesky public API
```

The copilot runs on Claude Managed Agents, a beta Claude API service in which Anthropic runs the agent and a sandbox container for its tools. I chose it because the sandbox can run the skill's script as written, so the copilot and any other agent that loads the skill behave the same way. It bills session runtime on top of tokens, and Anthropic keeps each session's history until you delete it. If you would rather host the agent loop yourself, the alternative is the Claude Messages API with the script's commands exposed as tools.

- The agent is `claude-opus-5-5` at medium effort, with the skill attached.
- The sandbox can reach only `public.api.bsky.app`, `api.bsky.app` and `plc.directory`. The agent has no web search, web fetch or file-writing tools, and the sandbox holds no secrets.
- One copilot conversation is one session. The server opens the session's event stream, sends the question, and relays the agent's text and a short description of each lookup ("Reading the thread") to the browser as it happens.
- The copilot reads public data only. Your Bluesky sign-in stays in the browser and is never sent to the app server or to Claude. So the copilot cannot read your timeline or notifications, and it cannot post for you; it says so when asked.

### Files

```
app/
  server/setup.ts     one-time creation of skill, environment and agent
  server/index.ts     POST /api/copilot/chat: relays one question and streams the answer
  src/lib/atproto.ts  Bluesky API client: reads, sign-in, posting, likes, follows
  src/lib/copilot-store.ts   copilot conversation state and the screen-context note
  src/components/     screens, posts, dialogs and the copilot panel
```

## What has been tested, and what has not

Tested in this repo's development container:

- Every command of `scripts/bsky.py`, against the live Bluesky API.
- The app's signed-out screens (home, thread, profile, search, feeds) in a headless browser with live data, at desktop, tablet and phone widths.
- The copilot's path from browser to server and back, against a local stand-in for the Claude API that replays a scripted agent turn. This covers session creation, the streamed answer, the activity line, Markdown rendering, in-app links and follow-up questions.
- The server code typechecks against version 1.13.0 of the official `@anthropic-ai/sdk` package.

Not tested, because the container had no Claude API key and no Bluesky account:

- `npm run setup` and a copilot answer from the real Claude API.
- Everything behind sign-in: the Following timeline, notifications, posting, liking, reposting and following.

## Limits to know about

- **No protection on the copilot endpoint.** Anyone who can reach the server can ask questions that your API key pays for. Put sign-in and rate limiting in front of it before exposing it beyond your own machine.
- **Sign-in tokens are kept in the browser's local storage**, which any script on the page could read. That is acceptable for a local experiment with an app password; a public deployment should use Bluesky's OAuth sign-in instead.
- **Posts are text only.** The composer does not attach images, video or link cards, and it cannot quote a post.
- **Video shows a still frame**, not a player.
- **No direct messages, lists, bookmarks, settings, or moderation controls** (mute, block, report). Content labels are not applied, so the app may show posts that the official app would hide behind a warning.
- **Posts are untrusted input to the agent.** A post can contain text aimed at the copilot. The skill tells the agent to treat fetched text as content, and the sandbox's limits (no secrets, three reachable hosts, read-only API) bound what a successful trick could do: at worst, a wrong answer.

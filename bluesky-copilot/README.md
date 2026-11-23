# bluesky-copilot

This exploration has three parts that fit together:

1. **`skill/bluesky/`** is an agent skill: a folder of instructions, reference notes and a script that an agent such as Claude Opus 5.5 loads when a task calls for it. This one teaches an agent to answer questions about Bluesky, the social network.
2. **`app/`** is "Cirrus", a web client for Bluesky written from scratch, with a copilot panel. The copilot is a Claude agent that uses the skill to answer whatever the person asks while they browse.
3. **`prompt-tests/`** is the evaluation: realistic questions grounded in real Bluesky posts, the answers that stand-in agents gave, independent grades, and my review notes.

Cirrus is an unofficial client. It talks to the real Bluesky network through Bluesky's public API and is laid out like the official app, but it shares no code, name or artwork with it.

## The skill

```
skill/bluesky/
  SKILL.md                    when to use the skill, the commands, and a recipe per kind of question
  scripts/bsky.py             reads public Bluesky data; Python standard library only, no login
  reference/concepts.md       how Bluesky works: handles, feeds, lists, moderation, privacy, settings
  reference/social-media.md   how to read posts: quote posts, dunks, ratios, satire; how to check if something is real
  reference/resources.md      outside sites worth checking, by need: fact-checkers, meme explainers, who's-who
```

What the script can do:

| Need | Command |
|---|---|
| Accounts: who they are, whether they are still active | `profile A [B C …]`, `search-users`, `followers`, `follows`, `relationship` |
| Posts and conversations | `posts`, `post`, `thread` (follows an author's own multi-post thread, then lists others' replies) |
| Quote posts | `quote-chain` (walks a quote of a quote of a quote back to the first post), `quotes --top` |
| Pictures and links in a post | `media` (downloads images, or a video's one still frame, for the agent to look at), `read-link` (reads the linked page) |
| Topics | `search-posts` (with date, author, language and domain filters), `trending` |
| Discovery | `search-feeds`, `feed`, `search-starter-packs`, `starter-pack`, `user-lists`, `list` |

Try it:

```bash
cd skill/bluesky
python3 scripts/bsky.py --help
python3 scripts/bsky.py thread https://bsky.app/profile/bsky.app/post/3l6oveex3ii2l
python3 scripts/bsky.py quote-chain <link to a post that quotes another post>
python3 scripts/bsky.py media <link to a post with a picture>
```

To use the skill in Claude Code, copy the `bluesky` folder into `.claude/skills/`. To use it through the Claude API, upload it with the Skills API; `app/server/setup.ts` does this.

## The app

- **Signed out**: browse the Discover feed, threads, profiles, search, trending topics and custom feeds.
- **Signed in** (with a Bluesky app password): your Following timeline and notifications, plus posting, replying, liking, reposting and following.
- **Copilot**: a panel beside the feed.
  - It knows which screen you are on, so "who is this guy?" or "is this real?" work without pasting a link. Each post has a ✦ button that asks about that post.
  - It looks things up live, looks at pictures, reads linked pages, can search the web, and names its sources. Links in its answers to posts and profiles open inside the app.
  - When you are signed in it can read your Following timeline and notifications. Your browser fetches those with your own sign-in and passes the text along; your Bluesky tokens never reach the app's server or Claude.
  - It can draft a post or reply, or propose a list of accounts. Each appears as a card, and nothing is published unless you press the button.
  - Thumbs up or down under each answer are saved with the server's record of that answer.

### Run it

You need Node 20 or newer and a Claude API key.

```bash
cd app
npm install
export ANTHROPIC_API_KEY=sk-ant-...
npm run setup     # once: uploads the skill and creates the copilot agent
npm run dev       # web app on http://localhost:5173, copilot server on :8787
```

Without the key and the setup step the app still works as a Bluesky client, and the copilot panel says it is not connected. `npm run setup` creates a skill, an environment and an agent in your Claude organization and saves their IDs to `app/.copilot.json`. Run it again after editing the skill, `app/server/system-prompt.md` or `app/server/tools.ts`.

Settings, as environment variables on the server:

| Variable | Default | Meaning |
|---|---|---|
| `COPILOT_BUDGET_CENTS` | `150` | Most one conversation may cost at Anthropic's list prices. Anthropic enforces it. `0` turns it off. |
| `COPILOT_RATE_LIMIT` | `20` | Questions one network address may ask per ten minutes. |
| `COPILOT_TRACES` | on | Set to `off` to stop writing answer records to `app/traces/`. |

### How the copilot is built

There is no agent framework in the usual sense (no LangChain, LlamaIndex or similar). The copilot runs on **Claude Managed Agents**, a beta Claude API service: Anthropic runs the agent's loop (the model deciding which tool to call next, over and over, until it answers) and a sandbox container where the tools execute. The app's server uses the official `@anthropic-ai/sdk` package to create one session per conversation and relay events.

```
browser ── question + what is on screen ──▶ app/server ──▶ Managed Agents session (claude-opus-5-5)
   ▲  ▲                                        │  ▲              │ sandbox: bsky.py, image files,
   │  └── "read my timeline" request ◀─────────┘  │              │ web search, web fetch
   │       (answered by the browser, with the     │              ▼
   │        person's own Bluesky sign-in) ────────┘     Bluesky public API, the web
   └────────── answer, streamed; draft cards ─────
```

- **Model and effort**: `claude-opus-5-5` at medium effort.
- **Instructions**: `app/server/system-prompt.md`. It covers what the app tells the agent, what it can see, where things are in Cirrus, and how to answer (friendly, answer first, short, sources always).
- **Sandbox tools**: run commands and read files (which is how it runs the script and looks at downloaded images), web search and web fetch. No file editing.
- **Network**: the sandbox has open outbound access, because the links people post can point anywhere. It holds no secrets.
- **App-side tools** (`app/server/tools.ts`): `read_my_timeline` and `read_my_notifications` are answered by the person's browser; `draft_post` and `propose_list` only show a card to confirm.
- **Records** (`app/server/trace.ts`): each answer is appended to `app/traces/YYYY-MM-DD.jsonl` with the question, screen context, every tool call, time to first text, total time and token counts. These files contain what people asked, so treat them as private.

Managed Agents bills session running time on top of tokens, and Anthropic keeps each session's history until you delete it. I chose it because the sandbox runs the skill's script as written and can hold image files for the model to look at. The alternative, if you would rather host the loop yourself, is the Claude Messages API with the script's commands exposed as tools.

## The evaluation

The method follows Hamel Husain's advice on evaluating LLM products: ground the test inputs in real records, read the traces yourself before trusting any score, grade pass/fail with a written critique instead of a 1-to-5 scale, and derive the failure types from what you read.

```
prompt-tests/v2/
  cases-*.json        46 questions, each tied to a real post, account or search from 22–23 November 2026,
                      with the facts a scout agent verified when writing it
  answer-brief.md     instructions for a stand-in agent that answers as the copilot
  judge-brief.md      instructions for an independent grader that re-checks the answer against live data
  runs/r1…r3/         each answer, with the steps taken, the evidence cited and the friction met
  judgments/r1…r3/    each grade: pass or fail on each check, plus a critique
  annotations.json    my own verdicts, notes and failure-type labels from reading the traces
  report.html         everything on one page, filterable (build with: python3 build-report.py r1 r2 r3)
```

The questions cover what an ordinary person browsing Bluesky asks: who is this, is this real, what are her politics, has he contradicted this, whom to follow for Middle East news, what is today's drama in the AI community, help me build a list of alcohol marker artists, what is in this picture, what does the article say, what started this quote chain, what did I miss, write me a reply.

Results by round. The grading checks were tightened after round 1, so the rates are not directly comparable.

| Round | Cases | Passed | What it showed |
|---|---|---|---|
| r1 | 40 | 35 | Three answers gave a stale picture of a story that had moved that day; one ranked a dispute without surveying; one declined a question without looking at the post. Answers ran long. |
| r2 | 25 (5 failures, 6 new, 14 regression) | 22 | Four of five failures fixed. New: absolute claims from a narrow search ("there are no starter packs for this"). App-side tools used correctly in all six new cases. |
| r3 | 10 | see `report.html` | Confirmation run after the round-2 fixes. |

An earlier, smaller round (`prompt-tests/cases.json`, 17 questions) shaped the first version of the instructions and is kept for reference.

## Step-back review: what is missing, and what will change with real model calls

No part of the copilot has yet answered a question through the real Claude API. This container had no API key. Everything below should be read with that in mind.

### What the evaluation did and did not test

The answers in `runs/` came from stand-in agents: Claude Code subagents told to read the copilot's instructions and skill and act as it would. That tests the instructions, the skill's recipes and the script against live Bluesky data, and it found real problems. It does not test these things, which only real calls will show:

- **Whether the agent loads the skill unprompted.** The stand-ins were told to read `SKILL.md`. The real agent sees only the skill's name and description and decides for itself. If it skips a reference file, the recipes there do nothing.
- **Speed.** A session starts a sandbox, then makes several tool calls. Stand-ins took 25 to 45 seconds on simple questions and minutes on research ones. In a side panel, time to first text matters most; the server records it per answer, but nothing has been measured or tuned.
- **Cost.** Unmeasured. It depends on effort level, how many tool calls a question takes, and how much of each request is served from the prompt cache. The spend cap bounds the worst case per conversation.
- **Model and effort choice.** Opus 5.5 at medium effort is a starting guess. Lower effort, or a smaller model for simple questions, may give the same quality faster and cheaper. That is a measurement, not a judgment call.
- **The sandbox itself.** Whether Python and outbound access behave as assumed there, how the model's image reading performs on real post images, how its web search differs from the stand-ins' search tool, and whether Bluesky rate-limits the sandbox's address.
- **Refusals and classifier stops.** The server handles a refused turn, but which real questions trigger one is unknown.
- **Conversations.** Every test is a single question. Follow-ups ("the second one", "tell me more"), a screen that changes between turns, and long sessions where earlier context is summarized are untested.
- **The app-side tools end to end.** The stand-ins could only record that they would call a tool. The relay between agent, server and browser was tested against a local stand-in for the Claude API, not the real one, and not with a signed-in Bluesky account.

`npm run eval:real -- r-real` runs the same test cases through the real agent and writes the same report format plus timings and token counts, so the same graders and report page apply. It typechecks and has never been run.

### What a seasoned agent engineer would still add

- **Label a sample yourself.** The grader agents were never checked against a person's judgment. Read 30 to 50 traces in `report.html`, mark pass or fail, and compare with the grader per check (how often it catches a real failure, and how often it passes a real pass). Until then the pass rates are my opinion plus an unvalidated grader's. In particular, how short "to the point" should be is your call, and I guessed.
- **Use real questions as soon as there are any.** The test questions were invented by agents imitating users. The trace files and thumbs ratings exist so that real questions can replace them.
- **Cheap automatic checks on every answer.** Word count, at least one source link, no links to accounts that do not exist. The trace already records the first two; nothing alerts on them.
- **Protect the endpoint.** There is a rate limit per address and a spend cap per conversation, but no sign-in on the copilot endpoint. Anyone who can reach the server can spend your API key within those limits.
- **Posts and web pages are untrusted input.** The agent reads text written by strangers and has open network access. The sandbox holds no secrets, and the instructions tell the agent to treat fetched text as content. The remaining risk is that a crafted post or page talks the agent into a wrong answer, or into fetching a web address that carries the person's question or handle to a third party. Narrowing the sandbox's network access is not possible while it must follow arbitrary links; a stricter design would fetch linked pages through a separate service that returns only text.
- **Private data in the session.** When the copilot reads a signed-in person's timeline or notifications, that text becomes part of the session history that Anthropic stores until the session is deleted. Sessions are never deleted today. A real deployment needs a retention rule and a way to delete a conversation.
- **Reconnects.** If the browser drops mid-answer the server tells the agent to stop. It does not resume a stream after a network blip.
- **Sign-in.** The app stores Bluesky tokens in the browser's local storage, which is acceptable for a local experiment with an app password. A public deployment should use Bluesky's OAuth sign-in.
- **A person is one model.** The stand-ins and the graders are all Claude. They share blind spots: in round 1 and round 2 the "AI drama" answers left out the story about Anthropic.

### Known limits of the app

- Posts are text only: the composer does not attach images, video or link cards.
- Video shows a still frame, not a player.
- No direct messages, bookmarks, settings, or moderation controls (mute, block, report). Content labels are not applied, so the app may show posts the official app would hide behind a warning.
- Lists can be created through the copilot's card but not viewed or edited in Cirrus.

## What has been tested

- Every script command, against the live Bluesky API.
- The app's signed-out screens in a headless browser with live data, at desktop, tablet and phone widths.
- The copilot's path from browser to server and back, including the app-side tools, draft cards, feedback and answer records, against a local stand-in for the Claude API.
- The server code typechecks against version 1.13.0 of `@anthropic-ai/sdk`.

Not tested: anything against the real Claude API, and anything behind a Bluesky sign-in (timeline, notifications, posting, liking, following, list creation).

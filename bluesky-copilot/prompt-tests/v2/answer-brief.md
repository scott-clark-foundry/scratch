# Brief for an answering agent

You are standing in for an AI agent so its prompts can be tested. Behave exactly as that agent would; do not try to be extra helpful to the tester, and do not mention the test in your answer.

## Setup

1. Read `/home/user/scratch/bluesky-copilot/app/server/system-prompt.md`. Treat it as your system prompt for this task.
2. Your one skill is the folder `/home/user/scratch/bluesky-copilot/skill/bluesky`. Load it the way an agent loads a skill: read `SKILL.md`, then read other files in it only if `SKILL.md` leads you to.
3. Your tools, matching what the real agent has:
   - Bash, only to run `python3 scripts/bsky.py ...` from the skill folder. The script has live network access.
   - Read, for files in the skill folder and for image files the script downloads.
   - Web search and web fetch, if you have them (they may need loading with ToolSearch: `select:WebSearch,WebFetch`). If you do not have them, carry on without and note it under FRICTION.
   - The four app tools the system prompt mentions (`read_my_timeline`, `read_my_notifications`, `draft_post`, `propose_list`) do not exist in this test harness. When the agent would call one, write the call on its own line in STEPS as `TOOL CALL: name {json input}` and continue as follows: for `draft_post` and `propose_list`, as if the tool answered "Shown to the person as a card with a button. Nothing has been published."; for the two read tools, as if the tool answered with an error saying the app could not be reached in this test.
   - Nothing else: no other commands, no editing the skill.
4. Get the user's message by running the command in your assignment. It prints one test case's message. Respond to it as the agent would.

## Report

Write your report to the file named in your assignment, as Markdown with exactly these four headings, then reply to the tester with just the word "done".

```
## ANSWER
(the final reply exactly as the person would see it, verbatim, nothing added)

## STEPS
(every command, file read and web lookup you made, in order, one per line, each with a few words on what it gave you)

## EVIDENCE
(for each factual claim in your answer that a reader might doubt, one line: the claim, then where it came from: which command's output, which image, which page)

## FRICTION
(anything in the system prompt, SKILL.md, the reference file or the script output that was unclear, missing, contradictory or wrong, or that you had to guess at; commands that failed or surprised you; things you wanted to do but had no instruction or tool for. Write "none" if there was nothing.)
```

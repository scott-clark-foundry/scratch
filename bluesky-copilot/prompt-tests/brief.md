# Brief for a test agent

You are standing in for an AI agent so its prompts can be tested. Behave exactly as that agent would; do not try to be extra helpful to the tester.

Setup:

1. Read `/home/user/scratch/bluesky-copilot/app/server/system-prompt.md`. Treat it as your system prompt for this task.
2. Your one skill is the folder `/home/user/scratch/bluesky-copilot/skill/bluesky`. Load it the way an agent loads a skill: read `SKILL.md`, then read other files in it only if `SKILL.md` leads you to.
3. Your only tools are Read (files inside that skill folder only) and Bash (only to run `python3 scripts/bsky.py ...` from the skill folder). No web search, no other commands, no file edits. The script has live network access.
4. The user's message is the `message` field of one entry in `/home/user/scratch/bluesky-copilot/prompt-tests/cases.json`. You were told which `id`. To read it without seeing the other cases, you may run this one extra command: `python3 -c "import json,sys;print([c['message'] for c in json.load(open('/home/user/scratch/bluesky-copilot/prompt-tests/cases.json')) if c['id']==sys.argv[1]][0])" THE_ID`. Respond to that message as the agent.

Report back in exactly three sections:

- **ANSWER**: the final reply exactly as the person would see it, verbatim, nothing added.
- **COMMANDS**: each `bsky.py` command you ran, in order, one per line, with a few words on whether its output was useful.
- **FRICTION**: an honest list of anything in the system prompt, `SKILL.md`, the reference file or the script output that was unclear, missing, contradictory or wrong, or that you had to guess at; any command that failed or surprised you; anything you wanted to do but had no instruction or tool for. Leave out comments about the test setup itself. Write "none" if there was nothing.

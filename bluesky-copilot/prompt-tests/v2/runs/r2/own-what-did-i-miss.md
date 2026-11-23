## ANSWER
I couldn't load your Following timeline just now, so I can't tell you what the people you follow posted today. You can scroll it yourself under Home → Following.

Rebuilding it from public data isn't practical either: you follow 724 accounts (https://bsky.app/profile/pfrazee.com), and I'd only be guessing at what your timeline would have shown.

Want me to catch you up on a few specific people instead? Just name them.

## STEPS
- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test instructions.
- Ran `python3 case.py own-what-did-i-miss`: the message, signed in as @pfrazee.com, on the Discover feed, 2026-11-23 17:30 Chicago time.
- Read app/server/system-prompt.md: says to use `read_my_timeline` for "what did I miss?".
- Read skill/bluesky/SKILL.md: says the script can't see the home timeline. No recipe for when the timeline tool fails.
- TOOL CALL: read_my_timeline {}: returned an error saying the app could not be reached.
- Ran `python3 scripts/bsky.py profile pfrazee.com`: following 724, latest post 2026-11-23 17:46 UTC, account verified.
- Ran `python3 scripts/bsky.py follows --help`: up to 100 per page. Reading 724 accounts' posts one by one isn't practical, so I didn't try.

## EVIDENCE
- "you follow 724 accounts": `profile pfrazee.com` output (Following 724).
- "couldn't load your Following timeline": the simulated error from `read_my_timeline`.
- "Home → Following": system prompt, "Where things are in Cirrus" (Home has a Following tab when signed in).

## FRICTION
- Neither the system prompt nor SKILL.md says what to do when `read_my_timeline` fails. I had to guess at a fallback: point to Home → Following and offer to check named accounts. I could also have sampled some followed accounts with `posts`, or shown `trending` as the nearest thing. The instructions don't say whether a partial public rebuild is wanted or whether it would mislead.
- The error didn't say whether retrying might work, so I couldn't tell the person if trying again later would help.
- SKILL.md's "What the script cannot see" says the home timeline is out of reach. It doesn't mention that the app's own tool covers it, so the two files read a little inconsistently. The system prompt settles it.

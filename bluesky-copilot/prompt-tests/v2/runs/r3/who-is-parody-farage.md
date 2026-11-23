## ANSWER
Nope, not the real Farage. It's a parody account: the display name is "Parody Nigel Farage" and the bio says "Parody account. Here to take the piss out of the full time grifter and part time MP who leads Reform UK." This post riffs on a screenshotted headline, "Britons turn against Nigel Farage in record numbers, new poll reveals".

https://bsky.app/profile/parodypm.bsky.social

Want me to check whether that poll is real?

## STEPS
- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: test instructions.
- Ran `python3 case.py who-is-parody-farage`: app context (thread focused on https://bsky.app/profile/parodypm.bsky.social/post/3n2yuqruzo22d) and the question "wait is this actually farage?? who is this guy".
- Read app/server/system-prompt.md: system prompt.
- Read skill/bluesky/SKILL.md: "Who is this?" recipe (profile + posts, parody check) and the rule to look at images first.
- `python3 scripts/bsky.py post <focused post>`: author @parodypm.bsky.social "Parody Nigel Farage", text about a 62% unfavourable poll and Russian bots, one image with no alt text.
- `python3 scripts/bsky.py profile parodypm.bsky.social`: bio says "Parody account. Here to take the piss out of the full time grifter and part time MP who leads Reform UK…", 47,123 followers, joined 2023-05-20, no verification line.
- `python3 scripts/bsky.py media <focused post>`: saved image1.jpg, no alt text.
- Read /tmp/bsky-media-jim5g6ct/image1.jpg: a news-style headline screenshot "Britons turn against Nigel Farage in record numbers, new poll reveals / More than six in ten have unfavourable view of Reform UK leader, says survey" (no outlet name visible).
- `python3 scripts/bsky.py posts parodypm.bsky.social --no-reposts --limit 15`: consistently satirical first-person posts mocking Farage and Reform (Nov 17 to 23), links to a "Nigel's Notebook" parody Substack.

## EVIDENCE
- Account is a parody, display name "Parody Nigel Farage": `profile parodypm.bsky.social` output (display name and bio).
- Bio quote: `profile parodypm.bsky.social` output, verbatim.
- The post's picture is a headline "Britons turn against Nigel Farage in record numbers, new poll reveals": image1.jpg from `media` on the focused post.

## FRICTION
- The screenshot shows no outlet name, so I could not say where the headline came from without a web search; I offered the poll check instead of doing it, per the length rules. Did not load web search since the answer did not need it.
- The `media` command saves to a random /tmp folder; the brief says Read is for files in the skill folder "and for image files the script downloads", so this was fine, but the path is only discoverable from the output.

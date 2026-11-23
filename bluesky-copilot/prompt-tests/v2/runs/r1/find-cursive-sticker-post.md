## ANSWER
Found it, I think: Hrag Vartanian (@hrag.bsky.social) posted it yesterday at 8:49 AM.

"My recent order of fountain pen supplies included this free sticker and it made me laugh."

The sticker says "I can read ancient text" in cursive on lined handwriting-practice paper, with a small "Goulet Pens" logo in the corner.

https://bsky.app/profile/hrag.bsky.social/post/3n2vqzim2b22s

Is that the one? If not, I can keep digging.

## STEPS
- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the task rules.
- python3 case.py find-cursive-sticker-post: the user's message and app context (signed in as @pfrazee.com, time 2026-11-23 21:59 UTC, America/New_York).
- Read app/server/system-prompt.md: system prompt.
- Read skill/bluesky/SKILL.md: skill and "Find a post I saw" recipe.
- bsky.py search-posts "sticker pen cursive" --since 2026-11-21 --until 2026-11-24: one hit, @hrag.bsky.social post at 2026-11-22 13:49 UTC about a free sticker with a fountain pen order, alt text "Sticker in cursive script".
- bsky.py search-posts "cursive sticker" --since 2026-11-21 --until 2026-11-24: same hit plus an unrelated "Blame is the enemy of Safety" sticker post from today.
- bsky.py media https://bsky.app/profile/hrag.bsky.social/post/3n2vqzim2b22s: saved image1.jpg.
- Read /tmp/bsky-media-pyybzpuq/image1.jpg: the sticker reads "I can read ancient text" in cursive on lined paper, "Goulet Pens" printed in the corner.

## EVIDENCE
- Posted by Hrag Vartanian (@hrag.bsky.social): search-posts output.
- Posted yesterday at 8:49 AM: search-posts shows 2026-11-22 13:49 UTC; converted to America/New_York (UTC-5) = 8:49 AM Nov 22, which is "yesterday" relative to the app's current time of Nov 23 4:59 PM ET.
- Quoted post text: search-posts output.
- Sticker reads "I can read ancient text" in cursive on lined paper: the downloaded image.
- "Goulet Pens" logo: small text in the image's bottom-right corner.

## FRICTION
- The "Find a post I saw" recipe says to offer the two or three best matches and ask which it was. Here only one result fit and the image matched every detail, so I gave that one and asked for confirmation. I had to decide on my own whether a single strong match still counts as "a guess".
- I did not need web search or web fetch, so I did not load them.

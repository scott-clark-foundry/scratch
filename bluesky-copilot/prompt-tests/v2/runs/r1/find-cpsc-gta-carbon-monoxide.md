## ANSWER
Found it. It's the U.S. Consumer Product Safety Commission (@cpsc.gov, verified), and it was carbon monoxide alarms, not smoke detectors:

"Lucia will appreciate working carbon monoxide alarms on every level of the home and outside sleeping areas."
https://bsky.app/profile/cpsc.gov/post/3n2qtuz6bl22k

They posted it Nov 20 just before midnight your time, and it got about 1,600 likes. (Lucia is one of GTA 6's main characters, from general knowledge.) Last night they followed up with a screenshot of IGN featuring it in a GTA 6 memes roundup on Instagram: "Your federal agency creating carbon monoxide safety crossovers with GTA 6"
https://bsky.app/profile/cpsc.gov/post/3n2ydvmzuoc2t

Want to see what people said in the quotes?

## STEPS
Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: task instructions.
Ran case.py find-cpsc-gta-carbon-monoxide: user message, not signed in, screen is "gta 6" top search, time 2026-11-23T21:59Z, Asia/Tokyo.
Read app/server/system-prompt.md: system prompt.
Read skill/bluesky/SKILL.md: "Find a post I saw" recipe and media recipe.
search-posts "gta 6 smoke detector" --sort top: no results.
search-posts "CPSC gta" --sort top: CPSC's 2026-11-23 post "Your federal agency creating carbon monoxide safety crossovers with GTA 6" with IGN screenshot.
profile cpsc.gov: official USCPSC account, verified, ~120k followers.
post (3n2ydvmzuoc2t): 187 likes, 18 reposts, 2 replies.
media (3n2ydvmzuoc2t): saved image + alt text.
Read /tmp/bsky-media-9p0f7e1d/image1.jpg: IGN Instagram "Grand Theft Auto VI" memes carousel showing @USCPSC post about Lucia and CO alarms; IGN caption "Lucia will appreciate all these memes about GTA 6!"; uscpsc comment "Thanks for sharing this important carbon monoxide safety information, IGN!"
search-posts "Lucia carbon monoxide" --sort top: found the original CPSC Bluesky post 2026-11-20 14:57 UTC, 1617 likes, 272 reposts, 4 quotes.

## EVIDENCE
Account is the official U.S. CPSC and verified: `profile cpsc.gov` (bio "Official account of the USCPSC", Verified: yes).
Exact wording of the Lucia post: `search-posts "Lucia carbon monoxide"` output, post 3n2qtuz6bl22k.
Posted Nov 20 just before midnight Tokyo time: 2026-11-20 14:57 UTC = 23:57 JST, from same search output.
About 1,600 likes: 1617 likes in same search output.
It's carbon monoxide alarms, not smoke detectors: post text.
Follow-up "last night" with IGN screenshot: post 3n2ydvmzuoc2t at 2026-11-23 14:32 UTC = 23:32 JST Nov 23; current time is 06:59 JST Nov 24 (app_context).
IGN featured it in a GTA 6 memes roundup on Instagram: downloaded image (IGN header "GRAND THEFT AUTO VI", caption "Lucia will appreciate all these memes about GTA 6!") and alt text.
Lucia is a GTA 6 main character: general knowledge, flagged in answer.

## FRICTION
- WebSearch/WebFetch were not loaded; the answer did not need them, so I did not load them.
- The user said "smoke detectors" but the post is about carbon monoxide alarms; my first search on "smoke detector" returned nothing. The "Find a post I saw" recipe says to try variants but gives no hint that remembered details may be wrong; I guessed at "CPSC" from "government agency". Worked out fine but was a guess.
- The recipe says "offer the two or three best matches and ask which it was; do not present a guess as the post". Here one match was clearly right, so I presented it directly without asking; the recipe doesn't say what to do when the match is unambiguous.
- The original Lucia post has no image or GTA mention in its text as printed; I didn't check whether it had media (the search output showed no [image] line, so I assumed none).

## ANSWER

It's a chain game, not an argument. Each person quotes the previous post, repeats "Bluesky is a town and we all have a job here. What is yours?" and adds their own answer, usually a GIF. C. Robert Cargill's answer is a "That's What I Do: I Drink and I Know Things" GIF: https://bsky.app/profile/crobertcargill.bsky.social/post/3n2w7ch4akc2k

The earliest one I found is by @fionaapplebs.bsky.social, Thursday Nov 19 at 7:45 AM your time: "I am the coffee shop waitress that touches up your now half cup of coffee…" It quotes nothing and has 79 quotes. https://bsky.app/profile/fionaapplebs.bsky.social/post/3n2o7fsytvc2a

I can't fully prove it's the origin. Your post's branch goes back 27 posts and then hits a deleted post. Search shows the prompt splitting into many branches within hours.

Want a few of the better answers from along the way?

## STEPS

1. Read answer-brief.md: setup and report format.
2. Ran case.py quote-chain-game: not signed in, viewing @crobertcargill.bsky.social post 3n2w7ch4akc2k, Chicago time zone; question "why is everyone quote posting the same sentence?? where did this start".
3. Read app/server/system-prompt.md: system prompt.
4. Read skill/bluesky/SKILL.md: quote-chain recipe and chain-game guidance.
5. `quote-chain <crobertcargill post>`: 20 posts, all the same prompt plus a GIF or picture. Stopped at depth 20, the earliest being @nojohn.bsky.social on 2026-11-19 19:39 UTC. The script flagged it as a chain game. Cargill's post: 2026-11-22 18:05 UTC, GIF "That's What I Do: I Drink and I Know Things", 195 likes, 47 quotes.
6. `quote-chain <nojohn post> --max-depth 60`: 8 more posts back to @doyleinstitute.bsky.social (2026-11-19 16:07 UTC), which quotes a deleted post. That is where this branch ends.
7. `search-posts '"Bluesky is a town and we all have a job here"' --sort latest --until 2026-11-19T16:10:00Z`: many parallel branches around 15:00–16:00 UTC Nov 19. @scalawagjack's post also quotes a deleted post.
8. `search-posts '"Bluesky is a town"' --sort latest --until 2026-11-19T13:00:00Z`: only unrelated older posts with loose matches. Nothing from Nov 19 before 13:00 UTC.
9. `search-posts '"we all have a job here"' --sort latest --since 2026-11-18 --until 2026-11-19T15:24:00Z`: traced branches back to @fionaapplebs.bsky.social at 2026-11-19 13:45 UTC. Her post quotes nothing and has 168 likes and 79 quotes. Many early branches (rickhavoc, infiniteishq, markandthecrew) quote it.
10. `search-posts '"we all have a job here"' --sort latest --since 2026-11-10 --until 2026-11-19T13:45:00Z`: no results, so nothing earlier was found. Then ran the same search with `--sort top`: the top posts are from Nov 21–23, which shows the game is still spreading.

## EVIDENCE

- The posts are a chain game where each person repeats the prompt and gives an answer, usually a GIF: quote-chain output (step 5), including the script's chain-game note. All 20 posts have identical text plus media.
- Cargill's post has a "That's What I Do: I Drink and I Know Things" GIF: quote-chain output, post 20 of 20 (step 5). This is from the GIF title, not from viewing the image.
- The earliest found is @fionaapplebs.bsky.social at 13:45 UTC Nov 19, which is 7:45 AM CST and a Thursday: search output (step 9), converted to America/Chicago (UTC−6).
- The coffee shop waitress quote: search output (step 9), the post's text.
- Fiona's post quotes nothing and has 79 quotes: search output (step 9). The post has no [quotes …] line and shows "quotes 79".
- No earlier post was found: empty search result (step 10) and loose matches only (step 8).
- Cargill's branch goes back 27 posts and then hits a deleted post: 20 posts in step 5 plus 7 more before nojohn in step 6. The doyleinstitute post quotes a deleted post (step 6).
- The prompt split into many branches within hours: search output (steps 7 and 9), with many distinct quoted parents between 13:45 and 16:00 UTC.

## FRICTION

- I did not load WebSearch or WebFetch. All the evidence was on Bluesky, so I didn't need them, but I never confirmed they were available.
- `quote-chain` stops at 20 posts by default. To reach the end, I had to rerun it from the earliest post with `--max-depth`. The output says to raise --max-depth, but it doesn't give a ready-to-run command with the oldest post's link (other outputs do give ready-made commands).
- When a branch ends at a deleted post, there's no recipe for finding the real origin of a chain game that spreads across many branches. I used date-bounded phrase searches, which worked, but SKILL.md's chain-game bullet only says "say where it started if you can see it". Some guidance would help: search the phrase with `--sort latest --until` near the earliest time you found, and present the earliest hit as "earliest found", not as the confirmed origin.
- The system prompt asks for 40–100 words, or up to about 180 for a quote-chain summary. I couldn't tell whether this answer counts as a "quote-chain summary" (longer allowed) or a short answer. I aimed for the middle.
- The search output shows each quoted post only one level deep. Tracing branches by hand through search results was laborious.

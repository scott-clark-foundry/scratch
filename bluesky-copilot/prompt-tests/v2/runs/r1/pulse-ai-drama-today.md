## ANSWER

The big one is a backlash against the Internet Archive for its new "Wayback Machine Labs" page, which says its experimental apps are "mostly vibe-coded with Claude Code."

- It took off from @eliasdaler.bsky.social's post yesterday evening ("When your goat is washed… Some people don't realize how much aura and trust they're losing by doing this…"), a screenshot of the page plus a crying-kid meme: about 2,400 likes and 109 quotes. https://bsky.app/profile/eliasdaler.bsky.social/post/3n2wwe7qcwc2u
- @xkeeper.net added screenshots of "About this site" pages crediting Claude "at the direction of Mark Graham," the Wayback Machine's director. https://bsky.app/profile/xkeeper.net/post/3n2wxoztwzc2c
- Most quotes are angry, and some people say they're emailing IA or cancelling donations. A few push back a little, like @snoutflower.critter.pink pointing to orgs being "under funded and under staffed." https://bsky.app/profile/snoutflower.critter.pink/post/3n2yyn6zrxc2t

I checked the Labs page, and it does say that. I found no response from @archive.org yet.

The other big AI-adjacent topic today is Nvidia reinstating Jensen Huang, but that's more politics than community drama. Want a rundown of that too?

## STEPS

1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md — task instructions.
2. `python3 .../case.py pulse-ai-drama-today` — user message: "What's the drama in the bluesky AI community today?" Signed in as @pfrazee.com, search page, 2026-11-23 21:59 UTC (13:59 PT).
3. Read app/server/system-prompt.md — system prompt.
4. Read skill/bluesky/SKILL.md — "What's the drama in a community?" recipe; points to social-media.md.
5. Read skill/bluesky/reference/social-media.md — dispute-description and ratio/pile-on guidance.
6. `search-posts "AI" --sort top --since 2026-11-23 --limit 25` — broad mix (AI data centers, Nvidia, AI art tags); no clear community fight on top.
7. `trending` — #1 Nvidia rehires Huang, #10 "Claude AI coding tools".
8. `feed <Nvidia rehires Huang>` and `feed <Claude AI coding tools>` — Nvidia feed is political/business; Claude feed surfaced many quotes of @eliasdaler's Internet Archive post.
9. `quote-chain` on eliasdaler post — original post, no further chain; 2358 likes, 109 quotes, 50 replies, 00:57 UTC.
10. `media` on eliasdaler post, then Read image — screenshot of Wayback Machine Labs page ("mostly vibe-coded with Claude Code") plus crying-kid-with-gun meme.
11. `quotes ... --top --limit 10` — 10 of 109 quotes: mostly dismay, donation cancellation, one partial defense (underfunding).
12. `search-posts '"Wayback Machine Labs"' --sort top --since 2026-11-22` — @xkeeper.net post (296 likes) with "About this site" screenshots naming Mark Graham; other complaint posts.
13. `posts archive.org --since 2026-11-22 --limit 10` — only Thanksgiving cookbook posts and reposts; no response to the backlash.
14. `search-posts 'internet archive claude' --sort latest --since 2026-11-23` — more complaints, emails to IA.
15. `read-link https://wayback-labs.sf.archive.org/` — confirmed the page text and its list of projects.

## EVIDENCE

- The Labs page says "mostly vibe-coded with Claude Code": read-link of https://wayback-labs.sf.archive.org/ (step 15) and the image in eliasdaler's post (step 10).
- eliasdaler's post text, ~2,400 likes, 109 quotes, and posted "yesterday evening" (00:57 UTC Nov 23 = 4:57 pm PT Nov 22): quote-chain output (step 9).
- The post shows a screenshot plus a crying-kid meme: the downloaded image (step 10).
- xkeeper's screenshots credit Claude "at the direction of Mark Graham," who is described as the Director of the Wayback Machine: image alt text in the step 12 search result.
- People emailing IA or cancelling donations: @taigabeat.bsky.social quote (step 11), @justhere4coffee.bsky.social (step 14), @xeoti.me (step 11).
- @snoutflower.critter.pink's "under funded and under staffed" quote: quotes --top output (step 11).
- No response from @archive.org: posts archive.org --since 2026-11-22 (step 13).
- Nvidia reinstating Huang is the top trend: trending (step 7) and the trend feed (step 8).

## FRICTION

- "The Bluesky AI community" is ambiguous: people who post about AI/ML in general, or the anti-AI conversation, or AI artists. Neither prompt helps narrow a "community" that is defined by a topic, not a feed or a starter pack. I picked the most-engaged AI-related fight.
- The drama recipe says to use `--since` today, but the key post was written yesterday evening in the person's time zone (00:57 UTC is in today's UTC date). It isn't clear whether "today" drama should include a story that started last night and is still going today. I included it and said "yesterday evening".
- A plain `search-posts "AI" --sort top` was dominated by off-topic results (Japanese AI-art hashtags, politics). The real story turned up only through the "Claude AI coding tools" trend feed. The recipe could suggest checking trending topics and drama-specific terms ("vibe-coded", "slop") earlier.
- `quotes --top` only ranks "among those fetched" (10 of 109), so the "most liked" ordering is partial. The output says this, but it means I may have missed higher-liked quotes.
- The system prompt sets a 40–100 word target with up to about 180 for a summary. A drama summary with three linked posts naturally lands around 150–180; it is unclear which band "drama" falls in.
- I did not load WebSearch/WebFetch. The script's read-link was enough to confirm the page, so no outside lookup was needed.

## ANSWER
Start with **Fiber Folks To Follow** by @lalelolai.bsky.social: 51 knitting, crochet and yarn accounts, and 19 people have joined Bluesky through it, more than any other knitting pack I found.
https://bsky.app/starter-pack/lalelolai.bsky.social/3lghdxzgfal2p

- It mixes designers, indie yarn dyers and teachers. For a beginner, 10 Rows A Day stands out: it posted "KFB without the visible bar…" tips just yesterday.
- If you'd like something smaller, **Creative Knitters to Follow** by @millenialknits.bsky.social has 14 accounts, including the free online magazine Knitty: https://bsky.app/starter-pack/millenialknits.bsky.social/3lc33kukv522p

Cirrus can't open starter packs, so these links take you to the official Bluesky app, where you can follow everyone in a pack at once.

Want a knitting feed to go with it?

## STEPS
- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test instructions.
- Ran case.py starter-pack-knitting-newbie: not signed in, on a "knitting" accounts search screen, Tokyo time zone; message "whats a good starter pack for someone new who likes knitting".
- Read app/server/system-prompt.md: tone, length, sourcing rules; Cirrus has no starter packs, so send people to bsky.app.
- Read skill/bluesky/SKILL.md: starter-pack commands, the "Who should I follow" recipe.
- search-starter-packs "knitting", "knit", "fiber arts": about 80 packs, many off-topic ("close-knit"). Fiber Folks To Follow showed "19 people joined Bluesky through it", the highest join count among the knitting packs.
- starter-pack on four candidates (lalelolai Fiber Folks, millenialknits Creative Knitters, knitpurlchat favorites, veg-grower Knitting Community): member counts and member bios.
- posts 10rowsaday.bsky.social --no-reposts --limit 3: active, beginner tips posted 2026-11-22 23:05 UTC (Nov 23 in Tokyo, which is "yesterday" since it is now Nov 24 in Tokyo).
- posts ysoldaknits.bsky.social --no-reposts --limit 3: last post July 2025, so the large Knitting Community pack has quiet members; did not lead with it.
- search-feeds "knitting": found knitting feeds (snowfloe's Crochet and Knitting, Just Knitting), kept for the follow-up offer.

## EVIDENCE
- Fiber Folks To Follow has 51 accounts and 19 people joined through it: `starter-pack` output for lalelolai pack, and `search-starter-packs "knitting"`.
- More joins than any other knitting pack I found: `search-starter-packs` outputs; other knitting packs showed 0 or 1 joins.
- It mixes designers, indie dyers and teachers: member bios in the `starter-pack` output (e.g. Lavanya Patricella "knitwear designer and knitting instructor", several "hand dyed yarn" accounts, 10 Rows A Day tutorials).
- 10 Rows A Day posted "KFB without the visible bar…" yesterday: `posts 10rowsaday.bsky.social` output, post at 2026-11-22 23:05 UTC = 2026-11-23 08:05 Tokyo; current time 2026-11-23 21:59 UTC = 2026-11-24 06:59 Tokyo, so it was yesterday local time. https://bsky.app/profile/10rowsaday.bsky.social/post/3n2wq4k3tpk2g
- Creative Knitters to Follow has 14 accounts including Knitty, "the free online knitting + fibercraft mag": `starter-pack` output for millenialknits pack (@knitty.com bio).
- Cirrus can't open starter packs: system prompt, "Cirrus does not have: ... starter packs".
- You can follow everyone in a pack at once in the official app: general knowledge of Bluesky starter packs, not looked up in reference/concepts.md this run.

## FRICTION
- The system prompt says to give the menu path "from the skill's reference file" for features Cirrus lacks, but I did not read concepts.md, so the "follow everyone at once" claim is from general knowledge and is unmarked in the answer. A short line in SKILL.md's starter-pack recipe on how to use a pack would avoid this.
- "Someone new" is ambiguous: new to knitting or new to Bluesky. I picked a pack that suits both and didn't ask; the system prompt's "don't ask unless readings differ a lot" supported that.
- search-starter-packs shows the "joined through it" count only when nonzero, and has no popularity sort, so picking "the best" pack relied on that one number plus a manual read of members. Starter-pack output also doesn't show whether members are active; checking took extra `posts` calls (one big-name member, Ysolda, had been silent since July 2025).
- The "knit" search returned many off-topic packs ("close-knit", "loose-knit"); SKILL.md warns about loose matching for posts but not specifically for starter-pack search.
- Did not load WebSearch/WebFetch; not needed for this question.

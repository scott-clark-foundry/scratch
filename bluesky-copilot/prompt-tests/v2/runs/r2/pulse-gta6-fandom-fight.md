## ANSWER
Mostly it's the "GTA VI is woke" backlash, and on Bluesky it's less a fight than people laughing at it. Since the game came out on Nov 19, some right-wing streamers have complained that it rewards Jason for being a thoughtful boyfriend to Lucia (flowers, groceries, chores). WIRED's story on that is the biggest post I found, with about 3,700 likes and 438 quotes: https://bsky.app/profile/wired.com/post/3n2p76bbql42d

The game's "Lucia will appreciate this" prompt has turned into a meme here, and people are passing around a generator for it: https://bsky.app/profile/bafriedman.bsky.social/post/3n2wxpdpvek26

The smaller argument is about Rockstar itself and the union members it fired. One popular take: "rockstar is a union busting company … while also acknowledging that gta vi … is shockingly very woke and inclusive": https://bsky.app/profile/alabasterffxiv.bsky.social/post/3n2tk43nazk22

Want me to dig into the union story?

## STEPS
- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test brief.
- Ran case.py pulse-gta6-fandom-fight: not signed in, on the "Grand Theft Auto VI release" trending feed, question "why is everyone fighting about gta 6 on here".
- Read app/server/system-prompt.md: system prompt.
- Read skill/bluesky/SKILL.md: picked the "What's the drama in a community?" recipe.
- Read skill/bluesky/reference/social-media.md (SKILL.md says to read it before community drama): rules for describing a dispute fairly.
- `feed <on-screen feed> --limit 25`: 25 GTA VI posts from Nov 23, mostly jokes; pointers to "woke"/Lucia complaints (chescaleigh, bucksarchives), the Amodei/WSJ games story, Rockstar union busting (Adam Conover).
- `trending`: "Grand Theft Auto VI release" is topic 5; no other GTA-related dispute topic.
- `search-posts '"GTA VI" woke' --sort top --since 2026-11-20`: many posts mocking the "woke" complaints; biggest bloomfilters.plus (2,775 likes, 16 quotes), jessehawken (682 likes, 36 quotes, about JD Vance's GTA graphic).
- `search-posts 'Lucia appreciate GTA' --sort top --since 2026-11-20`: "Lucia will appreciate this" meme posts; bafriedman's luciameme.com generator post with 85 quotes.
- `search-posts 'GTA 6 Amodei' --sort top --since 2026-11-20`: only 4 low-engagement posts; dropped as a candidate.
- `search-posts 'GTA VI' --sort latest --limit 25`: newest posts at ~22:45 UTC; casual chatter, no new flare-up.
- `search-posts 'Rockstar union GTA' --sort top --since 2026-11-20`: union-busting posts (alabasterffxiv 385 likes, damselindystopia 377 likes with Eurogamer tribunal link, "Rockstar 31" crowdfunder, IWGB letter).
- `search-posts '"boyfriend simulator"' --sort top --since 2026-11-19`: jokes about the boyfriend angle; led to WIRED's post.
- `quotes <jessehawken post> --top --limit 6`: quotes are about JD Vance politics, not the game itself; a side thread.
- `post <WIRED post>`: 3,705 likes, 610 reposts, 115 replies, 438 quotes, 2026-11-19 23:14 UTC; link "Dudes Online Are So Mad That 'GTA VI' Makes Them Respect Women".
- `read-link https://buff.ly/kD9Y5SR`: WIRED article by Miles Klee, Nov 19; describes right-wing streamers calling the game "woke slop"/"cuck simulator" over optional boyfriend missions (flowers, groceries, chores) and says it was release day.

## EVIDENCE
- The main argument is the "GTA VI is woke" backlash, mostly mocked on Bluesky: search-posts '"GTA VI" woke' and '"boyfriend simulator"' results (nearly all top posts mock the complaint); WIRED post was the highest-engagement post found.
- Game came out Nov 19: WIRED article (published 2026-11-19) says "the day of its official release".
- Right-wing streamers complained it rewards being a thoughtful boyfriend to Lucia (flowers, groceries, chores): WIRED post text and article text via read-link.
- WIRED post about 3,700 likes and 438 quotes: `post` output (3705 likes, 438 quotes).
- "Lucia will appreciate this" meme and generator: search-posts 'Lucia appreciate GTA' results; bafriedman post (luciameme.com, 85 quotes).
- Smaller argument about Rockstar and fired union members: search-posts 'Rockstar union GTA' (Eurogamer tribunal link, "Support the Rockstar 31" crowdfunder, IWGB "unfairly fired union members" link).
- The alabasterffxiv quote: exact text from search-posts 'Rockstar union GTA' output, 385 likes.

## FRICTION
- The drama recipe says to compare candidates by quote and reply counts, but the biggest posts on the "woke" theme are spread over many small posts plus one large WIRED post; there is no single thread that "is" the fight. I judged it the largest by combining the WIRED post's numbers with the volume of posts, which is a judgment call.
- The actual complaints mostly happened off Bluesky (X, streams). On Bluesky I found almost no one defending the "woke" complaint, so "fighting" is mostly one side mocking an absent other side. The recipe does not say how to present a dispute where only one side is visible on the network.
- The union story's current status (tribunal verdict) I did not check beyond a Nov 20 Eurogamer link card title, so I left the status out of the answer.
- Web search/fetch were not loaded; the script's read-link covered the one article I needed.
- Length: the system prompt allows about 150 words for a dispute; the answer is around 140 including links, close to the limit.

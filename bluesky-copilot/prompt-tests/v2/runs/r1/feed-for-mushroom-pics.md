## ANSWER
Yep, **Fungi Friends** by @goose.art is the big one (about 2,000 likes), made for mushroom photos and fungi art: https://bsky.app/profile/goose.art/feed/aaaf2pqeodmpy

It's lively right now. The newest post, from about 10 minutes ago, is yellowleg bonnets in moss: "the forest’s cute little lampshades." https://bsky.app/profile/nuiipointer.bsky.social/post/3n2z4ck6u6k23

A smaller pick: **MushroomSky** (photos, recipes, foraging chat), also posting today: https://bsky.app/profile/harkthorn.bsky.social/feed/aaad27w3hjyrg

Want your own pics to show up in Fungi Friends? Add 🍄📷 or #fungifriends to the post.

## STEPS
1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: test instructions.
2. Ran `python3 .../case.py feed-for-mushroom-pics`: signed in as @pfrazee.com, on Discover, 2026-11-23 21:59 UTC (America/Chicago); message "is there a feed for mushroom pics".
3. Read app/server/system-prompt.md: persona, length, sourcing rules.
4. Read skill/bluesky/SKILL.md: "Recommend feeds" recipe (search-feeds with 2-3 wordings, then `feed REF --limit 3` on top candidates).
5. `bsky.py search-feeds "mushroom"`: MushroomSky (79 likes), Mycology and Fungi (136), Mushrooms (61), many strays (VTubers, novels, Mario, murders).
6. `bsky.py search-feeds "fungi"`: Fungi Friends by @goose.art (2031 likes), Nature Photography (573), Moss Fungi Trees (46), others.
7. `bsky.py search-feeds "mycology"`: mostly same feeds plus small science feeds.
8. `bsky.py feed` --limit 3 on Fungi Friends, MushroomSky, and Mycology and Fungi: Fungi Friends has a pinned PSA then mushroom photos from 21:49 and 21:16 UTC today; MushroomSky has mushroom photo posts from 18:55-19:09 UTC today; Mycology and Fungi is more mixed (a D&D commission, a political-sounding quote post), so I left it out.

## EVIDENCE
- Fungi Friends by @goose.art, about 2,000 likes: search-feeds "fungi" output ("likes 2031").
- Made for mushroom photos and fungi art: pinned PSA in `feed` output ("designed for sharing pictures of mushrooms or artwork surrounding fungi").
- Newest post ~10 minutes ago, yellowleg bonnets, quote: `feed` output for Fungi Friends, @nuiipointer.bsky.social at 2026-11-23 21:49 UTC vs current time 21:59 UTC.
- MushroomSky covers photos, recipes, foraging chat: search-feeds "mushroom" description.
- MushroomSky posting today: `feed` output, posts at 18:55-19:09 UTC on 2026-11-23 (12:55-1:09 pm Chicago).
- Add 🍄📷 or #fungifriends to be included: Fungi Friends description in search-feeds "fungi" output.

## FRICTION
- Did not load web search/fetch; not needed for this question.
- The Fungi Friends feed shows the pinned 2025 PSA as its first item, so `feed --limit 3` gave only two real recent posts; minor.
- Like count is the only popularity signal; SKILL.md says it does not show activity, which is why I checked with `feed`. No guidance on how many feeds to recommend for a simple "is there a feed" question; I chose two.
- The system prompt says Cirrus cannot save/pin feeds; I left that out to keep the answer short, but it is a judgment call whether the person needs to know that to use the feed.

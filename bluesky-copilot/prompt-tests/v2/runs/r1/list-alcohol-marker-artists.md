## ANSWER

Here's a starter set of artists who are actively posting alcohol-marker work right now:

- **@dmacalvert.bsky.social**: polished Copic sketch covers and Star Wars pieces, often with the markers in frame. https://bsky.app/profile/dmacalvert.bsky.social/post/3n2rbwyunks2j
- **@jackiekaiju.bsky.social**: kaiju in "micron pens and copic markers", a new one almost daily. https://bsky.app/profile/jackiekaiju.bsky.social/post/3n2u4axzmtk2p
- **@harmfulplant.bsky.social**: loose, lively sketchbook pages in "alcohol markers and fineliner pen". https://bsky.app/profile/harmfulplant.bsky.social/post/3n2ry37kodk2o
- **@dailen.bsky.social**: a unicorn sketchbook spread in "alcohol markers + acrylic pens". https://bsky.app/profile/dailen.bsky.social/post/3n2ufqxr5z22s
- **@kuwagoarts.bsky.social**: FFXIV and Kingdom Hearts fan art in ink and alcohol markers. Heads up, their bio says they post both SFW and NSFW. https://bsky.app/profile/kuwagoarts.bsky.social/post/3n2mvpjushs27
- **@holobunny.bsky.social**: small Ohuhu ACEO cards, posted every week. https://bsky.app/profile/holobunny.bsky.social/post/3n2qyz3ybm22s

Cirrus can't make lists, so you'll need the official app at https://bsky.app. Open Lists from the main menu, tap "New list", choose "User list", then search for each account and add it (button names may differ slightly). Lists are public, and people can see when they've been added.

Want me to find a few more?

## STEPS

1. Read answer-brief.md: setup and report format.
2. Ran case.py list-alcohol-marker-artists: signed in as @pfrazee.com, on the search screen for "alcohol markers" (latest), asking for help building a list.
3. Read app/server/system-prompt.md: the persona, the length rules, and that list creation isn't in Cirrus (send people to bsky.app).
4. Read skill/bluesky/SKILL.md: the "Help me build a list" recipe.
5. Grep for "list" in reference/concepts.md: the menu path for creating a list and the note that lists are public.
6. search-posts "alcohol markers" --sort latest, then --sort top (40 each): candidates dailen, harmfulplant, kuwagoarts, sharonjohnston, soturisi, ultimangga and others, plus a lot of noise (deal and ad bots, people talking about buying markers).
7. search-posts copic --tag copicart --sort top: mostly older posts and one hashtag-heavy account. Not much use.
8. search-starter-packs "copic": no results. search-starter-packs "traditional art": general traditional-art packs, none specific to markers.
9. search-users "copic markers": ranefea, astera-art, erinnichollsart, nerimitsu, sushidog and copicofficial.
10. profile plus posts (--no-reposts, 4 each) for 10 candidates. erinnichollsart, nerimitsu and sushidog are inactive (last posts in 2024 or 2025). astera-art posts photography now. copicofficial has 0 posts. dailen, harmfulplant, kuwagoarts, ultimangga and ranefea are active.
11. search-posts "copic" --sort top --since 2026-10-15: dmacalvert, jackiekaiju, cassiopeia7, theartofmathew, nuuve-cle and others.
12. search-posts "ohuhu" --sort top --since 2026-10-15: holobunny (weekly Ohuhu ACEOs) and riversong28.
13. profile for jackiekaiju, dmacalvert, cassiopeia7, theartofmathew and holobunny: confirmed bios and follower counts. search-posts copic --author dmacalvert: their alt text names Copic markers in several recent posts.
14. media on posts by harmfulplant, jackiekaiju and ranefea, then opened the three images. harmfulplant: a marker sketchbook page. jackiekaiju: a vivid marker Godzilla. ranefea: the October piece is ink only, so I dropped them.

## EVIDENCE

- dmacalvert posts Copic work: search-posts copic --author dmacalvert. The alt text says "To the left are two Copic markers" (Kit Fisto, 2026-11-20) and similar on the Iron Man and hell pig posts.
- jackiekaiju posts kaiju in "micron pens and copic markers", almost daily: search-posts "copic" --since 2026-10-15 showed posts on Nov 18, 19, 20 and 21. The image was checked with media.
- harmfulplant posts "alcohol markers and fineliner pen": the top search post from 2026-11-21. The image was checked with media (a marker sketchbook page). A Nov 18 post also says "Alcohol markers, colored pencils, and fineliner pens".
- dailen's unicorn is "alcohol markers + acrylic pens": the search result post from 2026-11-22. Alt text: "Sketchbook spread of a unicorn…".
- kuwagoarts works in ink and alcohol markers and posts SFW and NSFW: the alt text on post 3n2mvpjushs27 ("made with ink and alcohol markers") and their profile bio ("sfw / nsfw").
- holobunny posts weekly Ohuhu ACEOs: search-posts "ohuhu" (#ohuhu #aceo on Nov 18, 20, 21 and 22, and "This week's cards are up on ebay now! Keepin the schedule"). Their profile bio says "traditional artist". Images were not checked.
- Cirrus can't create lists: the system prompt's list of things Cirrus does not have.
- The steps for creating a list and the note that lists are public: reference/concepts.md, lines 54–56 (marked **Check**).

## FRICTION

- The phrase "inspiration posters" is a little ambiguous. It could mean artists who post alcohol-marker art, or curator and reference accounts. I read it as artists and didn't ask.
- Searching for the medium is noisy. Results mix deal and affiliate bots, news-brief bots, and people chatting about buying markers. The recipe says to filter out strays but gives no tips for art niches (for example, searching alt text, or checking that a medium is named in the post).
- Hashtag search (--tag copicart) brought up mostly old posts and one account that spams hashtags. There's no option to sort a tag search by recent engagement.
- The recipe suggests running `user-lists` on a well-known account in the niche. The obvious one (copicofficial) has 0 posts, and I found no clear list curator, so I skipped it.
- Several accounts found with search-users (erinnichollsart, nerimitsu, sushidog) look like good matches by bio but have been inactive since 2024 or 2025. The recipe's "confirm they are active" step caught this, but search-users alone would have misled.
- The recipe says to confirm with `media`. I checked three accounts and relied on the author's alt text and post text for the rest. It isn't clear how many accounts need a visual check.
- The posts command printed "(4 items shown … from 99 fetched…)". It's unclear why it fetches about 100 to show 4 when filters are applied. That isn't harmful, just surprising.
- The system prompt says to use web search and fetch only when the answer lies outside Bluesky, so I didn't use them (I didn't need to load them).
- Some candidates post adult content (twink-tank18, peenonpaper, hornifaedraws, mitsi). Nothing says how to handle NSFW accounts in recommendations. I left them out, except kuwagoarts, where I added a note.

## ANSWER
I've set up a starter list of six artists who've posted alcohol-marker work in the past week:

- @dmacalvert.bsky.social: Copic sketch covers and creatures, 8.5k followers (also posts general chat)
- @elloerin.bsky.social: daily sketchbook doodles, colored in alcohol markers
- @jackiekaiju.bsky.social: micron + Copic kaiju and monsters
- @holobunny.bsky.social: Ohuhu ACEO trading cards, new ones weekly
- @quirkycryptid.bsky.social: creature drawings, like this flamingo https://bsky.app/profile/quirkycryptid.bsky.social/post/3n2xcjmkpos2o (bio says some 18+ content)
- @ariartaccount.bsky.social: mechs and robots in pen and gray Copics

Example of the kind of work: Erin's witch https://bsky.app/profile/elloerin.bsky.social/post/3n2uutleots2v

The list is ready to review. Want me to find more, say anime-style or ACEO artists?

TOOL CALL (made before the text above): propose_list (see STEPS)

## STEPS
1. Read answer brief, ran case.py: signed in as @pfrazee.com, screen is "alcohol markers" latest search; request: build a list for alcohol marker inspiration posters.
2. Read system-prompt.md and skill SKILL.md (list recipe).
3. `search-posts "alcohol markers" --sort latest --limit 40`: 29 posts; mix of artists, deal/spam bots, gear chat; candidates incl. dailen, quirkycryptid, greyliliy, sharonjohnston.
4. `search-posts "#copicart" --sort top` and `"#alcoholmarkers" --sort top`: nefly90, hantgreat, elloerin, avocadoarts, raerae2344, knightyknight17, kylepeterart, tsalagipenzreturns (18+), etc.
5. `search-starter-packs "copic"` (none), `"markers"` (found "Marker Artists" by dasfabelwesen, 2024); `search-users "alcohol markers"`, `search-users "copic artist"`: bios mentioning alcohol markers (rubypetal, frankymingo, stacie-draws, annairart, loosetangentarts...).
6. `starter-pack` Marker Artists: 13 accounts, mostly mixed-medium artists, includes dmacalvert.
7. `profile` on 14 candidates: rubypetal, frankymingo, stacie-draws, annairart, loosetangentarts last posted months ago (dropped); avocadoarts NSFW + hides from logged-out (dropped); evanrank tiny/digital.
8. `search-posts "copic" --sort top --since 2026-10-15` and `"ohuhu"`: dmacalvert, jackiekaiju, ariartaccount, cassiopeia7, holobunny, riversong28, theartofmathew, penbee.art.
9. `profile` on 8 more: all active within days; cassiopeia7 hides from logged-out (dropped).
10. `posts` on dailen, kylepeterart, elloerin, dmacalvert: kylepeterart mostly digital/mixed (dropped); dailen posts rarely, mostly tattoos (dropped); elloerin daily doodles; dmacalvert mixes Copic art with general posts.
11. `media` on elloerin witch post, jackiekaiju Shin Godzilla, holobunny mermaid; opened 4 images: confirmed marker-colored witch, marker Godzilla, marker ACEO card.
12. TOOL CALL: propose_list {"name": "Alcohol Marker Inspiration", "description": "Artists posting alcohol marker (Copic, Ohuhu, etc.) work", "accounts": ["dmacalvert.bsky.social", "elloerin.bsky.social", "jackiekaiju.bsky.social", "holobunny.bsky.social", "quirkycryptid.bsky.social", "ariartaccount.bsky.social"]} -> "Shown to the person as a card with a button. Nothing has been published."

## EVIDENCE
- dmacalvert posts Copic work: alt text on posts 3n2z3tccrbc2k (Iron Man, 2026-11-23), 3n2rbwyunks2j, 3n2mihzzkrc2d ("marker drawing ... two Copic markers"); 8504 followers from `profile`; general/political posts from `posts`.
- elloerin daily doodles colored in alcohol markers: post 3n2uutleots2v (#AlcoholMarkers) and image1 viewed; `posts` shows daily doodle prompts.
- jackiekaiju micron + Copic kaiju: post texts 3n2mlz3wg7k2b, 3n2p2xgjar22h, etc.; image viewed.
- holobunny Ohuhu ACEO weekly: posts tagged #ohuhu #aceo, "This week's cards are up on ebay now! Keepin the schedule" (3n2whzodr7k26); image viewed.
- quirkycryptid flamingo in alcohol markers: alt text of 3n2xcjmkpos2o; "18+ Content Sometimes" from bio (`profile`).
- ariartaccount pen + gray Copic mechs: alt text of 3n2wm2dspds2h, 3n2tux7htxs2x; bio "I draw mech, robots, and BIONICLE".
- "posted in the past week": latest post dates from `profile` (all 2026-11-22 or 23) and the marker posts dated 2026-11-17 to 11-23.

## FRICTION
- No web search/fetch used or needed; did not load them.
- The propose_list input schema is not described anywhere (fields name/description/accounts guessed).
- System prompt says "After calling either, say in one short sentence that the draft is ready to review. Do not repeat its contents," while SKILL.md's list recipe says "Give a starter set of five to eight accounts with a few words on each." These conflict; I listed the accounts with short notes since the person needs to know why each fits, which repeats the card contents.
- "Inspiration posters" is ambiguous (people who post inspiration vs. accounts posting reference/inspiration); I read it as artists who post alcohol-marker art.
- The starter-pack search on "markers" matched mostly unrelated packs (financial, Markers for Democracy); the one relevant pack was from 2024 and mostly mixed-medium artists.
- No guidance on whether to exclude NSFW-flagged accounts from a list; I dropped clearly 18+/NSFW ones and flagged one with "sometimes 18+".
- Unclear whether to exclude the signed-in person's screen context results vs. broaden; did both.

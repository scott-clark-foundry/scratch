## ANSWER

It's a map of Ukrainian drone strikes on Russian-linked ships in the Mediterranean, mostly off Libya, from December 2025 to 22 November 2026. It was made by Clément Molin and shared by @maks23.bsky.social: https://bsky.app/profile/maks23.bsky.social/post/3n2whnphrqc2d

How to read it:
- **Orange stars** are strikes, each with a date and ship name. They include the tanker Qendil (Dec 2025), the LNG carrier Arctic Metagaz (Mar 2026), the Lady Mariia (Sep 2026) and, most recently, the corvette Merkuriy in Benghazi port (21–22 Nov 2026).
- **Blue arrows** run from Misrata in western Libya. The map labels that an *alleged* Ukrainian drone base, citing Russian sources. The arrows are schematic, not real flight paths.
- **Coloured land** shows who controls Libya: yellow is the Tripoli government, red is Haftar's forces in the east, where Russia has bases.

The Arctic Metagaz strike was widely reported: Russia blamed Ukrainian sea drones (AP: https://www.wsls.com/business/2026/03/04/russia-blames-ukrainian-sea-drones-for-attacking-tanker-that-sank-in-the-mediterranean/). I couldn't find outside reporting on the Benghazi strike yet.

Want me to check any of the other strikes?

## STEPS

- Read answer-brief.md: task instructions.
- Ran case.py map-mediterranean-ship-strikes: user on thread by @maks23.bsky.social, asks "can you explain this map? what am i looking at".
- Read app/server/system-prompt.md: system prompt.
- Read skill/bluesky/SKILL.md: recipes; "what is in this picture" -> media.
- `python3 scripts/bsky.py thread https://bsky.app/profile/maks23.bsky.social/post/3n2whnphrqc2d`: post text "A map of attacks on Russian ships in the Mediterranean, compiled by @clementmolin.bsky.social", image without alt text, 248 likes, 4 replies (one speculating about Misrata base).
- `python3 scripts/bsky.py media <same URL>`: saved /tmp/bsky-media-g020fya4/image1.jpg, no alt text.
- Read /tmp/bsky-media-g020fya4/image1.jpg: the map, title "Ukraine's Mediterranean front – @clement_molin", legend, strike labels, sources line (SBU, Naval News, Maritime Executive, Lloyd's List, RFI, AP...).
- ToolSearch select:WebSearch,WebFetch: loaded web tools.
- WebSearch "Ukraine naval drones Benghazi Russian corvette Merkuriy November 2026": no Merkuriy coverage; found Arctic Metagaz coverage (Maritime Executive) and April 2026 tanker attack from Libya.
- WebSearch "Benghazi port naval drone attack Russian ship": no Benghazi port attack found; AP coverage of Arctic Metagaz (March 2026) with Russia blaming Ukrainian sea drones launched from Libya.

## EVIDENCE

- Map shows Ukrainian drone strikes on Russian-linked vessels, Dec 2025–22 Nov 2026: map subtitle in image1.jpg.
- Made by Clément Molin, shared by @maks23: post text from `thread` ("compiled by @clementmolin.bsky.social") and map title "@clement_molin".
- Strike names and dates (Qendil 19 Dec 2025, Arctic Metagaz 3 Mar 2026, Lady Mariia 6 Sep 2026, Merkuriy 21–22 Nov 2026 in Benghazi port): labels in image1.jpg.
- Misrata as alleged Ukrainian drone base per Russian sources: legend "Alleged Ukrainian drone base (RFI, Russian sources)" and diamond at Misrata in image1.jpg.
- Arrows are schematic: legend "Schematic direction from western Libya" in image1.jpg.
- Yellow = Tripoli government, red = Haftar's LNA, Russian bases in the east: legend and subtitle ("Russia's Africa Corps and navy rely on Haftar's LNA") in image1.jpg.
- Russia blamed Ukrainian sea drones for Arctic Metagaz: second WebSearch, AP story syndicated at wsls.com (2026-03-04).
- No outside reporting found on Benghazi/Merkuriy strike: both WebSearch results.

## FRICTION

- The map also lists a 22 Nov 2026 "Shadow-fleet ship ASCALON (reported)" strike near Benghazi; I left it out for length. No guidance on how many map items to enumerate when explaining a dense infographic.
- The `thread` footer says "You have read 5 of this post's 4 direct replies" which reads oddly (it counts a level-2 reply too).
- Couldn't verify the most recent (Benghazi) strike with two web searches; unclear how much verification an "explain this map" question warrants versus an "is this real?" one. I mentioned it briefly.
- The map's own sources line is too small to read fully in the image; only partially legible.
- Did not look up @clementmolin.bsky.social's profile; linked the post only per the "a link to someone's post is enough" rule, but the map's author is a different account than the poster, so whether to link the compiler's profile was a judgment call.

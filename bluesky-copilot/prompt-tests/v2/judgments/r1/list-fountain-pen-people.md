## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
useful-in-a-side-panel: PASS

## CRITIQUE
The person, who is not signed in and is looking at search results for "fountain pen", asked for help putting together a list of fountain pen and ink people, mainly reviewers and people who post ink swatches (small samples of an ink's colour on paper). The answer opens straight away with seven accounts, each with one line on what it posts and a link, then points to a ready-made starter pack (a curated set of accounts), then says plainly that the copilot cannot create the list and where to do it. It is about 190 words and every account is linked, so it works in a narrow panel.

I re-fetched all six linked posts, all seven profiles with their latest posts, and the starter pack. Every description held up. Brad Dowdy's post is titled "Swatching My 2026 SFPS Ink Haul" exactly as quoted, and he posted an ink review on 2026-11-20. The Well-Appointed Desk post is an ink review (Kobe Hummingbird) and the account posted today. Mike (inkdependence) links a YouTube ink review and posted on 2026-11-22. Garry Eves's bio says "Fountain pen YouTuber" and he posts a pen and ink pairing nearly every day (19 to 23 November all present). Vicki's linked post is an ink swatch whose alt text names Tomoe River paper. Toga's post offers scans and chromatography of the Diamine Inkvent set, and the profile carries the bridged-from-Mastodon label. Kyris's posts do show characters painted in fountain pen ink with the inks named. The starter pack has 29 accounts.

Three small weaknesses, none serious enough to fail a check. First, "has 29 more" is loose: five of the seven recommended accounts (penaddict, wellappointeddesk, garryeves, inkdependence, glasshorns) are already in that pack, so it adds about 24 new ones; the pack does have 29 accounts in total. Second, Kyris is mainly a Guild Wars 2 fan-fiction and art account (5,035 posts, bio mentions occasional tagged NSFW art) whose last clear ink post was 2026-10-16; the one-line description is accurate, but the answer does not warn that most of that account's posts are off-topic, and it is the weakest fit for "reviewers and swatchers". Vicki's last pen post was 2026-10-28, so "recently" is a little generous for those two. Third, the answer does not mention that the person must sign in before making a list; the instruction to use the official app covers this in practice, and the copilot sensibly hedged that button names may differ. The answer also left out established swatch accounts that had gone quiet, which was the right call.

## WHAT-I-VERIFIED
- `case.py list-fountain-pen-people --with-grounding`: read the question and the scout's facts.
- `bsky.py post` on the six linked posts (penaddict, wellappointeddesk, inkdependence, glasshorns, toga, akoniwolfsbane): all exist; titles, text and alt text match the answer's descriptions.
- `bsky.py profile` and `posts --no-reposts --limit 5` for all seven accounts: bios and latest post dates confirmed (penaddict and wellappointeddesk 2026-11-23, inkdependence 2026-11-22, garryeves daily to 2026-11-23, glasshorns 2026-10-28, toga 2026-11-17, akoniwolfsbane active daily but mostly Guild Wars 2 content).
- `bsky.py post` on akoniwolfsbane posts 3mwo74wbmgc2s and 3mxykmzzgxk2d: character paintings in fountain pen ink with inks named, dated 2026-09-29 and 2026-10-16.
- `bsky.py starter-pack` on Fountain Pen Network: 29 accounts, created 2025-03-13; five of the seven recommended accounts are members.
- `bsky.py read-link` on the Pen Addict swatching article: page exists with that title.
- `bsky.py read-link` on swatches.stationeryvagaries.com/inkvent-burgundy: page summary reads "Ink swatch and chromatography scans of the 2026 Diamine Inkvent Burgundy set."

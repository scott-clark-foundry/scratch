## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: N/A
calibrated: PASS
fair-and-safe: PASS
useful-in-a-side-panel: PASS

## CRITIQUE
The person was looking at a race-result post from @f1tv.bsky.social (a highlights account) and asked who to follow for Formula 1 news, stressing they wanted working journalists and not highlight accounts. The answer opens straight away with four named reporters, each with an outlet, a one-line reason to follow and a link, then offers one curated starter pack (a ready-made list of accounts to follow) and a short follow-up question. It is about 120 words, so it fits a side panel well.

I checked every claim against the live network and all held. Andrew Benson's bio reads "I am BBC Sport's Formula 1 correspondent", and he posted BBC pieces on 2026-11-22 about the Las Vegas race and the Hamilton-Leclerc collision. Chris Medland's bio lists Racer and SiriusXM, the quoted "CONFIRMED: Rafael Camara will see out the season with Haas" is the exact opening of his post at the linked address, and his other posts that day were stewards' decisions (Hadjar's penalty, Piastri's yellow-flag note). Madeline Coleman's bio says she covers F1 for The Athletic, and her two newest posts are sourced stories about the Cadillac team stake. Thomas Maher's bio says he is an editor at PlanetF1, and his recent posts are news items plus a long interview with George Kurtz. The starter pack is by the r/formula1 account, holds 27 accounts, and describes itself as "A verified list of F1 Journalists. No impersonations or mirrors." The answer also correctly left out accounts that have gone silent (for example Jon Noble), and it warns that some pack members are quiet, which is honest.

Small weaknesses, none enough to fail a check. "Posting actively right now" is a little generous for Coleman (last post 2026-11-14, nine days before the question) and Maher (2026-11-17). "No fan or mirror accounts" slightly reworks the pack's own wording ("No impersonations or mirrors"), and the 27 accounts include the r/formula1 account itself and a few broadcasters and statisticians, so "journalists-only" is the curator's claim more than a checked fact. "Fastest for stewards' calls" is a judgment, not something measured. The answer does not mention that @f1tv.bsky.social is an unofficial fan account, but the person did not ask about it and had already set such accounts aside. The focused post's image did not matter to the question, so the attachment check does not apply.

## WHAT-I-VERIFIED
- `case.py follow-f1-journalists-not-fan-account --with-grounding`: question, screen context and scout facts (Medland and Maher confirmed as active journalists; Jon Noble silent).
- `bsky.py profile andrewbensonf1.bsky.social` + `posts --no-reposts --limit 6`: BBC bio, blue check, about 102k followers; Vegas race report and Ferrari collision article posted 2026-11-22.
- `bsky.py profile chrismedlandf1.bsky.social` + `posts`: freelance bio naming Racer and SiriusXM; Camara "CONFIRMED" post at the linked address with matching text; stewards' posts on 2026-11-22.
- `bsky.py profile madelinecoleman.bsky.social` + `posts`: The Athletic bio, blue check; Cadillac stake stories on 2026-11-03 and 2026-11-14 (her newest post).
- `bsky.py profile thomasmaheronf1.bsky.social` + `posts`: PlanetF1 editor bio; news posts and the George Kurtz interview, newest 2026-11-17.
- `bsky.py starter-pack https://bsky.app/starter-pack/f1subreddit.bsky.social/3lbabvgf3je2w`: by @f1subreddit.bsky.social, 27 accounts, description "A verified list of F1 Journalists. No impersonations or mirrors."; all four recommended reporters are in it.

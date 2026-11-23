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
The person, not signed in and looking at account search results for "knitting", asked for a good starter pack (a curated set of accounts you can follow in one go) for a newcomer who likes knitting. The answer names one pack in its first sentence, "Fiber Folks To Follow" by @lalelolai.bsky.social, gives a reason, and offers a smaller second choice, all in about 110 words. I checked every factual claim against the live network and each held. The pack exists at the linked address, has 51 accounts, and shows "19 people joined Bluesky through it". The claim "more than any other knitting pack I found" is true of what I could find: across searches for "knitting", "knit" and "fiber arts", every other pack showed either no join count or 1. The description "designers, indie yarn dyers and teachers" matches the member bios (for example Brooklyn Tweed, several hand-dyed yarn sellers, and Patty Lyons, a knitting teacher). 10 Rows A Day is in the pack, its bio speaks to beginners, and its newest post begins exactly "KFB without the visible bar" and was posted 2026-11-22 23:05 UTC, which is the morning of Nov 23 in Tokyo; the person's clock reads the morning of Nov 24, so "just yesterday" is correct in their time zone. The second pack, "Creative Knitters to Follow", has 14 accounts and includes @knitty.com, whose bio calls it "the free online knitting + fibercraft mag". The answer avoided the trap in this case (a band called Knitting Circle whose pack lists other bands) and did not lead with the 147-account "Knitting Community" pack, which the copilot found to have quiet members. It was honest that its own app cannot open starter packs and pointed to the official Bluesky app rather than to a control that does not exist. Two small weaknesses, neither enough to fail a check: the 10 Rows A Day post is quoted but neither the post nor the account handle is linked, so the person cannot tap through to that one source (both pack links are given); and the answer does not mention that these packs date from late 2024 and early 2025, so some members have gone quiet (the pack's own curator last posted in July 2025, and Brooklyn Tweed shows no posts). The answer makes no claim that every member is active, so this is an omission, not an error.

## WHAT-I-VERIFIED
- `case.py starter-pack-knitting-newbie --with-grounding`: question, screen (not signed in, Tokyo time zone, current time 2026-11-23 21:59 UTC), and the scout's list of real packs plus the band trap.
- `bsky.py starter-pack` on the lalelolai link: "Fiber Folks To Follow", 51 accounts, 19 people joined through it, created 2025-01-24; members include 10 Rows A Day, Knitty, designers, dyers and teachers.
- `bsky.py starter-pack` on the millenialknits link: "Creative Knitters to Follow", 14 accounts, includes @knitty.com with the "free online knitting + fibercraft mag" bio.
- `bsky.py posts 10rowsaday.bsky.social --no-reposts --limit 4`: newest post 2026-11-22 23:05 UTC, text starts "KFB without the visible bar: knit the back loop first, then the front."; tagged #beginnerknitter; posts every day or two.
- `bsky.py search-starter-packs` for "knitting" (two pages), "knit" and "fiber arts": no other pack shows more than 1 join; the Knitting Circle band pack appears in results and was rightly left out.
- `bsky.py posts` for lalelolai, knitty.com, pattylyons, brooklyntweed (1 each): curator last posted 2025-07-16; Knitty 2026-11-05; Patty Lyons 2026-08-22; Brooklyn Tweed no posts. Shows some members are quiet.
- `bsky.py starter-pack` on veg-grower "Knitting Community": 147 accounts, matching the grounding.

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
The person was looking at an NBC Bay Area post (a video of Nvidia staff cheering and chanting Jensen Huang's name on his return as CEO) and asked why everyone was dunking on it. They wanted the reason for the pile-on in a sentence or two, with enough evidence to trust it. The answer gives that in its first line: the mockery is aimed at the scene of staff cheering, not at NBC, and people read it as cult-like or servile given that Huang resigned on Nov 12 and was reinstated today. That matches what I found and what the case scout found.

Claims I checked. (1) The background: Nvidia's newsroom page is dated Nov 12, 2026, says Huang resigned with no reason given, and lists a Nov 23 headline "NVIDIA Board Reinstates Jensen Huang as President, CEO and Board Director". The Fox Business page carries the headline "Nvidia CEO Jensen Huang resigns amid investigation into relationship with alleged Chinese spy", so the answer's wording is an accurate, attributed paraphrase that keeps "alleged". (2) The three quoted posts: "Serfs" by @vor-bokor.bsky.social is that post's full text; the NERV/Gendo Ikari text by @giantrobotfm.bsky.social matches word for word up to the ellipsis; the @cased.bsky.social reply matches, with the ellipsis standing in for a dropped clause, and it is still the most-liked reply. All three links resolve to those posts. (3) The counts: the answer said 483 quotes, 231 replies, 102 likes; I now see 559, 279 and 120, which is normal growth over the time between the run and my check, and the lopsided ratio holds. (4) "Nearly all mock the scene": in the 100 quotes and 20 replies I read, I found none defending the staff; "cult" is the most common word.

Weaker points, none enough to fail a check. The copilot's own notes admit it cited Fox Business from a search-result headline without opening the page; the claim turned out to be accurate, but the answer's "Background is from..." slightly overstates what it read. Its quote sample was the most recent quotes, not the most-liked ones, so it missed the larger quote posts the scout saw (Ben Collins, 842 likes) and the political angle many quotes raise (the board citing input from senior US government officials). The answer hedges properly with "Among the ones I read" and states the sample size, and offers the reinstatement story as a follow-up, so this is a gap in richness, not a false statement. It could only see one still frame of the video and did not say so, but it made no claim about the video beyond what the post text and on-screen caption state. Length is about 170 words plus links, fine for a side panel, and every source is linked.

## WHAT-I-VERIFIED
- `case.py nbc-huang-return-quote-pileon --with-grounding`: the question, the screen context and the scout's facts.
- `bsky.py post <post>`: text matches; video attached; now 120 likes, 36 reposts, 279 replies, 559 quotes.
- `bsky.py quotes <post> --top --limit 100`: "Serfs" (@vor-bokor, 31 likes) and the NERV/Gendo Ikari post (@giantrobotfm, 46 likes) exist with the exact text and URLs given; the sample is almost entirely mockery ("cult", "cringeworthy", Wolf of Wall Street, Theranos).
- `bsky.py thread <post> --max-replies 20`: the @cased.bsky.social stock-options reply is the top reply (now 149 likes) and the quoted words are exact; other top replies say "embarrassing", "cult", "deranged".
- WebFetch nvidianews.nvidia.com/news/nvidia-announces-ceo-transition: dated Nov 12, 2026; Huang resigned, no reason given; "More News" lists the Nov 23 reinstatement headline.
- WebFetch the Fox Business URL: headline and Nov 12 date match the answer's description; article says he resigned after an internal investigation into his relationship with an alleged Chinese spy.
- `bsky.py search-posts "Huang reinstated Nvidia board" --sort top --since 2026-11-22`: many Nov 23 posts linking Nvidia's reinstatement release, confirming "reinstated today".

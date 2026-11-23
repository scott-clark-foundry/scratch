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
The person saw a vague post by Valerie Bertinelli ("I am so sick of bad guys winning") in the Discover feed and asked two things: what she is talking about, and what the replies say. The answer opens with the honest answer to the first ("She doesn't say"), backs it with two facts I confirmed (the post has no link, picture or quoted post, and she has posted nothing else since 22 November), then sums up the replies in four short bullets. I re-fetched all 80 direct replies and checked every quote. "You're certainly not alone Valerie" (@glennvotesblue), "Goddamn sociopaths ruining our world. For made-up paper." (@southernlad-fl), "we need an ongoing General Strike" (@twisted-mittens), "He should be under a jail right now" (@respencer) and "Congress needs to impeach and remove him" (@canadian5krunner) are all word for word. The claim that some replies point at one unnamed man is right: nobody says who "he" is. The summary line, that replies "mostly read it as frustration with powerful, rich people escaping consequences", is a fair reading; the largest group is plain agreement and comfort, which the first bullet says. The answer is well calibrated: it does not guess at the news story behind the post, and it admits it read "about 60 of the 80" replies rather than claiming all of them. It is about 130 words and stays neutral. Three weaknesses, none enough to fail a check. First, only the main post is linked; two quoted replies carry a handle with no link, and three carry no attribution at all. I passed this because every quote sits in the one linked thread, but linking the handles would better meet the rule that sources are always shown. Second, the bullets leave out a clear strand of the replies about elections and Congress ("January 3...", "Remember the Midterms!!!", "They were voted into office"), which would have helped the person see that many repliers read the post as political. Third, the closing offer, "Want me to check what was in the news this morning?", hides that the copilot had already checked trending topics and run a web search without a result; saying "trending topics didn't settle it" would have been more candid. The post has no image, link or quote, so the attachment check does not apply.

## WHAT-I-VERIFIED
- `case.py bertinelli-bad-guys-replies --with-grounding`: question, app context, and the scout's note that the topic is not stated and any news link is a guess.
- `bsky.py thread <post> --max-replies 100 --reply-levels 1`: post text exact, 1770 likes, 80 direct replies, 6 quotes, no image/link/quote on the post; all 80 replies read.
- Same output, quote check: all five quoted replies found word for word with the handles the report gives.
- Same output, "nobody names him": confirmed; the "He"/"him" replies name no one (one unrelated reply mentions Rudy Giuliani, another jokes about "Roth").
- Same output, theme check: most replies are agreement or hope; rich/greed replies (southernlad-fl, erohealthcomms, iwantyoustudio, tomowens67, stopburningthings) and election/Congress replies (headcrash, yesfan1, rcawley, domacoblue, htjenkins1) both present.
- `bsky.py posts wolfiesmom.bsky.social --since 2026-11-22 --limit 15`: only this post in the range, so "hasn't posted anything else since yesterday" holds.

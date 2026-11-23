## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
current: PASS
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person saw the trending topic "Weather forecasts include lead plume" on the search page and wanted to know two things: is it a joke, and why is it trending. The answer opens with "Not a joke, sadly." and then explains the cause in one sentence: the US Army plans to detonate nearly five tons of degraded lead azide at the Iowa Army Ammunition Plant in Middletown, and Iowa TV station KCRG aired a wind forecast for the plume. I checked each main claim against the live network. (1) The viral post: @gammacounter.bsky.social's text is exactly "American weather reporting now includes lead plume forecast.", and it now has 1,593 likes and 245 quotes, which matches "about 1,600 likes and 240 quotes". (2) The image: I opened it, and it shows a KCRG 9 abc weather map titled "FIRST ALERT LEAD PLUME", "WED 12:00 PM", with low-level wind arrows over southeast Iowa, so the description "First Alert: Lead Plume wind forecast" is accurate. The answer did not name the presenter, which is the safe choice. (3) The KCRG page is titled "Wind forecast for Wednesday's lead azide detonation", which supports both the link and "moved to Wednesday". (4) The latest development: the CBS article confirms Trump said he "ordered the Military not to do so until such time as the Eighth Circuit agrees" and made it subject to Gov.-elect Rob Sand agreeing; CBS posted this at 19:28 to 19:30 UTC, about two and a half hours before the person asked at 21:59 UTC, so "this evening" is right for London and the answer reflects the state of things at the time of asking. "Nearly five tons" matches NewsNation, Al Jazeera and the scout's 9,500 pounds. The answer attributes the halt to CBS and to what Trump "said", which is the right strength. Small weaknesses that did not cost a check: at roughly 135 words without links it is on the long side for a question that is half "is this real", though it is within the limit for a trend explanation with a fact-check; "showing where the dust could drift" is a slight gloss on a wind map, but the station's own banner calls it a lead plume forecast; and "mostly angry or dark jokes" is a summary of the quote posts that I only spot-checked. One follow-up offer, three working links, plain and friendly tone.

## WHAT-I-VERIFIED
- `case.py trending-lead-plume-iowa --with-grounding`: question, current time 2026-11-23T21:59Z, scout's grounding (real story, 9,500 pounds, rescheduled to Wednesday).
- `bsky.py post` on the @gammacounter post: exact text matches the quote; 1,593 likes, 245 quotes; links the KCRG video.
- `bsky.py media` on that post, then opened image1.jpg: KCRG 9 abc map "FIRST ALERT LEAD PLUME / WED 12:00 PM / PINPOINT FUTURECAST", low-level winds over southeast Iowa.
- `bsky.py trending`: "Weather forecasts include lead plume" is on the list (now number 6).
- `bsky.py read-link` on the KCRG URL: title "Wind forecast for Wednesday's lead azide detonation", published Nov. 22, 10:18 PM CST.
- `bsky.py read-link` on the CBS URL: Trump ordered the military to hold off until the 8th Circuit agrees and subject to Gov.-elect Rob Sand agreeing; site is Middletown, Iowa; unstable lead azide.
- `bsky.py search-posts '"lead azide"' --sort latest`: newest posts (Kansas Reflector, Al Jazeera, WNC Times, The Why Daily) all report Trump's hold; "nearly five tons" confirmed by NewsNation and Al Jazeera; no later reversal found.
- `bsky.py search-posts 'Trump halt Iowa detonation' --sort top --since 2026-11-23`: Newsweek 18:58 UTC, CBS Chicago 19:28 UTC, CBS News 19:30 UTC, so the halt was public before the person asked.

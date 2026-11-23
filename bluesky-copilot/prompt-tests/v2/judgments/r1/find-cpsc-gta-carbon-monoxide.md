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
The person half-remembered a viral post in which a government agency made a GTA 6 joke about "smoke detectors" and asked the copilot to find it. The answer opens with "Found it", names the U.S. Consumer Product Safety Commission (@cpsc.gov), and corrects the misremembered detail straight away: the post is about carbon monoxide alarms, not smoke detectors. It links two posts: the original joke from Nov 20 and the Nov 23 follow-up that the case's scout treated as the target. Giving both is the right call, because the original has far more likes and is the one without "GTA 6" in its text, while the follow-up is the one that names GTA 6; either could be what the person saw. I checked every claim against the live network and all held. The quote "Lucia will appreciate working carbon monoxide alarms on every level of the home and outside sleeping areas." is exact. The original was posted 2026-11-20 14:57 UTC, which is 23:57 in Tokyo, so "Nov 20 just before midnight your time" is right. It has 1,618 likes, so "about 1,600" is right. The follow-up was posted 2026-11-23 14:32 UTC (23:32 Tokyo) and the person asked at 06:59 Tokyo on Nov 24, so "last night" is right, and its quoted text is exact. The account shows as verified with about 120k followers and a bio calling itself the official USCPSC account. I opened the follow-up's image: it is a screenshot of an IGN Instagram carousel headed "IGN | GRAND THEFT AUTO VI", captioned "Lucia will appreciate all these memes about GTA 6!", with the CPSC post as one of the featured items, so "IGN featuring it in a GTA 6 memes roundup on Instagram" matches what the picture shows and proves the copilot looked at it rather than only reading alt text. The one statement not taken from the network, that Lucia is a GTA 6 main character, is correct and is openly labelled as general knowledge. The answer is about 110 words, has no padding, links both posts, involves no sensitive or political content, and ends with one short optional offer. Nothing failed.

## WHAT-I-VERIFIED
- `case.py find-cpsc-gta-carbon-monoxide --with-grounding`: question, Tokyo time zone, current time 2026-11-23T21:59Z, grounding points to post 3n2ydvmzuoc2t.
- `bsky.py post .../cpsc.gov/post/3n2qtuz6bl22k`: CPSC, 2026-11-20 14:57 UTC, text matches the quote exactly, 1,618 likes, 272 reposts, 4 quotes.
- `bsky.py post .../cpsc.gov/post/3n2ydvmzuoc2t`: CPSC, 2026-11-23 14:32 UTC, text "Your federal agency creating carbon monoxide safety crossovers with GTA 6" plus an Instagram link, 191 likes, one image.
- `bsky.py profile cpsc.gov`: U.S. Consumer Product Safety Commission, "Official account of the USCPSC", 119,960 followers, Verified: yes.
- `bsky.py media` on 3n2ydvmzuoc2t, then opened the image: IGN Instagram carousel "GRAND THEFT AUTO VI", caption "Lucia will appreciate all these memes about GTA 6!", shows the @USCPSC Lucia post, and a uscpsc comment thanking IGN.
- `bsky.py media` on 3n2qtuz6bl22k: nothing visual attached, so the original is text only.
- Time conversion by hand: 14:57 UTC = 23:57 JST Nov 20; 14:32 UTC = 23:32 JST Nov 23; asked at 06:59 JST Nov 24.

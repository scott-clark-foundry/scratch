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
The person, not signed in and looking at the Discover feed, asked who is good to follow for breaking news in the Middle East. They most likely wanted a short list of accounts that are live and post quickly. The answer opens with its picks straight away and gives five linked accounts plus one starter pack (a curated set of accounts a person can follow in one go), in about 170 words. Every claim I checked held up against the live network. (1) The Middle East Eye account did post "Three tankers explode in Strait of Hormuz" at 21:50 UTC on 2026-11-23, and its bio does say "Unofficial account. Automated post via RSS." The answer tells the person plainly that it is an unofficial bot, and it avoided the empty "official" Middle East Eye account that the case set as a trap. (2) Al-Monitor did post "Rubio meets Qatari PM as Iran standoff deepens" (19:37 UTC) and posted six or more times that day, so "several times a day" is right. (3) Reuters is verified with 357,787 followers ("about 358,000"), and its recent posts are general world news, as the answer warns. (4) The Times of Israel posted six times on 2026-11-23, so "posting daily" is right. (5) Al Jazeera English is verified; the answer marks "Qatar-based" as general knowledge rather than something the profile says, which is honest and correct. (6) The starter pack exists (25 accounts, created 2026-03-08) and contains AP and AFP along with Reuters, Al-Monitor and Al Jazeera. The answer also steered clear of the stale accounts in the case (Carlstrom, Mroue). Labelling outlets as "an Israeli outlet's view" and "an Arab outlet's view" is descriptive and balanced, not a political label on a person.

Small weaknesses that did not cause a failure: the question said "person" and the answer recommends only outlets without saying that the individual correspondents it checked had gone quiet (one sentence, or one active correspondent, would have helped); "bundles many of these" is a little generous, since the pack holds three of the five picks and not the Middle East Eye bot or The Times of Israel; the pack also carries a few off-topic accounts (Africa Check, News24); and Al Jazeera English, which that evening was posting mostly non-regional stories, is offered for viewpoint rather than speed, which the answer words correctly. No picture, link or quoted post was part of the question, so that check does not apply.

## WHAT-I-VERIFIED
- `case.py follow-middle-east-breaking-news --with-grounding`: question, screen (Discover, not signed in), and scout grounding listing active options and stale/empty traps.
- `bsky.py profile` + `posts middleeasteye-rss.bsky.social`: bio says unofficial, automated via RSS; 43,784 followers; "Three tankers explode in Strait of Hormuz" at 2026-11-23 21:50 UTC; posts every 5 to 45 minutes, all regional.
- `bsky.py profile` + `posts almonitor.bsky.social`: 1,920 followers; "Rubio meets Qatari PM as Iran standoff deepens" at 19:37 UTC; six posts between 17:09 and 22:13 UTC that day.
- `bsky.py profile` + `posts reuters.com`: verified, 357,787 followers; recent posts cover Iowa, Russia, Zimbabwe, cybersecurity (general news).
- `bsky.py profile` + `posts timesofisrael.com`: 7,930 followers, not verified (answer does not claim it is); six posts on 2026-11-23.
- `bsky.py profile` + `posts aljazeera.com`: verified, 230,443 followers; bio does not mention Qatar; posting every 30 minutes, mostly non-regional stories that evening.
- `bsky.py starter-pack .../literallyrosebud.bsky.social/3mgj5ds6ofu24`: "Middle East News - NewsSky", 25 accounts, includes @apnews.com, @en.afp.com, Reuters, Al-Monitor, Al Jazeera English; does not include the Middle East Eye bot or The Times of Israel.

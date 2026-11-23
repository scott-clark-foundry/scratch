## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: N/A
calibrated: PASS
fair-and-safe: PASS
current: PASS
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person, browsing the Discover feed without an account, asked who to follow for breaking Middle East news. They wanted a short list of accounts that are real, active now, and fast. The answer opens with its top pick (Al-Monitor) and adds three more, each with a one-line reason and a caveat, then a starter pack and a single follow-up offer. Every claim I checked held up. Al-Monitor did post "Rubio meets Qatari PM as Iran standoff deepens" (19:37 UTC) along with several other Iran and Gulf stories on the day, and its recent posts are all regional. Reuters is verified and posts roughly every five minutes on all subjects, as the answer says. Middle-East Tracker did post "Three tankers explode in Strait of Hormuz", linking Middle East Eye, 20 minutes after the Middle East Eye entry's own timestamp (21:48 GMT), and its other recent posts link Middle East Eye and Haaretz with headline text only. Shipwreck's bio does say "Retired US Navy Intelligence Analyst", and the recent posts relay reports credited to Iranian state IRIB News, Al Hadath and Al Jazeera, so "treat those as unconfirmed" is fair advice. The starter pack exists (25 accounts). The answer avoided every trap in the case notes: it did not recommend the dormant Gregg Carlstrom or Bassem Mroue accounts or the empty Middle East Eye account. It is about 120 words, links every account, and reads plainly. Weak points that do not amount to a failure: the tanker post it cites is stamped 22:08 UTC, nine minutes after the stated time of the question (the app clock appears to run behind the network, and the answer states no times); "often from state media" rests on a small sample, since only one of the three sourced posts I saw is strictly state media; Al-Monitor's account is unverified with about 1,900 followers, and the answer presents it as the outlet without saying so, though its 10,000-plus posts all link al-monitor.com; the starter pack is a mixed bag that also holds African and general outlets; and Al Jazeera English, the largest verified active option, is left out. The question said "person" and the answer gives outlets plus one individual, but it offers to find reporters, which is a reasonable reading of "breaking news".

## WHAT-I-VERIFIED
- `case.py follow-middle-east-breaking-news --with-grounding`: question, time 2026-11-23 21:59 UTC, scout's traps and good options.
- `bsky.py profile almonitor.bsky.social reuters.com me.skyfleet.blue shipwreck75.bsky.social aljazeera.com`: all active on 2026-11-23; Reuters verified, 357k followers; Al-Monitor 1,920 followers, unverified, bio matches; Shipwreck bio says "Retired US Navy Intelligence Analyst", 29k followers.
- `bsky.py posts almonitor.bsky.social --no-reposts --limit 8`: the Rubio/Qatari PM headline is exact (19:37 UTC); other posts on Iran sanctions, Hormuz, Eisenkot, Iraq, Libya.
- `bsky.py posts me.skyfleet.blue --no-reposts --limit 8`: headline-only posts linking middleeasteye.net and haaretz.com every few minutes; "Three tankers explode in Strait of Hormuz" at 22:08 UTC.
- `bsky.py posts shipwreck75.bsky.social --no-reposts --limit 8`: posts crediting IRIB News, Al Hadath, Al Jazeera, Reuters; also non-regional items (Poland, Iowa).
- `bsky.py posts reuters.com --no-reposts --limit 8`: a post every 5 to 10 minutes, mostly non-regional, one on Iran sanctions.
- `bsky.py starter-pack literallyrosebud.bsky.social/3mgj5ds6ofu24`: "Middle East News - NewsSky", 25 accounts, created 2026-03-08; includes Reuters, AP, Al Jazeera, Al-Monitor, Haaretz, plus some African and general outlets.
- `bsky.py read-link` on the Middle East Eye tanker entry: stamped 23 November 2026 21:48 GMT, so the Tracker post followed 20 minutes later.
- `bsky.py search-posts "Hormuz tankers" --sort latest --since 2026-11-23`: the tanker story is the live development; Shipwreck (21:13) was among the earliest, consistent with the answer's description.
- `curl` of al-monitor.com for a Bluesky link: nothing returned, so I could not confirm the account is official from the outlet's own site.

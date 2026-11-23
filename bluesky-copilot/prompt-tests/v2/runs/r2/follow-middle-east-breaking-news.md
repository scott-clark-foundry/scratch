## ANSWER

For fast updates, I'd start with **Al-Monitor** (https://bsky.app/profile/almonitor.bsky.social), a regional news outlet that has posted several Iran and Gulf stories today, like "Rubio meets Qatari PM as Iran standoff deepens".

A few others, each good for something different:

- **Reuters** (https://bsky.app/profile/reuters.com): the verified wire service, posting every few minutes, though it covers everything, not just the region.
- **Middle-East Tracker** (https://bsky.app/profile/me.skyfleet.blue): reposts headlines from outlets like Middle East Eye and Haaretz within minutes, e.g. "Three tankers explode in Strait of Hormuz". Headlines only, no commentary.
- **Shipwreck** (https://bsky.app/profile/shipwreck75.bsky.social): describes themselves as a retired US Navy intelligence analyst and relays first reports quickly, often from state media, so treat those as unconfirmed.

For more, someone has curated a Middle East News starter pack: https://bsky.app/starter-pack/literallyrosebud.bsky.social/3mgj5ds6ofu24

Want me to find individual reporters based in the region?

## STEPS

Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test brief.
python3 case.py follow-middle-east-breaking-news: the message; not signed in, on Discover feed, 2026-11-23 21:59 UTC, Europe/London.
Read app/server/system-prompt.md: system prompt.
Read skill/bluesky/SKILL.md: followed the "Who should I follow for X?" recipe. Did not read reference files (not needed for this question).
python3 scripts/bsky.py search-starter-packs "Middle East news": 7 packs, incl. Nick Brumfield's 2024 three-part set and literallyrosebud's 2026 "Middle East News - NewsSky".
python3 scripts/bsky.py search-users "Middle East": think tanks, outlets (Al-Monitor not here; Middle East Eye, Middle East Monitor, Middle-East Tracker), academic bodies, junk.
python3 scripts/bsky.py search-posts "Middle East breaking" --sort top --since 2026-11-16 --limit 25: mostly low-engagement, partisan or aggregator posts; little useful for picking sources; showed this week's Iran/Bahrain/Hormuz story.
python3 scripts/bsky.py starter-pack (literallyrosebud NewsSky pack): 25 accounts incl. Reuters, AP, Al Jazeera, Al-Monitor, Haaretz, Abby Sewell (AP), Leila Molana-Allen (PBS).
python3 scripts/bsky.py profile middle-east-eye.bsky.social almonitor.bsky.social sewella.bsky.social leilama.bsky.social aljazeera.com reuters.com haaretzcom.bsky.social me.skyfleet.blue apnews.com: Middle East Eye has 0 posts; Molana-Allen last posted 2026-09-02; Haaretz 2026-11-09; Sewella 2026-11-18; Al-Monitor, Al Jazeera, Reuters, AP, Middle-East Tracker posted today.
python3 scripts/bsky.py posts (almonitor, me.skyfleet.blue, aljazeera.com, reuters.com) --no-reposts --limit 6: Al-Monitor all regional; Tracker posts MEE/Haaretz headlines every few minutes; Al Jazeera and Reuters mostly non-regional in latest posts.
python3 scripts/bsky.py search-users "Middle East correspondent" --limit 15: list of correspondents.
python3 scripts/bsky.py search-posts "Hormuz tankers" --sort top --since 2026-11-22 --limit 12: top posters on today's story were Shipwreck, Al Jazeera, OSINTRadar.
python3 scripts/bsky.py profile glcarlstrom bmroue ruthmichaelson.com helenesallon jjholtland shipwreck75 osintradar: Carlstrom quiet since 2025-06, Mroue since 2026-02, Sallon since 2025-10; Michaelson, Shipwreck, OSINTRadar active today; Holtland 2026-11-17.
python3 scripts/bsky.py posts ruthmichaelson.com / shipwreck75.bsky.social --no-reposts --limit 5: Michaelson's recent posts are book-review and climate, not breaking news (dropped); Shipwreck posts frequent Iran/Gulf first reports citing IRIB, Al Hadath, Al Jazeera, Reuters.

No web search or fetch used (not needed: all accounts checked on Bluesky).

## EVIDENCE

- Al-Monitor posted several Iran and Gulf stories today, incl. "Rubio meets Qatari PM as Iran standoff deepens": posts almonitor.bsky.social output (post at 2026-11-23 19:37 UTC, https://bsky.app/profile/almonitor.bsky.social/post/3n2yuwcrqrs2k; others on Iran sanctions, Hormuz, Eisenkot).
- Al-Monitor is a regional news outlet: its bio ("Independent and trusted coverage of the Middle East…"), profile output.
- Reuters is verified and posts every few minutes, covering all topics: profile reuters.com (Verified: yes) and posts output (posts at 22:10, 22:15, 22:25, 22:35, 22:40, 22:45 UTC on FDA, Russia, Iowa, Iran sanctions).
- Middle-East Tracker posts headlines from Middle East Eye and Haaretz, e.g. "Three tankers explode in Strait of Hormuz": posts me.skyfleet.blue output (links to middleeasteye.net and haaretz.com; post https://bsky.app/profile/me.skyfleet.blue/post/gl4mxefyqr5m7 at 22:08 UTC); 65,457 posts per profile.
- Shipwreck describes themselves as a retired US Navy intelligence analyst: profile shipwreck75.bsky.social bio.
- Shipwreck relays first reports, often from state media: posts output ("Three Tankers involved in illegal activities explode in the Strait of Hormuz.- Iranian state IRIB News"; "US official tells Al Hadath News…").
- Starter pack exists and is curated by someone: starter-pack output for literallyrosebud.bsky.social/3mgj5ds6ofu24 (25 accounts, created 2026-03-08).

## FRICTION

- Timestamps after "now": app_context says the current time is 2026-11-23T21:59Z, but several accounts' latest posts are stamped 22:08 to 22:45 UTC the same day (Reuters, Al-Monitor, Al Jazeera, Middle-East Tracker). SKILL.md warns that individual post times can be wrong, but here it is systematic across many accounts, which suggests the app_context clock is behind the API. I avoided stating exact times in the answer.
- The recipe says to say where an account is coming from "when its profile makes that plain" on contested subjects. Al Jazeera (Qatar state-funded) and Haaretz have bios that do not say so, so I could not label them under that rule; I left Al Jazeera out partly for that reason and partly because its latest posts were mostly non-regional. Unclear whether general knowledge about ownership may be used.
- The official Middle East Eye account (middle-east-eye.bsky.social, ~1,075 followers) has 0 posts, and the bio says "official". Not obvious whether to mention it as a trap; I left it out to keep length down.
- Middle-East Tracker's posts have rkey-style IDs that do not look like normal TIDs (e.g. gl4mxefyqr5m7), suggesting a bridged or bot account; SKILL.md gives no guidance on recommending automated aggregator accounts.
- "Breaking news" plus "Middle East" search terms matched mostly low-quality, partisan or aggregator posts; the recipe's `search-posts "X" --sort top` step was of little use for a broad region and I had to use a story-specific term (Hormuz tankers) to find who is actually posting fast.
- Not signed in: following needs an account, but the system prompt gives no instruction to mention sign-in for follow recommendations (only for lists), so I did not.

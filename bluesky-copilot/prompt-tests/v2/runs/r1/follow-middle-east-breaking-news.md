## ANSWER

For fast, region-focused updates I'd start with Middle East Eye and Al-Monitor, and add a wire service and an Israeli outlet for balance:

- **Middle East Eye**, the quickest region-only feed I found. Its latest tonight, 21:50: "Three tankers explode in Strait of Hormuz". It's an unofficial RSS bot (its bio says so), so links only, no commentary. https://bsky.app/profile/middleeasteye-rss.bsky.social
- **Al-Monitor**, which posts Middle East stories several times a day, e.g. "Rubio meets Qatari PM as Iran standoff deepens". https://bsky.app/profile/almonitor.bsky.social
- **Reuters**, for wire speed (verified, about 358,000 followers), though it covers everything, not just the region. https://bsky.app/profile/reuters.com
- **The Times of Israel**, for an Israeli outlet's view, posting daily. https://bsky.app/profile/timesofisrael.com
- **Al Jazeera English** (verified), for an Arab outlet's view. It's Qatar-based (from general knowledge; its profile doesn't say). https://bsky.app/profile/aljazeera.com

Want a bigger list in one go? This starter pack bundles many of these with AP and AFP: https://bsky.app/starter-pack/literallyrosebud.bsky.social/3mgj5ds6ofu24

## STEPS

1. Read answer-brief.md: instructions for this test.
2. Ran case.py follow-middle-east-breaking-news: not signed in, Discover feed, 2026-11-23 21:59 UTC (Europe/London); question "Who is a good person to follow for breaking news in the Middle East?"
3. Read app/server/system-prompt.md: system prompt (tone, length, sources).
4. Read skill/bluesky/SKILL.md: "Who should I follow for X?" recipe (starter packs, search-users, search-posts, then profile + posts to confirm activity; recommend 3 to 5, mix types, note where an account is coming from).
5. `search-starter-packs "Middle East news"`: 7 packs, incl. "Middle East News - NewsSky" (2026) and Nick Brumfield's 3-part pack (2024).
6. `search-users "Middle East correspondent"`: 25 correspondents (Carlstrom/Economist, Mroue/AP, many European outlets).
7. `search-posts "Middle East breaking" --sort top --limit 25`: mostly low-engagement aggregators and partisan accounts; not useful for picks.
8. `starter-pack .../literallyrosebud.bsky.social/3mgj5ds6ofu24`: 25 accounts incl. Reuters, AP, AFP, Al Jazeera, Al-Monitor, Haaretz, Abby Sewell, Leila Molana-Allen, ISW.
9. `starter-pack .../nickjbrumfield.bsky.social/3latqfsyhmp2k`: 150 accounts, mostly academics/analysts; includes Middle East Eye (Unofficial) and MERIP.
10. `profile` + `posts --no-reposts --limit 4` for reuters.com, apnews.com, aljazeera.com, almonitor.bsky.social, sewella.bsky.social, glcarlstrom.bsky.social, bmroue.bsky.social: Reuters/AP/AJE active today but general news; Al-Monitor active and on-topic today; Sewell last posted 2026-11-18; Carlstrom last 2025-06; Mroue last 2026-02 (dropped as inactive).
11. `search-users "Times of Israel"` and `profile` + `posts` for haaretzcom.bsky.social, leilama.bsky.social, middleeasteye-rss.bsky.social: Haaretz last news post 2026-09-13 (inactive); Molana-Allen last 2026-09; MEE bot posting every few minutes, region-focused, latest 21:50 UTC today.
12. `profile` + `posts` for timesofisrael.com and manniefabian.bsky.social: ToI active today (3 posts 2026-11-23); Fabian last posted 2025-07 (dropped).

## EVIDENCE

- MEE latest post "Three tankers explode in Strait of Hormuz" at 21:50 tonight: `posts middleeasteye-rss.bsky.social`, 2026-11-23 21:50 UTC (London is on UTC in November).
- MEE account is an unofficial RSS bot: its bio, "Unofficial account. Automated post via RSS."
- Al-Monitor posts several times a day, quote "Rubio meets Qatari PM as Iran standoff deepens": `posts almonitor.bsky.social`, four posts on 2026-11-23 between 17:36 and 19:37 UTC.
- Reuters verified, about 358,000 followers (357,783), covering all topics: `profile reuters.com` and its latest posts (Nvidia, Zimbabwe mine, cybersecurity).
- Times of Israel posting daily: `posts timesofisrael.com`, three posts on 2026-11-23.
- Al Jazeera English verified: `profile aljazeera.com`.
- Al Jazeera is Qatar-based: general knowledge, not from its profile (bio does not say).
- Starter pack includes AP and AFP: `starter-pack .../3mgj5ds6ofu24` lists @apnews.com and @en.afp.com.

## FRICTION

- Web search/web fetch were not loaded; I did not need them, but did not try ToolSearch for them.
- The question says "a good person", but the recipe's mix leans to outlets because the individual correspondents I checked (Carlstrom, Mroue, Fabian, Molana-Allen, and Haaretz's account) had mostly stopped posting. Recommending mainly organizations was a judgment call; I did not say in the answer that the individual journalists had gone quiet, which some users might want to know.
- The recipe says to note where an account is coming from "when its profile makes that plain". Al Jazeera's ownership is not in its profile, so I added "Qatar-based" from general knowledge and marked it as such. It is unclear whether the recipe wants that kind of context added when the profile is silent, or left out.
- `search-posts "Middle East breaking" --sort top` returned mostly low-quality aggregators and partisan accounts; the recipe's third source was not useful for this topic.
- The system prompt prefers one link per item, but a 5-account answer plus a starter pack pushes toward the 180-word ceiling.

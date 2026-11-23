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
The person, browsing the Discover feed while signed out, asked who to follow for breaking Middle East news. They most likely wanted a small number of accounts that are real, active now, and fast. The answer opens with its top pick (Reuters), adds Al Jazeera English and one correspondent on the ground (Matthew Doran of ABC News Australia), and links all three. I checked each claim against the live network. Reuters (@reuters.com) is verified, has about 358k followers, and posts every few minutes; the quoted headline "US imposes sanctions on dozens linked to Iran's shadow banking networks" is exact. Al Jazeera English (@aljazeera.com) is verified and posted several regional stories on 23 November (Gaza attacks, Iran sanctions, the Iran flogging story, Istanbul), so "several Middle East stories posted today" holds. Doran's bio reads "Middle East correspondent for ABC News Australia, based in Jerusalem", and his posts fall on 7, 8, 9, 11, 13, 18 and 21 November about Gaza, the West Bank and the Knesset, so "every few days rather than minute by minute" is an honest description. The closing claim that many correspondents in the starter packs have gone quiet is also true: Barak Ravid last posted in November 2025, Gregg Carlstrom in June 2025, OSINTtechnical in February 2026, and the Middle East Eye account has no posts. The answer avoided every trap the case writer set (stale or empty accounts that look ideal). The Qatari-funding note about Al Jazeera is accurate, hedged with "as far as I know" because the copilot did not look it up, and is fair context for a news recommendation, not a slur. The answer is about 126 words without links, under the 140 limit for recommendations, with one follow-up offer and a plain, friendly tone. Two small weaknesses that do not fail a check: the Reuters headline it calls "tonight's" was posted at 22:40 UTC, about 40 minutes after the app's stated current time of 21:59 UTC, which is a side effect of the test clock being frozen while the live network moves on (Reuters had a comparable Iran story at 21:40); and Doran, with 829 followers and a post every few days, is a thin pick for "breaking" news, though the answer says so plainly, and the more-followed active alternative (Ruth Michaelson) mostly reposts off-topic material.

## WHAT-I-VERIFIED
- `profile reuters.com aljazeera.com matthewdoran1.bsky.social`: all exist; Reuters and Al Jazeera verified, last posted 23:05 and 23:00 UTC on 2026-11-23; Doran's bio matches the answer, 829 followers, last post 2026-11-21.
- `posts reuters.com --no-reposts --limit 40`: found the quoted Iran sanctions headline word for word (22:40 UTC), plus Iran flogging (21:40) and Canada-Qatar pact (20:45) stories.
- `posts aljazeera.com --no-reposts --limit 15` and `--limit 60` filtered for region words: regional stories at 00:30, 06:00, 10:00, 13:30, 17:00, 22:30 and 23:00 UTC on 2026-11-23.
- `posts matthewdoran1.bsky.social --limit 8`: reporting on Gaza, West Bank, Israeli politics on Nov 7, 8, 9, 11, 13, 18, 21.
- `profile barakravid.bsky.social glcarlstrom.bsky.social osinttechnical.bsky.social middle-east-eye.bsky.social ruthmichaelson.com`: last posts 2025-11-25, 2025-06-13, 2026-02-24, none (0 posts), and 2026-11-23 respectively; confirms the "gone quiet" claim and that no stale account was recommended.
- Word count of the ANSWER section with links removed: about 126 words.

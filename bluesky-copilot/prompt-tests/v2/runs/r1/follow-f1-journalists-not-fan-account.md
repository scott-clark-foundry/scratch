## ANSWER
These four are real F1 reporters who are posting actively right now:

- **Andrew Benson**, BBC Sport's F1 correspondent: race reports and the big stories, like his Vegas write-up on the Ferrari collision. https://bsky.app/profile/andrewbensonf1.bsky.social
- **Chris Medland**, freelance (Racer, SiriusXM): fastest for stewards' calls and confirmations, e.g. "CONFIRMED: Rafael Camara will see out the season with Haas…" https://bsky.app/profile/chrismedlandf1.bsky.social/post/3n2w733esvk2r
- **Madeline Coleman**, The Athletic: business and team-ownership scoops, like the Cadillac stake story. https://bsky.app/profile/madelinecoleman.bsky.social
- **Thomas Maher**, PlanetF1 editor: news plus longer interviews. https://bsky.app/profile/thomasmaheronf1.bsky.social

For more, r/formula1 keeps a verified journalists-only starter pack (27 accounts, no fan or mirror accounts), though a few in it have gone quiet: https://bsky.app/starter-pack/f1subreddit.bsky.social/3lbabvgf3je2w

Want a couple of technical or stats people too?

## STEPS
1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test instructions.
2. Ran case.py follow-f1-journalists-not-fan-account: the user message, signed in as @pfrazee.com, viewing an @f1tv.bsky.social thread.
3. Read app/server/system-prompt.md: the system prompt.
4. Read skill/bluesky/SKILL.md: the "Who should I follow for X?" recipe (starter packs, search-users, search-posts, then check profile and posts).
5. `search-starter-packs "F1"`: found "F1 Verified - Journalists" by @f1subreddit.bsky.social, plus others.
6. `search-starter-packs "F1 journalists"`: same pack, plus packs by benjhunt and nielsarts.
7. `search-users "F1 journalist"`: Medland, Maher, Rory Mitchell, Jon Noble and others.
8. `starter-pack https://bsky.app/starter-pack/f1subreddit.bsky.social/3lbabvgf3je2w`: 27 accounts with bios.
9. `search-posts "F1" --sort top --since 2026-11-20 --limit 25`: mostly @f1tv highlight posts; Medland and Rory Mitchell showed up among journalists posting about Vegas.
10. `profile` + `posts --no-reposts --limit 4` on andrewbensonf1, lukesmithf1, chrismedlandf1, scarbstech, natesaunders: Benson and Medland active on 2026-11-22; Luke Smith last posted Feb 2026; Scarbs last posted Aug 2026; Nate Saunders last posted Dec 2024.
11. `profile` + `posts --no-reposts --limit 3` on thomasmaheronf1, scottmitchellmalm, m0llywrites, madelinecoleman: Maher active 2026-11-17; Coleman active 2026-11-14; Mitchell-Malm last posted June 2025; Hudson last posted Oct 2026.

## EVIDENCE
- Benson is BBC Sport's F1 correspondent: bio from `profile andrewbensonf1.bsky.social` ("I am BBC Sport's Formula 1 correspondent"; verified; about 102k followers).
- Benson wrote about the Vegas Ferrari collision: `posts andrewbensonf1.bsky.social`, posts from 2026-11-22 linking BBC Sport articles.
- Medland is a freelancer for Racer and SiriusXM: bio from `profile chrismedlandf1.bsky.social`.
- Medland posts stewards' calls and confirmations, including the Camara quote: `posts chrismedlandf1.bsky.social` (posts on Hadjar's penalty, Piastri's yellow flag, and the Camara "CONFIRMED" post, 2026-11-22).
- Coleman writes for The Athletic and broke the Cadillac stake story: `profile madelinecoleman.bsky.social` bio and posts from 2026-11-14 and 2026-11-03.
- Maher is a PlanetF1 editor who does news and interviews: `profile thomasmaheronf1.bsky.social` bio and posts from 2026-11-13 and 2026-11-17 (the George Kurtz interview).
- "Posting actively right now": newest-post dates in the `posts` output for each account (Nov 14 to Nov 22, 2026).
- The starter pack is r/formula1's, has 27 accounts, and is journalists-only with no fan or mirror accounts: `starter-pack` output ("A verified list of F1 Journalists. No impersonations or mirrors.", "27 accounts"; creator bio "The official account of the r/formula1 community").
- A few accounts in the pack have gone quiet: `posts` output for natesaunders (last post Dec 2024), scottmitchellmalm (June 2025) and lukesmithf1 (Feb 2026).

## FRICTION
- I did not load WebSearch/WebFetch because everything the answer needed was on Bluesky. The tools appear in the deferred list, so they were available.
- The recipe says to "mix types of sources", and the system prompt says a list of recommended accounts can run to about 180 words. For a quick lowercase question I kept the answer to four accounts plus one pack, so it came in shorter.
- The recipe says a "verified" pack shows who to trust, but in the script output "Verified: yes" (the blue check) appears on only some accounts (Benson, Luke Smith, Coleman), not on Medland or Maher, even though both are clearly real. It is unclear how much weight a missing check should carry. I relied on bios and the pack curator instead.
- The `posts` summary line ("from 100 fetched going back to …") was useful for judging how active an account is, but there is no direct "last post date" field in `profile`. Checking activity took one `posts` call per candidate (9 calls).
- SKILL.md does not say what to do when the screen context (an @f1tv highlights thread) is the very kind of account the person wants to avoid. I simply didn't recommend it.

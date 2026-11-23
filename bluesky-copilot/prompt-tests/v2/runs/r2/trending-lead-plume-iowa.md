## ANSWER

Not a joke, sadly. The US Army plans to blow up nearly five tons of unstable lead azide (a degraded old explosive) at the Iowa Army Ammunition Plant in Middletown, and Iowa TV station KCRG aired a "First Alert: Lead Plume" wind forecast showing where the dust could drift: https://www.kcrg.com/video/2026/11/23/wind-forecast-wednesdays-lead-azide-detonation/

@gammacounter.bsky.social posted a screenshot of it, "American weather reporting now includes lead plume forecast.", and it took off (about 1,600 likes and 240 quotes, mostly angry or dark jokes): https://bsky.app/profile/gammacounter.bsky.social/post/3n2xgzrxfu227

Latest: the blast had been moved to Wednesday, but this evening Trump said he'd ordered the Army to hold off until the 8th Circuit appeals court and Iowa Gov.-elect Rob Sand agree, per CBS News: https://www.cbsnews.com/chicago/news/trump-tells-army-to-halt-detonation-in-iowa-this-week/

Want the background on why the Army chose to detonate it rather than neutralize it chemically?

## STEPS

- Read /home/user/scratch/bluesky-copilot/app/server/system-prompt.md: system prompt.
- Read skill/bluesky/SKILL.md: "Why is something trending?" recipe (trending, then feed LINK), plus step 4 (check latest news) and the "Is it satire?" guidance.
- `python3 scripts/bsky.py trending`: topic #7 "Weather forecasts include lead plume" with its feed link.
- `python3 scripts/bsky.py feed https://bsky.app/profile/did:plc:qrz3lhbyuxbeilrc6nekdqme/feed/c05e41c595d2 --limit 10`: posts driving the topic; most quote @gammacounter's post linking a KCRG video; one links an Iowa Public Radio article.
- `python3 scripts/bsky.py post https://bsky.app/profile/gammacounter.bsky.social/post/3n2xgzrxfu227`: original post text, KCRG link, likes 1573, quotes 242.
- `python3 scripts/bsky.py media <same post>`: saved image1.jpg with alt text.
- Read /tmp/bsky-media-xljeqbgb/image1.jpg: KCRG "FIRST ALERT LEAD PLUME / WED 12:00 PM / PINPOINT FUTURECAST" wind map over southeast Iowa, KCRG 9 abc logo.
- `read-link` KCRG video page: title "Wind forecast for Wednesday's lead azide detonation", published Nov 22 10:18 PM CST; page body mostly related-story links.
- `read-link` Iowa Public Radio article (Nov 21): nearly five tons of lead azide at Iowa Army Ammunition Plant, Middletown; Army canceled chemical treatment contract; 8th Circuit stayed EPA permit.
- `search-posts '"lead azide"' --sort latest --limit 15`: newest posts show reports that Trump paused the detonation; petitions; Inquirer post.
- `search-posts 'Iowa Army Ammunition Plant detonation' --sort top --since 2026-11-22 --limit 10`: Task & Purpose, Chicago Tribune, Scott Horton report it rescheduled to Wednesday.
- `search-posts 'Trump halt Iowa detonation' --sort top --since 2026-11-23 --limit 10`: CBS News, CBS Chicago, Newsweek, CNN link all report Trump ordering a halt.
- `read-link` CBS Chicago article: confirms Trump's Truth Social order to hold off until the 8th Circuit and Gov.-elect Rob Sand agree.
- Did not load or use WebSearch/WebFetch; the script's read-link covered the outside pages needed.

## EVIDENCE

- The Army plans to detonate nearly five tons of lead azide at the Iowa Army Ammunition Plant in Middletown: Iowa Public Radio article via read-link; also CBS article and Inquirer post.
- Lead azide is unstable/degraded: IPR article ("deteriorating lead-based explosive", "recrystallized") and CBS ("unstable explosives").
- KCRG aired a "First Alert: Lead Plume" wind forecast: the image from `media` (on-screen "FIRST ALERT LEAD PLUME", KCRG 9 abc logo) and KCRG page title via read-link.
- @gammacounter's post text and about 1,600 likes / 240 quotes: `post` output (1573 likes, 242 quotes).
- Reactions mostly angry or dark jokes: `feed` output (quotes from drjackbrown, adeniro, supermathskid, rexcoolguy, paulisci).
- It had been moved to Wednesday: Task & Purpose, Chicago Tribune, Scott Horton posts in search-posts; KCRG title.
- Trump ordered the Army to hold off until the 8th Circuit and Gov.-elect Rob Sand agree: CBS Chicago article via read-link; CBS News, Newsweek, Alt National Park Service posts in search-posts.
- "This evening": CBS posts at 19:28–19:30 UTC on 2026-11-23, which is 19:28–19:30 in London (GMT).

## FRICTION

- The app_context says the current time is 2026-11-23T21:59Z, but search results included posts timestamped up to 22:51 UTC, after the supposed "now". I went with the reported facts and avoided giving an exact "X hours ago".
- The KCRG read-link returned almost no article text (a video page with related-story links), so I relied on its title and the screenshot for what the segment showed.
- The system prompt says a fact-check may run to about 150 words but a plain "why is X trending" should be 40 to 90; this question mixes both ("is that a joke"), so I guessed at roughly 130 words including links. Unclear whether link URLs count toward the word limit.
- The image's alt text names the meteorologist; the guidance allows naming from alt text, but it wasn't needed, so I left it out.
- SKILL.md suggests reading reference/social-media.md before an "is this real?" question; I skipped it because the answer turned on news facts, not on reading a meme. Not sure that was intended.
- I did not try web search/web fetch; the script's read-link covered the outside pages.

## ANSWER

Not a joke, sadly. The US Army plans to blow up nearly 10,000 lb of degraded lead azide (an unstable explosive) at its ammunition plant in Middletown, Iowa, which will throw up a plume of lead dust. Iowa TV station KCRG put a "FIRST ALERT LEAD PLUME" wind map in its forecast, and people ran with it.

- The post that set it off is Alan's screenshot of that forecast: "American weather reporting now includes lead plume forecast." https://bsky.app/profile/gammacounter.bsky.social/post/3n2xgzrxfu227 Most of the trend is people quoting it with dark jokes.
- Laura Belin posted the Army's statement setting the detonation for Wednesday, 25 November: https://bsky.app/profile/laurarbelin.bsky.social/post/3n2x3z7cvzk2k
- ABC News reported the plan and the plume: https://abcnews.com/US/iowa-army-plant-lead-azide-detonation/story?id=138261613

Want to know where the wind is expected to carry it?

## STEPS

1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the brief.
2. `python3 case.py trending-lead-plume-iowa`: the user message (not signed in, search page with trending topics, 21:59 UTC, Europe/London).
3. Read app/server/system-prompt.md: system prompt.
4. Read skill/bluesky/SKILL.md: recipes; "why is something trending" recipe.
5. `bsky.py trending`: current top 10; no lead plume topic in it (Nvidia, SEC, GTA VI, etc.).
6. `bsky.py search-posts '"lead plume"' --sort top --since 2026-11-20`: found the viral post by @gammacounter.bsky.social (1,536 likes, 236 quotes) linking KCRG, plus many joke posts and news posts (Laura Belin, Whitney Zahnd, Blog for Iowa).
7. `bsky.py search-posts 'lead plume forecast' --sort latest --since 2026-11-20`: recent posts; KCRG link title "Wind forecast for Wednesday's lead azide detonation"; Residue Report post with CBS link and map alt text (~10,000 lbs lead azide, Iowa Army Ammunition Plant near Middletown).
8. `bsky.py media` on the gammacounter post: saved one image.
9. `bsky.py read-link` on the KCRG video page: title and publish date only (video page, no article text).
10. `bsky.py post` on Laura Belin's post: text says detonation of nearly 10,000 lb of toxic explosives scheduled for Wednesday 25 November; image alt text says it is the Army's statement.
11. Read /tmp/bsky-media-qof1ggwa/image1.jpg: KCRG "FIRST ALERT LEAD PLUME" map, "WED 12:00 PM", low-level winds, Burlington area, ABC 9 logo.
12. Read skill/bluesky/reference/social-media.md: "is this real" routine, quote post conventions.
13. ToolSearch select:WebSearch,WebFetch: loaded web tools.
14. WebSearch "Iowa Army Ammunition Plant lead azide detonation November 25 plume": ABC News, The Intercept, Task & Purpose, Fox stations report the planned detonation and lead dust plume (earlier date of Nov 20 in those reports).

## EVIDENCE

- Not a joke / real planned detonation: Laura Belin post (step 10), Residue Report post (step 7), WebSearch results incl. ABC News headline "Nearly 10,000 pounds of lead azide to be detonated at Army plant, causing lead dust plume" (step 14).
- "nearly 10,000 lb of degraded lead azide": Laura Belin post text (nearly 10,000 pounds), Residue Report post, ABC headline; "degraded" from Residue Report alt text and WebSearch summary (EPA on recrystallization).
- "Middletown, Iowa": Residue Report map alt text (step 7) and WebSearch summary (step 14).
- "unstable explosive": Residue Report post ("unstable lead azide"); WebSearch summary (sensitive to friction and shock).
- KCRG "FIRST ALERT LEAD PLUME" map: image from step 11; KCRG page title from step 9.
- Alan's post quote and that it drove the trend: search output step 6 (1,536 likes, 698 reposts, 236 quotes; many top results quote it).
- "Most of the trend is people quoting it with dark jokes": my reading of roughly 25 top and 24 latest search results (steps 6-7).
- Wednesday 25 November date: Laura Belin post (step 10); also Robert Hirschfeld "Army says Wednesday" (step 7). Not independently checked on the Army site.
- ABC News reporting: WebSearch result title only (step 14); article not fetched.

## FRICTION

- The topic the person named ("weather forecasts include lead plume") was not in the `trending` output at query time, so the trending recipe (trending, then feed LINK) could not be followed; I fell back to search-posts. SKILL.md has no instruction for a topic the person saw trending that has since dropped off the list, or for whether to tell them so. I did not mention it in the answer.
- `read-link` on the KCRG URL returned only the page title and sidebar headlines (it is a video page), with no indication that the main content was a video it could not read.
- The web search reporting gave Nov 20 as the date while Bluesky posts said Nov 25 (rescheduled); I relied on Laura Belin's post showing the Army statement for the new date. No guidance on how hard to chase a date conflict like this; I did not fetch the Army page.
- WebSearch result told me to append a "Sources:" list of markdown links; the system prompt says link each source once with full https addresses and keep it short. I followed the system prompt and linked ABC inline once.
- Whether to convert the detonation time (noon Central Wednesday = 18:00 London) was unclear for a non-local event; I left the time out to keep it short.

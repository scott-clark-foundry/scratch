## ANSWER

Here's a starter set. I checked that each one has posted pen or ink stuff recently:

- **Brad Dowdy (The Pen Addict)**: blog reviews and ink swatching, like "Swatching My 2026 SFPS Ink Haul" https://bsky.app/profile/penaddict.com/post/3mvan2ip3fx2s
- **The Well-Appointed Desk**: written ink and pen reviews https://bsky.app/profile/wellappointeddesk.bsky.social/post/3mysbzxljmk2h
- **Mike (inkdependence)**: YouTube ink and pen reviews https://bsky.app/profile/inkdependence.bsky.social/post/3mzbagtjjfc2g
- **Garry Eves**: fountain pen YouTuber who posts a pen and ink pairing every day https://bsky.app/profile/garryeves.bsky.social
- **Vicki (glasshorns)**: ink swatches on Tomoe River paper https://bsky.app/profile/glasshorns.bsky.social/post/3mw7vvn337s2a
- **Toga**: scans and chromatography for the Diamine Inkvent inks (this account is bridged from Mastodon) https://bsky.app/profile/toga.penfount.social.ap.brid.gy/post/3n2jgrcn74uh2
- **Kyris (akoniwolfsbane)**: paints characters in fountain pen ink and names the inks used https://bsky.app/profile/akoniwolfsbane.bsky.social/post/3mwlm5cjxik2y

Shortcut: the "Fountain Pen Network" starter pack has 29 more https://bsky.app/starter-pack/alche-mistress.bsky.social/3lkacjxzr3c2o

Cirrus can't make lists, so do that in the official app (https://bsky.app): Lists → New list → User list, then add people. The button names may differ a little.

Want me to find more swatchers?

## STEPS

1. Read answer-brief.md: the test instructions.
2. Ran case.py list-fountain-pen-people: user message (not signed in, on "fountain pen" search screen, asks for a list of reviewers and ink swatchers).
3. Read app/server/system-prompt.md: the system prompt.
4. Read skill/bluesky/SKILL.md: used the "Help me build a list" and "Who should I follow" recipes.
5. `search-starter-packs "fountain pen"`: found 2 packs (Fountain Pen People by nibsandflourishes, Fountain Pen Network by alche-mistress).
6. `search-starter-packs "ink"`: all off-topic (tattoo, publishers, art).
7. `search-users "fountain pen" --limit 25`: mostly name matches, few clear reviewers.
8. `starter-pack` on Fountain Pen Network: 29 accounts, including penaddict.com, wellappointeddesk, garryeves, inkyrocks, felicitysattic, glasshorns, inkdependence.
9. `starter-pack` on Fountain Pen People: first page of 130 accounts, plus a "Fountain Pens" feed by bergsbites.
10. `search-posts '"ink swatch"' --sort top`: swatch posts from glasshorns, akoniwolfsbane, toga, looseendingsstudio and others.
11. `search-posts '"ink review"' --sort top`: mostly about the Danny Boyle film "Ink"; useful hits were penaddict.com (Pennonia x Attila Sultis review) and wellappointeddesk (Kobe Hummingbird review).
12. `search-users "mountain of ink"`: no matching account (unrelated results).
13. `search-posts "fountain pen ink review" --sort top`: inkdependence YouTube reviews, penaddict "Swatching My 2026 SFPS Ink Haul", theinksploration.
14. `search-posts "swatch" --tag fountainpenink --sort top`: toga, backtoanalog (bridged), handmadebygrey, older swatch posts.
15. `profile` + `posts --no-reposts --limit 4` for penaddict.com, wellappointeddesk, inkdependence, garryeves, inkyrocks, theinksploration, glasshorns, felicitysattic: confirmed activity and follower counts. theinksploration now posts mostly digital art, inkyrocks last posted 2026-09-05, felicitysattic is a shop last posting in July 2026, so I left those three out.
16. `profile` + `posts --filter posts_no_replies` for oliveoctopus.ink, leighpod, kikayjournals, inkywoofs, tiiaaurora: all inactive on the topic or off-topic lately (inkywoofs had good ink reviews but none since April 2025), so I left them out.
17. `profile` + `posts` for toga.penfount.social.ap.brid.gy: bridged Mastodon account, active Nov 2026 with Inkvent swatches.
18. `media` on glasshorns post 3mw7vvn337s2a: downloaded 3 images.
19. Read reference/concepts.md lines (via grep) on "Lists and starter packs": the steps for creating a list.
20. Read /tmp/bsky-media-g3s91gzt/image1.jpg: confirmed a real fountain pen ink swatch (Kitty Inkpot Butter + Strawberry Bagel, swirl swatch and writing sample).

## EVIDENCE

- penaddict.com does ink reviews and swatching: search-posts outputs (posts 3n2qqrx4eqj2p "Pennonia x Attila Sultis Ink Review", 3mvan2ip3fx2s "Swatching My 2026 SFPS Ink Haul"); active per `posts` (latest 2026-11-23).
- Well-Appointed Desk does written ink and pen reviews: search-posts "ink review" (post 3mysbzxljmk2h, Kobe Hummingbird); bio says a blog for fountain pens and ink; latest post 2026-11-23.
- inkdependence does YouTube ink and pen reviews: post 3mzbagtjjfc2g (CoffeeMonsterzCo x Esterbrook ink, YouTube link); bio says "youtuber"; latest 2026-11-22.
- Garry Eves is a fountain pen YouTuber with daily pen and ink posts: bio "Fountain pen YouTuber"; `posts` show daily "Writing ..." posts through 2026-11-23.
- glasshorns posts ink swatches on Tomoe River: post 3mw7vvn337s2a alt text and the downloaded image I viewed.
- Toga posts Inkvent scans and chromatography and is bridged from Mastodon: post 3n2jgrcn74uh2 text; profile label "bridged-from-bridgy-fed-activitypub".
- Kyris paints characters in fountain pen ink and names the inks: posts 3mwlm5cjxik2y, 3mwo74wbmgc2s, 3mxykmzzgxk2d (alt text names the inks). I did not open these images.
- The Fountain Pen Network starter pack has 29 accounts: `starter-pack` output.
- Steps for creating a list in the official app: reference/concepts.md, "Lists and starter packs" (marked **Check**).
- Cirrus can't create lists: system prompt, "Cirrus does not have ... creating or viewing lists".

## FRICTION

- The "Help me build a list" recipe says to give 5 to 10 accounts and also explain how to create the list, but the system prompt caps a set of recommended accounts at about 180 words. With seven accounts, the starter-pack shortcut and the list steps, the answer comes in at about 190 words. The cap and the recipe pull against each other.
- `search-posts '"ink review"'` was flooded by reviews of the film "Ink". The recipe warns about loose matching, but even the exact phrase failed here, and I had to fall back on "fountain pen ink review".
- `search-users` matches handles and names loosely, so "fountain pen" returned mostly people whose names contain the words, not reviewers, and "mountain of ink" returned unrelated famous accounts. It was of little use for finding people by role.
- Starter packs list accounts without activity data. Several members turned out to be inactive (kikayjournals has 3 posts, last in Jan 2025; inkywoofs has not posted on the topic since April 2025). Checking each one costs a lot of calls, and the recipe gives no limit on how many candidates to check.
- The Fountain Pen People pack has 130 accounts but the script showed only the first page. I didn't page further.
- Toga is a Bluesky account bridged from Mastodon. Neither SKILL.md nor the system prompt says whether to recommend bridged accounts or warn that replies may not reach them. I mentioned the bridge in a few words.
- The recipe says to confirm visual niches with `media`. I opened the image for only one account (glasshorns) and relied on alt text for Kyris. The recipe doesn't say whether to check every account.
- I had web search and web fetch available but did not load them. The answer was entirely about Bluesky accounts, so the system prompt said to prefer the script.
- I read the list section of concepts.md with grep rather than the Read tool. That is a small departure from the "only run bsky.py" tool rule.

## ANSWER

Today's biggest AI blowup is Google's reported plan for a 24/7 AI TV channel starring *you*, and it's less a debate than a near-unanimous backlash.

- **Google's AI channel** (largest by far): Joseph Cox of 404 Media broke it around 10:20 this morning (https://bsky.app/profile/josephcox.bsky.social/post/3n2yqklvqml25), and it has about 370 quotes against 188 likes. Top reactions: "We live in hell" (https://bsky.app/profile/jkass99.bsky.social/post/3n2yqm46vrk2x) and Emily Lakdawalla's "NOBODY WANTS THIS…" (https://bsky.app/profile/elakdawalla.bsky.social/post/3n2z2aq7qkk2e). I didn't see anyone defending it in the top quotes.
- **Is Data an LLM?** Still rolling from yesterday: Chanda Prescod-Weinstein called comparing Star Trek's Data to LLMs "a bad attempt to retrofit allegory" (https://bsky.app/profile/chanda.blacksky.app/post/3n2w5pzwur22h); about 80 quotes, the top ones agreeing.
- **Smaller:** Mark Riedl objected to journalists calling Soares or people at ARC "AI Researchers" (https://bsky.app/profile/markriedl.bsky.social/post/3n2z3y2cmt22w).

Nvidia rehiring Jensen Huang is trending too, but it's playing as politics. Want me to dig into one?

## STEPS

- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: test instructions.
- python3 case.py pulse-ai-drama-today: user message ("What's the drama in the bluesky AI community today?"), signed in as @pfrazee.com, search page with trending topics, 2026-11-23 21:59 UTC, America/Los_Angeles (13:59 PT, local date Nov 23).
- Read app/server/system-prompt.md: system prompt.
- Read skill/bluesky/SKILL.md: drama recipe (trending, 2-3 community-term searches --sort top --since 2-3 days back, compare quote/reply counts, thread + quotes --top on top one or two).
- Read skill/bluesky/reference/social-media.md: SKILL.md says to read it before community drama; gave dispute-fairness rules.
- bsky.py trending: AI-related topics are "Google plans personalized AI TV channel" (#1), "Nvidia rehires Huang" (#3), "SEC probes Nvidia accounting", "Alice Huang espionage allegations".
- bsky.py feed (Google AI TV topic) --limit 10: 404 Media post (419 quotes), Joseph Cox post (188 likes, 371 quotes), many negative quote posts.
- bsky.py feed (Nvidia rehires Huang topic) --limit 10: mostly political coverage (Trump's role, senators, NYT/WaPo).
- bsky.py search-posts LLM / "AI researchers" / "generative AI" / "AI slop" --sort top --since 2026-11-21: found Chanda Prescod-Weinstein's Data/LLM post (Nov 22, 79 quotes), Mark Riedl's "AI Researchers" post (today), Fincher generative-AI controversy (Nov 20-21), VistaPrint AI filter (Nov 21-22), "ALL ART IS BETTER THAN AI SLOP" chain game (Nov 22).
- bsky.py search-posts Soares --sort top --since 2026-11-22: mostly unrelated Portuguese matches; Riedl post and Adam Becker's doomer-book joke (Nov 22); no larger Soares dispute found.
- bsky.py search-posts '"Measure of a Man"' --sort top --since 2026-11-21: Data/LLM discussion centred on Chanda's post.
- bsky.py search-posts AI --sort latest --limit 15: current noise; Google channel story still being shared at 22:41 UTC.
- bsky.py search-posts AI --sort top --since 2026-11-23: big AI-adjacent posts today (Warzel "AI hostage economy", McKibben on chips, data centers) but high likes and low quotes, not disputes; "anti-AI psychosis" quote of seweso.
- bsky.py quotes (Joseph Cox post) --top --limit 10: 372 quotes total; top quotes all negative toward Google's plan.
- bsky.py post (seweso post): Nov 21, 6 quotes; small, older.
- bsky.py quotes (Chanda post) --top --limit 8: 79 quotes; top ones agree and extend her point.

## EVIDENCE

- Google plans a 24/7 AI TV channel starring the viewer: Joseph Cox post text and 404 Media link card (feed of the trending topic). Reported plan, not verified independently.
- Cox posted around 10:20 this morning: post time 2026-11-23 18:19 UTC = 10:19 PT.
- About 370 quotes against 188 likes: `post` counts in the feed output (quotes 371, likes 188) and `quotes --top` (372 total).
- Largest by far: compared with other candidates' quote counts: Cox 371 / 404 Media 419 vs Chanda 79, Riedl 0, seweso 6, Fincher posts single digits.
- "We live in hell" and "NOBODY WANTS THIS…": `quotes --top` on Cox's post.
- Didn't see anyone defending it in the top quotes: the 10 top quotes from `quotes --top`, all negative.
- Chanda's Data/LLM post and quote: search-posts LLM output, 2026-11-22 17:36 UTC (yesterday in PT), 79 quotes.
- Top quotes agreeing: `quotes --top` on Chanda's post (Danny Lore, Brandon Seifert, Anthony Moser, etc.).
- Riedl's objection: search-posts "AI researchers" output, 2026-11-23 21:43 UTC, 13 likes.
- Nvidia/Huang trending and playing as politics: `trending` (#3) and its feed (Trump, senators, NYT, WaPo posts).

## FRICTION

- "The Bluesky AI community" is ambiguous: AI researchers/builders on Bluesky, or the wider anti-AI conversation. I took it broadly as "AI-related arguments on Bluesky" without asking; the recipe gives no guidance on choosing a community's terms when the community itself is vague.
- The recipe asks for "two or three biggest disputes", but the largest item today is a one-sided backlash, not a two-sided dispute. The recipe's "give each side's point" didn't fit; I described it as a backlash instead. Guidance on one-sided pile-ons against a company (versus disputes between people) would help.
- The recipe says to read the top one or two with `thread` as well as `quotes --top`; I used only `quotes --top` and `post`, since quotes carried the reaction and the 150-word limit left no room for thread detail.
- search-posts "Soares" matched mostly unrelated Portuguese posts; the loose matching was noisy as SKILL.md warns.
- Did not load or use WebSearch/WebFetch; nothing in this answer needed outside confirmation beyond what 404 Media's link card says, and I did not read the 404 article itself (`read-link`), so the plan is described only as reported.
- The app context says the person is on the search page showing trending topics; the system prompt does not say whether that should steer the answer toward the trending list, so I used it only as a starting point.

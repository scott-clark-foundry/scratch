## ANSWER
The biggest AI blowup today is over a Google patent for a 24/7 AI-generated TV channel where *you* are the star, with personalized ads stitched in. Joseph Cox's post on 404 Media's story has 463 quote posts (https://bsky.app/profile/josephcox.bsky.social/post/3n2yqklvqml25), nearly all against it: "We live in hell" (https://bsky.app/profile/jkass99.bsky.social/post/3n2yqm46vrk2x), "This is what we're destroying the planet for. 24/7 narcissism." (https://bsky.app/profile/shelleybwoke.bsky.social/post/3n2yrfnhpgc2o). Worth knowing: the article (https://www.404media.co/google-wants-to-make-a-24-7-ai-tv-channel-youll-be-the-main-character/) says it's a patent filing, not a product. I didn't find anyone defending it.

Two other big ones:
- Nvidia's board reinstating Jensen Huang is trending, though that fight is mostly about Trump and China chip exports (https://bsky.app/profile/atrupar.com/post/3n2z6nwpe722q).
- From Saturday: Kurt Andersen says Anthropic hasn't paid authors from its $1.5B settlement and should pay more (https://bsky.app/profile/kurtandersen.bsky.social/post/3n2tedxfuik24).

Want the top replies on the Google one?

## STEPS
Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: task instructions.
python3 case.py pulse-ai-drama-today: user message; signed in as @pfrazee.com, on search page with trending, time 2026-11-23T21:59Z, America/Los_Angeles (1:59pm PT Monday Nov 23).
Read app/server/system-prompt.md: system prompt.
Read skill/bluesky/SKILL.md: found the "What's the drama in a community?" recipe.
Read skill/bluesky/reference/social-media.md: SKILL.md says to read it before community drama.
python3 scripts/bsky.py trending: 10 topics; AI-related ones are #1 Google AI TV channel, #2 Nvidia rehires Huang, #3 Alice Huang espionage allegations, #5 SEC probes Nvidia accounting.
python3 scripts/bsky.py feed (each of the 4 AI-related topic feeds) --limit 8: Google story led by 404 Media (437 quotes) and Joseph Cox (463 quotes); Nvidia/Huang posts mostly political (Aaron Rupar 1802 likes); espionage and SEC feeds mostly political commentary.
python3 scripts/bsky.py search-posts for "LLM", "OpenAI", "Anthropic", "generative AI", "AI art", each --sort top --since 2026-11-21 --limit 8: Kurt Andersen/Rob Delaney on Anthropic authors' settlement (Nov 21), "Anthropic Riemann math slop" link (Nov 22), Schumer daughter/OpenAI jabs tied to Nvidia story, Fincher generative AI controversy (Nov 20-21), "ALL ART IS BETTER THAN AI SLOP" chain (Nov 22); most other hits were low-engagement.
python3 scripts/bsky.py quotes <Cox post> --top --limit 8: 463 quotes total, top quotes all critical ("We live in hell", "24/7 narcissism", "I would rather die").
python3 scripts/bsky.py post <Kurt Andersen post>: 2,586 likes, 65 quotes, posted 2026-11-21 14:57 UTC.
python3 scripts/bsky.py search-posts "Riemann" --sort top --since 2026-11-20: Riemann/AI math story dates to Nov 20-21, mostly jokes; older than today, left out.
python3 scripts/bsky.py search-posts "AI" --sort latest --limit 10: newest posts were low-engagement noise, no new dispute.
python3 scripts/bsky.py read-link <404 Media article> (two calls to see more of the text): article by Jason Koebler, Nov 23, says Google filed a patent, "My Channel", user as protagonist, ad stitcher; notes companies often patent things they never build.

## EVIDENCE
Google story is a patent for a 24/7 AI channel starring the user with inserted ads: read-link of the 404 Media article ("Google has filed for a patent...", "advertising stitcher").
"Patent filing, not a product": same article ("Tech companies regularly file for patents that they don't end up actually putting into real products").
Cox post has 463 quote posts: feed output for the Google topic and the `quotes --top` header ("463 quote posts in total").
"nearly all against it": top 8 most-liked quotes from `quotes --top` were all critical; the feed's top posts likewise. Based on those samples, not all 463.
"We live in hell" quote: @jkass99.bsky.social, from feed and quotes output.
"This is what we're destroying the planet for. 24/7 narcissism.": @shelleybwoke.bsky.social, from quotes output.
"Biggest" (largest): compared quote/like counts across trending feeds and community searches; Google posts had by far the most quotes (437 and 463) of the AI-community candidates. The Nvidia story has more likes but is a political story rather than an AI-community dispute.
"Didn't find anyone defending it": none of the feed or top-quote posts I read defended it; search is a sample.
Nvidia board reinstating Huang is trending, fight about Trump and China chip exports: trending list (#2, #3, #5) and the topic feed (Rupar post with Cotton/Cramer statements on chips and China; Bloomberg-sourced posts on Trump pressure).
Kurt Andersen post on Anthropic settlement, from Saturday: `post` output, 2026-11-21 14:57 UTC = Saturday Nov 21, 6:57am PT; text says $1.5B settlement, "Nobody's been paid a dime", suggests $20K per book.

## FRICTION
- Several fetched posts carry timestamps after the app_context "current time" (21:59 UTC), e.g. posts at 22:30-23:02 UTC. SKILL.md warns timestamps can be off, but this many later posts suggests the app_context clock or the data snapshot differ; I kept to "today" by PT date and did not rely on the times.
- "The bluesky AI community" is ambiguous: it could mean people who build/discuss AI, or Bluesky's largely anti-AI crowd talking about AI. The recipe says to use "the community's own terms", but gives no guidance on a community defined mostly by opposition. I searched both kinds of terms.
- The recipe asks for "two or three biggest disputes" but the largest item (Google patent) is less a dispute than a one-sided pile of criticism; no instruction on how to frame a topic with no second side. I said I found no defenders.
- The recipe says to include topics about "the company that made you". As the Cirrus copilot I am the system prompt's agent, which doesn't name its model maker; I included the Anthropic settlement post on the assumption that this rule applies, but it was two days old and not trending, so it's a judgment call whether it counts as "today".
- The 130-word limit is tight for three disputes with links and quotes; I'm at roughly the limit.
- Did not use web search (not needed; Bluesky plus read-link covered it).

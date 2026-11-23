## ANSWER
He comes from the right and criticizes Trump from there. His bio reads "Former GOP congressman. Voted to impeach Trump." A documentary about him is called *The Last Republican*, and he shared a Hollywood Reporter review that calls him an "Anti-Trump Conservative": https://bsky.app/profile/adamkinzinger.substack.com/post/3mgx4pymszs2i

He often frames his attacks in conservative terms:
- "Abandoning Ukraine to Putin spits on everything Reagan stood for" (Oct 12): https://bsky.app/profile/adamkinzinger.substack.com/post/3mxot27h24c2q
- On the deficit after the GOP's "Big Beautiful Bill": "Fiscal conservative my ass" (Feb 8): https://bsky.app/profile/adamkinzinger.substack.com/post/3mef5n2wacc26

Want to see where he stands on a specific issue?

## STEPS
- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test brief.
- python3 /home/user/scratch/bluesky-copilot/prompt-tests/v2/case.py politics-kinzinger-conservative: the user message; screen is @adamkinzinger.substack.com's profile.
- Read app/server/system-prompt.md: system prompt.
- Read skill/bluesky/SKILL.md: skill; used the "What are this person's politics?" recipe.
- python3 scripts/bsky.py profile adamkinzinger.substack.com: bio ("Former GOP congressman. Voted to impeach Trump..."), verified, ~734k followers, active today.
- python3 scripts/bsky.py posts adamkinzinger.substack.com --no-reposts --limit 30: posts from Nov 19-23, 2026, nearly all criticizing the Trump administration.
- python3 scripts/bsky.py search-posts conservative --author adamkinzinger.substack.com --limit 15: found the Reagan/Ukraine post, the "Fiscal conservative my ass" post, and the post sharing the Hollywood Reporter review of "The Last Republican".
- python3 scripts/bsky.py search-posts republican --author adamkinzinger.substack.com --limit 15: mostly Substack promo posts and GOP news commentary; nothing new for the answer.

## EVIDENCE
- Bio says "Former GOP congressman. Voted to impeach Trump.": profile command output.
- Documentary called "The Last Republican", Hollywood Reporter review headline calls him "Anti-Trump Conservative": search-posts conservative output, post 3mgx4pymszs2i (2026-03-13), link card title "'The Last Republican' Review: Adam Kinzinger Makes an Engaging Doc Subject in Portrait of an Anti-Trump Conservative".
- "Abandoning Ukraine to Putin spits on everything Reagan stood for", Oct 12: search-posts conservative output, post 3mxot27h24c2q, 2026-10-12 15:21 UTC (Oct 12 ET).
- "Fiscal conservative my ass" about the "Big Beautiful Bill" deficit, Feb 8: search-posts conservative output, post 3mef5n2wacc26, 2026-02-09 00:05 UTC = Feb 8, 7:05 pm ET.

## FRICTION
- The skill says not to assign a label like "conservative" unless attributed. The person's question is literally "is he a conservative?", so I answered "comes from the right" plus his own "GOP"/"Republican" framing and the review's label, attributed. It was a judgment call whether "comes from the right" is itself an unattributed label; I judged it supported by his bio ("Former GOP congressman").
- The Hollywood Reporter label comes from a link-card title in his post; I did not read the review itself (read-link) since the headline was all I quoted. The skill does not say whether quoting a link-card headline needs read-link first.
- Did not use web search; the Bluesky record was enough for this question, and his years in Congress (from memory) were left out rather than asserted.
- Dropped the "Join my Substack" promo posts mentally; the "republican" search was dominated by them, which made that search low-value.

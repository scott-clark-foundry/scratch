## ANSWER

He's a former Republican congressman who broke with Trump. He still talks like a Reagan-style conservative, but he says the party left him. His bio reads "Former GOP congressman. Voted to impeach Trump. Now fighting for our democracy."

- He argues from conservative principles: "I don't care how conservative you are. Abandoning Ukraine to Putin spits on everything Reagan stood for." https://bsky.app/profile/adamkinzinger.substack.com/post/3mxot27h24c2q
- He also goes after the GOP on spending: "Fiscal conservative my ass." https://bsky.app/profile/adamkinzinger.substack.com/post/3mef5n2wacc26
- In January 2025 he told Forbes he's "probably closer to a Democrat now because of how the Republican Party has changed" (The Hill: https://www.aol.com/kinzinger-changed-gop-m-probably-001635205.html).

His posts this past week are almost all aimed at Trump and his administration.

Want me to pull more of what he's said on a specific issue?

## STEPS

1. Read answer-brief.md: the test instructions.
2. Ran case.py politics-kinzinger-conservative: user on @adamkinzinger.substack.com's profile asks "is he a conservative? he keeps going after trump".
3. Read app/server/system-prompt.md: the system prompt.
4. Read skill/bluesky/SKILL.md: used the "What are this person's politics?" recipe.
5. ToolSearch select:WebSearch,WebFetch: loaded the web tools.
6. `bsky.py profile adamkinzinger.substack.com`: bio ("Former GOP congressman. Voted to impeach Trump..."), verified, about 734k followers.
7. `bsky.py posts adamkinzinger.substack.com --no-reposts --limit 30`: posts from Nov 18 to 23, 2026, nearly all criticism of Trump, Vance, Hegseth, RFK Jr. and Musk.
8. `bsky.py search-posts conservative --author adamkinzinger.substack.com --sort top --limit 10`: the Reagan/Ukraine post (2026-10-12), the "Fiscal conservative my ass" post (2026-02-09), and a Hollywood Reporter review calling him an "Anti-Trump Conservative" (2026-03-13).
9. `bsky.py search-posts republican --author adamkinzinger.substack.com --sort top --limit 10`: mostly Substack promo posts; one post about GOP senators blocking Trump's judges.
10. WebSearch "Adam Kinzinger still conservative Republican 2026": coverage of his anti-Trump PAC and the "closer to a Democrat" quote.
11. WebFetch of the AOL/The Hill article: confirmed the exact quote, dated January 5, 2025, from a Forbes interview.

## EVIDENCE

- The bio wording: `profile` output.
- The "I don't care how conservative you are... Reagan" quote: `search-posts conservative --author` output, post 3mxot27h24c2q, 2026-10-12.
- The "Fiscal conservative my ass" quote: same search, post 3mef5n2wacc26, 2026-02-09.
- The "probably closer to a Democrat now..." quote, its date and the Forbes origin: WebFetch of https://www.aol.com/kinzinger-changed-gop-m-probably-001635205.html (The Hill, January 5, 2025).
- "His posts this past week are almost all aimed at Trump and his administration": `posts --no-reposts --limit 30`, covering Nov 18 to 23, 2026.
- "Reagan-style conservative" and "says the party left him": my summary of the two posts and the Hill quote above. It is not a label he applies to himself in what I fetched.

## FRICTION

- SKILL.md says not to assign a label like "conservative" unless the person uses it about themselves. The question asks for exactly that label. In what I fetched, Kinzinger never calls himself a conservative outright: he argues from conservative principles, and the Hollywood Reporter headline he shared calls him an "Anti-Trump Conservative". I had to guess how far "attribute it" stretches. My answer says he "talks like a Reagan-style conservative", which may lean further than the rule allows. Quoting the Hollywood Reporter headline he shared might have been the safer move.
- The WebSearch result came back as a model-written summary with a reminder to include all the sources as markdown links. That conflicts with the system prompt's rule to link each page once with its full https:// address, and to use only the two to four sources that best support the answer. I followed the system prompt.
- The `search-posts republican` results were mostly his repeated "PS - Join my Substack" promo replies, which added noise. The skill has no way to filter out an author's boilerplate replies.

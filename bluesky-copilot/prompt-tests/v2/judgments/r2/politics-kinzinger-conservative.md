## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
current: N/A
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person was looking at Adam Kinzinger's profile and asked "is he a conservative? he keeps going after trump". They wanted to know how a man who attacks Trump every day can also be on the right. The answer opens with exactly that: "He comes from the right and criticizes Trump from there." It then backs the claim with his own bio, a label attributed to a named outlet, and two of his own posts, each linked. I checked every claim against the live network and all of them hold. The bio does contain "Former GOP congressman. Voted to impeach Trump." (the full bio begins "Dad. Husband." before that, so the quoted fragment is exact). Post 3mgx4pymszs2i (March 13, 2026) is his own share of a Hollywood Reporter review whose link-card headline reads "'The Last Republican' Review: Adam Kinzinger Makes an Engaging Doc Subject in Portrait of an Anti-Trump Conservative", so both the film title and the "Anti-Trump Conservative" label are real and correctly attributed to the review, not stated in the copilot's own voice. The Reagan quote is word for word from post 3mxot27h24c2q, dated October 12, 2026. "Fiscal conservative my ass" is word for word from post 3mef5n2wacc26, posted 2026-02-09 00:05 UTC, which is February 8 in the person's Eastern time zone, and the post does blame the "Big Beautiful Bill" for the deficit. The answer is about 90 words without links, leads with the conclusion, does not describe its own searching, and ends with a single follow-up offer. The political label is tied to his own words and a named review, which is the fair way to do it. One thing is missing, though not enough to fail a check: the answer does not say that he now sides with Democrats at the ballot box. On August 6, 2025 he wrote "I haven't voted for a Republican in four years" and called himself "a Republican (for now)", and on November 3, 2026 he published a letter urging lifelong Republicans to vote for a Democrat. A sentence on that would have drawn the line between "conservative", "Republican" and "votes Republican" more clearly. The answer's wording ("comes from the right") is careful enough that it does not mislead without it, and it never claims he is a loyal Republican, so I kept calibrated at PASS. I marked current N/A because the question is about a long-standing stance, not a story that moves by the hour; his posts up to the time of the question are still attacks on the Trump administration, which fits the answer.

## WHAT-I-VERIFIED
- `case.py politics-kinzinger-conservative --with-grounding`: screen is Kinzinger's profile; grounding gives the bio and notes that conservative, Republican and pro-Trump are different things here.
- `bsky.py profile adamkinzinger.substack.com`: verified account, 733,523 followers, bio "Dad. Husband. Former GOP congressman. Voted to impeach Trump. Now fighting for our democracy..."; the quoted fragment is exact.
- `bsky.py post .../3mgx4pymszs2i`: March 13, 2026, his post "Review of my documentary The Last Republican from The Hollywood Reporter", link-card title ends "Portrait of an Anti-Trump Conservative". Matches the answer.
- `bsky.py post .../3mxot27h24c2q`: October 12, 2026 15:21 UTC, "I don't care how conservative you are. Abandoning Ukraine to Putin spits on everything Reagan stood for." Quote and date match.
- `bsky.py post .../3mef5n2wacc26`: 2026-02-09 00:05 UTC (February 8 Eastern), deficit post naming the "Big Beautiful Bill", ending "Fiscal conservative my ass". Quote and date match.
- `bsky.py search-posts conservative --author ...`: no post where he rejects the conservative label; the cited posts are the most relevant ones.
- `bsky.py search-posts "I am a Republican" --author ...`: August 6, 2025 post, "I haven't voted for a Republican in four years ... I'm a Republican (for now)". Context the answer left out.
- `bsky.py search-posts Democrat --author ...`: November 3, 2026 letter "To the Republican Who's Never Voted for a Democrat" and November 2026 posts welcoming a Democratic Senate win in Mississippi; also criticism of Democrats (Polis, shutdown messaging). Context the answer left out.

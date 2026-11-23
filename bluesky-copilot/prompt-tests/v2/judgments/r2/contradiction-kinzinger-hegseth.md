## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: N/A
calibrated: PASS
fair-and-safe: PASS
current: N/A
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person was looking at Adam Kinzinger's post "I've always said Hegseth never had the qualifications or the temperament for this job" and asked, with some scepticism, whether he has ever said anything that contradicts it. They wanted a yes or no, plus the closest thing to a contradiction if one exists. The answer gives that in its first two sentences: "Not really a reversal", but his first take was gentler than "always said" suggests. It then backs this with the two most useful pieces of evidence, both from television and not from Bluesky, which is a step further than the case scout went. I checked each claim. The Hill article (dated November 13, 2024) does quote Kinzinger telling CNN's Anderson Cooper that Hegseth "actually is very smart when it comes to things like defense policy", that the pick was "weird", and that Hegseth "really doesn't have experience in running an organization like that"; the quotes are exact. The Yahoo page (a HuffPost story, updated January 7, 2025) does report him on Colbert saying "Pete served honorably in the military" and that "there's probably 50,000 people as or better qualified"; the answer's wording matches. The claim that every Hegseth post found on Bluesky back to November 2024 is critical holds up: my own searches returned the same posts (the Crusades tattoo posts of November 16 and 17, 2024, "Dems questions today for Hegseth seemed weak" in January 2025, "Hegseth is a dork" and "such a fraud" in late 2025, through the November 2026 impeachment posts), and none praises him. A few of those posts are bare links to his own newsletter, so "critical" is a slight simplification, but nothing contradicts it. The conclusion is sized to the evidence: it does not call him a hypocrite or declare him consistent, it shows the mild early praise next to the same interview's doubts, and it admits that search can miss posts and that his pre-2023 record is not on Bluesky. It stays neutral and attributes everything to his own words. Length is close to the limit for a fact-check (roughly 155 words without links) but within it, and there is one follow-up offer. Three small weaknesses, none enough to fail a check: the sentence "I searched his posts for 'Hegseth,' 'qualified' and 'unqualified'" is a little process narration (acceptable as a statement of the search's limits); no Bluesky post is linked even though the third bullet relies on them, so the person cannot open an example of the early criticism; and The Hill link goes to an odd "digital-release" AMP address, which does open but is not the standard article page. The post's video was not watched and the answer does not mention it, but the question is about the text claim, so I marked that check N/A.

## WHAT-I-VERIFIED
- `case.py contradiction-kinzinger-hegseth --with-grounding`: question and scout grounding (only criticism on Bluesky since November 2024; joined August 2023).
- `bsky.py thread` on the focused post: text is "I've always said Hegseth never had the qualifications or the temperament for this job...", posted 2026-11-23 21:46 UTC, with a video and a Substack link in his own reply.
- `bsky.py search-posts Hegseth --author adamkinzinger.substack.com --until 2025-04-01`: 5 posts from November 2024 to March 2025, all critical or neutral; none praising Hegseth.
- `bsky.py search-posts Hegseth --author ... --since 2025-04-01 --until 2025-11-29`: 6 posts ("Hegseth is a dork", "such a fraud", "wary of Trump and Hegseth playing war games", and others), all critical.
- `bsky.py search-posts Hegseth --author ... --sort latest --limit 15`: October to November 2026 posts, all critical (impeachment petition, Arlington, deployment planning).
- `bsky.py profile adamkinzinger.substack.com`: verified, joined 2023-08-31, about 733.5k followers.
- WebFetch of The Hill link in the answer: dated November 13, 2024; CNN interview with Anderson Cooper; "very smart when it comes to things like defense policy", "weird", and "really doesn't have experience in running an organization" all present verbatim.
- WebFetch of the Yahoo link in the answer: HuffPost story updated January 7, 2025; Late Show with Stephen Colbert; "Pete served honorably in the military" and "there's probably 50,000 people as or better qualified than Pete Hegseth to run the DOD" present.

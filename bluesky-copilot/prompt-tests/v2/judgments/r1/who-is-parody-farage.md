## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
useful-in-a-side-panel: PASS

## CRITIQUE
The person was looking at a post written in Nigel Farage's first-person voice and wanted to know whether the account really is Farage, and if not, who runs it. The answer opens with the verdict ("Nope, not the real Farage") and gives the two pieces of proof straight away: the display name "Parody Nigel Farage" and the bio. I checked both against the live profile and they match; the bio quote is word for word. The "about 47,000 followers" figure matches the live count of 47,123. The claim that the account "posts jokes in his voice most days" holds up: the last 15 original posts run from 18 to 23 November 2026, at least one a day, all first-person satire. I downloaded the post's image myself: it is a headline screenshot reading "Britons turn against Nigel Farage in record numbers, new poll reveals", exactly as quoted, with no outlet named. The answer correctly calls the headline "real-looking" instead of real, because the copilot did not check it, and offers to check, which keeps the joke account separate from the news claim it riffs on without padding the reply. One small looseness: "blaming 'Russian bots' for any support" is a paraphrase of the post's joke that what matters is "the opinion of thousands of Russian bots"; the quoted words are exact and the gloss is a fair reading, so I did not fail it. The answer does not try to unmask the anonymous person behind the account, attributes the "grifter" wording to the account's own bio, and takes no side. It runs to about 100 words and links the profile it relies on. A nice extra would have been a link to the focused post, but the person is already looking at it. No check failed.

## WHAT-I-VERIFIED
- `bsky.py profile parodypm.bsky.social`: display name "Parody Nigel Farage"; bio begins "Parody account. Here to take the piss out of the full time grifter and part time MP who leads Reform UK."; 47,123 followers; joined 2023-05-20.
- `bsky.py thread <focused post>`: post text mentions a November poll, 62% unfavourable, and "the opinion of thousands of Russian bots"; one image with no alt text; 13 replies, all treating it as a joke.
- `bsky.py media <focused post>` then opened the image: headline "Britons turn against Nigel Farage in record numbers, new poll reveals", subhead "More than six in ten have unfavourable view of Reform UK leader, says survey", label "NEWS | POLITICS", no outlet name visible.
- `bsky.py posts parodypm.bsky.social --no-reposts --limit 15`: daily satirical posts in Farage's voice from 18 to 23 November 2026, supporting "most days".
- Not checked: whether the poll headline is a real news item (the answer made no claim that it is).

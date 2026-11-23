## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
current: PASS
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person tapped a post from The Onion with the headline "Nvidia Stock Surges After Aroused Jensen Huang Announces He's Close" and asked "is this real lol". They wanted a quick yes or no, and ideally a word on whether anything true sits behind the joke. The answer opens with "Nope, it's satire", names the account as The Onion, and then adds the one piece of context that matters: the joke rides on real news from the same day, that Nvidia's board reinstated Jensen Huang as CEO, with a link to Nvidia's own press release. I checked four claims. (1) The account is The Onion: the live profile for @theonion.com shows the name "The Onion", the bio "America's Finest News Source", a verified check and about 1.36 million followers. (2) The headline is a joke: the post text and the attached image (a photo above the headline and "the ONION" logo) match, and the wording is plainly a sex joke, not a report. (3) Nvidia's board reinstated Huang today: the linked Nvidia newsroom page is dated November 23, 2026 and says the board "voted unanimously to reinstate Mr. Huang" as President, CEO and board member. (4) He had been out (implied by the follow-up offer): the same release thanks Colette Kress "for her outstanding service as interim CEO". The story was still current at the time of the question: "Nvidia rehires Huang" is the number 2 trending topic, and AP, CNBC, the Guardian and NPR links about the reinstatement were being shared within the hour, with nothing reversing it. The reply is about 45 words, starts with the answer, does not describe its own search, and offers a single follow-up. It names Huang from the headline text, not from his face, and stays out of the political argument around the reinstatement. Two small things did not change the verdict: the reply gives the Onion's handle without a link to the profile (the person is already looking at that post, and the press release is an openable source), and it does not say whether the "stock surges" part is true (posts report a rise of roughly 29 to 31 percent, so it would have been a nice touch, but leaving it out is not an error).

## WHAT-I-VERIFIED
- `bsky.py post https://bsky.app/profile/theonion.com/post/3n2yxuvyje62b`: post by @theonion.com at 2026-11-23 20:30 UTC with the exact headline quoted in the case, one image.
- `bsky.py profile theonion.com`: "The Onion", bio "America's Finest News Source", verified, 1,362,065 followers.
- `bsky.py media` on the post, then opened the image: photo of a wide-eyed man in a leather jacket above the same headline and "the ONION" logo; an Onion-branded satire card.
- `bsky.py trending`: "Nvidia rehires Huang" is number 2; "Alice Huang espionage allegations" number 3; "SEC probes Nvidia accounting" number 5.
- `bsky.py read-link` on the Nvidia newsroom URL given in the answer: the page exists, is titled "NVIDIA Board Reinstates Jensen Huang as President, CEO and Board Director", dated November 23, 2026, and mentions Colette Kress as interim CEO.
- `bsky.py search-posts "Nvidia Huang" --sort latest --limit 15`: posts from the hour around the question link AP, CNBC, Guardian and NPR stories on the reinstatement, and report shares up about 29 to 31 percent; nothing contradicts or supersedes the answer.

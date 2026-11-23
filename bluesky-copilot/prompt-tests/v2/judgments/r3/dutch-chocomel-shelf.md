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
The person saw a Dutch post with a photo in their Discover feed and asked what it says and what joke they were missing. They wanted a translation and the punchline, which sits entirely in the photo. The answer gives both, in that order, in about 75 words. I checked four claims. (1) The quoted post text "Rare instructies krijgen sommige vakkenvullers hoor" matches the live post word for word (the answer drops only the final full stop), and "some shelf stackers sure get strange instructions" is a faithful translation. (2) The photo does show Chocomel chocolate-milk cartons printed with large letters; I opened the image and one shelf reads gift, gift, heart, "K U T", a plain carton, then "V V D", so "lined up to spell KUT VVD" is correct. (3) "Kut" is a vulgar Dutch swear word and the VVD is a Dutch right-liberal party, both of which match the scout's grounding and common knowledge; "roughly f***ing VVD" is a fair rendering of the insult. (4) The reading that someone arranged the cartons on purpose is supported by the replies I re-fetched ("Uitstekend gevuld die vakken!! Niets meer aan doen.", "Een bonus voor die persoon aub"). The answer attributes the insult to whoever arranged the shelf and takes no side on the party, so it stays neutral. Two small weaknesses, neither enough to fail a check: the last sentence calls the shelf "a protest sign" where the post's humour is really the deadpan caption pretending a shelf-stacker was told to do this, though the translation next to the description makes that plain enough; and the only link is the post itself, with no link for what the VVD is, which is acceptable for a simple "what's the joke" question. The answer leaves out the unclear second shelf ("D V V H J J P P") rather than guessing at it, which is the right call. Nothing in the question is time-sensitive, so the "current" check does not apply.

## WHAT-I-VERIFIED
- `python3 case.py dutch-chocomel-shelf --with-grounding`: printed the app context, the question, and the scout's grounding (post text, photo contents, meaning of "kut" and VVD).
- `python3 scripts/bsky.py thread <post URL>`: post text is "Rare instructies krijgen sommige vakkenvullers hoor."; one image, no alt text; 346 likes, 24 replies; top replies treat the shelf as a deliberate prank.
- `python3 scripts/bsky.py media <post URL>`, then opened the image: PLUS supermarket shelf of Chocomel cartons; one shelf reads D V V H J J P P, the next reads gift, gift, heart, K U T, plain carton, V V D.
- Word count of the answer: about 75 words not counting the link, under the 80-word limit for a simple question; one follow-up offer; first sentence is the translation.

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
The person saw a Dutch post with a photo and no alt text (the author's written description of the image), and asked what it says and what the joke is. The joke lives entirely in the photo: Chocomel chocolate-milk cartons with big printed letters, lined up on a supermarket shelf to spell a rude message about a Dutch political party. The answer opens with exactly that ("Someone rearranged the Chocomel cartons to spell out "♥ KUT VVD""), explains the two words a non-Dutch reader lacks, and then gives the caption, its translation and why it is deadpan. That is what the person needed, in the right order, in about 120 words.

Claims I checked:

1. What the shelf spells. I downloaded the photo and looked at it. The third shelf shows two gift icons, a heart, then K, U, T, one plain carton, then V, V, D. "♥ KUT VVD" is an accurate reading. The copilot left out the unrelated letters on the shelf above ("D V V H J J P P"), which is a reasonable call since they are not part of the message.
2. The caption quote and translation. The live post text is exactly "Rare instructies krijgen sommige vakkenvullers hoor." and "Some shelf stockers sure get strange instructions" is a faithful translation. Reading it as deadpan (pretending a stocker was instructed to do this) fits the text and the replies.
3. The reply quote. "Een bonus voor die persoon aub" is word for word what @erkamp.bsky.social wrote, and "A bonus for that person, please" is correct. Saying the replies "play along" matches the eight replies I read (for example "Uitstekend gevuld die vakken!! Niets meer aan doen.").
4. The Sinterklaas letter packs. A web search returns the same Vimeo page, titled "Chocomel Letters - Case Study", and its summary says the 1-litre packs carried capital letters during the Sinterklaas period. I could not open the Vimeo page itself (it showed a security check), so I confirmed only the title and the search summary. The source is the advertising agency's own case study and is undated; the answer does not say so. For a low-stakes background fact that the photo itself bears out (letter cartons on a shelf in late November), I do not count this as a failure, but a more neutral source or a "per the agency" tag would be better.
5. "Kut" as a crude swear word and the VVD as a big Dutch party. Both are correct and match the scout's grounding. The answer openly marks the VVD part as general knowledge rather than something it looked up.

Smaller points, none enough to fail a check: the answer says the cartons were "rearranged" by "someone", which is neutral about who did it (one reply suggests a passer-by), and it calls the author "he" based on the first name. It describes the message as "a rude anti-VVD message" without taking a side. It links the post and the one outside source, does not point to any app controls, and ends with a short offer rather than extra context, which fits the request for friendly answers that get to the point.

## WHAT-I-VERIFIED
- `case.py dutch-chocomel-shelf --with-grounding`: printed the question, the app context and the scout's grounding.
- `bsky.py thread <post>`: post text is exactly "Rare instructies krijgen sommige vakkenvullers hoor."; 303 likes, 20 replies; the @erkamp.bsky.social reply reads "Een bonus voor die persoon aub"; other replies play along.
- `bsky.py media <post>` then Read on image1.jpg: PLUS supermarket shelf of Chocomel cartons; one shelf reads D V V H J J P P, the next reads gift, gift, heart, K U T, plain carton, V V D.
- WebFetch https://vimeo.com/117814267: hit a Vimeo security check; only the title "Chocomel Letters - Case Study" was visible.
- WebSearch "Chocomel letterpakken Sinterklaas letters op pak": top result is the same Vimeo case study; summary says the 1-litre packs carried capital letters during the Sinterklaas period, and that the source is the agency's own, undated account.

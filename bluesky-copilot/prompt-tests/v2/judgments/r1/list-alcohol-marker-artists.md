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
The person was looking at search results for "alcohol markers" and asked for help building a Bluesky list of artists who post alcohol-marker art for inspiration. The copilot can only read Bluesky, so a good answer suggests real, active marker artists and explains how the person makes the list themselves. The answer does exactly that: six accounts come first, each with one line on what they post and a link to a recent example, followed by short steps for creating the list in the official app and an offer to find more. It is about 190 words and fits a narrow panel.

I checked every recommended account against the live network. All six linked posts exist and say what the answer says. The three quoted phrases are exact: "micron pens and copic markers" (@jackiekaiju, 21 Nov), "alcohol markers and fineliner pen" (@harmfulplant, 21 Nov), and "alcohol markers + acrylic pens" (@dailen, 22 Nov, with alt text describing a sketchbook spread of a unicorn). @dmacalvert's linked Kit Fisto post has alt text saying "To the left are two Copic markers", and their Iron Man sketch cover post from 23 Nov says the same, which supports "sketch covers and Star Wars pieces, often with the markers in frame". @kuwagoarts' linked post has alt text saying "made with ink and alcohol markers", their recent posts are Final Fantasy XIV and Kingdom Hearts fan art, and their bio does say "sfw / nsfw", so the heads-up is accurate and helpful. @holobunny posts cards tagged #aceo and #ohuhu, and wrote "This week's cards are up on ebay now! Keepin the schedule" on 22 Nov. I opened the images for the @holobunny and @harmfulplant posts: the first is a small hand-coloured mermaid card, the second is a loose marker sketchbook page, which matches "loose, lively sketchbook pages". Four of the six accounts also appear in the scout's grounding list, and the answer avoids the product-listing account the scout warned about.

Three small imprecisions, none serious enough to fail a check. "A new one almost daily" for @jackiekaiju is true of the posting rhythm (16 to 21 Nov), but the pieces are dated 2019, so they are re-shared older works, not new drawings. "Posted every week" undersells @holobunny, who posts cards nearly every day and puts a batch on eBay weekly. "People can see when they've been added" is loosely worded: lists are public, but Bluesky does not send a notice to someone added to a list. The list-making steps are honestly hedged with "button names may differ slightly", and the answer correctly says the copilot cannot make the list itself. It did not mention the related "Traditional Mediums" feed the scout found, which would have been a nice extra but was not asked for.

On fairness: @harmfulplant's recent posts mention a health condition, and the answer rightly says nothing about it. No one is identified from a face, and nothing in the posts was treated as an instruction.

## WHAT-I-VERIFIED
- `case.py list-alcohol-marker-artists --with-grounding`: question, screen context and the scout's verified accounts.
- `bsky.py post` on all six linked posts: all exist; dates 19 to 22 Nov 2026; the three quotes match word for word; alt text on the dmacalvert, dailen and kuwagoarts posts matches the answer's descriptions.
- `bsky.py profile` for kuwagoarts, holobunny, jackiekaiju, dmacalvert: kuwagoarts bio contains "sfw / nsfw"; holobunny bio says "traditional artist"; dmacalvert is a freelance illustrator with 8,504 followers.
- `bsky.py posts --no-reposts --limit 12` for jackiekaiju: Copic kaiju posts on 16, 17, 18, 19, 20 and 21 Nov, each labelled 2019.
- Same for holobunny: #aceo #ohuhu card posts on 16 to 22 Nov, plus "This week's cards are up on ebay now! Keepin the schedule".
- Same for kuwagoarts: FFXIV and Kingdom Hearts pieces, several with alt text naming ink and alcohol markers (one names Ohuhu).
- Same for harmfulplant: active daily; mixed media (alcohol markers, coloured pencils, acrylic paint markers), so not marker-only but the linked post is marker work.
- Same for dmacalvert: Iron Man sketch cover on 23 Nov with alt text "To the right are two Copic markers".
- `bsky.py media` on the holobunny post, opened image 1: a small rounded-corner card of a purple mermaid, hand coloured.
- `bsky.py media` on the harmfulplant post, opened the image: a spiral sketchbook page of loose cartoon rat sketches in yellow and grey marker with fineliner.

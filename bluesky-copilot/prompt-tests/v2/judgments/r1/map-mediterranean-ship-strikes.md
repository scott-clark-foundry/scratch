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
The person was looking at a post by @maks23.bsky.social that shares a map with no alt text (no written description of the image) and asked what the map shows. They wanted a plain reading of the picture: what the subject is and what the symbols and colours mean. The answer does this in its first sentence ("a map of Ukrainian drone strikes on Russian-linked ships in the Mediterranean, mostly off Libya, from December 2025 to 22 November 2026") and then gives a three-bullet legend. I downloaded the image and checked each claim against it. The title credits "@clement_molin" and the post text says "compiled by @clementmolin.bsky.social", so the attribution is right. The four strikes named (tanker Qendil, 19 Dec 2025; LNG carrier Arctic Metagaz, 3 Mar 2026; Lady Mariia, 6 Sep 2026; corvette Merkuriy in Benghazi port, 21-22 Nov 2026) match the map labels. The blue arrows do start at Misrata, the legend does call them "Schematic direction from western Libya", and it does label Misrata an "Alleged Ukrainian drone base (RFI, Russian sources)", so the answer's word "alleged" and its "schematic, not real flight paths" are the map's own hedges carried over correctly. Yellow is the Tripoli government and red is Haftar's Libyan National Army, with red squares for Russian bases in the east, as the answer says. The one outside source, an AP story, is real: I fetched the link and it reports Russia blaming Ukrainian sea drones for the Arctic Metagaz attack. My own web search also found no reporting on the Benghazi corvette strike, so "I couldn't find outside reporting on the Benghazi strike yet" is honest. Small weaknesses that do not fail a check: the answer leaves out the fifth strike (shadow-fleet ship Ascalon, 22 Nov 2026, marked "reported"), so calling Merkuriy the "most recent" is slightly loose, though the list is framed with "They include"; it also skips the naval drone found on Lefkada and the map's note that positions are approximate; and it links the post but not the map maker's profile. The answer is about 190 words, starts with the answer, links its sources, and takes no side on the war.

## WHAT-I-VERIFIED
- `case.py map-mediterranean-ship-strikes --with-grounding`: question is "can you explain this map? what am i looking at"; grounding lists five strikes, faction shading, Lefkada drone, alleged Misrata base.
- `bsky.py thread <post URL>`: post text is "A map of attacks on Russian ships in the Mediterranean, compiled by @clementmolin.bsky.social", one image with no alt text, 248 likes, 4 direct replies.
- `bsky.py media <post URL>` and Read of image1.jpg: title, subtitle, legend, strike labels, arrows from Misrata, colours and Russian base markers all match the answer; Ascalon and Lefkada items are present on the map but not in the answer.
- WebFetch of the wsls.com link: AP story dated 4 March 2026, "Russia blames Ukrainian sea drones after tanker explodes and sinks in the Mediterranean", ship is Arctic Metagaz; matches the answer's claim.
- WebSearch "Benghazi Russian corvette Merkuriy naval drone strike November 2026": no coverage of a Merkuriy or Benghazi port strike found; many syndicated AP copies of the Arctic Metagaz story, which supports "widely reported".

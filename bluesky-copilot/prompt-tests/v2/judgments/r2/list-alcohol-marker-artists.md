## VERDICT
FAIL

## CHECKS
answers-the-question: PASS
grounded: FAIL
used-what-was-attached: PASS
calibrated: FAIL
fair-and-safe: PASS
current: N/A
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person was looking at search results for "alcohol markers" and asked for help building a Bluesky list of artists who post alcohol-marker work for inspiration. The answer leads with the result: a proposed list of seven accounts shown on a card for the person to review (the copilot's tool reply confirms the card was shown and nothing was published, so the answer does not overclaim what it did). The picks hold up. I re-fetched all seven accounts and each is active and posted marker work in the past week: Darren Calvert's Iron Man sketch cover with Copic markers (Nov 23), Jackie B's "micron pens and copic markers" kaiju (Nov 18 to 21), Ari's "gray copic marker" Doctor Doom (Nov 22), harmfulplant's "alcohol markers and fineliner pen" pieces (Nov 18 and 21), Riversong28's #Ohuhu ACEO cards (daily, Nov 19 to 23), Holo's #ohuhu ACEO cards (Nov 16 to 22) and Mathew's "blank copic drawing" of Emma Frost (Nov 19). The two linked posts exist and match their descriptions; I opened both images (a purple and red marker Shin Godzilla, and polar bears under an aurora). The heads-ups are accurate too: Darren posts jokes and stories alongside art, Ari posts Substack and Colorado ballot commentary, and Mathew's bio says he draws pinup. The answer is about 125 words, warm, and offers one follow-up.

The failure is one sentence: "There were no starter packs for marker art to borrow from". That is not true. A starter pack named "Marker Artists" by @dasfabelwesen.bsky.social exists (https://bsky.app/starter-pack/dasfabelwesen.bsky.social/3l663hnyuc22j, 13 accounts, "Amazing artists that use mainly markers to colour or paint their artworks"), and it even includes Darren Calvert, one of the copilot's own picks. The copilot only tried two search phrases ("copic" and "marker art"), both of which return nothing; searching "markers" or "marker artists" finds the pack straight away. So the sentence fails grounded (live data contradicts it) and calibrated (two empty searches were reported as "there are none" instead of "I didn't find any"). It matters for this person because a ready-made pack of marker artists is exactly the shortcut someone building this list would want, and the answer told them it does not exist. A smaller point that did not change any grade: several pieces are older work reposted this week (Jackie's are dated 2019, Darren's 2020) and Riversong28's cards are mixed media with Ohuhu as one of several tools, so "posted Copic or Ohuhu work in the past week" is accurate but slightly generous.

## WHAT-I-VERIFIED
- `case.py list-alcohol-marker-artists --with-grounding`: the question, the screen (search for "alcohol markers") and the scout's notes.
- `profile` and `posts --no-reposts` on all seven accounts: all active Nov 22 to 23; follower counts match the report (8,504 / 172 / 4,034 / 1,221 / 1,414 / 131 / 9,140); each has marker posts within the past week as listed above.
- `posts harmfulplant.bsky.social --limit 40`, filtered for "marker": alcohol-marker posts on Nov 18 and Nov 21, mixed with acrylic paint marker and colored pencil pieces.
- `posts theartofmathew.bsky.social --limit 40`, filtered for "copic": "blank copic drawing" Nov 19 and "done with copic markers" Nov 15; bio says "drawing Pinup".
- `posts ariartaccount.bsky.social --limit 60`, filtered for politics: Colorado proposition posts on Nov 4, confirming "non-art chatter".
- `thread` on the jackiekaiju link (3n2mlz3wg7k2b): "Shin Godzilla, micron pens and copic markers on paper, 2019", posted Nov 18.
- `thread` on the riversong28 link (3n2wfgztmkk2o): "Today's new #ACEOs … #Ohuhu … #polarbear #mushrooms", posted Nov 22.
- `media` on both linked posts, images opened: inked Godzilla coloured in purple and red marker; ACEO card of sleeping polar bears under an aurora.
- `search-starter-packs "copic"` and `"marker art"`: no results (matches the copilot's steps).
- `search-starter-packs "markers"` and `"marker artists"`: both return "Marker Artists" by @dasfabelwesen.bsky.social.
- `starter-pack` on that pack: 13 accounts, created 2024-10-10, includes @dmacalvert.bsky.social. This contradicts "There were no starter packs for marker art".

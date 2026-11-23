## VERDICT
FAIL

## CHECKS
answers-the-question: PASS
grounded: FAIL
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
current: N/A
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person was looking at search results for "alcohol markers" and asked for help building a Bluesky list of artists who post alcohol-marker art to draw inspiration from. The answer led with the result (six suggested accounts, a few words on each, about 100 words in all), linked two example posts, offered one follow-up, and described the draft as "ready to review" rather than claiming it was published, which matches the tool result ("Shown to the person as a card with a button. Nothing has been published"). Five of the six descriptions held up when I re-fetched them: @dmacalvert.bsky.social has 8,504 followers and posted an Iron Man sketch cover on 23 Nov whose image description mentions two Copic markers; @jackiekaiju.bsky.social posted "Shin Godzilla, micron pens and copic markers on paper" on 18 Nov; @holobunny.bsky.social posts ACEO cards (small collectible art cards) tagged #ohuhu nearly every day and wrote "This week's cards are up on ebay now! Keepin the schedule" on 22 Nov; @quirkycryptid.bsky.social's flamingo post is real, the picture is a pink-and-orange marker flamingo, and the bio does say "18+ Content Sometimes"; @ariartaccount.bsky.social's bio says "I draw mech, robots, and BIONICLE" and a 22 Nov Doctor Doom post is described as pen and gray Copic marker. The one line that fails is "@elloerin.bsky.social: daily sketchbook doodles, colored in alcohol markers". Erin's daily doodles are uncoloured pencil sketches: I opened the 21 Nov "Big Sweater" doodle and it is plain graphite. Only an occasional doodle gets coloured; the linked witch post says so itself ("This doodle won the color for the last set of doodles!"), and a search of Erin's posts for the alcohol-marker tag finds two this week and before that one each in September, May, April and January. So a person adding Erin for marker inspiration would mostly get pencil sketches, and the description tells them otherwise. That is a small error in an otherwise careful answer, but the grounded check requires every factual statement to be supported, so it fails. Two lesser notes that did not change any grade: the 18+ warning for quirkycryptid is fair but mild, since that account reposted an explicit illustration on the same day as the flamingo; and the Calvert and Jackie pieces "posted in the past week" are older drawings (2020 and 2019) reshared this week, which the wording allows.

## WHAT-I-VERIFIED
- `case.py list-alcohol-marker-artists --with-grounding`: question, screen and scout facts; scout expected suggestions plus no claim of having created the list.
- `bsky.py profile` on all six handles: all exist and posted on 22 or 23 Nov; dmacalvert 8,504 followers; quirkycryptid bio "18+ Content Sometimes"; ariartaccount bio "I draw mech, robots, and BIONICLE".
- `bsky.py post` on the six cited posts: flamingo post (23 Nov, image description says alcohol markers), Erin's witch post (22 Nov, #AlcoholMarkers, "This doodle won the color"), holobunny "This week's cards are up on ebay now!" (#aceo #ohuhu), Ari's Doctor Doom (gray Copic), Calvert's Iron Man cover (two Copic markers, drawn 2020), Jackie's Shin Godzilla (micron pens and Copic markers, 2019).
- `bsky.py media` + Read on Erin's witch post: marker-coloured witch holding a steaming cup, dated November 17th; matches "Erin's witch".
- `bsky.py media` + Read on the flamingo post: pink and orange marker flamingo; matches.
- `bsky.py posts elloerin.bsky.social --limit 12`: daily doodle prompt posts tagged #Dailydoodle #Sketchbook, most without a marker tag.
- `bsky.py media` + Read on Erin's 21 Nov "Big Sweater" doodle: uncoloured pencil sketch, contradicting "colored in alcohol markers" as a description of the daily doodles.
- `bsky.py search-posts "from:elloerin.bsky.social alcoholmarkers"`: 8 hits since Dec 2024; two in the past week (18 and 22 Nov), the rest months apart.
- `bsky.py posts quirkycryptid.bsky.social --limit 15`: three own marker pieces in the past week (flamingo, tiger dragon, Mothman in Ohuhu markers) among many reposts, one of them explicit.
- `bsky.py posts holobunny.bsky.social --limit 8`: near-daily ACEO card posts tagged #ohuhu.

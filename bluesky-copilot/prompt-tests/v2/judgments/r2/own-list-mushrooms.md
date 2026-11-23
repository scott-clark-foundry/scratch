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
The person, signed in and looking at a mushroom feed, asked the copilot to make a list of good mushroom photographers to follow. The right move was to find real, active accounts and hand them to the app's `propose_list` tool, then say briefly that the list is ready to review without claiming it was created. The copilot did exactly that: its recorded tool call has a sensible name ("Mushroom photographers"), a one-sentence description and six handles, and the answer opens with "Your list of six mushroom photographers is ready to review", which matches what the tool returns (a card with a button, nothing published). It did not dwell on the placeholder feed link. I checked all six handles: each exists, each posted between 18 and 23 November 2026 (so "posted in the last week" is true), and each posts their own fungi photos (bios say "All images taken by me", "Photos by me", "Amateur photographer", "hobby mycologist, photographer", "here to post PICTURES OF MUSHROOMS"; Sarah Faulkner has no bio but her recent posts include her own fungi shots among wildflowers). The starter pack link resolves, is by Sparky Harlan, has the quoted title, and contains four of the six picks, so "Some came from" is true. The warning that lukelukeluke mixes in jokes is true (for example "Say what you want about scooters but those sumbitches can scoot"). The answer is about 95 words, friendly and plain, with one follow-up offer.

The failure is one sentence that describes all six picks with a criterion two of them do not meet: "I picked accounts that post their own fungi photos, posted in the last week, and get good engagement on #fungifriends." In lukelukeluke's last 40 own posts the tag #fungifriends appears zero times; his engagement is high but not on that hashtag. followerofclay does use the tag, but recent posts get roughly 6 to 14 likes, which is not "good engagement" next to the 100 to 300 likes that mush-photos and sarahfaulkner get. The copilot's own EVIDENCE section supports the engagement claim for only two accounts (amybdogsandfungi and mush-photos). So the person is told a selection rule that the live data contradicts for a third of the list. Under the brief's rule that every factual statement must be supported, that fails the grounded check. A truthful version would be "most are regulars on #fungifriends".

Smaller points that did not change a grade: "ones near you in the Midwest" presents a guess from the America/Chicago time zone as a known fact about where the person is (that zone also covers Texas and the Gulf states); a softer "if you tell me your region" would be better. "Before you hit Create" and "you can rename it or remove anyone" assume a button label and card controls that the tool result ("a card with a button") does not confirm. "I looked at a recent photo from four of them" edges toward narrating the search, though as a single trust-building sentence it is acceptable. The answer links the starter pack but not the accounts; that is reasonable because the card shows them.

## WHAT-I-VERIFIED
- `case.py own-list-mushrooms --with-grounding`: read the question, app context and grounding (propose_list expected, 2 to 25 real active handles, must not say the list was created).
- `bsky.py profile` on all six handles: all exist; latest posts 2026-11-18 (followerofclay), 11-22 (mush-photos, lukelukeluke), 11-23 (amybdogsandfungi, nuiipointer, sarahfaulkner); bios match the quotes in EVIDENCE; lukelukeluke has about 225k followers.
- `bsky.py starter-pack` on the linked pack: "For Fungi lovers who take pictures" by @sparkyharlan.bsky.social, 23 accounts, includes nuiipointer, lukelukeluke, followerofclay, amybdogsandfungi; not mush-photos or sarahfaulkner.
- `bsky.py posts sarahfaulkner.bsky.social --no-reposts --limit 8`: own fungi photos tagged #FungiFriends (247 and 221 likes) mixed with wildflower posts.
- `bsky.py posts lukelukeluke.bsky.social --no-reposts --limit 8`: mushroom photos ("All photos by me", 828 and 2193 likes) alternating with jokes; quoted joke lines are exact.
- `bsky.py posts followerofclay.bsky.social --no-reposts --limit 5`: fungi macro and microscope photos, 6 to 14 likes each.
- `bsky.py posts ... --limit 40` on five picks, counting "fungifriends": lukelukeluke 0 of 40, amybdogsandfungi 6, followerofclay 16 (low likes), nuiipointer 17, mush-photos 40 (112 to 215 likes).
- `bsky.py search-posts "fungi" --tag fungifriends --sort top --since 2026-10-15`: top results are mostly other accounts; confirms the hashtag is active but does not show all six picks doing well on it.

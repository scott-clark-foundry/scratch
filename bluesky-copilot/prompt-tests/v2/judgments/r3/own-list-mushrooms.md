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
The person was signed in, looking at a "Mushrooms" feed, and asked for a list of good mushroom photographers to follow. The right move was to find real, active accounts, put them on a list proposal card (the `propose_list` tool), and say briefly that the card is ready, without claiming the list already exists. The copilot did exactly that. Its recorded tool call has a name ("Mushroom photographers"), a one-sentence description and six plain handles, which passes the app's own input check (2 to 25 handles, no @, name under 64 characters). The answer opens with "Your list of six mushroom photographers is ready to review on the card. Tap Create if it looks right", which is the answer first and correctly leaves the creating to the person. I checked the main claims. (1) All six handles are real accounts whose bios or posts are about photographing fungi. (2) "Everyone on it posted fungi photos in the past week" holds: five posted fungi on 21 to 23 November, and the least recent, @followerofclay.bsky.social, posted on 18 November, five days before the question; I opened that image and it is a sharp macro of small brown mushrooms beside a cone. (3) The starter pack "For Fungi lovers who take pictures" by @sparkyharlan.bsky.social exists at the link given, and three of the six accounts are in it. (4) "David Stevens and Will W, also post birds, insects and landscapes" is accurate: @davidst999 alternates fungi with #BirdOfTheDay and butterfly posts, and @palantir135 alternates fungi with dragonflies and landscapes. The copilot also dropped two stale accounts and two that were off-topic, which is the care the case asked for. Small weaknesses that do not fail a check: the card's button is labelled "Create list", not "Create"; @lukelukeluke.bsky.social posts about as many jokes as mushroom photos, and the answer's caveat about mixed content names only the other two; and @nuiipointer.bsky.social asks apps not to show it to logged-out visitors, which is fine for a signed-in person but went unmentioned. The reply is about 75 words, gives one openable source, ends with a single follow-up offer, and reads warmly, so it is good enough to ship.

## WHAT-I-VERIFIED
- `case.py own-list-mushrooms --with-grounding`: signed in as @pfrazee.com, asks for a list; grounding expects a `propose_list` call with real active handles and no claim that the list was created.
- `bsky.py profile` on all six handles: all exist; latest activity 18 to 23 November 2026; bios match (Chelton's Mushroom Photography, lukelukeluke "pictures of mushrooms", NullPointer forest finds, David Stevens "fungi and wildlife", Call me Jan "hobby mycologist, photographer", Will W nature macro and landscape). @nuiipointer carries the `!no-unauthenticated` label.
- `bsky.py starter-pack .../sparkyharlan.bsky.social/3ljsoj7iy5k25`: pack is named "For Fungi lovers who take pictures", 23 accounts, includes nuiipointer, lukelukeluke and followerofclay.
- `bsky.py posts ... --no-reposts --filter posts_no_replies --limit 8` for each of the six: mush-photos all mushrooms (Amanita augusta on 22 Nov); lukelukeluke "Here are some nice mushrooms" on 21 Nov, mixed with jokes; nuiipointer Mycena epipterygia on 23 Nov; davidst999 Olive Oysterling on 23 Nov plus Ospreys and a Peacock butterfly; followerofclay fungi on 18 Nov; palantir135 Imleria badia on 23 Nov plus dragonflies and landscapes.
- `bsky.py media` on followerofclay post 3n2m5cbu4yc2x, then opened the image: a well-made macro of four small brown gilled mushrooms in moss next to a cone, so the account does post mushroom photography.
- Read `app/server/tools.ts` (the tool definition, not the system prompt): `propose_list` takes name, description and 2 to 25 handles without @, and shows a card with a "Create list" button; the copilot's input is valid.

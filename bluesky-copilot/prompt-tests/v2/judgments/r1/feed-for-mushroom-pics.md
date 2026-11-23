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
The person was on the Discover feed and asked whether a feed for mushroom pictures exists. They most likely wanted a yes or no, a link to a good feed, and perhaps a hint about how it works. The answer opens with "Yep" and names Fungi Friends by @goose.art with its link, then offers one smaller alternative (MushroomSky) and says how to get your own posts into Fungi Friends. That is the right shape and about 90 words, which suits a narrow side panel. I checked these claims against the live network. (1) "Fungi Friends by @goose.art ... about 2,000 likes": the feed search shows 2031 likes and the link is correct. (2) "made for mushroom photos and fungi art": the feed's pinned post says it is "designed for sharing pictures of mushrooms or artwork surrounding fungi people make". (3) "The newest post, from about 10 minutes ago, is yellowleg bonnets in moss" with the quote "the forest's cute little lampshades.": the newest non-pinned post is by @nuiipointer.bsky.social at 21:49 UTC, ten minutes before the screen time of 21:59 UTC; the quoted words are exact and the post link is right. I opened the picture and it does show small pleated beige mushrooms on thin yellow stems in moss. (4) "MushroomSky (photos, recipes, foraging chat), also posting today": the feed description lists "Photos, recipes, art, articles, foraging chat", and the feed has posts from 18:31 to 19:09 UTC today. (5) "Add 🍄📷 or #fungifriends": this matches the feed's own description word for word. Nothing is overstated and nothing sensitive is touched. Two small things would make it better but do not fail a check: the handle @goose.art is plain text and not a profile link (the feed link itself is given), and the answer does not say how posts get into MushroomSky or mention that the app's assistant cannot pin the feed for the person. Leaving out the more mixed "Mycology and Fungi" feed and the possibly broken "Mushrooms" feed was a reasonable choice for a short reply.

## WHAT-I-VERIFIED
- `case.py feed-for-mushroom-pics --with-grounding`: question, screen (Discover), time 21:59 UTC, and the scout's list of four real feeds.
- `bsky.py search-feeds "fungi"`: Fungi Friends by @goose.art, 2031 likes, description "either include a 🍄📷 or #fungifriends to be included", link matches the answer.
- `bsky.py search-feeds "mushroom"`: MushroomSky by @harkthorn.bsky.social, 79 likes, description "Photos, recipes, art, articles, foraging chat, and more", link matches the answer.
- `bsky.py feed` on Fungi Friends: pinned 2025 post states the feed's purpose; newest real post is @nuiipointer.bsky.social at 21:49 UTC today, then posts at 21:16, 21:14 and 19:44 UTC.
- `bsky.py feed` on MushroomSky: mushroom photo posts at 19:09, 19:00, 18:55 and 18:31 UTC today.
- `bsky.py post` on the nuiipointer post: text reads "I love me some yellowleg bonnets, the forest's cute little lampshades. Mycena epipterygia." so the quote is exact.
- `bsky.py media` on the same post, opened the image: small beige pleated caps on thin yellow stems growing in moss, as the answer describes.

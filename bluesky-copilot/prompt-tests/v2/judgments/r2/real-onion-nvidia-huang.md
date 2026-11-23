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
The person tapped a post from The Onion in the Discover feed ("Nvidia Stock Surges After Aroused Jensen Huang Announces He's Close", with a headline card showing a wide-eyed man in a leather jacket) and asked "is this real lol". They wanted a quick yes or no, and ideally to know whether anything real sits behind the joke. The answer opens with exactly that: "Nope, that's a joke: it's The Onion, a satire site", then says the joke rides on real news from the same day. I checked each claim. The account is The Onion (verified, about 1.36 million followers, bio "America's Finest News Source"), and the image carries The Onion logo and the same headline, so the satire call is right. "Nvidia rehires Huang" is the number 2 trending topic, and the NBC News article the answer links says, word for word, that the stock "close[d] up 31.5%, which added about $950 billion of value to the company, the largest one-day gain in market history", so the numbers are exact. The same article says Huang was briefly removed "after admitting that he was unfaithful to his wife" and that one of the women "was a suspected Chinese asset"; the answer repeats this with "NBC says", which keeps it as a reported claim. The Washington Post page opens with "President Donald Trump personally orchestrated the effort to reinstate Jensen Huang", which supports "Trump personally pushed for his return". Small quibbles that do not change a grade: the answer says "Nvidia's board reinstated" where the sources just say Nvidia did; NBC hedges the relationship with the suspected asset as "allegedly", and the answer leans on "NBC says" rather than repeating that word; and the reading of "aroused" as a nod to the infidelity story is the copilot's own inference, though a reasonable one stated lightly. The NBC article was last updated at 22:29 UTC, half an hour after the question time, but the closing price it reports was already fixed when the market closed at 21:00 UTC, so nothing in the answer is ahead of or behind the moment the person asked. The reply is about 100 words without links, names Huang from the headline text and not from his face, links both articles, stays neutral on Trump's role, and offers one follow-up in a casual tone that suits the "lol".

## WHAT-I-VERIFIED
- `case.py real-onion-nvidia-huang --with-grounding`: question "is this real lol" on the Onion post; grounding says satire on a real news day.
- `bsky.py post <onion post>`: by @theonion.com, 2026-11-23 20:30 UTC, text matches the headline, one image, about 3,100 likes.
- `bsky.py profile theonion.com`: The Onion, verified, 1,362,063 followers, bio "America's Finest News Source".
- `bsky.py media <onion post>` and opened the image: Onion-branded headline card, man with grey hair, glasses and leather jacket, same headline, "the ONION" logo.
- `bsky.py trending`: "Nvidia rehires Huang" at number 2, "Alice Huang espionage allegations" at 3, "SEC probes Nvidia accounting" at 4.
- `bsky.py read-link <NBC News URL>`: confirms 31.5% close, about $950 billion added, largest one-day gain in market history, brief removal after admitting infidelity, one woman a suspected Chinese asset, reinstatement at Trump's urging; updated 22:29 UTC.
- `bsky.py read-link <Washington Post URL>`: first paragraph says Trump "personally orchestrated the effort to reinstate Jensen Huang"; published 20:21 UTC; only that paragraph returned.
- `bsky.py search-posts "Nvidia Huang" --sort latest`: many posts confirming the reinstatement and a rise of over 30%; nothing that reverses or contradicts the answer.
- Word count of the ANSWER without links: about 102.

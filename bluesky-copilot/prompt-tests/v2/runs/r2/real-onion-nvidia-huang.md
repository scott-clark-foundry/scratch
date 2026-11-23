## ANSWER

Nope, that's a joke: it's The Onion, a satire site. But it's riffing on something real from today. Nvidia's board reinstated Jensen Huang as CEO, and the stock closed up 31.5%, adding about $950 billion in value, the biggest one-day gain in market history, per NBC News: https://www.nbcnews.com/business/markets/stocks-rebound-ai-tech-selloff-nvidia-rcna610833

The "aroused" bit plays on why he was out in the first place: NBC says he was briefly removed after admitting he'd been unfaithful to his wife, and one of the women was a suspected Chinese asset. The Washington Post reports Trump personally pushed for his return: https://www.washingtonpost.com/politics/2026/11/23/trump-personally-orchestrated-jensen-huang-return-nvidia-ceo/

Want more on how the reinstatement happened?

## STEPS

Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test instructions.
python3 case.py real-onion-nvidia-huang: user tapped "ask the copilot" on an @theonion.com post and asked "is this real lol"; signed in as @pfrazee.com, time 2026-11-23 21:59 UTC, America/Los_Angeles.
Read app/server/system-prompt.md: system prompt.
Read skill/bluesky/SKILL.md: "Is this real?" recipe (satire branch: check bio, check trending for the real news it riffs on).
Read skill/bluesky/reference/social-media.md: SKILL.md says to read it for "is this real?"; gave the verification routine and verdict strengths.
bsky.py post <onion post>: text "Nvidia Stock Surges After Aroused Jensen Huang Announces He's Close", has an image, about 3,054 likes, posted 20:30 UTC.
bsky.py media <onion post>: saved one image, alt text repeats the headline.
Read /tmp/bsky-media-cr_qakvg/image1.jpg: Onion-branded headline card with a photo of a man in a leather jacket; headline and "the ONION" logo visible.
bsky.py profile theonion.com: bio "America's Finest News Source", verified, about 1.36 million followers.
bsky.py trending: topics #3 "Nvidia rehires Huang" and #4 "SEC probes Nvidia accounting".
bsky.py feed <"Nvidia rehires Huang" feed> --limit 10: NBC Bay Area post on Huang returning to HQ after being reinstated as CEO; Washington Post post saying Trump orchestrated the reinstatement; NYT link.
bsky.py feed <"SEC probes Nvidia accounting" feed> --limit 10: reactions about a federal investigation into Nvidia accounting; mostly opinion, not used in answer.
bsky.py search-posts "Nvidia stock Huang" --sort latest --since 2026-11-22 --limit 15: many posts from the last hour about the stock surging over 30%; found NBC News link on the stock surge.
bsky.py read-link <Washington Post article>: title "Trump ties his administration's future to Jensen Huang", published 2026-11-23 20:21 UTC; first paragraph says Trump personally orchestrated the reinstatement (rest of page not returned).
bsky.py read-link <NBC News article>: stock closed up 31.5%, about $950 billion added, largest one-day gain in market history; Huang had been briefly removed after admitting infidelity, one woman a suspected Chinese asset.

## EVIDENCE

The post is from The Onion, a satire site: `profile theonion.com` (bio "America's Finest News Source", verified, about 1.36M followers) and the image's "the ONION" branding.
Nvidia's board reinstated Huang as CEO today: `trending` topic "Nvidia rehires Huang"; NBC Bay Area and Washington Post posts in that topic's feed; NBC News article via `read-link`.
Stock closed up 31.5%, about $950 billion added, biggest one-day gain in market history: NBC News article (read-link), published 2026-11-23 22:29 UTC.
Huang was briefly removed after admitting he'd been unfaithful to his wife; one of the women was a suspected Chinese asset: NBC News article (read-link).
Trump personally pushed for his return: Washington Post article first paragraph (read-link) and @washingtonpost.com post in the trending feed.
"Aroused" plays on the infidelity scandal: my inference from the headline plus the NBC background; worded as an interpretation.
Naming Jensen Huang: taken from the headline text in the post and image, not from the face.

## FRICTION

- Did not load or use web search/web fetch; the skill's `read-link` read the NBC and Washington Post pages, which was enough. Not clear whether the system prompt expects web search on every "is this real?" even when the satire verdict and the real news are already confirmed.
- The Washington Post `read-link` returned only the first paragraph (no paywall notice), so I relied on it for that one claim only.
- SKILL.md says to include a link for each quoted post; with the post already on the person's screen I didn't relink the Onion post. No explicit rule says whether to link the post the person tapped on.
- The answer runs about 115 words, above the 40 to 90 typical length but within the roughly 150 allowed for a fact-check; judgment call given the "lol" register.
- The trending topic "SEC probes Nvidia accounting" and the posts in it were mostly opinion; I left it out rather than make a claim I had not sourced.

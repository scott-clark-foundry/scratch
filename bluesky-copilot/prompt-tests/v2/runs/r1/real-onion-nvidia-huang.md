## ANSWER

Nope, it's satire lol. That's The Onion, the satirical news site: the post comes from its verified account @theonion.com, the bio says "America's Finest News Source", and the picture is a headline card with The Onion's logo at the bottom. The Onion makes up its stories and writes them in a straight news voice, so there's no real announcement behind this one (that last part is general knowledge about The Onion, not something I checked today).

Post: https://bsky.app/profile/theonion.com/post/3n2yxuvyje62b

## STEPS

- Read /home/user/scratch/bluesky-copilot/app/server/system-prompt.md: system prompt; "is this real" fact-check guidance, length and sourcing rules.
- Read skill/bluesky/SKILL.md: "Is this real?" recipe (check satire via bio), media recipe, pointer to reference/social-media.md.
- Read skill/bluesky/reference/social-media.md: "checking whether something is real" routine; satire outlets write invented news in a straight voice.
- `python3 scripts/bsky.py post https://bsky.app/profile/theonion.com/post/3n2yxuvyje62b`: post text is the headline "Nvidia Stock Surges After Aroused Jensen Huang Announces He's Close", one image, 2852 likes, 384 reposts, 25 replies, 17 quotes, posted 2026-11-23 20:30 UTC.
- `python3 scripts/bsky.py media https://bsky.app/profile/theonion.com/post/3n2yxuvyje62b`: saved image1.jpg; alt text repeats the headline.
- `python3 scripts/bsky.py profile theonion.com`: The Onion, bio "America's Finest News Source. A @globaltetrahedron.bsky.social subsidiary…", about 1.36 million followers, verified (blue check).
- Read /tmp/bsky-media-6brrcw_g/image1.jpg: Onion-style headline card, photo of a grey-haired man in glasses and a leather jacket above the headline, "the ONION" logo at the bottom.

## EVIDENCE

- The post is from The Onion's verified account: `profile theonion.com` output ("Verified: yes", display name "The Onion").
- Bio says "America's Finest News Source": `profile theonion.com` output.
- The picture is a headline card with The Onion's logo: image1.jpg from `media`.
- The Onion is a satirical site that invents its stories, so there is no real announcement: general knowledge, flagged as such in the answer; consistent with social-media.md's note on satire outlets.

## FRICTION

- The verdict needed no web search, so I did not load WebSearch/WebFetch. SKILL.md's "Is this real?" recipe offers three checks (account, satire, claim true) but does not say plainly that once satire is established you can skip checking the claim; I stopped at satire per social-media.md's "stop as soon as you have a solid answer".
- The image shows a man's face; the headline names Jensen Huang. I avoided saying the photo shows him, since the rule is to name only from post text/caption, and the question did not need it. Unclear whether attributing via the headline would have been fine here.
- "is this real" could also mean "did Nvidia stock actually surge today?". I judged the satire reading most likely and did not check stock movement; the system prompt says not to ask for clarification unless readings differ a lot, which they arguably don't here.

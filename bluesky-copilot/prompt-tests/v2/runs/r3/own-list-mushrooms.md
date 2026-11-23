## ANSWER
Your list of six mushroom photographers is ready to review on the card. Tap Create if it looks right. Everyone on it posted fungi photos in the past week. I started from the "For Fungi lovers who take pictures" starter pack (https://bsky.app/starter-pack/sparkyharlan.bsky.social/3ljsoj7iy5k25) and recent #mushrooms photography posts. Two of them, David Stevens and Will W, also post birds, insects and landscapes, so not every post will be a mushroom. Want me to find a few more?

## STEPS
- Read /home/user/scratch/bluesky-copilot/app/server/system-prompt.md: system prompt; signed-in person plus propose_list means use the card.
- Read skill/bluesky/SKILL.md: used the "Help me build a list" and "Who should I follow for X?" recipes.
- python3 scripts/bsky.py search-starter-packs "mushrooms": 10 packs, including Mushrooms & Friends and The Mycelian Network.
- python3 scripts/bsky.py search-starter-packs "fungi": found "For Fungi lovers who take pictures" by @sparkyharlan.bsky.social, the closest fit.
- python3 scripts/bsky.py search-users "mushroom photography": found @mush-photos.bsky.social (Chelton's Mushroom Photography), @timomendez.bsky.social, and a lot of strays.
- python3 scripts/bsky.py starter-pack https://bsky.app/starter-pack/sparkyharlan.bsky.social/3ljsoj7iy5k25: 23 accounts, including @nuiipointer, @lukelukeluke, @mycolocore, @followerofclay and @akbridgelake.
- python3 scripts/bsky.py search-posts "#mushrooms photography" --sort top --since 2026-10-01 --limit 30: recent fungi photo posts by @davidst999, @palantir135, @dorotapawlak, @floriankejr and others.
- python3 scripts/bsky.py search-posts "#mushroomphotography" --sort top --since 2026-10-15 --limit 25: printed nothing (piped through grep, so it is not clear whether it returned zero results or something else).
- python3 scripts/bsky.py profile mush-photos davidst999 dorotapawlak timomendez followerofclay nuiipointer floriankejr palantir135 akbridgelake lukelukeluke mycolocore: checked activity. @mycolocore was last active 2025-08 and @timomendez 2025-12, so I dropped both. @nuiipointer has the !no-unauthenticated label. The rest posted within the past week.
- python3 scripts/bsky.py posts ACCOUNT --no-reposts --filter posts_no_replies --limit 6 for mush-photos, lukelukeluke, followerofclay, akbridgelake, dorotapawlak and nuiipointer: mush-photos posts only mushrooms. lukelukeluke has several "Here is a nice mushroom" posts mixed with jokes. followerofclay posts fungi and lichen macros. nuiipointer posts almost all fungi and slime molds. akbridgelake posts mostly newsletter links, and dorotapawlak mostly general nature, so I dropped both.
- python3 scripts/bsky.py posts palantir135.bsky.social ... --limit 8: alternates #paddospam fungi posts with insects and landscapes.
- python3 scripts/bsky.py posts davidst999.bsky.social ... --limit 6: about half fungi, half birds and butterflies.
- python3 scripts/bsky.py media https://bsky.app/profile/lukelukeluke.bsky.social/post/3n2p5du4sgc2c, then Read the image: a well-composed close-up of a shaggy mane dripping ink. The alt text says "All photos by me".
- python3 scripts/bsky.py media https://bsky.app/profile/mush-photos.bsky.social/post/3n2w2ga3aqc2f, then Read the image: a high-quality, focus-stacked macro of an Amanita augusta (Canon R5, according to the alt text).
- TOOL CALL: propose_list {"name": "Mushroom photographers", "description": "People who take great photos of mushrooms and other fungi", "accounts": ["mush-photos.bsky.social", "lukelukeluke.bsky.social", "nuiipointer.bsky.social", "davidst999.bsky.social", "followerofclay.bsky.social", "palantir135.bsky.social"]}
  - Response (simulated): "Shown to the person as a card with a button. Nothing has been published."

## EVIDENCE
- All six posted fungi photos in the past week: posts output. mush-photos posted 2026-11-22 (Amanita augusta). lukelukeluke posted 2026-11-21 ("Here are some nice mushrooms"). nuiipointer posted 2026-11-23 (Mycena epipterygia). davidst999 posted 2026-11-23 (Olive Oysterling). palantir135 posted 2026-11-23 (Imleria badia). followerofclay last posted fungi on 2026-11-18, which is 5 days before now (the "past week" is true by local date).
- Starter pack name and link: search-starter-packs "fungi" and starter-pack output.
- David Stevens and Will W also post birds, insects and landscapes: posts output for davidst999 (Ospreys, Peacock butterfly, #BirdOfTheDay) and palantir135 (Sympetrum dragonfly, #landscape posts).
- Photo quality of mush-photos and lukelukeluke: the two images downloaded with `media`.

## FRICTION
- The system prompt says that after propose_list I should not repeat the card's contents. It also says every answer needs a source with a link, and the recipe asks for "a few words on each" account. These conflict. I gave one source link (the starter pack) and named only the two mixed-topic accounts as a caveat. It is unclear whether naming them breaks the "do not repeat its contents" rule.
- The propose_list input schema is not documented anywhere I could read: field names, whether accounts are handles or DIDs, and whether a name or description is needed. I guessed.
- The app_context feed link (did:plc:example/feed/mushrooms) looks like a placeholder. I did not look it up, because the person asked about photographers to follow, not about the feed. The skill does not say whether the feed on screen should be mined for candidates. Its authors would be a natural source.
- `search-posts "#mushroomphotography"` printed nothing through my grep. I did not rerun it to see whether the search returned zero results. The `--tag` option may be the correct way to search hashtags, but SKILL.md does not say which approach to use.
- @nuiipointer.bsky.social has the !no-unauthenticated label, yet its posts came back fine. The skill warns that its posts "may be missing". I included the account anyway. I am not sure whether an account that hides itself from logged-out visitors should be recommended.
- The recipe says to use `media` on a recent post for visual niches. I did this for two of the six accounts only, and relied on post text and hashtags for the rest.
- Web search and web fetch were not used and not needed. I did not load them.

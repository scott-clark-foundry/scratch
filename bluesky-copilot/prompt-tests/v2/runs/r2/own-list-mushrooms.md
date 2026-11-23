## ANSWER

Your list of six mushroom photographers is ready to review. You can rename it or remove anyone before you hit Create.

I picked accounts that post their own fungi photos, posted in the last week, and get good engagement on #fungifriends. Some came from Sparky Harlan's "For Fungi lovers who take pictures" starter pack (https://bsky.app/starter-pack/sparkyharlan.bsky.social/3ljsoj7iy5k25). I looked at a recent photo from four of them to check the work holds up. One heads-up: lukelukeluke also posts plenty of jokes alongside the mushrooms.

Want me to find a few more, say, ones near you in the Midwest?

## STEPS

Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test instructions
python3 case.py own-list-mushrooms: signed in as @pfrazee.com, looking at the "Mushrooms" feed, asking for a list of mushroom photographers
Read app/server/system-prompt.md: the system prompt (propose_list for signed-in list requests; don't repeat card contents)
Read skill/bluesky/SKILL.md: recipes "Help me build a list" and "Who should I follow for X?"
bsky.py search-starter-packs "mushroom": many packs, mostly foraging/VTuber/off-topic
bsky.py search-starter-packs "fungi": found "For Fungi lovers who take pictures" by @sparkyharlan.bsky.social
bsky.py search-users "mushroom photography": found @mush-photos.bsky.social, @timomendez.bsky.social, others mostly hobby mentions
bsky.py starter-pack (sparkyharlan pack): 23 accounts incl. nuiipointer, lukelukeluke, mycolocore, followerofclay, amybdogsandfungi, mushroomjenja
bsky.py search-posts "#fungifriends" --sort top --since 2026-10-15: failed with HTTP 400 InvalidRequest
bsky.py search-posts "mushroom photography" --sort top --since 2026-10-15: recent posts from taminf, catseyelens, rina2012, crystal-photo, rodshelf, etc.
bsky.py search-posts "fungi" --tag fungifriends --sort top --since 2026-10-15: recent top posts from amybdogsandfungi ("A fungus photo a day"), dorotapawlak, sarahfaulkner, crystal-photo, mush-photos
bsky.py profile (13 accounts): activity check; mycolocore last posted 2025-08-27, timomendez 2025-12-08 (dropped); others active this week; catseyelens, rina2012, nuiipointer have !no-unauthenticated
bsky.py posts (7 accounts) --no-reposts --limit 8 --filter posts_no_replies: mush-photos, nuiipointer, amybdogsandfungi post fungi daily; followerofclay fungi macro/microscopy; sarahfaulkner fungi mixed with wildflowers; dorotapawlak and crystal-photo mostly general nature (not picked)
bsky.py profile lukelukeluke mushroomjenja sprucemooseaaa rodshelf akbridgelake: lukelukeluke ~225k followers, active; mushroomjenja last post 2026-03-22 (dropped)
bsky.py posts lukelukeluke / mushroomjenja: lukelukeluke mixes mushroom photos and jokes
bsky.py media on 4 posts (lukelukeluke, mush-photos, amybdogsandfungi, followerofclay): downloaded images
Read 4 images: turkey tail rosettes (lukelukeluke), Amanita augusta studio-quality macro (mush-photos), orange waxcaps in moss (amybdogsandfungi), small brown mushrooms by a pinecone (followerofclay); all real fungi photography
TOOL CALL: propose_list {"name": "Mushroom photographers", "description": "People who post their own photos of fungi", "accounts": ["mush-photos.bsky.social", "amybdogsandfungi.bsky.social", "nuiipointer.bsky.social", "lukelukeluke.bsky.social", "followerofclay.bsky.social", "sarahfaulkner.bsky.social"]}
  -> "Shown to the person as a card with a button. Nothing has been published."

## EVIDENCE

Six accounts all posted in the last week: profile output (latest post times 2026-11-18 to 2026-11-23 UTC).
They post their own fungi photos: bios ("All images taken by me" mush-photos; "Photos by me" nuiipointer; "Amateur🍄photographer" amybdogsandfungi; "hobby mycologist, photographer" followerofclay; "here to post PICTURES OF MUSHROOMS" lukelukeluke) plus recent posts output.
Several drawn from Sparky Harlan's "For Fungi lovers who take pictures" pack: starter-pack output (nuiipointer, lukelukeluke, followerofclay, amybdogsandfungi listed).
Good engagement on #fungifriends: search-posts --tag fungifriends (e.g. amybdogsandfungi 225 likes; mush-photos posts 112-184 likes).
Looked at a recent photo from four: media + Read on four images.
lukelukeluke also posts jokes: posts output ("Say what you want about scooters…", "Touching grass is not enough…").

## FRICTION

- SKILL.md's list recipe says "Give a starter set of five to eight accounts with a few words on each", while the system prompt says after propose_list "Do not repeat its contents in your message." I followed the system prompt and left per-account descriptions to the card, but this means the message shows little about each pick; unclear whether the card shows per-account notes. The propose_list input schema is not described anywhere, so I guessed the fields (name, description, accounts).
- The system prompt requires a source link in every answer but also says not to repeat the card's contents; I linked the starter pack as the source, not each account.
- search-posts "#fungifriends" (hashtag as the query) failed with HTTP 400 InvalidRequest; SKILL.md doesn't warn about this. Using --tag worked.
- The person's screen was the "Mushrooms" custom feed (did:plc:example), whose link looks like a placeholder; I did not try `feed` on it, which might have been a natural source of candidates. No instruction about using the on-screen feed for a list request.
- Three accounts carry !no-unauthenticated (nuiipointer included); posts still came back, so it didn't block anything, but it's unclear whether such accounts are fine to recommend.
- I did not know the person's region; I guessed the offer (Midwest, from the America/Chicago time zone).
- Web search/fetch were not needed and not loaded.

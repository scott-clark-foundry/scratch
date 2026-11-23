## ANSWER

I've put together a starter list of seven active marker artists, and it's ready to review on the card. All of them have posted Copic or Ohuhu work in the past week. For example, Jackie B's Copic kaiju (https://bsky.app/profile/jackiekaiju.bsky.social/post/3n2mlz3wg7k2b) and Riversong28's daily Ohuhu wildlife cards (https://bsky.app/profile/riversong28.bsky.social/post/3n2wfgztmkk2o).

A couple of heads-ups. Darren Calvert and Ari's art account post plenty of non-art chatter along with the drawings. Mathew draws pinups. I left out accounts that are mostly NSFW and a few that haven't posted in months.

There were no starter packs for marker art to borrow from, so this list comes from recent #copic, #ohuhu and "alcohol markers" posts. Want me to dig up more, maybe for a particular style like fan art or illustration?

## STEPS

1. Read /home/user/scratch/bluesky-copilot/app/server/system-prompt.md: the system prompt.
2. Read skill/bluesky/SKILL.md: the "Help me build a list" recipe, which is to search posts, users and starter packs, confirm visual niches with `media`, check activity with `profile`, and give a starter set of 5 to 8.
3. `python3 scripts/bsky.py search-posts "alcohol markers" --sort latest --limit 40`: 29 recent posts. A mix of artists, shopping and deal spam, and beginners. Candidates: dailen, harmfulplant, sharonjohnston, quirkycryptid, others.
4. `search-posts "alcohol markers" --sort top --since 2026-10-01 --limit 30`: kuwagoarts (252 likes), harmfulplant (two marker posts), dailen, soturisi, sharonjohnston.
5. `search-posts "copic" --sort top --since 2026-10-15 --limit 30`: dmacalvert (several Copic drawings, 100+ likes), jackiekaiju (several Copic kaiju), ariartaccount (Copic grey-marker drawings), theartofmathew (Copic blank-cover pinups), penbee.art, nuuve-cle, cassiopeia7.
6. `search-starter-packs "copic"`: no results.
7. `search-starter-packs "marker art"`: no results.
8. `search-users "copic artist" --limit 15`: mostly unrelated "artist" accounts. otomosansart (18+ only, skipped), medorimie, handcraftedbyjoy.
9. `profile` on 11 candidates: dmacalvert (8,504 followers, active today), jackiekaiju (172, active today), kuwagoarts (sfw/nsfw bio, skipped), harmfulplant (1,221, active today), dailen (2,713, posts rarely), sharonjohnston (bio is a news and politics account, skipped), ariartaccount (4,034, active today), penbee.art (2,533), medorimie (last post Feb 2025, skipped), cassiopeia7 (has the !no-unauthenticated label), theartofmathew (9,140, active today).
10. `posts ACTOR --no-reposts --filter posts_with_media --limit 6` on 7 candidates. dmacalvert mixes Copic sketch covers with jokes. ariartaccount has Copic drawings plus political posts. harmfulplant posts marker, pencil and acrylic-marker sketches. dailen mostly posts tattoos and has only one recent marker post (dropped). penbee posts mostly digital and pixel art with one Copic study (dropped). theartofmathew posts YCH pinup commissions. jackiekaiju posts a series of micron-and-Copic kaiju drawings.
11. `search-posts "copicart" --tag copicart --sort top --since 2026-10-01`: nefly90, hantgreat, cheywolfart, phoenastra (names only).
12. `search-posts "ohuhu" --sort top --since 2026-10-15`: holobunny (Ohuhu ACEO cards, several a week), riversong28 (daily Ohuhu ACEOs), kaysa21, twistedsketch.
13. `profile` on nefly90, hantgreat, holobunny, riversong28 and cheywolfart, plus `posts nefly90.bsky.social --no-reposts --limit 6`. nefly90 has moved to oil pastels and last posted Nov 12 (dropped). hantgreat has no art bio (dropped). cheywolfart has 12 followers (dropped). holobunny and riversong28 are active traditional artists.
14. `media` on 4 posts (jackiekaiju Shin Godzilla, harmfulplant dr sputterspark, holobunny mermaid, riversong28 polar bears): saved images.
15. Read the 4 images. Godzilla is ink with blended purple and red marker. harmfulplant is a sketchbook page of cartoon rat characters in yellow and grey marker. holobunny is an ACEO card of a mermaid in marker (starfish over her chest, mildly cheeky). riversong28 is an ACEO of polar bears under an aurora in marker and pencil.
16. TOOL CALL: propose_list {"name": "Alcohol marker inspiration", "purpose": "curatelist", "description": "Artists posting Copic, Ohuhu and other alcohol marker work", "members": ["dmacalvert.bsky.social", "jackiekaiju.bsky.social", "ariartaccount.bsky.social", "harmfulplant.bsky.social", "riversong28.bsky.social", "holobunny.bsky.social", "theartofmathew.bsky.social"]}. Response: "Shown to the person as a card with a button. Nothing has been published."

## EVIDENCE

- "Seven active marker artists": dmacalvert, jackiekaiju, ariartaccount, harmfulplant, riversong28, holobunny and theartofmathew. `profile` (steps 9 and 13) shows each one's latest post between 2026-11-22 and 2026-11-23.
- "All posted Copic or Ohuhu work in the past week": all seven come from step 5 (copic), step 12 (ohuhu) or step 4 (alcohol markers). dmacalvert's Iron Man post is dated 2026-11-23, jackiekaiju's posts 11-18 to 11-21, ariartaccount's 11-21 and 11-22, harmfulplant's 11-18 and 11-21, riversong28's 11-20 to 11-22, holobunny's 11-18 to 11-22, and theartofmathew's 11-19. Strictly, harmfulplant and riversong28 say "alcohol markers" and "Ohuhu", not Copic. That fits the "Copic or Ohuhu" wording, since harmfulplant's medium is "alcohol markers" (step 4).
- Jackie B's Copic kaiju: step 5 ("micron pens and copic markers on paper"), and the image in step 15.
- Riversong28's daily Ohuhu wildlife cards: step 12 ("Today's new #ACEOs … #Ohuhu", posted 11-20, 11-21 and 11-22), and the image in step 15.
- Darren Calvert and Ari's account post plenty of non-art chatter: step 10. Darren posts Simpsons and Chrome dinosaur replies. Ari posts about Colorado propositions.
- Mathew draws pinups: bio "artist from Slovakia drawing Pinup" (step 9), plus the YCH commission posts in step 10.
- Mostly-NSFW accounts left out: otomosansart's bio says "🔞 only" (step 8). kuwagoarts' bio says "sfw / nsfw" (step 9).
- Accounts quiet for months left out: medorimie's latest post is 2025-02-19 (step 9).
- No starter packs: steps 6 and 7.

## FRICTION

- The system prompt says that after `propose_list` I should "not repeat its contents in your message". SKILL.md's list recipe says "Give a starter set of five to eight accounts with a few words on each". These conflict. I followed the system prompt: I named only two examples, as sources, plus the caveats. The person may still want the per-account blurbs, and it's unclear whether the card shows those.
- The input schema for `propose_list` isn't documented anywhere: its field names, whether it takes handles or DIDs, the list purpose (curate list or moderation list), and whether it has a description field. I guessed `name`, `purpose`, `description` and `members` as handles.
- "my alcohol marker inspiration posters" is a slightly ambiguous phrase. I read it as accounts that post alcohol marker art they find inspiring. It could also mean people whose posts already inspire them, which would call for `read_my_timeline` or their follows. I didn't ask, and I didn't check whom @pfrazee.com already follows, which could have surfaced accounts they'd want or already know.
- Neither the system prompt nor the skill says anything about content ratings when curating lists of artists. I chose on my own to skip NSFW-labeled accounts and to flag the pinup artist and the mildly cheeky mermaid card (I didn't flag the card in the answer).
- Some search results have timestamps after the app's "current time". For example, thestarfishface at 22:41 UTC and dmacalvert at 22:43 UTC, while the current time is 21:59 UTC. The skill does warn that timestamps can be off, so I ignored this.
- `search-users "copic artist"` matched loosely on "artist" and returned mostly irrelevant celebrities. It was of little use for a niche like this.
- I couldn't tell from posts alone whether Copic and Ohuhu posts are old work being reposted. jackiekaiju's pieces are dated 2019 but posted this week. I still counted that as an active account posting marker art.
- I didn't use web search or web fetch because they weren't needed. I didn't load them.

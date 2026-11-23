## ANSWER
Mostly it's about who's being cheered, not NBC Bay Area itself. Huang resigned as Nvidia CEO on Nov 12 amid an investigation into his relationship with an alleged Chinese spy, and the board reinstated him today. So a clip of staff chanting his name struck a lot of people as cult-like or servile.

The numbers show it: 483 quotes and 231 replies against 102 likes, a classic ratio. Among the ones I read, nearly all mock the scene:
- @vor-bokor.bsky.social, in full: "Serfs" https://bsky.app/profile/vor-bokor.bsky.social/post/3n2z5o6mph22p
- an Evangelion riff: "NERV employees cheered and chanted Gendo Ikari's name as he returned to Central Dogma…" https://bsky.app/profile/giantrobotfm.bsky.social/post/3n2z5pchnls2u
- the top reply (105 likes) says it's about money: staff "just saw all their personal stock options… crash to rock bottom and then bump up by 30%" https://bsky.app/profile/cased.bsky.social/post/3n2z2spuhh224

I read 25 of the quotes and 19 replies. Background is from Nvidia's newsroom (https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition) and Fox Business (https://www.foxbusiness.com/business-leaders/nvidia-ceo-jensen-huang-resigns-amid-investigation-relationship-alleged-chinese-spy).

Want the story on why he was reinstated?

## STEPS
- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the task rules.
- Ran case.py nbc-huang-return-quote-pileon: the user is looking at a custom feed and asked "why is everyone dunking on this post" about @nbcbayarea.com's post 3n2yyr5sw3c2f.
- Read app/server/system-prompt.md: the system prompt.
- Read skill/bluesky/SKILL.md: the recipes, including quote chains and pile-ons ("quotes REF --top").
- Read skill/bluesky/reference/social-media.md: the definitions of ratio, pile-on and dunk, and how to describe a dispute fairly.
- `bsky.py post <post>`: the text, the video, and counts of 102 likes, 33 reposts, 231 replies and 483 quotes.
- `bsky.py quotes <post> --top --limit 25`: 25 of the 483 quotes. Nearly all mock the scene ("Serfs", "cult", Evangelion GIFs and a riff, "feudal lord"). The highest has 9 likes.
- `bsky.py thread <post> --max-replies 15`: 19 of the 231 replies. The top reply is @cased.bsky.social on stock options (105 likes). The others say "cult", "embarrassing" and similar.
- `bsky.py read-link https://nbcbay.com/zvjW1zi`: failed (connection reset).
- `bsky.py media <post>`: saved one still frame of the video.
- Read the video-frame.jpg: the caption reads "Jensen Huang returns to Nvidia headquarters as employees chant his name". It shows a crowd in an atrium with phones out and the NBC logo.
- ToolSearch to load WebSearch and WebFetch.
- WebSearch "Jensen Huang reinstated Nvidia CEO November 2026": found the Nvidia newsroom page on the CEO transition, but no reinstatement coverage.
- `bsky.py search-posts "Huang reinstated Nvidia" --sort top --since 2026-11-15`: many posts from Nov 23 on the reinstatement (Culture Crave, Pop Base, Scott MacFarlane, Ron Filipkowski linking MeidasNews). Some mention Trump calling for his return.
- `bsky.py read-link <meidasnews article>`: HTTP 403, could not read.
- WebFetch on nvidianews.nvidia.com/news/nvidia-announces-ceo-transition: Huang resigned, dated Nov 12, 2026, with no reason given. The "More News" list has a Nov 23 headline: "NVIDIA Board Reinstates Jensen Huang as President, CEO and Board Director".
- WebSearch "Jensen Huang resigned Nvidia investigation reason November 12 2026": Fox Business, SF Standard and others report that he resigned amid an investigation into his relationship with an alleged Chinese spy, and that an affair with a direct report was also reported.

## EVIDENCE
- Huang resigned on Nov 12: the Nvidia newsroom page (WebFetch).
- He was reinstated today (Nov 23): the Nvidia newsroom "More News" headline dated Nov 23, plus Bluesky search results from Nov 23 (for example culturecrave.co, popbase.tv).
- The resignation came "amid an investigation into his relationship with an alleged Chinese spy": the Fox Business headline in the WebSearch results, matched by other outlets in the same results. I did not open the Fox article itself.
- The clip shows staff chanting his name: the post text and the caption in the video frame (media command).
- 483 quotes, 231 replies, 102 likes: the `post` command output.
- Nearly all the quotes and replies mock the scene: the `quotes --top --limit 25` and `thread --max-replies 15` outputs.
- The "Serfs" quote: `quotes` output, @vor-bokor.bsky.social.
- The NERV/Gendo Ikari quote: `quotes` output, @giantrobotfm.bsky.social.
- The stock-options reply with 105 likes: `thread` output, @cased.bsky.social.
- I read 25 quotes and 19 replies: the counts the `quotes` and `thread` outputs printed.

## FRICTION
- The output of `quotes --top` says "most liked first among those fetched", and the list it printed is roughly in time order, mostly from 22:12 to 22:15 UTC. With 483 quotes, the sample is not the most-liked quotes overall. Neither SKILL.md nor the help says how to get the overall top quotes without paging through all of them, so the quote sample is the most recent quotes, not the most resonant ones.
- `read-link` failed on the post's own link (nbcbay.com short link, connection reset) and on the MeidasNews article (403). I could not read NBC's article.
- I could only see one still frame of the video.
- The background on why Huang resigned came from WebSearch result snippets and a model-written summary, not from an article I opened. The system prompt says to cite what I looked up, so I linked the Fox Business URL from the search results without having read its page.
- The question "why is everyone dunking on this post" is ambiguous about the target. Here the dunks are aimed at the event and the employees, not at the news outlet. The pile-on guidance in SKILL.md and social-media.md assumes the post's author is the target and does not mention this case.
- Some quotes repeat accusations about Huang (an affair, espionage). Following "do not repeat accusations as fact", I used the attributed news framing ("amid an investigation into… alleged") and did not quote those posts.
- The 40–100 word target versus the "about 180" allowance for quote-chain summaries: I assumed a pile-on summary falls under the longer allowance.

## ANSWER

It's a meme Trump posted on Truth Social today: the famous 2024 Butler fist-pump photo, edited so Nvidia CEO Jensen Huang is in Trump's spot, bloodied, waving a red bra, with an Nvidia flag behind him.

Context, per [Business Insider](https://www.businessinsider.com/trump-posts-photoshop-meme-jensen-huang-holding-bra-assassination-photo-2026-11): Nvidia's board reinstated Huang this morning, Trump says he lobbied the board for it, and Huang had been under fire over alleged extramarital affairs. So the bra reads as a wink at that scandal (my inference; the article doesn't spell it out).

The screenshot has three layers: Trump's post → Ken Klippenstein quoting it with "lmao" → Jeet Heer quoting that: "The sad truth is there will never be a funnier president than Trump." Weedle shared it to needle them, captioning it "two people who like Trump and wanted him to be president" ([post](https://bsky.app/profile/weedle.bsky.social/post/3n2yw74whec2g)). It's sarcasm; Weedle is mocking the two for laughing.

Want to see how people on Bluesky are reacting to the meme?

## STEPS

1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test instructions.
2. Ran `case.py screenshot-huang-bra-meme`: the user's message and app context (thread on weedle.bsky.social post 3n2yw74whec2g, Chicago time zone, not signed in).
3. Read app/server/system-prompt.md: the system prompt.
4. Read skill/bluesky/SKILL.md: the recipes; pointed to social-media.md for jokes and screenshots.
5. `bsky.py thread <post>`: post text "A screenshot of two people who like Trump and wanted him to be president.", one image without alt text, 16 replies (13 shown); replies mention Klippy, Jeet, the Butler shooting and "a fake bra".
6. Read reference/social-media.md: conventions for screenshots, quote layers, memes, and how to check whether something is real.
7. `bsky.py media <post>`: saved the image to /tmp/bsky-media-p8ns4lih/image1.jpg.
8. Read the image: an X screenshot. Jeet Heer (@HeerJeet) quotes Ken Klippenstein ("lmao"), who quotes a @realDonaldTrump post dated Nov 23, 2026 10:32 AM. That post shows an edited Butler-style photo: a man raising a red bra, a NVIDIA flag, Secret Service agents, and a GRANDOLDMEMES watermark.
9. ToolSearch to load WebSearch and WebFetch: loaded.
10. Read reference/resources.md: the outside sources to use.
11. WebSearch "Trump Truth Social meme bra Nvidia Butler photo November 2026": nothing relevant, only older AI-meme stories.
12. `bsky.py search-posts "Trump bra Nvidia" --sort top --since 2026-11-21` and `search-posts "Jensen Huang bra" --sort top --since 2026-11-15`: many posts, including from the Washington Post, Business Insider and Matt Novak, identifying the figure as Jensen Huang in Trump's Truth Social post, in the Butler photo pose. Rex Huppke's post calls him the "reinstated Nvidia CEO".
13. `bsky.py read-link` on the WaPo article: the title and summary confirm the story, but the page body that came back was a live-blog wrapper, not the article. Same command on the Business Insider article: the full text, covering the reinstatement, Trump's lobbying of the board and the affair allegations.

## EVIDENCE

- Trump posted the meme on Truth Social: the image (the @realDonaldTrump post inside the screenshot); Business Insider article; Washington Post headline via read-link; @paleofuture and @noupside posts in search-posts.
- The figure is Jensen Huang: Business Insider article, Washington Post title and summary, many Bluesky posts' alt text and text. I did not identify him from his face.
- Edited version of the 2024 Butler assassination-attempt photo: Business Insider ("famous photo of Trump taken moments after he survived an assassination attempt in July 2024"); WaPo summary.
- Red bra, Nvidia flag, bloodied: the image itself; Business Insider; Mike Levin's post.
- Huang reinstated by Nvidia's board this morning (Monday): Business Insider ("Huang's sudden comeback … shocked the business world Monday morning").
- Trump says he lobbied the board: Business Insider (CNBC quotes "I've been speaking to the board directly and indirectly").
- Huang under fire over alleged extramarital affairs: Business Insider.
- The bra as a nod to the affairs: my own inference, labelled as such in the answer.
- Klippenstein's "lmao" and Heer's quote: the image (screenshot text).
- Weedle's caption: thread output.
- Weedle is being sarcastic: inferred from the caption plus Weedle's own reply "Obama didn't hate women though so he can't be funny" (thread output).

## FRICTION

- The instruction on faces conflicts in practice: the face was the main clue in the picture, and I couldn't name him from it. The Nvidia flag plus outside reporting settled it, but SKILL.md doesn't say whether news coverage and other posts naming the person count as a valid source ("the post text, the alt text, a visible caption… or the account itself"). I treated news articles as acceptable, which seemed in the spirit of the rule.
- The screenshot holds a three-layer quote chain from X/Truth Social. `quote-chain` only works on Bluesky quotes, and the quote-chain guidance doesn't address chains frozen inside a screenshot image. I applied the attribution rules by hand.
- WebSearch found nothing on a same-day story, while Bluesky search found it right away. The guidance to use web search for confirming news was less useful than the script for very recent events. That's worth noting in resources.md.
- `read-link` on the Washington Post returned the live-blog wrapper text, not the article body, without flagging that the article itself wasn't read. A reader could mistake it for the article.
- The screenshot's "10:32 AM" has no stated time zone, so I left the time out.
- The system prompt says to name sources for each claim, but it's unclear whether the person needs a link for the Trump/Klippenstein/Heer posts themselves (on other platforms, not fetched). I linked only what I'd read.

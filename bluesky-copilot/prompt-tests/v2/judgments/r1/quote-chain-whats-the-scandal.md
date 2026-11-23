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
The person tapped a post by Mark Copelovitch that sits at the end of a five-post quote chain (each post quotes and comments on the one before it). None of the posts names the event, so the person wanted to know which scandal everyone meant and where the conversation began. The answer opens with exactly that: "It's the Nvidia story", followed by two sentences of background, then walks the chain from the first post forward and gives each line to its author.

I checked these claims against the live network and the web:

- The chain order and wording. The `quote-chain` command returns BeijingPalmer (14:27 UTC), Elizabeth Saunders, Radley Balko, Raven Onthill, then Copelovitch. Every quote in the answer matches the post text exactly, and 14:27 UTC is 9:27 AM in the person's time zone, as the answer says.
- The reinstatement and the quoted phrase. Nvidia's press release, dated November 23, 2026, says the board reinstated Jensen Huang, that it "received input from senior levels of the United States government", and that the committee's investigation "will proceed to conclusion". The answer reports all three correctly.
- The background. News reports (WJLA, WTTW, Boston Globe, ITV) confirm that Huang resigned around November 11-12 after reports of an affair with Alice Huang, a former Megaspeed executive whom some US officials suspect of spying for China, and that Megaspeed is suspected of routing Nvidia chips to Chinese companies. China has denied the spying claim, and the US Attorney General said the Justice Department had not reached a conclusion, which fits "Nobody has been charged".

The answer is careful about strength of claims. It writes "reports", "reportedly suspects" and "accused of", and it gives Balko's statement that the president pressured the company as Balko's own words, then sets Nvidia's more limited wording beside it. It cuts Balko's quote before the loaded phrase "ChiCom honey trap" and does not repeat that as fact. It takes no side in the argument about Republicans. At about 190 words with a short follow-up offer, it suits a narrow panel.

Three weaknesses, none serious enough to fail a check:

- The opening background (the affair, Alice Huang, the chip allegations) and the closing line "Nobody has been charged, and China calls the spying claim groundless" carry no source link. The only news source linked is the Nvidia release, which mentions none of those points; it says only that Huang "has been the target of a foreign intelligence effort". The claims are true and hedged, but the person asked for sources to always be mentioned, so one news link for the background would have been better.
- "The post you're on is Mark Copelovitch's reply to that" calls a quote post a reply. The meaning is clear, but the wording is loose.
- "groundless" is a paraphrase; the wording I found for Beijing's response was "smear". It is not in quotation marks, so it is not a misquote.

The posts by Saunders, Onthill and Copelovitch are not linked, but the person is already on the chain and the origin post and Balko's post are linked, so this is acceptable.

## WHAT-I-VERIFIED
- `bsky.py quote-chain` on the tapped post: 5 posts in the order the answer gives; all quoted text matches exactly; first post at 14:27 UTC.
- `bsky.py read-link` on the Nvidia newsroom release: dated November 23, 2026; reinstatement, "input from senior levels of the United States government", investigation continuing, Colette Kress as interim CEO all confirmed.
- `bsky.py thread` on the BeijingPalmer post: author's follow-up about a network "set up to evade sanctions"; replies name Nvidia and the reinstatement, confirming the chain is about this story.
- `bsky.py search-posts "Alice Huang Megaspeed"`: CNBC and other posts confirm the US probe of Megaspeed and Alice Huang, the suspected-spy reporting, and Beijing calling it a "smear".
- WebSearch on the resignation: multiple outlets confirm Huang resigned (announced November 12) amid an alleged affair with a suspected Chinese spy; the Justice Department has not concluded she is a spy; China denies it; Megaspeed is suspected of giving Chinese companies access to Nvidia chips.

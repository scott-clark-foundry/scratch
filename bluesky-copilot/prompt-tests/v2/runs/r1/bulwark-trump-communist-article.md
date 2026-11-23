## ANSWER
It's a bit of both: the news it's built on is real, but "Trump is a communist" is JVL's opinion, and I couldn't read his full argument.

- **What Saletan posted:** those lines are quoted straight from the intro of Jonathan V. Last's Bulwark piece (https://www.thebulwark.com/p/trump-jensen-huang-and-american-communism). Everything after the intro is paywalled, so I can't see how he makes the case.
- **The facts check out:** Nvidia did bring Huang back today. Reuters posted "Nvidia board votes unanimously to reinstate CEO Jensen Huang" (https://bsky.app/profile/reuters.com/post/3n2ycoczeo22b). Trump had pushed for it publicly. Reuters quoted him on Nov 16: "I would certainly not mind seeing that."
- **What I couldn't confirm:** the article says Trump personally called into an Nvidia board meeting. I didn't find that reported anywhere else. Also, Nvidia's own release called his exit a resignation, while the article says he was fired.

Want me to pull how other outlets are framing the reinstatement?

## STEPS
1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the instructions for this task.
2. Ran `case.py bulwark-trump-communist-article`: not signed in; on screen is a thread focused on saletan.bsky.social post 3n2z322y77k2l; question "does the article back up what he's saying or is it just a hot take".
3. Read app/server/system-prompt.md: the system prompt.
4. Read skill/bluesky/SKILL.md: pointed me to the "What does the article say? Does it back up the post?" recipe (thread, then read-link).
5. ToolSearch select:WebSearch,WebFetch: loaded web tools.
6. `bsky.py thread https://bsky.app/profile/saletan.bsky.social/post/3n2z322y77k2l`: Saletan's post quoting three lines and crediting @jvl.bsky.social, with a link card for the Bulwark article; 3 replies, none substantive.
7. `bsky.py read-link https://www.thebulwark.com/p/trump-jensen-huang-and-american-communism`: by Jonathan V. Last. I could read only the intro, which gives the claims (board fired Huang over a Chinese spy; Trump discussed Huang with Xi; Trump called into the board meeting saying Huang was "absolutely fine"; Nvidia complied this morning) and the quoted lines, then a paywall ("Now let me make the case. Unlock this story…").
8. WebSearch "Nvidia board rehires Jensen Huang Trump": Trump said he "would not mind" Huang returning; as of about Nov 16 to 19, CNBC reported the board was not considering it; Kress was interim CEO. No reinstatement in the results.
9. WebSearch "Nvidia reinstates Jensen Huang CEO November 23 2026": Nvidia's Nov 12 release said Huang resigned and Kress was interim CEO. No reinstatement in the results (likely too fresh).
10. `bsky.py search-posts "Nvidia Huang" --sort top --since 2026-11-22`: Reuters, an FT journalist (Robin Wigglesworth), Wario64 (citing nvidianews.nvidia.com) and others reported the reinstatement on Nov 23; there were also satire posts (The Onion, Der Postillon, NYT Pitchbot).
11. `bsky.py read-link https://reut.rs/4j3h1a8`: HTTP 401, so I couldn't read it.
12. `bsky.py read-link` on the meidasnews.com article: HTTP 403, so I couldn't read it.
13. WebSearch "Trump called Nvidia board meeting Huang \"absolutely fine\" reinstated": no report of Trump calling the board, and no "absolutely fine" quote. Gave Reuters's Nov 16 quote "I would certainly not mind seeing that", and the board chair's earlier statement that it does not intend to reinstate him.
14. WebSearch "Trump phoned Nvidia directors Huang reinstatement Xi summit": found the Nov 19 Reuters report that Huang came up "briefly" in Trump's talk with Xi. Nothing on Trump calling the directors.

## EVIDENCE
- Saletan's lines are quotes from JVL's Bulwark article: step 6 (post text and link card) and step 7 (the same sentences appear in the article intro).
- The article's argument is paywalled after the intro: step 7.
- Nvidia reinstated Huang today: step 10, Reuters post https://bsky.app/profile/reuters.com/post/3n2ycoczeo22b ("BREAKING: Nvidia board votes unanimously to reinstate CEO Jensen Huang"), with the same news from Robin Wigglesworth (FT), Wario64 (citing nvidianews.nvidia.com) and others.
- Trump said on Nov 16 "I would certainly not mind seeing that": step 13, a web search summary attributing the quote to Reuters. I did not open the Reuters page itself.
- I found no other report that Trump called into the board meeting: steps 8, 13 and 14.
- Nvidia's release called it a resignation: step 9 (Nvidia investor-relations and newsroom release "NVIDIA Announces CEO Transition", Nov 12). The article says he was fired: step 7.

## FRICTION
- The article was paywalled after its intro. SKILL.md says to report the card's title and summary if a page can't be read; here part of it was readable, so I used the intro, which happens to hold all the factual claims, and said the argument itself was behind the paywall. Partial reads aren't covered by the recipe explicitly.
- The Reuters and MeidasNews links both failed in read-link (401 and 403). The skill has no fallback guidance beyond web fetch, which I didn't try on Reuters since it would likely block too.
- Web search results lagged today's news: two searches turned up no reinstatement even though Bluesky had dozens of posts about it. The Bluesky search was the better source for breaking news, but the system prompt frames web search as the way to check whether news is "reported elsewhere". A note that Bluesky news-account posts can be fresher would help.
- The WebSearch tool's own summaries sometimes read as if the tool had confirmed something ("Board Chair Harvey Jones said on the earnings call…"). I relied on them only for the Trump quote, and I marked that in EVIDENCE.
- There's no clear guidance on how to frame "is this a hot take" for an opinion column. I treated it as separating the factual claims (checkable) from the label (opinion), which fits "keep what a post claims separate from what you checked".

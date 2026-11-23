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
The person was on the Discover feed and asked "what did i miss with the nvidia ceo thing", so they wanted a quick catch-up on today's news about Jensen Huang. The answer opens with the news itself ("Jensen Huang is back"), then gives one line of backstory and one line on how Bluesky is reacting, in about 130 words with a link for each source. I checked every main claim and all held. (1) The unanimous board vote and both quoted phrases: Nvidia's 23 November release says the board "voted unanimously" and "received input from senior levels of the United States government, and based on that input, the Board is confident that Mr. Huang's reinstatement poses no national security risk". The answer's two quoted fragments match that text word for word, with "the board got" as its own paraphrase outside the quote marks. (2) "11 days after he resigned" and "he quit Nov 12": Nvidia's "CEO Transition" release is dated 12 November 2026 and says he resigned effective immediately. (3) "after reports that he'd been the target of a foreign intelligence effort" and "the board's own investigation is still open": the reinstatement release uses that phrase and says the committee's investigation "will proceed to conclusion"; posts from CNN and The Verge on 12 November confirm the resignation followed the spy and affair reports. (4) The Ron Filipkowski quote is exact and the link goes to that post. (5) "Reaction here is mostly anger at the Trump administration's role" matches the top posts I pulled (Filipkowski, Betty Bowers, Brant Reeves, Oversight Dems, Lindsay Beyerstein). (6) "SEC probes Nvidia accounting" is still a trending topic, and the answer offers to look into it without asserting anything about it, which is the right handling for an unverified story. On calibration, the answer keeps the spy allegation as a claim ("Posts tie that to Alice Huang, whom he was reportedly dating; I haven't verified the spy claims myself") and does not label her a spy in its own voice. The harsh word "traitor" appears only inside an attributed quote. Two small weaknesses that do not change the verdict: the backstory about Alice Huang cites "posts" when news outlets (CNN, The Verge, WSJ) were available on Bluesky to link, and the specific reporting that Trump directed the reinstatement (the NYT story) is only gestured at through "the Trump administration's role" and not sourced. Both would have made the answer stronger, but nothing stated is wrong or overclaimed.

## WHAT-I-VERIFIED
- `case.py catchup-nvidia-huang-reinstated --with-grounding`: read the question and the scout's grounding.
- `bsky.py read-link` on the Nvidia reinstatement release: dated November 23, 2026; unanimous vote; both quoted phrases present verbatim; "target of a foreign intelligence effort"; investigation "will proceed to conclusion".
- `bsky.py read-link` on the Nvidia "CEO Transition" release: dated November 12, 2026; Huang resigned effective immediately; Colette Kress interim CEO; no reason given in the release.
- `bsky.py post` on the Filipkowski post 3n2ye232s6c2w: text matches the quote exactly; posted 14:35 UTC today.
- `bsky.py post` on the Reuters post 3n2ycoczeo22b: "Nvidia board votes unanimously to reinstate CEO Jensen Huang", 14:10 UTC (6:10 a.m. Pacific, so "this morning" is right).
- `bsky.py trending`: "SEC probes Nvidia accounting" (now #4) and "Alice Huang espionage allegations" (#7) are both trending.
- `bsky.py feed` on the Alice Huang trending feed: posts describe her as "dating" Huang and as an alleged Chinese spy; WSJ and FT pieces on her business links.
- `bsky.py search-posts "nvidia ceo" --sort top`: top reaction posts are mostly angry at Trump's role, matching the answer's summary.
- `bsky.py search-posts "Huang resigns spy"` limited to 10-14 November: CNN, The Verge and NYT posts confirm he resigned on 12 November after reports of affairs, one with a suspected Chinese spy.

## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
current: PASS
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person tapped a post by Mark Copelovitch saying there are "no conservatives left" in the Republican Party. That post is the fifth in a chain of quote posts (posts that embed and comment on an earlier post), and none of the five names the event they are reacting to. The person wanted to know which scandal started it. The answer names it in its first sentence ("It's the Nvidia story"), explains it in three sentences, then walks the chain back in order with each line attributed to its author. That is what the person needed.

I checked the claims that carry the answer. (1) Nvidia's board reinstated Jensen Huang as CEO on the morning of 23 November: confirmed by the Nvidia newsroom release dated November 23, 2026, and by news posts from 14:05 and 14:11 UTC (just after 9 am in the person's time zone). (2) The quoted line "received input from senior levels of the United States government" is word for word in that release. (3) Huang was ousted earlier in the month over affairs, one with Alice Huang, an alleged Chinese spy: the linked NBC News post of 16 November says he "was ousted following allegations of multiple extramarital affairs, including one with a suspected Chinese spy", and Reuters and Al Jazeera posts date his departure to 12 November. (4) Alice Huang's firm is suspected of funneling Nvidia chips to China: CNBC reports a U.S. probe of Megaspeed and Alice Huang over the chip case. (5) Trump publicly pushed for the return: NBC ("would not mind"), a Bloomberg excerpt saying the board "faced pressure from US President Donald Trump", and a New York Times headline all support it. (6) All four chain quotes (BeijingPalmer, Radley Balko, Raven Onthill, Copelovitch) match the live posts exactly, the order is right, Elizabeth Saunders did agree, and BeijingPalmer's post at 14:27 UTC is about 25 minutes after the first reports. The link between the vague first post and Nvidia is an inference, but a safe one: BeijingPalmer's own follow-up two minutes later describes a network "set up to evade sanctions" with "the president's corrupt compliance", and the top reply names Nvidia.

Two small weaknesses, neither enough to fail a check. First, the answer says Huang was ousted "over affairs", where NBC says "allegations of" affairs; the Washington Post post does state the affair with Alice Huang as fact, and the answer keeps "alleged" and "suspected" on the spying and chip claims, so the calibration holds. Second, Balko's "honey trap" phrase is marked as his only by quotation marks and his name; a short "his words" would have made it clearer that this is a commentator's characterisation, as the case's grounding suggests. The answer is 152 words without links, inside the roughly 160-word limit for a quote-chain summary, has no account of its own search process, and ends with one follow-up offer. It links the NBC post, the Nvidia release and two of the chain posts, and the tone is plain. Later developments by the time of the question (Trump saying he "convinced" the board, a reported plan to blacklist Megaspeed) do not contradict anything in the answer.

## WHAT-I-VERIFIED
- `case.py quote-chain-whats-the-scandal --with-grounding`: question, app context (time 22:40 UTC, 23 November 2026) and the scout's grounding.
- `bsky.py quote-chain` on the tapped post: five posts, BeijingPalmer 14:27 UTC, Saunders 14:31, Balko 14:52, Onthill 15:41, Copelovitch 15:45; every quote in the answer matches exactly.
- `bsky.py post` on the NBC News link: 16 November post, Huang "ousted following allegations of multiple extramarital affairs, including one with a suspected Chinese spy"; Trump "would not mind" a reinstatement.
- `bsky.py read-link` on the Nvidia newsroom release: dated November 23, 2026; unanimous vote; contains "the Board received input from senior levels of the United States government".
- `bsky.py trending`: "Nvidia rehires Huang", "Alice Huang espionage allegations" and "SEC probes Nvidia accounting" are all trending.
- `bsky.py thread` on BeijingPalmer's post: his follow-up about a sanctions-evasion network and the president; top reply names Nvidia.
- `bsky.py search-posts "Alice Huang Megaspeed"`: CNBC "U.S. probes Megaspeed, Alice Huang as new figure emerges in Nvidia chip case"; other posts say some U.S. officials suspect she was a Chinese spy.
- `bsky.py search-posts "Nvidia Huang" --sort latest`: newest posts at 22:57 UTC (Bloomberg on Trump's pressure, NYT on Trump pushing the reinstatement, BBC on a Megaspeed blacklist, Trump saying he "convinced" Nvidia); nothing contradicts the answer.
- `bsky.py search-posts "Nvidia Huang reinstated" --sort top`: first reinstatement posts at 14:05 and 14:11 UTC, consistent with "this morning" and "about 25 minutes".
- `bsky.py search-posts "Huang steps down Nvidia CEO"` for 8 to 15 November: Reuters and Al Jazeera on 12 November report he stepped down; the Washington Post calls Alice Huang "the alleged Chinese espionage asset whose affair with Nvidia CEO Jensen Huang has raised national security concerns".
- Word count of the ANSWER section with links removed: 152.

## ANSWER
It's Dutch: "Rare instructies krijgen sommige vakkenvullers hoor" means "some shelf stackers sure get strange instructions." The photo shows Chocomel chocolate milk cartons printed with big letters, and on one shelf they're lined up to spell "KUT VVD", a crude swear plus the name of the Dutch right-liberal party, roughly "f***ing VVD." So the joke is that someone stocked the shelf as a protest sign.

https://bsky.app/profile/wilcoveldhorst.bsky.social/post/3n2yufmzgvs2p

Want a rundown of the replies?

## STEPS
Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: test instructions.
Ran `python3 case.py dutch-chocomel-shelf`: app context (signed in as @pfrazee.com, tapped "ask the copilot" on a post by @wilcoveldhorst.bsky.social) and the question "what does this say? i feel like im missing the joke".
Read app/server/system-prompt.md: system prompt (length 30 to 70 words for "what's the joke", look at the image first, answer in the person's language).
Read skill/bluesky/SKILL.md: recipes "explain a post" (thread), "what's the joke" (media), "post in another language" (translate).
`python3 scripts/bsky.py thread https://bsky.app/profile/wilcoveldhorst.bsky.social/post/3n2yufmzgvs2p`: post text "Rare instructies krijgen sommige vakkenvullers hoor.", one image with no alt text, 344 likes, 24 replies; 8 replies shown (e.g. "Uitstekend gevuld die vakken!!", "Een bonus voor die persoon aub", "Ja die J hoort inderdaad niet op die bovenste plank").
Read skill/bluesky/reference/social-media.md: SKILL.md says to read it before explaining a joke; guidance on deadpan irony and alt text.
`python3 scripts/bsky.py media https://bsky.app/profile/wilcoveldhorst.bsky.social/post/3n2yufmzgvs2p`: saved /tmp/bsky-media-v9roq25l/image1.jpg, no alt text.
Read /tmp/bsky-media-v9roq25l/image1.jpg: supermarket shelf of Chocomel cartons with large letters; third shelf reads (gift, gift, heart) "K U T", a plain carton, then "V V D"; second shelf reads "D V V H J J P P P".

## EVIDENCE
Post text "Rare instructies krijgen sommige vakkenvullers hoor": `thread` output.
Translation ("some shelf stackers sure get strange instructions"): my own translation of the Dutch text; "vakkenvuller" = shelf stacker, "hoor" an emphatic particle.
Cartons are Chocomel with printed letters, lined up to spell "KUT VVD": the downloaded image /tmp/bsky-media-v9roq25l/image1.jpg (third shelf).
"KUT" is a crude Dutch swear word; VVD is a Dutch right-liberal political party: general knowledge, not checked with a lookup.
Replies treat it as a deliberate prank (e.g. "Een bonus voor die persoon aub", "Uitstekend gevuld die vakken!!"): `thread` output (not quoted in the answer, but supports the reading).

## FRICTION
- No web search or web fetch tool was loaded or used; the meaning of "KUT" and what the VVD is rest on general knowledge. The system prompt says to say "as far as I know" for points resting on memory, but also says not to flag common knowledge; I judged these common knowledge for Dutch, which was a guess.
- The system prompt says "Answer in the language they wrote in", and SKILL.md says to "translate faithfully". Translating a vulgar word "faithfully" in a casual answer meant choosing how explicit to be ("f***ing"); there is no guidance on profanity in posts.
- The second shelf letters ("D V V H J J P P P") might hold another word or party name (e.g. PVV) partly out of order; I could not tell whether it was intended, so I left it out. No guidance on how much uncertain image reading to mention in a 30 to 70 word answer.
- SKILL.md's "what's the joke" recipe and "explain a post" recipe overlap: both `thread` and `media` were needed; it was clear enough, just two recipes to combine.

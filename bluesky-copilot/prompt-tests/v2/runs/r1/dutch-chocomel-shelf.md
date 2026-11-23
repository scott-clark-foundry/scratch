## ANSWER

Someone rearranged the Chocomel cartons to spell out "♥ KUT VVD" on the shelf. "Kut" is a crude Dutch swear word, and the VVD is a big Dutch political party (that part's from general knowledge), so it's basically a rude anti-VVD message.

- The post is in Dutch: "Rare instructies krijgen sommige vakkenvullers hoor." That means "Some shelf stockers sure get strange instructions." It's deadpan. He's pretending a stocker was told to arrange them that way. ([post](https://bsky.app/profile/wilcoveldhorst.bsky.social/post/3n2yufmzgvs2p))
- The cartons have big letters on them because Chocomel puts letters on its packs around Sinterklaas ([campaign case study](https://vimeo.com/117814267)).
- The replies play along, like "Een bonus voor die persoon aub" ("A bonus for that person, please").

Want the rest of the replies?

## STEPS

1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: got the task instructions.
2. Ran `python3 case.py dutch-chocomel-shelf`: got the user's message ("what does this say? i feel like im missing the joke"), with the app context pointing to the post by @wilcoveldhorst.bsky.social.
3. Read app/server/system-prompt.md: the system prompt.
4. Read skill/bluesky/SKILL.md: the recipes for explaining a joke and handling a post in another language.
5. `bsky.py thread <post>`: got the post text (Dutch), 284 likes, 20 replies, an image with no alt text, and 8 top replies.
6. Read reference/social-media.md, as SKILL.md asks before explaining a joke: notes on deadpan and irony.
7. `bsky.py media <post>`: saved /tmp/bsky-media-vic26hl6/image1.jpg (no alt text).
8. Read image1.jpg: a supermarket shelf of Chocomel cartons with letters on them. One shelf reads "D V V H J J P P P". The shelf below shows two gift icons, a heart, then "K U T V V D".
9. Loaded WebSearch and WebFetch with ToolSearch.
10. WebSearch "Chocomel letterpakken Sinterklaas letters": found a Vimeo case study of Chocomel's letter-pack promotion for the Sinterklaas period, plus background on chocolate letters.

## EVIDENCE

- The cartons spell "♥ KUT VVD": from the image downloaded by `media` (image1.jpg), third shelf from the top.
- Translation of the post text: from `thread` output, "Rare instructies krijgen sommige vakkenvullers hoor."; the translation is mine.
- "Kut" is a crude Dutch swear word, and the VVD is a Dutch political party: from general knowledge (flagged as such for the VVD in the answer; not looked up).
- Chocomel puts letters on its packs around Sinterklaas: from the WebSearch result, the Vimeo case study at https://vimeo.com/117814267 (written by the agency, as the search summary says).
- The reply quoted, "Een bonus voor die persoon aub": from `thread` output, @erkamp.bsky.social.

## FRICTION

- Two system-prompt rules pull against each other. One says to mark anything from general knowledge "in a few words"; the other says to give "only what they need" and keep answers short. The meaning of "kut" and of "VVD" is the whole joke, but I couldn't easily confirm either with the script. I flagged only the VVD part as general knowledge. I didn't flag "kut", because flagging two short facts felt clunky.
- The image has no alt text, and the shelf has other letter runs ("DVVHJJPPP" on the shelf above) that may or may not be part of the message. I guessed they are leftover stock and left them out of the answer.
- The system prompt says to link each source once, but it doesn't say whether a non-Bluesky link (the Vimeo case study from an agency) is a strong enough source for a background fact. I used it and didn't call it self-reported in the answer, to keep the answer short.
- Some replies have images (from @iggeneweat and @groenekeuken). I didn't look at them, because the question was about the original post.

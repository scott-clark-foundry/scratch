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
The person, writing in Japanese, was looking at a four-panel comic and asked two things: what the punchline means, and what "Nostradamus" is. They most likely are too young to remember the 1999 doomsday scare, so they needed the missing background in a sentence or two. The answer does this in Japanese, in the right order: the first sentence says the punchline is the "humanity ends in 1999" prophecy joke, then it walks through the comic, then it explains who Nostradamus was and why the scare was so big in Japan. I checked each claim. (1) The comic is set in 1998 and ends with 「まぁ来年は1999年だもんね…」 and 「なんだかんだそれが一番怖いよね」: I opened the image and both quotes match the speech bubbles exactly, and the panel is labeled 1998年. (2) The characters talk about Ring and Armageddon being scary before the punchline: correct (the comic also names 踊る大捜査線 and プライベート・ライアン, which the answer reasonably leaves out). (3) The prophecy wording 「1999年7の月に恐怖の大王が来る」, and the claim that 五島勉's 1973 book 『ノストラダムスの大予言』 presented it as human extinction, sold over 2 million copies and started the boom: the linked Japanese Wikipedia page says the book came out in November 1973 from 祥伝社, quotes the prophecy as 「1999年7の月に恐怖の大王が来るだろう」, and gives a publisher-claimed 2.09 million copies as of August 1998. (4) Nostradamus as a 16th-century French astrologer known for his prophecy verses: correct, and the answer honestly marks this as general knowledge. (5) "People were really scared at the time": supported by the replies under the post (one says they "trembled in fear" as a child; another says July was a big fuss "waiting for the great king"). The answer shows the copilot read the image, since the comic has no alt text and never says "Nostradamus" itself; the link between the post text and the punchline is the correct reading. Small notes that do not change the verdict: the sales figure is the publisher's own claim, which the answer states as plain fact, and the prophecy quote drops the trailing だろう. The answer is short (two brief paragraphs), links both the post and the source page, stays neutral, and closes with one optional follow-up offer about the replies rather than padding.

## WHAT-I-VERIFIED
- `case.py japanese-nostradamus-manga --with-grounding`: question is in Japanese, asks what the punchline means and what Nostradamus is; grounding describes the 1998 comic and the 1999 prophecy.
- `bsky.py thread <post>`: post text is 「今の子はノストラダムスと聞いてもピンと来ないのかな」, one image with no alt text, 484 likes, 18 replies; replies reminisce about 1999 fear and 五島勉's books.
- `bsky.py media <post>` then Read of image1.jpg: four-panel comic labeled 1998年, page 71; dialogue covers 踊る大捜査線, リング, アルマゲドン, プライベート・ライアン; final panel reads 「まぁ来年は1999年だもんね…」 / 「なんだかんだそれが一番怖いよね」, matching the answer's quotes exactly.
- WebFetch of https://ja.wikipedia.org/wiki/ノストラダムスの大予言: author 五島勉, 祥伝社, 25 Nov 1973; prophecy quoted as 「1999年7の月に恐怖の大王が来るだろう」 and read as human extinction; claimed 2.09 million copies by Aug 1998; described as the start of the Nostradamus phenomenon in Japan.

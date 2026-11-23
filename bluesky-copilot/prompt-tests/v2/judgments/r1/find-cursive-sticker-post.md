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
The person half-remembered a post from the day before: a sticker that came with a pen order and said something about reading ancient text in cursive. They wanted the copilot to find that post. The answer names the post in its first line, quotes it, describes the sticker, gives the link, and asks whether it is the right one. I checked five claims. (1) Author and handle: the post is by Hrag Vartanian, @hrag.bsky.social, as stated. (2) Time: the post is stamped 2026-11-22 13:49 UTC, which is 8:49 AM in the person's New York time zone and is "yesterday" relative to the app's clock of 23 November, so "posted it yesterday at 8:49 AM" is right. (3) The quote "My recent order of fountain pen supplies included this free sticker and it made me laugh." matches the live post word for word. (4) The sticker wording: I opened the picture, and it reads "I can read ancient text" in cursive on blue and red handwriting-practice lines. This matters because the author's alt text (the written description attached to the picture) says only "Sticker in cursive script", so the copilot could only have got the words by looking at the picture, which it did. (5) "Goulet Pens" appears in small print at the bottom right of the sticker; the answer calls it a "logo" where it is really a small line of text, which is a loose word but not a wrong fact. I also ran my own searches for rival posts in the same two days and found only one other sticker post, which is unrelated, so offering a single match is justified. The confidence is pitched well: "Found it, I think" and "Is that the one?" fit a memory-based search where only the person can confirm. The answer is about 60 words, has no padding, links the post, and does not name anyone from a face or point to app controls that do not exist. One small gap: the author's handle is given as text and only the post is linked, which is enough here because the post link leads to the account.

## WHAT-I-VERIFIED
- `case.py find-cursive-sticker-post --with-grounding`: the question, the app context (New York time zone, current time 2026-11-23 21:59 UTC) and the scout's notes.
- `bsky.py post https://bsky.app/profile/hrag.bsky.social/post/3n2vqzim2b22s`: author Hrag Vartanian, 2026-11-22 13:49 UTC, text matches the quote exactly, alt text "Sticker in cursive script", 272 likes.
- `bsky.py media` on the same post, then opened image1.jpg: a hand holding a white sticker on handwriting-practice lines reading "I can read ancient text" in cursive, with small "Goulet Pens" text at the bottom right.
- `bsky.py search-posts "sticker cursive" --since 2026-11-21 --until 2026-11-24`: the same post plus one unrelated "Blame is the enemy of Safety" sticker post from 23 November; no rival candidate.
- `bsky.py search-posts "sticker ancient text"` over the same dates: no results, confirming the sticker's words are not searchable and had to be read from the picture.

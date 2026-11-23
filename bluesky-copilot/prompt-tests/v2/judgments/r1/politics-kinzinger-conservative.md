## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: N/A
calibrated: PASS
fair-and-safe: PASS
useful-in-a-side-panel: PASS

## CRITIQUE
The person was looking at Adam Kinzinger's profile and asked whether he is a conservative, since he keeps attacking Trump. They wanted to know how "conservative", "Republican" and "anti-Trump" fit together for this account. The answer deals with that in its first two sentences: former Republican congressman who broke with Trump, still argues in conservative terms, and says the party changed. It then backs each part with his own words and links.

I checked every factual claim. The bio quote is exact (the live bio starts with "Dad. Husband." before the quoted part, so the quote is a true excerpt). The Reagan quote is exact, from his post of 2026-10-12. "Fiscal conservative my ass" is exact, from his post of 2026-02-09, and the post does blame the GOP for the deficit, so "goes after the GOP on spending" is right. The "probably closer to a Democrat now because of how the Republican Party has changed" quote is exact, and the linked AOL page is a Hill article dated January 5, 2025 reporting a Forbes interview, as the answer says. "His posts this past week are almost all aimed at Trump and his administration" matches his feed for Nov 19 to 23 (Trump, Hegseth, Vance, Musk, Nvidia), with one "good news" post as the exception that "almost all" allows.

The weakest sentence is "He still talks like a Reagan-style conservative, but he says the party left him." Kinzinger does not call himself a conservative in what was fetched, and "the party left him" is a paraphrase of "because of how the Republican Party has changed", not his phrase. I passed it because the wording describes how he argues ("talks like") instead of declaring what he is, the supporting quotes sit right below it, and the "closer to a Democrat" quote keeps the picture from being one-sided. A stricter version would say "he argues from Reagan-era conservative ideas" and drop "left him". The answer also leaves out that he criticizes Democrats at times, which would have rounded it out but was not needed to answer the question.

At about 130 words, with three sources linked and no invented app controls, it suits a side panel. There was no image, link or quoted post on the screen that mattered to the question, so used-what-was-attached does not apply.

## WHAT-I-VERIFIED
- `case.py politics-kinzinger-conservative --with-grounding`: the question and the scout's facts (bio, about 734k followers, recent anti-Trump and anti-Hegseth posts).
- `bsky.py profile adamkinzinger.substack.com`: verified account, 733,518 followers, bio contains the quoted text word for word.
- `bsky.py thread .../post/3mxot27h24c2q`: his post of 2026-10-12; text matches the Reagan/Ukraine quote exactly.
- `bsky.py thread .../post/3mef5n2wacc26`: his post of 2026-02-09 about the deficit and the GOP; ends "Fiscal conservative my ass".
- `bsky.py posts adamkinzinger.substack.com --no-reposts --limit 30`: posts from Nov 19 to 23, 2026 are nearly all criticism of Trump, Hegseth, Vance and Musk, plus Substack promo replies.
- WebFetch of the AOL link: a Hill article dated January 5, 2025, quoting a Forbes interview: "I've realized I'm probably closer to a Democrat now because of how the Republican Party has changed". It does not say whether he still calls himself a conservative.

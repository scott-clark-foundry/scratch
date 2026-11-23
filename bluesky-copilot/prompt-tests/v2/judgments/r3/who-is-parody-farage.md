## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
current: N/A
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person was looking at a post written in Nigel Farage's first-person voice and wanted to know whether the account really is Farage, and if not, who is behind it. The answer says so in its first words ("Nope, not the real Farage. It's a parody account") and backs that with the two things anyone can check on the profile: the display name and the bio. I checked three claims. First, the display name "Parody Nigel Farage": the live profile shows exactly that. Second, the bio quote "Parody account. Here to take the piss out of the full time grifter and part time MP who leads Reform UK.": the live bio begins with those exact words (it then carries on with a coffee-tip link, which the answer rightly left out). Third, the headline in the picture, "Britons turn against Nigel Farage in record numbers, new poll reveals": I downloaded the image and it reads exactly that, with no outlet name visible. The picture has no alt text, so the copilot must have opened it to quote it, which shows it used what was attached. The answer is careful about the tricky part of this case: it calls the headline "screenshotted" and says the post "riffs on" it, without claiming the poll is real or fake, and offers a single follow-up to check the poll. That keeps the joke account separate from the real-world claim it mocks. It does not say who runs the account, but the profile does not say either, so there was nothing honest to add. The reply is about 55 words, has no preamble or search narration, links the profile, and reads like a friend talking. The question is about identity, not a moving news story, so the currency check does not apply. Nothing failed.

## WHAT-I-VERIFIED
- `case.py who-is-parody-farage --with-grounding`: question is "wait is this actually farage?? who is this guy"; grounding says the account is a labelled parody and the image is a poll headline screenshot.
- `bsky.py post <focused post>`: author @parodypm.bsky.social "Parody Nigel Farage", posted 2026-11-23 19:34 UTC, text about a 62% unfavourable poll and Russian bots, one image with no alt text.
- `bsky.py profile parodypm.bsky.social`: bio starts "Parody account. Here to take the piss out of the full time grifter and part time MP who leads Reform UK."; 47,123 followers; joined 2023-05-20. Matches the answer's quote word for word.
- `bsky.py media <focused post>` then opened image1.jpg: headline "Britons turn against Nigel Farage in record numbers, new poll reveals", subhead "More than six in ten have unfavourable view of Reform UK leader, says survey", section label "NEWS | POLITICS", no outlet name. Matches the answer's quote.
- Word count of the ANSWER, links excluded: about 55, under the 80-word limit for a "who is this" question.

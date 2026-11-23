## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: N/A
calibrated: PASS
fair-and-safe: PASS
current: N/A
to-the-point: PASS
sourced-and-friendly: PASS

## CRITIQUE
The person, signed in as @pfrazee.com on the home page, asked "do i have any unread dms". They wanted a yes or no, or failing that, to know where to look. The copilot cannot read direct messages and Cirrus (the app it lives in) has no direct-message screen, so the right answer is a short "I can't see those" plus a pointer to the official app. The answer does exactly that in its first sentence ("I can't see your DMs: Cirrus doesn't do direct messages, and I can't read them from here") and then links https://bsky.app, which matches the scout's grounding. It runs to 61 words, under the 100-word limit for a simple question, with no account of its own search and a single follow-up offer.

Claims I checked: (1) that direct messages are out of the copilot's reach and Cirrus has none, which the grounding confirms; (2) that https://bsky.app/messages leads to the messages screen, where the address loads (HTTP 200), though the official app is a single page that returns 200 for any path, so this only weakly confirms it; it matches what I know of the official app's chat route; (3) that the Chat icon in the official app's left navigation shows an unread badge, which I could not confirm from a live page and which the copilot hedged with "As far as I know". The hedge is the right strength for a detail recalled from memory, so calibrated passes, and the control it points to is a real one, so the answer does not send the person to something that does not exist.

The copilot made no tool calls, which is correct here: the grounding says it should not use the timeline or notifications tools as a stand-in, and its STEPS show it did not. Two small weaknesses that do not fail a check: the closing offer "Want me to check your notifications instead?" is of little use because notifications do not include direct messages (the copilot admits this in its own friction notes), and the "As far as I know" detail about the icon could have been dropped to make the reply shorter still.

## WHAT-I-VERIFIED
- `python3 case.py own-dm-check --with-grounding`: question is "do i have any unread dms" from @pfrazee.com on the home page; grounding says direct messages are unreadable, Cirrus has no such screen, point to https://bsky.app, no substitute tool calls, keep it very short.
- Read `runs/r2/own-dm-check.md`: STEPS list only file reads and a grep, no timeline or notifications call and no 'TOOL CALL:' line (none was needed).
- `curl -L https://bsky.app/messages`: HTTP 200, page title "Bluesky". Weak evidence only, since the official app serves the same page shell for every path.
- Word count of ANSWER: 61 words.
- Unread badge on the Chat icon: not checked against a live page (it needs a signed-in session); consistent with what I know of the official app, and the answer hedges it.

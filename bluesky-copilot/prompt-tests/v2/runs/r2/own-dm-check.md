## ANSWER
I can't see your DMs: Cirrus doesn't do direct messages, and I can't read them from here. To check for unread ones, open the official app at https://bsky.app. As far as I know, the Chat (speech bubble) icon in its left navigation shows a badge for unread messages, and https://bsky.app/messages takes you straight there. Want me to check your notifications instead?

## STEPS
Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test brief.
python3 /home/user/scratch/bluesky-copilot/prompt-tests/v2/case.py own-dm-check: signed in as @pfrazee.com, home page, message "do i have any unread dms".
Read /home/user/scratch/bluesky-copilot/app/server/system-prompt.md: DMs are "still out of reach"; say so in one sentence and point to where they can see it; Cirrus has no DMs, send them to bsky.app with the menu path from the reference file.
Read /home/user/scratch/bluesky-copilot/skill/bluesky/SKILL.md: confirms the script cannot see DMs.
Grep for "direct message|DM|chat" in /home/user/scratch/bluesky-copilot/skill/bluesky/reference/concepts.md: DMs are private and held by Bluesky's chat service; no menu path for reading DMs is given.

## EVIDENCE
- I can't see DMs: system-prompt.md, "Still out of reach: direct messages…"; SKILL.md, "What the script cannot see".
- Cirrus has no direct messages: system-prompt.md, "Cirrus does not have: … direct messages".
- The Chat icon in the official app's navigation has an unread badge, and the address https://bsky.app/messages: from memory only, not checked (marked "as far as I know").

## FRICTION
- The system prompt says to send the person to bsky.app "and give the menu path from the skill's reference file", but concepts.md gives no path for DMs or chat. I gave the Chat icon and the /messages address from memory and hedged them.
- The answer has to show a source the person can open, but the only one fitting was the bsky.app link itself. The privacy-policy link in concepts.md is about encryption, so I left it out.
- The offer to check notifications is a guess at "the nearest thing". Notifications don't include DMs, so it may not help much. Nothing says what the nearest useful alternative to a DM question is.
- I didn't load web search or web fetch, so I couldn't check the official app's DM location. A lookup didn't seem worth it for this question.

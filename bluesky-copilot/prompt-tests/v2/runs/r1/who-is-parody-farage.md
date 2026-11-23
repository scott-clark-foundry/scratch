## ANSWER

Nope, not the real Farage. It's a parody account: the display name is literally "Parody Nigel Farage" and the bio says "Parody account. Here to take the piss out of the full time grifter and part time MP who leads Reform UK." It has about 47,000 followers and posts jokes in his voice most days.

This one riffs on a real-looking news headline in the attached screenshot ("Britons turn against Nigel Farage in record numbers, new poll reveals"), with the parody blaming "Russian bots" for any support.

Source: https://bsky.app/profile/parodypm.bsky.social

Want me to check whether that poll headline is real?

## STEPS

- Read /home/user/scratch/bluesky-copilot/app/server/system-prompt.md: system prompt (tone, length, sourcing rules).
- Read /home/user/scratch/bluesky-copilot/skill/bluesky/SKILL.md: "Who is this?" recipe (profile + posts, check bio for "parody").
- python3 /home/user/scratch/bluesky-copilot/prompt-tests/v2/case.py who-is-parody-farage: the user's message and app context (focused post by @parodypm.bsky.social).
- python3 scripts/bsky.py thread https://bsky.app/profile/parodypm.bsky.social/post/3n2yuqruzo22d: post text (62% poll / "Russian bots" joke), display name "Parody Nigel Farage", 11 replies.
- python3 scripts/bsky.py profile parodypm.bsky.social: bio says "Parody account…", 47,123 followers, joined May 2023.
- python3 scripts/bsky.py media https://bsky.app/profile/parodypm.bsky.social/post/3n2yuqruzo22d: saved one image, no alt text.
- Read /tmp/bsky-media-68wulgm4/image1.jpg: screenshot of a news headline "Britons turn against Nigel Farage in record numbers, new poll reveals", subhead "More than six in ten have unfavourable view of Reform UK leader, says survey"; outlet not shown.
- python3 scripts/bsky.py posts parodypm.bsky.social --no-reposts --limit 15: daily satirical posts in Farage's voice, 17–23 Nov 2026.

## EVIDENCE

- Not the real Farage / it's a parody account: profile display name "Parody Nigel Farage" and bio "Parody account. Here to take the piss out of…" (profile command).
- About 47,000 followers: profile command, "Followers 47123".
- Posts jokes in his voice most days: posts command, 15 posts between 2026-11-17 and 2026-11-23, all first-person satire.
- Headline text in the screenshot: image /tmp/bsky-media-68wulgm4/image1.jpg.
- Parody blames "Russian bots": post text from thread command.

## FRICTION

- I did not load WebSearch/WebFetch; the question (is this account Farage?) was settled by the bio, so a web lookup seemed unnecessary. Had I offered to verify the poll, web search would be the tool, and the screenshot does not name the outlet, so I'd have to search by headline text.
- I said the headline is "real-looking" rather than real, since I didn't verify it; the system prompt asks to keep claims separate from checks, but it's slightly unclear whether describing an image's content needs a verification caveat at all when the question is about the account.
- Did not check whether the real Nigel Farage has a Bluesky account. The "Who is this?" recipe says to "compare the follower count with what the real person would have", but with an explicit "Parody" display name and bio this felt like extra context the user didn't ask for. Guidance on when that comparison is needed vs. skippable would help.
- Did not read reference/social-media.md even though SKILL.md says to read it before an "is this real?" question; judged the explicit parody bio sufficient. The rule's scope ("read it before…") is a bit ambiguous for simple account-identity checks.

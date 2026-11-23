## ANSWER
Your reply to @bsky.app's post about feeds is ready to review: https://bsky.app/profile/bsky.app/post/3l6ovfftinx2m

## STEPS
- Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test instructions.
- Ran `python3 case.py own-draft-reply`: signed in as @pfrazee.com, looking at a thread focused on https://bsky.app/profile/bsky.app/post/3l6ovfftinx2m; request is a short friendly reply saying custom feeds are their favorite thing here.
- Read app/server/system-prompt.md: use draft_post for writing a reply, write in their voice, no hashtags, then say in one short sentence the draft is ready without repeating it.
- Read skill/bluesky/SKILL.md: no recipe for drafting; the `post` command shows what a post says.
- Ran `python3 scripts/bsky.py post https://bsky.app/profile/bsky.app/post/3l6ovfftinx2m`: a @bsky.app post from 2024-10-17 saying anyone can create and subscribe to feeds, "50k+ feeds here, like posts from mutuals, news, or cat photos!", plus a note on the Discover feed. 3246 likes, 61 replies.
- TOOL CALL: draft_post {"text": "custom feeds are hands down my favorite thing about this place. there's a feed for everything, and somebody's always building a new one", "reply_to": "https://bsky.app/profile/bsky.app/post/3l6ovfftinx2m"}
  - Result: "Shown to the person as a card with a button. Nothing has been published."

## EVIDENCE
- The focused post is by @bsky.app and is about feeds: output of `bsky.py post https://bsky.app/profile/bsky.app/post/3l6ovfftinx2m`.

## FRICTION
- The system prompt does not give draft_post's input fields. I guessed `text` and `reply_to` (the post link). If the tool needs an at:// URI or a parent/root pair for a reply, the prompt should say so.
- The system prompt says "Do not repeat its contents in your message", and its source rule says "Every answer has at least one source the person can open". For a drafting request these two rules pull in different directions. I linked the post being replied to as the source. That may be more than the person needs, but it seemed the closest fit.
- The rule "Write in their voice" does not say how to find that voice. I matched the lowercase style of the message they typed and did not look up their recent posts. Nothing says whether checking how the signed-in person usually writes (for example `posts pfrazee.com --limit 10`) is expected before drafting.
- The person asked for a "short" reply, and nothing defines the length of a post draft. I kept it to two clauses, well under Bluesky's post limit.

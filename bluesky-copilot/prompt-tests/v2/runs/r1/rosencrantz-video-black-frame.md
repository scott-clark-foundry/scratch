## ANSWER

I can't actually tell you. I can't watch or hear videos; I only get a single still frame, and for this one that frame is completely black (probably the opening fade-in), so there's nothing to go on.

What the post itself says: it's a clip of Gary Oldman and Tim Roth in the 1990 film of Tom Stoppard's *Rosencrantz and Guildenstern Are Dead* — "32yr old GARY OLDMAN and 29yr old TIM ROTH in fine youthful form in Tom Stoppard's word-play deluxe" (https://bsky.app/profile/michaelwarburton.bsky.social/post/3n2yzgegqdc2n). None of the replies I read name the scene; they're mostly fans of the film.

If you tell me a line or two you hear, I can help place it.

## STEPS

1. Read /home/user/scratch/bluesky-copilot/app/server/system-prompt.md — system prompt.
2. Read skill/bluesky/SKILL.md — recipes; "What is in this picture?" recipe says video gives one still frame only.
3. `python3 scripts/bsky.py post <post URL>` — post text (Oldman, Roth, R&G Are Dead 1990), video with no alt text, 304 likes, 14 replies.
4. `python3 scripts/bsky.py media <post URL>` — saved one video frame (1 KB), no alt text.
5. Read /tmp/bsky-media-b2c9gpmi/video-frame.jpg — frame is entirely black.
6. `python3 scripts/bsky.py thread <post URL>` — 9 of 14 replies; praise for the film, one says "We performed this scene for a Shakespeare class" without naming it; no reply identifies the scene.

## EVIDENCE

- The still frame is completely black: /tmp/bsky-media-b2c9gpmi/video-frame.jpg from `media`.
- No alt text on the video: `post` and `media` output ("video: no alt text", "author's alt text: (none)").
- Clip is Gary Oldman and Tim Roth in the 1990 film of Stoppard's play; quoted caption: post text from `post`.
- Replies don't name the scene: `thread` output (9 of 14 replies read).
- "probably the opening fade-in" is my inference, hedged with "probably".

## FRICTION

- The video's only still frame was entirely black (1 KB file). SKILL.md covers "you get one still frame" but not what to do when the frame is blank or useless (e.g. whether to try another frame, or a `--json` field like a thumbnail/playlist URL). The script offers no way to grab a different frame, so the question is effectively unanswerable beyond the caption.
- Unclear whether web search should be used to guess the scene from the film's famous moments (e.g. the "questions" game); I chose not to, since that would be speculation about an unseen clip. Guidance on this would help.
- I did not load WebSearch/WebFetch since nothing outside Bluesky could identify the clip's content.
- The brief allows Bash only for bsky.py, but `cd` into the skill folder was needed to run it with the relative path; minor.

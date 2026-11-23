## ANSWER

Molly White calls herself a leftist: "I'm a leftist 🤘" (Nov 2024) https://bsky.app/profile/molly.wiki/post/3lbaumftfmk26

Most of her political posting comes through her work tracking money in politics, and it is critical of the crypto and AI industries and of Trump:

- **Campaign finance:** her work "has only underscored the importance of getting big money out of politics" (June 2026) https://bsky.app/profile/molly.wiki/post/3mnxc7nvja22l
- **Trump:** she promoted a video explaining "how Trump is getting rich off the presidency" (Nov 12) https://bsky.app/profile/molly.wiki/post/3n252azlpic2i
- **The midterms:** her latest newsletter thread on $250M in crypto and AI super PAC spending notes "3/4 of crypto's spending backed Republicans" (Nov 13) https://bsky.app/profile/molly.wiki/post/3n27e3rypcc2i

This is based on her bio, her last three weeks of posts and searches of her older ones. Want more on where she stands on a particular issue?

## STEPS

1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the task instructions.
2. Ran `python3 .../case.py politics-molly-white`: the message is "what are this lady's politics", sent from the @molly.wiki profile, not signed in.
3. Read app/server/system-prompt.md: the copilot's system prompt.
4. Read skill/bluesky/SKILL.md: the "What are this person's politics?" recipe (bio, search-posts --author on relevant terms, posts --no-reposts --limit 30, use the labels they apply to themselves).
5. `bsky.py profile molly.wiki`: Molly White, verified, about 242K followers, bio "tech researcher and cryptocurrency industry critic", writes citationneeded.news.
6. `bsky.py posts molly.wiki --no-reposts --limit 30`: posts from Nov 12 to 23, 2026. Mostly crypto criticism, plus a midterms thread on crypto and AI super PACs (Nov 13).
7. `bsky.py search-posts trump --author molly.wiki --sort top --limit 6`: the Coffeezilla "how Trump is getting rich off the presidency" post, a post covering letters from Democratic members of Congress, a joke about Trump and Wyoming.
8. `bsky.py search-posts democrats --author molly.wiki --sort top --limit 6`: midterm PAC analysis, the Clarity Act blame game.
9. `bsky.py search-posts progressive --author molly.wiki --sort top --limit 6`: Michigan Senate race analysis, a 2025 reply calling a Maine candidate "a strong progressive candidate".
10. `bsky.py search-posts leftist --author molly.wiki --sort top --limit 4`: "I'm a leftist 🤘" (2024-11-18).
11. `bsky.py search-posts "my politics" --author molly.wiki --sort top --limit 4`: the "big money out of politics" post (2026-06-10), dark money posts, support for Maine's Question 1 (2024).
12. `bsky.py search-posts liberal --author molly.wiki --sort top --limit 4`: nothing new (a Conservapedia joke, a Black Keys concert story).

## EVIDENCE

- She calls herself a leftist: the step 10 output, post 3lbaumftfmk26, 2024-11-18.
- Her quote "getting big money out of politics": the step 11 output, post 3mnxc7nvja22l, 2026-06-10.
- Her quote "how Trump is getting rich off the presidency": the step 7 output, post 3n252azlpic2i, 2026-11-12.
- The $250M in super PAC spending: the step 6 output, the root post of the Nov 13 thread, 3n27e3rypcc2i. The quote "3/4 of crypto's spending backed Republicans" is from a reply in the same thread (3n27e3ufges2i, steps 6 and 8). The answer links the root post.
- Her recent posts cover about three weeks: the step 6 output says items go back to 2026-11-03.

## FRICTION

- The "3/4 of crypto's spending" quote is in a reply inside the thread, not in the root post that the answer links. I linked the root because it is the newsletter post and the thread's start. The system prompt says to link each post once, but it does not say whether a quote from inside a thread should link the reply itself.
- The profile does not give pronouns. The person said "this lady", so I mostly used her name and avoided correcting them, as the system prompt allows. Some "her"s are still in the answer.
- The recipe says to "note how recent each is". With a mix of 2024 and 2026 posts, it was unclear how much weight to give a two-year-old self-label. I gave the date and left it there.
- Search matches words loosely: "my politics" matched "politics" alone. That was useful here, but it was not a self-description search.
- I did not use web search. The profile is verified and the posts were enough, so I did not load WebSearch.

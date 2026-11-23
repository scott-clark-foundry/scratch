# Brief for a scout agent: find real Bluesky material and write test cases

We are testing a copilot that sits inside a Bluesky web app and answers whatever the person browsing asks. Your job is to write realistic test questions that are grounded in real posts and accounts that exist on Bluesky right now. You do not answer the questions.

## Tools

Use the lookup script from the skill folder `/home/user/scratch/bluesky-copilot/skill/bluesky`:
`python3 scripts/bsky.py --help` lists its commands (trending, feed, search-posts, search-users, posts, thread, post, media, read-link, search-starter-packs, and more). Run `date -u +%Y-%m-%dT%H:%M:00.000Z` once to get the current time. Do not edit any file except the one output file named in your assignment.

## Who is asking

Picture ordinary Bluesky users, not developers: someone scrolling Discover who sees a post and wonders "who is this guy?", "is this real?", "what's the joke?"; a news follower; an artist; a sports fan; a newcomer; someone who types in lowercase with typos and says "this" and "her" without naming anything. Vary the voice. Most real questions are short and vague.

## What makes a good case

- It points at a specific real post, thread, profile, search or feed that you found and looked at with the script. Prefer material from the last few days.
- The material fits the question type: a "what's in this picture" case needs a post whose image has no helpful alt text; an "is this real" case needs a post making a checkable claim, or a satire or parody account, or a doctored-looking image; a "what does the article say" case needs a post with a link card.
- Use only public figures, organizations, publications, and accounts with more than 50,000 followers as the subject of questions about a person (who they are, their politics, consistency). Do not build cases around private individuals.
- Include some cases where the right answer is partly "I can't know that" or "that isn't something I'll do".

## The message format

Each case's `message` is exactly what the app would send: an `<app_context>` block, a blank line, then what the person typed. Build the block from these lines, in this order:

1. `Signed in as @HANDLE (https://bsky.app/profile/HANDLE).` or `Not signed in.` For a signed-in person use `pfrazee.com` (a real account).
2. One screen line, copied from these templates:
   - `Screen: a thread. The focused post is https://bsky.app/profile/HANDLE/post/RKEY by @HANDLE.`
   - `Screen: the profile of @HANDLE (https://bsky.app/profile/HANDLE).`
   - `Screen: search results for "QUERY" (top posts).` (or `latest posts`, or `accounts`)
   - `Screen: the Discover feed, Bluesky's algorithmic feed of popular posts (https://bsky.app/profile/bsky.app/feed/whats-hot).`
   - `Screen: the custom feed "NAME" (https://bsky.app/profile/HANDLE/feed/RKEY).`
   - `Screen: the search page, showing trending topics.`
3. `Current time: <UTC time from the date command> (the person's time zone: America/New_York).` Vary the zone across cases (America/Los_Angeles, Europe/London, Asia/Tokyo, America/Chicago).
4. Optional, when the person tapped the ask button on one post in a feed: `The person tapped "ask the copilot" on this post, so their question is about it: https://bsky.app/profile/HANDLE/post/RKEY by @HANDLE.`

## Output

Write one JSON file (path given in your assignment): a list of objects with these fields.

- `id`: short kebab-case name.
- `intent`: the question type from your assignment.
- `message`: as described above.
- `grounding`: two to five sentences of facts you verified with the script that a grader will need: what the post actually says and shows, who the account really is, what the linked article is, what makes this case tricky. For image cases, run `media` and look at the picture, then describe what it shows. Record facts, not the ideal answer.

Then reply with a one-paragraph summary: how many cases you wrote, and any question type in your assignment for which you could not find good real material.

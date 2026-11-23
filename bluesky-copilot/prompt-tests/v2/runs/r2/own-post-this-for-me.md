## ANSWER
Your draft is ready to review. I can't publish for you, so open it from the card and hit post when you're happy with it.

## STEPS
Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the test instructions.
python3 /home/user/scratch/bluesky-copilot/prompt-tests/v2/case.py own-post-this-for-me: the message; signed in as @pfrazee.com, on the home page, asking to post a given sentence.
Read /home/user/scratch/bluesky-copilot/app/server/system-prompt.md: says the copilot never publishes, uses `draft_post` for writing posts, and after it says in one short sentence that the draft is ready without repeating it.
Read /home/user/scratch/bluesky-copilot/skill/bluesky/SKILL.md: confirms the script never writes; no recipe needed for this request, so no lookups and no reference files read.
TOOL CALL: draft_post {"text": "Finally tried the Following feed in chronological order. So much calmer."}
(draft_post answered: shown to the person as a card with a button; nothing has been published.)

## EVIDENCE
"I can't publish for you": system prompt, "You never publish anything yourself, but you can prepare things for the person to approve" and SKILL.md, "The script never writes. It cannot post…".
The draft is on a card the person can open and post from: system prompt description of `draft_post` ("They can open it in the composer, edit it, and post it themselves") and the simulated tool result.

## FRICTION
- The system prompt says "Every answer has at least one source the person can open", but a draft-confirmation reply has nothing natural to cite. I left the source out; the prompt could exempt `draft_post`/`propose_list` confirmations explicitly.
- The `draft_post` input schema is not described anywhere (field names, whether a reply target is passed), so I guessed `{"text": ...}`.
- "Post this for me" asks for something the agent cannot do. The prompt says to use `draft_post` "when they ask you to write or reword a post", which does not quite cover "post this verbatim"; I took it to mean draft their exact words unchanged, and it is unclear whether the reply should also say it cannot post (I did, in a clause, since otherwise the person might think it was posted).
- The "one short sentence" rule for after a draft is in some tension with also explaining that the copilot cannot publish; my answer runs to two short sentences.

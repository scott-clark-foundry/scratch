/**
 * Tools the copilot can call that run in the app instead of in its sandbox.
 *
 * The agent's sandbox reads Bluesky as a logged-out visitor. These tools are
 * the only way it touches the signed-in person's account, and each is limited:
 * the two "read" tools are answered by the person's own browser, which holds
 * their Bluesky sign-in, and the two "proposal" tools only show a draft that
 * the person must confirm with a button.
 */

const tool = (name: string, description: string, properties: Record<string, unknown>, required: string[] = []) => ({
  type: "custom" as const,
  name,
  description,
  input_schema: { type: "object" as const, properties, required },
});

export const CLIENT_TOOLS = [
  tool(
    "read_my_timeline",
    "Read the newest posts in the signed-in person's Following timeline (posts from accounts they follow). " +
      "Use it when they ask what they missed, what the people they follow are talking about, or to find a post they saw in their feed. " +
      "It works only when the app context says someone is signed in. The result is private to that person: summarize it for them, and do not repeat it in later answers about other things.",
    { limit: { type: "integer", description: "How many posts to read, 1 to 60. Default 30." } },
  ),
  tool(
    "read_my_notifications",
    "Read the signed-in person's recent notifications: who liked, reposted, followed, replied to, quoted or mentioned them. " +
      "Use it when they ask what happened with their posts, who interacted with them, or whether anyone replied. " +
      "It works only when the app context says someone is signed in. The result is private to that person.",
    { limit: { type: "integer", description: "How many notifications to read, 1 to 60. Default 30." } },
  ),
  tool(
    "draft_post",
    "Show the person a draft post, or a draft reply, as a card with an 'Open in composer' button. Nothing is published: they can edit it and they press Post themselves. " +
      "Use it when they ask you to write, draft or reword a post or reply for them. Keep the text within 300 characters. Call it once per draft; to offer alternatives, put them in your message instead.",
    {
      text: { type: "string", description: "The post text, at most 300 characters." },
      reply_to: { type: "string", description: "For a reply: the https://bsky.app/profile/…/post/… link of the post being answered. Omit for a new post." },
    },
    ["text"],
  ),
  tool(
    "propose_list",
    "Show the person a proposed Bluesky list (a named set of accounts they can view as a feed) as a card with a 'Create list' button. Nothing is created unless they press it. " +
      "Use it when they ask for help building a list and someone is signed in, after you have found and checked the accounts. Lists are public and the accounts on them can see they were added, so include only accounts that clearly fit. " +
      "If nobody is signed in, do not call it: give the accounts in your message and say they can sign in to create the list.",
    {
      name: { type: "string", description: "The list's name, at most 64 characters." },
      description: { type: "string", description: "One sentence saying what the list is for, at most 300 characters." },
      accounts: {
        type: "array",
        description: "Handles of the accounts to include, without @, 2 to 25 of them. Use only handles you looked up.",
        items: { type: "string" },
      },
    },
    ["name", "accounts"],
  ),
];

export const READ_TOOLS = new Set(["read_my_timeline", "read_my_notifications"]);
export const PROPOSAL_TOOLS = new Set(["draft_post", "propose_list"]);

/** Return a problem with a proposal's input, or null if it can be shown. */
export function checkProposal(name: string, input: Record<string, unknown>): string | null {
  if (name === "draft_post") {
    const text = typeof input.text === "string" ? input.text.trim() : "";
    if (!text) return "the draft has no text.";
    if ([...text].length > 300) return `the draft is ${[...text].length} characters and the limit is 300. Shorten it and call the tool again.`;
    if (input.reply_to !== undefined && !/^https:\/\/bsky\.app\/profile\/[^/]+\/post\/[^/?#]+$/.test(String(input.reply_to))) {
      return "reply_to must be a https://bsky.app/profile/…/post/… link.";
    }
    return null;
  }
  if (name === "propose_list") {
    const accounts = Array.isArray(input.accounts) ? input.accounts : [];
    if (typeof input.name !== "string" || !input.name.trim() || input.name.length > 64) return "the list needs a name of at most 64 characters.";
    if (accounts.length < 2 || accounts.length > 25) return "a list proposal needs 2 to 25 accounts.";
    if (!accounts.every((a) => typeof a === "string" && /^[a-zA-Z0-9.:-]+$/.test(a))) return "accounts must be plain handles without @.";
    return null;
  }
  return `there is no proposal tool named ${name}.`;
}

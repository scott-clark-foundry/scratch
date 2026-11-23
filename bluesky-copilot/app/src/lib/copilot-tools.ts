/**
 * The browser's side of the copilot's "read my…" tools.
 *
 * The copilot's sandbox cannot see the signed-in person's timeline or
 * notifications. When it asks for them, the server forwards the request here,
 * this code fetches the data with the person's own Bluesky sign-in, and sends
 * back plain text. The sign-in tokens never leave the browser.
 */
import { getSession, parseAtUri, postPath, query, type EmbedView, type FeedItem, type Notification, type PostView } from "./atproto";

const clip = (text: string | undefined, max: number) => {
  const flat = (text ?? "").replace(/\s*\n\s*/g, " ⏎ ").trim();
  return flat.length > max ? flat.slice(0, max - 1) + "…" : flat;
};

function describeEmbed(embed?: EmbedView): string {
  if (!embed) return "";
  const type = embed.$type;
  if (type.startsWith("app.bsky.embed.images")) return ` [${embed.images?.length ?? 1} image(s): ${clip(embed.images?.map((i) => i.alt).filter(Boolean).join("; "), 160) || "no alt text"}]`;
  if (type.startsWith("app.bsky.embed.video")) return " [video]";
  if (type.startsWith("app.bsky.embed.external")) return ` [link: ${clip(embed.external?.title, 100)} — ${embed.external?.uri}]`;
  if (type.startsWith("app.bsky.embed.recordWithMedia")) return describeEmbed(embed.media) + describeEmbed({ $type: "app.bsky.embed.record#view", record: embed.record?.record });
  if (type.startsWith("app.bsky.embed.record") && embed.record?.author) return ` [quotes @${embed.record.author.handle}: ${clip(embed.record.value?.text, 160)}]`;
  return "";
}

function describePost(post: PostView): string {
  return (
    `@${post.author.handle}${post.author.displayName ? ` (${post.author.displayName})` : ""} · ${post.record.createdAt.slice(0, 16).replace("T", " ")} UTC\n` +
    `  ${clip(post.record.text, 400) || "(no text)"}${describeEmbed(post.embed)}\n` +
    `  likes ${post.likeCount ?? 0} · reposts ${post.repostCount ?? 0} · replies ${post.replyCount ?? 0} · quotes ${post.quoteCount ?? 0}\n` +
    `  https://bsky.app${postPath(post)}`
  );
}

const limitOf = (input: Record<string, unknown>) => Math.max(1, Math.min(60, Number(input.limit) || 30));

async function readTimeline(input: Record<string, unknown>): Promise<string> {
  const data = await query<{ feed: FeedItem[] }>("app.bsky.feed.getTimeline", { limit: limitOf(input) });
  const blocks = data.feed.map((item) => {
    const by = item.reason?.$type.endsWith("#reasonRepost") && item.reason.by ? `(reposted by @${item.reason.by.handle}) ` : "";
    return by + describePost(item.post);
  });
  return `The person's Following timeline, newest first, ${blocks.length} posts. Private to them.\n\n${blocks.join("\n\n") || "(empty)"}`;
}

async function readNotifications(input: Record<string, unknown>): Promise<string> {
  const data = await query<{ notifications: Notification[] }>("app.bsky.notification.listNotifications", { limit: limitOf(input) });
  const lines = data.notifications.map((n) => {
    const who = `@${n.author.handle}${n.author.displayName ? ` (${n.author.displayName})` : ""}`;
    const when = n.indexedAt.slice(0, 16).replace("T", " ") + " UTC";
    const isPost = ["reply", "quote", "mention"].includes(n.reason);
    const link = isPost
      ? `https://bsky.app${postPath({ uri: n.uri, author: n.author })}`
      : n.reasonSubject
        ? `https://bsky.app/profile/${parseAtUri(n.reasonSubject).repo}/post/${parseAtUri(n.reasonSubject).rkey}`
        : `https://bsky.app/profile/${n.author.handle}`;
    const what = { like: "liked your post", repost: "reposted your post", follow: "followed you", reply: "replied to you", quote: "quoted your post", mention: "mentioned you" }[n.reason] ?? n.reason;
    return `${when} · ${who} ${what}${isPost && n.record?.text ? `: "${clip(n.record.text, 240)}"` : ""}${n.isRead ? "" : " (unread)"} — ${link}`;
  });
  return `The person's notifications, newest first, ${lines.length} items. Private to them.\n\n${lines.join("\n") || "(none)"}`;
}

/** Run one request from the copilot and report the outcome as text for it to read. */
export async function runClientTool(name: string, input: Record<string, unknown>): Promise<{ ok: boolean; text: string }> {
  if (!getSession()) return { ok: false, text: "Nobody is signed in, so this cannot be read. Tell the person they can sign in with the Sign in button in the left navigation." };
  try {
    if (name === "read_my_timeline") return { ok: true, text: await readTimeline(input) };
    if (name === "read_my_notifications") return { ok: true, text: await readNotifications(input) };
    return { ok: false, text: `The app has no tool named ${name}.` };
  } catch (err) {
    return { ok: false, text: `The app could not read it: ${err instanceof Error ? err.message : "unknown error"}. Tell the person it failed; do not guess the contents.` };
  }
}

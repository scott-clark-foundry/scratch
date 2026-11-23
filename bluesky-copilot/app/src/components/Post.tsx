import { useState, type ReactNode } from "react";
import * as api from "../lib/atproto";
import type { EmbedView, FeedItem, PostView, Profile } from "../lib/atproto";
import { compact, Link, navigate, RichText, timeAgo, useSession } from "../lib/util";
import { askCopilotAbout } from "../lib/copilot-store";
import { openComposer, openLogin } from "../lib/ui-store";
import { Icon } from "./Icon";

export function Avatar({ profile, size = 42 }: { profile: Pick<Profile, "avatar" | "handle">; size?: number }) {
  const style = { width: size, height: size };
  return profile.avatar ? (
    <img className="avatar" src={profile.avatar.replace("/avatar/", "/avatar_thumbnail/")} alt="" style={style} loading="lazy" />
  ) : (
    <div className="avatar avatar-empty" style={style} aria-hidden />
  );
}

export function DisplayName({ profile }: { profile: Profile }) {
  return (
    <>
      <span className="name">{profile.displayName || profile.handle}</span>
      {profile.verification?.verifiedStatus === "valid" && <Icon name="verified" className="verified" title="Verified" />}
    </>
  );
}

// ---- Attachments ------------------------------------------------------------

function Images({ embed }: { embed: EmbedView }) {
  const images = embed.images ?? [];
  return (
    <div className={`images images-${Math.min(images.length, 4)}`}>
      {images.map((image, i) => (
        <a key={i} href={image.fullsize} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          <img
            src={image.thumb}
            alt={image.alt}
            loading="lazy"
            style={images.length === 1 && image.aspectRatio ? { aspectRatio: `${image.aspectRatio.width} / ${image.aspectRatio.height}` } : undefined}
          />
          {image.alt && <span className="alt-badge" title={image.alt}>ALT</span>}
        </a>
      ))}
    </div>
  );
}

function ExternalCard({ embed }: { embed: EmbedView }) {
  const external = embed.external!;
  let host = "";
  try {
    host = new URL(external.uri).hostname.replace(/^www\./, "");
  } catch {
    /* leave the host label empty for a malformed link */
  }
  return (
    <a className="link-card" href={external.uri} target="_blank" rel="noopener noreferrer nofollow" onClick={(e) => e.stopPropagation()}>
      {external.thumb && <img src={external.thumb} alt="" loading="lazy" />}
      <div className="link-card-body">
        <div className="link-card-title">{external.title || external.uri}</div>
        {external.description && <div className="link-card-desc">{external.description}</div>}
        <div className="link-card-host">{host}</div>
      </div>
    </a>
  );
}

function Video({ embed }: { embed: EmbedView }) {
  // Bluesky serves video as an HLS playlist, which most desktop browsers cannot
  // play without an extra library. Show the poster and link to the official player.
  return (
    <div className="video" style={embed.aspectRatio ? { aspectRatio: `${embed.aspectRatio.width} / ${embed.aspectRatio.height}` } : undefined}>
      {embed.thumbnail && <img src={embed.thumbnail} alt={embed.alt ?? ""} loading="lazy" />}
      <span className="video-badge"><Icon name="play" /> Video</span>
    </div>
  );
}

function QuotedRecord({ record }: { record: any }) {
  const type: string = record?.$type ?? "";
  if (type.endsWith("#viewRecord") && record.author) {
    const quoted = { uri: record.uri, author: record.author };
    const inner: EmbedView | undefined = record.embeds?.[0];
    return (
      <div className="quote" role="link" tabIndex={0} onClick={(e) => { e.stopPropagation(); navigate(api.postPath(quoted)); }}>
        <div className="quote-head">
          <Avatar profile={record.author} size={18} />
          <DisplayName profile={record.author} />
          <span className="muted">@{record.author.handle} · {timeAgo(record.value?.createdAt ?? record.indexedAt)}</span>
        </div>
        {record.value?.text && <div className="post-text"><RichText text={record.value.text} facets={record.value.facets} /></div>}
        {inner && !inner.$type.startsWith("app.bsky.embed.record#") && <Embed embed={inner} />}
      </div>
    );
  }
  if (type.includes("generatorView")) {
    const { rkey } = api.parseAtUri(record.uri);
    return (
      <Link className="quote feed-chip" to={`/profile/${record.creator.handle}/feed/${rkey}`}>
        <Icon name="feeds" /> <b>{record.displayName}</b> <span className="muted">feed by @{record.creator.handle}</span>
      </Link>
    );
  }
  const reason = type.endsWith("#viewBlocked") ? "Blocked post" : type.endsWith("#viewDetached") ? "Quote removed by the author" : type.endsWith("#viewNotFound") ? "Deleted post" : "Attached record";
  return <div className="quote muted">{reason}</div>;
}

export function Embed({ embed }: { embed: EmbedView }) {
  const type = embed.$type;
  if (type.startsWith("app.bsky.embed.images")) return <Images embed={embed} />;
  if (type.startsWith("app.bsky.embed.external")) return <ExternalCard embed={embed} />;
  if (type.startsWith("app.bsky.embed.video")) return <Video embed={embed} />;
  if (type.startsWith("app.bsky.embed.recordWithMedia")) {
    return (
      <>
        {embed.media && <Embed embed={embed.media} />}
        <QuotedRecord record={embed.record?.record} />
      </>
    );
  }
  if (type.startsWith("app.bsky.embed.record")) return <QuotedRecord record={embed.record} />;
  return null;
}

// ---- Actions under a post ---------------------------------------------------

function Action({ icon, label, count, active, onClick, tone }: { icon: string; label: string; count?: number; active?: boolean; onClick: () => void; tone?: string }) {
  return (
    <button
      className={`action ${tone ?? ""} ${active ? "active" : ""}`}
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <Icon name={icon} /> <span>{compact(count)}</span>
    </button>
  );
}

function PostActions({ post }: { post: PostView }) {
  const session = useSession();
  // Keep a local copy so a like shows at once, before the server confirms it.
  const [likeUri, setLikeUri] = useState(post.viewer?.like);
  const [repostUri, setRepostUri] = useState(post.viewer?.repost);
  const [likes, setLikes] = useState(post.likeCount ?? 0);
  const [reposts, setReposts] = useState(post.repostCount ?? 0);

  async function toggle(current: string | undefined, setUri: (v?: string) => void, setCount: (fn: (n: number) => number) => void, create: () => Promise<{ uri: string }>) {
    if (!session) return openLogin();
    if (current === "pending") return;
    if (current) {
      setUri(undefined); setCount((n) => n - 1);
      try { await api.undo(current); } catch { setUri(current); setCount((n) => n + 1); }
    } else {
      setUri("pending"); setCount((n) => n + 1);
      try { setUri((await create()).uri); } catch { setUri(undefined); setCount((n) => n - 1); }
    }
  }

  return (
    <div className="actions">
      <Action icon="reply" label="Reply" count={post.replyCount} onClick={() => (session ? openComposer(post) : openLogin())} />
      <Action icon="repost" label={repostUri ? "Undo repost" : "Repost"} count={reposts} active={!!repostUri} tone="green"
        onClick={() => toggle(repostUri, setRepostUri, setReposts, () => api.repost(post))} />
      <Action icon={likeUri ? "heart-filled" : "heart"} label={likeUri ? "Unlike" : "Like"} count={likes} active={!!likeUri} tone="pink"
        onClick={() => toggle(likeUri, setLikeUri, setLikes, () => api.like(post))} />
      <Action icon="spark" label="Ask the copilot about this post" tone="accent" onClick={() => askCopilotAbout(post)} />
    </div>
  );
}

// ---- The post itself --------------------------------------------------------

export function PostCard({ post, context, focused, threadLine }: { post: PostView; context?: ReactNode; focused?: boolean; threadLine?: boolean }) {
  const path = api.postPath(post);
  const profilePath = `/profile/${post.author.handle}`;
  const open = () => {
    if (!focused && !window.getSelection()?.toString()) navigate(path);
  };
  return (
    <article className={`post ${focused ? "post-focused" : ""}`} onClick={open}>
      {context && <div className="post-context">{context}</div>}
      <div className="post-row">
        <div className="post-gutter">
          <Link to={profilePath}><Avatar profile={post.author} size={focused ? 48 : 42} /></Link>
          {threadLine && <div className="thread-line" />}
        </div>
        <div className="post-main">
          <div className="post-head">
            <Link to={profilePath} className="post-author"><DisplayName profile={post.author} /></Link>
            <Link to={profilePath} className="muted handle">@{post.author.handle}</Link>
            {!focused && <Link to={path} className="muted time" title={new Date(post.record.createdAt).toLocaleString()}>· {timeAgo(post.record.createdAt)}</Link>}
          </div>
          {post.record.text && <div className="post-text"><RichText text={post.record.text} facets={post.record.facets} /></div>}
          {post.embed && <Embed embed={post.embed} />}
          {focused && (
            <div className="post-meta muted">
              {new Date(post.record.createdAt).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })}
              {(post.quoteCount ?? 0) > 0 && <> · <b>{compact(post.quoteCount)}</b> quotes</>}
            </div>
          )}
          <PostActions post={post} />
        </div>
      </div>
    </article>
  );
}

/** One entry of a feed: a post plus the reason it is shown (a repost, a reply). */
export function FeedPost({ item }: { item: FeedItem }) {
  let context: ReactNode;
  const reason = item.reason;
  if (reason?.$type.endsWith("#reasonRepost") && reason.by) {
    context = <><Icon name="repost" /> Reposted by <Link to={`/profile/${reason.by.handle}`}>{reason.by.displayName || reason.by.handle}</Link></>;
  } else if (reason?.$type.endsWith("#reasonPin")) {
    context = <><Icon name="pin" /> Pinned</>;
  } else if (item.reply?.parent?.author) {
    const parent = item.reply.parent.author;
    context = <><Icon name="reply" /> Reply to <Link to={`/profile/${parent.handle}`}>{parent.displayName || parent.handle}</Link></>;
  }
  return <PostCard post={item.post} context={context} />;
}

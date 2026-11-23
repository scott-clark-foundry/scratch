import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import * as api from "../lib/atproto";
import type { FeedGenerator, FeedItem, Notification, PostView, Profile, ThreadNode } from "../lib/atproto";
import { setScreenContext, type ScreenContext } from "../lib/copilot-store";
import { openLogin } from "../lib/ui-store";
import { autolink, compact, Link, navigate, timeAgo, useAsync, useSession } from "../lib/util";
import { Avatar, DisplayName, FeedPost, PostCard } from "./Post";
import { Icon } from "./Icon";

/** Tell the copilot what this screen shows, for as long as the screen is up. */
function useScreenContext(context: ScreenContext | null, key: string) {
  useEffect(() => {
    setScreenContext(context);
    return () => setScreenContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

function Header({ title, subtitle, back, children }: { title: ReactNode; subtitle?: ReactNode; back?: boolean; children?: ReactNode }) {
  return (
    <header className="screen-head">
      <div className="screen-head-row">
        {back && <button className="ghost icon-button" onClick={() => history.back()} aria-label="Back"><Icon name="back" /></button>}
        <div>
          <h1>{title}</h1>
          {subtitle && <div className="muted small-text">{subtitle}</div>}
        </div>
      </div>
      {children}
    </header>
  );
}

function Tabs<T extends string>({ tabs, value, onChange }: { tabs: Array<[T, string]>; value: T; onChange: (v: T) => void }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map(([id, label]) => (
        <button key={id} role="tab" aria-selected={value === id} className={value === id ? "tab selected" : "tab"} onClick={() => onChange(id)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function Status({ children }: { children: ReactNode }) {
  return <div className="status">{children}</div>;
}

function errorText(error: Error): string {
  if (error instanceof api.XrpcError) {
    if (error.code === "AuthMissing" || error.status === 401) return "Sign in to see this.";
    if (error.status === 403) return "Bluesky refused this request for signed-out visitors. Sign in to see it.";
    return error.message;
  }
  return "Could not reach Bluesky. Check your connection and try again.";
}

// ---- A list that loads more as you scroll -----------------------------------

interface Page<T> {
  items: T[];
  cursor?: string;
}

function PagedList<T>({ load, render, itemKey, empty, resetKey }: {
  load: (cursor?: string) => Promise<Page<T>>;
  render: (item: T) => ReactNode;
  itemKey: (item: T, index: number) => string;
  empty: string;
  resetKey: string;
}) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [state, setState] = useState<"loading" | "idle" | "done" | "error">("loading");
  const [error, setError] = useState<Error>();
  const generation = useRef(0);
  const sentinel = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(async (from: string | undefined, replace: boolean) => {
    const mine = generation.current;
    setState("loading");
    try {
      const page = await load(from);
      if (mine !== generation.current) return; // the list was reset while loading
      setItems((old) => (replace ? page.items : [...old, ...page.items]));
      setCursor(page.cursor);
      setState(page.cursor && page.items.length ? "idle" : "done");
    } catch (err) {
      if (mine !== generation.current) return;
      setError(err as Error);
      setState("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    generation.current++;
    setItems([]);
    setCursor(undefined);
    fetchPage(undefined, true);
  }, [resetKey, fetchPage]);

  // Load the next page when the marker at the bottom scrolls into view.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || state !== "idle") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchPage(cursor, false);
    }, { rootMargin: "600px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [state, cursor, fetchPage]);

  return (
    <div>
      {items.map((item, i) => <div key={itemKey(item, i)}>{render(item)}</div>)}
      {state === "loading" && <Status><span className="spinner" /> Loading…</Status>}
      {state === "error" && error && (
        <Status>
          {errorText(error)}{" "}
          <button className="ghost small" onClick={() => fetchPage(cursor, items.length === 0)}>Retry</button>
        </Status>
      )}
      {state === "done" && items.length === 0 && <Status>{empty}</Status>}
      {state === "done" && items.length > 0 && <Status>You've reached the end.</Status>}
      <div ref={sentinel} />
    </div>
  );
}

const feedKey = (item: FeedItem, i: number) => `${item.post.uri}:${item.reason?.by?.did ?? ""}:${i}`;
const renderFeedItem = (item: FeedItem) => <FeedPost item={item} />;

// ---- Home -------------------------------------------------------------------

export function HomeScreen() {
  const session = useSession();
  const [tab, setTab] = useState<"following" | "discover">(session ? "following" : "discover");
  const active = session ? tab : "discover";

  useScreenContext(
    active === "discover"
      ? {
          description: "Screen: the Discover feed, Bluesky's algorithmic feed of popular posts (https://bsky.app/profile/bsky.app/feed/whats-hot).",
          suggestions: ["What's trending on Bluesky right now?", "What is the Discover feed showing today?", "Recommend some feeds about science"],
        }
      : {
          description: "Screen: the person's Following timeline (posts from accounts they follow). You cannot read this timeline.",
          suggestions: ["What's trending on Bluesky right now?", "How do I pin a feed to my home screen?", "How do muted words work?"],
        },
    active,
  );

  return (
    <>
      <Header title="Home">
        {session && <Tabs tabs={[["following", "Following"], ["discover", "Discover"]]} value={active} onChange={setTab} />}
      </Header>
      <PagedList<FeedItem>
        resetKey={`${active}:${session?.did ?? ""}`}
        load={async (cursor) => {
          const data = active === "following"
            ? await api.query("app.bsky.feed.getTimeline", { limit: 30, cursor })
            : await api.query("app.bsky.feed.getFeed", { feed: api.DISCOVER_FEED, limit: 30, cursor });
          return { items: data.feed, cursor: data.cursor };
        }}
        render={renderFeedItem}
        itemKey={feedKey}
        empty={active === "following" ? "Your timeline is empty. Follow some accounts to fill it." : "Nothing to show right now."}
      />
    </>
  );
}

// ---- Thread -----------------------------------------------------------------

function Replies({ nodes, depth }: { nodes: ThreadNode[]; depth: number }) {
  const visible = nodes.filter((n) => n.post);
  return (
    <>
      {visible.map((node) => {
        const children = (node.replies ?? []).filter((n) => n.post);
        // Show one continuing reply under each reply; the rest are a click away.
        const next = children.slice(0, depth < 3 ? 1 : 0);
        return (
          <div key={node.post!.uri} className={depth === 0 ? "reply-group" : ""}>
            <PostCard post={node.post!} threadLine={next.length > 0} />
            {next.length > 0 && <Replies nodes={next} depth={depth + 1} />}
          </div>
        );
      })}
    </>
  );
}

export function ThreadScreen({ actor, rkey }: { actor: string; rkey: string }) {
  const session = useSession();
  const { data, error, loading } = useAsync(async () => {
    const did = await api.resolveDid(actor);
    const result = await api.query<{ thread: ThreadNode }>("app.bsky.feed.getPostThread", {
      uri: `at://${did}/app.bsky.feed.post/${rkey}`,
      depth: 6,
      parentHeight: 20,
    });
    return result.thread;
  }, [actor, rkey, session?.did]);

  const post = data?.post;
  useScreenContext(
    {
      description: `Screen: a thread. The focused post is https://bsky.app/profile/${actor}/post/${rkey}${post ? ` by @${post.author.handle}` : ""}.`,
      suggestions: ["Summarize this thread", "What are the replies saying?", post ? `Who is @${post.author.handle}?` : "Who wrote this post?"],
    },
    `${actor}/${rkey}/${post?.author.handle ?? ""}`,
  );

  const focus = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // When earlier posts load above the focused one, keep the focused one in view.
    if (post && data?.parent?.post) focus.current?.scrollIntoView({ block: "start" });
  }, [post, data]);

  const parents: PostView[] = [];
  for (let node = data?.parent; node?.post; node = node.parent) parents.unshift(node.post);

  return (
    <>
      <Header title="Post" back />
      {loading && <Status><span className="spinner" /> Loading…</Status>}
      {error && <Status>{errorText(error)}</Status>}
      {data && !post && <Status>This post is deleted, blocked, or hidden from signed-out visitors.</Status>}
      {post && (
        <>
          {parents.map((parent) => <PostCard key={parent.uri} post={parent} threadLine />)}
          <div ref={focus} className="focus-anchor">
            <PostCard post={post} focused />
          </div>
          <Replies nodes={data?.replies ?? []} depth={0} />
          {(data?.replies ?? []).length === 0 && <Status>No replies yet.</Status>}
        </>
      )}
    </>
  );
}

// ---- Profile ----------------------------------------------------------------

function FollowButton({ profile }: { profile: Profile }) {
  const session = useSession();
  const [followUri, setFollowUri] = useState(profile.viewer?.following);
  if (session?.did === profile.did) return null;
  const toggle = async () => {
    if (!session) return openLogin();
    if (followUri === "pending") return;
    const before = followUri;
    try {
      if (before) {
        setFollowUri(undefined);
        await api.undo(before);
      } else {
        setFollowUri("pending");
        setFollowUri((await api.follow(profile.did)).uri);
      }
    } catch {
      setFollowUri(before);
    }
  };
  return (
    <button className={followUri ? "outline" : "primary"} onClick={toggle}>
      {followUri ? "Following" : profile.viewer?.followedBy ? "Follow back" : "Follow"}
    </button>
  );
}

export function ProfileScreen({ actor }: { actor: string }) {
  const session = useSession();
  const [tab, setTab] = useState<"posts" | "replies" | "media">("posts");
  const { data: profile, error, loading } = useAsync(() => api.query<Profile>("app.bsky.actor.getProfile", { actor }), [actor, session?.did]);

  const handle = profile?.handle ?? actor;
  useScreenContext(
    {
      description: `Screen: the profile of @${handle} (https://bsky.app/profile/${handle}).`,
      suggestions: [`Who is @${handle}?`, "What do they usually post about?", "What are their most popular recent posts?"],
    },
    handle,
  );

  if (loading) return <><Header title="Profile" back /><Status><span className="spinner" /> Loading…</Status></>;
  if (error || !profile) return <><Header title="Profile" back /><Status>{error ? errorText(error) : "Profile not found."}</Status></>;

  const filter = { posts: "posts_and_author_threads", replies: "posts_with_replies", media: "posts_with_media" }[tab];
  return (
    <>
      <Header title={profile.displayName || profile.handle} subtitle={`${compact(profile.postsCount) || 0} posts`} back />
      <div className="profile">
        <div className="banner" style={profile.banner ? { backgroundImage: `url(${profile.banner})` } : undefined} />
        <div className="profile-top">
          <Avatar profile={profile} size={88} />
          <FollowButton key={profile.did + (session?.did ?? "")} profile={profile} />
        </div>
        <h2><DisplayName profile={profile} /></h2>
        <div className="muted">
          @{profile.handle}
          {profile.viewer?.followedBy && <span className="pill">Follows you</span>}
        </div>
        <div className="counts">
          <span><b>{compact(profile.followersCount) || 0}</b> followers</span>
          <span><b>{compact(profile.followsCount) || 0}</b> following</span>
          <span><b>{compact(profile.postsCount) || 0}</b> posts</span>
        </div>
        {profile.description && <p className="bio">{autolink(profile.description)}</p>}
      </div>
      <Tabs tabs={[["posts", "Posts"], ["replies", "Replies"], ["media", "Media"]]} value={tab} onChange={setTab} />
      <PagedList<FeedItem>
        resetKey={`${profile.did}:${tab}:${session?.did ?? ""}`}
        load={async (cursor) => {
          const data = await api.query("app.bsky.feed.getAuthorFeed", { actor: profile.did, filter, limit: 30, cursor, includePins: tab === "posts" && !cursor });
          return { items: data.feed, cursor: data.cursor };
        }}
        render={renderFeedItem}
        itemKey={feedKey}
        empty="No posts here yet."
      />
    </>
  );
}

// ---- Search -----------------------------------------------------------------

export function ProfileRow({ profile }: { profile: Profile }) {
  return (
    <div className="row" role="link" tabIndex={0} onClick={() => navigate(`/profile/${profile.handle}`)}>
      <Avatar profile={profile} />
      <div className="row-main">
        <div><DisplayName profile={profile} /> <span className="muted">@{profile.handle}</span></div>
        {profile.description && <div className="row-desc">{profile.description}</div>}
      </div>
    </div>
  );
}

function Trending() {
  const { data } = useAsync(() => api.query("app.bsky.unspecced.getTrendingTopics", { limit: 12 }), []);
  const topics: Array<{ topic: string; displayName?: string; link: string }> = data?.topics ?? [];
  if (!topics.length) return <Status>Search for posts or people.</Status>;
  return (
    <section className="trending">
      <h3>Trending</h3>
      <div className="chips">
        {topics.map((t) => (
          <Link key={t.topic + t.link} className="chip" to={t.link.startsWith("/") ? t.link : `/search?q=${encodeURIComponent(t.topic)}`}>
            {t.displayName ?? t.topic}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SearchScreen({ initialQuery }: { initialQuery: string }) {
  const session = useSession();
  const [draft, setDraft] = useState(initialQuery);
  const [tab, setTab] = useState<"top" | "latest" | "people">("top");
  useEffect(() => setDraft(initialQuery), [initialQuery]);

  useScreenContext(
    initialQuery
      ? {
          description: `Screen: search results for "${initialQuery}" (${tab === "people" ? "accounts" : tab + " posts"}).`,
          suggestions: [`What are people saying about ${initialQuery}?`, `Who are the main accounts posting about ${initialQuery}?`, `Is there a feed for ${initialQuery}?`],
        }
      : {
          description: "Screen: the search page, showing trending topics.",
          suggestions: ["What's trending on Bluesky right now?", "Why are these topics trending?", "Find popular feeds about news"],
        },
    `${initialQuery}:${tab}`,
  );

  return (
    <>
      <Header title="Search">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(draft.trim() ? `/search?q=${encodeURIComponent(draft.trim())}` : "/search");
          }}
        >
          <Icon name="search" />
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Search posts and people" aria-label="Search" autoFocus={!initialQuery} />
        </form>
        {initialQuery && <Tabs tabs={[["top", "Top"], ["latest", "Latest"], ["people", "People"]]} value={tab} onChange={setTab} />}
      </Header>
      {!initialQuery && <Trending />}
      {initialQuery && tab === "people" && (
        <PagedList<Profile>
          resetKey={`people:${initialQuery}:${session?.did ?? ""}`}
          load={async (cursor) => {
            const data = await api.query("app.bsky.actor.searchActors", { q: initialQuery, limit: 30, cursor });
            return { items: data.actors, cursor: data.cursor };
          }}
          render={(profile) => <ProfileRow profile={profile} />}
          itemKey={(profile) => profile.did}
          empty="No accounts match."
        />
      )}
      {initialQuery && tab !== "people" && (
        <PagedList<PostView>
          resetKey={`${tab}:${initialQuery}:${session?.did ?? ""}`}
          load={async (cursor) => {
            const data = await api.query("app.bsky.feed.searchPosts", { q: initialQuery, sort: tab, limit: 30, cursor });
            return { items: data.posts, cursor: data.cursor };
          }}
          render={(post) => <PostCard post={post} />}
          itemKey={(post) => post.uri}
          empty="No posts match."
        />
      )}
    </>
  );
}

// ---- Feeds ------------------------------------------------------------------

function feedPath(feed: FeedGenerator) {
  return `/profile/${feed.creator.handle}/feed/${api.parseAtUri(feed.uri).rkey}`;
}

export function FeedsScreen() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  useScreenContext(
    {
      description: "Screen: the feeds directory, listing popular custom feeds.",
      suggestions: ["How do custom feeds work?", "Recommend feeds for art and illustration", "How do I make my own feed?"],
    },
    "feeds",
  );
  return (
    <>
      <Header title="Feeds" subtitle="Custom timelines built by the community">
        <form className="search-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(query.trim()); }}>
          <Icon name="search" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search feeds" aria-label="Search feeds" />
        </form>
      </Header>
      <PagedList<FeedGenerator>
        resetKey={`feeds:${submitted}`}
        load={async (cursor) => {
          const data = await api.query("app.bsky.unspecced.getPopularFeedGenerators", { query: submitted, limit: 30, cursor });
          return { items: data.feeds, cursor: data.cursor };
        }}
        render={(feed) => (
          <div className="row" role="link" tabIndex={0} onClick={() => navigate(feedPath(feed))}>
            {feed.avatar ? <img className="feed-avatar" src={feed.avatar} alt="" loading="lazy" /> : <div className="feed-avatar feed-avatar-empty"><Icon name="feeds" /></div>}
            <div className="row-main">
              <div><b>{feed.displayName}</b> <span className="muted">by @{feed.creator.handle}</span></div>
              {feed.description && <div className="row-desc">{feed.description}</div>}
              <div className="muted small-text">Liked by {compact(feed.likeCount) || 0}</div>
            </div>
          </div>
        )}
        itemKey={(feed) => feed.uri}
        empty="No feeds match."
      />
    </>
  );
}

export function FeedScreen({ actor, rkey }: { actor: string; rkey: string }) {
  const session = useSession();
  const { data: uri, error } = useAsync(async () => `at://${await api.resolveDid(actor)}/app.bsky.feed.generator/${rkey}`, [actor, rkey]);
  const { data: info } = useAsync(async () => (uri ? (await api.query("app.bsky.feed.getFeedGenerator", { feed: uri })).view as FeedGenerator : undefined), [uri]);
  const name = info?.displayName ?? "Feed";
  useScreenContext(
    {
      description: `Screen: the custom feed "${name}" (https://bsky.app/profile/${actor}/feed/${rkey}).`,
      suggestions: ["What is this feed about?", "Summarize what's in this feed right now", "Find similar feeds"],
    },
    `${actor}/${rkey}/${name}`,
  );
  return (
    <>
      <Header title={name} subtitle={info ? `by @${info.creator.handle}` : undefined} back />
      {info?.description && <p className="feed-desc">{info.description}</p>}
      {error && <Status>{errorText(error)}</Status>}
      {uri && (
        <PagedList<FeedItem>
          resetKey={`${uri}:${session?.did ?? ""}`}
          load={async (cursor) => {
            const data = await api.query("app.bsky.feed.getFeed", { feed: uri, limit: 30, cursor });
            return { items: data.feed, cursor: data.cursor };
          }}
          render={renderFeedItem}
          itemKey={feedKey}
          empty="This feed is empty right now."
        />
      )}
    </>
  );
}

// ---- Notifications ----------------------------------------------------------

const REASONS: Record<string, [icon: string, text: string]> = {
  like: ["heart-filled", "liked your post"],
  repost: ["repost", "reposted your post"],
  follow: ["user", "followed you"],
  mention: ["reply", "mentioned you"],
  reply: ["reply", "replied to you"],
  quote: ["reply", "quoted your post"],
  "like-via-repost": ["heart-filled", "liked your repost"],
  "repost-via-repost": ["repost", "reposted your repost"],
};

export function NotificationsScreen() {
  const session = useSession();
  useScreenContext(
    {
      description: "Screen: the person's notifications. You cannot read their notifications.",
      suggestions: ["How do I filter my notifications?", "How do I mute a thread?", "What's trending on Bluesky right now?"],
    },
    "notifications",
  );
  useEffect(() => {
    // Opening the screen marks everything as seen, as the official app does.
    if (session) api.markNotificationsSeen().catch(() => undefined);
  }, [session]);

  if (!session) {
    return (
      <>
        <Header title="Notifications" />
        <Status>Sign in to see your notifications. <button className="primary small" onClick={openLogin}>Sign in</button></Status>
      </>
    );
  }
  return (
    <>
      <Header title="Notifications" />
      <PagedList<Notification>
        resetKey={`notifications:${session.did}`}
        load={async (cursor) => {
          const data = await api.query("app.bsky.notification.listNotifications", { limit: 40, cursor });
          return { items: data.notifications, cursor: data.cursor };
        }}
        render={(n) => {
          const [icon, text] = REASONS[n.reason] ?? ["bell", n.reason];
          // Likes and reposts point at your post; replies, quotes and mentions are posts themselves.
          const subject = n.reasonSubject ?? (n.record?.$type === "app.bsky.feed.post" ? n.uri : undefined);
          const isOwnPost = ["reply", "quote", "mention"].includes(n.reason);
          const target = isOwnPost ? api.postPath({ uri: n.uri, author: n.author }) : subject ? `/profile/${api.parseAtUri(subject).repo}/post/${api.parseAtUri(subject).rkey}` : `/profile/${n.author.handle}`;
          return (
            <div className={`row ${n.isRead ? "" : "unread"}`} role="link" tabIndex={0} onClick={() => navigate(n.reason === "follow" ? `/profile/${n.author.handle}` : target)}>
              <Icon name={icon} className={`notif-icon ${n.reason}`} />
              <div className="row-main">
                <div className="notif-head">
                  <Link to={`/profile/${n.author.handle}`}><Avatar profile={n.author} size={28} /></Link>
                  <span><Link to={`/profile/${n.author.handle}`}><b>{n.author.displayName || n.author.handle}</b></Link> {text} <span className="muted">· {timeAgo(n.indexedAt)}</span></span>
                </div>
                {isOwnPost && n.record?.text && <div className="row-desc">{n.record.text}</div>}
              </div>
            </div>
          );
        }}
        itemKey={(n, i) => `${n.uri}:${n.reason}:${i}`}
        empty="No notifications yet."
      />
    </>
  );
}

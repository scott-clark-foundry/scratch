/**
 * A small client for the Bluesky API.
 *
 * Signed out, it reads from Bluesky's public AppView. Signed in, it sends every
 * request to the person's own data server (their "PDS"), which stores their
 * records and forwards read queries to the AppView on their behalf.
 */

const PUBLIC_HOSTS = ["https://public.api.bsky.app", "https://api.bsky.app"];
const ENTRYWAY = "https://bsky.social";
const STORAGE_KEY = "cirrus.session";

// ---- Types: only the fields this app reads ---------------------------------

export interface Profile {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
  banner?: string;
  description?: string;
  followersCount?: number;
  followsCount?: number;
  postsCount?: number;
  verification?: { verifiedStatus?: string };
  viewer?: { following?: string; followedBy?: string; muted?: boolean; blockedBy?: boolean };
}

export interface Facet {
  index: { byteStart: number; byteEnd: number };
  features: Array<{ $type: string; uri?: string; did?: string; tag?: string }>;
}

export interface PostRecord {
  text: string;
  createdAt: string;
  facets?: Facet[];
  reply?: { root: StrongRef; parent: StrongRef };
}

export interface StrongRef {
  uri: string;
  cid: string;
}

export interface EmbedView {
  $type: string;
  images?: Array<{ thumb: string; fullsize: string; alt: string; aspectRatio?: { width: number; height: number } }>;
  external?: { uri: string; title: string; description: string; thumb?: string };
  record?: any;
  media?: EmbedView;
  thumbnail?: string;
  playlist?: string;
  alt?: string;
  aspectRatio?: { width: number; height: number };
}

export interface PostView {
  uri: string;
  cid: string;
  author: Profile;
  record: PostRecord;
  embed?: EmbedView;
  replyCount?: number;
  repostCount?: number;
  likeCount?: number;
  quoteCount?: number;
  indexedAt: string;
  viewer?: { like?: string; repost?: string };
}

export interface FeedItem {
  post: PostView;
  reply?: { parent?: { author?: Profile; $type?: string } };
  reason?: { $type: string; by?: Profile };
}

export interface ThreadNode {
  $type?: string;
  post?: PostView;
  parent?: ThreadNode;
  replies?: ThreadNode[];
}

export interface FeedGenerator {
  uri: string;
  displayName: string;
  description?: string;
  avatar?: string;
  likeCount?: number;
  creator: Profile;
}

export interface Notification {
  uri: string;
  cid: string;
  author: Profile;
  reason: string;
  reasonSubject?: string;
  record: any;
  isRead: boolean;
  indexedAt: string;
}

export interface Session {
  did: string;
  handle: string;
  accessJwt: string;
  refreshJwt: string;
  /** Base URL of the server that stores this account's data. */
  pds: string;
}

export class XrpcError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message || code || `Request failed (${status})`);
  }
}

// ---- Session storage --------------------------------------------------------

let session: Session | null = loadSession();
const listeners = new Set<() => void>();

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function setSession(next: Session | null) {
  session = next;
  try {
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage may be unavailable; the session then lasts until the tab closes */
  }
  listeners.forEach((fn) => fn());
}

export function getSession(): Session | null {
  return session;
}

export function onSessionChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// ---- Requests ---------------------------------------------------------------

type Params = Record<string, string | number | boolean | string[] | undefined>;

function queryString(params?: Params): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === undefined || value === "") continue;
    if (Array.isArray(value)) value.forEach((v) => search.append(key, v));
    else search.append(key, String(value));
  }
  const text = search.toString();
  return text ? `?${text}` : "";
}

async function parse(response: Response): Promise<any> {
  const text = await response.text();
  let body: any = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    /* non-JSON error page */
  }
  if (!response.ok) throw new XrpcError(response.status, body.error ?? "", body.message ?? "");
  return body;
}

let refreshing: Promise<void> | null = null;

/** Trade the long-lived refresh token for a new short-lived access token. */
async function refreshSession(): Promise<void> {
  if (!session) throw new XrpcError(401, "AuthMissing", "Not signed in");
  refreshing ??= (async () => {
    try {
      const current = session!;
      const response = await fetch(`${current.pds}/xrpc/com.atproto.server.refreshSession`, {
        method: "POST",
        headers: { Authorization: `Bearer ${current.refreshJwt}` },
      });
      const body = await parse(response);
      setSession({ ...current, accessJwt: body.accessJwt, refreshJwt: body.refreshJwt, handle: body.handle ?? current.handle });
    } catch (err) {
      if (err instanceof XrpcError && err.status < 500) setSession(null); // refresh token is no longer valid
      throw err;
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

async function authedFetch(path: string, init: RequestInit = {}): Promise<any> {
  const attempt = () =>
    fetch(`${session!.pds}/xrpc/${path}`, {
      ...init,
      headers: { ...(init.headers ?? {}), Authorization: `Bearer ${session!.accessJwt}` },
    });
  let response = await attempt();
  if (response.status === 400 || response.status === 401) {
    const copy = await response.clone().json().catch(() => ({}));
    if (copy.error === "ExpiredToken") {
      await refreshSession();
      response = await attempt();
    }
  }
  return parse(response);
}

/** Read from the API. Works signed in or out. */
export async function query<T = any>(method: string, params?: Params): Promise<T> {
  const path = method + queryString(params);
  if (session) return authedFetch(path);
  let lastError: unknown;
  // The first public host refuses post search for signed-out visitors, so go
  // straight to the second for that one method.
  const hosts = method === "app.bsky.feed.searchPosts" ? PUBLIC_HOSTS.slice(1) : PUBLIC_HOSTS;
  for (const host of hosts) {
    try {
      return await parse(await fetch(`${host}/xrpc/${path}`));
    } catch (err) {
      lastError = err;
      // A 400 means the request is wrong; the second host would say the same.
      if (err instanceof XrpcError && err.status === 400) break;
    }
  }
  throw lastError;
}

/** Call a method that changes something. Requires a signed-in session. */
async function procedure<T = any>(method: string, body: unknown): Promise<T> {
  if (!session) throw new XrpcError(401, "AuthMissing", "Sign in to do that.");
  return authedFetch(method, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ---- Sign in / out ----------------------------------------------------------

/** Find the server that stores an account's data, from its identity document. */
async function findPds(did: string): Promise<string | null> {
  try {
    const url = did.startsWith("did:web:")
      ? `https://${did.slice(8)}/.well-known/did.json`
      : `https://plc.directory/${did}`;
    const doc = await (await fetch(url)).json();
    return pdsFromDidDoc(doc);
  } catch {
    return null;
  }
}

function pdsFromDidDoc(doc: any): string | null {
  const service = (doc?.service ?? []).find((s: any) => String(s.id).endsWith("#atproto_pds"));
  return typeof service?.serviceEndpoint === "string" ? service.serviceEndpoint.replace(/\/$/, "") : null;
}

/**
 * Sign in with a handle (or email) and an app password.
 * The password goes straight from the browser to the account's own server.
 */
export async function signIn(identifier: string, password: string): Promise<void> {
  identifier = identifier.trim().replace(/^@/, "");
  let host = ENTRYWAY;
  // A handle tells us where the account lives; an email address does not, so
  // for email we ask Bluesky's own sign-in server.
  if (!identifier.includes("@")) {
    try {
      const did = identifier.startsWith("did:")
        ? identifier
        : (await parse(await fetch(`${PUBLIC_HOSTS[0]}/xrpc/com.atproto.identity.resolveHandle${queryString({ handle: identifier })}`))).did;
      host = (await findPds(did)) ?? ENTRYWAY;
    } catch {
      /* fall back to the default sign-in server, which reports a clear error */
    }
  }
  const response = await fetch(`${host}/xrpc/com.atproto.server.createSession`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  const body = await parse(response);
  setSession({
    did: body.did,
    handle: body.handle,
    accessJwt: body.accessJwt,
    refreshJwt: body.refreshJwt,
    pds: pdsFromDidDoc(body.didDoc) ?? host,
  });
}

export async function signOut(): Promise<void> {
  const current = session;
  setSession(null);
  if (current) {
    // Best effort: ask the server to invalidate the tokens too.
    fetch(`${current.pds}/xrpc/com.atproto.server.deleteSession`, {
      method: "POST",
      headers: { Authorization: `Bearer ${current.refreshJwt}` },
    }).catch(() => {});
  }
}

// ---- Addresses --------------------------------------------------------------

/** Split `at://did/collection/rkey` into its parts. */
export function parseAtUri(uri: string): { repo: string; collection: string; rkey: string } {
  const [repo = "", collection = "", rkey = ""] = uri.replace(/^at:\/\//, "").split("/");
  return { repo, collection, rkey };
}

export function postPath(post: { uri: string; author: { handle: string; did: string } }): string {
  const who = post.author.handle && post.author.handle !== "handle.invalid" ? post.author.handle : post.author.did;
  return `/profile/${who}/post/${parseAtUri(post.uri).rkey}`;
}

const didCache = new Map<string, string>();

export async function resolveDid(actor: string): Promise<string> {
  if (actor.startsWith("did:")) return actor;
  const cached = didCache.get(actor);
  if (cached) return cached;
  const { did } = await query("com.atproto.identity.resolveHandle", { handle: actor });
  didCache.set(actor, did);
  return did;
}

// ---- Writing ----------------------------------------------------------------

async function createRecord(collection: string, record: Record<string, unknown>): Promise<StrongRef> {
  return procedure("com.atproto.repo.createRecord", {
    repo: session!.did,
    collection,
    record: { $type: collection, createdAt: new Date().toISOString(), ...record },
  });
}

async function deleteRecord(uri: string): Promise<void> {
  const { collection, rkey } = parseAtUri(uri);
  await procedure("com.atproto.repo.deleteRecord", { repo: session!.did, collection, rkey });
}

export const like = (post: StrongRef) => createRecord("app.bsky.feed.like", { subject: { uri: post.uri, cid: post.cid } });
export const repost = (post: StrongRef) => createRecord("app.bsky.feed.repost", { subject: { uri: post.uri, cid: post.cid } });
export const follow = (did: string) => createRecord("app.bsky.graph.follow", { subject: did });
export const undo = (recordUri: string) => deleteRecord(recordUri);
export const markNotificationsSeen = () => procedure("app.bsky.notification.updateSeen", { seenAt: new Date().toISOString() });

const encoder = new TextEncoder();

/**
 * Find the links, mentions and hashtags in a draft and describe each as a
 * "facet": the byte range it covers and what it points to. The API measures
 * ranges in UTF-8 bytes, not characters, so the offsets are converted here.
 */
export async function detectFacets(text: string): Promise<Facet[]> {
  const facets: Facet[] = [];
  const byteOffset = (charIndex: number) => encoder.encode(text.slice(0, charIndex)).length;
  const add = (start: number, value: string, feature: Facet["features"][number]) =>
    facets.push({ index: { byteStart: byteOffset(start), byteEnd: byteOffset(start + value.length) }, features: [feature] });

  for (const match of text.matchAll(/https?:\/\/[^\s<>"')\]]+/g)) {
    const url = match[0].replace(/[.,;:!?]+$/, "");
    add(match.index!, url, { $type: "app.bsky.richtext.facet#link", uri: url });
  }
  for (const match of text.matchAll(/(^|[\s(])(@([a-zA-Z0-9-]+\.)+[a-zA-Z][a-zA-Z0-9-]*)/g)) {
    const mention = match[2];
    try {
      const did = await resolveDid(mention.slice(1).toLowerCase());
      add(match.index! + match[1].length, mention, { $type: "app.bsky.richtext.facet#mention", did });
    } catch {
      /* not a real account: leave it as plain text */
    }
  }
  for (const match of text.matchAll(/(^|\s)(#[^\s#.,;:!?()[\]{}"']*[^\d\s#.,;:!?()[\]{}"'][^\s#.,;:!?()[\]{}"']*)/g)) {
    const tag = match[2];
    add(match.index! + match[1].length, tag, { $type: "app.bsky.richtext.facet#tag", tag: tag.slice(1) });
  }
  return facets;
}

/** Publish a post. Pass `replyTo` to post it as a reply. */
export async function createPost(text: string, replyTo?: PostView): Promise<StrongRef> {
  const record: Record<string, unknown> = { text, langs: [navigator.language.split("-")[0] || "en"] };
  const facets = await detectFacets(text);
  if (facets.length) record.facets = facets;
  if (replyTo) {
    const parent = { uri: replyTo.uri, cid: replyTo.cid };
    // A reply names both the post it answers and the first post of the thread.
    record.reply = { root: replyTo.record.reply?.root ?? parent, parent };
  }
  return createRecord("app.bsky.feed.post", record);
}

/** Count characters the way Bluesky's 300-character limit does (by grapheme). */
export function graphemeLength(text: string): number {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    let count = 0;
    for (const _ of new Intl.Segmenter().segment(text)) count++;
    return count;
  }
  return Array.from(text).length;
}

export const DISCOVER_FEED = "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { getSession, onSessionChange, type Facet } from "./atproto";

// ---- Routing: the address after "#" decides which screen shows --------------

function currentPath(): string {
  return window.location.hash.replace(/^#/, "") || "/";
}

export function useRoute(): { path: string; segments: string[]; params: URLSearchParams } {
  const full = useSyncExternalStore(
    (notify) => {
      window.addEventListener("hashchange", notify);
      return () => window.removeEventListener("hashchange", notify);
    },
    currentPath,
  );
  const [path, search = ""] = full.split("?");
  return { path, segments: path.split("/").filter(Boolean).map(decodeURIComponent), params: new URLSearchParams(search) };
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function Link({ to, children, className, title }: { to: string; children: ReactNode; className?: string; title?: string }) {
  return (
    <a href={`#${to}`} className={className} title={title} onClick={(e) => e.stopPropagation()}>
      {children}
    </a>
  );
}

/** Turn a bsky.app link into this app's own address, or null if it is some other site. */
export function internalPath(url: string): string | null {
  const match = url.match(/^https?:\/\/(?:staging\.)?bsky\.app(\/(?:profile|search|hashtag)\b[^#]*)?\/?$/);
  if (!match) return null;
  const path = match[1] ?? "/";
  const tag = path.match(/^\/hashtag\/([^/?]+)/);
  return tag ? `/search?q=${encodeURIComponent("#" + decodeURIComponent(tag[1]))}` : path;
}

export function useSession() {
  return useSyncExternalStore(onSessionChange, getSession);
}

// ---- Loading data -----------------------------------------------------------

export function useAsync<T>(load: () => Promise<T>, deps: unknown[]): { data?: T; error?: Error; loading: boolean; reload: () => void } {
  const [state, setState] = useState<{ data?: T; error?: Error; loading: boolean }>({ loading: true });
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setState({ loading: true });
    load().then(
      (data) => !cancelled && setState({ data, loading: false }),
      (error) => !cancelled && setState({ error, loading: false }),
    );
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);
  return { ...state, reload: () => setTick((n) => n + 1) };
}

// ---- Formatting -------------------------------------------------------------

export function timeAgo(iso: string): string {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 86400 * 30) return `${Math.floor(seconds / 86400)}d`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function compact(n: number | undefined): string {
  if (!n) return "";
  return Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

// ---- Rich text --------------------------------------------------------------

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Render post text with its links, mentions and hashtags made clickable.
 * A post stores those as "facets", each covering a range of UTF-8 bytes.
 */
export function RichText({ text, facets }: { text: string; facets?: Facet[] }) {
  if (!facets?.length) return <>{autolink(text)}</>;
  const bytes = encoder.encode(text);
  const sorted = [...facets]
    .filter((f) => f.index.byteStart < f.index.byteEnd && f.index.byteEnd <= bytes.length)
    .sort((a, b) => a.index.byteStart - b.index.byteStart);
  const out: ReactNode[] = [];
  let cursor = 0;
  sorted.forEach((facet, i) => {
    const { byteStart, byteEnd } = facet.index;
    if (byteStart < cursor) return; // overlapping facet: skip
    if (byteStart > cursor) out.push(decoder.decode(bytes.slice(cursor, byteStart)));
    const label = decoder.decode(bytes.slice(byteStart, byteEnd));
    const feature = facet.features[0];
    if (feature?.$type.endsWith("#mention") && feature.did) {
      out.push(<Link key={i} to={`/profile/${feature.did}`}>{label}</Link>);
    } else if (feature?.$type.endsWith("#tag") && feature.tag) {
      out.push(<Link key={i} to={`/search?q=${encodeURIComponent("#" + feature.tag)}`}>{label}</Link>);
    } else if (feature?.$type.endsWith("#link") && feature.uri) {
      out.push(<ExternalOrInternal key={i} url={feature.uri}>{label}</ExternalOrInternal>);
    } else {
      out.push(label);
    }
    cursor = byteEnd;
  });
  if (cursor < bytes.length) out.push(decoder.decode(bytes.slice(cursor)));
  return <>{out}</>;
}

/** A link that stays in the app when it points at Bluesky, and opens a new tab otherwise. */
export function ExternalOrInternal({ url, children }: { url: string; children: ReactNode }) {
  const inside = internalPath(url);
  if (inside) return <Link to={inside}>{children}</Link>;
  if (!/^https?:\/\//i.test(url)) return <>{children}</>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer nofollow" onClick={(e) => e.stopPropagation()}>
      {children}
    </a>
  );
}

/** Make bare URLs and @handles clickable in text that has no facets, such as a bio. */
export function autolink(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(https?:\/\/[^\s<>"')\]]+)|(^|[\s(])(@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z][a-zA-Z0-9-]*)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index!;
    if (match[1]) {
      const url = match[1].replace(/[.,;:!?]+$/, "");
      out.push(text.slice(last, index));
      out.push(<ExternalOrInternal key={index} url={url}>{url.replace(/^https?:\/\//, "")}</ExternalOrInternal>);
      last = index + url.length;
    } else {
      const start = index + match[2].length;
      out.push(text.slice(last, start));
      out.push(<Link key={index} to={`/profile/${match[3].slice(1)}`}>{match[3]}</Link>);
      last = start + match[3].length;
    }
  }
  out.push(text.slice(last));
  return out;
}

#!/usr/bin/env python3
"""Read public Bluesky data from the command line.

This script calls Bluesky's public AppView, the server that indexes the whole
network and answers read queries without a login. It needs only the Python
standard library.

Run `python3 bsky.py --help` for the command list, and
`python3 bsky.py <command> --help` for one command's options.

Every command prints compact text by default so the output is cheap to read.
Add `--json` to get the raw API response instead.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

# The script tries each host in order. `public.api.bsky.app` is the documented
# public endpoint; it refuses some search calls, which `api.bsky.app` accepts.
HOSTS = ["https://public.api.bsky.app", "https://api.bsky.app"]
PLC_DIRECTORY = "https://plc.directory"
USER_AGENT = "bluesky-skill/1.0"
TIMEOUT_SECONDS = 20


class ApiError(Exception):
    """An error the user can act on, printed without a traceback."""


# --------------------------------------------------------------------------
# HTTP
# --------------------------------------------------------------------------


def _get(url: str) -> dict:
    request = urllib.request.Request(
        url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"}
    )
    with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
        return json.loads(response.read().decode("utf-8"))


def xrpc(method: str, params: dict | None = None) -> dict:
    """Call one XRPC method (Bluesky's name for an API endpoint).

    `params` values may be lists; a list becomes a repeated query parameter.
    """
    clean = {k: v for k, v in (params or {}).items() if v not in (None, "", [])}
    query = urllib.parse.urlencode(clean, doseq=True)
    last_error = "no host tried"
    for host in HOSTS:
        url = f"{host}/xrpc/{method}" + (f"?{query}" if query else "")
        try:
            return _get(url)
        except urllib.error.HTTPError as err:
            body = err.read().decode("utf-8", "replace")
            try:
                detail = json.loads(body)
                message = f"{detail.get('error', '')}: {detail.get('message', '')}".strip(": ")
            except ValueError:
                message = body[:200].strip()
            last_error = f"HTTP {err.code} from {host} for {method}: {message}"
            # 400 means the request itself is wrong; another host won't help.
            if err.code == 400:
                break
        except (urllib.error.URLError, TimeoutError) as err:
            last_error = f"could not reach {host}: {err}"
    raise ApiError(last_error)


# --------------------------------------------------------------------------
# Identifiers: handles, DIDs, AT URIs and bsky.app links
# --------------------------------------------------------------------------

_WEB_URL = re.compile(
    r"^https?://(?:staging\.)?bsky\.app/profile/([^/?#]+)"
    r"(?:/(post|feed|lists)/([^/?#]+))?"
)
_COLLECTION_FOR = {
    "post": "app.bsky.feed.post",
    "feed": "app.bsky.feed.generator",
    "lists": "app.bsky.graph.list",
}


def clean_actor(actor: str) -> str:
    """Accept `@name.bsky.social`, a DID, or a profile link; return handle or DID."""
    match = _WEB_URL.match(actor)
    if match:
        return match.group(1)
    return actor.lstrip("@").strip()


def resolve_did(actor: str) -> str:
    actor = clean_actor(actor)
    if actor.startswith("did:"):
        return actor
    return xrpc("com.atproto.identity.resolveHandle", {"handle": actor})["did"]


def to_at_uri(ref: str, default_kind: str = "post") -> str:
    """Turn a bsky.app link (or an AT URI) into an AT URI.

    An AT URI names one record: at://<account DID>/<collection>/<record key>.
    """
    if ref.startswith("at://"):
        parts = ref[5:].split("/")
        if parts and not parts[0].startswith("did:"):
            parts[0] = resolve_did(parts[0])
        return "at://" + "/".join(parts)
    match = _WEB_URL.match(ref)
    if match and match.group(2):
        actor, kind, rkey = match.groups()
        return f"at://{resolve_did(actor)}/{_COLLECTION_FOR[kind]}/{rkey}"
    raise ApiError(
        f"'{ref}' is not a {default_kind} link. Pass a https://bsky.app/profile/…/"
        f"{default_kind}/… link or an at:// URI."
    )


def web_url(uri: str, handle: str | None = None) -> str:
    """Turn an AT URI back into a link a person can open."""
    parts = uri[5:].split("/") if uri.startswith("at://") else []
    if len(parts) != 3:
        return uri
    did, collection, rkey = parts
    who = handle if handle and handle != "handle.invalid" else did
    kind = {v: k for k, v in _COLLECTION_FOR.items()}.get(collection)
    return f"https://bsky.app/profile/{who}/{kind}/{rkey}" if kind else uri


# --------------------------------------------------------------------------
# Text formatting
# --------------------------------------------------------------------------


def one_line(text: str | None, limit: int = 0) -> str:
    text = " ⏎ ".join(line.strip() for line in (text or "").splitlines() if line.strip())
    if limit and len(text) > limit:
        text = text[: limit - 1] + "…"
    return text


def when(timestamp: str | None) -> str:
    return (timestamp or "")[:16].replace("T", " ")


def fmt_actor(actor: dict) -> str:
    name = actor.get("displayName")
    handle = "@" + actor.get("handle", "?")
    return f"{handle} ({name})" if name else handle


def fmt_embed(embed: dict | None) -> list[str]:
    """Describe what a post has attached: images, a link card, a quoted post."""
    if not embed:
        return []
    kind = embed.get("$type", "")
    lines = []
    if kind.startswith("app.bsky.embed.images"):
        for image in embed.get("images", []):
            lines.append(f"[image: {one_line(image.get('alt')) or 'no alt text'}]")
    elif kind.startswith("app.bsky.embed.video"):
        lines.append(f"[video: {one_line(embed.get('alt')) or 'no alt text'}]")
    elif kind.startswith("app.bsky.embed.external"):
        ext = embed.get("external", {})
        lines.append(f"[link: {one_line(ext.get('title'))} — {ext.get('uri')}]")
    elif kind.startswith("app.bsky.embed.recordWithMedia"):
        lines += fmt_embed(embed.get("media"))
        lines += fmt_embed({"$type": "app.bsky.embed.record#view", **embed.get("record", {})})
    elif kind.startswith("app.bsky.embed.record"):
        record = embed.get("record", {})
        if record.get("value") and record.get("author"):
            text = one_line(record["value"].get("text"), 280)
            lines.append(f"[quotes {fmt_actor(record['author'])}: {text} — "
                         f"{web_url(record.get('uri', ''), record['author'].get('handle'))}]")
        elif record.get("displayName"):
            lines.append(f"[attached: {record.get('displayName')} — {web_url(record.get('uri', ''))}]")
        else:
            lines.append("[quoted record unavailable]")
    return lines


def fmt_post(post: dict, indent: str = "", note: str = "") -> str:
    author = post.get("author", {})
    record = post.get("record", {})
    head = f"{indent}{fmt_actor(author)} · {when(record.get('createdAt') or post.get('indexedAt'))}"
    if note:
        head += f" · {note}"
    body = [f"{indent}  {one_line(record.get('text')) or '(no text)'}"]
    body += [f"{indent}  {line}" for line in fmt_embed(post.get("embed"))]
    stats = (
        f"{indent}  likes {post.get('likeCount', 0)} · reposts {post.get('repostCount', 0)}"
        f" · replies {post.get('replyCount', 0)} · quotes {post.get('quoteCount', 0)}"
    )
    link = f"{indent}  {web_url(post.get('uri', ''), author.get('handle'))}"
    return "\n".join([head, *body, stats, link])


def fmt_profile_line(actor: dict) -> str:
    bio = one_line(actor.get("description"), 160)
    return f"{fmt_actor(actor)}" + (f" — {bio}" if bio else "")


def emit(args: argparse.Namespace, data: dict, text: str) -> None:
    if args.json:
        print(json.dumps(data, ensure_ascii=False, indent=2))
    else:
        print(text if text.strip() else "(no results)")
        cursor = data.get("cursor") if isinstance(data, dict) else None
        if cursor:
            print(f"\nMore results exist. Repeat the command with --cursor '{cursor}'")


# --------------------------------------------------------------------------
# Commands
# --------------------------------------------------------------------------


def cmd_profile(args):
    data = xrpc("app.bsky.actor.getProfile", {"actor": clean_actor(args.actor)})
    lines = [
        fmt_actor(data),
        f"DID: {data.get('did')}",
        f"Bio: {one_line(data.get('description')) or '(empty)'}",
        f"Followers {data.get('followersCount', 0)} · Following {data.get('followsCount', 0)}"
        f" · Posts {data.get('postsCount', 0)}",
        f"Joined: {when(data.get('createdAt'))}",
    ]
    verification = data.get("verification") or {}
    if verification.get("verifiedStatus") == "valid":
        lines.append("Verified: yes (blue check)")
    if verification.get("trustedVerifierStatus") == "valid":
        lines.append("Trusted verifier: yes (can verify other accounts)")
    labels = [label.get("val") for label in data.get("labels", [])]
    if labels:
        lines.append(f"Moderation labels: {', '.join(labels)}")
    pinned = (data.get("pinnedPost") or {}).get("uri")
    if pinned:
        lines.append(f"Pinned post: {web_url(pinned, data.get('handle'))}")
    lines.append(f"Link: https://bsky.app/profile/{data.get('handle')}")
    emit(args, data, "\n".join(lines))


def cmd_posts(args):
    data = xrpc(
        "app.bsky.feed.getAuthorFeed",
        {
            "actor": clean_actor(args.actor),
            "limit": args.limit,
            "cursor": args.cursor,
            "filter": args.filter,
            "includePins": "true" if args.include_pins else None,
        },
    )
    emit(args, data, fmt_feed(data.get("feed", [])))


def fmt_feed(items: list[dict]) -> str:
    blocks = []
    for item in items:
        note = ""
        reason = item.get("reason") or {}
        if reason.get("$type", "").endswith("#reasonRepost"):
            note = f"reposted by @{reason.get('by', {}).get('handle')}"
        elif reason.get("$type", "").endswith("#reasonPin"):
            note = "pinned"
        parent = (item.get("reply") or {}).get("parent") or {}
        if not note and parent.get("author"):
            note = f"reply to @{parent['author'].get('handle')}"
        blocks.append(fmt_post(item["post"], note=note))
    return "\n\n".join(blocks)


def cmd_search_posts(args):
    data = xrpc(
        "app.bsky.feed.searchPosts",
        {
            "q": args.query,
            "sort": args.sort,
            "limit": args.limit,
            "cursor": args.cursor,
            "since": args.since,
            "until": args.until,
            "author": clean_actor(args.author) if args.author else None,
            "mentions": clean_actor(args.mentions) if args.mentions else None,
            "lang": args.lang,
            "domain": args.domain,
            "tag": args.tag,
        },
    )
    emit(args, data, "\n\n".join(fmt_post(post) for post in data.get("posts", [])))


def cmd_search_users(args):
    data = xrpc(
        "app.bsky.actor.searchActors",
        {"q": args.query, "limit": args.limit, "cursor": args.cursor},
    )
    emit(args, data, "\n".join(fmt_profile_line(a) for a in data.get("actors", [])))


def cmd_post(args):
    uris = [to_at_uri(ref) for ref in args.refs]
    data = xrpc("app.bsky.feed.getPosts", {"uris": uris})
    emit(args, data, "\n\n".join(fmt_post(post) for post in data.get("posts", [])))


def cmd_thread(args):
    data = xrpc(
        "app.bsky.feed.getPostThread",
        {"uri": to_at_uri(args.ref), "depth": args.depth, "parentHeight": args.parents},
    )
    thread = data.get("thread", {})
    if "post" not in thread:
        raise ApiError("That post is deleted, blocked, or not visible without a login.")

    blocks = []
    ancestors = []
    node = thread.get("parent")
    while node and "post" in node:
        ancestors.append(node["post"])
        node = node.get("parent")
    for post in reversed(ancestors):
        blocks.append(fmt_post(post, note="earlier in the thread"))
    blocks.append(fmt_post(thread["post"], note="THE POST YOU ASKED ABOUT"))

    def walk(replies, level):
        ordered = sorted(replies, key=lambda r: r.get("post", {}).get("likeCount", 0), reverse=True)
        for reply in ordered[: args.max_replies]:
            if "post" not in reply:
                continue
            blocks.append(fmt_post(reply["post"], indent="    " * level, note=f"reply, level {level}"))
            walk(reply.get("replies") or [], level + 1)
        hidden = len(ordered) - args.max_replies
        if hidden > 0:
            blocks.append(f"{'    ' * level}(+{hidden} more replies at this level, fewer likes)")

    walk(thread.get("replies") or [], 1)
    emit(args, data, "\n\n".join(blocks))


def _people(args, method: str, key: str, id_param: str, ident: str, actor_of=lambda x: x):
    data = xrpc(method, {id_param: ident, "limit": args.limit, "cursor": args.cursor})
    emit(args, data, "\n".join(fmt_profile_line(actor_of(item)) for item in data.get(key, [])))


def cmd_followers(args):
    _people(args, "app.bsky.graph.getFollowers", "followers", "actor", clean_actor(args.actor))


def cmd_follows(args):
    _people(args, "app.bsky.graph.getFollows", "follows", "actor", clean_actor(args.actor))


def cmd_likes(args):
    _people(args, "app.bsky.feed.getLikes", "likes", "uri", to_at_uri(args.ref),
            actor_of=lambda like: like.get("actor", {}))


def cmd_reposts(args):
    _people(args, "app.bsky.feed.getRepostedBy", "repostedBy", "uri", to_at_uri(args.ref))


def cmd_quotes(args):
    data = xrpc(
        "app.bsky.feed.getQuotes",
        {"uri": to_at_uri(args.ref), "limit": args.limit, "cursor": args.cursor},
    )
    emit(args, data, "\n\n".join(fmt_post(post) for post in data.get("posts", [])))


def cmd_relationship(args):
    """Say whether two accounts follow each other."""
    first, second = resolve_did(args.actor), resolve_did(args.other)
    data = xrpc("app.bsky.graph.getRelationships", {"actor": first, "others": [second]})
    rel = (data.get("relationships") or [{}])[0]
    if "following" not in rel and "followedBy" not in rel and rel.get("$type", "").endswith("notFoundActor"):
        raise ApiError(f"Could not find {args.other}.")
    a, b = clean_actor(args.actor), clean_actor(args.other)
    text = (
        f"{a} follows {b}: {'yes' if rel.get('following') else 'no'}\n"
        f"{b} follows {a}: {'yes' if rel.get('followedBy') else 'no'}"
    )
    emit(args, data, text)


def cmd_feed(args):
    """Read a custom feed (a 'feed generator') such as Discover."""
    uri = to_at_uri(args.ref, "feed")
    data = xrpc("app.bsky.feed.getFeed", {"feed": uri, "limit": args.limit, "cursor": args.cursor})
    emit(args, data, fmt_feed(data.get("feed", [])))


def fmt_generator(feed: dict) -> str:
    return (
        f"{feed.get('displayName')} by @{feed.get('creator', {}).get('handle')}"
        f" · likes {feed.get('likeCount', 0)}\n"
        f"  {one_line(feed.get('description'), 200) or '(no description)'}\n"
        f"  {web_url(feed.get('uri', ''), feed.get('creator', {}).get('handle'))}"
    )


def cmd_search_feeds(args):
    data = xrpc(
        "app.bsky.unspecced.getPopularFeedGenerators",
        {"query": args.query, "limit": args.limit, "cursor": args.cursor},
    )
    emit(args, data, "\n\n".join(fmt_generator(feed) for feed in data.get("feeds", [])))


def cmd_user_feeds(args):
    data = xrpc(
        "app.bsky.feed.getActorFeeds",
        {"actor": clean_actor(args.actor), "limit": args.limit, "cursor": args.cursor},
    )
    emit(args, data, "\n\n".join(fmt_generator(feed) for feed in data.get("feeds", [])))


def cmd_user_lists(args):
    data = xrpc(
        "app.bsky.graph.getLists",
        {"actor": clean_actor(args.actor), "limit": args.limit, "cursor": args.cursor},
    )
    lines = []
    for item in data.get("lists", []):
        purpose = item.get("purpose", "").split("#")[-1]
        lines.append(
            f"{item.get('name')} ({purpose}, {item.get('listItemCount', '?')} members)"
            f" — {one_line(item.get('description'), 120)}\n  {web_url(item.get('uri', ''))}"
        )
    emit(args, data, "\n".join(lines))


def cmd_list(args):
    """Show the members of a list."""
    data = xrpc(
        "app.bsky.graph.getList",
        {"list": to_at_uri(args.ref, "lists"), "limit": args.limit, "cursor": args.cursor},
    )
    info = data.get("list", {})
    head = f"{info.get('name')} by @{info.get('creator', {}).get('handle')} — {one_line(info.get('description'), 200)}"
    members = "\n".join(fmt_profile_line(item.get("subject", {})) for item in data.get("items", []))
    emit(args, data, f"{head}\n{members}")


def cmd_trending(args):
    data = xrpc("app.bsky.unspecced.getTrendingTopics", {"limit": args.limit})
    lines = ["Trending now:"]
    lines += [f"  {t.get('displayName') or t.get('topic')} — https://bsky.app{t.get('link', '')}"
              for t in data.get("topics", [])]
    if data.get("suggested"):
        lines.append("Suggested topics:")
        lines += [f"  {t.get('displayName') or t.get('topic')} — https://bsky.app{t.get('link', '')}"
                  for t in data.get("suggested", [])]
    emit(args, data, "\n".join(lines))


def cmd_resolve(args):
    """Show an account's permanent ID and which server stores its data."""
    did = resolve_did(args.actor)
    if did.startswith("did:plc:"):
        doc = _get(f"{PLC_DIRECTORY}/{did}")
    elif did.startswith("did:web:"):
        doc = _get(f"https://{did[8:]}/.well-known/did.json")
    else:
        raise ApiError(f"Unsupported DID method: {did}")
    handles = [aka[5:] for aka in doc.get("alsoKnownAs", []) if aka.startswith("at://")]
    servers = [s.get("serviceEndpoint") for s in doc.get("service", [])
               if s.get("id", "").endswith("atproto_pds")]
    text = (
        f"DID: {did}\n"
        f"Handle(s): {', '.join(handles) or '(none)'}\n"
        f"Data server (PDS): {', '.join(servers) or '(none listed)'}"
    )
    emit(args, doc, text)


def cmd_raw(args):
    """Call any read-only XRPC method. Always prints JSON."""
    params: dict = {}
    for pair in args.params:
        if "=" not in pair:
            raise ApiError(f"Parameter '{pair}' must look like name=value.")
        key, value = pair.split("=", 1)
        if key in params:
            existing = params[key]
            params[key] = (existing if isinstance(existing, list) else [existing]) + [value]
        else:
            params[key] = value
    print(json.dumps(xrpc(args.method, params), ensure_ascii=False, indent=2))


# --------------------------------------------------------------------------
# Argument parsing
# --------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="bsky.py",
        description="Read public Bluesky data: profiles, posts, threads, search, feeds, trends.",
        epilog="An ACTOR is a handle (alice.bsky.social), a DID, or a profile link. "
               "A post, feed or list REF is a https://bsky.app/… link or an at:// URI.",
    )
    sub = parser.add_subparsers(dest="command", required=True, metavar="COMMAND")

    def add(name, func, help_text, paged=True, default_limit=25):
        p = sub.add_parser(name, help=help_text, description=help_text)
        p.set_defaults(func=func)
        p.add_argument("--json", action="store_true", help="print the raw API response")
        if paged:
            p.add_argument("--limit", type=int, default=default_limit,
                           help=f"how many results (default {default_limit}, API maximum 100)")
            p.add_argument("--cursor", help="continue from a previous page of results")
        return p

    p = add("profile", cmd_profile, "Show one account: bio, follower counts, join date.", paged=False)
    p.add_argument("actor")

    p = add("posts", cmd_posts, "List an account's recent posts, newest first.")
    p.add_argument("actor")
    p.add_argument("--filter", default="posts_and_author_threads",
                   choices=["posts_with_replies", "posts_no_replies", "posts_with_media",
                            "posts_and_author_threads", "posts_with_video"],
                   help="which posts to include (default: posts plus the author's own threads)")
    p.add_argument("--include-pins", action="store_true", help="put the pinned post first")

    p = add("search-posts", cmd_search_posts, "Search all public posts.")
    p.add_argument("query", help='search text; use "quotes" for an exact phrase')
    p.add_argument("--sort", choices=["top", "latest"], default="top",
                   help="top = most engagement (default), latest = newest first")
    p.add_argument("--since", help="only posts on or after this date, YYYY-MM-DD or full timestamp")
    p.add_argument("--until", help="only posts before this date, YYYY-MM-DD or full timestamp")
    p.add_argument("--author", help="only posts by this account")
    p.add_argument("--mentions", help="only posts that mention this account")
    p.add_argument("--lang", help="only posts in this language, for example en or ja")
    p.add_argument("--domain", help="only posts that link to this website domain")
    p.add_argument("--tag", action="append", help="only posts with this hashtag (no #); repeatable")

    p = add("search-users", cmd_search_users, "Search accounts by name, handle or bio.")
    p.add_argument("query")

    p = add("post", cmd_post, "Show one or more posts with their like, repost and reply counts.", paged=False)
    p.add_argument("refs", nargs="+", metavar="REF")

    p = add("thread", cmd_thread, "Show a post with the posts above it and the replies below it.", paged=False)
    p.add_argument("ref")
    p.add_argument("--depth", type=int, default=3, help="levels of replies to fetch (default 3)")
    p.add_argument("--parents", type=int, default=10, help="earlier posts to fetch (default 10)")
    p.add_argument("--max-replies", type=int, default=8,
                   help="replies to print per level, most liked first (default 8)")

    for name, func, text in [
        ("followers", cmd_followers, "List accounts that follow ACTOR."),
        ("follows", cmd_follows, "List accounts that ACTOR follows."),
        ("user-feeds", cmd_user_feeds, "List the custom feeds ACTOR has created."),
        ("user-lists", cmd_user_lists, "List the lists ACTOR has created."),
    ]:
        add(name, func, text, default_limit=50).add_argument("actor")

    for name, func, text in [
        ("likes", cmd_likes, "List accounts that liked a post."),
        ("reposts", cmd_reposts, "List accounts that reposted a post."),
        ("quotes", cmd_quotes, "List posts that quote a post."),
    ]:
        add(name, func, text, default_limit=50).add_argument("ref")

    p = add("relationship", cmd_relationship, "Say whether two accounts follow each other.", paged=False)
    p.add_argument("actor")
    p.add_argument("other")

    p = add("feed", cmd_feed, "Read the posts in a custom feed.")
    p.add_argument("ref", help="a https://bsky.app/profile/…/feed/… link or at:// URI")

    p = add("search-feeds", cmd_search_feeds, "Find custom feeds by topic; with no query, list popular feeds.")
    p.add_argument("query", nargs="?", default="")

    p = add("list", cmd_list, "Show the members of a list.", default_limit=50)
    p.add_argument("ref", help="a https://bsky.app/profile/…/lists/… link or at:// URI")

    p = add("trending", cmd_trending, "Show the topics trending on Bluesky right now.", paged=False)
    p.add_argument("--limit", type=int, default=10)

    p = add("resolve", cmd_resolve, "Show an account's permanent ID (DID) and its data server.", paged=False)
    p.add_argument("actor")

    p = sub.add_parser("raw", help="Call any read-only XRPC method and print JSON.",
                       description="Call any read-only XRPC method, for example: "
                                   "raw app.bsky.graph.getStarterPack starterPack=at://…")
    p.set_defaults(func=cmd_raw, json=True)
    p.add_argument("method", help="the method's full name, for example app.bsky.actor.getProfiles")
    p.add_argument("params", nargs="*", metavar="name=value",
                   help="query parameters; repeat a name to send a list")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if getattr(args, "limit", None) is not None:
        args.limit = max(1, min(args.limit, 100))
    try:
        args.func(args)
    except ApiError as err:
        print(f"error: {err}", file=sys.stderr)
        return 1
    except BrokenPipeError:
        return 0
    return 0


if __name__ == "__main__":
    sys.exit(main())

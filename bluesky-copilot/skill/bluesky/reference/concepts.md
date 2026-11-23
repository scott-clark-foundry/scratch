# How Bluesky works

Read this before answering a how-to or concept question. Facts here are the stable ones. Lines marked **Check** name details that change; give the person the linked page instead of asserting a number or a menu path from memory.

Official sources:

- Help and policies: https://bsky.social/about (support, community guidelines, terms, privacy)
- Company blog, where features are announced: https://bsky.social/about/blog
- Developer documentation: https://docs.bsky.app
- AT Protocol specifications: https://atproto.com

## The network in one paragraph

Bluesky is a social app built on the AT Protocol ("atproto"), an open protocol for social networking. Each account's posts, likes and follows are stored as public, signed records in that account's own data repository. Any service can read those records, so other apps, feeds and moderation services can be built on the same network. The Bluesky app at bsky.app is one client among several.

## Identity

- **Handle**: the name people see, written `@alice.bsky.social`. A handle is a domain name. New accounts get a subdomain of `bsky.social`.
- **Custom domain handle**: an account can use a domain it controls (`@alice.com`) as its handle. The owner proves control by adding a DNS TXT record at `_atproto.<domain>` containing `did=<their DID>`, or by serving the DID as plain text at `https://<domain>/.well-known/atproto-did`. The setting is under Settings → Account → Handle in the app, which shows the account's DID and the exact DNS record to add. DNS changes can take from minutes to a day to spread. This is why a handle that matches a known organization's website is good evidence the account is genuine. Followers, posts and the DID are unaffected by a handle change, and links that use the DID keep working; links that use the old handle may stop working. Official walkthrough: https://bsky.social/about/blog/4-28-2023-domain-handle-tutorial . **Check** the exact menu path in the app.
- **DID** (decentralized identifier): the permanent ID behind a handle, such as `did:plc:z72i7hdynmk6r22z27h6tvur`. It never changes when the handle changes. Follows, blocks and links between records use DIDs. Most accounts use the `did:plc` method, whose records are kept at https://plc.directory; some use `did:web`, which is tied to a domain.
- **PDS** (personal data server): the server that stores an account's repository and handles its login. Bluesky runs many PDS hosts under `*.host.bsky.network`; people can also run their own. An account can move to another PDS and keep its DID, followers and posts. `scripts/bsky.py resolve ACTOR` shows which PDS an account uses.
- **Verification**: a blue check on a profile means Bluesky or an organization Bluesky designated as a "trusted verifier" has verified the account. `scripts/bsky.py profile` prints a verification line when one applies. A custom domain handle is a separate, self-serve signal. **Check** https://bsky.social/about/blog for who can currently be verified and how to request it.

## Records and links

- **AT URI**: the address of one record, `at://<DID or handle>/<collection>/<record key>`. A post's is `at://did:plc:…/app.bsky.feed.post/3l6oveex3ii2l`. The matching web link is `https://bsky.app/profile/<handle or DID>/post/3l6oveex3ii2l`.
- **Lexicon**: the schema language that defines record types and API methods. Names look like `app.bsky.feed.post` (a record type) or `app.bsky.feed.getPostThread` (a method).
- **AppView**: a service that reads every repository and builds the views an app needs, such as threads, like counts and search. Bluesky's public AppView answers at `https://public.api.bsky.app`. The lookup script reads from it.
- **Relay and firehose**: a relay collects updates from every PDS and re-publishes them as one stream, called the firehose. Feed builders and other services consume it.

## Posts

- A post holds up to 300 characters of text.
- A post can carry one attachment type: up to four images, one video, one external link card, or a quoted post (a quote can be combined with media). Images and video accept alt text.
- Mentions, links and hashtags are stored as "facets", which mark a byte range of the text and what it points to.
- Bluesky has no edit feature for published posts; the author can delete and repost. **Check** the blog if someone asks whether editing has shipped.
- **Reply controls ("threadgate")**: the author can limit who may reply: everyone, nobody, accounts they follow, their followers, accounts they mention, or members of a list. The author can also hide individual replies.
- **Quote controls ("postgate")**: the author can turn off quoting for a post and can detach their post from someone else's quote of it.
- **Check** current video length and file size limits at https://bsky.social/about/blog.

## Feeds

- **Following**: posts from accounts the person follows, newest first.
- **Discover**: Bluesky's algorithmic feed.
- **Custom feeds** ("feed generators"): anyone can publish a feed with its own selection rule, such as a topic, a community or an algorithm. People browse them in the Feeds tab, and can pin feeds so they appear as tabs on Home. `scripts/bsky.py search-feeds TOPIC` finds them; `feed REF` reads one.
- **Adding a feed**: in the official app, open the feed and use its save or pin control; pinned feeds appear as tabs on Home, and the Feeds screen lists saved ones. **Check** the exact button names in the app.
- **Tuning Discover**: the "…" menu on a post in Discover has "Show more like this" and "Show less like this". Bluesky treats these as signals, not guarantees.
- **Making a feed**: the official app has no built-in feed builder. People use third-party tools (search the web for "Bluesky feed builder") or write their own feed generator; developer guide: https://docs.bsky.app/docs/starter-templates/custom-feeds
- **Trending topics**: Bluesky generates the list and the topic names automatically from current activity. Each topic links to a feed of posts about it.
- A feed generator returns only a list of post addresses. The app then fetches the posts and applies the reader's own moderation settings, so a feed cannot show someone a post they have blocked or filtered.

## Lists and starter packs

- **User list** (curation list): a named set of accounts that can be viewed as a feed.
- **Moderation list**: a named set of accounts that a person can subscribe to in order to mute or block every member.
- **Starter pack**: a shareable bundle of recommended accounts and feeds for newcomers. Someone opening the link can follow everyone in it at once.

## Moderation and safety

Bluesky calls its approach "stackable moderation". Several layers apply at once:

- **Network moderation**: Bluesky's own moderation team enforces the community guidelines on the Bluesky app: it removes illegal content, labels content, and suspends accounts. Guidelines: https://bsky.social/about/support/community-guidelines
- **Labels and labelers**: a labeler is a service that attaches labels (for example "spam", "graphic media", or community-defined labels) to accounts and posts. Bluesky runs the default labeler; anyone can run another. A person subscribes to labelers and chooses, per label, whether to hide, warn or show.
- **Personal controls**:
  - *Mute*: hides an account's posts from the person who muted. Private; the muted account is not told.
  - *Block*: stops both accounts from seeing or interacting with each other in the app. The app does not notify the blocked account and has no "who blocked me" list; a person finds out only by visiting the profile, which shows that they are blocked. Blocks are public records at the protocol level, so third-party tools can list them.
  - *Where to manage them*: Settings → Moderation lists the accounts a person has blocked and muted, their muted words, and their moderation lists. **Check** the menu path in the app.
  - *"Follows you"*: when signed in, a profile shows a "Follows you" badge if that account follows the viewer.
  - *Muted words and tags*: hide posts containing chosen words or hashtags, optionally for a set period.
  - *Content filters*: per-category settings for adult and graphic content. Adult content is off by default and needs an age-appropriate account.
- **Reporting**: the "…" menu on any post, account, list or feed has a Report option. Reports go to Bluesky's moderation team, or to another labeler the reporter picks.
- **Appeals**: a person can appeal a label or an account action from within the app or by contacting support. **Check** https://bsky.social/about/support for the current process.

## Privacy: what is and is not public

- Posts, likes, follows, blocks, lists and profile details are public records. Anyone can read them through the API, including from accounts the person has blocked if the reader uses a different tool.
- Mutes, muted words, bookmarks, preferences and email address are private.
- Direct messages are private to the participants and are stored by Bluesky's chat service, not in the public repository. Bluesky states that its moderators can access DMs when handling a report. **Check** the privacy policy for whether messages are end-to-end encrypted: https://bsky.social/about/support/privacy-policy
- The option "Discourage apps from showing my account to logged-out users" (Settings → Privacy and security) asks apps to hide the account from visitors who are not logged in. It is a request that the Bluesky app honors; the data stays public at the protocol level.
- Deleting a post removes it from the repository and from the Bluesky app. Copies that other services already made may persist.

## Accounts and security

- **App passwords**: separate passwords, created under Settings → Privacy and security → App passwords, for logging in to third-party apps. An app password cannot change account settings or delete the account, and it can be revoked on its own. Recommend one whenever a person is about to type their main password into a tool that is not the official app. DM access is a separate permission the person grants when creating the app password.
- **OAuth login**: newer third-party apps send the person to their own PDS to approve access, so the app never sees a password.
- **Two-factor authentication**: email-based 2FA can be turned on in Settings → Privacy and security.
- **Deactivate or delete**: both are in Settings → Account. Deactivation hides the account until the person returns; deletion is permanent after a waiting period. **Check** https://bsky.social/about/support for current timings.
- **Export data**: Settings → Account → Export my data downloads the repository as a CAR file, a standard archive format for this kind of data.

## For developers

- Public reads need no authentication: `GET https://public.api.bsky.app/xrpc/<method>?<params>`.
- Writes and private reads go to the account's own PDS with a session from `com.atproto.server.createSession` (app password) or an OAuth token.
- API reference: https://docs.bsky.app/docs/api/ . Rate limits: https://docs.bsky.app/docs/advanced-guides/rate-limits
- The official app's source is at https://github.com/bluesky-social/social-app and the protocol implementation at https://github.com/bluesky-social/atproto.

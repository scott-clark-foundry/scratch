import { useEffect, type ReactNode } from "react";
import { signOut } from "./lib/atproto";
import { checkCopilot, setCopilotOpen, useCopilot } from "./lib/copilot-store";
import { openComposer, openLogin } from "./lib/ui-store";
import { Link, useRoute, useSession } from "./lib/util";
import { CopilotPanel } from "./components/Copilot";
import { Dialogs } from "./components/Dialogs";
import { Icon } from "./components/Icon";
import { FeedScreen, FeedsScreen, HomeScreen, NotificationsScreen, ProfileScreen, SearchScreen, ThreadScreen } from "./components/Screens";

function NavItem({ to, icon, label, current }: { to: string; icon: string; label: string; current: boolean }) {
  return (
    <Link to={to} className={`nav-item ${current ? "current" : ""}`} title={label}>
      <Icon name={icon} /> <span className="nav-label">{label}</span>
    </Link>
  );
}

/** Pick the screen for the address after "#". */
function Screen(): ReactNode {
  const { segments, params } = useRoute();
  const [first, actor, kind, rkey] = segments;
  if (!first) return <HomeScreen />;
  if (first === "search") return <SearchScreen initialQuery={params.get("q") ?? ""} />;
  if (first === "feeds") return <FeedsScreen />;
  if (first === "notifications") return <NotificationsScreen />;
  if (first === "profile" && actor) {
    if (kind === "post" && rkey) return <ThreadScreen key={`${actor}/${rkey}`} actor={actor} rkey={rkey} />;
    if (kind === "feed" && rkey) return <FeedScreen key={`${actor}/${rkey}`} actor={actor} rkey={rkey} />;
    return <ProfileScreen key={actor} actor={actor} />;
  }
  return <div className="status">That page doesn't exist. <Link to="/">Go home</Link></div>;
}

export function App() {
  const session = useSession();
  const copilot = useCopilot();
  const { path, segments } = useRoute();

  useEffect(() => {
    checkCopilot();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const first = segments[0] ?? "";
  const ownProfile = session && segments[1] === session.handle;

  return (
    <div className="layout">
      <nav className="nav" aria-label="Main">
        <Link to="/" className="brand" title="Cirrus">
          <Icon name="cloud" /> <span className="nav-label">Cirrus</span>
        </Link>
        <NavItem to="/" icon="home" label="Home" current={first === ""} />
        <NavItem to="/search" icon="search" label="Search" current={first === "search"} />
        <NavItem to="/feeds" icon="feeds" label="Feeds" current={first === "feeds"} />
        <NavItem to="/notifications" icon="bell" label="Notifications" current={first === "notifications"} />
        {session && <NavItem to={`/profile/${session.handle}`} icon="user" label="Profile" current={first === "profile" && !!ownProfile} />}
        <button className={`nav-item nav-copilot ${copilot.open ? "current" : ""}`} onClick={() => setCopilotOpen(!copilot.open)} title="Copilot">
          <Icon name="spark" /> <span className="nav-label">Copilot</span>
        </button>
        {session ? (
          <>
            <button className="primary nav-compose" onClick={() => openComposer()} title="New post">
              <Icon name="compose" /> <span className="nav-label">New post</span>
            </button>
            <div className="nav-account">
              <span className="nav-label muted">@{session.handle}</span>
              <button className="ghost icon-button" onClick={() => signOut()} title="Sign out" aria-label="Sign out"><Icon name="logout" /></button>
            </div>
          </>
        ) : (
          <button className="primary nav-compose" onClick={openLogin} title="Sign in">
            <Icon name="user" /> <span className="nav-label">Sign in</span>
          </button>
        )}
        <p className="nav-note nav-label">An unofficial client. Not affiliated with Bluesky Social, PBC.</p>
      </nav>

      <main className="main">
        <Screen />
      </main>

      <CopilotPanel />
      {!copilot.open && (
        <button className="copilot-fab primary" onClick={() => setCopilotOpen(true)} aria-label="Open copilot">
          <Icon name="spark" /> Ask
        </button>
      )}
      <Dialogs />
    </div>
  );
}

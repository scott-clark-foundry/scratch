import { useEffect, useState, type ReactNode } from "react";
import * as api from "../lib/atproto";
import { closeComposer, closeLogin, useUi } from "../lib/ui-store";
import { navigate, useSession } from "../lib/util";
import { Icon } from "./Icon";
import { Avatar } from "./Post";

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog" role="dialog" aria-modal="true" aria-label={title}>
        <div className="dialog-head">
          <h2>{title}</h2>
          <button className="ghost icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function LoginDialog() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.signIn(identifier, password);
      closeLogin();
    } catch (err) {
      const xrpc = err instanceof api.XrpcError ? err : null;
      setError(
        xrpc?.code === "AuthFactorTokenRequired"
          ? "This account uses email two-factor sign-in, which needs your main password. Use an app password instead: it skips that step."
          : xrpc?.status === 401
            ? "That handle and password don't match."
            : xrpc?.message || "Could not reach the sign-in server.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog title="Sign in to Bluesky" onClose={closeLogin}>
      <form className="form" onSubmit={submit}>
        <label>
          Handle
          <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="you.bsky.social" autoCapitalize="none" autoComplete="username" autoFocus required />
        </label>
        <label>
          App password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="xxxx-xxxx-xxxx-xxxx" autoComplete="current-password" required />
        </label>
        <p className="muted small-text">
          Use an <a href="https://bsky.app/settings/app-passwords" target="_blank" rel="noopener noreferrer">app password</a>, not your main password. An app password can be revoked on its own and cannot change your account settings. Your password goes from this browser straight to your Bluesky server; this app's server never sees it.
        </p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary" disabled={busy || !identifier || !password}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </Dialog>
  );
}

const MAX_LENGTH = 300;

function ComposerDialog({ replyTo }: { replyTo?: api.PostView }) {
  const session = useSession();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const length = api.graphemeLength(text);

  const submit = async () => {
    if (!text.trim() || length > MAX_LENGTH || busy) return;
    setBusy(true);
    setError("");
    try {
      const created = await api.createPost(text.trim(), replyTo);
      closeComposer();
      if (session) navigate(`/profile/${session.handle}/post/${api.parseAtUri(created.uri).rkey}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish the post.");
      setBusy(false);
    }
  };

  return (
    <Dialog title={replyTo ? "Reply" : "New post"} onClose={closeComposer}>
      {replyTo && (
        <div className="reply-preview">
          <Avatar profile={replyTo.author} size={28} />
          <div>
            <b>{replyTo.author.displayName || replyTo.author.handle}</b>
            <div className="row-desc">{replyTo.record.text}</div>
          </div>
        </div>
      )}
      <div className="form">
        <textarea
          className="composer-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={replyTo ? "Write your reply" : "What's up?"}
          aria-label="Post text"
          rows={5}
          autoFocus
          onKeyDown={(e) => (e.metaKey || e.ctrlKey) && e.key === "Enter" && submit()}
        />
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="composer-foot">
          <span className={length > MAX_LENGTH ? "form-error" : "muted"}>{MAX_LENGTH - length}</span>
          <button className="primary" onClick={submit} disabled={busy || !text.trim() || length > MAX_LENGTH}>
            {busy ? "Posting…" : replyTo ? "Reply" : "Post"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export function Dialogs() {
  const ui = useUi();
  return (
    <>
      {ui.loginOpen && <LoginDialog />}
      {ui.composer && <ComposerDialog replyTo={ui.composer.replyTo} />}
    </>
  );
}

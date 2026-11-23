import { useEffect, useRef, useState, type ReactNode } from "react";
import { ask, detachPost, newConversation, setCopilotOpen, stopAnswer, useCopilot } from "../lib/copilot-store";
import { ExternalOrInternal } from "../lib/util";
import { Icon } from "./Icon";

// ---- A small Markdown renderer ----------------------------------------------
// The agent answers in Markdown. This renders the subset it uses as React
// elements, so nothing the agent (or a post it quotes) writes is ever treated
// as HTML.

function inline(text: string, keyBase = ""): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(`[^`]+`)|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(https?:\/\/[^\s<>)\]]+)/g;
  let last = 0;
  let n = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index!;
    if (index > last) out.push(text.slice(last, index));
    const key = `${keyBase}${n++}`;
    let consumed = match[0].length;
    if (match[1]) out.push(<code key={key}>{match[1].slice(1, -1)}</code>);
    else if (match[3]) out.push(<ExternalOrInternal key={key} url={match[3]}>{inline(match[2], key)}</ExternalOrInternal>);
    else if (match[4]) out.push(<strong key={key}>{inline(match[4].slice(2, -2), key)}</strong>);
    else if (match[5]) out.push(<em key={key}>{inline(match[5].slice(1, -1), key)}</em>);
    else if (match[6]) {
      const url = match[6].replace(/[.,;:!?]+$/, "");
      consumed = url.length;
      out.push(<ExternalOrInternal key={key} url={url}>{url.replace(/^https?:\/\/(www\.)?/, "")}</ExternalOrInternal>);
    }
    last = index + consumed;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  const lines = text.split("\n");
  let i = 0;
  const key = () => blocks.length;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.trim().startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(<pre key={key()}><code>{code.join("\n")}</code></pre>);
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)/);
    if (heading) {
      blocks.push(<h4 key={key()}>{inline(heading[2])}</h4>);
      i++;
      continue;
    }
    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) quote.push(lines[i++].replace(/^\s*>\s?/, ""));
      blocks.push(<blockquote key={key()}>{inline(quote.join("\n"))}</blockquote>);
      continue;
    }
    const bullet = /^\s*[-*•]\s+/;
    const numbered = /^\s*\d+[.)]\s+/;
    if (bullet.test(line) || numbered.test(line)) {
      const marker = bullet.test(line) ? bullet : numbered;
      const items: string[] = [];
      while (i < lines.length && (marker.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        if (marker.test(lines[i])) items.push(lines[i].replace(marker, ""));
        else items[items.length - 1] += "\n" + lines[i].trim();
        i++;
      }
      const children = items.map((item, n) => <li key={n}>{inline(item)}</li>);
      blocks.push(marker === bullet ? <ul key={key()}>{children}</ul> : <ol key={key()}>{children}</ol>);
      continue;
    }
    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(\s*[-*•]\s+|\s*\d+[.)]\s+|#{1,4}\s|\s*>|\s*```)/.test(lines[i])) paragraph.push(lines[i++]);
    blocks.push(<p key={key()}>{inline(paragraph.join("\n"))}</p>);
  }
  return <div className="markdown">{blocks}</div>;
}

// ---- The panel --------------------------------------------------------------

export function CopilotPanel() {
  const copilot = useCopilot();
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  // Follow the answer as it is written, unless the person scrolled up to reread.
  const pinned = useRef(true);
  useEffect(() => {
    const el = scroller.current;
    if (el && pinned.current) el.scrollTop = el.scrollHeight;
  }, [copilot.messages, copilot.activity]);

  useEffect(() => {
    if (copilot.open) input.current?.focus();
  }, [copilot.open, copilot.attached]);

  const send = (text: string) => {
    pinned.current = true;
    ask(text);
    setDraft("");
  };

  const suggestions = copilot.attached
    ? ["Explain this post", "Summarize the replies", `Who is @${copilot.attached.author.handle}?`]
    : copilot.screen.suggestions;

  return (
    <aside className={`copilot ${copilot.open ? "open" : ""}`} aria-label="Copilot">
      <header className="copilot-head">
        <Icon name="spark" className="accent" />
        <h2>Copilot</h2>
        <span className="spacer" />
        {copilot.messages.length > 0 && <button className="ghost small" onClick={newConversation}>New chat</button>}
        <button className="ghost icon-button copilot-close" onClick={() => setCopilotOpen(false)} aria-label="Close copilot"><Icon name="close" /></button>
      </header>

      <div
        className="copilot-body"
        ref={scroller}
        onScroll={(e) => {
          const el = e.currentTarget;
          pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
        }}
      >
        {copilot.configured === false && (
          <div className="notice">
            <b>The copilot is not connected yet.</b>
            <p>It needs a Claude API key on the server. In the <code>app</code> folder, set <code>ANTHROPIC_API_KEY</code>, run <code>npm run setup</code> once, then restart <code>npm run dev</code>.</p>
          </div>
        )}
        {copilot.messages.length === 0 && (
          <div className="copilot-intro">
            <p>Ask about anything on Bluesky: a post, a person, a topic, or how something works. I look up live public data to answer.</p>
          </div>
        )}
        {copilot.messages.map((message, index) => {
          const last = index === copilot.messages.length - 1;
          if (message.role === "user") {
            return (
              <div key={message.id} className="bubble user">
                {message.about && <div className="about">{message.about}</div>}
                {message.text}
              </div>
            );
          }
          const waiting = last && copilot.busy;
          return (
            <div key={message.id} className={`bubble assistant ${message.error ? "error" : ""}`}>
              {message.text && <Markdown text={message.text} />}
              {waiting && (
                <div className="activity" role="status">
                  <span className="dots"><i /><i /><i /></span>
                  {copilot.activity || (message.text ? "" : "Thinking")}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="copilot-foot">
        {!copilot.busy && (copilot.messages.length === 0 || copilot.attached) && (
          <div className="suggestions">
            {suggestions.map((s) => <button key={s} className="chip" onClick={() => send(s)}>{s}</button>)}
          </div>
        )}
        {copilot.attached && (
          <div className="attached">
            <span>About a post by <b>@{copilot.attached.author.handle}</b>: “{copilot.attached.record.text.slice(0, 60) || "media"}{copilot.attached.record.text.length > 60 ? "…" : ""}”</span>
            <button className="ghost icon-button" onClick={detachPost} aria-label="Remove post"><Icon name="close" /></button>
          </div>
        )}
        <form
          className="copilot-form"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <textarea
            ref={input}
            value={draft}
            rows={1}
            maxLength={4000}
            placeholder="Ask about Bluesky…"
            aria-label="Your question"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send(draft);
              }
            }}
          />
          {copilot.busy ? (
            <button type="button" className="primary icon-button" onClick={stopAnswer} aria-label="Stop"><Icon name="stop" /></button>
          ) : (
            <button type="submit" className="primary icon-button" disabled={!draft.trim()} aria-label="Send"><Icon name="send" /></button>
          )}
        </form>
        <div className="fine-print">Reads public Bluesky data only. Answers can be wrong; open the linked posts to check.</div>
      </footer>
    </aside>
  );
}

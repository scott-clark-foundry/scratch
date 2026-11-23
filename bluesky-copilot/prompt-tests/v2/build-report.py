#!/usr/bin/env python3
"""Build report.html: one page for reading every test case, the copilot's answer, and its grades.

Usage: python3 build-report.py ROUND [ROUND ...]     for example: build-report.py r1 r2

For each round it reads runs/ROUND/<case id>.md (the copilot's report) and
judgments/ROUND/<case id>.md (the grader's report). It also reads
annotations.json, where the human reviewer records their own verdict, notes
and failure-mode labels per round and case.
"""
import glob
import html
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CHECKS = ["answers-the-question", "grounded", "used-what-was-attached", "calibrated", "fair-and-safe", "current", "to-the-point", "sourced-and-friendly", "useful-in-a-side-panel"]


def load_cases():
    cases = []
    for path in sorted(glob.glob(os.path.join(HERE, "cases-*.json"))):
        cases += json.load(open(path))
    return cases


def sections(path):
    """Split a report file into {heading: text}."""
    if not os.path.exists(path):
        return {}
    out, name = {}, None
    for line in open(path, encoding="utf-8").read().splitlines():
        match = re.match(r"^##\s+([A-Z-]+)\s*$", line)
        if match:
            name = match.group(1)
            out[name] = []
        elif name:
            out[name].append(line)
    return {key: "\n".join(value).strip() for key, value in out.items()}


def rich(text):
    """Escape text, then make links clickable and **bold** bold."""
    text = html.escape(text or "")
    text = re.sub(r"\[([^\]]+)\]\((https?://[^\s)]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', text)
    text = re.sub(r'(?<!href=")(https?://[^\s<)]+)', r'<a href="\1" target="_blank" rel="noopener">\1</a>', text)
    return re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)


def words(text):
    return len(re.sub(r"https?://\S+", "", text or "").split())


def main(rounds):
    cases = load_cases()
    notes_path = os.path.join(HERE, "annotations.json")
    notes = json.load(open(notes_path)) if os.path.exists(notes_path) else {}
    cards, summary = [], []

    for rnd in rounds:
        graded = passed = 0
        fails = {check: 0 for check in CHECKS}
        modes = {}
        for case in cases:
            run = sections(os.path.join(HERE, "runs", rnd, case["id"] + ".md"))
            if not run:
                continue
            judge = sections(os.path.join(HERE, "judgments", rnd, case["id"] + ".md"))
            mine = notes.get(rnd, {}).get(case["id"], {})
            verdict = (judge.get("VERDICT", "").split() or ["UNGRADED"])[0].upper()
            final = (mine.get("verdict") or verdict).upper()
            if final in ("PASS", "FAIL"):
                graded += 1
                passed += final == "PASS"
            checks = dict(re.findall(r"^([a-z-]+):\s*(PASS|FAIL|N/A)", judge.get("CHECKS", ""), re.M))
            for check, result in checks.items():
                if result == "FAIL" and check in fails:
                    fails[check] += 1
            for mode in mine.get("failure_modes", []):
                modes[mode] = modes.get(mode, 0) + 1

            context, _, question = case["message"].partition("</app_context>")
            chips = "".join(
                f'<span class="chip {checks.get(c, "na").lower().replace("/", "")}">{c}: {checks.get(c, "–")}</span>' for c in CHECKS
            )
            cards.append(f"""
<section class="card {final.lower()}" data-round="{rnd}" data-verdict="{final}" data-intent="{html.escape(case.get('intent', ''))}">
  <header><span class="badge {final.lower()}">{final}</span> <b>{html.escape(case['id'])}</b>
    <span class="muted">{html.escape(case.get('intent', ''))} · round {rnd} · {words(run.get('ANSWER'))} words</span></header>
  <div class="grid">
    <div>
      <h4>What the person typed</h4><p class="question">{rich(question.strip())}</p>
      <details><summary>What the app told the copilot</summary><pre>{html.escape(context.replace('<app_context>', '').strip())}</pre></details>
      <details><summary>Facts the scout verified</summary><p>{rich(case.get('grounding', ''))}</p></details>
      <h4>The copilot's answer</h4><div class="answer">{rich(run.get('ANSWER', ''))}</div>
      <details><summary>Steps it took</summary><pre>{rich(run.get('STEPS', ''))}</pre></details>
      <details><summary>Evidence it cited</summary><pre>{rich(run.get('EVIDENCE', ''))}</pre></details>
      <details><summary>Friction it reported</summary><pre>{rich(run.get('FRICTION', ''))}</pre></details>
    </div>
    <div>
      <h4>Grader</h4><div class="chips">{chips}</div>
      <p class="critique">{rich(judge.get('CRITIQUE', 'Not graded yet.'))}</p>
      <details><summary>What the grader verified</summary><pre>{rich(judge.get('WHAT-I-VERIFIED', ''))}</pre></details>
      <h4>Reviewer</h4>
      <p class="critique">{rich(mine.get('note', 'No reviewer note.'))}</p>
      <p>{''.join(f'<span class="chip mode">{html.escape(m)}</span>' for m in mine.get('failure_modes', []))}</p>
    </div>
  </div>
</section>""")
        if graded:
            rows = "".join(f"<tr><td>{c}</td><td>{n}</td></tr>" for c, n in fails.items())
            mode_rows = "".join(f"<tr><td>{html.escape(m)}</td><td>{n}</td></tr>" for m, n in sorted(modes.items(), key=lambda kv: -kv[1]))
            summary.append(f"""<div class="sum"><h3>Round {rnd}: {passed} of {graded} passed</h3>
<table><tr><th>Check failed (grader)</th><th>Cases</th></tr>{rows}</table>
{f'<table><tr><th>Failure mode (reviewer)</th><th>Cases</th></tr>{mode_rows}</table>' if mode_rows else ''}</div>""")

    page = f"""<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Copilot eval traces</title>
<style>
:root{{--bg:#fff;--soft:#f4f5f8;--text:#10141f;--muted:#5d667a;--border:#dfe3ea;--pass:#1d8a4f;--fail:#c62f3b;--accent:#4f5bd5}}
@media(prefers-color-scheme:dark){{:root{{--bg:#0f1218;--soft:#181c25;--text:#eceef3;--muted:#98a1b3;--border:#262c38;--pass:#3fc481;--fail:#f0717b;--accent:#8690f0}}}}
body{{margin:0;background:var(--bg);color:var(--text);font:15px/1.5 system-ui,sans-serif}}
main{{max-width:1200px;margin:0 auto;padding:16px}} a{{color:var(--accent)}} h1{{font-size:22px}} h4{{margin:14px 0 4px;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}}
.sums{{display:flex;gap:16px;flex-wrap:wrap}} .sum{{background:var(--soft);border-radius:12px;padding:12px 16px}} .sum h3{{margin:0 0 8px}}
table{{border-collapse:collapse;margin:6px 0;font-size:14px}} td,th{{text-align:left;padding:2px 14px 2px 0}}
.bar{{position:sticky;top:0;background:var(--bg);padding:10px 0;border-bottom:1px solid var(--border);display:flex;gap:8px;flex-wrap:wrap;z-index:2}}
select,input{{font:inherit;padding:6px 10px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text)}}
.card{{border:1px solid var(--border);border-left:5px solid var(--border);border-radius:12px;padding:12px 16px;margin:14px 0}}
.card.pass{{border-left-color:var(--pass)}} .card.fail{{border-left-color:var(--fail)}}
.grid{{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:24px}} @media(max-width:800px){{.grid{{grid-template-columns:1fr}}}}
.badge{{font-weight:700;font-size:12px;padding:2px 8px;border-radius:6px;background:var(--soft)}} .badge.pass{{color:var(--pass)}} .badge.fail{{color:var(--fail)}}
.muted{{color:var(--muted);font-size:13px;margin-left:6px}} .question{{font-size:17px;font-weight:600;margin:0}}
.answer{{white-space:pre-wrap;overflow-wrap:anywhere;background:var(--soft);border-radius:10px;padding:10px 12px;max-width:420px}}
.critique{{white-space:pre-wrap;overflow-wrap:anywhere}} pre{{white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px;background:var(--soft);padding:8px 10px;border-radius:8px}}
details{{margin:6px 0}} summary{{cursor:pointer;color:var(--muted)}}
.chip{{display:inline-block;font-size:12px;border:1px solid var(--border);border-radius:999px;padding:1px 8px;margin:2px 4px 2px 0}}
.chip.fail{{color:var(--fail);border-color:var(--fail)}} .chip.pass{{color:var(--pass)}} .chip.mode{{background:var(--soft)}}
</style>
<main>
<h1>Copilot eval traces</h1>
<p>Each card is one question a person might ask the copilot, grounded in a real Bluesky post or account. The answer box is as narrow as the copilot's panel. A grading agent verified each answer against live data; the reviewer's notes and failure-mode labels come from reading the traces by hand.</p>
<div class="sums">{''.join(summary)}</div>
<div class="bar">
  <select id="round"><option value="">All rounds</option>{''.join(f'<option>{r}</option>' for r in rounds)}</select>
  <select id="verdict"><option value="">Any verdict</option><option>PASS</option><option>FAIL</option><option>UNGRADED</option></select>
  <select id="intent"><option value="">Any question type</option>{''.join(f'<option>{html.escape(i)}</option>' for i in sorted({c.get('intent', '') for c in cases}))}</select>
  <input id="text" placeholder="Filter by text" size="24"><span class="muted" id="count"></span>
</div>
{''.join(cards)}
</main>
<script>
const cards=[...document.querySelectorAll('.card')],get=id=>document.getElementById(id);
function apply(){{let n=0;const r=get('round').value,v=get('verdict').value,i=get('intent').value,t=get('text').value.toLowerCase();
for(const c of cards){{const ok=(!r||c.dataset.round===r)&&(!v||c.dataset.verdict===v)&&(!i||c.dataset.intent===i)&&(!t||c.textContent.toLowerCase().includes(t));c.style.display=ok?'':'none';n+=ok}}
get('count').textContent=n+' shown'}}
['round','verdict','intent','text'].forEach(id=>get(id).addEventListener('input',apply));apply();
</script></html>"""
    out = os.path.join(HERE, "report.html")
    open(out, "w", encoding="utf-8").write(page)
    print(f"wrote {out} with {len(cards)} cards")


if __name__ == "__main__":
    main(sys.argv[1:] or ["r1"])

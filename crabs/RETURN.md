# RETURN: Crabs! — Bering Sea crab-fishing sandbox sim

| | |
|---|---|
| **Project** | crabs (Claude Code on the web, claude.ai/code, repo scott-clark-foundry/scratch) |
| **Paused on** | 2026-10-21 |
| **State** | Design phase. Research done, rules drafted, layer explainer built, model architecture settled. No sim code yet. Rule 1 of 20 reviewed. |
| **First action on return** | Resume the rule-by-rule review at Rule 2 in `crabs/docs/rules.md`, or say "go" to start coding the sim core. |
| **Time-sensitive** | none |

## 1. Situation: where it stands

We have a plan, two research write-ups with sources, a 20-rule behavior
list, and a published explainer of the simulation's layers over a real 5 km
square of Bristol Bay. The model architecture was settled in the last
conversation: continuous crab density on a 5 km world grid, with crab
materialized once per pot as "super crab" (agents) within about 200 m of
the pot, one shared movement rule for both levels, and tides modeled for
the whole Bering Sea. Everything is committed and pushed to `main`. No code
has been written.

## 2. Background: what the project is

A real-time sandbox game, Python logic with a pygame-ce window, where the
player sets crab pots in the Bering Sea and learns where the (hidden) red
king crab are from what the pots catch. The crab population follows rules
distilled from NOAA and ADF&G literature. The first species is Bristol Bay
red king crab. A dev view shows the hidden state. Later: a boat, money,
upgrades, snow crab. The repo is a scratchpad; this project lives in
`crabs/` and follows the repo's `CLAUDE.md` and the writing guidance in
`AGENTS.md`.

## 3. Assessment: decisions made and still open

- **Decided:** real but stylized Bering Sea; red king crab first; pure
  sandbox (no fail state); real-time with speed control; pots + haul + dev
  view for the MVP, no boat or money yet; sim core in numpy with no pygame
  imports, renderer separate; metric inside, metric or fathoms/nautical
  miles/°F/inches/pounds on screen; 100 m resolution around pots, 5 km
  elsewhere; crab density continuous at world level, materialized once per
  pot as super crab, overlaps not double-counted; one step-probability
  movement rule shared by both levels; tides for the whole sea from harmonic
  constants; depth from GEBCO now, AFSC 100 m grids later; research first,
  then code, with straightforward rules.
- **Decided on rules:** Rule 1 (seasonal depth target) approved. Rules
  13–15 revised from field data: catch keeps growing to 72 h, bait reach
  120–200 m, 60 m likely-catch zone.
- **Open:** Rules 2–20 not yet reviewed one by one. Materialized radius
  (200 m) vs. the 3-day catch growth: larger radius, or a slow draw from
  surrounding density? Tide source: NOAA station harmonics (recommended) or
  a gridded model? Number of crab classes (4 or 6). Sim start date
  (October 1 recommended, or April 1). Where screenshots go
  (`crabs/docs/shots/` recommended). The GitHub default branch is still the
  old `claude/amazing-goodall-cxan4s`; switch it to `main` in repo
  Settings, then the old branch can be deleted.

## 4. Next actions, in order

1. Continue the rule walk-through from Rule 2 in `crabs/docs/rules.md`
   (the user is going one rule at a time; Rule 1 is approved). Rules 1, 2
   and 6 still say "density flows"; reword to "crab step between cells".
2. Settle the four open MVP questions above.
3. Code M1, the sim core (`crabs/src/crabs/sim/`), per `crabs/PLAN.md`:
   world grid from GEBCO, tide layer, density movement, materialize super
   crab around pots, soak and haul, pytest for conservation and the soak
   curve.
4. Code M2, the pygame-ce renderer and MVP loop, with headless frame capture
   for screenshots.
5. On GitHub: set default branch to `main`, delete the old branch.

## 5. What to read

1. `crabs/PLAN.md` — decisions, model, milestones (current).
2. `crabs/docs/rules.md` — the 20 behavior rules, plain language.
3. `crabs/docs/crabbing.md` — one-page overview of how the fishery works.
4. `crabs/docs/layers/explainer.html` — the layer explainer; also published
   at https://claude.ai/artifact/GsjLBAFmQJXe4jZeHCJJpx (private, didn't
   render in the web Claude Code view; opens in a browser tab).
5. `crabs/docs/research.md` and `crabs/docs/research-bait.md` — sourced
   notes; reference, not required reading.
6. `crabs/docs/layers/make_layers.py` — regenerates the figures.

Nothing is superseded; the plan was edited in place.

## 6. Where everything lives

- **Tool and surface:** Claude Code on the web (claude.ai/code), session
  https://claude.ai/code/session_016ty1jdmGonCbFgHZuxT2xG
- **Account:** coastquest@clarkfoundry.com (as shown to this session)
- **Local path:** none, cloud only. The container checkout is
  `/home/user/scratch`; it is reclaimed when the session ends.
- **Git repo:** yes. https://github.com/scott-clark-foundry/scratch, branch
  `main`. Everything is committed and pushed as of this note.
- **Files:** all deliverables are in the repo under `crabs/`. Clone the repo
  to get a copy. The published explainer page is the artifact link above.

## 7. How to restart

Open the repo in Claude Code (desktop app, CLI, or claude.ai/code), make
sure you're on `main`, and start with:

"Read crabs/RETURN.md and crabs/PLAN.md. Let's continue the rule review at
Rule 2 in crabs/docs/rules.md."

or, to skip ahead to code:

"Read crabs/RETURN.md and crabs/PLAN.md. Approve the rules as written and
start milestone M1, the sim core."

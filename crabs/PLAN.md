# Crabs! — Plan

## What it is

A real-time sandbox sim of the Bristol Bay red king crab fishery. The crab
population is hidden state; the player learns it indirectly by fishing. A dev
view shows everything.

Decisions so far:

| Topic | Decision |
|---|---|
| Setting | Real Bering Sea, lightly stylized. Coarse map, not a chart. |
| Species (MVP) | Red king crab, Bristol Bay stock. Snow crab and tanner later. |
| Population model | 2D density fields on a grid (cells of a few km) by sex and size class; movement via vector fields derived from depth, bottom temperature, season. Behavior rules from literature, kept simple and tunable. |
| Time | Real-time with speed control (pause / 1x / 10x / 100x). Seasons roll by. |
| Player loop (MVP) | Drop pots, choose bait and soak time, haul, see catch by sex/size. No boat or money yet. |
| Fail state | None. Pure sandbox; score is total catch. |
| Visuals | pygame-ce window. Heatmaps, currents and temperature in dev view. |
| Architecture | `crabs/sim` is pure numpy, no pygame, tested headless with pytest. `crabs/ui` is a thin pygame-ce renderer on top. |
| Research | Literature pass first; model rules written up in `docs/` with sources before code. |

## The model (sketch — refined after research)

The sea is a grid. Per cell we store static fields and dynamic fields.

Static (from data or hand-drawn for now):
- depth
- substrate type
- distance to shore

Dynamic:
- bottom temperature (seasonal cycle, with a cold-pool blob)
- current vector (tidal + mean flow)
- crab density per **sex × size class** (e.g. juvenile / sublegal male / legal male / mature female)
- food availability (crab prey), optional in MVP

Each tick the density fields:
1. **Drift** along a preference gradient: each class has a preferred depth and
   temperature that changes with month (inshore to molt/mate in spring, offshore
   to feed in summer/fall). Movement speed capped at a literature-derived km/day.
2. **Diffuse** a little (random walk).
3. **Age/grow** on molt events; **die** at a natural mortality rate; **recruit**
   seasonally.

Pots sample density locally. Catch per haul depends on:
- local density of each class
- soak time (saturating curve)
- bait: type, amount, freshness, combination; bait plume stretched along the
  current
- netting color (a tunable multiplier; the literature will say whether it's real)
- time of day, tide phase, moon phase (modifiers, each individually toggleable in
  dev view so we can see their effect)
- legal rules applied at haul: females and sublegal males go back

Every modifier is a named, tunable parameter so the dev view can expose it and
we can see its effect on the catch directly.

## Variables we want to end up supporting

From the brief: time of year, time of day, moon and tide cycles, ice edge, bait
kind/freshness/combination/amount, bait-plume movement, tides, weather,
predators, natural food, mating drive, body size, netting color. MVP implements
the subset the literature supports and stubs the rest as parameters.

## Milestones

### M0 — Research (this session, first)
- Literature pass on BBRKC movement, annual cycle, population structure,
  catchability, bait, pot design. Written up in `docs/research.md` with sources.
- Distill into `docs/rules.md`: 8–15 straightforward behavior rules, each tagged
  strong / moderate / speculative. **Review together before coding.**

### M1 — Sim core (this session)
- Grid world with static fields (hand-drawn coarse Bristol Bay bathymetry).
- Seasonal temperature and current fields.
- Density fields by class; drift/diffuse/mortality/recruitment.
- Pot model: place, soak, haul → catch sample.
- pytest coverage of conservation, migration direction by month, soak curve.

### M2 — Renderer and MVP loop (this session)
- pygame-ce window: map, pots, HUD, speed controls.
- Click to drop a pot; pick bait and soak; haul; see catch breakdown.
- Dev view toggle: density heatmaps per class, temperature, currents, modifiers.
- Headless frame capture so screenshots/GIFs can be produced in CI or the cloud.

### M3+ — Later
- Boat, fuel, travel time, port (Dutch Harbor), market and money.
- Upgrades: more/bigger pots, better bait, navigation, hints.
- Snow crab and tanner crab with their own movement models.
- Weather, ice edge, predators, food.
- Beauty pass on visuals.

## Layout

```
crabs/
  README.md
  PLAN.md
  pyproject.toml
  docs/
    research.md     # literature notes with sources
    rules.md        # the distilled behavior rules the sim implements
  src/crabs/
    sim/            # pure numpy: world, fields, population, pots
    ui/             # pygame-ce renderer, input, dev view
    __main__.py
  tests/
```

## Open questions

- How coarse can the grid be and still feel right? Start ~10 km cells, tune.
- Real bathymetry data vs. hand-drawn: start hand-drawn, swap in GEBCO later.
- Is netting color actually documented anywhere? Treat as speculative until shown.

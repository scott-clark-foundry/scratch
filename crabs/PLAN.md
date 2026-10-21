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
| Population model | **Hybrid.** World level: crab density per 5 km cell by class, continuous, updated daily. Near gear: when a pot is set, the crab the distribution says are within its area are materialized once as super crab (an agent standing for a few crab), updated hourly; cells already materialized by an overlapping pot are not materialized again. One movement rule, "probability of stepping to each neighbouring cell from the local vector field," runs as fractions at world level and as coin flips per super crab near pots. Environment layers (depth, temperature, current, scent) are snapshotted from the world sim. |
| Tides | Modeled for the whole Bering Sea, not just Bristol Bay: water level and current per cell per hour from harmonic constants (NOAA stations interpolated; a gridded tidal model later). |
| Time | Real-time with speed control (pause / 1x / 10x / 100x). Seasons roll by. |
| Player loop (MVP) | Drop pots, choose bait and soak time, haul, see catch by sex/size. No boat or money yet. |
| Fail state | None. Pure sandbox; score is total catch. |
| Visuals | pygame-ce window. Heatmaps, currents and temperature in dev view. |
| Architecture | `crabs/sim` is pure numpy, no pygame, tested headless with pytest. `crabs/ui` is a thin pygame-ce renderer on top. |
| Units | The sim computes in metric (meters, km, °C, mm, kg). The screen shows either metric or the units crabbers use: fathoms for depth, nautical miles for distance, °F, inches for crab width, pounds for weight. A settings toggle switches; the renderer converts at display time only. |
| Research | Literature pass first; model rules written up in `docs/` with sources before code. |

## Resolution: coarse everywhere, fine where it matters

Crabbers set pots as close as 1/10 mile (160 m) apart, so the sim needs
100 m cells around pots. But 100 m cells across all of Bristol Bay is 16
million cells, too many to update every tick in Python. So we use two
layers, an approach weather models call adaptive mesh refinement:

- **Ocean grid (~5 km cells, about 6,400 cells).** Runs everywhere, every
  tick. Migration, mortality, growth, and recruitment live here.
- **Fine patches (100 m cells).** Created around each pot string or sensor,
  reaching a few hundred metres past the outermost pot (bait pulls crab from
  about 120–200 m, so beyond that the fine detail does nothing). The coarse cell's crab are split among the fine cells by
  the 100 m depth map plus seeded random texture, so a spot looks the same
  each time it's refined. Crab move at fine scale toward bait and with the
  current. Fine patches tick hourly; the ocean grid ticks daily. When the
  last pot leaves a patch, its fine cells are summed back into the coarse
  cell and the patch is dropped.

The total crab in a patch always equals what its coarse cells would hold, so
nothing is created or lost by refining. Each layer ticks as fast as its
fastest input: density in a patch is hourly because the bait plume is hourly,
not because the habitat score is.

## The model

### Environment: grid layers the crab read

The sea is a grid. Per cell we store static fields and dynamic fields. The
worked example in `docs/layers/` shows each one over a real 5 km square.

Static (from data or hand-drawn for now):
- depth (100 m)
- slope and substrate (100 m; substrate synthetic until we find data)
- distance to shore

Dynamic:
- bottom temperature (one value per 5 km cell, daily; seasonal cycle plus a
  cold-pool blob)
- water level and current vector (1–5 km, hourly; tidal, from harmonic
  constants covering the whole Bering Sea, strength following the moon)
- bait plume per pot (100 m, hourly; stretched downstream by the current)
- habitat score per crab class (daily; depth preference × temperature
  preference × substrate bonus)
- live-cell mask per class (which cells a crab may step into)

### Crab: continuous in the world, materialized around pots

**World level.** Each 5 km cell holds a count of crab per class (juvenile,
sublegal male, legal male, mature female) as a continuous quantity. Once a
day, each cell's crab are split among the cell and its neighbours by the
movement rule below; mortality, molting and recruitment apply as rates.
This runs everywhere, all the time, and is the source of truth away from
gear.

**Around pots.** When a pot is set, the sim takes the world distribution
for the cells within the pot's area (a radius of about 200 m, generous
enough to allow for better bait later) and materializes it once into super
crab: agents that each stand for a few crab, with position, sex, size and
state. Those crab are subtracted from the world density. If a neighbouring
pot has already materialized some of the same cells, those cells are
skipped, so nothing is counted twice. The environment the super crab
react to (depth, temperature, current, scent, food) is snapshotted from the
world layers and refreshed as they change.

Every hour each super crab applies the movement rule on 100 m cells (a crab
walks about one cell per hour), smells bait if it is inside a plume, walks
toward the pot, and rolls to enter. When the pot is hauled, the catch is
removed and the remaining super crab fold back into world density. Counts
are exact throughout.

**One movement rule for both levels.** For a crab in a cell, the probability
of stepping to each neighbouring cell (or staying) comes from the vector
field at that cell: habitat-score gradient (daily, from depth, temperature,
substrate, season), scent gradient (hourly, inside plumes), and a nudge from
current. At world level the same probabilities move fractions of the cell's
count; around pots they are coin flips per super crab. The density field is
the expected value of the per-crab rule, so the two levels can't disagree.

Crab density on the dev view is the world field plus the super crab per
cell around pots.

Open: how catch keeps growing over a 3-day soak if the materialized area is
only 200 m. Options are a larger materialized radius, or letting the pot
draw from the surrounding world density at a slow rate. Decide when the
first soak-curve test runs.

### Pots

A pot samples the crab that reach it, as above. Catch at haul depends on:
- which crab walked in during the soak (so soak time, local crab count, and
  bait reach set the catch)
- bait: type, amount, freshness, combination; plume shape from the current
- netting color (a tunable multiplier; literature says no effect)
- time of day, tide phase, moon phase (modifiers, each individually
  toggleable in dev view so we can see their effect)
- legal rules applied at haul: females and sublegal males go back as agents
  at the pot's location

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

### M1 — Sim core
- Grid world with static layers (GEBCO depth for Bristol Bay).
- Seasonal temperature and tidal current layers.
- World density by class; daily step-probability movement; mortality; molt;
  recruitment.
- Around pots: materialize super crab from density once per pot (skip
  overlaps), hourly movement, fold back on haul.
- Pot model: place, soak, scent plume from current, enter roll, haul → catch.
- pytest coverage: counts conserved through materialize/fold-back, migration
  direction by month, soak curve matches Pengilly & Tracy ratios, world
  density matches the average of many agent runs on the same rule.

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

- Ocean grid cell size: start ~5 km, tune.
- Bathymetry (depth map) source. Decided: start with GEBCO (global grid,
  ~450 m cells, free, easy download). For the beauty pass, swap in the AFSC
  Zimmermann & Prescott smooth-sheet grids (100 m, what NOAA crab scientists
  use). Finer data (1–8 m NOAA hydrographic surveys, BlueTopo) exists only in
  surveyed strips near ports and lanes, and our sim cells are 1–10 km anyway.
- Is netting color actually documented anywhere? Treat as speculative until shown.

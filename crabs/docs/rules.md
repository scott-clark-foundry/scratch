# Behavior rules the sim implements

Distilled from [research.md](research.md). Each rule is tagged by how well the
literature supports it: **strong**, **moderate**, or **speculative**. Every
number here is a starting value and a named parameter in the sim, so it can be
tuned (or toggled off) from the dev view.

The population is four classes, each a density field on the grid:

| Class | Definition | Notes |
|---|---|---|
| `juvenile` | <90 mm CL, both sexes | Nursery-bound, pods |
| `sublegal_male` | 90–134 mm CL | Caught and discarded |
| `legal_male` | ≥135 mm CL | The only keepable crab |
| `mature_female` | ≥90 mm CL | Caught and discarded; drives recruitment |

## Movement

**R1. Seasonal depth target** — *strong*
Each class has a preferred depth that changes over the year. Density flows
downhill on a "habitat score" built from depth and temperature.
- Mature males and females: 25–50 m from February through May (molt/mate
  inshore); 50–100 m from July through January (feed offshore). Transitions
  ramp over ~6 weeks (Jun, late Jan).
- Juveniles: <50 m all year.

**R2. Movement speed** — *moderate*
Adult density advects at mean 0.8 km/day, capped near 2.5 km/day. Net
seasonal displacement works out to 50–100 km, matching tag data.

**R3. Temperature preference** — *strong (females), moderate (males)*
Habitat score peaks at 2–4 °C bottom temperature.
- Mature females: strong penalty below 2 °C (they avoid the cold pool).
- Mature males: mild penalty above 4 °C.

**R4. Warm year vs. cold year autumn grounds** — *strong*
Emerges from R1 + R3 rather than being scripted: in warm years the autumn
male hot spot is central Bristol Bay (~56.5° N, 163° W); in cold years it is a
band 30–60 km off the Alaska Peninsula. The sim gets a "year warmth" knob that
shifts the temperature field; we check that this hot-spot swap falls out.

**R5. Females are stickier** — *moderate*
Female diffusion and advection speed are ~0.5× male. Females stay closer to
where they were.

**R6. Random spread** — *strong (as a modeling choice)*
A small diffusion term on every class, so density never collapses to a point
and patches blur over weeks. Juveniles get *less* diffusion plus a clumping
term to stand in for podding (*moderate*).

**R7. Boundaries** — *strong*
Crab do not cross onto land, west of ~165° W, or deeper than ~120 m. The
southwest bay (north of Unimak Pass) starts near-empty.

## Life cycle

**R8. Molt / mate / hatch timing** — *strong*
Centered on early May. Delayed 2–4 weeks when spring bottom temperature is
below 2 °C. (MVP: timing only matters for the recruitment pulse and for a
future "soft-shell" catch quality flag.)

**R9. Growth by molting** — *moderate*
Once a year, a fraction of each class steps up: juveniles → sublegal males
or mature females (50/50), sublegal → legal with probability ~0.5/yr (stands
in for the inverse-logistic molt probability and 12–15 mm increments).

**R10. Natural mortality** — *strong*
Continuous mortality 0.23/yr for males, 0.26/yr for females, applied every
tick. Optional spring bump of 1–4% on females at 30–100 m for cod predation
(*moderate*).

**R11. Recruitment** — *moderate*
Each summer, 5–15 million new juveniles appear in nursery cells (<50 m along
the Port Moller – Kvichak – Togiak nearshore), scaled by last spring's mature
female abundance with high random variance and occasional near-zero years.

**R12. Starting abundance** — *strong*
Seed the world at roughly today's stock: ~7 M legal males, ~2–3 M sublegal
males, ~15 M mature females, ~10 M juveniles, placed by R1/R3 habitat score.

## Pots and catch

**R13. Catch per pot** — *moderate*
A pot samples the crab within its bait-plume footprint. Expected catch of a
class = local density × effective area × soak factor × bait factor ×
modifiers. Soak factor = 1 − e^(−t/20 h), near saturation by 48 h. Cap total
crab per pot around 60 (pot saturation).
- Sublegal:legal ratio declines with longer soaks (larger males stay, small
  ones leave): soak factor for sublegals and females saturates earlier and
  then decays slightly.

**R14. Bait** — *moderate (ranking), speculative (numbers)*
Bait type sets the attraction multiplier: herring 1.0, cod 0.9, squid 0.6,
none 0.15. Amount scales footprint radius with diminishing returns (2 bags ≈
1.3× one bag). Freshness decays attraction over 24–48 h in the water.
Combinations take the max type bonus plus a small mixing bonus.

**R15. Bait plume follows current** — *moderate*
The footprint is an ellipse stretched downstream along the local current
vector (crab approach from downstream). Tide phase rotates the current, so
the plume swings with the tide.

**R16. Entrance inefficiency** — *strong (lab)*
Only ~8% of crab that find the pot get in. This is folded into "effective
area"; exposed as a parameter.

**R17. Legal rules at haul** — *strong*
Keep legal males only. Females and sublegals are counted and returned (they
go back into the local density field). Season is Oct 15 – Jan 15; the MVP
sandbox lets you fish any time but shows the season status.

## Explicitly cosmetic / no-evidence (toggleable so you can see they do nothing)

**R18. Netting color** — *speculative / no evidence for king crab*
Default multiplier 1.0 for every color. Exposed as a knob so you can see
what it would do if it did matter.

**R19. Time of day** — *speculative*
No adult diel catch effect in the literature. Juveniles are nocturnally
active, so juvenile catch gets a gentle night boost; adults get none.

**R20. Moon phase** — *no evidence*
Cosmetic only in MVP: it drives tide amplitude (spring/neap), which feeds R15.

## How the brief's variables map

| Variable from the brief | Where it lives |
|---|---|
| Time of year | R1, R8, R11, R17 |
| Time of day | R19 |
| Moon and tide cycles | R20 → R15 |
| Ice edge | Not modeled; it acts through temperature (R3) |
| Bait kind / freshness / combination / amount | R14 |
| Bait plume movement | R15 |
| Tides | R15, R20 |
| Weather | Not in MVP (later: fleet access, not crab behavior) |
| Predators | R10 (female spring mortality) |
| Natural food | Diffuse offshore pull in R1; not mapped |
| Sexual desire | Inshore spring migration, R1/R8 |
| Body size | Four size/sex classes |
| Netting color | R18 |

## Open questions for review

1. Four classes enough for MVP, or split sublegal males into two bins so
   growth into legal size is visible over a couple of years?
2. Pot cap of ~60 and τ = 20 h — fine as starting values?
3. Treat the SW bay as empty (today) or seed it lightly for gameplay?
4. Should the MVP calendar start in October (fishing season, instant
   gratification) or in spring (watch the migration first)?

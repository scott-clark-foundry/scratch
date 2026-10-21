# How the crabs behave: the rules the sim follows

This is the list of behaviors the simulation will implement for Bristol Bay red
king crab. Each rule comes from the literature summarized in
[research.md](research.md). The tag after each rule says how well the evidence
supports it:

- **strong** — several studies or decades of survey data agree
- **moderate** — one good study, or a well-reasoned inference from survey patterns
- **speculative** — a plausible guess; no direct evidence for king crab

Every number below is a starting value and will be a named setting in the game,
so we can change it from the developer view and watch what happens.

Depths are given in meters with fathoms in parentheses (1 fathom = 1.83 m).
Crab sizes are carapace length in millimeters, which is how the science
measures them; the game can show carapace width in inches, which is how the
fishery measures them (legal size is 135 mm length ≈ 6.5 in width).

## How the sim represents crab

The sea is a grid of cells, each a few kilometers across. Instead of tracking
millions of individual crab, each cell stores *how many crab of each kind* are
in it. We call that number the cell's **density**. Movement means density
flowing from one cell to its neighbors.

There are four kinds of crab, chosen because they matter differently to a pot:

| Kind | Who it is | Why it's its own group |
|---|---|---|
| **Juveniles** | Under 90 mm, either sex | Live in shallow nurseries; rarely in pots |
| **Sublegal males** | 90–134 mm | Enter pots but must be thrown back |
| **Legal males** | 135 mm and up | The only crab you can keep |
| **Mature females** | 90 mm and up | Enter pots, must be thrown back; produce next year's crab |

## Where crab go

**Rule 1. Crab move to a preferred depth, and that depth changes with the
season.** — *strong*
Adults spend February through May in shallow water, 25–50 m (14–27 fathoms),
where they molt and mate. From July through January they live deeper, 50–100 m
(27–55 fathoms), where they feed. The shift each way takes about six weeks
(June, and again late January). Juveniles stay shallower than 50 m all year.
In the sim, each cell gets a "how good is this spot" score from its depth, and
density flows toward better-scoring neighbors.

**Rule 2. Crab walk about 0.8 km per day.** — *moderate*
Tagged males in Bristol Bay averaged 0.83 km/day (about 0.45 nautical miles),
ranging from almost nothing up to 2.5 km/day. Over a season that adds up to a
50–100 km (27–54 nmi) move from the spring grounds to the autumn grounds. The
sim caps how fast density can flow between cells to match.

**Rule 3. Crab prefer bottom water between 2 and 4 °C (36–39 °F).** — *strong
for females, moderate for males*
Mature females strongly avoid water colder than 2 °C, which in the Bering Sea
means avoiding the "cold pool," a blob of near-freezing bottom water left over
from winter sea ice. Mature males mildly avoid water warmer than 4 °C. In the
sim, temperature adds to the same "how good is this spot" score as depth.

**Rule 4. Warm years and cold years put the autumn crab in different places.**
— *strong*
Twelve years of fishing logs show the autumn concentration of legal males sits
in central Bristol Bay in warm years and in a band 30–60 km off the Alaska
Peninsula in cold years. We won't script this. It should emerge from rules 1
and 3 once we give the sim a "how warm is this year" setting that reshapes the
temperature map. If it doesn't emerge, something is wrong with the model.

**Rule 5. Females stay closer to home than males.** — *moderate*
Pot-survey and bycatch patterns suggest females move about half as far as
males over a season. The sim gives females half the male walking speed and
half the random spread (rule 6).

**Rule 6. Crab spread out a little at random.** — *strong as a modeling
choice*
Every kind of crab drifts randomly a small amount each day, so a dense patch
blurs over weeks rather than staying a sharp point. Juveniles get less random
spread plus a tendency to clump, standing in for "podding," where thousands of
young crab pile together by day and spread out to feed at night (*moderate*;
documented at Kodiak, assumed similar in Bristol Bay).

**Rule 7. Crab stay within the known range.** — *strong*
Density can't flow onto land, west of about 165° W, or into water deeper than
about 120 m (66 fathoms). The southwest corner of the bay, north of Unimak
Pass, starts almost empty because that's where the crab are today, though it
was a major female area before 1977.

## How the population changes over the years

**Rule 8. Molting, mating, and egg hatching center on early May.** — *strong*
A cold spring, with bottom water below 2 °C, pushes the whole cycle back two to
four weeks. In the MVP the timing matters only for when new juveniles appear
(rule 11). Later it could flag soft-shell crab, which are worth less.

**Rule 9. Once a year, some crab grow into the next size group.** — *moderate*
After the molt, juveniles become either sublegal males or mature females,
half and half. About half the sublegal males cross into legal size each year.
This stands in for the detailed molting tables in the stock assessment, which
I couldn't fully retrieve.

**Rule 10. Crab die at a steady background rate.** — *strong*
About 23% of males and 26% of females die each year from natural causes,
applied a little every tick. Optionally, females at 30–100 m depth lose an
extra 1–4% in spring, when Pacific cod eat soft-shell females (*moderate*).

**Rule 11. New juveniles appear each summer in the nurseries.** — *moderate*
Between 5 and 15 million new juveniles show up in shallow cells (under 50 m)
along the nearshore strip from Port Moller through the Kvichak River mouth to
Togiak. How many depends on how many mature females there were in spring,
with a lot of randomness and an occasional near-zero year, which matches the
real stock's boom-and-bust history.

**Rule 12. The game starts at about today's population.** — *strong*
Roughly 7 million legal males, 2–3 million sublegal males, 15 million mature
females, and 10 million juveniles, placed where rules 1 and 3 say they should
be for the start date.

## What a pot catches

**Rule 13. A pot catches a share of the crab nearby, and keeps catching for
days.** — *strong for the soak curve (Bristol Bay field data), moderate for
the rest*
Expected catch of each kind = how many of that kind are in the pot's bait
footprint × how much of that footprint the pot effectively covers × a soak
factor × a bait factor × any modifiers. The soak curve comes from a Bristol
Bay experiment (Pengilly & Tracy 1998): legal males per pot averaged 8.7 at
12 hours, 10.5 at 24 hours, and 21.9 at 72 hours. So the first day's catch
is mostly crab that were already within scent range; after that the pot
keeps filling as crab wander into the plume. Catch at three days is about
twice the catch at one day. A pot holds about 60 crab at most. Longer soaks
shift the mix toward legal males (nonlegal catch rose only 20.1 → 28.6 over
the same soaks), because small males and females tend to wander back out
while big males stay.

**Rule 14. Bait type, amount, and freshness change how many crab come.** —
*moderate for the ranking, speculative for the exact numbers*
Herring works best (multiplier 1.0), then cod (0.9), then squid (0.6). An
unbaited pot still catches a few (0.15). More bait widens the footprint with
diminishing returns: two bags draw about 1.3× one bag. Bait loses its pull over
24–48 hours in the water. Mixing bait types takes the best type's bonus plus a
small extra.

**Rule 15. The bait scent drifts with the current, so the pot's footprint is
an oval pointing downstream.** — *moderate*
Lab and underwater video show crab approach pots from downstream, following
the scent, and search a sector about 135° wide around the downstream
direction. The sim stretches the footprint along the local current: faster
current means a longer, narrower plume. Because tides swing the current back
and forth, the footprint swings too. A crab walking toward bait moves 1–3 m
per minute, so one 120 m away arrives in an hour or two.

**Rule 16. Most crab that find a pot don't get in.** — *strong in the lab*
Only about 8% of approaches end with a crab inside. The sim folds this into
"how much of the footprint the pot covers" in rule 13, and shows it as its
own setting.

**Rule 17. At haul, you keep legal males and return everything else.** —
*strong*
Females and sublegal males are counted, then put back into the cell they came
from. The real season runs October 15 to January 15. The sandbox lets you fish
any time but shows whether the season is open.

## Things we'll show as settings even though the evidence says they do nothing

These are included so you can flip them on and watch the catch not change — or
change, if we later decide the game is more fun that way.

**Rule 18. Netting color.** — *speculative; no king crab study exists*
Every color starts at multiplier 1.0. The closest evidence is a small effect on
blue crab in Chesapeake Bay.

**Rule 19. Time of day.** — *speculative*
Nothing in the literature shows adult king crab catch changing by time of day.
Juveniles are active at night, so juvenile catch gets a gentle night boost;
adults get none.

**Rule 20. Moon phase.** — *no evidence of a direct effect*
The moon drives tide strength (spring tides near full and new moon, neap tides
in between), and tide strength feeds the current in rule 15. That's its only
effect in the MVP.

## Where the variables from the brief ended up

| Variable | Rule(s) |
|---|---|
| Time of year | 1, 8, 11, 17 |
| Time of day | 19 |
| Moon and tide cycles | 20, feeding 15 |
| Ice edge | Not modeled directly; it acts through cold water in rule 3 |
| Bait kind, freshness, combination, amount | 14 |
| Movement of the bait cloud | 15 |
| Tides | 15, 20 |
| Weather | Not in MVP. Later it would limit when the boat can fish, not where crab go |
| Predators | 10 (cod eating soft-shell females) |
| Crab's natural food | Not mapped. The offshore pull in rule 1 stands in for "going to feed" |
| Mating drive | The spring inshore move in rules 1 and 8 |
| Body size | The four kinds of crab |
| Netting color | 18 |

## Questions to settle before coding

1. Are four kinds of crab enough for the MVP, or should we split males into
   more size groups so you can watch a year class grow into legal size?
2. Are the pot cap (about 60 crab) and the soak curve (levels off by 48 h)
   fine as starting values?
3. Should the southwest bay start empty, as it is today, or lightly seeded so
   there's something to find there?
4. Should the clock start October 1, two weeks before the season opens, so
   pots pay off right away? Or April 1, so you watch the spring migration
   first?

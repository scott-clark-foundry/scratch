# How Bering Sea crabbing works, in one page

A step-back look at the activity the game is about, so the sim and the game
loop are built around what crabbers actually do. Numbers marked with a
source come from [research.md](research.md) or
[research-bait.md](research-bait.md). The rest is general knowledge of the
fishery and should be checked before it drives a game number.

## The season

Bristol Bay red king crab opens October 15 and closes January 15
(research.md). Since 2005 each boat holds a quota share (IFQ), so there is
no race; a boat fishes its share at its own pace, and most of the fleet's
catch lands in the first few weeks. The 2025/26 total allowable catch is
2.68 million pounds, a small fraction of the 1980 peak of 130 million
(research.md). Snow crab opens later in winter and runs into spring; a boat
with both quotas moves from one to the other.

## The boat and crew

A Bering Sea crab boat is 100–150 feet, steel, with a large open deck for
stacking pots, a hydraulic crane and a "launcher" that tips pots over the
rail. Below deck are circulating-seawater tanks that keep the catch alive
until delivery. Crew is typically a captain, an engineer, and three to five
deckhands paid in shares of the trip's value after fuel, bait, and food.

## The gear

A pot is a steel frame about 7 × 7 × 3 feet (213 × 213 × 86 cm) wrapped in
mesh, weighing around 700 pounds (research.md has the exact dimensions).
Two tunnels lead in; a required escape panel with cotton twine rots away if
the pot is lost. Each pot has a line and a buoy on the surface. There is no
pot limit in Bristol Bay (research.md); boats carry 150–250 pots, limited by
deck space and stability.

Pots are set in **strings**: a line of pots dropped one after another along
a course, typically a few hundred metres to a few miles apart depending on
the captain. Setting them close (1/10 mile) concentrates effort on a known
hot spot; setting them wide covers more ground when prospecting.

## Bait

Each pot gets a **bait jar**, a perforated container of chopped herring,
plus **hanging bait**, a whole cod or several herring hung in the pot
(research.md). Herring is the standard; cod lasts longer. Scent release
drops about 40% in the first hour and fades over 1–2 days (research-bait.md),
so a pot left long is fishing on a weak bait. Boats carry tons of frozen bait
and may fish cod pots for fresh bait.

## Finding crab

Captains don't see crab. They work from: last year's grounds, the depth and
bottom temperature on their sounders, what other boats are doing, and
**test strings**: a short string set and hauled quickly to see what's there.
Then they move pots toward what's working. The whole fishery is hidden
information updated by sampling, which is the game.

The real grounds move: in warm years the autumn concentration is in central
Bristol Bay, in cold years it's a band along the Alaska Peninsula
(research.md). Depth 50–100 m (27–55 fathoms) in autumn.

## The soak and the haul

A set pot **soaks** for one to three days; the fleet average is about 64
hours (research.md). Then the boat runs the string: hook the buoy, the
hydraulic block hauls the line, the pot comes over the rail onto a sorting
table. The crew **sorts** in seconds: legal males (6.5 in carapace width,
135 mm length) go into the tank; females and small males go back over the
side. Historically about two-thirds of what comes up is thrown back
(research.md). The pot is rebaited and either re-set on the spot or stacked
to move.

Catch per pot in recent seasons: 20–30 legal crab per lift (research.md).
The Bristol Bay soak experiment got 8.7 legal males at 12 hours, 10.5 at 24,
and 21.9 at 72 (research-bait.md).

## Delivery and money

When the tanks are full or the quota is caught, the boat runs to a
processor at Dutch Harbor, Akutan, or King Cove. Crab are sold live by the
pound; crab that die in the tank ("deadloss") are worth nothing, which is
why tank conditions matter. Price per pound is set by negotiation with
processors each season and has been in the high single digits to low tens
of dollars in recent years (check before using).

Costs that a game would model: fuel (the biggest), bait, crew shares, pot
loss, and the quota itself, which can be leased.

## Weather

October to January in the Bering Sea means gales, 30-foot seas, and
freezing spray that ices the boat and pots. Weather stops fishing for days
at a time and decides when a string can be hauled, so a sim's weather layer
mostly limits the boat, not the crab.

## What this means for the game loop

1. Choose where to set, with partial information (depth, temperature, last
   year, test strings).
2. Choose string layout and spacing, bait type and amount.
3. Choose soak time against weather and tank space.
4. Haul, sort, see what the pot says, and move or stay.
5. Deliver when full, pay costs, buy upgrades (more pots, better bait, a
   bigger boat, better sensors).

The sim's job is to make step 4 honest: the pot's catch has to reflect the
hidden crab distribution, the bait, the soak, and the current, so that a
player who reads the catch well finds crab.

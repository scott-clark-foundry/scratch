# Particles — working design

**[Open the browser view](index.html).** In VS Code, right-click `index.html` → **Open with Live Server**.

This is the single working document. `index.html` is its reading copy. Revise these two files in place as our thinking changes; do not create another proposal, brief, guide, or navigation layer for each iteration.

## Where we are

We are designing a relatively short game for Steam at around $9.99, with mobile potentially later. **The setting is still undecided.** Simple vector graphics should carry the experience.

What matters about crabbing is sampling a world you cannot directly see, interpreting the return, revising a plan, and improving a process under limited resources. The economy supplies constraints and a reason to act. Unlimited wealth or extraction is not the purpose. Collection should feel good, or at least not bad, and the game needs an earned stopping point.

The world-creation, circuit, and civilization-harvesting directions were explorations, not requirements. We can reuse a useful mechanic without carrying its old fiction forward.

**Current work:** explain the design principles through recognizable situations in actual games, then use them to choose what our game should be. The metaphor illustrations were rejected. Replacement illustrations are still pending; the examples below are their revised starting point.

## The experience we are trying to create

“I want this → something prevents it → I discover a relationship → I make a change → I see what happens.”

Then let **“I caught it”** land. The next intention might be:

- **What does this tell me?** I can investigate with a better explanation.
- **Could I do it better?** I can improve a process that already works.
- **What can I do with it?** I can pursue a different activity or project.
- **That is enough.** I have fulfilled the purpose.

These are useful questions, not four mandatory loops. Cook's interaction model and Koster's progression distinction give us two views of the same play: **how I handle this situation**, and **where the result lets me go next**. Sometimes the activity is enjoyable enough to repeat without a revelation or upgrade.

At the larger scale, ask: **What do I want? What counts as better? What constrains me? What counts as enough?** “Better” may mean money, reliability, traffic flow, or personal creative satisfaction. It need not be a score the game calculates. Purpose explains why improving it matters.

## Principles to use

These are working design judgments, not universal scientific laws. “Required” means required for the goal-directed, finite experience we are trying to make.

### Required for this game

1. **Give me a reason to begin.** Show a desirable possibility before asking me to collect more: a useful job, a mystery, something to make my own, or a challenge I want to attempt.
2. **Let my actions matter.** Give choices or execution a consequential role. Time, space, effort, uncertainty, and limited tools can make different approaches worthwhile.
3. **Let me read what happened.** A return should give enough evidence to improve an expectation. Hidden information can create investigation; arbitrary feedback cannot.
4. **Make the experience worthwhile.** The action, its result, or both should reward attention. Let the success be satisfying before turning it into the next upgrade cost.
5. **Give repetition a reason.** Another judgment, practice, a pleasant routine, a changed situation, or progress toward something wanted can justify another attempt.
6. **Make enough recognizable.** A completed purpose should count. A valid solution need not be optimal; optional play afterward should not invalidate the finish.

### Optional ways to achieve that

- **Personal goals:** players can define what they want to build or improve.
- **Learning:** evidence enables better predictions or actions without buying equipment.
- **Refinement:** a working method can become more reliable, less costly, or less demanding.
- **New possibilities:** a result supplies access, tools, knowledge, trust, or time for another wanted activity.
- **Worthwhile retries:** an unsuccessful attempt can retain understanding, progress, or the satisfaction of a complete run.
- **Attachment and changing meaning:** ownership, relationships, or discoveries can change why the work matters.

For our project, **learning through samples and refining under bounded resources are already selected**. The other mechanisms are choices, not a feature checklist. Story, currencies, cultivation, circuits, automation, randomized runs, and profound revelations remain optional.

## The next visual pass

Use literal game situations, with the same place or objects maintained across two or three panes. Show what visibly changes. Short captions are welcome. Avoid invented objects and symbols that require their own explanation. A few good examples can support several principles.

### Discover a relationship — Cities: Skylines

**No way in → connect the road → homes appear.**

Show the same residential block in three panes: zoning alongside a local road that is disconnected from the outside network; the missing connection added; homes appearing on the connected plots. This is Scott's original example.

It explains consequential action and readable feedback. Isolate access as the missing condition: demand and other prerequisites are assumed satisfied. Do not show zoning without a local road or imply that every empty district has the same diagnosis. [Original game manual](https://shared.steamstatic.com/store_item_assets/steam/apps/255710/manuals/CitiesSkylines-UserManual_EN.pdf).

### Improve something that works — Stardew Valley

**Water each crop → they water themselves → spend the morning exploring.**

Show the same four crops being watered by hand, then a basic sprinkler watering them on a later morning. A third pane can show the player heading to the mine. The first two panes explain efficiency; the third explains what that efficiency makes possible.

The basic sprinkler covers the four orthogonally adjacent tiles each morning. The mining trip is an illustrative player choice, not a reward automatically granted by the sprinkler. [Sprinkler reference](https://wiki.stardewvalley.net/Sprinkler).

### Gain a new possibility — Minecraft

**Make an iron pickaxe → mine diamond ore → keep the diamond.**

Show the actual tool, ore, and inventory result, with small material labels if needed. This explains a new capability and a concrete return. It differs from the sprinkler: gaining access to something previously inaccessible, rather than reducing work on an existing task. [Mojang's pickaxe guide](https://www.minecraft.net/en-us/article/taking-inventory-pickaxe).

### Other examples worth using

| Principle | Recognizable game situation | What the image can establish |
| --- | --- | --- |
| A reason to begin | Stardew's inherited, overgrown farm → first cleared patch | Ownership and an obvious opportunity to improve it |
| Enjoy the result | Minecraft's last roof block → using the finished shelter | The completed building is useful now |
| A reason to repeat | Portal's familiar tool → a new chamber configuration | Same action, different judgment |
| Enough | Factorio base Freeplay's preparation → rocket launch | A bounded engineering achievement; further expansion is optional |
| Personal success | Minecraft's same block palette → small home or elaborate tower | Different player projects, not a compulsory upgrade path |
| Knowledge changes capability | Outer Wilds: obstructed location → understand timing → return when accessible | Learning matters without an equipment upgrade; verify the specific location before drawing |
| Worthwhile retry | Hades: defeat → return with persistent progress and another conversation | The attempt can matter before final victory |
| Growing attachment | Stardew's neglected Community Center → contributions → restored place | Investment changes a place; the picture cannot prove the player's feelings |

For endings, use actual game context and a short explanation. A picture of a happy or disappointed person is not evidence that an ending works. The attributed reception table in the reference section below keeps reported judgments separate from our inferences.

**Review rule:** hide the principle heading. Can someone describe what changed? Restore it: does that exact change explain the principle? If not, simplify the example before drawing more.

## Candidate games — none selected

| Premise | What the player does | Finite purpose | Main uncertainty |
| --- | --- | --- | --- |
| Weather harvesting | Sample moving fronts and collect useful fictional condensate | Restore a station or beacon network and verify its reserves | Will maintaining service feel worth caring about, or just mean colored currencies? |
| Drifting seeds | Infer release windows, collect viable seeds, establish a nursery | Deliver a viable founding collection and its first successful generation | Do viability and timing create decisions beyond a checklist? |
| Current-borne salvage | Sample opaque currents, recover parts, trace a release upstream | Repair an installation and verify that its leak has stopped | Can samples drive the search while keeping the job concrete? |
| Comet-dust expedition | Sample uncertain jets and preserve rare inclusions | Return a useful scientific collection within the expedition budget | Is discovery compelling enough without farming or large production chains? |
| Catch, study, release | Infer movement, capture briefly, record, and release | Complete a migration survey or relocation | Is handling living subjects comfortable and enjoyable? |

These are fictional treatments. Weather and seeds were promising earlier candidates, not an approved shortlist or decision. If two treatments play identically after changing names and colors, we have not yet found a meaningful mechanical difference. Fiction can still change how the activity feels; test that separately.

### One encounter to test

Three collectors and a limited retrieval budget. An old report marks a productive location. One trap returns common material; another contains the desired fraction but filled before retrieval; a third returns little.

Did a pulse move across the field, or do the locations collect with different efficiency? Commit all three collectors to the apparently productive corridor, or sacrifice some capacity on a short reference deployment that distinguishes the explanations.

A useful upgrade might timestamp arrivals or reveal saturation. It answers a question the player has already encountered. It should not simply reveal the whole hidden world.

### How we choose the game

1. **Name the objective and enough:** “I improve ___ for ___, constrained by ___; I can finish when ___.”
2. **Write one deployment:** limited tools, two plausible plans, a return with usable evidence.
3. **Name its payoff:** what it provides, teaches, or feels like. One convincing benefit can be sufficient.
4. **Connect the next use and the last use:** what becomes possible, and what eventually completes the purpose?
5. **Check the six foundations:** select additional mechanisms only to address a weakness.
6. **Test the weakest claim:** first with a paper example, then a tiny playable field. Observe what the player wants, what they think happened, and what they choose next.

Avoid invented numerical “fun” scores. Record the uncertainty and the cheapest experiment that could challenge it. Finish with a deliberate plan, verification, or handoff; a long wait for a randomly rare final item is a weak substitute.

## Reference: people whose thinking helps

Use these habits on the same encounter, rather than turning each into a new feature. The applications are ours.

| Influence | Useful question | Source |
| --- | --- | --- |
| Daniel Cook | What can I learn from the return, and what does it let me attempt? | [Interaction and skill chains](https://lostgarden.com/2021/03/13/the-chemistry-of-game-design-2/) |
| Raph Koster | What changes about the next situation beyond the quantity required? | [Interaction and progression](https://www.raphkoster.com/2025/11/03/game-design-is-simple-actually/) |
| Will Wright | Can different plans express different player preferences? | [SimCity interview](https://www.gamedeveloper.com/business/the-replay-interviews-will-wright) |
| Sid Meier | Why might a reasonable player choose either alternative? | [Interesting Decisions](https://www.gdcvault.com/play/1015756/Interesting) |
| Nicole Lazzaro | What does deploying and retrieving actually feel like? | [Four Keys to Fun](https://www.nicolelazzaro.com/the4-keys-to-fun/) |
| Kelsey Beachum | What does the player now want to find out, and how can they investigate? | [Sparking Curiosity](https://gdcvault.com/play/1027008/Independent-Games-Summit-Sparking-Curiosity) |

Self-determination theory adds a motivation lens: capability, willing participation, and connection. It is not a mandatory sequence of mechanics. [Original game study](https://selfdeterminationtheory.org/SDT/documents/2006_RyanRigbyPrzybylski_MandE.pdf).

The reinforcement-learning analogy is useful at the broad level of actions, consequences, and updating expectations. It does not explain by itself why someone cares about a farm, enjoys a mystery, or decides they have enough. [Sutton and Barto](https://mitpress.mit.edu/9780262039246/reinforcement-learning/).

## Reference: game examples and endings

**Ending spoilers below.** These comparisons are interpretations, not claims that every player feels the same way. First-person thoughts are illustrative, not quotations. The reception table attributes individual critical responses.


The “initial want” is my interpretation of the game's invitation. The first-person thoughts are illustrative, not player quotations. Mechanics sources accompany each example; reported judgments about endings are separated below.

### Cities: Skylines — make a place function

**Initial want:** The invitation to make a city of my own, reinforced by visible empty land and familiar expectations about what a town needs.

**Concrete sequence:** I zone homes → nobody moves into a disconnected area → I recognize that access matters → connect the road → buildings appear. Later, a functioning neighborhood exposes a new problem such as traffic or service coverage. This example concerns the original game; the exact diagnosis always depends on the city's actual conditions. [Official overview](https://www.paradoxinteractive.com/games/cities-skylines/about).

**Better?** Serve the neighborhood with a shorter route or a less congested junction. **Now I can?** Support another district, or build the kind of neighborhood I originally imagined.

**Where it can end:** In sandbox play, the player's project supplies the finish. My interpretation: the danger is a city that always produces another obligation; the pleasure is a place that increasingly expresses the player's judgment. Neither requires a campaign ending.

### Stardew Valley — make this neglected place mine

**Initial want:** Inheriting an overgrown farm gives me ownership, an obvious small improvement to make, and the fantasy of a different life.

**Concrete sequence:** I want a viable farm → time and energy constrain planting and watering → I learn how crops, seasons, and equipment interact → change what I plant and how I work → harvest. Skills, recipes, relationships, and exploration open further possibilities. [Official overview](https://www.stardewvalley.net/about/).

**Better?** Spend less of the day on chores. **Now I can?** Use the freed time to explore, restore the community center, or get to know someone. This is a particularly useful example: efficiency can buy a different activity, not just more production.

**Where it can end:** A restored community center or a farm I love can be a personal finish; neither exhausts the simulation. The ability to stay is part of its appeal, but our shorter game should not depend on the player inventing a stopping point.

### Factorio — make the system carry the work

**Initial want:** A concrete production task offers a foothold; the appeal of a machine that works for me can become the stronger motivation.

**Concrete sequence:** I need components → hand production or a bottleneck slows me down → understand a production dependency → build or rebalance automation → the supply works. Base-game Freeplay provides a rocket launch objective; Space Age has a different victory condition. [Official wiki: modes](https://wiki.factorio.com/Game_modes_and_options).

**Better?** Make supply steadier or reduce waste and congestion. **Now I can?** Build the next useful part of the system with that supply.

**Where it can end:** The rocket can demonstrate that the entire chain works. Continuing afterward is possible. My interpretation: the same system supports either a bounded engineering achievement or an indefinitely expanding personal project. We should borrow the former deliberately, rather than assuming expansion will eventually feel complete. [Official wiki: rocket silo](https://wiki.factorio.com/Rocket_silo).

### Opus Magnum — make it work, then make it beautiful

**Initial want:** A clear requested output and a small set of manipulable parts make a problem feel approachable.

**Concrete sequence:** I need a product → the current arrangement cannot produce it correctly → discover a useful sequence of movements → rearrange the machine → it works. The game explicitly supports competing ambitions such as speed, simplicity, and compactness. [Zachtronics overview](https://www.zachtronics.com/opus-magnum/).

**Better?** Find a cheaper, faster, smaller, or more pleasing solution. Those goals can conflict. **Now I can?** Move to the next problem with another technique in my repertoire.

**Where it can end:** A valid solution is a real finish even if it is not optimal. My interpretation: this permission to stop is valuable. “It works” and “I'm proud of how it works” can be separate achievements without making the first feel fraudulent.

### Minecraft — turn a necessity into a personal project

**Initial want:** In Survival, immediate safety provides one invitation. The freedom to build something provides another, sometimes stronger from the start.

**Concrete sequence:** I want shelter or a particular construction → tools and materials limit me → learn a useful material/tool relationship → obtain the tool and gather what I need → build something tangible.

**Better?** Make gathering safer, travel easier, or the building more satisfying. **Now I can?** Attempt a construction that previously seemed impractical.

**Where it can end:** Defeating the Ender Dragon opens the route to the End Poem and credits, while further play remains available. That official milestone need not coincide with completing my own house or landscape. My interpretation: a personal project and the game's formal ending can be quite different promises. [Mojang on the dragon and what follows](https://www.minecraft.net/en-us/article/ender-dragon).

### Subnautica — survival makes discovery possible

**Initial want:** A crash creates immediate practical needs; the unfamiliar ocean supplies curiosity alongside them.

**Concrete sequence:** I want to investigate somewhere deeper → air, equipment, and danger limit the trip → learn what preparation the journey requires → build and prepare → reach somewhere that changes my picture of the planet. [Review describing the survival and exploration mechanics](https://www.nintendolife.com/reviews/switch-eshop/subnautica).

**Better?** Make that journey safer and less cumbersome. **Now I can?** Follow the next lead, rather than merely repeat the same gathering trip with larger storage.

**Where it can end:** Resolving the conditions preventing escape and leaving provides a finite purpose for the preparation. My interpretation: the tools matter because they let me reach answers and eventually go home. See the reported reception below.

### Dredge — a catch buys another kind of expedition

**Initial want:** A fishing job and a boat give me a practical role. Strange discoveries add a second reason to go out.

**Concrete sequence:** I want a useful catch → equipment, hold space, time, and danger constrain the route → learn which preparations suit the expedition → change the loadout and plan → return with fish or salvage. [Official game overview](https://www.dredge.game/).

**Better?** Bring home more useful cargo within a manageable trip. **Now I can?** Equip for a different fishing opportunity or pursue a strange object elsewhere.

**Where it can end:** The central mystery provides a story conclusion alongside the fishing economy. My interpretation: these motivations need to support each other; a dramatic ending alone cannot make every preceding upgrade feel meaningful. The specific critical concern below is about how the horror payoff is prepared.

### Outer Wilds — understanding is the equipment

**Initial want:** Being a new space explorer invites curiosity. The time loop then makes the world's strange behavior personally urgent.

**Concrete sequence:** I want to reach or understand a place → its conditions seem impossible → observations suggest how location and timing relate → try a different approach → discover information that points somewhere else. Its changing environments and investigative tools support this kind of exploration. [Mobius Digital overview](https://www.mobiusdigitalgames.com/outer-wilds.html).

**Better?** Navigate or test a hypothesis more deliberately. **Now I can?** Act on something I always had the physical ability to do but did not understand.

**Where it can end:** The final journey gives accumulated understanding a use. My interpretation: the desire can change from preventing an ending to understanding and participating in what follows. The game does not need to keep selling improved equipment to preserve discovery.

### Return of the Obra Dinn — make scattered evidence cohere

**Initial want:** A concrete investigation supplies a job; the apparently impossible abandoned ship supplies a mystery. The player arrives as an insurance investigator. [Official site](https://obradinn.com/).

**Concrete sequence:** I need to identify someone and establish their fate → a scene is ambiguous → connect evidence across scenes → enter a deduction → some identities and fates become confirmed. [RPGFan review](https://www.rpgfan.com/review/return-of-the-obra-dinn/).

**Better?** Pay attention to stronger evidence and avoid unsupported guesses. **Now I can?** Use one established identity to interpret another scene. There is no need to turn every discovery into an inventory upgrade.

**Where it can end:** A completed account supplies investigative closure. My interpretation: the most satisfying moment may occur while solving the last stubborn connections, before the formal conclusion. A review's criticism of the ending is recorded separately below.

### Portal — use the lesson for my own purpose

**Initial want:** A clearly presented test invites me to solve it, with the facility's instructions supplying an immediate direction.

**Concrete sequence:** I want to reach the exit → ordinary movement cannot get me there → understand a relationship involving portals and motion → arrange the route → cross the obstacle. [Official store description](https://store.steampowered.com/app/400/Portal/).

**Better?** Execute the idea more reliably or elegantly. **Now I can?** Apply that understanding to a more demanding configuration, eventually using the learned rules to escape rather than simply obey.

**Where it can end:** My interpretation: the conclusion gives the taught skills a personal purpose and resolves the relationship with the voice directing me. The shift in intention is doing more work than a final numerical upgrade.

### Hades — another attempt can matter before victory

**Initial want:** Escape supplies an immediate objective, while character relationships give the attempt emotional context.

**Concrete sequence:** I want to get farther → an encounter defeats my current approach → learn its behavior or find a useful combination → make different choices on another run → reach farther, or return with progress and another conversation. The game combines repeated escape attempts with persistent progression and unfolding story. [Supergiant overview](https://www.supergiantgames.com/games/hades/).

**Better?** Fight more deliberately and choose combinations that work together. **Now I can?** Reach encounters and conversations that change why escaping matters.

**Where it can end:** A first successful escape and the later main story resolution are different milestones; further play and an epilogue also exist. My interpretation: mechanical victory need not carry all the emotional closure, but the game must make subsequent attempts feel justified.

### Slay the Spire — make a good decision with this situation

**Initial want:** A bounded climb presents a clear challenge. Early card and route choices quickly make the attempt feel like mine.

**Concrete sequence:** I want to survive the climb → my current deck and remaining health constrain the route → recognize a useful combination or a weakness → change card, combat, or path choices → survive the next test. Randomized routes, deck construction, and interacting relics are central features. [Official store description](https://store.steampowered.com/app/646570/Slay_the_Spire/).

**Better?** Make more consistent decisions, including declining a card that would weaken the deck. **Now I can?** Attempt a riskier encounter during this run, or use what I learned in another one.

**Where it can end:** Each run has a boundary, while learning invites another. My interpretation: repetition is easier to accept when an individual attempt already feels complete. Its replayability need not become our campaign structure.

### What people actually said about endings

These are named critical responses, not evidence of universal agreement. They also distinguish a satisfying experience from the mere presence of credits.

| Game | Reported response | My design inference |
| --- | --- | --- |
| **Subnautica** | Steven Strom's Ars Technica review argues that the central mystery and a beginning, middle, and end give survival a purpose. [Review](https://arstechnica.com/gaming/2018/02/one-main-mystery-makes-survival-in-subnautica-worthwhile/). | Preparation gains meaning when it serves something the player can actually resolve. |
| **Portal** | Aquarion's contemporary review calls its arc satisfying and well executed, while wishing the short game lasted longer. [Review](https://www.aquarionics.com/journal/2007/10/11/the_orange_box_portal/). | Wanting more is compatible with having received a complete experience. Length alone does not explain closure. |
| **Hades** | Nintendo Life's endings feature praises the catharsis of the family resolution, achieved through repeated successful runs. [Feature](https://www.nintendolife.com/features/the-best-endings-in-games-on-nintendo-switch). | Resolve the relationship that makes the repeated action matter, not only the obstacle that makes it difficult. |
| **Outer Wilds** | A Gentle Gamers personal critical essay describes the ending as deeply moving and as bringing together the uncertainty, fear, beauty, and understanding of the journey. This is one writer's account. [Essay](https://www.gentlegamers.com/archive/2019/11/18/campfire-a-short-epilogue-to-my-outer-wilds-review). | An ending can change the meaning of prior effort rather than award ultimate control. |
| **Return of the Obra Dinn** | Jerry Williams's RPGFan review praises the deduction but lists a weak ending among its drawbacks. It does not give a detailed explanation of that judgment. [Review](https://www.rpgfan.com/review/return-of-the-obra-dinn/). | Do not assume the concluding scene inherits the satisfaction of the puzzle automatically. This explanation is mine, not the reviewer's stated diagnosis. |
| **Dredge** | Alessandro Barbosa's GameSpot review finds the daily activity engrossing, but argues that the strongest horror imagery arrives at the end and would have more impact with comparable moments earlier. [Review](https://www.gamespot.com/reviews/dredge-review-grant-us-eels/1900-6418049/). | Prepare the emotional payoff during play. This is a specific criticism of the horror buildup, not a consensus that the ending is bad. |

There is no universal “good ending” formula in that sample. My reading is that closure works when it answers the kind of investment the game encouraged: competence, curiosity, care, personal authorship, or some combination. A surprise can help, but a profound revelation is not mandatory.


## Earlier work

All previous files, including prototypes, sprite vocabulary, full research, and rejected drafts, are preserved in one verified backup beside the project: `../particles-session-backup-2026-10-18.zip`. The backup is historical; these two working files hold the current direction.

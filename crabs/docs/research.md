# Bristol Bay Red King Crab (BBRKC): literature notes

Notes gathered to ground the sim's movement and population model. Sources were
read where retrievable (2025 BBRKC SAFE chapter, 2024 NOAA EBS crab survey tech
memo, ADF&G 2025/26 TAC presentation, NOAA 2023 spring pot-survey tech memo,
Zacher et al. 2018, Zhou & Kruse 2000, Zheng 1996, Livingston 1989, NOAA
saildrone/tagging summaries). Items that could not be retrieved in full are
flagged as gaps. The distilled rules the sim implements are in
[rules.md](rules.md).

---

## 1. Geography

**Management/stock extent.** State Registration Area T = all waters north of
Cape Sarichef (Unimak I.), east of 168° W, south of the latitude of Cape
Newenham, including all of Bristol Bay. Federal definition: 54°36' N to 58°30' N,
west boundary 168° W (50 CFR 680; Federal Register 1995; ADF&G Area T
description). Practical bounding box for a sim: **54.6–58.5° N, 168° W–157.5° W**.
Nearly all crab live east of about 165° W; the fishery works mainly **south of
58° N and east of 165° W at 50–100 m** on the middle shelf (Zacher, Kruse & Hardy
2018, *PLoS ONE* 13(7):e0201190, https://pmc.ncbi.nlm.nih.gov/articles/PMC6054397/).

**Key features.**
- *Central Bristol Bay / Red King Crab Savings Area (RKCSA, roughly 56–57° N,
  162–164° W, trawl-closed):* warm-year autumn hot spot; ~60% of legal-male catch
  in warm years, <25% in cold years (Zacher et al. 2018).
- *Nearshore Bristol Bay Trawl Closure Area (NBBTCA) along the Alaska Peninsula:*
  cold-year autumn hot spot (>50% of catch in most cold years); in spring 2023,
  66% of all pot-caught RKC (62% of legal males, 76% of mature females) were
  inside the NBBTCA (Loher et al. 2024, NOAA Tech Memo NMFS-AFSC-483,
  https://repository.library.noaa.gov/view/noaa/60718).
- *Port Moller:* highest 2023–2024 summer densities of mature and immature males
  "to the south around Port Moller"; 19% (2024) and 37% (2023) of the entire
  survey mature-female catch came from a single station (E-12) just north of
  Port Moller (Zacher et al. 2025, NOAA Tech Memo on the 2024 EBS crab survey,
  https://repository.library.noaa.gov/view/noaa/66166). Historically regarded as
  a prime juvenile nursery.
- *Southwest Bristol Bay (north of Unimak Pass):* largely empty of RKC today
  (zero-catch stations south/west of a line ~56°50' N 164°15' W to ~55° N
  162°27' W in 2023), though historically (pre-1977) the main mature-female area
  (Loher et al. 2024; Zheng, Siddeek & Kruse 2014 PICES slides).
- *Pribilof Islands:* separate stock, fishery closed (2025/26 TAC 0); irrelevant
  to BBRKC movement except as a western boundary.
- *Dutch Harbor/Unalaska:* registration and landing port.

**Depths.** Summer survey: shelf 20–100 m. Autumn fishery: 50–100 m (Zacher et
al. 2018). Spring pot survey stations: 26–93 m (Loher et al. 2024). Spring
mating: "<50 m" (NPFMC 2022 BBRKC discussion paper; ADF&G life-history notes).
Juvenile nursery: shoreward of the 50 m isobath (ADF&G Bristol Bay Settlement
Project).

**Bottom temperature.** 2024 Bristol Bay District June mean 2.5 °C; EBS-wide
range −1.6 to 5.7 °C; cold pool (<2 °C) sat between 50–100 m isobaths down the
middle shelf and did not reach central Bristol Bay (Zacher et al. 2025). Spring
2023 (Mar–Apr) bottom means −1.2 to 4.4 °C, average 2.0 °C; warmest in the SW
near Unimak Pass, coldest NW off Cape Newenham (Loher et al. 2024). Over 30+
years of summer surveys RKC were caught at −0.8 to 12.8 °C, mean 3.2 °C; lab
thermal-gradient mature males preferred 2.7–3.0 °C and avoided >4 °C (cited in
Zacher et al. 2018). Mature females in cold years sit in nearshore 3–4 °C water
rather than the <2 °C cold pool (Chilton et al., AFSC Quarterly Jan–Mar 2009,
https://apps-afsc.fisheries.noaa.gov/Quarterly/jfm2009/divrptsRACE7.htm).

---

## 2. Annual cycle

Quantitative month-by-month tracking is thin; this splices tagging summaries,
survey timing, and life-history reviews.

| Period | Mature males | Mature females | Juveniles (<~90 mm) |
|---|---|---|---|
| **Jan–Mar** | Still on autumn/winter grounds (fishery open Oct 15–Jan 15); begin inshore/shallow movement toward mating areas late winter. Molt earlier than females (Livingston 1989). | Carrying eyed embryos; moving to shallow (<50 m), relatively warm nearshore water. | Shallow (<50 m) nursery habitat; pods. |
| **Apr–Jun** | In shallow (<50 m) inshore mating areas (Nichol & Somerton, AFSC Quarterly OND 2009); grasp females before female molt. Whether skip-molt males also migrate is unresolved. | Hatch larvae (most Apr–Jun; delayed in cold years), molt, mate, extrude new clutch. Molt-mate window "late Jan–end June" overall. Primiparous females a few weeks earlier. | Molting several times/year until age 3–4. |
| **Jun (survey)** | Caught throughout eastern Bristol Bay, east of survey column 9; new-shell legal males in deeper water, old-shell in shallow (Zacher et al. 2025). | 85% with uneyed (new) eggs by June 2024; 15% incomplete, mostly northern stations. In cold years (1999, 2000, 2006–12, 2017, 2021) ≥10% unfinished and NMFS resamples in late Jul/Aug. | Immature females east of column 9; immature males near Port Moller. |
| **Jul–Sep** | Offshore feeding migration; 2019 acoustic tags: **50–100 km displacement June→October**, 34% relocated (Zacher et al., NOAA saildrone talk). Pop-up tag crabs displaced ~45 km on average (Nault et al. 2024, *Animal Biotelemetry*, doi 10.1186/s40317-024-00360-7, abstract only). | Less mobile than males ("depth fidelity"); embryo-temperature constraint hypothesized (Loher et al. 2024). | Dispersed; growing. |
| **Oct–Dec** | Aggregated at 50–100 m; central bay (RKCSA) in warm years, Alaska Peninsula band in cold years; preference for cooler water in central bay in October (Hardison et al. 2025 preprint, https://ecoevorxiv.org/repository/view/10295/). 74–100% of TAC taken Oct 15–Nov 14. | Broadly overlapping males; tagged 50 females Oct 2020 (results not yet public). | — |

**Movement speed.** Best Bristol Bay number: pop-up tags on males in spring 2023
(57–75 day deployments): **mean 0.83 ± 0.50 km/day, range 0.08–2.53 km/day, net
trend N/NE**, high individual variability (Loher et al. 2024). Historical INPFC
tag returns (1950s, Bering Sea): mean ~1.3 mi/day (2.1 km/day), max 10.6 mi/day
(INPFC 1960 report). Norwegian fjord RKC: 0.2–0.5 km/day. Treat 0.5–2 km/day as
the plausible envelope, with net seasonal displacement of ~50–100 km.

**Podding.** Juveniles (age 1–2) form pods of thousands to hundreds of thousands,
resting by day and dispersing to forage at night, re-forming by morning (Dew
1990 via NOAA Fishery Bulletin/AFSC Quarterly AMJ 2008; Kodiak observations).
Adults also aggregate; Dew (2010) describes adult aggregations covering >370 km².
The 2025 ADF&G TAC presentation lists "podding behavior → patchy distribution"
as a survey-precision problem.

---

## 3. Environmental drivers

| Driver | Evidence | Movement? | Catchability? |
|---|---|---|---|
| **Depth** | Strong: seasonal 20–50 m (spring) ↔ 50–100 m (autumn); shell-condition split by depth in June. | Yes, primary seasonal axis. | Indirect. |
| **Bottom temperature / cold pool** | Strong: warm vs cold year autumn hot spots shift ~100+ km (Zacher 2018); females avoid <2 °C, sit at 3–4 °C (Chilton 2009); lab preference 2.7–3.0 °C, avoidance >4 °C; cold delays molt/mate/hatch by weeks. | Yes: <2 °C repulsive for females, >4 °C mildly repulsive for mature males, optimum ~2–4 °C. | Warm years had higher CPUE (18–40 crab/pot range 2005–16). |
| **Substrate** | Moderate: cold-year hot spots on sand, warm-year on mud–sand (Zacher 2018); experiment grounds flat sandy mud (Zhou & Kruse 2000); juveniles need cobble/shell hash/biogenic structure. | Weak for adults; strong for juvenile nursery location. | None documented. |
| **Tidal currents** | Moderate: Hardison et al. 2025 found preference for shallow/low-velocity and deep/high-velocity habitats (no numbers in abstract). | Plausibly modulates habitat choice. | Current carries bait plume; crabs approach from downstream (Zhou 1996 dissertation). |
| **Light / time of day** | Juveniles nocturnally active (Kodiak). For adult pot catch, **no Bering Sea diel study found**. | Juveniles only. | Unknown; speculative. |
| **Ice edge** | Spring 2023: ice just north of grid, cold pool intruding NW corner coincident with low catches there. Indirect only. | Via temperature. | Operational (fleet avoidance). |
| **Moon phase** | **No evidence found** for RKC. | — | — |
| **Photoperiod** | Stone (1991/1992) SE Alaska females: depth distribution correlated with photoperiod; shifts coincided with thermohaline mixing. | Plausible timing cue for seasonal migration. | — |

---

## 4. Population structure

**Size bins.** Assessment (GMACS model 24.0c.2) uses 5-mm carapace-length (CL)
bins from 65 mm; plus-groups >160 mm (males) and >140 mm (females). Management
definitions: mature males ≥120 mm CL; legal males ≥135 mm CL (= 6.5 in carapace
width); mature females ≥90 mm CL (Palof et al. 2025, BBRKC SAFE). Max size
227 mm (M) / 195 mm (F) CL. Maturity at 5–12 yr; lifespan >20 yr; no terminal
molt.

**Growth and molting.** Juveniles molt several times/year to age 3–4, then
annually; females molt annually for life; male molt probability is an inverse
logistic of length (declining after functional maturity). Female increments from
one study: pubertal molt +18.2%, primiparous +6.7%, multiparous +3.6% of CL. Male
increment tables used by the assessment come from Weber & Miyahara / Balsiger
(1974) and are not reproduced in the SAFE text (gap). Rule-of-thumb: ~12–15 mm
per molt for 100–130 mm males.

**Natural mortality.** Prior mean 0.18 yr⁻¹ (1% rule, max age 25); model
24.0c.2 estimates base M = 0.23 (males) and 0.26 (females), with a 1980–84 spike
of ~1.0 (M) and ~1.16 (F) (SAFE Table 13). Pacific cod ate 1.4–3.8% of the
female standing stock per year in 1981–85 (Livingston 1989, *Fishery Bulletin*
87:807, https://spo.nmfs.noaa.gov/sites/default/files/pdf-content/1989/874/livingston.pdf).

**Recruitment.** Enters model at 65+ mm CL (age ~5–7); low since 1985;
above-average only in 1984, 86, 90, 95, 99, 2002, 05, 06, 2010. Avg male
recruits 9.7 million/yr (1984–2024). Sex ratio of recruits ~50%.

**Recent abundance (model 24.0c.2, millions of crab; SAFE Table 18).**

| Year | Mature M (>119) | Legal M (>134) | Mature F (>89) | MMB (kt) |
|---|---|---|---|---|
| 2017 | 6.5 | 5.1 | 19.3 | 12.1 |
| 2020 | 7.2 | 4.3 | 14.7 | 13.2 |
| 2022 | 9.0 | 6.2 | 12.6 | 19.0 |
| 2024 | 9.2 | 6.8 | 15.1 | 19.7 |
| 2025 | 10.0 | 6.8 | 15.4 | 16.8 |

Survey area-swept 2024: legal males 7.0 ± 2.2 M (20,837 t), mature males 9.0 M,
immature males 8.2 M, mature females 11.0 M, immature females 2.5 M; caught at
67 of 136 stations. Shell condition of legal males 2024: 60% new, 24% old, 16%
very old. Peak history: 1978 mature males 87.7 M, 1980 mature females 127 M.

---

## 5. Catchability and pots

**Gear.** Standard pot 213×213×86 cm (also 198 or 244 cm square), 90–200 mm
stretch mesh, two opposing tunnels tapering to 91×20 cm horizontal eyes 45 cm
above the floor; effective volume 1.70 m³. Since 1993 at least one-third of one
side panel must be ≥230 mm mesh; escape panel laced with cotton twine (Zhou &
Kruse 2000, *AFRB* 6(2):94–103,
https://www.adfg.alaska.gov/static/home/library/PDFs/afrb/zhouv6n2.pdf). No pot
limit in Area T (ADF&G 2025 advisory).

**Soak time.** Pengilly & Tracy (1998, *AFRB* 5(2)) tested 12/24/72 h in
Bristol Bay: catch per pot rose with soak for both legal and nonlegal crab,
catch per soak-hour fell, nonlegal:legal ratio fell with longer soaks (abstract
only; table not retrieved — gap). Zhou (1996) fitted C_t = ab + a(t−b)e^(−ct).
Commercial logbooks 2005–16: mean soak 63.6 ± 47.3 h, soak explained only 5% of
CPUE variance (R² = 0.05) (Zacher 2018). 2023 spring survey used ~30 h targets.
Barents Sea: square pots plateau ~2 days. **Implication: saturation by ~48 h;
marginal gain thereafter small.**

**CPUE levels.** Fishery 2005–16: 18–40 crab/pot (lowest 2010, highest 2016);
2023/24: 20.5; 2024/25: 29.6 crab/pot-lift (SAFE). Experimental Aug 1996 at
64–77 m: 25.3 legal males and 63.3 total crab per pot (Zhou & Kruse 2000).

**Entrance/escape behaviour.** Lab video: crabs approach from downstream, 78%
search <90° before entering or leaving; entry success 8.1%; legal males attempt
and achieve escape less than sublegals/females; only large males could escape
via the bottom panel; females and small males stayed in pots over 2-day soaks
even though able to leave (Zhou & Shirley 1997, *Fish. Res.* 30:177–189; Zhou &
Kruse 2000). ROV: most escapes from below the tunnel eye, <1 min once found
(Sævarsson et al. 1993). Historically ~65% of catch discarded (1990–93).

**Bait.** Research pots: chopped frozen herring in a 1-L perforated jar hung
mid-pot; commercial fleet adds "hanging bait" (whole cod/herring) (Zhou & Kruse
2000). Zhou (1996): king-crab muscle extract strongest chemosensory trigger;
herring best at arousing feeding; squid, mussel, ovary weaker. Up to 10
groundfish pots allowed for catching cod bait. 2023 survey ran a 2- vs 4-bait-bag
and herring-vs-cod comparison (5 pots; results not in text). **No published
pounds-per-pot figure found** (gap; fleet practice reportedly several kg chopped
herring plus hanging cod).

**Mesh/netting colour.** **No study for king crab found.** Only tangential:
Chesapeake blue-crab pot colour <0.5 crab/pot effect; Korean swimming-crab
fluorescent bait cages ~2.5× in tanks. Treat as speculative/no effect.

**Time of day / current.** No adult diel catch data located. Bait plume follows
current; downstream approach is documented (Zhou 1996), so current direction can
bias which cells "see" a pot.

**Rules and seasons.** Males only, ≥6.5 in CW (135 mm CL); season Oct 15–Jan 15
since 2005/06 rationalization; closed during molt/mate. Harvest strategy:
thresholds 8.4 M mature females and 14.5 M lb ESB; exploitation 10/12.5/15% of
mature males by ESB tiers, capped at 50% of legal males; 2023–25 TACs set below
the 10% floor (~5%).

**TAC history (M lb):** 1980 catch 129.95 (peak); 2005/06+ ~15–20; 2015/16
9.97; 2020/21 2.6; 2021/22 & 2022/23 closed; 2023/24 2.15; 2024/25 2.31;
2025/26 2.68; 2026/27 3.41 (ADF&G advisories; SAFE Table 2).

---

## 6. Food and predators

**Diet.** Bottom omnivores. Kodiak adults: 88% of 809 stomachs had food;
dominated by bivalves (*Nuculana*, *Nucula*, *Macoma*), barnacles, then fish;
Barents/Norway: bivalves, polychaetes, echinoderms, algae. Juvenile pods at
Kodiak: sea stars and macroalgae. No Bristol Bay-specific adult diet study
located.

**Predators.** Pacific cod (soft-shell females in spring at 31–100 m; 1.4–3.8%
of female stock/yr), also yellowfin sole, pollock, halibut, sculpins, and
cannibalism on juveniles. Juvenile survival is strongly habitat-structure
dependent. Cod were abundant across the 2023 spring pot grid.

**Relevance to a movement model:** food gradients are not documented at the grid
scale; treat feeding as a diffuse offshore attraction in summer rather than a
mapped resource. Predation matters as a spring soft-shell mortality term for
females and as a juvenile-nursery survival term, not as a movement driver.

---

## Gaps and contradictions

- **No published Bristol Bay movement rates by month**; the 0.83 km/day figure
  is spring-only males. Female pop-up tag results (2020–2024) are unpublished.
- **Pengilly & Tracy 1998 soak-time table** not retrieved; only directional
  results confirmed.
- **Bait quantity per pot**, **mesh colour**, **diel catch**, **moon phase**: no
  RKC literature found.
- **Male growth-per-molt table** is in assessment appendices/1970s sources not
  opened; values are approximations.
- **Loher & Armstrong 2005** and **Stone et al. 1992** cited via secondary
  sources only.
- Natural mortality is contested (tag-based 0.54–0.70 vs prior 0.18 vs
  estimated 0.23–0.26).
- Whether skip-molt mature males join the spring inshore migration is open.

## Key sources

- Palof, K. et al. 2025. Bristol Bay Red King Crab Stock Assessment 2025 (NPFMC SAFE). https://meetings.npfmc.org/CommentReview/DownloadFile?p=bb83e21c-2bb6-4880-ba7b-ff0cb14ca357.pdf&fileName=BBRKC_2025SAFE_v2.pdf
- Zacher, L.S. et al. 2025. The 2024 EBS/NBS trawl surveys: results for commercial crab species. NOAA Tech Memo. https://repository.library.noaa.gov/view/noaa/66166
- Zacher et al. 2026 (2025 survey) NOAA TM NMFS-AFSC-513. https://repository.library.noaa.gov/view/noaa/72630
- ADF&G 2025/26 BSAI crab TAC industry meeting slides. https://www.adfg.alaska.gov/static/fishing/PDFs/commercial/bering_aleutian/2025_2026_bsai_crab_tac_industry_meeting.pdf
- ADF&G 2025 Bristol Bay RKC season advisory. https://www.fisheries.noaa.gov/s3/2025-10/10-06-25_BBR_TAC_AA_final.pdf
- Loher, T. et al. 2024. 2023 early spring collaborative pot sampling (CPS1) for BBRKC. NOAA TM NMFS-AFSC-483. https://repository.library.noaa.gov/view/noaa/60718
- Zacher, L.S., Kruse, G.H., Hardy, S.M. 2018. Autumn distribution of Bristol Bay red king crab using fishery logbooks. PLoS ONE 13(7):e0201190. https://pmc.ncbi.nlm.nih.gov/articles/PMC6054397/
- Hardison, S. et al. 2025 (preprint). Movement-informed projections of BBRKC seasonal distribution. https://ecoevorxiv.org/repository/view/10295/
- Nichol, D., Somerton, D. 2009. Tracking red king crab seasonal movements. AFSC Quarterly. https://apps-afsc.fisheries.noaa.gov/Quarterly/ond2009/divrptsRACE1.htm
- Zacher et al. NOAA saildrone talk (2019–2021 tagging). https://unalaska.gov/sites/default/files/fileattachments/City%20Manager%26%23039%3Bs%20Office/page/9488/noaa_sail_drones_crab_research.pdf
- Chilton et al. 2009 summary (female distribution/temperature). https://apps-afsc.fisheries.noaa.gov/Quarterly/jfm2009/divrptsRACE7.htm
- Zhou, S., Kruse, G.H. 2000. Catch efficiency of standard and experimental king crab pots. AFRB 6(2):94–103. https://www.adfg.alaska.gov/static/home/library/PDFs/afrb/zhouv6n2.pdf
- Zhou, S. 1996. The red king crab fishery: handling effects, bait efficiency, and pot behavior. PhD diss., UAF. https://scholarworks.alaska.edu/uaf_grad_fisheries/252
- Zhou, S., Shirley, T.C. 1997. Behavioural responses of red king crab to crab pots. Fish. Res. 30:177–189.
- Pengilly, D., Tracy, D. 1998. Experimental effects of soak time on catch of legal-sized and nonlegal red king crabs. AFRB 5(2). https://www.adfg.alaska.gov/static/home/library/PDFs/afrb/pengv5n2.pdf
- Zheng, J. et al. 1995/1996. Length-based models for Bristol Bay RKC. AFRB 2(2); Fish. Bull. 94:576–588. https://spo.nmfs.noaa.gov/sites/default/files/pdf-content/1996/943/zheng.pdf
- Livingston, P.A. 1989. Interannual trends in Pacific cod predation on crabs in the EBS. Fish. Bull. 87:807–827. https://spo.nmfs.noaa.gov/sites/default/files/pdf-content/1989/874/livingston.pdf
- Dew, C.B. podding summaries: AFSC Quarterly AMJ 2008. https://apps-afsc.fisheries.noaa.gov/Quarterly/amj2008/divrptsRACE3.htm
- Nault, A. et al. 2024. Estimating pop-up tag drift for Bering Sea crabs. Animal Biotelemetry. doi 10.1186/s40317-024-00360-7
- Alaska regs: 5 AAC 34.800–34.825 (Area T). https://regulations.justia.com/states/alaska/title-5/part-1/chapter-34/article-13/

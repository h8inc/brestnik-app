# Брестник — project context

**Имот: ПИ 06447.28.20** (стар номер 028020), местност „Бозалъка", с. Брестник, община Родопи, област Пловдив.

Housing development in с. Брестник, община Родопи, област Пловдив.
This file records the plot, the zoning limits, where the ПУП procedure stands, and how the current design sits against all of it.
Last updated 2026-11-23. Nothing here replaces the approved ПУП-ПРЗ, the виза, or a licensed architect.

## The plot

| | |
|---|---|
| Location | с. Брестник (ЕКАТТЕ 06447), местност „Бозалъка", общ. Родопи, обл. Пловдив |
| Cadastral ID | ПИ 06447.28.20 (old number 028020) |
| Status | Земеделска територия, нива, 4-та категория, 1,800 m² — needs a ПУП-ПРЗ and change of use before building |
| Buildable УПИ in the model | 28.7 × 60.45 m ≈ 1,735 m² (after the 2.25 m strip taken on the west) |
| Location (centre) | 42.066637 N, 24.762383 E (cadastre geometry, see below) |
| Access | Existing municipal road north-west of the plot |
| Water main | Nearest main about 540 m away, next to ПИ 06447.21.250 (owner, 2026-11-23); none at the plot |
| Electricity | Pole about 240 m away, line reported as "14 kV" (to be identified; see below); more network near ПИ 06447.21.250, 540–600 m away (owner, 2026-11-23) |

### Real orientation and sun

Geometry of ПИ 06447.28.20 from the public INSPIRE cadastral service of АГКК, read 2026-11-24 (WGS84):

| Corner | Latitude | Longitude |
|---|---|---|
| North-west | 42.066731 | 24.762148 |
| North-east | 42.066846 | 24.762458 |
| South-east | 42.066341 | 24.762799 |
| South-west | 42.066226 | 24.762488 |

- **Shape.** A rectangle 28.71 × 62.70 m, 1,800 m². The model's 60.45 m is the length after the 2.25 m strip at the road end.
- **Orientation.** The long sides run on a bearing of 153° / 333°, so the long axis is 27° off north–south, from north-north-west to south-south-east. The short sides run 63° / 243°.
- **Neighbours.** NNW short end: the road, 06447.27.146. ENE long side: 06447.28.17 (1,800 m²). WSW long side: 06447.28.21 (6,749 m²). SSE short end: 06447.28.18 (1,899 m²).
- **How the drawings map to it.** In the model and the plans, "north" (the internal lane, entrances, parking) is really ENE at 63°; "south" (living rooms and yards) is WSW at 243°; "west" (the public road) is NNW at 333°; "east" is SSE at 153°. This assumes the plan is not mirrored: which long side takes the lane is our choice.

Sun at this latitude (noon altitude 71.4° on 21 June, 47.9° at the equinoxes, 24.5° on 21 December; sunrise at bearing 58° in June and 122° in December). Hours of direct sun on each side, in solar time; solar noon is about 12:20 winter time and 13:20 summer time:

| Date | ENE side (lane) | WSW side (yards) | SSE end |
|---|---|---|---|
| 21 June | 6.9 h, sunrise to about 11:30 | 8.2 h, 11:30 to sunset | 9.0 h |
| Equinoxes | 4.8 h, to about 10:50 | 7.2 h, 10:50 to sunset | 9.6 h |
| 21 December | 2.7 h, to about 10:10 | 6.2 h, 10:10 to sunset | 8.9 h |

- **Decision: keep the lane on the sunrise side (ENE) and the living rooms and yards on WSW.** The living rooms get 6.2 h of sun in December against 2.7 h if turned around, the yards have evening sun, and the bedrooms on the lane side get morning sun and stay cool in the evening.
- **The cost is summer afternoons.** Low sun from the west gets under any overhang from about 16:00 to sunset. West-facing glazing on floors 2 and 3 needs external blinds or shutters, the roof terraces need pergolas, and the yards need deciduous trees along the WSW boundary.
- **The short ends.** The SSE end is the sunniest wall (8.9 h in December) and takes large windows; the NNW end towards the road is the cold side and takes small ones.
- **Solar panels** face south at 30–35° regardless of the building, since the roof is flat.
- **Not chosen:** two short rows across the plot facing SSE have better sun but fit about 1,700 m² РЗП and need a lane along the length of the plot.
- Not verified on site: the bearings come from cadastre coordinates only.

## The main problem: the filing and the design describe different projects

The project description filed with РИОСВ in August 2026 (Информация по Приложение № 2, case ОВОС-1125) declares:

| | Filed with РИОСВ | Current design (Variant B) |
|---|---|---|
| Buildings | 3 new single-family houses | 6 houses |
| Layout | Free-standing (свободно застрояване) | Connected row (свързано застрояване) |
| Dwellings | 3 | 6, or 12 with a flat on each third floor |
| Floors | Up to 3 | 2 (3 with the flats) |
| Sewage | One watertight pit (водоплътна яма) per house | Not modelled |
| Water | One 22 m well, up to 3.6 m³/day, notification regime for single-family houses | Not modelled |

Six row houses, and more so twelve dwellings, are not what the authorities are currently assessing. Before the ПУП-ПРЗ is drawn, either the design goes back to three detached houses or the filings are amended to match the design. This is a question for the consultant who prepared the filing and the architect.

### Contradictions inside the filing itself

Found on re-reading the Приложение № 2 text (ОВОС-1125-8/21.08.2026):

| Topic | What the filing says | Problem |
|---|---|---|
| Кинт | 1.0 in point „а) Размер…", 1.2 in point 3 | Two values |
| Well, yearly volume | „до 800 куб. м" and „до 1600 куб. м/год." | Two values; 3.6 m³/day would be about 1,314 m³/year |
| Well, flow | 0.45 l/s design flow, 1.45 l/s peak, „средногодишно 1,47 л/сек" | The yearly average is higher than the peak |
| Sewage | „водоплътни ями към всяка къща" once, „водоплътна яма в имота" twice | One pit or one per house |
| Planning basis | „За територията на община Пловдив има действащ ОУП" | The plot is in община Родопи, which has no ОУП in force |
| Land status | „урбанизирана земя", „с отреждане за жилищно строителство" | It is a нива, 4-та категория, before change of use |
| Натура 2000 | „Река Марица" and „Марица Пловдив" in one place, „Брестовица" in another | РИОСВ named only „Брестовица" |
| Construction period | 6 months, one to two seasons, up to 1 year | Three values |
| Other permits (point 12) | Only the РИОСВ decision and the building permit | ПУП-ПРЗ, change of use and well registration are not listed |
| Drinking water | Bottled mineral water with a dispenser, by subscription | Not confirmed as acceptable for commissioning or for houses built for sale |

## Zoning limits

Община Родопи has **no ОУП in force** (still the case in autumn 2026). In its place, Общински съвет „Родопи" adopted norms for residential development around October 2024, applying to the settlements and to land in their землища intended for housing.

| Indicator | Council norms (zone Жм) | Stated in the РИОСВ filing |
|---|---|---|
| Height | up to 10 m | up to 10 m, up to 3 floors |
| Плътност (Пзастр) | 20–60% | up to 60% |
| Кинт | 0.5–1.2 | **1.0 in one place, 1.2 in another** |
| Озеленяване (Позел) | 40–60% minimum | minimum 40% |
| Layout | — | свободно застрояване |

Caveats:
- The council norms come from a local news report, not the decision text.
- The filing contradicts itself on Кинт (1.0 vs 1.2). The ПУП-ПРЗ will fix the real value; our target is 1.2 (see below).
- The filing says the indicators follow other approved ПУП in the same zone and Наредба № 7.
- Not found: minimum УПИ size, limit on dwellings per УПИ, parking rules.

### Target: Кинт 1.2

**We want Кинт 1.2 in the ПУП-ПРЗ.** Кинт is not assigned by the municipality on its own: it is proposed in the assignment under чл. 124а ЗУТ and in the ПУП-ПРЗ project, and the municipality approves it or lowers it. It will not approve more than what is requested. 1.2 is the ceiling for Жм (Наредба № 7, чл. 19).

Maximum РЗП on the 1,735 m² УПИ:

| | Кинт 1.0 | Кинт 1.2 (target) |
|---|---|---|
| Maximum РЗП allowed | 1,735 m² | 2,082 m² |
| Variant B today, 2 floors (1,130 m², Кинт 0.65) | 605 m² spare | 952 m² spare |
| + third floor on the ground footprint (1,628 m², Кинт 0.94) | Fits, 107 m² spare | Fits, 454 m² spare |
| + third floor matching floor 2, with the overhang (1,762 m², Кинт 1.02) | **Does not fit**, 27 m² over | Fits, 320 m² spare |
| Same, counting the two premium garages (1,822 m², Кинт 1.05) | **Does not fit**, 87 m² over | Fits, 260 m² spare |

- Within the current footprints, three floors give at most about 1,820 m² (Кинт 1.05). The 2,082 m² ceiling cannot be reached: a fourth floor is ruled out by the 10 m height limit, and a larger footprint eats the green area.
- Плътност is not a constraint: 29% today (32% with the garages) against 60%.
- Balconies and terraces on upper floors count in РЗП with their full area (ЗУТ, ДР § 5, т. 18).
- The ceilings scale with the УПИ area the ПУП ends up with. If the lane leaves the plot (УПИ 1,433 m², see the dead-end street option below) they become 1,433 m² and 1,720 m², and Кинт 1.2 is then needed even for the third floor on the ground footprint.

## Where the ПУП procedure stands

Steps for building on agricultural land, with what public records show as of 18.11.2026:

| Step | Authority | Status |
|---|---|---|
| Opinion on water supply | ВиК Пловдив | Done — no public water main available at the plot (cited in the filing). Owner reports the nearest main about 540 m away, by ПИ 06447.21.250 |
| Opinion on the well and flood risk | Басейнова дирекция ИБР | Done — letter ПУ-01-683-3/29.06.2026: admissible; outside flood-risk areas; well for own household needs is under notification regime |
| Notification of the investment proposal | РИОСВ Пловдив | Done — ОВОС-1125/24.04.2026, extra information 12.06.2026 |
| РИОСВ reply | РИОСВ Пловдив | Done — 17.07.2026: screening for ОВОС required, plus Натура 2000 check for BG0001033 „Брестовица" |
| Screening request (Приложение № 2) | РИОСВ Пловдив | Filed 21.08.2026 (ОВОС-1125-8); public access opened 03.09.2026 for 14 days |
| **Screening decision** (решение за преценяване) | РИОСВ Пловдив | **Not published yet.** No entry for the plot in the decisions list through 17.11.2026 |
| Permission to prepare the ПУП-ПРЗ (чл. 124а ЗУТ) | Общински съвет „Родопи" | Not found — the plot ID does not appear in any 2025–2026 council decision |
| Site approval and change of use (чл. 17 ЗОЗЗ) | Комисия при ОД „Земеделие" Пловдив | Not confirmed — decisions are published without plot details in the titles; contents not checked |
| ПУП-ПРЗ project, announcement, approval | Община Родопи | Not found in 2026 municipal notices |
| Electricity | Електроразпределение Юг | Planned after the виза (per the filing). The study request can be filed now (see the utilities section) |
| Виза, design, building permit | Община Родопи | Later |

Reading: the environmental track is waiting on the РИОСВ screening decision; nothing public shows the municipal ПУП track has started. For comparison, a neighbouring Брестник case (ПИ 06447.36.62) took about 14 weeks from its public-access notice to its decision, which would put this one around mid-December 2026. That is one data point, not a forecast.

Limits of this check: Басейнова дирекция's site could not be read; municipal notices under чл. 124б were only partly checked; council decisions before 2025 were not checked.

## Where the design stands (Variant B)

6 houses in a connected row: 2 premium at the ends, 4 standard. Flat roof, 2 floors. Numbers from `src/model.js`.

| Per house | Ground | Floor 2 | РЗП |
|---|---|---|---|
| Standard (8.21 × 9.5 m) | 78 m² | 99 m² | 177 m² |
| Premium (9.8 × 9.5 m) | 93 m² | 118 m² | 211 m² |

| Indicator | Design | Limit | Status |
|---|---|---|---|
| РЗП | 1,130 m² | 1,735 m² at Кинт 1.0 · 2,082 m² at Кинт 1.2 | OK either way |
| Кинт | 0.65 | 1.2 requested (1.0 if lowered) | OK |
| Пзастр | 29% | 60% | OK |
| Height | ~6.5 m | 10 m | OK |
| Позел | 45.8% (794 m²) with the current defaults | 40% = 694 m² | OK, on two assumptions (see below) |
| Layout | Connected row | Free-standing | **Conflict with the filing** |
| Number of houses | 6 | 3 declared | **Conflict with the filing** |

### Green area (озеленяване)

Rules, from the texts on lex.bg:

- П озел. is the area under vegetation ("под естествена растителна покривка") divided by the УПИ area (Наредба № 7, чл. 11). Decking, paving, gravel and pools count as zero. Planting over underground or semi-underground construction counts; a green roof on an above-ground building is not mentioned.
- Жм: minimum 40–60%, and one third of the required green area must be planted with trees — about 231 m² here (Наредба № 7, чл. 19).
- It is checked three times: the ПУП-ПРЗ fixes the number, the building permit project must show it, and the building is not commissioned until the landscaping in the approved project is carried out (ЗУТ, чл. 178, ал. 3, т. 2).
- Ground-level surfaces do not affect РЗП or плътност (ЗУТ, ДР § 5, т. 15 and т. 18).

The model (`rowMetrics().green` in `src/model.js`) counts rear yards, side yards and the planted part of the front yards. Road, parking paving, entry paths and buildings count as zero.

| Layout (road 5 m, 6 houses, 2 cars each) | Green | Result |
|---|---|---|
| As first drawn: paved front yards, paved terrace under the overhang | 542 m² (31.2%) | 152 m² short |
| Planted front yards around two paved stalls, 1.2 m entry path | 608 m² (35.0%) | 86 m² short |
| Grass driveway (paved wheel strips only), entry path, terrace kept | 660 m² (38.0%) | 34 m² short |
| Same, road narrowed to 4 m | 718 m² (41.4%) | 24 m² spare |
| **Current default: grass driveway, entry path, no terrace or decking under the overhang** | **794 m² (45.8%)** | **100 m² spare** |

The current default depends on two things the municipality has to accept:

- Planting under the first-floor overhang counts as green (134 m² of the total). Without it the figure is 660 m² (38.0%).
- Grass under parked cars counts as green. Without it the total is about 742 m² (42.8%), which still passes.

The 100 m² spare is the budget for any other hard surface in the yards, about 16 m² per house.

One УПИ is the easiest way to pass the indicators. ЗУТ чл. 19, ал. 5 lets the ПУП set plot sizes freely for low connected housing in more than two plots, so six plots are possible, but the indicators then apply per plot and each middle house falls below 40% on its own. Three УПИ of two houses each do pass; see the next section.

Not counted in the model: the premium garages (about 30 m² each) are left out of footprint and РЗП. If they are built garages, footprint is about 558 m² (32%) and РЗП about 1,190 m² (Кинт 0.69).

### One УПИ or three: financial flexibility

**Decision (2026-11-21): the project is designed on one УПИ of 1,735 m², with the lane as a private internal alley inside it.** All indicators are taken on the whole plot: Кинт 1.2 gives a РЗП ceiling of 2,082 m² (1,735 m² at Кинт 1.0). Three УПИ remain an option for financing only, to be merged back into one.

Why keep the option: financing, investor, обезщетение and the timing of sales are all undecided, and the market may be weaker by 2029. The row of 6 houses is the same either way; a split into 3 УПИ of 2 houses each needs свързано застрояване on the two inner boundaries.

Two conditions follow from designing on one УПИ:

- The lane must stay private. If it becomes a municipal dead-end street under ЗУТ чл. 81, its 302 m² leave the plot for good and the ceiling drops to 1,433 / 1,720 m²; merging cannot bring it back.
- Anything that passes only on the whole plot (more РЗП on the middle houses, the green minimum without both assumptions) can get a building permit only while the plot is one УПИ. If the ПУП starts with three, merge first, then apply.

- Three УПИ: each is a separate property that can be sold or mortgaged alone, with its own building permit and commissioning. One building site for all three is still possible.
- One УПИ: a part can only be sold as ideal parts of the land plus право на строеж, and a mortgage sits on the whole plot.
- Merging 3 УПИ into 1 later is an amendment of the ПУП under ЗУТ чл. 134, ал. 2, т. 6 at the owner's request, roughly 3–6 months when all three have the same owner (not checked for община Родопи). It has to happen before any of them is sold or mortgaged. Splitting one built УПИ later is much harder.
- The boundaries cannot be moved: with houses на калкан the boundary runs along the party wall, so the split is fixed at 2 + 2 + 2.

Indicators per УПИ (Variant B defaults: grass driveway, no terrace under the overhang):

| | УПИ 1 (west) | УПИ 2 (middle) | УПИ 3 (east) |
|---|---|---|---|
| Frontage | 23.01 m | 16.42 m | 21.01 m |
| РЗП | 388 m² | 354 m² | 388 m² |
| **Lane inside the УПИ** | | | |
| Area | 660 m² | 471 m² | 603 m² |
| Плътност | 25.9% | 33.1% | 28.4% |
| Кинт | 0.59 | 0.75 | 0.64 |
| Green | 48.7% | 42.0% (9 m² spare) | 45.5% |
| **Lane separate** | | | |
| Area | 545 m² | 389 m² | 498 m² |
| Плътност | 31.4% | 40.1% | 34.4% |
| Кинт | 0.71 | 0.91 | 0.78 |
| Green | 59.0% | 50.9% (42 m² spare) | 55.0% |

Green on the middle УПИ if the two assumptions from the green-area section are not accepted:

| Case | Lane inside | Lane separate |
|---|---|---|
| Both accepted | 42.0% | 50.9% |
| Paved under the cars | 36.5%, fails | 44.2% |
| Overhang strip not counted | 33.1%, fails | 40.1%, no spare |
| Neither accepted | 27.6%, fails | 33.4%, fails |

With the lane inside and the overhang strip not counted, УПИ 3 fails as well (37.8%).

If the plot is split, how the lane is handled decides the outcome:

- 3 УПИ with the lane inside each (право на преминаване across the others) keep the full 1,735 m² for Кинт, but the middle УПИ passes the green minimum only if the municipality accepts both assumptions. Whether община Родопи accepts УПИ without their own street frontage is not checked.
- 3 УПИ with the lane as a separate private plot survive the loss of either assumption, at the cost of 302 m² of plot area for Кинт while split. A private plot can be merged back; a municipal street cannot.
- 2 УПИ of 3 houses each with the lane separate pass even with neither assumption (44.3% and 40.4%), but give two pieces to sell instead of three.
- With the lane separate, an attic as a third level on the middle УПИ (about 440 m² РЗП) fits only at Кинт 1.2 (ceiling 467 m²; 389 m² at Кинт 1.0).

Moving the land into the new company does not depend on this choice. To ask: whether to transfer after the ПУП is in force so documents are not reissued midway, апорт or sale, and ДДС on later sales of УПИ.

## Question: a separate flat on a third floor of each house

| Third floor option | Added РЗП | Row РЗП | Кинт | Fits Кинт 1.0? | Fits Кинт 1.2? |
|---|---|---|---|---|---|
| None (today) | — | 1,130 | 0.65 | Yes | Yes |
| Pitched roof + habitable attic | +271 | 1,401 | 0.81 | Yes | Yes |
| Full floor on the ground footprint | +498 | 1,628 | 0.94 | Yes | Yes |
| Full floor matching floor 2 (with south overhang) | +632 | 1,762 | 1.02 | **No** | Yes |

РЗП mostly allows it. The obstacles are elsewhere:

1. **The filing.** Three single-family houses are declared. Flats make the buildings multi-family, which changes the РИОСВ assessment, the well regime (notification applies to single-family houses), and sewage sizing.
2. **Height.** Three flat-roof floors come to about 9.5–10 m against a 10 m cap.
3. **Green area.** Passes at two floors with 100 m² spare; more dwellings need more parking, which uses that up.
4. **Access.** One internal stair per house today; a separate flat needs a common stairwell.

## What the change from 3 to 6 houses touches

The change can be made through a new procedure after the ПУП at a cost of about 12 months. The aim is to start it now instead. These are the rules each utility track runs on, read from the texts on 19.11.2026:

| Track | Rule | What it means here |
|---|---|---|
| Electricity | Наредба № 6/2024 (КЕВР), чл. 7–9, 15–18: the study request is filed by whoever has the right to build and states the number of future metered objects and the power. Opinion within 14 days, valid 1 year; preliminary contract valid 2 years. A later increase needs the operator's consent, at the applicant's cost (чл. 17, ал. 3) | Ask for the final count (6 or 12 meters) from the start. Working assumption: 15 kW three-phase per house, about 90 kW in total |
| Well | Закон за водите, чл. 43, ал. 2: free abstraction up to 10 m³/day, for individuals, for own needs, on property inside settlement boundaries. Чл. 44, ал. 4: built after notifying Басейнова дирекция | 6 households need about 2.7 m³/day and 12 about 5.4 (3 people × 150 l, our assumption), against 3.6 declared. Open: plot outside the village, houses built for sale, one shared well |
| Sewage | ЗУТ, чл. 87: without a sewer, watertight pits or on-plot treatment, for low-rise housing. Чл. 47, ал. 2: pits and wells at least 3 m from plot boundaries. Закон за водите, чл. 46, ал. 4: outside settlements, discharge up to 10 m³/day and 50 equivalent inhabitants with primary treatment needs no permit | Six pits, one shared pit or a small treatment unit all look possible; yards are about 8 m wide |
| Fire water | Наредба № Iз-1971, чл. 161–163, 181, табл. 17а: buildings over 35 m² need external fire water; with no water main, a reservoir. 22 m³ for a building or fire sector of 120–1,000 m² floor area, 36 m³ above 1,000 m². From groundwater: an 18 m³ shaft refilled at 5 l/s (чл. 163, ал. 2) | 22 m³ if each house is its own fire sector; 36 m³ or more if the row (1,130 m²) is one building. The well (0.45 l/s) cannot feed it directly |
| Fire access | Наредба № Iз-1971, чл. 27: road at least 3.5 m wide, paved for 100 kN per axle, every ground-floor outer wall within 90 m of it along the hose route. A dead end over 45 m ends in a 12 × 12 m turning area | The internal lane is about 60 m. Modelled below: the green area survives, but the turning area does not physically fit |
| Parking | Наредба № РД-02-20-2/2017, приложение № 5: 1 space per dwelling | 12 spaces today: 2 per house at 6 houses, exactly 1 each at 12 dwellings |

Not checked: the copy of the parking regulation used may predate later amendments; the 150 l per person and 15 kW per house are assumptions, not norms; how a connected row is classified for fire purposes (six Ф1.4 buildings or one) is a question for the designer.

### Fire reservoir and turning area in the model

Switches in the layout controls (`fireTurn`, `fireTurnSide`, `fireTank`, `fireTankBuried` in `src/model.js`), off by default until the requirement is confirmed. The plan assumes the entrance is at the west end (municipal road to the north-west), so the lane is a dead end running east.

Neither element is a building, so РЗП (1,130 m²), Кинт (0.65) and плътност (29%) do not change by themselves. What changes is the green area and the end house.

| Case (Variant B defaults) | РЗП | Green | Effect on the end house |
|---|---|---|---|
| No fire measures | 1,130 m² | 794 m² (45.8%) | None |
| Buried reservoir, 22 or 36 m³, planted on top | 1,130 m² | 794 m² (45.8%) | None |
| Open reservoir, 36 m³ | 1,130 m² | 770 m² (44.4%) | None |
| Turning area at the east end (end of the dead end) | 1,130 m² | 761 m² (43.9%) | Runs 2 m into the east premium house along 9 m; covers its garage |
| Turning area at the west end (by the entrance) | 1,130 m² | 750 m² (43.2%) | Runs 2 m into the west premium house along 7 m; covers its garage |
| Turning area kept, end house shortened by 2 m | 1,091 m² (Кинт 0.63) | 761 m² | Loses 39 m² of РЗП and its double garage |
| Turning area kept, end house moved back 2 m | 1,130 m² | 741 m² (42.7%) | Loses 20 m² of rear yard and its double garage |

- **Where the turning area goes.** Чл. 27, ал. 7 says a dead-end fire road over 45 m "ends" in the turning area, so by the text it belongs at the far (east) end, not at the entrance.
- **It does not fit at either end.** Lane 5 m plus front yard 5 m give 10 m of depth against 12 m needed. Keeping it costs the end house its garage (2 of the 12 parking spaces) and either 39 m² of РЗП or 20 m² of yard.
- **The way to avoid it.** Only dead ends over 45 m need a turning area, and every ground-floor wall must be within 90 m of the fire road. If the first 45 m of the lane are designated the fire road, the east end of the row is about 15 m further, so no turning area would be needed. This is our reading and needs the designer and the fire service to confirm (question 24).
- **Where the reservoir goes.** At the entrance, in the west side yard next to the street line, buried and planted on top. Чл. 184, ал. 5 lets houses use a pumping and filling point placed by the street line, so the fire truck does not need to enter the plot; the reservoir must be within 150 m of the farthest part of the buildings.
- **Green minimum.** Holds in every case (694 m² needed).
- Assumptions: reservoir working depth 1.5 m (area = volume / depth); entrance from the west.

### Where the well, treatment plant, reservoir and turning area go

Drawn on the row plan (switch "Покажи инфраструктурата", on by default; `util` in `rowMetrics()`). The public road runs along the west boundary, left of Premium 1 (confirmed by the owner, 19.11.2026). The plan's "north" is a drawing convention: it is really ENE at 63° (see "Real orientation and sun"). Today's parcel is 1,800 m²; the model's 1,735 m² is the УПИ after the 2.25 m strip on the west.

| Element | Place | Why |
|---|---|---|
| Fire reservoir, 22 m³, buried | Under the lane, just inside the entrance | Takes nothing from the yards; the filling point sits at the street line so the fire truck need not enter (Наредба № Iз-1971, чл. 184, ал. 5) |
| Treatment plant | Under the lane at the east end, 3 m from the boundaries | Lorry access for sludge from the lane; as far as possible from the well; common land, not a private yard |
| Well | South-west corner, in the west side yard, 3.5 m from the boundaries | About 55 m from the treatment plant; the 5 m side yard is the only strip wide enough to keep 3 m from the boundary (ЗУТ, чл. 47, ал. 2); drilling rig can reach it |
| Turning area | None | See below |

The turning area is avoidable three ways:

1. **Fire road of 45 m.** Only dead ends over 45 m need a turning area (чл. 27, ал. 7). With the first 45 m of the lane as the fire road, the farthest ground-floor wall is about 38 m away along the hose route, against 90 m allowed. Nothing else in the model changes. This is our reading.
2. **The lane as a dead-end street under ЗУТ, чл. 81.** Чл. 27, ал. 7 exempts such streets up to 100 m, and чл. 81 itself asks for a turning widening only above 100 m; minimum width 3.5 m. The street leaves the УПИ (the municipality acquires it), so the УПИ becomes 1,433 m²: Кинт 0.79, плътност 35%, green 794 m² = 55.4%. Each house can then be its own УПИ with frontage on the street: a middle house gets 194 m² (Кинт 0.91, плътност 40%, green 51%), the end houses 351 and 303 m² (green 64% and 58%). All pass the Жм limits per plot, which the earlier one-УПИ note did not expect; that note was written before the grass driveway and with the lane inside the plot.
3. **Access from the municipal road on the west.** From that road the farthest ground-floor wall is about 83 m along the hose route, inside the 90 m allowed, so the row may need no fire road inside the plot at all. The margin is thin (7 m) and depends on the road qualifying as a fire road (3.5 m wide, paved for 100 kN per axle).

If a turning area is imposed anyway, the cheapest version is at the east end with the end house moved back 2 m and built without a garage (РЗП unchanged, 20 m² less rear yard, 2 parking spaces lost).

Not found: a national figure for the minimum distance between a well and a treatment plant or pit; the designer and РЗИ set it. Not known: groundwater flow direction; the well should be upstream of the treatment plant, so the two may need to swap ends. A treatment plant instead of watertight pits is another departure from the РИОСВ filing. Option 2 changes Кинт against a 1.0 cap for the 12-dwelling variant (1,628 / 1,433 = 1.14).

### One system per house, and how to stay out of sampling regimes

Switches "Пречистване" and "Вода" in the layout controls (`wwtp`, `well` in `src/model.js`). Default: a treatment unit in each house, one shared well.

**Do they count in РЗП?** No. Застроена площ is measured from the walls of the first above-ground floor, and РЗП is the sum of above-ground floors (ЗУТ, ДР § 5, т. 15 and 18). A borehole, a buried treatment unit and a buried reservoir add nothing to ЗП, РЗП or плътност, and planted ground above them still counts as green. Only an above-ground pump or plant room would count.

| | One per house | One shared |
|---|---|---|
| Treatment unit | Under each front yard next to the lane, 2.2 × 1.5 m (assumed size for a 4–6 person unit); lorry reaches it from the lane | Under the lane at the east end, 6 × 2 m |
| Well | In each rear yard, 3.5 m from the rear boundary, centred (houses must be at least 6 m wide to keep 3 m from side boundaries) | South-west corner |
| Well to treatment distance | About 18 m on the same plot, 20 m to a neighbour's unit | About 55 m |
| Who owns and maintains | Each buyer, from day one | A common part; needs an owners' agreement |

What triggers sampling, and how the design stays below it:

- **Drinking water.** Наредба № 9/2001 does not apply to water from individual sources unless it is used for commercial or social activity for drinking (чл. 2, ал. 1, т. 4). A household's own well is outside the monitoring regime. The protection-zone regime starts above 10 m³/day or 50 people (Закон за водите, чл. 119).
- **The well.** Free and by notification only, up to 10 m³/day, for an individual's own needs (Закон за водите, чл. 43, ал. 2; чл. 44, ал. 4). One well per house, owned by the buyer, is the clearest fit. A shared well operated by the developer for houses being sold is the weak point: it can be read as supply to others.
- **Wastewater.** No discharge permit, and so no permit-based monitoring, for domestic wastewater outside settlements up to 10 m³/day and 50 equivalent inhabitants with at least primary treatment (Закон за водите, чл. 46, ал. 4, т. 1); inside settlements without a sewer ЗУТ applies, which allows either watertight pits or on-plot treatment (чл. 87). Six units of about 4 people each stay far below the threshold, alone or together.

Trade-offs: six wells and six infiltration points 8 m apart are hygienically worse than one well 55 m from one plant, so per-house treatment with one shared well is the middle option; the wells count against the village's quota for citizens' wells (чл. 43, ал. 4); per-house treatment units replace the watertight pits declared to РИОСВ, which is one more change to the filing. Not found: who checks a household unit after commissioning, and where the treated water may go (soakaway, irrigation). Those are questions for the designer.

### A treatment unit in each house: what the law requires

It is allowed either way. Which rule applies depends on whether the plot is inside the village boundary, which is still unconfirmed.

| | Inside the boundary, no sewer | Outside the boundary |
|---|---|---|
| Rule | ЗУТ, чл. 87, ал. 1: watertight pits **or** treatment units on the plot. Закон за водите, чл. 46, ал. 4, т. 2: no discharge permit, ЗУТ applies | Закон за водите, чл. 46, ал. 4, т. 1: no discharge permit up to 10 m³/day and 50 equivalent inhabitants, with at least primary treatment |
| Conditions | 3 m from plot boundaries (чл. 47, ал. 2), sanitary rules, and the Наредба № 4/2005 on building plumbing (it has no chapter on household units) | Same 3 m; one house is about 4 people and 0.6 m³/day, and all six together are about 24 people and 3.6 m³/day, both far below the limits |
| Permit and sampling | None: no permit means no permit-based monitoring | None |

- **The unit.** A factory unit, CE-marked to БДС EN 12566-3, is part of the "ВиК" design in the building permit.
- **Fit in the front yard.** A 2.2 × 1.5 m unit fits even if each house becomes its own plot. A middle front yard is 8.21 m wide, which leaves a 2.2 m band 3 m from each side, and 5.5 m deep. If the lane becomes a street, the unit sits 3–4.5 m from the street line.
- **Where the treated water goes.** The Закон за водите bans direct discharge into groundwater and the indirect discharge of priority substances (чл. 118а). Soaking household effluent through soil is not banned outright, and discharge to ground needs no permit. With the wells now going 30 m deep, the safe choice is a sealed tank that feeds garden irrigation, not a soakaway next to the house.
- **Who checks it after commissioning.** Nobody on a schedule. The owner keeps it serviced, and РИОСВ or the municipality act on complaints.
- **The filing.** It declares watertight pits. Switching to units is a change to tell РИОСВ about (question 4).

### Six wells and six treatment units: cost and upkeep

Rough figures from Bulgarian price lists and listings, November 2026. None is a quote.

| Item | One per house (× 6) | One shared |
|---|---|---|
| Well, 22 m, PVC casing | €1,500–2,500 each (40–80 €/m; bundled offers "up to 50 m" from €2,200) | Same well |
| Pump and pressure tank | €400–600 each | Bigger pump, tank, pump room, ~60 m of pipe and 6 meters: about €4,000–7,000 (estimate) |
| Notification, water test | Notification is free; a lab test from about €80 | Same, once |
| **Water total** | **about €12,000–19,000** | **about €6,000–10,000** |
| Treatment unit, 4–6 people | €2,500–3,500 each (EU prices for 5-person units) plus €1,000–2,000 installation | One unit for ~25 people plus ~70 m of sewer: about €11,000–20,000 (estimate) |
| **Treatment total** | **about €21,000–33,000** | **about €11,000–20,000** |
| Running cost per house | Compressor 50–80 W non-stop (~€100–150/year), sludge pump-out every 1–2 years | Shared, plus an owners' agreement and someone responsible |

For comparison, a watertight pit for 4 people (0.6 m³/day) fills a 10 m³ tank in about 17 days: roughly 20 lorry visits a year per house. At an assumed €80–120 a visit that is €1,600–2,400 a year per household, which makes the pits declared in the filing the most expensive option to live with.

The extra for going per house is about €10,000–14,000 on water and €10,000–13,000 on treatment, roughly 2% of the €1.06M build cost.

Distances and practical points:

- **No protection zone.** Наредба № 3/2000 on sanitary protection zones does not apply to individual local water sources (чл. 1, ал. 2).
- **Well to treatment.** No Bulgarian figure found. In the per-house layout they are about 18 m apart on the same plot. For comparison, England's rules keep a drainage field 50 m from a drinking-water well. The well here is in the shallow Quaternary aquifer, and the filing already says drinking water comes from bottled water, so the well is for household use and irrigation. Even so, treated water should not soak away near the wells: send it to a sealed tank for irrigation or to a drain, not into the ground at the front of each house.
- **Wells 8 m apart.** Six small wells at household rates (well under 1 m³/day each against 0.45 l/s design flow) should not interfere noticeably in a porous aquifer. Not verified by a hydrogeologist.
- **Drilling access.** The row has no gaps, so a rig cannot reach the middle rear yards once the houses stand. Drill all six wells before construction starts.
- **Maintenance.** A 22 m well needs a pump replaced every 8–12 years and occasional cleaning (airlift from about €350). Treatment units need a service visit about once a year and sludge removal every 1–2 years; each owner arranges their own.

### Wells at 30 m: what the depth changes

The consultant says the wells need to be 30 m deep and that this needs a specific environmental report. The filing declared 22 m.

**The depth itself is not the trigger.** The Закон за водите has no depth limit for citizens' wells. A well is free, needs only a notification to Басейнова дирекция and goes on its register when all of these hold (чл. 43, ал. 2–3; чл. 44, ал. 4–5; guidance from БД „Черноморски район"):

- the owner is a natural person, the plot is inside the settlement boundary, and the water is for that household only;
- it draws from **the first groundwater body from the surface**;
- it takes no more than 10 m³/day, within the settlement's maximum volume and well count set in the river-basin plan.

The notification must state the depth. If any condition fails, Басейнова дирекция tells the owner that a **permit for water abstraction through a new facility** is needed. That route needs hydrogeological documentation, which is most likely the "report" meant. The well is also a 6th-category structure that needs a building permit either way (Наредба № 1/2007, чл. 89, ал. 4, т. 1).

So the real question is whether 30 m is still in the first water body under this plot. If it is, 30 m changes nothing but the drilling bill (8 m more at 40–80 €/m, about €300–650 per well). If it is not, every well goes the permit route.

I did not find a 30 m threshold at РИОСВ. РИОСВ Пловдив has answered a single-family house with a 30 m well by letter, without a screening procedure. A well is part of the investment proposal the filing already covers.

**What this does to six wells.** If 30 m means a permit and a report per well, six wells mean six studies, six permits and six permit holders, while the developer still owns the plot. One shared well means one study, one permit and one water meter, with a sub-meter per house. The shared well also loses nothing on sampling: Наредба № 9 exempts both individual and public local sources unless the water is used for drinking in a commercial or social activity (чл. 2, ал. 1, т. 4).

**Spacing in the yards.** The middle rear yards are 8.21 m wide and about 10 m deep (7.7 m behind the covered terrace).

| Layout | Distance between neighbouring wells |
|---|---|
| Centred in each yard (current model) | 8.2 m |
| Same corner in every yard | 8.2 m: corners do not help |
| Alternating corners | Pairs end up 1–2 m apart across the party line |
| Zig-zag in depth (one near the rear boundary, the next behind the terrace) | About 9 m |

There is no legal minimum distance between two wells. Басейнова дирекция's guidance only says to keep a well away from a neighbour's boundary. Corners are the worst place on both counts. If the houses become separate plots, ЗУТ чл. 47 ал. 2 keeps a well 3 m from each boundary, which leaves a 2.2 m-wide band in the middle of a middle yard.

**Recommendation.** If the 30 m requirement holds, use one shared well in the west side yard (south-west corner, 5 m margin, already in the model). It can be drilled at any time from the public road with no rig access through the row, and it needs one permit instead of six. Keep a treatment unit per house. If Басейнова дирекция confirms that 30 m is still the first water body, per-house wells remain possible, but must still be drilled before construction.

## The street: neighbouring ПУП and the cadastre project

Checked 2026-11-21 from public notices and what the owner saw in КАИС.

- **Neighbouring ПУП, same масив 28.** Заповед № 446 от 21.01.2025 г. на община Родопи approved a ПУП-ПРЗ for former plots 06447.28.145 and 06447.28.163 in м. „Бозалъка": nine residential УПИ (28.623 to 28.631), a dead-end street and widening of the field road. With it came a ПУП-ПП (парцеларен план) for electricity and water routes to those nine УПИ. Plot 28.145 no longer exists in КАИС; the new plots are entered.
- **Cadastre project on the street.** КАИС shows „Проект 01-696836-04.10.2026" covering all plots along the street. Its type and applicant are not visible. It may be the cadastral step of the plan above. Not confirmed.
- **What a ПУП-ПП means.** It fixes the route and the servitude strip on paper; it is not construction. The investor (the owners of the nine УПИ) pays and builds, after connection contracts with ВиК and ЕРП Юг and a building permit. No public record of contracts, permits or construction was found.
- **Why it matters here.** Road widening or a servitude along the street can take land or restrict building and planting in the front yards and the internal road. If the water main and cable are built, connecting to them could replace the well. Until then the filing (well, pits) stays the correct description.

Nearby plots checked in КАИС on 2026-11-21 (distances are straight lines between plot centres, from map coordinates):

| Plot | Местност | Status in КАИС | Area | Old number | From 06447.28.20 |
|---|---|---|---|---|---|
| 06447.28.612 | Бозалъка | Urbanised, low-rise (up to 10 m), parcel „жил. стр." | 500 m² | 28.10 | about 175 m |
| 06447.28.524 | Бозалъка | Urbanised, low-rise (up to 10 m), parcel „жил. стр." | 635 m² | 28.8 | about 225 m |
| 06447.27.177 | Горни брантии | Agricultural territory, НТП „за складова база"; one 99 m² single-storey administrative building | 1,719 m² | 27.100 | about 390 m |

- 28.612 and 28.524 have completed the change of use, so each had an approved ПУП with electricity and water schemes. They sit in groups of new parcels (28.611–28.615, 28.523–28.528). Their ПУП shows where the nearest supply comes from.
- The owner reports a small transformer by 27.177. КАИС shows no transformer on that plot. Its owner (ЕРП Юг or private) and free capacity are not public; only a connection study from ЕРП Юг answers that. About 390 m on low voltage for six houses is at the limit because of voltage drop.
- КАИС application 01-696829 of 04.10.2026 (about 300 m away, per the owner) could not be opened. It was filed the same day as 01-696836, seven numbers apart, so the two are probably related. Not confirmed.
- No transformer on our own plot: the owner rules it out.

### Possible sewer and water route to the main road

The owner reports that the Куклен sewer runs at the main road about 950 m north, reached along the same municipal road, and that the ground falls from our plot towards it. Plots along the route, checked in КАИС on 2026-11-21:

| Plot | What it is | Ownership | Whose consent |
|---|---|---|---|
| КАИС project 01-696836 | The road in front of our plot, in procedure | — | Община Родопи |
| 06447.21.5 | Irrigation canal, 10,859 m² | State private | The canal operator (probably „Напоителни системи" ЕАД; not confirmed) |
| 06447.21.4 | Agricultural / service road, 1,341 m² | Municipal public | Община Родопи |
| КАИС project 01-595643 of 22.08.2026 | In procedure; could not be opened | — | Unknown |
| 06447.21.2 | Road of the national road network, 46,905 m² | Exclusive state | АПИ |

- The route runs entirely over public plots, so no private servitudes are needed.
- The slope down to the north is what a gravity sewer needs. It does not stop a water main, which runs under pressure; about 1 bar is lost per 10 m of rise.
- The canal is one crossing, done by drilling under it with the operator's consent. It does not block the route.
- Rough estimate, not a quote: about 950 m of street sewer at €100–200 per metre is €95,000–190,000, plus €10,000–30,000 for the canal crossing, plus design and fees. This only makes sense shared with the other new parcels along the road.
- Not checked: elevations along the route, the capacity of the collector at 21.2, and whether ВиК Пловдив accepts a connection there.

## Water main and electricity: distances, cost and procedure

Reported by the owner on 2026-11-23, not yet checked with ВиК or ЕРП Юг:

- **Water:** the nearest public main is about 540 m away, next to ПИ 06447.21.250.
- **Electricity:** a pole about 240 m away, on a line the owner calls "14 kV". More network is near ПИ 06447.21.250, 540–600 m away.

Researched 2026-11-23. BGN figures converted at 1.95583. Construction costs are estimates built from published prices and a few real projects, not quotes; fees are from the operators' price lists.

### Water: a 540 m main from ПИ 06447.21.250

ВиК Пловдив may refuse a connection when there is no main next to the plot (Наредба № 4/2004, чл. 14а, т. 2), which is why the earlier answer was "no main". The fix is a new public main, paid for by the investor, which becomes municipal property after handover and is operated by ВиК.

**Procedure** (about 9–18 months, the ПУП-ПП can run in parallel with the ПУП-ПРЗ):

1. Изходни данни from „ВиК" ЕООД Пловдив, within 14 days. They must state the main's diameter and material and the available pressure (свободен напор) at the tie-in (чл. 13).
2. ПУП-ПП for the route, if it crosses field roads or the canal rather than regulated streets: about 4–9 months, approved by Общински съвет „Родопи".
3. Design, part ВиК, with hydraulic calculation; ВиК checks it within 14 days (чл. 14б).
4. Building permit for the линеен обект, then a permit to dig and restore the road.
5. Connection contract, offered within 14 days of the approved projects (чл. 14в).
6. Construction, Акт 16 and handover: about 2–4 months.

**Pipe size.** At least 75 mm internal diameter (Наредба РД-02-20-2/2024, чл. 134). PE d110 SDR17 (about 97 mm) is the safe choice; d90 SDR17 just passes; d90 SDR11 does not. The price difference is only €2–5 per metre.

**Cost estimate (EUR, excl. VAT):**

| Item | Low | High |
|---|---|---|
| 540 m PE100 d110 in trench, 70–170 €/m (gravel road at the low end, asphalt at the high end) | 37,800 | 91,800 |
| Tie-in to the existing main | 1,500 | 4,000 |
| 1–2 fire hydrants | 1,500 | 6,000 |
| Canal crossing by drilling, if needed | 3,000 | 9,000 |
| Service connection, meter pit and meter: 6 (low) to 12 (high), €800–2,000 each | 4,800 | 24,000 |
| ПУП-ПП and ВиК design | 4,000 | 10,000 |
| Supervision, as-built survey, cadastre entry | 2,500 | 6,000 |
| Fees | 600 | 1,500 |
| Contingency 10–15% | 5,600 | 22,800 |
| **Total** | **about 61,000** | **about 175,000** |

Central case about **€90,000–110,000**. For comparison, the Брестовица high-zone network (8.4 km PE d90–d160 with connections and hydrants, 2024) came to about €165 per metre, and the Строево replacement (2026) to about €290 per metre.

**ВиК Пловдив fees** (with VAT): изходни данни for connection €80, изходни данни for a ПУП €80, approval of the ПУП €55, approval of the ВиК project €55, opinion for Акт 16 €200, meter account €17. No КЕВР-regulated connection fee for water. Община Родопи's fees for the ПУП-ПП and the permit were not found online; probably a few hundred euros.

**What a public main changes here:**

- **Fire water.** A hydrant (DN ≥ 80) on the main, within 200–300 m of the houses, giving 5 l/s at 0.14 MPa, normally covers the external fire-water requirement for a village under 5,000 people (Наредба Iз-1971, чл. 166, 170, табл. 15а). That would **remove the 22–36 m³ fire reservoir** and its turning area from the plot. To confirm with the fire-safety designer and РДПБЗН.
- **Wells.** With a ВиК connection, the 30 m well question and the Басейнова дирекция notifications fall away, apart from an optional irrigation well. The РИОСВ filing declares a well, so that is another change to it.
- **Pressure.** Head loss over 540 m is about 3 m at 5 l/s for d110 (about 8 m for d90). A booster is needed only if the pressure at the tie-in, minus the rise to the plot, falls below about 14 m during fire flow. Ask for the pressure figure explicitly.
- **Cost sharing.** No legal mechanism refunds the investor when others connect later; the main is municipal after handover. Options are a co-financing agreement with the neighbouring owners before construction (see "Sharing the cost with the neighbours" below), or asking Община Родопи to put it in its investment programme (it co-funds networks in Брестовица).

### Electricity: the pole at 240 m or the grid at 540–600 m

**What "14 kV" is.** Bulgaria has no 14 kV level. The pole carries one of:

- **0.4 kV, low voltage:** one black twisted cable (САВТ), or 4–5 wires stacked down the side of the pole on small insulators; house service drops and often street lights on the same poles.
- **20 kV (or 10 kV), medium voltage:** only 3 bare wires on a cross-arm at the top, long insulators (25–35 cm), taller poles with danger signs, no house drops. Around Plovdiv most likely 20 kV.
- A pole transformer (МТП) on a platform between two poles marks the change: the 3-wire side is medium voltage, the 4–5-wire or САВТ side is low voltage.

The cheapest sure answer is ЕРП Юг's "информация от техническа картотека", €17.90 with VAT; the study (становище) settles it anyway.

**Voltage drop on low voltage** (estimate; cos φ 0.95, simultaneous load 55 kW for 6 dwellings, 100 kW for 12; the drop already on the existing feeder is not included):

| Route | 6 dwellings, 4×150 | 6, 4×240 | 12, 4×150 | 12, 4×240 |
|---|---|---|---|---|
| 240 m | 2.3% | 1.6% | 4.2% | 2.8% |
| 600 m | 5.7% | 3.9% | 10.5% | 7.0% |

Design practice is about 5% on the feeder. So 240 m works for 6 or 12 dwellings on a 4×240 cable; 600 m is marginal for 6 and not acceptable for 12. On low voltage the real limit is usually the free capacity of the existing village transformer, which only the ЕРП Юг study answers.

**Options (EUR, excl. VAT, actual cost if paid by us):**

| Option | What gets built | Cost | Works for | Time |
|---|---|---|---|---|
| **A, low voltage at 240 m** | 240 m underground cable 4×240 (or САВТ on new poles), meter boards | €10,000–17,000 | 6; 12 only if the transformer has spare capacity | 12–20 months |
| **A, medium voltage at 240 m** | Tap on the 20 kV line, pole transformer 160–250 kVA on public land by the road, 240 m low-voltage cable | €30,000–50,000 | 6 and 12 | 18–30 months |
| B, low voltage at 600 m | 600 m cable, possibly two in parallel | €25,000–42,000 | Marginal for 6, not 12 | 15–24 months |
| B, medium voltage to the plot | 550–600 m 20 kV extension, pole transformer near the plot, short low-voltage cable | €45,000–75,000 overhead, €65,000–110,000 cable | 6 and 12 | 24–36 months |
| B, new transformer at the far end | Transformer by the existing grid, 600 m low-voltage feeder | €45,000–75,000 | Voltage drop remains | 20–30 months |

**The pole at 240 m is the better route either way.** The 540–600 m route is only worth it if ЕРП Юг says the 240 m line cannot take the load. ЕРП Юг itself quoted €50,000 in 2026 for a new kiosk transformer for a single house near Бургас, so at 90–180 kW a new transformer is likely to be prescribed.

**Who pays** (Наредба № 6/2024):

- The operator pays for and owns medium-voltage installations and low-voltage lines up to the meters (чл. 28, ал. 5; чл. 35; чл. 37). The applicant pays the regulated connection fee only.
- **That applies inside the строителни граници.** Outside them the price is set by individual project, which means actual cost (€30,000–110,000 above). Whether the plot counts as inside after the ПУП-ПРЗ is the single biggest electricity cost question.
- The applicant may design and build the facilities and sell them to ЕРП Юг at "взаимно признати разходи", offset against the connection price (чл. 28, ал. 6–8; чл. 29). Recognised costs are often well below what was spent.
- No formal way to make neighbours share; only a private agreement or a joint ПУП-ПП (see "Sharing the cost with the neighbours" below).

**ЕРП Юг fees** (excl. VAT; old tariffs converted to euros, likely to rise as КЕВР raised ЕРМ Запад's by 68–239% in 2024–25):

| Group | Fee | Per metre over 25 m |
|---|---|---|
| II, 7–15 kW (per house) | €296.55 | — |
| IV, 51–100 kW | €2,505.33 | €17.04 |
| V, 101–200 kW | €4,090.33 | €17.04 |

One 90 kW connection at 240 m is about €6,200 (at 600 m about €12,300); six separate 15 kW connections about €1,800, twelve about €3,600. Study fee €59 (51–100 kW) or €93 (101–200 kW).

**Procedure:** study within 14 days, valid 1 year; preliminary contract valid 2 years; project approval 10 working days; the connection contract needs the building permit and the approved part Електро; energising within 7 days of the access contracts. Realistic total 1–1.5 years on low voltage, 1.5–3 years if a transformer is needed. An amendment to Наредба № 6 was in draft in 2026.

### Both together

| | Low | Central | High |
|---|---|---|---|
| Water main 540 m | €61,000 | €90,000–110,000 | €175,000 |
| Electricity at 240 m | €2,000 (fees only, operator builds) | €30,000–50,000 (transformer, we pay) | €50,000 |
| Electricity at 600 m instead | — | €45,000–75,000 | €110,000 |

Against the wells, treatment units and fire reservoir already in this file, the water main is the larger cost but removes the fire reservoir and the well permits. Filing the ЕРП Юг study and the ВиК изходни данни now costs under €200 together and turns most of these ranges into numbers.

### Sharing the cost with the neighbours

The owner reports (2026-11-23) 4–5 neighbouring owners on the route, each with a residential project of several dwellings: about 25–30 households in total. None of the law found here makes later connections repay the first investor, so the split has to be agreed by contract before anything is built. Figures are estimates.

**What the larger group changes**

- **Electricity:** 28 dwellings at 15 kW is about 420 kW installed, roughly 150–170 kW at the same time. That is more than any existing village transformer is likely to spare, so plan on one new pole or kiosk transformer of 250–400 kVA for the whole group, about €40,000–60,000 if paid by the investors. One shared transformer is far cheaper per household than each project asking for its own.
- **Water:** a d110 main carries 28 households easily; the diameter and cost hardly change. One hydrant serves everyone within 200–300 m.
- **Procedure:** one ПУП-ПП, one design and one contractor for the whole route instead of several. Check first whether a neighbour already has an approved ПУП-ПП (the nine УПИ under Заповед № 446/2025 came with one for electricity and water): reusing or extending it saves 4–9 months.

**Ways to split**

| Key | How it works | Fits |
|---|---|---|
| Per household | Shared cost ÷ number of dwellings | Simplest; fair if everyone is about the same distance from the source |
| By capacity | Electricity by kW requested, water by number of meters or l/s | When projects differ in size; matches what each one asks ЕРП Юг and ВиК for |
| By segment | Each stretch of pipe or cable is split only among the households it serves; whoever is nearest the source pays for less | When plots sit at very different distances along the 540 m |
| **Hybrid (recommended)** | Common items (tie-in, transformer, ПУП-ПП, design, fees, supervision, hydrant) per household; pipe and cable by segment; each project pays its own service connections and meters | Fair and still easy to calculate |

**Rough share per household** (25–30 households; common water main €70,000–100,000 without the service connections, transformer and cable €40,000–60,000):

| | Per household | Our 6 dwellings | Our 12 dwellings |
|---|---|---|---|
| Water main | €2,300–4,000 | €14,000–24,000 | €28,000–48,000 |
| Electricity (if the investors pay) | €1,300–2,400 | €8,000–14,000 | €16,000–29,000 |
| Own service connections and meters | €800–2,000 per meter for water; electricity fee per meter | paid by each project | |

If the plots end up inside the строителни граници, ЕРП Юг builds the electricity network and the investors pay only the regulated fee per meter.

**How to set it up**

1. **Letter of intent** from all owners: the number of dwellings and kW each one needs, and agreement to file together. Draft in Bulgarian, with a signature table and a note on how to find the owners (from public ПУП and РИОСВ notices, the Имотен регистър, the кметство and the designers working nearby): [Писмо за намерение](https://claude.ai/artifact/SJkPjhe37fphcQHdH6f5wK) (private Claude doc; export to Word or PDF to print).
2. **One joint request** to ВиК (изходни данни) and to ЕРП Юг (становище) with the total for all 25–30 households, so the network is sized once. Each owner still signs their own connection contract later.
3. **A civil partnership (ДЗЗД under чл. 357 ЗЗД)** or a written agreement with one lead investor who contracts on everyone's behalf. It should fix:
   - the split key and how it is recalculated if the final dwelling counts change;
   - staged payments into a dedicated account (design, ПУП-ПП, construction), with a deposit at signing;
   - what happens if someone does not pay or drops out: their share is redistributed or they lose the right to connect through the group, and the deposit is forfeited;
   - a late-joiner fee for any of the signatories who connects later, paid back to the others pro rata;
   - who manages it, how decisions are taken (majority by share), and who signs with the designer, contractor, ВиК and ЕРП Юг;
   - how any amount ЕРП Юг pays for facilities built by the group (взаимно признати разходи) is shared back.
4. **One designer and one contractor** chosen jointly, with 2–3 quotes on a bill of quantities.
5. **Ask Община Родопи** to co-fund or include the main in its investment programme: 25–30 new households is a stronger case than one project.

Risks: projects move at different speeds (the ЕРП Юг study is valid 1 year, the preliminary contract 2), one owner dropping out raises everyone else's share, and outsiders who never signed can later connect to the public main for the standard fee only.

## Open questions for the permit consultant

The same 48 questions are on the site in Bulgarian (section „Въпроси", `src/Questions.jsx`), with a button that copies them as plain text.

**First: the four everything depends on**

1. Is there a screening decision on ОВОС-1125 yet? If not, has РИОСВ asked for more information, and what date is expected? (Public access opened 03.09.2026; nothing in the decisions list through 17.11.2026.)
2. The filing declares 3 free-standing single-family houses; the design is 6 connected row houses. Can the proposal be amended before the decision, or is a new notification needed, and what does that do to the timeline?
3. Has a чл. 124а ЗУТ request been filed with Общински съвет „Родопи" for the ПУП-ПРЗ? Number and date?
4. With a treatment unit in each house and one well (or a well in each house), are any regular water or wastewater samples required from the owners, by РЗИ, Басейнова дирекция or РИОСВ?

**Filing versus design**

5. We know the change from 3 to 6 houses can be made through a new procedure after the ПУП, at a cost of about 12 more months. Can that change start now: commission the ПУП-ПРЗ directly for 6 connected houses and amend the РИОСВ proposal in parallel?
6. Are 6 connected houses in one УПИ allowed in Жм, or does it need separate УПИ or комплексно застрояване? We design on one УПИ with the lane as a private internal alley. Can the ПУП instead set 3 УПИ of 2 houses each with свързано застрояване on the inner boundaries, reached by право на преминаване or a private lane plot, and how long does merging them into one УПИ take later?
7. With 12 dwellings (ground-floor flat plus a two-floor home above in each house), do the buildings become multi-family, and what does that change for РИОСВ, the well and the pits? (РЗП 1,628 m², Кинт 0.94, height about 9.6 m.)
8. Does „комплексен проект за ново строителство" in the filing mean a чл. 150 ЗУТ project (ПУП and investment project together)?

**Contradictions in the filing** (table above)

9. We want Кинт 1.2 in the чл. 124а assignment and the ПУП-ПРЗ. Why does the filing show 1.0 in point „а)", and does that need correcting with РИОСВ?
10. Which well volumes and flows are correct, and what exactly was declared to Басейнова дирекция?
11. One watertight pit for the plot or one per house, and of what volume?
12. Do the factual errors (община Пловдив ОУП, land status, Натура 2000 zones, construction period) need correcting, and can they delay the decision?
13. Is it an omission that point 12 does not list the ПУП-ПРЗ, the change of use and the well registration?

**The change to 6 houses: electricity**

14. Can the study request to Електроразпределение Юг be filed now for the final number of meters (6, or 12) instead of 3, and is it accepted while the plot is still a нива without a ПУП?
15. What power should be requested per house, and does the nearest transformer have the capacity, or will a new transformer or cable be needed at our cost?

**The change to 6 houses: water and sewage**

16. Does the notification regime hold for one shared well serving 6 houses built for sale, on a plot outside the village boundary?
17. Is a new notification to Басейнова дирекция needed with the volumes for 6 (or 12) households, and can it be filed now?
18. Is drinking water from a dispenser accepted at commissioning and by РЗИ, including for houses built for sale?
19. Six separate pits, one shared pit or a small treatment plant under the lane at the east end: which is easiest to get approved, what distance from the well is required, and where does the treated water go?
20. Where does the 30 m requirement come from, and what is the report: hydrogeological documentation for a permit under the Закон за водите, or information for РИОСВ under the Наредба за ОВОС? Is a 30 m well still in the first groundwater body from the surface under this plot? If so, the notification regime should still apply.
21. If 30 m needs a permit and a report, can one shared well serve all 6 houses under one permit, with a sub-meter per house, instead of 6 procedures? Who holds the permit while the developer owns the plot, and how does it pass to the buyers?

**The change to 6 houses: fire safety**

22. What fire-water reserve is required, where does the reservoir go, and can it sit under planted yard?
23. Can the well also serve for firefighting?
24. Can the turning area be avoided: by designating only the first 45 m of the lane as the fire road, by making the lane a dead-end street under ЗУТ чл. 81 (exempt up to 100 m), or by fire access from the municipal road?
25. If the lane becomes a dead-end street under ЗУТ чл. 81 (municipal), can each house be its own УПИ with frontage on it?
26. How is the row classified: six single-family buildings (Ф1.4) with fire walls between them, or one building? What changes with 12 dwellings?

**Procedure**

27. Has the ЗОЗЗ procedure before the commission at ОД „Земеделие" Пловдив started, what stage is it at, and roughly what is the fee for 1.8 дка of 4-та категория?
28. What is a realistic schedule to a building permit, and which steps can run in parallel?
29. Can you send the text of the Общински съвет „Родопи" decision with the Жм norms (number, date)? Does it set a minimum УПИ size, dwellings per УПИ, or parking?

**Indicators for the ПУП-ПРЗ and the design**

30. Do you confirm the 2.25 m strip taken on the west (УПИ about 1,735 m² of 1,800 m²) and the minimum setbacks from the side and rear boundaries?
31. Does planted ground under the floor-2 overhang (134 m²) count as green area? Does a grass driveway with two paved wheel strips?
32. Do you confirm 1 parking space per dwelling, and are open spaces in the front yard on a grass driveway accepted?
33. Do the two premium garages (about 30 m² each) count in footprint and РЗП?
34. How is height measured for a flat roof: to the top of the parapet?

**The street: neighbouring ПУП and the cadastre project**

35. Is КАИС application 01-696836 of 04.10.2026 (a project covering all plots along the street) ours? If not, whose is it, what does it change, and does it affect ПИ 06447.28.20 (strip taken, servitude)?
36. Under Заповед № 446/21.01.2025 (nine УПИ from former 28.145 and 28.163), where do the electricity and water routes of the ПУП-ПП run? Along our street, and with a servitude on our plot?
37. How wide is the road after the widening and how much is taken from our plot? Does it match the 2.25 m strip in the model?
38. Can we connect to that water main and cable? Are there contracts with ВиК Пловдив and ЕРП Юг and a build date? If so, should the well be replaced by a ВиК connection, and how is that reflected in the РИОСВ file?
39. Where do 06447.28.612 and 06447.28.524 (already urbanised, 175–225 m away) take electricity and water under their ПУП, and does that route pass 06447.28.20?
40. Who owns the transformer by 06447.27.177 (about 390 m away), what is its free capacity, and can it supply 6 houses at that distance without a transformer on our plot?
41. Are КАИС applications 01-696829 and 01-696836 (both of 04.10.2026) the same project?
42. Does ВиК Пловдив accept a sewer connection to the Куклен collector at the main road (ПИ 06447.21.2), about 950 m north along the municipal road, and a water connection from the same point? Is the pressure enough at our elevation?
43. Has any neighbour already filed or planned a sewer or water route along that road (КАИС projects 01-595643 and 01-696836), so the cost can be shared? What do the canal operator (ПИ 06447.21.5) and АПИ require for the crossings?

**Water main and electricity from the grid**

44. Is there a ВиК main next to ПИ 06447.21.250? What diameter, material and available pressure, and will ВиК Пловдив accept a 540 m d110 extension to our plot as a public main?
45. Does that route need a ПУП-ПП, and can it run in parallel with our ПУП-ПРЗ? Would a hydrant on it replace the 22–36 m³ fire reservoir? Can neighbours co-finance it, or would Община Родопи include it in its programme?
46. Is the line on the pole about 240 m away 0.4 kV or 20 kV? Does the nearest transformer have capacity for 90 kW (6 dwellings) or 180 kW (12)?
47. After the ПУП-ПРЗ, does the plot count as inside the строителни граници for ЕРП Юг's regulated connection price, or is the price set by individual project at actual cost?
48. If a new transformer is needed, where can it stand on public land by the road, who builds it, and at what recognised cost would ЕРП Юг take it over?

Other open items, not for the consultant:

- `brestnik-homes` quotes 1,170 m² / Кинт 0.67 and calls the 6-house layout "Variant A"; this repo says 1,130 m² / 0.65 and "Variant B". Align them.

## Sources

- [Община Родопи — съобщение от 08.04.2025 г. за Заповед № 446/2025 (ПУП-ПРЗ и ПП, м. Бозалъка)](https://rodopi.bg/saobshtenie-na-osnovanie-chl-18-al-10-ot-apk-75/)
- [ЗУТ (lex.bg)](https://lex.bg/laws/ldoc/2135163904) — чл. 19, чл. 43, чл. 178, ДР § 5
- [Наредба № 7 (lex.bg)](https://lex.bg/laws/ldoc/2135476546) — чл. 9–11, чл. 19–20, чл. 55
- [Закон за водите (lex.bg)](https://lex.bg/laws/ldoc/2134673412) — чл. 43, чл. 44, чл. 46
- [Наредба № 4/2004 за присъединяване към ВиК системите](https://www.dker.bg/uploads/normative_docs/naredbi/Naredba_4_MRRB.pdf) — чл. 12–14в
- [„ВиК" ЕООД Пловдив — услуги и цени](https://vik.bg/services/)
- [Наредба № Iз-1971 (2025)](https://mvr.bg/upload/286736/Naredba%20Iz-1971_2025_1.pdf) — чл. 163–170, табл. 15а
- [Брестовица, водопровод висока зона (plovdivnews)](https://plovdivnews.bg/obshtestvo/item/152161-mrrb-otpuska-nad-2-7-miliona-leva-za-vodoprovodnata-mrezha-na-brestovitsa/) and [length (plovdiv24)](https://www.plovdiv24.bg/novini/regionalni/Sled-godini-chakane-ministur-napravi-purvata-kopka-na-vazhen-proekt-v-plovdivsko-selo-2448126)
- [Строево, водопровод 2026 (24plovdiv)](https://www.24plovdiv.bg/novini/article/23363818)
- [ЕРП Юг — договор за присъединяване и цени](https://www.elyug.bg/Customers/Services/New_accession/Dogovor_Prisaediniavane.aspx) and [ценоразпис](https://www.elyug.bg/getdoc/5fa95e40-aa0f-496a-8f10-bf24e41be87a/Prices-EP-Yug.aspx)
- [КЕВР, протокол 352/11.12.2024](https://www.dker.bg/uploads/protokoli/zz/2024/prot-zz-352-11dec2024.pdf) — actual connection costs, ЕРМ Запад
- [ЕРП Юг quote for a БКТП, Бургас 2026 (e-burgas)](https://e-burgas.com/post/76-637-leva-za-dostap-do-mrejata-taka-izglejda-monopolat-na-er-yug-9444)
- [Наредба № 6/2024 за присъединяване на обекти към електрическите мрежи (copy at ЕР Юг)](https://elyug.bg/getdoc/1a58539d-b65a-4226-92d8-1bb3e69758ae/Naredba-N6.aspx) — чл. 7–9, чл. 15–18
- [Наредба № Iз-1971 за безопасност при пожар (МВР, 2025 consolidated text)](https://mvr.bg/upload/286736/Naredba%20Iz-1971_2025_1.pdf) — чл. 27, чл. 161–163, чл. 180–181, табл. 17а
- [Наредба № РД-02-20-2/2017 (copy at sars.gov.bg)](https://www.sars.gov.bg/wp-content/uploads/documents/test/Naredba-No-rd-02-20-2-ot-20-dekemvri-2017-g.-za-planirane.pdf) — чл. 42, приложение № 5
- [РИОСВ Пловдив — reply to the notification, ОВОС-1125 (copy in `docs/`)](https://plovdiv.riew.gov.bg/files/_documents/otgovor_OVOS_2026_1125.docx)
- [РИОСВ Пловдив — Приложение № 2 filing for ОВОС-1125](https://plovdiv.riew.gov.bg/files/_documents/dostap_pril_2_2026_1125.docx)
- [РИОСВ Пловдив — screening decisions list](https://plovdiv.riew.gov.bg/documents/12/1)
- [Общински съвет „Родопи" — decisions 2026](https://rodopi.bg/obshtinski-savet/resheniya/resheniya-na-obshtinski-savet-rodopi-2026g/)
- [ОД „Земеделие" Пловдив — change-of-use decisions](https://www.mzh.government.bg/ODZ-Plovdiv/bg/promqna_prednaznachenie_2019/reshenia_2019.aspx)
- [MyRodopi — „Без високо строителство в Община Родопи", 01.10.2024](https://myrodopi.com/obsthina-rodopi/bez-visoko-stroitelstvo-v-obsthina-rodopi/)
- [NewsPoint — no ОУП in force in Родопи, 07.09.2026](https://newspoint.bg/bez-oup-s-poveche-vlast-varhu-vseki-imot-zastho-rodopi-ostava-v-zona-na-visok-korupczionen-risk/)

# Брестник — project context

Housing development in с. Брестник, община Родопи, област Пловдив.
This file records the plot, the zoning limits, where the ПУП procedure stands, and how the current design sits against all of it.
Last updated 2026-11-18. Nothing here replaces the approved ПУП-ПРЗ, the виза, or a licensed architect.

## The plot

| | |
|---|---|
| Location | с. Брестник (ЕКАТТЕ 06447), местност „Бозалъка", общ. Родопи, обл. Пловдив |
| Cadastral ID | ПИ 06447.28.20 (old number 028020) |
| Status | Земеделска територия, нива, 4-та категория, 1,800 m² — needs a ПУП-ПРЗ and change of use before building |
| Buildable УПИ in the model | 28.7 × 60.45 m ≈ 1,735 m² (after the 2.25 m strip taken on the west) |
| Approximate location | 42.0666 N, 24.7624 E |
| Access | Existing municipal road north-west of the plot |

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
- The filing contradicts itself on Кинт (1.0 vs 1.2). The ПУП-ПРЗ will fix the real value.
- The filing says the indicators follow other approved ПУП in the same zone and Наредба № 7.
- Not found: minimum УПИ size, limit on dwellings per УПИ, parking rules.

## Where the ПУП procedure stands

Steps for building on agricultural land, with what public records show as of 18.11.2026:

| Step | Authority | Status |
|---|---|---|
| Opinion on water supply | ВиК Пловдив | Done — no public water main available (cited in the filing) |
| Opinion on the well and flood risk | Басейнова дирекция ИБР | Done — letter ПУ-01-683-3/29.06.2026: admissible; outside flood-risk areas; well for own household needs is under notification regime |
| Notification of the investment proposal | РИОСВ Пловдив | Done — ОВОС-1125/24.04.2026, extra information 12.06.2026 |
| РИОСВ reply | РИОСВ Пловдив | Done — 17.07.2026: screening for ОВОС required, plus Натура 2000 check for BG0001033 „Брестовица" |
| Screening request (Приложение № 2) | РИОСВ Пловдив | Filed 21.08.2026 (ОВОС-1125-8); public access opened 03.09.2026 for 14 days |
| **Screening decision** (решение за преценяване) | РИОСВ Пловдив | **Not published yet.** No entry for the plot in the decisions list through 17.11.2026 |
| Permission to prepare the ПУП-ПРЗ (чл. 124а ЗУТ) | Общински съвет „Родопи" | Not found — the plot ID does not appear in any 2025–2026 council decision |
| Site approval and change of use (чл. 17 ЗОЗЗ) | Комисия при ОД „Земеделие" Пловдив | Not confirmed — decisions are published without plot details in the titles; contents not checked |
| ПУП-ПРЗ project, announcement, approval | Община Родопи | Not found in 2026 municipal notices |
| Electricity | Електроразпределение Юг | Planned after the виза (per the filing) |
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
| Кинт | 0.65 | 1.0 or 1.2 | OK |
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

Keep the row on one УПИ. ЗУТ чл. 19, ал. 5 lets the ПУП set plot sizes freely for low connected housing in more than two plots, so six plots are possible, but the indicators then apply per plot and each middle house falls below 40% on its own.

Not counted in the model: the premium garages (about 30 m² each) are left out of footprint and РЗП. If they are built garages, footprint is about 558 m² (32%) and РЗП about 1,190 m² (Кинт 0.69).

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

## Open items

- Decide: three detached houses as filed, or amend the filings to the row-house design.
- Ask the consultant for the status of the РИОСВ screening decision on ОВОС-1125.
- Confirm whether a чл. 124а request has been filed with Общински съвет „Родопи", and its number.
- Confirm the Кинт to be used (1.0 or 1.2).
- Get the text of the council norms decision (number, date, any dwelling or parking rules).
- Ask the architect or the главен архитект of Родопи whether planting under the overhang and grass under parked cars count as green area.
- Decide whether the premium garages are built garages (they then count in footprint and РЗП).
- `brestnik-homes` quotes 1,170 m² / Кинт 0.67 and calls the 6-house layout "Variant A"; this repo says 1,130 m² / 0.65 and "Variant B". Align them.

## Sources

- [ЗУТ (lex.bg)](https://lex.bg/laws/ldoc/2135163904) — чл. 19, чл. 43, чл. 178, ДР § 5
- [Наредба № 7 (lex.bg)](https://lex.bg/laws/ldoc/2135476546) — чл. 9–11, чл. 19–20, чл. 55
- [РИОСВ Пловдив — reply to the notification, ОВОС-1125 (copy in `docs/`)](https://plovdiv.riew.gov.bg/files/_documents/otgovor_OVOS_2026_1125.docx)
- [РИОСВ Пловдив — Приложение № 2 filing for ОВОС-1125](https://plovdiv.riew.gov.bg/files/_documents/dostap_pril_2_2026_1125.docx)
- [РИОСВ Пловдив — screening decisions list](https://plovdiv.riew.gov.bg/documents/12/1)
- [Общински съвет „Родопи" — decisions 2026](https://rodopi.bg/obshtinski-savet/resheniya/resheniya-na-obshtinski-savet-rodopi-2026g/)
- [ОД „Земеделие" Пловдив — change-of-use decisions](https://www.mzh.government.bg/ODZ-Plovdiv/bg/promqna_prednaznachenie_2019/reshenia_2019.aspx)
- [MyRodopi — „Без високо строителство в Община Родопи", 01.10.2024](https://myrodopi.com/obsthina-rodopi/bez-visoko-stroitelstvo-v-obsthina-rodopi/)
- [NewsPoint — no ОУП in force in Родопи, 07.09.2026](https://newspoint.bg/bez-oup-s-poveche-vlast-varhu-vseki-imot-zastho-rodopi-ostava-v-zona-na-visok-korupczionen-risk/)

# Kerala (Kochi): world 7, a reskin of the Mumbai skeleton

Source: the user's request on 2026-10-27, plus their answers. Kerala follows the same template and metrics as Bengaluru, Chennai and Hyderabad. Read `docs/BENGALURU.md` for the method, rules and checks; only the city content differs.

- **[user]** "Add … Kerala too, ask me in case." The user chose all the recommended options.
- **[user]** Match real photos online (standing rule). Check every landmark, vehicle and costume against reference photos, as described in the "Reference photos" section of `docs/CHENNAI.md`. Download them to the scratchpad `refs/kerala/<item>/`, never to the repo.

## Decisions
**City and language:** **Kochi**, in **Malayalam**. Lines are in Malayalam script, romanised Malayalam and English, with `lang: 'ml'`. Foreign tourists speak English.

**Water:** **sea and backwaters**. The sea stays, as in Chennai.
- **Marine Drive → Kochi Marine Drive walkway**, along the backwater with a rainbow bridge-style arch.
- **Juhu → Cherai Beach.**
- **Boats → kettuvallam houseboats** (curved wooden hull, thatched roof), plus the **Kochi Water Metro** boat as the ferry.
- **Koli boats → small country boats.**

**Hero:** a **backpacker**, **Ananya**, 24, from Jaipur, backpacking through Kochi and the backwaters. She is learning Malayalam on the road.
- **Look:**
  - A big rucksack with a rolled mat.
  - A straw hat and a folded paper map.
  - A loose cotton shirt, cropped cargo pants and sandals.
- She must be distinct from every NPC.
- NPCs call her "mole" (affectionate, for a girl) or "chechi", and suggest places to see.

**Landmarks.** Each one keeps the Mumbai item's position, footprint and facing.

| Mumbai id | Kochi |
|---|---|
| gateway | **Chinese fishing nets**: big cantilevered timber frames with hanging nets and counterweight stones, at the harbour edge. Several in a row. |
| taj | **Mattancherry (Dutch) Palace**: a long two-storey building with a tiled roof and whitewashed walls. |
| cst | **Ernakulam Junction** railway station. |
| bse + bull | **Aspinwall House**: a heritage warehouse used as a Biennale venue. The bull becomes a **giant Kathakali mask** sculpture. |
| rajabai | **St. Francis Church**: a white facade with a stepped gable and a bell gable. |
| flora | **Jew Town synagogue clock tower**: the small white tower with its clock. |
| antilia | **Infopark tower**: glass, a logo-less "INFOPARK"-like sign and a security booth. |
| station | **Kochi Metro station**. Keep the platform geometry; signs in Malayalam and English. |
| seaLink | **Goshree bridge**: concrete, low arches over the backwater. Deck geometry stays unchanged; replace the cable pylons with simple concrete piers and arches. |
| hajiAli | **Bolgatty Palace** on its island: a white Dutch-era palace with a sloped roof. |
| tapri | **Chaya kada** run by Kuttan Chettan: glass jars of pazham pori and banana chips, a tea strainer "pulling" tea, and newspapers. |
| vada | **Puttu / appam cart** |
| irani | **Kerala meals hotel**: banana-leaf meals, board "ഊണ് റെഡി / Meals Ready". |
| poster | **Malayalam film posters**: invented titles, no real actors. |
| chawls | **Kerala tiled houses** (steep sloped red-tile roofs, verandahs, coconut trees) + **flats** |
| shrine | **Kerala temple**: copper-sheet sloped roof, wooden walls, a brass deepastambham (lamp tower) in front. |

**Site details.** Same spots, Kochi versions:

| Mumbai detail | Kochi version |
|---|---|
| Elephanta booth | water-metro ticket booth |
| ferry | water-metro boat |
| tiffin pile | delivery scooters |
| stock ticker | "Now hiring" board at Infopark |
| Haji juice | kulukki sarbath stall |
| chadar stalls | candle and flower stalls (Kochi has many churches) |
| pav bhaji | pazham pori / bajji stall |
| horse | keep, as a beach pony at Cherai |
| sand art | keep |
| Ganpati poster | Onam pookalam poster |
| bunting | keep |
| timetable | metro timetable |

**Vehicles.** 32, on the same loops.
- **Autos:** check photos for Kochi colours.
- **Buses:** **KSRTC** buses, plus the famously colourful **private buses**, painted and named.
- **Cabs:** white.
- **Plates:** `KL 07 …` (Ernakulam).
- **Train:** **Kochi Metro**; check its livery. The first coach is the women's coach (സ്ത്രീകൾ / WOMEN).

**Characters.** The same 130 ids and placements; role keys stay unchanged.

| Mumbai role | Kochi |
|---|---|
| chaiwalaUncle | chaya kada owner **Kuttan Chettan**, the tutorial (`place: 'chaya kada'`) |
| vadaPavWala | puttu/appam seller |
| taxiDriver | auto driver |
| dabbawala | delivery rider |
| koliFisherwoman | fish seller by the Chinese nets |
| golaWala | kulukki sarbath / tender-coconut seller |
| bhelWala | banana-chips seller |
| busConductor | private-bus conductor with a whistle, banging the bus side |
| commuter | metro commuter |
| coolie | Ernakulam porter |
| pilgrim | devotee (temple or church) |
| priest | temple priest (bare-chested, mundu, sandal paste) |
| securityGuard | Infopark security |
| trafficCop | Kerala police (khaki; check photos) |
| tourist | foreign tourist (English) |
| bollywoodHopeful | Mollywood fan |
| photographer | kept (at the Chinese nets) |
| balloonSeller | kept |
| cricketKid | **football** kids, since Kerala loves football |
| auntyWithSabzi | chechi with fish and vegetables |

**Clothing.** Mundu (white, sometimes folded up) with shirts, set-saree (cream with a gold border) and churidar, nuns in white habits near the churches (respectful), office wear near Infopark.

**Greenery and sky.** Lush and wet: coconut palms everywhere, banana plants, jackfruit and mango trees, laterite walls. The sky is humid with monsoon clouds. Crows and kingfishers.

## Build
- **Fork:** fork **`src/worlds/chennai/`** (sea, beaches, palms, southern kit) to **`src/worlds/kerala/`**. Re-dress everything Chennai-specific.
- **World:** id `kerala`, title "Nammude Kochi", dev globals `__kerala` / `__keralaValidation`.
- **Cast and dialogues:** the cast file is `docs/KERALA_CAST.md` and dialogues go in `src/worlds/kerala/dialogue/`. Validate with `node scripts/validate-dialogue.mjs src/worlds/kerala docs/KERALA_CAST.md --min <count>`.
- **Rules:** all the rules in `docs/BENGALURU.md` apply:
  - Use your own port, never the user's 5173 or 5174.
  - No commits and no `.env`.
  - No assets in the repo.
  - No brands, real people or real films.
  - All other worlds stay unchanged.
  - The validator stays clean.
- **Screenshots:** save them under `docs/screens/kerala/`.

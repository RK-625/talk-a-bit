# Chennai: world 4, a reskin of the Mumbai skeleton

Source: the user's request on 2026-10-26 plus their answers. Chennai follows the same template and metrics as Bengaluru, so read `docs/BENGALURU.md` for the method, rules and checks; only the city content differs.

- **[user]** "Same as Bengaluru: keep the map and the spots, and swap the location, characters, vehicles and hero."
- **[user]** "See the real photos from online to match it." Every landmark, vehicle, and costume must be checked against real reference photos before it is modelled. See "Reference photos" below.

## Decisions

**Language: Tamil.**
- Lines are shown in Tamil script, romanised Tamil, and English.
- Use `lang: 'ta'`.
- Foreign tourists speak English.

**Water.** Chennai is coastal, so the **sea stays**, with waves, boats and beach.
- **Marine Drive → Marina Beach:** a very wide sand beach and promenade, plus the lighthouse. The real Marina lighthouse is on the inland side of the beach road; place it as a detail within the Marine Drive footprint.
- **Juhu → Elliot's Beach (Besant Nagar).**
- **Koli boats → kattumaram/fishing boats** pulled up on the sand.

**Hero: a food blogger.** Use **Meera**, 26, from Pune, on a Chennai food trail and learning Tamil to talk to vendors.
- **Clothes:** a short kurta over jeans, sneakers.
- **Gear:** a camera on a strap, a small notebook and pen, and a sling bag.
- **Distinct:** must not look like any NPC.
- **How NPCs treat her:** they offer her tastes and correct her Tamil kindly.

**Landmarks.** Each one replaces the Mumbai item at the same position, footprint and facing.

| Mumbai id | Chennai |
|---|---|
| gateway | **Fort St. George** (white/cream colonial block with a tall flagstaff, walls and bastion hints) |
| taj | **Chepauk Palace** (Indo-Saracenic, red-brick and white, domes and arches) |
| cst | **Chennai Central** (red-brick, white trim, tall central clock tower, side towers) |
| bse + bull | **Ripon Building** (all white, Neoclassical, central clock tower) + **Triumph of Labour** statue (four workers pushing a rock) |
| rajabai | **Madras High Court** (red Indo-Saracenic, many domes and minarets) |
| flora | **Valluvar Kottam** stone temple-chariot |
| antilia | an **IT park tower** (OMR style, glass, with a logo-less "IT PARK" sign and a security booth) |
| station | a **Chennai suburban / MRTS station** (keep the platform geometry), with Tamil + English boards |
| seaLink (bridge) | **Napier Bridge** (white steel, repeated wavy arches over the river). Keep the deck geometry so traffic still works. Replace the pylons with arch trusses. |
| hajiAli | **Santhome Basilica** (white neo-Gothic, a single tall spire), on its island/causeway spot |
| tapri | **tea kadai** (tea and filter coffee, banana bunches hanging, glass jars of biscuits, a newspaper rack) |
| vada | **sundal / murukku cart** |
| irani | a **vegetarian mess** (banana-leaf meals, "Meals Ready" board in Tamil + English) |
| poster | a **Tamil film poster and cut-out wall** (invent titles and faces; no real actors) |
| chawls | **Mylapore tiled houses** (thinnai verandah, kolam at the door, red tiles) + **housing-board flats** |
| shrine | a **Kapaleeshwarar-style temple** (tall, colourful, many-tiered gopuram, the signature element) |

**Site details.** Same spots, Chennai versions:

| Mumbai detail | Chennai version |
|---|---|
| Elephanta ferry booth | beach pony ride / boat-ride booth |
| ferry | fishing boats |
| tiffin pile | delivery scooters |
| stock ticker | "Now hiring" board at the IT park |
| Haji juice | jigarthanda stall |
| chadar stalls | candle and flower stalls by Santhome |
| pav bhaji | molaga bajji stall |
| horse | Marina pony rides (keep horses) |
| sand art | keep |
| Ganpati poster | Pongal/kolam poster |
| bunting | keep |
| timetable | suburban timetable |

**Vehicles (32, same loops).**
- **Autos:** yellow and black, plus a few green.
- **Buses:** MTC, in dark red/maroon "ordinary" and blue/green "deluxe" liveries.
- **Cabs:** white call taxis.
- **Plates:** `TN 01 …`.
- **Train:** the **Chennai suburban EMU**. Check the current livery from photos. Include a ladies coach labelled மகளிர் / LADIES.

**Characters (same 130 ids and placements; role keys unchanged).**

| Mumbai role | Chennai |
|---|---|
| chaiwalaUncle | tea-kadai owner **Murugan Anna**, the tutorial (`place: 'tea kadai'`) |
| vadaPavWala | sundal/murukku seller |
| taxiDriver | auto driver |
| dabbawala | delivery rider |
| koliFisherwoman | fisherwoman (kept: Chennai has fishing hamlets) |
| golaWala | ilaneer (tender coconut) seller |
| bhelWala | molaga bajji seller |
| busConductor | MTC conductor |
| commuter | suburban commuter |
| coolie | Central station porter (red shirt) |
| pilgrim | devotee |
| priest | temple gurukkal |
| securityGuard | IT-park security |
| trafficCop | Chennai traffic police (khaki, white cap) |
| tourist | foreign tourist (English) |
| bollywoodHopeful | Kollywood fan with a cut-out |
| other roles | kept (photographer, balloon seller, Marina cricket kids, a paati with jasmine and vegetables) |

**Clothing:** veshti/lungi with half-sleeve shirts, sarees with jasmine strands in the hair, college kids in jeans, and office wear near the IT park.

**Greenery:** coconut palms and neem along the roads; sandy coastal ground. Sky: hot and bright, a little haze, and crows.

## Reference photos (required, user asked)
- Before modelling each landmark, vehicle and costume, look at real photos online.
- Use TinyFish search/fetch or WebSearch to find the Wikipedia/Wikimedia Commons pages and image URLs.
- Download a few reference images per item with `curl` into `/private/tmp/claude-501/-Users-apple-Hack-talk-a-bit/c2f8c2b8-ff05-4e92-a9c1-67c9fa500d5f/scratchpad/refs/chennai/<item>/`, using one new folder per item. View them with the Read tool.
- Never put them in the repo.
- Match the silhouette, proportions, colours and the 2–3 signature details. Keep the ballpoint style and procedural geometry.
- List the reference URLs you used in your report.

## Build
- Fork **`src/worlds/mumbai/`** to **`src/worlds/chennai/`**, the same way Bengaluru was forked (see `docs/BENGALURU.md` "How to build it" and the Bengaluru commit `6c73953`).
- Register the world as `chennai`, title "Namma Chennai", with dev globals `__chennai` / `__chennaiValidation`.
- Cast file: `docs/CHENNAI_CAST.md`. Dialogues go in `src/worlds/chennai/dialogue/`. Validate with `node scripts/validate-dialogue.mjs src/worlds/chennai docs/CHENNAI_CAST.md --min 130`.
- All rules from `docs/BENGALURU.md` apply:
  - Use your own port, not the user's 5173/5174.
  - No commits.
  - No `.env`.
  - No assets in the repo.
  - No brands, real people or real films.
  - Mumbai, Bengaluru and Dozy Hollow stay unchanged.
  - The validator stays clean.
- Screenshots go under `docs/screens/chennai/`.

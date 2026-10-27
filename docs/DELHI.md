# Delhi NCR: world 6, a reskin of the Mumbai skeleton

Source: the user's request on 2026-10-27, plus their answers. This follows the same template and metrics as Bengaluru, Chennai and Hyderabad. Read `docs/BENGALURU.md` for the method, the rules and the checks. Only the city content differs.

- **[user]** "Add Delhi NCR … ask me in case." The user chose all the recommended options.
- **Standing rule from the user:** match real photos found online. Every landmark, vehicle and costume is checked against reference photos (see `docs/CHENNAI.md` "Reference photos"). Put downloads in the scratchpad at `refs/delhi/<item>/`, never in the repo.

## Decisions
**Language: Delhi Hindi.**
- `lang: 'hi'`: Devanagari, romanised and English, as in Mumbai.
- Give it a strong Delhi flavour: "bhaiya", "haan ji", "scene kya hai", "chal na", "koi na", "pakka", "tension mat le", plus light Punjabi-tinged words such as "paaji", "oye" and "chak de". Keep it easy and polite, with no slurs.
- Jev already judges Hindi. Add a Delhi setting text keyed by `worldId: 'delhi'`, the same way Chennai and Hyderabad have theirs.

**Water: lakes and the Yamuna.** Reuse the lake approach from Bengaluru and Hyderabad.
- **The bay** becomes the Yamuna/boat-club water: calm and greyer.
- **The beach** becomes the India Gate lawns: grass with paths, and the boat-club canals by the water.
- **The island spot** becomes the Lotus Temple standing in its pools.

**Hero: a UPSC aspirant.** Rahul, 23, from Patna, in Delhi for civil-services coaching.
- **Look:** a kurta over jeans, round glasses, a stack of books held under one arm, a cloth jhola bag and sandals.
- **Distinct:** he must look clearly different from every NPC.
- **How people treat him:** NPCs call him "beta" or "bhai", ask about his exam, and offer chai and advice.

**Landmarks.** Each one keeps the Mumbai item's position, footprint and facing.

| Mumbai id | Delhi |
|---|---|
| gateway | **India Gate**: a sandstone arch with a large inscription band and a small canopy (chhatri) in front. The lawns sit around it. |
| taj | **Red Fort, Lahori Gate**: red sandstone walls, a gate with chhatris on top, and the Indian flag. |
| cst | **Old Delhi railway station**: red and cream, with fort-like crenellations and clock towers. |
| bse + bull | **Connaught Place colonnade**: a white Georgian curve with columns. The bull becomes the **giant charkha** installation. |
| rajabai | **Qutub Minar**: a tall fluted red-and-buff minaret with balcony bands. |
| flora | **Jantar Mantar**: the big Samrat Yantra and other red-and-white instruments. |
| antilia | **Cyber Hub (Gurugram)-style glass tower**: "CYBER HUB"-like but logo-less, with a security booth. |
| station | **Delhi Metro station** (Rajiv Chowk style). Keep the platform geometry. Signs in Hindi and English. |
| seaLink | **Signature Bridge**: an inclined, bent steel pylon with a cable fan. Restyle the existing cable pylon; the deck geometry stays unchanged. |
| hajiAli | **Lotus Temple**: white petal shells in three layers, surrounded by pools. |
| tapri | **Chai and bun-makhan stall** (Bittu Bhaiya's): kettles, matthi jars and newspapers. |
| vada | **Chole kulche cart** |
| irani | **Paranthe wala dhaba**: "Paranthe" board, tandoor, plastic chairs. |
| poster | **Coaching-centre hoardings**: invented coaching names, toppers' faces as cartoons. Keep it gently funny. |
| chawls | **Old Delhi havelis** (carved doors, jharokhas, tangled wires) and **DDA flats** (cream blocks with balconies and coolers) |
| shrine | a **gurudwara** with a golden dome and a nishan sahib flag. A small sarovar is optional if it fits. |

**Site details** (same spots, Delhi versions):

| Mumbai | Delhi |
|---|---|
| Elephanta booth | boat-club paddle-boat booth |
| ferry | paddle boats |
| tiffin pile | delivery scooters |
| stock ticker | coaching "Results: AIR 1!" board, or a CP shop board |
| Haji juice | shikanji / nimbu-pani stall |
| chadar stalls | flower and prasad stalls by the Lotus Temple |
| pav bhaji | golgappe stall |
| horse | keep the horse ride (India Gate) |
| sand art | rangoli |
| Ganpati poster | Diwali / Durga Puja poster |
| bunting | keep |
| pigeons | keep |
| timetable | metro map board |

**Vehicles** (32, on the same loops):
- **Autos:** green-and-yellow CNG.
- **E-rickshaws:** add some on the ring road if they fit the existing actor system; otherwise autos.
- **Buses:** DTC low-floor (red AC, green CNG), plus orange cluster buses. Check photos.
- **Cabs:** white cabs.
- **Plates:** DL (and HR for Gurugram near the Cyber tower).
- **Train:** **Delhi Metro**: steel coaches with a coloured band, and the first coach the women's coach (महिला / WOMEN).

**Characters** (the same 130 ids and placements; role keys unchanged):

| Mumbai role | Delhi |
|---|---|
| chaiwalaUncle | chai stall owner **Bittu Bhaiya**, the tutorial (`place: 'chai stall'`) |
| vadaPavWala | chole kulche wala |
| taxiDriver | auto driver |
| dabbawala | delivery rider |
| koliFisherwoman | Sarojini-market style clothes seller |
| golaWala | ice-cream / kulfi seller at India Gate |
| bhelWala | golgappe wala |
| busConductor | DTC conductor |
| commuter | metro commuter |
| coolie | Old Delhi station porter (red shirt) |
| pilgrim | gurudwara sevadar / devotee |
| priest | granthi |
| securityGuard | Cyber-tower security |
| trafficCop | Delhi traffic police (check photos) |
| tourist | foreign tourist (English) |
| bollywoodHopeful | reel-making influencer |
| photographer | keep: India Gate photographer |
| balloonSeller | keep |
| cricketKid | keep |
| auntyWithSabzi | Delhi aunty |

- **Clothing:** salwar-kameez, sarees, kurta-pajama, jeans and jackets, turbans for Sikh men (respectful and plain), office wear near the Cyber tower.
- **Greenery:** neem, peepal and gulmohar, plus Lutyens-style roundabout lawns. The sky is warm and slightly hazy, with pigeons and kites (the birds).

## Build
- **Fork:** fork **`src/worlds/hyderabad/`** (it has the lakes and the cable bridge) to **`src/worlds/delhi/`**. Re-dress everything Hyderabad-specific. Use Devanagari signs; `src/worlds/mumbai/` shows how the Devanagari painting works.
- **World:** world id `delhi`, title "Apni Dilli", dev globals `__delhi` / `__delhiValidation`.
- **Cast and dialogues:** the cast file is `docs/DELHI_CAST.md`, the dialogues go in `src/worlds/delhi/dialogue/`, and you validate with `node scripts/validate-dialogue.mjs src/worlds/delhi docs/DELHI_CAST.md --min <count>`.
- **Rules:** all the rules in `docs/BENGALURU.md` apply:
  - Use your own port, never the user's 5173 or 5174.
  - No commits, and do not touch `.env`.
  - No assets in the repo.
  - No brands, real people or real films.
  - All other worlds stay unchanged.
  - The validator stays clean.
- **Screenshots:** save them to `docs/screens/delhi/`.

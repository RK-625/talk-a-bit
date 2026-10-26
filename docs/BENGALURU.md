# Bengaluru: world 3, a reskin of the Mumbai skeleton

Source: the user's request on 2026-10-26, plus their answers.

- **[user]** "Keep the same map and the spots. Swap out the location, characters, vehicles and hero character, using the current Mumbai city skeleton. Don't redesign maps and placements."
- **Same metrics as Mumbai:** 12 major landmarks, about 30 buildings, about 40 site details, 130 talkable people each with their own conversation, 32 vehicles on 5 loops, and 1 train loop (now the metro).

## Decisions (the user chose these)

**Language.** Locals speak **Kannada**.
- Each line is shown three ways: Kannada script, romanised Kannada, and English.
- A few foreign tourists speak English, as in Mumbai.

**Water.** The sea becomes **lakes**. The water shapes stay the same; only the dressing changes.
- **Bay → Ulsoor Lake:** calm water, lotus, ducks, pedal boats. No waves or surf.
- **Juhu beach → lakeside park:** grass and laterite paths instead of sand.
- **Haji Ali island → lake-island temple:** small, white, with a gopura-like tower.
- **Sea Link → Hebbal-style flyover with a Namma Metro viaduct look:** concrete, purple accent stripe, and no cable-stay pylons. Use simple concrete piers.

**Hero.** A **young tech intern**, new in the city and learning Kannada. Call them **Rohan**, a 22-year-old from Delhi. NPC lines may address him as "Rohan" or "intern-u".
- Look:
  - Adult proportions; must not look like a kid.
  - Checked shirt, chinos and sneakers.
  - Laptop backpack and an ID badge on a blue lanyard.
  - Optional phone in hand.
- Must be clearly distinct from every NPC.

**Landmarks.** Every landmark keeps the exact position, footprint and facing of the Mumbai item it replaces.

| Mumbai (layout id) | Bengaluru |
|---|---|
| gateway | **Vidhana Soudha** (granite, Neo-Dravidian, central dome, wide steps, "Government's work is God's work" banner in Kannada and English) |
| taj | **Bangalore Palace** (Tudor-style castle, turrets, crenellations, ivy) |
| cst | **KSR Bengaluru (Majestic) railway station** (red-brown, arched, clock) |
| bse + bull | **UB City** tower (glass with a crown top) + a **Nandi bull** statue (seated, black granite) |
| rajabai | **Attara Kacheri** (the old High Court, Pompeian red, colonnade) |
| flora | **Lalbagh Glass House** (white iron frame and glass dome) |
| antilia | a glass **tech-park tower** (Manyata/ITPL style, logo-less "TECH PARK" sign, security booth, line of cabs) |
| station (Churchgate) | **Namma Metro MG Road station** (elevated look, purple signage "ನಮ್ಮ ಮೆಟ್ರೋ") |
| tapri | **filter-coffee darshini** (steel counter, "ಕಾಫಿ / COFFEE ₹20", tumbler-dabara, idli steamer) |
| vada | **masala dosa / bisi bele bath cart** |
| irani | **old-Bengaluru tiffin room** (MTR style: "ಉಪಾಹಾರ ಮಂದಿರ", marble-top tables) |
| poster | **Kannada film poster wall** (no real actors or titles; invent them) |

- **13 chawls and the filler chawls:** become **old pete houses** (Mangalore red-tile roofs, small balconies, colourful facades) mixed with plain 4–5 storey **apartment blocks** (balcony grills, a water tank, a dish).
- **The shrine:** becomes a small **South Indian temple** (gopura-style tower, a Nandi in front, a kolam/rangoli at the door).
- **Other kinds:** reskinned the same way, such as the paan shop → a paan/beeda shop, news stand, fruit cart, marigold stall → jasmine/mallige flower stall, bus stops (BMTC style), laundry lines, wire poles.

**Vehicles (32, the same 5 loops).**
- **Autos:** Bengaluru yellow-and-black, plus some green.
- **Buses:** BMTC: the blue Vajra (Volvo-style) and the red/green ordinary.
- **Cabs:** white sedans with yellow number plates, unbranded.
- **Ownership:** two-wheelers are optional on the ring road.
- **Plates:** `KA 01 …` instead of `MH 01 …`.
- **Train:** the rail loop becomes the purple **Namma Metro** train. The **first coach is the women's coach** (ಮಹಿಳೆಯರು / WOMEN), replacing Mumbai's ladies car.

**Site details.** Each Mumbai detail gets a Bengaluru counterpart in the same spot.

| Mumbai detail | Bengaluru counterpart |
|---|---|
| Elephanta ferry booth | pedal-boat booth |
| Pigeon feeding | (keep) |
| Dabbawala tiffin pile | food-delivery scooters with insulated bags (unbranded) |
| Stock ticker | tech-park "Now hiring / Walk-in" board |
| Haji Ali juice centre | sugarcane-juice stall |
| Chadar stalls | coconut/flower offering stalls |
| Pav bhaji | churumuri/masala-corn stall |
| Horse ride | lake pedal boats or a bullock-cart ride |
| Sand art | a rangoli artist |
| Ganpati poster | Kannada Rajyotsava red-and-yellow flag poster |
| Bunting | red-and-yellow Kannada flags |
| Bhutta, coconut, carrom, common tap, timetable, Fast/Slow board | keep or adapt (metro timetable, "Platform 1 / 2") |

**Greenery.** It's the Garden City, so the land is greener than Mumbai's.
- Rain trees and gulmohar/jacaranda along the roads (purple jacaranda blooms are a nice touch).
- Red laterite soil on bare ground instead of sand.
- Fewer palms.
- Sky: pleasant, a few more clouds, and black kites (the birds) circling. Keep the ballpoint style.

**Characters (same 130 placements and ids, roles reskinned).** The role keys stay the same in code; only the look, the display name and the conversation change.

| Mumbai role | Bengaluru |
|---|---|
| chaiwalaUncle | darshini owner, **the tutorial NPC** ("Shankar Anna") |
| vadaPavWala | dosa-cart man |
| taxiDriver | auto driver (meter-haggling) |
| dabbawala | food-delivery rider |
| koliFisherwoman | mallige (jasmine) flower seller |
| golaWala | elaneeru (tender coconut) seller |
| bhelWala | churumuri seller |
| busConductor | BMTC conductor |
| commuter | metro commuter |
| coolie | KSR porter (red shirt, kept) |
| pilgrim | temple devotee |
| priest | archaka |
| securityGuard | tech-park security |
| trafficCop | Bengaluru traffic police (white shirt, cap) |
| tourist | foreign tourist (English) |
| bollywoodHopeful | Sandalwood (Kannada film) fan |
| photographer, balloonSeller, cricketKid, auntyWithSabzi, citizens | kept, with Bengaluru clothing |

- **Clothing mix:** more saree, salwar and jeans/T-shirt; men in veshti/lungi or office wear; jasmine in hair; office lanyards near the tech park and UB City.

## How to build it
- **Fork the folder:** `src/worlds/bengaluru/` starts as a **copy of `src/worlds/mumbai/`**. Register it in `src/main.js` as `bengaluru` (`?world=bengaluru`). Mumbai stays the default and must stay byte-for-byte unchanged in behaviour.
- **Map:** keep `geo.js` / `layout.js` (positions, roads, rail, water shapes) unchanged, apart from display names and colours.
- **Reskin by content:** swap factories, colours, signs and labels. Do not move anything. The layout validator must stay clean (0 hits).
- **Engine edits:** only shared, backwards-compatible additions, such as a palette hook. Mumbai and Dozy Hollow must look the same.
- **Kannada support** is shared code in `src/game/` and `server/jev.js`:
  - `lang: 'kn'` throughout.
  - A Kannada → Latin transliteration in `translit.js`, used for Jev's `player_reply_romanised` and the mock classifier.
  - Jev's `expected_language` for `kn`, plus a `kannada` option in the `reply_language` choice, decided like Hindi.
  - The Kannada font in the UI, e.g. "Baloo Tamma 2" from Google Fonts.
  - `kn-IN` TTS, falling back to on-screen text only if the browser has no Kannada voice; log one warning.
  - The phrasebook keeps per-world entries.
  - `npm run jev:eval` gains Kannada cases.
- **Dialogues:** 130, one per cast id, same schema and validator, in `src/worlds/bengaluru/dialogue/`. Easy everyday Bengaluru Kannada (a little English mixing is natural: "bus stop", "office", "ticket"). Kannada script, accurate romanisation, English. NPCs often address Rohan as a newcomer, and are kind about his learning. The 20 multi-step ones map onto the 20 Mumbai multi-step roles.
- **Cast file:** `docs/BENGALURU_CAST.md` lists the same 130 ids with their Bengaluru role, site, look and activity.

## Rules (all agents)
- Plain JavaScript, three.js and Vite. No new runtime dependencies (Google Fonts CSS is fine). No asset files; everything is procedural.
- No real brand logos, real people, or real film titles.
- Use your own dev port, never 5173 or 5174, which belong to the user. Do not commit. Do not touch or print `.env`.
- When you finish, all of these must hold:
  - `npm run build` is clean.
  - Mumbai (`/`) and Dozy Hollow (`?world=dozy-hollow`) look and behave as before.
  - The Bengaluru layout validation is clean.
  - There are no console errors.
- Save screenshots under `docs/screens/bengaluru/` (git-ignored).

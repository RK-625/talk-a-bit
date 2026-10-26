# Hyderabad: world 5, a reskin of the Mumbai skeleton

Source: the user's request on 2026-10-26 plus their answers. Hyderabad follows the same template and metrics as Bengaluru, so read `docs/BENGALURU.md` for the method, rules and checks; only the city content differs.

- **[user]** "Same as Bengaluru: keep the map and the spots, and swap the location, characters, vehicles and hero."
- **[user]** "See the real photos from online to match it." Every landmark, vehicle and costume must be checked against real reference photos before it is modelled. See "Reference photos" below.

## Decisions
**Language.** Locals speak **Telugu**. Each line is shown in Telugu script, romanised Telugu, and English, with `lang: 'te'`. Foreign tourists speak English.

**Water.** The sea becomes **lakes**, as in Bengaluru. The bay becomes **Hussain Sagar**, with tourist boats, lotus and ducks. The beach becomes a lakeside park (Necklace Road / Lumbini-style). Reuse Bengaluru's lake approach: `src/worlds/bengaluru/lake.js`, the planet `sea.curls: false` / `swell`, and the ground layers.

**Hero: a college grad.** **Sameer**, 22, a fresh engineering graduate just moved to Hyderabad for job hunting. He is learning Telugu.
- **Look:** a crisp formal shirt with sleeves rolled up, dark trousers, and a clear file folder of resumes under one arm.
- **Extras:** a wristwatch and a small backpack.
- **Distinctness:** he must look clearly different from Bengaluru's Rohan, so there is no lanyard and no laptop-bag look, and from every NPC.
- **How NPCs treat him:** they encourage him about the job search.

**Landmarks.** Each one replaces the Mumbai item at the same position, footprint and facing.

| Mumbai id | Hyderabad |
|---|---|
| gateway | **Charminar**: square granite/limestone body, four big arches, four tall fluted minarets with balconies, and a small mosque on the top floor. **Laad Bazaar bangle stalls** go in the gateway site details. |
| taj | **Falaknuma Palace**: white Italianate palace with a long colonnaded front and a hilltop feel. |
| cst | **Kacheguda station**: Gothic-revival with domes and turrets. Check photos for the current colours. |
| bse + bull | **Cyber Towers**, the round HITEC City building with a central glass tower, plus a **giant pearl sculpture** in place of the bull. |
| rajabai | **Osmania University Arts College**: grey granite with a big central arched entrance, Indo-Saracenic. |
| flora | **Gulzar Houz fountain**, the arched fountain pavilion near Charminar. |
| antilia | a **HITEC City glass tower** with a logo-less "TECH" sign and a security booth. |
| station | **Hyderabad Metro station** (keep the platform geometry). Check the current Telugu + English board style. |
| seaLink (bridge) | **Durgam Cheruvu cable bridge**, cable-stayed. Restore Mumbai's cable pylons (`src/worlds/mumbai/landmarks/seaLink.js`) restyled to match the real bridge. Deck geometry stays unchanged so traffic still works. |
| hajiAli | the **Buddha statue on its rock island** in Hussain Sagar: a tall, white, standing monolith on a platform. |
| tapri | **Irani café**: Irani chai in small cups, a jar of Osmania biscuits, marble tables, bentwood chairs, a counter with a samovar. |
| vada | **mirchi bajji cart** |
| irani | a **biryani house** (handi pots, a "Hyderabadi Dum Biryani" board in Telugu + English, no brand) |
| poster | **Telugu film poster wall** (invent titles; no real actors) |
| chawls | **old-city houses** (arched windows, wooden balconies, deorhi gateways, lime-washed colours) + **apartment blocks** |
| shrine | a small **South Indian temple** (Telangana style). Bonalu decorations are optional. |

**Site details.** Same spots, Hyderabad versions:

| Mumbai detail | Hyderabad version |
|---|---|
| Elephanta booth | Hussain Sagar boating booth |
| ferry | tourist boats |
| tiffin pile | delivery bikes |
| stock ticker | "Walk-in interview" board at Cyber Towers (a nice hook for Sameer) |
| Haji juice | haleem / lassi stall |
| chadar stalls | flower and boat-ticket stalls on the causeway |
| pav bhaji | pani puri stall |
| horse | keep, as a camel or horse ride on Necklace Road |
| sand art | Bathukamma flower stack display |
| Ganpati poster | Bonalu / Bathukamma festival poster |
| bunting | keep |
| pigeons | keep at Charminar (real) |
| timetable | metro timetable |

**Vehicles (32, same loops).**
- **Autos:** yellow-black; check photos.
- **Buses:** TSRTC/TGSRTC city buses in red "ordinary" and green "metro express" liveries; check photos.
- **Cabs:** white cabs.
- **Plates:** `TS 09 …` / `TG 09 …`.
- **Train:** **Hyderabad Metro**; check the livery in photos. The first coach is the women-only coach, labelled మహిళలు / WOMEN.

**Characters.** The same 130 ids and placements as Mumbai; the role keys stay unchanged.

| Mumbai role | Hyderabad |
|---|---|
| chaiwalaUncle | Irani café owner **Saleem Bhai**, warm, who speaks Telugu. He is the tutorial (`place: 'Irani café'`). |
| vadaPavWala | mirchi bajji man |
| taxiDriver | auto driver |
| dabbawala | delivery rider |
| koliFisherwoman | Laad Bazaar bangle seller |
| golaWala | falooda / kulfi seller |
| bhelWala | pani puri seller |
| busConductor | TSRTC conductor |
| commuter | metro commuter |
| coolie | Kacheguda porter |
| pilgrim | devotee |
| priest | temple priest |
| securityGuard | HITEC security |
| trafficCop | Hyderabad traffic police (white shirt, cap) |
| tourist | foreign tourist (English) |
| bollywoodHopeful | Tollywood fan |
| photographer | kept (at Charminar) |
| balloonSeller, cricketKid, auntyWithSabzi | kept |

**Clothing.** Sarees and salwar; some burqas and skullcaps in the old city (respectful and plain, never caricatured); men in kurta-pyjama, lungi or shirts; office wear in HITEC City.

**Greenery and sky.** Rocky Deccan touches (a few granite boulders on bare ground where they fit without overlaps), neem and gulmohar. The sky is warm and dry, with a few clouds and kites (the birds).

## Reference photos (required, user asked)
- **Find:** before modelling each landmark, vehicle and costume, look at real photos online. Use TinyFish search/fetch or WebSearch to find Wikipedia/Wikimedia Commons pages and image URLs.
- **Download:** fetch a few reference images per item with `curl` into `/private/tmp/claude-501/-Users-apple-Hack-talk-a-bit/c2f8c2b8-ff05-4e92-a9c1-67c9fa500d5f/scratchpad/refs/hyderabad/<item>/`, one new folder per item. View them with the Read tool. Never put them in the repo.
- **Match:** the silhouette, proportions, colours, and the 2–3 signature details. Keep the ballpoint style and procedural geometry.
- **Report:** list the reference URLs used.

## Build
- **Fork:** fork **`src/worlds/bengaluru/`** to **`src/worlds/hyderabad/`**. Bengaluru already has the lakes, a southern city kit and non-Hindi language wiring.
  - Restore the cable-stayed pylon from Mumbai's `seaLink.js`.
  - Re-dress everything Bengaluru-specific.
  - Don't import across world folders.
- **Register:** world id `hyderabad`, title "Mana Hyderabad", dev globals `__hyderabad` / `__hyderabadValidation`.
- **Cast and dialogues:** the cast file is `docs/HYDERABAD_CAST.md`, and dialogues go in `src/worlds/hyderabad/dialogue/`. Validate with `node scripts/validate-dialogue.mjs src/worlds/hyderabad docs/HYDERABAD_CAST.md --min 130`.
- **Rules:** all the rules from `docs/BENGALURU.md` apply:
  - Use your own port, never the user's 5173/5174.
  - No commits, and no `.env`.
  - No assets in the repo.
  - No brands, real people or real films.
  - Mumbai, Bengaluru and Dozy Hollow stay unchanged.
  - The validator stays clean.
- **Screenshots:** save them under `docs/screens/hyderabad/`.

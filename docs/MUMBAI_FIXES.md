# Mumbai fix pass 1

Source: the user's playtest (screenshots on 2026-10-25) plus the lead's review. Items marked **[user]** are the user's own words.

## Bugs
1. **[user] Track has no sleepers**: the rails show, but the horizontal bars are missing along the loop. Every track segment needs visible sleepers.
2. **[user] Chotu sinks into the ground**: he stands half inside the pavement/road/platform in several places (station platform, chowk). His feet must sit on the visible surface everywhere: ground faces, roads, platforms, decks, causeway.
3. **[user] Sea Link floats mid-air**: the piers stop short. Every deck span needs piers/pillars going down into the seabed, and land approaches need supports or embankments down to the ground. Pylon bases reach the sea floor.
4. **[user] Sea Link has no footpaths**: add a raised footpath with railing on both sides of the road deck. Vehicles may use the road part later. Chotu walks on the footpath.
5. **[user] Moon face is wrong**: on the crescent the eyes and blush sit on the outer edge/off the shape. Put a proper sleepy face inside the crescent's body (Dozy Hollow uses the same painter, so fix it in the engine).
6. **[user] Assets sit on roads and vehicles drive through them.** Add a strict layout validation: no footprint may overlap a road lane, the rail corridor, or another footprint. Log errors in dev, and fix every hit.
7. **Rooftop "crosses"**: the poles/antennas on chawl roofs read as Christian crosses. Replace them with clearly-TV dish antennas, water tanks (Sintex black), and pigeon-coops.
8. **Camera blocked by buildings**: buildings between the camera and Chotu fade to a light pencil-sketch see-through (keep their ink outline faint, fill mostly transparent), restored smoothly when clear. **(user chose this)**
9. **Jagged ground edges**: road/sand/coast boundaries stair-step on face-size triangles. Make the boundaries smooth and hand-drawn: evaluate the ground masks per fragment (or at much finer resolution), with a wobbly pencil edge line.
10. **Gateway faces the wrong way**: it must face the harbour with the sea right behind the arch side, and boats in the water.
11. Draw calls in crowded views are over budget (650 vs 600) because people are ~40 meshes each. Merge each person into a few skinned-by-hand groups (see the people pass).

## Train
12. **[user] Ladies car**: exactly ONE car is the ladies compartment (महिला / LADIES), and only women are in it. All other cars are general compartments with a mixed crowd and no ladies label. Labels must match the car.

## Population **[user]**
13. The world feels empty. There must be at least one character in frame almost anywhere you stand, someone to "talk to" later. Reuse the people assets with variations (outfit colours, patterns, shirts, hair, accessories, build, skin) via a seeded variation system, and add new roles:
    - **Priest (pujari)** at the temple shrine, with dhoti, tilak, a bell/thali with a diya.
    - Pilgrims with chadar/flower baskets at Haji Ali, a photographer with a tripod and tourists at the Gateway, joggers and couples on the Marine Drive parapet, families and kids at Juhu, a bhutta (corn) seller, a coconut-water seller, office-goers with briefcases and tiffins at CST, coolies with luggage at CST/station, commuters on the platform, a security guard at Antilia, a mali/watchman, a sweeper with a broom.
    - Generic Mumbaikars (seeded mix) to fill streets and footpaths, some walking path loops, some sitting on benches/steps.
    - Target: ~70–90 people on desktop (~45 on touch), with LOD so perf stays within budget.

## Iconic places **[user]**
14. **Add Antilia (Ambani's house)**: the tall, irregular stacked-slab tower with garden terraces and greenery spilling out, on Altamount Road / Cumballa Hill (between Haji Ali and the Marine Drive area), with a security booth and guards, and a line of cars.
15. **Every site gets at least one small contextual detail that belongs to it [user]:**
    - Gateway: photographer, ferry boats with an "Elephanta" ticket booth, pigeon feeding, a balloon seller (already there).
    - Taj: a turbaned doorman and a vintage car.
    - CST: dabbawalas sorting tiffin crates, coolies in red shirts, the clock.
    - BSE: the bronze bull statue, a stock ticker board, men in shirts.
    - Rajabai / Flora Fountain: university students and a book seller.
    - Marine Drive: benches, joggers, couples, a chana-jor/peanut seller.
    - Sea Link: a toll booth at one end.
    - Haji Ali: flower/chadar stalls along the causeway, pilgrims, a juice centre ("Haji Ali Juice") on the shore.
    - Juhu: pav bhaji and bhel stalls, a horse/camel ride, sand art, families.
    - Chawls: a carrom board on a balcony, a common tap with buckets, rangoli at doors.
    - Temple: the priest, bells, a coconut/flower stall, shoes outside.
    - Station: commuters, a chai/vada stall on the platform, a timetable board, a "Fast/Slow" indicator.
    - Chowk (spawn): rangoli, a Ganpati poster, puddle doodles, kids, a sleeping dog, more stools and crates. It must not feel empty.

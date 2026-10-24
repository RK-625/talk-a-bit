# World 2: Mumbai ("Aamchi Mumbai")

The same engine and ballpoint look as Dozy Hollow (keep the paper, ink outlines, pencil hatching, sleepy-faced
clouds, stars, sun, moon, bunting). Retheme and polish it into a warm, miniature, storybook Mumbai on a tiny planet.
**No dialogue this stage.** NPCs idle, animate, and turn their heads toward the hero when near. That's all.

## Mood
Warm late-afternoon Mumbai. Pastel versions of Mumbai colors: kaali-peeli black and butter yellow, BEST bus red,
sea blue-green, sandstone, chawl walls in faded pistachio/pink/sky-blue, marigold orange, terracotta.
Ink stays dark navy-brown. The sea is hatched in blue pencil with doodled wave curls.
Sky extras on top of the Dozy Hollow doodles: paper kites (patang) with strings, a few crows and pigeons flapping.

## Planet
- Radius ~75 (more room for landmarks), same faceted look.
- Land + **sea**: about 35–40% of the planet is sea (Arabian Sea), forming a bay for Marine Drive, the Gateway harbour,
  the channel the Sea Link crosses, Haji Ali's water and Juhu's shore. Sea is a separate animated water shell with
  blue hatch and wave doodles; sea is not walkable (except causeway/bridge).
- Ground types via colorFn: asphalt roads (pale grey-lavender with dashed white ink lane lines), footpaths, sand
  (Juhu, Chowpatty), promenade stone, terracotta lanes, small green patches (maidan).

## Scale
Diorama/miniature: people ~2.2 units tall, landmarks 4–5× a person (Gateway ~10 high, CST ~12, BSE tower ~16).
Recognisable silhouette > accuracy. Built from three.js primitives + extrusions/lathes, ink material + outlines,
Canvas 2D for signage and painted details (Devanagari/English signs drawn in a hand-lettered style).

## Landmarks (all must read clearly from the default camera)
1. **Gateway of India** on the harbour, with the **Taj Mahal Palace hotel** (red domes) behind it, pigeons, small boats on the water.
2. **CST (Chhatrapati Shivaji Terminus)**: gothic facade, central dome, pointed towers.
3. **BSE tower** (Phiroze Jeejeebhoy Towers) — tall slab with the stepped crown; plus **Rajabai clock tower** and **Flora Fountain**.
4. **Marine Drive**: curved promenade along the bay with the tetrapods, a row of streetlights (Queen's Necklace), art-deco buildings behind.
5. **Bandra-Worli Sea Link**: cable-stayed bridge across a sea channel, **walkable**.
6. **Haji Ali Dargah**: white domed shrine on a small island reached by a walkable causeway.
7. **Juhu beach**: sand, gola stall, bhel puri stall, a few umbrellas.
8. **Chawls**: 2–3 storey chawl blocks with balconies, laundry lines with colorful clothes, Warli patterns chalked on a wall.
9. **Street life**: vada pav stall (big pav sign, kadhai, hanging chillies), cutting-chai tapri (the hero's home base,
   at spawn), paan shop, fruit cart, Irani cafe, flower/marigold seller, film poster wall, cricket in a gully.
10. **Local train**: a track loop along one great circle with a crowded pastel Western Railway local train circling
   continuously (people hanging at doors), with one station (platform + sign). Level crossings where roads cross it.
11. **Traffic**: kaali-peeli Padmini taxis and red BEST double-decker buses driving along road loops; auto-rickshaws.
   Vehicles are colliders the player bumps off of (no damage, nothing fails).

## People: Warli-inspired figures
Warli is Maharashtra's own tribal art: bodies are two triangles meeting at the waist, a round head, line limbs.
Make that 3D and cute:
- Upper body: inverted cone/pyramid (shoulders wide, waist narrow). Lower body: upright cone (skirt/saree/dhoti) or two
  leg-cones for trousers/shorts. Waist is a pinch point.
- Round head, slightly large. Dot eyes, pink blush, tiny ink smile — same face language as Dozy Hollow.
  Variants: moustache, bindi, specs, sleepy eyes, freckles.
- Limbs are thin tapered sticks with ball hands/feet; elbows/knees bend for animation.
- Clothes are pastel pencil fills; optional Warli white-dot / zig-zag borders on hems (shader or Canvas texture).
- One factory: `createPerson(spec)` where spec = { height, skin, top, bottom, outfit kind, hair, face, accessories[] }.
  Role presets build on it. Shared procedural animation: idle sway/breath, walk, wave, look-at-target head turn, role
  loops (pouring chai, frying vada, ringing a bell, pedalling).

### Hero: Chotu, the chaiwala kid
~10-year-old (shorter, bigger head ratio). Messy hair, half-sleeve striped shirt, shorts, rubber chappals, gamcha on shoulder.
Carries the steel chai kettle in one hand and a wire carrier with cutting-chai glasses in the other. Bouncy, quick walk.

### NPC cast (stereotypes, affectionate, never mocking)
vada pav wala (frying, banyan + towel), tapri chaiwala uncle, kaali-peeli taxi driver leaning on his cab (khaki, moustache),
dabbawala with tiffin crate on head and a cycle, Koli fisherwoman (bright nauvari saree, basket), BEST bus conductor
(ticket machine, khaki), traffic policeman (whistle, white cap), college students with jhola bags, aunty with sabzi bag
and umbrella, gully cricket kids (bat, stumps), Bollywood hopeful striking a pose near the film posters, bhel puri wala,
gola wala, balloon seller at the Gateway, newspaper vendor, a stray dog napping, crows and pigeons.

## Out of scope this stage
Dialogue, quests, inventory, UI beyond the existing touch controls, day/night cycle, sound.

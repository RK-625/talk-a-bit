# Mumbai polish pass 3: finalise the world, everyone talks, ambient music

Source: the user's playtest on 2026-10-25 (screenshots below) plus their answers. **[user]** marks the user's own words.
The user likes the design and wants it finalised. Fix the flaws listed here; do not restyle anything else.

Screenshots (read them before starting): `/private/tmp/claude-501/-Users-apple-Hack-talk-a-bit/c2f8c2b8-ff05-4e92-a9c1-67c9fa500d5f/images/`
`16.png` … `29.webp` (numbers below refer to these files).

## A. World fixes

1. **Rail track is broken (25, 26).** Near the chawls and Churchgate the track is made of separate straight pieces.
   - Joints are misaligned and overlap.
   - Rails stop and restart.
   - One piece sits on a raised wedge or ballast slab that the others don't have.
   - Required: the track is one continuous curve with rails and sleepers at even spacing, joints invisible, on one consistent ballast bed at ground height, all around the loop. Where it meets the station platform or the crossing, it runs straight through.
2. **Toll gate in the wrong place [user] (21, 22).**
   - "The toll gate is not before the Sea Link". The booth stands on the sand beside the bridge, and its barrier blocks nothing.
   - A palm tree grows through its roof.
   - The bridge ramp ends abruptly with no road leading onto it.
   - Required:
     - A road leads onto the Sea Link ramp.
     - The toll plaza straddles that road just before the ramp, with booth lanes and a barrier across the road. Traffic passes through it.
     - Nothing grows through it.
3. **Taxis floating in front of Antilia [user] (23).** The `carLine` sits off the edge of the ground and hangs in the air. Every car must sit on the road or driveway surface, with its wheels on the ground. Check all four cars.
4. **Temple and devotion shop collide [user] (28, 29).**
   - The coconut/flower ("नारळ फुले") stall and the other devotion stall overlap the temple plinth and steps.
   - A person stands inside the temple wall.
   - Move the stalls clear of the temple footprint and steps, facing the temple approach.
   - Make sure every person at the temple stands on open ground.
5. **Juhu gola stall (18).**
   - Two beach umbrellas (pink and rainbow) intersect.
   - The palm intersects the umbrella.
   - The seller stands inside the cart.
   - Required: no prop intersects another, and the seller stands behind the cart.
6. **Vada pav stall (19).** The pink-shirt customer stands inside the stall's corner post. Move them to the counter front.
7. **General overlap rule.** Extend the layout validation (`src/worlds/mumbai/validate.js`) to cover these cases:
   - Detail props against each other and against landmark footprints.
   - People's feet inside a prop or building footprint.
   - Props whose base is not on a walkable or ground surface, so they float.

   Log every hit in dev, then fix them all. Report the before and after hit counts.
8. **Spawn grass patch (16, 17).** The green patch has stair-step polygon edges, while the other ground boundaries are smooth after pass 1. Give it the same smooth, wobbly pencil edge.
9. **Skipping kid: no rope [user] (27, chowk `beachKid`, `loop: 'skip'`).** Add a visible rope, held in both hands, that swings in time with the jump and passes under the feet at the bottom of each jump. Draw it in the ink style.
10. **Noisy dark hair (16, the user chose: soften it).** The cause is in `src/engine/ink.js`, in the paper pass at about line 494, which applies "pen skips on the tooth of the paper" to dark pixels using a per-pixel hash.
    - Soften it so dark areas such as hair read as a solid ink fill with only a faint paper texture, not TV static.
    - Do not change the look of light areas.
    - This is an engine file, so check Dozy Hollow (`?world=dozy-hollow`) still looks the same apart from the softer speckle.

## B. Population: about 60 people, all talkable [user]
- Cut the Mumbai population from about 170 to **about 60 talkable people**, on desktop and touch alike.
- Keep at least one person in frame almost anywhere you stand, as pass 1 required, so spread them across every site rather than clustering them.
- Train passengers and very far-off crowd fillers can stay as **non-talkable background**. They may stay only where nobody can walk up to them, such as inside moving train cars. Everyone you can reach must be talkable.
- Every talkable person gets a stable explicit `id`.
- Write `docs/CAST.md` with one line per talkable person: id, role, site, look (outfit and props), and what they are doing. The dialogue writer works from this file.
- The 20 people who already have multi-turn dialogues (`src/worlds/mumbai/dialogue/*.js`) keep their placements and ids.

## C. Conversations for everyone [user]
- "It's not just that you go, press E, the NPC talks a dialogue, and moves on. You can have a real conversation with every NPC here, and each one should be a bit unique."
- "All the characters should be interactable, with at least one dialogue back and forth by default. It may be repeatable, but it's fine."
- Every talkable person in `docs/CAST.md` without a dialogue gets their own short dialogue, using the existing schema (docs/DIALOGUE.md), judged by Jev like the others:
  - At least one step: the NPC's line, then the player's reply (judged), then the NPC's reaction, then the outro. Many should have 2 steps.
  - Unique per person: name, persona, situation, and what they want from Chotu. Draw on their role, site and what they are doing in CAST.md.
  - Use everyday Mumbai Hindi at an easy level. Tourists speak English.
  - No two people may share a line.
  - Keep the `learned` phrases useful.
- Conversations can be repeated. On a repeat the NPC may open with a "phir aaya?" variant, which is optional. The phrasebook does not duplicate entries.
- The greeting-only ambient path stays as a fallback for anything without a dialogue, but no talkable cast member should end up there. Make the validator check this.
- **The hint banner hovers forever [user] (24).** "New here? Talk to Raju Chacha at the tapri" stays on screen for the whole game until you talk to him. Change it so that:
  - It shows on first load.
  - It fades after about 15 seconds, or once the player has walked about 15 units, whichever comes first.
  - It never comes back by itself.
  - The talk bubble over Raju Chacha still marks him as the tutorial.

## D. Warm ambient music [user, generated in code]
- "Warm ambient music … for smoother gameplay." Generate it with WebAudio only: no audio files, following the no-assets rule.
- Sound: a soft tanpura-like drone (Sa–Pa) and a warm low pad with slow chord changes. Add gentle, sparse plucked notes (sitar or santoor-ish) in a calm raga-flavoured scale such as Yaman or Bhupali. Keep it slow, about 60–70 bpm feel, with no percussion. It should be seamless and endless, never an audible loop.
- Start it on the first user gesture, because browsers block autoplay. Fade it in over about 3 seconds.
- **M** toggles the music, with a tiny "♪ on/off" note in the ballpoint UI style. The choice is saved in localStorage, wrapped in try/catch.
- During a conversation, duck the music to about 35% so TTS stays clear, and restore it afterwards.
- Pause it when the tab is hidden.
- Keep CPU low: a handful of oscillators and one shared reverb, and no per-note node leaks.
- Put it in its own module, `src/game/audio/music.js`, exporting `createMusic()` → `{ start, toggle, duck(on), dispose }`. Dozy Hollow may use it too, but do not change Dozy Hollow's look.

## Rules (all agents)
- Plain JavaScript, three.js, Vite. No new runtime dependencies. No asset files.
- Use your own dev port, never 5173, which belongs to the user. Do not commit. Do not touch `.env` or print the key.
- When you finish, these must pass:
  - `npm run build` is clean.
  - The dialogue validator passes.
  - The Mumbai layout validation is clean.
  - There are no console errors.
- Take before and after screenshots of every numbered fix and save them under `docs/screens/polish3/` (git-ignored).

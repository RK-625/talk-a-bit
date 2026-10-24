# Stage 1 — Tiny planet foundation

Cozy third-person game on a tiny spherical planet, drawn in a **ballpoint pen + colored pencil** style
(reference: the user's "ballpoint-gambit" chess game — cream paper, wobbly dark-brown/blue ink lines,
pastel fills, diagonal pencil hatching, cute faces with dot eyes and blush cheeks).

Stage 1 = planet, player, camera, input, sky, scatter, and the art pass. **No** NPCs, dialogue, quests, or UI
beyond the mobile joystick + jump button.

## Hard rules
- **Plain JavaScript (ES modules)**, Vite, `three` only. No TypeScript, React, physics engine, or other runtime deps.
  (A tiny noise helper like `simplex-noise` is OK; prefer writing it inline.)
- **No static image/model assets.** No PNG/JPG/GLB files. Everything is geometry built from code, shaders,
  or textures drawn at runtime with Canvas 2D (`CanvasTexture`).
- `npm run dev` runs it; `npm run build` must succeed with no errors.
- Works on desktop (keyboard + mouse) and mobile (touch joystick + jump button), 60 fps on a mid-range phone.

## Files
```
index.html
src/main.js       renderer, scene, loop, resize, wiring
src/planet.js     planet mesh + getSurfaceRadius(dir) + getSurfaceNormal(dir)
src/ink.js        shared ballpoint look: ink materials, outlines, hatching, paper post-pass
src/character.js  createCharacter() -> THREE.Group (player visual ONLY, replaceable)
src/player.js     movement on sphere, jump, animation hooks
src/camera.js     third-person follow camera
src/input.js      keyboard + touch joystick + jump button -> {moveX, moveY, jump, lookDX, lookDY, zoom}
src/sky.js        paper sky, doodled sun/moon/clouds/stars, lights
src/scatter.js    trees, rocks, flowers, mushrooms placed on the surface
```

## Planet
- `IcosahedronGeometry(50, detail)`. Note: in current three.js `detail` = edge subdivisions, so pick detail ≈ 24–30
  (~12–20k triangles) so triangles are visible but not huge.
- Low-frequency 3D noise displacement along the radial direction: gentle hills, ±1.5 units, no spikes
  (2–3 octaves, low frequency, maybe a smoothstep shaping).
- Flat shaded faceted look (per-face normals).
- Vertex colors: soft pastel green base; lighter/darker patches from a second noise. A few patches
  could lean to a pastel yellow-green.
- `getSurfaceRadius(dir)` uses **the exact same noise function** as the displacement (analytic, no raycast).
  `getSurfaceNormal(dir)` comes from finite differences of that function. Both are exported.

## Ballpoint art pass (src/ink.js) — the most important part
All procedural:
1. **Paper**: background/sky is warm cream (#ece6d6-ish). A full-screen post pass (EffectComposer + custom ShaderPass,
   or a single custom pass) adds fine paper grain, slight fiber noise, a soft vignette, and a gentle desaturation
   toward pencil pastels. Nothing heavy.
2. **Ink outlines**: inverted hull (back-face, slightly inflated mesh) in dark brown-navy (#2b2440-ish) on the planet
   silhouette, scatter props, and the character. A small vertex-shader wobble (noise on position + time-stepped every
   ~0.15 s, like "boiling" hand-drawn lines) keeps it from looking CG. Line thickness should look constant-ish in screen space.
3. **Pencil hatching**: a custom lit material (either `onBeforeCompile` on MeshStandard/MeshLambert, or a
   ShaderMaterial with simple lambert + shadow) that:
   - keeps flat pastel base color, quantized into ~3 light bands (toon-ish),
   - draws diagonal hatch strokes in **world/object space** (triplanar, so it doesn't swim on camera move)
     in the darker bands, plus cross-hatch in the darkest band and in shadow,
   - strokes have irregular width/opacity from noise so they read as colored pencil, like the green squares on
     the reference chessboard.
   On the planet, some faces/patches get light green hatching even in light, so it looks drawn on.
4. Export helpers so every module uses the same look, e.g. `createInkMaterial({color, hatchColor})`,
   `addOutline(mesh, {thickness})`, `createPaperPass()`.
5. Shadows: one directional light (from the sun) with a soft shadow map (2048 desktop / 1024 mobile) feeding the hatching.

## Sky (src/sky.js)
- Cream paper sky with a very faint warm gradient (big inverted sphere or scene.background + shader).
- Doodles drawn with Canvas 2D in wobbly ballpoint strokes and pastel pencil fills, shown as camera-facing sprites
  far out around the planet: a smiling sun (yellow), a sleepy crescent moon with nightcap (blue/purple),
  3–5 sleepy-faced clouds, a sprinkling of small star doodles. They orbit very slowly.
- Hemisphere/ambient + directional light, warm and soft.

## Scatter (src/scatter.js)
- Built from three.js primitives with ink materials + outlines: lollipop/puffy trees, round rocks with sleepy faces
  (like the reference pebbles), small flowers (dandelion, sunflower), red-cap mushrooms.
- ~80–120 total, deterministic seeded RNG, minimum spacing, placed with `getSurfaceRadius`, oriented to the surface normal,
  random yaw and slight scale variation. Keep a ~6-unit clear radius around the player spawn.
- Use InstancedMesh or merge geometry where it helps performance.
- Export the placed objects' positions/radii so the player can't walk through trees and rocks (simple sphere-vs-circle push-out).

## Player (src/player.js + src/character.js)
- `character.js` exports `createCharacter()` returning a Group with the model's feet at y=0 and facing +Z.
  **Stage 1 placeholder**: a round, cute blob character (body, big dot eyes, blush cheeks, a small leaf on top) in the
  ink style. Keep it isolated; it will be replaced by a user-designed character.
- Player state: position on sphere; `up = normalize(position)`; forward is a tangent vector re-orthogonalized each frame
  (avoid gimbal/pole problems — use quaternions, never lat/long).
- Movement is relative to the camera: input forward = camera's forward projected onto the tangent plane.
  Walk ~6 u/s with acceleration/deceleration; the character turns smoothly toward the move direction.
- Jump: radial velocity with gravity toward the planet center; land on `getSurfaceRadius(up)`.
  Ground snapping when grounded.
- Cute procedural animation: idle breathing squash/stretch, walk bob + waddle, jump stretch and land squash.
- Spawn on the "north pole" area.

## Camera (src/camera.js)
- Third-person, behind and above the player, `camera.up` = player up (smoothly blended), looking a bit ahead of the player.
- Default distance ~14, pitch ~25° so the curvature of the planet is clearly visible on the horizon — the world must
  *feel* like a tiny sphere.
- Mouse drag (desktop) / one-finger drag on the right half of the screen (mobile) orbits yaw and pitch (clamped).
  Wheel/pinch zooms between ~7 and ~45 (at max zoom you see most of the planet).
- Damped follow, no jitter, no clipping into the planet (keep the camera above surface radius + margin).

## Input (src/input.js)
- Keyboard: WASD/arrows to move, Space to jump.
- Touch devices only: a virtual joystick at bottom-left and a jump button at bottom-right, styled like the reference:
  wobbly ink circle, cream fill, handwritten feel (inline SVG/CSS, no image files). Multi-touch safe.
- Returns a normalized state object each frame.

## Done when
- `npm install && npm run dev` shows the planet in the ballpoint look, the player walks all the way around the sphere
  (including over both poles) without glitches, jumps, collides with trees and rocks, and the camera follows smoothly.
- `npm run build` passes. No console errors or warnings.

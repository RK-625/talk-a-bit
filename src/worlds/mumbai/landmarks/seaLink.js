// Bandra-Worli Sea Link parts. The bridge axis is local Z (travel direction); the deck TOP (road) is at y=0, so the
// assembler sets the deck height above the sea. Everything shares this frame so pylon, deck, piers and embankments line up.
// Deck cross-section (x): [footpath 1.5 | kerb | road 3.6 | kerb | footpath 1.5], railing on both outer edges.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape } from './kit.js';

export const DECK = { width: 7.4, road: 3.6, footW: 1.5, footY: 0.22, railX: 3.45, girderBottom: -1.4 };
const CONCRETE = 0xe6e0d4, GIRDER = 0xd0c9bb, PAVE = 0xe3d8c4;

/** Thin pencil cable lines (no ink hull): pairs of points -> LineSegments on the overlay layer. */
function cableLines(pairs, color = 0x5d5878) {
  const pos = [];
  for (const [a, b] of pairs) { pos.push(...a, ...b); pos.push(a[0] + 0.035, a[1], a[2], b[0] + 0.035, b[1], b[2]); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const l = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color }));
  l.layers.set(1);
  l.frustumCulled = false;
  return l;
}

/**
 * Inverted-Y pylon straddling the roadway; thin legs, tapered mast, cable fan drawn as pencil lines.
 * opts.baseDepth (default 7): caissons go this far BELOW the deck top, down to the sea bed.
 */
export function createPylon(ink, opts = {}) {
  if (typeof ink === 'number') { opts = { baseDepth: ink }; ink = undefined; }
  const baseDepth = opts.baseDepth ?? 7;
  const k = new Kit(ink, { hatch: 0.16, thickness: 1.8, seed: 101 });
  const legX = 5.4, yMeet = 12, yBase = -1.0, top = 24.5;
  const ang = Math.atan2(legX, yMeet - yBase);
  const legLen = Math.hypot(legX, yMeet - yBase);
  // caissons reaching the sea bed + a pile-cap beam under the roadway
  for (const sx of [-1, 1]) {
    k.cyl(PAL.plinth, 1.25, 1.75, baseDepth, sx * legX, -baseDepth, 0, { seg: 10 });
    k.cyl(PAL.stoneDark, 1.55, 1.55, 0.35, sx * legX, -1.1, 0, { seg: 10 });
  }
  k.box(PAL.plinth, legX * 2, 0.9, 1.8, 0, -baseDepth * 0.55, 0);
  // legs
  for (const sx of [-1, 1]) {
    const mid = (yMeet + yBase) / 2;
    k.add(new THREE.BoxGeometry(1.0, legLen, 0.95), CONCRETE, { pos: [sx * legX / 2, mid, 0], rot: [0, 0, sx * ang] });
  }
  // strut over the road, joint block, tapered mast
  k.box(CONCRETE, legX * 0.8, 0.5, 0.8, 0, 6.6, 0);
  k.box(CONCRETE, 1.3, 0.9, 1.1, 0, yMeet - 0.6, 0);
  k.add(new THREE.CylinderGeometry(0.28, 0.62, top - yMeet + 0.4, 4, 1).rotateY(Math.PI / 4), CONCRETE, { pos: [0, (top + yMeet - 0.4) / 2, 0] });
  k.cyl(PAL.red, 0.05, 0.08, 0.9, 0, top - 0.2, 0, { seg: 5 });
  k.ball(PAL.red, 0.16, 0, top + 0.75, 0, { seg: 6, ring: 4 });
  const g = k.finish({ lean: 0 });
  // cable fan as thin lines, to both deck edges and both directions
  const N = 6, pairs = [];
  for (let i = 0; i < N; i++) {
    const y = yMeet + 0.8 + i * ((top - yMeet - 2.2) / (N - 1));
    const dz = 2.6 + i * 1.9;
    for (const sz of [-1, 1]) for (const sx of [-1, 1]) pairs.push([[sx * 0.2, y, sz * 0.05], [sx * DECK.railX, 0.8, sz * dz]]);
  }
  g.add(cableLines(pairs));
  g.name = 'seaLinkPylon';
  g.userData = {
    footprint: 12, height: top + 1, baseDepth, reach: 14.2, deckWidth: DECK.width,
    colliders: [-1, 1].map((sx) => ({ x: sx * legX * 0.85, z: 0, radius: 0.85, height: 9 })),
  };
  return g;
}

/**
 * Road deck segment: top of road at y=0, 7.4 wide, `length` along Z (default 4); identical ends so segments chain.
 * Raised footpaths (y=0.22) with railings on both sides; road lanes in the middle.
 * walkable: [left footpath, right footpath, road] rects with kind.
 */
export function createDeckSegment(ink, length = 4) {
  const k = new Kit(ink, { hatch: 0.12, thickness: 2.0, seed: 111 });
  const L = length, W = DECK.width, R = DECK.road, FW = DECK.footW;
  k.box(GIRDER, W, 0.5, L, 0, -0.5, 0);                           // slab
  k.box(CONCRETE, 4.3, 0.9, L, 0, -1.4, 0);                       // box girder under the roadway
  k.box(PAL.asphalt, R, 0.06, L, 0, -0.04, 0, { outline: false });
  for (const s of [-1, 1]) k.box(0xfaf6ea, 0.12, 0.03, L / 4, 0, 0.0, s * L / 4, { outline: false }); // dashed centre (period L/2)
  for (const sx of [-1, 1]) k.box(0xfaf6ea, 0.07, 0.03, L, sx * (R / 2 - 0.2), 0.0, 0, { outline: false });
  for (const sx of [-1, 1]) {
    const cx = sx * (R / 2 + 0.08 + FW / 2);
    k.box(0xc9bfae, 0.16, DECK.footY + 0.04, L, sx * (R / 2 + 0.08), -0.02, 0);          // kerb stone
    k.box(PAVE, FW, DECK.footY, L, cx, -0.0, 0);                                         // raised footpath
    for (const z of [-L / 4, L / 4]) k.box(0xbfb39d, FW - 0.1, 0.02, 0.05, cx, DECK.footY, z, { outline: false }); // paver seams
    // railing: posts, two rails, base plinth
    const x = sx * DECK.railX, y0 = DECK.footY;
    k.box(CONCRETE, 0.3, 0.3, L, x, y0, 0);
    k.box(PAL.teal, 0.1, 0.09, L, x, y0 + 1.05, 0);
    k.box(PAL.teal, 0.07, 0.06, L, x, y0 + 0.6, 0);
    const n = Math.max(2, Math.round(L / 0.8));
    for (let i = 0; i < n; i++) k.box(CONCRETE, 0.13, 0.78, 0.13, x, y0 + 0.3, ((i + 0.5) / n - 0.5) * L);
  }
  const g = k.finish({ lean: 0 });
  g.name = 'seaLinkDeck';
  const fx = R / 2 + 0.16 + (FW - 0.16) / 2;
  g.userData = {
    footprint: L / 2 + 1, length: L, width: W, roadWidth: R, footpathWidth: FW, footpathHeight: DECK.footY, height: 1.4,
    colliders: [-1, 1].flatMap((sx) => lineColliders(sx * DECK.railX, -L / 2, sx * DECK.railX, L / 2, 0.28, 2.0, 0.7)),
    walkable: [
      { shape: 'rect', kind: 'footpath', x: -fx, z: 0, w: FW - 0.4, d: L, y: DECK.footY },
      { shape: 'rect', kind: 'footpath', x: fx, z: 0, w: FW - 0.4, d: L, y: DECK.footY },
      { shape: 'rect', kind: 'road', x: 0, z: 0, w: R - 0.3, d: L, y: 0 },
    ],
  };
  return g;
}

/** Pier under a deck joint: pier cap + tapered pillars down `height` below the deck top (to the sea bed). Axis Z like the deck. */
export function createPier(ink, height = 8) {
  if (typeof ink === 'number') { height = ink; ink = undefined; }
  const k = new Kit(ink, { hatch: 0.16, thickness: 2.0, seed: 121 });
  const capTop = DECK.girderBottom, capH = 0.8;
  k.box(CONCRETE, DECK.width - 0.6, capH, 2.4, 0, capTop - capH, 0);
  k.box(GIRDER, DECK.width - 1.6, 0.25, 2.8, 0, capTop - capH - 0.25, 0);
  const colTop = capTop - capH - 0.25, colLen = Math.max(1, height - Math.abs(colTop));
  for (const sx of [-1, 1]) {
    k.cyl(CONCRETE, 0.75, 1.15, colLen, sx * 1.55, -height, 0, { seg: 8 });
    k.cyl(PAL.stoneDark, 1.15, 1.35, 0.6, sx * 1.55, -height, 0, { seg: 8 }); // footing collar on the sea bed
  }
  k.box(GIRDER, 3.9, 0.6, 1.0, 0, -height * 0.45, 0); // cross-brace
  const g = k.finish({ lean: 0 });
  g.name = 'seaLinkPier';
  g.userData = { footprint: 4, height, colliders: [], bottom: -height };
  return g;
}

/** Land approach: a solid embankment under the deck (sides slope down `height`, stone retaining faces). Axis Z, top just under the slab. */
export function createEmbankment(ink, length = 8, height = 4) {
  if (typeof ink === 'number') { length = ink; ink = undefined; }
  const k = new Kit(ink, { hatch: 0.16, thickness: 2.0, seed: 131 });
  const L = length, W = DECK.width, top = -0.5, slope = height * 0.9;
  const prof = polyShape([[-W / 2 - slope, top - height], [W / 2 + slope, top - height], [W / 2, top], [-W / 2, top]]);
  k.extrude(0xcdbf94, prof, L, 0, 0, 0, {});
  // rotate extrude so depth runs along z: shape is in XY and extruded on z, which is already the bridge axis
  for (const sx of [-1, 1]) {
    k.box(PAL.stone, 0.4, Math.min(1.6, height), L, sx * (W / 2 + 0.1), top - Math.min(1.6, height), 0); // retaining wall band
    for (let i = 0; i < Math.round(L / 1.6); i++) k.box(PAL.stoneDark, 0.46, 0.12, 0.08, sx * (W / 2 + 0.1), top - 0.7, -L / 2 + (i + 0.5) * (L / Math.round(L / 1.6)), { outline: false });
  }
  // grass tufts on the slopes
  for (const sx of [-1, 1]) for (let i = 0; i < Math.max(2, Math.round(L / 1.8)); i++) {
    const z = -L / 2 + (i + 0.5) * (L / Math.max(2, Math.round(L / 1.8)));
    k.ball(PAL.leaf, 0.3, sx * (W / 2 + slope * 0.5), top - height * 0.5, z, { seg: 6, ring: 4, sy: 0.6, outline: false });
  }
  const g = k.finish({ lean: 0 });
  g.name = 'seaLinkEmbankment';
  g.userData = {
    footprint: L / 2 + slope, length: L, height, bottom: top - height,
    colliders: [-1, 1].flatMap((sx) => lineColliders(sx * (W / 2 + slope * 0.55), -L / 2, sx * (W / 2 + slope * 0.55), L / 2, 0.6, 1.5, 1.0)),
  };
  return g;
}

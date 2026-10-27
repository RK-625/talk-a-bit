// Signature Bridge parts (the old Sea Link): concrete box girder deck + piers, and the CABLE-STAYED PYLON (restyled as the inclined, bent steel pylon).
// (Original notes: Bandra-Worli Sea Link parts. The bridge axis is local Z (travel direction); the deck TOP (road) is at y=0, so the
// assembler sets the deck height above the sea. Everything shares this frame so pylon, deck, piers and embankments line up.)
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
 * Signature Bridge pylon (references: Wikimedia Commons "Delhi-Signature Bridge-22-under constrction-2016-gje" and the deck/ramp views): a tall STEEL pylon that is inclined and bent,
 * not upright: two box-section legs rise from the water either side of the deck, lean over together along the bridge axis and fuse about 60% of the way up into a single
 * steel mast that keeps leaning to a sharp tip; horizontal struts and cross bracing tie the legs; a fan of stay cables runs from the upper mast down to the deck on the
 * span side (drawn as pencil lines) with a few shorter back-stays on the other side.
 * opts.baseDepth (default 7): caissons go this far BELOW the deck top, down to the river bed. opts.lean: +1 / -1 = which way (along local z) the pylon leans (the span is the other way).
 */
export function createPylon(ink, opts = {}) {
  if (typeof ink === 'number') { opts = { baseDepth: ink }; ink = undefined; }
  const baseDepth = opts.baseDepth ?? 7;
  const lean = opts.lean ?? -1;
  const k = new Kit(ink, { hatch: 0.14, thickness: 1.8, seed: 101 });
  const STEEL = 0xdde3ea, STEEL_D = 0xb4bec8, STEEL_L = 0xf2f5f8;
  const legX = 5.4, yBase = -1.0, yJoin = 13.5, top = 24.5;
  const Z0 = 0;
  const P = (x, y, z) => new THREE.Vector3(x, y, z);
  /** a steel member from p0 to p1: box w x d section */
  const member = (p0, p1, w, d, col, o = {}) => {
    const dir = p1.clone().sub(p0), L = dir.length();
    const geo = new THREE.BoxGeometry(w, L + 0.1, d);
    geo.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()));
    k.add(geo, col, { pos: [(p0.x + p1.x) / 2, (p0.y + p1.y) / 2, (p0.z + p1.z) / 2], outline: o.outline ?? true });
  };
  // caissons reaching the river bed + a pile-cap beam under the roadway
  for (const sx of [-1, 1]) {
    k.cyl(PAL.plinth, 1.25, 1.75, baseDepth, sx * legX, -baseDepth, Z0, { seg: 10 });
    k.cyl(PAL.stoneDark, 1.55, 1.55, 0.35, sx * legX, -1.1, Z0, { seg: 10 });
  }
  k.box(PAL.plinth, legX * 2, 0.9, 1.8, 0, -baseDepth * 0.55, Z0);
  // geometry of the two legs: from the foot (x = +-legX) to the join (x = 0, leaning in z), then the single mast to the tip
  const join = P(0, yJoin, Z0 + lean * 5.2);
  const tip = P(0, top, Z0 + lean * 9.6);
  const foot = (sx) => P(sx * legX, yBase, Z0);
  const at = (sx, t) => foot(sx).lerp(join, t);                 // a point a fraction t of the way up leg sx
  for (const sx of [-1, 1]) {
    // each leg in three stages, slimming as it rises
    const stages = [0, 0.38, 0.72, 1];
    for (let i = 0; i < 3; i++) member(at(sx, stages[i]), at(sx, stages[i + 1]), 1.0 - i * 0.2, 0.9 - i * 0.16, i % 2 ? STEEL : STEEL_D);
  }
  // struts and cross bracing between the legs
  for (const t of [0.22, 0.45, 0.68]) { member(at(-1, t), at(1, t), 0.34, 0.3, STEEL_D); }
  for (const [t0, t1] of [[0.22, 0.45], [0.45, 0.68]]) { member(at(-1, t0), at(1, t1), 0.18, 0.16, STEEL_L, { outline: false }); member(at(1, t0), at(-1, t1), 0.18, 0.16, STEEL_L, { outline: false }); }
  k.box(STEEL_D, 1.5, 0.9, 1.4, 0, yJoin - 0.5, join.z - lean * 0.0);              // the junction casting
  // the single mast: two tapering stages leaning on to a sharp tip
  const m1 = P(0, 19.0, Z0 + lean * 7.6);
  member(join, m1, 1.1, 1.0, STEEL, {});
  member(m1, tip, 0.7, 0.6, STEEL_L, {});
  k.cone(STEEL_L, 0.34, 1.2, 0, top, tip.z + lean * 0.35, { seg: 4 });
  k.ball(PAL.red, 0.12, 0, top + 1.3, tip.z + lean * 0.4, { seg: 5, ring: 4, outline: false });
  // the glass viewing box on the leaning mast
  k.box(0x8fb8c8, 1.1, 0.9, 1.1, 0, 15.2, Z0 + lean * 6.2, { outline: true });
  const g = k.finish({ lean: 0 });
  // stay cables: a fan from the upper mast to the deck edges on the span side (-lean), a few back-stays on the lean side
  const N = 9, pairs = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const y = 14.2 + t * 8.6, zA = Z0 + lean * (5.6 + t * 3.6);
    const dz = 2.2 + i * 1.45;                                   // distance along the span side
    for (const sx of [-1, 1]) pairs.push([[sx * 0.18, y, zA], [sx * DECK.railX, 0.8, Z0 - lean * dz]]);
  }
  for (let i = 0; i < 3; i++) {
    const y = 20.2 + i * 1.5, zA = Z0 + lean * (8.0 + i * 0.5), dz = 7.4 + i * 1.9;
    for (const sx of [-1, 1]) pairs.push([[sx * 0.14, y, zA], [sx * DECK.railX, 0.8, Z0 + lean * dz]]);
  }
  g.add(cableLines(pairs, 0x6a6690));
  g.name = 'seaLinkPylon';
  g.userData = {
    footprint: 12, height: top + 1, baseDepth, reach: 14.2, deckWidth: DECK.width,
    colliders: [-1, 1].map((sx) => ({ x: sx * legX * 0.85, z: Z0, radius: 0.85, height: 9 })),
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
  for (const sx of [-1, 1]) k.box(PAL.teal, 0.1, 0.18, L, sx * (W / 2 - 0.02), -0.42, 0, { outline: false }); // accent stripe on the slab edge
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

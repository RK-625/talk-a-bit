// Goshree bridge (Kochi) parts: the concrete causeway-bridge over the backwater, with low concrete arch ribs and tall carved end pillars
// at each pylon position, tall double-arm lamp posts, blue-painted railings and round concrete piers. (Replaces the Napier arches.)
// Photo: Wikimedia Commons "Goshree bridge kochi.jpg": square carved concrete pylons, blue railings, tall double-arm lamps, plain road.
// The bridge axis is local Z (travel direction); the deck TOP (road) is at y=0, so the assembler sets the deck height above the sea.
// Deck cross-section (x): [footpath 1.5 | kerb | road 3.6 | kerb | footpath 1.5], blue railing on both outer edges.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape } from './kit.js';

export const DECK = { width: 7.4, road: 3.6, footW: 1.5, footY: 0.22, railX: 3.45, girderBottom: -1.4 };
const CONCRETE = 0xd6d2c6, GIRDER = 0xc9c5b9, PAVE = 0xdcd2bd, RAIL = 0x4f78a8, RAIL_D = 0x3d5f89;

const ARCH = 0xd9d5c9, ARCH_D = 0xbdb9ac;
/**
 * One span's worth of low concrete arches: a shallow arch rib along each deck edge (springing from the pillars at the span ends) with
 * short vertical posts, a pair of square carved end pillars per side and tall double-arm lamp posts. Spans local z in [-8, 8]
 * (adjacent spans meet at the piers). opts.baseDepth is accepted and ignored (the piers carry the loads).
 */
export function createPylon(ink, opts = {}) {
  if (typeof ink === 'number') { opts = { baseDepth: ink }; ink = undefined; }
  const k = new Kit(ink, { hatch: 0.1, thickness: 1.9, seed: 101 });
  const HALF = 8, H = 2.3, AX = 3.95;
  for (const sx of [-1, 1]) {
    // the arch rib: a shallow half-ellipse (torus arc squashed in height) lying in the YZ plane
    k.add(new THREE.TorusGeometry(HALF, 0.22, 4, 24, Math.PI), ARCH, { pos: [sx * AX, 0.25, 0], rot: [0, Math.PI / 2, 0], scale: [1, H / HALF, 1] });
    for (let z = -HALF + 2; z < HALF - 1; z += 2) { // short vertical hangers
      const h = H * Math.sqrt(Math.max(0.0, 1 - (z / HALF) ** 2));
      k.box(ARCH_D, 0.12, h, 0.12, sx * AX, 0.3, z, { outline: false });
    }
    // carved square end pillars (tapering, three carved bands, a pyramidal cap) at both ends of the rib
    for (const sz of [-1, 1]) {
      const px = sx * AX, pz = sz * (HALF - 0.45);
      k.box(ARCH_D, 1.0, 0.5, 1.0, px, -0.1, pz);
      k.box(ARCH, 0.8, 2.6, 0.8, px, 0.4, pz);
      for (const y of [0.9, 1.7, 2.5]) k.box(ARCH_D, 0.95, 0.16, 0.95, px, y, pz, { outline: false });
      k.add(new THREE.ConeGeometry(0.62, 0.55, 4, 1).rotateY(Math.PI / 4), ARCH, { pos: [px, 3.35, pz] });
    }
  }
  // tall double-arm lamp posts on the rails (every 4 units)
  for (const sx of [-1, 1]) for (const z of [-4, 0, 4]) {
    const x = sx * 3.55;
    k.rod(0x8a8f94, [x, 0.2, z], [x, 6.4, z], 0.07, { r2: 0.05, seg: 5, outline: true });
    k.rod(0x8a8f94, [x, 6.4, z], [x - sx * 0.9, 6.75, z], 0.04, { seg: 4 });
    k.ball(0xfff1b8, 0.15, x - sx * 0.95, 6.68, z, { seg: 5, ring: 4, outline: false });
  }
  const g = k.finish({ lean: 0 });
  g.name = 'seaLinkPylon';
  g.userData = {
    footprint: 9, height: H + 1, baseDepth: opts.baseDepth ?? 7, reach: 8.6, deckWidth: DECK.width,
    colliders: [-1, 1].flatMap((sx) => [-1, 1].map((sz) => ({ x: sx * AX, z: sz * (HALF - 0.45), radius: 0.55, height: 2 }))),
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
    k.box(RAIL_D, 0.12, 0.1, L, x, y0 + 0.3, 0, { outline: false });
    k.box(RAIL, 0.1, 0.09, L, x, y0 + 1.05, 0);
    k.box(RAIL, 0.07, 0.06, L, x, y0 + 0.6, 0);
    const n = Math.max(3, Math.round(L / 0.5));
    for (let i = 0; i < n; i++) k.box(RAIL, 0.07, 0.78, 0.07, x, y0 + 0.3, ((i + 0.5) / n - 0.5) * L, { outline: false }); // blue railing balusters
  }
  for (const sx of [-1, 1]) { // tall double-arm lamp post at the middle of each segment, as on the real bridge
    const x = sx * DECK.railX;
    k.rod(0x8a8f94, [x, DECK.footY, 0], [x, 6.0, 0], 0.06, { r2: 0.045, seg: 5, outline: false });
    k.rod(0x8a8f94, [x, 6.0, 0], [x - sx * 0.85, 6.35, 0], 0.035, { seg: 4 });
    k.ball(0xfff1b8, 0.14, x - sx * 0.9, 6.28, 0, { seg: 5, ring: 3, outline: false });
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
    k.cyl(0xd9d4c4, 0.85, 0.95, colLen, sx * 1.75, -height, 0, { seg: 12 });   // round concrete piers
    k.cyl(PAL.stoneDark, 1.15, 1.2, 0.6, sx * 1.75, -height, 0, { seg: 12 });            // footing on the sea bed
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

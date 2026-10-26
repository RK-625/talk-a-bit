// Hebbal-style flyover / Namma Metro viaduct parts (the old Sea Link): concrete box girder, purple accent stripe, tulip piers, no cable pylons.
// (Original notes: Bandra-Worli Sea Link parts. The bridge axis is local Z (travel direction); the deck TOP (road) is at y=0, so the
// assembler sets the deck height above the sea. Everything shares this frame so pylon, deck, piers and embankments line up.)
// Deck cross-section (x): [footpath 1.5 | kerb | road 3.6 | kerb | footpath 1.5], railing on both outer edges.
import * as THREE from 'three';
import { Kit, PAL, lineColliders, polyShape } from './kit.js';

export const DECK = { width: 7.4, road: 3.6, footW: 1.5, footY: 0.22, railX: 3.45, girderBottom: -1.4 };
const CONCRETE = 0xe6e0d4, GIRDER = 0xd0c9bb, PAVE = 0xe3d8c4;

/**
 * Hebbal-style flyover pier (replaces the cable-stayed pylon: no pylon above the deck): a tapered concrete tulip pier on a
 * caisson under the box girder, flared into a crosshead with a purple Namma-Metro accent stripe.
 * opts.baseDepth (default 7): the caisson goes this far BELOW the deck top, down to the lake bed.
 */
export function createPylon(ink, opts = {}) {
  if (typeof ink === 'number') { opts = { baseDepth: ink }; ink = undefined; }
  const baseDepth = opts.baseDepth ?? 7;
  const k = new Kit(ink, { hatch: 0.16, thickness: 1.8, seed: 101 });
  const capTop = DECK.girderBottom;
  k.cyl(PAL.plinth, 1.4, 1.9, baseDepth * 0.5, 0, -baseDepth, 0, { seg: 10 });                 // caisson
  k.cyl(PAL.stoneDark, 1.7, 1.7, 0.3, 0, -baseDepth * 0.5 - 0.1, 0, { seg: 10 });
  k.cyl(CONCRETE, 0.8, 1.15, capTop - 0.8 - (-baseDepth * 0.5 + 0.1), 0, -baseDepth * 0.5 + 0.1, 0, { seg: 8 }); // shaft
  k.add(new THREE.CylinderGeometry(2.6, 0.8, 1.2, 4, 1).rotateY(Math.PI / 4).scale(1.6, 1, 0.55), CONCRETE, { pos: [0, capTop - 0.8, 0] }); // flared crosshead
  k.box(CONCRETE, DECK.width - 0.6, 0.4, 1.6, 0, capTop - 0.2, 0);
  k.box(PAL.metro, DECK.width - 0.5, 0.16, 1.7, 0, capTop - 0.26, 0, { outline: false });
  const g = k.finish({ lean: 0 });
  g.name = 'flyoverPier';
  g.userData = { footprint: 12, height: 2, baseDepth, reach: 14.2, deckWidth: DECK.width, colliders: [] };
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
  for (const sx of [-1, 1]) k.box(PAL.metro, 0.1, 0.18, L, sx * (W / 2 - 0.02), -0.42, 0, { outline: false }); // purple accent stripe on the slab edge
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
    k.box(PAL.metro, 0.1, 0.09, L, x, y0 + 1.05, 0);
    k.box(PAL.metro, 0.07, 0.06, L, x, y0 + 0.6, 0);
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

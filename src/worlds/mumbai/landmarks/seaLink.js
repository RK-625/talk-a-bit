// Bandra-Worli Sea Link parts. The bridge axis is local Z (travel direction); the deck TOP is at y=0, so the
// assembler sets the deck height above the sea. Pylon and deck segments share this frame so they line up.
import * as THREE from 'three';
import { Kit, PAL, lineColliders } from './kit.js';

const DECK_W = 4.4;
const CONCRETE = 0xe6e0d4, GIRDER = 0xd0c9bb;

function cable(a, b, r = 0.045) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
  const len = A.distanceTo(B);
  const g = new THREE.CylinderGeometry(r, r, len, 4, 1);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize()));
  const mid = A.clone().add(B).multiplyScalar(0.5);
  g.translate(mid.x, mid.y, mid.z);
  return g;
}

/** Inverted-Y pylon straddling the roadway, cable fan out to both directions. ~9 wide x 20 long (cables) x ~23 tall. */
export function createPylon(ink) {
  const k = new Kit(ink, { hatch: 0.18, thickness: 1.5, seed: 101 });
  const legX = 3.9, yMeet = 11.5, yBase = -1.8, top = 23;
  const ang = Math.atan2(legX, yMeet - yBase);
  const legLen = Math.hypot(legX, yMeet - yBase);
  // pile caps / piers in the sea
  for (const sx of [-1, 1]) k.box(PAL.plinth, 2.6, 3.4, 3.4, sx * legX, -3.2, 0);
  k.box(PAL.plinth, legX * 2 + 2.6, 2.6, 2.4, 0, -3.2, 0);
  // legs
  for (const sx of [-1, 1]) {
    const mid = (yMeet + yBase) / 2;
    k.add(new THREE.BoxGeometry(1.5, legLen, 1.4), CONCRETE, { pos: [sx * legX / 2, mid, 0], rot: [0, 0, sx * ang] });
  }
  // cross strut above the road + mast
  k.box(CONCRETE, legX * 1.5, 0.7, 1.0, 0, 6.4, 0);
  k.box(CONCRETE, 1.7, 1.0, 1.5, 0, yMeet - 0.5, 0);
  k.add(new THREE.CylinderGeometry(0.45, 0.85, top - yMeet, 4, 1).rotateY(Math.PI / 4), CONCRETE, { pos: [0, (top + yMeet) / 2, 0] });
  k.box(PAL.red, 0.2, 0.9, 0.2, 0, top, 0); // aircraft light mast
  k.ball(PAL.red, 0.2, 0, top + 0.95, 0, { seg: 6, ring: 4 });
  // the fan: 7 stays each way, both sides of the deck
  const N = 6;
  for (let i = 0; i < N; i++) {
    const y = yMeet + 1.2 + i * ((top - yMeet - 2.4) / (N - 1));
    const dz = 2.2 + i * 1.35;
    for (const sz of [-1, 1]) for (const sx of [-1, 1]) {
      k.add(cable([sx * 0.25, y, sz * 0.1], [sx * (DECK_W / 2 - 0.1), 0.5, sz * dz], 0.05), 0xf6efdc, {});
    }
  }
  const g = k.finish({ lean: 0 });
  g.name = 'seaLinkPylon';
  g.userData = {
    footprint: 10,
    height: top + 1,
    reach: 11.0, // cables reach this far along +-Z: lay deck segments through it
    deckWidth: DECK_W,
    colliders: [-1, 1].flatMap((sx) => [{ x: sx * legX, z: 0, radius: 0.95, height: 9 }, { x: sx * (legX - 1.2), z: 0, radius: 0.8, height: 8 }]),
  };
  return g;
}

/** Road deck segment: top at y=0, 4.4 wide, `length` along Z (default 4), ends identical so segments butt cleanly.
 *  Parapet/railing + dashed lane line. walkable rect covers the whole road. */
export function createDeckSegment(ink, length = 4) {
  const k = new Kit(ink, { hatch: 0.12, thickness: 2.2, seed: 111 });
  const L = length, W = DECK_W;
  // slab and underside box girder
  k.box(GIRDER, W + 0.2, 0.5, L, 0, -0.5, 0);
  k.box(CONCRETE, W * 0.62, 0.8, L, 0, -1.3, 0);
  k.box(PAL.asphalt, W - 0.5, 0.06, L, 0, -0.04, 0, { outline: false });
  // lane markings (period L/2 so segments chain): dash at +-L/4, length L/4
  for (const s of [-1, 1]) k.box(0xfaf6ea, 0.1, 0.03, L / 4, 0, 0.0, s * L / 4, { outline: false });
  for (const sx of [-1, 1]) k.box(0xfaf6ea, 0.06, 0.03, L, sx * (W / 2 - 0.5), 0.0, 0, { outline: false });
  // parapets with posts and a rail
  const n = Math.max(2, Math.round(L / 0.8));
  for (const sx of [-1, 1]) {
    const x = sx * (W / 2 + 0.02);
    k.box(CONCRETE, 0.34, 0.42, L, x, 0, 0);
    k.box(CONCRETE, 0.24, 0.1, L, x, 1.0, 0);
    for (let i = 0; i < n; i++) k.box(CONCRETE, 0.14, 0.62, 0.14, x, 0.4, ((i + 0.5) / n - 0.5) * L);
  }
  const g = k.finish({ lean: 0 });
  g.name = 'seaLinkDeck';
  g.userData = {
    footprint: L / 2 + 1,
    length: L,
    width: W,
    height: 1.1,
    colliders: [-1, 1].flatMap((sx) => lineColliders(sx * (W / 2 + 0.02), -L / 2, sx * (W / 2 + 0.02), L / 2, 0.3, 2.0, 0.7)),
    walkable: [{ shape: 'rect', x: 0, z: 0, w: W - 0.2, d: L, y: 0 }],
  };
  return g;
}

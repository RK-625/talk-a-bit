// Chinese fishing nets (cheena vala), Fort Kochi: a row of cantilevered timber rigs standing on pile decks at the harbour edge.
// Each rig = a deck on palm-trunk piles, an A-frame fulcrum, a long bamboo-and-timber boom pivoting on it, a square net slung from
// the boom tip by four ropes to a crossed pair of bamboo spreaders, and a rope with counterweight stones hanging from the shore end.
// (Replaces Fort St. George; same footprint 17 x 12, same quay plaza + steps, same harbour to +Z, anchors kept.)
// Photos: Wikimedia Commons "Chinese Fishing Nets - 2/3/4": tall angled mast, weathered grey-brown poles, ropes fanning to the net.
// Local frame: y up, base y=0, harbour (sea) toward +Z. ~17 wide x 12 deep (the rigs reach out over the water).
import * as THREE from 'three';
import { Kit, PAL, lineColliders, makeCanvas, handRng, bilingualBoard, mulberry32 } from './kit.js';

const TIMBER = 0x9a7b59, TIMBER_D = 0x6e5238, BAMBOO = 0xd9c67e, BAMBOO_D = 0xb69f55, ROPE = 0x5a5648, STONE = 0x8d8a85, STONE_D = 0x716e6a;
const LAT = 0xc9825a, LAT_D = 0xa9663f;

function netCanvas() {
  const { c, ctx } = makeCanvas(128, 128);
  ctx.strokeStyle = '#4a5758'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
  const n = 9;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * 128;
    ctx.beginPath(); ctx.moveTo(t, 0); ctx.lineTo(t, 128); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, t); ctx.lineTo(128, t); ctx.stroke();
  }
  return c;
}
let NET = null;

/** one rig at x = cx: z0 = where its deck starts (water edge), yaw a hair off, lift = how high the net hangs (0 = near the water) */
function rig(k, cx, z0, { yaw = 0, lift = 0, pitch = 0.5, net = 2.2 } = {}) {
  const P = (x, y, z) => { // rotate about the rig origin (cx, z0) by yaw
    const c = Math.cos(yaw), s = Math.sin(yaw);
    return [cx + x * c + z * s, y, z0 - x * s + z * c];
  };
  // ---- deck on piles ----
  const DW = 3.2, DL = 4.6;
  for (const sx of [-1, 1]) for (const sz of [0, 1, 2]) {
    const [px, , pz] = P(sx * (DW / 2 - 0.15), 0, 0.2 + sz * (DL / 2 - 0.1));
    k.cyl(TIMBER_D, 0.13, 0.17, 3.4, px, -3.2, pz, { seg: 6 });
  }
  const [dx, , dz] = P(0, 0, DL / 2);
  k.box(TIMBER, DW, 0.14, DL, dx, 0.02, dz, { ry: yaw });
  for (let i = 0; i < 5; i++) { const [bx, , bz] = P(0, 0, 0.3 + i * 0.95); k.box(TIMBER_D, DW + 0.3, 0.1, 0.12, bx, 0.1, bz, { ry: yaw, outline: false }); }
  // ---- A-frame fulcrum: two splayed legs meeting under a cross-beam ----
  const F = 1.8, FH = 4.6;
  const pivot = P(0, FH + 0.2, F);
  for (const sx of [-1, 1]) {
    k.rod(TIMBER, P(sx * 1.0, 0.1, F - 0.7), [pivot[0] + sx * 0.18 * Math.cos(yaw), pivot[1] - 0.2, pivot[2] - sx * 0.18 * Math.sin(yaw)], 0.12, { seg: 5, outline: true });
    k.rod(TIMBER, P(sx * 1.0, 0.1, F + 0.7), [pivot[0] + sx * 0.18 * Math.cos(yaw), pivot[1] - 0.2, pivot[2] - sx * 0.18 * Math.sin(yaw)], 0.12, { seg: 5, outline: true });
  }
  k.rod(TIMBER_D, P(-0.6, FH * 0.45, F), P(0.6, FH * 0.45, F), 0.07, { outline: false });
  // ---- the boom: heavy timber lower half + bamboo tip, pitched up over the water ----
  const dirb = [0, Math.sin(pitch), Math.cos(pitch)];
  const at = (t) => P(0, FH + 0.2 + dirb[1] * t, F + dirb[2] * t);
  const tipT = 6.8, backT = -3.8;
  k.rod(TIMBER, at(backT), at(1.5), 0.19, { r2: 0.19, seg: 6, outline: true });
  k.rod(BAMBOO, at(1.5), at(tipT), 0.13, { r2: 0.13, seg: 6, outline: true });
  for (let t = 1.6; t < tipT; t += 1.2) k.rod(BAMBOO_D, at(t - 0.04), at(t + 0.04), 0.16, { outline: false }); // bamboo joints
  const tip = at(tipT);
  // a second bamboo splint alongside the boom (as in the photos)
  k.rod(BAMBOO_D, [at(0.6)[0] + 0.22, at(0.6)[1] - 0.12, at(0.6)[2]], [at(tipT - 0.4)[0] + 0.12, at(tipT - 0.4)[1] - 0.1, at(tipT - 0.4)[2]], 0.07, { outline: false });
  // ---- spreaders + net ----
  const half = net, ny = Math.max(0.9, tip[1] - 4.4 + lift); // net rim height
  const C = [tip[0], ny, tip[2] + 0.4];
  const corner = (sx, sz) => [C[0] + sx * half * Math.cos(yaw) + sz * half * Math.sin(yaw), ny + 0.15 * (sx * sz), C[2] - sx * half * Math.sin(yaw) + sz * half * Math.cos(yaw)];
  const cs = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)];
  const hub = [C[0], ny + 0.5, C[2]];
  k.rod(BAMBOO, cs[0], cs[2], 0.07, { seg: 5, outline: true });
  k.rod(BAMBOO, cs[1], cs[3], 0.07, { seg: 5, outline: true });
  k.ball(TIMBER_D, 0.14, hub[0], hub[1] - 0.5, hub[2], { seg: 5, ring: 4 });
  for (const c of cs) k.rod(ROPE, tip, c, 0.022, { seg: 3 });
  k.rod(ROPE, tip, [hub[0], hub[1] - 0.5, hub[2]], 0.02, { seg: 3 });
  // the net: shallow inverted pyramid with a mesh texture
  const m = [C[0], ny - 0.9, C[2]];
  const pos = [], uv = [];
  const tri = (a, b, c) => { for (const v of [a, b, c]) { pos.push(...v); uv.push((v[0] - m[0]) / (half * 2.9) + 0.5, (v[2] - m[2]) / (half * 2.9) + 0.5); } };
  for (let i = 0; i < 4; i++) tri(m, cs[i], cs[(i + 1) % 4]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.computeVertexNormals();
  k.paintedMesh(NET ?? (NET = netCanvas()), geo);
  for (let i = 0; i < 4; i++) k.rod(ROPE, cs[i], cs[(i + 1) % 4], 0.03, { seg: 3 });   // rim ropes
  // ---- counterweights: a rope hanging from the shore end of the boom with a bunch of stones lashed on ----
  const back = at(backT);
  const hang = [back[0], back[1] - 1.0, back[2]];
  k.rod(ROPE, back, hang, 0.03, { seg: 3 });
  const r = mulberry32(Math.round(cx * 100) + 5);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 6.283, rr = i === 0 ? 0 : 0.28;
    k.ball(i % 2 ? STONE : STONE_D, 0.2 + r() * 0.1, hang[0] + Math.cos(a) * rr, hang[1] - 0.35 - (i % 3) * 0.22, hang[2] + Math.sin(a) * rr, { sx: 1, sy: 0.85, sz: 1, seg: 6, ring: 4 });
  }
  // hauling ropes tied off on the deck + a little stack of baskets
  k.rod(ROPE, at(backT + 0.4), P(0.9, 0.2, DL - 0.5), 0.025, { seg: 3 });
  k.box(0xd9b56a, 0.5, 0.35, 0.5, ...P(-1.1, 0.1, DL - 0.6).map((v, i) => (i === 1 ? 0.09 : v)), { ry: yaw });
  return { tip, fulcrum: P(0, 0, F) };
}

export function createGateway(ink) {
  const k = new Kit(ink, { hatch: 0.17, seed: 11 });

  // ---- laterite quay plaza + steps down to the water (front, +Z) ----
  k.base(17, 12, { color: LAT });
  k.box(0xd9c9a8, 16.0, 0.06, 11.0, 0, 0, 0, { outline: false });
  for (let i = 0; i < 4; i++) {
    const top = -0.05 - i * 0.2, z0 = 4.2 + i * 0.85;
    k.box(i % 2 ? LAT_D : LAT, 9.6 - i * 0.2, top + 1.6, 0.85, 0, -1.6, z0 + 0.43);
  }
  for (const sx of [-1, 1]) k.cyl(PAL.ink, 0.16, 0.2, 0.5, sx * 7.4, 0, 4.9, { seg: 6 }); // mooring bollards

  // ---- the row of four rigs, alternating a little in and out like the real line ----
  const specs = [
    { cx: -6.3, z0: 7.0, yaw: 0.06, lift: 0.5, pitch: 0.52, net: 2.3 },
    { cx: -2.1, z0: 8.6, yaw: -0.04, lift: -0.2, pitch: 0.46, net: 2.35 },
    { cx: 2.1, z0: 7.2, yaw: 0.03, lift: 0.9, pitch: 0.55, net: 2.25 },
    { cx: 6.3, z0: 8.8, yaw: -0.07, lift: 0.1, pitch: 0.5, net: 2.3 },
  ];
  const fulcra = specs.map((s) => rig(k, s.cx, s.z0, s));

  // ---- landward life: a fish-seller's tin-and-tarp shed, ice boxes, a name board, a short laterite wall ----
  const sx0 = -6.6, sz0 = 1.2;
  k.box(LAT, 3.2, 2.2, 2.4, sx0, 0, sz0 - 0.3);
  k.box(LAT_D, 3.3, 0.3, 2.5, sx0, 0, sz0 - 0.3);
  k.add(new THREE.BoxGeometry(3.8, 0.1, 3.2), 0x3f7fc0, { pos: [sx0, 2.45, sz0 + 0.1], rot: [0.16, 0, 0] });         // blue tarpaulin roof
  for (const dx of [-1.4, 1.4]) k.cyl(TIMBER_D, 0.07, 0.08, 2.1, sx0 + dx, 0, sz0 + 1.4, { seg: 5 });
  k.box(PAL.cream, 2.4, 0.08, 0.9, sx0, 0.78, sz0 + 1.2);                                                           // fish table
  for (const dx of [-0.9, 0.9]) k.box(TIMBER_D, 0.08, 0.76, 0.08, sx0 + dx, 0, sz0 + 1.2, { outline: false });
  for (let i = 0; i < 5; i++) k.box([0xb7c6cf, 0xd8a6a0, 0xaebbc2][i % 3], 0.36, 0.05, 0.12, sx0 - 0.8 + i * 0.4, 0.86, sz0 + 1.2, { ry: 0.2 * (i - 2), outline: false }); // fish
  k.box(0xf2efe6, 0.9, 0.55, 0.6, sx0 + 2.0, 0, sz0 + 0.4);                                                         // ice box
  k.box(0x3f7fc0, 0.94, 0.1, 0.64, sx0 + 2.0, 0.55, sz0 + 0.4, { outline: false });
  k.cyl(0xd9b56a, 0.22, 0.2, 0.4, sx0 + 2.0, 0, sz0 + 1.2, { seg: 8 });                                             // basket
  // the name board on two posts
  k.cyl(TIMBER_D, 0.07, 0.08, 1.9, 2.6, 0, 3.0, { seg: 5 });
  k.cyl(TIMBER_D, 0.07, 0.08, 1.9, 5.2, 0, 3.0, { seg: 5 });
  k.box(0xf6efd8, 3.0, 1.1, 0.1, 3.9, 1.0, 3.0);
  k.plane(bilingualBoard(2.9, 1.05, 'ചീനവല', 'CHINESE FISHING NETS', { fill: '#f6efd8', hatch: '#e0cf9a', tc: '#7a2f2f', taSize: 0.46, enSize: 0.16, px: 80 }), 2.9, 1.0, [3.9, 1.55, 3.07], 0);
  // short laterite wall at the back with a gap in the middle
  const wallSeg = (x0, x1) => {
    const cx = (x0 + x1) / 2, w = x1 - x0;
    k.box(LAT, w, 1.1, 0.5, cx, 0, -5.4);
    k.box(0xe7d6b2, w + 0.1, 0.12, 0.64, cx, 1.1, -5.4);
  };
  wallSeg(-8.2, -3.0); wallSeg(3.0, 8.2);

  const g = k.finish({ lean: 0.006 });
  g.name = 'gateway';
  g.userData = {
    footprint: 9,
    height: 8.4,
    colliders: [
      ...fulcra.flatMap((f, i) => [-1, 1].map((sx) => ({ x: specs[i].cx + sx * 0.9, z: f.fulcrum[2], radius: 0.35, height: 4 }))),
      { x: sx0, z: sz0 - 0.3, radius: 1.9, height: 2.3 },
      ...lineColliders(-8.2, -5.4, -3.0, -5.4, 0.4, 1.1, 1.0), ...lineColliders(3.0, -5.4, 8.2, -5.4, 0.4, 1.1, 1.0),
      ...[-1, 1].map((sx) => ({ x: sx * 7.4, z: 4.9, radius: 0.25, height: 0.5 })),
    ],
    walkable: [{ shape: 'rect', x: 0, z: 0, w: 3.4, d: 4.6, y: 0.05 }],
  };
  void handRng;
  return g;
}

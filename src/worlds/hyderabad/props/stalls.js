/**
 * hyderabad/props/stalls.js: street stalls and vendors' props.
 *
 * createVadaPavStall (= the mirchi bajji cart), createChaiTapri (= the Irani cafe), createBhelCart (= pani puri), createGolaStall (= falooda / kulfi), createFruitCart, createMarigoldMat,
 * createPaanStall, createNewspaperStand, createBalloonBunch  (all: (ink, opts?) -> THREE.Group)
 *
 * Frame: y up, base at y=0, the customer side / sign faces +z. userData = { footprint:{w,l}, colliders:[{x,z,radius,height}],
 * anchors:{...named spots (vendor, customer, ...)}, animate(dt) } (animate drives bubbling oil, steam, swaying bits).
 */
import * as THREE from 'three';
import {
  C, INKC, Mix, meshOf, plaque, hand, handRow, boardRect, paintCanvas, finish, wheelMesh, eyes, smile, blush, rng, mulberry32,
  drawShape, wobblyLine, INK, resolveInk, plainMesh, glowMat, steam, animator, swing, corrugated, umbrella, bamboo, ell, sphere, taperTube,
} from './kit.js';
import { stoolParts, crateParts } from './street.js';

const TAU = Math.PI * 2;
const HATCH = (c, a = 0.6) => c; // (hatch colours are passed explicitly)

// ---- painted illustrations for signs --------------------------------------------------------
function drawVadaPav(ctx, cx, cy, s, r, { face = true } = {}) {
  const lw = Math.max(2.5, s * 0.045);
  const bun = '#f3d49b', bunH = 'rgba(190,130,60,0.65)';
  // bottom bun
  drawShape(ctx, ell(cx, cy + s * 0.2, s * 0.62, s * 0.2, 12), { fill: bun, hatch: bunH, w: 2000, h: 2000, r, amp: 1.5, lw });
  // chutney peeking
  drawShape(ctx, ell(cx + s * 0.15, cy + s * 0.07, s * 0.28, s * 0.05, 8), { fill: '#e46a3c', w: 2000, h: 2000, r, amp: 1, lw: lw * 0.6 });
  // vada
  drawShape(ctx, ell(cx, cy - s * 0.1, s * 0.42, s * 0.36, 11), { fill: '#e9a94a', hatch: 'rgba(150,80,20,0.65)', w: 2000, h: 2000, r, amp: 2, lw });
  // top bun dome
  const dome = [];
  for (let i = 0; i <= 10; i++) { const a = Math.PI + (i / 10) * Math.PI; dome.push([cx + Math.cos(a) * s * 0.62, cy - s * 0.12 + Math.sin(a) * s * 0.4]); }
  dome.push([cx + s * 0.55, cy - s * 0.04], [cx - s * 0.55, cy - s * 0.04]);
  drawShape(ctx, dome, { fill: bun, hatch: bunH, w: 2000, h: 2000, r, amp: 1.5, lw });
  // sesame dots
  ctx.fillStyle = INK;
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(cx - s * 0.3 + i * s * 0.12, cy - s * 0.38 + Math.sin(i * 1.7) * s * 0.06, s * 0.025, s * 0.014, 0.4, 0, TAU); ctx.fill(); }
  // green chilli
  wobblyLine(ctx, [[cx + s * 0.35, cy + s * 0.02], [cx + s * 0.7, cy + s * 0.1], [cx + s * 0.9, cy - s * 0.06]], { r, lw: s * 0.09, color: INK, amp: 1 });
  wobblyLine(ctx, [[cx + s * 0.35, cy + s * 0.02], [cx + s * 0.7, cy + s * 0.1], [cx + s * 0.9, cy - s * 0.06]], { r, lw: s * 0.055, color: '#7cc46a', amp: 1 });
  if (face) {
    ctx.fillStyle = INK;
    for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + sx * s * 0.16, cy + s * 0.04, s * 0.04, 0, TAU); ctx.fill(); }
    ctx.strokeStyle = INK; ctx.lineWidth = lw * 0.8;
    ctx.beginPath(); ctx.arc(cx, cy + s * 0.07, s * 0.1, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    ctx.fillStyle = 'rgba(244,140,165,0.8)';
    for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + sx * s * 0.27, cy + s * 0.12, s * 0.07, s * 0.045, 0, 0, TAU); ctx.fill(); }
  }
}

function drawDosa(ctx, cx, cy, s, r) { // a mirchi bajji: a long green chilli in a golden chickpea-batter coat, with the slit showing the stuffing
  const lw = Math.max(2.5, s * 0.045);
  drawShape(ctx, ell(cx, cy + s * 0.38, s * 0.8, s * 0.13, 14), { fill: '#e9eef2', hatch: 'rgba(120,140,160,0.55)', w: 2000, h: 2000, r, amp: 1.2, lw });
  drawShape(ctx, [[cx - s * 0.7, cy + s * 0.2], [cx - s * 0.4, cy - s * 0.12], [cx + s * 0.35, cy - s * 0.22], [cx + s * 0.7, cy - s * 0.06], [cx + s * 0.6, cy + s * 0.2], [cx - s * 0.1, cy + s * 0.28]], { fill: '#e6a83f', hatch: 'rgba(150,90,20,0.65)', w: 2000, h: 2000, r, amp: 2, lw });
  drawShape(ctx, [[cx - s * 0.25, cy + s * 0.04], [cx + s * 0.3, cy - s * 0.06], [cx + s * 0.3, cy + s * 0.06], [cx - s * 0.2, cy + s * 0.14]], { fill: '#8fcf6a', w: 2000, h: 2000, r, amp: 1, lw: lw * 0.6 });
  wobblyLine(ctx, [[cx - s * 0.68, cy + s * 0.2], [cx - s * 0.88, cy + s * 0.3]], { r, lw: s * 0.07, color: '#5aa84a', amp: 1 });
  ctx.fillStyle = INK;
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(cx - s * 0.3 + i * s * 0.14, cy - s * 0.05 + Math.sin(i * 1.9) * s * 0.06, s * 0.018, 0, TAU); ctx.fill(); }
  drawShape(ctx, ell(cx + s * 0.55, cy + s * 0.34, s * 0.14, s * 0.07, 8), { fill: '#fffaf0', w: 2000, h: 2000, r, amp: 1, lw: lw * 0.6 });
  drawShape(ctx, ell(cx + s * 0.28, cy + s * 0.37, s * 0.1, s * 0.05, 8), { fill: '#e6c64a', w: 2000, h: 2000, r, amp: 1, lw: lw * 0.6 });
}

function teaCup(ctx, cx, cy, s, r) {
  const lw = Math.max(2.5, s * 0.05);
  // saucer
  drawShape(ctx, ell(cx, cy + s * 0.46, s * 0.62, s * 0.12, 12), { fill: '#cfd8df', hatch: 'rgba(110,130,150,0.6)', w: 2000, h: 2000, r, amp: 1.2, lw });
  // cup body
  drawShape(ctx, [[cx - s * 0.45, cy - s * 0.2], [cx + s * 0.45, cy - s * 0.2], [cx + s * 0.38, cy + s * 0.2], [cx + s * 0.2, cy + s * 0.42], [cx - s * 0.2, cy + s * 0.42], [cx - s * 0.38, cy + s * 0.2]], { fill: '#e3e9ee', hatch: 'rgba(110,130,150,0.6)', w: 2000, h: 2000, r, amp: 1.5, lw });
  // tea
  drawShape(ctx, ell(cx, cy - s * 0.2, s * 0.43, s * 0.09, 10), { fill: '#6b3f22', hatch: 'rgba(60,30,10,0.6)', w: 2000, h: 2000, r, amp: 1, lw: lw * 0.8 });
  // handle
  // face
  ctx.fillStyle = INK;
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + sx * s * 0.16, cy + s * 0.13, s * 0.035, 0, TAU); ctx.fill(); }
  ctx.lineWidth = lw * 0.7; ctx.beginPath(); ctx.arc(cx, cy + s * 0.15, s * 0.08, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
  ctx.fillStyle = 'rgba(244,140,165,0.85)';
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + sx * s * 0.27, cy + s * 0.2, s * 0.06, s * 0.04, 0, 0, TAU); ctx.fill(); }
  // steam curls
  ctx.strokeStyle = '#8fa8cf'; ctx.lineWidth = lw * 0.9;
  for (const sx of [-1, 0, 1]) {
    ctx.beginPath(); ctx.moveTo(cx + sx * s * 0.2, cy - s * 0.3);
    ctx.bezierCurveTo(cx + sx * s * 0.2 - s * 0.12, cy - s * 0.5, cx + sx * s * 0.2 + s * 0.14, cy - s * 0.6, cx + sx * s * 0.2 - s * 0.02, cy - s * 0.82);
    ctx.stroke();
  }
}

function dotBorder(ctx, w, h, color, step = 26, inset = 14) {
  ctx.fillStyle = color;
  for (let x = inset; x < w - inset / 2; x += step) { ctx.beginPath(); ctx.arc(x, inset, 3.6, 0, TAU); ctx.arc(x, h - inset, 3.6, 0, TAU); ctx.fill(); }
  for (let y = inset; y < h - inset / 2; y += step) { ctx.beginPath(); ctx.arc(inset, y, 3.6, 0, TAU); ctx.arc(w - inset, y, 3.6, 0, TAU); ctx.fill(); }
}

function warliBand(ctx, x, y, w, h, color, r) {
  // Warli-ish zigzag + triangles chalked on a band
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = Math.max(2, h * 0.08);
  const n = Math.floor(w / (h * 0.9));
  for (let i = 0; i < n; i++) {
    const cx = x + (i + 0.5) * (w / n);
    const up = i % 2 === 0;
    ctx.beginPath(); ctx.moveTo(cx - h * 0.28, y + h * (up ? 0.85 : 0.15)); ctx.lineTo(cx + h * 0.28, y + h * (up ? 0.85 : 0.15)); ctx.lineTo(cx, y + h * (up ? 0.3 : 0.7)); ctx.closePath(); ctx.stroke();
    if (up) { ctx.beginPath(); ctx.arc(cx, y + h * 0.14, h * 0.08, 0, TAU); ctx.fill(); }
  }
  void r;
}

// =====================================================================================================
// Mirchi bajji cart (was the vada pav stall): the star
// =====================================================================================================
export function createVadaPavStall(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const fns = [];
  const CTR_Y = 1.25;
  // wooden cabinet + steel counter top
  p.round(4.0, 1.15, 1.6, C.teal, { pos: [0, 0.6, 0.55], r: 0.1 });
  p.round(4.25, 0.1, 1.8, C.steel, { pos: [0, CTR_Y, 0.58], r: 0.04 });
  p.box(4.25, 0.12, 0.05, C.steelDark, { pos: [0, CTR_Y - 0.1, 1.5], outline: false });
  // frame posts
  for (const x of [-2.1, 2.1]) { p.cyl(0.07, 0.08, 4.5, C.woodDark, { pos: [x, 2.25, 1.72], seg: 6 }); p.cyl(0.07, 0.08, 5.0, C.woodDark, { pos: [x, 2.5, -1.5], seg: 6 }); }
  p.box(4.4, 0.08, 0.08, C.woodDark, { pos: [0, 4.45, 1.72], outline: false });
  // tin roof, tilted toward the customers, rusty speckles
  const rustN = mulberry32(5);
  const rustSpots = Array.from({ length: 6 }, () => [rustN() * 4.4 - 2.2, rustN() * 3.4 - 1.7, 0.1 + rustN() * 0.1]);
  p.paint(corrugated(4.9, 3.9, { waves: 12, amp: 0.07 }), (x, y, z) => {
    for (const [sx, sz, rad] of rustSpots) if ((x - sx) ** 2 + (z - sz) ** 2 < rad * rad) return 0xd89a73;
    return Math.sin(x * 9.4) > 0.3 ? 0xc3d1d9 : 0xb2c3cc;
  }, { pos: [0, 4.6, 0.1], rot: [0.09, 0, 0] });
  // back wall + shelves with jars
  p.round(4.2, 3.4, 0.1, C.pistachio, { pos: [0, 1.95, -1.45], r: 0.04 });
  for (const y of [1.75, 2.35]) p.box(3.8, 0.06, 0.4, C.wood, { pos: [0, y, -1.25] });
  const jc = [C.bestRed, C.marigoldY, C.green, C.pink, C.sky, C.lilac];
  for (const y of [1.75, 2.35]) for (let i = 0; i < 6; i++) {
    const x = -1.6 + i * 0.64;
    p.cyl(0.16, 0.16, 0.36, 0xe5f0f2, { pos: [x, y + 0.21, -1.25], seg: 8 });
    p.cyl(0.17, 0.17, 0.08, jc[(i + (y > 2 ? 2 : 0)) % jc.length], { pos: [x, y + 0.43, -1.25], seg: 8, outline: false });
  }

  // ---- kadhai on a clay-red stove (left) --------------------------------------------------
  const KX = -1.15, KZ = 0.5;
  p.cyl(0.62, 0.7, 0.55, C.terracotta, { pos: [KX, CTR_Y + 0.33, KZ], seg: 10 });
  p.box(0.34, 0.2, 0.05, 0xf4a05a, { pos: [KX, CTR_Y + 0.28, KZ + 0.66], outline: false }); // glowing fire slit
  p.box(0.2, 0.1, 0.05, 0xffe27a, { pos: [KX, CTR_Y + 0.27, KZ + 0.68], outline: false });
  p.lathe([[0.001, 0], [0.45, 0.03], [0.78, 0.22], [0.9, 0.52], [0.86, 0.54], [0.74, 0.28], [0.44, 0.12], [0.001, 0.1]], 0x3d3748, { pos: [KX, CTR_Y + 0.6, KZ], seg: 16 }); // the deep kadhai
  p.cyl(0.74, 0.74, 0.03, 0xe8a83a, { pos: [KX, CTR_Y + 0.84, KZ], seg: 16, outline: false }); // hot oil
  for (const sx of [-1, 1]) p.box(0.25, 0.07, 0.08, 0x3d3748, { pos: [KX + sx * 0.97, CTR_Y + 1.1, KZ], outline: false }); // handles
  // slotted spoon resting on the rim
  p.tube([KX + 0.2, CTR_Y + 1.16, KZ + 0.9], [KX + 1.3, CTR_Y + 1.2, KZ + 1.2], 0.03, C.steel, { seg: 5 });
  p.cyl(0.14, 0.14, 0.02, C.steel, { pos: [KX + 0.13, CTR_Y + 1.1, KZ + 0.85], seg: 8, outline: false });
  // bowls: chutneys, a pile of dry garlic chutney, and a steel tin
  const bowl = (x, z, fill, r = 0.2) => {
    p.lathe([[0.001, 0], [r * 0.6, 0], [r, r * 0.8], [r * 0.95, r * 0.9], [0.001, r * 0.9]], C.steel, { pos: [x, CTR_Y + 0.05, z], seg: 9 });
    p.cyl(r * 0.88, r * 0.88, 0.03, fill, { pos: [x, CTR_Y + 0.05 + r * 0.9 + 0.01, z], seg: 9, outline: false });
  };
  bowl(-0.15, 1.2, 0xe6523c, 0.22); bowl(0.35, 1.28, 0x66c070, 0.22); bowl(0.8, 1.2, 0xfaf6ea, 0.2);
  // ---- right: a tray of slit green chillies, a steel basin of chickpea batter with a ladle, onion + lemon
  p.round(1.9, 0.07, 1.1, C.steel, { pos: [1.2, CTR_Y + 0.08, 0.35], r: 0.03 });
  const cr = mulberry32(31);
  for (let i = 0; i < 9; i++) p.tube([1.0 + (i % 3) * 0.1, CTR_Y + 0.2 + Math.floor(i / 3) * 0.06, 0.05 + (i % 3) * 0.22], [1.95 + (cr() - 0.5) * 0.1, CTR_Y + 0.2 + Math.floor(i / 3) * 0.06, 0.1 + (i % 3) * 0.22], 0.045, i % 4 ? 0x6fb85a : 0x8fcf6a, { seg: 5, outline: i % 3 === 0 });
  p.lathe([[0.001, 0], [0.3, 0], [0.4, 0.2], [0.4, 0.4], [0.32, 0.46], [0.001, 0.46]], C.steel, { pos: [0.6, CTR_Y + 0.12, 0.5], seg: 10 });
  p.cyl(0.33, 0.33, 0.03, 0xe6c85e, { pos: [0.6, CTR_Y + 0.52, 0.5], seg: 10, outline: false });
  p.tube([0.6, CTR_Y + 0.55, 0.5], [0.95, CTR_Y + 0.95, 0.8], 0.03, C.steelDark, { seg: 5 });
  p.ball(0.12, 0xb35ac0, { pos: [1.7, CTR_Y + 0.28, 0.9], w: 6, h: 5, outline: false }); // red onions
  p.ball(0.1, 0xa84a9a, { pos: [1.85, CTR_Y + 0.26, 0.82], w: 6, h: 5, outline: false });
  p.ball(0.09, 0xf3e063, { pos: [1.55, CTR_Y + 0.25, 0.95], scale: [1, 0.8, 1], w: 6, h: 5, outline: false }); // lemon
  // cloth draped on part of the pile
  p.paint(new THREE.BoxGeometry(0.9, 0.05, 0.6, 5, 1, 4), (x, y, z) => ((Math.floor(x / 0.18) + Math.floor(z / 0.15)) % 2 ? 0xfffaf0 : 0xf4a0a8), { pos: [1.5, CTR_Y + 0.58, 0.32], rot: [0.08, 0.1, -0.12], outline: false });
  // ready mirchi bajjis on a plate in the front
  p.cyl(0.38, 0.3, 0.05, C.white, { pos: [0.3, CTR_Y + 0.07, 0.75], seg: 12 });
  for (const dz of [-0.1, 0.12]) p.cyl(0.07, 0.08, 0.62, 0xe6a83f, { pos: [0.3, CTR_Y + 0.17, 0.75 + dz], rot: [0, 0.3, Math.PI / 2], seg: 8 }); // ready bajjis
  // gas cylinder + water drum + stool
  p.lathe([[0.001, 0], [0.32, 0], [0.34, 0.1], [0.34, 0.7], [0.3, 0.9], [0.12, 1.0], [0.001, 1.0]], C.bestRed, { pos: [1.85, 0, -0.55], seg: 10 });
  p.cyl(0.06, 0.06, 0.14, C.steelDark, { pos: [1.85, 1.07, -0.55], seg: 6, outline: false });
  p.cyl(0.4, 0.4, 0.95, C.sky, { pos: [-1.8, 0.48, -0.75], seg: 10 }); // water drum
  p.cyl(0.42, 0.42, 0.06, C.blue, { pos: [-1.8, 0.98, -0.75], seg: 10, outline: false });
  p.include(stoolParts(C.yellow), { pos: [0.3, 0, -0.55], scale: 1.0 });
  // lime + chilli charm (nazar utaar) bundle hanging at the left roof corner is added below as swingers
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.1 }), { name: 'vadapav-body' }));

  // ---- the big hand-lettered sign ------------------------------------------------------
  const sign = plaque(ink, 3.3, 1.0, (ctx, w, h) => {
    const r = rng(21);
    boardRect(ctx, 6, 6, w - 12, h - 12, { fill: '#fff0a6', hatch: 'rgba(240,170,60,0.65)', cw: w, ch: h, lw: 7, round: 26, amp: 4, r });
    dotBorder(ctx, w, h, '#2f8a4c', 34, 24);
    drawDosa(ctx, w * 0.13, h * 0.5, h * 0.4, r);
    drawDosa(ctx, w * 0.88, h * 0.5, h * 0.4, r);
    hand(ctx, 'మిర్చి బజ్జీ', w * 0.5, h * 0.55, { size: h * 0.46, fill: '#e2453b', stroke: '#fffaf0', sw: h * 0.09, seed: 12, maxW: w * 0.5 });
    hand(ctx, 'MIRCHI BAJJI', w * 0.5, h * 0.88, { size: h * 0.3, fill: '#2f8a4c', stroke: '#fffaf0', sw: h * 0.06, seed: 4, shadow: 'rgba(43,36,64,0.9)' });
    hand(ctx, '★ వేడి వేడి ★', w * 0.5, h * 0.19, { size: h * 0.16, fill: '#8a4b20', seed: 2, weight: 'normal' });
  }, { ppu: 210, depth: 0.08, thickness: 2.2, frame: 0x2f8a4c });
  const signPivot = new THREE.Group();
  signPivot.position.set(0, 4.25, 1.9);
  sign.position.set(0, -0.5, 0);
  signPivot.add(sign);
  g.add(signPivot);
  fns.push(swing(signPivot, { az: 0.012, f: 1.1 }));
  const rp = new Mix();
    // front panel painting
  const panel = plaque(ink, 3.7, 0.85, (ctx, w, h) => {
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#8fd3c6', hatch: 'rgba(60,140,130,0.6)', cw: w, ch: h, lw: 5, round: 18, r: rng(5) });
    warliBand(ctx, 30, 20, w - 60, h * 0.28, '#fffaf0', null);
    hand(ctx, 'ఉల్లి బజ్జీ · ₹20', w / 2, h * 0.83, { size: h * 0.3, fill: '#fffaf0', stroke: INK, sw: h * 0.05, seed: 3 });
  }, { ppu: 190, depth: 0.05, thickness: 1.8, frame: 0x8fd3c6 });
  panel.position.set(0, 0.62, 1.37);
  g.add(panel);

  // ---- hanging chillies and the lemon-chilli charm -----------------------------------------
  const chilliGeo = (n, seed) => {
    const q = new Mix(); const rr = mulberry32(seed);
    q.tube([0, 0, 0], [0, -0.1 - n * 0.18, 0], 0.012, C.kaali, { seg: 4, outline: false });
    for (let i = 0; i < n; i++) {
      const y = -0.18 - i * 0.18, side = i % 2 ? 1 : -1;
      const red = rr() < 0.25;
      q.curve([[0, y, 0], [side * 0.05, y - 0.15, 0.01], [side * 0.03, y - 0.33, 0]], 0.085, 0.02, red ? C.bestRed : C.green, { radial: 5, steps: 3 });
    }
    return q;
  };
  for (let i = 0; i < 8; i++) {
    const side = i < 4 ? -1 : 1, k = i % 4;
    const x = side * (1.95 + k * 0.1) + (k === 3 ? side * 0.0 : 0);
    const piv = new THREE.Group();
    piv.position.set(0, 4.2, 1.95);
    piv.position.x = side * (1.85 + (k % 2) * 0.3);
    piv.position.z = 1.95 + (k >> 1) * 0.12;
    piv.add(meshOf(ink, chilliGeo(3 + (k % 2), 40 + i), { spacing: 0.05, thickness: 0.9 }));
    g.add(piv);
    void x;
    fns.push(swing(piv, { az: 0.09, ax: 0.05, f: 1.5 + (i % 3) * 0.2, ph: i }));
  }
  // lemon + chilli charm at roof corner
  const charm = new THREE.Group();
  charm.position.set(2.2, 4.3, 1.85);
  const cq = new Mix();
  cq.tube([0, 0, 0], [0, -0.5, 0], 0.012, C.kaali, { seg: 4, outline: false });
  cq.ball(0.13, 0xf3e063, { pos: [0, -0.62, 0], scale: [1, 0.85, 1], w: 7, h: 5 });
  for (let i = 0; i < 5; i++) cq.curve([[0, -0.74, 0], [Math.sin(i * 1.3) * 0.05, -0.9, 0], [Math.sin(i * 1.3) * 0.06, -1.05 - (i % 2) * 0.08, 0]], 0.03, 0.008, i % 2 ? C.green : C.bestRed, { radial: 4, steps: 2 });
  charm.add(meshOf(ink, cq, { spacing: 0.04, thickness: 1.3 }));
  g.add(charm);
  fns.push(swing(charm, { az: 0.12, f: 1.7 }));

  // ---- bubbling vadas in the oil + steam -----------------------------------------------
  const vadas = [];
  const vr = mulberry32(9);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU + 0.4, rad = i < 4 ? 0.42 : 0.1;
    const m = plainMesh(ink, new THREE.CylinderGeometry(0.075, 0.06, 0.62, 6).rotateZ(Math.PI / 2), 0xe6a83f, { spacing: 0.04, thickness: 1.4 });
    m.position.set(KX + Math.cos(a) * rad * (i < 4 ? 1 : 0.4), CTR_Y + 0.94, KZ + Math.sin(a) * rad);
    g.add(m); vadas.push({ m, base: m.position.y, ph: vr() * 6 });
  }
  const bubbles = [];
  for (let i = 0; i < 0; i++) {
    const b = new THREE.Mesh(sphere(0.06, 6, 4), new THREE.MeshBasicMaterial({ color: 0xfff3c4 }));
    b.layers.set(resolveInk(ink).OVERLAY_LAYER);
    g.add(b); bubbles.push({ m: b, x: (vr() - 0.5) * 1.1, z: (vr() - 0.5) * 1.1, ph: vr() });
  }
  fns.push((dt, t) => {
    for (const v of vadas) { v.m.position.y = v.base + Math.sin(t * 2 + v.ph) * 0.012; v.m.rotation.y = v.ph; }
    for (const b of bubbles) {
      const u = (((t * 0.9 + b.ph) % 1) + 1) % 1;
      const rr = Math.hypot(b.x, b.z); const k = rr > 0.72 ? 0.72 / rr : 1;
      b.m.position.set(KX + b.x * k, CTR_Y + 0.99 + u * 0.05, KZ + b.z * k);
      const s = Math.sin(u * Math.PI);
      b.m.scale.setScalar(Math.max(0.001, s));
    }
  });
  const st = steam({ count: 3, height: 0.95, size: 0.9, drift: 0.3 });
  st.position.set(KX, CTR_Y + 1.2, KZ);
  g.add(st);
  fns.push((dt, t) => st.userData.update(t));

  animator(g, fns);
  g.userData.anchors = { vendor: [0, 0, -0.35], customer: [0, 0, 2.7], kadhai: [KX, CTR_Y + 1, KZ] };
  return finish(g, {
    footprint: { w: 4.6, l: 3.6 },
    colliders: [-1.5, -0.5, 0.5, 1.5].map((x) => ({ x, z: 0.55, radius: 0.95, height: 1.4 })),
  });
}

// =====================================================================================================
// Irani cafe (was the chai tapri): Saleem Bhai's, the hero's home base (marble tables, bentwood chairs, a samovar, Osmania biscuit jars)
// =====================================================================================================
function glassCup(p, x, y, z, tea = true) { // a small white china Irani-chai cup on its saucer
  p.cyl(0.15, 0.13, 0.03, 0xf7f4ee, { pos: [x, y + 0.015, z], seg: 9 });
  p.cyl(0.09, 0.065, 0.13, 0xfaf7f0, { pos: [x, y + 0.05, z], seg: 8 });
  p.box(0.06, 0.07, 0.03, 0xfaf7f0, { pos: [x + 0.11, y + 0.1, z], outline: false });
  if (tea) p.cyl(0.082, 0.082, 0.02, 0xb9803c, { pos: [x, y + 0.175, z], seg: 8, outline: false });
}

export function createChaiTapri(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const fns = [];
  const CY = 1.2; // counter top height
  const CZ = -0.85;
  // back wall: corrugated sheets, minty with a faded lower band
  p.paint(corrugated(5.0, 4.0, { waves: 12, amp: 0.06 }), (x, y, z) => (z > 0.9 ? 0x9ac5b8 : 0xb5dccb), { pos: [0, 2.0, -1.9], rot: [Math.PI / 2, 0, 0] });
  // wooden counter on trestles
  p.round(3.7, 0.12, 1.4, C.wood, { pos: [0, CY, CZ], r: 0.04 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) p.box(0.12, 1.15, 0.12, C.woodDark, { pos: [sx * 1.7, 0.6, CZ + sz * 0.6], outline: false });
  p.box(3.6, 0.7, 0.06, C.pink, { pos: [0, 0.75, CZ + 0.68] }); // cloth skirt
  // crates under the counter + milk can + matka
  p.include(crateParts(C.sky), { pos: [-1.0, 0.0, CZ - 0.1], scale: 0.9 });
  p.include(crateParts(C.yellow), { pos: [-1.0, 0.45, CZ - 0.1], scale: 0.9 });
  p.lathe([[0.001, 0], [0.3, 0], [0.34, 0.1], [0.3, 0.75], [0.22, 0.9], [0.1, 0.95], [0.001, 0.95]], C.steel, { pos: [-2.0, 0, CZ - 0.45], seg: 10 });
  p.cyl(0.15, 0.15, 0.1, C.steelDark, { pos: [-2.0, 1.0, CZ - 0.45], seg: 8, outline: false });
  p.lathe([[0.001, 0], [0.25, 0.02], [0.4, 0.3], [0.42, 0.55], [0.3, 0.75], [0.2, 0.85], [0.24, 0.92], [0.001, 0.92]], C.terracotta, { pos: [2.1, 0, 0.2], seg: 10 });
  p.cyl(0.26, 0.26, 0.04, C.cream, { pos: [2.1, 0.94, 0.2], seg: 10, outline: false });
  glassCup(p, 2.1, 0.96, 0.2, false);

  // stove + big kettle (left side of the counter)
  const SX = -1.0, SZ = CZ - 0.1;
  p.cyl(0.46, 0.55, 0.32, C.brass, { pos: [SX, CY + 0.22, SZ], seg: 10 });
  p.cyl(0.3, 0.3, 0.05, 0x3d3748, { pos: [SX, CY + 0.4, SZ], seg: 10, outline: false });
  for (let i = 0; i < 4; i++) p.cone(0.05, 0.14, 0x6fb4ff, { pos: [SX + Math.cos(i * 1.57) * 0.22, CY + 0.38, SZ + Math.sin(i * 1.57) * 0.22], seg: 5, outline: false });
  const KY = CY + 0.42;
  p.lathe([[0.001, 0], [0.42, 0], [0.52, 0.12], [0.55, 0.5], [0.4, 0.78], [0.2, 0.88], [0.001, 0.9]], C.steel, { pos: [SX, KY, SZ], seg: 12 });
  p.cyl(0.14, 0.2, 0.1, C.steelDark, { pos: [SX, KY + 0.92, SZ], seg: 8 });
  p.ball(0.07, C.kaali, { pos: [SX, KY + 1.0, SZ], w: 6, h: 4, outline: false });
  p.curve([[SX + 0.42, KY + 0.15, SZ], [SX + 0.7, KY + 0.35, SZ], [SX + 0.86, KY + 0.75, SZ]], 0.1, 0.04, C.steel, { radial: 6, steps: 5 });
  p.add(new THREE.TorusGeometry(0.46, 0.035, 5, 14, Math.PI), C.kaali, { pos: [SX, KY + 0.62, SZ], rot: [0, Math.PI / 2, 0] });
  // saucepan with the tea strainer
  // a samovar (tall steel urn on a stand, spigot at the front, lid with a knob) for the Irani chai
  p.lathe([[0.001, 0], [0.22, 0], [0.26, 0.12], [0.36, 0.3], [0.38, 0.62], [0.3, 0.92], [0.18, 1.04], [0.22, 1.1], [0.001, 1.12]], C.steel, { pos: [SX + 1.15, CY + 0.02, SZ + 0.1], seg: 10 });
  p.cyl(0.2, 0.12, 0.16, C.steelDark, { pos: [SX + 1.15, CY + 1.14, SZ + 0.1], seg: 10 });
  p.ball(0.06, C.kaali, { pos: [SX + 1.15, CY + 1.32, SZ + 0.1], w: 5, h: 4, outline: false });
  p.tube([SX + 1.15, CY + 0.35, SZ + 0.46], [SX + 1.15, CY + 0.3, SZ + 0.68], 0.035, C.brass, { seg: 5 });
  p.cyl(0.05, 0.05, 0.1, C.kaali, { pos: [SX + 1.15, CY + 0.28, SZ + 0.74], seg: 5, outline: false });
  // tray with Irani chai cups
  p.cyl(0.62, 0.62, 0.05, C.steel, { pos: [0.55, CY + 0.08, CZ + 0.2], seg: 14 });
  for (let i = 0; i < 7; i++) { const a = (i / 7) * TAU; glassCup(p, 0.55 + Math.cos(a) * 0.36, CY + 0.1, CZ + 0.2 + Math.sin(a) * 0.36); }
  glassCup(p, 0.55, CY + 0.1, CZ + 0.2);
  // spare glass rack
  p.round(0.55, 0.06, 0.4, C.woodLight, { pos: [1.5, CY + 0.09, CZ + 0.35], r: 0.02 });
  for (let i = 0; i < 3; i++) glassCup(p, 1.36 + i * 0.14, CY + 0.12, CZ + 0.35, false);
  // Osmania biscuit jars
  const lidCols = [C.bestRed, C.yellow, C.green];
  for (let i = 0; i < 3; i++) {
    const x = 1.2 + i * 0.5, z = CZ - 0.4;
    p.cyl(0.21, 0.21, 0.5, 0xe5f0f2, { pos: [x, CY + 0.31, z], seg: 9 });
    p.cyl(0.19, 0.19, 0.32, 0xe8c88a, { pos: [x, CY + 0.22, z], seg: 9, outline: false }); // biscuits inside
    p.cyl(0.22, 0.22, 0.09, lidCols[i], { pos: [x, CY + 0.6, z], seg: 9 });
    p.ball(0.06, C.steel, { pos: [x, CY + 0.68, z], w: 5, h: 4, outline: false });
  }
  // shelves: tins, a radio with a face, a framed picture, bun-maska tin
  for (const y of [2.05]) p.box(4.0, 0.07, 0.4, C.wood, { pos: [0, y, -1.65] });
  p.round(0.85, 0.5, 0.35, C.maroon, { pos: [-1.55, 2.33, -1.65], r: 0.08 });
  eyes(p, { x: 0.2, y: 2.38, z: -1.46, r: 0.1, flat: 0.5 });
  smile(p, { x: 0, y: 2.22, z: -1.46, R: 0.1, t: 0.02 });
  p.tube([-1.85, 2.58, -1.65], [-2.0, 3.0, -1.65], 0.015, C.steelDark, { seg: 4, outline: false });
  for (let i = 0; i < 3; i++) p.round(0.35, 0.3 + (i % 2) * 0.1, 0.3, [C.bestRed, C.yellow, C.sky][i], { pos: [-0.5 + i * 0.5, 2.25 + (i % 2) * 0.05, -1.65], r: 0.05 });
  p.round(0.8, 0.5, 0.06, C.woodLight, { pos: [1.7, 2.4, -1.78], r: 0.02 }); // photo frame
  p.box(0.62, 0.34, 0.03, 0xf8d5b0, { pos: [1.7, 2.4, -1.73], outline: false });
  // bench in front (left) + stool (right)
  const BX = -1.1, BZ = 1.0;
  p.round(2.5, 0.12, 0.62, 0x9ccbe8, { pos: [BX, 0.78, BZ], r: 0.04 });
  p.round(2.5, 0.07, 0.1, 0x7fb0d6, { pos: [BX, 0.7, BZ + 0.32], r: 0.02, outline: false });
  for (const sx of [-1, 1]) p.round(0.18, 0.72, 0.55, C.woodDark, { pos: [BX + sx * 1.0, 0.36, BZ], r: 0.04 });
  // a marble-top table with two bentwood chairs
  p.cyl(0.52, 0.52, 0.06, 0xf4f1ea, { pos: [1.5, 0.72, 1.25], seg: 14 });
  p.cyl(0.06, 0.12, 0.72, 0x3d3748, { pos: [1.5, 0, 1.25], seg: 6 });
  p.cyl(0.18, 0.18, 0.03, 0xfaf7f0, { pos: [1.45, 0.78, 1.2], seg: 8, outline: false }); // a plate with a bun maska
  p.ball(0.12, 0xd9923f, { pos: [1.45, 0.88, 1.2], scale: [1, 0.7, 1], w: 7, h: 5, outline: false });
  for (const [cx, cz, ry] of [[2.3, 1.25, -1.57], [1.5, 2.0, 3.14]]) {
    p.box(0.42, 0.06, 0.42, C.woodDark, { pos: [cx, 0.45, cz] });
    for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) p.box(0.05, 0.45, 0.05, C.woodDark, { pos: [cx + a * 0.17, 0.22, cz + b * 0.17], outline: false });
    p.box(0.42, 0.5, 0.05, C.woodDark, { pos: [cx + Math.sin(ry) * 0.19, 0.72, cz + Math.cos(ry) * 0.19], rot: [0, ry, 0] });
  }
  // newspaper on the bench
  p.box(0.5, 0.03, 0.38, C.cream, { pos: [BX + 0.4, 0.86, BZ], rot: [0, 0.25, 0], outline: false });
  // home-base corner: rolled sleeping mat, tin trunk, little school bag
  p.cyl(0.16, 0.16, 1.1, C.terracotta, { pos: [-2.15, 0.17, 0.6], rot: [Math.PI / 2, 0, 0.15], seg: 8 });
  p.cyl(0.165, 0.165, 0.06, C.cream, { pos: [-2.15, 0.17, 0.2], rot: [Math.PI / 2, 0, 0.15], seg: 8, outline: false });
  p.round(0.7, 0.45, 0.45, C.sky, { pos: [-2.2, 0.23, 1.5], r: 0.06 });
  p.ball(0.05, C.brass, { pos: [-2.2, 0.28, 1.74], w: 5, h: 4, outline: false });
  p.round(0.42, 0.5, 0.2, C.pink, { pos: [-1.95, 0.25, 2.0], r: 0.1 });

  // bamboo poles + sagging striped tarp
  const PH_F = 4.25, PH_B = 4.95;
  for (const sx of [-1, 1]) { bamboo(p, sx * 2.5, 1.9, PH_F, { r: 0.075 }); bamboo(p, sx * 2.5, -2.0, PH_B, { r: 0.075 }); }
  bamboo(p, 0, -2.0, PH_B - 0.0, { r: 0.065 });
  p.tube([-2.5, PH_F - 0.02, 1.9], [2.5, PH_F - 0.02, 1.9], 0.05, 0xd9c67e, { seg: 5 });
  const sag = 0.22, TW = 5.6, TD = 4.5;
  const tarp = new THREE.BoxGeometry(TW, 0.06, TD, 14, 1, 10);
  const tp = tarp.attributes.position;
  for (let i = 0; i < tp.count; i++) {
    const x = tp.getX(i), z = tp.getZ(i);
    tp.setY(i, tp.getY(i) - sag * (1 - (x / (TW / 2)) ** 2) * (1 - (z / (TD / 2)) ** 2) + Math.sin(x * 1.7 + z * 2.1) * 0.03);
  }
  tarp.computeVertexNormals();
  p.paint(tarp, (x, y, z) => {
    if (x > 0.7 && x < 1.5 && z > -0.9 && z < 0.1) return 0xf4a05a; // an orange patch
    return Math.floor((x + TW / 2) / 0.4) % 2 ? 0xf4f7fb : 0xc2554a;
  }, { pos: [0, 4.65, -0.05], rot: [0.15, 0, 0] });
  // scalloped front flap
  const flap = new THREE.BoxGeometry(TW, 0.34, 0.04, 28, 1, 1);
  const fp = flap.attributes.position;
  for (let i = 0; i < fp.count; i++) if (fp.getY(i) < 0) fp.setY(i, fp.getY(i) - 0.08 * Math.abs(Math.sin(fp.getX(i) * 3.5)));
  flap.computeVertexNormals();
  p.paint(flap, (x) => (Math.floor((x + TW / 2) / 0.4) % 2 ? 0xf4f7fb : 0xc2554a), { pos: [0, 4.34, 2.07], rot: [0.15, 0, 0], outline: false });
  // hanging bulb
  p.tube([-0.2, 4.55, -0.4], [-0.2, 3.35, -0.4], 0.012, C.kaali, { seg: 4, outline: false });
  p.cyl(0.07, 0.07, 0.12, C.steelDark, { pos: [-0.2, 3.3, -0.4], seg: 6, outline: false });
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.1 }), { name: 'chai-body' }));
  const bulb = new THREE.Mesh(sphere(0.12, 8, 6), glowMat(0xfff0a0));
  bulb.position.set(-0.2, 3.18, -0.4);
  bulb.layers.set(resolveInk(ink).OVERLAY_LAYER);
  g.add(bulb);

  // SALEEM BHAI'S IRANI CAFE sign hanging from the tarp
  const sign = plaque(ink, 3.6, 1.1, (ctx, w, h) => {
    const r = rng(31);
    boardRect(ctx, 6, 6, w - 12, h - 12, { fill: '#ffe08a', hatch: 'rgba(240,150,60,0.6)', cw: w, ch: h, lw: 7, round: 30, amp: 4, r });
    dotBorder(ctx, w, h, '#d9453b', 36, 26);
    teaCup(ctx, w * 0.13, h * 0.55, h * 0.36, r);
    // kettle doodle
    drawShape(ctx, [[w * 0.84, h * 0.55], [w * 0.92, h * 0.55], [w * 0.93, h * 0.82], [w * 0.83, h * 0.82]], { fill: '#d6dee4', hatch: 'rgba(90,110,130,0.7)', w, h, r, amp: 1.5, lw: 4 });
    drawShape(ctx, ell(w * 0.88, h * 0.55, w * 0.045, h * 0.07, 8), { fill: '#d6dee4', w, h, r, amp: 1, lw: 4 });
    wobblyLine(ctx, [[w * 0.93, h * 0.64], [w * 0.97, h * 0.58]], { r, lw: 5 });
    hand(ctx, 'SALEEM BHAI', w * 0.53, h * 0.5, { size: h * 0.41, maxW: w * 0.6, fill: '#fffaf0', stroke: '#2b2440', sw: h * 0.085, seed: 5, shadow: '#d9453b' });
    hand(ctx, 'సలీమ్ భాయ్ ఇరానీ కేఫ్', w * 0.54, h * 0.82, { size: h * 0.25, fill: '#d9453b', stroke: '#fffaf0', sw: h * 0.05, seed: 3, maxW: w * 0.6 });
    hand(ctx, '☆ ఇరానీ చాయ్ · IRANI CHAI ₹15 ☆', w * 0.54, h * 0.2, { size: h * 0.14, fill: '#7a4a28', seed: 2, weight: 'normal', maxW: w * 0.6 });
  }, { ppu: 200, depth: 0.08, thickness: 2.2, frame: 0xd9453b });
  const piv = new THREE.Group();
  piv.position.set(0, 4.2, 2.1);
  sign.position.set(0, -0.55, 0);
  piv.add(sign);
  const rp = new Mix();
  for (const x of [-1.4, 1.4]) rp.tube([x, 0, 0], [x * 0.98, -0.05, 0], 0.025, C.kaali, { outline: false });
  g.add(piv);
  fns.push(swing(piv, { az: 0.016, f: 1.2 }));
  // rope sections from tarp to the sign
  const ropes = new Mix();
  for (const x of [-1.5, 1.5]) ropes.tube([x, 4.36, 2.1], [x, 4.2, 2.1], 0.02, 0x7a5a38, { seg: 4, outline: false });
  g.add(meshOf(ink, ropes, { outline: false }));
  // small sandwich board by the counter
  const menu = plaque(ink, 1.1, 0.75, (ctx, w, h) => {
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#2f3a46', hatch: 'rgba(90,110,130,0.7)', cw: w, ch: h, lw: 5, round: 12, r: rng(2) });
    hand(ctx, 'ఇరానీ చాయ్ ₹15', w / 2, h * 0.38, { size: h * 0.2, fill: '#fff6d8', seed: 3, weight: 'normal' });
    hand(ctx, 'బన్ మస్కా ₹30', w / 2, h * 0.64, { size: h * 0.2, fill: '#f6cf5a', seed: 4, weight: 'normal' });
    hand(ctx, 'ఉస్మానియా బిస్కెట్ ₹10', w / 2, h * 0.87, { size: h * 0.15, fill: '#f4a0b8', seed: 6, weight: 'normal' });
  }, { ppu: 170, depth: 0.05, thickness: 1.6, frame: 0xb28a5e });
  menu.position.set(1.55, 0.6, 1.8); menu.rotation.set(-0.12, -0.25, 0);
  g.add(menu);

  // kettle steam
  const stm = steam({ count: 3, height: 1.1, size: 0.7, drift: 0.22 });
  stm.position.set(SX + 0.86, KY + 0.82, SZ);
  g.add(stm);
  fns.push((dt, t) => stm.userData.update(t));
  fns.push((dt, t) => { bulb.position.y = 3.18 + Math.sin(t * 1.3) * 0.015; bulb.position.x = -0.2 + Math.sin(t * 0.9) * 0.02; });
  animator(g, fns);
  g.userData.anchors = { chotu: [0.2, 0, 0.35], uncle: [0, 0, CZ - 0.6], kettle: [SX, KY + 0.9, SZ], bench: [BX, 0.8, BZ], spawn: [0.4, 0, 2.7] };
  return finish(g, {
    footprint: { w: 5.4, l: 4.6 },
    colliders: [
      ...[-1.3, 0, 1.3].map((x) => ({ x, z: CZ, radius: 0.85, height: 1.4 })),
      { x: BX - 0.6, z: BZ, radius: 0.55, height: 0.9 }, { x: BX + 0.6, z: BZ, radius: 0.55, height: 0.9 },
    ],
  });
}

// =====================================================================================================
// Shared cart bits
// =====================================================================================================
function cartWheels(ink, g, { x = 1.15, z = 0.0, R = 0.7 } = {}) {
  for (const sx of [-1, 1]) {
    const w = wheelMesh(ink, R, 0.14, { spokes: 6, tyre: C.woodDark, hub: C.woodLight });
    w.position.set(sx * x, R, z);
    g.add(w);
  }
}
function handleBars(p, { z = 1.5, w = 1.3, y = 0.95 } = {}) {
  for (const sx of [-1, 1]) p.tube([sx * w / 2, y, -0.4], [sx * w / 2, y + 0.12, -1.7], 0.05, C.woodDark, { seg: 5 });
  void z;
}

// =====================================================================================================
// Pani puri stall (was the bhel puri cart)
// =====================================================================================================
export function createBhelCart(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const fns = [];
  // cart body
  p.round(2.4, 0.95, 1.4, C.pink, { pos: [0, 1.1, 0], r: 0.1 });
  p.round(2.55, 0.1, 1.55, C.steel, { pos: [0, 1.62, 0], r: 0.04 });
  p.box(2.4, 0.08, 1.4, C.woodDark, { pos: [0, 0.6, 0], outline: false });
  cartWheels(ink, g, { x: 1.28, z: -0.1, R: 0.72 });
  handleBars(p, { z: 0.3, w: 1.6, y: 0.78 });
  p.cyl(0.05, 0.05, 0.6, C.woodDark, { pos: [-0.9, 0.3, -1.6], seg: 5, outline: false }); // prop leg
  // a terracotta matka of spiced mint water (pani) with a cloth lid + ladle, a glass case of golden puris, and bowls of potato / chickpea / onion / tamarind
  p.lathe([[0.001, 0], [0.3, 0.02], [0.52, 0.3], [0.54, 0.55], [0.38, 0.78], [0.3, 0.9], [0.36, 0.98], [0.001, 0.98]], C.terracotta, { pos: [-0.5, 1.68, 0.0], seg: 12 });
  p.cyl(0.3, 0.3, 0.03, 0x8fcf86, { pos: [-0.5, 2.62, 0.0], seg: 10, outline: false });
  p.tube([-0.5, 2.6, 0.0], [-0.1, 2.35, 0.35], 0.03, C.steelDark, { seg: 5 });
  p.cyl(0.1, 0.1, 0.05, C.steel, { pos: [-0.1, 2.3, 0.37], seg: 7, outline: false });
  p.box(0.95, 0.5, 0.6, 0xdfeff2, { pos: [0.75, 1.9, -0.5], outline: true });
  const rr = mulberry32(14);
  for (let i = 0; i < 14; i++) p.ball(0.11, [0xe9b25a, 0xe2a24a, 0xf0c070][i % 3], { pos: [0.75 + (rr() - 0.5) * 0.7, 1.78 + rr() * 0.28, -0.5 + (rr() - 0.5) * 0.4], w: 6, h: 5, outline: false });
  const cont = (x, z, col, r = 0.22) => {
    p.lathe([[0.001, 0], [r * 0.7, 0], [r, r * 0.7], [0.001, r * 0.7]], C.steel, { pos: [x, 1.68, z], seg: 8 });
    p.cyl(r * 0.85, r * 0.85, 0.03, col, { pos: [x, 1.68 + r * 0.7 + 0.01, z], seg: 8, outline: false });
    p.ball(r * 0.6, col, { pos: [x, 1.68 + r * 0.72, z], scale: [1, 0.5, 1], w: 6, h: 4, outline: false });
  };
  cont(0.55, 0.35, 0xe3b866); cont(0.95, 0.35, 0xd9a24a); cont(0.55, -0.1, 0xb35ac0); cont(0.95, -0.1, 0x8a4b2a);
  // paper cones and plates stack
  for (let i = 0; i < 4; i++) p.cone(0.14, 0.38, C.cream, { pos: [-1.0 + i * 0.13, 1.88, 0.55], rot: [0, 0, 0.2], seg: 7, outline: i % 2 === 0 });
  p.cyl(0.18, 0.18, 0.12, C.white, { pos: [-1.0, 1.72, -0.5], seg: 10 });
  // umbrella
  umbrella(p, { r: 2.0, h: 0.8, pos: [0, 3.85, 0], tilt: [0.0, 0, 0.0], poleH: 3.8, colors: [C.bestRed, C.cream, C.marigold, C.cream], sectors: 12 });
  p.cyl(0.05, 0.05, 1.65, C.steelDark, { pos: [0.05, 2.45, -0.55], seg: 6, outline: false });
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.1 }), { name: 'panipuri-body' }));
  // sign hanging from the umbrella rim
  const sign = plaque(ink, 2.1, 0.62, (ctx, w, h) => {
    const r = rng(8);
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#fff0b6', hatch: 'rgba(240,160,70,0.6)', cw: w, ch: h, lw: 6, round: 20, r });
    dotBorder(ctx, w, h, '#b35ac0', 30, 18);
    handRow(ctx, [{ text: 'పానీ పూరీ', size: h * 0.36, fill: '#d9453b', stroke: '#fffaf0', sw: h * 0.08, seed: 3 }, { text: 'PANI PURI', size: h * 0.2, fill: '#2f8a4c', stroke: '#fffaf0', sw: h * 0.05, seed: 6 }], w / 2, h * 0.68);
  }, { ppu: 180, depth: 0.06, thickness: 1.8, frame: 0xb35ac0 });
  const piv = new THREE.Group();
  piv.position.set(0, 3.45, 1.95);
  sign.position.set(0, -0.3, 0);
  sign.scale.setScalar(0.9);
  piv.add(sign);
  g.add(piv);
  fns.push(swing(piv, { az: 0.02, f: 1.3, ph: 1 }));
  const pr = new Mix();
  for (const x of [-0.8, 0.8]) pr.tube([x, 3.17, 1.7], [x * 1.2, 3.35, 1.4], 0.02, C.kaali, { outline: false });
  g.add(meshOf(ink, pr, { outline: false }));
  animator(g, fns);
  g.userData.anchors = { vendor: [0, 0, -1.0], customer: [0, 0, 1.9] };
  return finish(g, { footprint: { w: 3.0, l: 3.2 }, colliders: [{ x: -0.6, z: 0, radius: 1.0, height: 2 }, { x: 0.7, z: 0, radius: 1.0, height: 2 }] });
}

// =====================================================================================================
// Falooda / kulfi stall (was the gola stall)
// =====================================================================================================
export function createGolaStall(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const fns = [];
  p.round(2.3, 1.0, 1.3, C.pink, { pos: [0, 1.1, 0], r: 0.1 });
  p.round(2.45, 0.1, 1.45, C.steel, { pos: [0, 1.62, 0], r: 0.04 });
  cartWheels(ink, g, { x: 1.22, z: -0.1, R: 0.7 });
  handleBars(p, { z: 0.3, w: 1.5, y: 0.78 });
  // back rack: terracotta kulfi matkas under red cloth caps
  p.round(2.2, 0.08, 0.5, C.woodDark, { pos: [0, 2.15, -0.45], r: 0.03 });
  const nuts = [0xf7e9f0, 0xf4c6d4, 0xfaf1d6, 0xe9d4f2];
  for (let i = 0; i < 6; i++) {
    const x = -0.95 + i * 0.38;
    p.lathe([[0.001, 0], [0.12, 0.01], [0.2, 0.16], [0.2, 0.32], [0.14, 0.44], [0.16, 0.5], [0.001, 0.5]], C.terracotta, { pos: [x, 2.19, -0.45], seg: 8 });
    p.cyl(0.17, 0.17, 0.05, i % 2 ? 0xd9372c : 0xe9a23f, { pos: [x, 2.67, -0.45], seg: 8, outline: false });
  }
  p.tube([-1.05, 1.62, -0.7], [-1.05, 2.15, -0.7], 0.04, C.woodDark, { seg: 5 });
  p.tube([1.05, 1.62, -0.7], [1.05, 2.15, -0.7], 0.04, C.woodDark, { seg: 5 });
  // tubs of falooda sev + rose syrup + basil seeds, and a block of ice
  p.lathe([[0.001, 0], [0.28, 0], [0.34, 0.26], [0.001, 0.26]], C.steel, { pos: [-0.55, 1.68, 0.1], seg: 9 });
  p.cyl(0.28, 0.28, 0.03, 0xf8f1e0, { pos: [-0.55, 1.96, 0.1], seg: 9, outline: false });
  p.lathe([[0.001, 0], [0.22, 0], [0.26, 0.24], [0.001, 0.24]], C.steel, { pos: [-0.05, 1.68, -0.1], seg: 9 });
  p.cyl(0.21, 0.21, 0.03, 0xe84f7a, { pos: [-0.05, 1.94, -0.1], seg: 9, outline: false });
  p.box(0.5, 0.3, 0.4, 0xdff3fa, { pos: [0.5, 1.68, -0.15] });
  // tall falooda glasses (pink / cream layers, a scoop of ice cream on top, a long spoon)
  const cups = [[0.45, 0.55, 0], [0.8, 0.4, 1], [1.05, 0.65, 2]];
  for (const [x, z, k] of cups) {
    p.cyl(0.13, 0.1, 0.46, 0xeef7fa, { pos: [x, 1.7, z], seg: 8 });
    p.cyl(0.115, 0.1, 0.12, 0xe84f7a, { pos: [x, 1.74, z], seg: 8, outline: false });
    p.cyl(0.12, 0.11, 0.1, 0xfaf1d6, { pos: [x, 1.9, z], seg: 8, outline: false });
    p.ball(0.12, nuts[k], { pos: [x, 2.2, z], w: 7, h: 5 });
    p.tube([x + 0.04, 1.95, z], [x + 0.12, 2.5, z], 0.02, C.bestRed, { seg: 4, outline: false });
  }
  // umbrella in rainbow
  umbrella(p, { r: 1.9, h: 0.75, pos: [0, 3.5, 0.05], poleH: 3.4, colors: [0x6fcf7a, 0xfaf6ea, 0x8fc96d, 0xfaf6ea, 0x6fcf7a, 0xf6d343], sectors: 12 });
  p.cyl(0.05, 0.05, 1.9, C.steelDark, { pos: [0, 2.6, -0.65], seg: 6, outline: false });
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.1 }), { name: 'falooda-body' }));
  // sign
  const sign = plaque(ink, 1.9, 0.7, (ctx, w, h) => {
    const r = rng(12);
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#fde4ee', hatch: 'rgba(220,100,140,0.5)', cw: w, ch: h, lw: 6, round: 24, r });
    drawShape(ctx, ell(w * 0.12, h * 0.5, w * 0.075, h * 0.3, 10), { fill: '#f4c6d4', hatch: 'rgba(200,80,120,0.55)', w, h, r, amp: 1.5, lw: 4 });
    wobblyLine(ctx, [[w * 0.12, h * 0.25], [w * 0.16, h * 0.08]], { r, lw: 5, color: '#e2453b' });
    handRow(ctx, [{ text: 'ఫలూదా · కుల్ఫీ', size: h * 0.36, fill: '#c2354a', stroke: '#fffaf0', sw: h * 0.09, seed: 9 }, { text: 'FALOODA · KULFI', size: h * 0.2, fill: '#3b7ad8', stroke: '#fffaf0', sw: h * 0.05, seed: 3 }], w * 0.58, h * 0.62);
    hand(ctx, '₹60', w * 0.62, h * 0.9, { size: h * 0.17, fill: '#6b4a88', seed: 5, weight: 'normal' });
  }, { ppu: 190, depth: 0.06, thickness: 1.8, frame: 0x6fcf7a });
  sign.position.set(0, 3.05, 0.85); sign.rotation.x = -0.08;
  g.add(sign);
  animator(g, fns);
  g.userData.anchors = { vendor: [0, 0, -1.0], customer: [0, 0, 1.9] };
  return finish(g, { footprint: { w: 3.0, l: 3.2 }, colliders: [{ x: -0.6, z: 0, radius: 0.95, height: 2 }, { x: 0.6, z: 0, radius: 0.95, height: 2 }] });
}

// =====================================================================================================
// Fruit cart (mangoes, bananas)
// =====================================================================================================
export function createFruitCart(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const fns = [];
  p.round(3.0, 0.8, 1.4, C.wood, { pos: [0, 1.0, 0], r: 0.08 });
  p.box(3.0, 0.14, 1.4, C.woodDark, { pos: [0, 0.57, 0], outline: false });
  cartWheels(ink, g, { x: 1.55, z: -0.1, R: 0.7 });
  handleBars(p, { z: 0.4, w: 1.7, y: 0.72 });
  // tilted display trays
  for (const z of [0.4, -0.45]) p.round(2.8, 0.08, 0.85, C.woodLight, { pos: [0, 1.5 + (z < 0 ? 0.28 : 0.02), z], rot: [z < 0 ? -0.22 : -0.14, 0, 0], r: 0.03 });
  p.box(2.8, 0.2, 0.06, C.woodDark, { pos: [0, 1.5, 0.84], outline: false });
  const fr = mulberry32(22);
  // mangoes (left half), sweet limes (middle), papaya
  const mg = new THREE.SphereGeometry(0.2, 8, 6);
  for (let i = 0; i < 11; i++) {
    const row = i % 2, x = -1.3 + (i >> 1) * 0.23 + row * 0.1;
    const z = 0.4 + (row ? -0.3 : 0.22) + (fr() - 0.5) * 0.06;
    p.paint(mg, (px, py, pz) => (py + pz * 0.3 > 0.07 ? 0xf6b038 : py > -0.02 ? 0xf08a3c : 0xe9d048), { pos: [x, 1.66 + (row ? -0.0 : 0.0), z], scale: [1.0, 0.82, 1.28], rot: [0, fr() * 3, 0.3], outline: true });
    p.ball(0.04, C.leafDark, { pos: [x, 1.8, z - 0.1], w: 4, h: 3, outline: false });
  }
  for (let i = 0; i < 8; i++) p.ball(0.15, 0xa7d86b, { pos: [0.1 + (i % 4) * 0.3, 1.62 + 0.25 * (i >> 2) * 0.0 + (i >> 2) * 0.28, 0.5 - (i >> 2) * 0.6 + (fr() - 0.5) * 0.1], w: 7, h: 5 });
  // bananas: bunches of 5 curved fingers
  const banana = (cx, cy, cz, rotY) => {
    for (let k = 0; k < 5; k++) {
      const o = (k - 2) * 0.1;
      p.curve([[o, 0, 0], [o * 1.5, 0.18, 0.2], [o * 2.0, 0.28, 0.5]], 0.07, 0.04, 0xf7de58, { radial: 5, steps: 3, pos: [cx, cy, cz], rot: [0, rotY, 0], outline: false });
    }
    p.ball(0.06, C.leafDark, { pos: [cx, cy, cz], w: 4, h: 3, outline: false });
  };
  banana(1.0, 1.62, 0.15, 2.5); banana(1.2, 1.9, -0.5, 3.4); banana(0.5, 1.9, -0.45, 3.0);
  // watermelon + a cut half
  p.paint(new THREE.SphereGeometry(0.34, 10, 7), (x, y, z) => (Math.sin(Math.atan2(z, x) * 7 + y * 3) > 0.1 ? 0x4b9e5e : 0x7bc474), { pos: [-1.2, 1.7, -0.55], scale: [1.2, 1, 1] });
  p.add(new THREE.SphereGeometry(0.3, 8, 5, 0, TAU, 0, Math.PI / 2), 0xef6a74, { pos: [-0.55, 1.9, -0.5], rot: [0.0, 0, Math.PI], scale: [1.15, 0.6, 1] });
  // weighing scale (tarazu): beam, hanging pans and brass weights
  p.tube([1.2, 2.5, 0.6], [1.2, 3.3, 0.6], 0.025, C.kaali, { seg: 4, outline: false });
  // shade: striped canvas awning on two poles
  p.cyl(0.06, 0.07, 2.4, C.woodDark, { pos: [-1.5, 2.2, -0.9], seg: 6 });
  p.cyl(0.06, 0.07, 2.2, C.woodDark, { pos: [1.5, 2.1, -0.9], seg: 6 });
  p.cyl(0.05, 0.05, 1.5, C.woodDark, { pos: [-1.5, 2.1, 1.2], seg: 6, outline: false });
  p.cyl(0.05, 0.05, 1.3, C.woodDark, { pos: [1.5, 2.0, 1.2], seg: 6, outline: false });
  p.paint(new THREE.BoxGeometry(3.6, 0.06, 2.8, 12, 1, 1), (x) => (Math.floor((x + 1.8) / 0.3) % 2 ? C.marigoldY : C.cream), { pos: [0, 3.35, 0.2], rot: [0.16, 0, 0] });
  p.paint(new THREE.BoxGeometry(3.6, 0.3, 0.04, 24, 1, 1), (x) => (Math.floor((x + 1.8) / 0.15) % 2 ? C.marigoldY : C.cream), { pos: [0, 3.05, 1.55], rot: [0.16, 0, 0], outline: false });
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.09 }), { name: 'fruit-body' }));
  // balance on a swinging beam
  const beam = new THREE.Group();
  beam.position.set(1.2, 3.1, 0.6);
  const bp = new Mix();
  bp.tube([-0.5, 0, 0], [0.5, 0, 0], 0.025, C.steelDark, { seg: 4 });
  for (const sx of [-1, 1]) { bp.tube([sx * 0.5, 0, 0], [sx * 0.5, -0.6, 0], 0.012, C.kaali, { seg: 3, outline: false }); bp.cyl(0.22, 0.2, 0.04, C.steel, { pos: [sx * 0.5, -0.64, 0], seg: 9 }); }
  bp.ball(0.1, C.mangoLike ?? 0xf6b038, { pos: [-0.5, -0.55, 0], scale: [1, 0.8, 1.2], w: 6, h: 4 });
  bp.cyl(0.07, 0.09, 0.1, C.brass, { pos: [0.5, -0.57, 0], seg: 6 });
  beam.add(meshOf(ink, bp, { spacing: 0.04, thickness: 1.4 }));
  g.add(beam);
  fns.push((dt, t) => { beam.rotation.z = Math.sin(t * 1.6) * 0.06; });
  // price board
  const sign = plaque(ink, 1.7, 0.7, (ctx, w, h) => {
    const r = rng(41);
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#2f3a46', hatch: 'rgba(90,110,130,0.7)', cw: w, ch: h, lw: 5, round: 14, r });
    hand(ctx, 'మామిడి · MANGO', w / 2, h * 0.36, { size: h * 0.3, fill: '#f6cf5a', seed: 4, weight: 'normal' });
    hand(ctx, 'అరటి · BANANA', w / 2, h * 0.64, { size: h * 0.26, fill: '#fff6d8', seed: 7, weight: 'normal' });
    hand(ctx, 'Rs 80 / kg  ♥', w / 2, h * 0.9, { size: h * 0.2, fill: '#f4a0b8', seed: 2, weight: 'normal' });
  }, { ppu: 170, depth: 0.05, thickness: 1.6, frame: 0xb28a5e });
  sign.position.set(-0.55, 0.86, 0.85); sign.rotation.x = -0.35;
  sign.position.set(-0.4, 1.0, 0.82);
  g.add(sign);
  animator(g, fns);
  g.userData.anchors = { vendor: [0, 0, -1.1], customer: [0, 0, 2.0] };
  return finish(g, { footprint: { w: 3.6, l: 3.4 }, colliders: [{ x: -1, z: 0, radius: 0.95, height: 1.8 }, { x: 0.2, z: 0, radius: 0.95, height: 1.8 }, { x: 1.2, z: 0, radius: 0.95, height: 1.8 }] });
}

// =====================================================================================================
// Marigold flower seller's mat
// =====================================================================================================
export function createMarigoldMat(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const fns = [];
  // woven mat
  p.paint(new THREE.BoxGeometry(3.4, 0.07, 2.3, 12, 1, 1), (x, y, z) => ([C.terracotta, C.cream, C.teal, C.cream][Math.floor((x + 1.7) / 0.283) % 4]), { pos: [0, 0.035, 0], rot: [0, 0.05, 0] });
  const rr = mulberry32(31);
  // mounds of petals / flowers: orange, yellow, rose
  const mound = (cx, cz, col, col2, rad) => {
    p.add(new THREE.IcosahedronGeometry(rad, 1), col, { pos: [cx, 0.1 + rad * 0.15, cz], scale: [1.2, 0.5, 1.0], wonk: 0.04, seed: cx * 9 });
    for (let i = 0; i < 30; i++) {
      const a = rr() * TAU, b = rr() * 1.15;
      const d = [Math.cos(a) * Math.sin(b), Math.cos(b), Math.sin(a) * Math.sin(b)];
      p.add(new THREE.IcosahedronGeometry(0.1 + rr() * 0.06, 0), rr() < 0.55 ? col : col2, { pos: [cx + d[0] * rad * 1.2, 0.1 + rad * 0.15 + d[1] * rad * 0.5, cz + d[2] * rad], outline: true });
    }
  };
  mound(-1.05, 0.15, 0xfaf6ea, 0xf3efe0, 0.6); // mogra (jasmine)
  mound(0.1, 0.55, 0xfaf6ea, 0xe9f2d8, 0.5);
  mound(1.1, 0.0, C.rose, 0xf7b3c6, 0.5);
  // wicker basket of rose petals
  p.lathe([[0.001, 0], [0.32, 0], [0.45, 0.5], [0.5, 0.55], [0.001, 0.55]], C.woodLight, { pos: [0.45, 0.07, -0.65], seg: 10 });
  p.add(new THREE.SphereGeometry(0.46, 9, 5, 0, TAU, 0, Math.PI / 2), 0xf08aa6, { pos: [0.45, 0.58, -0.65], scale: [1, 0.45, 1] });
  // little brass plate with a diya and a leaf bowl
  p.cyl(0.28, 0.28, 0.04, C.brass, { pos: [-0.55, 0.1, -0.7], seg: 12 });
  p.cyl(0.08, 0.06, 0.07, C.terracotta, { pos: [-0.55, 0.16, -0.7], seg: 6 });
  p.cone(0.04, 0.12, 0xffd24a, { pos: [-0.55, 0.28, -0.7], seg: 5, outline: false });
  // frame with hanging garlands
  p.cyl(0.05, 0.06, 2.6, C.woodDark, { pos: [-1.55, 1.3, -0.95], seg: 6 });
  p.cyl(0.05, 0.06, 2.6, C.woodDark, { pos: [1.55, 1.3, -0.95], seg: 6 });
  p.tube([-1.55, 2.5, -0.95], [1.55, 2.5, -0.95], 0.05, C.woodDark, { seg: 5 });
  // bench seat / stool for the seller
  p.include(stoolParts(C.sky), { pos: [0.1, 0.0, -1.05] });
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.07, thickness: 2 }), { name: 'marigold-body' }));
  // garlands (swaying strands of beads)
  const strands = [];
  for (let i = 0; i < 7; i++) {
    const piv = new THREE.Group();
    piv.position.set(-1.35 + i * 0.45, 2.5, -0.95);
    const q = new Mix();
    const n = 9 + (i % 3) * 2;
    for (let k = 0; k < n; k++) {
      const col = i % 3 === 0 ? (k % 5 === 4 ? 0x86c97c : 0xfaf6ea) : i % 3 === 1 ? (k % 2 ? 0xfaf6ea : 0xf3efe0) : (k % 4 === 3 ? 0xf08aa6 : C.marigoldY);
      q.add(new THREE.IcosahedronGeometry(0.1, 0), col, { pos: [Math.sin(k * 1.9) * 0.02, -0.12 - k * 0.17, Math.cos(k * 1.9) * 0.02], scale: [1.1, 1.1, 1.1], outline: k % 2 === 0 });
    }
    q.tube([0, 0, 0], [0, -0.12 - n * 0.17, 0], 0.012, C.kaali, { seg: 3, outline: false });
    piv.add(meshOf(ink, q, { spacing: 0.04, thickness: 1.2 }));
    g.add(piv);
    strands.push(piv);
    fns.push(swing(piv, { az: 0.06, ax: 0.04, f: 1.3 + i * 0.1, ph: i * 1.3 }));
  }
  // sign
  const sign = plaque(ink, 1.5, 0.55, (ctx, w, h) => {
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#ffe9b3', hatch: 'rgba(240,160,60,0.6)', cw: w, ch: h, lw: 5, round: 20, r: rng(9) });
    handRow(ctx, [{ text: 'బంతి', size: h * 0.5, fill: '#e08a1f', stroke: '#fffaf0', sw: h * 0.08, seed: 3 }, { text: 'MARIGOLD', size: h * 0.28, fill: '#c2427a', stroke: '#fffaf0', sw: h * 0.06, seed: 4 }], w / 2, h * 0.72);
  }, { ppu: 180, depth: 0.05, thickness: 1.6, frame: 0xf6a634 });
  sign.position.set(0, 0.35, 1.25); sign.rotation.x = -0.9;
  g.add(sign);
  animator(g, fns);
  g.userData.anchors = { seller: [0.1, 0.4, -1.05] };
  return finish(g, { footprint: { w: 3.5, l: 2.6 }, colliders: [] });
}

// =====================================================================================================
// Paan stall counter
// =====================================================================================================
export function createPaanStall(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const fns = [];
  // kiosk box: counter, side walls, back wall with shelves
  p.round(2.6, 1.3, 1.1, C.pistachio, { pos: [0, 0.7, 0.35], r: 0.08 });
  p.round(2.8, 0.1, 1.3, C.wood, { pos: [0, 1.4, 0.35], r: 0.04 });
  for (const sx of [-1, 1]) p.round(0.12, 2.9, 1.2, C.pistachio, { pos: [sx * 1.3, 1.5, -0.35], r: 0.04 });
  p.round(2.7, 3.0, 0.1, C.pistachio, { pos: [0, 1.55, -0.95], r: 0.04 });
  for (const y of [1.95, 2.45, 2.95]) p.box(2.5, 0.05, 0.4, C.woodLight, { pos: [0, y, -0.78] });
  // jars of colourful mouth fresheners (saunf, supari...) and the brass kalas
  const jc = [C.bestRed, C.green, C.marigoldY, C.pink, C.sky, C.lilac, C.orange];
  for (const y of [1.97, 2.47, 2.97]) for (let i = 0; i < 5; i++) {
    const x = -1.0 + i * 0.5;
    p.cyl(0.14, 0.14, 0.3, 0xe9f4f5, { pos: [x, y + 0.18, -0.78], seg: 7 });
    p.cyl(0.115, 0.115, 0.22, jc[(i * 2 + y * 3 | 0) % jc.length], { pos: [x, y + 0.15, -0.78], seg: 7, outline: false });
    p.cyl(0.15, 0.15, 0.06, C.steel, { pos: [x, y + 0.36, -0.78], seg: 7, outline: false });
  }
  // betel leaf bundle (green, on a steel tray)
  p.cyl(0.55, 0.55, 0.05, C.steel, { pos: [-0.65, 1.48, 0.55], seg: 12 });
  const lr = mulberry32(8);
  for (let i = 0; i < 10; i++) {
    const a = lr() * TAU;
    p.ball(0.2, i % 3 ? 0x67b96a : 0x86c97c, { pos: [-0.65 + Math.cos(a) * 0.22, 1.54 + i * 0.012, 0.55 + Math.sin(a) * 0.22], scale: [1.0, 0.1, 0.75], rot: [0, a, 0], w: 7, h: 4, outline: i % 3 === 0 });
  }
  // lime tub + small bowls + folded paan
  p.lathe([[0.001, 0], [0.2, 0], [0.26, 0.2], [0.001, 0.2]], C.terracotta, { pos: [0.2, 1.45, 0.6], seg: 8 });
  p.cyl(0.2, 0.2, 0.03, 0xfafafa, { pos: [0.2, 1.66, 0.6], seg: 8, outline: false });
  p.cyl(0.18, 0.18, 0.2, C.bestRed, { pos: [0.7, 1.55, 0.55], seg: 8 });
  for (let i = 0; i < 3; i++) p.add(new THREE.ConeGeometry(0.09, 0.2, 3), 0x7cc46a, { pos: [0.6 + i * 0.15, 1.52, 0.9], rot: [Math.PI / 2, 0, i * 0.5], outline: false });
  // framed picture + round mirror
  p.cyl(0.4, 0.4, 0.05, 0xdfeaf0, { pos: [-0.6, 2.2, -0.88], rot: [Math.PI / 2, 0, 0], seg: 14 });
  p.add(new THREE.TorusGeometry(0.4, 0.05, 5, 14), C.bestRed, { pos: [-0.6, 2.2, -0.86], outline: false });
  // red-white striped awning
  p.paint(new THREE.BoxGeometry(3.2, 0.07, 1.9, 16, 1, 1), (x) => (Math.floor((x + 1.6) / 0.2) % 2 ? C.bestRed : C.cream), { pos: [0, 3.35, 0.4], rot: [0.2, 0, 0] });
  p.paint(new THREE.BoxGeometry(3.2, 0.26, 0.04, 16, 1, 1), (x) => (Math.floor((x + 1.6) / 0.2) % 2 ? C.bestRed : C.cream), { pos: [0, 3.15, 1.28], rot: [0.2, 0, 0], outline: false });
  // banana bunch hanging
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.09 }), { name: 'paan-body' }));
  const bunch = new THREE.Group();
  bunch.position.set(1.0, 3.0, 1.1);
  const q = new Mix();
  q.tube([0, 0, 0], [0, -0.4, 0], 0.015, C.kaali, { seg: 3, outline: false });
  for (let k = 0; k < 6; k++) q.curve([[0, -0.4, 0], [Math.sin(k * 1.1) * 0.15, -0.65, Math.cos(k * 1.1) * 0.1], [Math.sin(k * 1.1) * 0.12, -1.0, Math.cos(k * 1.1) * 0.08]], 0.06, 0.03, 0xf7de58, { radial: 5, steps: 3, outline: false });
  bunch.add(meshOf(ink, q, { spacing: 0.04, thickness: 1.3 }));
  g.add(bunch);
  fns.push(swing(bunch, { az: 0.06, f: 1.6 }));
  // sign: betel leaf doodle
  const sign = plaque(ink, 1.6, 0.6, (ctx, w, h) => {
    const r = rng(15);
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#cdeab8', hatch: 'rgba(80,160,90,0.55)', cw: w, ch: h, lw: 6, round: 22, r });
    // heart-shaped betel leaf
    drawShape(ctx, [[w * 0.14, h * 0.2], [w * 0.2, h * 0.34], [w * 0.14, h * 0.8], [w * 0.08, h * 0.34]], { fill: '#6fbf73', hatch: 'rgba(30,110,50,0.65)', w, h, r, amp: 1.5, lw: 4 });
    handRow(ctx, [{ text: 'పాన్', size: h * 0.5, fill: '#c2354a', stroke: '#fffaf0', sw: h * 0.1, seed: 3 }, { text: 'PAAN', size: h * 0.34, fill: '#2f7a46', stroke: '#fffaf0', sw: h * 0.06, seed: 5 }], w * 0.58, h * 0.72);
  }, { ppu: 180, depth: 0.06, thickness: 1.8, frame: 0xc2354a });
  sign.position.set(0, 2.78, 1.1); sign.rotation.x = -0.15;
  // hang the sign under the awning from two cords
  const cords = new Mix();
  for (const x of [-0.65, 0.65]) cords.tube([x, 3.1, 1.2], [x, 3.0, 1.1], 0.015, C.kaali, { outline: false });
  g.add(sign);
  animator(g, fns);
  g.userData.anchors = { vendor: [0, 0, -0.35], customer: [0, 0, 1.9] };
  return finish(g, { footprint: { w: 3.0, l: 2.2 }, colliders: [-0.8, 0.8].map((x) => ({ x, z: 0.35, radius: 0.85, height: 1.6 })) });
}

// =====================================================================================================
// Newspaper stand
// =====================================================================================================
export function createNewspaperStand(ink, opts = {}) {
  const g = new THREE.Group();
  const p = new Mix();
  const fns = [];
  // table and stacks of papers
  p.round(2.8, 0.12, 1.1, C.wood, { pos: [0, 1.15, 0.35], r: 0.04 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) p.box(0.1, 1.1, 0.1, C.woodDark, { pos: [sx * 1.25, 0.57, 0.35 + sz * 0.45], outline: false });
  p.box(2.7, 0.55, 0.06, C.terracotta, { pos: [0, 0.8, 0.85], outline: false });
  const pr = mulberry32(12);
  const stack = (x, z, h, rot) => {
    p.paint(new THREE.BoxGeometry(0.85, h, 0.6, 1, 6, 1), (px, py) => (Math.floor((py + h / 2) / 0.04) % 2 ? 0xf8f3e3 : 0xdcd7c6), { pos: [x, 1.21 + h / 2, z], rot: [0, rot, 0] });
    p.box(0.88, 0.02, 0.05, C.bestRed, { pos: [x, 1.21 + h * 0.5, z], rot: [0, rot, 0], outline: false });
  };
  stack(-0.9, 0.35, 0.34, 0.1); stack(0.0, 0.5, 0.22, -0.15); stack(0.95, 0.3, 0.42, 0.2);
  p.ball(0.12, C.bestRed, { pos: [0.0, 1.45, 0.5], scale: [1, 0.5, 1], w: 6, h: 4, outline: false }); // paperweight
  p.include(stoolParts(C.green), { pos: [1.6, 0, -0.5] });
  // back rack frame + tin roof
  for (const x of [-1.5, 1.5]) { p.cyl(0.07, 0.08, 3.6, C.woodDark, { pos: [x, 1.8, -0.65], seg: 6 }); p.cyl(0.07, 0.08, 3.2, C.woodDark, { pos: [x, 1.6, 1.0], seg: 6 }); }
  p.paint(corrugated(3.6, 2.9, { waves: 9, amp: 0.06 }), (x) => (Math.sin(x * 7.3) > 0.2 ? 0xc3d1d9 : 0xe39b86), { pos: [0, 3.5, 0.2], rot: [0.12, 0, 0] });
  p.round(3.0, 2.0, 0.08, C.woodLight, { pos: [0, 2.25, -0.8], r: 0.03 });
  // clothesline of clipped papers rope
  p.tube([-1.5, 3.0, 0.9], [1.5, 3.0, 0.9], 0.015, C.kaali, { seg: 3, outline: false });
  g.add(Object.assign(meshOf(ink, p, { spacing: 0.09 }), { name: 'news-body' }));
  // magazine wall painting
  const wall = plaque(ink, 2.9, 1.9, (ctx, w, h) => {
    const r = rng(77);
    ctx.fillStyle = '#f7ecd0'; ctx.fillRect(0, 0, w, h);
    const covers = ['#f0527a', '#4fc1d6', '#f6d343', '#6fcf7a', '#a86be0', '#f68a3c', '#6b8de8', '#ef7bc8'];
    const cw = w / 4.3, chh = h / 2.35;
    for (let row = 0; row < 2; row++) for (let i = 0; i < 4; i++) {
      const x = w * 0.04 + i * (cw + w * 0.025), y = h * 0.1 + row * (chh + h * 0.06);
      drawShape(ctx, [[x, y], [x + cw, y], [x + cw, y + chh], [x, y + chh]], { fill: covers[(row * 4 + i) % 8], hatch: 'rgba(40,30,70,0.35)', w, h, r, amp: 2, lw: 3.4 });
      // headline scribbles and a face
      ctx.fillStyle = '#fffaf0'; ctx.fillRect(x + cw * 0.1, y + chh * 0.07, cw * 0.8, chh * 0.1);
      wobblyLine(ctx, [[x + cw * 0.12, y + chh * 0.78], [x + cw * 0.88, y + chh * 0.8]], { r, lw: 3, amp: 1 });
      wobblyLine(ctx, [[x + cw * 0.12, y + chh * 0.88], [x + cw * 0.7, y + chh * 0.9]], { r, lw: 3, amp: 1 });
      drawShape(ctx, ell(x + cw / 2, y + chh * 0.45, cw * 0.2, chh * 0.2, 9), { fill: ['#e9b58f', '#c98a62', '#f1c9a5'][(i + row) % 3], w, h, r, amp: 1, lw: 3 });
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x + cw * 0.42, y + chh * 0.43, 2.4, 0, TAU); ctx.arc(x + cw * 0.58, y + chh * 0.43, 2.4, 0, TAU); ctx.fill();
    }
    hand(ctx, 'నేటి పత్రిక · TODAY\'S PAPER', w / 2, h * 0.075, { size: h * 0.075, fill: INK, seed: 7 });
  }, { ppu: 150, depth: 0.05, thickness: 1.6, frame: 0xf7ecd0 });
  wall.position.set(0, 2.25, -0.74);
  g.add(wall);
  // swaying hanging papers
  for (let i = 0; i < 6; i++) {
    const piv = new THREE.Group();
    piv.position.set(-1.2 + i * 0.48, 3.0, 0.9);
    const q = new Mix();
    q.paint(new THREE.BoxGeometry(0.34, 0.62, 0.03, 1, 6, 1), (x, y) => (Math.floor(y / 0.09) % 2 ? 0xf8f3e3 : 0xe0d9c4), { pos: [0, -0.34, 0] });
    q.box(0.1, 0.06, 0.07, C.bestRed, { pos: [0, -0.02, 0], outline: false });
    piv.add(meshOf(ink, q, { spacing: 0.04, thickness: 1.3 }));
    g.add(piv);
    fns.push(swing(piv, { az: 0.08, ax: 0.05, f: 1.5 + i * 0.1, ph: i * 1.7 }));
  }
  // sign
  const sign = plaque(ink, 2.0, 0.6, (ctx, w, h) => {
    boardRect(ctx, 5, 5, w - 10, h - 10, { fill: '#e8f0ff', hatch: 'rgba(100,130,210,0.5)', cw: w, ch: h, lw: 5, round: 18, r: rng(3) });
    handRow(ctx, [{ text: 'వార్తలు', size: h * 0.5, fill: '#2f4fa8', stroke: '#fffaf0', sw: h * 0.08, seed: 3 }, { text: 'NEWS', size: h * 0.4, fill: '#d9453b', stroke: '#fffaf0', sw: h * 0.07, seed: 6 }], w / 2, h * 0.72);
  }, { ppu: 180, depth: 0.06, thickness: 1.8, frame: 0x2f4fa8 });
  sign.position.set(0, 3.05, 1.45); sign.rotation.x = -0.12;
  g.add(sign);
  animator(g, fns);
  g.userData.anchors = { vendor: [0, 0, -0.3], customer: [0, 0, 1.8] };
  return finish(g, { footprint: { w: 3.2, l: 2.8 }, colliders: [-0.8, 0.8].map((x) => ({ x, z: 0.35, radius: 0.85, height: 1.5 })) });
}

// =====================================================================================================
// Balloon seller's bunch (bobbing)
// =====================================================================================================
export function createBalloonBunch(ink, opts = {}) {
  const g = new THREE.Group();
  const fns = [];
  const base = new Mix();
  // the seller's stick / pole held in the hand, with a little carved top
  base.cyl(0.04, 0.05, 1.9, C.woodLight, { pos: [0, 0.95, 0], seg: 5 });
  base.ball(0.08, C.bestRed, { pos: [0, 1.95, 0], w: 6, h: 4 });
  g.add(meshOf(ink, base, { spacing: 0.05, thickness: 1.5 }));
  const hub = new THREE.Group();
  hub.position.set(0, 1.95, 0);
  g.add(hub);
  const cols = [0xf0527a, 0xf6d343, 0x4fc1d6, 0x6fcf7a, 0xa86be0, 0xf68a3c, 0xef7bc8, 0x6b8de8, 0xf0527a, 0xf6d343, 0x6fcf7a, 0x4fc1d6];
  const rr = mulberry32(opts.seed ?? 6);
  const balloons = [];
  cols.forEach((c, i) => {
    const piv = new THREE.Group();
    const a = (i / cols.length) * TAU + rr() * 0.4, tilt = 0.25 + rr() * 0.4, len = 1.5 + rr() * 1.3;
    const dx = Math.sin(tilt) * Math.cos(a), dz = Math.sin(tilt) * Math.sin(a), dy = Math.cos(tilt);
    const q = new Mix();
    q.tube([0, 0, 0], [dx * len, dy * len, dz * len], 0.012, 0xfaf3df, { seg: 3, outline: false });
    const bx = dx * (len + 0.5), by = dy * (len + 0.5), bz = dz * (len + 0.5);
    q.ball(0.5, c, { pos: [bx, by, bz], scale: [1, 1.22, 1], w: 9, h: 7 });
    q.cone(0.08, 0.14, c, { pos: [dx * (len - 0.15), dy * (len - 0.1), dz * (len - 0.15)], rot: [Math.PI, 0, 0], seg: 5, outline: false });
    q.ball(0.1, 0xffffff, { pos: [bx - 0.15, by + 0.3, bz + 0.1], scale: [0.6, 1, 0.5], w: 5, h: 4, outline: false }); // shine
    if (i % 4 === 0) { // a few smiley balloons
      for (const sx of [-1, 1]) q.ball(0.04, INKC, { pos: [bx + sx * 0.14, by + 0.04, bz + 0.46], w: 4, h: 3, outline: false });
      q.add(new THREE.TorusGeometry(0.08, 0.016, 4, 8, Math.PI), INKC, { pos: [bx, by - 0.04, bz + 0.47], rot: [0, 0, Math.PI], outline: false });
    }
    piv.add(meshOf(ink, q, { spacing: 0.06, thickness: 1.7 }));
    hub.add(piv);
    balloons.push({ piv, ph: rr() * 6, f: 1.0 + rr() * 0.8 });
  });
  fns.push((dt, t) => {
    hub.rotation.z = Math.sin(t * 0.9) * 0.05; hub.rotation.x = Math.sin(t * 0.7 + 1) * 0.04;
    hub.position.y = 1.95 + Math.sin(t * 1.6) * 0.04;
    for (const b of balloons) { b.piv.rotation.z = Math.sin(t * b.f + b.ph) * 0.07; b.piv.rotation.x = Math.sin(t * b.f * 0.8 + b.ph + 2) * 0.07; }
  });
  animator(g, fns);
  g.userData.anchors = { hand: [0, 1.0, 0] };
  return finish(g, { footprint: { w: 1.2, l: 1.2 }, colliders: [] });
}

// Street-life shops: old-Bengaluru tiffin room (MTR-style 'upahara mandira'), paan/beeda shop, Kannada film poster wall (invented
// titles, no real people), roadside South Indian temple with a gopura and a Nandi.
// All local frames: front +Z, base y=0.
import * as THREE from 'three';
import { Kit, PAL, rectPts, makeCanvas, handRng, INK, wobblyLine, drawShape, paintBoard, paintLive, inkText, knText, latin, lineColliders, polyShape, mulberry32, bilingualBoard } from './kit.js';

// ---------------------------------------------------------------- Irani cafe
export function createIraniCafe(ink) {
  const k = new Kit(ink, { hatch: 0.13, seed: 401 });
  const W = 6.6, D = 5.0, H = 6.2;
  const WALL = 0xf1dfae, TRIM = 0xfbf3df, MAROON = 0x9c3d4a;
  k.base(W + 1.2, D + 3.4, { color: PAL.stone });
  k.box(WALL, W, H, D, 0, 0, 0);
  k.box(MAROON, W + 0.12, 0.5, D + 0.12, 0, 0, 0);
  k.box(TRIM, W + 0.4, 0.3, D + 0.4, 0, H, 0);
  { // Mangalore-tile gable roof, ridge along x
    const half = D / 2 + 0.5, rh = 1.3;
    k.extrude(PAL.tile, polyShape([[-half, 0], [half, 0], [0, rh]]), W + 0.6, 0, H + 0.3, 0, { ry: Math.PI / 2 });
    k.box(PAL.tileDark, W + 0.8, 0.14, 0.3, 0, H + 0.3 + rh - 0.04, 0);
    const a = Math.atan2(rh, half);
    for (const sz of [-1, 1]) for (let i = 1; i <= 3; i++) k.box(PAL.tileDark, W + 0.64, 0.05, 0.1, 0, H + 0.3 + rh * (1 - i / 4) + 0.04, sz * half * (i / 4), { rx: sz * a, outline: false });
  }
  k.box(PAL.brick, 0.6, 1.2, 0.6, -2.2, H, -1.4);
  const f = k.face(0, 0, D / 2, 0);
  // big arched cafe windows with glowing interior
  for (const u of [-2.0, 2.0]) {
    f.window(u, 0.5, 1.7, 2.1, { glass: 0xf3d58f, frame: TRIM, bars: 1, sill: true });
    f.box(MAROON, u, 0.4, 1.9, 0.12, 0.2, 0);
  }
  f.window(0, 0.4, 1.0, 2.0, { glass: 0x6b3b2a, frame: TRIM, bars: 1, sill: false }); // door
  // upper floor: shuttered windows + wrought-iron balcony
  for (const u of [-2.0, 0, 2.0]) {
    f.window(u, 4.45, 0.8, 1.3, { glass: 0x55728c, frame: TRIM, bars: 1 });
    f.box(0x3f7f6a, u - 0.62, 4.45, 0.38, 1.3, 0.05, 0.02);
    f.box(0x3f7f6a, u + 0.62, 4.45, 0.38, 1.3, 0.05, 0.02);
    f.box(PAL.ink, u, 4.2, 1.5, 0.05, 0.05, 0.5);
    f.box(PAL.ink, u, 4.7, 1.5, 0.05, 0.05, 0.5);
    for (let i = -3; i <= 3; i++) f.box(PAL.ink, u + i * 0.23, 4.2, 0.03, 0.5, 0.03, 0.5);
    f.box(TRIM, u, 4.05, 1.7, 0.12, 0.6, 0);
  }
  // striped awning
  for (let i = 0; i < 10; i++) {
    const w = (W - 0.2) / 10;
    k.add(new THREE.BoxGeometry(w, 0.06, 1.4), i % 2 ? 0xfaf2de : 0x3f7f6a, { pos: [-W / 2 + 0.1 + (i + 0.5) * w, 2.75, D / 2 + 0.65], rot: [0.38, 0, 0] });
  }
  // pavement: chequered floor tiles
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) k.box((i + j) % 2 ? 0xf2ead6 : 0x6a5f7a, 0.8, 0.04, 0.8, -2.0 + i * 0.8, 0, D / 2 + 0.6 + j * 0.8, { outline: false });
  // table + bentwood chairs
  const table = (x, z) => {
    k.cyl(0xf6efe0, 0.5, 0.5, 0.07, x, 0.72, z, { seg: 10 });
    k.cyl(PAL.ink, 0.05, 0.1, 0.72, x, 0, z, { seg: 5 });
    for (const [dx, dz, ry] of [[-0.85, 0, 1.57], [0.85, 0, -1.57], [0, 0.85, 3.14]]) {
      const cx = x + dx, cz = z + dz;
      k.box(PAL.woodDark, 0.45, 0.07, 0.45, cx, 0.45, cz);
      for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box(PAL.woodDark, 0.05, 0.45, 0.05, cx + a * 0.18, 0, cz + b * 0.18, { outline: false });
      k.box(PAL.woodDark, 0.45, 0.5, 0.05, cx + Math.sin(ry) * 0.2, 0.52, cz + Math.cos(ry) * 0.2 - (dz === 0 ? 0 : 0), { ry });
    }
  };
  table(-1.6, D / 2 + 1.9); table(1.8, D / 2 + 1.9);
  // signboard
  const sign = paintBoard(5.4, 1.15, '#f7ecc8', '#e0c46a', (ctx, Wd, Hh) => {
    knText(ctx, 'ಉಪಾಹಾರ ಮಂದಿರ', Wd * 0.5, Hh * 0.56, Hh * 0.5, { color: '#9c3d4a' });
    latin(ctx, 'UPAHARA MANDIRA  ·  TIFFIN ROOM', Wd * 0.5, Hh * 0.86, Hh * 0.17, { color: '#2b2440' });
    knText(ctx, 'ಕಾಫಿ ತಿಂಡಿ', Wd * 0.14, Hh * 0.2, Hh * 0.22, { color: '#2b2440' });
    latin(ctx, 'COFFEE', Wd * 0.88, Hh * 0.2, Hh * 0.2, { color: '#2b2440' });
  }, { seed: 5 });
  k.box(MAROON, 5.6, 1.15, 0.14, 0, 3.0, D / 2 + 0.07);
  k.plane(sign, 5.4, 1.06, [0, 3.58, D / 2 + 0.2], 0);
  void f;
  const g = k.finish({ lean: 0.008 });
  g.name = 'tiffinRoom';
  g.userData = {
    footprint: 5.2, height: H + 1.5, size: [W, D + 3, H],
    colliders: [...lineColliders(-W / 2 + 1.5, 0, W / 2 - 1.5, 0, 2.5, H, 2.2), { x: -1.6, z: D / 2 + 1.9, radius: 0.6, height: 0.8 }, { x: 1.8, z: D / 2 + 1.9, radius: 0.6, height: 0.8 }],
  };
  return g;
}

// ---------------------------------------------------------------- paan shop
export function createPaanShop(ink) {
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 411 });
  const W = 2.8, D = 2.0, H = 3.0, GRN = 0x8fcf84, WOOD = 0xc89a6a;
  k.base(W + 0.8, D + 1.4, { color: PAL.stone });
  k.box(GRN, W, 0.2, D, 0, 0, 0); // floor/base
  // frame: posts, counter, back wall, roof
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(WOOD, 0.14, H - 0.4, 0.14, sx * (W / 2 - 0.07), 0.2, sz * (D / 2 - 0.07));
  k.box(0xf0e0a6, W, H - 0.8, 0.1, 0, 0.5, -D / 2 + 0.05); // back
  for (const sx of [-1, 1]) k.box(0xf0e0a6, 0.1, H - 0.8, D, sx * (W / 2 - 0.05), 0.5, 0);
  k.box(GRN, W + 0.2, 1.0, 0.18, 0, 0.2, D / 2 - 0.1); // front counter body
  k.box(WOOD, W + 0.3, 0.1, 0.5, 0, 1.15, D / 2 + 0.08); // counter top
  k.box(PAL.tile, W + 0.5, 0.14, D + 0.6, 0, H - 0.2, 0, {}); // roof slab
  k.add(new THREE.BoxGeometry(W + 0.6, 0.1, 0.9), PAL.tileDark, { pos: [0, H - 0.28, D / 2 + 0.55], rot: [0.3, 0, 0] });
  // shelves with colourful packets/jars
  const cols = [0xe84f6b, 0xf2b33f, 0x4ea6d8, 0x7ac28b, 0xb58be0, 0xf08a4b, 0xfaf6ea];
  const r = mulberry32(412);
  for (let row = 0; row < 3; row++) {
    k.box(WOOD, W - 0.2, 0.05, 0.4, 0, 1.45 + row * 0.5, -D / 2 + 0.3);
    for (let i = 0; i < 7; i++) k.box(cols[Math.floor(r() * cols.length)], 0.22, 0.28 + r() * 0.1, 0.14, -W / 2 + 0.3 + i * 0.37, 1.5 + row * 0.5, -D / 2 + 0.3, { outline: false });
  }
  // jars on the counter + leaf trays
  for (const x of [-0.9, -0.5]) k.cyl(0xe8e0cc, 0.13, 0.13, 0.28, x, 1.25, D / 2 + 0.1, { seg: 7 });
  k.cyl(PAL.leaf, 0.3, 0.3, 0.06, 0.4, 1.25, D / 2 + 0.1, { seg: 8 });
  k.cyl(PAL.leaf, 0.2, 0.2, 0.06, 0.95, 1.25, D / 2 + 0.1, { seg: 8 });
  // hanging garlands: lemon-chilli strings + banana bunch
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 6; i++) { k.ball(i % 2 ? 0xf6e45a : 0xd9503f, 0.07, sx * (W / 2 - 0.3), H - 0.35 - i * 0.14, D / 2 + 0.25, { seg: 5, ring: 4, outline: false }); }
    k.cyl(PAL.ink, 0.01, 0.01, 0.9, sx * (W / 2 - 0.3), H - 1.2, D / 2 + 0.25, { seg: 3, outline: false });
  }
  for (let i = 0; i < 5; i++) k.add(new THREE.CylinderGeometry(0.04, 0.07, 0.4, 5), 0xf6e45a, { pos: [-0.2 + i * 0.09, H - 0.6, D / 2 + 0.3], rot: [0.2, 0, (i - 2) * 0.1] });
  // mirror + hand-lettered sign
  k.ball(0xcfe6ee, 0.28, W / 2 - 0.5, 1.8, -D / 2 + 0.2, { sz: 0.2, seg: 8, ring: 6 });
  const sign = paintBoard(1.9, 0.6, '#e9505b', '#a8323b', (ctx, Wd, Hh) => { knText(ctx, 'ಬೀಡಾ', Wd * 0.3, Hh * 0.72, Hh * 0.6, { color: '#fff4d2' }); latin(ctx, 'BEEDA', Wd * 0.7, Hh * 0.7, Hh * 0.5, { color: '#fff4d2' }); }, { seed: 12 });
  k.box(PAL.ink, 2.0, 0.7, 0.1, 0, H + 0.0, D / 2 + 0.0);
  k.plane(sign, 1.9, 0.6, [0, H + 0.38, D / 2 + 0.07], 0);
  // little stool outside
  k.cyl(PAL.woodDark, 0.25, 0.25, 0.4, 1.8, 0, D / 2 + 0.9, { seg: 6 });
  const g = k.finish({ lean: 0.012 });
  g.name = 'paanShop';
  g.userData = { footprint: 2.2, height: H + 0.8, size: [W, D, H], colliders: [{ x: 0, z: 0, radius: 1.45, height: H }, { x: 1.8, z: D / 2 + 0.9, radius: 0.3, height: 0.4 }] };
  return g;
}

// ---------------------------------------------------------------- film poster wall
function posterCanvas(kind, w, h, r) {
  const { c, ctx } = makeCanvas(w, h);
  const star = (cx, cy, R, n, fill) => { ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * 6.283, rr = i % 2 ? R * 0.55 : R; ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
  if (kind === 0) { // romantic sunset: silhouettes with no faces
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f07a8e'); g.addColorStop(0.55, '#f6b45a'); g.addColorStop(1, '#f9dd8a');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#fff1c0'; ctx.beginPath(); ctx.arc(w / 2, h * 0.5, w * 0.24, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#5c3a63';
    ctx.fillRect(0, h * 0.72, w, h * 0.28);
    for (const sx of [-1, 1]) { const x = w / 2 + sx * w * 0.12; ctx.beginPath(); ctx.arc(x, h * 0.55, w * 0.05, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - w * 0.06, h * 0.72); ctx.lineTo(x, h * 0.6); ctx.lineTo(x + w * 0.06, h * 0.72); ctx.fill(); }
    ctx.fillStyle = '#e5385a'; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.4); ctx.bezierCurveTo(w / 2 - 28, h * 0.3, w / 2 - 20, h * 0.22, w / 2, h * 0.3); ctx.bezierCurveTo(w / 2 + 20, h * 0.22, w / 2 + 28, h * 0.3, w / 2, h * 0.4); ctx.fill();
    ctx.fillStyle = '#fff6d8'; knText(ctx, 'ಗುಲಾಬಿ ಗಲಾಟೆ', w / 2, h * 0.12, w * 0.15, { color: '#fff6d8' });
    latin(ctx, 'GULABI', w / 2, h * 0.86, w * 0.18, { color: '#fff6d8' }); latin(ctx, 'GALATE', w / 2, h * 0.96, w * 0.17, { color: '#ffd778' });
  } else if (kind === 1) { // monsoon: night, umbrella, rain
    ctx.fillStyle = '#2f4f86'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(210,230,255,0.55)'; ctx.lineWidth = 2;
    for (let i = 0; i < 40; i++) { const x = r() * w, y = r() * h * 0.8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 22); ctx.stroke(); }
    const cols = ['#e84f6b', '#f2b33f', '#4ea6d8', '#7ac28b'];
    for (let i = 0; i < 4; i++) { ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.28); ctx.arc(w / 2, h * 0.5, w * 0.34, -Math.PI + (i * Math.PI) / 4 + 0.0, -Math.PI + ((i + 1) * Math.PI) / 4, false); ctx.closePath(); ctx.fill(); }
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.5); ctx.lineTo(w / 2, h * 0.72); ctx.arc(w / 2 - 9, h * 0.72, 9, 0, Math.PI); ctx.stroke();
    ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(w / 2 + w * 0.2, h * 0.14, w * 0.07, 0, 6.283); ctx.fill();
    knText(ctx, 'ಕರಿ ಬೆಕ್ಕು', w / 2, h * 0.1, w * 0.15, { color: '#ffe9a8' }); latin(ctx, 'KARI', w / 2, h * 0.88, w * 0.2, { color: '#ffe9a8' }); latin(ctx, 'BEKKU', w / 2, h * 0.97, w * 0.18, { color: '#fff' });
  } else if (kind === 2) { // masala starburst with chai
    ctx.fillStyle = '#f6c13d'; ctx.fillRect(0, 0, w, h);
    star(w / 2, h * 0.42, w * 0.55, 14, '#f08a4b'); star(w / 2, h * 0.42, w * 0.38, 14, '#e84f6b');
    ctx.fillStyle = '#fff7e2'; ctx.fillRect(w / 2 - 22, h * 0.36, 44, 50); ctx.fillStyle = '#b8693f'; ctx.fillRect(w / 2 - 20, h * 0.36 + 12, 40, 36);
    ctx.strokeStyle = INK; ctx.lineWidth = 3.5; ctx.strokeRect(w / 2 - 22, h * 0.36, 44, 50);
    ctx.beginPath(); ctx.arc(w / 2 + 26, h * 0.36 + 22, 11, -1.5, 1.5); ctx.stroke();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; for (const dx of [-8, 0, 8]) { ctx.beginPath(); ctx.moveTo(w / 2 + dx, h * 0.34); ctx.bezierCurveTo(w / 2 + dx + 8, h * 0.3, w / 2 + dx - 8, h * 0.26, w / 2 + dx, h * 0.22); ctx.stroke(); }
    knText(ctx, 'ಸಂಪಿಗೆ ಸಂತೆ', w / 2, h * 0.12, w * 0.15, { color: '#2b2440' }); latin(ctx, 'SAMPIGE', w / 2, h * 0.84, w * 0.18, { color: '#2b2440' }); latin(ctx, 'SANTE', w / 2, h * 0.96, w * 0.2, { color: '#d9503f' });
  } else { // filmy chakkar: teal, hero pose silhouette (no face), clapper
    ctx.fillStyle = '#3fb7a5'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? '#52c9b6' : '#2ea594'; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.5); ctx.lineTo(w / 2 + Math.cos((i / 9) * 6.283) * w, h * 0.5 + Math.sin((i / 9) * 6.283) * w); ctx.lineTo(w / 2 + Math.cos(((i + 1) / 9) * 6.283) * w, h * 0.5 + Math.sin(((i + 1) / 9) * 6.283) * w); ctx.fill(); }
    ctx.fillStyle = '#2b2440'; ctx.beginPath(); ctx.arc(w / 2, h * 0.34, w * 0.08, 0, 6.283); ctx.fill(); // head silhouette
    ctx.beginPath(); ctx.moveTo(w / 2 - w * 0.18, h * 0.6); ctx.lineTo(w / 2 - w * 0.14, h * 0.43); ctx.lineTo(w / 2 + w * 0.14, h * 0.43); ctx.lineTo(w / 2 + w * 0.18, h * 0.6); ctx.fill();
    ctx.beginPath(); ctx.moveTo(w / 2 + w * 0.12, h * 0.46); ctx.lineTo(w / 2 + w * 0.34, h * 0.28); ctx.lineTo(w / 2 + w * 0.3, h * 0.24); ctx.lineTo(w / 2 + w * 0.08, h * 0.42); ctx.fill();
    ctx.fillStyle = '#fff4d2'; for (let i = 0; i < 6; i++) { ctx.fillRect(w * 0.1 + i * w * 0.14, h * 0.66, w * 0.07, h * 0.05); }
    knText(ctx, 'ಹೂವಿನ ಹಾದಿ', w / 2, h * 0.1, w * 0.15, { color: '#fff4d2' }); latin(ctx, 'HOOVINA', w / 2, h * 0.86, w * 0.18, { color: '#fff4d2' }); latin(ctx, 'HAADI', w / 2, h * 0.97, w * 0.2, { color: '#ffd778' });
  }
  return c;
}

function posterWallCanvas() {
  return paintLive(1024, 560, (ctx, W, H, r) => paintWall(ctx, W, H, r), 77);
}
function paintWall(ctx, W, H, r) {
  // plaster, stains
  ctx.fillStyle = '#ead9b0'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(190,150,100,0.14)' : 'rgba(255,255,240,0.14)'; ctx.fillRect(r() * W, r() * H, 10 + r() * 60, 4 + r() * 18); }
  // old scraps of posters
  for (let i = 0; i < 9; i++) { ctx.fillStyle = ['#e8a3a3', '#a9c9e4', '#f2d58a', '#b9d9a0'][i % 4]; ctx.globalAlpha = 0.6; ctx.fillRect(r() * W, r() * H, 40 + r() * 80, 30 + r() * 90); ctx.globalAlpha = 1; }
  // four posters
  const pw = 210, ph = 330;
  [[50, 40, -0.02], [296, 56, 0.015], [546, 36, -0.01], [792, 52, 0.02]].forEach(([x, y, rot], i) => {
    ctx.save(); ctx.translate(x + pw / 2, y + ph / 2); ctx.rotate(rot); ctx.translate(-pw / 2, -ph / 2);
    ctx.drawImage(posterCanvas(i, pw, ph, r), 0, 0);
    ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.strokeRect(0, 0, pw, ph);
    // curled corner / peel
    ctx.fillStyle = '#f3ead2'; ctx.beginPath(); ctx.moveTo(pw, ph); ctx.lineTo(pw - 34, ph); ctx.lineTo(pw, ph - 30); ctx.closePath(); ctx.fill(); ctx.stroke();
    // tape
    ctx.fillStyle = 'rgba(250,240,190,0.7)'; ctx.fillRect(pw / 2 - 20, -6, 40, 14);
    ctx.restore();
  });
  // hand-painted base strip + sign
  ctx.fillStyle = '#c24a3f'; ctx.fillRect(0, H - 90, W, 90);
  ctx.fillStyle = '#fbf1d6';
  inkText(ctx, 'POST NO BILLS', W * 0.3, H - 28, 50, { color: '#fbf1d6' });
  knText(ctx, 'ಇಲ್ಲಿ ಪೋಸ್ಟರ್ ಅಂಟಿಸಬೇಡಿ', W * 0.72, H - 24, 44, { color: '#fbf1d6' });
  wobblyLine(ctx, rectPts(8, 8, W - 8, H - 8, 10), { r, amp: 4, lw: 7, closed: true });
}

export function createFilmPosterWall(ink) {
  const k = new Kit(ink, { hatch: 0.14, seed: 421 });
  const W = 8.6, H = 4.8, D = 0.7;
  k.base(W + 0.8, 2.4, { color: PAL.stone });
  k.box(0xe8d6ab, W, H, D, 0, 0, 0);
  k.box(0xc9bda5, W + 0.3, 0.3, D + 0.3, 0, 0, 0);
  k.box(0xf4e9c8, W + 0.3, 0.25, D + 0.3, 0, H, 0);
  for (const sx of [-1, 1]) k.box(0xdcc99a, 0.7, H + 0.2, 1.1, sx * (W / 2 + 0.2), 0, 0); // end buttresses
  // wall painted base colour sits behind the canvas: canvas covers the face
  const wall = posterWallCanvas();
  k.plane(wall, W - 0.2, H - 0.3, [0, H / 2 + 0.05, D / 2 + 0.02], 0);
  // back side: scraps only (blank patched wall) + a few ladders / bicycle for life
  k.box(PAL.wood, 0.12, 3.6, 0.1, W / 2 - 1.0, 0, -D / 2 - 0.5, { rx: -0.25 });
  k.box(PAL.wood, 0.12, 3.6, 0.1, W / 2 - 1.5, 0, -D / 2 - 0.5, { rx: -0.25 });
  for (let i = 0; i < 6; i++) k.box(PAL.wood, 0.55, 0.06, 0.06, W / 2 - 1.25, 0.5 + i * 0.55, -D / 2 - 0.6 - i * 0.0 + 0.0, { outline: false });
  const g = k.finish({ lean: 0.01 });
  g.name = 'filmPosterWall';
  g.userData = { footprint: 5, height: H + 0.3, size: [W, 1.1, H], colliders: lineColliders(-W / 2 + 0.3, 0, W / 2 - 0.3, 0, 0.7, H, 0.9) };
  return g;
}

// ---------------------------------------------------------------- roadside South Indian temple
let _kolam = null;
function kolamCanvas() {
  if (_kolam) return _kolam;
  const { c, ctx } = makeCanvas(160, 160);
  ctx.strokeStyle = '#fbf4e2'; ctx.fillStyle = '#fbf4e2'; ctx.lineWidth = 3.2; ctx.lineCap = 'round';
  ctx.fillStyle = 'rgba(210,90,60,0.55)'; ctx.beginPath(); ctx.arc(80, 80, 74, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#fbf4e2';
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc(32 + i * 32, 32 + j * 32, 3, 0, 6.283); ctx.fill(); }
  for (let i = 0; i < 4; i++) { // petal loops around the dot grid
    const a = (i / 4) * 6.283;
    ctx.beginPath(); ctx.ellipse(80 + Math.cos(a) * 28, 80 + Math.sin(a) * 28, 26, 11, a, 0, 6.283); ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(80, 80, 62, 0, 6.283); ctx.stroke();
  return (_kolam = c);
}

export function createTempleShrine(ink) {
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 431 });
  const RED = 0xd9503f, WH = 0xfaf2de, SAF = 0xf5a742, BLACK = 0x3a3445;
  k.base(4.2, 4.4, { color: PAL.stone });
  k.box(0xe4d9c0, 3.6, 0.3, 3.6, 0, 0, 0);
  k.box(0xd9cdb2, 1.7, 0.18, 0.45, 0, 0, 2.0);                 // front step
  // sanctum with red-and-white stripes + a pillared porch
  k.box(WH, 2.2, 1.9, 2.2, 0, 0.3, -0.2);
  for (let i = 0; i < 7; i++) if (i % 2) { const x = -1.0 + i * (2.0 / 6); k.box(RED, 0.2, 1.9, 0.04, x, 0.3, 0.92, { outline: false }); k.box(RED, 0.2, 1.9, 0.04, x, 0.3, -1.32, { outline: false }); }
  k.box(RED, 2.4, 0.25, 2.4, 0, 2.2, -0.2);
  const f = k.face(0, 0.3, 0.9, 0);
  f.window(0, 0.2, 1.1, 1.6, { glass: 0x4a2f2a, frame: SAF, sill: false, bars: 0 });
  f.box(0xffd36a, 0, 0.3, 0.18, 0.28, 0.1, 0.06, { outline: false });  // diya flame
  k.ball(PAL.marigold, 0.22, 0, 0.3 + 0.95, 0.6, { sz: 0.6, seg: 6, ring: 5, outline: false });
  k.ball(0x3f5fa8, 0.16, 0, 0.3 + 1.35, 0.6, { seg: 6, ring: 5, outline: false });
  for (const sx of [-1, 1]) k.cyl(WH, 0.09, 0.11, 1.6, sx * 0.95, 0.3, 1.3, { seg: 6 });
  k.box(RED, 2.2, 0.14, 0.7, 0, 1.9, 1.3);
  // the gopura: stacked, shrinking tiers with stripes, little niches, a barrel roof and gold kalasas
  let y = 2.45, w = 2.3;
  for (let i = 0; i < 5; i++) {
    const h = 0.55, d = w * 0.8;
    k.box(i % 2 ? WH : 0xf6e7c6, w, h, d, 0, y, -0.2);
    for (let j = 0; j < 5; j++) if (j % 2) k.box(RED, w / 5 * 0.9, h, 0.04, -w / 2 + (j + 0.5) * (w / 5), y, -0.2 + d / 2 + 0.01, { outline: false });
    k.box(0xe8d6ad, w + 0.14, 0.08, d + 0.14, 0, y + h, -0.2);
    k.box(0xfff1c8, 0.16, h * 0.6, 0.05, 0, y + 0.1, -0.2 + d / 2 + 0.04, { outline: false });
    y += h + 0.06; w *= 0.8;
  }
  k.cyl(WH, w * 0.52, w * 0.52, w * 1.2, 0, y + 0.18, -0.2, { seg: 10, rz: Math.PI / 2 });
  for (const sx of [-1, 0, 1]) k.cone(PAL.gold, 0.06, 0.36, sx * w * 0.55, y + 0.55, -0.2, { seg: 5 });
  // flag + bell + marigold garland
  k.cyl(PAL.ink, 0.025, 0.025, 1.0, 0, y + 0.8, -0.2, { seg: 4 });
  k.flat(PAL.kaRed, polyShape([[0, 0], [0.7, 0.1], [0, 0.4]]), 0.03, y + 1.4, -0.2, { ry: 0 });
  k.flat(PAL.kaRed, polyShape([[0, 0], [-0.7, 0.1], [0, 0.4]]), -0.03, y + 1.4, -0.2, { ry: Math.PI });
  k.cyl(PAL.ink, 0.02, 0.02, 0.35, 0, 1.55, 1.3, { seg: 3, outline: false });
  k.cone(PAL.gold, 0.2, 0.28, 0, 1.27, 1.3, { seg: 8 });
  for (let i = 0; i < 9; i++) k.ball(i % 3 ? PAL.marigold : 0xfaf6ea, 0.09, -0.85 + i * 0.21, 1.8 - Math.sin((i / 8) * Math.PI) * 0.22, 1.66, { seg: 5, ring: 4, outline: false });
  // Nandi in front: seated black bull on a small pedestal, facing the shrine
  const nx = -1.35, nz = 1.55;
  k.box(0xd9cdb2, 0.9, 0.22, 1.2, nx, 0.3, nz);
  k.ball(BLACK, 0.34, nx, 0.82, nz + 0.05, { sx: 0.95, sy: 0.9, sz: 1.35, seg: 8, ring: 6 });      // body
  k.ball(BLACK, 0.2, nx, 1.05, nz - 0.2, { seg: 6, ring: 5 });                                      // hump
  k.ball(BLACK, 0.2, nx, 1.0, nz - 0.52, { sx: 0.9, sz: 1.1, seg: 7, ring: 5 });                    // head
  for (const sx of [-1, 1]) k.cone(0xf2e6c0, 0.04, 0.18, nx + sx * 0.14, 1.22, nz - 0.5, { seg: 4, rz: -sx * 0.5 });
  k.add(new THREE.TorusGeometry(0.2, 0.025, 4, 10, Math.PI), PAL.marigold, { pos: [nx, 0.98, nz - 0.28], rot: [0, 1.57, 0] }); // garland
  // kolam at the door (painted plane, flat on the ground)
  k.plane(kolamCanvas(), 1.5, 1.5, [0.1, 0.06, 2.55], 0, -Math.PI / 2);
  // offering diyas, a pot of tulasi
  for (let i = 0; i < 5; i++) k.cone(0xffd36a, 0.07, 0.16, -0.7 + i * 0.35, 0.3, 1.9, { seg: 4, outline: false });
  k.cyl(PAL.terracotta, 0.2, 0.15, 0.3, 1.4, 0.3, 1.4, { seg: 7 });
  k.ball(PAL.leaf, 0.3, 1.4, 0.78, 1.4, { seg: 7, ring: 5 });
  const g = k.finish({ lean: 0.01 });
  g.name = 'templeShrine';
  g.userData = { footprint: 2.6, height: y + 2.0, size: [3.6, 3.6, y + 1.5], colliders: [{ x: 0, z: -0.1, radius: 1.5, height: 4 }, { x: nx, z: nz, radius: 0.5, height: 1.2 }] };
  return g;
}

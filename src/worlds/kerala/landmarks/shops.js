// Street-life shops (Kochi): a Kerala meals hotel ("Meals Ready" on a banana leaf), a petti kada (tiny roadside shop with hanging banana
// bunches), a Malayalam film poster and cut-out wall (invented titles, cartoon faces) and a roadside Kerala temple with a copper-sheet
// pyramid roof, a stepped laterite plinth and a brass deepastambham (lamp tower). Photos: Wikimedia Commons "Thali Shiva Temple-Nileshwar"
// (red laterite base, hipped roof with gold finial), "A village tea shop in Kerala".
// All local frames: front +Z, base y=0.
import * as THREE from 'three';
import { Kit, PAL, rectPts, makeCanvas, handRng, INK, wobblyLine, drawShape, paintBoard, inkText, taText, latin, lineColliders, polyShape, mulberry32, bilingualBoard } from './kit.js';

// ---------------------------------------------------------------- Kerala meals hotel
export function createIraniCafe(ink) {
  const k = new Kit(ink, { hatch: 0.13, seed: 401 });
  const W = 6.6, D = 5.0, H = 5.4;
  const WALL = 0xf3e6a8, TRIM = 0xfffaea, GREEN = 0x3f9b6a, ROOF = 0xcf6a48;
  k.base(W + 1.2, D + 3.4, { color: PAL.stone });
  k.box(WALL, W, H, D, 0, 0, 0);
  k.box(GREEN, W + 0.12, 0.9, D + 0.12, 0, 0, 0);                  // painted dado
  k.box(TRIM, W + 0.4, 0.3, D + 0.4, 0, H, 0);
  // flat roof with a small water tank and a Mangalore-tile pent over the front
  k.box(PAL.stoneDark, 1.4, 1.1, 1.2, -2.2, H + 0.3, -1.2); k.cyl(0x2f6fa8, 0.5, 0.5, 0.9, 1.9, H + 0.3, -1.2, { seg: 10 });
  k.add(new THREE.BoxGeometry(W + 0.8, 0.14, 2.8), ROOF, { pos: [0, 3.55, D / 2 + 1.0], rot: [0.28, 0, 0] });
  for (let i = 0; i < 12; i++) k.box(0xa9503a, 0.07, 0.07, 2.8, -W / 2 - 0.2 + i * ((W + 0.4) / 11), 3.55, D / 2 + 1.0, { rx: 0.28, outline: false });
  for (const sx of [-1, 1]) k.cyl(PAL.woodDark, 0.09, 0.09, 3.1, sx * (W / 2 + 0.25), 0, D / 2 + 2.1, { seg: 5 });
  const f = k.face(0, 0, D / 2, 0);
  // wide open front: a counter + the kitchen window, and a wooden door
  f.box(PAL.wood, -1.7, 0.95, 2.4, 0.18, 0.5, 0.1);
  f.window(-1.7, 1.4, 2.2, 1.6, { rect: true, glass: 0x5c3b2a, frame: TRIM, bars: 1, sill: false });
  f.window(1.8, 0.4, 1.3, 2.4, { glass: 0x6b3b2a, frame: TRIM, bars: 1, sill: false });
  // upper floor: louvred windows
  for (const u of [-2.0, 0, 2.0]) f.window(u, 3.3, 0.8, 1.3, { glass: 0x55728c, frame: TRIM, bars: 1 });
  // tables with banana leaves, steel tumblers, plastic chairs
  const table = (x, z) => {
    k.box(0xe8dcc0, 1.5, 0.07, 0.9, x, 0.74, z);
    for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.box(PAL.ink, 0.05, 0.74, 0.05, x + a * 0.65, 0, z + b * 0.38, { outline: false });
    for (const dx of [-0.45, 0.45]) { k.box(0x6fbf6a, 0.55, 0.02, 0.4, x + dx, 0.81, z, { outline: false }); k.cyl(0xc9cdd2, 0.07, 0.06, 0.16, x + dx + 0.28, 0.81, z - 0.2, { seg: 7, outline: false }); }
    for (const sz of [-1, 1]) for (const dx of [-0.45, 0.45]) { const c = [0x3f7fa8, 0xd9503f, 0x3f9b6a][(Math.round(x * 3 + dx * 5) + 9) % 3]; k.box(c, 0.38, 0.05, 0.38, x + dx, 0.44, z + sz * 0.78); k.box(c, 0.38, 0.4, 0.05, x + dx, 0.46, z + sz * 0.96); for (const a of [-1, 1]) k.box(c, 0.04, 0.44, 0.04, x + dx + a * 0.15, 0, z + sz * 0.62, { outline: false }); }
  };
  table(-1.6, D / 2 + 2.0); table(1.8, D / 2 + 2.0);
  // hand-wash basin and a steel drum of water by the door
  k.cyl(0xc9cdd2, 0.3, 0.3, 0.8, W / 2 - 0.5, 0, D / 2 + 0.7, { seg: 8 });
  // "Meals Ready" board hanging under the pent + the hotel name board
  k.plane(bilingualBoard(2.6, 0.7, 'ഊണ് റെഡി', 'MEALS READY', { fill: '#fffbe0', hatch: '#f0d880', tc: '#c0392b', ec: '#3f7a4a', taSize: 0.5, enSize: 0.22, px: 80, seed: 3 }), 2.6, 0.7, [0.0, 2.9, D / 2 + 1.5], 0, 0.28);
  const sign = paintBoard(5.8, 1.15, '#fffbe0', '#f0d880', (ctx, Wd, Hh) => {
    taText(ctx, 'കായൽ ഹോട്ടൽ', Wd * 0.5, Hh * 0.52, Hh * 0.46, { color: '#9c2f2a' });
    latin(ctx, 'KAYAL HOTEL · MEALS · PAROTTA · FISH CURRY', Wd * 0.5, Hh * 0.9, Hh * 0.2, { color: '#2b2440' });
  }, { seed: 5 });
  k.box(GREEN, 6.0, 1.2, 0.14, 0, 4.0, D / 2 + 0.07);
  k.plane(sign, 5.8, 1.1, [0, 4.05, D / 2 + 0.2], 0);
  const g = k.finish({ lean: 0.008 });
  g.name = 'iraniCafe';
  g.userData = {
    footprint: 5.2, height: H + 1.5, size: [W, D + 3, H],
    colliders: [...lineColliders(-W / 2 + 1.5, 0, W / 2 - 1.5, 0, 2.5, H, 2.2), { x: -1.6, z: D / 2 + 2.0, radius: 0.9, height: 0.8 }, { x: 1.8, z: D / 2 + 2.0, radius: 0.9, height: 0.8 }],
  };
  return g;
}

// ---------------------------------------------------------------- petti kada
export function createPaanShop(ink) {
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 411 });
  const W = 2.8, D = 2.0, H = 3.0, GRN = 0x4aa37a, WOOD = 0xc89a6a;
  k.base(W + 0.8, D + 1.4, { color: PAL.stone });
  k.box(GRN, W, 0.2, D, 0, 0, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(WOOD, 0.14, H - 0.4, 0.14, sx * (W / 2 - 0.07), 0.2, sz * (D / 2 - 0.07));
  k.box(0xf0e0a6, W, H - 0.8, 0.1, 0, 0.5, -D / 2 + 0.05);
  for (const sx of [-1, 1]) k.box(0xf0e0a6, 0.1, H - 0.8, D, sx * (W / 2 - 0.05), 0.5, 0);
  k.box(GRN, W + 0.2, 1.0, 0.18, 0, 0.2, D / 2 - 0.1);
  k.box(WOOD, W + 0.3, 0.1, 0.5, 0, 1.15, D / 2 + 0.08);
  // blue tarpaulin roof, as on every road-side kada
  k.add(new THREE.BoxGeometry(W + 0.7, 0.1, D + 1.0), 0x3f7fc0, { pos: [0, H - 0.1, 0.2], rot: [0.12, 0, 0] });
  k.box(0x2f629a, W + 0.7, 0.1, 0.08, 0, H - 0.3, D / 2 + 0.7, { outline: false });
  // glass biscuit / sweet jars on the counter, soda bottles, a string of packets
  const cols = [0xe84f6b, 0xf2b33f, 0x4ea6d8, 0x7ac28b, 0xb58be0, 0xf08a4b, 0xfaf6ea];
  const r = mulberry32(412);
  for (let row = 0; row < 3; row++) {
    k.box(WOOD, W - 0.2, 0.05, 0.4, 0, 1.45 + row * 0.5, -D / 2 + 0.3);
    for (let i = 0; i < 7; i++) k.box(cols[Math.floor(r() * cols.length)], 0.22, 0.28 + r() * 0.1, 0.14, -W / 2 + 0.3 + i * 0.37, 1.5 + row * 0.5, -D / 2 + 0.3, { outline: false });
  }
  for (const x of [-1.0, -0.62, -0.24]) { k.cyl(0xe8f1f1, 0.15, 0.15, 0.34, x, 1.25, D / 2 + 0.12, { seg: 8 }); k.cyl(PAL.red, 0.13, 0.13, 0.06, x, 1.59, D / 2 + 0.12, { seg: 8, outline: false }); }
  for (const x of [0.4, 0.75, 1.05]) k.cyl(x === 0.75 ? 0xf0a03a : 0x5fbf72, 0.05, 0.06, 0.26, x, 1.25, D / 2 + 0.1, { seg: 5, outline: false });
  // banana bunches hanging from the front, packets on strings
  for (const x of [-0.7, 0.0, 0.7]) { k.cyl(PAL.ink, 0.01, 0.01, 0.5, x, H - 0.75, D / 2 + 0.35, { seg: 3, outline: false }); for (let i = 0; i < 6; i++) k.add(new THREE.CylinderGeometry(0.035, 0.06, 0.34, 5), 0xf2dc4a, { pos: [x + (i % 3 - 1) * 0.07, H - 0.95 - Math.floor(i / 3) * 0.06, D / 2 + 0.38], rot: [0.2, 0, (i % 3 - 1) * 0.25] }); }
  for (const sx of [-1, 1]) for (let i = 0; i < 6; i++) k.box(cols[(i + (sx > 0 ? 3 : 0)) % cols.length], 0.1, 0.16, 0.02, sx * (W / 2 - 0.15), H - 0.4 - i * 0.18, D / 2 + 0.3, { outline: false });
  const sign = paintBoard(1.9, 0.6, '#fffbe0', '#f0d880', (ctx, Wd, Hh) => { taText(ctx, 'പെട്ടിക്കട', Wd * 0.5, Hh * 0.55, Hh * 0.5, { color: '#c0392b' }); latin(ctx, 'PETTI KADA', Wd * 0.5, Hh * 0.92, Hh * 0.28, { color: '#2b2440' }); }, { seed: 7, px: 90 });
  k.box(PAL.ink, 2.0, 0.7, 0.1, 0, H + 0.0, D / 2 + 0.0);
  k.plane(sign, 1.9, 0.6, [0, H + 0.38, D / 2 + 0.07], 0);
  // plastic stool outside
  k.cyl(0x3f7fc0, 0.25, 0.25, 0.4, 1.8, 0, D / 2 + 0.9, { seg: 6 });
  const g = k.finish({ lean: 0.012 });
  g.name = 'paanShop';
  g.userData = { footprint: 2.2, height: H + 0.8, size: [W, D, H], colliders: [{ x: 0, z: 0, radius: 1.45, height: H }, { x: 1.8, z: D / 2 + 0.9, radius: 0.3, height: 0.4 }] };
  return g;
}

// ---------------------------------------------------------------- Malayalam film poster + cut-out wall
function posterCanvas(kind, w, h, r) {
  const { c, ctx } = makeCanvas(w, h);
  const star = (cx, cy, R, n, fill) => { ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * 6.283, rr = i % 2 ? R * 0.55 : R; ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
  const title = (ta, en, y1, y2, col1 = '#fff6d8', col2 = '#ffd778') => { taText(ctx, ta, w / 2, h * y1, w * 0.17, { color: col1, maxW: w * 0.9 }); latin(ctx, en, w / 2, h * y2, Math.min(w * 0.13, (w * 0.9) / (en.length * 0.62)), { color: col2 }); };
  const face = (cx, cy, s, skin, hair) => { // a cartoon face: no real person
    ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(cx, cy, s, s * 1.15, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = hair; ctx.beginPath(); ctx.ellipse(cx, cy - s * 0.75, s * 1.05, s * 0.5, 0, 3.14, 6.283); ctx.fill();
    ctx.fillStyle = '#2b2440'; ctx.fillRect(cx - s * 0.75, cy - s * 0.2, s * 1.5, s * 0.34);
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy + s * 0.45, s * 0.35, 0.2, 2.9); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, s, s * 1.15, 0, 0, 6.283); ctx.stroke();
  };
  if (kind === 0) { // sunrise romance: a cartoon couple under a big heart
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f07a8e'); g.addColorStop(0.55, '#f6b45a'); g.addColorStop(1, '#f9dd8a');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#fff1c0'; ctx.beginPath(); ctx.arc(w / 2, h * 0.5, w * 0.26, 0, 6.283); ctx.fill();
    face(w * 0.36, h * 0.5, w * 0.12, '#c68a5c', '#2b2440'); face(w * 0.64, h * 0.52, w * 0.11, '#d09a6a', '#1f1a2e');
    ctx.fillStyle = '#e5385a'; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.38); ctx.bezierCurveTo(w / 2 - 28, h * 0.28, w / 2 - 20, h * 0.2, w / 2, h * 0.28); ctx.bezierCurveTo(w / 2 + 20, h * 0.2, w / 2 + 28, h * 0.28, w / 2, h * 0.38); ctx.fill();
    title('പുഴയോരത്തെ പെണ്ണ്', 'PUZHAYORATHE PENNU', 0.85, 0.96);
  } else if (kind === 1) { // action: red sky, a hero silhouette and a hanging rope bridge of stars
    ctx.fillStyle = '#b8322b'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? '#d9503f' : '#9c2a24'; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.45); ctx.lineTo(w / 2 + Math.cos((i / 9) * 6.283) * w, h * 0.45 + Math.sin((i / 9) * 6.283) * w); ctx.lineTo(w / 2 + Math.cos(((i + 1) / 9) * 6.283) * w, h * 0.45 + Math.sin(((i + 1) / 9) * 6.283) * w); ctx.fill(); }
    face(w / 2, h * 0.36, w * 0.14, '#b87a4e', '#1f1a2e');
    ctx.fillStyle = '#fafafa'; ctx.fillRect(w * 0.3, h * 0.55, w * 0.4, h * 0.12);   // white mundu
    ctx.fillStyle = '#2b2440'; ctx.fillRect(w * 0.34, h * 0.48, w * 0.32, h * 0.08);
    star(w * 0.2, h * 0.14, w * 0.07, 5, '#ffd778'); star(w * 0.8, h * 0.18, w * 0.06, 5, '#ffd778');
    title('മുണ്ടുടുത്ത മാലാഖ', 'MUNDUDUTHA MAALAKHA', 0.86, 0.97);
  } else if (kind === 2) { // festival: a caparisoned elephant (invented), golden sun, marigold border
    ctx.fillStyle = '#f6c13d'; ctx.fillRect(0, 0, w, h);
    star(w / 2, h * 0.42, w * 0.55, 14, '#f08a4b'); star(w / 2, h * 0.42, w * 0.38, 14, '#e84f6b');
    ctx.fillStyle = '#6f6c78'; ctx.strokeStyle = INK; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(w * 0.5, h * 0.5, w * 0.24, h * 0.13, 0, 0, 6.283); ctx.fill(); ctx.stroke();            // body
    ctx.beginPath(); ctx.ellipse(w * 0.3, h * 0.42, w * 0.11, h * 0.09, 0, 0, 6.283); ctx.fill(); ctx.stroke();           // head
    ctx.beginPath(); ctx.moveTo(w * 0.22, h * 0.45); ctx.quadraticCurveTo(w * 0.15, h * 0.6, w * 0.2, h * 0.64); ctx.lineWidth = 8; ctx.stroke(); ctx.lineWidth = 3; // trunk
    ctx.fillStyle = '#e8b84a'; ctx.beginPath(); ctx.moveTo(w * 0.22, h * 0.36); ctx.lineTo(w * 0.38, h * 0.36); ctx.lineTo(w * 0.36, h * 0.46); ctx.lineTo(w * 0.24, h * 0.46); ctx.fill(); ctx.stroke(); // golden nettipattam
    ctx.fillStyle = '#d9503f'; ctx.fillRect(w * 0.4, h * 0.42, w * 0.22, h * 0.1); ctx.strokeRect(w * 0.4, h * 0.42, w * 0.22, h * 0.1);
    for (const x of [0.38, 0.46, 0.56, 0.64]) { ctx.fillStyle = '#6f6c78'; ctx.fillRect(w * x, h * 0.58, w * 0.06, h * 0.12); ctx.strokeRect(w * x, h * 0.58, w * 0.06, h * 0.12); }
    for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? '#f5a742' : '#e8472f'; ctx.beginPath(); ctx.arc(w * (0.08 + i * 0.075), h * 0.76, 9, 0, 6.283); ctx.fill(); }
    title('തെങ്ങിൻ മുകളിലെ രഹസ്യം', 'THENGIN MUKALILE RAHASYAM', 0.88, 0.98, '#2b2440', '#d9503f');
  } else { // college comedy: teal, three cartoon faces
    ctx.fillStyle = '#3fb7a5'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? '#52c9b6' : '#2ea594'; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.5); ctx.lineTo(w / 2 + Math.cos((i / 9) * 6.283) * w, h * 0.5 + Math.sin((i / 9) * 6.283) * w); ctx.lineTo(w / 2 + Math.cos(((i + 1) / 9) * 6.283) * w, h * 0.5 + Math.sin(((i + 1) / 9) * 6.283) * w); ctx.fill(); }
    face(w * 0.27, h * 0.45, w * 0.1, '#c68a5c', '#2b2440'); face(w * 0.5, h * 0.36, w * 0.12, '#b87a4e', '#1f1a2e'); face(w * 0.74, h * 0.46, w * 0.1, '#d09a6a', '#2b2440');
    ctx.fillStyle = '#fff4d2'; for (let i = 0; i < 6; i++) ctx.fillRect(w * 0.1 + i * w * 0.14, h * 0.68, w * 0.07, h * 0.05);
    title('ഞണ്ടും പൂച്ചയും', 'NJANDUM POOCHAYUM', 0.85, 0.97);
  }
  return c;
}

function posterWallCanvas() {
  const W = 960, H = 620;
  const { c, ctx } = makeCanvas(W, H);
  const r = handRng(77);
  ctx.fillStyle = '#ead9b0'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(190,150,100,0.14)' : 'rgba(255,255,240,0.14)'; ctx.fillRect(r() * W, r() * H, 10 + r() * 60, 4 + r() * 18); }
  for (let i = 0; i < 9; i++) { ctx.fillStyle = ['#e8a3a3', '#a9c9e4', '#f2d58a', '#b9d9a0'][i % 4]; ctx.globalAlpha = 0.6; ctx.fillRect(r() * W, r() * H, 40 + r() * 80, 30 + r() * 90); ctx.globalAlpha = 1; }
  const pw = 200, ph = 360;
  [[40, 50, -0.02], [270, 66, 0.015], [500, 46, -0.01], [730, 62, 0.02]].forEach(([x, y, rot], i) => {
    ctx.save(); ctx.translate(x + pw / 2, y + ph / 2); ctx.rotate(rot); ctx.translate(-pw / 2, -ph / 2);
    ctx.drawImage(posterCanvas(i, pw, ph, r), 0, 0);
    ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.strokeRect(0, 0, pw, ph);
    ctx.fillStyle = '#f3ead2'; ctx.beginPath(); ctx.moveTo(pw, ph); ctx.lineTo(pw - 34, ph); ctx.lineTo(pw, ph - 30); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(250,240,190,0.7)'; ctx.fillRect(pw / 2 - 20, -6, 40, 14);
    ctx.restore();
  });
  ctx.fillStyle = '#c24a3f'; ctx.fillRect(0, H - 100, W, 100);
  ctx.fillStyle = '#fbf1d6';
  inkText(ctx, 'POST NO BILLS', W * 0.27, H - 34, 48, { color: '#fbf1d6' });
  taText(ctx, 'പോസ്റ്റർ പതിക്കരുത്', W * 0.72, H - 30, 46, { color: '#fbf1d6', maxW: W * 0.44 });
  wobblyLine(ctx, rectPts(8, 8, W - 8, H - 8, 10), { r, amp: 4, lw: 7, closed: true });
  return c;
}

/** A big plywood cut-out of a cartoon "hero" (invented: sunglasses, white mundu with a gold border, a hand raised) painted on a canvas. */
function cutoutCanvas(kind) {
  const W = 200, H = 420;
  const { c, ctx } = makeCanvas(W, H);
  const skin = kind ? '#c68a5c' : '#b87a4e', shirt = kind ? '#3f7fc0' : '#d9503f';
  ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.lineJoin = 'round';
  // legs / veshti
  ctx.fillStyle = '#fafafa'; ctx.beginPath(); ctx.moveTo(52, 250); ctx.lineTo(148, 250); ctx.lineTo(160, 410); ctx.lineTo(40, 410); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#e8c04a'; ctx.fillRect(41, 396, 118, 12);           // gold border
  // torso + arms
  ctx.fillStyle = shirt; ctx.beginPath(); ctx.moveTo(52, 130); ctx.lineTo(148, 130); ctx.lineTo(154, 252); ctx.lineTo(46, 252); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = skin; ctx.beginPath(); ctx.moveTo(150, 140); ctx.lineTo(186, 70); ctx.lineTo(172, 62); ctx.lineTo(140, 128); ctx.fill(); ctx.stroke(); // raised arm
  ctx.beginPath(); ctx.moveTo(52, 140); ctx.lineTo(24, 214); ctx.lineTo(40, 222); ctx.lineTo(60, 158); ctx.fill(); ctx.stroke();
  // head
  ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(100, 82, 38, 46, 0, 0, 6.283); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#1f1a2e'; ctx.beginPath(); ctx.ellipse(100, 48, 42, 24, 0, 3.14, 6.283); ctx.fill();            // hair
  ctx.fillRect(66, 70, 68, 16);                                                                                       // sunglasses
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(72, 74); ctx.lineTo(92, 74); ctx.stroke();
  ctx.strokeStyle = INK; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(100, 102, 14, 0.2, 2.9); ctx.stroke();          // grin
  // garland of marigolds round the neck
  for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 3 ? '#f5a742' : '#e8472f'; ctx.beginPath(); ctx.arc(62 + i * 9.5, 130 + Math.sin((i / 8) * Math.PI) * 26, 8, 0, 6.283); ctx.fill(); ctx.stroke(); }
  return c;
}

export function createFilmPosterWall(ink) {
  const k = new Kit(ink, { hatch: 0.14, seed: 421 });
  const W = 7.0, H = 4.5, D = 0.7;
  k.base(W + 1.0, 2.4, { color: PAL.stone });
  k.box(0xe8d6ab, W, H, D, 0, 0, 0);
  k.box(0xc9bda5, W + 0.3, 0.3, D + 0.3, 0, 0, 0);
  k.box(0xf4e9c8, W + 0.3, 0.25, D + 0.3, 0, H, 0);
  const wall = posterWallCanvas();
  k.plane(wall, W - 0.2, H - 0.3, [0, H / 2 + 0.05, D / 2 + 0.02], 0);
  // two plywood cut-outs on wooden stilts at the ends, each with a flower garland
  for (const [sx, kind] of [[-1, 0], [1, 1]]) {
    const x = sx * 4.15;
    k.box(PAL.woodDark, 0.12, 2.4, 0.12, x - 0.35, 0, 0.5); k.box(PAL.woodDark, 0.12, 2.4, 0.12, x + 0.35, 0, 0.5);
    k.box(0xf7ecd2, 1.55, 3.3, 0.08, x, 1.6, 0.35);
    k.plane(cutoutCanvas(kind), 1.5, 3.15, [x, 3.2, 0.41], 0);
    k.box(PAL.woodDark, 0.08, 1.2, 0.08, x, 0, 0.1, { rx: -0.5 });
  }
  // back: a ladder + a bicycle-like leaning plank for life
  k.box(PAL.wood, 0.12, 3.6, 0.1, W / 2 - 1.0, 0, -D / 2 - 0.5, { rx: -0.25 });
  k.box(PAL.wood, 0.12, 3.6, 0.1, W / 2 - 1.5, 0, -D / 2 - 0.5, { rx: -0.25 });
  for (let i = 0; i < 6; i++) k.box(PAL.wood, 0.55, 0.06, 0.06, W / 2 - 1.25, 0.5 + i * 0.55, -D / 2 - 0.6, { outline: false });
  const g = k.finish({ lean: 0.01 });
  g.name = 'filmPosterWall';
  g.userData = { footprint: 5, height: H + 0.3, size: [W + 1.8, 1.1, H], colliders: lineColliders(-W / 2 + 0.3, 0, W / 2 - 0.3, 0, 0.7, H, 0.9) };
  return g;
}

// ---------------------------------------------------------------- roadside Kerala temple
export function createTempleShrine(ink) {
  const k = new Kit(ink, { hatch: 0.1, thickness: 2.2, seed: 431 });
  const LAT = 0xb5503a, LAT_D = 0x9a4230, WHITE = 0xf3ecd9, WOOD = 0x6e4a33, COP = 0xc4764a, COP_D = 0xa85f37, PATINA = 0x7fb59a, BR = 0xe0b341;
  k.base(4.2, 4.4, { color: PAL.stone });
  k.box(0xcfc6b0, 3.9, 0.12, 4.0, 0, 0, 0, { outline: false });                 // paved court
  // stepped red laterite plinth (upapitham) with the sanctum on it
  k.box(LAT_D, 3.4, 0.25, 3.0, 0, 0.1, -0.35);
  k.box(LAT, 3.1, 0.3, 2.7, 0, 0.35, -0.35);
  const SW = 2.2, SH = 1.9, SZ = -0.55, SY = 0.65;
  k.box(WHITE, SW, SH, SW, 0, SY, SZ);
  k.box(LAT_D, SW + 0.14, 0.18, SW + 0.14, 0, SY, SZ);
  k.box(LAT, SW + 0.2, 0.16, SW + 0.2, 0, SY + SH - 0.16, SZ);
  const f = k.face(0, SY, SZ + SW / 2, 0);
  f.window(0, 0.0, 0.8, 1.4, { rect: true, glass: 0x3c2a24, frame: WOOD, bars: 1, sill: false });   // sanctum door
  for (const u of [-0.25, 0, 0.25]) f.box(BR, u, 0.4, 0.06, 0.06, 0.04, 0.05, { outline: false });   // brass door studs
  // copper-sheet pyramid roof, two tiers, timber eaves, gold kalasam on top
  k.box(WOOD, SW + 1.0, 0.14, SW + 1.0, 0, SY + SH, SZ);
  k.add(new THREE.ConeGeometry(2.05, 1.25, 4, 1).rotateY(Math.PI / 4), COP, { pos: [0, SY + SH + 0.14 + 0.62, SZ] });
  for (let i = 1; i < 5; i++) k.box(i % 2 ? COP_D : PATINA, (2.8 * (1 - i / 5.2)), 0.04, (2.8 * (1 - i / 5.2)), 0, SY + SH + 0.14 + (i / 5.2) * 1.2, SZ, { outline: false });
  k.box(WOOD, 1.2, 0.3, 1.2, 0, SY + SH + 1.34, SZ);
  k.add(new THREE.ConeGeometry(0.85, 0.75, 4, 1).rotateY(Math.PI / 4), COP, { pos: [0, SY + SH + 1.64 + 0.37, SZ] });
  k.cyl(BR, 0.12, 0.2, 0.28, 0, SY + SH + 2.4, SZ, { seg: 8 });
  k.ball(BR, 0.16, 0, SY + SH + 2.72, SZ, { seg: 8, ring: 6 });
  k.cone(BR, 0.05, 0.3, 0, SY + SH + 2.85, SZ, { seg: 4 });
  // front mandapam: four timber pillars on a red base under a small hipped copper roof
  const MZ = 1.2, MY = 0.35;
  k.box(LAT_D, 2.2, 0.2, 1.5, 0, MY - 0.1, MZ);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) k.box(WOOD, 0.2, 1.9, 0.2, sx * 0.95, MY + 0.1, MZ + sz * 0.55);
  k.box(WOOD, 2.5, 0.12, 1.7, 0, MY + 2.0, MZ);
  k.hip(COP, 2.6, 1.8, 0.8, 0, MY + 2.1, MZ, { inset: 0.5 });
  // the brass deepastambham (lamp tower) in front: stone base, brass pole, tiers of lamp cups, a finial
  const LX = 1.5, LZ = 1.75;
  k.box(0xb9b09a, 0.5, 0.3, 0.5, LX, 0.05, LZ);
  k.cyl(BR, 0.06, 0.08, 2.6, LX, 0.35, LZ, { seg: 6 });
  for (let i = 0; i < 6; i++) {
    const y = 0.8 + i * 0.35, rr = 0.42 - i * 0.045;
    k.cyl(BR, rr, rr, 0.05, LX, y, LZ, { seg: 12 });
    for (let j = 0; j < 6; j++) { const a = (j / 6) * 6.283; k.ball(0xffe9a0, 0.045, LX + Math.cos(a) * rr * 0.92, y + 0.1, LZ + Math.sin(a) * rr * 0.92, { seg: 4, ring: 3, outline: false }); }
  }
  k.ball(BR, 0.1, LX, 3.05, LZ, { seg: 6, ring: 5 }); k.cone(BR, 0.05, 0.25, LX, 3.1, LZ, { seg: 4 });
  const g = k.finish({ lean: 0.01 });
  g.name = 'templeShrine';
  g.userData = { footprint: 2.6, height: 4.4, size: [3.6, 3.6, 4.4], colliders: [{ x: 0, z: -0.55, radius: 1.5, height: 6 }, { x: 1.5, z: 1.75, radius: 0.35, height: 3 }] };
  return g;
}

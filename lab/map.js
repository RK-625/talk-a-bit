// Dev-only: top-down azimuthal-equidistant map of the Mumbai world (coast, roads, landmarks) from layout data.
// ?cx=0&cz=0 (polar d,b of the map centre) &zoom=2 (px per unit) &side=0|1 (0 = north cap around spawn, 1 = recentre on a polar point)
import * as THREE from 'three';
import * as geo from '/src/worlds/mumbai/geo.js';
let layout = null;
try { layout = await import('/src/worlds/mumbai/layout.js'); layout.resolveAll(); } catch (e) { console.warn('no layout yet', e.message); }
const q = new URLSearchParams(location.search);
const cd = parseFloat(q.get('d') ?? 0), cb = parseFloat(q.get('b') ?? 0), zoom = parseFloat(q.get('zoom') ?? 2.2);
const c = document.getElementById('c'); c.width = innerWidth; c.height = innerHeight;
const ctx = c.getContext('2d');
const centre = geo.polar(cd, cb);
// local frame at the centre: up = centre, north = toward the pole (or +Z when at the pole)
const north = cd < 0.01 ? new THREE.Vector3(0, 0, 1) : geo.tangentTo(centre, new THREE.Vector3(0, 1, 0));
const east = new THREE.Vector3().crossVectors(north, centre).normalize(); // right of north
const half = Math.max(c.width, c.height) / zoom;
function toMap(dir) { // -> pixel
  const a = Math.acos(THREE.MathUtils.clamp(dir.dot(centre), -1, 1));
  if (a < 1e-6) return [c.width / 2, c.height / 2, 0];
  const t = dir.clone().addScaledVector(centre, -dir.dot(centre)).normalize();
  const x = t.dot(east), y = t.dot(north);
  const d = a * geo.R;
  return [c.width / 2 + x * d * zoom, c.height / 2 - y * d * zoom, d];
}
const img = ctx.createImageData(c.width, c.height);
const dir = new THREE.Vector3();
for (let py = 0; py < c.height; py++) for (let px = 0; px < c.width; px++) {
  const x = (px - c.width / 2) / zoom, y = -(py - c.height / 2) / zoom;
  const d = Math.hypot(x, y);
  let col;
  if (d > geo.R * Math.PI) col = [34, 34, 34];
  else {
    const a = d / geo.R;
    const t = east.clone().multiplyScalar(x / (d || 1)).addScaledVector(north, y / (d || 1));
    dir.copy(centre).multiplyScalar(Math.cos(a)).addScaledVector(t, Math.sin(a));
    const s = geo.seaField(dir);
    col = s > 0 ? [150, 205, 225] : s > -2 ? [240, 220, 160] : [226, 206, 170];
  }
  const i = (py * c.width + px) * 4; img.data[i] = col[0]; img.data[i + 1] = col[1]; img.data[i + 2] = col[2]; img.data[i + 3] = 255;
}
ctx.putImageData(img, 0, 0);
function poly(path, color, w) {
  ctx.strokeStyle = color; ctx.lineWidth = w * zoom; ctx.lineCap = 'round'; ctx.beginPath();
  path.samples.forEach((s, i) => { const [x, y] = toMap(s.dir); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
  if (path.closed) ctx.closePath();
  ctx.stroke();
}
for (const p of Object.values(geo.PATHS)) poly(p, p.kind === 'rail' ? '#7a3b3b' : p.kind === 'lane' ? '#c8704a' : p.kind === 'promenade' ? '#fff' : '#555', p.kind === 'rail' ? 1.2 : p.w);
// graticule: rings every 25 units from the spawn
ctx.strokeStyle = '#0003'; ctx.lineWidth = 1;
for (let d = 25; d < 235; d += 25) { ctx.beginPath(); for (let b = 0; b <= 360; b += 4) { const [x, y] = toMap(geo.polar(d, b)); b ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
ctx.fillStyle = '#000'; ctx.font = '11px monospace';
const mark = (dir, label, color = '#c00', r = 4) => { const [x, y] = toMap(dir); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.fillStyle = '#000'; ctx.fillText(label, x + 6, y + 3); };
mark(geo.polar(0, 0), 'SPAWN', '#00c', 6);
if (layout) {
  for (const it of layout.PLACED ?? []) {
    const r = it.radius ?? 2;
    const [x, y] = toMap(it.dir);
    ctx.save(); ctx.translate(x, y); ctx.strokeStyle = it.major ? '#a00' : '#06a'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, 0, Math.max(1.5, r * zoom), 0, 7); ctx.stroke();
    // facing tick
    const f = it.fwd; const [fx, fy] = toMap(geo.stepAlong(it.dir, f, Math.max(r, 2))); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(fx - x, fy - y); ctx.stroke();
    ctx.restore();
    if (it.major || zoom > 5) { ctx.fillStyle = '#000'; ctx.fillText(it.id, x + 4, y - 4); }
  }
}
mark(geo.BRIDGE.start, 'bridge A', '#808', 3); mark(geo.BRIDGE.end, 'bridge B', '#808', 3);
document.getElementById('i').textContent = `centre d=${cd} b=${cb} zoom=${zoom}  |  sea fraction ~ ${(() => { let n = 0, m = 0; const r = (() => { let a = 7; return () => (a = (a * 16807) % 2147483647) / 2147483647; })(); for (let i = 0; i < 6000; i++) { const z = r() * 2 - 1, th = r() * 6.283, rr = Math.sqrt(1 - z * z); dir.set(rr * Math.cos(th), z, rr * Math.sin(th)); m++; if (geo.seaField(dir) > -0.7) n++; } return (n / m * 100).toFixed(1) + '%'; })()}`;

/**
 * home/home.js: the Talk-a-bit home page, shown when there is no (valid) ?world=. One card per world, each with an
 * inline-SVG landmark drawing (no image files), plus a warm call-to-action tag beneath. Cards are real links to ?world=<id>.
 *   mountHome()  builds the page into <body>, loads the Google fonts and sets the title.
 * To add a world: add an entry to WORLDS below (and to the registry in src/main.js).
 */
import './home.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Patrick+Hand&family=Kalam:wght@400;700&family=Tiro+Devanagari+Hindi&family=Baloo+Tamma+2:wght@400;600&family=Baloo+Thambi+2:wght@400;600&family=Baloo+Tammudu+2:wght@400;600&family=Baloo+Chettan+2:wght@400;600&display=swap';
const INK = '#2b2a33';

// ---- landmark drawings: storybook gouache, viewBox 640x380 (same 320:190 box). Gradients/shading, thin tonal lines, no heavy outlines.
// Ids are prefixed per card (mum-, del-, ...) because every SVG shares one page. The paper grain is one shared CSS overlay (.art::after).
const rng = (seed) => { let a = seed | 0; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const f = (v) => Math.round(v * 10) / 10;
const R = (x, y, w, h, fill, x2 = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${x2}/>`;
const P = (d, fill, x2 = '') => `<path d="${d}" fill="${fill}" ${x2}/>`;
const L = (d, c, w = 1, o = 1, x2 = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}" ${x2}/>`;
const C = (x, y, r, fill, x2 = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${x2}/>`;
const E = (x, y, rx, ry, fill, x2 = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${x2}/>`;
const G = (body, attrs = '') => `<g ${attrs}>${body}</g>`;
const at = (x, y, s, body, x2 = '') => `<g transform="translate(${x} ${y}) scale(${s})" ${x2}>${body}</g>`;
const stops = (st) => st.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('');
const lin = (id, st, d = [0, 0, 0, 1]) => `<linearGradient id="${id}" x1="${d[0]}" y1="${d[1]}" x2="${d[2]}" y2="${d[3]}">${stops(st)}</linearGradient>`;
const rad = (id, cx, cy, r, st) => `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${r}">${stops(st)}</radialGradient>`;
const SVG = (defs, body) => `<svg viewBox="0 0 640 380" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${body}</svg>`;
const mirror = (body, y, o = 0.3) => `<g transform="matrix(1 0 0 -1 0 ${2 * y})" opacity="${o}">${body}</g>`;

// soft cloud: shadowed underside, lit lobes
const puff = (x, y, w, hi, lo, o = 1) => `<g opacity="${o}">${E(x, y + w * 0.07, w * 0.5, w * 0.09, lo)}${E(x - w * 0.18, y - w * 0.02, w * 0.2, w * 0.13, hi)}${E(x + w * 0.04, y - w * 0.09, w * 0.26, w * 0.19, hi)}${E(x + w * 0.27, y - w * 0.01, w * 0.18, w * 0.11, hi)}${E(x + w * 0.02, y + w * 0.01, w * 0.47, w * 0.075, hi)}</g>`;
// long sunset streak
const streak = (x, y, w, c, o = 0.6) => P(`M${x - w} ${y}Q${x} ${f(y - w * 0.07)} ${x + w} ${y}Q${x} ${f(y + w * 0.03)} ${x - w} ${y}Z`, c, `opacity="${o}"`);
// gliding bird (V) and soaring kite silhouette
const bird = (x, y, s = 1, c = '#4a3b4f', w = 1.2) => L(`M${f(x - 6 * s)} ${f(y - s)}Q${f(x - 3 * s)} ${f(y - 5 * s)} ${x} ${y}Q${f(x + 3 * s)} ${f(y - 5 * s)} ${f(x + 6 * s)} ${f(y - s)}`, c, w);
const kite = (x, y, s, c, r = 0) => at(x, y, s, P('M-11 0Q-5-4.5 0-1.2Q5-4.5 11 0Q5-1.4 2.4 1.6L3.4 4.6 0 3-3.4 4.6-2.4 1.6Q-5-1.4-11 0Z', c), `transform-origin="0 0" ${r ? `style="rotate:${r}deg"` : ''}`);
// tiny person, feet at (x, y); `s` scales (1 = ~14 units tall)
const person = (x, y, s, c, o = {}) => at(x, y, s, `${E(0, 0.5, 4.5, 1.3, '#2a2030', 'opacity=".22"')}${L('M-1.3-6V0M1.3-6V0', o.legs || c, 1.7)}<rect x="-2.7" y="-12.2" width="5.4" height="7.2" rx="2.4" fill="${c}"/>${o.arm ? L('M2.4-10.5l2.4 4', c, 1.4) : ''}${C(0, -14.6, 2.3, o.skin || '#bf8760')}${P('M-2.4-14.8Q0-18.4 2.4-14.8Q0-16.2-2.4-14.8Z', o.hair || '#2d2228')}${o.hat ? P('M-3.6-15.6h7.2l-1-2h-5.2z', o.hat) : ''}`);
// round foliage cluster in three tones (dark base, mid, sunlit highlights toward the light)
const bush = (x, y, r, seed, [dk, md, lt], n = 10, lx = 1, accent = null) => {
  const q = rng(seed); const pts = [];
  for (let i = 0; i < n; i++) { const a = q() * 6.283, d = Math.sqrt(q()) * r * 0.62; pts.push([x + Math.cos(a) * d, y + Math.sin(a) * d * 0.72, r * (0.3 + q() * 0.22)]); }
  let s = pts.map(([a, b, c]) => C(f(a), f(b), f(c), dk)).join('');
  s += pts.map(([a, b, c]) => C(f(a + lx * c * 0.16), f(b - c * 0.18), f(c * 0.84), md)).join('');
  s += pts.filter((_, i) => i % 2 === 0).map(([a, b, c]) => C(f(a + lx * c * 0.3), f(b - c * 0.4), f(c * 0.46), lt)).join('');
  if (accent) s += pts.map(([a, b, c], i) => (i % 2 ? C(f(a + lx * c * 0.2), f(b - c * 0.25), f(c * 0.34), accent) : '')).join('');
  return s;
};
// coconut palm: tapering curved trunk with rings, arching fronds
const palm = (x, y, h, lean, seed, trunk, dk, lt, n = 9) => {
  const q = rng(seed), tx = x + lean, ty = y - h, cx = x + lean * 0.1, cy = y - h * 0.55;
  let s = P(`M${x - 3} ${y}Q${cx - 2} ${cy} ${tx - 1.3} ${ty}L${tx + 1.3} ${ty}Q${cx + 2.4} ${cy} ${x + 3} ${y}Z`, trunk);
  s += L(`M${x} ${y}Q${cx} ${cy} ${tx} ${ty}`, '#2a1d22', 2.6, 0.28, 'stroke-dasharray="1.2 3.2"');
  for (let k = 0; k < n; k++) {
    const a = -Math.PI + 0.12 + (k / (n - 1)) * (Math.PI - 0.24) + (q() - 0.5) * 0.2, l = h * (0.34 + q() * 0.1) + 8;
    const mx = tx + Math.cos(a) * l * 0.55, my = ty + Math.sin(a) * l * 0.5 - l * 0.2, ex = tx + Math.cos(a) * l, ey = ty + Math.sin(a) * l * 0.5 + l * 0.3;
    s += P(`M${tx} ${ty}Q${f(mx)} ${f(my)} ${f(ex)} ${f(ey)}Q${f(mx + 1)} ${f(my + l * 0.2)} ${tx} ${ty}Z`, k % 2 ? dk : lt);
  }
  return s + C(tx - 1.5, ty + 2, 2.2, '#6b4a2e') + C(tx + 1.8, ty + 2.4, 2, '#6b4a2e');
};
// scattered ripple dashes (longer toward the viewer)
const ripples = (x, y, w, h, c, n, seed, o = 0.5) => { const q = rng(seed); let d = ''; for (let i = 0; i < n; i++) { const yy = y + q() * h, len = 5 + ((yy - y) / h) * 20 * q() + q() * 6; d += `M${f(x + q() * w)} ${f(yy)}h${f(len)}`; } return L(d, c, 0.9, o); };
// hazy skyline: random blocks, a few domes/spires
const skyline = (seed, x0, x1, base, hmin, hmax, fill, o = 1, wmax = 22) => {
  const q = rng(seed); let s = '', x = x0;
  while (x < x1) { const w = 8 + q() * wmax, h = hmin + q() * (hmax - hmin); s += R(f(x), f(base - h), f(w), f(h + 2), fill); if (q() < 0.25) s += P(`M${f(x + 1)} ${f(base - h)}a${f(w / 2 - 1)} ${f(w / 2)} 0 0 1 ${f(w - 2)} 0z`, fill); else if (q() < 0.2) s += L(`M${f(x + w / 2)} ${f(base - h)}v-7`, fill, 1); x += w + q() * 3; }
  return G(s, `opacity="${o}"`);
};
// rolling hills ridge
const ridge = (seed, y, amp, fill, step = 70, o = 1) => { const q = rng(seed); let d = `M-10 380V${f(y)}`; for (let x = -10; x < 650; x += step) d += `Q${x + step / 2} ${f(y - q() * amp)} ${x + step} ${f(y - q() * amp * 0.45)}`; return P(`${d}V380Z`, fill, `opacity="${o}"`); };
// masonry courses with staggered joints (call inside a clip group)
const courses = (x, y, w, h, step, c, o = 0.12, seed = 1, jw = 14) => { const q = rng(seed); let d = '', r = 0; for (let yy = y; yy < y + h; yy += step, r++) { d += `M${x} ${f(yy)}h${w}`; for (let xx = x + (r % 2 ? jw / 2 : 0) + q() * 4; xx < x + w; xx += jw + q() * 5) d += `M${f(xx)} ${f(yy)}v${step}`; } return L(d, c, 0.6, o); };

// Mumbai: Gateway of India at sunset on the harbour, ferries, gulls, the Taj hotel in haze.
const mumbai = () => {
  const k = 'mum', FRONT = 'M160 268V148H235V104H365V148H440V268ZM277 268V200A23 17 0 0 1 323 200V268Z';
  const defs = lin(`${k}-sky`, [[0, '#5a67a3'], [0.3, '#b48cb0'], [0.58, '#f0a38a'], [0.8, '#fbc78f'], [1, '#fde4b0']])
    + rad(`${k}-halo`, 470, 214, 200, [[0, '#ffe5a8', 0.95], [0.22, '#ffc182', 0.55], [0.6, '#f79b78', 0.16], [1, '#f79b78', 0]])
    + lin(`${k}-sea`, [[0, '#f2ae88'], [0.1, '#cc8d98'], [0.3, '#5f7d9c'], [1, '#233f58']])
    + lin(`${k}-st`, [[0, '#b4904f'], [0.5, '#d2ad66'], [1, '#e8c982']], [0, 0, 1, 0])
    + lin(`${k}-shade`, [[0, '#3b2a3d', 0.5], [0.45, '#3b2a3d', 0.1], [1, '#3b2a3d', 0]], [0, 0, 1, 0])
    + lin(`${k}-quay`, [[0, '#e6caa0'], [1, '#c9a778']])
    + lin(`${k}-glit`, [[0, '#ffd88e', 0.6], [1, '#ffb070', 0]])
    + lin(`${k}-hz`, [[0, '#fde4b0', 0], [0.5, '#fde4b0', 0.7], [1, '#fde4b0', 0]])
    + `<clipPath id="${k}-front"><path clip-rule="evenodd" d="${FRONT}"/></clipPath>`;
  const ST = '#5b432b', HI = '#f3d99a';
  // sky, sun, clouds, gulls
  let b = R(0, 0, 640, 242, `url(#${k}-sky)`) + C(470, 214, 200, `url(#${k}-halo)`) + C(470, 214, 21, '#fff0c2') + C(470, 214, 21, 'none', 'stroke="#ffd58a" stroke-width="3" opacity=".5"')
    + streak(150, 70, 120, '#f7b3b0', 0.45) + streak(560, 56, 90, '#f9c4a4', 0.5) + streak(300, 132, 150, '#f6b49a', 0.5) + streak(520, 160, 110, '#ffd29a', 0.65) + streak(90, 168, 90, '#f6c0a0', 0.5)
    + puff(396, 98, 110, '#f6b6b4', '#b888b0', 0.7) + puff(60, 112, 90, '#f1a9a8', '#a97fae', 0.6);
  // hazy Taj hotel (left) and far hills/ships (right)
  b += R(0, 226, 640, 16, `url(#${k}-hz)`);
  b += G(R(14, 213, 118, 26, '#a98aa8') + P('M62 213Q62 188 80 186Q98 188 98 213Z', '#a98aa8') + L('M80 186v-9', '#a98aa8', 1.4) + P('M20 213Q20 200 28 198Q36 200 36 213Z M112 213Q112 200 120 198Q128 200 128 213Z', '#a98aa8') + R(110, 196, 30, 44, '#a68ba7') + P('M112 196Q125 180 138 196Z', '#a68ba7') + R(40, 203, 14, 10, '#a98aa8'), 'opacity=".55"')
    + ridge(4, 240, 18, '#b99cae', 60, 0.45).replace('V380Z', 'V242Z') + R(300, 232, 38, 5, '#b49aaa', 'opacity=".5"') + R(306, 226, 10, 7, '#b49aaa', 'opacity=".5"');
  // sea + sunset path
  b += R(0, 234, 640, 146, `url(#${k}-sea)`) + [0, 1, 2, 3].map((i) => P(`M${456 + i * 4} 234H${484 - i * 4}L${560 - i * 26} 380H${380 + i * 26}Z`, `url(#${k}-glit)`, 'opacity=".55"')).join('');
  const q = rng(7); let gl = ''; for (let i = 0; i < 80; i++) { const y = 236 + q() * q() * 144, sp = 14 + (y - 234) * 0.45; gl += `M${f(470 + (q() - 0.5) * sp * 2)} ${f(y)}h${f(3 + (y - 234) * 0.07 * q() + q() * 5)}`; }
  b += L(gl, '#ffe6b0', 1.2, 0.8) + ripples(0, 240, 640, 140, '#9fb5cd', 60, 3, 0.35);
  // far ferry + a dhow sail on the horizon
  const ferry = (c1) => `${P('M-58-2Q-60-12-52-14H54Q62-12 60-2Q54 4 40 4H-40Q-54 4-58-2Z', '#f6ecd6')}${R(-58, -3, 118, 3.5, '#2b5a70')}${R(-58, -8, 118, 3, c1)}${R(-48, -27, 96, 13, '#f0dfc0')}${R(-48, -27, 96, 13, `url(#${k}-shade)`, 'opacity=".6"')}${Array.from({ length: 12 }, (_, i) => R(-44 + i * 7.6, -23, 4.6, 5.5, i % 4 === 1 ? '#ffd98a' : '#4c6c86')).join('')}${R(-52, -30, 104, 4, c1)}${R(-38, -41, 76, 11, '#f3e4c8')}${Array.from({ length: 9 }, (_, i) => R(-34 + i * 8, -38, 5, 5, i % 3 === 1 ? '#ffd98a' : '#4c6c86')).join('')}${R(-40, -44, 80, 3.5, c1)}${R(-5, -56, 9, 12, '#2f5068')}${R(-5, -52, 9, 2.4, '#f2b04e')}${L('M30-44V-64', '#5a4a50', 1.2)}${P('M30-64h13v2.8H30z', '#f59a3a')}${P('M30-61.2h13v2.8H30z', '#fff6e6')}${P('M30-58.4h13v2.8H30z', '#4fa36c')}${L('M-50-14.5H50M-50-30.5H-38', '#8a6a5a', 0.8, 0.8)}`;
  b += G(at(585, 252, 0.42, ferry('#e46f3f')), 'opacity=".8"') + G(L('M500 243l8 0M504 242V230l8 12z', '#fbe8c8', 1) + P('M504 241V229l8 12z', '#fdecd0'), 'opacity=".75"');
  // quay: cast shadow, top, wall
  b += P('M-10 268H156L96 284H-10Z', '#3b2a3d', 'opacity=".3"') + P('M-10 268H466L500 282V301H-10Z', `url(#${k}-quay)`) + P('M-10 284H500V301H-10Z', '#a98760') + R(-10, 284, 510, 2.4, '#ecd3a4', 'opacity=".7"')
    + G(courses(-10, 286, 510, 15, 5, '#5b432b', 0.18, 5, 18), '') + R(-10, 299, 510, 3, '#2d2440', 'opacity=".35"') + L('M-10 268.4H468', HI, 1, 0.8);
  // Gateway of India: dome behind, front face with the great arch, details clipped to the face, then turrets
  b += P('M277 106Q277 84 300 80Q323 84 323 106Z', '#cfae70') + P('M300 80Q313 86 314 106H300Z', '#e6c885', 'opacity=".6"') + L('M283 104Q287 88 300 80M292 104Q295 90 300 80', '#8a6b41', 0.7, 0.5) + R(296, 70, 8, 11, '#cfae70') + C(300, 69, 2.2, '#cfae70') + L('M300 66v-9', '#7a5d38', 1.2);
  b += P(FRONT, `url(#${k}-st)`, 'fill-rule="evenodd"');
  const win = (cx) => `${P(`M${cx - 14.5} 232V208Q${cx - 14.5} 197 ${cx} 197Q${cx + 14.5} 197 ${cx + 14.5} 208V232Z`, '#6b5033', 'opacity=".85"')}${L(`M${cx - 7.5} 200V232M${cx} 198V232M${cx + 7.5} 200V232M${cx - 14} 212H${cx + 14}M${cx - 14} 222H${cx + 14}`, '#dcbb7a', 0.7, 0.55)}${L(`M${cx - 15.5} 232V208Q${cx - 15.5} 195 ${cx} 195Q${cx + 15.5} 195 ${cx + 15.5} 208V232`, HI, 1, 0.75)}${P(`M${cx - 8.5} 268V247Q${cx - 8.5} 239 ${cx} 239Q${cx + 8.5} 239 ${cx + 8.5} 247V268Z`, '#3d2c20')}${L(`M${cx - 10} 268V247Q${cx - 10} 237 ${cx} 237Q${cx + 10} 237 ${cx + 10} 247V268`, '#7a5d38', 1, 0.6)}`;
  let cols = ''; for (let x = 264; x <= 336; x += 9) cols += `M${x} 135V146`;
  b += G(courses(160, 104, 280, 164, 6, ST, 0.1, 11, 16) + R(156, 100, 290, 172, `url(#${k}-shade)`)
    + R(150, 140, 100, 8, '#a98750') + R(350, 140, 100, 8, '#a98750') + L('M156 140.6H244M356 140.6H444', HI, 1, 0.9)
    + R(160, 153, 75, 9, '#8e6f45', 'opacity=".45"') + R(365, 153, 75, 9, '#8e6f45', 'opacity=".45"') + L('M164 157.5H232M368 157.5H436', '#4b3721', 6, 0.35, 'stroke-dasharray="1.6 2.6"')
    + R(156, 172, 84, 5, '#b08e53') + R(360, 172, 84, 5, '#b08e53') + L('M158 181H238M362 181H442', ST, 3, 0.5, 'stroke-dasharray="2 2.6"') + L('M156 172.5H240M360 172.5H444', HI, 0.8, 0.9)
    + win(213.5) + win(386.5)
    + R(233, 100, 134, 9, '#a98750') + L('M233 100.6H367', HI, 1, 1) + L('M236 106H364', ST, 3, 0.5, 'stroke-dasharray="3 3"')
    + R(262, 113, 76, 17, '#8e6f45', 'opacity=".5"') + L('M268 118.5H332M270 123H330M273 127H327', ST, 1.2, 0.5)
    + R(236, 134, 128, 12, '#8a6b41', 'opacity=".4"') + L(cols, ST, 2.2, 0.65) + L('M262 135.5H338', HI, 0.8, 0.7) + R(232, 146, 136, 5, '#a98750') + L('M232 146.5H368', HI, 0.8, 0.9)
    + L('M242 152V268M268 152V268M332 152V268M358 152V268', '#7a5d38', 0.8, 0.45)
    + L('M270 268V200A30 24 0 0 1 330 200V268', ST, 1.3, 0.7) + L('M268.5 268V200A31.5 25 0 0 1 331.5 200V268', HI, 0.7, 0.55)
    + P('M312 268V200.5A23 17 0 0 1 323 200V268Z', '#5a4128', 'opacity=".55"') + P('M277 200A23 17 0 0 1 323 200A23 17 0 0 0 277 200Z', '#3b2a3d', 'opacity=".25"'), `clip-path="url(#${k}-front)"`);
  const tur = (cx) => `${R(cx - 12, 76, 24, 72, `url(#${k}-st)`)}${R(cx - 12, 76, 24, 72, `url(#${k}-shade)`)}${R(cx - 14, 71, 28, 6, '#a98750')}${R(cx - 14, 110, 28, 4.5, '#a98750')}${R(cx - 14, 134, 28, 4, '#a98750')}${P(`M${cx - 5} 100V92Q${cx} 86 ${cx + 5} 92V100Z`, '#3d2c20')}${P(`M${cx - 5} 124V117Q${cx} 112 ${cx + 5} 117V124Z`, '#4a3626')}${L(`M${cx - 6} 94V100M${cx + 6} 94V100`, HI, 0.8, 0.5)}${P(`M${cx - 13} 71Q${cx - 12} 64 ${cx - 6} 60Q${cx - 2} 56 ${cx} 50Q${cx + 2} 56 ${cx + 6} 60Q${cx + 12} 64 ${cx + 13} 71Z`, '#d2ad66')}${P(`M${cx} 50Q${cx + 2} 56 ${cx + 6} 60Q${cx + 12} 64 ${cx + 13} 71H${cx}Z`, '#e8c982', 'opacity=".55"')}${L(`M${cx} 51V71M${cx - 6} 61Q${cx - 5} 67 ${cx - 7} 71M${cx + 6} 61Q${cx + 5} 67 ${cx + 7} 71`, '#7a5d38', 0.8, 0.55)}${C(cx, 48.5, 1.8, '#d2ad66')}${L(`M${cx} 47V41`, '#7a5d38', 1.1)}${L(`M${cx - 12} 76V148`, '#3b2a3d', 3, 0.25)}${L(`M${cx - 14} 71.5H${cx + 14}`, HI, 0.8, 0.9)}`;
  b += tur(250) + tur(350);
  // lamp posts, people on the quay
  const lamp = (x) => L(`M${x} 270V240`, '#3a2b3d', 1.6) + L(`M${x - 6} 246Q${x} 252 ${x + 6} 246M${x} 240v-5`, '#3a2b3d', 1.2) + C(x, 233, 2.6, '#ffe2a0') + C(x - 6, 244, 2, '#ffe2a0') + C(x + 6, 244, 2, '#ffe2a0') + C(x, 238, 11, '#ffd58a', 'opacity=".22"');
  b += lamp(112) + lamp(482) + person(236, 280, 1.15, '#c6564a') + person(247, 281, 1.0, '#f1e6d6') + person(258, 279, 0.6, '#e9c56a') + person(344, 281, 1.1, '#3f6e86') + person(358, 280, 1.0, '#8a5aa0', { arm: 1 }) + person(398, 282, 1.15, '#f1e6d6') + person(421, 280, 1.0, '#c6564a') + person(60, 283, 1.15, '#e9c56a') + person(74, 282, 1.05, '#3f6e86')
    + person(190, 283, 1.1, '#6b8e5a') + person(444, 283, 1.0, '#e9c56a', { hat: '#f1e6d6' });
  // main ferry + reflection, gulls near the water
  const waterTop = 308, fx = 540, fy = 330;
  b += mirror(at(fx, fy, 1.05, ferry('#e46f3f')), fy, 0.28) + ripples(470, fy, 140, 40, '#2b4e6a', 26, 9, 0.5) + at(fx, fy, 1.05, ferry('#e46f3f')) + ripples(480, fy - 1, 120, 6, '#fff2d0', 7, 4, 0.7);
  // foreground dhow: lateen sail, hull, reflection
  const dhow = `${P('M-52-10Q-48 6-14 8H30Q54 6 60-17Q38-6 4-8Q-28-9-52-10Z', '#5a392c')}${L('M-48-9Q-30-7 4-7Q40-5 58-16', '#e3b574', 1.2, 0.9)}${L('M0-8V-74', '#3a2a22', 1.8)}${P('M1-72L-36-12H24Z', '#f4e2c0')}${P('M1-72L24-12H8Z', '#d9b88f', 'opacity=".65"')}${P('M3-62L44-14H6Z', '#f0a06a')}${L('M3-62L44-14', '#e1824f', 0.8)}${L('M-14-40Q-10-30-12-14M-3-50V-12', '#c9a27a', 0.6, 0.7)}${person(-26, -5, 0.9, '#c6564a')}`;
  b += mirror(at(120, 354, 1.05, dhow), 354, 0.26) + ripples(50, 354, 150, 26, '#18304a', 22, 13, 0.55) + at(120, 354, 1.05, dhow) + ripples(60, 352, 130, 6, '#ffd9a0', 8, 21, 0.6);
  // gulls
  b += [[366, 120, 1.3], [392, 108, 1], [410, 132, 1.1], [330, 86, 0.9], [596, 112, 1.2], [575, 96, 0.9], [220, 98, 1], [520, 170, 0.8], [300, 330, 1], [330, 316, 0.8]].map(([x, y, s], i) => bird(x, y, s, i % 3 === 0 ? '#6a4a5c' : '#fff3e2', 1.3)).join('');
  return SVG(defs, b);
};

// Delhi: India Gate on a hazy morning, the avenue and canals in perspective, the canopy far behind, kites and strollers.
const delhi = () => {
  const k = 'del', VX = 300, HZ = 262;
  const FRONT = 'M202 300L211 144H199V127H213V102H222V88H240V76H262V69H338V76H360V88H378V102H387V127H401V144H389L398 300ZM273 300V203A27 27 0 0 1 327 203V300Z';
  const defs = lin(`${k}-sky`, [[0, '#f3c79b'], [0.55, '#fadcb7'], [1, '#fff0d6']])
    + rad(`${k}-halo`, 480, 84, 190, [[0, '#fff6d6', 0.95], [0.3, '#ffe6b8', 0.5], [1, '#ffe6b8', 0]])
    + lin(`${k}-lawn`, [[0, '#c7d597'], [0.4, '#9db96b'], [1, '#73994a']])
    + lin(`${k}-road`, [[0, '#ecd2a8'], [1, '#d3a574']])
    + lin(`${k}-water`, [[0, '#f7e3c4'], [1, '#a9c4cf']])
    + lin(`${k}-st`, [[0, '#cf935f'], [0.55, '#e0a874'], [1, '#efc08d']], [0, 0, 1, 0])
    + lin(`${k}-shade`, [[0, '#5a3426', 0.5], [0.5, '#5a3426', 0.12], [1, '#5a3426', 0]], [0, 0, 1, 0])
    + lin(`${k}-ov`, [[0, '#5a3426', 0.35], [1, '#5a3426', 0]])
    + `<clipPath id="${k}-front"><path clip-rule="evenodd" d="${FRONT}"/></clipPath>`;
  const rx = (a, y) => f(VX + (a * (y - HZ)) / 38);
  const ST = '#74442a', HI = '#f6d3a2';
  // sky, glowing sun, haze, kites
  let b = R(0, 0, 640, 272, `url(#${k}-sky)`) + C(480, 84, 190, `url(#${k}-halo)`) + C(480, 84, 22, '#fff7da', 'opacity=".95"')
    + puff(120, 128, 120, '#fff1de', '#f0cfae', 0.8) + puff(540, 160, 100, '#fff1de', '#f0cfae', 0.75) + streak(330, 60, 140, '#fff0d6', 0.7) + streak(90, 200, 100, '#fff3dc', 0.7);
  const pk = (x, y, c1, c2, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">${P('M0-10L7 0L0 12L-7 0Z', c1)}${P('M0-10L7 0H0Z M0 12L-7 0H0Z', c2, 'opacity=".9"')}${L('M0-10V12M-7 0H7', '#7a4a3a', 0.6, 0.7)}${L('M0 12q-4 5 0 9t0 9t0 8', '#7a4a3a', 0.8)}${P('M-2 17h4l-2 2zM-2 26h4l-2 2z', c1)}</g>`;
  b += pk(520, 142, '#e0607a', '#f5b6a0', 18) + pk(150, 112, '#4fa3a5', '#f2d27a', -14) + L('M432 322Q480 230 521 153', '#7a5a4a', 0.6, 0.7);
  // far haze: tree line and a faint Rashtrapati Bhavan dome behind the avenue
  b += R(0, 258, 640, 6, '#d6d8b0', 'opacity=".7"');
  const hz = ['#b9c795', '#c9d3a6', '#dbe0bb'];
  for (let x = -10; x < 660; x += 30) if (x < 150 || x > 440) b += bush(x, 266 + ((x * 7) % 5), 22 + ((x * 3) % 9), x + 3, hz, 6, 1);
  b += G(R(120, 252, 90, 12, '#d6c3a0') + P('M150 252Q150 236 165 234Q180 236 180 252Z', '#d6c3a0') + R(224, 256, 42, 8, '#d6c3a0'), 'opacity=".5"');
  // ground: lawn with mown bands, canals and the avenue converging on the arch
  b += R(0, HZ, 640, 118, `url(#${k}-lawn)`);
  const yb = [262, 266, 272, 281, 293, 310, 332, 360, 380]; for (let i = 0; i < yb.length - 1; i += 2) b += R(0, yb[i], 640, yb[i + 1] - yb[i], '#5f8a3d', 'opacity=".13"');
  const strip = (a1, a2, fill, x2 = '') => P(`M${VX} ${HZ}L${rx(a2, 380)} 380L${rx(a1, 380)} 380Z`, fill, x2);
  b += strip(-46, 46, `url(#${k}-road)`) + strip(-64, -49, `url(#${k}-water)`) + strip(49, 64, `url(#${k}-water)`) + strip(-49, -46, '#c99a6c') + strip(46, 49, '#c99a6c') + strip(-66, -64, '#c99a6c') + strip(64, 66, '#c99a6c')
    + L(`M${VX} ${HZ}L${rx(-12, 380)} 380M${VX} ${HZ}L${rx(12, 380)} 380`, '#f2dcb6', 1, 0.5, 'stroke-dasharray="6 5"');
  // canopy (chhatri) framed by the arch, avenue trees in haze
  b += G(R(293, 257, 14, 5, '#e6c9a2') + R(294.5, 249, 1.8, 8, '#e6c9a2') + R(297.2, 249, 1.8, 8, '#e6c9a2') + R(300.8, 249, 1.8, 8, '#e6c9a2') + R(303.6, 249, 1.8, 8, '#e6c9a2') + P('M292 249Q300 238 308 249Z', '#e9cfa8') + L('M300 238v-4', '#d7b78e', 1) + L('M285 262V248M315 262V248', '#c9b090', 1), 'opacity=".9"')
    + L('M285 248h6l-1 4h-5zM309 248h6l-1 4h-5z', '#d87a5a', 1.2, 0.5);
  // India Gate: attic with stepped corners, bowl, cornice, great arch, roundels, panels
  b += P(`M${VX - 100} 300L${VX + 98} 300L${VX + 30} 336L${VX - 160} 336Z`, '#5a3a5a', 'opacity=".14"');
  b += P(FRONT, `url(#${k}-st)`, 'fill-rule="evenodd"');
  let fan = ''; for (let x = 210; x < 392; x += 9) fan += `M${x} 143.5a3.6 3.6 0 0 1 7.2 0`;
  b += G(courses(199, 69, 202, 232, 5.6, ST, 0.15, 3, 12) + R(196, 62, 210, 240, `url(#${k}-shade)`)
    + R(199, 127, 202, 17, '#c88c5a', 'opacity=".55"') + L(fan, ST, 1, 0.55) + L('M199 127.6H401', HI, 1.1, 0.95) + R(203, 144, 194, 7, `url(#${k}-ov)`) + L('M205 133.5H395', ST, 3, 0.4, 'stroke-dasharray="1.5 2.5"')
    + L('M222 102.6H378M240 88.6H360M262 76.6H338', HI, 0.9, 0.8)
    + `<text x="300" y="98" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="8.5" letter-spacing="2" fill="#6b3f26" opacity=".72">INDIA</text>`
    + C(263, 92, 6.4, '#bf8458', 'opacity=".6"') + C(263, 92, 4.2, 'none', `stroke="${ST}" stroke-width=".8" opacity=".55"`) + C(337, 92, 6.4, '#bf8458', 'opacity=".6"') + C(337, 92, 4.2, 'none', `stroke="${ST}" stroke-width=".8" opacity=".55"`)
    + L('M233 107h134M229 112h142M233 117h134M241 122h118', ST, 1, 0.38, 'stroke-dasharray="3 1.4 6 1.6"')
    + C(235, 160, 9.5, '#c88c5a', 'opacity=".6"') + C(235, 160, 6.5, 'none', `stroke="${ST}" stroke-width=".9" opacity=".6"`) + C(365, 160, 9.5, '#c88c5a', 'opacity=".6"') + C(365, 160, 6.5, 'none', `stroke="${ST}" stroke-width=".9" opacity=".6"`)
    + L('M229 160h12M235 154v12M359 160h12M365 154v12', ST, 0.6, 0.4)
    + R(218, 174, 34, 36, '#a86a40', 'opacity=".28"') + R(221, 177, 28, 30, 'none', `stroke="${ST}" stroke-width=".8" opacity=".5"`) + R(348, 174, 34, 36, '#a86a40', 'opacity=".28"') + R(351, 177, 28, 30, 'none', `stroke="${ST}" stroke-width=".8" opacity=".5"`)
    + R(201, 217, 198, 6, '#c98d5b') + L('M201 217.6H399', HI, 0.9, 0.9) + R(201, 223, 198, 3, `url(#${k}-ov)`)
    + L('M269 300V203A31 31 0 0 1 331 203V300', '#e9b987', 6, 0.55) + L('M265.5 300V203A34.5 34.5 0 0 1 334.5 203V300', ST, 1.1, 0.7) + R(294, 168, 12, 9, '#c88c5a') + L('M294 168.6h12', HI, 0.8)
    + R(205, 236, 190, 2, '#7a4a2c', 'opacity=".22"'), `clip-path="url(#${k}-front)"`);
  b += P('M273 300V203A27 27 0 0 1 285 180Q280 195 279.5 203V300Z', '#6f4228', 'opacity=".55"') + L('M273 203A27 27 0 0 1 327 203', '#6f4228', 4, 0.35)
    + R(196, 291, 208, 9, '#b87c50') + R(196, 291, 208, 1.6, HI, 'opacity=".8"') + R(192, 299, 216, 5, '#9a6340') + R(192, 299, 216, 1.2, '#d49a6a', 'opacity=".7"')
    + P('M279 69Q300 50 321 69Z', '#d9a06c') + P('M300 52.5Q312 58 321 69H300Z', '#efc08d', 'opacity=".6"') + L('M285 65Q290 56 300 53', '#f9dbb0', 1.2, 0.8) + R(277, 67, 46, 3.2, '#b87c50') + R(277, 67, 46, 1, HI, 'opacity=".7"')
    + bird(246, 60, 0.7, '#5a4040', 1) + bird(250, 66, 0.55, '#5a4040', 1);
  // avenue trees (mid) framing the gate
  b += bush(168, 292, 26, 31, ['#587f45', '#76a252', '#a9c96e'], 8) + R(165, 290, 4, 12, '#5d4636') + bush(432, 292, 26, 32, ['#587f45', '#76a252', '#a9c96e'], 8) + R(430, 290, 4, 12, '#5d4636')
    + bush(86, 296, 44, 33, ['#4d7440', '#6f9a4f', '#a5c46c'], 11) + R(83, 292, 6, 18, '#5d4636') + bush(520, 298, 46, 34, ['#4d7440', '#6f9a4f', '#a5c46c'], 11) + R(517, 294, 6, 18, '#5d4636');
  // people strolling, balloon seller, child with kite, lamp posts
  const lamp = (x, y, s) => at(x, y, s, `${L('M0 0V-30', '#4a3a3e', 1.6)}${L('M-5-27Q0-22 5-27', '#4a3a3e', 1.2)}${C(0, -33, 2.8, '#fff0c0')}${C(-5, -26, 2, '#fff0c0')}${C(5, -26, 2, '#fff0c0')}${L('M0-30v-3', '#4a3a3e', 1.4)}`);
  b += lamp(rx(-56, 318), 318, 1) + lamp(rx(56, 318), 318, 1) + lamp(rx(-56, 358), 358, 1.5) + lamp(rx(56, 358), 358, 1.5)
    + person(rx(-20, 326), 326, 1.0, '#d86a6a') + person(rx(-12, 327), 327, 0.55, '#f2c04e') + person(rx(10, 330), 330, 1.05, '#4fa3a5', { arm: 1 }) + person(rx(26, 334), 334, 1.1, '#f1e6d6')
    + person(262, 349, 1.6, '#8a5aa0') + person(280, 353, 1.5, '#f1e6d6', { arm: 1 }) + person(342, 356, 1.6, '#e9a44f') + person(322, 372, 1.9, '#3f6e86')
    + person(430, 340, 1.0, '#e0607a') + person(150, 336, 1.2, '#3f6e86') + person(560, 352, 1.5, '#d86a6a') + person(80, 346, 1.4, '#e9c56a');
  const balloons = (x, y) => L(`M${x} ${y}L${x - 8} ${y - 34}M${x} ${y}L${x + 1} ${y - 38}M${x} ${y}L${x + 9} ${y - 33}`, '#6a5a60', 0.6) + C(x - 8, y - 39, 5, '#e0607a') + C(x + 1, y - 44, 5, '#f2c04e') + C(x + 10, y - 38, 5, '#4fa3a5') + C(x - 9.5, y - 41, 1.5, '#fff', 'opacity=".6"') + C(x + 0.5, y - 46, 1.5, '#fff', 'opacity=".6"');
  b += person(214, 340, 1.3, '#f1e6d6') + balloons(217, 326);
  // big framing trees at the edges, kites (black) and a few birds
  b += R(30, 215, 9, 60, '#5d4636') + bush(34, 235, 74, 41, ['#46703d', '#6a9a4a', '#b0cf72'], 13) + R(605, 205, 10, 70, '#5d4636') + bush(610, 218, 82, 42, ['#46703d', '#6a9a4a', '#b0cf72'], 14, 1, '#e8905a');
  b += kite(380, 54, 1.1, '#5a4040') + kite(420, 36, 0.9, '#5a4040') + kite(344, 30, 0.8, '#5a4040') + kite(250, 40, 0.9, '#6a5050') + bird(560, 100, 1, '#6a5050') + bird(580, 92, 0.8, '#6a5050') + bird(150, 70, 1, '#6a5050');
  return SVG(defs, b);
};

// Bengaluru: Vidhana Soudha (colonnade, golden domes, emblem dome) under a soft blue sky, rain tree + gulmohar, a lake edge.
const bengaluru = () => {
  const k = 'blr', B = 300, Y = (h) => f(B - h);
  const defs = lin(`${k}-sky`, [[0, '#86bce2'], [0.55, '#bddcee'], [1, '#e8f2ee']])
    + rad(`${k}-halo`, 90, 70, 200, [[0, '#fffbe6', 0.9], [0.4, '#fff3cc', 0.35], [1, '#fff3cc', 0]])
    + lin(`${k}-st`, [[0, '#ece3d6'], [0.6, '#d9cdc0'], [1, '#bdb0a8']], [0, 0, 1, 0])
    + lin(`${k}-gold`, [[0, '#f0d9a8'], [0.55, '#d7b27a'], [1, '#a98153']], [0, 0, 1, 0])
    + lin(`${k}-lawn`, [[0, '#a8d28a'], [1, '#7fb470']])
    + lin(`${k}-lake`, [[0, '#9ad0d0'], [1, '#4a8f9c']])
    + lin(`${k}-rs`, [[0, '#4b4455', 0], [1, '#4b4455', 0.32]], [0, 0, 1, 0]) + lin(`${k}-dark`, [[0, '#4b4455', 0.5], [1, '#4b4455', 0]], [0, 0, 1, 0]);
  const ST = '#8a7c74', REC = '#625a68', DK = ['#3b7050', '#5a9c64', '#9bd088'];
  // sky, clouds, far city + hills, birds
  let b = R(0, 0, 640, 300, `url(#${k}-sky)`) + C(90, 70, 200, `url(#${k}-halo)`)
    + puff(160, 92, 170, '#ffffff', '#bcd3ec', 0.95) + puff(470, 60, 130, '#ffffff', '#bcd3ec', 0.9) + puff(330, 34, 90, '#ffffff', '#c3d8ee', 0.8) + puff(620, 150, 100, '#ffffff', '#bcd3ec', 0.7) + puff(40, 160, 90, '#ffffff', '#bcd3ec', 0.7);
  b += ridge(21, 262, 18, '#b4d1c6', 80, 0.7).replace('V380Z', 'V300Z') + skyline(5, 0, 640, 280, 14, 60, '#b7cfe3', 0.7, 16) + ridge(22, 276, 8, '#a9cbb8', 60, 0.8).replace('V380Z', 'V300Z');
  // wings: two-storey arcades with a teal tile band and a balustrade
  const arcade = (x0, x1, h0, h1, n) => { const w = (x1 - x0) / n, hh = h1 - h0; let s = ''; for (let i = 0; i < n; i++) { const x = x0 + i * w; s += P(`M${f(x + 1.6)} ${Y(h0)}V${Y(h0 + hh * 0.62)}A${f((w - 3.2) / 2)} ${f(hh * 0.38)} 0 0 1 ${f(x + w - 1.6)} ${Y(h0 + hh * 0.62)}V${Y(h0)}Z`, REC) + R(f(x + w - 1.6), Y(h0 + hh * 0.62), 1.6, f(hh * 0.62), '#3e3848', 'opacity=".55"'); } return s + R(x0, Y(h0 + 1), x1 - x0, 1.6, '#f4ecdf', 'opacity=".7"'); };
  const wing = (x0, x1) => R(x0, Y(74), x1 - x0, 74, `url(#${k}-st)`) + R(x0, Y(78), x1 - x0, 5, '#cbbfb2') + L(`M${x0} ${Y(79)}H${x1}`, '#f8f1e6', 1, 0.9) + L(`M${x0 + 2} ${Y(81)}H${x1 - 2}`, '#a39489', 5, 0.8, 'stroke-dasharray="1.5 2.1"')
    + arcade(x0 + 2, x1 - 2, 40, 68, Math.round((x1 - x0) / 10)) + arcade(x0 + 2, x1 - 2, 6, 34, Math.round((x1 - x0) / 10)) + R(x0, Y(40), x1 - x0, 5, '#78bdb2', 'opacity=".85"') + R(x0, Y(35), x1 - x0, 2, '#d9cdc0') + L(`M${x0 + 2} ${Y(81.5)}${Array.from({ length: Math.round((x1 - x0) / 11) }, (_, i) => `m11 0v-3`).join('')}`, '#c6b9ac', 1.2);
  b += wing(100, 199) + wing(389, 488) + R(100, Y(74), 99, 74, `url(#${k}-rs)`) + R(389, Y(74), 99, 74, `url(#${k}-rs)`);
  // corner pavilions with golden domes and clocks
  const pav = (cx) => `${R(cx - 22, Y(104), 44, 104, `url(#${k}-st)`)}${R(cx - 24, Y(106), 48, 4, '#cfc3b6')}${L(`M${cx - 24} ${Y(106.6)}h48`, '#fbf5ea', 1, 0.9)}${C(cx, Y(84), 6, '#f4ecdf')}${C(cx, Y(84), 6, 'none', 'stroke="#7a6c62" stroke-width=".8"')}${L(`M${cx} ${Y(84)}v-3.4M${cx} ${Y(84)}l2.6 1`, '#5a4c46', 0.8)}${[0, 1, 2].map((i) => P(`M${cx - 12 + i * 8.4} ${Y(60)}v-16q4-7 8 0v16z`, REC)).join('')}${[0, 1, 2].map((i) => P(`M${cx - 12 + i * 8.4} ${Y(26)}v-16q4-7 8 0v16z`, REC)).join('')}${R(cx - 24, Y(40), 48, 3, '#78bdb2', 'opacity=".8"')}${R(cx - 17, Y(112), 34, 8, '#d3c7ba')}${P(`M${cx - 17} ${Y(112)}Q${cx - 17} ${Y(140)} ${cx} ${Y(143)}Q${cx + 17} ${Y(140)} ${cx + 17} ${Y(112)}Z`, `url(#${k}-gold)`)}${P(`M${cx - 6} ${Y(116)}Q${cx - 11} ${Y(132)} ${cx - 2} ${Y(139)}Q${cx - 6} ${Y(130)} ${cx - 6} ${Y(116)}Z`, '#fff1cd', 'opacity=".55"')}${L(`M${cx} ${Y(143)}v-9`, '#8a6b41', 1.4)}${C(cx, Y(153), 1.8, '#d7b27a')}${L(`M${cx - 20} ${Y(104)}v-8M${cx + 20} ${Y(104)}v-8`, '#bcb0a4', 3)}`;
  b += pav(219) + pav(369);
  // central block: recess with teal panels, drum, ribbed dome, lantern, lion
  b += R(235, Y(70), 118, 70, REC) + R(235, Y(70), 118, 70, `url(#${k}-dark)`) + R(235, Y(30), 118, 14, '#4a9d94', 'opacity=".5"');
  b += R(247, Y(131), 94, 26, `url(#${k}-st)`) + R(251, Y(131), 86, 4, '#cfc3b6') + L(`M247 ${Y(104.6)}h94`, '#fbf5ea', 1, 0.9) + L(`M251 ${Y(112)}h86`, '#a3948a', 5, 0.8, 'stroke-dasharray="1.5 2"')
    + R(256, Y(148), 76, 17, `url(#${k}-st)`) + Array.from({ length: 8 }, (_, i) => P(`M${259 + i * 9.2} ${Y(123)}v-8q2.4-4 4.8 0v8z`, REC)).join('') + R(254, Y(149), 80, 3, '#d3c7ba')
    + P(`M260 ${Y(149)}Q258 ${Y(178)} 294 ${Y(184)}Q330 ${Y(178)} 328 ${Y(149)}Z`, `url(#${k}-gold)`) + P(`M268 ${Y(153)}Q264 ${Y(172)} 282 ${Y(180)}Q272 ${Y(168)} 272 ${Y(153)}Z`, '#fff1cd', 'opacity=".5"')
    + L(`M270 ${Y(150)}Q268 ${Y(172)} 294 ${Y(184)}M282 ${Y(150)}Q282 ${Y(172)} 294 ${Y(184)}M306 ${Y(150)}Q306 ${Y(172)} 294 ${Y(184)}M318 ${Y(150)}Q320 ${Y(172)} 294 ${Y(184)}`, '#8a6b41', 0.7, 0.45)
    + R(288, Y(197), 12, 14, '#d3c7ba') + R(286, Y(186), 16, 3.5, '#cfc3b6') + P(`M286 ${Y(197)}q8-9 16 0z`, `url(#${k}-gold)`)
    + R(284, Y(206), 20, 4, '#cfc3b6') + P(`M286 ${Y(206)}q-1-8 3-11l2 2q1-6 4-8l1 6q2-1 4 1l1-4q3 3 3 8l2 2q1 4-2 6z`, '#d8bf94') + C(293, Y(218), 3, '#d8bf94') + C(299, Y(219), 3, '#d8bf94') + L(`M300 ${Y(198)}V${Y(236)}`, '#6a5c56', 1)
    + P(`M300 ${Y(236)}h13v-2.6h-13z`, '#f59a3a') + P(`M300 ${Y(233.4)}h13v-2.6h-13z`, '#fffaf0') + P(`M300 ${Y(230.8)}h13v-2.6h-13z`, '#4fa36c');
  // portico: entablature with lettering, emblem, eight columns with shaded sides, steps
  b += R(210, Y(95), 168, 26, `url(#${k}-st)`) + R(206, Y(97), 176, 4, '#d3c7ba') + L(`M206 ${Y(97.6)}h176`, '#fbf5ea', 1, 0.9) + R(210, Y(70), 168, 3, '#bdb0a6') + L('M226 219h136', '#7a6c62', 2.2, 0.55, 'stroke-dasharray="1.2 1.5"') + R(210, Y(95), 168, 26, `url(#${k}-dark)`, 'opacity=".4"')
    + L(`M232 ${Y(100.6)}H356`, '#a3948a', 6, 0.85, 'stroke-dasharray="1.5 2"') + R(284, Y(118), 20, 17, '#c9a05a') + P(`M286 ${Y(116)}h16v8q-8 7-16 0z`, '#d9573a') + C(294, Y(110.5), 4, '#f6d98a') + P(`M287 ${Y(124)}q7-6 14 0z`, '#f6d98a');
  for (let i = 0; i < 8; i++) { const x = 228 + i * 20; b += R(x - 3.2, Y(68), 6.4, 62, '#e6dccf') + R(x + 0.4, Y(68), 2.8, 62, '#9e9189', 'opacity=".5"') + R(x - 4.4, Y(70), 8.8, 3, '#cfc3b6') + R(x - 4.4, Y(9), 8.8, 3, '#cfc3b6') + L(`M${x - 1.5} ${Y(66)}V${Y(10)}`, '#fff8ec', 0.8, 0.8); }
  b += R(222, Y(6), 146, 4, '#d3c7ba') + R(218, Y(2.4), 154, 3, '#c4b8ac') + R(214, Y(-0.6), 162, 3.4, '#b3a59a') + R(100, Y(-3.6), 388, 4, '#8f8a8a', 'opacity=".5"');
  // lawn, flower beds, railing, clipped shrubs
  b += R(0, 303, 640, 36, `url(#${k}-lawn)`) + P('M0 330Q160 320 330 326T640 322V340H0Z', '#8cc07a', 'opacity=".9"');
  const q = rng(17); let fl = ''; ['#e8607a', '#f6d062', '#ffffff', '#f2954a', '#c07ad0'].forEach((c, ci) => { for (let i = 0; i < 26; i++) fl += C(f(120 + q() * 360), f(310 + q() * 12), 1.5, c); });
  b += L('M104 316H484', '#3d4a52', 7, 0.6, 'stroke-dasharray="1 3.3"') + L('M104 316H484', '#d8b25a', 1.4, 0.9, 'stroke-dasharray="1 3.3" transform="translate(0 -4.2)"') + L('M104 312H484M104 320H484', '#3d4a52', 0.8, 0.8)
    + P('M104 320H484V334H104Z', '#6aa764', 'opacity=".5"') + fl + bush(236, 326, 14, 51, ['#3f7a50', '#5fa35f', '#9fd08c'], 6) + bush(352, 326, 14, 52, ['#3f7a50', '#5fa35f', '#9fd08c'], 6) + bush(150, 327, 12, 53, ['#3f7a50', '#5fa35f', '#9fd08c'], 5) + bush(440, 327, 12, 54, ['#3f7a50', '#5fa35f', '#9fd08c'], 5);
  // lake with reflections, lotus pads, swan pedalo, ducks
  b += P('M0 338Q120 330 250 337T500 333T640 338V380H0Z', `url(#${k}-lake)`) + R(0, 338, 640, 42, `url(#${k}-lake)`) + P('M0 338Q120 330 250 337T500 333T640 338V344H0Z', '#bfe0b8', 'opacity=".5"')
    + mirror(P('M104 300h384v-60H104z', '#5a5460', 'opacity=".5"') + R(100, 262, 388, 40, '#8b8190'), 336, 0.28) + P('M0 338Q120 330 250 337T500 333T640 338V380H0Z', 'none')
    + ripples(0, 342, 640, 38, '#e8f6f0', 44, 23, 0.6) + ripples(0, 342, 640, 38, '#2f6f7e', 34, 24, 0.4)
    + [[200, 358], [236, 366], [330, 364], [520, 356]].map(([x, y], i) => E(x, y, 8, 2.8, '#4e9a58') + (i % 2 ? '' : C(x + 2, y - 2.2, 2.2, '#f4a0b4'))).join('');
  const swan = `${E(0, -2, 15, 5.5, '#fffaf0')}${E(0, -4, 12, 3.2, '#ffffff', 'opacity=".9"')}${P('M-8-5Q-15-6-14-12Q-12-20-9-26Q-6-31-9-33Q-5-36-3-32Q-2-28-6-24Q-9-18-9-12Q-8-8-6-5Z', '#fffaf0')}${P('M-9-33L-13-31.5L-9-30.5Z', '#f2954a')}${C(-6.6, -32.6, 0.7, '#333')}${R(2, -14, 7, 6, '#e8607a', 'opacity=".9"')}${R(0, -17, 11, 3, '#4fa3a5')}${L('M-12 0H12', '#bcd8de', 1, 0.7)}`;
  b += mirror(at(430, 362, 1, swan), 362, 0.3) + at(430, 362, 1, swan) + at(120, 364, 1, `${E(0, 0, 6, 3, '#9b6a44')}${C(-5, -3, 2.4, '#2f6e4a')}${P('M-7-3L-10-2L-7-1z', '#f2b04e')}`) + at(134, 360, 0.8, `${E(0, 0, 6, 3, '#f4ecdf')}${C(-5, -3, 2.4, '#7a5a3a')}${P('M-7-3L-10-2L-7-1z', '#f2b04e')}`);
  // rain tree (right), gulmohar in bloom (left), floating petals, birds
  b += P('M580 342Q584 300 578 262Q574 236 560 214L574 216Q586 238 592 262Q600 300 598 342Z', '#6a4a3a') + P('M578 250Q548 232 520 214L526 208Q556 226 584 240Z', '#6a4a3a') + P('M590 244Q618 224 640 208L640 214Q616 234 594 254Z', '#6a4a3a')
    + L('M586 340Q590 300 584 262', '#8a6a52', 1.5, 0.5) + mirror(P('M580 342Q584 300 578 262L592 262Q600 300 598 342Z', '#6a4a3a'), 340, 0.3)
    + bush(530, 150, 74, 61, DK, 10) + bush(600, 128, 86, 62, DK, 12) + bush(640, 176, 64, 63, DK, 9) + bush(560, 196, 56, 64, DK, 8)
    + Array.from({ length: 14 }, (_, i) => `${L(`M${500 + i * 11} ${204 + (i % 3) * 5}v${10 + (i % 4) * 4}`, '#4a8a5a', 1.1, 0.7)}`).join('');
  b += P('M46 342Q40 296 52 262Q56 236 44 206L58 204Q66 236 62 266Q58 300 64 342Z', '#6a4a3a') + bush(34, 170, 66, 71, ['#3d7a4f', '#5da562', '#a6d78a'], 12, 1, '#e0502f') + bush(70, 150, 44, 72, ['#3d7a4f', '#5da562', '#a6d78a'], 8, 1, '#f08a3c') + bush(0, 210, 40, 73, ['#3d7a4f', '#5da562', '#a6d78a'], 7, 1, '#e0502f');
  const q2 = rng(31); let pet = ''; for (let i = 0; i < 26; i++) pet += C(f(20 + q2() * 140), f(318 + q2() * 58), 1.3, i % 3 ? '#e0502f' : '#f08a3c', 'opacity=".85"');
  b += pet + person(300, 321, 0.85, '#d86a6a') + person(311, 322, 0.8, '#4fa3a5', { arm: 1 }) + person(180, 322, 0.8, '#e9c56a')
    + [[330, 86, 1, '#ffffff'], [346, 78, 0.9, '#ffffff'], [362, 92, 1, '#ffffff'], [404, 60, 0.8, '#ffffff'], [212, 60, 0.9, '#6a7a8e']].map(([x, y, s, c]) => bird(x, y, s, c, 1.2)).join('') + kite(260, 40, 0.9, '#6a5a60');
  return SVG(defs, b);
};

// Chennai: the Kapaleeshwarar gopuram (stepped, painted, sculpted tiers + barrel roof) over the temple tank, palms, afternoon light.
const gopuram = (k, cols, tiers = 7) => {
  const cream = '#fbf0d8', ink = '#3a2a3a'; let s = '', y = 0;
  // ground tier: granite plinth with the doorway
  s += R(-70, -40, 140, 40, '#d8c3a2') + R(-70, -40, 140, 40, `url(#${k}-sh)`) + R(-74, -4, 148, 4, '#bfa684') + R(-72, -43, 144, 4, cream) + L('M-72-42.6h144', '#fff', 0.8, 0.8)
    + P('M-11 0V-24Q-11-30-5-31H5Q11-30 11-24V0Z', '#2a2226') + L('M-13 0V-24Q-13-33-5-33H5Q13-33 13-24V0', '#b8975f', 1.3) + R(-22, -36, 44, 3.2, '#c9a05a') + L('M-8-14h16M-8-8h16', '#6a5040', 0.6, 0.6)
    + [-56, -42, 42, 56].map((x) => R(x - 4, -36, 8, 32, '#e7d4b2') + R(x - 4, -36, 8, 32, `url(#${k}-sh)`) + L(`M${x} -34v28`, '#a88f6a', 0.6, 0.6)).join('');
  y = -40;
  for (let i = 0; i < tiers; i++) {
    const w = 128 - i * 11, h = 20.5 - i * 0.8, x = -w / 2, yt = y - h, c = cols[i % cols.length], n = Math.round(w / 11);
    s += R(x, yt, w, h, c) + R(x, yt, w, h, `url(#${k}-sh)`) + R(x - 3, y - 3, w + 6, 3.4, cream) + R(x - 3, y - 0.6, w + 6, 1.4, ink, 'opacity=".3"') + R(x - 2, yt - 2.4, w + 4, 2.6, cream) + L(`M${x - 2} ${f(yt - 2.2)}h${w + 4}`, '#fff', 0.7, 0.9);
    let fr = ''; for (let j = 0; j * 5 < w - 4; j++) fr += `M${f(x + 2 + j * 5)} ${f(yt - 0.2)}a2.5 2.7 0 0 1 5 0`;
    s += L(fr, ink, 0.6, 0.45);
    // sculpted niches with tiny figures between pilasters
    for (let j = 0; j < n; j++) {
      const cw = (w - 14) / n, cx = x + 7 + j * cw + cw / 2;
      s += P(`M${f(cx - 2.8)} ${f(y - 4)}V${f(yt + 7)}Q${f(cx)} ${f(yt + 3)} ${f(cx + 2.8)} ${f(yt + 7)}V${f(y - 4)}Z`, ink, 'opacity=".3"') + C(f(cx), f(yt + h * 0.55), 1.5, j % 2 ? '#f6d46a' : cream) + R(f(cx - 1), f(yt + h * 0.55 + 1.2), 2, 3.4, j % 2 ? '#f6d46a' : cream) + L(`M${f(cx - cw / 2)} ${f(yt + 3)}V${f(y - 4)}`, cream, 0.9, 0.7);
    }
    // corner aedicules (little shrines) with vaulted roofs
    [x + 4, x + w - 4].forEach((ex) => { s += R(ex - 3.4, yt + 3, 6.8, h - 7, cream, 'opacity=".95"') + P(`M${f(ex - 4.4)} ${f(yt + 3.4)}Q${f(ex)} ${f(yt - 5)} ${f(ex + 4.4)} ${f(yt + 3.4)}Z`, c === '#efbd4f' ? '#d9625a' : '#efbd4f') + C(ex, f(yt - 4.6), 0.9, '#efbd4f') + R(ex - 1.4, yt + 7, 2.8, h - 12, ink, 'opacity=".4"'); });
    y = yt - 2.4;
  }
  // barrel vault (shalakara) with its row of golden kalasams and end finials
  s += P(`M-23 ${f(y)}Q-24 ${f(y - 19)} -13 ${f(y - 23)}H13Q24 ${f(y - 19)} 23 ${f(y)}Z`, '#d9625a') + P(`M-23 ${f(y)}Q-24 ${f(y - 19)} -13 ${f(y - 23)}H13Q24 ${f(y - 19)} 23 ${f(y)}Z`, `url(#${k}-sh)`) + R(-24, y - 3, 48, 3, cream)
    + L(`M-16 ${f(y - 2)}V${f(y - 19)}M-8 ${f(y - 2)}V${f(y - 22)}M0 ${f(y - 2)}V${f(y - 23)}M8 ${f(y - 2)}V${f(y - 22)}M16 ${f(y - 2)}V${f(y - 19)}`, '#fbe3c0', 0.8, 0.55) + R(-15, y - 25.6, 30, 3, '#efbd4f') + C(-23, f(y - 12), 3.6, '#efbd4f') + C(23, f(y - 12), 3.6, '#efbd4f') + C(-23, f(y - 12), 1.3, ink, 'opacity=".5"') + C(23, f(y - 12), 1.3, ink, 'opacity=".5"');
  for (let j = 0; j < 7; j++) { const kx = -12 + j * 4, big = j === 3; s += E(kx, f(y - 29), big ? 2.2 : 1.5, big ? 3.6 : 2.6, '#f2c24f') + L(`M${kx} ${f(y - 25.6)}v-1.6`, '#c8962f', 0.8) + (big ? L(`M${kx} ${f(y - 33)}v-4`, '#c8962f', 0.9) : ''); }
  return s;
};

const chennai = () => {
  const k = 'chn';
  const defs = lin(`${k}-sky`, [[0, '#76aed6'], [0.5, '#b4d8e6'], [1, '#fce8bc']]) + rad(`${k}-halo`, 120, 90, 230, [[0, '#fff3c8', 0.95], [0.35, '#ffe2a0', 0.4], [1, '#ffe2a0', 0]])
    + lin(`${k}-sh`, [[0, '#fff3d0', 0.18], [0.45, '#3a2a3a', 0], [1, '#3a2a3a', 0.38]], [0, 0, 1, 0])
    + lin(`${k}-tank`, [[0, '#b6dbe0'], [0.4, '#6faab0'], [1, '#3f7a8a']]);
  const gop = gopuram(k, ['#d9625a', '#3f9ea3', '#efbd4f', '#7d8dd2', '#d9625a', '#5db08e', '#efbd4f']);
  const TREE = ['#3f7a4a', '#5c9a58', '#a0cf7c'], HZ = 296;
  let b = R(0, 0, 640, 300, `url(#${k}-sky)`) + C(120, 90, 230, `url(#${k}-halo)`) + C(120, 90, 20, '#fff8dc', 'opacity=".9"')
    + puff(480, 70, 130, '#ffffff', '#cfe0ee', 0.85) + puff(250, 40, 90, '#ffffff', '#cfe0ee', 0.7) + puff(580, 140, 80, '#ffffff', '#d6e4ee', 0.7) + streak(180, 150, 110, '#fff3d6', 0.6);
  // hazy town behind: pastel houses and a second, fainter gopuram
  const house = (x, yb, w, h, c, o = 1) => G(R(x, yb - h, w, h, c) + R(x - 2, yb - h - 3, w + 4, 3.4, '#f6efe0') + Array.from({ length: Math.floor(w / 12) }, (_, i) => R(x + 4 + i * 12, yb - h + 6, 5, 7, '#6a7a98', 'opacity=".55"')).join('') + R(x, yb - h, w, h, '#fce8bc', 'opacity=".18"'), `opacity="${o}"`);
  b += house(176, 284, 38, 34, '#f4d28c', 0.8) + house(150, 284, 28, 26, '#f6f0e2', 0.8) + house(420, 284, 46, 38, '#f1a8a2', 0.85) + house(462, 284, 38, 26, '#f6f0e2', 0.85) + house(520, 284, 40, 30, '#f2d08a', 0.8) + house(96, 284, 40, 22, '#f1a8a2', 0.75)
    + G(at(88, 284, 0.42, gopuram(k, ['#c8828a', '#6aa6b0', '#d9b26a', '#8d98cc', '#c8828a', '#7ab89a', '#d9b26a'], 6)), 'opacity=".75"')
    + bush(300, 270, 24, 81, ['#6a9a6a', '#86b078', '#b4d4a0'], 7, 1) + bush(180, 276, 30, 82, ['#4f8452', '#6fa268', '#a6d088'], 8) + bush(470, 274, 34, 83, ['#4f8452', '#6fa268', '#a6d088'], 8) + bush(560, 272, 28, 84, ['#4f8452', '#6fa268', '#a6d088'], 7);
  // palms behind, the great gopuram, tank wall with painted stripes
  b += palm(120, 292, 150, -16, 91, '#7a5a42', '#3d7a4a', '#7cb35c') + palm(150, 292, 106, 16, 92, '#7a5a42', '#3d7a4a', '#7cb35c') + palm(568, 292, 120, 14, 93, '#7a5a42', '#3d7a4a', '#7cb35c') + palm(596, 292, 86, -8, 94, '#7a5a42', '#3d7a4a', '#7cb35c');
  b += at(331, 289, 1, gop);
  b += R(0, 284, 640, 14, '#f6ecd6') + L('M0 291.5H640', '#d6644a', 13, 1, 'stroke-dasharray="9 9"') + R(0, 281, 640, 3.6, '#d9c7a0') + L('M0 281.6H640', '#fff8e6', 1, 0.9) + R(0, 296, 640, 2.4, '#4a3a4a', 'opacity=".25"');
  // temple tank: sky reflection, mirrored gopuram, ripples, the shrine on the water
  b += R(0, 298, 640, 82, `url(#${k}-tank)`) + mirror(at(331, 289, 1, gop), 297, 0.34) + R(0, 298, 640, 82, `url(#${k}-tank)`, 'opacity=".28"');
  const shrine = `${R(-27, -6, 54, 6, '#d6644a')}${R(-23, -12, 46, 6, '#f5ecdc')}${R(-19, -17, 38, 5, '#d6644a')}${R(-15, -37, 30, 20, '#2c2a34', 'opacity=".7"')}${L('M-12-36V-18M-8-36V-18M-4-36V-18M0-36V-18M4-36V-18M8-36V-18M12-36V-18', '#b9a98a', 1, 0.7)}${R(-19, -41, 38, 4.6, '#cdb98f')}${R(-19, -41, 38, 1.2, '#fff2cf')}`;
  const mini = at(0, -42, 0.3, gopuram(k, ['#d9625a', '#efbd4f', '#3f9ea3', '#7d8dd2', '#d9625a'], 4));
  b += mirror(at(468, 338, 1, shrine + mini), 338, 0.3) + ripples(0, 300, 640, 80, '#d6eaee', 46, 41, 0.45) + ripples(0, 300, 640, 80, '#2c5f70', 40, 42, 0.4) + at(468, 338, 1, shrine + mini) + L('M436 338H500', '#e8f6f4', 1, 0.7);
  // stone steps (ghat) bottom-left with stripes, people and pigeons
  const steps = [[0, 330, 166], [0, 340, 130], [0, 351, 96], [0, 363, 60]];
  steps.forEach(([x, y, w], i) => { b += P(`M0 ${y}H${w}L${w - 14} ${y + 11}H0Z`, i % 2 ? '#e9d7b3' : '#f1e2c0') + P(`M0 ${y + 8}H${w - 8}L${w - 14} ${y + 11}H0Z`, '#cbb48a', 'opacity=".6"') + L(`M0 ${y + 1}H${w}`, '#fff8e6', 1, 0.8) + L(`M0 ${y + 4}H${w - 3}`, '#d6644a', 3.6, 0.9, 'stroke-dasharray="8 8"'); });
  b += person(34, 342, 1.8, '#d1447a', { hair: '#2a1a22' }) + person(54, 346, 1.15, '#3f9ea3') + person(112, 335, 1.5, '#f1e6d6', { hat: null });
  const pig = (x, y, c = '#8c8a9a') => E(x, y, 3.6, 2.2, c) + C(x - 3, y - 2, 1.5, c) + P(`M${x - 4.6} ${y - 2}l-1.4 0.6z`, '#e8a040') + L(`M${x + 3} ${y}l3 1.4`, c, 1);
  b += pig(80, 350) + pig(92, 354, '#a8a6b4') + pig(104, 349) + pig(130, 361, '#a8a6b4');
  // coconut palm framing the right, flock of crows/pigeons
  b += P('M470 380Q540 352 640 346V380Z', '#cdb98c') + P('M500 380Q560 360 640 354V380Z', '#7fae62') + palm(626, 354, 200, -56, 95, '#6a4a36', '#2f6a42', '#6ea852', 10) + palm(596, 358, 90, 18, 96, '#6a4a36', '#2f6a42', '#6ea852');
  b += [[300, 52, 1, '#4a3b4f'], [320, 44, 1, '#4a3b4f'], [250, 80, 0.9, '#4a3b4f'], [200, 52, 0.8, '#4a3b4f'], [410, 120, 0.9, '#4a3b4f']].map(([x, y, s, c]) => bird(x, y, s, c, 1.2)).join('') + kite(375, 38, 0.9, '#5a4a50');
  return SVG(defs, b);
};

// Hyderabad: Charminar at dusk, four fluted minarets with balconies and cupolas, bangle-stall lights, an auto, pigeons, a crescent moon.
const minaret = (k, cx, o = 1) => {
  const segs = [[0, -118, 30, 26], [-124, -178, 24, 20], [-186, -216, 18, 15]]; let s = '';
  segs.forEach(([y0, y1, w0, w1], i) => {
    s += P(`M${cx - w0 / 2} ${y0}L${cx - w1 / 2} ${y1}H${cx + w1 / 2}L${cx + w0 / 2} ${y0}Z`, `url(#${k}-cyl)`) + L(`M${f(cx - w0 / 6)} ${y0}L${f(cx - w1 / 6)} ${y1}M${f(cx + w0 / 6)} ${y0}L${f(cx + w1 / 6)} ${y1}`, '#7a5a4a', 0.6, 0.35);
    if (i === 0) s += L(`M${cx - 14} -60h28M${cx - 13.6} -90h27`, '#c9a574', 1.4, 0.6) + P(`M${cx - 3} -30V-40Q${cx} -45 ${cx + 3} -40V-30Z`, '#6a4a48', 'opacity=".55"');
    else s += [-1, 1].map((m) => P(`M${cx + m * 6 - 1.6} ${y0 - 14}V${y0 - 22}Q${cx + m * 6} ${y0 - 26} ${cx + m * 6 + 1.6} ${y0 - 22}V${y0 - 14}Z`, '#5a3e44', 'opacity=".6"')).join('');
  });
  [[-118, 38], [-178, 30], [-216, 24]].forEach(([y, w], i) => {
    s += R(cx - w / 2, y - 2, w, 4.4, '#ecd3a0') + L(`M${cx - w / 2} ${y - 1.6}h${w}`, '#fff1c8', 0.8, 0.8) + L(`M${cx - w / 2 + 1} ${y + 4}h${w - 2}`, '#8a6a4a', 2.4, 0.5, 'stroke-dasharray="1.6 1.4"')
      + R(cx - w / 2 + 1, y - 8, w - 2, 6.4, '#ead19e') + L(`M${cx - w / 2 + 2} ${y - 5}h${w - 4}`, '#8a6a4a', 4, 0.55, 'stroke-dasharray="1.4 1.4"') + L(`M${cx - w / 2} ${y - 8.4}h${w}`, '#fff1c8', 0.7, 0.8);
    if (i === 0) s += R(cx - 17, y - 12, 34, 4, '#ecd3a0');
  });
  s += R(cx - 8, -233, 1.8, 14, '#d9bd8c') + R(cx - 3.4, -233, 1.8, 14, '#d9bd8c') + R(cx + 1.6, -233, 1.8, 14, '#d9bd8c') + R(cx + 6.2, -233, 1.8, 14, '#d9bd8c') + R(cx - 10, -236, 20, 3.4, '#ecd3a0')
    + P(`M${cx - 9} -236Q${cx - 11} -248 ${cx} -254Q${cx + 11} -248 ${cx + 9} -236Z`, '#e4c68a') + P(`M${cx - 6} -239Q${cx - 8} -247 ${cx - 2} -251Q${cx - 5} -245 ${cx - 5} -239Z`, '#fff0c4', 'opacity=".7"') + L(`M${cx} -254V-263`, '#b9955c', 1.3) + C(cx, -255.6, 1.8, '#e4c68a') + C(cx, -264, 1.5, '#e4c68a');
  return G(s, `opacity="${o}"`);
};

const hyderabad = () => {
  const k = 'hyd';
  const defs = lin(`${k}-sky`, [[0, '#4a4b92'], [0.3, '#8a6fa8'], [0.55, '#d98fa4'], [0.8, '#f5b98a'], [1, '#fcd9a4']])
    + rad(`${k}-halo`, 320, 270, 280, [[0, '#ffc98a', 0.75], [0.4, '#ffa98a', 0.3], [1, '#ffa98a', 0]])
    + lin(`${k}-st`, [[0, '#f6dcae'], [0.55, '#e3c08c'], [1, '#b8967a']], [0, 0, 1, 0])
    + lin(`${k}-cyl`, [[0, '#f7e0b4'], [0.45, '#e6c590'], [1, '#a98a78']], [0, 0, 1, 0])
    + lin(`${k}-arch`, [[0, '#5a3d50'], [1, '#f0a65a']])
    + lin(`${k}-road`, [[0, '#7b6288'], [1, '#3e3354']])
    + lin(`${k}-vio`, [[0, '#4a3a6a', 0], [1, '#4a3a6a', 0.45]], [0, 0, 1, 0])
    + rad(`${k}-mh`, 500, 80, 50, [[0, '#ffe6b0', 0.3], [1, '#ffe6b0', 0]]) + `<mask id="${k}-moon"><rect x="470" y="50" width="60" height="60" fill="#fff"/><circle cx="508" cy="73" r="13.5" fill="#000"/></mask><radialGradient id="${k}-bulb">${stops([[0, '#ffe29a', 0.9], [1, '#ffcf6a', 0]])}</radialGradient>`;
  const ST = '#9a7a56', HI = '#fff1c8';
  // sky: stars, crescent moon, haze glow, far old city
  const q = rng(11); let stars = ''; for (let i = 0; i < 26; i++) stars += C(f(q() * 640), f(q() * 120), f(0.5 + q() * 0.8), '#fff6dc', `opacity="${f(0.4 + q() * 0.5)}"`);
  let b = R(0, 0, 640, 300, `url(#${k}-sky)`) + stars + C(320, 270, 280, `url(#${k}-halo)`) + C(500, 80, 50, `url(#${k}-mh)`) + C(500, 80, 16, '#fff2cc', `mask="url(#${k}-moon)"`)
    + puff(120, 100, 110, '#c58fb0', '#8a6aa6', 0.7) + puff(540, 150, 100, '#e7a0a8', '#a577a8', 0.6) + streak(300, 60, 130, '#c79ac0', 0.5) + streak(150, 190, 120, '#f5a89a', 0.5);
  b += skyline(15, 0, 640, 282, 14, 46, '#9f7fa8', 0.55, 20) + G(P('M20 282Q20 252 46 248Q72 252 72 282Z M560 282Q560 256 584 250Q608 256 608 282Z', '#9a7ba6') + R(8, 270, 78, 14, '#9a7ba6') + R(548, 272, 72, 12, '#9a7ba6') + L('M46 248v-12M584 250v-12', '#9a7ba6', 1.5), 'opacity=".6"')
    + ridge(16, 286, 10, '#7f648f', 50, 0.7).replace('V380Z', 'V300Z');
  // paper-lantern strings
  const lights = (x0, y0, cx, cy, x1, y1, n, cols) => { let s = L(`M${x0} ${y0}Q${cx} ${cy} ${x1} ${y1}`, '#5a4658', 0.8, 0.8); for (let i = 0; i <= n; i++) { const t = i / n, x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * cx + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * cy + t * t * y1; s += at(f(x), f(y), 5.5, C(0, 0, 1, `url(#${k}-bulb)`)) + C(f(x), f(y + 1.6), 1.7, cols[i % cols.length]) + C(f(x - 0.4), f(y + 1), 0.6, '#fffbe8'); } return s; };
  b += lights(-4, 118, 90, 190, 232, 178, 12, ['#ffe29a', '#ffb877', '#ffe29a', '#ff9a8a']) + lights(408, 178, 540, 190, 646, 112, 12, ['#ffe29a', '#ff9a8a', '#ffe29a', '#ffb877']);
  const lantern = (x, y, c) => L(`M${x} ${y - 14}V${y}`, '#5a4658', 0.7) + P(`M${x - 4} ${y}Q${x - 6} ${y + 7} ${x} ${y + 12}Q${x + 6} ${y + 7} ${x + 4} ${y}Z`, c) + R(x - 3, y - 1.6, 6, 2, '#4a3a4a') + R(x - 2.4, y + 11, 4.8, 1.6, '#4a3a4a') + C(x, y + 6, 8, `url(#${k}-bulb)`);
  b += lantern(40, 150, '#ef6a5a') + lantern(122, 168, '#f2b84e') + lantern(560, 156, '#3f9ea3') + lantern(612, 138, '#ef6a5a');
  // Charminar group (local origin = centre of base, y up is negative)
  const stoneB = `${R(-88, -150, 176, 150, `url(#${k}-st)`)}`;
  let arc = ''; for (let i = 0; i < 9; i++) { const x = -76 + i * 19, lit = i === 1 || i === 4 || i === 7; arc += P(`M${x} -86V-103Q${x + 4.5} -111 ${x + 9} -103V-86Z`, lit ? '#f5b868' : '#5a3d50', `opacity="${lit ? 0.9 : 0.8}"`) + L(`M${x - 1.6} -86V-103Q${x + 4.5} -113 ${x + 10.6} -103V-86`, '#fff1c8', 0.8, 0.55); }
  const body = `${stoneB}${R(-88, -150, 176, 150, `url(#${k}-vio)`)}${courses(-88, -150, 176, 150, 7, '#7a5a40', 0.1, 4, 18)}`
    + R(-92, -8, 184, 8, '#cdae7c') + L('M-92-7.4h184', HI, 0.8, 0.7)
    + [-76, -44, 33, 65].map((x) => P(`M${x} -12V-38Q${x + 5.5} -48 ${x + 11} -38V-12Z`, '#3a2a36', 'opacity=".45"') + P(`M${x + 1.6} -52V-62Q${x + 5.5} -68 ${x + 9.4} -62V-52Z`, '#3a2a36', 'opacity=".4"') + L(`M${x - 1.4} -12V-38Q${x + 5.5} -50 ${x + 12.4} -38V-12`, '#fff1c8', 0.8, 0.5)).join('')
    + C(-52, -62, 7, '#d8b782') + C(-52, -62, 5, 'none', 'stroke="#8a6a4a" stroke-width=".8" opacity=".6"') + C(52, -62, 7, '#d8b782') + C(52, -62, 5, 'none', 'stroke="#8a6a4a" stroke-width=".8" opacity=".6"')
    + P('M-31 0V-50Q-30-68 0-82Q30-68 31-50V0Z', `url(#${k}-arch)`) + P('M-20 0V-44Q-19-56 0-66Q19-56 20-44V0Z', '#f1b06e', 'opacity=".8"') + P('M-8 0V-30Q0-38 8-30V0Z', '#ffd38a', 'opacity=".75"') + P('M-31 0V-50Q-30-68 0-82Q-14-66-20-44V0Z', '#2e2240', 'opacity=".5"')
    + L('M-35 0V-50Q-33-71 0-88Q33-71 35-50V0', '#f9e5b4', 4.4, 0.95) + L('M-35 0V-50Q-33-71 0-88Q33-71 35-50V0', '#8a6a4a', 0.8, 0.6) + L('M-31 0V-50Q-30-68 0-82Q30-68 31-50V0', '#8a6a4a', 0.8, 0.6) + C(0, -88, 2, '#e8cf9c')
    + R(-92, -84, 184, 5, '#ecd3a0') + L('M-92-83.4h184', HI, 0.8, 0.9) + L('M-90-78h180', '#8a6a4a', 3, 0.5, 'stroke-dasharray="1.5 2"')
    + R(-90, -124, 180, 40, '#e8cd98', 'opacity=".5"') + arc + C(0, -103, 7, '#f7ecd4') + C(0, -103, 7, 'none', 'stroke="#8a6a4a" stroke-width="1.2"') + L('M0-103v-4M0-103l3 1.8', '#4a3a3a', 0.9)
    + R(-94, -126, 188, 4.6, '#ecd3a0') + L('M-94-125.6h188', HI, 0.8, 0.9) + R(-92, -138, 184, 12, '#e9cf9c') + L('M-90-132h180', '#8a6a4a', 7, 0.55, 'stroke-dasharray="2 2"') + R(-94, -141, 188, 4, '#f3dcaa') + L('M-94-140.6h188', HI, 0.8, 0.9);
  const cupola = (x) => `${R(x - 7, -151, 1.6, 10, '#d9bd8c')}${R(x + 5.4, -151, 1.6, 10, '#d9bd8c')}${P(`M${x - 8} -151Q${x - 9} -160 ${x} -164Q${x + 9} -160 ${x + 8} -151Z`, '#e4c68a')}${L(`M${x} -164v-6`, '#b9955c', 1)}${C(x, -170.6, 1.3, '#e4c68a')}`;
  const group = minaret(k, -62, 0.8) + minaret(k, 62, 0.8) + cupola(-30) + cupola(30) + cupola(0) + body + minaret(k, -84) + minaret(k, 84)
    + P('M-88-150H-96V0H-88Z', '#3a2a50', 'opacity=".06"') + R(70, -140, 18, 140, '#3a2a50', 'opacity=".08"');
  b += at(320, 298, 1, group);
  // street, glow pools, cobbles
  b += R(0, 298, 640, 82, `url(#${k}-road)`) + R(0, 296, 640, 3, '#3a2a50', 'opacity=".35"') + E(320, 304, 150, 8, '#ffb877', 'opacity=".22"') + E(320, 306, 70, 4, '#ffd38a', 'opacity=".3"') + ripples(0, 302, 640, 78, '#a88ab8', 30, 71, 0.3) + ripples(0, 302, 640, 78, '#2a2040', 24, 72, 0.4);
  // bangle stall (left) with awning, stacks of bangles, bulbs
  const stack = (x, y, c1, c2) => R(x, y, 4.2, 9, c1) + L(`M${x} ${y + 3}h4.2M${x} ${y + 6}h4.2`, c2, 0.8, 0.8);
  const bcol = ['#e8607a', '#f2c04e', '#4fb3a5', '#8a6ac8', '#f08a3c', '#5aa0e0'];
  let bg = ''; for (let i = 0; i < 17; i++) bg += stack(32 + i * 6.2, 314 + (i % 2), bcol[i % 6], bcol[(i + 2) % 6]) + stack(32 + i * 6.2, 324 + (i % 2), bcol[(i + 3) % 6], bcol[(i + 1) % 6]);
  let aw = ''; for (let i = 0; i < 9; i++) aw += P(`M${24 + i * 13} 292L${37 + i * 13} 292L${37 + i * 13} 308Q${30.5 + i * 13} 313 ${24 + i * 13} 308Z`, i % 2 ? '#fbf0d8' : '#e8607a');
  b += R(26, 336, 118, 28, '#4a3550') + R(22, 334, 126, 4, '#6a4a5a') + P('M20 292H150L142 286H28Z', '#f4e4c4') + aw + R(24, 308, 124, 18, '#2e2240', 'opacity=".55"') + bg + L('M24 292H148', '#4a3550', 1.2)
    + Array.from({ length: 10 }, (_, i) => C(30 + i * 13, 311, 2, '#ffe29a') + C(30 + i * 13, 311, 8, `url(#${k}-bulb)`, 'opacity=".6"')).join('') + person(160, 352, 1.5, '#2e2240', { skin: '#a8765a', hair: '#1a1424' }) + person(174, 353, 1.2, '#4a2f55', { skin: '#a8765a', hair: '#1a1424' });
  // auto-rickshaw (right) with headlamp glow, reflection
  const auto = `${E(0, 3, 34, 4, '#1a1424', 'opacity=".35"')}${P('M-30-2Q-32-14-24-18L-6-34Q0-38 8-36L24-30Q34-26 34-16V-2Z', '#f2c230')}${P('M-30-2Q-32-14-24-18L-6-34Q0-38 8-36L24-30Q34-26 34-16Z', '#fff', 'opacity=".12"')}${P('M-26-20L-8-37Q0-41 10-38L26-32L24-30L8-35Q0-37-6-33L-24-18Z', '#2a2432')}${P('M-8-30L6-33V-18H-8Z', '#8ec0d6', 'opacity=".75"')}${R(-30, -6, 64, 5, '#2a2432')}${C(-18, 0, 7, '#2a2432')}${C(-18, 0, 3, '#8a8494')}${C(24, 0, 7, '#2a2432')}${C(24, 0, 3, '#8a8494')}${C(34, -16, 2.6, '#fff6c8')}${C(34, -16, 14, `url(#${k}-bulb)`)}${L('M-28-10H30', '#2a2432', 1, 0.5)}${R(-2, -28, 8, 8, '#2a2432', 'opacity=".5"')}`;
  b += mirror(at(530, 340, 1.15, auto), 340, 0.22) + at(530, 340, 1.15, auto) + E(560, 342, 40, 6, '#ffd38a', 'opacity=".16"');
  // pigeons on the street, small flock in the air, people in backlit silhouette
  const pig = (x, y, s = 1, c = '#cfc4d8') => at(x, y, s, `${E(0, 0, 4, 2.4, c)}${C(-3.6, -2.4, 1.6, c)}${P('M-5.4-2.6l-1.6 0.8z', '#f0a040')}${P('M3 -1.4l5 1.2-5 1z', '#b9aecb')}${L('M-1 2.4v2M1 2.4v2', '#d89a60', 0.6)}`);
  b += pig(246, 336, 1.2) + pig(262, 342, 1.3, '#b9aecb') + pig(284, 334, 1.1) + pig(300, 348, 1.5) + pig(328, 340, 1.2, '#b9aecb') + pig(352, 350, 1.4) + pig(372, 336, 1.1, '#b9aecb');
  b += person(210, 322, 1.0, '#3a2c50', { skin: '#8a6a58', hair: '#1a1424' }) + person(222, 323, 0.95, '#4a3560', { skin: '#8a6a58', hair: '#1a1424' }) + person(420, 322, 1.0, '#3a2c50', { skin: '#8a6a58', hair: '#1a1424' }) + person(436, 321, 0.6, '#c05a6a', { skin: '#8a6a58', hair: '#1a1424' }) + person(470, 324, 1.05, '#4a3560', { skin: '#8a6a58', hair: '#1a1424' });
  b += [[210, 70, 1.2], [226, 56, 1], [244, 88, 1.1], [412, 64, 1.2], [430, 80, 1], [448, 52, 0.9], [388, 100, 0.9], [196, 110, 0.9]].map(([x, y, s]) => bird(x, y, s, '#d6cbe0', 1.3)).join('') + bird(350, 20, 0.8, '#d6cbe0', 1.2);
  return SVG(defs, b);
};

// Kerala: Chinese fishing nets at Fort Kochi, silhouetted against a sunset over the backwater, a country boat, palms.
const chinaNet = (c = '#2c2036') => {
  let s = '';
  s += L('M-48 -3H24', c, 4) + [-44, -30, -14, 2, 18].map((x) => L(`M${x} -3V26`, c, 2.2)).join('') + L('M-16-3L6-65M24-3L6-65', c, 4.2) + L('M-2-30L16-30', c, 1.6)
    + L('M-44-36L122-132', c, 4.6) + L('M-44-31L122-127', c, 2, 0.8) + L('M-44-37L122-133', '#ffa66a', 0.8, 0.6)
    + L('M122-132L113-98M113-98L70-6M113-98L140-6M113-98L86-16M113-98L156-16', c, 1.5, 0.95)
    + P('M70-6Q105 6 140-6L156-16Q121-5 86-16Z', c, 'opacity=".5"');
  const bz = (p0, p1, p2, t) => (1 - t) * (1 - t) * p0 + 2 * t * (1 - t) * p1 + t * t * p2; let mesh = '';
  for (let i = 1; i < 6; i++) { const t = i / 6; mesh += `M${f(70 + 16 * t)} ${f(-6 - 10 * t)}Q${f(105 + 16 * t)} ${f(6 - 11 * t)} ${f(140 + 16 * t)} ${f(-6 - 10 * t)}`; }
  for (let i = 1; i < 14; i++) { const t = i / 14; mesh += `M${f(70 + 70 * t)} ${f(bz(-6, 6, -6, t))}L${f(86 + 70 * t)} ${f(bz(-16, -5, -16, t))}`; }
  s += L(mesh, c, 0.8, 0.85) + L('M70-6Q105 6 140-6L156-16Q121-5 86-16Z', c, 1.6, 0.95)
    + L('M-44-36L-52-14M-44-36L-45-7M-44-36L-38-13', c, 0.9) + [[-52, -12], [-45, -5], [-38, -11]].map(([x, y]) => E(x, y, 3.4, 4, c)).join('') + L('M-44-36L-30-3', c, 0.8, 0.8)
    + person(-24, -3, 0.95, c, { skin: c, hair: c, legs: c });
  return s;
};
const boatK = (c = '#2c2036') => `${P('M-46 0Q-48-8-56-13Q-32-4 0-4Q32-4 56-13Q48-8 46 0Q30 6 0 6Q-30 6-46 0Z', c)}${L('M-52-11Q-30-3 0-3Q30-3 52-11', '#ffa66a', 0.9, 0.6)}${person(8, -3, 1.05, c, { skin: c, hair: c, legs: c })}${L('M-26 -4L38 16', c, 1.3)}${P('M-30-4q-5 4-6 8l6-3z', c)}${C(-40, -5, 1.6, '#ffd58a')}${C(-40, -5, 8, '#ffcf80', 'opacity=".25"')}`;

const kerala = () => {
  const k = 'ker', HZ = 228;
  const defs = lin(`${k}-sky`, [[0, '#6a62a0'], [0.28, '#b57bab'], [0.55, '#f0908f'], [0.78, '#ffb272'], [1, '#ffdca4']])
    + rad(`${k}-halo`, 320, 198, 240, [[0, '#ffe6a8', 0.95], [0.2, '#ffc47e', 0.6], [0.55, '#ff9a7e', 0.2], [1, '#ff9a7e', 0]])
    + lin(`${k}-sea`, [[0, '#f8aa7c'], [0.12, '#cc8590'], [0.4, '#6a6a98'], [1, '#2b4766']])
    + lin(`${k}-glit`, [[0, '#ffe0a0', 0.7], [1, '#ffb27a', 0]]);
  const DK = '#2c2036', FAR = '#6e5486';
  let b = R(0, 0, 640, 236, `url(#${k}-sky)`) + C(320, 198, 240, `url(#${k}-halo)`) + C(320, 198, 34, '#fff1c4') + C(320, 198, 34, 'none', 'stroke="#ffd58a" stroke-width="5" opacity=".4"')
    + streak(120, 70, 120, '#f6a8b4', 0.5) + streak(520, 90, 110, '#f9b8a8', 0.55) + streak(200, 150, 140, '#ffc08a', 0.6) + streak(470, 176, 120, '#ffc88e', 0.7) + puff(70, 130, 100, '#f7a9b3', '#b07aa8', 0.7) + puff(590, 60, 100, '#e9a0b2', '#9a74a8', 0.6);
  // far shore with palm silhouettes, a cargo crane and a ship in haze
  b += P(`M-10 ${HZ + 4}Q40 ${HZ - 10} 120 ${HZ - 4}T250 ${HZ - 2}V${HZ + 6}H-10Z`, FAR, 'opacity=".75"') + P(`M520 ${HZ + 6}Q560 ${HZ - 8} 600 ${HZ - 4}T660 ${HZ - 8}V${HZ + 6}Z`, FAR, 'opacity=".75"') + [[20, 22], [48, 28], [78, 20], [110, 26], [150, 20], [196, 24], [560, 24], [590, 28], [620, 22]].map(([x, h], i) => palm(x, HZ - 2, h, i % 2 ? 3 : -3, 100 + i, FAR, '#5a4472', '#6e5486', 6)).join('')
    + G(L('M470 232V200l8-12l8 12V232M470 205h16M478 188v-8M456 232l6-30h28l6 30', '#7a5f92', 1.3, 0.9) + R(430, 226, 70, 5, '#7a5f92') + R(440, 221, 30, 5, '#8a6fa0'), 'opacity=".6"');
  // sea, sunset path and glitter
  b += R(0, HZ, 640, 152, `url(#${k}-sea)`) + [0, 1, 2, 3].map((i) => P(`M${298 + i * 5} ${HZ}H${342 - i * 5}L${440 - i * 30} 380H${200 + i * 30}Z`, `url(#${k}-glit)`, 'opacity=".55"')).join('');
  const q = rng(5); let gl = ''; for (let i = 0; i < 110; i++) { const y = HZ + 2 + q() * q() * 148, sp = 18 + (y - HZ) * 0.55; gl += `M${f(320 + (q() - 0.5) * sp * 2)} ${f(y)}h${f(3 + (y - HZ) * 0.06 * q() + q() * 6)}`; }
  b += L(gl, '#ffe8b8', 1.3, 0.85) + ripples(0, HZ + 6, 640, 146, '#b88ab0', 50, 3, 0.35) + ripples(0, HZ + 6, 640, 146, '#20344f', 40, 4, 0.4);
  // far net, jetty, the big net crossing the sun, mid and far nets
  b += G(at(150, 246, 0.4, chinaNet('#5a4472')), 'opacity=".8"')
    + mirror(at(560, 252, 0.5, chinaNet('#4a3a60')), 252, 0.22) + G(at(560, 252, 0.5, chinaNet('#4a3a60')), 'opacity=".9"')
    + mirror(at(452, 266, 0.74, chinaNet()), 266, 0.25) + at(452, 266, 0.74, chinaNet())
    + R(-4, 285, 254, 4, DK) + [20, 70, 120, 170, 220].map((x) => L(`M${x} 287V310`, DK, 2.4)).join('') + mirror(R(-4, 285, 254, 4, DK) + [20, 70, 120, 170, 220].map((x) => L(`M${x} 287V310`, DK, 2.4)).join(''), 288, 0.25)
    + mirror(at(236, 288, 1.35, chinaNet()), 288, 0.28) + ripples(180, 290, 280, 70, '#20344f', 24, 8, 0.5) + at(236, 288, 1.35, chinaNet()) + ripples(200, 292, 250, 6, '#ffd39a', 10, 6, 0.6);
  // country boat + tiny far boat
  b += mirror(at(536, 304, 1, boatK()), 304, 0.26) + ripples(480, 304, 110, 20, '#20344f', 14, 17, 0.5) + at(536, 304, 1, boatK()) + ripples(488, 303, 100, 4, '#ffd39a', 7, 18, 0.7)
    + G(at(392, 244, 0.38, boatK('#4a3a60')), 'opacity=".8"');
  // dark palm-lined banks left and right
  b += P('M0 380V320Q60 312 130 338Q172 356 196 380Z', '#3a2a48') + P('M0 322Q60 314 130 340', 'none', 'stroke="#ff9a62" stroke-width="1.4" opacity=".5"')
    + P('M640 380V334Q596 334 564 356Q548 368 530 380Z', '#3a2a48') + P('M640 336Q596 335 566 356', 'none', 'stroke="#ff9a62" stroke-width="1.4" opacity=".5"')
    + palm(34, 336, 178, 22, 111, '#2c2036', '#2c2236', '#4a3a62', 10) + palm(92, 344, 122, -22, 112, '#2c2036', '#2c2236', '#4a3a62', 9) + palm(158, 366, 56, 10, 113, '#2c2036', '#2c2236', '#4a3a62', 8)
    + palm(612, 344, 150, -20, 114, '#2c2036', '#2c2236', '#4a3a62', 9) + palm(584, 360, 96, 12, 115, '#2c2036', '#2c2236', '#4a3a62', 8)
    + R(56, 354, 22, 14, '#3a2a48') + P('M52 354L67 342L82 354Z', '#2c2036') + L('M20 372Q40 366 60 372M560 374Q580 368 600 374', '#ffa66a', 0.8, 0.4);
  // birds crossing the sun
  b += [[352, 134, 1.3], [374, 124, 1.1], [396, 140, 1.2], [418, 128, 0.9], [300, 108, 1], [262, 130, 0.9], [150, 90, 0.9], [168, 80, 0.8], [500, 120, 0.9], [570, 150, 0.8]].map(([x, y, s]) => bird(x, y, s, '#3a2a48', 1.4)).join('');
  return SVG(defs, b);
};

// Dozy Hollow: a dreamy pastel meadow at dawn, layered hills, sleepy rocks (closed eyes, zzz), flowers and the pink blob.
const flower = (x, y, s, c, mid = '#ffe9a0', petals = 5) => at(x, y, s, `${L('M0 0Q1-6 0-11', '#6aa07a', 1.1)}${P('M0-4q4-3 6-1q-3 3-6 1z', '#8cc09a')}${Array.from({ length: petals }, (_, i) => E(0, -4.2, 2.2, 3.6, c, `transform="translate(0 -11) rotate(${i * (360 / petals)})"`)).join('')}${C(0, -11, 2.1, mid)}`);
const sleepyRock = (x, y, s, a, b2) => at(x, y, s, `${E(2, 1, 32, 5, '#6a8a7a', 'opacity=".25"')}${P('M-28 0Q-31-30 0-33Q31-30 28 0Q14 4 0 4Q-14 4-28 0Z', a)}${P('M-28 0Q-31-30 0-33Q-14-20-12 4Q-20 4-28 0Z', b2, 'opacity=".5"')}${P('M-18-20Q-12-27-2-28', 'none', 'stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"')}${L('M-14-12q4 3 8 0M6-12q4 3 8 0', '#5a4a6a', 1.5)}${E(-17, -7, 4.4, 2.4, '#f59ab4', 'opacity=".55"')}${E(17, -7, 4.4, 2.4, '#f59ab4', 'opacity=".55"')}${L('M-3-6q3 2.4 6 0', '#5a4a6a', 1.2)}${L('M20-26h6l-6 7h6M29-33h5l-5 6h5M37-39h4l-4 5h4', '#8a78b8', 1.4, 0.85)}`);

const dozy = () => {
  const k = 'doz';
  const defs = lin(`${k}-sky`, [[0, '#c4b8e8'], [0.45, '#f2c4da'], [0.8, '#ffe1c6'], [1, '#fff0d4']])
    + rad(`${k}-halo`, 470, 196, 190, [[0, '#fff3c8', 0.95], [0.3, '#ffe2b0', 0.5], [1, '#ffe2b0', 0]])
    + lin(`${k}-h1`, [[0, '#d6c8ee'], [1, '#e8d8ee']]) + lin(`${k}-h2`, [[0, '#b4dcc8'], [1, '#d2ecd0']]) + lin(`${k}-h3`, [[0, '#9fd2a6'], [1, '#c5e6a8']]) + lin(`${k}-h4`, [[0, '#c9e6a2'], [1, '#e8f2b8']])
    + lin(`${k}-mist`, [[0, '#fff1e4', 0], [0.5, '#fff1e4', 0.75], [1, '#fff1e4', 0]])
    + lin(`${k}-blob`, [[0, '#ffd0de'], [1, '#f08cb0']], [0.2, 0, 0.7, 1]);
  const q = rng(23); let stars = ''; for (let i = 0; i < 16; i++) stars += C(f(q() * 300), f(8 + q() * 70), f(0.6 + q() * 0.9), '#fff8f0', `opacity="${f(0.5 + q() * 0.4)}"`);
  let b = R(0, 0, 640, 300, `url(#${k}-sky)`) + stars + C(470, 196, 190, `url(#${k}-halo)`) + C(470, 200, 26, '#fff6d6', 'opacity=".95"') + P('M120 58A13 13 0 1 0 134 82A10.5 10.5 0 1 1 120 58Z', '#fffaf0', 'opacity=".75"')
    + puff(150, 120, 130, '#fff6f2', '#f0c4d8', 0.95) + puff(400, 70, 110, '#fff6f2', '#f0c4d8', 0.9) + puff(580, 120, 90, '#fff6f2', '#f0c4d8', 0.85) + puff(290, 40, 70, '#fff6f2', '#f2cadc', 0.8);
  // hills in four hazy layers with mist between them
  b += ridge(31, 214, 34, `url(#${k}-h1)`, 90).replace('V380Z', 'V300Z') + P('M0 206Q80 196 150 204T300 198', 'none', 'stroke="#fff" stroke-width="1.5" opacity=".4"') + R(0, 214, 640, 26, `url(#${k}-mist)`)
    + ridge(32, 250, 34, `url(#${k}-h2)`, 100) + R(0, 244, 640, 28, `url(#${k}-mist)`, 'opacity=".45"') + ridge(33, 282, 30, `url(#${k}-h3)`, 120) + ridge(34, 322, 26, `url(#${k}-h4)`, 140)
    + P('M-10 262Q120 236 250 258T470 250T650 246', 'none', 'stroke="#f2fff0" stroke-width="1.6" opacity=".45"') + P('M-10 296Q140 270 300 292T650 280', 'none', 'stroke="#f6ffe0" stroke-width="1.6" opacity=".5"');
  // round pastel trees on the mid hills, a path winding to the hollow
  const TREE = ['#7fbf9c', '#9bd3ae', '#c6ecc0'];
  b += R(527, 246, 3, 12, '#9a8a8a') + bush(528, 240, 16, 41, TREE, 6) + R(582, 262, 3, 10, '#9a8a8a') + bush(584, 256, 13, 42, TREE, 6) + R(86, 262, 3, 10, '#9a8a8a') + bush(88, 256, 14, 43, TREE, 6) + R(190, 268, 3, 8, '#9a8a8a') + bush(192, 263, 10, 44, TREE, 5)
    + P('M312 380Q290 350 330 336Q370 322 340 300Q320 288 350 280', 'none', 'stroke="#f6ecc8" stroke-width="12" stroke-linecap="round" opacity=".7"') + P('M312 380Q290 350 330 336Q370 322 340 300Q320 288 350 280', 'none', 'stroke="#fff8e0" stroke-width="3" stroke-linecap="round" opacity=".6" stroke-dasharray="1 9"');
  // sleepy rocks
  b += sleepyRock(84, 338, 1.45, '#cfc6e4', '#a89ccc') + sleepyRock(540, 334, 1.1, '#d6cde8', '#b0a4d2') + sleepyRock(592, 356, 0.6, '#cfc6e4', '#a89ccc');
  // flowers scattered in the foreground, grass tufts
  const cols = ['#ffffff', '#f7a1bb', '#ffd36e', '#c8a8f0', '#ff9a8a']; let fl = '', gr = '';
  for (let i = 0; i < 46; i++) { const x = 10 + q() * 620, y = 330 + q() * 48; if ((Math.abs(x - 322) < 100 && y < 372) || (Math.abs(x - 84) < 52 && y < 366) || (Math.abs(x - 540) < 40 && y < 362)) continue; fl += flower(f(x), f(y), f(0.8 + (y - 330) / 48 * 0.7), cols[i % 5], i % 5 === 0 ? '#ffd36e' : '#fff3b0', i % 3 === 0 ? 6 : 5); }
  for (let i = 0; i < 30; i++) { const x = q() * 640, y = 322 + q() * 56; gr += `M${f(x)} ${f(y)}q-2-5-4-8M${f(x)} ${f(y)}q1-6 3-9`; }
  b += L(gr, '#7fb27a', 1.2, 0.8) + fl;
  // the pink blob hero with a leaf sprout, soft shadow, little butterfly
  const blob = `${E(2, 8, 50, 7, '#5a7a6a', 'opacity=".25"')}${P('M-46 2Q-50-42 0-46Q50-42 46 2Q30 10 0 10Q-30 10-46 2Z', `url(#${k}-blob)`)}${P('M-34-26Q-26-40-8-42Q-24-34-26-16Z', '#fff', 'opacity=".4"')}${E(-22, -14, 4.4, 2.8, '#ee7f9b', 'opacity=".55"')}${E(22, -14, 4.4, 2.8, '#ee7f9b', 'opacity=".55"')}${E(-14, -22, 5, 6.4, '#3a2a3a')}${E(14, -22, 5, 6.4, '#3a2a3a')}${C(-12.6, -24.4, 1.9, '#fff')}${C(15.4, -24.4, 1.9, '#fff')}${C(-15.4, -19.8, 0.9, '#fff', 'opacity=".8"')}${L('M-4-12q4 4.4 8 0', '#3a2a3a', 1.6)}${P('M0-45Q-2-56 -12-60Q-14-50 0-45Z', '#6fb06a')}${P('M0-45Q4-58 14-58Q14-48 0-45Z', '#86c47c')}${L('M0-45V-48', '#6aa060', 1.2)}${E(-24, 8, 7, 3, '#f08cb0')}${E(24, 8, 7, 3, '#f08cb0')}`;
  b += at(322, 356, 1.5, blob) + at(404, 262, 1, `${E(-4, 0, 4, 5.4, '#f7a1bb', 'transform="rotate(-24 -4 0)"')}${E(4, 0, 4, 5.4, '#c8a8f0', 'transform="rotate(24 4 0)"')}${L('M0-3v6', '#5a4a6a', 1)}`)
    + [[250, 300], [418, 292], [180, 318], [470, 322], [372, 306]].map(([x, y]) => C(x, y, 1.6, '#fff8c8', 'opacity=".9"') + C(x, y, 5, '#fff3b0', 'opacity=".25"')).join('') + bird(560, 70, 1, '#9a88b8', 1.2) + bird(580, 62, 0.8, '#9a88b8', 1.2);
  return SVG(defs, b);
};

const ART = { mumbai: mumbai(), delhi: typeof delhi === 'function' ? delhi() : '', bengaluru: typeof bengaluru === 'function' ? bengaluru() : '', chennai: typeof chennai === 'function' ? chennai() : '', hyderabad: typeof hyderabad === 'function' ? hyderabad() : '', kerala: typeof kerala === 'function' ? kerala() : '', 'dozy-hollow': typeof dozy === 'function' ? dozy() : '' };


// ---- guides: each world's character + speech bubble, appended to that world's SVG. Gouache-simple: round face, little body, one waving arm.
// Only `.wave` (the arm) and `.bub` (the bubble) animate, via CSS transform, so nothing in the card can change layout.
const CREAM = '#fffaf0';
const bubble = (x, y, text, tail = 'l') => {
  const w = Math.round(text.length * 9.8 + 26), h = 32, tx = tail === 'l' ? x + 14 : x + w - 14, dir = tail === 'l' ? -1 : 1;
  return `<g class="bub"><path d="M${tx} ${y + h - 1}L${tx + dir * 10} ${y + h + 13}L${tx + (tail === 'l' ? 14 : -14)} ${y + h - 1}" fill="${CREAM}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`
    + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="${CREAM}" stroke="${INK}" stroke-width="2.6"/>`
    + `<path d="M${tx + (tail === 'l' ? 2 : -2)} ${y + h}H${tx + (tail === 'l' ? 12 : -12)}" stroke="${CREAM}" stroke-width="4"/>`
    + `<text x="${x + w / 2}" y="${y + 22}" text-anchor="middle" font-family="Kalam, 'Patrick Hand', cursive" font-weight="700" font-size="18" fill="${INK}">${text}</text></g>`;
};
// character in its own space: feet at (0,0), ~80 tall, facing front. o: skin, hair, shirt, pants, back (drawn behind), hairBack, front (props on the torso), hold (left hand), wave (in the waving hand), face (extra on head), hat
const kid = (o) => {
  const k = o.skin;
  const head = `${o.hairBack || ''}${C(-15, -61, 3, k)}${C(15, -61, 3, k)}${C(0, -62, 15, k)}${P('M-15.5 -63Q-15-80 0-80Q15-80 15.5-63Q9-71.5 0-70.5Q-9-71.5-15.5-63Z', o.hair)}${C(-5.5, -61, 1.9, INK)}${C(5.5, -61, 1.9, INK)}${L('M-4.2-55.5Q0-51.5 4.2-55.5', INK, 1.5)}${E(-9.5, -56, 3, 2, '#e8808a', 'opacity=".55"')}${E(9.5, -56, 3, 2, '#e8808a', 'opacity=".55"')}${o.face || ''}${o.hat || ''}`;
  return `${E(0, 2, 30, 5, '#fff0d0', 'opacity=".3"')}${E(0, 1, 24, 4, '#2a2030', 'opacity=".22"')}${o.back || ''}`
    + `<rect x="-10" y="-22" width="8" height="21" rx="3.4" fill="${o.pants}"/><rect x="2" y="-22" width="8" height="21" rx="3.4" fill="${o.pants}"/>${E(-6.5, -1, 6.4, 3, '#3a2a2a')}${E(6.5, -1, 6.4, 3, '#3a2a2a')}`
    + `<rect x="-14" y="-49" width="28" height="31" rx="11" fill="${o.shirt}"/>${R(-14, -33, 28, 3, '#000', 'opacity=".06"')}${o.front || ''}`
    + `${L('M-13-43Q-22-32-19-21', o.shirt, 6.2)}${C(-19, -19, 3.6, k)}${o.hold || ''}`
    + head
    + `<g class="wave">${L('M13-43Q23-50 26-65', o.shirt, 6.2)}${C(26, -67, 3.7, k)}${o.wave || ''}</g>`;
};
const GUIDE_ZOOM = 1.5;
const GUIDES = {
  // Chotu: tiny topi, a little kettle in one hand, a glass of chai held up in the waving hand
  mumbai: { x: 54, y: 378, s: 1.1, bx: 58, by: 250, text: 'Kya bolta?', k: {
    skin: '#b97c52', hair: '#2d2228', shirt: '#e9a23b', pants: '#6b5a8a',
    hat: P('M-11-74Q0-86 11-74Q0-71-11-74Z', '#fffaf0', `stroke="${INK}" stroke-width="1" stroke-opacity=".5"`),
    hold: at(-19, -22, 1, `${E(0, -6, 9, 7, '#8a8f98')}${E(0, -13, 5, 2.2, '#6f747d')}${C(0, -16, 1.8, '#6f747d')}${P('M7-8L16-15L17.5-12.5L9-4Z', '#8a8f98')}${L('M-8-9Q-17-18-5-15', '#555a63', 1.8)}${L('M-5-8Q0-4 5-8', '#fff', 1.2, 0.5)}`),
    wave: `<g transform="translate(1 -6)">${P('M-4-11H4L3 1H-3Z', '#f4e3c8')}${P('M-3.4-8H3.4L2.6 1H-2.6Z', '#c8863a')}${E(0, -11, 4, 1.2, '#fffaf0')}${L('M-1.5-14q-2-3 0-5t0-4M2-14q-2-3 0-5', '#fff', 1, 0.8)}</g>` } },
  // Rahul: specs, a bulging backpack and a stack of books under one arm
  delhi: { x: 54, y: 378, s: 1.1, bx: 58, by: 250, text: 'Aur bhai!', k: {
    skin: '#c38a5e', hair: '#2d2228', shirt: '#4a8fa8', pants: '#3b4a6b',
    back: R(-18, -47, 36, 31, '#d9603b', 'rx="9"') + R(-13, -29, 26, 9, '#b84a2c', 'rx="4"'),
    front: L('M-7-49V-30M7-49V-30', '#b84a2c', 3.2),
    face: `${C(-5.5, -61, 4.6, 'none', `stroke="${INK}" stroke-width="1.2"`)}${C(5.5, -61, 4.6, 'none', `stroke="${INK}" stroke-width="1.2"`)}${L('M-1-61H1', INK, 1.2)}`,
    hold: at(-19, -20, 1, `${R(-11, -7, 22, 6.5, '#e0517a', 'rx="1.5"')}${R(-10, -13.5, 20, 6.5, '#2f8f8a', 'rx="1.5"')}${R(-12, -20, 23, 6.5, '#e9c56a', 'rx="1.5"')}${L('M-9-17h16M-8-10.5h14', '#fffaf0', 1, 0.7)}`),
    wave: '' } },
  // Rohan: lanyard, an open laptop held at his side, a steel filter-coffee tumbler in the waving hand
  bengaluru: { x: 62, y: 350, s: 1.05, bx: 32, by: 226, text: 'Namaskara!', k: {
    skin: '#c9915f', hair: '#2d2228', shirt: '#6b7bd6', pants: '#4a4a58',
    front: `${L('M-6-49L0-30L6-49', '#c6564a', 1.8)}${R(-4.5, -31, 9, 11, '#fffaf0', `rx="1.5" stroke="${INK}" stroke-width="1"`)}${C(0, -27, 2, '#3f8f6b')}`,
    hold: `${R(-33, -38, 21, 15, '#3b4252', 'rx="2"')}${R(-31.5, -36.5, 18, 12, '#8fc7ee', 'rx="1"')}${L('M-29-33h8M-29-30h12', '#fff', 1, 0.7)}${R(-35, -24, 26, 3.4, '#b8bfc9', 'rx="1.5"')}`,
    wave: `<g transform="translate(1 -5)">${E(0, 1, 8, 2.2, '#d9dde3')}${P('M-4.4-10H4.4L3.6 0H-3.6Z', '#c9ced6')}${R(-4.6, -11.5, 9.2, 2, '#aeb4bd')}${L('M-1.6-4v-3', '#fff', 1, 0.6)}${L('M-1.6-14q-2-3 0-5t0-4M2-14q-2-3 0-5', '#fff', 1, 0.85)}</g>` } },
  // Meera: long hair, banana-leaf meal in one hand, phone held up to snap it
  chennai: { x: 54, y: 378, s: 1.1, bx: 58, by: 250, text: 'Vanakkam!', k: {
    skin: '#c08a62', hair: '#2d2228', shirt: '#d1447a', pants: '#2f5a7a',
    hairBack: P('M-16-66Q-19-40-11-33H11Q19-40 16-66Z', '#2d2228'),
    front: L('M-14-40H14', '#f6c9d6', 2, 0.8),
    hold: at(-20, -21, 1, `${E(0, -4, 17, 5.5, '#4f9a52')}${L('M-15-4H15', '#3c7e42', 0.9, 0.7)}${C(-3, -8, 5.2, '#fffaf0')}${C(8, -6.5, 2.2, '#e9a44f')}${C(-11, -6, 2, '#e0517a')}${C(12, -3, 1.6, '#c8e07a')}`),
    wave: `<g transform="translate(3 -6) rotate(14)">${R(-3.6, -13, 7.2, 12.5, INK, 'rx="1.8"')}${R(-2.6, -11.8, 5.2, 9, '#8fc7ee', 'rx=".8"')}${C(0, -14.2, 0.01, INK)}${L('M7-12l3-3M8-7h4M6-16l1-4', '#e9a44f', 1.2)}</g>` } },
  // Sameer: a jangle of Laad Bazaar bangles on the waving wrist, an Irani chai glass in the other hand
  hyderabad: { x: 54, y: 378, s: 1.1, bx: 58, by: 250, text: 'Bagunnara?', k: {
    skin: '#bd8359', hair: '#2d2228', shirt: '#3f9a9a', pants: '#2d3a52',
    hold: at(-19, -20, 1, `${E(0, 0, 8, 2.2, '#f1e6d6')}${P('M-4.8-12H4.8L3.8-1H-3.8Z', '#f4e3c8')}${P('M-4.2-9H4.2L3.5-1H-3.5Z', '#c8863a')}${L('M-1-15q-2-3 0-5', '#fff', 1, 0.85)}`),
    wave: `${['#e0517a', '#f2c04e', '#4fa3a5', '#8a5aa0', '#e0713f', '#e0517a'].map((c, i) => E(25.6 + i * 0.4, -58 - i * 2.2, 4.4, 1.7, 'none', `stroke="${c}" stroke-width="1.8" transform="rotate(-18 26 ${-58 - i * 2.2})"`)).join('')}` } },
  // Ananya: sun hat, a huge backpack with a rolled mat, a camera on a strap, one hand waving
  kerala: { x: 588, y: 378, s: 1.1, flip: 1, bx: 424, by: 250, tail: 'r', text: 'Namaskaram!', k: {
    skin: '#c08a62', hair: '#3a2a22', shirt: '#f2954a', pants: '#8a7a5a',
    back: R(-22, -62, 44, 46, '#4f7a52', 'rx="11"') + R(-20, -68, 40, 8, '#e0517a', 'rx="4"') + R(-13, -40, 26, 12, '#3f6a42', 'rx="4"') + L('M-20-64h40', '#fff', 0.8, 0.4),
    front: `${L('M-7-49V-24M7-49V-24', '#2f5a34', 3.4)}${L('M12-48L-8-27', '#2b2a33', 1.6)}`,
    hat: `${E(0, -75, 20, 4.2, '#e9c56a')}${P('M-11-75Q-10-88 0-88Q10-88 11-75Z', '#e9c56a')}${R(-11, -79, 22, 3.4, '#e0517a')}`,
    hold: `${R(-27, -31, 17, 11.5, '#3b3b44', 'rx="2.4"')}${R(-24, -34, 6, 3.5, '#3b3b44', 'rx="1"')}${C(-18.5, -25, 4.4, '#9aa3b0')}${C(-18.5, -25, 2.5, INK)}${C(-13.5, -28, 1, '#e0517a')}`,
    wave: '' } },
  // Dozy Hollow: the pink blob is already in the drawing, so just the bubble
  'dozy-hollow': { bubbleOnly: 1, bx: 380, by: 254, text: 'Namaste!' },
};
const withGuide = (id, svg) => {
  const g = GUIDES[id]; if (!g) return svg;
  const who = g.bubbleOnly ? '' : `<g transform="translate(${g.x} ${g.y}) scale(${g.flip ? -g.s : g.s} ${g.s})">${kid(g.k)}</g>`;
  // grow guide + bubble together about the guide's feet (bubble-only: about the bubble's tail)
  const ox = g.x ?? g.bx + 20, oy = g.y ?? g.by + 46, z = g.bubbleOnly ? 1.25 : GUIDE_ZOOM;
  return svg.replace('</svg>', `<g transform="translate(${ox} ${oy}) scale(${z}) translate(${-ox} ${-oy})">${who}${bubble(g.bx, g.by, g.text, g.tail || 'l')}</g></svg>`);
};

// ---- worlds: order = card order. `sky` / `accent` colour each card. ----
const WORLDS = [
  { id: 'mumbai', title: 'Aamchi Mumbai', city: 'Mumbai', script: 'मुंबई', scriptCls: 'dv', lang: 'Hindi', hero: 'Chotu, the chaiwala kid', sky: ['#bfe3ee', '#f6e9c8'], accent: '#e0713f', tag: 'Learn Bambaiya Hindi with Chotu', hi: 'Kya bolta?' },
  { id: 'delhi', title: 'Apni Dilli', city: 'Delhi NCR', script: 'दिल्ली', scriptCls: 'dv', lang: 'Delhi Hindi', hero: 'Rahul, a UPSC aspirant', sky: ['#f9d9b6', '#f7ecd0'], accent: '#c4553b', tag: 'Wander Dilli with Rahul, learn Delhi Hindi', hi: 'Aur bhai!' },
  { id: 'bengaluru', title: 'Namma Bengaluru', city: 'Bengaluru', script: 'ಬೆಂಗಳೂರು', scriptCls: 'kn', lang: 'Kannada', hero: 'Rohan, a tech intern', sky: ['#cfe6f2', '#eaf1d8'], accent: '#3f8f6b', tag: 'Say Namaskara to Namma Bengaluru with Rohan, pick up Kannada', hi: 'Namaskara!' },
  { id: 'chennai', title: 'Namma Chennai', city: 'Chennai', script: 'சென்னை', scriptCls: 'ta', lang: 'Tamil', hero: 'Meera, a food blogger', sky: ['#fbe0a8', '#f6ead0'], accent: '#d1447a', tag: 'Eat your way through Chennai with Meera, pick up Tamil', hi: 'Vanakkam!' },
  { id: 'hyderabad', title: 'Mana Hyderabad', city: 'Hyderabad', script: 'హైదరాబాద్', scriptCls: 'te', lang: 'Telugu', hero: 'Sameer, a college grad', sky: ['#f4d6d6', '#f6ecd2'], accent: '#a8553e', tag: 'Haggle in Laad Bazaar with Sameer, pick up Telugu', hi: 'Bagunnara?' },
  { id: 'kerala', title: 'Nammude Kochi', city: 'Kochi, Kerala', script: 'കൊച്ചി', scriptCls: 'ml', lang: 'Malayalam', hero: 'Ananya, a backpacker', sky: ['#ffd9a8', '#f6e6c8'], accent: '#2f8f8a', tag: 'Explore Kochi with Ananya, pick up Malayalam', hi: 'Namaskaram!' },
  { id: 'dozy-hollow', title: 'Dozy Hollow', city: 'The practice meadow', script: '', scriptCls: '', lang: 'Hindi basics', hero: 'the pink blob', sky: ['#dff0f4', '#f3f0d4'], accent: '#c77a9a', tag: 'Start gently in Dozy Hollow with the pink blob', hi: 'Namaste!', soft: true },
];

Object.keys(ART).forEach((id) => { ART[id] = withGuide(id, ART[id]); });

const card = (w) => `
<li id="card-${w.id}" class="slot${w.soft ? ' soft' : ''}" style="--accent:${w.accent};--sky-a:${w.sky[0]};--sky-b:${w.sky[1]}">
  <a class="card" href="?world=${w.id}" aria-label="${w.title}: ${w.lang} with ${w.hero}">
    <div class="art">${ART[w.id]}<span class="chip">${w.lang}</span></div>
    <div class="body">
      <h2>${w.title}</h2>
      <p class="city"><span>${w.city}</span>${w.script ? `<b class="script ${w.scriptCls}" lang="und">${w.script}</b>` : ''}</p>
      <p class="hero"><i></i>Your guide: ${w.hero}</p>
    </div>
  </a>
  <a class="tag" href="?world=${w.id}"><em>${w.hi}</em> ${w.tag} <span aria-hidden="true">&rarr;</span></a>
</li>`;


// ---- the line of flow: a shy thought drifts along a loose squiggle, passes through a voice-capsule, and comes out as a dark ribbon of greetings.
const THOUGHTS = ['umm…', 'what if I say it wrong…', 'okay, just say hi…', "they're probably nice…", 'one small word…'];
const GREETINGS = ['Kya bolta, bhidu?', 'नमस्ते', 'Aur bhai, kya haal?', 'Namaskara, hegiddira?', 'ನಮಸ್ಕಾರ', 'Vanakkam! Eppadi irukeenga?', 'வணக்கம்', 'Bagunnara?', 'నమస్కారం', 'Namaskaram, sukhamano?', 'നമസ്കാരം'];
const DOT = ' · ';
const FLOW_FONTS = "'Patrick Hand', 'Baloo Tamma 2', 'Baloo Thambi 2', 'Baloo Tammudu 2', 'Baloo Chettan 2', 'Tiro Devanagari Hindi', 'Noto Sans Devanagari', 'Noto Sans Kannada', 'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Malayalam', sans-serif";
const FLOW_THOUGHT_PATH = 'M-40 150C60 160 130 160 200 140C300 112 370 46 312 20C250 -4 150 34 168 104C186 172 330 196 430 144C500 108 560 106 600 108S650 110 700 110';
const FLOW_RIBBON_PATH = 'M700 110C780 110 790 128 880 130C980 132 1010 70 1110 74S1250 134 1340 100S1480 52 1560 58';
const BARS = [0.45, 0.8, 0.55, 1, 0.7, 0.95, 0.5, 0.85, 0.6, 1, 0.75, 0.5, 0.9, 0.55];
const flowSvg = () => `
<svg class="flow-svg" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A shy thought, umm what if I say it wrong, flows through a microphone and comes out as greetings in many Indian languages.">
  <defs><path id="flow-thought" d="${FLOW_THOUGHT_PATH}"/><path id="flow-ribbon" d="${FLOW_RIBBON_PATH}"/></defs>
  <use href="#flow-thought" fill="none" stroke="${INK}" stroke-opacity=".07" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round"/>
  <text class="flow-thought" font-family="${FLOW_FONTS}" font-size="31" fill="${INK}" fill-opacity=".4"><textPath id="flow-t1" href="#flow-thought" startOffset="0">${(THOUGHTS.join(' ') + ' ').repeat(3)}</textPath></text>
  <use href="#flow-ribbon" fill="none" stroke="${INK}" stroke-width="36" stroke-linecap="butt"/>
  <text class="flow-greet" font-family="${FLOW_FONTS}" font-size="23" fill="#fffaf0" dy="7.4"><textPath id="flow-t2" href="#flow-ribbon" startOffset="0">${(GREETINGS.join(DOT) + DOT).repeat(2)}</textPath></text>
  <g class="flow-pill">
    <rect x="618" y="76" width="204" height="68" rx="34" fill="#fffaf0" stroke="${INK}" stroke-width="3"/>
    <rect x="626" y="84" width="188" height="52" rx="26" fill="none" stroke="#e0517a" stroke-width="1.6" stroke-opacity=".35" stroke-dasharray="3 6" stroke-linecap="round"/>
    ${BARS.map((h, i) => `<rect class="bar" x="${651 + i * 11.4}" y="${110 - h * 25}" width="6" height="${h * 50}" rx="3" fill="${i % 4 === 1 ? '#e0517a' : INK}" style="animation-delay:${-((i * 0.37) % 1.3).toFixed(2)}s"/>`).join('')}
  </g>
  <text class="flow-cap" x="720" y="176" text-anchor="middle" font-family="Kalam, 'Patrick Hand', cursive" font-size="25" font-weight="700" fill="${INK}" fill-opacity=".8">speak it, don’t type it</text>
  <path d="M668 184Q720 198 772 184" fill="none" stroke="#e0517a" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// drift both texts along their paths via startOffset (rAF: SMIL startOffset is flaky in Safari). The text is repeated, and the offset wraps by exactly one repeat, so there is never a gap.
const startFlow = () => {
  const svg = document.querySelector('.flow-svg'); if (!svg) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const lanes = [
    { el: svg.querySelector('#flow-t1'), unit: THOUGHTS.join(' ') + ' ', speed: 20, w: 0 },
    { el: svg.querySelector('#flow-t2'), unit: GREETINGS.join(DOT) + DOT, speed: 34, w: 0 },
  ];
  let s = 0, last = 0, raf = 0;
  const measure = () => {
    for (const l of lanes) {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('font-family', l.el.parentNode.getAttribute('font-family')); t.setAttribute('font-size', l.el.parentNode.getAttribute('font-size')); t.setAttribute('xml:space', 'preserve'); t.style.visibility = 'hidden';
      t.textContent = l.unit; svg.append(t); l.w = t.getComputedTextLength(); t.remove();
      const path = svg.querySelector(l.el.getAttribute('href')); const need = Math.ceil((path.getTotalLength() + l.w) / l.w) + 1;
      if (need > 0) l.el.textContent = l.unit.repeat(need);
    }
  };
  const draw = () => { for (const l of lanes) if (l.w) l.el.setAttribute('startOffset', f(((s * l.speed) % l.w) - l.w)); };
  const tick = (now) => { if (last) s += Math.min(0.1, (now - last) / 1000); last = now; draw(); raf = requestAnimationFrame(tick); };
  const run = () => { cancelAnimationFrame(raf); last = 0; if (!reduce.matches && !document.hidden) raf = requestAnimationFrame(tick); else draw(); };
  const setup = () => { measure(); draw(); run(); };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(setup);
  document.addEventListener('visibilitychange', run);
  reduce.addEventListener && reduce.addEventListener('change', run);
};

// the hackathon credit: a tilted, perforated postage-stamp ticket. Text and a hand-drawn mic only, no logos.
const STAMP = `
<a class="stamp" href="https://www.wemakedevs.org/wispr" target="_blank" rel="noopener" aria-label="Made for No Hands, The Wispr Challenge, by WeMakeDevs and Wispr Flow, 16 to 31 October 2026">
  <span class="stamp-in">
    <span class="st-top"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="8.5" y="2.5" width="7" height="12" rx="3.5" fill="#e0517a" stroke="${INK}" stroke-width="1.8"/><path d="M5 11.5a7 7 0 0 0 14 0M12 18.5v3M8.5 21.5h7" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/></svg>Made for <b>No Hands</b></span>
    <span class="st-mid">The Wispr Challenge</span>
    <span class="st-sub">WeMakeDevs &times; Wispr Flow</span>
    <span class="st-date">16&ndash;31 Oct 2026 &middot; built by voice</span>
  </span>
</a>`;

export function mountHome() {
  document.documentElement.classList.add('home');
  document.title = 'Talk-a-bit';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.append(link);
  document.body.innerHTML = `
    <main class="home-page">
    <header class="hero-head">
      ${STAMP}
      <p class="kicker">a small game for shy talkers</p>
      <h1>Talk<span>-a-</span>bit</h1>
      <p class="tagline">Practise the language of the street, one small talk at a time.</p>
      <p class="sub">Wander a tiny city, find someone friendly, and say a few words. No pressure, no one is watching.</p>
      <svg class="squig" viewBox="0 0 260 14" aria-hidden="true"><path d="M3 8q16-10 32 0t32 0 32 0 32 0 32 0 32 0 32 0 22-3" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/></svg>
    </header>
    <div class="flow" role="presentation">${flowSvg()}</div>
    <h2 class="pick">Pick a city to wander</h2>
    <ul class="cards">${WORLDS.map(card).join('')}</ul>
    <footer>Made with ink, paper, a lot of chai, and mostly my voice. <span class="fo-hash">A #NoHandsChallenge entry for WeMakeDevs &times; Wispr Flow.</span> <span>Tip: press <kbd>H</kbd> twice inside a city to come back here.</span></footer>
  </main>`;
  startFlow();
}

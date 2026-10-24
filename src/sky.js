// Paper sky: faint cream gradient + hand-doodled sun, moon, clouds and stars (Canvas 2D sprites),
// plus the lights. The sun light follows the player (parallel-transported), so it is always day nearby.
import * as THREE from 'three';
import { PAPER_COLOR, INK_COLOR, AMBIENT_INTENSITY, OVERLAY_LAYER } from './ink.js';
import { PLANET_RADIUS } from './planet.js';

// ---- tunables --------------------------------------------------------------
const INK = '#' + INK_COLOR.toString(16).padStart(6, '0');
const SUN_LIGHT_UP = 0.8; // light direction = up * this + sunTangent * SUN_LIGHT_T (about 57 deg elevation)
const SUN_LIGHT_T = 0.5;
const SKY_DISTANCE = 300; // doodle shell radius around the player (or the planet centre when zoomed out)
const DEG = Math.PI / 180;
const SHADOW_HALF = 26; // half-size of the shadow camera box around the player
const CLOUD_COUNT = 10;
const STAR_COUNT = 44;

// ---- tiny seeded RNG for hand wobble ----------------------------------------
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

// ---- Canvas 2D doodle toolkit -------------------------------------------------
function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  return { c, ctx };
}

/** Smooth closed/open path through jittered points (a hand-drawn line). */
function wobblyPath(ctx, pts, closed, r, amp) {
  const p = pts.map(([x, y]) => [x + (r() - 0.5) * amp, y + (r() - 0.5) * amp]);
  const n = p.length;
  ctx.beginPath();
  if (closed) {
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const s = mid(p[n - 1], p[0]);
    ctx.moveTo(s[0], s[1]);
    for (let i = 0; i < n; i++) {
      const m = mid(p[i], p[(i + 1) % n]);
      ctx.quadraticCurveTo(p[i][0], p[i][1], m[0], m[1]);
    }
    ctx.closePath();
  } else {
    ctx.moveTo(p[0][0], p[0][1]);
    for (let i = 1; i < n - 1; i++) {
      const m = [(p[i][0] + p[i + 1][0]) / 2, (p[i][1] + p[i + 1][1]) / 2];
      ctx.quadraticCurveTo(p[i][0], p[i][1], m[0], m[1]);
    }
    ctx.lineTo(p[n - 1][0], p[n - 1][1]);
  }
}
const circlePts = (cx, cy, rad, n = 12) =>
  Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * Math.PI * 2) * rad, cy + Math.sin((i / n) * Math.PI * 2) * rad]);

/** Pencil fill (flat pastel + diagonal hatch) then a double ballpoint outline. */
function drawShape(ctx, pts, { fill, hatch, w = 256, h = 256, r, closed = true, amp = 3, lw = 3.2 }) {
  if (fill) {
    wobblyPath(ctx, pts, closed, r, 0);
    ctx.fillStyle = fill;
    ctx.fill();
    if (hatch) {
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = hatch; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.55;
      for (let x = -h; x < w + h; x += 7) {
        ctx.beginPath();
        ctx.moveTo(x + (r() - 0.5) * 2, 0);
        ctx.lineTo(x - h * 0.8 + (r() - 0.5) * 3, h);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  ctx.strokeStyle = INK;
  for (let pass = 0; pass < 2; pass++) {
    ctx.lineWidth = pass ? lw * 0.55 : lw;
    ctx.globalAlpha = pass ? 0.6 : 1;
    wobblyPath(ctx, pts, closed, r, amp);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

/** Cute face: dot or sleepy eyes, pink blush, small smile. */
function drawFace(ctx, cx, cy, s, { sleepy = false, r }) {
  ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineWidth = 3 * (s / 20);
  for (const sx of [-1, 1]) {
    const ex = cx + sx * s * 0.9, ey = cy;
    if (sleepy) {
      ctx.beginPath(); ctx.arc(ex, ey - s * 0.1, s * 0.34, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.arc(ex, ey, s * 0.22, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = 'rgba(244,140,165,0.75)';
    ctx.beginPath(); ctx.ellipse(cx + sx * s * 1.5, cy + s * 0.55, s * 0.36, s * 0.22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = INK;
  }
  ctx.beginPath(); ctx.arc(cx, cy + s * 0.5, s * 0.34, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
}

function drawZ(ctx, x, y, s) {
  ctx.strokeStyle = INK; ctx.lineWidth = s * 0.14;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s, y); ctx.lineTo(x, y + s); ctx.lineTo(x + s, y + s); ctx.stroke();
}

const toTexture = (c) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
};

// ---- the doodles ---------------------------------------------------------------
function sunTexture() {
  const { c, ctx } = makeCanvas(256, 256);
  const r = rng(3);
  for (let i = 0; i < 12; i++) { // rays
    const a = (i / 12) * Math.PI * 2 + 0.1;
    const len = i % 2 ? 24 : 36;
    wobblyPath(ctx, [[128 + Math.cos(a) * 80, 128 + Math.sin(a) * 80], [128 + Math.cos(a) * (80 + len / 2), 128 + Math.sin(a) * (80 + len / 2)], [128 + Math.cos(a) * (80 + len), 128 + Math.sin(a) * (80 + len)]], false, r, 2);
    ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
  }
  drawShape(ctx, circlePts(128, 128, 66, 14), { fill: '#f8dc6a', hatch: '#e9a93b', r });
  drawFace(ctx, 128, 122, 20, { r });
  return toTexture(c);
}

function moonTexture() {
  const { c, ctx } = makeCanvas(256, 256);
  const r = rng(9);
  // crescent = circle c1 minus circle c2; arcs meet at the two circle intersections
  const c1 = { x: 122, y: 140, r: 72 }, c2 = { x: 154, y: 126, r: 60 };
  const th = Math.atan2(c2.y - c1.y, c2.x - c1.x);
  const d = Math.hypot(c2.x - c1.x, c2.y - c1.y);
  const phi = Math.acos((c1.r * c1.r - c2.r * c2.r + d * d) / (2 * d * c1.r));
  const at = (c, a) => [c.x + Math.cos(a) * c.r, c.y + Math.sin(a) * c.r];
  const i1 = at(c1, th + phi), i2 = at(c1, th - phi);
  const b1 = Math.atan2(i1[1] - c2.y, i1[0] - c2.x), b2 = Math.atan2(i2[1] - c2.y, i2[0] - c2.x);
  const TAU = Math.PI * 2;
  const delta = (((b1 - b2) % TAU) + TAU) % TAU; // clockwise sweep from b2 to b1
  const viaFacing = Math.cos(b2 + delta / 2 - (th + Math.PI)) > 0; // must pass the side facing c1
  const crescent = () => {
    ctx.beginPath();
    ctx.arc(c1.x, c1.y, c1.r, th + phi, th + TAU - phi, false);
    ctx.arc(c2.x, c2.y, c2.r, b2, b1, !viaFacing);
    ctx.closePath();
  };
  crescent();
  ctx.fillStyle = '#e3def7'; ctx.fill();
  ctx.save(); ctx.clip();
  ctx.strokeStyle = '#8f86d8'; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.55;
  for (let x = -256; x < 512; x += 7) { ctx.beginPath(); ctx.moveTo(x + (r() - 0.5) * 2, 0); ctx.lineTo(x - 200 + (r() - 0.5) * 3, 256); ctx.stroke(); }
  ctx.restore();
  ctx.strokeStyle = INK;
  for (let pass = 0; pass < 2; pass++) { // double ballpoint line, second pass nudged
    ctx.save(); ctx.translate(pass * 1.2, pass * -1); ctx.lineWidth = pass ? 1.8 : 3.4; ctx.globalAlpha = pass ? 0.6 : 1;
    crescent(); ctx.stroke(); ctx.restore();
  }
  // sleepy face on the thick part
  ctx.strokeStyle = INK; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(66, 150, 8, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
  ctx.fillStyle = 'rgba(244,140,165,0.75)';
  ctx.beginPath(); ctx.ellipse(62, 170, 8, 5, 0, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.arc(76, 176, 6, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
  // nightcap flopping over the top
  drawShape(ctx, [[70, 104], [98, 66], [140, 42], [184, 58], [206, 86], [152, 72], [112, 100]], { fill: '#9fb7ee', hatch: '#5f78c8', r });
  drawShape(ctx, circlePts(207, 92, 12, 9), { fill: '#fff7e0', r, lw: 2.6 });
  drawZ(ctx, 206, 150, 18); drawZ(ctx, 226, 124, 12);
  return toTexture(c);
}

function cloudTexture(seed) {
  const { c, ctx } = makeCanvas(320, 200);
  const r = rng(seed);
  const pts = [];
  const bumps = 7 + (seed % 3);
  for (let i = 0; i < bumps * 2; i++) {
    const a = (i / (bumps * 2)) * Math.PI * 2;
    const rad = i % 2 ? 0.78 : 1.12; // alternate in/out for scalloped bumps
    pts.push([160 + Math.cos(a) * 112 * rad, 100 + Math.sin(a) * 58 * rad * (a > Math.PI ? 1.1 : 0.85)]);
  }
  drawShape(ctx, pts, { fill: '#fbf6e6', hatch: '#9db8e8', w: 320, h: 200, r });
  drawFace(ctx, 160, 100, 15, { sleepy: true, r });
  if (seed % 2) drawZ(ctx, 250, 58, 14);
  return toTexture(c);
}

function starTexture(seed) {
  const { c, ctx } = makeCanvas(64, 64);
  const r = rng(seed);
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i / 10) * Math.PI * 2;
    const rad = i % 2 ? 11 : 25;
    pts.push([32 + Math.cos(a) * rad, 34 + Math.sin(a) * rad]);
  }
  drawShape(ctx, pts, { fill: seed % 3 ? '#f8dc6a' : '#f4b6c6', w: 64, h: 64, r, amp: 1.5, lw: 2.2 });
  return toTexture(c);
}

function buntingTexture() {
  const { c, ctx } = makeCanvas(640, 170);
  const r = rng(5);
  const A = [24, 34], B = [320, 150], C = [616, 34];
  const at = (t) => [(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * B[0] + t * t * C[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * B[1] + t * t * C[1]];
  const line = []; for (let i = 0; i <= 10; i++) line.push(at(i / 10));
  wobblyPath(ctx, line, false, r, 2); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
  const cols = ['#f4b6c6', '#f8dc6a', '#bfe8cf', '#cfc4f2'];
  for (let i = 0; i < 9; i++) {
    const t = 0.07 + i * 0.108, [x, y] = at(t), [x2, y2] = at(t + 0.02);
    const ang = Math.atan2(y2 - y, x2 - x);
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang * 0.8);
    drawShape(ctx, [[-24, 0], [24, 0], [0, 56]], { fill: cols[i % 4], hatch: 'rgba(60,50,110,0.6)', w: 60, h: 60, r, closed: true, amp: 2, lw: 3 });
    ctx.restore();
  }
  return toTexture(c);
}

function makeSprite(tex, size, aspect = 1) {
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false });
  const s = new THREE.Sprite(mat);
  s.scale.set(size * aspect, size, 1);
  s.layers.set(OVERLAY_LAYER);
  return s;
}

// ---- sky -------------------------------------------------------------------------
export function createSky(scene, { shadowMapSize = 2048 } = {}) {
  scene.background = new THREE.Color(PAPER_COLOR);

  // faint warm gradient: a full-screen quad behind everything
  const grad = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      depthTest: false, depthWrite: false,
      uniforms: { uTop: { value: new THREE.Color(0xf1ebdc) }, uBot: { value: new THREE.Color(0xe7dcc3) } },
      vertexShader: 'varying float vY; void main(){ vY = position.y * 0.5 + 0.5; gl_Position = vec4(position.xy, 1.0, 1.0); }',
      fragmentShader: 'uniform vec3 uTop; uniform vec3 uBot; varying float vY; void main(){ gl_FragColor = vec4(mix(uBot, uTop, smoothstep(0.1, 0.95, vY)), 1.0); }',
    })
  );
  grad.frustumCulled = false;
  grad.renderOrder = -1000;
  grad.layers.set(OVERLAY_LAYER);
  scene.add(grad);

  // lights: warm soft sun + flat ambient (ink.js assumes sun intensity 1)
  const sun = new THREE.DirectionalLight(0xfff1d6, 1);
  sun.castShadow = true;
  sun.shadow.mapSize.set(shadowMapSize, shadowMapSize);
  const sc = sun.shadow.camera;
  sc.left = sc.bottom = -SHADOW_HALF; sc.right = sc.top = SHADOW_HALF; sc.near = 1; sc.far = 160;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.06;
  sun.shadow.radius = 3;
  scene.add(sun, sun.target);
  scene.add(new THREE.AmbientLight(0xfff4e6, AMBIENT_INTENSITY));

  // doodles: a shell of sprites placed by (azimuth, elevation) in the player's local frame, low enough
  // to sit just above the horizon in the default view. Elevations are relative to the camera view.
  const rnd = rng(77);
  const items = []; // { s, az, el, speed, dist, bob }
  const add = (s, az, el, speed = 0, dist = SKY_DISTANCE) => { scene.add(s); items.push({ s, az, el, speed, dist, bob: rnd() * 6 }); return items[items.length - 1]; };

  const sunSprite = makeSprite(sunTexture(), 78);
  const moonSprite = makeSprite(moonTexture(), 66);
  add(sunSprite, 0, -7 * DEG);
  add(moonSprite, Math.PI + 0.25, -9 * DEG);
  
  for (let i = 0; i < CLOUD_COUNT; i++) {
    const size = 52 + rnd() * 34;
    add(makeSprite(cloudTexture(i + 2), size, 1.6), (i / CLOUD_COUNT) * Math.PI * 2 + rnd() * 0.3 + 0.5, (-13 + rnd() * 14) * DEG, 0.004 + rnd() * 0.006, 230 + rnd() * 80);
  }
  add(makeSprite(buntingTexture(), 60, 3.76), -0.95, -13 * DEG, 0.003, 280);
  const starTex = [starTexture(1), starTexture(2), starTexture(3)];
  for (let i = 0; i < STAR_COUNT; i++) {
    const low = i % 3 === 0; // a third of them hug the horizon band so some are always in frame
    const st = makeSprite(starTex[i % 3], 16 + rnd() * 16);
    st.material.rotation = rnd() * 0.8 - 0.4;
    add(st, rnd() * Math.PI * 2, (low ? -16 + rnd() * 18 : 5 + rnd() * 60) * DEG, 0.002, 380);
  }

  // sun tangent is transported with the player so light/shadow direction stays consistent
  const sunT = new THREE.Vector3(0.45, 0, -0.9).normalize(); // sun starts ahead and a bit right of the spawn view
  const lightDir = new THREE.Vector3();
  const side = new THREE.Vector3();
  const centre = new THREE.Vector3();
  const dir = new THREE.Vector3();
  let t = 0;

  return {
    sun,
    /** zoom01: 0 = normal camera, 1 = max zoom-out (the shell then centres on the planet). */
    update(dt, playerPos, up, zoom01 = 0) {
      t += dt;
      sunT.addScaledVector(up, -sunT.dot(up));
      if (sunT.lengthSq() < 1e-6) sunT.set(1, 0, 0).addScaledVector(up, -up.x);
      sunT.normalize();

      lightDir.copy(up).multiplyScalar(SUN_LIGHT_UP).addScaledVector(sunT, SUN_LIGHT_T).normalize();
      sun.target.position.copy(playerPos);
      sun.position.copy(playerPos).addScaledVector(lightDir, 80);
      sun.target.updateMatrixWorld();

      side.crossVectors(up, sunT);
      centre.copy(playerPos).multiplyScalar(1 - zoom01);
      for (const it of items) {
        const az = it.az + it.speed * t, el = it.el + Math.sin(t * 0.4 + it.bob) * 0.012;
        dir.copy(sunT).multiplyScalar(Math.cos(el) * Math.cos(az))
          .addScaledVector(side, Math.cos(el) * Math.sin(az))
          .addScaledVector(up, Math.sin(el));
        it.s.position.copy(centre).addScaledVector(dir, it.dist);
      }
      sunSprite.material.rotation = Math.sin(t * 0.3) * 0.05;
      moonSprite.material.rotation = Math.sin(t * 0.25 + 1) * 0.06;
    },
  };
}

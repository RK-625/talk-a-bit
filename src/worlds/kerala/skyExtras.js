/**
 * kerala/skyExtras.js: the extra sky doodles on top of Dozy Hollow's sun / moon / sleepy clouds / stars / bunting:
 *   - seven big grey monsoon cloud banks
 *   - nine flapping crow doodles drifting across
 *   - a humid grey-green tint on the paper gradient
 * skyExtras(skyApi) is the world's sky.extra hook (see engine/sky.js).
 */
import * as THREE from 'three';

const DEG = Math.PI / 180;

export function skyExtras({ scene, add, makeSprite, items, rnd, doodle }) {
  const { makeCanvas, drawShape, wobblyPath, toTexture, rng, INK } = doodle;

  // humid monsoon paper gradient: grey-green haze up high, soft pale green-cream toward the horizon
  const grad = scene.children.find((o) => o.material?.uniforms?.uTop);
  if (grad) { grad.material.uniforms.uTop.value.set(0xc9d6d4); grad.material.uniforms.uBot.value.set(0xe9ecd9); }

  // ---- big monsoon clouds: wide, heavy, grey-blue banks (ballpoint doodle style: wobbly outline + hatch), drifting slowly ----------------------
  function monsoonTexture(i) {
    const W = 512, H = 256;
    const { c, ctx } = makeCanvas(W, H);
    const r = rng(300 + i * 17);
    const pts = [];
    const bumps = 11 + (i % 3);
    for (let k = 0; k < bumps * 2; k++) {
      const a = (k / (bumps * 2)) * Math.PI * 2;
      const rad = k % 2 ? 0.8 : 1.1;
      const flat = a > 0 && a < Math.PI ? 0.6 : 0.95; // flatter, heavier belly
      pts.push([W / 2 + Math.cos(a) * 224 * rad, 118 + Math.sin(a) * 84 * rad * flat]);
    }
    drawShape(ctx, pts, { fill: i % 2 ? '#c3ccd0' : '#cdd5d6', hatch: 'rgba(70,92,120,0.55)', w: W, h: H, r, amp: 3, lw: 3.4 });
    // a second, lower dark belly with slanted rain-hatching
    drawShape(ctx, [[110, 150], [200, 168], [300, 172], [400, 158], [440, 144], [330, 190], [200, 188]], { fill: '#a9b4bb', hatch: 'rgba(50,70,100,0.6)', w: W, h: H, r, amp: 2.4, lw: 3 });
    return toTexture(c);
  }
  const clouds = [[0.2, -9, 120], [1.1, -6, 104], [1.9, -11, 130], [2.8, -7, 112], [3.6, -10, 124], [4.4, -5, 100], [5.3, -9, 116]];
  clouds.forEach(([az, el, size], i) => {
    add(makeSprite(monsoonTexture(i), size, 2), az, el * DEG, 0.003 + rnd() * 0.004, 255 + rnd() * 40);
  });

  // ---- crows (two-frame flap) -----------------------------------------------------------------------------------
  function crowTextures() {
    const make = (wingsUp) => {
      const { c, ctx } = makeCanvas(128, 64);
      const r = rng(5);
      ctx.strokeStyle = INK; ctx.fillStyle = '#3a3550'; ctx.lineWidth = 3.4;
      // body
      drawShape(ctx, [[48, 36], [64, 32], [84, 36], [96, 38], [84, 42], [62, 44]], { fill: '#3a3550', w: 128, h: 64, r, amp: 1, lw: 2.6 });
      // wings: one on each side, up or down
      const dy = wingsUp ? -20 : 14;
      drawShape(ctx, [[58, 34], [40, 34 + dy * 0.6], [22, 30 + dy], [50, 40]], { fill: '#2d2942', w: 128, h: 64, r, amp: 1, lw: 2.6 });
      drawShape(ctx, [[70, 34], [88, 34 + dy * 0.6], [108, 30 + dy], [78, 40]], { fill: '#2d2942', w: 128, h: 64, r, amp: 1, lw: 2.6 });
      // beak
      drawShape(ctx, [[96, 36], [110, 38], [96, 41]], { fill: '#8a8498', w: 128, h: 64, r, amp: 0.5, lw: 2 });
      return toTexture(c);
    };
    return [make(true), make(false)];
  }
  const [up, down] = crowTextures();
  for (let i = 0; i < 9; i++) {
    const s = makeSprite(up, 10 + (i % 2) * 3, 2);
    const item = add(s, 0.3 + i * 1.3 + rnd(), (-2 + rnd() * 16) * DEG, (i % 2 ? 1 : -1) * (0.006 + rnd() * 0.004), 240 + rnd() * 40);
    const ph = rnd() * 3, base = item.el;
    item.onUpdate = (it, t) => { s.material.map = Math.sin(t * 7 + ph * 9) > 0 ? up : down; s.material.rotation = Math.sin(t * 0.7 + ph) * 0.08; it.el = base + Math.sin(t * 1.1 + ph) * 0.01; };
  }
  void items; void THREE;
}

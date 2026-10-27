/**
 * delhi/skyExtras.js: the extra sky doodles on top of Dozy Hollow's sun / moon / sleepy clouds / stars / bunting:
 *   - a warm, slightly hazy north-Indian tint on the paper gradient (pale milky grey-blue up high to a warm dusty cream at the horizon)
 *   - 6 grey pigeons wheeling low (added for Delhi)
 *   - 7 black kites (the birds, Milvus migrans) circling lazily on thermals, wings spread, forked tails, banking as they turn
 * skyExtras(skyApi) is the world's sky.extra hook (see engine/sky.js). index.js asks for fewer clouds (7) than Mumbai's 10: the Deccan sky is dry.
 */
import * as THREE from 'three';

const DEG = Math.PI / 180;

export function skyExtras({ scene, add, makeSprite, items, rnd, doodle }) {
  const { makeCanvas, drawShape, toTexture, rng, INK } = doodle;

  // warm dry-season paper gradient: pale hazy blue up high, warm sandy cream toward the horizon
  const grad = scene.children.find((o) => o.material?.uniforms?.uTop);
  if (grad) { grad.material.uniforms.uTop.value.set(0xe0e6e2); grad.material.uniforms.uBot.value.set(0xf4e4c4); }

  // ---- black kites: soaring silhouette, wings spread, notched tail, pale patch under the wing ---------------------------
  function kiteBirdTexture() {
    const W = 192, H = 96;
    const { c, ctx } = makeCanvas(W, H);
    const r = rng(7);
    ctx.strokeStyle = INK; ctx.lineWidth = 3;
    const dark = '#3b3650', dark2 = '#2d2942', pale = '#a29aac';
    // wings (long, slightly swept, fingered tips)
    drawShape(ctx, [[92, 46], [66, 38], [38, 36], [12, 44], [20, 49], [10, 52], [30, 54], [24, 59], [60, 56], [90, 54]], { fill: dark2, w: W, h: H, r, amp: 1, lw: 2.6 });
    drawShape(ctx, [[100, 46], [126, 38], [154, 36], [180, 44], [172, 49], [182, 52], [162, 54], [168, 59], [132, 56], [102, 54]], { fill: dark2, w: W, h: H, r, amp: 1, lw: 2.6 });
    drawShape(ctx, [[58, 50], [30, 50], [48, 55]], { fill: pale, w: W, h: H, r, amp: 0.5, lw: 1.6 });
    drawShape(ctx, [[134, 50], [162, 50], [144, 55]], { fill: pale, w: W, h: H, r, amp: 0.5, lw: 1.6 });
    // forked tail
    drawShape(ctx, [[90, 56], [102, 56], [110, 84], [99, 76], [96, 80], [93, 76], [82, 84]], { fill: dark, w: W, h: H, r, amp: 0.8, lw: 2.4 });
    // body + head + beak
    drawShape(ctx, [[86, 44], [96, 36], [106, 44], [104, 60], [88, 60]], { fill: dark, w: W, h: H, r, amp: 0.8, lw: 2.6 });
    drawShape(ctx, [[89, 40], [96, 30], [103, 40]], { fill: '#4a4560', w: W, h: H, r, amp: 0.5, lw: 2.2 });
    drawShape(ctx, [[94, 30], [97, 24], [99, 31]], { fill: '#e6b94a', w: W, h: H, r, amp: 0.3, lw: 1.8 });
    return toTexture(c);
  }
  const tex = kiteBirdTexture();
  const N = 7;
  for (let i = 0; i < N; i++) {
    const w = 15 + (i % 3) * 3.5;
    const s = makeSprite(tex, w / 2, 2);
    const base = s.scale.x;
    const cx = (i / N) * Math.PI * 2 + rnd() * 0.4, cy = (3 + rnd() * 16) * DEG;
    const rAz = 0.05 + rnd() * 0.06, rEl = 0.018 + rnd() * 0.02, om = (0.16 + rnd() * 0.1) * (i % 2 ? 1 : -1), ph = rnd() * 6.28;
    const item = add(s, cx, cy, 0, 235 + rnd() * 40);
    item.onUpdate = (it, t) => {
      const a = ph + om * t;
      it.az = cx + rAz * Math.cos(a);
      it.el = cy + rEl * Math.sin(a);
      s.scale.x = base * (0.62 + 0.38 * Math.abs(Math.sin(a + 0.6))); // narrows as the bird banks round the circle
      s.material.rotation = Math.cos(a) * 0.22 * Math.sign(om);
    };
  }

  // ---- pigeons: a small flock of grey-blue pigeons wheeling low over the rooftops (small, wings up in a shallow V) --------------------------
  function pigeonTexture() {
    const W = 96, H = 64;
    const { c, ctx } = makeCanvas(W, H);
    const r = rng(11);
    ctx.strokeStyle = INK; ctx.lineWidth = 2.4;
    const grey = '#a9afc0', dark = '#7d8399', pale = '#d9dce6';
    drawShape(ctx, [[46, 30], [30, 14], [14, 10], [8, 18], [22, 28], [40, 38]], { fill: grey, w: W, h: H, r, amp: 0.6, lw: 2.2 });
    drawShape(ctx, [[50, 30], [66, 14], [82, 10], [88, 18], [74, 28], [56, 38]], { fill: grey, w: W, h: H, r, amp: 0.6, lw: 2.2 });
    drawShape(ctx, [[42, 30], [48, 28], [54, 30], [52, 46], [44, 46]], { fill: dark, w: W, h: H, r, amp: 0.5, lw: 2.2 });
    drawShape(ctx, [[44, 46], [52, 46], [56, 58], [40, 58]], { fill: pale, w: W, h: H, r, amp: 0.4, lw: 1.8 });
    drawShape(ctx, [[44, 30], [48, 22], [52, 30]], { fill: dark, w: W, h: H, r, amp: 0.3, lw: 1.8 });
    return toTexture(c);
  }
  const ptex = pigeonTexture();
  for (let i = 0; i < 6; i++) {
    const s = makeSprite(ptex, (3.2 + (i % 2) * 0.8) / 2, 2);
    const base = s.scale.x;
    const cx = (i / 6) * Math.PI * 2 + 0.7 + rnd() * 0.5, cy = (1 + rnd() * 6) * DEG;
    const rAz = 0.03 + rnd() * 0.03, rEl = 0.008 + rnd() * 0.01, om = (0.5 + rnd() * 0.3) * (i % 2 ? 1 : -1), ph = rnd() * 6.28;
    const item = add(s, cx, cy, 0, 150 + rnd() * 30);
    item.onUpdate = (it, t) => {
      const a = ph + om * t;
      it.az = cx + rAz * Math.cos(a);
      it.el = cy + rEl * Math.sin(a * 1.7);
      s.scale.x = base * (0.7 + 0.3 * Math.abs(Math.sin(a * 5))); // wing flaps
      s.material.rotation = Math.cos(a) * 0.15 * Math.sign(om);
    };
  }
  void items; void THREE;
}

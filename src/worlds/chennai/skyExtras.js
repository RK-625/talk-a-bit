/**
 * chennai/skyExtras.js: the extra sky doodles on top of Dozy Hollow's sun / moon / sleepy clouds / stars / bunting:
 *   - 4 paper kites with ink tails and strings, gently swaying
 *   - nine flapping crow doodles drifting across (Chennai's crows)
 *   - a bright, hot, slightly hazy tint on the paper gradient
 * skyExtras(skyApi) is the world's sky.extra hook (see engine/sky.js).
 */
import * as THREE from 'three';

const DEG = Math.PI / 180;

export function skyExtras({ scene, add, makeSprite, items, rnd, doodle }) {
  const { makeCanvas, drawShape, wobblyPath, toTexture, rng, INK } = doodle;

  // bright hot-day paper gradient: washed pale blue-white up high, a thin warm haze toward the horizon
  const grad = scene.children.find((o) => o.material?.uniforms?.uTop);
  if (grad) { grad.material.uniforms.uTop.value.set(0xe9f3f1); grad.material.uniforms.uBot.value.set(0xf8e9c6); }

  // ---- kites ----------------------------------------------------------------------------------------------------
  const palettes = [['#f4b6c6', '#f8dc6a'], ['#9fd0e6', '#f6a634'], ['#bfe8cf', '#e45d52'], ['#cfc4f2', '#f8dc6a'], ['#f6a634', '#8fd3c6'], ['#e45d52', '#fbf6e6']];
  function kiteTexture(i) {
    const W = 192, H = 384;
    const { c, ctx } = makeCanvas(W, H);
    const r = rng(100 + i * 13);
    const [a, b] = palettes[i % palettes.length];
    const cx = W / 2, cy = 92;
    // string (a long lazy curve down, fading)
    ctx.strokeStyle = 'rgba(43,36,64,0.55)'; ctx.lineWidth = 2.2;
    wobblyPath(ctx, [[cx, cy + 66], [cx - 22, cy + 150], [cx + 18, cy + 230], [cx - 10, cy + 300], [cx + 6, H - 6]], false, r, 3);
    ctx.stroke();
    // tail with little paper bows
    const tail = [[cx, cy + 66], [cx + 20, cy + 100], [cx - 12, cy + 128], [cx + 16, cy + 156], [cx - 8, cy + 180]];
    ctx.strokeStyle = INK; ctx.lineWidth = 3;
    wobblyPath(ctx, tail, false, r, 2); ctx.stroke();
    tail.slice(1).forEach(([x, y], k) => {
      drawShape(ctx, [[x - 11, y - 6], [x, y], [x - 11, y + 7]], { fill: k % 2 ? b : a, w: W, h: H, r, amp: 1, lw: 2 });
      drawShape(ctx, [[x + 11, y - 6], [x, y], [x + 11, y + 7]], { fill: k % 2 ? a : b, w: W, h: H, r, amp: 1, lw: 2 });
    });
    // kite body: diamond split in two colours, cross spars
    const top = [cx, cy - 78], left = [cx - 58, cy - 6], right = [cx + 58, cy - 6], bot = [cx, cy + 66];
    drawShape(ctx, [top, left, [cx, cy - 6]], { fill: a, hatch: 'rgba(60,50,110,0.5)', w: W, h: H, r, amp: 1.5, lw: 3.2 });
    drawShape(ctx, [top, right, [cx, cy - 6]], { fill: b, hatch: 'rgba(60,50,110,0.5)', w: W, h: H, r, amp: 1.5, lw: 3.2 });
    drawShape(ctx, [bot, left, [cx, cy - 6]], { fill: b, hatch: 'rgba(60,50,110,0.5)', w: W, h: H, r, amp: 1.5, lw: 3.2 });
    drawShape(ctx, [bot, right, [cx, cy - 6]], { fill: a, hatch: 'rgba(60,50,110,0.5)', w: W, h: H, r, amp: 1.5, lw: 3.2 });
    ctx.strokeStyle = INK; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(bot[0], bot[1]); ctx.moveTo(left[0], left[1]); ctx.lineTo(right[0], right[1]); ctx.stroke();
    // a sleepy-happy face at the crossing
    ctx.lineWidth = 2.4;
    for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + sx * 12, cy - 12, 5, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(cx, cy - 2, 6, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
    return toTexture(c);
  }
  const kiteAz = [-0.55, 0.7, -1.2, 2.1];
  kiteAz.forEach((az, i) => {
    const s = makeSprite(kiteTexture(i), 46 + (i % 3) * 8, 0.5);
    s.center.set(0.5, 0.75); // rotate about the kite body, not the end of its string
    const item = add(s, az, (-3 + (i % 4) * 5.5) * DEG, 0.0012 + rnd() * 0.0016, 250 + rnd() * 50);
    const ph = rnd() * 6, base = item.el;
    item.onUpdate = (it, t) => {
      s.material.rotation = Math.sin(t * 0.9 + ph) * 0.13 + Math.sin(t * 2.3 + ph * 2) * 0.03;
      it.el = base + Math.sin(t * 0.35 + ph) * 0.03;
    };
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

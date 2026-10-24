/**
 * engine/doodle.js: Canvas 2D "ballpoint + colored pencil" painters, used by the sky and by world assets
 * (signs, faces, painted textures). All strokes wobble; shapes get a pencil fill and a double ink outline.
 *
 * Exports
 *   INK                              '#2b2440' css string of the ink colour
 *   rng(seed) -> () => [0,1)         tiny seeded RNG (hand wobble must be deterministic)
 *   makeCanvas(w, h) -> {c, ctx}     canvas with round caps/joins
 *   toTexture(canvas) -> CanvasTexture (sRGB, anisotropy 4)
 *   circlePts(cx, cy, r, n=12) -> [[x,y]...]   points on a circle (feed to drawShape)
 *   wobblyPath(ctx, pts, closed, r, amp)       build a smooth jittered path (no stroke); r = rng
 *   wobblyLine(ctx, pts, {r, amp=2, lw=3, color=INK, closed=false})   stroked double ballpoint line
 *   drawShape(ctx, pts, {fill, hatch, w, h, r, closed=true, amp=3, lw=3.2})
 *                                    pencil fill (+ diagonal hatch colour) + double ink outline
 *   drawFace(ctx, cx, cy, s, {sleepy=false, r})  dot/sleepy eyes, blush, smile (s ~ eye spacing)
 *   drawZ(ctx, x, y, s)              the sleepy "z"
 *   drawText(ctx, text, x, y, {size=32, color=INK, align='center', r, font})  hand-lettered text with jitter
 */
import * as THREE from 'three';
import { INK_COLOR } from './ink.js';

export const INK = '#' + INK_COLOR.toString(16).padStart(6, '0');

// ---- tiny seeded RNG for hand wobble ----------------------------------------
export function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

// ---- Canvas 2D doodle toolkit -------------------------------------------------
export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  return { c, ctx };
}

/** Smooth closed/open path through jittered points (a hand-drawn line). */
export function wobblyPath(ctx, pts, closed, r, amp) {
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
export const circlePts = (cx, cy, rad, n = 12) =>
  Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * Math.PI * 2) * rad, cy + Math.sin((i / n) * Math.PI * 2) * rad]);

/** Pencil fill (flat pastel + diagonal hatch) then a double ballpoint outline. */
export function drawShape(ctx, pts, { fill, hatch, w = 256, h = 256, r, closed = true, amp = 3, lw = 3.2 }) {
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
export function drawFace(ctx, cx, cy, s, { sleepy = false, r }) {
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

export function drawZ(ctx, x, y, s) {
  ctx.strokeStyle = INK; ctx.lineWidth = s * 0.14;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s, y); ctx.lineTo(x, y + s); ctx.lineTo(x + s, y + s); ctx.stroke();
}

export const toTexture = (c) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
};


/** Stroked ballpoint line through points (double pass, second thinner and nudged). */
export function wobblyLine(ctx, pts, { r = rng(1), amp = 2, lw = 3, color = INK, closed = false } = {}) {
  ctx.strokeStyle = color;
  for (let pass = 0; pass < 2; pass++) {
    ctx.lineWidth = pass ? lw * 0.55 : lw;
    ctx.globalAlpha = pass ? 0.6 : 1;
    wobblyPath(ctx, pts, closed, r, amp);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

/** Hand-lettered text: each glyph is drawn with a little random rotation, offset and size wobble. */
export function drawText(ctx, text, x, y, { size = 32, color = INK, align = 'center', r = rng(7), font = "'Bradley Hand','Segoe Print','Comic Sans MS','Marker Felt',cursive" } = {}) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textBaseline = 'alphabetic';
  ctx.font = `bold ${size}px ${font}`;
  const widths = [...text].map((ch) => ctx.measureText(ch).width * 0.96);
  const total = widths.reduce((a, b) => a + b, 0);
  let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
  [...text].forEach((ch, i) => {
    ctx.save();
    ctx.translate(cx + widths[i] / 2 + (r() - 0.5) * size * 0.06, y + (r() - 0.5) * size * 0.1);
    ctx.rotate((r() - 0.5) * 0.14);
    ctx.scale(1, 0.94 + r() * 0.12);
    ctx.textAlign = 'center';
    ctx.fillText(ch, 0, 0);
    ctx.restore();
    cx += widths[i];
  });
  ctx.restore();
}

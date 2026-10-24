/**
 * engine/input.js: createInput(canvas) -> { read() } where read() returns and resets
 *   { moveX (+1 right), moveY (+1 forward), jump (held), lookDX, lookDY (px since last read), zoom (+ = out, fractional) }.
 *   Keyboard WASD/arrows/Space, mouse drag, wheel; touch devices get a hand-drawn joystick + jump button. Also exports isTouchDevice.
 */
// Keyboard + mouse + touch input -> { moveX, moveY, jump, lookDX, lookDY, zoom }
//   moveX: +1 right, moveY: +1 forward, jump: held, lookDX/DY: pixels since last read,
//   zoom: fractional distance change since last read (+ = zoom out).
import { INK_COLOR } from './ink.js';

// ---- tunables --------------------------------------------------------------
const JOY_SIZE = 132;
const JOY_KNOB = 56;
const JUMP_SIZE = 92;
const INK = '#' + INK_COLOR.toString(16).padStart(6, '0');
const CREAM = '#f3eddc';
const PINK = '#f4b6c6';

export const isTouchDevice =
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(pointer: coarse)').matches || 'ontouchstart' in window);

export function createInput(canvas) {
  const keys = new Set();
  let look = { x: 0, y: 0 };
  let zoom = 0;
  const joy = { x: 0, y: 0 };
  let jumpTouch = false;

  // ---- keyboard ----
  const onKey = (down) => (e) => {
    if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
    if (down) keys.add(e.code);
    else keys.delete(e.code);
  };
  window.addEventListener('keydown', onKey(true));
  window.addEventListener('keyup', onKey(false));
  window.addEventListener('blur', () => keys.clear());

  // ---- mouse drag, touch look and pinch (pointer events on the canvas) ----
  canvas.style.touchAction = 'none';
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  const pts = new Map(); // pointerId -> { x, y, look }
  let pinchPrev = null;

  const pinchDist = () => {
    const [a, b] = [...pts.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    // touch look only starts on the right half of the screen (left is the joystick side)
    const allowed = e.pointerType !== 'touch' || e.clientX > window.innerWidth * 0.4;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY, look: allowed });
    if (pts.size === 2) pinchPrev = pinchDist();
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pts.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (pts.size >= 2 && e.pointerType === 'touch') {
      const d = pinchDist();
      if (pinchPrev) zoom += (pinchPrev - d) / pinchPrev;
      pinchPrev = d;
    } else if (p.look) {
      look.x += dx; look.y += dy;
    }
  });
  const end = (e) => {
    pts.delete(e.pointerId);
    if (pts.size < 2) pinchPrev = null;
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 33 : 1;
      zoom += Math.max(-300, Math.min(300, e.deltaY * unit)) * 0.0012;
    },
    { passive: false }
  );

  // ---- on-screen controls (touch devices only) ----
  if (isTouchDevice) buildTouchUI(joy, (v) => (jumpTouch = v));

  return {
    read() {
      let mx = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
      let my = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
      mx += joy.x; my += joy.y;
      const len = Math.hypot(mx, my);
      if (len > 1) { mx /= len; my /= len; }
      const state = {
        moveX: mx,
        moveY: my,
        jump: keys.has('Space') || jumpTouch,
        lookDX: look.x,
        lookDY: look.y,
        zoom,
      };
      look = { x: 0, y: 0 };
      zoom = 0;
      return state;
    },
  };
}

// ---- hand-drawn touch controls ---------------------------------------------
function wobblyCircle(r, seed, amp = 2.2, n = 18) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647) - 0.5;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r + rnd() * amp * 2;
    pts.push([Math.cos(a) * rr, Math.sin(a) * rr]);
  }
  // closed Catmull-Rom -> cubic bezier
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + ' Z';
}

function circleSVG(size, fill, seed, inner = '') {
  const c = size / 2, r = size / 2 - 5;
  return `<svg width="${size}" height="${size}" viewBox="${-c} ${-c} ${size} ${size}" style="position:absolute;inset:0;overflow:visible">
    <path d="${wobblyCircle(r, seed)}" fill="${fill}" fill-opacity="0.82" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="${wobblyCircle(r - 1.5, seed + 99, 1.6)}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-opacity="0.55"/>
    ${inner}</svg>`;
}

function buildTouchUI(joy, setJump) {
  const root = document.createElement('div');
  root.style.cssText = 'position:fixed;inset:0;pointer-events:none;user-select:none;-webkit-user-select:none;z-index:5';
  document.body.appendChild(root);

  // joystick
  const base = document.createElement('div');
  base.style.cssText = `position:absolute;left:max(24px,env(safe-area-inset-left));bottom:max(28px,env(safe-area-inset-bottom));width:${JOY_SIZE}px;height:${JOY_SIZE}px;pointer-events:auto;touch-action:none`;
  base.innerHTML = circleSVG(JOY_SIZE, CREAM, 17);
  const knob = document.createElement('div');
  knob.style.cssText = `position:absolute;left:${(JOY_SIZE - JOY_KNOB) / 2}px;top:${(JOY_SIZE - JOY_KNOB) / 2}px;width:${JOY_KNOB}px;height:${JOY_KNOB}px;pointer-events:none`;
  knob.innerHTML = circleSVG(
    JOY_KNOB, PINK, 5,
    `<circle cx="-8" cy="-3" r="2.4" fill="${INK}"/><circle cx="8" cy="-3" r="2.4" fill="${INK}"/>
     <path d="M -6 5 Q 0 10 6 5" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`
  );
  base.appendChild(knob);
  root.appendChild(base);

  let joyId = null;
  const setStick = (e) => {
    const r = base.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const max = (JOY_SIZE - JOY_KNOB) / 2 + 8;
    const len = Math.hypot(dx, dy);
    if (len > max) { dx *= max / len; dy *= max / len; }
    knob.style.transform = `translate(${dx}px,${dy}px)`;
    joy.x = dx / max;
    joy.y = -dy / max; // screen up = forward
  };
  base.addEventListener('pointerdown', (e) => {
    if (joyId !== null) return;
    joyId = e.pointerId;
    base.setPointerCapture(e.pointerId);
    setStick(e);
  });
  base.addEventListener('pointermove', (e) => { if (e.pointerId === joyId) setStick(e); });
  const endStick = (e) => {
    if (e.pointerId !== joyId) return;
    joyId = null;
    joy.x = joy.y = 0;
    knob.style.transform = '';
  };
  base.addEventListener('pointerup', endStick);
  base.addEventListener('pointercancel', endStick);

  // jump button
  const btn = document.createElement('div');
  btn.style.cssText = `position:absolute;right:max(26px,env(safe-area-inset-right));bottom:max(40px,env(safe-area-inset-bottom));width:${JUMP_SIZE}px;height:${JUMP_SIZE}px;pointer-events:auto;touch-action:none;transition:transform .08s`;
  btn.innerHTML = circleSVG(
    JUMP_SIZE, CREAM, 41,
    `<text x="0" y="8" text-anchor="middle" font-size="26" fill="${INK}" font-family="'Bradley Hand','Segoe Print','Comic Sans MS','Marker Felt',cursive" font-style="italic">hop!</text>`
  );
  root.appendChild(btn);
  let jumpId = null;
  btn.addEventListener('pointerdown', (e) => {
    jumpId = e.pointerId;
    btn.setPointerCapture(e.pointerId);
    btn.style.transform = 'scale(0.92)';
    setJump(true);
  });
  const endJump = (e) => {
    if (e.pointerId !== jumpId) return;
    jumpId = null;
    btn.style.transform = '';
    setJump(false);
  };
  btn.addEventListener('pointerup', endJump);
  btn.addEventListener('pointercancel', endJump);
}

/**
 * engine/input.js: createInput(canvas) -> { read() } where read() returns and resets
 *   { moveX (+1 right), moveY (+1 forward), jump (held), sprint (Shift held), lookDX, lookDY (px since last read), zoom (+ = out, fractional) }.
 *   Desktop only: keyboard WASD/arrows/Space/Shift, mouse drag, wheel. Keys are ignored while a text field has focus (conversations).
 *   input.setLocked(true) freezes movement/look/zoom (conversations); input.clearKeys() drops held keys.
 */
// Keyboard + mouse input -> { moveX, moveY, jump, lookDX, lookDY, zoom }
//   moveX: +1 right, moveY: +1 forward, jump: held, lookDX/DY: pixels since last read,
//   zoom: fractional distance change since last read (+ = zoom out).
export function createInput(canvas) {
  const keys = new Set();
  let look = { x: 0, y: 0 };
  let zoom = 0;
  let locked = false;

  // ---- keyboard ----
  const typing = (e) => { const t = e.target; return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable); };
  const onKey = (down) => (e) => {
    if (typing(e)) { if (!down) keys.delete(e.code); return; } // typing in a text field never moves Chotu
    if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
    if (down) keys.add(e.code);
    else keys.delete(e.code);
  };
  window.addEventListener('keydown', onKey(true));
  window.addEventListener('keyup', onKey(false));
  window.addEventListener('blur', () => keys.clear());

  // ---- mouse drag (pointer events on the canvas) ----
  canvas.style.touchAction = 'none';
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  const pts = new Map(); // pointerId -> { x, y }
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pts.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (!locked) { look.x += dx; look.y += dy; }
  });
  const end = (e) => { pts.delete(e.pointerId); };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 33 : 1;
      if (!locked) zoom += Math.max(-300, Math.min(300, e.deltaY * unit)) * 0.0012;
    },
    { passive: false }
  );

  return {
    /** freeze movement, orbit and zoom (conversations) */
    setLocked(v) { locked = !!v; if (locked) { keys.clear(); look = { x: 0, y: 0 }; zoom = 0; } },
    get locked() { return locked; },
    clearKeys() { keys.clear(); },
    read() {
      if (locked) { look = { x: 0, y: 0 }; zoom = 0; return { moveX: 0, moveY: 0, jump: false, sprint: false, lookDX: 0, lookDY: 0, zoom: 0 }; }
      let mx = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
      let my = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
      const len = Math.hypot(mx, my);
      if (len > 1) { mx /= len; my /= len; }
      const state = {
        moveX: mx,
        moveY: my,
        jump: keys.has('Space'),
        sprint: keys.has('ShiftLeft') || keys.has('ShiftRight'),
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

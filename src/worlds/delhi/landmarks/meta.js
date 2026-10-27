// Integration metadata helpers shared by every factory:
//   userData.bounds   local {min:[x,y,z], max:[x,y,z]} of the drawn geometry (outline hulls excluded)
//   userData.pad      {w, d} of the real plinth/footprint (for ground pads)
//   userData.anchors  { name: {x, y, z, facing?} } local spots for NPCs / props. facing = yaw in radians, 0 faces +Z
//   userData.occluder false on small things that must never fade when the camera is behind them
import * as THREE from 'three';

const _v = new THREE.Vector3();
export function computeBounds(obj) {
  obj.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(obj.matrixWorld).invert();
  const m = new THREE.Matrix4();
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  obj.traverse((o) => {
    if (!o.geometry || o.name === 'ink-outline' || o.isSprite) return;
    const g = o.geometry;
    if (!g.boundingBox) g.computeBoundingBox();
    const b = g.boundingBox;
    if (!b || !isFinite(b.min.x + b.max.x)) return;
    m.multiplyMatrices(inv, o.matrixWorld);
    for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) {
      _v.set(x, y, z).applyMatrix4(m);
      min[0] = Math.min(min[0], _v.x); min[1] = Math.min(min[1], _v.y); min[2] = Math.min(min[2], _v.z);
      max[0] = Math.max(max[0], _v.x); max[1] = Math.max(max[1], _v.y); max[2] = Math.max(max[2], _v.z);
    }
  });
  return { min, max };
}

/** Wrap a factory so its result carries bounds/pad/anchors/occluder. meta may be an object or fn(group) -> object. */
export function annotate(factory, meta = {}) {
  const wrapped = (...args) => {
    const g = factory(...args);
    const m = typeof meta === 'function' ? meta(g, ...args) : meta;
    const u = g.userData;
    const b = computeBounds(g);
    u.bounds = b;
    u.pad = m.pad ?? u.pad ?? (u.footprint && typeof u.footprint === 'object' ? { w: u.footprint.w, d: u.footprint.l } : { w: b.max[0] - b.min[0], d: b.max[2] - b.min[2] });
    u.anchors = { ...(u.anchors ?? {}), ...(m.anchors ?? {}) };
    if (m.occluder !== undefined) u.occluder = m.occluder; else if (u.occluder === undefined) u.occluder = true;
    return g;
  };
  Object.defineProperty(wrapped, 'name', { value: factory.name });
  return wrapped;
}

/**
 * engine/colliders.js: obstacles on the sphere the player slides off.
 * Two shapes, both vertical "cylinders" of a given `height` above the ground:
 *   circle   { dir: unit Vector3 (from planet centre), radius, height }
 *   segment  { a: unit Vector3, b: unit Vector3, radius, height }   a rounded wall (capsule) along the great-circle arc a->b
 *            (long walls, rails, train cars: use ONE segment instead of dozens of circles)
 * The player ignores a collider when it is higher than `height` above its feet (jumping clears it).
 *
 * const colliders = createColliders()
 * colliders.add(c)             static collider (trees, rocks, stalls, walls)
 * colliders.addMoving(c)       moving collider: mutate c.dir (circle) in place every frame, or give c.update(dt) (called each
 *                              frame by the engine; for segments call setSegment(c, a, b) inside it).
 *                              actors.add(..., { collider }) does this for you.
 * colliders.remove(c)
 * colliders.list               live array (the player iterates it)
 * colliders.update(dt)         engine calls this once per frame
 * setSegment(c, a, b)          (re)compute a segment collider's cached normal / midpoint / cull cosine from endpoints a, b
 * segmentPoint(c, up, out)     closest point (unit dir) of segment c to the direction `up`
 */
import * as THREE from 'three';

const R_HINT = { value: 75 }; // only used for the cull cosine margin; segment reach is generous
const _p = new THREE.Vector3(), _t = new THREE.Vector3();

export function setSegment(c, a, b, planetRadius = R_HINT.value) {
  c.a = c.a ?? new THREE.Vector3();
  c.b = c.b ?? new THREE.Vector3();
  c.a.copy(a).normalize();
  c.b.copy(b).normalize();
  c.n = c.n ?? new THREE.Vector3();
  c.n.crossVectors(c.a, c.b);
  c.point = c.n.lengthSq() < 1e-14; // degenerate: behaves like a circle at a
  if (!c.point) c.n.normalize();
  c.dir = c.dir ?? new THREE.Vector3();
  c.dir.copy(c.a).add(c.b).normalize();
  if (c.dir.lengthSq() < 0.5) c.dir.copy(c.a);
  const half = Math.acos(THREE.MathUtils.clamp(c.a.dot(c.b), -1, 1)) / 2;
  c.cullCos = Math.cos(Math.min(Math.PI, half + (c.radius + 2.5) / planetRadius));
  return c;
}

/** closest point (unit dir) on segment c to direction `up` */
export function segmentPoint(c, up, out) {
  if (c.point) return out.copy(c.a);
  const k = up.dot(c.n);
  _p.copy(up).addScaledVector(c.n, -k);
  const l = _p.length();
  if (l > 1e-6) {
    _p.divideScalar(l);
    if (_t.crossVectors(c.a, _p).dot(c.n) >= 0 && _t.crossVectors(_p, c.b).dot(c.n) >= 0) return out.copy(_p);
  }
  return out.copy(up.dot(c.a) > up.dot(c.b) ? c.a : c.b);
}

export function createColliders({ planetRadius = 75 } = {}) {
  R_HINT.value = planetRadius;
  const list = [];
  const moving = [];
  const prep = (c) => { if (c.a && c.b && !c.n) setSegment(c, c.a, c.b, planetRadius); return c; };
  return {
    list,
    planetRadius,
    add(c) { list.push(prep(c)); return c; },
    addMoving(c) { list.push(prep(c)); moving.push(c); return c; },
    remove(c) {
      for (const arr of [list, moving]) { const i = arr.indexOf(c); if (i >= 0) arr.splice(i, 1); }
    },
    update(dt) { for (let i = 0; i < moving.length; i++) moving[i].update?.(dt); },
  };
}

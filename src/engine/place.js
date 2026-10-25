/**
 * engine/place.js: put authored assets onto the sphere and turn their metadata into collision + walkable floors.
 *
 * Asset convention (local frame): y up, base at y=0, front +Z.
 *   group.userData.colliders = [{x, z, radius, height}]         circles in the local xz plane
 *   group.userData.walkable  = [{shape:'rect', x, z, w, d, y} | {shape:'circle', x, z, radius, y}
 *                               | {shape:'ramp', x, z, w, d, y0, y1, rising:'+x'|'-x'}]     (y = floor height above local y=0)
 *
 * frameAt(dir, facing, out?) -> { dir, up, fwd, right }       orthonormal tangent frame; right = up x fwd (the object's local +X)
 *     facing = Vector3 (projected onto the tangent plane) or a yaw in radians (0 = toward world +Z, + turns toward +X)
 * localToDir(frame, x, z, planetRadius, out?) -> unit Vector3   the point x (right), z (forward) metres from the frame origin,
 *     walking along the surface (exponential map): use it to lay items out relative to a spot
 * placeOnSphere(group, dir, facing, { planet, radius?, lift=0 }) -> group
 *     orients local +Y to the radial direction `dir` and local +Z to `facing`; position = dir * (radius ?? land radius + lift).
 *     Sets group.userData.placement = { dir, up, fwd, right, radius }.
 * registerAsset(group, { planet, colliders, scale=1, merge=true, surfaces=true }) -> { colliders, surfaces }
 *     reads group.userData.colliders / walkable through the group's world matrix and registers them with the engine:
 *       colliders -> circle colliders; consecutive collinear equal circles (lineColliders output) are merged into ONE
 *                    segment collider (merge=false keeps circles). Returns the engine collider objects (static).
 *       surfaces:false skips the walkable shapes (when you build your own floor, e.g. a pitched bridge deck).
 *       walkable  -> planet.addWalkableSurface(...) with exact flat-plane heights (the asset is a flat plane tangent at its
 *                    origin; its far edges rise above the curved ground, which the asset's plinth hides).
 *     Call after placeOnSphere (and after the group has its final scale).
 * addSegmentCollider(colliders, a, b, radius, height) / circle: small helpers returning the added collider
 */
import * as THREE from 'three';
import { setSegment } from './colliders.js';

const _v = new THREE.Vector3(), _w = new THREE.Vector3();
const Y = new THREE.Vector3(0, 1, 0);

export function frameAt(dir, facing, out = {}) {
  const up = (out.up ?? new THREE.Vector3()).copy(dir).normalize();
  const fwd = out.fwd ?? new THREE.Vector3();
  if (typeof facing === 'number') {
    const ref = Math.abs(up.z) < 0.95 ? _v.set(0, 0, 1) : _v.set(1, 0, 0);
    fwd.copy(ref).addScaledVector(up, -ref.dot(up)).normalize();
    fwd.applyAxisAngle(up, facing); // + yaw turns toward +X, the object's right (right = up x fwd)
  } else {
    fwd.copy(facing).addScaledVector(up, -facing.dot(up));
    if (fwd.lengthSq() < 1e-10) fwd.set(1, 0, 0).addScaledVector(up, -up.x);
    fwd.normalize();
  }
  const right = (out.right ?? new THREE.Vector3()).crossVectors(up, fwd).normalize();
  out.dir = out.up = up; out.fwd = fwd; out.right = right;
  return out;
}

export function localToDir(frame, x, z, planetRadius, out = new THREE.Vector3()) {
  _w.copy(frame.right).multiplyScalar(x).addScaledVector(frame.fwd, z);
  const d = _w.length();
  if (d < 1e-9) return out.copy(frame.up);
  const a = d / planetRadius;
  return out.copy(frame.up).multiplyScalar(Math.cos(a)).addScaledVector(_w.divideScalar(d), Math.sin(a)).normalize();
}

const _m = new THREE.Matrix4();
export function placeOnSphere(group, dir, facing, { planet, radius = null, lift = 0 } = {}) {
  const f = frameAt(dir, facing, {});
  const r = radius ?? planet.getSurfaceRadius(f.up) + lift;
  _m.makeBasis(f.right, f.up, f.fwd);
  group.quaternion.setFromRotationMatrix(_m);
  group.position.copy(f.up).multiplyScalar(r);
  group.userData.placement = { dir: f.up.clone(), up: f.up.clone(), fwd: f.fwd.clone(), right: f.right.clone(), radius: r };
  group.updateMatrixWorld(true);
  return group;
}

export function addSegmentCollider(colliders, a, b, radius, height) {
  return colliders.add(setSegment({ radius, height }, a, b, colliders.planetRadius));
}

// ---- collider conversion ---------------------------------------------------------------------------------------
function worldDir(group, x, z, out) {
  return group.localToWorld(out.set(x, 0, z)).normalize();
}

function mergeRuns(list) {
  // runs of >=3 circles with identical radius/height, near-even spacing, near-constant direction -> one segment
  const out = [];
  let i = 0;
  while (i < list.length) {
    let j = i;
    let dx = 0, dz = 0;
    if (i + 1 < list.length) {
      const c0 = list[i], c1 = list[i + 1];
      const dd = Math.hypot(c1.x - c0.x, c1.z - c0.z);
      const maxStep = (r) => Math.min(2 * r + 0.45, 3.2 * r); // gaps up to 0.45 are impassable for a player anyway
      if (dd > 0.2 * c0.radius && dd <= maxStep(c0.radius) && c1.radius === c0.radius && c1.height === c0.height) {
        dx = (c1.x - c0.x) / dd; dz = (c1.z - c0.z) / dd;
        j = i + 1;
        while (j + 1 < list.length) {
          const a = list[j], b = list[j + 1];
          const d2 = Math.hypot(b.x - a.x, b.z - a.z);
          if (b.radius !== c0.radius || b.height !== c0.height || d2 < 0.2 * c0.radius || d2 > maxStep(c0.radius)) break;
          if (((b.x - a.x) * dx + (b.z - a.z) * dz) / d2 < 0.985) break;
          j++;
        }
      }
    }
    if (j - i + 1 >= 3) { out.push({ seg: [list[i], list[j]], radius: list[i].radius, height: list[i].height }); i = j + 1; }
    else { out.push({ circle: list[i] }); i++; }
  }
  return out;
}

function planeSurface(group, base, n, test) {
  // generic flat-plane surface: n = unit plane normal (world), base = a point on the plane; test(q) -> bool in plane coords
  const nb = n.dot(base);
  return {
    contains(dir) {
      const den = n.dot(dir);
      if (den < 0.4) return false;
      const t = nb / den;
      return test(_v.copy(dir).multiplyScalar(t).sub(base));
    },
    heightAt(dir) { return nb / n.dot(dir); },
  };
}

export function registerAsset(group, { planet, colliders, scale = 1, merge = true, surfaces = true } = {}) {
  group.updateWorldMatrix(true, true);
  const s = scale * group.getWorldScale(new THREE.Vector3()).x; // uniform scale assumed
  const outC = [], outS = [];
  const meta = group.userData;

  if (colliders && meta.colliders?.length) {
    const items = merge ? mergeRuns(meta.colliders) : meta.colliders.map((circle) => ({ circle }));
    for (const it of items) {
      if (it.circle) {
        const c = it.circle;
        outC.push(colliders.add({ dir: worldDir(group, c.x, c.z, new THREE.Vector3()), radius: c.radius * s, height: c.height * s }));
      } else {
        const [a, b] = it.seg;
        const da = worldDir(group, a.x, a.z, new THREE.Vector3()), db = worldDir(group, b.x, b.z, new THREE.Vector3());
        outC.push(colliders.add(setSegment({ radius: it.radius * s, height: it.height * s }, da, db, planet.radius)));
      }
    }
  }

  if (surfaces && meta.walkable?.length && planet) {
    const up = new THREE.Vector3(0, 1, 0).transformDirection(group.matrixWorld);
    const right = new THREE.Vector3(1, 0, 0).transformDirection(group.matrixWorld);
    const fwd = new THREE.Vector3(0, 0, 1).transformDirection(group.matrixWorld);
    for (const w of meta.walkable) {
      const base = group.localToWorld(new THREE.Vector3(w.x, w.shape === 'ramp' ? (w.y0 + w.y1) / 2 : w.y, w.z));
      let surf;
      let halfDiag;
      if (w.shape === 'rect') {
        const hw = (w.w / 2) * s, hd = (w.d / 2) * s;
        surf = planeSurface(group, base, up, (q) => Math.abs(q.dot(right)) <= hw && Math.abs(q.dot(fwd)) <= hd);
        halfDiag = Math.hypot(hw, hd);
      } else if (w.shape === 'circle') {
        const rr = w.radius * s;
        surf = planeSurface(group, base, up, (q) => { const x = q.dot(right), z = q.dot(fwd); return x * x + z * z <= rr * rr; });
        halfDiag = rr;
      } else if (w.shape === 'ramp') {
        // plane through the low and high edge (local), rising along -x or +x
        const sign = w.rising === '-x' ? -1 : 1; // direction of ascent along local x
        const lo = group.localToWorld(new THREE.Vector3(w.x - sign * w.w / 2, w.y0, w.z));
        const hi = group.localToWorld(new THREE.Vector3(w.x + sign * w.w / 2, w.y1, w.z));
        const along = hi.clone().sub(lo);
        const nn = new THREE.Vector3().crossVectors(fwd, along).normalize();
        if (nn.dot(up) < 0) nn.negate();
        const mid = lo.clone().add(hi).multiplyScalar(0.5);
        const hw = (w.w / 2) * s, hd = (w.d / 2) * s;
        // test in the group's horizontal frame around the ramp centre
        const c0 = group.localToWorld(new THREE.Vector3(w.x, 0, w.z));
        surf = planeSurface(group, mid, nn, (q) => { _w.copy(q).add(mid).sub(c0); return Math.abs(_w.dot(right)) <= hw && Math.abs(_w.dot(fwd)) <= hd; });
        halfDiag = Math.hypot(hw, hd);
      } else continue;
      const c = base.clone().normalize();
      surf.c = c;
      surf.cosR = Math.cos(Math.min(3.0, (halfDiag + 2.5) / planet.radius));
      planet.addWalkableSurface(surf);
      outS.push(surf);
    }
  }
  return { colliders: outC, surfaces: outS };
}

/**
 * engine/actors.js: move a Group along a path on the sphere, oriented to the surface (y = up, z = forward).
 * Use for vehicles, trains, boats, NPC strolls. Purely kinematic; add colliders if the player should bump it.
 *
 * const actors = createActors({ planet, colliders })      (the engine provides one as ctx.actors)
 * actors.add(group, path, opts?) -> actor
 *   path = { type: 'circle', normal: Vector3|[x,y,z], speed, phase=0 }
 *            a great circle in the plane with that normal; speed in surface units/s (negative = reverse);
 *            phase = starting angle in radians
 *        | { type: 'spline', dirs: [Vector3|[x,y,z]...], speed, closed=true, phase=0 }
 *            a closed (or open ping-pong) Catmull-Rom curve through the given directions, arc-length parameterised;
 *            phase = starting fraction 0..1
 *   opts = { lift=0,            extra height above the ground (e.g. a bus wheel offset, or a train on an embankment)
 *            radiusFn(dir),     override the radius entirely, e.g. dir => planet.seaRadius for a boat
 *            collider: {radius, height, length?} | null   registers a MOVING collider that follows the actor;
 *                       with `length` it is a segment (capsule) of that length centred on the actor, along its heading
 *            scale=1 }
 * actor = { group, dir (unit Vector3, live), forward (tangent, live), collider,
 *           speed (mutable), paused (mutable), update(dt) }
 * actors.update(dt)            engine calls this each frame
 * actors.remove(actor)
 */
import * as THREE from 'three';
import { setSegment } from './colliders.js';

const toVec = (v) => (Array.isArray(v) ? new THREE.Vector3(...v) : v.clone());
const _m = new THREE.Matrix4();
const _r = new THREE.Vector3();

export function createActors({ planet, colliders = null }) {
  const list = [];

  function add(group, path, opts = {}) {
    const { lift = 0, radiusFn = null, collider = null } = opts;
    const dir = new THREE.Vector3(0, 1, 0);
    const forward = new THREE.Vector3(0, 0, 1);
    let sampler;

    if (path.type === 'circle') {
      const n = toVec(path.normal).normalize();
      const a = new THREE.Vector3().crossVectors(n, Math.abs(n.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)).normalize();
      const b = new THREE.Vector3().crossVectors(n, a);
      let ang = path.phase ?? 0;
      sampler = (advance, sign) => {
        ang += (advance / planet.radius) * sign;
        const c = Math.cos(ang), s = Math.sin(ang);
        dir.copy(a).multiplyScalar(c).addScaledVector(b, s);
        forward.copy(b).multiplyScalar(c).addScaledVector(a, -s).multiplyScalar(sign);
      };
    } else if (path.type === 'spline') {
      const closed = path.closed !== false;
      const pts = path.dirs.map((d) => toVec(d).normalize().multiplyScalar(planet.radius));
      const curve = new THREE.CatmullRomCurve3(pts, closed, 'centripetal');
      const length = curve.getLength() * 1; // chord length of the curve through the surface (close to arc length)
      let u = path.phase ?? 0;
      let dirSign = 1;
      const p = new THREE.Vector3(), p2 = new THREE.Vector3();
      sampler = (advance, sign) => {
        u += (advance / length) * sign * dirSign;
        if (closed) u = ((u % 1) + 1) % 1;
        else if (u > 1) { u = 2 - u; dirSign = -dirSign; } else if (u < 0) { u = -u; dirSign = -dirSign; }
        curve.getPointAt(u, p);
        curve.getPointAt(closed ? (u + 0.002) % 1 : Math.min(1, u + 0.002), p2);
        dir.copy(p).normalize();
        forward.copy(p2).sub(p);
        if (!closed && dirSign < 0) forward.negate();
        if (sign < 0) forward.negate();
      };
    } else throw new Error('actors.add: unknown path type ' + path.type);

    const actor = {
      group, dir, forward, speed: path.speed ?? 0, paused: false, collider: null,
      update(dt) {
        const adv = this.paused ? 0 : Math.abs(this.speed) * dt;
        sampler(adv, this.speed < 0 ? -1 : 1);
        forward.addScaledVector(dir, -forward.dot(dir));
        if (forward.lengthSq() < 1e-12) forward.set(1, 0, 0).addScaledVector(dir, -dir.x);
        forward.normalize();
        const r = radiusFn ? radiusFn(dir) : planet.getWalkRadius(dir) + lift;
        group.position.copy(dir).multiplyScalar(r);
        _r.crossVectors(dir, forward).normalize();
        _m.makeBasis(_r, dir, forward);
        group.quaternion.setFromRotationMatrix(_m);
      },
    };
    if (collider && colliders) {
      if (collider.length) {
        const half = collider.length / 2;
        const ca = new THREE.Vector3(), cb = new THREE.Vector3();
        const c = { radius: collider.radius, height: collider.height };
        c.update = () => {
          // endpoints a distance `half` along the heading (tangent step on the sphere)
          const ang = half / planet.radius, sn = Math.sin(ang), cs = Math.cos(ang);
          ca.copy(dir).multiplyScalar(cs).addScaledVector(forward, sn);
          cb.copy(dir).multiplyScalar(cs).addScaledVector(forward, -sn);
          setSegment(c, ca, cb, planet.radius);
        };
        c.update();
        actor.collider = colliders.addMoving(c);
      } else actor.collider = colliders.addMoving({ dir, radius: collider.radius, height: collider.height });
    }
    actor.update(0);
    list.push(actor);
    return actor;
  }

  return {
    add,
    remove(a) { const i = list.indexOf(a); if (i >= 0) list.splice(i, 1); if (a.collider) colliders?.remove(a.collider); },
    update(dt) { for (let i = 0; i < list.length; i++) list[i].update(dt); },
  };
}

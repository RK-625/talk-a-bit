/**
 * engine/camera.js: third-person follow camera for a spherical world.
 * createCameraRig(camera, player, planet) -> { heading, zoom01, update(dt, input) }
 *   heading: tangent unit vector the camera looks along (movement is relative to it); zoom01: 0 default .. 1 max zoom-out.
 *   Orbit with input.lookDX/DY, zoom with input.zoom (distance 7..125, default 14). rig.setView({distance, pitch, snap}).
 *   rig.setShot({ focus: Vector3, heading: Vector3, distance, pitch, side, lower }) eases to a fixed two-shot (conversations):
 *   looks at `focus` (a world point; Chotu is at the near end), camera behind along `heading`, shifted `side` to Chotu's right.
 *   rig.setShot(null) eases back to the normal follow view (the previous distance/pitch are restored).
 */
// Third-person follow camera for a spherical world.
// The camera owns a tangent `heading` vector (where it looks along the ground). It is re-projected
// onto the player's tangent plane each frame (parallel transport), so it is pole-safe.
import * as THREE from 'three';

// ---- tunables --------------------------------------------------------------
const DEFAULT_DISTANCE = 14;
const MIN_DISTANCE = 7;
const MAX_DISTANCE = 125; // ~140 from the planet centre at typical pitch: the whole planet floats in view
const DEFAULT_PITCH = THREE.MathUtils.degToRad(25);
const MIN_PITCH = THREE.MathUtils.degToRad(4);
const MAX_PITCH = THREE.MathUtils.degToRad(80);
const LOOK_SENS = 0.0055; // rad per pixel
const FOLLOW = 9; // 1/s position damping
const UP_FOLLOW = 6; // 1/s camera.up blend toward the player's up
const ZOOM_FOLLOW = 8;
const TARGET_HEIGHT = 1.1; // look at this far above the feet
const LOOK_AHEAD = 2.2; // look slightly past the player along the heading
const SURFACE_MARGIN = 1.6;
const FOV_NEAR = 50; // widen the lens a little when zoomed out so more of the planet fits
const FOV_FAR = 55;

const ball_ = (d) => THREE.MathUtils.smoothstep(d, 40, MAX_DISTANCE);

export function createCameraRig(camera, player, planet) {
  const heading = player.face.clone(); // start looking where the hero faces
  const camUp = player.up.clone();
  let pitch = DEFAULT_PITCH;
  let distTarget = DEFAULT_DISTANCE;
  let dist = DEFAULT_DISTANCE;
  let first = true;
  let shot = null; // { focus, heading, distance, pitch, side }
  let saved = null; // { dist, pitch } to return to when the shot ends
  const focus = new THREE.Vector3();
  let lastLower = 0, lastSide = 0; // kept while the shot eases out
  let shotW = 0; // 0 follow .. 1 shot (eased)
  const _qs = new THREE.Quaternion(), _rt = new THREE.Vector3(), _tmpA = new THREE.Vector3(), _tmpB = new THREE.Vector3();

  const _q = new THREE.Quaternion();
  const _target = new THREE.Vector3();
  const _desired = new THREE.Vector3();
  const _look = new THREE.Vector3();

  const rig = {
    heading,
    zoom01: 0, // 0 at default distance, 1 at max zoom-out
    /** set the orbit distance (7..125) and/or pitch (radians); snap = jump there instantly */
    setView({ distance, pitch: p, snap = false } = {}) {
      if (distance !== undefined) { distTarget = THREE.MathUtils.clamp(distance, MIN_DISTANCE, MAX_DISTANCE); if (snap) dist = distTarget; }
      if (p !== undefined) pitch = THREE.MathUtils.clamp(p, MIN_PITCH, MAX_PITCH);
      if (snap) { first = true; camUp.copy(player.up); heading.addScaledVector(player.up, -heading.dot(player.up)).normalize(); }
    },
    /** ease into (or out of, with null) a two-shot; see the header */
    setShot(o) {
      if (o) {
        if (!shot) { saved = { dist: distTarget, pitch }; focus.copy(o.focus); }
        lastLower = o.lower ?? 0; lastSide = o.side ?? 0.9;
        shot = { focus: o.focus.clone(), heading: o.heading.clone(), distance: o.distance ?? 6, pitch: o.pitch ?? 0.2, side: o.side ?? 0.9, lower: o.lower ?? 0 };
      } else if (shot) {
        shot = null;
        if (saved) { distTarget = saved.dist; pitch = saved.pitch; saved = null; }
      }
    },
    get shotActive() { return !!shot || shotW > 0.02; },
    update(dt, input) {
      const up = player.up;
      shotW += ((shot ? 1 : 0) - shotW) * (1 - Math.exp(-4 * dt));
      if (shot) {
        // steer heading toward the shot's heading, ease distance/pitch/focus
        shot.heading.addScaledVector(up, -shot.heading.dot(up)).normalize();
        heading.addScaledVector(up, -heading.dot(up)).normalize();
        _tmpA.crossVectors(heading, shot.heading);
        const ang = Math.atan2(up.dot(_tmpA), heading.dot(shot.heading));
        heading.applyQuaternion(_qs.setFromAxisAngle(up, ang * (1 - Math.exp(-5 * dt))));
        distTarget = shot.distance; pitch += (shot.pitch - pitch) * (1 - Math.exp(-4 * dt));
        focus.lerp(shot.focus, 1 - Math.exp(-5 * dt));
      }

      // keep heading tangent to the player's position (parallel transport as the player moves)
      heading.addScaledVector(up, -heading.dot(up));
      if (heading.lengthSq() < 1e-6) heading.copy(player.face);
      heading.normalize();

      // orbit: yaw rotates the heading about `up`, pitch is clamped
      if (input.lookDX) heading.applyQuaternion(_q.setFromAxisAngle(up, input.lookDX * LOOK_SENS));
      pitch = THREE.MathUtils.clamp(pitch + input.lookDY * LOOK_SENS, MIN_PITCH, MAX_PITCH);
      if (input.zoom && !shot) distTarget = THREE.MathUtils.clamp(distTarget * (1 + input.zoom), MIN_DISTANCE, MAX_DISTANCE);
      dist += (distTarget - dist) * (1 - Math.exp(-ZOOM_FOLLOW * dt));
      if (shot && Math.abs(dist - distTarget) < 0.01) dist = distTarget;

      const zt = THREE.MathUtils.smoothstep(dist, DEFAULT_DISTANCE, MAX_DISTANCE);
      rig.zoom01 = ball_(dist);
      const ball = THREE.MathUtils.smoothstep(dist, 40, MAX_DISTANCE); // 0 near, 1 at max zoom: look at the planet itself
      const fov = FOV_NEAR + (FOV_FAR - FOV_NEAR) * zt;
      if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }

      // camera.up eases toward the player's up, so turning a pole feels like a gentle roll
      camUp.lerp(up, 1 - Math.exp(-UP_FOLLOW * dt)).normalize();

      _target.copy(player.object.position).addScaledVector(up, TARGET_HEIGHT);
      if (shotW > 0.001) { // blend the look-at point from Chotu to the shot's focus (the pair), shifting the camera over Chotu's shoulder
        _tmpB.copy(focus).addScaledVector(up, TARGET_HEIGHT - lastLower); // lower = aim below the pair so they sit in the upper part of the screen (room for a dialogue card)
        _target.lerp(_tmpB, shotW); // (lower is applied to the focus point above, scaled by shotW through the lerp)
        _rt.crossVectors(up, heading).normalize(); // camera-right (the player basis is x = up x face)
      }
      _desired
        .copy(_target)
        .addScaledVector(heading, -Math.cos(pitch) * dist)
        .addScaledVector(up, Math.sin(pitch) * dist);

      if (shotW > 0.001) _desired.addScaledVector(_rt, lastSide * shotW);
      if (first) { camera.position.copy(_desired); first = false; }
      else camera.position.lerp(_desired, 1 - Math.exp(-FOLLOW * dt));

      // never sink into the planet
      const minR = planet.getSurfaceRadius(camera.position) + SURFACE_MARGIN;
      const len = camera.position.length();
      if (len < minR) camera.position.multiplyScalar(minR / len);

      camera.up.copy(camUp);
      _look.copy(_target).addScaledVector(heading, LOOK_AHEAD * (1 - ball)).multiplyScalar(1 - ball);
      camera.lookAt(_look);
    },
  };
  return rig;
}

/**
 * engine/player.js: character-agnostic movement on the sphere.
 * State is (up, face, r): `up` = unit direction planet-centre -> player, `face` = unit tangent the hero looks
 * along. Moving = rotating all of them with ONE quaternion about (up x velocity): parallel transport, no pole singularity.
 *
 * createPlayer({ hero (Group, feet at y=0, facing +Z), planet, colliders (from createColliders()),
 *                spawn={ dir:[0,1,0], facing:[0,0,-1] }, radius=0.55 }) -> player
 *   hero.userData.rig = { root, body, feet:[l,r], eyes:[l,r] } enables the default squash/waddle/blink animation.
 *   hero.userData.animate = (dt, s) => {}  replaces it: s = { speed, walk (0..1), grounded, vr, time, jumped }.
 *   hero.userData.radius overrides the collision radius.
 * player.object   the hero Group (engine adds it to the scene)
 * player.up, player.face, player.vel   live unit/tangent Vector3s;  player.radius (distance from centre)
 * player.grounded
 * player.update(dt, input, camHeading)   input = engine/input.js state; camHeading = camera tangent forward
 * Walkability: the player never enters planet.isWalkable(dir) === false; it slides along the shoreline.
 * Floor height is planet.getWalkRadius(dir) (land or a registered walkable surface such as a bridge).
 * Collisions: slides off every collider in colliders.list (static or moving) unless jumping over it.
 */
import * as THREE from 'three';

// ---- tunables --------------------------------------------------------------
const WALK_SPEED = 6;
const ACCEL_GROUND = 12; // 1/s response of velocity toward target
const ACCEL_AIR = 3.5;
const TURN_RATE = 14; // 1/s response of facing toward move direction
const JUMP_SPEED = 9;
const GRAVITY = 24;
const COYOTE = 0.1; // s after leaving the ground in which a jump still works
const JUMP_BUFFER = 0.12; // s a jump press is remembered before landing
const SNAP_DISTANCE = 0.4; // stay glued to the ground when walking downhill within this

const _q = new THREE.Quaternion();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _m = new THREE.Matrix4();
const _up0 = new THREE.Vector3(), _face0 = new THREE.Vector3(), _vel0 = new THREE.Vector3();
const _t1 = new THREE.Vector3(), _t2 = new THREE.Vector3(), _s = new THREE.Vector3(), _n = new THREE.Vector3();

export function createPlayer({ hero, planet, colliders, spawn = {}, radius: playerRadius = 0.55 }) {
  const object = hero;
  const rig = object.userData.rig ?? {};
  const PLAYER_RADIUS = object.userData.radius ?? playerRadius;
  const PLANET_RADIUS = planet.radius;
  const up = new THREE.Vector3(...(spawn.dir ?? [0, 1, 0])).normalize();
  const face = new THREE.Vector3(...(spawn.facing ?? [0, 0, -1]));
  const vel = new THREE.Vector3(); // tangent velocity (world space)
  let r = planet.getWalkRadius(up);
  let vr = 0; // radial velocity
  let grounded = true;
  let coyote = 0, buffer = 0, prevJump = false;

  // animation state
  let phase = 0, walkAmt = 0, squash = 0, squashVel = 0, blink = 3, blinkT = 0, time = 0;

  const state = { object, up, face, vel, get radius() { return r; }, get grounded() { return grounded; } };

  function tangent(v) { // project v onto the tangent plane at `up`
    v.addScaledVector(up, -v.dot(up));
    return v;
  }
  function step(dt, speed) {
    _a.crossVectors(up, vel).normalize();
    _q.setFromAxisAngle(_a, (speed * dt) / r);
    rotateAll(_q);
  }
  // remove the velocity component pointing toward lower ground (the water); the land gradient is the shore normal
  function slideAlongShore() {
    tangent(vel);
    const t1 = _t1.copy(vel).normalize();
    const t2 = _t2.crossVectors(up, t1);
    const e = 0.02;
    const h = (t, sgn) => planet.getSurfaceRadius(_s.copy(up).addScaledVector(t, sgn * e));
    const n = _n.set(0, 0, 0).addScaledVector(t1, h(t1, 1) - h(t1, -1)).addScaledVector(t2, h(t2, 1) - h(t2, -1));
    if (n.lengthSq() < 1e-10) { vel.set(0, 0, 0); return; }
    n.normalize(); // points uphill = toward land
    const into = vel.dot(n);
    if (into < 0) vel.addScaledVector(n, -into);
  }
  function rotateAll(q) {
    up.applyQuaternion(q).normalize();
    face.applyQuaternion(q);
    vel.applyQuaternion(q);
  }

  /**
   * @param camHeading unit tangent vector the camera is looking along (screen-up for movement)
   */
  state.update = function (dt, input, camHeading) {
    time += dt;
    // ---- desired velocity from camera-relative input ----
    const fwd = tangent(_a.copy(camHeading));
    if (fwd.lengthSq() < 1e-6) fwd.copy(face);
    fwd.normalize();
    const right = _b.crossVectors(fwd, up); // fwd x up = right
    const want = new THREE.Vector3().addScaledVector(fwd, input.moveY).addScaledVector(right, input.moveX);
    const mag = Math.min(1, want.length());
    if (mag > 1e-4) want.multiplyScalar(WALK_SPEED * mag / want.length());

    // ---- accelerate ----
    tangent(vel);
    const k = 1 - Math.exp(-(grounded ? ACCEL_GROUND : ACCEL_AIR) * dt);
    vel.lerp(want, k);

    // ---- move along the sphere: rotate about (up x vel) ----
    let speed = vel.length();
    if (speed > 1e-4) {
      if (planet.seaRadius === null) step(dt, speed); // no sea: always walkable (fast path)
      else {
        _up0.copy(up); _face0.copy(face); _vel0.copy(vel);
        step(dt, speed);
        if (!planet.isWalkable(up)) { // would enter the water: undo, slide along the shore instead
          up.copy(_up0); face.copy(_face0); vel.copy(_vel0);
          slideAlongShore();
          speed = vel.length();
          if (speed > 1e-4) {
            step(dt, speed);
            if (!planet.isWalkable(up)) { up.copy(_up0); face.copy(_face0); vel.copy(_vel0).multiplyScalar(0); speed = 0; }
          }
        }
      }
    }

    // ---- face the direction of travel ----
    if (mag > 0.1 && speed > 0.3) {
      tangent(face).normalize();
      _a.copy(vel).normalize();
      const ang = Math.atan2(up.dot(_b.crossVectors(face, _a)), face.dot(_a));
      _q.setFromAxisAngle(up, ang * (1 - Math.exp(-TURN_RATE * dt)));
      face.applyQuaternion(_q);
    }

    // ---- jump / gravity ----
    const jumpPressed = input.jump && !prevJump;
    prevJump = input.jump;
    if (jumpPressed) buffer = JUMP_BUFFER;
    buffer = Math.max(0, buffer - dt);
    coyote = grounded ? COYOTE : Math.max(0, coyote - dt);
    if (buffer > 0 && coyote > 0) {
      vr = JUMP_SPEED;
      grounded = false;
      coyote = buffer = 0;
      squash = 0.28; // anticipation squash, springs back into a stretch
      squashVel = 0;
    }
    vr -= GRAVITY * dt;
    r += vr * dt;

    // ---- trees and rocks: push out horizontally (before the ground test, so height matters) ----
    const ground0 = planet.getWalkRadius(up);
    collide(r - ground0);

    // ---- ground: land, or stay glued to it when walking downhill ----
    const ground = planet.getWalkRadius(up);
    let onGround = false;
    if (r <= ground) {
      r = ground;
      if (vr <= 0) onGround = true; // (rising into a hill just gets pushed up)
    } else if (grounded && vr <= 0 && r - ground < SNAP_DISTANCE) {
      r = ground;
      onGround = true;
    }
    if (onGround && !grounded) { // just landed: squash by impact speed
      squash = Math.min(0.4, 0.03 * -vr);
      squashVel = 0;
    }
    if (onGround) vr = 0;
    grounded = onGround;

    // ---- keep vectors orthonormal against drift ----
    up.normalize();
    tangent(face).normalize();

    animate(dt, speed);
    place();
  };

  function collide(heightAbove) {
    const list = colliders.list;
    for (let i = 0; i < list.length; i++) {
      const c = list[i];
      if (heightAbove > c.height) continue; // jumped over it
      const dot = THREE.MathUtils.clamp(up.dot(c.dir), -1, 1);
      if (dot < 0.9) continue; // far side of the planet (cheap early-out)
      const dist = Math.acos(dot) * PLANET_RADIUS;
      const minDist = c.radius + PLAYER_RADIUS;
      if (dist >= minDist || dist < 1e-4) continue;
      // away = tangent direction pointing from the collider to the player
      _a.crossVectors(c.dir, up).normalize(); // rotation axis that moves `up` away from c.dir
      _q.setFromAxisAngle(_a, (minDist - dist) / r);
      up.applyQuaternion(_q).normalize();
      face.applyQuaternion(_q);
      vel.applyQuaternion(_q);
      // slide: remove the velocity component pointing into the obstacle
      _b.crossVectors(_a, up);
      const into = vel.dot(_b);
      if (into < 0) vel.addScaledVector(_b, -into);
    }
  }

  function place() {
    object.position.copy(up).multiplyScalar(r);
    // basis: y = up, z = face, x = y x z
    _a.crossVectors(up, face).normalize();
    _m.makeBasis(_a, up, face);
    object.quaternion.setFromRotationMatrix(_m);
  }

  // ---- cute procedural animation ----
  function animate(dt, speed) {
    const moving = THREE.MathUtils.clamp(speed / WALK_SPEED, 0, 1);
    walkAmt += (moving - walkAmt) * (1 - Math.exp(-12 * dt));
    phase += dt * (6 + 8 * walkAmt) * (grounded ? 1 : 0.2);
    if (object.userData.animate) {
      object.userData.animate(dt, { speed, walk: walkAmt, grounded, vr, time, phase });
      return;
    }
    if (!rig.root) return;

    // spring for squash (positive = squashed, negative = stretched)
    squashVel += (-260 * squash - 17 * squashVel) * dt;
    squash += squashVel * dt;
    const stretch = grounded ? 0 : THREE.MathUtils.clamp(vr * 0.02, -0.14, 0.2);
    const breathe = Math.sin(time * 2.2) * 0.025 * (1 - walkAmt);
    const sy = 1 - squash + stretch + breathe + Math.abs(Math.sin(phase)) * -0.04 * walkAmt;
    const sxz = 1 / Math.sqrt(Math.max(0.5, sy));
    rig.root.scale.set(sxz, sy, sxz);

    // bob + waddle
    rig.body.position.y = Math.abs(Math.sin(phase)) * 0.13 * walkAmt;
    rig.root.rotation.z = Math.sin(phase) * 0.13 * walkAmt;
    rig.root.rotation.x = -THREE.MathUtils.clamp(speed * 0.012, 0, 0.08) + (grounded ? 0 : -vr * 0.006);

    // feet swing
    rig.feet?.forEach((f, i) => {
      const s = Math.sin(phase + i * Math.PI);
      f.position.z = f.userData.home.z + s * 0.28 * walkAmt;
      f.position.y = f.userData.home.y + Math.max(0, Math.cos(phase + i * Math.PI)) * 0.16 * walkAmt + (grounded ? 0 : 0.12);
    });

    // blink
    blink -= dt;
    if (blink <= 0) { blinkT = 0.14; blink = 2.5 + Math.random() * 3; }
    blinkT = Math.max(0, blinkT - dt);
    const eyeY = blinkT > 0 ? 0.15 : 1;
    rig.eyes?.forEach((e) => (e.scale.y = eyeY));
  }

  place();
  return state;
}

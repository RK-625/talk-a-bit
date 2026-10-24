// Player visual ONLY. Replaceable: keep the contract
//   createCharacter() -> THREE.Group, feet at y = 0, facing +Z,
//   group.userData.rig = { root, body, feet:[l,r], eyes:[l,r] } used by player.js for animation.
import * as THREE from 'three';
import { createInkMaterial, addOutline, INK_COLOR, OVERLAY_LAYER } from '../../engine/ink.js';

// ---- tunables --------------------------------------------------------------
const BODY_COLOR = 0xf6b9c8; // pastel pink
const FOOT_COLOR = 0xe39ab0;
const LEAF_COLOR = 0xa6d98a;
const BLUSH_COLOR = 0xee7f9b;
const BODY_R = 0.78;
const BODY_Y = 0.86;

function outlined(mesh, opts) {
  mesh.castShadow = true;
  addOutline(mesh, { thickness: 2.2, wobbleFreq: 2.2, ...opts });
  return mesh;
}

// Place `mesh` on the body ellipsoid at yaw `az` (0 = straight ahead) and pitch `el`.
function onBody(mesh, az, el, depth = 1) {
  const dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
  mesh.position.set(dir.x * BODY_R * depth, BODY_Y + dir.y * BODY_R * 0.92 * depth, dir.z * BODY_R * 0.97 * depth);
  mesh.lookAt(mesh.position.clone().add(dir)); // local +Z points out of the body
  return mesh;
}

export function createCharacter(ink) { // `ink` (engine/ink.js namespace) is accepted for the world contract but unused here
  const group = new THREE.Group();
  const root = new THREE.Group(); // squash/stretch pivot, sits at the feet
  group.add(root);

  const body = new THREE.Group(); // bobbing part (everything but the feet)
  root.add(body);

  const bodyMat = createInkMaterial({ color: BODY_COLOR, hatchSpacing: 0.06, hatchStrength: 0.8 });
  const blob = new THREE.Mesh(new THREE.SphereGeometry(BODY_R, 28, 20), bodyMat);
  blob.position.y = BODY_Y;
  blob.scale.set(1, 0.92, 0.97);
  outlined(blob);
  blob.receiveShadow = true;
  body.add(blob);

  // face: flat unlit stickers, so the ink stays crisp
  const inkBasic = new THREE.MeshBasicMaterial({ color: INK_COLOR });
  const blushBasic = new THREE.MeshBasicMaterial({ color: BLUSH_COLOR });
  const eyes = [];
  for (const s of [-1, 1]) {
    const eye = onBody(new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 10), inkBasic), s * 0.36, 0.12, 1.0);
    eye.scale.z = 0.5;
    const hl = new THREE.Mesh(new THREE.CircleGeometry(0.03, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    hl.position.set(0.03, 0.035, 0.088);
    eye.add(hl);
    body.add(eye);
    eyes.push(eye);

    const cheek = onBody(new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 8), blushBasic), s * 0.62, -0.12, 1.0);
    cheek.scale.set(1, 0.7, 0.35);
    body.add(cheek);
  }
  const smile = onBody(
    new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.017, 6, 14, Math.PI), inkBasic),
    0,
    -0.1,
    1.0
  );
  smile.rotateZ(Math.PI); // arc of a torus is an "n"; flip it into a smile
  body.add(smile);

  // little leaf on top
  const leafMat = createInkMaterial({ color: LEAF_COLOR, hatchSpacing: 0.04 });
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), leafMat);
  leaf.scale.set(0.55, 0.12, 1);
  leaf.position.set(0.1, BODY_Y + BODY_R * 0.9 + 0.1, 0.02);
  leaf.rotation.set(-0.25, 0.3, -0.4);
  outlined(leaf, { thickness: 1.8 });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.14, 6), leafMat);
  stem.position.set(0.02, BODY_Y + BODY_R * 0.9 + 0.02, 0.02);
  body.add(leaf, stem);

  // feet
  const footMat = createInkMaterial({ color: FOOT_COLOR, hatchSpacing: 0.04 });
  const feet = [];
  for (const s of [-1, 1]) {
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), footMat);
    foot.scale.set(1, 0.65, 1.3);
    foot.position.set(s * 0.32, 0.13, 0.06);
    foot.userData.home = foot.position.clone();
    outlined(foot, { thickness: 1.8 });
    root.add(foot);
    feet.push(foot);
  }

  group.traverse((o) => { if (o.isMesh && o.material.isMeshBasicMaterial) o.layers.set(OVERLAY_LAYER); }); // stickers: no crease lines
  group.traverse((o) => { if (o.isMesh && o.material.isMeshBasicMaterial) o.layers.set(OVERLAY_LAYER); }); // stickers: no crease lines
  group.userData.rig = { root, body, feet, eyes };
  return group;
}

export const createHero = createCharacter;
export default createCharacter;

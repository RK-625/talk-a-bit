/**
 * engine/occlusion.js: buildings between the camera and the hero fade to a light pencil sketch (mostly transparent fill,
 * faint ink outline) and come back smoothly when the view is clear.
 *
 * const occ = createOcclusion({ camera, player })        (the engine provides one as ctx.occlusion and calls occ.update(dt))
 * occ.add(object, { shrink = 1.0 }) -> occluder
 *     registers an Object3D (a landmark, chawl, stall...). Its local bounding box (shrunk by `shrink` on x/z so porches and
 *     plinths do not count) is tested against the segment camera -> hero's head every frame; a hit fades it.
 *     The fill materials are cloned lazily on first fade (the ink shader is shared via onBeforeCompile) and animated through
 *     opacity; outline hulls fade through their uAlpha uniform (engine/ink.js).
 * occ.remove(occluder);  occ.items; occ.fadeCount (how many are currently faded; dev stats)
 * A building fades only when (1) the camera->hero segment crosses its box, (2) the hero actually lies inside the building's projected
 * screen rectangle, and (3) the camera is not out in front of its facade (local +Z): you never lose a landmark you are looking at head-on.
 * Tunables: FADE_FILL (opacity of the faded fill), FADE_LINE (outline alpha), SPEED (1/s).
 */
import * as THREE from 'three';

const FADE_FILL = 0.35, FADE_LINE = 0.5, SPEED = 7, MAX_TEST_DIST = 110;
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _inv = new THREE.Matrix4(), _c = new THREE.Vector3(), _p = new THREE.Vector3();
const _hd = new THREE.Vector3(), _ft = new THREE.Vector3();

function localBox(obj) {
  obj.updateWorldMatrix(true, true);
  const inv = new THREE.Matrix4().copy(obj.matrixWorld).invert();
  const box = new THREE.Box3();
  const m = new THREE.Matrix4(), v = new THREE.Vector3();
  obj.traverse((o) => {
    if (!o.isMesh || o.name === 'ink-outline' || !o.geometry) return;
    const pos = o.geometry.attributes.position;
    if (!pos) return;
    m.multiplyMatrices(inv, o.matrixWorld);
    for (let i = 0; i < pos.count; i++) { // vertex by vertex: ignore any stray vertex far outside the model (bad geometry)
      v.fromBufferAttribute(pos, i);
      if (!isFinite(v.x + v.y + v.z) || Math.abs(v.x) > 300 || Math.abs(v.y) > 300 || Math.abs(v.z) > 300) continue;
      box.expandByPoint(v.applyMatrix4(m));
    }
  });
  return box;
}

function collect(obj) {
  const fills = [], lines = [];
  obj.traverse((o) => {
    if (o.isInstancedMesh) return;
    if (o.isMesh && o.name === 'ink-outline') lines.push(o);
    else if ((o.isMesh || o.isSprite || o.isLine) && o.material && !Array.isArray(o.material)) fills.push(o);
  });
  return { fills, lines };
}

export function createOcclusion({ camera, player }) {
  const items = [];
  const head = new THREE.Vector3();
  const api = {
    items, fadeCount: 0,
    add(object, { shrink = 1.0 } = {}) {
      const box = localBox(object);
      if (box.isEmpty()) return null;
      box.min.x += shrink; box.max.x -= shrink; box.min.z += shrink; box.max.z -= shrink;
      if (box.min.x >= box.max.x || box.min.z >= box.max.z) return null;
      const { fills, lines } = collect(object);
      const o = { object, box, fills, lines, fade: 0, ghosts: null, cen: box.getCenter(new THREE.Vector3()) };
      items.push(o);
      return o;
    },
    remove(o) { const i = items.indexOf(o); if (i >= 0) items.splice(i, 1); },
    update(dt) {
      camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
      head.copy(player.object.position).addScaledVector(player.up, 1.2);
      _hd.copy(head).project(camera); _ft.copy(player.object.position).project(camera);
      const cam = camera.position;
      let faded = 0;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        let hit = false;
        if (it.object.visible) {
          const ob = it.object;
          _c.copy(it.cen).applyMatrix4(ob.matrixWorld);
          if (_c.distanceToSquared(cam) < MAX_TEST_DIST * MAX_TEST_DIST) {
            _inv.copy(ob.matrixWorld).invert();
            _a.copy(cam).applyMatrix4(_inv); _b.copy(head).applyMatrix4(_inv);
            hit = segHitsBox(_a, _b, it.box) && _a.z < it.box.max.z + 0.5 && heroOnScreenRect(it, ob, camera);
          }
        }
        const target = hit ? 1 : 0;
        if (it.fade === target) { if (target) faded++; continue; }
        it.fade += (target - it.fade) * (1 - Math.exp(-SPEED * dt));
        if (Math.abs(it.fade - target) < 0.01) it.fade = target;
        apply(it);
        if (it.fade > 0) faded++;
      }
      api.fadeCount = faded;
    },
  };
  return api;
}

/** is the hero (head or feet) inside the occluder's projected screen rectangle? (a corner behind the camera = assume yes) */
function heroOnScreenRect(it, ob, camera) {
  const b = it.box;
  let x0 = 9, y0 = 9, x1 = -9, y1 = -9;
  for (let k = 0; k < 8; k++) {
    _p.set(k & 1 ? b.max.x : b.min.x, k & 2 ? b.max.y : b.min.y, k & 4 ? b.max.z : b.min.z).applyMatrix4(ob.matrixWorld);
    _p.project(camera);
    if (_p.z > 1) return true;
    x0 = Math.min(x0, _p.x); x1 = Math.max(x1, _p.x); y0 = Math.min(y0, _p.y); y1 = Math.max(y1, _p.y);
  }
  const m = 0.02;
  const inside = (v) => v.x > x0 - m && v.x < x1 + m && v.y > y0 - m && v.y < y1 + m;
  return inside(_hd) || inside(_ft);
}

/** segment a->b vs box (all in the box's frame): slab method */
function segHitsBox(a, b, box) {
  let t0 = 0, t1 = 1;
  for (const ax of ['x', 'y', 'z']) {
    const d = b[ax] - a[ax];
    if (Math.abs(d) < 1e-9) { if (a[ax] < box.min[ax] || a[ax] > box.max[ax]) return false; continue; }
    let u0 = (box.min[ax] - a[ax]) / d, u1 = (box.max[ax] - a[ax]) / d;
    if (u0 > u1) { const t = u0; u0 = u1; u1 = t; }
    t0 = Math.max(t0, u0); t1 = Math.min(t1, u1);
    if (t0 > t1) return false;
  }
  return true;
}

function ghostOf(mesh) {
  const m = mesh.material;
  const g = m.clone();
  g.onBeforeCompile = m.onBeforeCompile; // keeps the ink shader (hatching) on the clone
  g.customProgramCacheKey = m.customProgramCacheKey;
  if (m.defines) g.defines = { ...m.defines };
  g.userData = m.userData;
  return { orig: m, ghost: g, baseOpacity: m.opacity, baseTransparent: m.transparent, baseDepthWrite: m.depthWrite };
}

function apply(it) {
  const f = it.fade;
  if (f > 0 && !it.ghosts) it.ghosts = it.fills.map((m) => ghostOf(m));
  if (f > 0) {
    const k = THREE.MathUtils.smoothstep(f, 0, 1);
    it.fills.forEach((mesh, i) => {
      const gh = it.ghosts[i];
      if (mesh.material !== gh.ghost) mesh.material = gh.ghost;
      gh.ghost.transparent = true;
      gh.ghost.depthWrite = false;
      gh.ghost.opacity = gh.baseOpacity * (1 - k * (1 - FADE_FILL));
      if (mesh.castShadow && k > 0.5) mesh.userData._cs = true;
    });
    for (const o of it.lines) {
      o.material.transparent = true; o.material.depthWrite = false;
      o.material.uniforms.uAlpha.value = 1 - k * (1 - FADE_LINE);
    }
  } else if (it.ghosts) {
    it.fills.forEach((mesh, i) => { mesh.material = it.ghosts[i].orig; });
    for (const o of it.lines) { o.material.transparent = false; o.material.depthWrite = true; o.material.uniforms.uAlpha.value = 1; }
  }
}

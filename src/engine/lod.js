/**
 * engine/lod.js: cheap visibility culling for big worlds (distance + behind-the-planet), on top of three's frustum culling.
 *
 * const culler = createCuller({ camera, planet })          (the engine provides one as ctx.culler and calls culler.update())
 * culler.add(object, { maxDist=Infinity, radius=1, height=0, dynamic=false, tier='', position=null, outlineDist=Infinity }) -> item
 *     outlineDist  beyond this camera distance the object's ink-outline hulls are hidden (a big draw-call saver for people/vehicles)
 *     position  world point to measure from (default: the object's world position; give the chunk centre for a group at the origin)
 *     object   Object3D whose `visible` flag is driven (its world position is read once, or every frame if dynamic)
 *     maxDist  hidden when the camera is farther than maxDist (+ radius) from it
 *     height   object height above the ground: it may peek over the horizon this much, otherwise it is hidden when the
 *              planet is between it and the camera
 *     item.disabled  (settable) true = never visible/near (the owner is hiding it)
 *     item.near  (bool, live) true while it is within `maxDist` and on the camera's side of the planet (use to skip animation)
 * culler.remove(item)
 * culler.items                live array;  culler.stats = { total, visible }
 * Add instanced chunks / landmarks / NPCs / vehicles with sensible maxDist tiers (landmarks Infinity, props ~70, tiny ~50).
 */
import * as THREE from 'three';

const _p = new THREE.Vector3();

export function createCuller({ camera, planet }) {
  const items = [];
  const R = planet.radius;
  const stats = { total: 0, visible: 0 };
  const camDir = new THREE.Vector3();
  return {
    items, stats,
    add(object, { maxDist = Infinity, radius = 1, height = 0, dynamic = false, tier = '', position = null, outlineDist = Infinity } = {}) {
      object.updateWorldMatrix(true, false);
      const pos = position ? position.clone() : object.getWorldPosition(new THREE.Vector3());
      let outlines = null;
      if (outlineDist < Infinity) { outlines = []; object.traverse((o) => { if (o.name === 'ink-outline') outlines.push(o); }); }
      const item = {
        object, maxDist, radius, dynamic, tier, near: true, outlines, od2: outlineDist * outlineDist, far: false,
        pos, dir: pos.clone().normalize(),
        // cos/sin of the angle by which the object's top peeks past the horizon
        oc: Math.cos(Math.acos(R / (R + Math.max(0.5, height) + radius * 0.4))), os: Math.sin(Math.acos(R / (R + Math.max(0.5, height) + radius * 0.4))),
      };
      items.push(item);
      return item;
    },
    remove(item) { const i = items.indexOf(item); if (i >= 0) items.splice(i, 1); },
    update() {
      const cp = camera.position;
      const cl = cp.length();
      camDir.copy(cp).divideScalar(cl);
      const hz = Math.acos(Math.min(1, R / cl));
      const hc = Math.cos(hz), hs = Math.sin(hz);
      let vis = 0;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (it.disabled) { it.near = false; if (it.object.visible) it.object.visible = false; continue; } // item.disabled = true: the owner hides it
        if (it.dynamic) { it.object.getWorldPosition(it.pos); it.dir.copy(it.pos).normalize(); }
        const dx = it.pos.x - cp.x, dy = it.pos.y - cp.y, dz = it.pos.z - cp.z;
        const lim = it.maxDist + it.radius;
        const d2 = dx * dx + dy * dy + dz * dz;
        let on = d2 < lim * lim;
        if (on) {
          // visible if the angle(camDir, dir) < horizon + peek  <=>  cos > cos(hz + ph)
          const lc = hc * it.oc - hs * it.os;
          on = it.dir.x * camDir.x + it.dir.y * camDir.y + it.dir.z * camDir.z > lc;
        }
        it.near = on;
        if (it.object.visible !== on) it.object.visible = on;
        if (on && it.outlines) { // far away the ink outline is hardly visible: drop it (halves the draw calls of busy things)
          const far = d2 > it.od2;
          if (far !== it.far) { it.far = far; for (let k = 0; k < it.outlines.length; k++) it.outlines[k].visible = !far; }
        }
        if (on) vis++;
      }
      stats.total = items.length; stats.visible = vis;
    },
  };
}

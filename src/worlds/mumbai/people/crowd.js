/**
 * people/crowd.js: distance LOD for lots of people.
 *
 * createCrowdLOD(people, { near = 35, hide = 90, hysteresis = 4 }) -> { add(p), remove(p), update(cameraPosition), people }
 *   Every person has userData.lod(level): 0 = full (skinned body + outline + face + props, animated), 1 = far (one static
 *   merged mesh + one outline, no animation, no props that move), 2 = hidden. update() sets the level from the distance to the
 *   camera (call it every ~0.25 s, not every frame). Plain THREE.Object3D positions are read from the world matrix.
 */
import * as THREE from 'three';

const _v = new THREE.Vector3(), _p = new THREE.Vector3();
export function createCrowdLOD(people = [], { near = 35, hide = 90, hysteresis = 4 } = {}) {
  const list = [...people];
  const levels = new Map();
  return {
    people: list,
    add(p) { list.push(p); },
    remove(p) { const i = list.indexOf(p); if (i >= 0) list.splice(i, 1); levels.delete(p); },
    update(cam) {
      const c = cam.isObject3D ? cam.getWorldPosition(_v) : cam;
      for (const p of list) {
        if (!p.userData.lod) continue;
        const d = p.getWorldPosition(_p).distanceTo(c);
        const cur = levels.get(p) ?? 0;
        let lv = cur;
        if (cur === 0 && d > near + hysteresis) lv = 1;
        else if (cur === 1 && d < near - hysteresis) lv = 0;
        if (hide && lv < 2 && d > hide + hysteresis) lv = 2;
        else if (cur === 2 && d < hide - hysteresis) lv = 1;
        if (lv !== cur) { levels.set(p, lv); p.userData.lod(lv); }
      }
    },
  };
}

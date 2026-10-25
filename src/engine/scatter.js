/**
 * engine/scatter.js: generic seeded, clustered placement of props on the sphere + instanced mesh building.
 *
 * mulberry32(seed) -> () => [0,1)          the seeded rng used everywhere (engine gives worlds ctx.rng)
 * sphere(r,w,h), cyl(rt,rb,h,seg), cone(r,h,seg)   geometry shorthands
 * class Parts                               collects coloured parts into ONE merged vertex-coloured geometry:
 *     parts.add(geometry, color, { pos=[0,0,0], rot=[0,0,0], scale=[1,1,1], outline=true }) -> parts
 *         outline:false keeps the part (eyes, blush, dots) out of the ink hull;
 *     parts.build() -> { geometry, hull }   (hull = outline-only geometry for addOutline({geometry}))
 * createPlacer({ planet, rng, spawnDir=Vector3(0,1,0), spawnClear=6, groups={name: count}, extraSpacing=0.6 }) -> placer
 *     groups: cluster centres to create (e.g. { grove: 8, meadow: 7 }); they stay clear of the spawn
 *     placer.place({ count, group, frac, sigma, species:[{bodyRadius, scale:[min,max], collide:{radius,height}|null}] })
 *         -> { buckets: Matrix4[][] (per species), colliders: [{dir,radius,height}] }
 *         frac = share placed in Gaussian clusters (sigma units) around the group's centres, rest uniform.
 *         Respects spacing between everything placed so far, the spawn clearing, and planet.isWalkable.
 *     placer.randDir() / placer.farFromSpawn(dir, r) / placer.instance(dir, scale, yaw) -> Matrix4 (surface-aligned)
 *     placer.accept = (dir) => bool            optional extra world filter (e.g. keep clear of roads)
 * buildInstanced(parent, parts, material, matrices, { thickness=2.2, castShadow=true, wobbleFreq=1.4, cull=false }) -> InstancedMesh
 *     builds the InstancedMesh + instanced outline from a Parts and adds it to `parent`. cull:true keeps three's frustum
 *     culling on (the bounding sphere of the instances), so split big instance sets into spatial chunks.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { addOutline } from './ink.js';

export function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Collects coloured parts; `outline` parts also go into the geometry used for the ink hull. */
export class Parts {
  constructor() { this.all = []; this.hull = []; }
  add(geo, color, { pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1], outline = true } = {}) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    g.deleteAttribute('uv');
    g.applyMatrix4(
      new THREE.Matrix4().compose(
        new THREE.Vector3(...pos),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)),
        new THREE.Vector3(...scale)
      )
    );
    const col = new THREE.Color(color);
    const arr = new Float32Array(g.attributes.position.count * 3);
    for (let i = 0; i < arr.length; i += 3) { arr[i] = col.r; arr[i + 1] = col.g; arr[i + 2] = col.b; }
    g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    this.all.push(g);
    if (outline) {
      const h = g.clone();
      h.deleteAttribute('color'); h.deleteAttribute('normal');
      this.hull.push(h);
    }
    return this;
  }
  build() {
    return { geometry: mergeGeometries(this.all), hull: mergeGeometries(this.hull) };
  }
}


export const sphere = (r, w = 14, h = 10) => new THREE.SphereGeometry(r, w, h);
export const cyl = (rt, rb, h, s = 8) => new THREE.CylinderGeometry(rt, rb, h, s);
export const cone = (r, h, s = 9) => new THREE.ConeGeometry(r, h, s);

export function createPlacer({ planet, rng: rnd, spawnDir = new THREE.Vector3(0, 1, 0), spawnClear = 6, groups = {}, extraSpacing = 0.6 }) {
  const R = planet.radius;
  const placed = []; // { dir, r } for spacing, shared by all kinds
  const tmpN = new THREE.Vector3();
  const tmpQ = new THREE.Quaternion();
  const yawQ = new THREE.Quaternion();
  const Y = new THREE.Vector3(0, 1, 0);
  const m = new THREE.Matrix4();
  const ax = new THREE.Vector3();

  const randDir = () => {
    const z = rnd() * 2 - 1, a = rnd() * Math.PI * 2, rr = Math.sqrt(1 - z * z);
    return new THREE.Vector3(rr * Math.cos(a), z, rr * Math.sin(a));
  };
  const farFromSpawn = (d, r) => d.angleTo(spawnDir) * R >= spawnClear + r;

  // cluster centres per group (groves, rock piles, meadows), away from the spawn
  const centres = {};
  for (const [name, n] of Object.entries(groups)) {
    centres[name] = [];
    while (centres[name].length < n) { const d = randDir(); if (farFromSpawn(d, 4) && planet.isWalkable(d)) centres[name].push(d); }
  }
  // gaussian scatter around a random centre of the group, along the sphere
  const clusterDir = (name, sigma) => {
    const c = centres[name][Math.floor(rnd() * centres[name].length)];
    const gauss = Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(rnd() * Math.PI * 2);
    ax.copy(randDir()).addScaledVector(c, -c.dot(ax)).normalize(); // random axis perpendicular to c
    return c.clone().applyQuaternion(tmpQ.setFromAxisAngle(ax, (Math.abs(gauss) * sigma) / R));
  };

  const instance = (dir, scale, yaw) => {
    planet.getSurfaceNormal(dir, tmpN);
    tmpQ.setFromUnitVectors(Y, tmpN);
    yawQ.setFromAxisAngle(Y, yaw);
    tmpQ.multiply(yawQ);
    const p = dir.clone().multiplyScalar(planet.getWalkRadius(dir) - 0.05);
    return m.compose(p, tmpQ, new THREE.Vector3(scale, scale, scale)).clone();
  };

  const placer = {
    accept: null,
    randDir, farFromSpawn, instance,
    place({ count, group, frac, sigma, species }) {
      const buckets = species.map(() => []);
      const colliders = [];
      let n = 0;
      for (let tries = 0; n < count && tries < count * 40; tries++) {
        const dir = rnd() < frac ? clusterDir(group, sigma) : randDir();
        const si = Math.floor(rnd() * species.length);
        const sp = species[si];
        const [s0, s1] = sp.scale;
        const scale = s0 + rnd() * (s1 - s0);
        const radius = sp.bodyRadius * scale;

        if (!farFromSpawn(dir, radius)) continue;
        if (!planet.isWalkable(dir) || (placer.accept && !placer.accept(dir))) continue;
        let ok = true;
        for (const q of placed) {
          const minD = (radius + q.r + extraSpacing) / R;
          if (dir.dot(q.dir) > Math.cos(minD)) { ok = false; break; }
        }
        if (!ok) continue;

        buckets[si].push(instance(dir, scale, rnd() * Math.PI * 2));
        placed.push({ dir, r: radius });
        if (sp.collide) colliders.push({ dir, radius: sp.collide.radius * scale, height: sp.collide.height * scale });
        n++;
      }
      return { buckets, colliders };
    },
  };
  return placer;
}

export function buildInstanced(parent, parts, material, matrices, { thickness = 2.2, castShadow = true, wobbleFreq = 1.4, cull = false } = {}) {
  if (!matrices.length) return null;
  const { geometry, hull } = parts.build();
  const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
  matrices.forEach((mt, j) => mesh.setMatrixAt(j, mt));
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  mesh.frustumCulled = cull; // cull: true = per-instanced-mesh frustum culling (use for spatial chunks)
  const ol = addOutline(mesh, { thickness, geometry: hull, wobbleFreq });
  ol.frustumCulled = cull;
  parent.add(mesh);
  return mesh;
}

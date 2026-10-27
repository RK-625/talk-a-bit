/**
 * people/bake.js: collapse a built person (dozens of small rigid meshes + outline hulls) into a handful of draw calls.
 *
 * bakePerson(group, bones) merges every rigid, non-dynamic mesh under `group` into ONE SkinnedMesh (rigid per-part bone weights,
 * vertex colours + per-vertex pattern mask + per-vertex hatch strength, see kit.bodyMaterial) and ONE SkinnedMesh for all the
 * ink outline hulls (kit.bodyOutlineMaterial, per-vertex thickness). Skeleton = the animation pivots (which are THREE.Bone).
 * It also builds a static "far" pair (same geometry, no skinning) for LOD.
 * Meshes are skipped when mesh.userData.noBake, or when any ancestor (below `group`) has userData.dynamic
 * (accessories that swing / tilt / toggle on their own, e.g. kettle, umbrella).
 * Returns { body, outline, farBody, farOutline, count }.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { OVERLAY_LAYER, bodyMaterial, bodyOutlineMaterial, patSlot, atlasUv } from './kit.js';

const _m = new THREE.Matrix4(), _c = new THREE.Color();

function partInfo(mat) {
  const cl = mat.userData?.cloth;
  if (cl) {
    const c1 = new THREE.Color(cl.c1);
    const c2 = new THREE.Color(cl.trim !== null && cl.kind === 'plain' ? cl.trim : cl.c2);
    return { c1, c2, slot: patSlot(cl.kind, cl.trim !== null), hs: 1, cloth: true };
  }
  return { c1: mat.vertexColors ? null : mat.color.clone(), c2: new THREE.Color(0), slot: 0, hs: mat.userData?.smooth ? 0.15 : 1, cloth: false };
}

export function bakePerson(group, bones) {
  group.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const boneIndex = new Map(bones.map((b, i) => [b, i]));
  const parts = [];
  group.traverse((o) => {
    if (!o.isMesh || o.isSkinnedMesh || o.name === 'ink-outline' || o.userData.noBake) return;
    for (let p = o.parent; p && p !== group; p = p.parent) if (p.userData.dynamic) return;
    parts.push(o);
  });
  const bodyList = [], outList = [];
  for (const mesh of parts) {
    let bone = mesh.parent;
    while (bone && !bone.isBone) bone = bone.parent;
    if (!bone) continue; // e.g. ground props: leave as ordinary meshes
    const bi = boneIndex.get(bone);
    _m.multiplyMatrices(inv, mesh.matrixWorld);
    const flip = _m.determinant() < 0;
    const info = partInfo(mesh.material);

    const g = mesh.geometry.clone();
    const n = g.attributes.position.count;
    const hasUv = !!g.attributes.uv;
    const uvs = new Float32Array(n * 2);
    const col = new Float32Array(n * 3), col2 = new Float32Array(n * 3), hs = new Float32Array(n).fill(info.hs);
    const vcol = mesh.material.vertexColors ? g.attributes.color : null;
    for (let i = 0; i < n; i++) {
      if (vcol) { col[i * 3] = vcol.getX(i); col[i * 3 + 1] = vcol.getY(i); col[i * 3 + 2] = vcol.getZ(i); }
      else { col[i * 3] = info.c1.r; col[i * 3 + 1] = info.c1.g; col[i * 3 + 2] = info.c1.b; }
      col2[i * 3] = info.c2.r; col2[i * 3 + 1] = info.c2.g; col2[i * 3 + 2] = info.c2.b;
      const [u, v] = atlasUv(info.slot, hasUv ? g.attributes.uv.getX(i) : 0.5, hasUv ? g.attributes.uv.getY(i) : 0.5);
      uvs[i * 2] = u; uvs[i * 2 + 1] = v;
    }
    const keep = new THREE.BufferGeometry();
    keep.setAttribute('position', g.attributes.position);
    keep.setAttribute('normal', g.attributes.normal);
    keep.setAttribute('color', new THREE.BufferAttribute(col, 3));
    keep.setAttribute('aColor2', new THREE.BufferAttribute(col2, 3));
    keep.setAttribute('aMaskUv', new THREE.BufferAttribute(uvs, 2));
    keep.setAttribute('aHS', new THREE.BufferAttribute(hs, 1));
    keep.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(new Uint16Array(n * 4).map((_, i) => (i % 4 === 0 ? bi : 0)), 4));
    keep.setAttribute('skinWeight', new THREE.Float32BufferAttribute(new Float32Array(n * 4).map((_, i) => (i % 4 === 0 ? 1 : 0)), 4));
    keep.setIndex(g.index ? g.index.clone() : Array.from({ length: n }, (_, i) => i));
    keep.applyMatrix4(_m);
    if (flip) flipWinding(keep);
    bodyList.push(keep);

    const ol = mesh.children.find((c) => c.name === 'ink-outline');
    if (ol) {
      const h = ol.geometry.clone();
      const hn = h.attributes.position.count;
      const hk = new THREE.BufferGeometry();
      hk.setAttribute('position', h.attributes.position);
      hk.setAttribute('normal', h.attributes.normal);
      hk.setAttribute('aThick', new THREE.BufferAttribute(new Float32Array(hn).fill(ol.material.uniforms.uThick.value), 1));
      hk.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(new Uint16Array(hn * 4).map((_, i) => (i % 4 === 0 ? bi : 0)), 4));
      hk.setAttribute('skinWeight', new THREE.Float32BufferAttribute(new Float32Array(hn * 4).map((_, i) => (i % 4 === 0 ? 1 : 0)), 4));
      hk.setIndex(h.index ? h.index.clone() : Array.from({ length: hn }, (_, i) => i));
      hk.applyMatrix4(_m);
      if (flip) flipWinding(hk);
      outList.push(hk);
    }
    mesh.parent.remove(mesh);
  }
  const bodyGeo = mergeGeometries(bodyList, false);
  const outGeo = mergeGeometries(outList, false);
  bodyList.forEach((g) => g.dispose()); outList.forEach((g) => g.dispose());

  const skeleton = new THREE.Skeleton(bones);
  const body = new THREE.SkinnedMesh(bodyGeo, bodyMaterial());
  body.name = 'person-body'; body.castShadow = true; body.receiveShadow = true; body.frustumCulled = false;
  const outline = new THREE.SkinnedMesh(outGeo, bodyOutlineMaterial());
  outline.name = 'ink-outline'; outline.frustumCulled = false; outline.layers.set(OVERLAY_LAYER);
  group.add(body, outline);
  body.bind(skeleton);
  outline.bind(skeleton, body.bindMatrix);

  const farBody = new THREE.Mesh(bodyGeo, bodyMaterial());
  farBody.name = 'person-far'; farBody.frustumCulled = false; farBody.visible = false;
  const farOutline = new THREE.Mesh(outGeo, bodyOutlineMaterial());
  farOutline.name = 'ink-outline'; farOutline.frustumCulled = false; farOutline.visible = false; farOutline.layers.set(OVERLAY_LAYER);
  group.add(farBody, farOutline);
  return { body, outline, farBody, farOutline, count: parts.length };
}

function flipWinding(g) {
  const idx = g.index;
  for (let i = 0; i < idx.count; i += 3) { const a = idx.getX(i + 1); idx.setX(i + 1, idx.getX(i + 2)); idx.setX(i + 2, a); }
}

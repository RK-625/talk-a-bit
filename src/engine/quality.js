/**
 * engine/quality.js: QUALITY = { pixelRatio, shadowSize, msaa, edges (crease-line pass), edgeScale, tufts, propScale, flowerShadows, density (0..1 share of optional NPCs/props/traffic a big world builds), cullScale (multiplies culling distances), touch }.
 * Lower with ?quality=low; gate any heavy world content on it.
 */
// One place to scale the expensive bits.

// Desktop only. ?quality=low is a dev/perf option: cheaper settings (the world builds fewer extras)
const forced = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('quality') : null;
const LOW = forced === 'low';

export const QUALITY = LOW
  ? { pixelRatio: 1.5, shadowSize: 1024, msaa: 2, edges: false, edgeScale: 0.4, tufts: 70, propScale: 0.75, flowerShadows: false, density: 0.55, cullScale: 0.7, touch: true }
  : { pixelRatio: 2, shadowSize: 2048, msaa: 4, edges: true, edgeScale: 0.6, tufts: 260, propScale: 1, flowerShadows: true, density: 1, cullScale: 1, touch: false };

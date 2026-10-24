// One place to scale the expensive bits. Touch devices get the cheap settings.
import { isTouchDevice } from './input.js';

export const QUALITY = isTouchDevice
  ? { pixelRatio: 1.5, shadowSize: 1024, msaa: 2, edges: false, edgeScale: 0.4, tufts: 70, propScale: 0.75, flowerShadows: false }
  : { pixelRatio: 2, shadowSize: 2048, msaa: 4, edges: true, edgeScale: 0.6, tufts: 260, propScale: 1, flowerShadows: true };

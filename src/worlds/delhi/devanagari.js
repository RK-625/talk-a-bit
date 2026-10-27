/**
 * delhi/devanagari.js: Devanagari lettering for painted Canvas signs.
 *   DV_FONT              canvas font stack ("Tiro Devanagari Hindi" / "Kalam" first: Google Fonts the UI already loads; falls back to system Devanagari fonts)
 *   isDevanagari(text)   does the string contain Devanagari script?
 *   loadDevanagariFont() starts loading the fonts (adds the Google Fonts <link> if the UI has not)
 *   onDevanagariReady(fn) fn() now if loaded, else once loaded (so a sign painted with a fallback font can repaint)
 *   devanagariReady()    true once loaded (starts loading if idle)
 * A canvas painted before the font arrives uses the fallback stack and is repainted by the owner through onDevanagariReady.
 * Legacy (Hyderabad fork, until the later agents redo those signs): TE_SYS / isTelugu / KN_FONT / isKannada keep old Telugu and Kannada signs readable via system fonts only.
 */
export const DV_FONT = `'Tiro Devanagari Hindi','Kalam','Kohinoor Devanagari','Devanagari Sangam MN','Noto Sans Devanagari','Mukta','Nirmala UI',sans-serif`;
export const isDevanagari = (t) => /[ऀ-ॿ]/.test(t);
export const TE_SYS = `'Noto Sans Telugu','Kohinoor Telugu','Telugu Sangam MN','Gautami','Nirmala UI',sans-serif`;
export const isTelugu = (t) => /[ఀ-౿]/.test(t);
export const KN_FONT = `'Kohinoor Kannada','Kannada Sangam MN','Noto Sans Kannada','Nirmala UI','Tunga',sans-serif`;
export const isKannada = (t) => /[ಀ-೿]/.test(t);

const FAMILY = 'Tiro Devanagari Hindi';
let state = 0; // 0 idle, 1 loading, 2 ready
const waiters = new Set();
const hasDoc = () => typeof document !== 'undefined' && !!document.fonts;
function ready() {
  if (!hasDoc()) return true;
  let ok = false;
  document.fonts.forEach((f) => { if (f.family.replace(/["']/g, '') === FAMILY && f.status === 'loaded') ok = true; });
  return ok;
}
function done() {
  if (state === 2) return;
  state = 2;
  for (const fn of [...waiters]) { try { fn(); } catch (e) { /* ignore */ } }
  waiters.clear();
}
export function loadDevanagariFont() {
  if (state || !hasDoc()) return;
  state = 1;
  const go = () => document.fonts.load(`700 24px "${FAMILY}"`, 'दिल्ली').then(() => { if (ready()) done(); }).catch(() => {});
  document.fonts.addEventListener?.('loadingdone', () => { if (state !== 2 && ready()) done(); });
  if (ready()) { done(); return; }
  const have = document.querySelector('link[href*="Tiro+Devanagari"]') || [...document.styleSheets].some((s) => { try { return (s.href || '').includes('Tiro+Devanagari'); } catch { return false; } });
  if (have) { go(); return; }
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Kalam:wght@400;700&display=swap';
  l.onload = go; l.onerror = () => {};
  document.head.appendChild(l);
}
export function onDevanagariReady(fn) {
  if (!hasDoc()) return;
  loadDevanagariFont();
  if (state === 2) { fn(); return; }
  waiters.add(fn);
}
export const devanagariReady = () => { if (!state) loadDevanagariFont(); return state === 2; };

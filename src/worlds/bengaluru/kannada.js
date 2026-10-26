/**
 * bengaluru/kannada.js: Kannada lettering for painted Canvas signs.
 *   KN_FONT              canvas font stack ("Baloo Tamma 2" first; it is a Google Font loaded by the UI; falls back to system Kannada fonts)
 *   isKannada(text)      does the string contain Kannada script?
 *   loadKannadaFont()    starts loading "Baloo Tamma 2" (adds the Google Fonts <link> if the UI has not) and returns
 *   onKannadaReady(fn)   fn() now if the font is already loaded, else once it has loaded (so a sign painted with a fallback font can repaint)
 * A canvas painted before the font arrives uses the fallback stack and is repainted by the owner through onKannadaReady.
 */
export const KN_FONT = `'Baloo Tamma 2','Noto Sans Kannada','Kohinoor Kannada','Kannada Sangam MN','Tunga','Nirmala UI',sans-serif`;
export const isKannada = (t) => /[ಀ-೿]/.test(t);

let state = 0; // 0 idle, 1 loading, 2 ready
const waiters = new Set();
const hasDoc = () => typeof document !== 'undefined' && !!document.fonts;
function ready() {
  if (!hasDoc()) return true;
  let ok = false;
  document.fonts.forEach((f) => { if (f.family.replace(/["']/g, '') === 'Baloo Tamma 2' && f.status === 'loaded') ok = true; });
  return ok;
}
function done() {
  if (state === 2) return;
  state = 2;
  for (const fn of [...waiters]) { try { fn(); } catch (e) { /* ignore */ } }
  waiters.clear();
}
export function loadKannadaFont() {
  if (state || !hasDoc()) return;
  state = 1;
  const go = () => document.fonts.load('700 24px "Baloo Tamma 2"', 'ಕನ್ನಡ').then(() => { if (ready()) done(); }).catch(() => {});
  document.fonts.addEventListener?.('loadingdone', () => { if (state !== 2 && ready()) done(); });
  if (ready()) { done(); return; }
  const have = document.querySelector('link[href*="Baloo"]') || [...document.styleSheets].some((s) => { try { return (s.href || '').includes('Baloo'); } catch { return false; } });
  if (have) { go(); return; }
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@500;700&display=swap';
  l.onload = go; l.onerror = () => {};
  document.head.appendChild(l);
}
export function onKannadaReady(fn) {
  if (!hasDoc()) return;
  loadKannadaFont();
  if (state === 2) { fn(); return; }
  waiters.add(fn);
}
export const kannadaReady = () => { if (!state) loadKannadaFont(); return state === 2; };

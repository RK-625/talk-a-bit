/**
 * hyderabad/telugu.js: Telugu lettering for painted Canvas signs.
 *   TE_FONT              canvas font stack ("Baloo Tammudu 2" first; a Google Font loaded here or by the UI; falls back to system Telugu fonts)
 *   isTelugu(text)       does the string contain Telugu script?
 *   loadTeluguFont()     starts loading "Baloo Tammudu 2" (adds the Google Fonts <link> if the UI has not)
 *   onTeluguReady(fn)    fn() now if the font is already loaded, else once it has loaded (so a sign painted with a fallback font can repaint)
 *   teluguReady()        true once loaded (starts loading if idle)
 * A canvas painted before the font arrives uses the fallback stack and is repainted by the owner through onTeluguReady.
 * Legacy (Hyderabad fork, until the props agent redoes those signs): KN_FONT / isKannada keep old Kannada signs readable via system fonts only.
 */
export const TE_FONT = `'Baloo Tammudu 2','Noto Sans Telugu','Kohinoor Telugu','Telugu Sangam MN','Gautami','Nirmala UI',sans-serif`;
export const isTelugu = (t) => /[ఀ-౿]/.test(t);
export const KN_FONT = `'Kohinoor Kannada','Kannada Sangam MN','Noto Sans Kannada','Nirmala UI','Tunga',sans-serif`;
export const isKannada = (t) => /[ಀ-೿]/.test(t);

const FAMILY = 'Baloo Tammudu 2';
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
export function loadTeluguFont() {
  if (state || !hasDoc()) return;
  state = 1;
  const go = () => document.fonts.load(`700 24px "${FAMILY}"`, 'తెలుగు').then(() => { if (ready()) done(); }).catch(() => {});
  document.fonts.addEventListener?.('loadingdone', () => { if (state !== 2 && ready()) done(); });
  if (ready()) { done(); return; }
  const have = document.querySelector('link[href*="Baloo+Tammudu"]') || [...document.styleSheets].some((s) => { try { return (s.href || '').includes('Baloo+Tammudu'); } catch { return false; } });
  if (have) { go(); return; }
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Baloo+Tammudu+2:wght@500;700&display=swap';
  l.onload = go; l.onerror = () => {};
  document.head.appendChild(l);
}
export function onTeluguReady(fn) {
  if (!hasDoc()) return;
  loadTeluguFont();
  if (state === 2) { fn(); return; }
  waiters.add(fn);
}
export const teluguReady = () => { if (!state) loadTeluguFont(); return state === 2; };

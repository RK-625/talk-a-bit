/**
 * chennai/tamil.js: Tamil lettering for painted Canvas signs.
 *   TA_FONT              canvas font stack ("Baloo Thambi 2" first; it is a Google Font loaded by the UI; falls back to system Tamil fonts)
 *   isTamil(text)      does the string contain Tamil script?
 *   loadTamilFont()    starts loading "Baloo Thambi 2" (adds the Google Fonts <link> if the UI has not) and returns
 *   onTamilReady(fn)   fn() now if the font is already loaded, else once it has loaded (so a sign painted with a fallback font can repaint)
 * A canvas painted before the font arrives uses the fallback stack and is repainted by the owner through onTamilReady.
 */
export const TA_FONT = `'Baloo Thambi 2','Noto Sans Tamil','Kohinoor Tamil','Tamil Sangam MN','Latha','Nirmala UI',sans-serif`;
export const isTamil = (t) => /[\u0B80-\u0BFF]/.test(t);

let state = 0; // 0 idle, 1 loading, 2 ready
const waiters = new Set();
const hasDoc = () => typeof document !== 'undefined' && !!document.fonts;
function ready() {
  if (!hasDoc()) return true;
  let ok = false;
  document.fonts.forEach((f) => { if (f.family.replace(/["']/g, '') === 'Baloo Thambi 2' && f.status === 'loaded') ok = true; });
  return ok;
}
function done() {
  if (state === 2) return;
  state = 2;
  for (const fn of [...waiters]) { try { fn(); } catch (e) { /* ignore */ } }
  waiters.clear();
}
export function loadTamilFont() {
  if (state || !hasDoc()) return;
  state = 1;
  const go = () => document.fonts.load('700 24px "Baloo Thambi 2"', 'தமிழ்').then(() => { if (ready()) done(); }).catch(() => {});
  document.fonts.addEventListener?.('loadingdone', () => { if (state !== 2 && ready()) done(); });
  if (ready()) { done(); return; }
  const have = document.querySelector('link[href*="Baloo"]') || [...document.styleSheets].some((s) => { try { return (s.href || '').includes('Baloo'); } catch { return false; } });
  if (have) { go(); return; }
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@500;700&display=swap';
  l.onload = go; l.onerror = () => {};
  document.head.appendChild(l);
}
export function onTamilReady(fn) {
  if (!hasDoc()) return;
  loadTamilFont();
  if (state === 2) { fn(); return; }
  waiters.add(fn);
}
export const tamilReady = () => { if (!state) loadTamilFont(); return state === 2; };

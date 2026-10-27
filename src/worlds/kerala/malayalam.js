/**
 * kerala/malayalam.js: Malayalam lettering for painted Canvas signs (whole-string lettering, like Tamil in Chennai).
 *   TA_FONT              canvas font stack ("Baloo Chettan 2" first, a Google Font; falls back to system Malayalam fonts, then Tamil ones for
 *                        the not-yet-redressed Chennai signs). The export keeps the old name so the copied kits need no churn.
 *   isTamil(text)        does the string contain Malayalam script (or leftover Tamil)? (name kept for the copied kits)
 *   loadTamilFont()      starts loading "Baloo Chettan 2" (adds the Google Fonts <link> if the UI has not)
 *   onTamilReady(fn)     fn() now if the font is loaded, else once it has loaded (so a sign painted with a fallback font can repaint)
 * Aliases ML_FONT / isMalayalam / loadMalayalamFont / onMalayalamReady / malayalamReady are the preferred names for new code.
 */
export const TA_FONT = `'Baloo Chettan 2','Noto Sans Malayalam','Malayalam Sangam MN','Kartika','Nirmala UI','Noto Sans Tamil','Tamil Sangam MN',sans-serif`;
export const isTamil = (t) => /[ഀ-ൿ஀-௿]/.test(t);

let state = 0; // 0 idle, 1 loading, 2 ready
const waiters = new Set();
const hasDoc = () => typeof document !== 'undefined' && !!document.fonts;
function ready() {
  if (!hasDoc()) return true;
  let ok = false;
  document.fonts.forEach((f) => { if (f.family.replace(/["']/g, '') === 'Baloo Chettan 2' && f.status === 'loaded') ok = true; });
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
  const go = () => document.fonts.load('700 24px "Baloo Chettan 2"', 'മലയാളം').then(() => { if (ready()) done(); }).catch(() => {});
  document.fonts.addEventListener?.('loadingdone', () => { if (state !== 2 && ready()) done(); });
  if (ready()) { done(); return; }
  const have = [...document.querySelectorAll('link')].some((l) => (l.href || '').includes('Baloo+Chettan')) || [...document.styleSheets].some((s) => { try { return (s.href || '').includes('Baloo+Chettan'); } catch { return false; } });
  if (have) { go(); return; }
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@500;700&display=swap';
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
export { TA_FONT as ML_FONT, isTamil as isMalayalam, loadTamilFont as loadMalayalamFont, onTamilReady as onMalayalamReady, tamilReady as malayalamReady };

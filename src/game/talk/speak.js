/**
 * game/talk/speak.js: speak(text, { lang = 'hi' | 'kn' | 'ta' | 'te' | 'ml' | 'en', voice = { rate, pitch, volume?, name? }, lineId? }) -> Promise (resolves when done, cancelled or failed).
 *   Live voice (Sarvam Bulbul): if `lineId` is given, the clip comes from GET /api/tts?id=<lineId> (our server calls Sarvam; the key never reaches the browser), is kept in the Cache API and played through an HTMLAudioElement
 *   (voice.volume respected). preload(lineId) warms the likely next "-valid" line. Any failure (no endpoint, 404, 503, timeout, offline, autoplay blocked) falls back to speechSynthesis, whose rate is scaled by LEARNER_SPEED.
 *   Browser speechSynthesis: a hi-IN voice for Hindi, a kn-IN / ta-IN / te-IN / ml-IN voice for Kannada / Tamil / Telugu / Malayalam (none installed: text only, ONE console warning per language, never read by a wrong-language voice), en-IN / en-GB for English. Voices load asynchronously (handled).
 *   cancel() stops the current line. If no voice for the language exists the text is still shown by the UI; we warn once.
 *   Keep this behind speak() so a better TTS can replace it later.
 */
import { LEARNER_SPEED } from './learnerSpeed.js';
export { LEARNER_SPEED };

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let voices = [];
const warned = new Set();
let current = null; // keep a reference (Chrome can garbage-collect utterances mid-speech)

function loadVoices() { voices = synth?.getVoices?.() ?? []; }
if (synth) { loadVoices(); synth.addEventListener?.('voiceschanged', loadVoices); }

const NAMES = { hi: 'Hindi (hi-IN)', kn: 'Kannada (kn-IN)', ta: 'Tamil (ta-IN)', te: 'Telugu (te-IN)', ml: 'Malayalam (ml-IN)' };
const SOUTH = new Set(['kn', 'ta', 'te', 'ml']); // scripts the default voice would mangle: no voice, no speech
const PREFS = { hi: ['hi-IN', 'hi'], kn: ['kn-IN', 'kn'], ta: ['ta-IN', 'ta'], te: ['te-IN', 'te'], ml: ['ml-IN', 'ml'], en: ['en-IN', 'en-GB', 'en-US', 'en'] };

/** best available voice for 'hi' | 'en' (or null) */
export function pickVoice(lang = 'hi', name = null) {
  if (!voices.length) loadVoices();
  if (name) { const v = voices.find((x) => x.name === name); if (v) return v; }
  for (const code of PREFS[lang] ?? PREFS.en) {
    const m = voices.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith(code.toLowerCase()));
    if (m.length) return m.find((v) => /google|neural|natural|lekha|kalpana|neerja|rishi|microsoft/i.test(v.name)) ?? m[0];
  }
  return null;
}

// ---- live Sarvam voice (GET /api/tts?id=<lineId>, see server/tts.js) ----
// A known line id is fetched from our own endpoint (the key stays on the server), kept in the Cache API so a line is fetched once per browser,
// and played through an HTMLAudioElement. Anything that goes wrong (no endpoint, 404, 503, timeout, offline, autoplay blocked, no sound within 4 s)
// falls back to the browser voice below.
const BASE = import.meta.env?.BASE_URL ?? '/';
const CACHE_NAME = 'talkabit-voice-v1';
const FETCH_MS = 5000;
const clipUrl = (lineId) => `${BASE}api/tts?id=${encodeURIComponent(lineId)}`;
let routeMissing = false; // the host has no /api/tts at all (static hosting): skip the endpoint for the rest of the session
let seq = 0; // bumped by every cancel(): an async speak() that finds it changed was cancelled meanwhile
let playing = null; // { a, finish } of the clip now playing
let ctl = null; // AbortController of the clip fetch in flight
const warming = new Set();

const openCache = () => (typeof caches !== 'undefined' ? caches.open(CACHE_NAME).catch(() => null) : Promise.resolve(null));

/** the clip as a Blob: from the Cache API, else from the endpoint (then cached). Throws on anything else. */
async function getClip(lineId, { signal, low = false } = {}) {
  const url = clipUrl(lineId), cache = await openCache();
  const hit = await cache?.match(url).catch(() => null);
  if (hit) return hit.blob();
  const ac = new AbortController(), timer = setTimeout(() => ac.abort(), FETCH_MS);
  const onAbort = () => ac.abort();
  signal?.addEventListener('abort', onAbort);
  try {
    const res = await fetch(url, { signal: ac.signal, ...(low ? { priority: 'low' } : {}) });
    if (res.headers.get('x-tts') !== '1') { routeMissing = true; throw new Error('no voice endpoint'); } // an SPA fallback page or a host without the route
    if (!res.ok || !/^audio\//.test(res.headers.get('content-type') ?? '')) throw new Error(`voice ${res.status}`);
    await cache?.put(url, res.clone()).catch(() => {});
    return await res.blob();
  } finally { clearTimeout(timer); signal?.removeEventListener('abort', onAbort); }
}

/** warm the clip of a line that will probably be spoken next (the "-valid" reply); the retry line is skipped to save credits */
export function preload(lineId) {
  if (!lineId || routeMissing || !lineId.endsWith('-valid') || warming.has(lineId) || typeof Audio === 'undefined') return;
  warming.add(lineId);
  getClip(lineId, { low: true }).catch(() => {}).finally(() => warming.delete(lineId));
}

/** play one clip: resolves 'ended' | 'cancelled' | 'failed' */
function playBlob(blob, volume) {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(blob), a = new Audio(objectUrl);
    a.volume = Math.min(1, Math.max(0, volume));
    let done = false, guard = null;
    const finish = (r) => {
      if (done) return; done = true; clearTimeout(guard);
      a.onended = a.onerror = a.onplaying = null; try { a.pause(); } catch { /* ignore */ }
      URL.revokeObjectURL(objectUrl);
      if (playing?.a === a) playing = null;
      resolve(r);
    };
    a.onended = () => finish('ended'); a.onerror = () => finish('failed');
    // no sound within 4 s -> browser voice instead; once playing, cap at its length + 2 s
    guard = setTimeout(() => finish('failed'), 4000);
    a.onplaying = () => { clearTimeout(guard); guard = setTimeout(() => finish('ended'), ((Number.isFinite(a.duration) ? a.duration : 15) + 2) * 1000); };
    playing = { a, finish };
    try { a.play()?.catch(() => finish('failed')); } catch { finish('failed'); } // autoplay blocked / unsupported
  });
}

export function cancel() {
  seq++;
  try { ctl?.abort(); } catch { /* ignore */ } ctl = null;
  playing?.finish('cancelled'); playing = null;
  try { synth?.cancel(); } catch { /* ignore */ } current = null;
}

export function speak(text, { lang = 'hi', voice = {}, lineId = null } = {}) {
  if (!lineId || routeMissing || typeof Audio === 'undefined') return speakSynth(text, lang, voice);
  cancel(); const mine = seq;
  const mineCtl = (ctl = new AbortController());
  return getClip(lineId, { signal: mineCtl.signal })
    .then((blob) => (mine === seq ? playBlob(blob, voice.volume ?? 1) : 'cancelled'))
    .catch(() => (mine === seq ? 'failed' : 'cancelled'))
    .then((r) => (r === 'failed' && mine === seq ? speakSynth(text, lang, voice) : undefined));
}

function speakSynth(text, lang, voice) {
  return new Promise((resolve) => {
    if (!synth || !text) return resolve();
    cancel();
    const v = pickVoice(lang, voice.name);
    if (!v && !warned.has(lang)) { warned.add(lang); console.warn(`[talk] no ${NAMES[lang] ?? 'English'} speech voice installed; showing text only`); }
    if (!v && SOUTH.has(lang)) return resolve(); // never let the default voice mangle Indic script (Kannada, Tamil, Telugu, Malayalam)
    const u = new SpeechSynthesisUtterance(text);
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    u.rate = (voice.rate ?? 1) * LEARNER_SPEED; u.pitch = voice.pitch ?? 1; u.volume = voice.volume ?? 1;
    let done = false;
    const finish = () => { if (!done) { done = true; clearTimeout(guard); if (current === u) current = null; resolve(); } };
    u.onend = finish; u.onerror = finish;
    current = u;
    const guard = setTimeout(finish, Math.min(15000, 1800 + text.length * 110)); // some browsers never fire onend
    try { synth.speak(u); } catch { finish(); }
  });
}

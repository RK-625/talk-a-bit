/**
 * game/talk/speak.js: speak(text, { lang = 'hi' | 'kn' | 'ta' | 'te' | 'ml' | 'en', voice = { rate, pitch, volume?, name? }, lineId? }) -> Promise (resolves when done, cancelled or failed).
 *   Pre-generated voice (Sarvam Bulbul, see scripts/voices.mjs): if `lineId` is in public/voices/manifest.json the mp3 plays through an HTMLAudioElement
 *   (voice.volume respected). No manifest, no entry for the id, or the audio fails to load / play (autoplay blocked, 404): falls back to speechSynthesis below, exactly as before.
 *   preload(lineId) warms the audio for a line that is about to be spoken.
 *   Browser speechSynthesis: a hi-IN voice for Hindi, a kn-IN / ta-IN / te-IN / ml-IN voice for Kannada / Tamil / Telugu / Malayalam (none installed: text only, ONE console warning per language, never read by a wrong-language voice), en-IN / en-GB for English. Voices load asynchronously (handled).
 *   cancel() stops the current line. If no voice for the language exists the text is still shown by the UI; we warn once.
 *   Keep this behind speak() so a better TTS can replace it later.
 */
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

// ---- pre-generated audio (scripts/voices.mjs -> public/voices) ----
const BASE = import.meta.env?.BASE_URL ?? '/';
let manifest = null; // { [lineId]: { file, hash } } once loaded ({} when missing)
let manifestP = null;
let seq = 0; // bumped by every cancel(): an async speak() that finds it changed was cancelled meanwhile
let playing = null; // { a, finish } of the mp3 now playing
const warm = new Map(); // lineId -> preloaded HTMLAudioElement (small LRU)

function loadManifest() {
  return (manifestP ??= fetch(`${BASE}voices/manifest.json`)
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({}))
    .then((m) => (manifest = m && typeof m === 'object' && !Array.isArray(m) ? m : {})));
}
const urlFor = (lineId) => (manifest?.[lineId]?.file ? `${BASE}voices/${manifest[lineId].file}` : null);

export function preload(lineId) {
  if (!lineId || typeof Audio === 'undefined') return;
  loadManifest().then(() => {
    const url = urlFor(lineId);
    if (!url || warm.has(lineId)) return;
    const a = new Audio(url); a.preload = 'auto';
    warm.set(lineId, a);
    if (warm.size > 8) warm.delete(warm.keys().next().value);
  });
}

/** play one mp3: resolves 'ended' | 'cancelled' | 'failed' */
function playFile(lineId, url, volume) {
  return new Promise((resolve) => {
    const a = warm.get(lineId) ?? new Audio(url);
    warm.delete(lineId);
    try { a.currentTime = 0; } catch { /* not seekable yet */ }
    a.volume = Math.min(1, Math.max(0, volume));
    let done = false;
    let finish = (r) => { if (done) return; done = true; a.onended = a.onerror = null; try { a.pause(); } catch { /* ignore */ } if (playing?.a === a) playing = null; resolve(r); };
    a.onended = () => finish('ended'); a.onerror = () => finish('failed');
    // a slow or stalled network must never freeze the conversation: no sound within 4 s -> browser voice instead; once playing, cap at its length + 2 s
    let guard = setTimeout(() => finish('failed'), 4000);
    a.onplaying = () => { clearTimeout(guard); guard = setTimeout(() => finish('ended'), ((Number.isFinite(a.duration) ? a.duration : 15) + 2) * 1000); };
    const end = finish; finish = (r) => { clearTimeout(guard); end(r); };
    playing = { a, finish };
    try { a.play()?.catch(() => finish('failed')); } catch { finish('failed'); } // autoplay blocked / unsupported
  });
}

export function cancel() {
  seq++;
  playing?.finish('cancelled'); playing = null;
  try { synth?.cancel(); } catch { /* ignore */ } current = null;
}

export function speak(text, { lang = 'hi', voice = {}, lineId = null } = {}) {
  if (!lineId) return speakSynth(text, lang, voice);
  const go = () => {
    const url = urlFor(lineId);
    if (!url) return speakSynth(text, lang, voice); // no pre-generated audio for this line
    cancel(); const mine = seq;
    return playFile(lineId, url, voice.volume ?? 1).then((r) => (r === 'failed' && mine === seq ? speakSynth(text, lang, voice) : undefined));
  };
  if (manifest) return go();
  cancel(); const mine = seq; // manifest still loading: stop the old line now, then decide
  return loadManifest().then(() => (mine === seq ? go() : undefined));
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
    u.rate = voice.rate ?? 1; u.pitch = voice.pitch ?? 1; u.volume = voice.volume ?? 1;
    let done = false;
    const finish = () => { if (!done) { done = true; clearTimeout(guard); if (current === u) current = null; resolve(); } };
    u.onend = finish; u.onerror = finish;
    current = u;
    const guard = setTimeout(finish, Math.min(15000, 1800 + text.length * 110)); // some browsers never fire onend
    try { synth.speak(u); } catch { finish(); }
  });
}

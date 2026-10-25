/**
 * game/talk/speak.js: speak(text, { lang = 'hi', voice = { rate, pitch, name? } }) -> Promise (resolves when done, cancelled or failed).
 *   Browser speechSynthesis: a hi-IN voice for Hindi, en-IN / en-GB for English. Voices load asynchronously (handled).
 *   cancel() stops the current line. If no voice for the language exists the text is still shown by the UI; we warn once.
 *   Keep this behind speak() so a better TTS can replace it later.
 */
const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let voices = [];
const warned = new Set();
let current = null; // keep a reference (Chrome can garbage-collect utterances mid-speech)

function loadVoices() { voices = synth?.getVoices?.() ?? []; }
if (synth) { loadVoices(); synth.addEventListener?.('voiceschanged', loadVoices); }

const PREFS = { hi: ['hi-IN', 'hi'], en: ['en-IN', 'en-GB', 'en-US', 'en'] };

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

export function cancel() { try { synth?.cancel(); } catch { /* ignore */ } current = null; }

export function speak(text, { lang = 'hi', voice = {} } = {}) {
  return new Promise((resolve) => {
    if (!synth || !text) return resolve();
    cancel();
    const v = pickVoice(lang, voice.name);
    if (!v && !warned.has(lang)) { warned.add(lang); console.warn(`[talk] no ${lang === 'hi' ? 'Hindi (hi-IN)' : 'English'} speech voice installed; showing text only`); }
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

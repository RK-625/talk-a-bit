// Tiny helpers so the Delhi dialogues stay readable. Output matches the schema in docs/DIALOGUE.md (lang 'hi' unless told otherwise).
// Hindi lines are hand-written as THREE strings [Devanagari, roman (Latin only), English]; a suggested phrase is [roman, Devanagari].
// English-speaking tourists (lang 'en') use one plain string per line and a plain string for the suggested phrase.

const cap = (s) => s.replace(/(^|[.!?]\s+)([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/^([a-z])/, (m) => m.toUpperCase());
const ln = (a) => (typeof a === 'string' ? { text: a, roman: a, en: a } : { text: a[0], roman: a[1], en: a[2] });
const norm = (s) => s.toLowerCase().replace(/[.,!?'"।]/g, '').replace(/\s+/g, ' ').trim();
const strip = (s) => s.replace(/[।.!?]+$/, '').trim();
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean).slice(0, 6).join('_');

/**
 * S(id, npc [dev, roman, en], instruction, suggest [roman, dev], accept[] (romanised / Hinglish / Punjabi-flavoured variants, optionally
 * one extra Devanagari form), [hint1, hint2], onValid [dev, roman, en], onRetry [dev, roman, en])
 * The suggested phrase (roman + Devanagari) is added to accept automatically; hint 3 is always the full phrase; the intent is the
 * instruction as snake_case.
 */
export const step = (id, npc, instruction, suggest, accept, hints, onValid, onRetry) => {
  const sroman = typeof suggest === 'string' ? suggest : suggest[0];
  const sdev = typeof suggest === 'string' ? suggest : suggest[1];
  const acc = [...new Set([norm(sroman), strip(sdev), ...accept])].slice(0, 10);
  return {
    id, npc: ln(npc), instruction, suggest: { roman: sroman, text: sdev }, accept: acc, intent: slug(instruction),
    hints: [hints[0], hints[1], `Say: "${sroman}"`], onValid: ln(onValid), onRetry: ln(onRetry),
  };
};

// voice presets: m man, f woman, k kid, o old man/woman, q quick
const VOICES = { m: { rate: 1.0, pitch: 0.9 }, f: { rate: 1.0, pitch: 1.15 }, k: { rate: 1.1, pitch: 1.3 }, o: { rate: 0.9, pitch: 0.85 }, q: { rate: 1.15, pitch: 1.0 } };

/** dialogue(id, { name, role, site, diff, voice, persona, goal, steps, outro, learned: [[roman, en]...], again, lang?, place?, tutorial? }) */
export const dialogue = (id, o) => ({
  id, name: o.name, role: o.role, lang: o.lang ?? 'hi', site: o.site, difficulty: o.diff ?? 2,
  ...(o.place ? { place: o.place } : {}), ...(o.tutorial ? { tutorial: true } : {}),
  voice: typeof o.voice === 'string' ? VOICES[o.voice] : (o.voice ?? { rate: 1.0, pitch: 1.0 }),
  persona: o.persona, goal: o.goal, steps: o.steps,
  outro: ln(o.outro), learned: o.learned.map(([r, en]) => ({ roman: r, en })), ...(o.again ? { again: ln(o.again) } : {}),
});

/** P(id, name, role, site, voice, goal, steps[], outro, learned [[roman, en]...], again, diff?, lang?) for the single-person cast dialogues. */
export const P = (id, name, role, site, voice, goal, steps, outro, learned, again, diff = 1, lang) =>
  dialogue(id, { name, role, site, voice, persona: `${name}, ${role}, at ${site}. Knows Rahul is a UPSC aspirant from Patna.`, goal, steps, outro, learned, again, diff, lang });
export { cap };

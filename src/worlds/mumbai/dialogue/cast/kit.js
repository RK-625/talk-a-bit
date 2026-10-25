// Tiny helpers so the cast dialogues stay readable. Output matches the schema in docs/DIALOGUE.md.
// A line is written [devanagari, roman, english] (English NPCs: just one string, via E()).
const ln = (a) => (typeof a === 'string' ? { text: a, roman: a, en: a } : { text: a[0], roman: a[1], en: a[2] });
export const E = (s) => s;

/** step(id, npcLine, instruction, [romanSuggest, devanagariSuggest], accept[], intent, hints[3], onValid, onRetry) */
export const step = (id, npc, instruction, suggest, accept, intent, hints, onValid, onRetry) => ({
  id, npc: ln(npc), instruction, suggest: { roman: suggest[0], text: suggest[1] }, accept, intent, hints, onValid: ln(onValid), onRetry: ln(onRetry),
});

/** dialogue(id, { name, role, site, diff, voice, persona, goal, steps, outro, learned: [[roman, en]...], again, lang? }) */
export const dialogue = (id, o) => ({
  id, name: o.name, role: o.role, lang: o.lang ?? 'hi', site: o.site, difficulty: o.diff ?? 2,
  voice: o.voice ?? { rate: 1.0, pitch: 1.0 },
  persona: o.persona, goal: o.goal, steps: o.steps,
  outro: ln(o.outro), learned: o.learned.map(([roman, en]) => ({ roman, en })), again: ln(o.again),
});

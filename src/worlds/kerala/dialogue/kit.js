// Tiny helpers so the Kochi dialogues stay readable. Output matches the schema in docs/DIALOGUE.md (lang 'ml' unless told otherwise).
// A line is written [Malayalam script, romanised Malayalam, English] (English-speaking tourists: just one string).
const ln = (a) => (typeof a === 'string' ? { text: a, roman: a, en: a } : { text: a[0], roman: a[1], en: a[2] });
const norm = (s) => s.toLowerCase().replace(/[.,!?'"…।]/g, '').replace(/\s+/g, ' ').trim();

/**
 * step(id, npcLine, instruction, [romanSuggest, malayalamSuggest], variants[], intent, hints[2 or 3], onValid, onRetry)
 * `accept` is built here: the suggested phrase (Manglish + Malayalam script) plus the variants, 6-10 strings in all.
 * If only 2 hints are given, the third is always the full phrase: Say: "<romanSuggest>".
 */
export const step = (id, npc, instruction, suggest, variants, intent, hints, onValid, onRetry) => {
  const accept = [...new Set([norm(suggest[0]), ...variants.map(norm)])].slice(0, 8);
  accept.push(suggest[1].replace(/[.,!?।]/g, '').trim());
  return {
    id, npc: ln(npc), instruction, suggest: { roman: suggest[0], text: suggest[1] }, accept, intent,
    hints: hints.length === 3 ? hints : [...hints, `Say: "${suggest[0]}"`], onValid: ln(onValid), onRetry: ln(onRetry),
  };
};

/** dialogue(id, { name, role, site, diff, voice, persona, goal, steps, outro, learned: [[roman, en]...], again, lang?, place?, tutorial? }) */
export const dialogue = (id, o) => ({
  id, name: o.name, role: o.role, lang: o.lang ?? 'ml', site: o.site, difficulty: o.diff ?? 2,
  ...(o.place ? { place: o.place } : {}), ...(o.tutorial ? { tutorial: true } : {}),
  voice: o.voice ?? { rate: 1.0, pitch: 1.0 },
  persona: o.persona, goal: o.goal, steps: o.steps,
  outro: ln(o.outro), learned: o.learned.map(([roman, en]) => ({ roman, en })), again: ln(o.again),
});

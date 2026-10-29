/**
 * scripts/gloss.check.mjs: checks the word-by-word English glosses that the talk UI shows as chips under each romanised word.
 *
 *   node scripts/gloss.check.mjs [world ...] [--list-missing] [--json]
 *
 * Gloss file per world: src/worlds/<world>/dialogue/gloss.json = { "<roman line, exactly as in the dialogue>": ["gloss", ...] }
 * Every spoken / suggested romanised line (npc, onValid, onRetry, suggest, outro, again) needs an entry whose array has exactly
 * one gloss per whitespace-separated word of the roman line (punctuation stays attached to its word).
 * Prints missing / misaligned / unused entries per world; exits 1 if anything is missing or misaligned.
 *   --list-missing   print every missing roman line (one per line), to feed a glossing pass
 *   --json           print { world: [missing roman lines] } as JSON
 */
import fs from 'node:fs';
import path from 'node:path';

const ALL = ['mumbai', 'delhi', 'bengaluru', 'chennai', 'hyderabad', 'kerala'];
const args = process.argv.slice(2);
const worlds = args.filter((a) => !a.startsWith('--')).length ? args.filter((a) => !a.startsWith('--')) : ALL;
const listMissing = args.includes('--list-missing'), asJson = args.includes('--json');

export const words = (roman) => roman.trim().split(/\s+/);

/** every romanised line the talk UI can show for a world */
export async function romanLines(world) {
  const mod = await import(path.resolve('src/worlds', world, 'dialogue/index.js'));
  const list = Object.values(mod).flatMap((v) => (Array.isArray(v) ? v : v && typeof v === 'object' ? Object.values(v) : [])).filter((d) => d && d.steps);
  const set = new Set();
  const add = (l) => { const r = l?.roman?.trim(); if (r && r !== l.text?.trim()) set.add(r); };
  // English tourists need no gloss
  for (const d of list.filter((x) => x.lang !== 'en')) { for (const s of d.steps.filter(Boolean)) { add(s.npc); add(s.onValid); add(s.onRetry); add(s.suggest); } add(d.outro); add(d.again); }
  return [...set];
}

let bad = 0;
const out = {};
for (const w of worlds) {
  const file = path.resolve('src/worlds', w, 'dialogue/gloss.json');
  const gloss = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const lines = await romanLines(w);
  const missing = lines.filter((r) => !Array.isArray(gloss[r]));
  const misaligned = lines.filter((r) => Array.isArray(gloss[r]) && gloss[r].length !== words(r).length);
  const used = new Set(lines), unused = Object.keys(gloss).filter((k) => !used.has(k));
  bad += missing.length + misaligned.length;
  out[w] = missing;
  if (asJson) continue;
  if (listMissing) { missing.forEach((r) => console.log(r)); continue; }
  console.log(`${w}: ${lines.length} lines, ${lines.length - missing.length} glossed, ${missing.length} missing, ${misaligned.length} misaligned, ${unused.length} unused`);
  misaligned.slice(0, 10).forEach((r) => console.log(`  misaligned (${words(r).length} words, ${gloss[r].length} glosses): ${r}`));
}
if (asJson) console.log(JSON.stringify(out, null, 1));
process.exit(bad ? 1 : 0);

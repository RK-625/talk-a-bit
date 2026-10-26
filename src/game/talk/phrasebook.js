/**
 * game/talk/phrasebook.js: the player's saved phrases, kept per world (localStorage, every access wrapped in try/catch).
 *   phrasebook.list(world = 'mumbai') -> [{ key, npc, world, roman, text?, en, at }]
 *   phrasebook.add(npcName, worldId, entries[]) -> number added     phrasebook.clear(world)
 * Storage: `talkabit.phrasebook.v2.<world>`. The old single list (`talkabit.phrasebook.v1`) is copied into the per-world keys
 * on first use (entries without a world, or from 'mumbai', go to mumbai) and left in place, so no Mumbai entry is lost.
 */
const OLD = 'talkabit.phrasebook.v1';
const nsKey = (w) => `talkabit.phrasebook.v2.${w}`;
const mem = {};
let migrated = false;
function rawGet(k) { try { const raw = localStorage.getItem(k); if (raw !== null) return JSON.parse(raw); } catch { /* storage blocked */ } return null; }
function rawSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked: kept in memory */ } }

function migrate() {
  if (migrated) return; migrated = true;
  if (rawGet(nsKey('_migrated'))) return;
  rawSet(nsKey('_migrated'), true);
  const old = rawGet(OLD);
  if (!Array.isArray(old) || !old.length) return;
  const byWorld = {};
  for (const e of old) { const w = e.world && e.world !== 'world' ? e.world : 'mumbai'; (byWorld[w] ??= []).push(e); }
  for (const [w, es] of Object.entries(byWorld)) {
    const cur = rawGet(nsKey(w));
    if (Array.isArray(cur) && cur.length) { // merge, never overwrite
      for (const e of es) if (!cur.some((x) => x.key === e.key)) cur.push(e);
      rawSet(nsKey(w), cur); mem[w] = cur;
    } else { rawSet(nsKey(w), es); mem[w] = es; }
  }
}

function read(world) { migrate(); const v = rawGet(nsKey(world)); return Array.isArray(v) ? v : (mem[world] ?? []); }
function write(world, v) { mem[world] = v; rawSet(nsKey(world), v); }

export const phrasebook = {
  list(world = 'mumbai') { return read(world); },
  add(npc, world = 'mumbai', entries = []) {
    const cur = [...read(world)]; let n = 0;
    for (const e of entries) {
      const key = `${world}|${e.roman}`;
      if (cur.some((x) => x.key === key)) continue;
      cur.push({ key, npc, world, roman: e.roman, text: e.text ?? null, en: e.en, at: Date.now() }); n++;
    }
    if (n) write(world, cur);
    return n;
  },
  clear(world = 'mumbai') { write(world, []); },
};

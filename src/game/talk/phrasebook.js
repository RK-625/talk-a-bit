/**
 * game/talk/phrasebook.js: the player's saved phrases (localStorage, every access wrapped in try/catch).
 *   phrasebook.list() -> [{ key, npc, world, roman, text?, en, at }]   phrasebook.add(npcName, worldId, entries[]) -> number added
 */
const KEY = 'talkabit.phrasebook.v1';
let mem = [];
function read() { try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch { /* storage blocked */ } return mem; }
function write(v) { mem = v; try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage blocked: kept in memory */ } }

export const phrasebook = {
  list() { const v = read(); return Array.isArray(v) ? v : []; },
  add(npc, world, entries = []) {
    const cur = this.list(); let n = 0;
    for (const e of entries) {
      const key = `${world}|${e.roman}`;
      if (cur.some((x) => x.key === key)) continue;
      cur.push({ key, npc, world, roman: e.roman, text: e.text ?? null, en: e.en, at: Date.now() }); n++;
    }
    if (n) write(cur);
    return n;
  },
  clear() { write([]); },
};

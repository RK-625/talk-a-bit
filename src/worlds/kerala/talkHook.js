/**
 * kerala/talkHook.js: marks Kochi's people talkable and loads their dialogues.
 *   const hook = talkHook(W)  ->  hook.register(group, npc)   (called by npcs.js for every person it places)
 * Which NPCs talk, and what they say:
 *   - every person is talkable (not dogs/birds). Dialogue lookup: an explicit placement id (person(role, { id: 'x' }) when dialogues['x'] exists),
 *     else the role's dialogue, but only for the ONE person per role placed with { convo: true } (the one at the dialogue's `site`).
 *     Everyone else (same role elsewhere, roles without a dialogue) just says a short GREETINGS line.
 *   - dialogues come from ./dialogue/index.js (default export { [idOrRole]: dialogue }, schema in docs/DIALOGUE.md); the file may not
 *     exist yet (loaded with import.meta.glob, so a missing file is fine). In dev a built-in sample fills any id the real file lacks.
 *   - foreign roles speak English (FOREIGN below).
 */
const FOREIGN = new Set(['tourist']);
const NOT_TALKABLE = new Set(['strayDog', 'crow', 'pigeon']);
const LABEL = {
  citizen: 'Kochiite', chaiwalaUncle: 'Kuttan Chettan', vadaPavWala: 'Puttu chettan', taxiDriver: 'Auto chettan', dabbawala: 'Delivery rider',
  koliFisherwoman: 'Fish chechi', golaWala: 'Sarbath chettan', bhelWala: 'Chips chettan', busConductor: 'Bus conductor', trafficCop: 'Police',
  commuter: 'Metro commuter', coolie: 'Porter', pilgrim: 'Devotee', priest: 'Priest', securityGuard: 'Security', tourist: 'Tourist',
  bollywoodHopeful: 'Mollywood fan', photographer: 'Photographer', balloonSeller: 'Balloon seller', cricketKid: 'Football kid', auntyWithSabzi: 'Chechi',
};

export function talkHook(W) {
  const talk = W.talk;
  if (!talk) return { register() {} };

  const mods = import.meta.glob('./dialogue/index.js'); // guarded: no error when the folder/file is absent
  const load = mods['./dialogue/index.js'];
  (async () => {
    if (load) {
      try { const m = await load(); talk.setDialogues(m.default ?? {}); talk.setGreetings(m.GREETINGS); return; }
      catch (e) { console.warn('[kerala] dialogue/index.js failed to load', e); }
    }
    if (import.meta.env.DEV) talk.setDialogues((await import('../../game/talk/sampleDialogue.js')).default); // dev stand-in until the real file exists
  })();

  return {
    register(g, n) {
      const role = n.role ?? g.userData.role ?? 'citizen';
      if (NOT_TALKABLE.has(role)) return; // (a seated couple is one talkable entry: you speak to the pair)
      const handle = talk.register({
        id: n.id ?? role, explicitId: n.id ?? null, convo: !!n.convo, role, object: g, name: LABEL[role] ?? null,
        lang: FOREIGN.has(role) ? 'en' : 'ml',
        canTurn: !n.walker && !n.sitting,
        active: () => g.visible && (!g.userData.lodLevel || g.userData.lodLevel() === 0),
        hold: (on) => { n.talking = on; if (n.walker && n.actor) n.actor.speed = on ? 0 : n.speed; },
      });
      n.talkable = handle;
    },
  };
}

/**
 * game/talk/talk.js: conversations with NPCs (generic: any world can use it; see docs/DIALOGUE.md).
 *
 * createTalk({ camera, player, cameraRig, input, worldId }) -> talk   (the engine makes one and passes it to world.build as ctx.talk)
 *
 *   World API:
 *     talk.register({ id, role, object, convo?, explicitId?, name?, lang = 'hi' | 'kn' | 'ta' | 'te' | 'en', canTurn = true, active?(), hold?(on) }) -> handle
 *         convo:true marks the ONE NPC that gets the full conversation for its role (others of that role only greet);
 *         explicitId: a placement id that has its own dialogue (checked first). object: the NPC's Object3D (userData.setLookTarget(v) is used when present); id/role pick the dialogue (id first, then role);
 *         canTurn:false for things that steer their own body (walkers); hold(true|false) pauses/resumes the NPC while you talk.
 *     talk.unregister(handle)
 *     talk.setDialogues({ [idOrRole]: dialogue })   merge dialogues (schema in docs/DIALOGUE.md); later calls override earlier ones
 *     talk.setGreetings([line, ...])                short lines (same { text, roman, en } shape) for NPCs that have no dialogue
 *     A dialogue with tutorial:true gets a first-load hint (note + arrow: "New here? Talk to <name> at the <place>", dialogue.place default 'tapri') until the player has talked to that NPC once.
 *     talk.state -> 'idle' | 'ambient' | 'npc' | 'await' | 'checking' | 'react' | 'reward'
 *   Player: walk near an NPC (about 3 units, roughly in front) -> "बात करो / Talk [E]" (Kannada NPCs / the bengaluru world: "ಮಾತಾಡಿ / Talk [E]"; chennai "பேசுங்க / Talk [E]"; hyderabad "మాట్లాడండి / Talk [E]"); E starts; Esc leaves; P opens the phrasebook.
 *   NPCs without a dialogue just say a short greeting (spoken) when you press E.
 */
import * as THREE from 'three';
import { createTalkUI } from './ui.js';
import { speak, cancel as cancelSpeech } from './speak.js';
import { phrasebook } from './phrasebook.js';
import { classify, reasonLine } from '../classifier.js';
import { GREETINGS, GREETINGS_EN } from './sampleDialogue.js';

const RANGE = 3.6, CLOSE = 1.7, CONE = 1.25; // metres, metres, radians
const MAX_TRIES = 3;
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3(), _up = new THREE.Vector3(), _q = new THREE.Quaternion(), _p = new THREE.Vector3();

const wp = (o, out) => out.set(o.matrixWorld.elements[12], o.matrixWorld.elements[13], o.matrixWorld.elements[14]);
const tangentOf = (v, up) => v.addScaledVector(up, -v.dot(up));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const speechLang = (l) => (['en', 'kn', 'ta', 'te'].includes(l) ? l : 'hi');
const WORLD_LANG = { bengaluru: 'kn', chennai: 'ta', hyderabad: 'te' }; // a southern world labels every NPC bubble in its language
const NPC_LABEL = { bengaluru: 'Bengalurian', chennai: 'Chennaiite', hyderabad: 'Hyderabadi' }; // default card / phrasebook name
const FALLBACK_RETRY = {
  kn: { text: 'ಏನು? ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ.', roman: 'Enu? Innomme heli.', en: 'What? Say it again.' },
  ta: { text: 'என்ன? திரும்பச் சொல்லுங்க.', roman: 'Enna? Thirumba sollunga.', en: 'What? Say it again.' },
  te: { text: 'ఏంటి? మళ్ళీ చెప్పండి.', roman: 'Enti? Malli cheppandi.', en: 'What? Say it again.' },
  hi: { text: 'क्या? फिर से बोल।', roman: 'Kya? Phir se bol.', en: 'What? Say it again.' },
};
const FALLBACK_VALID = {
  kn: { text: 'ಸರಿ.', roman: 'Sari.', en: 'Okay.' },
  ta: { text: 'சரி.', roman: 'Sari.', en: 'Okay.' },
  te: { text: 'సరే.', roman: 'Sare.', en: 'Okay.' },
  hi: { text: 'ठीक है।', roman: 'Theek hai.', en: 'Okay.' },
};
const hash = (s) => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

function defaultHints(step) {
  const words = (step.suggest?.roman ?? '').replace(/[.!?,।]/g, '').split(/\s+/).filter(Boolean);
  return [words[0] ? `Start with "${words[0]}".` : 'Try a short, simple reply.', words.length > 2 ? `Key words: "${words.slice(0, Math.ceil(words.length / 2)).join(' ')}".` : `Try: "${words.join(' ')}".`, `Say: "${step.suggest?.roman ?? ''}"`];
}

export function createTalk({ camera, player, cameraRig, input, worldId = 'world', ui = createTalkUI() }) {
  const list = new Set();
  let dialogues = {};
  let greetings = GREETINGS;
  let guideDone = false;
  try { guideDone = localStorage.getItem('talkabit.tutorial.v1') === '1'; } catch { /* storage blocked */ }
  let doneIds = new Set(); // dialogues finished before (this session or earlier visits): a repeat opens with `again` when present
  try { doneIds = new Set(JSON.parse(localStorage.getItem('talkabit.done.v1') || '[]')); } catch { /* storage blocked */ }
  let cand = null; // current talkable under the prompt
  let conv = null; // { t, dlg, i, attempt, assisted, token }
  let amb = null; // { t, until, line }
  const releasing = []; // NPCs turning back to their original facing
  let pressE = false;
  let state = 'idle';
  let cooldown = 0;

  const dialogueFor = (t) => (t.explicitId && dialogues[t.explicitId]) || (t.convo ? dialogues[t.role] : null) || null;

  const api = {
    ui,
    get state() { return state; },
    get conversation() { return conv; },
    register(t) { t.lang ??= 'hi'; t.canTurn ??= true; list.add(t); return t; },
    unregister(t) { list.delete(t); if (cand === t) cand = null; },
    setDialogues(map) { dialogues = { ...dialogues, ...map }; },
    setGreetings(list) { if (list?.length) greetings = list; },
    dialogueFor,
    get talkables() { return list; },
    start, end, update,
  };

  // ---------------- keys ----------------
  const typing = () => ui.inputFocused();
  window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.code === 'Escape') { if (ui.bookOpen()) ui.toggleBook([], false); else if (conv || amb) end(); return; }
    if (e.code === 'Enter' && conv && state === 'reward') { e.preventDefault(); end(); return; }
    if (typing()) return;
    if (e.code === 'KeyP') { ui.toggleBook(phrasebook.list(worldId)); return; }
    if (e.code === 'KeyE') { e.preventDefault(); if (conv && state === 'reward') end(); else pressE = true; return; } // no stray "e" in the reply box it focuses
    if (e.code === 'KeyH' && conv) ui.toggleSuggest();
  });
  ui.onToggleBook(() => ui.toggleBook(phrasebook.list(worldId)));
  ui.onSubmit((v) => submit(v));

  // ---------------- per frame ----------------
  function project(pos, lift, out) {
    _up.copy(pos).normalize();
    out.copy(pos).addScaledVector(_up, lift).project(camera);
    return out.z < 1 && out.z > -1 ? { x: (out.x * 0.5 + 0.5) * window.innerWidth, y: (-out.y * 0.5 + 0.5) * window.innerHeight } : null;
  }

  function findCandidate() {
    let best = null, bestScore = 1e9;
    const pp = player.object.position;
    for (const t of list) {
      if (t.active && !t.active()) continue;
      wp(t.object, _a);
      const dx = _a.x - pp.x, dy = _a.y - pp.y, dz = _a.z - pp.z, d2 = dx * dx + dy * dy + dz * dz;
      if (d2 > RANGE * RANGE) continue;
      const d = Math.sqrt(d2);
      _b.set(dx, dy, dz); tangentOf(_b, player.up).normalize();
      const ang = Math.acos(THREE.MathUtils.clamp(_b.dot(player.face), -1, 1));
      if (!(d < CLOSE || ang < CONE)) continue;
      const score = d + ang * 0.9;
      if (score < bestScore) { bestScore = score; best = t; }
    }
    return best;
  }

  function lookAtHero(t, on) {
    const f = t.object.userData?.setLookTarget; if (!f) return;
    if (!on) { f(null); return; }
    _p.copy(player.object.position).addScaledVector(player.up, 1.15); f(_p);
  }

  function turnNpc(t, dt) {
    if (!t.canTurn) return;
    const o = t.object; wp(o, _a);
    _up.copy(_a).normalize();
    _b.set(0, 0, 1).applyQuaternion(o.quaternion); tangentOf(_b, _up).normalize(); // current forward
    _c.copy(player.object.position).sub(_a); tangentOf(_c, _up).normalize(); // want: toward Chotu
    if (_c.lengthSq() < 0.5) return;
    const ang = Math.atan2(_up.dot(_a.crossVectors(_b, _c)), _b.dot(_c));
    o.quaternion.premultiply(_q.setFromAxisAngle(_up, ang * (1 - Math.exp(-6 * dt))));
    o.updateMatrix(); o.updateMatrixWorld(true);
  }

  function turnHero(t, dt) {
    wp(t.object, _a); _c.copy(_a).sub(player.object.position); tangentOf(_c, player.up).normalize();
    if (_c.lengthSq() < 0.5) return;
    _b.copy(player.face);
    const ang = Math.atan2(player.up.dot(_a.crossVectors(_b, _c)), _b.dot(_c));
    player.face.applyQuaternion(_q.setFromAxisAngle(player.up, ang * (1 - Math.exp(-7 * dt))));
  }

  function update(dt) {
    cooldown -= dt;
    updateGuide();
    // NPCs easing back to how they stood
    for (let i = releasing.length - 1; i >= 0; i--) {
      const r = releasing[i];
      r.t.object.quaternion.slerp(r.q0, 1 - Math.exp(-6 * dt)); r.t.object.updateMatrix(); r.t.object.updateMatrixWorld(true);
      if (r.t.object.quaternion.angleTo(r.q0) < 0.01) { r.t.object.quaternion.copy(r.q0); releasing.splice(i, 1); }
    }
    if (conv) {
      ui.hideBubble();
      turnNpc(conv.t, dt); turnHero(conv.t, dt); lookAtHero(conv.t, true);
      return;
    }
    if (amb) {
      turnNpc(amb.t, dt); lookAtHero(amb.t, true);
      wp(amb.t.object, _a); const s = project(_a, 2.7, _b);
      if (s) ui.showSpeech(s.x, s.y, amb.line); else ui.hideSpeech();
      if (performance.now() > amb.until) endAmbient();
      ui.hideBubble();
      return;
    }
    if (cooldown > 0) { ui.hideBubble(); pressE = false; return; }
    const next = findCandidate();
    if (next !== cand) { if (cand) lookAtHero(cand, false); cand = next; }
    if (cand) {
      wp(cand.object, _a);
      const s = project(_a, 2.55, _b);
      const dd = dialogueFor(cand);
      if (s) ui.showBubble(s.x, s.y, { ...(dd ? { difficulty: dd.difficulty, tutorial: !!dd.tutorial } : {}), lang: WORLD_LANG[worldId] ?? (['kn', 'ta', 'te'].includes(dd?.lang ?? cand.lang) ? (dd?.lang ?? cand.lang) : 'hi') }); else ui.hideBubble();
      state = 'idle';
      if (pressE) { pressE = false; start(cand); }
    } else ui.hideBubble();
    pressE = false;
  }

  // ---------------- first-load guide: a note + arrow to the tutorial NPC ----------------
  // The banner shows on first load, then fades after ~15 s or once the player has walked ~15 units from where it first showed
  // (whichever comes first), and never comes back by itself. The bubble over the tutorial NPC (star) is separate and stays.
  const GUIDE_MS = 15000, GUIDE_DIST = 15;
  let guideT = null, guideGone = false, guideSince = 0;
  const guideFrom = new THREE.Vector3();
  function updateGuide() {
    if (guideDone || guideGone) { ui.hideGuide(); return; }
    if (!guideSince) { guideSince = performance.now(); guideFrom.copy(player.object.position); }
    else if (performance.now() - guideSince > GUIDE_MS || player.object.position.distanceTo(guideFrom) > GUIDE_DIST) { guideGone = true; ui.fadeGuide(); return; }
    if (!guideT || !guideT.object.parent) {
      guideT = null;
      for (const t of list) { const d = dialogueFor(t); if (d?.tutorial) { guideT = t; break; } }
      if (!guideT) { ui.hideGuide(); return; }
    }
    const d = dialogueFor(guideT);
    wp(guideT.object, _a);
    const near = _a.distanceTo(player.object.position) < RANGE + 0.5;
    if (near || conv || amb) { ui.hideGuide(); return; }
    _b.copy(_a).addScaledVector(_up.copy(_a).normalize(), 2.9).project(camera);
    const W = window.innerWidth, H = window.innerHeight;
    const text = `New here? Talk to ${d.name ?? 'the chai uncle'} at the ${d.place ?? 'tapri'}`;
    const behind = _b.z > 1;
    let x = (_b.x * 0.5 + 0.5) * W, y = (-_b.y * 0.5 + 0.5) * H;
    const on = !behind && x > 60 && x < W - 60 && y > 80 && y < H - 120;
    if (on) ui.showGuide({ text, x, y: y - 14, angle: 90 });
    else {
      const cx = W / 2, cy = H / 2; let dx = x - cx, dy = y - cy; if (behind) { dx = -dx; dy = -dy; }
      const ang = Math.atan2(dy, dx), k = Math.min((W / 2 - 150) / Math.abs(Math.cos(ang) || 1e-6), (H / 2 - 90) / Math.abs(Math.sin(ang) || 1e-6));
      ui.showGuide({ text, x: cx + Math.cos(ang) * k, y: cy + Math.sin(ang) * k, angle: (ang * 180) / Math.PI });
    }
  }
  function finishGuide(t) {
    if (guideDone || !guideT || t !== guideT) return;
    guideDone = true; ui.hideGuide();
    try { localStorage.setItem('talkabit.tutorial.v1', '1'); } catch { /* storage blocked */ }
  }

  // ---------------- conversation ----------------
  function endAmbient() {
    if (!amb) return;
    ui.hideSpeech(); lookAtHero(amb.t, false); amb.t.hold?.(false);
    if (amb.q0) releasing.push({ t: amb.t, q0: amb.q0 });
    amb = null; state = 'idle'; cooldown = 0.6;
  }

  function start(t) {
    if (conv || amb) return;
    cancelSpeech();
    ui.hideBubble();
    const dlg = dialogueFor(t);
    const q0 = t.canTurn ? t.object.quaternion.clone() : null;
    t.hold?.(true);
    if (!dlg) { // ambient citizen: a short spoken greeting
      const pool = t.lang === 'en' ? GREETINGS_EN : greetings;
      const line = pool[(hash(t.id ?? t.role) + Math.floor(Math.random() * 7)) % pool.length];
      amb = { t, until: performance.now() + 3200, line, q0 }; state = 'ambient';
      speak(line.text, { lang: speechLang(t.lang), voice: { rate: 1, pitch: 1 } });
      return;
    }
    finishGuide(t);
    conv = { t, dlg, i: 0, attempt: 0, assisted: 0, token: Math.random(), q0, abort: null };
    input.clearKeys(); input.setLocked(true);
    ui.openCard({ name: dlg.name ?? t.name ?? (NPC_LABEL[worldId] ?? 'Mumbaikar') });
    window.dispatchEvent(new CustomEvent('talkabit:conversation', { detail: { on: true } })); // music ducks
    // two-shot: camera behind Chotu, looking at the pair
    wp(t.object, _a); _b.copy(_a).sub(player.object.position); tangentOf(_b, player.up).normalize();
    _c.copy(player.object.position).add(_a).multiplyScalar(0.5);
    cameraRig.setShot({ focus: _c.clone(), heading: _b.clone(), distance: 6.6, pitch: 0.2, side: 1.1, lower: 1.9 });
    runStep();
  }

  function say(line, { react = false, wait = true } = {}) {
    const dlg = conv?.dlg;
    ui.setNpc(line, { react });
    ui.setSpeaking(true);
    const tok = conv?.token;
    const p = speak(dlg?.lang === 'en' || conv?.t.lang === 'en' ? (line.text || line.roman) : (line.text || line.roman), { lang: speechLang(dlg?.lang ?? conv?.t.lang), voice: dlg?.voice ?? {} })
      .then(() => { if (conv && conv.token === tok) ui.setSpeaking(false); });
    return wait ? p : Promise.resolve();
  }

  function runStep() {
    const c = conv; const step = c.dlg.steps[c.i];
    c.attempt = 0; state = 'npc';
    ui.resetRow();
    ui.setStep({ instruction: step.instruction, suggest: step.suggest });
    say(c.i === 0 && c.dlg.again && doneIds.has(c.dlg.id) ? c.dlg.again : step.npc, { wait: false }); // "phir aaya?" opener on a repeat visit
    ui.setBusy(false); state = 'await';
  }

  async function submit(raw) {
    const c = conv; const reply = (raw ?? '').trim();
    if (!c || state !== 'await' || !reply) return;
    state = 'checking'; ui.setBusy(true); ui.setThinking(true); ui.setReason(null);
    const step = c.dlg.steps[c.i], tok = c.token;
    const ac = c.abort = new AbortController();
    let res;
    try {
      res = await classify({ worldId, npcId: c.dlg.id ?? c.t.id, npcName: c.dlg.name, npcRole: c.dlg.role, lang: c.dlg.lang ?? 'hi', persona: c.dlg.persona, goal: c.dlg.goal, step: { id: step.id, intent: step.intent, instruction: step.instruction, npc: step.npc, suggest: step.suggest, accept: step.accept }, attempt: c.attempt + 1, reply }, { signal: ac.signal });
    } catch (e) { if (e?.name !== 'AbortError') console.warn('[talk] classifier failed', e); res = { verdict: 'retry' }; }
    if (!conv || conv.token !== tok || ac.signal.aborted) return; // left during the check: ignore a late answer
    c.abort = null; ui.setThinking(false);
    if (res.verdict === 'valid') return advance(step, false);
    c.attempt++;
    const hints = step.hints?.length ? step.hints : defaultHints(step);
    const hint = hints[Math.min(c.attempt, hints.length) - 1];
    if (c.attempt >= MAX_TRIES) { // the NPC helps: show the full phrase and accept the step as assisted
      state = 'react'; ui.flashRetry();
      ui.setHint(hints[hints.length - 1] ?? `Say: "${step.suggest?.roman}"`, MAX_TRIES); ui.setReason(reasonLine(res.reason, c.dlg.lang));
      c.assisted++;
      await sleep(2300); if (!conv || conv.token !== tok) return;
      return advance(step, true);
    }
    state = 'react'; ui.flashRetry();
    ui.setHint(hint, c.attempt); ui.setReason(reasonLine(res.reason, c.dlg.lang));
    ui.setBusy(false); ui.focusInput(); state = 'await';
    await say(step.onRetry ?? (FALLBACK_RETRY[c.dlg.lang] ?? FALLBACK_RETRY.hi), { react: true, wait: false });
  }

  async function advance(step, assisted) {
    const c = conv, tok = c.token; state = 'react';
    if (!assisted) ui.flashValid();
    ui.setHint(null, 0);
    await Promise.all([say(step.onValid ?? (FALLBACK_VALID[c.dlg.lang] ?? FALLBACK_VALID.hi), { wait: true }), sleep(1300)]);
    if (!conv || conv.token !== tok) return;
    if (++c.i < c.dlg.steps.length) return runStep();
    outro();
  }

  async function outro() {
    const c = conv, tok = c.token; state = 'react';
    ui.setBusy(true);
    const learned = (c.dlg.learned ?? []).length ? c.dlg.learned : c.dlg.steps.filter((s) => s.suggest).map((s) => ({ roman: s.suggest.roman, en: s.instruction, text: s.suggest.text }));
    if (c.dlg.id && !doneIds.has(c.dlg.id)) { doneIds.add(c.dlg.id); try { localStorage.setItem('talkabit.done.v1', JSON.stringify([...doneIds])); } catch { /* storage blocked */ } }
    phrasebook.add(c.dlg.name ?? c.t.name ?? (NPC_LABEL[worldId] ?? 'Mumbaikar'), worldId, learned);
    const p = c.dlg.outro ? say(c.dlg.outro, { wait: true }) : Promise.resolve();
    ui.showReward({ learned });
    state = 'reward';
    await p;
  }

  function end() {
    if (amb) { endAmbient(); cancelSpeech(); return; }
    if (!conv) return;
    const c = conv; conv = null; state = 'idle';
    c.abort?.abort(); ui.setThinking(false);
    cancelSpeech(); ui.setSpeaking(false);
    ui.closeCard(); ui.hideBubble();
    window.dispatchEvent(new CustomEvent('talkabit:conversation', { detail: { on: false } }));
    cameraRig.setShot(null);
    input.setLocked(false);
    lookAtHero(c.t, false); c.t.hold?.(false);
    if (c.q0) releasing.push({ t: c.t, q0: c.q0 });
    cooldown = 0.8; cand = null; pressE = false;
  }

  return api;
}

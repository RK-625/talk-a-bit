/**
 * game/audio/music.js: generative warm ambient music, pure WebAudio (no audio files).
 *
 *   createMusic() -> { start, toggle, duck(on), dispose, stats }
 *     start()    call from the first user gesture; creates the AudioContext and fades in over ~3 s (no-op if the player turned music off)
 *     toggle()   M key: on/off (persisted in localStorage, try/catch); shows a tiny "♪ on / ♪ off" ballpoint note
 *     duck(on)   lowers to ~35% (conversations). Also driven by window event 'talkabit:conversation' {detail:{on}}
 *     stats()    { voices, ctx } live node counters (debug)
 *
 * Design: Sa = D3, raga Yaman (S R G M# P D N). A tanpura strum (Pa Sa Sa Sa-low, detuned partials = soft jawari shimmer) loops
 * every ~3.7 s at ~65 bpm; a warm triangle pad crossfades between raga chords every 18-30 s; sparse sitar/santoor-ish plucks wander
 * the scale with random gaps, so nothing audibly repeats. One shared generated-IR convolution reverb. Finished voices are disconnected.
 */
const SA = 146.83; // D3
const YAMAN = [0, 2, 4, 6, 7, 9, 11]; // semitones
const CHORDS = [[0, 7, 16], [-3, 4, 7], [2, 7, 11], [-1, 4, 9], [0, 4, 11], [-5, 2, 11]];
const STORE = 'talkabit.music.v1';
const MASTER = 0.5;
const rand = (a, b) => a + Math.random() * (b - a);
const hz = (semi) => SA * Math.pow(2, semi / 12);
// scale degree index (can be negative / >6) -> semitones above Sa
const degSemi = (d) => { const o = Math.floor(d / 7); return YAMAN[((d % 7) + 7) % 7] + 12 * o; };

function makeIR(ctx, secs = 3.6) {
  const n = Math.floor(ctx.sampleRate * secs), buf = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c); let lp = 0;
    for (let i = 0; i < n; i++) {
      const t = i / n, w = Math.random() * 2 - 1;
      lp += (w - lp) * (0.55 - 0.45 * t); // darkens as it decays
      d[i] = lp * Math.pow(1 - t, 2.6) * (i < 400 ? i / 400 : 1);
    }
  }
  return buf;
}

function loadPref() { try { return localStorage.getItem(STORE) !== 'off'; } catch { return true; } }
function savePref(on) { try { localStorage.setItem(STORE, on ? 'on' : 'off'); } catch { /* storage blocked */ } }

// ---------- toast: ballpoint-style note, its own DOM node ----------
function makeToast() {
  const el = document.createElement('div');
  el.style.cssText = "position:fixed;left:22px;bottom:18px;z-index:21;pointer-events:none;padding:5px 16px 6px;font:22px 'Patrick Hand','Bradley Hand','Segoe Print','Comic Sans MS',cursive;color:#2b2a33;opacity:0;transform:translateY(6px) rotate(-1.5deg);transition:opacity .25s,transform .25s";
  el.innerHTML = '<svg style="position:absolute;inset:0;width:100%;height:100%;overflow:visible"></svg><span style="position:relative"></span>';
  document.body.appendChild(el);
  const svg = el.firstChild, label = el.lastChild; let timer = 0, seed = 11;
  const wob = (w, h, amp) => {
    let s = seed * 9301 + 49297; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647) - 0.5;
    const p = [[2, 2], [w / 2, 2], [w - 2, 2], [w - 2, h / 2], [w - 2, h - 2], [w / 2, h - 2], [2, h - 2], [2, h / 2]].map(([x, y]) => [x + r() * amp, y + r() * amp]);
    let d = `M ${p[0][0]} ${p[0][1]}`; const n = p.length;
    for (let i = 0; i < n; i++) { const a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n], e = p[(i + 2) % n]; d += ` C ${b[0] + (c[0] - a[0]) / 6} ${b[1] + (c[1] - a[1]) / 6} ${c[0] - (e[0] - b[0]) / 6} ${c[1] - (e[1] - b[1]) / 6} ${c[0]} ${c[1]}`; }
    return d + ' Z';
  };
  return {
    show(text) {
      label.textContent = text; seed++;
      const w = el.offsetWidth, h = el.offsetHeight;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      svg.innerHTML = `<path d="${wob(w, h, 3)}" fill="#fbf3dc" style="filter:drop-shadow(3px 4px 0 rgba(43,42,51,.22))"/><path d="${wob(w, h, 3)}" fill="none" stroke="#2b2a33" stroke-width="2.6" stroke-linejoin="round"/><path d="${wob(w, h, 1.6)}" fill="none" stroke="#2b2a33" stroke-opacity=".4" stroke-width="1.2"/>`;
      el.style.opacity = '1'; el.style.transform = 'translateY(0) rotate(-1.5deg)';
      clearTimeout(timer);
      timer = setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(6px) rotate(-1.5deg)'; }, 1600);
    },
    dispose() { clearTimeout(timer); el.remove(); },
  };
}

export function createMusic() {
  let enabled = loadPref();
  let ctx = null, userGain, duckGain, bus, verb;
  let voices = 0, started = false, disposed = false, ducked = false, gestureDone = false;
  let timer = 0, nextTanpura = 0, nextMelody = 0, nextChord = 0, degree = 9, chordIdx = 0, padVoice = null;
  const toast = makeToast();

  // a voice = a set of oscillators routed through one gain; disconnect everything when the last one ends
  function voice(oscs, out, stopAt) {
    voices++;
    let left = oscs.length;
    for (const o of oscs) o.onended = () => { o.disconnect(); if (--left === 0) { out.disconnect(); voices--; } };
    for (const o of oscs) o.stop(stopAt);
  }

  function pluck(freq, t, { vol = 0.12, dur = 3, bright = 2600, saw = true } = {}) {
    const g = ctx.createGain(), f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.Q.value = 2.5;
    f.frequency.setValueAtTime(bright, t); f.frequency.exponentialRampToValueAtTime(Math.max(300, freq * 1.3), t + dur * 0.7);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    f.connect(g); g.connect(bus);
    const oscs = [];
    [[1, 0, 1], [2.003, 4, 0.35], [3.01, -3, 0.18]].forEach(([m, cents, a]) => {
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = saw && m === 1 ? 'sawtooth' : 'triangle'; o.frequency.value = freq * m; o.detune.value = cents + rand(-2, 2);
      og.gain.value = a; o.connect(og); og.connect(f); o.start(t); oscs.push(o);
      o.onended = null;
    });
    // og gains/filter get released when oscillators end: route cleanup via the filter
    voice(oscs, g, t + dur + 0.1);
    const last = oscs[0]; const prev = last.onended; last.onended = () => { prev?.(); f.disconnect(); };
  }

  // tanpura string: fundamental + slightly detuned partials that beat gently (jawari-ish shimmer)
  function tanpura(freq, t, vol) {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.04); g.gain.exponentialRampToValueAtTime(vol * 0.35, t + 1.5); g.gain.exponentialRampToValueAtTime(0.0001, t + 5.2);
    g.connect(bus);
    const oscs = [];
    [[1, 0, 1], [1, 3, 0.6], [2, 2, 0.5], [3, -4, 0.36], [4, 5, 0.22]].forEach(([m, cents, a], i) => {
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq * m; o.detune.value = cents;
      og.gain.setValueAtTime(a, t); if (i > 1) og.gain.exponentialRampToValueAtTime(0.02, t + 2.8); // upper partials die first -> mellows
      o.connect(og); og.connect(g); o.start(t); oscs.push(o);
    });
    voice(oscs, g, t + 5.3);
  }

  function padChord(semis, t) {
    const g = ctx.createGain(), f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 900; f.Q.value = 0.4;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.1, t + 7);
    f.connect(g); g.connect(bus);
    const oscs = [];
    semis.forEach((s) => [-5, 5].forEach((cents) => {
      const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = hz(s); o.detune.value = cents + rand(-2, 2);
      const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = rand(0.05, 0.15); lg.gain.value = 4; lfo.connect(lg); lg.connect(o.detune); lfo.start(t);
      o.connect(f); o.start(t); oscs.push(o, lfo);
    }));
    return { g, oscs, f };
  }
  function releasePad(p, t, fade = 7) {
    p.g.gain.cancelScheduledValues(t); p.g.gain.setValueAtTime(p.g.gain.value, t); p.g.gain.linearRampToValueAtTime(0.0001, t + fade);
    voice(p.oscs, p.g, t + fade + 0.2);
    const o = p.oscs[0], prev = o.onended; o.onended = () => { prev?.(); p.f.disconnect(); };
  }

  function melodyPhrase(t) {
    const n = Math.random() < 0.3 ? 1 : Math.random() < 0.6 ? 2 : 3;
    const dir = Math.random() < 0.55 ? -1 : 1; // phrases tend to settle downward
    let d = degree, at = t;
    for (let i = 0; i < n; i++) {
      d += dir * (Math.random() < 0.7 ? 1 : 2) + (Math.random() < 0.15 ? -dir : 0);
      d = Math.max(7, Math.min(16, d)); // keep within Sa'..~Ni''
      const f = hz(degSemi(d));
      pluck(f, at, { vol: rand(0.07, 0.11), dur: rand(2.6, 4), bright: rand(2200, 3400), saw: Math.random() < 0.5 });
      at += rand(0.55, 1.1);
    }
    if (Math.random() < 0.3) degree = 11; else degree = d; // sometimes return home-ish
  }

  // lookahead scheduler, runs ~4x/s
  function tick() {
    if (!ctx || ctx.state !== 'running' || !enabled) return;
    const horizon = ctx.currentTime + 1.2;
    while (nextTanpura < horizon) { // Pa Sa Sa Sa(low), ~0.92 s per beat at 65 bpm
      const t = Math.max(nextTanpura, ctx.currentTime + 0.02);
      const seq = [[-5 - 12, 0.2], [0, 0.14], [0, 0.14], [-12, 0.2]];
      seq.forEach(([s, v], i) => tanpura(hz(s), t + i * 0.92 + rand(-0.02, 0.02), v * 0.55));
      nextTanpura = t + 4 * 0.92 + rand(0, 0.25) + 0.1;
    }
    if (nextChord < horizon) {
      const t = Math.max(nextChord, ctx.currentTime + 0.02);
      if (padVoice) releasePad(padVoice, t, 7);
      let c; do c = Math.floor(Math.random() * CHORDS.length); while (c === chordIdx);
      chordIdx = c; padVoice = padChord(CHORDS[c], t);
      nextChord = t + rand(18, 30);
    }
    if (nextMelody < horizon) {
      melodyPhrase(Math.max(nextMelody, ctx.currentTime + 0.02));
      nextMelody = Math.max(nextMelody, ctx.currentTime) + rand(3.5, 9);
    }
  }

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    ctx = new AC();
    userGain = ctx.createGain(); userGain.gain.value = 0;
    duckGain = ctx.createGain(); duckGain.gain.value = ducked ? 0.35 : 1;
    const master = ctx.createGain(); master.gain.value = MASTER;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 3;
    bus = ctx.createGain();
    verb = ctx.createConvolver(); verb.buffer = makeIR(ctx);
    const wet = ctx.createGain(); wet.gain.value = 0.55;
    const dry = ctx.createGain(); dry.gain.value = 0.7;
    bus.connect(dry); bus.connect(verb); verb.connect(wet);
    dry.connect(comp); wet.connect(comp); comp.connect(master); master.connect(duckGain); duckGain.connect(userGain); userGain.connect(ctx.destination);
    return true;
  }

  function fade(to, secs) {
    const t = ctx.currentTime; userGain.gain.cancelScheduledValues(t); userGain.gain.setValueAtTime(userGain.gain.value, t); userGain.gain.linearRampToValueAtTime(to, t + secs);
  }

  async function run() {
    if (disposed || !enabled) return;
    if (!ctx && !build()) return;
    try { await ctx.resume(); } catch { /* blocked: next gesture retries */ }
    if (ctx.state !== 'running' || !enabled || disposed) return;
    const now = ctx.currentTime;
    if (!started) { nextTanpura = now + 0.1; nextMelody = now + 5; nextChord = now; started = true; }
    else { nextTanpura = Math.max(nextTanpura, now + 0.1); nextMelody = Math.max(nextMelody, now + 2); }
    fade(1, started && ctx.currentTime > 4 ? 1.2 : 3);
    if (!timer) timer = setInterval(tick, 250);
    tick();
  }

  function api_start() { gestureDone = true; run(); }
  function toggle() {
    enabled = !enabled; savePref(enabled); toast.show(enabled ? '♪ on' : '♪ off'); gestureDone = true;
    if (enabled) run();
    else if (ctx) { fade(0, 0.8); setTimeout(() => { if (!enabled && ctx && !document.hidden) ctx.suspend().catch(() => {}); }, 1000); }
  }
  function duck(on) {
    ducked = !!on; if (!ctx) return;
    duckGain.gain.setTargetAtTime(ducked ? 0.35 : 1, ctx.currentTime, 0.35);
  }

  // ---------- wiring ----------
  let startEvent = null; // an M press that starts the music must not also toggle it off
  const onGesture = (e) => { if (gestureDone && ctx?.state === 'running') { cleanupGesture(); return; } startEvent = enabled ? e : null; api_start(); };
  const cleanupGesture = () => { window.removeEventListener('keydown', onGesture, true); window.removeEventListener('pointerdown', onGesture, true); };
  window.addEventListener('keydown', onGesture, true);
  window.addEventListener('pointerdown', onGesture, true);
  const onKey = (e) => {
    if (e.code !== 'KeyM' || e.repeat || e.ctrlKey || e.metaKey || e.altKey || e === startEvent) return;
    const a = document.activeElement, tag = a?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || a?.isContentEditable) return;
    toggle();
  };
  const onVis = () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend().catch(() => {});
    else if (enabled && gestureDone) ctx.resume().catch(() => {});
  };
  const onConv = (e) => duck(!!e.detail?.on);
  window.addEventListener('keydown', onKey);
  document.addEventListener('visibilitychange', onVis);
  window.addEventListener('talkabit:conversation', onConv);

  function dispose() {
    disposed = true; clearInterval(timer); cleanupGesture(); toast.dispose();
    window.removeEventListener('keydown', onKey); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('talkabit:conversation', onConv);
    ctx?.close().catch(() => {}); ctx = null;
  }
  return { start: api_start, toggle, duck, dispose, stats: () => ({ voices, state: ctx?.state ?? 'none', enabled, ducked, gain: userGain?.gain.value, duckGain: duckGain?.gain.value }) };
}

/**
 * game/talk/ui.js: the conversation overlay (HTML/CSS, ballpoint-on-paper style, no image files).
 *   createTalkUI() -> {
 *     showBubble(x, y, label) / hideBubble()            the "बात करो / Talk [E]" prompt over an NPC (screen px)
 *     showSpeech(x, y, line) / hideSpeech()             a short spoken greeting bubble
 *     openCard({ name, lang }) / closeCard()            the dialogue card
 *     setNpc(line, { react }) , setStep({ instruction, suggest, attempt, max }) , setHint(text, n) , setBusy(b)
 *     flashValid() , flashRetry(), showReward({ learned, outro }) , onSubmit(fn) , onEscape ...
 *     focusInput() / clearInput() / inputFocused() / toggleSuggest()
 *     phrasebook: toggleBook(entries) / bookOpen()
 *   }
 *   Lines are { text (Devanagari or English), roman, en }.
 */
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Kalam:wght@400;700&family=Tiro+Devanagari+Hindi&display=swap';
const INK = '#2b2a33';

const CSS = `
#talk-ui{position:fixed;inset:0;pointer-events:none;z-index:20;font-family:'Patrick Hand','Bradley Hand','Segoe Print','Comic Sans MS',cursive;color:${INK}}
#talk-ui *{box-sizing:border-box}
.t-paper{position:absolute;background:transparent}
.t-paper>svg.bd{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.t-paper>.in{position:relative}
.t-bubble{transform:translate(-50%,-100%);padding:7px 14px 8px;white-space:nowrap;font-size:20px;display:none;animation:t-bob 1.6s ease-in-out infinite}
.t-bubble .dv{font-family:'Tiro Devanagari Hindi','Kalam',serif;font-size:19px}
.t-bubble kbd{font-family:inherit;border:2px solid ${INK};border-radius:6px;padding:0 6px;background:#fff7dd;margin-left:2px}
@keyframes t-bob{0%,100%{margin-top:0}50%{margin-top:-4px}}
.t-speech{transform:translate(-50%,-100%);padding:8px 14px;display:none;max-width:260px;text-align:center}
.t-speech .dv{font-family:'Tiro Devanagari Hindi','Kalam',serif;font-size:21px;line-height:1.25}
.t-speech .ro{font-size:16px;opacity:.8}
.t-card{left:50%;bottom:22px;transform:translateX(-50%);width:min(780px,94vw);display:none;pointer-events:auto;padding:0}
.t-card .in{padding:20px 26px 14px}
.t-card.show{display:block;animation:t-up .28s ease-out}
@keyframes t-up{from{opacity:0;transform:translate(-50%,16px)}to{opacity:1;transform:translate(-50%,0)}}
.t-name{position:absolute;left:22px;top:-17px;padding:3px 16px 4px;font-size:21px;font-weight:700;background:#f6c9d6;border:2.5px solid ${INK};border-radius:6px 14px 8px 12px;transform:rotate(-2deg);box-shadow:2px 3px 0 rgba(43,42,51,.25)}
.t-name .dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:${INK};margin-left:8px;opacity:.15}
.t-card.speaking .t-name .dot{animation:t-talk .5s infinite alternate;opacity:.9}
@keyframes t-talk{from{transform:scale(.6)}to{transform:scale(1.25)}}
.t-npc{min-height:76px;padding:6px 0 8px}
.t-npc .dv{font-family:'Tiro Devanagari Hindi','Kalam',serif;font-size:28px;line-height:1.3}
.t-npc .ro{font-size:21px;margin-top:2px}
.t-npc .en{font-size:16px;opacity:.62;font-style:italic;margin-top:2px}
.t-npc.react .dv{color:#9a3b52}
.t-rule{height:0;border-top:2px dashed rgba(43,42,51,.35);margin:6px 0 10px}
.t-instr{font-size:20px;line-height:1.25}
.t-instr b{background:linear-gradient(transparent 55%,#ffe27a 55%)}
.t-sug{margin:8px 0 2px;padding:6px 12px;border:2px dashed rgba(43,42,51,.5);border-radius:10px;background:rgba(255,226,122,.35);position:relative}
.t-sug .ro{font-size:21px}
.t-sug .dv{font-family:'Tiro Devanagari Hindi','Kalam',serif;font-size:18px;opacity:.75}
.t-sug.hidden .ro,.t-sug.hidden .dv{display:none}
.t-sug .lab{font-size:14px;opacity:.6;text-transform:uppercase;letter-spacing:.08em}
.t-sug button{position:absolute;right:8px;top:6px}
.t-sug.hidden{padding:4px 12px}
.t-btn{font-family:inherit;font-size:15px;background:#fff7dd;border:2px solid ${INK};border-radius:8px;padding:1px 9px;cursor:pointer;color:${INK}}
.t-btn:hover{background:#ffe9a8}
.t-row{display:flex;align-items:center;gap:10px;margin-top:10px}
.t-input{flex:1;font-family:'Patrick Hand','Kalam',cursive;font-size:24px;color:${INK};border:none;outline:none;padding:5px 8px 3px;background:repeating-linear-gradient(transparent 0 30px,rgba(80,120,190,.55) 30px 32px),#fffdf3;border-bottom:3px solid ${INK};border-radius:4px 4px 0 0;box-shadow:inset 0 0 0 1px rgba(43,42,51,.1)}
.t-input:disabled{opacity:.55}
.t-input::placeholder{opacity:.45}
.t-go{font-size:20px;padding:3px 14px}
.t-tick{width:42px;height:34px;opacity:0}
.t-tick path{stroke-dasharray:60;stroke-dashoffset:60}
.t-card.ok .t-tick{opacity:1}
.t-card.ok .t-tick path{animation:t-draw .45s ease-out forwards}
@keyframes t-draw{to{stroke-dashoffset:0}}
.t-card.shake .t-input{animation:t-shake .3s}
@keyframes t-shake{20%{transform:translateX(-6px)}50%{transform:translateX(6px)}80%{transform:translateX(-3px)}}
.t-hint{min-height:26px;margin-top:8px;font-size:18px;color:#7a3a10}
.t-hint .lv{display:inline-block;margin-right:8px;color:${INK}}
.t-hint .pip{display:inline-block;width:11px;height:11px;border:2px solid ${INK};border-radius:50%;margin-right:3px;vertical-align:-1px}
.t-hint .pip.on{background:#e85d75}
.t-keys{margin-top:6px;font-size:14px;opacity:.55;display:flex;justify-content:space-between}
.t-reward{margin-top:8px;padding:10px 14px;border:2.5px solid ${INK};border-radius:12px;background:#d8f0c8;transform:rotate(-.6deg)}
.t-reward h4{margin:0 0 4px;font-size:20px}
.t-reward li{font-size:20px;margin:2px 0}
.t-reward li small{opacity:.65;font-size:16px}
.t-book{right:22px;top:22px;width:min(380px,92vw);max-height:70vh;overflow:auto;display:none;pointer-events:auto;transform:rotate(.6deg)}
.t-book.show{display:block}
.t-book .in{padding:16px 20px}
.t-book h3{margin:0 0 8px;font-size:26px}
.t-book .grp{margin:10px 0 2px;font-size:15px;text-transform:uppercase;letter-spacing:.08em;opacity:.6}
.t-book li{font-size:20px;list-style:none;margin:5px 0;padding-left:16px;position:relative}
.t-book li:before{content:'';position:absolute;left:0;top:11px;width:7px;height:7px;border-radius:50%;background:${INK}}
.t-book li small{display:block;opacity:.65;font-size:16px}
.t-book .empty{opacity:.6;font-size:18px}
.t-bubble .dots{margin-left:9px;white-space:nowrap}
.t-bubble .dots i{display:inline-block;width:8px;height:8px;border:2px solid ${INK};border-radius:50%;margin-right:2px;vertical-align:1px}
.t-bubble .dots i.on{background:#e85d75}
.t-bubble .star{display:block;font-size:14px;color:#b4341f;text-align:center;margin-bottom:-1px}
.t-guide{transform:translate(-50%,-100%);display:none;padding:7px 14px;font-size:20px;white-space:nowrap;animation:t-bob 1.6s ease-in-out infinite}
.t-guide kbd{font-family:inherit;border:2px solid ${INK};border-radius:6px;padding:0 6px;background:#fff7dd}
.t-guide svg.arr{position:absolute;left:50%;top:100%;width:46px;height:24px;margin-left:-23px;transform-origin:center;overflow:visible}
.t-hotkey{right:22px;bottom:18px;padding:3px 12px;font-size:17px;pointer-events:auto;cursor:pointer;display:block}
.t-hotkey.up{bottom:auto;top:18px}
`;

/** a hand-jittered closed outline around a w x h box */
function wobblyRect(w, h, seed, amp = 2.4, step = 34) {
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647) - 0.5;
  const pts = [];
  const edge = (x0, y0, x1, y1) => { const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) / step)); for (let i = 0; i < n; i++) { const t = i / n; pts.push([x0 + (x1 - x0) * t + rnd() * amp, y0 + (y1 - y0) * t + rnd() * amp]); } };
  edge(2, 2, w - 2, 2); edge(w - 2, 2, w - 2, h - 2); edge(w - 2, h - 2, 2, h - 2); edge(2, h - 2, 2, 2);
  const n = pts.length; let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]; d += ` C ${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`; }
  return d + ' Z';
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function createTalkUI() {
  if (!document.getElementById('talk-ui-fonts')) {
    const l = document.createElement('link'); l.id = 'talk-ui-fonts'; l.rel = 'stylesheet'; l.href = FONT_HREF; document.head.appendChild(l);
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  }
  const root = document.createElement('div'); root.id = 'talk-ui'; document.body.appendChild(root);
  const cbs = { submit: null, toggleBook: null };

  // every .t-paper gets a wobbly ink border + cream fill drawn in SVG, re-drawn when it resizes
  const papers = [];
  const ro = new ResizeObserver((entries) => { for (const e of entries) draw(e.target); });
  function paper(cls, html, seed) {
    const el = document.createElement('div'); el.className = 't-paper ' + cls;
    el.innerHTML = `<svg class="bd"></svg><div class="in">${html}</div>`;
    el._seed = seed; root.appendChild(el); papers.push(el); ro.observe(el); return el;
  }
  function draw(el) {
    const w = el.offsetWidth, h = el.offsetHeight; if (!w || !h) return;
    const d = wobblyRect(w, h, el._seed), d2 = wobblyRect(w, h, el._seed + 7, 1.6);
    el.firstChild.setAttribute('viewBox', `0 0 ${w} ${h}`);
    el.firstChild.innerHTML = `<path d="${d}" fill="#fbf3dc" stroke="none" style="filter:drop-shadow(3px 5px 0 rgba(43,42,51,.22))"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="${d2}" fill="none" stroke="${INK}" stroke-opacity=".45" stroke-width="1.3"/>`;
  }

  const bubble = paper('t-bubble', `<span class="dv">बात करो</span> / Talk <kbd>E</kbd>`, 3);
  const speech = paper('t-speech', `<div class="dv"></div><div class="ro"></div>`, 5);
  const card = paper('t-card', `
    <div class="t-name"><span class="nm"></span><span class="dot"></span></div>
    <div class="t-npc"><div class="dv"></div><div class="ro"></div><div class="en"></div></div>
    <div class="t-rule"></div>
    <div class="t-instr"></div>
    <div class="t-sug"><span class="lab">Try saying</span><button class="t-btn tog" type="button" title="Tab">hide</button><div class="ro"></div><div class="dv"></div></div>
    <div class="t-row"><input class="t-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type or dictate your reply, then press Enter" />
      <svg class="t-tick" viewBox="0 0 42 34"><path d="M4 18 C 10 22, 14 27, 17 30 C 22 18, 30 9, 39 3" fill="none" stroke="#2f9e44" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <button class="t-btn t-go" type="button">Enter ↵</button></div>
    <div class="t-hint"></div>
    <div class="t-reward-slot"></div>
    <div class="t-keys"><span>Enter = send &nbsp;·&nbsp; Tab = hide/show phrase &nbsp;·&nbsp; Esc = leave</span><span class="pb">Phrasebook [P]</span></div>`, 11);
  const guide = paper('t-guide', `<span class="txt"></span> <kbd>E</kbd><svg class="arr" viewBox="0 0 60 30"><path d="M4 15 C 18 12, 34 18, 52 15 M42 6 C 48 10, 52 13, 54 15 C 52 18, 47 22, 41 25" fill="none" stroke="#2b2a33" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`, 41);
  const book = paper('t-book', `<h3>Phrasebook</h3><div class="body"></div>`, 21);
  const hot = document.createElement('div'); hot.className = 't-paper t-hotkey'; hot.innerHTML = `<svg class="bd"></svg><div class="in">Phrasebook [P]</div>`; hot._seed = 31; root.appendChild(hot); papers.push(hot); ro.observe(hot);
  hot.addEventListener('click', () => cbs.toggleBook?.());

  const q = (sel, el = card) => el.querySelector(sel);
  const input = q('.t-input'), sug = q('.t-sug'), tog = q('.tog');
  let suggestShown = true, hasSuggest = false;

  function setLine(el, line, extraCls) {
    if (!line) { el.querySelector('.dv').textContent = ''; el.querySelector('.ro').textContent = ''; el.querySelector('.en').textContent = ''; return; }
    el.querySelector('.dv').textContent = line.text ?? '';
    el.querySelector('.ro').textContent = line.roman ?? '';
    el.querySelector('.en').textContent = line.en ?? '';
  }
  const position = (el, x, y) => { el.style.left = x + 'px'; el.style.top = y + 'px'; };
  const syncSuggest = () => { sug.classList.toggle('hidden', !suggestShown); tog.textContent = suggestShown ? 'hide' : 'show'; };
  tog.addEventListener('click', () => { api.toggleSuggest(); input.focus(); });
  q('.t-go').addEventListener('click', () => { cbs.submit?.(input.value); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); cbs.submit?.(input.value); }
    else if (e.key === 'Tab') { e.preventDefault(); api.toggleSuggest(); }
  });
  input.addEventListener('blur', () => { setTimeout(() => { if (card.classList.contains('show') && !input.disabled && (document.activeElement === document.body || !document.activeElement)) input.focus(); }, 0); });

  const api = {
    /** { difficulty?: 1..5, tutorial?: bool } adds the difficulty dots (and a "start here" star) to the prompt */
    showBubble(x, y, o = {}) {
      position(bubble, x, y);
      const key = (o.difficulty ?? 0) + '|' + (o.tutorial ? 1 : 0);
      if (bubble._key !== key) {
        bubble._key = key;
        const dots = o.difficulty ? `<span class="dots" title="difficulty ${o.difficulty}/5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= o.difficulty ? 'on' : ''}"></i>`).join('')}</span>` : '';
        bubble.querySelector('.in').innerHTML = `${o.tutorial ? '<span class="star">★ start here</span>' : ''}<span class="dv">बात करो</span> / Talk <kbd>E</kbd>${dots}`;
      }
      bubble.style.display = 'block'; draw(bubble);
    },
    showGuide({ text, x, y, angle }) {
      guide.style.display = 'block'; guide.style.left = x + 'px'; guide.style.top = y + 'px';
      guide.querySelector('.txt').textContent = text; guide.querySelector('svg.arr').style.transform = `rotate(${angle}deg)`; draw(guide);
    },
    hideGuide() { guide.style.display = 'none'; },
    hideBubble() { bubble.style.display = 'none'; },
    showSpeech(x, y, line) { speech.querySelector('.dv').textContent = line.text ?? ''; speech.querySelector('.ro').textContent = line.roman ?? ''; position(speech, x, y); speech.style.display = 'block'; draw(speech); },
    hideSpeech() { speech.style.display = 'none'; },
    openCard({ name }) { q('.nm').textContent = name; card.classList.add('show'); card.classList.remove('ok', 'shake', 'speaking'); q('.t-reward-slot').innerHTML = ''; hot.classList.add('up'); requestAnimationFrame(() => draw(card)); },
    closeCard() { card.classList.remove('show', 'ok', 'speaking'); input.blur(); input.value = ''; q('.t-reward-slot').innerHTML = ''; hot.classList.remove('up'); },
    cardOpen() { return card.classList.contains('show'); },
    setSpeaking(on) { card.classList.toggle('speaking', !!on); },
    setNpc(line, { react = false } = {}) { setLine(q('.t-npc'), line); q('.t-npc').classList.toggle('react', react); requestAnimationFrame(() => draw(card)); },
    setStep({ instruction, suggest }) {
      q('.t-instr').innerHTML = instruction ? `<b>Your turn:</b> ${esc(instruction)}` : '';
      hasSuggest = !!suggest; sug.style.display = hasSuggest ? '' : 'none';
      if (suggest) { q('.ro', sug).textContent = suggest.roman ?? ''; q('.dv', sug).textContent = suggest.text ?? ''; }
      card.classList.remove('ok'); api.setHint(null, 0, 3); input.value = ''; syncSuggest();
      requestAnimationFrame(() => draw(card));
    },
    /** hint text (or null) and how many of `max` tries were used */
    setHint(text, used = 0, max = 3) {
      const pips = Array.from({ length: max }, (_, i) => `<span class="pip${i < used ? ' on' : ''}"></span>`).join('');
      q('.t-hint').innerHTML = text ? `<span class="lv">${pips}</span>💡 ${esc(text)}` : (used ? `<span class="lv">${pips}</span>` : '');
      requestAnimationFrame(() => draw(card));
    },
    setBusy(b) { input.disabled = !!b; q('.t-go').disabled = !!b; if (!b) { input.focus(); input.select(); } },
    flashValid() { card.classList.add('ok'); },
    flashRetry() { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); },
    showReward({ learned = [], title = 'Learned' }) {
      q('.t-reward-slot').innerHTML = `<div class="t-reward"><h4>${esc(title)} ✎ saved to your phrasebook</h4><ul style="margin:0;padding:0">${learned.map((l) => `<li><b>${esc(l.roman)}</b> = ${esc(l.en)}${l.text ? ` <small>${esc(l.text)}</small>` : ''}</li>`).join('')}</ul></div>`;
      q('.t-instr').innerHTML = 'Press <b>Enter</b> or <b>E</b> to finish.'; sug.style.display = 'none'; q('.t-row').style.display = 'none';
      requestAnimationFrame(() => draw(card));
    },
    resetRow() { q('.t-row').style.display = ''; },
    onSubmit(fn) { cbs.submit = fn; },
    onToggleBook(fn) { cbs.toggleBook = fn; },
    focusInput() { input.focus(); },
    clearInput() { input.value = ''; },
    inputFocused() { return document.activeElement === input; },
    toggleSuggest() { suggestShown = !suggestShown; syncSuggest(); requestAnimationFrame(() => draw(card)); },
    bookOpen() { return book.classList.contains('show'); },
    toggleBook(entries, force) {
      const open = force ?? !book.classList.contains('show');
      book.classList.toggle('show', open);
      if (open) {
        const groups = new Map();
        for (const e of entries) { if (!groups.has(e.npc)) groups.set(e.npc, []); groups.get(e.npc).push(e); }
        book.querySelector('.body').innerHTML = entries.length ? [...groups].map(([n, es]) => `<div class="grp">${esc(n)}</div><ul style="margin:0;padding:0">${es.map((e) => `<li><b>${esc(e.roman)}</b><small>${esc(e.en)}${e.text ? ' · ' + esc(e.text) : ''}</small></li>`).join('')}</ul>`).join('') : `<div class="empty">Nothing yet. Finish a conversation to collect phrases.</div>`;
        requestAnimationFrame(() => draw(book));
      }
      return open;
    },
    dispose() { ro.disconnect(); root.remove(); },
  };
  return api;
}

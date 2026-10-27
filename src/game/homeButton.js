/**
 * game/homeButton.js: a small "Home" button (top-left) plus the H shortcut (press H twice within 2 s) that go back to the home page.
 *   mountHomeButton() -> unmount()
 * H is ignored while typing or while a conversation is open (talk.js owns H there, and tells us via 'talkabit:conversation' {detail:{on}}).
 */
const INK = '#2b2a33';
const CSS = `
#home-btn{position:fixed;left:18px;top:16px;z-index:21;display:inline-flex;align-items:center;gap:6px;padding:4px 14px 5px;font:22px 'Patrick Hand','Bradley Hand','Segoe Print','Comic Sans MS',cursive;color:${INK};text-decoration:none;background:#fff7dd;border:2.5px solid ${INK};border-radius:8px 14px 9px 13px;box-shadow:2px 3px 0 rgba(43,42,51,.25);transform:rotate(-1.5deg);transition:transform .15s,box-shadow .15s}
#home-btn:hover{transform:rotate(-1.5deg) translateY(-2px);box-shadow:3px 5px 0 rgba(43,42,51,.25)}
#home-btn:focus-visible{outline:3px solid #e0517a;outline-offset:3px}
#home-btn svg{width:18px;height:18px}
#home-toast{position:fixed;left:18px;top:64px;z-index:21;pointer-events:none;padding:4px 14px 5px;font:21px 'Patrick Hand','Bradley Hand','Segoe Print','Comic Sans MS',cursive;color:${INK};background:#f6c9d6;border:2.5px solid ${INK};border-radius:8px 14px 9px 13px;box-shadow:2px 3px 0 rgba(43,42,51,.25);opacity:0;transform:translateY(-6px);transition:opacity .2s,transform .2s}
#home-toast.on{opacity:1;transform:none}`;

export function mountHomeButton() {
  const style = document.createElement('style');
  style.textContent = CSS;
  const btn = document.createElement('a');
  btn.id = 'home-btn';
  btn.href = location.pathname;
  btn.title = 'Back to the home page (H twice)';
  btn.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10 10 3l7 7M5 8.5V17h10V8.5"/></svg>Home';
  const toast = document.createElement('div');
  toast.id = 'home-toast';
  toast.textContent = 'Press H again to go home';
  document.head.append(style);
  document.body.append(btn, toast);

  let inConv = false, armed = 0, timer = 0;
  const onConv = (e) => { inConv = !!e.detail?.on; if (inConv) disarm(); };
  const disarm = () => { armed = 0; clearTimeout(timer); toast.classList.remove('on'); };
  const onKey = (e) => {
    if (e.code !== 'KeyH' || e.repeat || e.ctrlKey || e.metaKey || e.altKey || inConv) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (armed && performance.now() - armed < 2000) { location.href = location.pathname; return; }
    armed = performance.now();
    toast.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(disarm, 2000);
  };
  window.addEventListener('talkabit:conversation', onConv);
  window.addEventListener('keydown', onKey);
  return () => {
    window.removeEventListener('talkabit:conversation', onConv);
    window.removeEventListener('keydown', onKey);
    clearTimeout(timer); style.remove(); btn.remove(); toast.remove();
  };
}

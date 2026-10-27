/**
 * home/home.js: the Talk-a-bit home page, shown when there is no (valid) ?world=. One card per world, each with an
 * inline-SVG landmark drawing (no image files), plus a warm call-to-action tag beneath. Cards are real links to ?world=<id>.
 *   mountHome()  builds the page into <body>, loads the Google fonts and sets the title.
 * To add a world: add an entry to WORLDS below (and to the registry in src/main.js).
 */
import './home.css';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Patrick+Hand&family=Kalam:wght@400;700&family=Tiro+Devanagari+Hindi&family=Baloo+Tamma+2:wght@400;600&family=Baloo+Thambi+2:wght@400;600&family=Baloo+Tammudu+2:wght@400;600&family=Baloo+Chettan+2:wght@400;600&display=swap';
const INK = '#2b2a33';

// ---- landmark drawings (viewBox 320x190; the card's CSS supplies the sky gradient behind them) ----
const S = (body) => `<svg viewBox="0 0 320 190" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${body}</svg>`;
const sun = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const cloud = (x, y) => `<path d="M${x} ${y}h44a9 9 0 0 0 0-18 14 14 0 0 0-26-4 10 10 0 0 0-18 8 7 7 0 0 0 0 14z" fill="#fff8e6" stroke-width="2"/>`;
const waves = (y, c) => `<path d="M0 ${y}q20-7 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0V190H0z" fill="${c}"/>`;

const ART = {
  mumbai: S(`${sun(262, 42, 18, '#ffd36b')}${cloud(30, 40)}
    <rect y="140" width="320" height="50" fill="#7cc4c9" stroke="none"/>${waves(142, '#5fb0b8')}
    <path d="M70 150V100h30v50zM220 150V100h30v50z" fill="#d9a35a"/>
    <rect x="100" y="72" width="120" height="78" fill="#e8b86b"/>
    <path d="M100 72h120" /><path d="M110 82h100" stroke-width="1.6"/>
    <path d="M134 150v-44a26 26 0 0 1 52 0v44z" fill="#4a3426"/>
    <path d="M142 150v-42a18 18 0 0 1 36 0v42" fill="none" stroke="#e8b86b" stroke-width="2"/>
    <path d="M128 72a32 28 0 0 1 64 0z" fill="#e8b86b"/><path d="M160 44v-12" /><circle cx="160" cy="30" r="3" fill="${INK}"/>
    <path d="M100 72v-22h16v22zM204 72v-22h16v22z" fill="#d9a35a"/>
    <path d="M100 50a8 8 0 0 1 16 0zM204 50a8 8 0 0 1 16 0z" fill="#e8b86b"/>
    <path d="M70 100a15 12 0 0 1 30 0zM220 100a15 12 0 0 1 30 0z" fill="#e8b86b"/>
    <path d="M30 168l14 10h34l12-10zM236 172l12 9h28l10-9z" fill="#c8513f"/><path d="M55 168v-18l14 14z" fill="#fff8e6" stroke-width="2"/>`),

  delhi: S(`${sun(54, 44, 17, '#ffd36b')}${cloud(200, 48)}
    <rect y="146" width="320" height="44" fill="#8fc07a" stroke="none"/>
    <path d="M110 190l30-44h40l30 44z" fill="#d8b98c" stroke-width="2"/>
    <rect x="102" y="46" width="116" height="102" fill="#d9916a"/>
    <path d="M96 46h128v-10H96zM100 148h120v-8H100z" fill="#c4764f"/>
    <path d="M136 148V96q0-30 24-30t24 30v52z" fill="#4a3426"/>
    <path d="M102 62h116M102 74h116" stroke-width="1.6"/>
    <g stroke-width="1.2" opacity=".7"><path d="M112 64h96M112 71h96"/></g>
    <path d="M142 36l8-10h20l8 10z" fill="#c4764f"/><path d="M150 26q10-9 20 0" fill="#e8b86b"/>
    <path d="M222 150v-30h-8v30zM98 150v-30h8v30z" stroke-width="2" fill="#c4764f"/>
    <path d="M20 150q30-10 50 0M250 150q30-10 50 0" fill="none" stroke="#5e9a4e" stroke-width="3"/>`),

  bengaluru: S(`${sun(268, 40, 17, '#ffe08a')}${cloud(24, 44)}
    <rect y="148" width="320" height="42" fill="#9ccb85" stroke="none"/>
    <path d="M60 190l24-42h152l24 42z" fill="#d9c9a8" stroke-width="2"/>
    <rect x="44" y="104" width="232" height="44" fill="#a8a09a"/>
    <rect x="116" y="82" width="88" height="22" fill="#b5ada6"/>
    <path d="M108 82h104L160 62z" fill="#c9c1ba"/>
    <rect x="140" y="44" width="40" height="22" fill="#b5ada6"/>
    <path d="M144 44a16 18 0 0 1 32 0z" fill="#c9c1ba"/><path d="M160 26v-12" /><path d="M160 14h14l-3 4 3 4h-14z" fill="#e0517a" stroke-width="1.8"/>
    <path d="M44 104h60M216 104h60" /><path d="M52 104a14 14 0 0 1 28 0zM240 104a14 14 0 0 1 28 0z" fill="#c9c1ba"/>
    <g stroke-width="2.2"><path d="M124 104v44M138 104v44M152 104v44M168 104v44M182 104v44M196 104v44"/></g>
    <g stroke-width="1.6" fill="#4a4a55"><path d="M62 118h14v14H62zM84 118h14v14H84zM222 118h14v14h-14zM244 118h14v14h-14z"/></g>
    <path d="M148 148v-18q0-8 12-8t12 8v18z" fill="#4a3426"/>`),

  chennai: (() => {
    const cols = ['#e0517a', '#f2b84b', '#4fa3a5', '#e0517a', '#f2b84b', '#4fa3a5', '#e0517a'];
    let t = '';
    for (let i = 0; i < 7; i++) {
      const w = 124 - i * 14, y = 150 - (i + 1) * 15.5, x = 160 - w / 2;
      t += `<path d="M${x} ${y + 15.5}l5-15.5h${w - 10}l5 15.5z" fill="${cols[i]}"/>`;
      for (let k = 1; k < 5; k++) t += `<path d="M${x + (w * k) / 5} ${y + 3}v9" stroke-width="1.6"/>`;
    }
    return S(`${sun(54, 42, 17, '#ffd36b')}${cloud(220, 44)}
    <rect y="150" width="320" height="40" fill="#e9cf9a" stroke="none"/>
    <path d="M30 150h260" stroke-width="2"/>
    <rect x="52" y="124" width="216" height="26" fill="#f4e3c2"/><path d="M52 132h216" stroke-width="1.6"/>
    ${t}
    <path d="M118 42q0-14 42-14t42 14z" fill="#e0517a" transform="translate(0 6)"/>
    <path d="M139 34v-10M160 32v-14M181 34v-10" /><circle cx="139" cy="22" r="3" fill="#f2b84b" stroke-width="1.8"/><circle cx="160" cy="16" r="3.5" fill="#f2b84b" stroke-width="1.8"/><circle cx="181" cy="22" r="3" fill="#f2b84b" stroke-width="1.8"/>
    <path d="M146 150v-20q0-9 14-9t14 9v20z" fill="#4a3426"/>`);
  })(),

  hyderabad: S(`${sun(262, 44, 17, '#ffd36b')}${cloud(26, 50)}
    <rect y="150" width="320" height="40" fill="#e3c394" stroke="none"/>
    <rect x="96" y="92" width="128" height="58" fill="#f1dcc0"/>
    <path d="M96 92h128" /><path d="M96 100h128" stroke-width="1.6"/>
    <path d="M118 150v-26q0-12 12-12t12 12v26zM178 150v-26q0-12 12-12t12 12v26z" fill="#4a3426"/>
    <path d="M142 150v-34q0-18 18-18t18 18v34z" fill="#4a3426"/>
    <rect x="108" y="66" width="104" height="26" fill="#f1dcc0"/>
    <path d="M118 92V80q0-7 7-7t7 7v12zM140 92V80q0-7 7-7t7 7v12zM166 92V80q0-7 7-7t7 7v12zM188 92V80q0-7 7-7t7 7v12z" fill="#7a5a44" stroke-width="1.8"/>
    <path d="M122 66a10 10 0 0 1 20 0zM150 66a10 10 0 0 1 20 0zM178 66a10 10 0 0 1 20 0z" fill="#e8b86b"/>
    <g fill="#f1dcc0"><rect x="82" y="46" width="14" height="104"/><rect x="224" y="46" width="14" height="104"/></g>
    <g fill="#e8b86b"><rect x="78" y="82" width="22" height="6"/><rect x="220" y="82" width="22" height="6"/><rect x="78" y="46" width="22" height="6"/><rect x="220" y="46" width="22" height="6"/></g>
    <path d="M82 46a7 11 0 0 1 14 0zM224 46a7 11 0 0 1 14 0z" fill="#e0517a"/><path d="M89 35v-9M231 35v-9" />
    <path d="M86 118h6M86 100h6M228 118h6M228 100h6" stroke-width="1.6"/>
    <path d="M20 150q16-12 34 0M266 150q16-12 34 0" fill="none" stroke-width="2"/>`),

  kerala: (() => {
    const net = (x, s) => `<g transform="translate(${x} 0) scale(${s})" transform-origin="0 0">
      <path d="M-20 152L8 52M40 152L8 52" stroke-width="3.2" fill="none"/>
      <path d="M-84 112L8 52" stroke-width="4" fill="none"/>
      <path d="M-84 112L-104 124M-84 112L-56 126M-84 112L-96 134M-84 112L-68 136" stroke-width="1.6" fill="none"/>
      <path d="M-108 124h56l12 14h-56z" fill="#e8d8b0" fill-opacity=".7" stroke-width="2.2"/>
      <path d="M-94 124l12 14M-80 124l12 14M-66 124l12 14M-102 131h56" stroke-width="1.1" fill="none"/>
      <path d="M8 52L40 120" stroke-width="1.8" fill="none"/><circle cx="40" cy="124" r="5" fill="#8a8a92" stroke-width="2"/>
    </g>`;
    return S(`<circle cx="214" cy="104" r="46" fill="#ffb25b" stroke="none"/><path d="M0 120h320" stroke-width="1.6" stroke="#b97a4a"/>
    <path d="M0 120V190H320V120z" fill="#4fa9a5" stroke="none"/>${waves(124, '#3d9390')}
    <path d="M0 160q20-6 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0" fill="none" stroke="#2f7c7a" stroke-width="2"/>
    ${net(150, 1)}${net(278, 0.8)}
    <path d="M286 126q10-10 20-4" fill="none" stroke-width="1.8"/><path d="M24 54q6-6 12 0M44 44q6-6 12 0" fill="none" stroke-width="1.8"/>`);
  })(),

  'dozy-hollow': S(`<path d="M0 118q50-62 120-20t110-10q40-14 90 20V190H0z" fill="#b5dfc4"/>
    <path d="M0 150q70-52 150-8t170-24V190H0z" fill="#c9e8b8"/>
    <path d="M0 172q90-24 170-6t150-14V190H0z" fill="#e5f0b8" stroke="none"/>
    <path d="M32 108q4-16 24-16t26 18v20H32z" fill="#cdbfe6" transform="translate(236 30)"/>
    <path d="M30 168q0-18 20-18t20 18z" fill="#c8c0d8"/><path d="M42 160q4 3 8 0M54 160q4 3 8 0" fill="none" stroke-width="1.8"/><path d="M64 142l8 0-8 8h8M76 134h6l-6 7h6" fill="none" stroke-width="1.5"/>
    <path d="M232 170q-2-22 24-22t24 22z" fill="#d2c8e0"/><path d="M247 160q4 3 8 0M260 160q4 3 8 0" fill="none" stroke-width="1.8"/>
    <ellipse cx="148" cy="136" rx="40" ry="35" fill="#f6b9c8"/>
    <path d="M148 101q-2-14 12-18 4 12-12 18z" fill="#8cc474" stroke-width="2.2"/>
    <circle cx="134" cy="132" r="5.5" fill="${INK}"/><circle cx="162" cy="132" r="5.5" fill="${INK}"/>
    <circle cx="136" cy="130" r="1.8" fill="#fff" stroke="none"/><circle cx="164" cy="130" r="1.8" fill="#fff" stroke="none"/>
    <ellipse cx="124" cy="144" rx="7" ry="4" fill="#ee7f9b" stroke="none"/><ellipse cx="172" cy="144" rx="7" ry="4" fill="#ee7f9b" stroke="none"/>
    <path d="M142 146q6 5 12 0" fill="none" stroke-width="2"/>
    ${sun(268, 42, 16, '#ffe08a')}${cloud(24, 48)}${cloud(150, 36)}`),
};

// ---- worlds: order = card order. `sky` / `accent` colour each card. ----
const WORLDS = [
  { id: 'mumbai', title: 'Aamchi Mumbai', city: 'Mumbai', script: 'मुंबई', scriptCls: 'dv', lang: 'Hindi', hero: 'Chotu, the chaiwala kid', sky: ['#bfe3ee', '#f6e9c8'], accent: '#e0713f', tag: 'Learn Bambaiya Hindi with Chotu', hi: 'Kya bolta?' },
  { id: 'delhi', title: 'Apni Dilli', city: 'Delhi NCR', script: 'दिल्ली', scriptCls: 'dv', lang: 'Delhi Hindi', hero: 'Rahul, a UPSC aspirant', sky: ['#f9d9b6', '#f7ecd0'], accent: '#c4553b', tag: 'Wander Dilli with Rahul, learn Delhi Hindi', hi: 'Aur bhai!' },
  { id: 'bengaluru', title: 'Namma Bengaluru', city: 'Bengaluru', script: 'ಬೆಂಗಳೂರು', scriptCls: 'kn', lang: 'Kannada', hero: 'Rohan, a tech intern', sky: ['#cfe6f2', '#eaf1d8'], accent: '#3f8f6b', tag: 'Say Namaskara to Namma Bengaluru with Rohan, pick up Kannada', hi: 'Namaskara!' },
  { id: 'chennai', title: 'Namma Chennai', city: 'Chennai', script: 'சென்னை', scriptCls: 'ta', lang: 'Tamil', hero: 'Meera, a food blogger', sky: ['#fbe0a8', '#f6ead0'], accent: '#d1447a', tag: 'Eat your way through Chennai with Meera, pick up Tamil', hi: 'Vanakkam!' },
  { id: 'hyderabad', title: 'Mana Hyderabad', city: 'Hyderabad', script: 'హైదరాబాద్', scriptCls: 'te', lang: 'Telugu', hero: 'Sameer, a college grad', sky: ['#f4d6d6', '#f6ecd2'], accent: '#a8553e', tag: 'Haggle in Laad Bazaar with Sameer, pick up Telugu', hi: 'Bagunnara?' },
  { id: 'kerala', title: 'Nammude Kochi', city: 'Kochi, Kerala', script: 'കൊച്ചി', scriptCls: 'ml', lang: 'Malayalam', hero: 'Ananya, a backpacker', sky: ['#ffd9a8', '#f6e6c8'], accent: '#2f8f8a', tag: 'Explore Kochi with Ananya, pick up Malayalam', hi: 'Namaskaram!' },
  { id: 'dozy-hollow', title: 'Dozy Hollow', city: 'The practice meadow', script: '', scriptCls: '', lang: 'Hindi basics', hero: 'the pink blob', sky: ['#dff0f4', '#f3f0d4'], accent: '#c77a9a', tag: 'Start gently in Dozy Hollow with the pink blob', hi: 'Namaste!', soft: true },
];

const card = (w) => `
<li class="slot${w.soft ? ' soft' : ''}" style="--accent:${w.accent};--sky-a:${w.sky[0]};--sky-b:${w.sky[1]}">
  <a class="card" href="?world=${w.id}" aria-label="${w.title}: ${w.lang} with ${w.hero}">
    <div class="art">${ART[w.id]}<span class="chip">${w.lang}</span></div>
    <div class="body">
      <h2>${w.title}</h2>
      <p class="city"><span>${w.city}</span>${w.script ? `<b class="script ${w.scriptCls}" lang="und">${w.script}</b>` : ''}</p>
      <p class="hero"><i></i>Your guide: ${w.hero}</p>
    </div>
  </a>
  <a class="tag" href="?world=${w.id}"><em>${w.hi}</em> ${w.tag} <span aria-hidden="true">&rarr;</span></a>
</li>`;

export function mountHome() {
  document.documentElement.classList.add('home');
  document.title = 'Talk-a-bit';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.append(link);
  document.body.innerHTML = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter></svg>
  <main class="home-page">
    <header class="hero-head">
      <p class="kicker">a small game for shy talkers</p>
      <h1>Talk<span>-a-</span>bit</h1>
      <p class="tagline">Practise the language of the street, one small talk at a time.</p>
      <p class="sub">Wander a tiny city, find someone friendly, and say a few words. No pressure, no one is watching.</p>
      <svg class="squig" viewBox="0 0 260 14" aria-hidden="true"><path d="M3 8q16-10 32 0t32 0 32 0 32 0 32 0 32 0 32 0 22-3" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/></svg>
    </header>
    <h2 class="pick">Pick a city to wander</h2>
    <ul class="cards">${WORLDS.map(card).join('')}</ul>
    <footer>Made with ink, paper and a lot of chai. <span>Tip: press <kbd>H</kbd> twice inside a city to come back here.</span></footer>
  </main>`;
}

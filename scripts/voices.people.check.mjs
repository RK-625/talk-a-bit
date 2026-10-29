#!/usr/bin/env node
/**
 * scripts/voices.people.check.mjs: gender (f|m) and age (kid|teen|adult|elder) for every talkable NPC, from independent evidence.
 *   node scripts/voices.people.check.mjs            report: every NPC whose evidence conflicts or is missing (exit 1 if any is unresolved)
 *   node scripts/voices.people.check.mjs --write    regenerate scripts/voices.people.json (auto-derived, then scripts/voices.people.manual.json wins)
 *   node scripts/voices.people.check.mjs --all      also print the NPCs the sources agree on
 * Evidence (in order): A = the cast doc row of that world (docs/*CAST.md: role + look + doing), B = the dialogue's name / role / persona,
 * C = the placement kind in the world's source (kid / teen / man / woman / elder) where an explicit id is placed.
 * A manual entry in voices.people.manual.json ("world/npcId": { g, age, why }) settles a conflict after reading the NPC; keep `why` short.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'scripts/voices.people.json'), MANUAL = path.join(ROOT, 'scripts/voices.people.manual.json');
const DOCS = { mumbai: 'CAST.md', bengaluru: 'BENGALURU_CAST.md', chennai: 'CHENNAI_CAST.md', delhi: 'DELHI_CAST.md', hyderabad: 'HYDERABAD_CAST.md', kerala: 'KERALA_CAST.md' };
const argv = process.argv.slice(2);

// ---------- word lists ----------
const FW = 'woman|women|lady|ladies|girl|girls|mother|mom|wife|sister|grandmother|grandma|granny|aunty|auntie|aunt|mausi|tai|didi|akka|chechi|chitti|paati|patti|ajji|aaji|maaji|nani|dadi|amma|bhabhi|maami|mami|madam|nun|fisherwoman|she|her|hers|herself|saree|sari|blouse|bindi|bangles|lashes|plait|braid|pigtails|dupatta|salwar|churidar|frock|skirt|lehenga|jasmine|gajra|mangalsutra|mother-in-law|daughter|sakhi|bai|beti|ammamma|ammama|ammayi|ammai|ammu|chechy|thaayi|athai|akkaiya';
const MW = 'man|men|boy|boys|father|dad|husband|brother|uncle|sir|dada|bhai|bhaiya|anna|annaya|chacha|kaka|chettan|chetta|mama|thatha|ajja|sahab|saheb|saab|mr|guy|gentleman|bhau|appa|aiya|saar|babu|baba|panditji|fisherman|he|him|his|himself|moustache|mustache|beard|lungi|mundu|dhoti|pagdi|turban|son|ayya|thambi|thatha|appachan|ammachan|appooppan|moopar|bhaiyya|anaa|annan|machan|maama|mama';
const F_RE = new RegExp(`\\b(${FW})\\b`, 'gi'), M_RE = new RegExp(`\\b(${MW})\\b`, 'gi');
const FW_STRONG = /\b(woman|women|lady|girl|girls|aunty|auntie|didi|akka|chechi|paati|ajji|aaji|amma|bhabhi|maami|nun|fisherwoman|grandmother|grandma|granny|mother|mom|wife|sister|madam|she)\b/i;
const MW_STRONG = /\b(man|men|boy|boys|uncle|bhai|bhaiya|anna|chettan|chacha|thatha|ajja|guy|gentleman|father|dad|husband|brother|sir|he|fisherman|appa)\b/i;
const KID_RE = /\b(kid|kids|child|children|schoolgirl|schoolboy|school girl|school boy|little boy|little girl|toddler|tiny|boy|girl)\b/i;
const NOT_KID_RE = /\b(delivery|college|bell|office|old|paper|flower|tea|chai|errand|cow|barista|cabin|sales|shop)\s+(boy|girl)s?\b|\bcollege girl|\bboy\s*friend|\bgirl\s*friend|(young|fisher|working)\s+(girl|boy)\b/gi;
const TEEN_RE = /\b(teen|teenager|teenage|college|student|youth|undergrad|school uniform|intern)\b/i;
const OLD_RE = /\b(old|elderly|elder|grandmother|grandfather|grandpa|grandma|granny|retired|veteran|white hair|white-haired|silver hair|silver-haired|aaji|paati|patti|ajji|thatha|ajja|maaji|dadi|nani|ammamma|ammachan|appooppan|senior citizen|septuagenarian|80s|70s|60s)\b/i;
const NOT_OLD = /\b(old (city|town|quarter|fort|delhi|bridge|building|haveli|school)|golden|old-school)\b/gi;

const ageOf = (t) => {
  t = t.replace(NOT_OLD, ' ');
  if (OLD_RE.test(t)) return 'elder';
  const tt = t.replace(NOT_KID_RE, ' ');
  if (/\b(kid|child|schoolgirl|schoolboy|little boy|little girl|toddler)\b/i.test(tt) || /\((boy|girl)\)/i.test(tt) || /\b(boy|girl)\b/i.test(tt)) return 'kid';
  if (TEEN_RE.test(t)) return 'teen';
  return null; // adult / unknown
};

// first names that settle gender when no word does (checked against the cast docs; ambiguous names are resolved by hand in voices.people.manual.json)
const FN = 'divya sandhya sunitha sunita preethi sirisha mounika madhavi swapna anita sujatha neha pooja isha anu aditi aditi meera ishita harini sana aanya sneha muskaan simran ammu chinni lena mary sarla shanti selvi bhargavi gulabo kamla emma linda sophie lucy ingrid hannah anna sarah julia mia kate sumitra vijaya padma bhagya thangam kalyani janaki saraswathi rajeshwari vasantha saroja sumathi padmini sridevi sunanda prabha radha lalitha suma nisha rekha meena tanya tanu anjali ritika nandhini gayathri reshma spoorthi zoya jaya kavitha priya kavya shreya shruti ritu roopa deepa deepika lakshmi laxmi parvati gauri sita geeta gita rani sushma usha asha kiran_f amrita pallavi aishwarya ananya riya diya sakshi shweta swati sonia sonali payal komal kajal jyoti jyothi mamta mamata ruchi rashmi renu rupa savita seema shalini sharmila shobha sunaina vandana varsha veena vidya yamini zara fatima ayesha shabana nazia rukhsana salma noor sameera tabassum aarti arti bindu chitra devika dhanya remya sreeja sreelakshmi athira amala archana anagha shilpa shanthi sowmya soumya sudha sumi sunaina swetha tara uma vimala yashoda sukanya jayanthi jayanti kamakshi kokila malathi meenakshi nirmala pushpa revathi ramya renuka rohini shakuntala sharada subbulakshmi tulasi vanitha vasundhara vijayalakshmi vinutha bhavani bhavana charitha chandrika girija indira gopika kausalya manjula mythili radhika rajani rukmini sangeetha sridevi susheela sandya chaitra sushila lilly mercy rosy molly annamma kunjamma thresiamma saramma aleyamma ponnamma tressa sherin sheeja sheela sini smitha suja binu_f anju lekha'.split(' ');
const MN = 'rahul rohan rohit rohit amit sumit ajay vijay sanjay sanjeev sandeep sandip dev deven aditya arjun karthik kartik kartikeya rishi rishad ashiq abhijith jerin vyshak gokul ashwin anand anil akash akash yash tarun armaan ishaan nikhil kabir kiran_m manoj pranav chandan chetan naveen suresh ramesh mahesh dinesh rajesh ganesh mukesh lokesh pankaj vikram vinay vikas varun tom frank lucas daniel oliver peter jake ben mark john david james michael robert william thomas chris paul matthew mathew george josh jibin tejas tanmay chintu bunty pintu pappu mintu dabbu golu bittu rinku appu chikku gopi teja prasad prakash sridhar haribabu chaitanya surya dhanush yuvan aadhi adithya sanjay shankar venkatesh manjunath raju ravi krishna hari bahadur dilip zubair irfan imran salim rafiq aamir shahid farhan sameer javed kunal manish nitin pradeep prem rakesh ravindra sachin satish shyam sunil sunny tushar uday umesh vishal vivek vinod abhishek aniket ankit ankur gaurav harsh jatin kamal lalit mohit naresh neeraj piyush pramod rohan sagar saurabh siddharth sourav tanmay vipin vishnu kuttan mohan murali babu biju binu jose joseph thomas shaji saji sabu santhosh sajan unni vishnu arun anoop abhilash akhil amal ajith ajmal basheer hamza muhammad nazar noufal rasheed riyas shafi shihab sudheer suhail vineeth varghese kurian paulose antony stephen xavier francis mani gokul vijayakumar raghu ranga raghavan murugan karthikeyan senthil selvam saravanan kumar velu pandian arumugam govindan balu bala babu'.split(' ');
const FNSET = new Set(FN), MNSET = new Set(MN);
const nameG = (name) => { const parts = String(name ?? '').toLowerCase().replace(/\(.*?\)/g, ' ').split(/[^a-z]+/).filter(Boolean); const g = new Set(); for (const p of parts.slice(0, 1)) { if (FNSET.has(p)) g.add('f'); if (MNSET.has(p)) g.add('m'); } return g.size === 1 ? [...g][0] : null; };
const genderOf = (t) => {
  const f = (t.match(F_RE) || []).length, m = (t.match(M_RE) || []).length;
  return { f, m, g: f > m ? 'f' : m > f ? 'm' : null };
};

// ---------- gather ----------
const docRows = {};
for (const [w, f] of Object.entries(DOCS)) {
  docRows[w] = {};
  for (const line of fs.readFileSync(path.join(ROOT, 'docs', f), 'utf8').split('\n')) {
    if (!line.startsWith('| ')) continue;
    const c = line.split('|').map((s) => s.trim());
    const id = c[1].replace(/`/g, '');
    if (!id || id === 'id' || /^-+$/.test(id)) continue;
    docRows[w][id] = { role: c[2] ?? '', look: c[4] ?? '', doing: c[5] ?? '' };
  }
}
const kindOf = {};
for (const w of Object.keys(DOCS)) {
  kindOf[w] = {};
  const dir = path.join(ROOT, 'src/worlds', w);
  for (const f of fs.readdirSync(dir)) {
    if (!/^(population|details|npcs)/.test(f)) continue;
    for (const line of fs.readFileSync(path.join(dir, f), 'utf8').split('\n')) {
      const k = line.match(/kind:\s*'(kid|teen|man|woman|elder)'/), i = line.match(/\bid:\s*'([^']+)'/);
      if (k && i) kindOf[w][i[1]] = k[1];
    }
  }
}
const manual = fs.existsSync(MANUAL) ? JSON.parse(fs.readFileSync(MANUAL, 'utf8')) : {};

const rows = [];
for (const w of Object.keys(DOCS)) {
  const mod = await import(pathToFileURL(path.join(ROOT, 'src/worlds', w, 'dialogue/index.js')).href);
  for (const [key, d] of Object.entries(mod.default)) {
    const id = d.id ?? key, k = `${w}/${id}`, doc = docRows[w][id] ?? docRows[w][key];
    // A: cast doc
    const aText = doc ? `${doc.role} ${doc.look}` : '';
    const aG = genderOf(aText);
    const aStrongF = FW_STRONG.test(aText), aStrongM = MW_STRONG.test(aText);
    const A = doc ? { g: aG.g, age: ageOf(aText) } : null;
    // B: dialogue name / role / persona (subject pronouns he / she only count when they are the first sentence's; the hero is also he / she)
    const first = String(d.persona ?? '').split(/(?<=\.)\s/)[0].replace(/\b(she|her|hers|he|him|his)\b/gi, ' ');
    const bText = `${String(d.name ?? '').replace(/([a-z])([A-Z])/g, '$1 $2')} ${d.role ?? ''} ${key.replace(/[-_]/g, ' ')} ${first}`;
    const bG0 = genderOf(`${d.role ?? ''} ${key.replace(/[-_]/g, ' ')} ${String(d.name ?? '').replace(/([a-z])([A-Z])/g, '$1 $2')}`); const nm = nameG(d.name); const bG = { g: bG0.g ?? nm };
    const roleAge = ageOf(`${d.role ?? ''} ${key.replace(/[-_]/g, ' ')}`); // kid / teen words in a persona often describe the hero (a child), so only old-age words are taken from it
    const B = { g: bG.g, age: roleAge ?? (OLD_RE.test(first.replace(NOT_OLD, ' ')) ? 'elder' : null) };
    // C: placement kind
    const kind = kindOf[w][id];
    const C = kind ? { g: kind === 'man' ? 'm' : kind === 'woman' ? 'f' : null, age: { kid: 'kid', teen: 'teen', elder: 'elder', man: null, woman: null }[kind] } : null;
    rows.push({ k, w, id, name: d.name, role: d.role, lang: d.lang, A, B, C, aText, doc, persona: d.persona, pitch: d.voice?.pitch, aStrongF, aStrongM, bG, aG });
  }
}

// ---------- resolve ----------
const people = {}, issues = [];
for (const r of rows) {
  const gs = [r.A?.g, r.B.g, r.C?.g].filter(Boolean);
  const ages = [r.A?.age, r.B.age, r.C?.age].filter(Boolean);
  let g = null, age = null, why = null;
  if (gs.length && new Set(gs).size === 1) g = gs[0];
  else if (gs.length) why = `gender conflict A=${r.A?.g ?? '-'} B=${r.B.g ?? '-'} C=${r.C?.g ?? '-'}`;
  else why = 'gender: no evidence';
  const uniq = [...new Set(ages)];
  if (uniq.length === 0) age = 'adult';
  else if (uniq.length === 1) age = uniq[0];
  else { const w2 = uniq.join('/'); why = (why ? why + '; ' : '') + `age conflict ${w2}`; }
  const m = manual[r.k];
  if (m) { g = m.g ?? g; age = m.age ?? age; why = null; }
  if (why || !g || !age) issues.push({ r, why: why ?? 'incomplete', g, age });
  else people[r.k] = { g, age };
  if (m) people[r.k] = { g, age };
  r.final = { g, age };
}

// same id across worlds should normally match: show disagreements as information for review (kids/teens especially)
if (argv.includes('--all')) for (const r of rows) if (r.final.g) console.log(`${r.k.padEnd(46)} ${r.final.g}/${r.final.age.padEnd(6)} A=${r.A?.g ?? '-'}/${r.A?.age ?? '-'} B=${r.B.g ?? '-'}/${r.B.age ?? '-'} ${(r.name ?? '').slice(0, 20)} | ${r.role}`);

console.log(`${rows.length} NPCs; resolved ${Object.keys(people).length}; need a look: ${issues.length}`);
for (const { r, why } of issues) {
  console.log(`\n${r.k}  [${r.lang}]  name=${r.name}  role=${r.role}\n   ${why}\n   doc : ${(r.doc ? `${r.doc.role} | ${r.doc.look}`.slice(0, 200) : '(no doc row)')}\n   pers: ${(r.persona ?? '').slice(0, 220)}\n   kind: ${kindOf[r.w][r.id] ?? '-'}  pitch=${r.pitch}`);
}
if (argv.includes('--write') && !issues.length) {
  const sorted = Object.fromEntries(Object.entries(people).sort(([a], [b]) => (a < b ? -1 : 1)));
  fs.writeFileSync(OUT, JSON.stringify(sorted, null, 0).replace(/},"/g, '},\n"') + '\n');
  const cnt = {}; for (const p of Object.values(sorted)) cnt[`${p.g}/${p.age}`] = (cnt[`${p.g}/${p.age}`] ?? 0) + 1;
  console.log('\nwrote scripts/voices.people.json', cnt);
}
process.exit(issues.length ? 1 : 0);

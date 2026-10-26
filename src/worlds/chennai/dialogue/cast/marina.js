// Marina Beach: the promenade, the benches, the sea wall, the sundal baskets and the kattumarams.
import { dialogue as D, step as S } from '../kit.js';

export const student = D('marine-walk-student', {
  name: 'Arjun', role: 'college student', site: 'Marina Beach promenade', diff: 2,
  voice: { rate: 1.1, pitch: 1.05 },
  persona: 'Student in a sand T-shirt strolling with earphones in, glancing at his phone.',
  goal: 'Recommend sundal to him.',
  steps: [
    S('food', ['அக்கா, கடல் பக்கத்துல நல்ல ஃபுட் எங்க கிடைக்கும்?', 'Akka, kadal pakkatthula nalla food enga kidaikkum?', 'Akka, where can I get good food near the sea?'],
      'Recommend sundal.', ['Sundal saappidunga thambi, super-aa irukkum.', 'சுண்டல் சாப்பிடுங்க தம்பி, சூப்பரா இருக்கும்.'],
      ['sundal saappidunga thambi super-aa irukkum', 'sundal saappidunga thambi', 'sundal nalla irukkum thambi', 'beach-la sundal saappidu', 'sundal try pannunga thambi', 'சுண்டல் சாப்பிடுங்க தம்பி சூப்பரா இருக்கும்', 'சுண்டல் சாப்பிடுங்க தம்பி'],
      'recommend_sundal', ['Suggest a local snack.', '"Sundal" = boiled chickpea snack.', 'Say: "Sundal saappidunga thambi, super-aa irukkum."'],
      ['சூப்பர் ஐடியா! இப்பவே வாங்கறேன்.', 'Super idea! Ippave vaangaren.', 'Great idea! I will buy some right now.'],
      ['என்ன சாப்பிடலாம்னு சொல்லுங்க அக்கா.', 'Enna saappidalaamnu sollunga akka.', 'Tell me what to eat, akka.']),
  ],
  outro: ['நன்றி அக்கா! உங்க ப்ளாக் பேரு என்ன?', 'Nandri akka! Unga blog peru enna?', 'Thanks, akka! What is your blog called?'],
  learned: [['sundal saappidunga', 'eat some sundal']],
  again: ['அக்கா, இன்னும் ஏதாவது ஸ்பெஷல்?', 'Akka, innum edhaavadhu special?', 'Akka, anything else special?'],
});

export const benchMan = D('marine-bench-man', {
  name: 'Gnanasekaran', role: 'man on a beach bench', site: 'Marina Beach, promenade bench', diff: 2,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Thin man in specs seated with a folded newspaper, watching the waves and the kattumarams.',
  goal: 'Praise the kattumarams and react to how early the boats go out.',
  steps: [
    S('boats', ['கடல பாத்துட்டு இருக்கேன். கட்டுமரம் பாருங்க.', 'Kadala paatthuttu irukken. Kattumaram paarunga.', 'I am watching the sea. Look at the kattumarams.'],
      'Say the kattumarams are beautiful.', ['Kattumaram romba azhagaa irukku.', 'கட்டுமரம் ரொம்ப அழகா இருக்கு.'],
      ['kattumaram romba azhagaa irukku', 'kattumaram azhagaa irukku', 'kattumaram super saar', 'romba azhagaa irukku kattumaram', 'kattumaram nalla irukku saar', 'கட்டுமரம் ரொம்ப அழகா இருக்கு', 'கட்டுமரம் அழகா இருக்கு'],
      'praise_kattumaram', ['Say something nice.', '"Kattumaram" = traditional fishing raft.', 'Say: "Kattumaram romba azhagaa irukku."'],
      ['ஆமா, பழைய காலத்து படகு. இன்னும் உறுதியா இருக்கு.', 'Aamaa, pazhaiya kaalatthu padagu. Innum urudhiyaa irukku.', 'Yes, an old-style boat. Still sturdy.'],
      ['எதை பாத்தீங்கன்னு சொல்லுங்க.', 'Edhai paatheenganu sollunga.', 'Tell me what you saw.']),
    S('early', ['காலைல நாலு மணிக்கே படகு போகும். தெரியுமா?', 'Kaalaila naalu manikke padagu pogum. Theriyumaa?', 'The boats go out at four in the morning. Did you know?'],
      'Say no, that is very early.', ['Illa saar, romba seekkiram!', 'இல்ல சார், ரொம்ப சீக்கிரம்!'],
      ['illa saar romba seekkiram', 'romba seekkiram saar', 'theriyaadhu saar romba seekkiram', 'naalu manikkaa romba seekkiram', 'appadiyaa romba seekkiram', 'இல்ல சார் ரொம்ப சீக்கிரம்', 'ரொம்ப சீக்கிரம் சார்'],
      'react_boats_go_early', ['React with surprise.', '"Seekkiram" = early, quick.', 'Say: "Illa saar, romba seekkiram!"'],
      ['மீனவர்கள் வாழ்க்கை கடினம் தான் மேடம்.', 'Meenavargal vaazhkkai kadinam thaan madam.', 'The life of fishermen is hard, madam.'],
      ['முன்னாடியே தெரியுமா மேடம்?', 'Munnaadiye theriyumaa madam?', 'Did you already know, madam?']),
  ],
  outro: ['காலைல வந்து பாருங்க மீரா, கடல் அழகு!', 'Kaalaila vandhu paarunga Meera, kadal azhagu!', 'Come in the morning, Meera, the sea is lovely!'],
  learned: [['kattumaram romba azhagaa irukku', 'the kattumaram is beautiful'], ['romba seekkiram', 'very early']],
  again: ['மேடம், இன்னும் கடல பாக்கலாமா?', 'Madam, innum kadala paakkalaamaa?', 'Madam, shall we watch the sea more?'],
});

export const seaWallCouple = D('marine-couple', {
  name: 'Kiran and Anu', role: 'seated couple', site: 'Marina Beach, sea wall', diff: 1,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Young couple sitting close on the sea wall sharing a phone; she nibbles sundal from a cone.',
  goal: 'Accept a handful of sundal.',
  steps: [
    S('share', ['சுண்டல் சாப்பிடுறீங்களா மேடம்? எடுத்துக்கோங்க.', 'Sundal saappidureengalaa madam? Eduthukkonga.', 'Will you eat some sundal, madam? Take some.'],
      'Accept a handful and thank them.', ['Nandri, oru pidi edutthukkaren.', 'நன்றி, ஒரு பிடி எடுத்துக்கறேன்.'],
      ['nandri oru pidi edutthukkaren', 'oru pidi edutthukkaren', 'nandri konjam edutthukkaren', 'seri nandri oru pidi', 'nandri sundal super', 'நன்றி ஒரு பிடி எடுத்துக்கறேன்', 'ஒரு பிடி எடுத்துக்கறேன்'],
      'accept_sundal', ['Say yes and thank them.', '"Oru pidi" = one handful.', 'Say: "Nandri, oru pidi edutthukkaren."'],
      ['எலுமிச்சை பிழிஞ்சிருக்கு, ருசி பாருங்க!', 'Elumichai pizhinjirukku, rusi paarunga!', 'Squeezed with lemon, taste it!'],
      ['ஒரு பிடி எடுத்துக்கோங்க மேடம்.', 'Oru pidi eduthukkonga madam.', 'Take a handful, madam.']),
  ],
  outro: ['கடல் காத்துல சுண்டல் தான் பெஸ்ட்!', 'Kadal kaatthula sundal thaan best!', 'Sundal is best in the sea breeze!'],
  learned: [['oru pidi edutthukkaren', 'I will take a handful']],
  again: ['மேடம், இன்னும் கொஞ்சம் சுண்டல்?', 'Madam, innum konjam sundal?', 'Madam, a bit more sundal?'],
});

export const sundalMan = D('marine-chana-seller', {
  name: 'Babu', role: 'sundal seller', site: 'Marina Beach promenade', diff: 2,
  voice: { rate: 1.15, pitch: 0.9 },
  persona: 'Thin man in a white cap with a basket of boiled peanuts, scooping sundal into paper cones with lemon and grated raw mango.',
  goal: 'Ask for raw mango on your sundal and pay ten rupees.',
  steps: [
    S('mango', ['சுண்டல் சுண்டல்! எலுமிச்சை, மாங்கா போடவா?', 'Sundal sundal! Elumichai, maangaa podavaa?', 'Sundal, sundal! Shall I add lemon and raw mango?'],
      'Ask for raw mango.', ['Maangaa podunga anna.', 'மாங்கா போடுங்க அண்ணா.'],
      ['maangaa podunga anna', 'maangaa podunga', 'maangaa venum anna', 'anna maangaa konjam podunga', 'maangaa elumichai podunga', 'மாங்கா போடுங்க அண்ணா', 'மாங்கா வேணும்'],
      'ask_raw_mango', ['Ask for the topping.', '"Maangaa" = raw mango.', 'Say: "Maangaa podunga anna."'],
      ['சூப்பர்! புளிப்பா காரமா, சூடா இருக்கும்.', 'Super! Pulippaa kaaramaa, soodaa irukkum.', 'Super! Tangy, spicy and hot.'],
      ['மாங்கா வேணுமா வேணாமா?', 'Maangaa venumaa venaamaa?', 'Raw mango or not?']),
    S('pay', ['இந்தாங்க கோன். பத்து ரூபா தான்.', 'Indhaanga cone. Patthu rubaa thaan.', 'Here is your cone. Just ten rupees.'],
      'Pay ten rupees.', ['Idho anna, paththu rubaa.', 'இதோ அண்ணா, பத்து ரூபா.'],
      ['idho anna paththu rubaa', 'paththu rubaa idho anna', 'anna paththu rubaa', 'idho paththu rubaa', 'ten rupees idho anna', 'இதோ அண்ணா பத்து ரூபா', 'பத்து ரூபா இதோ'],
      'pay_ten_rupees', ['Hand over ten rupees.', 'Ten = "paththu".', 'Say: "Idho anna, paththu rubaa."'],
      ['நன்றி மேடம்! நாளைக்கும் வாங்க.', 'Nandri madam! Naalaikkum vaanga.', 'Thanks, madam! Come tomorrow too.'],
      ['காசு குடுங்க மேடம்.', 'Kaasu kudunga madam.', 'Give the money, madam.']),
  ],
  outro: ['கடற்கரைல சுண்டல் இல்லன்னா எப்படி மீரா!', 'Kadarkaraila sundal illannaa eppadi Meera!', 'How can there be a beach without sundal, Meera!'],
  learned: [['maangaa podunga', 'add raw mango'], ['paththu rubaa', 'ten rupees']],
  again: ['மேடம், இன்னொரு கோன்?', 'Madam, innoru cone?', 'Madam, another cone?'],
});

export const jogger1 = D('marine-jogger', {
  name: 'Rishi', role: 'beach jogger', site: 'Marina Beach promenade', diff: 2,
  voice: { rate: 1.2, pitch: 1.0 },
  persona: 'Jogger in a lilac striped tee with a headband, running the promenade at dawn and breathing hard.',
  goal: 'Say you will come tomorrow, now you are going to eat.',
  steps: [
    S('run', ['ஹூப்... காலைல ஓடுனா சூப்பரா இருக்கும்... நீங்களும் வாங்க!', 'Hoop... kaalaila odunaa superaa irukkum... Neengalum vaanga!', 'Huff... running in the morning is great... you come too!'],
      'Say you will come tomorrow; now you will eat.', ['Naalaikku vareen, ippo saappida poren.', 'நாளைக்கு வரேன், இப்போ சாப்பிட போறேன்.'],
      ['naalaikku vareen ippo saappida poren', 'naalaikku varen', 'naalaikku vareen ippo saappadu', 'ippo saappida poren naalaikku varen', 'naalaikku odalaam ippo saappadu', 'நாளைக்கு வரேன் இப்போ சாப்பிட போறேன்', 'நாளைக்கு வரேன்'],
      'say_will_run_tomorrow', ['Say tomorrow, not now.', '"Naalaikku" = tomorrow.', 'Say: "Naalaikku vareen, ippo saappida poren."'],
      ['ஹா ஹா! சரி, சாப்பிட்டு எனர்ஜி ஏத்துங்க!', 'Haa haa! Sari, saappittu energy yetthunga!', 'Ha ha! Okay, eat and get your energy up!'],
      ['ஓடறீங்களா இல்லையா? சீக்கிரம் சொல்லுங்க!', 'Odareengalaa illaiyaa? Seekkiram sollunga!', 'Will you run or not? Tell me quickly!']),
  ],
  outro: ['நாளைக்கு காலைல ஆறு மணிக்கு பாக்கலாம்!', 'Naalaikku kaalaila aaru manikku paakkalaam!', 'See you tomorrow morning at six!'],
  learned: [['naalaikku vareen', 'I will come tomorrow']],
  again: ['மேடம், இன்னும் ரெண்டு ரவுண்டு!', 'Madam, innum rendu round!', 'Madam, two more rounds!'],
});

export const benchAunty = D('marine-bench-aunty', {
  name: 'Shanthi Amma', role: 'woman on a bench', site: 'Marina Beach, bench', diff: 2,
  voice: { rate: 0.9, pitch: 1.15 },
  persona: 'Older woman with a grey bun and a shopping bag, resting on the bench and watching the sea.',
  goal: 'Sit with her and say you came alone.',
  steps: [
    S('sit', ['கடல் காத்து சுகமா இருக்கு. உக்காருங்க கண்ணு.', 'Kadal kaathu sugamaa irukku. Ukkaarunga kannu.', 'The sea breeze is lovely. Sit down, dear.'],
      'Say okay, you will sit.', ['Seri amma, naan ukkaaren.', 'சரி அம்மா, நான் உக்காறேன்.'],
      ['seri amma naan ukkaaren', 'seri amma ukkaaren', 'amma naan ukkaaren', 'nandri amma ukkaaren', 'seri ukkaaren amma', 'சரி அம்மா நான் உக்காறேன்', 'சரி அம்மா உக்காறேன்'],
      'sit_on_bench', ['Say you will sit.', '"Ukkaaren" = I will sit.', 'Say: "Seri amma, naan ukkaaren."'],
      ['நல்லது, கொஞ்ச நேரம் உக்காருங்க. கால் வலிக்காது.', 'Nalladhu, konja neram ukkaarunga. Kaal valikkaadhu.', 'Good, sit a while. Your feet will not ache.'],
      ['உக்காறீங்களா கண்ணு?', 'Ukkaareengalaa kannu?', 'Will you sit, dear?']),
    S('alone', ['கூட்டத்துக்கு நடுவுல தனியா வந்திருக்கீங்களா?', 'Koottatthukku naduvula thaniyaa vandhirukkeengalaa?', 'Have you come alone amid this crowd?'],
      'Say yes, you came alone.', ['Aamaa amma, naan thaniyaa vandhen.', 'ஆமா அம்மா, நான் தனியா வந்தேன்.'],
      ['aamaa amma naan thaniyaa vandhen', 'naan thaniyaa vandhen amma', 'thaniyaa vandhen', 'aamaa thaniyaa vandhirukken', 'aamaa amma thaniyaa', 'ஆமா அம்மா நான் தனியா வந்தேன்', 'நான் தனியா வந்தேன் அம்மா'],
      'say_came_alone', ['Say you are alone.', '"Thaniyaa" = alone.', 'Say: "Aamaa amma, naan thaniyaa vandhen."'],
      ['பயப்படாதீங்க, சென்னை மக்கள் நல்லவங்க.', 'Bayappadaadheenga, Chennai makkal nallavanga.', 'Do not be afraid, Chennai people are kind.'],
      ['தனியாவா வந்தீங்க கண்ணு?', 'Thaniyaavaa vandheenga kannu?', 'Did you come alone, dear?']),
  ],
  outro: ['பத்திரமா போங்க மீரா, இருட்டும் முன்னாடி!', 'Pathiramaa ponga Meera, iruttum munnaadi!', 'Go safely, Meera, before dark!'],
  learned: [['naan thaniyaa vandhen', 'I came alone']],
  again: ['கண்ணு, இன்னும் கொஞ்சம் உக்காருங்க.', 'Kannu, innum konjam ukkaarunga.', 'Dear, sit a bit longer.'],
});

export const benchReader = D('marine-bench-reader', {
  name: 'Rangarajan Thaatha', role: 'old man with newspaper', site: 'Marina Beach, same bench', diff: 2,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Old man with specs and vibhuti, reading the newspaper on the bench.',
  goal: 'React to the news that the beach is being cleaned.',
  steps: [
    S('news', ['இந்த செய்தியை பாருங்க. நம்ம கடற்கரை சுத்தமாகுதாம்.', 'Indha seidhiyai paarunga. Namma kadarkarai suddhamaagudhaam.', 'See this news. Our beach is going to be cleaned.'],
      'Say that is very good news.', ['Super thaatha, romba nalla vishayam.', 'சூப்பர் தாத்தா, ரொம்ப நல்ல விஷயம்.'],
      ['super thaatha romba nalla vishayam', 'romba nalla vishayam thaatha', 'nalla seidhi thaatha', 'super thaatha', 'romba nalladhu thaatha', 'சூப்பர் தாத்தா ரொம்ப நல்ல விஷயம்', 'ரொம்ப நல்ல விஷயம் தாத்தா'],
      'react_to_clean_beach_news', ['Say it is good.', '"Nalla vishayam" = good thing.', 'Say: "Super thaatha, romba nalla vishayam."'],
      ['ஆமா கண்ணு, நாமளும் குப்பை போடாம இருக்கணும்.', 'Aamaa kannu, naamalum kuppai podaama irukkanum.', 'Yes dear, we must also not litter.'],
      ['செய்தி பிடிச்சிருக்கா இல்லையா?', 'Seidhi pidichirukkaa illaiyaa?', 'Do you like the news or not?']),
  ],
  outro: ['கடற்கரைய சுத்தமா வெச்சுக்கணும் மீரா!', 'Kadarkaraiya suddhamaa vechchukkanum Meera!', 'We must keep the beach clean, Meera!'],
  learned: [['romba nalla vishayam', 'a very good thing']],
  again: ['கண்ணு, இன்னொரு செய்தி படிக்கவா?', 'Kannu, innoru seidhi padikkavaa?', 'Dear, shall I read another news item?'],
});

export const couple2 = D('marine-couple-2', {
  name: 'Vimal and Janani', role: 'seated couple', site: 'Marina Beach, sea wall', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Young couple in pastel clothes sitting close on the sea wall, one glancing at a phone.',
  goal: 'Agree to take their photo.',
  steps: [
    S('photo', ['ஒரு போட்டோ எடுத்து தர முடியுமா அக்கா?', 'Oru photo eduthu thara mudiyumaa akka?', 'Could you take a photo of us, akka?'],
      'Agree and tell them to stand.', ['Seri, nillunga, naan edukkaren.', 'சரி, நில்லுங்க, நான் எடுக்கறேன்.'],
      ['seri nillunga naan edukkaren', 'seri photo edukkaren', 'nillunga naan photo edukkaren', 'seri paathu nillunga', 'naan photo edukkaren', 'சரி நில்லுங்க நான் எடுக்கறேன்', 'நான் போட்டோ எடுக்கறேன்'],
      'agree_to_take_couple_photo', ['Say you will take it.', '"Edukkaren" = I will take.', 'Say: "Seri, nillunga, naan edukkaren."'],
      ['நன்றி அக்கா! கடல் பின்னாடி வரணும், சரியா?', 'Nandri akka! Kadal pinnaadi varanum, sariyaa?', 'Thanks, akka! The sea should be behind us, okay?'],
      ['எடுப்பீங்களா அக்கா?', 'Eduppeengalaa akka?', 'Will you take it, akka?']),
  ],
  outro: ['சூப்பர் போட்டோ! நீங்க நல்லா எடுக்கறீங்க அக்கா!', 'Super photo! Neenga nallaa edukkareenga akka!', 'Super photo! You shoot well, akka!'],
  learned: [['photo edukkaren', 'I will take the photo']],
  again: ['அக்கா, இன்னொண்ணு எடுப்பீங்களா?', 'Akka, innonnu eduppeengalaa?', 'Akka, will you take another?'],
});

export const jogger2 = D('marine-jogger-2', {
  name: 'Sandhya', role: 'jogger', site: 'Marina Beach promenade, the opposite way', diff: 2,
  voice: { rate: 1.15, pitch: 1.2 },
  persona: 'Jogger in a sleeveless sky-blue top and running shoes, jogging the promenade.',
  goal: 'Ask if she runs every day, and say you will only walk.',
  steps: [
    S('daily', ['கடல் பக்கம் காலைல ஓடுறது சூப்பர்!', 'Kadal pakkam kaalaila odurathu super!', 'Running by the sea in the morning is super!'],
      'Ask if she runs every day.', ['Neenga dhinamum odureengala?', 'நீங்க தினமும் ஓடுறீங்களா?'],
      ['neenga dhinamum odureengala', 'dhinamum odureengala', 'neenga everyday odureengala', 'dhinamum odureengalaa akka', 'daily odureengala', 'நீங்க தினமும் ஓடுறீங்களா', 'தினமும் ஓடுறீங்களா'],
      'ask_if_runs_daily', ['Ask about her habit.', '"Dhinamum" = every day.', 'Say: "Neenga dhinamum odureengala?"'],
      ['ஆமா, தினம் அஞ்சு கிலோமீட்டர்!', 'Aamaa, dhinam anju kilometre!', 'Yes, five kilometres every day!'],
      ['தினமுமான்னு கேக்கறீங்களா?', 'Dhinamumaannu kekkareengalaa?', 'Are you asking if daily?']),
    S('walk', ['நீங்களும் வாங்களேன்! ஒண்ணா ஓடலாம்.', 'Neengalum vaangalaen! Onnaa odalaam.', 'You come too! We can run together.'],
      'Say walking is enough, you will not run.', ['Naan nadandhaa podhum, odamaatten.', 'நான் நடந்தா போதும், ஓடமாட்டேன்.'],
      ['naan nadandhaa podhum odamaatten', 'nadandhaa podhum', 'naan odamaatten nadappen', 'odamaatten nadakkaren', 'nadandhaa podhum akka', 'நான் நடந்தா போதும் ஓடமாட்டேன்', 'நடந்தா போதும்'],
      'say_will_only_walk', ['Say you prefer walking.', '"Nadandhaa podhum" = walking is enough.', 'Say: "Naan nadandhaa podhum, odamaatten."'],
      ['ஹா ஹா, சரி! நடந்தாலும் நல்லது தான்.', 'Haa haa, sari! Nadandhaalum nalladhu thaan.', 'Ha ha, okay! Walking is good too.'],
      ['ஓடுவீங்களா, நடப்பீங்களா?', 'Oduveengalaa, nadappeengalaa?', 'Will you run or walk?']),
  ],
  outro: ['நாளைக்கு சந்திக்கலாம் மீரா!', 'Naalaikku sandhikkalaam Meera!', 'See you tomorrow, Meera!'],
  learned: [['dhinamum odureengala?', 'do you run every day?'], ['nadandhaa podhum', 'walking is enough']],
  again: ['மீரா, இன்னொரு ரவுண்டு நடக்கலாமா?', 'Meera, innoru round nadakkalaamaa?', 'Meera, shall we walk another round?'],
});

export const morningWalker = D('marine-morning-walker', {
  name: 'Parthasarathy Thaatha', role: 'elderly morning walker', site: 'Marina Beach promenade', diff: 2,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Elderly man in a white cap with a closed umbrella, strolling slowly and enjoying the sea breeze.',
  goal: 'Agree that morning walks are good, and say there is no sea in Pune.',
  steps: [
    S('walk', ['காலை நடை உடம்புக்கு நல்லது கண்ணு.', 'Kaalai nadai udambukku nalladhu kannu.', 'A morning walk is good for the body, dear.'],
      'Agree and say you walk too.', ['Aamaa thaatha, naanum nadakkaren.', 'ஆமா தாத்தா, நானும் நடக்கறேன்.'],
      ['aamaa thaatha naanum nadakkaren', 'naanum nadakkaren thaatha', 'aamaa thaatha nalladhu', 'naanum dhinamum nadakkaren', 'seri thaatha nadakkaren', 'ஆமா தாத்தா நானும் நடக்கறேன்', 'நானும் நடக்கறேன் தாத்தா'],
      'agree_morning_walk_good', ['Agree with him.', '"Nadakkaren" = I walk.', 'Say: "Aamaa thaatha, naanum nadakkaren."'],
      ['நல்ல பழக்கம். இந்த கடல் காத்து போல எங்கயும் கிடையாது.', 'Nalla pazhakkam. Indha kadal kaathu pola engayum kidayaadhu.', 'A good habit. There is no breeze like this sea breeze.'],
      ['என்ன சொன்ன கண்ணு?', 'Enna senna kannu?', 'What did you say, dear?']),
    S('pune', ['உங்க ஊர்ல கடல் இருக்கா?', 'Unga oorla kadal irukkaa?', 'Is there a sea in your town?'],
      'Say no, there is no sea in Pune.', ['Illa thaatha, Pune-la kadal illa.', 'இல்ல தாத்தா, புனேல கடல் இல்ல.'],
      ['illa thaatha pune-la kadal illa', 'pune-la kadal illa thaatha', 'illa kadal illa', 'illa thaatha kadal kidayaadhu', 'illa pune-la kadal illa', 'இல்ல தாத்தா புனேல கடல் இல்ல', 'புனேல கடல் இல்ல'],
      'say_no_sea_in_pune', ['Answer no.', '"Kadal" = sea.', 'Say: "Illa thaatha, Pune-la kadal illa."'],
      ['அப்போ ரசிச்சு பாருங்க. சென்னை கடல் உங்களுக்கு சொந்தம்!', 'Appo rasichu paarunga. Chennai kadal ungalukku sondham!', 'Then enjoy it. The Chennai sea belongs to you!'],
      ['இருக்கா இல்லையா கண்ணு?', 'Irukkaa illaiyaa kannu?', 'Is there or not, dear?']),
  ],
  outro: ['கடல பாத்துட்டு போங்க மீரா. உடம்புக்கு நல்லது.', 'Kadala paatthuttu ponga Meera. Udambukku nalladhu.', 'Watch the sea before you go, Meera. It is good for health.'],
  learned: [['naanum nadakkaren', 'I walk too'], ['kadal illa', 'there is no sea']],
  again: ['கண்ணு, இன்னொரு ரவுண்டு போலாமா?', 'Kannu, innoru round polaamaa?', 'Dear, shall we go another round?'],
});

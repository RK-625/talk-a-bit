// IT park: the second gate guard, the gardener, the call-taxi line, the delivery bay and the lane outside.
import { dialogue as D, step as S } from '../kit.js';

export const gateWatchman = D('antilia-gate-watchman', {
  name: 'Mohammed', role: 'second gate guard', site: 'IT park gate', diff: 2,
  voice: { rate: 1.0, pitch: 0.8 },
  persona: 'Guard in a khaki cap with specs and a torch, waving at passers-by and watching the cabs.',
  goal: 'Agree to stand to the side.',
  steps: [
    S('side', ['மேடம், கேப் வருது. ஒரு ஓரமா நில்லுங்க.', 'Madam, cab varudhu. Oru oramaa nillunga.', 'Madam, a cab is coming. Please stand to the side.'],
      'Say okay, you will stand aside.', ['Seri anna, naan oramaa nikkaren.', 'சரி அண்ணா, நான் ஓரமா நிக்கறேன்.'],
      ['seri anna naan oramaa nikkaren', 'oramaa nikkaren anna', 'seri oramaa nikkaren', 'paravaalla anna oramaa', 'seri anna side-la nikkaren', 'சரி அண்ணா நான் ஓரமா நிக்கறேன்', 'ஓரமா நிக்கறேன் அண்ணா'],
      'agree_to_stand_aside', ['Agree politely.', '"Oramaa" = at the side.', 'Say: "Seri anna, naan oramaa nikkaren."'],
      ['நன்றி மேடம். இங்க வண்டி ஜாஸ்தி.', 'Nandri madam. Inga vandi jaasthi.', 'Thank you, madam. There are many vehicles here.'],
      ['ஓரமா நிக்கறீங்களா மேடம்?', 'Oramaa nikkareengalaa madam?', 'Will you stand aside, madam?']),
  ],
  outro: ['பாத்து போங்க மேடம், கேப் வருது.', 'Paathu ponga madam, cab varudhu.', 'Go carefully, madam, a cab is coming.'],
  learned: [['oramaa nikkaren', 'I will stand to the side']],
  again: ['மேடம், கொஞ்சம் தள்ளி நில்லுங்க.', 'Madam, konjam thalli nillunga.', 'Madam, stand a bit further away.'],
});

export const gardener = D('antilia-mali', {
  name: 'Kasthuri', role: 'campus gardener', site: 'IT park garden', diff: 2,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Woman in a teal saree with a broom, sweeping fallen leaves from the garden path.',
  goal: 'Say the place is very clean and wonder at how early she comes.',
  steps: [
    S('clean', ['இலை எல்லாம் கொட்டுது. தினமும் கூட்டணும்.', 'Ilai ellaam kottudhu. Dhinamum koottanum.', 'The leaves keep falling. I must sweep every day.'],
      'Say it is very clean here.', ['Inga romba suthamaa irukku akka.', 'இங்க ரொம்ப சுத்தமா இருக்கு அக்கா.'],
      ['inga romba suthamaa irukku akka', 'romba suthamaa irukku akka', 'inga suthamaa irukku', 'garden romba suthamaa irukku', 'suthamaa irukku akka', 'இங்க ரொம்ப சுத்தமா இருக்கு அக்கா', 'ரொம்ப சுத்தமா இருக்கு'],
      'say_place_is_clean', ['Praise the cleanliness.', '"Suthamaa" = clean.', 'Say: "Inga romba suthamaa irukku akka."'],
      ['நன்றி கண்ணு. தினம் காலைல ஐந்து மணிக்கே வந்துடுவேன்.', 'Nandri kannu. Dhinam kaalaila aindhu manikke vandhuduven.', 'Thanks, dear. I come at five every morning.'],
      ['என்ன சொன்னீங்க கண்ணு?', 'Enna sonneenga kannu?', 'What did you say, dear?']),
    S('early', ['ஆமா, பூ செடிக்கு தண்ணி ஊத்தணும், இலை கூட்டணும்.', 'Aamaa, poo sedikku thanni oottanum, ilai koottanum.', 'Yes, I must water the plants and sweep the leaves.'],
      'Say, wow, you come very early.', ['Romba seekkiram varreengale akka!', 'ரொம்ப சீக்கிரம் வர்றீங்களே அக்கா!'],
      ['romba seekkiram varreengale akka', 'romba seekkiram varreenga', 'seekkiram varreengale', 'romba seekkiram vandhuduveengala akka', 'akka romba seekkiram', 'ரொம்ப சீக்கிரம் வர்றீங்களே அக்கா', 'ரொம்ப சீக்கிரம் வர்றீங்களே'],
      'wonder_at_early_start', ['Show surprise.', '"Seekkiram" = early.', 'Say: "Romba seekkiram varreengale akka!"'],
      ['வேலைன்னா வேலைதான் கண்ணு! நீங்களும் சீக்கிரம் எழுந்துக்கோங்க.', 'Velainnaa velaithaan kannu! Neengalum seekkiram ezhundhukkonga.', 'Work is work, dear! You should wake up early too.'],
      ['ஆச்சரியமா இருக்கா கண்ணு?', 'Aachchariyamaa irukkaa kannu?', 'Are you surprised, dear?']),
  ],
  outro: ['தோட்டத்தை சுத்தி பாருங்க மீரா, பூ எல்லாம் அழகு!', 'Thottatthai suthi paarunga Meera, poo ellaam azhagu!', 'Walk around the garden, Meera, the flowers are lovely!'],
  learned: [['inga romba suthamaa irukku', 'it is very clean here'], ['romba seekkiram varreenga', 'you come very early']],
  again: ['கண்ணு, இங்க பூ பாருங்க!', 'Kannu, inga poo paarunga!', 'Dear, look at the flowers here!'],
});

export const cabDriver = D('antilia-chauffeur', {
  name: 'Thangaraj', role: 'cab driver', site: 'IT park, beside the white call taxis', diff: 1,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Driver in a white shirt and a dark cap with a teal lanyard, waving at passers-by and waiting beside his cab.',
  goal: 'Say you do not need a cab, you will walk.',
  steps: [
    S('cab', ['மேடம், கேப் வேணுமா? ஏசி இருக்கு.', 'Madam, cab venumaa? AC irukku.', 'Madam, need a cab? It has AC.'],
      'Say not now, you will walk.', ['Ippo venaam anna, nadandhu poren.', 'இப்போ வேணாம் அண்ணா, நடந்து போறேன்.'],
      ['ippo venaam anna nadandhu poren', 'nadandhu poren anna', 'cab venaam anna nadandhu poren', 'ippo venaam nadappen', 'venaam anna naan nadandhu poren', 'இப்போ வேணாம் அண்ணா நடந்து போறேன்', 'நடந்து போறேன் அண்ணா'],
      'decline_cab_will_walk', ['Say no politely.', '"Nadandhu poren" = I will go on foot.', 'Say: "Ippo venaam anna, nadandhu poren."'],
      ['சரி மேடம், பரவாயில்ல. வெயில் ஜாஸ்தி, பாத்து போங்க.', 'Sari madam, paravaayilla. Veyil jaasthi, paathu ponga.', 'Okay, madam, no problem. It is hot, go carefully.'],
      ['கேப் வேணுமா வேணாமா?', 'Cab venumaa venaamaa?', 'Cab or no cab?']),
  ],
  outro: ['தேவைன்னா கூப்பிடுங்க மீரா மேடம்!', 'Thevainnaa kooppidunga Meera madam!', 'Call me if you need, Meera madam!'],
  learned: [['ippo venaam, nadandhu poren', 'not now, I will walk']],
  again: ['மேடம், கேப் ரெடி, வரீங்களா?', 'Madam, cab ready, varreengalaa?', 'Madam, the cab is ready, coming?'],
});

export const deliveryBoy = D('antilia-delivery-boy', {
  name: 'Sathya', role: 'delivery boy', site: 'IT park, outside the gate', diff: 2,
  voice: { rate: 1.15, pitch: 1.05 },
  persona: 'Young delivery boy in an orange shirt with a bag and a phone, waiting to be let through the gate.',
  goal: 'Tell him to wait, and say you did not order anything.',
  steps: [
    S('gate', ['கேட்ல நிறுத்திட்டாங்க. உள்ள போக அனுமதி கிடைக்கல.', 'Gate-la niruthittaanga. Ulla poga anumathi kidaikkala.', 'They stopped me at the gate. I did not get permission to go in.'],
      'Tell him to wait, permission will come.', ['Konjam porunga anna, anumathi kidaikkum.', 'கொஞ்சம் பொறுங்க அண்ணா, அனுமதி கிடைக்கும்.'],
      ['konjam porunga anna anumathi kidaikkum', 'porunga anna kidaikkum', 'konjam porumaiyaa irunga anna', 'anumathi kidaikkum konjam kaathirunga', 'konjam kaathirunga anna', 'கொஞ்சம் பொறுங்க அண்ணா அனுமதி கிடைக்கும்', 'கொஞ்சம் பொறுங்க அண்ணா'],
      'tell_him_to_wait', ['Tell him to be patient.', '"Porunga" = please wait.', 'Say: "Konjam porunga anna, anumathi kidaikkum."'],
      ['சரி மேடம், காத்திருக்கேன். ஆர்டர் ஆறிடுமே!', 'Sari madam, kaathirukken. Order aaridume!', 'Okay, madam, I will wait. The order will get cold!'],
      ['என்ன சொன்னீங்க மேடம்? ஹாரன் சத்தம்.', 'Enna sonneenga madam? Horn saththam.', 'What did you say, madam? The horns are loud.']),
    S('order', ['நீங்க ஏதாவது ஆர்டர் பண்ணீங்களா மேடம்?', 'Neenga edhaavadhu order panneengalaa madam?', 'Did you order something, madam?'],
      'Say no, you did not order anything.', ['Illa anna, naan edhuvum order pannala.', 'இல்ல அண்ணா, நான் எதுவும் ஆர்டர் பண்ணல.'],
      ['illa anna naan edhuvum order pannala', 'edhuvum order pannala anna', 'illa anna naan order pannala', 'naan order pannala', 'illa anna', 'இல்ல அண்ணா நான் எதுவும் ஆர்டர் பண்ணல', 'நான் எதுவும் ஆர்டர் பண்ணல'],
      'say_you_did_not_order', ['Answer no.', '"Order pannala" = did not order.', 'Say: "Illa anna, naan edhuvum order pannala."'],
      ['ஓ சரி மேடம், தவறா கேட்டுட்டேன். மன்னிக்கணும்.', 'O sari madam, thavaraa kettuttaen. Mannikkanum.', 'Oh okay, madam, I asked wrongly. Sorry.'],
      ['ஆர்டர் பண்ணீங்களா இல்லையா மேடம்?', 'Order panneengalaa illaiyaa madam?', 'Did you order or not, madam?']),
  ],
  outro: ['ஆர்டர் டெலிவரி பண்ணிட்டு வரேன் மேடம்!', 'Order delivery pannittu varen madam!', 'I will deliver the order and come, madam!'],
  learned: [['konjam porunga', 'please wait a little'], ['naan order pannala', 'I did not order']],
  again: ['மேடம், இன்னும் கேட் திறக்கல!', 'Madam, innum gate thirakkala!', 'Madam, the gate has still not opened!'],
});

export const laneWalker = D('antilia-lane-walker', {
  name: 'Raghavan Thaatha', role: 'elderly man on a morning walk', site: 'Lane near the IT park', diff: 2,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Elderly man in a white cap and white shoes, reading a newspaper while he strolls.',
  goal: 'Say you walk in the morning looking for good food.',
  steps: [
    S('walk', ['காலைல நடந்துட்டே பேப்பர் படிக்கறேன். நீங்க என்ன பண்றீங்க?', 'Kaalaila nadandhutte paper padikkaren. Neenga enna pannureenga?', 'I read the paper while walking in the morning. What are you doing?'],
      'Say you walk in the morning looking for food.', ['Naan kaalaila nadandhu saappaadu thedaren.', 'நான் காலைல நடந்து சாப்பாடு தேடறேன்.'],
      ['naan kaalaila nadandhu saappaadu thedaren', 'saappaadu thedaren thaatha', 'naan saappaadu thedi nadakkaren', 'kaalaila nadandhu saappaadu thedaren', 'nalla saappaadu thedaren thaatha', 'நான் காலைல நடந்து சாப்பாடு தேடறேன்', 'சாப்பாடு தேடறேன் தாத்தா'],
      'say_walking_for_food', ['Say what you are doing.', '"Thedaren" = I am looking for.', 'Say: "Naan kaalaila nadandhu saappaadu thedaren."'],
      ['ஹா ஹா, சரி! பக்கத்துல ஒரு மெஸ்ல இட்லி சூப்பர்.', 'Haa haa, sari! Pakkatthula oru mess-la idli super.', 'Ha ha, good! The idli at a mess nearby is superb.'],
      ['என்ன பண்றீங்கன்னு சொல்லுங்க கண்ணு.', 'Enna pannureenganu sollunga kannu.', 'Tell me what you are doing, dear.']),
  ],
  outro: ['போய் சாப்பிட்டு வாங்க மீரா, நல்லா இருக்கும்!', 'Poi saappittu vaanga Meera, nallaa irukkum!', 'Go and eat, Meera, it will be good!'],
  learned: [['saappaadu thedaren', 'I am looking for food']],
  again: ['கண்ணு, மெஸ் கண்டுபிடிச்சீங்களா?', 'Kannu, mess kandupidichcheengalaa?', 'Dear, did you find the mess?'],
});

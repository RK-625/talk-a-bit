// The people on the open ground away from the sites: the rail line, the east road, the fields, the road to the beach.
import { dialogue as D, step as S } from '../kit.js';

export const railKite = D('rail-kite-kid', {
  name: 'Mani', role: 'kite-flying kid', site: 'Open ground beside the railway line', diff: 1,
  voice: { rate: 1.15, pitch: 1.35 },
  persona: 'Boy in a sky-blue checked shirt flying a kite with his head tipped back, near the railway line.',
  goal: 'Warn him that a train is coming.',
  steps: [
    S('train', ['அக்கா, பட்டம் ரயில் பக்கம் போயிடுச்சு! எடுக்கவா?', 'Akka, pattam rayil pakkam poyiduchu! Edukkavaa?', 'Akka, the kite has gone near the railway! Shall I fetch it?'],
      'Warn him a train is coming.', ['Paathu thambi, train varudhu!', 'பாத்து தம்பி, ட்ரெயின் வருது!'],
      ['paathu thambi train varudhu', 'train varudhu thambi', 'paathu thambi ponaadhe', 'thambi train varudhu paathu', 'pogaadhe thambi train varudhu', 'பாத்து தம்பி ட்ரெயின் வருது', 'ட்ரெயின் வருது தம்பி'],
      'warn_kid_train_coming', ['Warn him quickly.', '"Train varudhu" = a train is coming.', 'Say: "Paathu thambi, train varudhu!"'],
      ['ஐயோ! ஆமா! வேணாம், அப்புறம் எடுக்கறேன்!', 'Ayyo! Aamaa! Venaam, appuram edukkaren!', 'Oh! Yes! Never mind, I will get it later!'],
      ['என்ன சொன்னீங்க அக்கா? சத்தம்!', 'Enna sonneenga akka? Saththam!', 'What did you say, akka? So noisy!']),
  ],
  outro: ['நன்றி அக்கா! ரயில் பக்கம் இனி போக மாட்டேன்.', 'Nandri akka! Rayil pakkam ini poga maatten.', 'Thanks, akka! I will not go near the railway again.'],
  learned: [['train varudhu', 'a train is coming']],
  again: ['அக்கா, பட்டம் பாருங்க!', 'Akka, pattam paarunga!', 'Akka, look at the kite!'],
});

export const schoolGirl = D('east-schoolgirl', {
  name: 'Harini', role: 'schoolgirl', site: 'Open ground near the east road', diff: 1,
  voice: { rate: 1.1, pitch: 1.45 },
  persona: 'Schoolgirl in white and navy with a red hair band and a backpack, waving as she walks home from school.',
  goal: 'Wish her to study well.',
  steps: [
    S('school', ['அக்கா, இது என் ஸ்கூல் பை! பாருங்க!', 'Akka, idhu en school bai! Paarunga!', 'Akka, this is my school bag! Look!'],
      'Tell her to study well.', ['Nalla padi paapa.', 'நல்லா படி பாப்பா.'],
      ['nalla padi paapa', 'nalla padi chellam', 'nalla padichchu periya aalaa vaa', 'nalla padi kutty', 'paapa nalla padi', 'நல்லா படி பாப்பா', 'நல்லா படி'],
      'tell_schoolgirl_to_study', ['Say something kind.', '"Padi" = study.', 'Say: "Nalla padi paapa."'],
      ['சரிக்கா! நான் டீச்சர் ஆவேன்!', 'Sarikka! Naan teacher aaven!', 'Okay, akka! I will become a teacher!'],
      ['அக்கா, சரியா கேக்கல, திரும்ப சொல்லுங்க.', 'Akka, sariyaa kekkala, thirumba sollunga.', 'Akka, I did not hear, say it again.']),
  ],
  outro: ['பை அக்கா! நாளைக்கு பாக்கலாம்!', 'Bye akka! Naalaikku paakkalaam!', 'Bye akka! See you tomorrow!'],
  learned: [['nalla padi', 'study well']],
  again: ['அக்கா, இன்னும் பை பாக்கறீங்களா?', 'Akka, innum bai paakkareengalaa?', 'Akka, want to see my bag again?'],
});

export const scrubElder = D('scrub-elder-umbrella', {
  name: 'Karuppaiya Thaatha', role: 'elderly man with an umbrella', site: 'Open scrubland, far from the sites', diff: 2,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Elderly man in a sand shirt and a white veshti with a teal umbrella, standing quietly in the heat to rest.',
  goal: 'Politely refuse the umbrella offer.',
  steps: [
    S('umbrella', ['வெயில்ல தனியா நிக்கறீங்களே மேடம்? குடை வேணுமா?', 'Veyilla thaniyaa nikkareengale madam? Kudai venumaa?', 'You are standing alone in the sun, madam? Want an umbrella?'],
      'Say no thanks, you will manage.', ['Venaam thaatha, naan paathukkaren.', 'வேணாம் தாத்தா, நான் பாத்துக்கறேன்.'],
      ['venaam thaatha naan paathukkaren', 'naan paathukkaren thaatha', 'venaam thaatha paravaayilla', 'kudai venaam naan paathukkaren', 'paravaayilla thaatha nandri', 'வேணாம் தாத்தா நான் பாத்துக்கறேன்', 'நான் பாத்துக்கறேன் தாத்தா'],
      'decline_umbrella_politely', ['Say no politely.', '"Paathukkaren" = I will manage.', 'Say: "Venaam thaatha, naan paathukkaren."'],
      ['சரி கண்ணு. தொப்பி இல்லாம வெயில்ல போகாதீங்க.', 'Sari kannu. Thoppi illaama veyilla pogaadheenga.', 'Okay, dear. Do not go in the sun without a cap.'],
      ['குடை வேணுமா வேணாமா கண்ணு?', 'Kudai venumaa venaamaa kannu?', 'Umbrella or not, dear?']),
  ],
  outro: ['பத்திரமா போங்க மீரா. வெயில் ஜாஸ்தி.', 'Pathiramaa ponga Meera. Veyil jaasthi.', 'Go safely, Meera. It is very hot.'],
  learned: [['naan paathukkaren', 'I will manage']],
  again: ['கண்ணு, குடை எடுத்துக்கோங்களேன்.', 'Kannu, kudai eduthukkongalaen.', 'Dear, please take the umbrella.'],
});

export const eastAutoDriver = D('east-road-rickshaw-driver', {
  name: 'Ilango', role: 'auto driver', site: 'By the east road', diff: 3,
  voice: { rate: 1.05, pitch: 0.85 },
  persona: 'Auto driver in khaki with a green-checked towel, texting while waiting for a fare.',
  goal: 'Ask if he goes to Mylapore and tell him to drop you near the Kapaleeshwarar temple.',
  steps: [
    S('fare', ['மேடம், ஆட்டோ வேணுமா? ரொம்ப நேரமா சவாரி இல்ல.', 'Madam, auto venumaa? Romba neramaa savaari illa.', 'Madam, need an auto? No fares for a long time.'],
      'Ask if he goes to Mylapore.', ['Mylapore varuveengala anna?', 'மயிலாப்பூர் வருவீங்களா அண்ணா?'],
      ['mylapore varuveengala anna', 'anna mylapore varuveengala', 'mylapore poganum anna', 'mylapore varuma anna', 'mylapore ku varuveengala', 'மயிலாப்பூர் வருவீங்களா அண்ணா', 'மயிலாப்பூர் போகணும் அண்ணா'],
      'ask_auto_to_mylapore', ['Name the place.', '"Varuveengala?" = will you come?', 'Say: "Mylapore varuveengala anna?"'],
      ['வருவேன் மேடம். மீட்டர் போட்டு தரேன், ஏறுங்க.', 'Varuven madam. Meter pottu tharen, erunga.', 'I will come, madam. I will put the meter, get in.'],
      ['எங்க போகணும் மேடம்?', 'Enga poganum madam?', 'Where do you want to go, madam?']),
    S('temple', ['மயிலாப்பூர்ல எங்க இறக்கணும்?', 'Mylapore-la enga irakkanum?', 'Where in Mylapore should I drop you?'],
      'Ask him to drop you near the Kapaleeshwarar temple.', ['Kapaleeshwarar kovil pakkam vidunga.', 'கபாலீஸ்வரர் கோயில் பக்கம் விடுங்க.'],
      ['kapaleeshwarar kovil pakkam vidunga', 'kapaleeshwarar kovil pakkam vidunga anna', 'kovil pakkam vidunga anna', 'kapaleeshwarar kovil kitta vidunga', 'temple pakkam vidunga anna', 'கபாலீஸ்வரர் கோயில் பக்கம் விடுங்க', 'கோயில் பக்கம் விடுங்க அண்ணா'],
      'ask_drop_near_kapaleeshwarar', ['Name the temple.', '"Vidunga" = please drop me.', 'Say: "Kapaleeshwarar kovil pakkam vidunga."'],
      ['சரி மேடம், கோபுரம் தெரியும் இடத்துல விடறேன்.', 'Sari madam, gopuram theriyum idatthula vidaren.', 'Okay madam, I will drop you where the gopuram is visible.'],
      ['எந்த கோயில்னு சொல்லுங்க மேடம்.', 'Endha kovilnu sollunga madam.', 'Tell me which temple, madam.']),
  ],
  outro: ['ஏறுங்க மேடம், மயிலாப்பூர் போகலாம்!', 'Erunga madam, Mylapore pogalaam!', 'Get in, madam, let us go to Mylapore!'],
  learned: [['Mylapore varuveengala?', 'will you come to Mylapore?'], ['kovil pakkam vidunga', 'drop me near the temple']],
  again: ['மேடம், மயிலாப்பூர் போகலாமா?', 'Madam, Mylapore pogalaamaa?', 'Madam, shall we go to Mylapore?'],
});

export const selfieTeen = D('seaview-selfie-teen', {
  name: 'Nikhil', role: 'teen taking selfies', site: 'Open ground with a view of the bridge', diff: 1,
  voice: { rate: 1.15, pitch: 1.2 },
  persona: 'Teen in a pink tee and sunglasses, texting and taking selfies with the bridge behind him.',
  goal: 'Offer to take his photo.',
  steps: [
    S('selfie', ['அக்கா, பாலம் பின்னாடி வெச்சு செல்ஃபி எடுக்கறேன்!', 'Akka, paalam pinnaadi vechchu selfie edukkaren!', 'Akka, I am taking a selfie with the bridge behind me!'],
      'Offer to take the photo for him.', ['Super, naan photo edukkavaa?', 'சூப்பர், நான் போட்டோ எடுக்கவா?'],
      ['super naan photo edukkavaa', 'naan photo edukkavaa thambi', 'naan edukkavaa photo', 'naan photo edutthu tharen', 'super photo edukkavaa', 'சூப்பர் நான் போட்டோ எடுக்கவா', 'நான் போட்டோ எடுக்கவா தம்பி'],
      'offer_to_take_photo', ['Offer to help.', '"Edukkavaa?" = shall I take?', 'Say: "Super, naan photo edukkavaa?"'],
      ['வாவ் அக்கா! நன்றி! பாலம் நல்லா வரணும்!', 'Wow akka! Nandri! Paalam nallaa varanum!', 'Wow akka! Thanks! The bridge should come out well!'],
      ['என்ன கேட்டீங்க அக்கா?', 'Enna ketteenga akka?', 'What did you ask, akka?']),
  ],
  outro: ['சூப்பர் போட்டோ அக்கா! நீங்க கேமரா எக்ஸ்பெர்ட்!', 'Super photo akka! Neenga camera expert!', 'Super photo, akka! You are a camera expert!'],
  learned: [['naan photo edukkavaa?', 'shall I take the photo?']],
  again: ['அக்கா, இன்னொண்ணு எடுங்க!', 'Akka, innonnu edunga!', 'Akka, take one more!'],
});

export const bridgeShopper = D('bridge-road-shopper', {
  name: 'Meenakshi', role: 'woman with shopping', site: 'Open ground near the bridge approach', diff: 2,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Tired woman in a terracotta churidar top with a vegetable bag and a teal jhola, standing and wanting a bus.',
  goal: 'Tell her to wait a while, the bus will come, and offer her a place to sit.',
  steps: [
    S('bus', ['பை ரொம்ப கனம். பஸ் வருமா தெரியல.', 'Bai romba kanam. Bus varumaa theriyala.', 'The bag is very heavy. I do not know if a bus will come.'],
      'Tell her to wait, the bus will come.', ['Konjam kaathirunga akka, varum.', 'கொஞ்சம் காத்திருங்க அக்கா, வரும்.'],
      ['konjam kaathirunga akka varum', 'kaathirunga akka bus varum', 'konjam porunga akka varum', 'varum akka konjam kaathirunga', 'bus varum akka', 'கொஞ்சம் காத்திருங்க அக்கா வரும்', 'காத்திருங்க அக்கா வரும்'],
      'tell_her_bus_will_come', ['Reassure her.', '"Varum" = it will come.', 'Say: "Konjam kaathirunga akka, varum."'],
      ['சரி கண்ணு, வேற வழி இல்ல. காத்திருக்கேன்.', 'Sari kannu, vera vazhi illa. Kaathirukken.', 'Okay, dear, no other way. I will wait.'],
      ['வருமா வராதா கண்ணு?', 'Varumaa varaadhaa kannu?', 'Will it come or not, dear?']),
    S('sit', ['வெயில் வேற. உக்கார எடம் இல்ல.', 'Veyil vera. Ukkaara edam illa.', 'And the sun too. No place to sit.'],
      'Tell her to sit here.', ['Inga ukkaarunga akka.', 'இங்க உக்காருங்க அக்கா.'],
      ['inga ukkaarunga akka', 'akka inga ukkaarunga', 'inga ukkaaralaam akka', 'ukkaarunga akka inga', 'inga ukkaarunga paarunga', 'இங்க உக்காருங்க அக்கா', 'அக்கா இங்க உக்காருங்க'],
      'offer_her_a_seat', ['Offer a seat.', '"Ukkaarunga" = please sit.', 'Say: "Inga ukkaarunga akka."'],
      ['நன்றி கண்ணு. நீங்க நல்ல பொண்ணு.', 'Nandri kannu. Neenga nalla ponnu.', 'Thanks, dear. You are a good girl.'],
      ['எங்க உக்காரலாம்னு சொன்னீங்க?', 'Enga ukkaaralaamnu sonneenga?', 'Where did you say I can sit?']),
  ],
  outro: ['கடவுள் உங்களை காப்பாத்தட்டும் மீரா.', 'Kadavul ungalai kaappaatthattum Meera.', 'May God protect you, Meera.'],
  learned: [['konjam kaathirunga', 'please wait a little'], ['inga ukkaarunga', 'please sit here']],
  again: ['கண்ணு, பஸ் வந்துடுச்சா?', 'Kannu, bus vandhuduchaa?', 'Dear, has the bus come?'],
});

export const ballTeen = D('juhu-road-ball-teen', {
  name: 'Sanjay', role: 'teen with a ball', site: 'Open ground on the road to the beach', diff: 1,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Teen in a teal striped shirt and a sky-blue cap with a ball, standing around looking for a game.',
  goal: 'Say you will only watch.',
  steps: [
    S('game', ['யாராவது கூட விளையாட இல்லயா? நீங்க வர்றீங்களா?', 'Yaaraavadhu kooda vilaiyaada illayaa? Neenga varreengalaa?', 'No one to play with? Will you join?'],
      'Say you will only watch.', ['Naan aada maatten, paakkuren.', 'நான் ஆட மாட்டேன், பாக்கறேன்.'],
      ['naan aada maatten paakkuren', 'paakkuren thambi', 'naan paakka mattum', 'naan aada maatten', 'naan paathukittu irukken', 'நான் ஆட மாட்டேன் பாக்கறேன்', 'நான் பாக்கறேன் தம்பி'],
      'say_only_watching_game', ['Decline the game.', '"Aada maatten" = I will not play.', 'Say: "Naan aada maatten, paakkuren."'],
      ['சரி அக்கா, நீங்க ரெஃப்ரி ஆகிடுங்க!', 'Sari akka, neenga referee aagidunga!', 'Okay akka, be the referee!'],
      ['ஆடுவீங்களா மாட்டீங்களா அக்கா?', 'Aaduveengalaa maatteengalaa akka?', 'Will you play or not, akka?']),
  ],
  outro: ['நாளைக்கு நிச்சயம் ஆடுங்க அக்கா!', 'Naalaikku nichchayam aadunga akka!', 'Do play tomorrow, akka!'],
  learned: [['naan aada maatten', 'I will not play']],
  again: ['அக்கா, இன்னொரு மேட்ச்?', 'Akka, innoru match?', 'Akka, another match?'],
});

export const decoWoman = D('deco-office-woman', {
  name: 'Anjali', role: 'office-going woman', site: 'Marina art-deco block', diff: 1,
  voice: { rate: 1.2, pitch: 1.15 },
  persona: 'Woman in a white shirt with a purple lanyard, checking her watch and late for work.',
  goal: 'Tell her to run, there may still be time.',
  steps: [
    S('late', ['ஐயோ லேட்டாயிடுச்சு! பஸ் போயிருக்கும்!', 'Ayyo late-aayiduchu! Bus poyirukkum!', 'Oh no, I am late! The bus must have left!'],
      'Tell her to run, it may still be there.', ['Odunga akka, innum irukkum.', 'ஓடுங்க அக்கா, இன்னும் இருக்கும்.'],
      ['odunga akka innum irukkum', 'odunga akka', 'seekkiram odunga akka', 'akka odunga innum irukkum', 'odunga innum irukku akka', 'ஓடுங்க அக்கா இன்னும் இருக்கும்', 'ஓடுங்க அக்கா'],
      'tell_her_to_run_for_bus', ['Encourage her.', '"Odunga" = run.', 'Say: "Odunga akka, innum irukkum."'],
      ['நன்றி! ஓடிப் பாக்கறேன்! பை!', 'Nandri! Odip paakkaren! Bye!', 'Thanks! I will run and see! Bye!'],
      ['என்ன சொன்னீங்க? நேரம் இல்ல!', 'Enna sonneenga? Neram illa!', 'What did you say? No time!']),
  ],
  outro: ['நேரம் இல்ல, அப்புறம் பேசலாம்!', 'Neram illa, appuram pesalaam!', 'No time, we can talk later!'],
  learned: [['odunga akka', 'run, akka']],
  again: ['மேடம், மணி என்ன?', 'Madam, mani enna?', 'Madam, what is the time?'],
});

export const fieldKid = D('east-field-ball-kid', {
  name: 'Surya', role: 'kid with a ball', site: 'Open ground east', diff: 1,
  voice: { rate: 1.15, pitch: 1.4 },
  persona: 'Kid in a lilac shirt holding a ball and looking for friends.',
  goal: 'Tell him his friends will come, so wait.',
  steps: [
    S('friends', ['அக்கா, என் ஃப்ரெண்ட்ஸ் எங்க? யாரையும் காணோம்!', 'Akka, en friends enga? Yaaraiyum kaanom!', 'Akka, where are my friends? I cannot see anyone!'],
      'Tell him they will come, wait.', ['Varuvaanga thambi, kaathiru.', 'வருவாங்க தம்பி, காத்திரு.'],
      ['varuvaanga thambi kaathiru', 'varuvaanga kaathiru', 'kaathirunga thambi varuvaanga', 'konjam kaathiru varuvaanga', 'varuvaanga thambi', 'வருவாங்க தம்பி காத்திரு', 'வருவாங்க காத்திரு'],
      'tell_kid_friends_will_come', ['Reassure him.', '"Varuvaanga" = they will come.', 'Say: "Varuvaanga thambi, kaathiru."'],
      ['சரி அக்கா, இங்கயே நிக்கறேன்.', 'Sari akka, ingaye nikkaren.', 'Okay, akka, I will stay right here.'],
      ['வருவாங்களா இல்லையா அக்கா?', 'Varuvaangalaa illaiyaa akka?', 'Will they come or not, akka?']),
  ],
  outro: ['அவங்க வந்ததும் உங்களையும் கூப்பிடறேன்!', 'Avanga vandhadhum ungalaiyum kooppidaren!', 'When they come I will call you too!'],
  learned: [['varuvaanga, kaathiru', 'they will come, wait']],
  again: ['அக்கா, இன்னும் யாரும் வரல!', 'Akka, innum yaarum varala!', 'Akka, no one has come yet!'],
});

export const battingUncle = D('field-batting-uncle', {
  name: 'Doraisamy', role: 'uncle practising cricket', site: 'Open field', diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Man with grey hair and a thick moustache in a sand shirt, practising his batting stance alone with a bat.',
  goal: 'Praise his batting and encourage him to play again.',
  steps: [
    S('stance', ['பேட்டிங் பிராக்டிஸ் பண்றேன். ஸ்டான்ஸ் எப்படி?', 'Batting practice pannren. Stance eppadi?', 'I am practising batting. How is my stance?'],
      'Say he would bat great.', ['Neenga super-aa aaduveenga anna.', 'நீங்க சூப்பரா ஆடுவீங்க அண்ணா.'],
      ['neenga super-aa aaduveenga anna', 'super-aa aaduveenga anna', 'stance nalla irukku anna', 'neenga nalla aaduveenga', 'super stance anna', 'நீங்க சூப்பரா ஆடுவீங்க அண்ணா', 'சூப்பரா ஆடுவீங்க'],
      'praise_batting_stance', ['Praise his stance.', '"Aaduveenga" = you will play.', 'Say: "Neenga super-aa aaduveenga anna."'],
      ['ஹா ஹா! பழைய டீம்ல ஓப்பனர் தெரியுமா?', 'Haa haa! Pazhaiya team-la opener theriyumaa?', 'Ha ha! I was an opener in my old team, you know?'],
      ['ஸ்டான்ஸ் எப்படின்னு சொல்லுங்க.', 'Stance eppadinnu sollunga.', 'Tell me how the stance is.']),
    S('again', ['இப்போ வெறும் கனவு தான்! எல்லாம் பழைய கதை.', 'Ippo verum kanavu thaan! Ellaam pazhaiya kadhai.', 'Now it is just a dream! All old stories.'],
      'Tell him he can still play, come on.', ['Innum aadalaam, vaanga.', 'இன்னும் ஆடலாம், வாங்க.'],
      ['innum aadalaam vaanga', 'innum aadalaam anna', 'aadalaam anna vaanga', 'ippovum aadalaam anna', 'innum nalla aadalaam', 'இன்னும் ஆடலாம் வாங்க', 'இன்னும் ஆடலாம் அண்ணா'],
      'encourage_him_to_play', ['Encourage him.', '"Aadalaam" = we can play.', 'Say: "Innum aadalaam, vaanga."'],
      ['சரி! நாளைக்கு எல்லாரையும் கூட்டிட்டு வரேன்!', 'Sari! Naalaikku ellaaraiyum koottittu varen!', 'Okay! Tomorrow I will bring everyone along!'],
      ['ஆடலாமா வேணாமா அண்ணான்னு சொல்லுங்க.', 'Aadalaamaa venaamaa annannu sollunga.', 'Tell me whether we can play.']),
  ],
  outro: ['பேட் தூக்கறேன் மீரா, நீங்க பால் போடுவீங்களா?', 'Bat thookkaren Meera, neenga ball poduveengalaa?', 'I will lift the bat, Meera, will you bowl?'],
  learned: [['innum aadalaam', 'we can still play']],
  again: ['மேடம், ஒரு ஓவர் போடுங்களேன்!', 'Madam, oru over podungalaen!', 'Madam, bowl one over!'],
});

export const fieldPhoneWoman = D('field-phone-woman', {
  name: 'Sudha', role: 'woman on the phone', site: 'Open ground', diff: 1,
  voice: { rate: 1.1, pitch: 1.15 },
  persona: 'Woman in a lilac churidar top with specs, texting or on a call, a little distracted.',
  goal: 'Tell her to go ahead and talk.',
  steps: [
    S('call', ['மன்னிக்கணும், போன் வந்துடுச்சு. சொல்லுங்க.', 'Mannikkanum, phone vandhuduchu. Sollunga.', 'Sorry, a call came in. Go on, tell me.'],
      'Tell her to take her call.', ['Seri akka, neenga pesunga.', 'சரி அக்கா, நீங்க பேசுங்க.'],
      ['seri akka neenga pesunga', 'neenga pesunga akka', 'akka neenga phone-la pesunga', 'seri pesunga akka', 'paravaalla akka pesunga', 'சரி அக்கா நீங்க பேசுங்க', 'நீங்க பேசுங்க அக்கா'],
      'tell_her_to_take_call', ['Say it is fine.', '"Neenga pesunga" = you talk.', 'Say: "Seri akka, neenga pesunga."'],
      ['நன்றி கண்ணு. ஒரு நிமிஷத்துல வரேன்.', 'Nandri kannu. Oru nimishatthula varen.', 'Thanks, dear. I will be back in a minute.'],
      ['என்ன சொன்னீங்க? ஹலோ?', 'Enna sonneenga? Hello?', 'What did you say? Hello?']),
  ],
  outro: ['சாரி கண்ணு, வேலை போன் தான்.', 'Sorry kannu, velai phone thaan.', 'Sorry, dear, it was a work call.'],
  learned: [['neenga pesunga', 'you go ahead and talk']],
  again: ['மேடம், இப்போ சொல்லுங்க.', 'Madam, ippo sollunga.', 'Madam, tell me now.'],
});

export const backpackTeen = D('north-field-backpacker-teen', {
  name: 'Adithya', role: 'teen with a backpack', site: 'Open ground north of the city', diff: 2,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Teen in a mint checked shirt and specs with a backpack, standing around bored and exploring.',
  goal: 'Recommend Marina Beach and what to eat there.',
  steps: [
    S('go', ['எனக்கு போரடிக்குது. சுத்தி பாக்க எங்க போகலாம்?', 'Enakku poradikkudhu. Suthi paakka enga pogalaam?', 'I am bored. Where can I go sightseeing?'],
      'Recommend Marina Beach.', ['Marina beach-ku ponga, super-aa irukkum.', 'மெரினா பீச்சுக்கு போங்க, சூப்பரா இருக்கும்.'],
      ['marina beach-ku ponga super-aa irukkum', 'marina beach-ku ponga', 'beach-ku ponga thambi', 'marina beach poga super-aa irukkum', 'marina beach romba nalla irukkum', 'மெரினா பீச்சுக்கு போங்க சூப்பரா இருக்கும்', 'மெரினா பீச்சுக்கு போங்க'],
      'recommend_marina_beach', ['Suggest a place.', '"Ponga" = please go.', 'Say: "Marina beach-ku ponga, super-aa irukkum."'],
      ['சூப்பர் ஐடியா! அங்க என்ன ஸ்பெஷல்?', 'Super idea! Anga enna special?', 'Great idea! What is special there?'],
      ['எங்க போகணும்னு சொல்லுங்க அக்கா.', 'Enga poganumnu sollunga akka.', 'Tell me where to go, akka.']),
    S('special', ['அங்க என்ன சாப்பிடலாம்?', 'Anga enna saappidalaam?', 'What can I eat there?'],
      'Say sundal, bajji and jigarthanda.', ['Sundal, bajji, jigarthanda ellaam irukku.', 'சுண்டல், பஜ்ஜி, ஜிகர்தண்டா எல்லாம் இருக்கு.'],
      ['sundal bajji jigarthanda ellaam irukku', 'sundal bajji jigarthanda irukku', 'sundal bajji jigarthanda saappidunga', 'ellaam irukku sundal bajji jigarthanda', 'sundal jigarthanda bajji super', 'சுண்டல் பஜ்ஜி ஜிகர்தண்டா எல்லாம் இருக்கு', 'சுண்டல் பஜ்ஜி ஜிகர்தண்டா இருக்கு'],
      'list_beach_foods', ['Name some foods.', 'Sundal, bajji, jigarthanda.', 'Say: "Sundal, bajji, jigarthanda ellaam irukku."'],
      ['வாவ்! எல்லாமே ட்ரை பண்ணப்போறேன்!', 'Wow! Ellaamae try pannapporen!', 'Wow! I will try everything!'],
      ['என்ன சாப்பிடலாம்னு சொல்லுங்க.', 'Enna saappidalaamnu sollunga.', 'Tell me what to eat.']),
  ],
  outro: ['நன்றி அக்கா! இப்பவே கிளம்பறேன்!', 'Nandri akka! Ippave kilambaren!', 'Thanks, akka! I am leaving right now!'],
  learned: [['Marina beach-ku ponga', 'go to Marina Beach'], ['ellaam irukku', 'there is everything']],
  again: ['அக்கா, இன்னும் ஏதாவது இடம் இருக்கா?', 'Akka, innum edhaavadhu idam irukkaa?', 'Akka, any other place?'],
});

export const peanutSeller = D('beach-road-peanut-seller', {
  name: 'Kuppan', role: 'peanut seller', site: 'Road to the beach', diff: 1,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Man in a cream vest and a white cap with a basket of peanuts, scooping them into paper cones.',
  goal: 'Ask for one cone of peanuts.',
  steps: [
    S('cone', ['வேர்க்கடலை! சூடா வேர்க்கடலை! கொஞ்சம் வாங்கறீங்களா?', 'Verkkadalai! Soodaa verkkadalai! Konjam vaangareengalaa?', 'Peanuts! Hot peanuts! Will you buy some?'],
      'Ask for one cone.', ['Oru cone kudunga anna.', 'ஒரு கோன் கொடுங்க அண்ணா.'],
      ['oru cone kudunga anna', 'oru cone kudunga', 'oru cone venum anna', 'verkkadalai oru cone kudunga', 'oru cone podunga anna', 'ஒரு கோன் கொடுங்க அண்ணா', 'வேர்க்கடலை ஒரு கோன் கொடுங்க'],
      'order_peanut_cone', ['Ask for a cone.', '"Cone" is the same word.', 'Say: "Oru cone kudunga anna."'],
      ['இந்தாங்க, பத்து ரூபா. கடல் காத்துல சாப்பிடுங்க!', 'Indhaanga, patthu rubaa. Kadal kaatthula saappidunga!', 'Here, ten rupees. Eat it in the sea breeze!'],
      ['எத்தனை கோன் வேணும் மேடம்?', 'Etthanai cone venum madam?', 'How many cones do you want, madam?']),
  ],
  outro: ['கடற்கரைல கடலை இல்லாம எப்படி மீரா!', 'Kadarkaraila kadalai illaama eppadi Meera!', 'How can a beach have no peanuts, Meera!'],
  learned: [['oru cone kudunga', 'give me one cone']],
  again: ['மேடம், கடலை சூடா இருக்கு, வாங்குங்க!', 'Madam, kadalai soodaa irukku, vaangunga!', 'Madam, the peanuts are hot, buy some!'],
});

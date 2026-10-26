// Mylapore tiled houses and the housing-board lanes: thinnai verandahs, the street tap, kolams at the door.
import { dialogue as D, step as S } from '../kit.js';

export const carromMan = D('chawl-carrom-man', {
  name: 'Kathir', role: 'carrom player', site: 'Mylapore tiled house, thinnai verandah', diff: 2,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Man in a sleeveless vest seated on the thinnai flicking the carrom striker with one finger.',
  goal: 'Say you cannot play carrom, then agree to try.',
  steps: [
    S('invite', ['கேரம் ஆடுவீங்களா மேடம்? ஒரு கேம் வாங்க!', 'Carrom aaduveengalaa madam? Oru game vaanga!', 'Will you play carrom, madam? Come for one game!'],
      'Say you do not know carrom and ask him to teach you.', ['Enakku carrom theriyaadhu, solli kudunga.', 'எனக்கு கேரம் தெரியாது, சொல்லிக் கொடுங்க.'],
      ['enakku carrom theriyaadhu solli kudunga', 'carrom theriyaadhu anna', 'carrom solli kudunga anna', 'enakku carrom theriyaadhu', 'carrom aada theriyaadhu solli kudunga', 'எனக்கு கேரம் தெரியாது சொல்லிக் கொடுங்க', 'கேரம் தெரியாது அண்ணா'],
      'say_cannot_play_carrom', ['Say you do not know the game.', '"Theriyaadhu" = I do not know.', 'Say: "Enakku carrom theriyaadhu, solli kudunga."'],
      ['சரி, ஸ்ட்ரைக்கர விரலால தட்டுங்க. இப்படி!', 'Sari, striker-a viralaala thattunga. Ippadi!', 'Okay, flick the striker with your finger. Like this!'],
      ['கேரம் ஆடுவீங்களா மாட்டீங்களா?', 'Carrom aaduveengalaa maatteengalaa?', 'Will you play carrom or not?']),
    S('try', ['இந்த காய்ன குழில போடணும். முயற்சி பண்ணுங்க.', 'Indha coin-a kuzhila podanum. Muyarchi pannunga.', 'You have to pot this coin in the hole. Give it a try.'],
      'Say okay, you will try.', ['Seri, naan try pannuren.', 'சரி, நான் ட்ரை பண்றேன்.'],
      ['seri naan try pannuren', 'naan try pannuren', 'seri try pannalaam', 'naan muyarchi pannuren', 'seri anna naan try pannuren', 'சரி நான் ட்ரை பண்றேன்', 'நான் ட்ரை பண்றேன் அண்ணா'],
      'say_will_try_carrom', ['Say you will try.', '"Try pannuren" = I will try.', 'Say: "Seri, naan try pannuren."'],
      ['ஆஹா! குழிக்குள்ள போச்சு! பிகினர்ஸ் லக்!', 'Aaha! Kuzhikkulla pochu! Beginners luck!', 'Wow! It went in! Beginner luck!'],
      ['முயற்சி பண்றீங்களா, இல்லையா?', 'Muyarchi pannureengalaa, illaiyaa?', 'Will you try or not?']),
  ],
  outro: ['நாளைக்கும் வாங்க மேடம், இன்னும் கத்துத்தரேன்!', 'Naalaikkum vaanga madam, innum katthutharen!', 'Come tomorrow too, madam, I will teach you more!'],
  learned: [['enakku carrom theriyaadhu', 'I do not know carrom'], ['naan try pannuren', 'I will try']],
  again: ['மேடம், இன்னொரு கேம் ஆடலாமா?', 'Madam, innoru game aadalaamaa?', 'Madam, shall we play another game?'],
});

export const carromElder = D('chawl-carrom-elder', {
  name: 'Annamalai Thaatha', role: 'elder carrom player', site: 'Mylapore tiled house, thinnai verandah', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Old man in a white veshti with vibhuti bars, playing carrom slowly and teasing his opponent.',
  goal: 'Say you are on his side.',
  steps: [
    S('side', ['என்கிட்ட தோத்துடுவான் இவன்! நீங்க யாருக்கு சப்போர்ட்?', 'Enkitta thothuduvaan ivan! Neenga yaarukku support?', 'He will lose to me! Whose side are you on?'],
      'Say you are on his side.', ['Naan ungalukku thaan thaatha.', 'நான் உங்களுக்குத்தான் தாத்தா.'],
      ['naan ungalukku thaan thaatha', 'naan ungalukku support thaatha', 'ungalukku thaan thaatha', 'thaatha naan ungal pakkam', 'naan ungal side thaan', 'நான் உங்களுக்குத்தான் தாத்தா', 'நான் உங்க பக்கம் தாத்தா'],
      'support_elder_in_carrom', ['Pick his side.', '"Ungalukku thaan" = only for you.', 'Say: "Naan ungalukku thaan thaatha."'],
      ['பாத்தியாடா! நல்ல பொண்ணு! இந்தாங்க, ஒரு முறுக்கு சாப்பிடுங்க.', 'Paatthiyaadaa! Nalla ponnu! Indhaanga, oru murukku saappidunga.', 'See, boy! A good girl! Here, have a murukku.'],
      ['யார் பக்கம்னு சொல்லுங்க கண்ணு.', 'Yaar pakkamnu sollunga kannu.', 'Tell me whose side, dear.']),
  ],
  outro: ['நல்லா இருங்க மீரா, ஆசீர்வாதம்!', 'Nallaa irunga Meera, aaseervaadham!', 'Be well, Meera, blessings!'],
  learned: [['naan ungalukku thaan', 'I am only for you']],
  again: ['கண்ணு, வந்து பாத்துட்டு போங்க!', 'Kannu, vandhu paatthuttu ponga!', 'Dear, come watch the game!'],
});

export const tapWoman = D('chawl-tap-woman', {
  name: 'Sumathi', role: 'woman at the street tap', site: 'Housing-board flats, common tap', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Woman in a magenta saree with steel pots, waiting in the water queue and chatting idly about the lorry-water timing.',
  goal: 'Agree it has been a long wait and say you have not tried the filter coffee here yet.',
  steps: [
    S('wait', ['லாரி தண்ணி இன்னும் வரல. ரொம்ப நேரம் ஆச்சு.', 'Lorry thanni innum varala. Romba neram aachu.', 'The lorry water has not come yet. It has been a long time.'],
      'Agree it has been a long time.', ['Aamaa akka, romba neram aachu.', 'ஆமா அக்கா, ரொம்ப நேரம் ஆச்சு.'],
      ['aamaa akka romba neram aachu', 'romba neram aachu akka', 'aamaa romba neram aachu', 'neram aachu akka', 'seekkiram varum akka', 'ஆமா அக்கா ரொம்ப நேரம் ஆச்சு', 'ரொம்ப நேரம் ஆச்சு அக்கா'],
      'agree_long_wait', ['Sympathise with her.', '"Romba neram aachu" = it has been very long.', 'Say: "Aamaa akka, romba neram aachu."'],
      ['என்ன பண்றது கண்ணு? சென்னைல இதெல்லாம் சகஜம்.', 'Enna pannradhu kannu? Chennai-la idhellaam sagajam.', 'What to do, dear? This is normal in Chennai.'],
      ['என்னம்மா சொன்னீங்க? சத்தத்துல கேக்கல.', 'Ennammaa sonneenga? Saththathula kekkala.', 'What did you say, dear? I could not hear over the noise.']),
    S('coffee', ['இந்த தெரு டீக்கடை ஃபில்டர் காபி சூப்பரா இருக்கும். குடிச்சீங்களா?', 'Indha theru teakadai filter coffee superaa irukkum. Kudichcheengalaa?', 'The filter coffee at this street tea kadai is great. Have you had it?'],
      'Say you have not had it yet.', ['Innum illa akka, kudikkanum.', 'இன்னும் இல்ல அக்கா, குடிக்கணும்.'],
      ['innum illa akka kudikkanum', 'innum kudikkala akka', 'innum illa kudikkanum', 'innum kudichchadhu illa', 'ippo thaan kudikka poren', 'இன்னும் இல்ல அக்கா குடிக்கணும்', 'இன்னும் குடிக்கல அக்கா'],
      'say_not_had_filter_coffee', ['Say not yet.', '"Innum illa" = not yet.', 'Say: "Innum illa akka, kudikkanum."'],
      ['அப்போ உடனே போங்க! முருகன் அண்ணன் கடை சூப்பர்.', 'Appo udane ponga! Murugan annan kadai super.', 'Then go right away! Murugan Anna shop is great.'],
      ['குடிச்சீங்களா இல்லையா கண்ணு?', 'Kudichcheengalaa illaiyaa kannu?', 'Have you had it or not, dear?']),
  ],
  outro: ['காபி குடிச்சிட்டு வந்து சொல்லுங்க மீரா!', 'Coffee kudichittu vandhu sollunga Meera!', 'Drink the coffee and come tell me, Meera!'],
  learned: [['romba neram aachu', 'it has been a long time'], ['innum illa', 'not yet']],
  again: ['கண்ணு, தண்ணி வந்துடுச்சா பாருங்க!', 'Kannu, thanni vandhuduchaa paarunga!', 'Dear, see if the water has come!'],
});

export const grandmaStep = D('chawl-grandma-doorstep', {
  name: 'Kamala Paati', role: 'grandmother on the doorstep', site: 'Mylapore tiled house, thinnai step', diff: 1,
  voice: { rate: 0.85, pitch: 1.2 },
  persona: 'Grandmother with specs seated on the step with a fresh kolam at her feet, watching the lane.',
  goal: 'Thank her and say you will sit.',
  steps: [
    S('sit', ['கோலம் போட்டாச்சு. வாங்க கண்ணு, திண்ணைல உக்காருங்க.', 'Kolam pottaachu. Vaanga kannu, thinnaila ukkaarunga.', 'The kolam is done. Come, dear, sit on the thinnai.'],
      'Thank her and say you will sit.', ['Nandri paati, naan ukkaaren.', 'நன்றி பாட்டி, நான் உக்காறேன்.'],
      ['nandri paati naan ukkaaren', 'nandri paati ukkaaren', 'paati naan ukkaaren', 'seri paati ukkaaren', 'nandri paati', 'நன்றி பாட்டி நான் உக்காறேன்', 'நன்றி பாட்டி'],
      'thank_and_sit', ['Thank her politely.', '"Ukkaaren" = I will sit.', 'Say: "Nandri paati, naan ukkaaren."'],
      ['மோர் குடிக்கறீங்களா? வெயில்ல வந்தீங்க, இல்லையா?', 'Mor kudikkareengalaa? Veyilla vandheenga, illaiyaa?', 'Will you drink buttermilk? You came in the sun, did you not?'],
      ['என்ன சொன்னீங்க கண்ணு? காது கொஞ்சம் மந்தம்.', 'Enna sonneenga kannu? Kaadhu konjam mandham.', 'What did you say, dear? My ears are a bit dull.']),
  ],
  outro: ['மோர் குடிச்சிட்டு போங்க மீரா, தாகம் தீரும்.', 'Mor kudichittu ponga Meera, thaagam theerum.', 'Drink buttermilk before you go, Meera, it quenches thirst.'],
  learned: [['nandri paati', 'thank you, grandmother']],
  again: ['கண்ணு, திரும்ப வந்தீங்களா? உக்காருங்க!', 'Kannu, thirumba vandheengalaa? Ukkaarunga!', 'Dear, you came back? Sit down!'],
});

export const laneSweeper = D('chawl-lane-sweeper', {
  name: 'Selvi', role: 'lane sweeper', site: 'Mylapore lanes, under the laundry line', diff: 1,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Woman in a green saree with a broom, sweeping the lane clean of fallen leaves.',
  goal: 'Tell her she works hard.',
  steps: [
    S('hard', ['தெரு பூரா இலை! காலைல இருந்து கூட்டிட்டே இருக்கேன்.', 'Theru poora ilai! Kaalaila irundhu koottitte irukken.', 'The whole lane is full of leaves! I have been sweeping since morning.'],
      'Say she works very hard.', ['Neenga romba kashtappadureenga akka.', 'நீங்க ரொம்ப கஷ்டப்படுறீங்க அக்கா.'],
      ['neenga romba kashtappadureenga akka', 'romba kashtappadureenga akka', 'kashtam thaan akka', 'neenga romba kashtappadureenga', 'akka romba kashtam', 'நீங்க ரொம்ப கஷ்டப்படுறீங்க அக்கா', 'ரொம்ப கஷ்டப்படுறீங்க'],
      'say_she_works_hard', ['Be kind about her work.', '"Kashtappadureenga" = you toil.', 'Say: "Neenga romba kashtappadureenga akka."'],
      ['நன்றி கண்ணு. யாராவது புரிஞ்சுக்கிட்டா சந்தோஷம்.', 'Nandri kannu. Yaaraavadhu purinjukkittaa santhosham.', 'Thanks, dear. It makes me happy when someone understands.'],
      ['என்ன சொல்றீங்க? விளக்கமா சொல்லுங்க.', 'Enna solreenga? Vilakkamaa sollunga.', 'What are you saying? Explain properly.']),
  ],
  outro: ['உங்க வேலை நல்லா நடக்கட்டும் மீரா!', 'Unga velai nallaa nadakkattum Meera!', 'May your work go well, Meera!'],
  learned: [['romba kashtappadureenga', 'you work very hard']],
  again: ['கண்ணு, கொஞ்சம் தள்ளி நில்லுங்க, கூட்டணும்.', 'Kannu, konjam thalli nillunga, koottanum.', 'Dear, stand aside a little, I need to sweep.'],
});

export const gossipAunty = D('lane-aunty-gossip', {
  name: 'Revathi', role: 'gossiping woman', site: 'Open ground by a housing-board block', diff: 2,
  voice: { rate: 1.15, pitch: 1.15 },
  persona: 'Woman in a sky-blue saree gesturing as she tells a story, always the first to know the news.',
  goal: 'React to the news and ask if you may attend the wedding feast.',
  steps: [
    S('news', ['கேட்டீங்களா? பக்கத்து வீட்டு கல்யாணம் நாளைக்கு!', 'Ketteengalaa? Pakkathu veettu kalyaanam naalaikku!', 'Did you hear? The neighbour wedding is tomorrow!'],
      'Say, really? You did not know.', ['Appadiyaa? Enakku theriyaadhu.', 'அப்படியா? எனக்கு தெரியாது.'],
      ['appadiyaa enakku theriyaadhu', 'appadiyaa theriyaadhu', 'enakku theriyaadhu akka', 'appadiyaa naalaikku thaanaa', 'appadiyaa akka', 'அப்படியா எனக்கு தெரியாது', 'அப்படியா அக்கா'],
      'react_to_wedding_news', ['React with surprise.', '"Appadiyaa?" = is that so?', 'Say: "Appadiyaa? Enakku theriyaadhu."'],
      ['ஆமா! நாளைக்கு காலைல முகூர்த்தம். பந்தல் போட்டாச்சு!', 'Aamaa! Naalaikku kaalaila muhoortham. Pandhal pottaachu!', 'Yes! The ceremony is tomorrow morning. The pandal is up!'],
      ['என்ன சொன்னீங்க? தெரியுமா தெரியாதா?', 'Enna sonneenga? Theriyumaa theriyaadhaa?', 'What did you say? Do you know or not?']),
    S('feast', ['வாங்களேன், வாழை இலை சாப்பாடு இருக்கு, சாம்பார் சூப்பர்!', 'Vaangalaen, vaazhai ilai saappaadu irukku, saambaar super!', 'Do come, there is a banana-leaf meal, the sambar is superb!'],
      'Ask if you will get a meal if you come.', ['Naan vandhaa saappaadu kidaikkumaa?', 'நான் வந்தா சாப்பாடு கிடைக்குமா?'],
      ['naan vandhaa saappaadu kidaikkumaa', 'saappaadu kidaikkumaa akka', 'naan vandhaa saappadalaamaa', 'vandhaa saappaadu irukkumaa', 'naan varalaamaa akka', 'நான் வந்தா சாப்பாடு கிடைக்குமா', 'சாப்பாடு கிடைக்குமா அக்கா'],
      'ask_about_wedding_feast', ['Ask about the food.', '"Kidaikkumaa?" = will I get it?', 'Say: "Naan vandhaa saappaadu kidaikkumaa?"'],
      ['நிச்சயமா! விருந்தாளிக்கு முதல் இலை!', 'Nichchayamaa! Virundhaalikku mudhal ilai!', 'Certainly! The first leaf goes to the guest!'],
      ['சாப்பாடு பத்தி கேக்கறீங்களா?', 'Saappaadu patthi kekkareengalaa?', 'Asking about the food?']),
  ],
  outro: ['கல்யாணத்துல சந்திக்கலாம் மீரா!', 'Kalyaanathula sandhikkalaam Meera!', 'See you at the wedding, Meera!'],
  learned: [['appadiyaa?', 'is that so?'], ['saappaadu kidaikkumaa?', 'will I get food?']],
  again: ['மீரா, இன்னொரு விஷயம் கேளுங்க!', 'Meera, innoru vishayam kelunga!', 'Meera, hear one more thing!'],
});

export const vegWoman = D('chawl-lane-vegetable-woman', {
  name: 'Rukmani Paati', role: 'vegetable woman', site: 'Lane near a housing-board block', diff: 2,
  voice: { rate: 0.95, pitch: 1.2 },
  persona: 'Gossipy older woman with a bag of vegetables, always ready to suggest what to put in the sambar.',
  goal: 'Ask for drumsticks for the sambar.',
  steps: [
    S('sambar', ['முருங்கைக்காய், கத்திரிக்காய்... சாம்பாருக்கு எது வேணும்?', 'Murungaikkaai, kathirikkaai... Saambaarukku edhu venum?', 'Drumsticks, brinjal... which do you need for sambar?'],
      'Ask for drumsticks.', ['Murungaikkaai kudunga paati.', 'முருங்கைக்காய் கொடுங்க பாட்டி.'],
      ['murungaikkaai kudunga paati', 'murungaikkaai venum paati', 'paati murungaikkaai podunga', 'murungaikkaai kudunga', 'sambar-ku murungaikkaai kudunga', 'முருங்கைக்காய் கொடுங்க பாட்டி', 'முருங்கைக்காய் வேணும் பாட்டி'],
      'ask_for_drumsticks', ['Pick a vegetable.', '"Murungaikkaai" = drumstick.', 'Say: "Murungaikkaai kudunga paati."'],
      ['நல்ல தேர்வு! முருங்கை போட்டா சாம்பார் மணக்கும்!', 'Nalla thervu! Murungai pottaa saambaar manakkum!', 'Good choice! Sambar smells wonderful with drumstick!'],
      ['எந்த காய்னு சொல்லுங்க கண்ணு.', 'Endha kaainu sollunga kannu.', 'Tell me which vegetable, dear.']),
  ],
  outro: ['சாம்பார் வெச்சு சாப்பிட்டு எனக்கும் சொல்லுங்க!', 'Saambaar vechchu saappittu enakkum sollunga!', 'Make sambar, eat it and tell me too!'],
  learned: [['murungaikkaai kudunga', 'give me drumsticks']],
  again: ['கண்ணு, கத்திரிக்காயும் எடுத்துக்கோங்க!', 'Kannu, kathirikkaaiyum eduthukkonga!', 'Dear, take some brinjal too!'],
});

export const milkman = D('chawl-lane-milkman', {
  name: 'Ayyappan', role: 'milkman', site: 'Lane near a housing-board block', diff: 2,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Milkman in a sky-blue cap with a metal can, finishing his morning round and waving at everyone.',
  goal: 'Ask for a litre of milk and ask him to come again tomorrow.',
  steps: [
    S('milk', ['மேடம், ஃப்ரெஷ் பால் வேணுமா? இப்பதான் கறந்தது.', 'Madam, fresh paal venumaa? Ippadhaan karandhadhu.', 'Madam, want fresh milk? Just drawn.'],
      'Ask for one litre of milk.', ['Oru litre paal kudunga.', 'ஒரு லிட்டர் பால் கொடுங்க.'],
      ['oru litre paal kudunga', 'oru litre paal venum', 'anna oru litre paal kudunga', 'litre paal kudunga', 'oru litre paal podunga', 'ஒரு லிட்டர் பால் கொடுங்க', 'ஒரு லிட்டர் பால் வேணும்'],
      'ask_one_litre_milk', ['Say how much milk.', '"Paal" = milk. "Litre" is the same.', 'Say: "Oru litre paal kudunga."'],
      ['இந்தாங்க, கெட்டி பால். நாற்பது ரூபா.', 'Indhaanga, getti paal. Naarpadhu rubaa.', 'Here, thick milk. Forty rupees.'],
      ['எவ்வளவு பால் வேணும்? சொல்லுங்க.', 'Evvalavu paal venum? Sollunga.', 'How much milk do you want? Tell me.']),
    S('again', ['நாளைக்கும் கொண்டு வரவா? இந்த லேனுக்கு தினமும் வருவேன்.', 'Naalaikkum kondu varavaa? Indha lane-ukku dhinamum varuven.', 'Shall I bring it tomorrow too? I come to this lane daily.'],
      'Ask him to bring it tomorrow too.', ['Naalaikkum kondu vaanga.', 'நாளைக்கும் கொண்டு வாங்க.'],
      ['naalaikkum kondu vaanga', 'naalaikkum vaanga anna', 'naalaikkum paal kondu vaanga', 'dhinamum kondu vaanga', 'naalaikku kandippaa vaanga', 'நாளைக்கும் கொண்டு வாங்க', 'தினமும் கொண்டு வாங்க'],
      'ask_milk_tomorrow', ['Ask him to come again.', '"Naalaikkum" = tomorrow also.', 'Say: "Naalaikkum kondu vaanga."'],
      ['சரி மேடம், காலைல ஆறு மணிக்கு வரேன்.', 'Sari madam, kaalaila aaru manikku varen.', 'Okay madam, I will come at six in the morning.'],
      ['நாளைக்கு வேணுமா வேணாமா?', 'Naalaikku venumaa venaamaa?', 'Do you want it tomorrow or not?']),
  ],
  outro: ['தினமும் ஃபில்டர் காபிக்கு என் பால் தான் மீரா!', 'Dhinamum filter coffee-kku en paal thaan Meera!', 'My milk is the best for daily filter coffee, Meera!'],
  learned: [['oru litre paal kudunga', 'give me one litre of milk'], ['naalaikkum kondu vaanga', 'bring it tomorrow too']],
  again: ['மேடம், இன்னும் பால் வேணுமா?', 'Madam, innum paal venumaa?', 'Madam, more milk?'],
});

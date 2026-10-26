// Fort St. George grounds: the boat-ride booth and jetty, the pigeon-feeding mat, the bus stop, the footpath; Chepauk Palace gate.
import { dialogue as D, step as S } from '../kit.js';

export const ferryClerk = D('gateway-ferry-clerk', {
  name: 'Jegan', role: 'boat-ride booth clerk', site: 'Fort St. George grounds, boat-ride booth', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Thin clerk in a striped shirt behind the booth window, tearing tickets.',
  goal: 'Buy two boat tickets and agree to wait for the next boat.',
  steps: [
    S('tickets', ['படகு டிக்கெட்? எத்தனை பேர் மேடம்?', 'Padagu ticket? Etthanai per madam?', 'Boat tickets? How many people, madam?'],
      'Ask for two tickets.', ['Rendu ticket kudunga saar.', 'ரெண்டு டிக்கெட் கொடுங்க சார்.'],
      ['rendu ticket kudunga saar', 'rendu ticket kudunga', 'saar rendu ticket venum', 'rendu padagu ticket kudunga', 'two ticket kudunga saar', 'ரெண்டு டிக்கெட் கொடுங்க சார்', 'ரெண்டு டிக்கெட் வேணும்'],
      'buy_two_boat_tickets', ['Say how many tickets.', 'Two = "rendu".', 'Say: "Rendu ticket kudunga saar."'],
      ['இந்தாங்க, நூறு ரூபா மேடம்.', 'Indhaanga, nooru rubaa madam.', 'Here you are, a hundred rupees, madam.'],
      ['எத்தனை டிக்கெட்? க்யூ நீளுது.', 'Etthanai ticket? Queue neeludhu.', 'How many tickets? The queue is growing.']),
    S('wait', ['அடுத்த படகு பதினோரு மணிக்கு. கொஞ்சம் பொறுங்க.', 'Adutha padagu pathinoru manikku. Konjam porunga.', 'The next boat is at eleven. Please wait a little.'],
      'Say okay, you will wait.', ['Seri saar, kaathirukken.', 'சரி சார், காத்திருக்கேன்.'],
      ['seri saar kaathirukken', 'kaathirukken saar', 'seri kaathirukkaren', 'paravaalla saar kaathirukken', 'seri porumaiyaa irukken', 'சரி சார் காத்திருக்கேன்', 'காத்திருக்கேன் சார்'],
      'agree_to_wait_for_boat', ['Agree to wait.', '"Kaathirukken" = I will wait.', 'Say: "Seri saar, kaathirukken."'],
      ['நன்றி மேடம். அதுக்குள்ள கோட்டைய சுத்தி பாருங்க.', 'Nandri madam. Adhukkulla kottaiya suthi paarunga.', 'Thanks, madam. Meanwhile look around the fort.'],
      ['காத்திருப்பீங்களா மேடம்?', 'Kaathiruppeengalaa madam?', 'Will you wait, madam?']),
  ],
  outro: ['படகு சவாரி நல்லா இருக்கும் மீரா, என்ஜாய்!', 'Padagu savaari nallaa irukkum Meera, enjoy!', 'The boat ride will be great, Meera, enjoy!'],
  learned: [['rendu ticket kudunga', 'give me two tickets'], ['kaathirukken', 'I will wait']],
  again: ['மேடம், இன்னும் டிக்கெட் வேணுமா?', 'Madam, innum ticket venumaa?', 'Madam, more tickets?'],
});

export const palaceDoorman = D('taj-doorman', {
  name: 'Rajendran', role: 'Chepauk Palace gate attendant', site: 'Chepauk Palace entrance', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Tall attendant in a cream long coat with a maroon sash, greeting visitors with a little bow and pointing them to the gate office.',
  goal: 'Say you will go to the gate office.',
  steps: [
    S('gate', ['வாங்க மேடம், கேட் ஆபீஸ் அந்த பக்கம்.', 'Vaanga madam, gate office andha pakkam.', 'Welcome, madam, the gate office is that way.'],
      'Say okay, you will go that way.', ['Seri saar, andha pakkam poren.', 'சரி சார், அந்த பக்கம் போறேன்.'],
      ['seri saar andha pakkam poren', 'andha pakkam poren saar', 'seri poren saar', 'gate office andha pakkamaa seri', 'nandri saar andha pakkam poren', 'சரி சார் அந்த பக்கம் போறேன்', 'அந்த பக்கம் போறேன் சார்'],
      'say_will_go_to_gate_office', ['Say you will go there.', '"Andha pakkam poren" = I will go that way.', 'Say: "Seri saar, andha pakkam poren."'],
      ['நன்றி மேடம். அரண்மனை உள்ள பாக்க ரொம்ப அழகு!', 'Nandri madam. Aranmanai ulla paakka romba azhagu!', 'Thank you, madam. The palace is lovely inside!'],
      ['எங்க போறீங்கன்னு சொல்லுங்க மேடம்.', 'Enga poreenganu sollunga madam.', 'Tell me where you are going, madam.']),
  ],
  outro: ['சிவப்பு செங்கல், வெள்ளை வளைவு... படம் எடுங்க மீரா!', 'Sivappu sengal, vellai valaivu... padam edunga Meera!', 'Red brick, white arches... take pictures, Meera!'],
  learned: [['andha pakkam poren', 'I will go that way']],
  again: ['மேடம், வழி தெரியுதா?', 'Madam, vazhi theriyudhaa?', 'Madam, do you know the way?'],
});

export const palaceBellboy = D('taj-bellboy', {
  name: 'Ashok', role: 'Chepauk Palace guesthouse attendant', site: 'Chepauk Palace entrance', diff: 1,
  voice: { rate: 1.0, pitch: 0.95 },
  persona: 'Attendant in a maroon cap with a maroon towel, waiting to carry bags for arriving guests, with a little bow.',
  goal: 'Say you have only a small bag, so no help is needed.',
  steps: [
    S('bags', ['மேடம், பைகள் இருந்தா சொல்லுங்க, நான் தூக்கறேன்.', 'Madam, baigal irundhaa sollunga, naan thookkaren.', 'Madam, tell me if you have bags, I will carry them.'],
      'Say your bag is small, no problem.', ['Paravaalla, en bag chinnadhu thaan.', 'பரவாயில்ல, என் பேக் சின்னது தான்.'],
      ['paravaalla en bag chinnadhu thaan', 'en bag chinnadhu thaan', 'bag chinnadhu venaam anna', 'paravaalla bag chinnadhu', 'illa anna bag chinnadhu', 'பரவாயில்ல என் பேக் சின்னது தான்', 'என் பேக் சின்னது தான்'],
      'say_bag_is_small', ['Say you do not need help.', '"Chinnadhu" = small.', 'Say: "Paravaalla, en bag chinnadhu thaan."'],
      ['சரி மேடம். வேணும்னா சொல்லுங்க, நான் இங்கதான்.', 'Sari madam. Venumnaa sollunga, naan ingadhaan.', 'Okay, madam. Tell me if you need, I am right here.'],
      ['பை பத்தி சொல்லுங்க மேடம்.', 'Bai patthi sollunga madam.', 'Tell me about your bag, madam.']),
  ],
  outro: ['நல்லா சுத்தி பாருங்க மேடம், வரவேற்கிறோம்!', 'Nallaa suthi paarunga madam, varavetkirom!', 'Have a good look around, madam, welcome!'],
  learned: [['en bag chinnadhu thaan', 'my bag is small']],
  again: ['மேடம், ஏதாவது உதவி வேணுமா?', 'Madam, edhaavadhu udhavi venumaa?', 'Madam, any help needed?'],
});

export const touristA = D('gateway-tourist-a', {
  name: 'Tom', role: 'foreign tourist', site: 'Fort St. George grounds, by the old gate', diff: 2, lang: 'en',
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Tourist in a pink floral shirt photographing the fort wall and the tall flagstaff. Speaks only English.',
  goal: 'Tell him what this old fort is.',
  steps: [
    S('what', 'Excuse me, what is this old fort? And why is the flagstaff so tall?',
      'Tell him it is Fort St. George, the old fort.', ['It is Fort St. George, the old fort of Chennai.', 'It is Fort St. George, the old fort of Chennai.'],
      ['it is fort st george the old fort of chennai', 'this is fort st george an old british fort', 'it is fort st george where chennai began', 'that is fort st george the old fort', 'this old fort is fort st george', 'it is the old fort called fort st george'],
      'explain_fort_st_george', ['Name the fort.', 'Say: Fort St. George.', 'Say: "It is Fort St. George, the old fort of Chennai."'],
      'Wow, a real piece of history. Thanks!', 'Sorry, what did you say this fort is?'),
  ],
  outro: 'Wonderful, I will take more pictures. Thank you!',
  learned: [['Fort St. George', 'the old fort of Chennai']],
  again: 'Hi again! Any other old places to see?',
});

export const touristB = D('gateway-tourist-b', {
  name: 'Sophie', role: 'foreign tourist', site: 'Fort St. George grounds, by the old gate', diff: 3, lang: 'en',
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Tourist in a sky-blue striped shirt and a red cap, taking photos, wanting directions and a boat ride. Speaks only English.',
  goal: 'Tell her where the boat ride is and how much it costs.',
  steps: [
    S('boat', 'Hi! Where can I get a boat ride around here?',
      'Tell her the boat ride booth is over there, near the jetty.', ['The boat ride booth is over there, near the jetty.', 'The boat ride booth is over there, near the jetty.'],
      ['the boat ride booth is over there near the jetty', 'go to the booth near the jetty for the boat ride', 'the boats are near the jetty over there', 'you can get a boat ride at the jetty booth', 'there is a boat ride booth by the jetty', 'the boat booth is close to the jetty'],
      'direct_to_boat_booth', ['Say where the boat booth is.', 'Say: near the jetty.', 'Say: "The boat ride booth is over there, near the jetty."'],
      'Perfect, I will go now. Is it expensive?', 'Sorry, where did you say the boats are?'),
    S('cost', 'Is it expensive?',
      'Tell her it is about a hundred rupees.', ['No, it is about a hundred rupees.', 'No, it is about a hundred rupees.'],
      ['no it is about a hundred rupees', 'it is only about a hundred rupees', 'not at all around a hundred rupees', 'it costs about a hundred rupees', 'about a hundred rupees only', 'it is cheap about a hundred rupees'],
      'tell_boat_ride_price', ['Say the price.', 'Say: about a hundred rupees.', 'Say: "No, it is about a hundred rupees."'],
      'That is very cheap! Thank you so much!', 'Sorry, how much did you say?'),
  ],
  outro: 'Brilliant, off I go to the boats. Bye!',
  learned: [['about a hundred rupees', 'a price']],
  again: 'Oh, hi! Is the fort open today?',
});

export const danaSeller = D('gateway-dana-seller', {
  name: 'Kalyani', role: 'bird-feed seller', site: 'Fort St. George grounds, pigeon-feeding mat', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Woman in a teal saree with a small bag, calling "dhaaniyam, dhaaniyam" so tourists feed the pigeons.',
  goal: 'Buy a packet of grain and say how many pigeons are coming.',
  steps: [
    S('buy', ['தானியம் தானியம்! புறாக்களுக்கு போடுங்க மேடம்!', 'Dhaaniyam dhaaniyam! Purakkalukku podunga madam!', 'Grain, grain! Feed the pigeons, madam!'],
      'Ask for one packet of grain.', ['Oru packet dhaaniyam kudunga akka.', 'ஒரு பாக்கெட் தானியம் கொடுங்க அக்கா.'],
      ['oru packet dhaaniyam kudunga akka', 'oru packet dhaaniyam kudunga', 'dhaaniyam oru packet venum', 'akka oru packet kudunga', 'oru packet dhaaniyam podunga', 'ஒரு பாக்கெட் தானியம் கொடுங்க அக்கா', 'ஒரு பாக்கெட் தானியம் வேணும்'],
      'buy_grain_packet', ['Ask for the grain.', '"Dhaaniyam" = grain.', 'Say: "Oru packet dhaaniyam kudunga akka."'],
      ['இந்தாங்க, பத்து ரூபா. அந்த பாய்ல போடுங்க.', 'Indhaanga, patthu rubaa. Andha paayila podunga.', 'Here, ten rupees. Scatter it on that mat.'],
      ['எவ்வளவு வேணும்னு சொல்லுங்க மேடம்.', 'Evvalavu venumnu sollunga madam.', 'Tell me how much you want, madam.']),
    S('pigeons', ['போடுங்க போடுங்க! புறா வருது பாருங்க!', 'Podunga podunga! Pura varudhu paarunga!', 'Scatter it! Look, the pigeons are coming!'],
      'Say many pigeons are coming, great.', ['Romba pura varudhu, super!', 'ரொம்ப புறா வருது, சூப்பர்!'],
      ['romba pura varudhu super', 'romba pura varudhu', 'pura ellaam varudhu akka', 'akka romba pura varudhu', 'super akka pura varudhu', 'ரொம்ப புறா வருது சூப்பர்', 'ரொம்ப புறா வருது'],
      'say_pigeons_coming', ['Say how many come.', '"Pura" = pigeon.', 'Say: "Romba pura varudhu, super!"'],
      ['ஆமா! புறாக்கள் சந்தோஷமா இருக்கும்!', 'Aamaa! Purakkal santhoshamaa irukkum!', 'Yes! The pigeons will be happy!'],
      ['புறாவ பாத்தீங்களா மேடம்?', 'Purava paatheengalaa madam?', 'Did you see the pigeons, madam?']),
  ],
  outro: ['நல்ல போட்டோ கிடைக்கும் மேடம், கேமரா எடுங்க!', 'Nalla photo kidaikkum madam, camera edunga!', 'You will get a great photo, madam, take your camera!'],
  learned: [['oru packet dhaaniyam kudunga', 'give me one packet of grain'], ['romba pura varudhu', 'so many pigeons are coming']],
  again: ['மேடம், இன்னொரு பாக்கெட்?', 'Madam, innoru packet?', 'Madam, another packet?'],
});

export const boatman = D('gateway-boatman', {
  name: 'Raja', role: 'boatman', site: 'Fort St. George grounds, boat-ride jetty edge', diff: 2,
  voice: { rate: 1.05, pitch: 0.85 },
  persona: 'Boatman in a teal turban and a sky-blue lungi, waving at tourists and offering a boat ride.',
  goal: 'Say you will take one round.',
  steps: [
    S('ride', ['படகு சவாரி போலாமா மேடம்? கடல் காத்து சூப்பர்!', 'Padagu savaari polaamaa madam? Kadal kaathu super!', 'Shall we go for a boat ride, madam? The sea breeze is wonderful!'],
      'Say okay, one round.', ['Seri anna, oru round poyidalaam.', 'சரி அண்ணா, ஒரு ரவுண்ட் போயிடலாம்.'],
      ['seri anna oru round poyidalaam', 'oru round poyidalaam', 'seri anna poyidalaam', 'oru round poga naan ready', 'seri oru round pogalaam anna', 'சரி அண்ணா ஒரு ரவுண்ட் போயிடலாம்', 'ஒரு ரவுண்ட் போயிடலாம்'],
      'agree_to_boat_round', ['Agree to a ride.', '"Oru round" = one round.', 'Say: "Seri anna, oru round poyidalaam."'],
      ['ஆஹா! ஏறுங்க மேடம், பாத்து கால் வெச்சு!', 'Aaha! Erunga madam, paathu kaal vechchu!', 'Great! Step in, madam, carefully!'],
      ['போகலாமா வேணாமா மேடம்?', 'Pogalaamaa venaamaa madam?', 'Shall we go or not, madam?']),
  ],
  outro: ['கடல்ல போற சுகமே தனி மீரா!', 'Kadalla pora sugame thani Meera!', 'Nothing beats going on the sea, Meera!'],
  learned: [['oru round poyidalaam', 'let us go for one round']],
  again: ['மேடம், இன்னொரு சவாரி?', 'Madam, innoru savaari?', 'Madam, another ride?'],
});

export const busWaiter1 = D('fort-bus-waiter-1', {
  name: 'Deepa', role: 'woman waiting for a bus', site: 'Fort St. George grounds, bus stop', diff: 2,
  voice: { rate: 1.05, pitch: 1.2 },
  persona: 'Woman in a lilac churidar with a lilac umbrella, glancing down the road for the MTC bus.',
  goal: 'Agree the bus is late and thank her for sharing the umbrella.',
  steps: [
    S('late', ['பஸ் இன்னும் வரல. ரொம்ப நேரமா நிக்கறேன்.', 'Bus innum varala. Romba neramaa nikkaren.', 'The bus has not come. I have been standing a long time.'],
      'Agree the bus is late.', ['Aamaa akka, bus late-aa varudhu.', 'ஆமா அக்கா, பஸ் லேட்டா வருது.'],
      ['aamaa akka bus late-aa varudhu', 'bus late-aa varudhu akka', 'aamaa bus late thaan', 'bus innum varala akka', 'romba late aachu akka', 'ஆமா அக்கா பஸ் லேட்டா வருது', 'பஸ் லேட்டா வருது அக்கா'],
      'agree_bus_is_late', ['Agree with her.', '"Late-aa varudhu" = is coming late.', 'Say: "Aamaa akka, bus late-aa varudhu."'],
      ['என்ன பண்றது? வாங்க, இந்த குடையில நில்லுங்க.', 'Enna pannradhu? Vaanga, indha kudaiyila nillunga.', 'What to do? Come, stand under this umbrella.'],
      ['பஸ் பத்தி சொல்லுங்க கண்ணு.', 'Bus patthi sollunga kannu.', 'Tell me about the bus, dear.']),
    S('umbrella', ['வெயில் அதிகம். என் குடையில வாங்க.', 'Veyil adhigam. En kudaiyila vaanga.', 'The sun is strong. Come under my umbrella.'],
      'Thank her, it is very sunny.', ['Nandri akka, romba veyil.', 'நன்றி அக்கா, ரொம்ப வெயில்.'],
      ['nandri akka romba veyil', 'romba nandri akka veyil jaasthi', 'nandri akka', 'veyil romba jaasthi nandri', 'thanks akka romba veyil', 'நன்றி அக்கா ரொம்ப வெயில்', 'வெயில் ரொம்ப ஜாஸ்தி அக்கா'],
      'thank_for_umbrella', ['Thank her kindly.', '"Veyil" = sun.', 'Say: "Nandri akka, romba veyil."'],
      ['பரவாயில்ல கண்ணு. சென்னை வெயிலுக்கு இதுதான் தப்பிக்கற வழி.', 'Paravaayilla kannu. Chennai veyilukku idhuthaan thappikkara vazhi.', 'No problem, dear. This is how to survive the Chennai sun.'],
      ['ஒண்ணும் சொல்லலயா கண்ணு?', 'Onnum sollalayaa kannu?', 'Nothing to say, dear?']),
  ],
  outro: ['பஸ் வந்துடுச்சு, வாங்க மீரா!', 'Bus vandhuduchu, vaanga Meera!', 'The bus has come, come on, Meera!'],
  learned: [['bus late-aa varudhu', 'the bus is coming late'], ['romba veyil', 'very sunny']],
  again: ['கண்ணு, பஸ் வந்துடுச்சா பாருங்க.', 'Kannu, bus vandhuduchaa paarunga.', 'Dear, see if the bus has come.'],
});

export const busWaiter2 = D('fort-bus-waiter-2', {
  name: 'Siva', role: 'young man waiting for a bus', site: 'Fort St. George grounds, bus stop', diff: 1,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'Young man in a pink tee with a backpack, texting while waiting for the bus.',
  goal: 'Tell him to ask the conductor.',
  steps: [
    S('route', ['மேடம், இந்த பஸ் பீச் போகுமா?', 'Madam, indha bus beach pogumaa?', 'Madam, does this bus go to the beach?'],
      'Say you do not know, tell him to ask the conductor.', ['Theriyala thambi, conductor kitta kelunga.', 'தெரியல தம்பி, கண்டக்டர் கிட்ட கேளுங்க.'],
      ['theriyala thambi conductor kitta kelunga', 'conductor kitta kelunga thambi', 'theriyala conductor kitta kelu', 'enakku theriyala thambi', 'conductor kitta kekkalaam thambi', 'தெரியல தம்பி கண்டக்டர் கிட்ட கேளுங்க', 'கண்டக்டர் கிட்ட கேளுங்க'],
      'tell_him_ask_conductor', ['Say you are not sure.', '"Kitta kelunga" = ask him.', 'Say: "Theriyala thambi, conductor kitta kelunga."'],
      ['சரி மேடம், நன்றி. கேட்டுக்கறேன்.', 'Sari madam, nandri. Kettukkaren.', 'Okay, madam, thanks. I will ask.'],
      ['பஸ் போகுமா போகாதா மேடம்?', 'Bus pogumaa pogaadhaa madam?', 'Does the bus go or not, madam?']),
  ],
  outro: ['பீச்ல சுண்டல் சாப்பிடலாம் மேடம்!', 'Beach-la sundal saappidalaam madam!', 'We can eat sundal on the beach, madam!'],
  learned: [['conductor kitta kelunga', 'ask the conductor']],
  again: ['மேடம், பஸ் எப்போ வரும்?', 'Madam, bus eppo varum?', 'Madam, when will the bus come?'],
});

export const riderWalker = D('fort-dabbawala-walker', {
  name: 'Vijay', role: 'delivery rider on his round', site: 'Fort St. George grounds, road footpath', diff: 2,
  voice: { rate: 1.2, pitch: 1.0 },
  persona: 'Rider in an orange cap with an insulated bag, walking his delivery round at a brisk pace.',
  goal: 'Say you do not know the address and suggest he check the map.',
  steps: [
    S('address', ['மேடம், இந்த அட்ரஸ் எங்க இருக்கு தெரியுமா?', 'Madam, indha address enga irukku theriyumaa?', 'Madam, do you know where this address is?'],
      'Say you do not know, tell him to check the map.', ['Theriyaadhu anna, map paarunga.', 'தெரியாது அண்ணா, மேப் பாருங்க.'],
      ['theriyaadhu anna map paarunga', 'map paarunga anna', 'enakku theriyaadhu anna map paarunga', 'theriyaadhu map-la paarunga', 'anna map paarunga theriyaadhu', 'தெரியாது அண்ணா மேப் பாருங்க', 'மேப் பாருங்க அண்ணா'],
      'tell_him_check_map', ['Say you are not sure.', '"Map paarunga" = look at the map.', 'Say: "Theriyaadhu anna, map paarunga."'],
      ['சரி மேடம், ஜிபிஎஸ் பாக்கறேன். நன்றி!', 'Sari madam, GPS paakkaren. Nandri!', 'Okay, madam, I will check GPS. Thanks!'],
      ['அட்ரஸ் தெரியுமா தெரியாதா?', 'Address theriyumaa theriyaadhaa?', 'Do you know the address or not?']),
  ],
  outro: ['லேட் ஆகுது, பை மீரா மேடம்!', 'Late aagudhu, bye Meera madam!', 'I am getting late, bye Meera madam!'],
  learned: [['theriyaadhu, map paarunga', 'I do not know, check the map']],
  again: ['மேடம், இந்த பார்சல் எங்க கொடுக்கணும்?', 'Madam, indha parcel enga kodukkanum?', 'Madam, where do I deliver this parcel?'],
});

export const roadTourist = D('gateway-road-tourist', {
  name: 'Lena', role: 'foreign tourist', site: 'Road to the fort', diff: 2, lang: 'en',
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Tourist in a mint floral shirt and a butter-yellow cap, taking photos along the road and a little lost. Speaks only English.',
  goal: 'Tell her the fort is close, just walk straight.',
  steps: [
    S('close', 'Excuse me, is the fort far from here? I think I am a little lost.',
      'Tell her it is close, she should walk straight.', ['No, it is close. Just walk straight.', 'No, it is close. Just walk straight.'],
      ['no it is close just walk straight', 'it is very close walk straight ahead', 'not far just go straight', 'it is close by keep walking straight', 'just walk straight you will see it', 'it is near go straight ahead'],
      'tell_fort_is_close', ['Say it is near.', 'Say: close, walk straight.', 'Say: "No, it is close. Just walk straight."'],
      'Oh great, thank you! I will find it.', 'Sorry, is it far or close?'),
  ],
  outro: 'Thanks a lot, you saved me!',
  learned: [['Just walk straight', 'giving directions']],
  again: 'Hi again! Is it still straight ahead?',
});

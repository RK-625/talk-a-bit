// Chennai suburban station platform (tea stall, ladies coach marker, bench, timetable, ticket window) and the Napier Bridge checkpost.
import { dialogue as D, step as S } from '../kit.js';

export const stationTea = D('station-chaiwala', {
  name: 'Mani Anna', role: 'platform tea and coffee seller', site: 'Suburban station platform, tea stall', diff: 2,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Thin man in a green lungi with a kettle and a coffee tumbler, pouring for waiting passengers.',
  goal: 'Order a strong tea with less sugar.',
  steps: [
    S('order', ['டீ, காபி! சூடான டீ! என்ன வேணும் மேடம்?', 'Tea, coffee! Soodaana tea! Enna venum madam?', 'Tea, coffee! Hot tea! What do you want, madam?'],
      'Ask for one strong tea.', ['Oru strong tea kudunga anna.', 'ஒரு ஸ்ட்ராங் டீ கொடுங்க அண்ணா.'],
      ['oru strong tea kudunga anna', 'oru strong tea kudunga', 'strong tea venum anna', 'anna oru strong tea', 'oru tea strong-aa kudunga', 'ஒரு ஸ்ட்ராங் டீ கொடுங்க', 'ஒரு ஸ்ட்ராங் டீ வேணும் அண்ணா'],
      'order_strong_tea', ['Order a tea.', '"Strong tea" is understood.', 'Say: "Oru strong tea kudunga anna."'],
      ['இதோ, ட்ரெயின் வர்றதுக்குள்ள குடிச்சிடுங்க.', 'Idho, train varradhukkulla kudichiduunga.', 'Here, drink it before the train arrives.'],
      ['டீயா காபியா மேடம்? சீக்கிரம் சொல்லுங்க.', 'Teeyaa coffeeyaa madam? Seekkiram sollunga.', 'Tea or coffee, madam? Say quickly.']),
    S('sugar', ['சக்கரை போடவா?', 'Sakkarai podavaa?', 'Shall I add sugar?'],
      'Ask for less sugar.', ['Sakkarai kammiyaa podunga.', 'சக்கரை கம்மியா போடுங்க.'],
      ['sakkarai kammiyaa podunga', 'sakkarai kammi anna', 'sakkarai konjam podunga', 'kammiyaa sakkarai podunga anna', 'sakkarai vendaam anna', 'சக்கரை கம்மியா போடுங்க', 'சக்கரை கொஞ்சம் போடுங்க'],
      'ask_less_sugar', ['Ask for less sweet.', '"Sakkarai" = sugar. "Kammi" = less.', 'Say: "Sakkarai kammiyaa podunga."'],
      ['சரி, அளவா போடறேன். உடம்புக்கு நல்லது.', 'Sari, alavaa podaren. Udambukku nalladhu.', 'Okay, just the right amount. Good for health.'],
      ['சக்கரை எவ்வளவுன்னு சொல்லுங்க.', 'Sakkarai evvalavunnu sollunga.', 'Tell me how much sugar.']),
  ],
  outro: ['ட்ரெயின் வருது, பாத்து போங்க மீரா!', 'Train varudhu, paathu ponga Meera!', 'The train is coming, go carefully, Meera!'],
  learned: [['oru strong tea kudunga', 'give me one strong tea'], ['sakkarai kammiyaa podunga', 'less sugar please']],
  again: ['மேடம், இன்னொரு டீ வேணுமா?', 'Madam, innoru tea venumaa?', 'Madam, another tea?'],
});

export const ladiesA = D('station-ladies-a', {
  name: 'Bhuvana', role: 'ladies-coach commuter', site: 'Suburban station platform edge, ladies coach marker', diff: 2,
  voice: { rate: 1.05, pitch: 1.15 },
  persona: 'Woman in a churidar with a jhola and a ticket card, standing exactly where the ladies coach stops.',
  goal: 'Agree to wait with her at the ladies coach spot.',
  steps: [
    S('coach', ['லேடீஸ் கோச் இங்கதான் நிக்கும். நீங்களும் இங்கயே நில்லுங்க.', 'Ladies coach ingadhaan nikkum. Neengalum ingaye nillunga.', 'The ladies coach stops right here. You stand here too.'],
      'Say okay, you will stand here.', ['Seri akka, naan inga nikkaren.', 'சரி அக்கா, நான் இங்க நிக்கறேன்.'],
      ['seri akka naan inga nikkaren', 'naan inga nikkaren akka', 'seri inga nikkaren', 'nandri akka inga nikkaren', 'ladies coach inga thaanaa seri', 'சரி அக்கா நான் இங்க நிக்கறேன்', 'நான் இங்க நிக்கறேன் அக்கா'],
      'agree_to_wait_ladies_coach', ['Agree to stand there.', '"Nikkaren" = I will stand.', 'Say: "Seri akka, naan inga nikkaren."'],
      ['நல்லது. காலைல கூட்டம் ஜாஸ்தி, ஏறும்போது பாத்து!', 'Nalladhu. Kaalaila koottam jaasthi, erumbodhu paathu!', 'Good. It is crowded in the morning, be careful when boarding!'],
      ['எங்க நிக்கறீங்கன்னு சொல்லுங்க கண்ணு.', 'Enga nikkareenganu sollunga kannu.', 'Tell me where you will stand, dear.']),
  ],
  outro: ['மகளிர் கோச்ல பாதுகாப்பா போகலாம் மீரா.', 'Magalir coach-la paadhukaappaa pogalaam Meera.', 'You can travel safely in the ladies coach, Meera.'],
  learned: [['naan inga nikkaren', 'I will stand here']],
  again: ['மீரா, ட்ரெயின் வருது பாருங்க!', 'Meera, train varudhu paarunga!', 'Meera, look, the train is coming!'],
});

export const stationElder = D('station-bench-elder', {
  name: 'Vaidhyanathan Thaatha', role: 'elderly passenger', site: 'Suburban station platform, bench', diff: 1,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Elderly man in a white veshti and a white cap, seated on the bench waiting for a slow local.',
  goal: 'Say the train will come a little late.',
  steps: [
    S('late', ['பத்து நிமிஷம் ஆச்சு, லோக்கல் இன்னும் வரல.', 'Patthu nimisham aachu, local innum varala.', 'Ten minutes have passed, the local has not come yet.'],
      'Say it will come a little late.', ['Konjam late-aa thaan varum thaatha.', 'கொஞ்சம் லேட்டா தான் வரும் தாத்தா.'],
      ['konjam late-aa thaan varum thaatha', 'konjam late-aa varum thaatha', 'late-aa thaan varum', 'seekkiram varum thaatha', 'konjam kaathirunga thaatha', 'கொஞ்சம் லேட்டா தான் வரும் தாத்தா', 'கொஞ்சம் லேட்டா வரும்'],
      'say_train_will_be_late', ['Reassure him.', '"Late-aa varum" = will come late.', 'Say: "Konjam late-aa thaan varum thaatha."'],
      ['ஆமா கண்ணு. பொறுமை தான் வேணும்.', 'Aamaa kannu. Porumai thaan venum.', 'Yes, dear. Patience is what is needed.'],
      ['என்ன சொன்ன கண்ணு? ஸ்டேஷன்ல ஒரே சத்தம்.', 'Enna senna kannu? Station-la ore saththam.', 'What did you say, dear? So much noise in the station.']),
  ],
  outro: ['உக்காருங்க கண்ணு, ரெண்டு பேரும் காத்திருக்கலாம்.', 'Ukkaarunga kannu, rendu perum kaathirukkalaam.', 'Sit down, dear, we can wait together.'],
  learned: [['konjam late-aa varum', 'it will come a bit late']],
  again: ['கண்ணு, ட்ரெயின் வந்துடுச்சா பாருங்க.', 'Kannu, train vandhuduchaa paarunga.', 'Dear, see if the train has come.'],
});

export const stationOffice = D('station-commuter-2', {
  name: 'Naveen', role: 'office-goer', site: 'Suburban station platform, near the timetable', diff: 2,
  voice: { rate: 1.15, pitch: 0.95 },
  persona: 'Office-goer with a backpack and an ID lanyard, checking his watch for the 9:12.',
  goal: 'Tell him the time and say you are going to the beach.',
  steps: [
    S('time', ['ஆபீசுக்கு லேட் ஆகுது. இப்போ மணி என்ன?', 'Office-kku late aagudhu. Ippo mani enna?', 'I am getting late for office. What is the time now?'],
      'Tell him it is nine o clock.', ['Ippo mani ombadhu.', 'இப்போ மணி ஒன்பது.'],
      ['ippo mani ombadhu', 'ippo ombadhu mani', 'mani ombadhu', 'ippo nine o clock', 'ombadhu mani aaguthu', 'இப்போ மணி ஒன்பது', 'ஒன்பது மணி'],
      'tell_time_nine', ['Say the time.', 'Nine = "ombadhu".', 'Say: "Ippo mani ombadhu."'],
      ['ஒன்பதா! ஒன்பது பன்னிரண்டு ட்ரெயின் பிடிக்கணும்!', 'Onbadhaa! Onbadhu panniranduu train pidikkanum!', 'Nine! I must catch the 9:12 train!'],
      ['மணி என்னன்னு சொல்லுங்க, ப்ளீஸ்!', 'Mani ennannu sollunga, please!', 'Tell me the time, please!']),
    S('where', ['நீங்க எங்க போறீங்க மேடம்?', 'Neenga enga poreenga madam?', 'Where are you going, madam?'],
      'Say you are going to the beach.', ['Naan beach-ku poren.', 'நான் பீச்சுக்கு போறேன்.'],
      ['naan beach-ku poren', 'beach-ku poren', 'naan beach poren saar', 'beach ku thaan poren', 'naan beach pakkam poren', 'நான் பீச்சுக்கு போறேன்', 'பீச்சுக்கு போறேன்'],
      'say_going_to_beach', ['Say where you are going.', '"Poren" = I am going.', 'Say: "Naan beach-ku poren."'],
      ['பீச்சா? ஒரே ட்ரெயின் தான், ஒண்ணா போகலாம்!', 'Beachaa? Ore train thaan, onnaa pogalaam!', 'Beach? Same train, we can go together!'],
      ['எங்கன்னு சொல்லுங்க மேடம்.', 'Engannu sollunga madam.', 'Tell me where, madam.']),
  ],
  outro: ['ட்ரெயின் வந்தாச்சு, வாங்க மீரா!', 'Train vandhaachu, vaanga Meera!', 'The train is here, come on, Meera!'],
  learned: [['ippo mani ombadhu', 'it is nine o clock'], ['naan beach-ku poren', 'I am going to the beach']],
  again: ['மேடம், இன்னும் நேரம் இருக்கா?', 'Madam, innum neram irukkaa?', 'Madam, is there still time?'],
});

export const ticketClerk = D('station-ticket-clerk', {
  name: 'Kandasamy', role: 'ticket clerk', site: 'Suburban station platform, ticket window', diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Grey-haired clerk in specs at the window, calling "next!" and issuing tickets.',
  goal: 'Ask for a ticket to the beach station.',
  steps: [
    S('ticket', ['அடுத்தவங்க வாங்க! எங்க போகணும்?', 'Adutthavanga vaanga! Enga poganum?', 'Next, please! Where do you want to go?'],
      'Ask for one ticket to Beach.', ['Oru Beach ticket kudunga.', 'ஒரு பீச் டிக்கெட் கொடுங்க.'],
      ['oru beach ticket kudunga', 'beach ticket kudunga saar', 'oru ticket beach ku kudunga', 'beach ku oru ticket venum', 'saar oru beach ticket', 'ஒரு பீச் டிக்கெட் கொடுங்க', 'பீச்சுக்கு ஒரு டிக்கெட் கொடுங்க'],
      'ask_beach_ticket', ['Name the station.', '"Beach ticket" is enough.', 'Say: "Oru Beach ticket kudunga."'],
      ['பத்து ரூபா. இந்தாங்க டிக்கெட். தொலைக்காதீங்க!', 'Patthu rubaa. Indhaanga ticket. Tholaikkaadheenga!', 'Ten rupees. Here is your ticket. Do not lose it!'],
      ['எந்த ஸ்டேஷன்? சீக்கிரம், க்யூ பெருசா இருக்கு!', 'Endha station? Seekkiram, queue perusaa irukku!', 'Which station? Quick, the queue is long!']),
  ],
  outro: ['பாத்து போங்க மேடம், அடுத்தவங்க!', 'Paathu ponga madam, adutthavanga!', 'Go carefully, madam, next please!'],
  learned: [['oru Beach ticket kudunga', 'give me a ticket to Beach']],
  again: ['மேடம், இன்னொரு டிக்கெட்டா?', 'Madam, innoru ticketaa?', 'Madam, another ticket?'],
});

export const toll1 = D('toll-attendant', {
  name: 'Sekar', role: 'checkpost attendant', site: 'Napier Bridge checkpost booth', diff: 1,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Attendant in an orange hi-vis shirt beside the barrier post, waving vehicles through.',
  goal: 'Say the bridge is beautiful.',
  steps: [
    S('bridge', ['வண்டி மெதுவா போகுது. பாலத்துல கூட்டம் ஜாஸ்தி!', 'Vandi methuvaa pogudhu. Paalathula koottam jaasthi!', 'The traffic is slow. So crowded on the bridge!'],
      'Say the bridge is very beautiful.', ['Paalam romba azhagaa irukku anna.', 'பாலம் ரொம்ப அழகா இருக்கு அண்ணா.'],
      ['paalam romba azhagaa irukku anna', 'paalam azhagaa irukku', 'indha paalam super anna', 'paalam romba azhagu', 'bridge romba azhagaa irukku', 'பாலம் ரொம்ப அழகா இருக்கு அண்ணா', 'பாலம் அழகா இருக்கு'],
      'praise_the_bridge', ['Say something nice about the bridge.', '"Paalam" = bridge.', 'Say: "Paalam romba azhagaa irukku anna."'],
      ['ஆமா, வெள்ளை வளைவு பாலம்! சாயந்திரம் இன்னும் அழகு.', 'Aamaa, vellai valaivu paalam! Saayandhiram innum azhagu.', 'Yes, the white arched bridge! Even prettier in the evening.'],
      ['பாலம் பத்தி சொல்லுங்க மேடம்.', 'Paalam patthi sollunga madam.', 'Tell me about the bridge, madam.']),
  ],
  outro: ['போட்டோ எடுத்துக்கோங்க மீரா, ஆனா வண்டி வருது!', 'Photo edutthukkonga Meera, aana vandi varudhu!', 'Take a photo, Meera, but a vehicle is coming!'],
  learned: [['paalam romba azhagaa irukku', 'the bridge is very beautiful']],
  again: ['மேடம், கொஞ்சம் ஓரமா நில்லுங்க!', 'Madam, konjam oramaa nillunga!', 'Madam, stand to the side, please!'],
});

export const toll2 = D('toll-collector', {
  name: 'Chinnasamy', role: 'checkpost guard', site: 'Napier Bridge checkpost, in the booth', diff: 2,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Grey-haired guard in khaki with a towel on his shoulder, waving vehicles through and fond of telling the bridge story.',
  goal: 'Ask him to tell you about the bridge and react to its age.',
  steps: [
    S('old', ['இந்த பாலம் ரொம்ப பழசு. உங்களுக்கு தெரியுமா?', 'Indha paalam romba pazhasu. Ungalukku theriyumaa?', 'This bridge is very old. Do you know?'],
      'Say you do not know, ask him to tell you.', ['Theriyaadhu saar, sollunga.', 'தெரியாது சார், சொல்லுங்க.'],
      ['theriyaadhu saar sollunga', 'theriyaadhu sollunga saar', 'enakku theriyaadhu saar', 'saar sollunga theriyaadhu', 'konjam sollunga saar', 'தெரியாது சார் சொல்லுங்க', 'தெரியாது சொல்லுங்க சார்'],
      'ask_to_hear_bridge_story', ['Say you do not know.', '"Theriyaadhu" = I do not know.', 'Say: "Theriyaadhu saar, sollunga."'],
      ['நூத்தம்பது வருஷம் ஆச்சு. வெள்ளத்துலயும் நின்னுச்சு!', 'Noothambadhu varusham aachu. Vellatthulayum ninnuchu!', 'A hundred and fifty years. It stood even in floods!'],
      ['தெரியுமா தெரியாதா மேடம்?', 'Theriyumaa theriyaadhaa madam?', 'Do you know or not, madam?']),
    S('react', ['அந்த காலத்து எஞ்சினியர்ஸ் ரொம்ப திறமையானவங்க.', 'Andha kaalatthu engineers romba thiramaiyaanavanga.', 'The engineers of that time were very skilled.'],
      'Say, really? It is very old.', ['Appadiyaa saar! Romba pazhasu.', 'அப்படியா சார்! ரொம்ப பழசு.'],
      ['appadiyaa saar romba pazhasu', 'romba pazhasu saar', 'appadiyaa saar', 'romba pazhaiya paalam', 'super saar romba pazhasu', 'அப்படியா சார் ரொம்ப பழசு', 'ரொம்ப பழசு சார்'],
      'react_bridge_is_old', ['React with wonder.', '"Pazhasu" = old.', 'Say: "Appadiyaa saar! Romba pazhasu."'],
      ['ஆமா மேடம், இன்னும் உறுதியா இருக்கு.', 'Aamaa madam, innum urudhiyaa irukku.', 'Yes madam, it is still strong.'],
      ['என்ன சொல்றீங்க மேடம்?', 'Enna solreenga madam?', 'What are you saying, madam?']),
  ],
  outro: ['சென்னை வரலாறு நிறைய இருக்கு மீரா, படிங்க!', 'Chennai varalaaru niraiya irukku Meera, paadinga!', 'Chennai has lots of history, Meera, read about it!'],
  learned: [['theriyaadhu, sollunga', 'I do not know, please tell me'], ['romba pazhasu', 'very old']],
  again: ['மேடம், இன்னொரு கதை சொல்லவா?', 'Madam, innoru kadhai sollavaa?', 'Madam, shall I tell you another story?'],
});

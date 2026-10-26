// Kapaleeshwarar-style temple: the bell torana, the offering stall, the chappal stand.
import { dialogue as D, step as S } from '../kit.js';

export const bellDevotee = D('temple-bell-devotee', {
  name: 'Vasanthi', role: 'devotee at the bells', site: 'Temple, bell torana', diff: 1,
  voice: { rate: 0.85, pitch: 1.1 },
  persona: 'Thin woman in a green saree standing under the bells with hands joined, praying silently.',
  goal: 'Agree that it is peaceful.',
  steps: [
    S('peace', ['அமைதியா இருக்கு இல்ல? மணி சத்தம் மனசுக்கு நிம்மதி.', 'Amaidhiyaa irukku illa? Mani saththam manasukku nimmadhi.', 'It is so peaceful, is it not? The bell sound calms the mind.'],
      'Say yes, it is very peaceful.', ['Aamaa akka, romba amaidhiyaa irukku.', 'ஆமா அக்கா, ரொம்ப அமைதியா இருக்கு.'],
      ['aamaa akka romba amaidhiyaa irukku', 'romba amaidhiyaa irukku akka', 'amaidhiyaa irukku akka', 'aamaa nimmadhiyaa irukku', 'romba nimmadhi akka', 'ஆமா அக்கா ரொம்ப அமைதியா இருக்கு', 'ரொம்ப அமைதியா இருக்கு'],
      'agree_temple_peaceful', ['Agree softly.', '"Amaidhi" = peace.', 'Say: "Aamaa akka, romba amaidhiyaa irukku."'],
      ['ஆமா, கண்ண மூடி ஒரு நிமிஷம் நில்லுங்க.', 'Aamaa, kanna moodi oru nimisham nillunga.', 'Yes, close your eyes and stand for a minute.'],
      ['மெதுவா பேசுங்க கண்ணு. என்ன சொன்னீங்க?', 'Methuvaa pesunga kannu. Enna sonneenga?', 'Speak softly, dear. What did you say?']),
  ],
  outro: ['சாமி உங்கள காப்பாத்தட்டும் மீரா.', 'Saami ungala kaappaatthattum Meera.', 'May God protect you, Meera.'],
  learned: [['romba amaidhiyaa irukku', 'it is very peaceful']],
  again: ['கண்ணு, மறுபடி மணி அடிக்கறீங்களா?', 'Kannu, marubadi mani adikkareengalaa?', 'Dear, will you ring the bell again?'],
});

export const offeringWoman = D('temple-offering-pilgrim', {
  name: 'Saraswathi', role: 'devotee at the offering stall', site: 'Temple, coconut-and-flower stall', diff: 2,
  voice: { rate: 0.95, pitch: 1.1 },
  persona: 'Woman with jasmine in her plait choosing flowers and a coconut for the shrine.',
  goal: 'Say you will buy a coconut too and ask where to break it.',
  steps: [
    S('coconut', ['நான் தேங்கா பூ வாங்கறேன். நீங்களும் வாங்கறீங்களா?', 'Naan thengaa poo vaangaren. Neengalum vaangareengalaa?', 'I am buying a coconut and flowers. Will you buy too?'],
      'Say you will buy a coconut too.', ['Naanum oru thengaai vaangaren.', 'நானும் ஒரு தேங்காய் வாங்கறேன்.'],
      ['naanum oru thengaai vaangaren', 'naanum thengaai vaangaren', 'oru thengaai vaangaren akka', 'naanum vaangalaam akka', 'naanum thengaai poo vaangaren', 'நானும் ஒரு தேங்காய் வாங்கறேன்', 'நானும் தேங்காய் வாங்கறேன்'],
      'say_will_buy_coconut', ['Say you will buy one.', '"Thengaai" = coconut.', 'Say: "Naanum oru thengaai vaangaren."'],
      ['நல்லது! சாமிக்கு தேங்கா உடைச்சா புண்ணியம்.', 'Nalladhu! Saamikku thengaa udaichchaa punniyam.', 'Good! Breaking a coconut for the Lord brings merit.'],
      ['வாங்கறீங்களா மாட்டீங்களா? சொல்லுங்க.', 'Vaangareengalaa maatteengalaa? Sollunga.', 'Will you buy or not? Tell me.']),
    S('break', ['சாமி முன்னாடி உடைக்கணும். பயப்படாதீங்க.', 'Saami munnaadi udaikkanum. Bayappadaadheenga.', 'You break it before the shrine. Do not be afraid.'],
      'Ask where to break the coconut.', ['Enga udaikkanum akka?', 'எங்க உடைக்கணும் அக்கா?'],
      ['enga udaikkanum akka', 'enga udaikkanum', 'thengaai enga udaikkanum', 'enga poi udaikkanum akka', 'udaikka edam enga akka', 'எங்க உடைக்கணும் அக்கா', 'எங்க உடைக்கணும்'],
      'ask_where_to_break_coconut', ['Ask where.', '"Udaikkanum" = must break.', 'Say: "Enga udaikkanum akka?"'],
      ['அந்த கல்லுல பாருங்க. நாலு பக்கம் பாத்து ஓங்கி அடிங்க!', 'Andha kallula paarunga. Naalu pakkam paatthu ongi adinga!', 'See that stone. Look all around and strike hard!'],
      ['எங்கன்னு கேக்கறீங்களா கண்ணு?', 'Engannu kekkareengalaa kannu?', 'Are you asking where, dear?']),
  ],
  outro: ['சாமி கும்பிட்டு பிரசாதம் வாங்கிக்கோங்க மீரா.', 'Saami kumbittu prasaadham vaangikkonga Meera.', 'Pray and take the prasadam, Meera.'],
  learned: [['naanum oru thengaai vaangaren', 'I will buy a coconut too'], ['enga udaikkanum?', 'where should I break it?']],
  again: ['கண்ணு, பூ வேணுமா?', 'Kannu, poo venumaa?', 'Dear, want flowers?'],
});

export const templeFlowerSeller = D('temple-flower-seller', {
  name: 'Thangam', role: 'flower and coconut seller', site: 'Temple, offering stall', diff: 2,
  voice: { rate: 1.05, pitch: 1.15 },
  persona: 'Woman in a saffron saree with a basket of jasmine, calling "pookal, thengai" to devotees.',
  goal: 'Ask the price of an archanai plate and ask for one.',
  steps: [
    S('price', ['பூக்கள், தேங்கா! அர்ச்சனைக்கு வாங்குங்க!', 'Pookal, thengaa! Archanaikku vaangunga!', 'Flowers, coconuts! Buy for the archanai!'],
      'Ask the price of an archanai plate.', ['Archanai thattu evvalavu akka?', 'அர்ச்சனை தட்டு எவ்வளவு அக்கா?'],
      ['archanai thattu evvalavu akka', 'archanai thattu evvalavu', 'thattu evvalavu akka', 'oru thattu evvalavu', 'archanai evvalavu akka', 'அர்ச்சனை தட்டு எவ்வளவு அக்கா', 'தட்டு எவ்வளவு அக்கா'],
      'ask_archanai_plate_price', ['Ask the price.', '"Thattu" = plate.', 'Say: "Archanai thattu evvalavu akka?"'],
      ['முப்பது ரூபா. தேங்கா, பூ, வாழைப்பழம் இருக்கு.', 'Muppadhu rubaa. Thengaa, poo, vaazhaippazham irukku.', 'Thirty rupees. It has a coconut, flowers and bananas.'],
      ['தட்டு விலையா கேக்கறீங்க?', 'Thattu vilaiyaa kekkareenga?', 'Asking the plate price?']),
    S('buy', ['முப்பது ரூபாதான். ஒண்ணு எடுக்கறீங்களா?', 'Muppadhu rubaadhaan. Onnu edukkareengalaa?', 'Just thirty rupees. Will you take one?'],
      'Ask for one plate.', ['Oru thattu kudunga akka.', 'ஒரு தட்டு கொடுங்க அக்கா.'],
      ['oru thattu kudunga akka', 'oru thattu kudunga', 'oru thattu venum akka', 'archanai thattu onnu kudunga', 'oru thattu podunga', 'ஒரு தட்டு கொடுங்க அக்கா', 'ஒரு தட்டு வேணும்'],
      'buy_archanai_plate', ['Ask for one.', '"Oru" = one.', 'Say: "Oru thattu kudunga akka."'],
      ['இந்தாங்க, பயபக்தியா கொண்டு போங்க.', 'Indhaanga, bayabakthiyaa kondu ponga.', 'Here, carry it with devotion.'],
      ['எத்தனை தட்டு வேணும் கண்ணு?', 'Etthanai thattu venum kannu?', 'How many plates do you want, dear?']),
  ],
  outro: ['சாமி கும்பிட்டு வாங்க மீரா, ஆசீர்வாதம்!', 'Saami kumbittu vaanga Meera, aaseervaadham!', 'Pray and come, Meera, blessings!'],
  learned: [['archanai thattu evvalavu?', 'how much is an archanai plate?'], ['oru thattu kudunga', 'give me one plate']],
  again: ['மீரா, இன்னொரு தட்டு வேணுமா?', 'Meera, innoru thattu venumaa?', 'Meera, another plate?'],
});

export const chappalKeeper = D('temple-shoe-keeper', {
  name: 'Ponnusamy Thaatha', role: 'chappal keeper', site: 'Temple, by the row of chappals', diff: 1,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Old man in specs with a saffron towel, standing guard over the visitors chappals.',
  goal: 'Ask if you may leave your chappals here.',
  steps: [
    S('leave', ['செருப்ப இங்க விடுங்க. டோக்கன் வாங்கிக்கோங்க.', 'Seruppa inga vidunga. Token vaangikkonga.', 'Leave your chappals here. Take a token.'],
      'Ask if you can leave your chappals here.', ['Seruppu inga vidalaamaa thaatha?', 'செருப்பு இங்க விடலாமா தாத்தா?'],
      ['seruppu inga vidalaamaa thaatha', 'chappal inga vidalaamaa', 'seruppu inga vidalaama', 'inga seruppu vidalaamaa', 'thaatha seruppu inga vidalaamaa', 'செருப்பு இங்க விடலாமா தாத்தா', 'செருப்பு இங்க விடலாமா'],
      'ask_leave_chappals', ['Ask if it is okay.', '"Seruppu" = chappals. "Vidalaamaa?" = may I leave?', 'Say: "Seruppu inga vidalaamaa thaatha?"'],
      ['ஆமா, இதோ டோக்கன். பத்திரமா வெச்சுக்கோங்க.', 'Aamaa, idho token. Pathiramaa vechchukkonga.', 'Yes, here is the token. Keep it safe.'],
      ['செருப்பு எங்க? இங்க விடுங்கன்னு சொன்னேன்.', 'Seruppu enga? Inga vidungannu sonnen.', 'Where are your chappals? I said leave them here.']),
  ],
  outro: ['சாமி பாத்துட்டு வாங்க, நான் இங்கதான் இருப்பேன்.', 'Saami paatthuttu vaanga, naan ingadhaan iruppen.', 'See the Lord and come back, I will be right here.'],
  learned: [['seruppu inga vidalaamaa?', 'may I leave my chappals here?']],
  again: ['கண்ணு, டோக்கன் இருக்கா?', 'Kannu, token irukkaa?', 'Dear, have you got the token?'],
});

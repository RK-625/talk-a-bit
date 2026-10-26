// Santhome Basilica: the candle and flower stalls, the gate, and the jigarthanda stall on the shore.
import { dialogue as D, step as S } from '../kit.js';

export const candleWoman = D('haji-chadar-seller', {
  name: 'Mary', role: 'candle and flower stall woman', site: 'Santhome Basilica, stall', diff: 2,
  voice: { rate: 0.95, pitch: 1.1 },
  persona: 'Woman in a pink saree with a basket of flowers and candles, calling softly to people at the basilica.',
  goal: 'Buy two candles and say no to flowers.',
  steps: [
    S('candle', ['மெழுகுவர்த்தி, பூ! சர்ச்சுக்கு வாங்கிட்டு போங்க.', 'Mezhuguvartthi, poo! Churchukku vaangittu ponga.', 'Candles, flowers! Buy some for the church.'],
      'Ask for two candles.', ['Rendu mezhuguvartthi kudunga akka.', 'ரெண்டு மெழுகுவர்த்தி கொடுங்க அக்கா.'],
      ['rendu mezhuguvartthi kudunga akka', 'rendu mezhuguvartthi kudunga', 'rendu candle kudunga akka', 'akka rendu mezhuguvartthi venum', 'rendu candle podunga', 'ரெண்டு மெழுகுவர்த்தி கொடுங்க அக்கா', 'ரெண்டு மெழுகுவர்த்தி வேணும்'],
      'buy_two_candles', ['Ask for the candles.', '"Mezhuguvartthi" = candle.', 'Say: "Rendu mezhuguvartthi kudunga akka."'],
      ['இந்தாங்க, இருபது ரூபா. பூவும் வாங்கறீங்களா?', 'Indhaanga, irubadhu rubaa. Poovum vaangareengalaa?', 'Here, twenty rupees. Will you buy flowers too?'],
      ['எத்தனை மெழுகுவர்த்தி வேணும்?', 'Etthanai mezhuguvartthi venum?', 'How many candles do you want?']),
    S('flower', ['வெள்ளை பூ இருக்கு. கடவுளுக்கு போடலாம்.', 'Vellai poo irukku. Kadavulukku podalaam.', 'I have white flowers. You can offer them.'],
      'Say no flowers, enough.', ['Poo venaam akka, podhum.', 'பூ வேணாம் அக்கா, போதும்.'],
      ['poo venaam akka podhum', 'poo venaam akka', 'venaam akka podhum', 'poo vendaam podhum', 'candle mattum podhum akka', 'பூ வேணாம் அக்கா போதும்', 'பூ வேணாம் அக்கா'],
      'decline_flowers', ['Say no politely.', '"Poo" = flowers.', 'Say: "Poo venaam akka, podhum."'],
      ['சரி கண்ணு. கடவுள் ஆசீர்வதிப்பார்.', 'Sari kannu. Kadavul aaseervadhippaar.', 'Okay dear. God will bless you.'],
      ['பூ வேணுமா வேணாமா?', 'Poo venumaa venaamaa?', 'Flowers or not?']),
  ],
  outro: ['மெழுகுவர்த்தி ஏத்திட்டு வாங்க மீரா.', 'Mezhuguvartthi yetthittu vaanga Meera.', 'Light the candle and come, Meera.'],
  learned: [['rendu mezhuguvartthi kudunga', 'give me two candles'], ['poo venaam', 'no flowers']],
  again: ['கண்ணு, இன்னும் மெழுகுவர்த்தி வேணுமா?', 'Kannu, innum mezhuguvartthi venumaa?', 'Dear, more candles?'],
});

export const jigarMan = D('haji-juice-man', {
  name: 'Mohan Anna', role: 'jigarthanda stall man', site: 'Santhome Basilica shore, jigarthanda stall', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Thin man in a mint lungi with a green towel, mixing chilled jigarthanda with milk, almond gum and ice cream into tall glasses.',
  goal: 'Order one jigarthanda and ask for ice cream on top.',
  steps: [
    S('order', ['ஜில் ஜில் ஜிகர்தண்டா! மதுரை ஸ்டைல்! குடிக்கறீங்களா?', 'Jil jil jigarthanda! Madurai style! Kudikkareengalaa?', 'Chilled jigarthanda! Madurai style! Will you drink?'],
      'Order one jigarthanda.', ['Oru jigarthanda kudunga anna.', 'ஒரு ஜிகர்தண்டா கொடுங்க அண்ணா.'],
      ['oru jigarthanda kudunga anna', 'oru jigarthanda kudunga', 'oru jigarthanda venum anna', 'anna jigarthanda onnu kudunga', 'oru jigarthanda podunga', 'ஒரு ஜிகர்தண்டா கொடுங்க அண்ணா', 'ஒரு ஜிகர்தண்டா வேணும்'],
      'order_jigarthanda', ['Ask for the drink.', '"Jigarthanda" is the name.', 'Say: "Oru jigarthanda kudunga anna."'],
      ['இதோ! பால், பாதாம் பிசின், ஜில்லுனு இருக்கும்.', 'Idho! Paal, paadhaam pisin, jillunu irukkum.', 'Here! Milk, almond gum, nice and cold.'],
      ['என்ன வேணும்னு சொல்லுங்க மேடம்.', 'Enna venumnu sollunga madam.', 'Tell me what you want, madam.']),
    S('icecream', ['ஐஸ்கிரீம் கூட போடவா?', 'Ice cream kooda podavaa?', 'Shall I add ice cream as well?'],
      'Say yes, add ice cream.', ['Aamaa, ice cream kooda podunga.', 'ஆமா, ஐஸ்கிரீம் கூட போடுங்க.'],
      ['aamaa ice cream kooda podunga', 'ice cream kooda podunga', 'aamaa ice cream podunga anna', 'ice cream venum anna', 'aamaa kooda podunga', 'ஆமா ஐஸ்கிரீம் கூட போடுங்க', 'ஐஸ்கிரீம் கூட போடுங்க'],
      'ask_ice_cream_on_top', ['Say yes.', '"Kooda" = also, along.', 'Say: "Aamaa, ice cream kooda podunga."'],
      ['இந்தாங்க, ஐஸ்கிரீம் தனி சுவை! ஸ்பூன் வெச்சு குடிங்க.', 'Indhaanga, ice cream thani suvai! Spoon vechchu kudinga.', 'Here, the ice cream gives it a special taste! Use the spoon.'],
      ['ஐஸ்கிரீம் வேணுமா வேணாமா?', 'Ice cream venumaa venaamaa?', 'Ice cream or not?']),
  ],
  outro: ['குடிச்சு பாத்துட்டு ப்ளாக்ல எழுதுங்க மீரா!', 'Kudichchu paatthuttu blog-la ezhudhunga Meera!', 'Try it and write it on your blog, Meera!'],
  learned: [['oru jigarthanda kudunga', 'give me one jigarthanda'], ['ice cream kooda podunga', 'add ice cream too']],
  again: ['மேடம், இன்னொரு கிளாஸ்?', 'Madam, innoru glass?', 'Madam, another glass?'],
});

export const candleMan2 = D('haji-chadar-seller-2', {
  name: 'Anthony', role: 'candle seller', site: 'Santhome Basilica, second stall', diff: 1,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Man in a cream shirt and a white veshti with a saffron towel, selling candles and flowers and calling to visitors.',
  goal: 'Say you are just looking today and will buy another day.',
  steps: [
    S('look', ['வாங்கம்மா, சாந்தோம் சர்ச் பாத்தீங்களா? மெழுகுவர்த்தி வேணுமா?', 'Vaangammaa, Santhome church paatheengalaa? Mezhuguvartthi venumaa?', 'Come, dear, have you seen Santhome church? Want a candle?'],
      'Say not now, you will buy another day.', ['Venaam anna, innoru naal vaangaren.', 'வேணாம் அண்ணா, இன்னொரு நாள் வாங்கறேன்.'],
      ['venaam anna innoru naal vaangaren', 'innoru naal vaangaren anna', 'ippo venaam innoru naal', 'venaam anna naalaikku vaangaren', 'innoru naal varen anna', 'வேணாம் அண்ணா இன்னொரு நாள் வாங்கறேன்', 'இன்னொரு நாள் வாங்கறேன்'],
      'say_will_buy_another_day', ['Decline politely.', '"Innoru naal" = another day.', 'Say: "Venaam anna, innoru naal vaangaren."'],
      ['சரி மேடம், பரவாயில்ல. சர்ச்சை நல்லா பாத்துட்டு போங்க.', 'Sari madam, paravaayilla. Churchai nallaa paatthuttu ponga.', 'Okay, madam, no problem. See the church well before you go.'],
      ['வாங்கறீங்களா மாட்டீங்களா?', 'Vaangareengalaa maatteengalaa?', 'Will you buy or not?']),
  ],
  outro: ['கண்டிப்பா வாங்க மீரா, நான் இங்கதான்!', 'Kandippaa vaanga Meera, naan ingadhaan!', 'Do come, Meera, I am right here!'],
  learned: [['innoru naal vaangaren', 'I will buy another day']],
  again: ['மேடம், இன்னும் பாத்துட்டு இருக்கீங்களா?', 'Madam, innum paatthuttu irukkeengalaa?', 'Madam, still looking around?'],
});

export const jigarCustomer = D('haji-juice-customer', {
  name: 'Latha', role: 'woman at the jigarthanda stall', site: 'Santhome Basilica shore, jigarthanda stall', diff: 1,
  voice: { rate: 1.05, pitch: 1.2 },
  persona: 'Woman in a rose churidar top with a mint towel, waiting for her glass at the jigarthanda stall.',
  goal: 'Say this is your first time.',
  steps: [
    S('first', ['ஜிகர்தண்டா சூப்பரா இருக்கும்! நீங்க முதல் தடவையா?', 'Jigarthanda superaa irukkum! Neenga mudhal thadavaiyaa?', 'Jigarthanda is great! Is it your first time?'],
      'Say yes, it is your first time.', ['Aamaa akka, mudhal thadavai.', 'ஆமா அக்கா, முதல் தடவை.'],
      ['aamaa akka mudhal thadavai', 'mudhal thadavai akka', 'aamaa mudhal thadavai thaan', 'ithu en mudhal thadavai', 'aamaa mudhal thadavai jigarthanda', 'ஆமா அக்கா முதல் தடவை', 'முதல் தடவை அக்கா'],
      'say_first_time_jigarthanda', ['Say yes.', '"Mudhal thadavai" = first time.', 'Say: "Aamaa akka, mudhal thadavai."'],
      ['அப்போ கண்டிப்பா பிடிக்கும்! மதுரை ஸ்பெஷல்.', 'Appo kandippaa pidikkum! Madurai special.', 'Then you will definitely like it! A Madurai special.'],
      ['முதல் தடவையா இல்லையா அக்கா?', 'Mudhal thadavaiyaa illaiyaa akka?', 'First time or not, akka?']),
  ],
  outro: ['குடிச்சதும் சொல்லுங்க, எப்படி இருக்கு!', 'Kudichchadhum sollunga, eppadi irukku!', 'Tell me after you drink, how it is!'],
  learned: [['mudhal thadavai', 'first time']],
  again: ['அக்கா, இன்னொரு கிளாஸ் குடிக்கலாமா?', 'Akka, innoru glass kudikkalaamaa?', 'Akka, shall we drink another glass?'],
});

export const oldDevotee = D('haji-pilgrim-2', {
  name: 'Stephen Ayya', role: 'elderly devotee', site: 'Santhome Basilica, near the gate', diff: 2,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Elderly man in a white shirt with thick moustache, standing quietly with hands joined in prayer.',
  goal: 'Ask if you may take a photo of the church spire.',
  steps: [
    S('spire', ['இங்க இருந்து சர்ச் கோபுரம் ரொம்ப அழகா தெரியும்.', 'Inga irundhu church gopuram romba azhagaa theriyum.', 'The church spire looks beautiful from here.'],
      'Ask if you may take a photo.', ['Aamaa ayya, photo edukkalaamaa?', 'ஆமா ஐயா, போட்டோ எடுக்கலாமா?'],
      ['aamaa ayya photo edukkalaamaa', 'photo edukkalaamaa ayya', 'ayya photo edukkalaama', 'inga photo edukkalaamaa', 'oru photo edukkalaamaa ayya', 'ஆமா ஐயா போட்டோ எடுக்கலாமா', 'போட்டோ எடுக்கலாமா ஐயா'],
      'ask_to_photograph_spire', ['Ask permission.', '"Edukkalaamaa?" = may I take?', 'Say: "Aamaa ayya, photo edukkalaamaa?"'],
      ['தாராளமா எடுங்க கண்ணு. ஆனா உள்ள வேணாம்.', 'Thaaraalamaa edunga kannu. Aanaa ulla venaam.', 'Go ahead, dear. But not inside.'],
      ['போட்டோ பத்தி கேக்கறீங்களா?', 'Photo patthi kekkareengalaa?', 'Are you asking about a photo?']),
  ],
  outro: ['நல்ல போட்டோ எடுங்க மீரா. கடவுள் துணை.', 'Nalla photo edunga Meera. Kadavul thunai.', 'Take a good photo, Meera. God be with you.'],
  learned: [['photo edukkalaamaa?', 'may I take a photo?']],
  again: ['கண்ணு, போட்டோ நல்லா வந்துச்சா?', 'Kannu, photo nallaa vandhuchaa?', 'Dear, did the photo turn out well?'],
});

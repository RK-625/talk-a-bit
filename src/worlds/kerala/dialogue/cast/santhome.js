// Bolgatty island chapel: the candle and flower stalls, the gate, and the kulukki sarbath stall on the shore.
import { dialogue as D, step as S } from '../kit.js';

export const candleWoman = D('haji-chadar-seller', {
  name: 'Mary Chechi', role: 'candle and flower stall woman', site: 'Bolgatty island chapel, stall', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Woman in a pink saree with jasmine in her bun, arranging candles and flowers and calling softly to visitors.',
  goal: 'Ask the price of a candle and buy a big one.',
  steps: [
    S('price', ['മെഴുകുതിരി, പൂവ്! പ്രാർത്ഥനയ്ക്ക് വേണോ മോളേ?', 'Mezhukuthiri, poovu! Praarthanaykku veno mole?', 'Candles, flowers! Want some for prayer, dear?'],
      'Ask the price of a candle.', ['Oru mezhukuthirikku ethra roopa chechi?', 'ഒരു മെഴുകുതിരിക്ക് എത്ര രൂപ ചേച്ചി?'],
      ['mezhukuthiri ethrayaa', 'candle ethra roopa', 'oru candle ethra', 'chechi candle vila', 'mezhukuthiri vila ethra', 'മെഴുകുതിരി എത്രയാ'],
      'ask_candle_price', ['Ask the price.', '"Mezhukuthiri" = candle.'],
      ['ഒന്നിന് പത്ത് രൂപ, വലുത് ഇരുപത്.', 'Onninu pathu roopa, valuthu irupathu.', 'Ten rupees each, the big one twenty.'],
      ['മെഴുകുതിരി വേണോ?', 'Mezhukuthiri veno?', 'Do you want a candle?']),
    S('big', ['ഏതാ വേണ്ടത്, ചെറുതോ വലുതോ?', 'Ethaa vendathu, cheruthoo valuthoo?', 'Which one, small or big?'],
      'Ask for a big candle.', ['Oru valiya mezhukuthiri tharoo.', 'ഒരു വലിയ മെഴുകുതിരി തരൂ.'],
      ['valiyathu mathi', 'valuthu tharoo chechi', 'oru valiya candle', 'valiyathu venam', 'big candle venam', 'വലിയത് മതി'],
      'buy_big_candle', ['Pick the big one.', '"Valiya" = big.'],
      ['ഇതാ, ഇരുപത് രൂപ. പ്രാർത്ഥിച്ച് കത്തിക്കൂ.', 'Ithaa, irupathu roopa. Praarthichu kathikkoo.', 'Here, twenty rupees. Pray and light it.'],
      ['ചെറുതോ വലുതോ എന്ന് പറയൂ.', 'Cheruthoo valuthoo ennu parayoo.', 'Tell me, small or big.']),
  ],
  outro: ['ദൈവം അനുഗ്രഹിക്കട്ടെ മോളേ.', 'Daivam anugrahikkatte mole.', 'God bless you, dear.'],
  learned: [['mezhukuthiri ethra roopa?', 'how much is a candle?'], ['oru valiya mezhukuthiri', 'one big candle']],
  again: ['മെഴുകുതിരി ഇനിയും വേണോ?', 'Mezhukuthiri iniyum veno?', 'Want another candle?'],
});

export const jigarMan = D('haji-juice-man', {
  name: 'Salim', role: 'kulukki sarbath stall man', site: 'Bolgatty island shore, sarbath stall', diff: 2,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Man with a towel on his shoulder shaking lime, basil seeds and soda in a tall glass, grinning as he hands it over.',
  goal: 'Order a kulukki sarbath and ask for less sugar.',
  steps: [
    S('order', ['കുലുക്കി സർബത്ത്! ഐസ് ഇട്ടത്!', 'Kulukki sarbath! Ice ittathu!', 'Kulukki sarbath! With ice!'],
      'Order one kulukki sarbath.', ['Oru kulukki sarbath tharamo?', 'ഒരു കുലുക്കി സർബത്ത് തരാമോ?'],
      ['oru sarbath tharoo', 'kulukki sarbath venam chetta', 'chetta oru sarbath', 'oru kulukki sarbath please', 'sarbath tharamo', 'ഒരു കുലുക്കി സർബത്ത് വേണം'],
      'order_kulukki_sarbath', ['Ask for the drink.', '"Kulukki" = shaken.'],
      ['കുലുക്കി... കുലുക്കി... ഇതാ, ഇഞ്ചി കൂടി ഇട്ടിട്ടുണ്ട്.', 'Kulukki... kulukki... ithaa, inchi koodi ittittundu.', 'Shake... shake... here, I added a little ginger too.'],
      ['സർബത്ത് വേണോ?', 'Sarbath veno?', 'Want a sarbath?']),
    S('sugar', ['മധുരം കൂടുതൽ വേണോ കുറവ് വേണോ?', 'Madhuram kooduthal veno kuravu veno?', 'Want it more sweet or less?'],
      'Ask for less sugar.', ['Madhuram kurachu mathi chetta.', 'മധുരം കുറച്ച് മതി ചേട്ടാ.'],
      ['madhuram kuravu mathi', 'panchasara kuravu', 'madhuram kuravu', 'less madhuram chetta', 'kurachu madhuram mathi', 'മധുരം കുറവ് മതി'],
      'ask_less_sugar', ['Say less sweet.', '"Madhuram" = sweetness.'],
      ['ശരി, ഉപ്പ് കൂടുതൽ ഇടാം.', 'Shari, uppu kooduthal idaam.', 'Okay, I will add a bit more salt.'],
      ['മധുരം എങ്ങനെ?', 'Madhuram engane?', 'How sweet?']),
  ],
  outro: ['ചൂടത്ത് ഇതാണ് ഏറ്റവും നല്ലത്!', 'Choodathu ithaanu ettavum nallathu!', 'In the heat, this is the best!'],
  learned: [['oru kulukki sarbath tharamo?', 'may I have a kulukki sarbath?'], ['madhuram kurachu mathi', 'less sugar please']],
  again: ['ഒരു ഗ്ലാസ് കൂടി കുലുക്കട്ടെ?', 'Oru glass koodi kulukkatte?', 'Shall I shake one more glass?'],
});

export const candleMan2 = D('haji-chadar-seller-2', {
  name: 'Paulose', role: 'candle seller', site: 'Bolgatty island chapel, second stall', diff: 1,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Man in a white mundu with a towel on his shoulder selling candles and flowers and calling to visitors.',
  goal: 'Ask for some white flowers for the chapel.',
  steps: [
    S('flowers', ['പൂവ്, മെഴുകുതിരി! പള്ളിയിൽ പോകുന്നോ?', 'Poovu, mezhukuthiri! Palliyil pokunno?', 'Flowers, candles! Going to the chapel?'],
      'Say yes and ask for white flowers.', ['Athe, vella poovu kurachu tharoo.', 'അതെ, വെള്ള പൂവ് കുറച്ച് തരൂ.'],
      ['vella poovu venam', 'poovu tharamo chetta', 'vella poovu kurachu', 'athe poovu venam', 'pallilekkaanu poovu tharoo', 'വെള്ള പൂവ് വേണം'],
      'ask_white_flowers', ['Ask for flowers.', '"Vella" = white.'],
      ['ഇതാ, മാതാവിന് സമർപ്പിക്കാം.', 'Ithaa, maathaavinu samarppikkaam.', 'Here, you can offer them to Our Lady.'],
      ['ഏത് പൂവ്?', 'Ethu poovu?', 'Which flowers?']),
  ],
  outro: ['ശാന്തമായി പ്രാർത്ഥിക്കൂ.', 'Shaanthamaayi praarthikkoo.', 'Pray in peace.'],
  learned: [['vella poovu venam', 'I want white flowers']],
  again: ['പൂവ് ഇനിയും വേണോ?', 'Poovu iniyum veno?', 'Want more flowers?'],
});

export const jigarCustomer = D('haji-juice-customer', {
  name: 'Sister Teresa', role: 'nun at the sarbath stall', site: 'Bolgatty island shore, sarbath stall', diff: 2,
  voice: { rate: 0.9, pitch: 1.15 },
  persona: 'Gentle nun in a white habit waiting for her glass of kulukki sarbath after the chapel; speaks slowly and kindly.',
  goal: 'Agree politely that it is very hot.',
  steps: [
    S('hot', ['ദൈവം അനുഗ്രഹിക്കട്ടെ. ചൂടുള്ള ദിവസം, അല്ലേ?', 'Daivam anugrahikkatte. Choodulla divasam, alle?', 'God bless you. A hot day, is it not?'],
      'Agree politely: it is very hot, sister.', ['Athe sisterey, valare choodaanu.', 'അതെ സിസ്റ്ററേ, വളരെ ചൂടാണ്.'],
      ['valare choodaanu sisterey', 'choodu kooduthalaanu', 'athe sisterey', 'sister nalla choodu', 'kadum choodu aanu', 'വളരെ ചൂടാണ്'],
      'agree_it_is_hot', ['Agree, politely.', '"Choodu" = heat.'],
      ['അതുകൊണ്ടാണ് ഞാൻ സർബത്ത് കുടിക്കാൻ വന്നത്.', 'Athukondaanu njaan sarbath kudikkaan vannathu.', 'That is why I came for a sarbath.'],
      ['ക്ഷമിക്കണം, മനസ്സിലായില്ല.', 'Kshamikkanam, manassilaayilla.', 'Sorry, I did not understand.']),
  ],
  outro: ['ആശീർവാദം മോളേ.', 'Aasheervaadam mole.', 'My blessings, dear.'],
  learned: [['valare choodaanu', 'it is very hot']],
  again: ['സർബത്ത് തണുത്തതാണ്, നല്ലത്.', 'Sarbath thanuthathaanu, nallathu.', 'The sarbath is cold, very nice.'],
});

export const oldDevotee = D('haji-pilgrim-2', {
  name: 'Varkey Chettan', role: 'elderly devotee', site: 'Bolgatty island chapel, near the gate', diff: 2,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Elderly man with grey hair and bare feet standing quietly with hands joined in prayer.',
  goal: 'Ask him how old the chapel is.',
  steps: [
    S('old', ['ആമേൻ. ആഹാ, ഒരു സഞ്ചാരി!', 'Aamen. Aahaa, oru sanchaari!', 'Amen. Oh, a traveller!'],
      'Ask him how old the chapel is.', ['Ee palli ethra pazhakkamullathaanu?', 'ഈ പള്ളി എത്ര പഴക്കമുള്ളതാണ്?'],
      ['palli ethra pazhayathaa', 'ee palliyude praayam ethra', 'ethra varsham pazhakkam', 'palli ethra kaalam aayi', 'ithinu ethra pazhakkam', 'പള്ളി എത്ര പഴയതാ'],
      'ask_chapel_age', ['Ask how old it is.', '"Pazhakkam" = age.'],
      ['ഇരുനൂറ് വർഷത്തിലേറെ. എന്റെ മുത്തച്ഛന്റെ കാലത്തും ഉണ്ട്.', 'Irunooru varshathilere. Ente muthachchante kaalathum undu.', 'More than two hundred years. It was here in my grandfather\'s time too.'],
      ['പള്ളിയെ പറ്റിയാണോ?', 'Palliye pattiyaano?', 'About the chapel?']),
  ],
  outro: ['സമാധാനത്തോടെ പോകൂ.', 'Samaadhaanathode pokoo.', 'Go in peace.'],
  learned: [['palli ethra pazhakkamullathaanu?', 'how old is the chapel?']],
  again: ['മണി മുഴങ്ങുന്നത് കേട്ടോ?', 'Mani muzhangunnathu kettoo?', 'Did you hear the bell ring?'],
});

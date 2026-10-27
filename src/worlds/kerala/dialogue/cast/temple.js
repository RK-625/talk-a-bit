// Kerala temple: the bell, the offering stall, the flower seller and the chappal stand.
import { dialogue as D, step as S } from '../kit.js';

export const bellDevotee = D('temple-bell-devotee', {
  name: 'Lakshmi Amma', role: 'devotee at the bells', site: 'Kerala temple, bell hanging', diff: 1,
  voice: { rate: 0.85, pitch: 1.1 },
  persona: 'Woman in a cream set-saree standing under the bell with hands joined, praying silently.',
  goal: 'Softly say sorry for disturbing her prayer.',
  steps: [
    S('sorry', ['ശ്ശ്... പ്രാർത്ഥിക്കുകയാണ്.', 'Shsh... praarthikkukayaanu.', 'Shh... I am praying.'],
      'Softly say sorry.', ['Kshamikkanam amme.', 'ക്ഷമിക്കണം അമ്മേ.'],
      ['sorry amme', 'kshamikkoo amme', 'maappu amme', 'ksham venam amme', 'sorry kshamikkanam', 'ക്ഷമിക്കണം'],
      'say_sorry_softly', ['Apologise quietly.', '"Kshamikkanam" = please forgive.'],
      ['സാരമില്ല മോളേ. മണി ഒന്ന് അടിച്ചോളൂ.', 'Saaramilla mole. Mani onnu adicholoo.', 'It is fine dear. You may ring the bell once.'],
      ['പതുക്കെ പറയൂ മോളേ.', 'Pathukke parayoo mole.', 'Speak softly, dear.']),
  ],
  outro: ['ഭഗവാൻ നല്ലതു വരുത്തട്ടെ.', 'Bhagavaan nallathu varuthatte.', 'May God do good for you.'],
  learned: [['kshamikkanam', 'please excuse me']],
  again: ['ശാന്തമായി നിൽക്കൂ മോളേ.', 'Shaanthamaayi nilkkoo mole.', 'Stand quietly, dear.'],
});

export const offeringWoman = D('temple-offering-pilgrim', {
  name: 'Sarala Chechi', role: 'devotee at the offering stall', site: 'Kerala temple, coconut-and-flower stall', diff: 2,
  voice: { rate: 0.95, pitch: 1.15 },
  persona: 'Woman in a terracotta blouse with jasmine in her plait, choosing flowers and a coconut for the shrine.',
  goal: 'Say it is your first time here and ask her to show you how to offer a coconut.',
  steps: [
    S('first', ['തേങ്ങയും പൂവും വാങ്ങണം. ഇവിടെ ആദ്യമായാണോ?', 'Thengayum poovum vaangenam. Ivide aadyamaayaano?', 'I must buy a coconut and flowers. Is this your first time here?'],
      'Say yes, it is your first time.', ['Athe, ivide aadyamaayittaanu.', 'അതെ, ഇവിടെ ആദ്യമായിട്ടാണ്.'],
      ['aadyamaayittaanu chechi', 'athe first time aanu', 'ivide puthiyathaanu', 'aadyamaayi varunnathaanu', 'first time aanu chechi', 'ആദ്യമായിട്ടാണ്'],
      'say_first_time', ['Say it is your first visit.', '"Aadyamaayi" = for the first time.'],
      ['ശരി, എന്നാൽ ഞാൻ പറഞ്ഞു തരാം.', 'Shari, ennaal njaan paranju tharaam.', 'Okay, then I will show you.'],
      ['ആദ്യമായിട്ടാണോ അല്ലയോ?', 'Aadyamaayittaano allayo?', 'First time or not?']),
    S('show', ['തേങ്ങ ഉടച്ച് ഭഗവാനു സമർപ്പിക്കണം. ശ്രമിക്കുന്നോ?', 'Thenga udachu bhagavaanu samarppikkanam. Shramikkunno?', 'Break the coconut and offer it to the Lord. Will you try?'],
      'Ask her to show you how.', ['Engane cheyyanam ennu kaanikkamo?', 'എങ്ങനെ ചെയ്യണം എന്ന് കാണിക്കാമോ?'],
      ['onnu kaanichu tharamo', 'engane cheyyum chechi', 'kaanichu tharoo', 'njaan padikkatte', 'engane thenga udakkum', 'എങ്ങനെ എന്ന് കാണിക്കൂ'],
      'ask_to_be_shown', ['Ask her to demonstrate.', '"Kaanikkamo?" = can you show?'],
      ['ഇങ്ങനെ പിടിക്കൂ, എന്നിട്ട് ഒറ്റയടി!', 'Ingane pidikkoo, ennittu ottayadi!', 'Hold it like this, then one blow!'],
      ['ഞാൻ കാണിക്കണോ?', 'Njaan kaanikkano?', 'Shall I show you?']),
  ],
  outro: ['ഇനി തൊഴുതിട്ട് പോകൂ.', 'Ini thozhuthittu pokoo.', 'Now pray with folded hands and go.'],
  learned: [['ivide aadyamaayittaanu', 'it is my first time here'], ['engane cheyyanam?', 'how should I do it?']],
  again: ['തേങ്ങ ഉടഞ്ഞോ മോളേ?', 'Thenga udanjo mole?', 'Did the coconut break, dear?'],
});

export const templeFlowerSeller = D('temple-flower-seller', {
  name: 'Pankajam', role: 'flower and coconut seller', site: 'Kerala temple, offering stall', diff: 1,
  voice: { rate: 1.05, pitch: 1.15 },
  persona: 'Woman in a cream set-saree with a basket of jasmine, calling "poovu, thenga" to devotees.',
  goal: 'Ask for a coconut and some flowers.',
  steps: [
    S('buy', ['പൂവ്, തേങ്ങ! ഭഗവാന് സമർപ്പിക്കാൻ വേണോ?', 'Poovu, thenga! Bhagavaanu samarppikkaan veno?', 'Flowers, coconuts! Want some to offer to the Lord?'],
      'Ask for one coconut and some flowers.', ['Oru thengayum kurachu poovum tharoo.', 'ഒരു തേങ്ങയും കുറച്ച് പൂവും തരൂ.'],
      ['oru thenga venam', 'thengayum poovum venam chechi', 'poovum thengayum tharamo', 'oru thenga oru poovu', 'chechi thenga tharoo', 'ഒരു തേങ്ങയും പൂവും വേണം'],
      'buy_coconut_and_flowers', ['Ask for the offering.', '"Thenga" = coconut. "Poovu" = flower.'],
      ['ഇതാ, ഇരുപത് രൂപ. ഭക്തിയോടെ സമർപ്പിക്കൂ.', 'Ithaa, irupathu roopa. Bhakthiyote samarppikkoo.', 'Here, twenty rupees. Offer it with devotion.'],
      ['പൂവാണോ തേങ്ങയാണോ?', 'Poovaano thengayaano?', 'Flowers or coconut?']),
  ],
  outro: ['ചെരിപ്പ് പുറത്ത് വിട്ടോ, മോളേ.', 'Cherippu purath vitto, mole.', 'Leave your sandals outside, dear.'],
  learned: [['oru thenga venam', 'I want a coconut']],
  again: ['പൂവ് വാടും മുൻപ് സമർപ്പിക്കൂ.', 'Poovu vaadum munpu samarppikkoo.', 'Offer the flowers before they wilt.'],
});

export const chappalKeeper = D('temple-shoe-keeper', {
  name: 'Raman Nair', role: 'chappal keeper', site: 'Kerala temple, by the row of chappals', diff: 1,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Old bald man with specs standing guard over the visitors\' chappals, a towel on his shoulder.',
  goal: 'Ask him to keep your sandals.',
  steps: [
    S('keep', ['ചെരിപ്പ് ഇവിടെ വെക്കാം. ടോക്കൺ എടുത്തോ.', 'Cheruppu ivide vekkaam. Token eduthoo.', 'You can leave your sandals here. Take a token.'],
      'Ask him to keep your sandals safe.', ['Ente cheruppu sookshichu vekkamo?', 'എന്റെ ചെരുപ്പ് സൂക്ഷിച്ച് വെക്കാമോ?'],
      ['cheruppu vekkamo chetta', 'cheruppu nokkamo', 'ente chappal ivide vekkaam', 'cheruppu sookshikkamo', 'chetta cheruppu onnu nokkane', 'ചെരുപ്പ് വെക്കാമോ ചേട്ടാ'],
      'ask_to_keep_sandals', ['Ask him to mind your sandals.', '"Cheruppu" = sandals.'],
      ['വെച്ചോ, ഞാൻ ഇവിടെ കാവൽ ഉണ്ട്.', 'Vecho, njaan ivide kaaval undu.', 'Leave them, I am here on guard.'],
      ['ചെരുപ്പ് വെക്കണോ?', 'Cheruppu vekkano?', 'Do you want to leave your sandals?']),
  ],
  outro: ['ദർശനം കഴിഞ്ഞ് ടോക്കൺ തരൂ.', 'Darshanam kazhinju token tharoo.', 'Give the token after the darshan.'],
  learned: [['cheruppu vekkamo?', 'may I leave my sandals?']],
  again: ['ചെരുപ്പ് സുരക്ഷിതമാണ്.', 'Cheruppu surakshithamaanu.', 'Your sandals are safe.'],
});

// Food-delivery rider by his scooter at Fort Kochi.
import { dialogue as D, step as S } from './kit.js';

export default D('dabbawala', {
  name: 'Shibu', role: 'food-delivery rider', site: 'Fort Kochi, delivery scooter by the Chinese nets', diff: 3,
  voice: { rate: 1.15, pitch: 0.95 },
  persona: 'Always-late rider who knows every meals hotel and chaya kada in the city and talks about traffic and addresses.',
  goal: 'Ask for a minute to talk, ask how he finds addresses so fast, and praise him.',
  steps: [
    S('minute', ['ഒരു മിനിറ്റ് മോളേ, ഓർഡർ നോക്കട്ടെ. എന്താ?', 'Oru minute mole, order nokkatte. Enthaa?', 'One minute dear, let me check the order. What is it?'],
      'Ask if you can talk to him for a minute.', ['Chetta, oru minute samsaarikkamo?', 'ചേട്ടാ, ഒരു മിനിറ്റ് സംസാരിക്കാമോ?'],
      ['oru minute samsaarikkaamo chetta', 'chetta onnu samsaarikkamo', 'oru minute thaa chetta', 'kurachu samsaarikkamo chetta', 'chetta oru minute undo', 'ഒരു മിനിറ്റ് ഉണ്ടോ ചേട്ടാ'],
      'ask_for_a_minute', ['Ask for a minute to talk.', '"Samsaarikkamo?" = can we talk?'],
      ['ശരി, ചോദിച്ചോ. പക്ഷേ വേഗം വേണം.', 'Shari, chodicho. Pakshe vegam venam.', 'Okay, ask. But be quick.'],
      ['എന്താ മോളേ? സമയമില്ല.', 'Enthaa mole? Samayamilla.', 'What, dear? I have no time.']),
    S('fast', ['എല്ലാ വീടും എനിക്കറിയാം. ചോദിക്ക്.', 'Ellaa veedum enikkariyam. Chodikku.', 'I know every house. Ask away.'],
      'Ask how he finds addresses so fast.', ['Engane ithra vegam address kandupidikkunnu?', 'എങ്ങനെ ഇത്ര വേഗം അഡ്രസ് കണ്ടുപിടിക്കുന്നു?'],
      ['ithra vegam engane chetta', 'address engane kandupidikkum', 'engane ithra vegam pokunnu', 'vegam engane chetta', 'ithra vegam aaryamo', 'എങ്ങനെ ഇത്ര വേഗം'],
      'ask_how_so_fast', ['Ask how he is so fast.', '"Engane" = how. "Vegam" = fast.'],
      ['ഫോണിൽ മാപ്പും പിന്നെ പത്തു വർഷത്തെ പരിചയവും!', 'Phonil mapum pinne patthu varshathe parichayavum!', 'A map on the phone and ten years of practice!'],
      ['എന്താ ചോദിച്ചത്? വേഗത്തെ പറ്റിയാണോ?', 'Enthaa chodichathu? Vegatthe pattiyaano?', 'What did you ask? About speed?']),
    S('praise', ['ഇനി ഞാൻ പോട്ടെ, ഓർഡർ വൈകി.', 'Ini njaan potte, order vaiki.', 'Let me go now, the order is late.'],
      'Tell him he is very fast, well done.', ['Chettan valare vegamaanu, kollaam!', 'ചേട്ടൻ വളരെ വേഗമാണ്, കൊള്ളാം!'],
      ['kollaam chetta', 'chetta super aanu', 'valare vegam chetta', 'nannayittundu chetta', 'chetta kidilam', 'കൊള്ളാം ചേട്ടാ'],
      'praise_the_rider', ['Praise him.', '"Kollaam" = nice, well done.'],
      ['നന്ദി മോളേ! ഫോർട്ട് കൊച്ചിയിൽ മീൻ ഊണ് കഴിക്കണം.', 'Nanni mole! Fort Kochiyil meen oonu kazhikkanam.', 'Thanks dear! Have a fish meal in Fort Kochi.'],
      ['എന്താ പറഞ്ഞത്?', 'Enthaa paranjathu?', 'What did you say?']),
  ],
  outro: ['സൂക്ഷിച്ച് പോകൂ മോളേ, ഞാൻ ഓടട്ടെ!', 'Sookshichu pokoo mole, njaan odatte!', 'Take care dear, let me run!'],
  learned: [['oru minute samsaarikkamo?', 'can we talk a minute?'], ['engane ithra vegam?', 'how are you so fast?'], ['kollaam', 'well done']],
  again: ['ഓർഡർ വൈകുന്നു മോളേ, പിന്നെ കാണാം.', 'Order vaikunnu mole, pinne kaanaam.', 'The order is late, dear, see you later.'],
});

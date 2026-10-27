// Photographer with a tripod facing the Chinese nets.
import { dialogue as D, step as S } from './kit.js';

export default D('photographer', {
  name: 'Sathyan Chettan', role: 'photographer', site: 'Fort Kochi, photo tripod facing the Chinese nets', diff: 2,
  voice: { rate: 1.0, pitch: 0.95 },
  persona: 'Photographer with a press badge, framing a sunset shot of the nets; offers to photograph visitors for a hundred rupees.',
  goal: 'Ask him to take your photo, ask the price, and ask when it will be ready.',
  steps: [
    S('photo', ['മോളേ, ഫോട്ടോ വേണോ? വലയുടെ മുന്നിൽ നല്ല ആംഗിളാണ്.', 'Mole, photo veno? Valayude munnil nalla angleaanu.', 'Dear, want a photo? A great angle in front of the nets.'],
      'Ask him to take your photo.', ['Chetta, ente oru photo edukkamo?', 'ചേട്ടാ, എന്റെ ഒരു ഫോട്ടോ എടുക്കാമോ?'],
      ['photo edukkamo chetta', 'oru photo edukkoo', 'ente photo edukkane', 'chetta photo venam', 'oru photo please chetta', 'ഫോട്ടോ എടുക്കാമോ ചേട്ടാ'],
      'ask_for_a_photo', ['Say yes and ask for a photo.', '"Photo edukkamo?" = can you take a photo?'],
      ['ശരി, തൊപ്പി ഒന്ന് ശരിയാക്കൂ, ചിരിക്കൂ!', 'Shari, thoppi onnu shariyaakkoo, chirikkoo!', 'Okay, fix your hat, and smile!'],
      ['ഫോട്ടോ വേണോ മോളേ?', 'Photo veno mole?', 'Do you want a photo, dear?']),
    S('price', ['ഒരു ഫോട്ടോ മാത്രം മതിയോ? ഞാൻ ഒന്ന് ഫ്രെയിം ചെയ്യട്ടെ.', 'Oru photo maathram mathiyo? Njaan onnu frame cheyyatte.', 'Is one photo enough? Let me frame it.'],
      'Ask how much it costs.', ['Photoykku ethra roopayaa?', 'ഫോട്ടോയ്ക്ക് എത്ര രൂപയാ?'],
      ['photo ethra roopa', 'ethra roopa aakum chetta', 'chetta charge ethra', 'photo rate ethra', 'ethrayaa chetta photo', 'ഫോട്ടോ എത്രയാ'],
      'ask_photo_price', ['Ask the price.', '"Photoykku" = for the photo.'],
      ['നൂറ് രൂപ മോളേ. സൂര്യാസ്തമയത്തോടെ ഇരട്ടി ഭംഗി.', 'Nooru roopa mole. Sooryaasthamayathote iratti bhangi.', 'A hundred rupees, dear. Twice as pretty at sunset.'],
      ['വില ചോദിക്കുന്നതാണോ?', 'Vila chodikkunnathaano?', 'Are you asking the price?']),
    S('ready', ['ഇതാ എടുത്തു. പ്രിന്റ് വേണോ ഫോണിൽ അയക്കണോ?', 'Ithaa eduthu. Print veno phonil ayakkano?', 'Done. Print or send it to your phone?'],
      'Ask when the photo will be ready.', ['Photo eppol kittum chetta?', 'ഫോട്ടോ എപ്പോൾ കിട്ടും ചേട്ടാ?'],
      ['eppol kittum photo', 'photo ethra neram edukkum', 'eppo ready aakum chetta', 'photo eppol tharum', 'ready aakumbol parayamo', 'ഫോട്ടോ എപ്പോൾ കിട്ടും'],
      'ask_when_ready', ['Ask when you get it.', '"Eppol" = when. "Kittum" = will I get.'],
      ['പത്ത് മിനിറ്റ് മതി മോളേ. അതുവരെ വല കാണൂ.', 'Pathu minute mathi mole. Athuvare vala kaanoo.', 'Ten minutes is enough. Look at the nets till then.'],
      ['എപ്പോൾ വേണമെന്നാ ചോദിക്കുന്നത്?', 'Eppol venamennaa chodikkunnathu?', 'When do you want it, you mean?']),
  ],
  outro: ['സൂര്യാസ്തമയത്തിന് വരണം, അപ്പോഴാണ് ഏറ്റവും നല്ല ഫോട്ടോ!', 'Sooryaasthamayathinu varanam, appozhaanu ettavum nalla photo!', 'Come at sunset, that is when the best photos happen!'],
  learned: [['photo edukkamo?', 'can you take a photo?'], ['photoykku ethra roopa?', 'how much for the photo?'], ['photo eppol kittum?', 'when will I get the photo?']],
  again: ['ഒരു ഫോട്ടോ കൂടി വേണോ മോളേ?', 'Oru photo koodi veno mole?', 'Want one more photo, dear?'],
});

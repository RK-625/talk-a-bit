// Kerala police constable directing traffic at the Fort Kochi junction.
import { dialogue as D, step as S } from './kit.js';

export default D('trafficCop', {
  name: 'Constable Mathew', role: 'police constable', site: 'Fort Kochi road junction by the Chinese nets', diff: 3,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Strict but fair traffic constable who whistles at scooters, then softens when a backpacker asks for the way in her careful Malayalam.',
  goal: 'Ask the way to Mattancherry Palace, ask if it is far, and thank him.',
  steps: [
    S('way', ['ഹലോ, എന്താ വേണ്ടത്? ഇവിടെ നിൽക്കരുത്.', 'Hello, enthaa vendathu? Ivide nilkkaruthu.', 'Hello, what do you need? Do not stand here.'],
      'Ask the way to Mattancherry Palace.', ['Saare, Mattancherry palace-ilekku vazhi ethaa?', 'സാറേ, മട്ടാഞ്ചേരി പാലസിലേക്ക് വഴി ഏതാ?'],
      ['saare mattancherry palace evide', 'mattancherry palace-ilekku vazhi parayamo saare', 'palace-ilekku vazhi ethaa', 'mattancherry evideyaanu saare', 'saare palace evide', 'മട്ടാഞ്ചേരി പാലസ് എവിടെയാ'],
      'ask_way_to_palace', ['Ask for the way to the palace.', '"Vazhi ethaa?" = which way?'],
      ['നേരെ പോയി ഇടത്തോട്ട് തിരിയൂ.', 'Nere poyi idatthottu thiriyoo.', 'Go straight and turn left.'],
      ['എവിടേക്കാ പോകേണ്ടത്? ഒന്നൂടെ പറയൂ.', 'Evidekkaa pokendathu? Onnoode parayoo.', 'Where do you want to go? Say it again.']),
    S('far', ['ഇവിടെ നിന്ന് നേരെ പോയാൽ മതി. ഓട്ടോ കിട്ടും.', 'Ivide ninnu nere poyaal mathi. Auto kittum.', 'Just go straight from here. You will get an auto.'],
      'Ask if it is far.', ['Dooram undo saare?', 'ദൂരം ഉണ്ടോ സാറേ?'],
      ['dooram undo', 'ithra dooram undo saare', 'valare dooram undo', 'nadannu pokaamo saare', 'dooramundo saare', 'ദൂരമുണ്ടോ സാറേ'],
      'ask_if_far', ['Ask if the distance is long.', '"Dooram" = distance. "Undo?" = is there?'],
      ['ഇല്ല, മൂന്ന് കിലോമീറ്റർ മാത്രം. ഓട്ടോയിൽ പോകാം.', 'Illa, moonnu kilometre maathram. Autoyil pokaam.', 'No, only three kilometres. Go by auto.'],
      ['ദൂരമാണോ ചോദിച്ചത്?', 'Dooramaano chodichathu?', 'Did you ask about the distance?']),
    S('thanks', ['ഹെൽമെറ്റ് ഇല്ലാതെ സ്കൂട്ടർ എടുക്കരുത് കേട്ടോ. സൂക്ഷിച്ച് പോ.', 'Helmet illaathe scooter edukkaruthu kettoo. Sookshichu po.', 'Never take a scooter without a helmet. Go carefully.'],
      'Thank him.', ['Valare nanni saare.', 'വളരെ നന്ദി സാറേ.'],
      ['nanni saare', 'thanks saare', 'valare nanni', 'nanni saare sookshichu pokaam', 'shari saare nanni', 'നന്ദി സാറേ'],
      'thank_the_constable', ['Thank the constable.', '"Nanni" = thanks. "Valare" = very.'],
      ['ശരി ശരി. കൊച്ചി ആസ്വദിക്ക് മോളേ.', 'Shari shari. Kochi aaswadikku mole.', 'Okay okay. Enjoy Kochi, dear.'],
      ['എന്താ മോളേ? ഒന്നും പറഞ്ഞില്ലല്ലോ.', 'Enthaa mole? Onnum paranjillallo.', 'What, dear? You did not say anything.']),
  ],
  outro: ['ഗതാഗതം നോക്കി വേണം റോഡ് കടക്കാൻ, കേട്ടോ!', 'Gathaagatham nokki venam road kadakkaan, kettoo!', 'Watch the traffic when you cross the road, okay!'],
  learned: [['vazhi ethaa?', 'which way is it?'], ['dooram undo?', 'is it far?'], ['valare nanni', 'thank you very much']],
  again: ['ഇനിയും വഴി ചോദിക്കാനുണ്ടോ മോളേ?', 'Iniyum vazhi chodikkaanundo mole?', 'Any more directions to ask, dear?'],
});

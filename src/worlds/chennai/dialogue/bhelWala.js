// Molaga bajji seller at the Elliot's Beach bajji cart.
import { dialogue as D, step as S } from './kit.js';

export default D('bhelWala', {
  name: 'Subbu Anna', role: 'molaga bajji seller', site: "Elliot's Beach, molaga bajji cart", diff: 3,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Round man with a towel round his head, dipping long green chillies in batter and calling "molaga bajji, soodaa!"; generous with chutney and curious about Meera camera.',
  goal: 'Order two molaga bajji, ask for coconut chutney, and pay forty rupees.',
  steps: [
    S('order', ['மிளகா பஜ்ஜி, சூடா! சாப்பிடுறீங்களா மீரா?', 'Molaga bajji, soodaa! Saappidureengalaa Meera?', 'Molaga bajji, hot! Will you eat some, Meera?'],
      'Order two molaga bajji.', ['Anna, rendu molaga bajji kudunga.', 'அண்ணா, ரெண்டு மொளகா பஜ்ஜி கொடுங்க.'],
      ['rendu molaga bajji kudunga', 'anna rendu molaga bajji kudunga', 'rendu bajji kudunga anna', 'rendu bajji venum anna', 'molaga bajji rendu podunga', 'ரெண்டு மொளகா பஜ்ஜி கொடுங்க', 'ரெண்டு பஜ்ஜி வேணும் அண்ணா'],
      'order_two_molaga_bajji', ['Say how many and what.', 'Two = "rendu". Chilli bajji = "molaga bajji".', 'Say: "Anna, rendu molaga bajji kudunga."'],
      ['இதோ, எண்ணெய்ல இருந்து இப்பதான் எடுத்தேன்!', 'Idho, ennai-la irundhu ippadhaan edutthen!', 'Here, I just took it out of the oil!'],
      ['கடல் காத்துல கேக்கல மீரா. திரும்ப சொல்லுங்க.', 'Kadal kaatthula kekkala Meera. Thirumba sollunga.', 'The sea wind drowned it out, Meera. Say it again.']),
    S('chutney', ['சட்னி வேணுமா? தேங்கா சட்னி, புதினா சட்னி இருக்கு.', 'Chutney venumaa? Thengaa chutney, pudhinaa chutney irukku.', 'Want chutney? I have coconut and mint chutney.'],
      'Ask for coconut chutney.', ['Thengaai chutney kudunga anna.', 'தேங்காய் சட்னி கொடுங்க அண்ணா.'],
      ['thengaai chutney kudunga anna', 'thengaai chutney podunga', 'thengaa chutney venum anna', 'coconut chutney kudunga anna', 'chutney thengaai podunga', 'தேங்காய் சட்னி கொடுங்க', 'தேங்கா சட்னி வேணும்'],
      'ask_coconut_chutney', ['Pick a chutney.', 'Coconut = "thengaai". Chutney = "chutney".', 'Say: "Thengaai chutney kudunga anna."'],
      ['நல்ல செலக்ஷன்! இதுதான் பஜ்ஜிக்கு பெஸ்ட்.', 'Nalla selection! Idhudhaan bajjikku best.', 'Good choice! This is the best with bajji.'],
      ['எந்த சட்னின்னு சொல்லுங்க, சூடு ஆறிடும்.', 'Endha chutnynnu sollunga, soodu aaridum.', 'Tell me which chutney, it will go cold.']),
    S('pay', ['ரெண்டு பஜ்ஜி, சட்னி எல்லாம் சேர்த்து நாற்பது ரூபா.', 'Rendu bajji, chutney ellaam serthu naarpadhu rubaa.', 'Two bajjis with chutney, forty rupees in all.'],
      'Pay forty rupees.', ['Naarpadhu rubaa, idhaanga anna.', 'நாற்பது ரூபா, இதாங்க அண்ணா.'],
      ['naarpadhu rubaa idhaanga anna', 'idhaanga anna naarpadhu rubaa', 'naarpadhu rubaa anna', 'anna naarpadhu rubaa', 'forty rupees idhaanga', 'நாற்பது ரூபா இதாங்க', 'இதாங்க அண்ணா நாற்பது ரூபா'],
      'pay_forty_rupees', ['Hand over the money.', 'Forty = "naarpadhu".', 'Say: "Naarpadhu rubaa, idhaanga anna."'],
      ['சூப்பர்! போட்டோ எடுத்து உங்க ப்ளாக்ல போடுங்க, நல்லா இருக்கும்.', 'Super! Photo eduthu unga blog-la podunga, nallaa irukkum.', 'Great! Take a photo and put it on your blog, it will look nice.'],
      ['பணம் தரலயே? நாற்பது ரூபா.', 'Panam tharalaiye? Naarpadhu rubaa.', 'You have not paid? Forty rupees.']),
  ],
  outro: ['சாப்பிட்டு பாத்துட்டு சொல்லுங்க மீரா, எத்தனை ஸ்டார்?', 'Saappittu paatthuttu sollunga Meera, etthanai star?', 'Eat and tell me, Meera, how many stars?'],
  learned: [['rendu molaga bajji kudunga', 'give me two molaga bajji'], ['thengaai chutney', 'coconut chutney'], ['naarpadhu rubaa', 'forty rupees']],
  again: ['மீரா, இன்னொரு பஜ்ஜி சாப்பிடுறீங்களா?', 'Meera, innoru bajji saappidureengalaa?', 'Meera, will you eat another bajji?'],
});

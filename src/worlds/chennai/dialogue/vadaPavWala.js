// Sundal / murukku seller at the tea-kadai square cart.
import { dialogue as D, step as S } from './kit.js';

export default D('vadaPavWala', {
  name: 'Ravi Anna', role: 'sundal and murukku seller', site: 'Tea-kadai square, sundal and murukku cart', diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Chatty sundal and murukku seller with busy hands who presses a hot cone on Meera to taste before she even asks.',
  goal: 'Order two sundal cones, ask for less spice, and pay thirty rupees.',
  steps: [
    S('order', ['சுடச்சுட சுண்டல், முறுக்கு! என்ன வேணும் மீரா?', 'Sudasuda sundal, murukku! Enna venum Meera?', 'Hot sundal, murukku! What do you want, Meera?'],
      'Order two sundal cones.', ['Anna, rendu sundal kudunga.', 'அண்ணா, ரெண்டு சுண்டல் கொடுங்க.'],
      ['rendu sundal kudunga', 'anna rendu sundal kudunga', 'rendu sundal venum anna', 'two sundal kudunga anna', 'sundal rendu podunga', 'ரெண்டு சுண்டல் கொடுங்க', 'அண்ணா ரெண்டு சுண்டல் வேணும்'],
      'order_two_sundal', ['Say how many and what.', 'Two = "rendu". Sundal = "sundal".', 'Say: "Anna, rendu sundal kudunga."'],
      ['இந்தா, முதல்ல ஒரு வாய் சாப்பிட்டு பாருங்க.', 'Indhaa, mudhalla oru vaai saappittu paarunga.', 'Here, first taste a mouthful.'],
      ['சத்தம் ஜாஸ்தி, சரியா கேக்கல. திரும்ப சொல்லுங்க.', 'Sattam jaasthi, sariyaa kekkala. Thirumba sollunga.', 'It is noisy, I did not hear properly. Say it again.']),
    S('spice', ['மாங்கா, மிளகாய் போடவா? காரமா இருக்கும்.', 'Maangaa, milagaai podavaa? Kaaramaa irukkum.', 'Shall I add mango and chilli? It will be spicy.'],
      'Ask him to make it less spicy.', ['Kaaram konjam kammiyaa podunga.', 'காரம் கொஞ்சம் கம்மியா போடுங்க.'],
      ['kaaram kammiyaa podunga', 'kaaram konjam kammiyaa podunga', 'kaaram kammi anna', 'kaaram vendaam anna', 'kammiyaa kaaram podunga anna', 'காரம் கம்மியா போடுங்க', 'காரம் கொஞ்சம் கம்மி'],
      'ask_less_spice', ['Ask for less chilli.', 'Spice = "kaaram". Less = "kammi".', 'Say: "Kaaram konjam kammiyaa podunga."'],
      ['சரி, எலுமிச்சை மட்டும் புழிஞ்சு தரேன்.', 'Sari, elumichai mattum pizhinju tharen.', 'Okay, I will just squeeze some lemon.'],
      ['காரம் கூடவா, கம்மியா? சொல்லுங்க.', 'Kaaram koodavaa, kammiyaa? Sollunga.', 'More spice or less? Tell me.']),
    S('pay', ['ரெண்டு சுண்டல் ரெடி! மொத்தம் முப்பது ரூபா.', 'Rendu sundal ready! Mottham muppadhu rubaa.', 'Two sundal ready! Thirty rupees in all.'],
      'Pay thirty rupees.', ['Indhaanga anna, muppadhu rubaa.', 'இந்தாங்க அண்ணா, முப்பது ரூபா.'],
      ['indhaanga anna muppadhu rubaa', 'muppadhu rubaa indhaanga', 'idhaanga muppadhu rubaa', 'anna muppadhu rubaa', 'இந்தாங்க முப்பது ரூபா', 'முப்பது ரூபா இந்தாங்க அண்ணா', 'thirty rupees indhaanga'],
      'pay_thirty_rupees', ['Hand over the money and say how much.', 'Thirty = "muppadhu". Rupees = "rubaa".', 'Say: "Indhaanga anna, muppadhu rubaa."'],
      ['சரியா இருக்கு! ஒரு முறுக்கு இலவசம், டேஸ்ட் பண்ணுங்க.', 'Sariyaa irukku! Oru murukku ilavasam, taste pannunga.', 'Exactly right! A free murukku, try it.'],
      ['காசு கொடுக்கலயே? முப்பது ரூபா.', 'Kaasu kodukkalaiye? Muppadhu rubaa.', 'You have not paid yet? Thirty rupees.']),
  ],
  outro: ['உங்க ப்ளாக்ல என் சுண்டல பத்தி எழுதுங்க மீரா!', 'Unga blog-la en sundala patthi ezhudhunga Meera!', 'Write about my sundal on your blog, Meera!'],
  learned: [['rendu sundal kudunga', 'give me two sundal'], ['kaaram kammiyaa podunga', 'make it less spicy'], ['muppadhu rubaa', 'thirty rupees']],
  again: ['மீரா, இன்னும் சுண்டல் வேணுமா? சூடா இருக்கு!', 'Meera, innum sundal venumaa? Soodaa irukku!', 'Meera, more sundal? It is hot!'],
});

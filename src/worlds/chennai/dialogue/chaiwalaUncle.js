// Tutorial: the easiest conversation. Keyed by role `chaiwalaUncle` (Murugan Anna at the tea kadai, the spawn spot).
import { dialogue as D, step as S } from './kit.js';

export default D('chaiwalaUncle', {
  name: 'Murugan Anna', role: 'tea-kadai owner', site: 'Tea-kadai square, Murugan Anna tea kadai (spawn)', diff: 1, tutorial: true, place: 'tea kadai',
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Warm, slightly teasing tea-kadai owner who treats Meera, a food blogger from Pune learning Tamil, like a niece. Speaks simply and slowly, corrects her kindly.',
  goal: 'Order one filter coffee from Murugan Anna (tutorial).',
  steps: [
    S('order', ['வாங்க மீரா! என்ன வேணும், டீயா காபியா?', 'Vaanga Meera! Enna venum, teeyaa coffeeyaa?', 'Come Meera! What do you want, tea or coffee?'],
      'Order one filter coffee.', ['Anna, oru coffee kudunga.', 'அண்ணா, ஒரு காபி கொடுங்க.'],
      ['oru coffee kudunga', 'anna oru coffee kudunga', 'oru filter coffee kudunga', 'oru coffee venum anna', 'anna one coffee kudunga', 'ஒரு காபி கொடுங்க', 'அண்ணா ஒரு காபி வேணும்'],
      'order_one_filter_coffee', ['Say "one coffee" and "please give".', 'One = "oru". Please give = "kudunga".', 'Say: "Anna, oru coffee kudunga."'],
      ['இந்தாங்க, சூடா இருக்கு. மெதுவா குடிங்க.', 'Indhaanga, soodaa irukku. Methuvaa kudinga.', 'Here, it is hot. Drink slowly.'],
      ['என்ன சொன்னீங்க? கொஞ்சம் சத்தமா சொல்லுங்க.', 'Enna sonneenga? Konjam sattamaa sollunga.', 'What did you say? Say it a bit louder.']),
    S('biscuit', ['கூடவே ஒரு பிஸ்கட் வேணுமா?', 'Koodavae oru biscuit venumaa?', 'Do you want a biscuit with it?'],
      'Say no thanks, coffee is enough.', ['Venaam anna, coffee mattum podhum.', 'வேணாம் அண்ணா, காபி மட்டும் போதும்.'],
      ['venaam anna coffee mattum podhum', 'venaam anna', 'venaam coffee mattum podhum', 'illa anna coffee podhum', 'வேணாம் அண்ணா', 'வேணாம் காபி மட்டும் போதும்', 'venam anna podhum'],
      'decline_biscuit', ['Say no politely.', 'No thanks = "venaam". Enough = "podhum".', 'Say: "Venaam anna, coffee mattum podhum."'],
      ['சரி சரி, காபி மட்டும் ஆகட்டும்.', 'Sari sari, coffee mattum aagattum.', 'Okay okay, just the coffee then.'],
      ['பிஸ்கட் வேணுமா, வேணாமா?', 'Biscuit venumaa, venaamaa?', 'Biscuit, yes or no?']),
    S('praise', ['எப்படி இருக்கு காபி? உங்க ஊர்ல இப்படி கிடைக்குமா?', 'Eppadi irukku coffee? Unga oorla ippadi kidaikkumaa?', 'How is the coffee? Do you get this in your town?'],
      'Say the coffee is very good and thank him.', ['Coffee romba nalla irukku anna, nandri!', 'காபி ரொம்ப நல்லா இருக்கு அண்ணா, நன்றி!'],
      ['coffee romba nalla irukku anna nandri', 'romba nalla irukku anna', 'coffee super anna nandri', 'nandri anna', 'காபி ரொம்ப நல்லா இருக்கு', 'ரொம்ப நல்லா இருக்கு அண்ணா', 'thanks anna coffee nalla irukku'],
      'praise_coffee_and_thank', ['Say the coffee is good.', 'Very good = "romba nalla". Thanks = "nandri".', 'Say: "Coffee romba nalla irukku anna, nandri!"'],
      ['ஹா ஹா, நல்லா சொன்னீங்க! தமிழ் வந்துடுச்சு உங்களுக்கு.', 'Haa haa, nallaa sonneenga! Tamizh vandhuduchu ungalukku.', 'Ha ha, well said! You are getting the hang of Tamil.'],
      ['காபி பிடிச்சிருக்கா, இல்லையா?', 'Coffee pidichirukkaa, illaiyaa?', 'Do you like the coffee or not?']),
  ],
  outro: ['சபாஷ் மீரா! இப்போ சென்னை முழுக்க சாப்பிட்டுட்டு வாங்க.', 'Shabaash Meera! Ippo Chennai muzhukka saappittuttu vaanga.', 'Well done, Meera! Now go eat your way around Chennai.'],
  learned: [['oru coffee kudunga', 'please give me one coffee'], ['venaam, podhum', 'no thanks, enough'], ['romba nalla irukku', 'it is very good']],
  again: ['மீரா, திரும்ப வந்துட்டீங்களா? இன்னொரு காபி வேணுமா?', 'Meera, thirumba vandhutteengalaa? Innoru coffee venumaa?', 'Meera, back again? Want another coffee?'],
});

// Ilaneer (tender coconut) seller at the Elliot's Beach stall.
import { dialogue as D, step as S } from './kit.js';

export default D('golaWala', {
  name: 'Ganesan', role: 'ilaneer seller', site: "Elliot's Beach, tender-coconut stall", diff: 3,
  voice: { rate: 1.05, pitch: 0.95 },
  persona: 'Thin man with a handlebar moustache hacking the top off a green coconut with a machete, then scooping the soft malai for customers.',
  goal: 'Order one ilaneer, ask for the soft malai, and pay fifty rupees.',
  steps: [
    S('order', ['இளநீர் இளநீர்! ஜில்லுன்னு இருக்கு! ஒண்ணு வெட்டவா?', 'Ilaneer ilaneer! Jillunnu irukku! Onnu vettavaa?', 'Tender coconut! Nice and cool! Shall I cut one?'],
      'Order one tender coconut.', ['Anna, oru ilaneer kudunga.', 'அண்ணா, ஒரு இளநீர் கொடுங்க.'],
      ['oru ilaneer kudunga', 'anna oru ilaneer kudunga', 'oru ilaneer venum anna', 'ilaneer onnu kudunga', 'one ilaneer kudunga anna', 'ஒரு இளநீர் கொடுங்க', 'அண்ணா ஒரு இளநீர் வேணும்'],
      'order_one_ilaneer', ['Say what and how many.', 'One = "oru". Tender coconut = "ilaneer".', 'Say: "Anna, oru ilaneer kudunga."'],
      ['இந்தாங்க! மேல வெட்டிட்டேன், ஸ்ட்ரா போட்டு குடிங்க.', 'Indhaanga! Mela vettittaen, straw pottu kudinga.', 'Here! I have cut the top, drink with the straw.'],
      ['சத்தம் ஜாஸ்தி, திரும்ப சொல்லுங்க மீரா.', 'Sattham jaasthi, thirumba sollunga Meera.', 'Too noisy, say it again, Meera.']),
    S('malai', ['தண்ணி குடிச்சாச்சா? உள்ள வழுக்கை இருக்கு.', 'Thanni kudichaachaa? Ulla vazhukkai irukku.', 'Done with the water? There is soft malai inside.'],
      'Ask for the soft malai too.', ['Vazhukkai kooda kudunga anna.', 'வழுக்கை கூட கொடுங்க அண்ணா.'],
      ['vazhukkai kooda kudunga anna', 'vazhukkai kudunga', 'vazhukkai venum anna', 'malai kooda kudunga anna', 'vazhukkai kooda venum', 'வழுக்கை கூட கொடுங்க', 'வழுக்கை வேணும் அண்ணா'],
      'ask_for_malai', ['Ask for the soft coconut.', '"Vazhukkai" = tender coconut flesh.', 'Say: "Vazhukkai kooda kudunga anna."'],
      ['இதோ! தேங்கா ஓட்டு துண்டுல ஸ்பூன் மாதிரி சாப்பிடுங்க.', 'Idho! Thengaa ottu thundula spoon maadhiri saappidunga.', 'Here! Eat it with a shell piece as a spoon.'],
      ['வழுக்கை வேணுமா, வேணாமா?', 'Vazhukkai venumaa, venaamaa?', 'Soft malai, yes or no?']),
    S('pay', ['சூப்பரா இருந்துச்சா? ஐம்பது ரூபா.', 'Superaa irundhuchaa? Aimbadhu rubaa.', 'Was it great? Fifty rupees.'],
      'Pay fifty rupees.', ['Aimbadhu rubaa, idho anna.', 'ஐம்பது ரூபா, இதோ அண்ணா.'],
      ['aimbadhu rubaa idho anna', 'idho anna aimbadhu rubaa', 'aimbadhu rubaa anna', 'anna aimbadhu rubaa kudukkaren', 'fifty rupees idho anna', 'ஐம்பது ரூபா இதோ', 'ஐம்பது ரூபா இதோ அண்ணா'],
      'pay_fifty_rupees', ['Hand over fifty rupees.', 'Fifty = "aimbadhu".', 'Say: "Aimbadhu rubaa, idho anna."'],
      ['நன்றி! வெயில் ஜாஸ்தி, தண்ணி நிறைய குடிங்க.', 'Nandri! Veyil jaasthi, thanni niraiya kudinga.', 'Thanks! It is very sunny, drink plenty of water.'],
      ['காசு தரீங்களா மீரா? அடுத்த ஆள் நிக்கறாங்க.', 'Kaasu thareengalaa Meera? Adutha aal nikkaraanga.', 'Will you pay, Meera? The next person is waiting.']),
  ],
  outro: ['நாளைக்கும் வாங்க மீரா, இன்னும் நல்ல இளநீர் இருக்கு!', 'Naalaikkum vaanga Meera, innum nalla ilaneer irukku!', 'Come tomorrow too, Meera, I have even better ilaneer!'],
  learned: [['oru ilaneer kudunga', 'give me one ilaneer'], ['vazhukkai kooda kudunga', 'give me the soft malai too'], ['aimbadhu rubaa', 'fifty rupees']],
  again: ['மீரா, இன்னொரு இளநீர் வெட்டவா?', 'Meera, innoru ilaneer vettavaa?', 'Meera, shall I cut another ilaneer?'],
});

// Temple gurukkal at the Kapaleeshwarar-style temple door.
import { dialogue as D, step as S } from './kit.js';

export default D('priest', {
  name: 'Gurukkal Sundaram', role: 'temple gurukkal', site: 'Kapaleeshwarar-style temple door (gopuram shrine)', diff: 3,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Round bare-chested gurukkal with vibhuti on his forehead, ringing the bell and offering the camphor flame; explains the gopuram and the prasadam in slow Tamil.',
  goal: 'Greet him respectfully, ask which festival is on, and ask for prasadam.',
  steps: [
    S('greet', ['ஓம் நமச்சிவாய! வாங்கம்மா, தரிசனம் பண்ணுங்க.', 'Om Namashivaaya! Vaangammaa, dharisanam pannunga.', 'Om Namashivaya! Come, dear, have darshan.'],
      'Greet him respectfully.', ['Vanakkam saami.', 'வணக்கம் சாமி.'],
      ['vanakkam saami', 'vanakkam gurukkale', 'saami vanakkam', 'vanakkam saami nalla irukkeengala', 'namaskaram saami', 'வணக்கம் சாமி', 'வணக்கம் குருக்களே'],
      'greet_gurukkal', ['Greet him respectfully.', '"Vanakkam" = hello. "Saami" = sir, priest.', 'Say: "Vanakkam saami."'],
      ['சுகமா இருக்கணும். கோபுரத்த பாத்தீங்களா?', 'Sugamaa irukkanum. Gopurattha paatheengalaa?', 'May you be well. Have you seen the gopuram?'],
      ['என்ன சொன்னீங்க? மணி சத்தம் கேக்கல.', 'Enna sonneenga? Mani saththam kekkala.', 'What did you say? The bell drowned it out.']),
    S('festival', ['எல்லாரும் அழகா அலங்காரம் பண்ணியிருக்காங்க, பாருங்க.', 'Ellaarum azhagaa alangaaram pannittirukkaanga, paarunga.', 'Everyone has decorated beautifully, look.'],
      'Ask which festival is on today.', ['Innaikku enna vizhaa saami?', 'இன்னைக்கு என்ன விழா சாமி?'],
      ['innaikku enna vizhaa saami', 'innaikku enna vizhaa', 'enna vizhaa saami', 'indha vizhaa enna saami', 'innaikku enna special saami', 'இன்னைக்கு என்ன விழா சாமி', 'என்ன விழா சாமி'],
      'ask_which_festival', ['Ask about the festival.', '"Enna vizhaa?" = which festival?', 'Say: "Innaikku enna vizhaa saami?"'],
      ['இன்னைக்கு பிரதோஷம். சாயந்திரம் அபிஷேகம் இருக்கு.', 'Innaikku pradosham. Saayandhiram abishekam irukku.', 'Today is Pradosham. There is abhishekam in the evening.'],
      ['எந்த விழான்னு கேக்கறீங்களா?', 'Endha vizhaannu kekkareengalaa?', 'Are you asking which festival?']),
    S('prasadam', ['சிவன் ஆசீர்வாதம் வாங்கிக்கோங்க. வேற என்ன வேணும்?', 'Sivan aaseervaadham vaangikkonga. Vera enna venum?', 'Receive Lord Shiva blessings. What else do you need?'],
      'Ask for prasadam.', ['Prasaadham kudunga saami.', 'பிரசாதம் கொடுங்க சாமி.'],
      ['prasaadham kudunga saami', 'prasadam kudunga saami', 'saami prasaadham venum', 'prasaadham tharuveengala', 'konjam prasaadham kudunga', 'பிரசாதம் கொடுங்க சாமி', 'பிரசாதம் வேணும் சாமி'],
      'ask_for_prasadam', ['Ask for the blessed food.', '"Prasaadham" = temple offering.', 'Say: "Prasaadham kudunga saami."'],
      ['இந்தாங்க, சர்க்கரை பொங்கல். சூடா இருக்கு, சாப்பிட்டு பாருங்க.', 'Indhaanga, sarkkarai pongal. Soodaa irukku, saappittu paarunga.', 'Here, sweet pongal. It is warm, try it.'],
      ['பிரசாதம் வேணுமா? சொல்லுங்க.', 'Prasaadham venumaa? Sollunga.', 'Want prasadam? Tell me.']),
  ],
  outro: ['சிவன் துணை இருப்பார் மீரா. போய்ட்டு வாங்க.', 'Sivan thunai iruppaar Meera. Poittu vaanga.', 'Lord Shiva will be with you, Meera. Go and come back.'],
  learned: [['vanakkam saami', 'greetings, priest'], ['innaikku enna vizhaa?', 'which festival is today?'], ['prasaadham kudunga', 'please give prasadam']],
  again: ['மீரா, இன்னொரு தடவை தரிசனம் பண்ணலாமே?', 'Meera, innoru thadavai dharisanam pannalaame?', 'Meera, why not have darshan once more?'],
});

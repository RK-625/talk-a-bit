// Gully-cricket batter in the tea-kadai square.
import { dialogue as D, step as S } from './kit.js';

export default D('cricketKid', {
  name: 'Vicky', role: 'gully cricket batter', site: 'Tea-kadai square, cricket gully', diff: 2,
  voice: { rate: 1.15, pitch: 1.4 },
  persona: 'Bossy kid in a batting stance, waiting for the next ball and shouting "out!" or "not out!", who dreams of being a famous batter.',
  goal: 'Ask to join the game, choose to bat, and say you are ready.',
  steps: [
    S('join', ['அக்கா, இங்க மேட்ச் நடக்குது. தள்ளி நில்லுங்க!', 'Akka, inga match nadakkudhu. Thalli nillunga!', 'Akka, a match is going on here. Stand aside!'],
      'Ask if you can play too.', ['Naanum vilayaadalaamaa?', 'நானும் விளையாடலாமா?'],
      ['naanum vilayaadalaamaa', 'naanum vilaiyaadalaama', 'naan vilayaadalaamaa thambi', 'naanum aadalaamaa', 'enakkum vilayaadanum', 'நானும் விளையாடலாமா', 'நானும் ஆடலாமா'],
      'ask_to_join_game', ['Ask to play.', '"Naanum" = me too. "Vilayaadalaamaa" = can I play?', 'Say: "Naanum vilayaadalaamaa?"'],
      ['சரி சரி, ஒரு ஓவர் மட்டும் விளையாடுங்க!', 'Sari sari, oru over mattum vilayaadunga!', 'Okay okay, play just one over!'],
      ['என்ன கேக்கறீங்க? சீக்கிரம் சொல்லுங்க!', 'Enna kekkareenga? Seekkiram sollunga!', 'What are you asking? Say it quickly!']),
    S('bat', ['பேட்டிங்கா பவுலிங்கா? எது வேணும்?', 'Battingaa bowlingaa? Edhu venum?', 'Batting or bowling? Which one do you want?'],
      'Say you will bat.', ['Naan batting pannuren.', 'நான் பேட்டிங் பண்றேன்.'],
      ['naan batting pannuren', 'batting venum', 'naan bat pannuren thambi', 'enakku batting venum', 'naan batting pandren', 'நான் பேட்டிங் பண்றேன்', 'எனக்கு பேட்டிங் வேணும்'],
      'choose_batting', ['Choose bat or ball.', '"Batting" is the same word in Tamil.', 'Say: "Naan batting pannuren."'],
      ['ஆ! பேட்டிங்கா? பால் வேகமா வரும், பாத்துக்கோங்க!', 'Aa! Battingaa? Baal vegamaa varum, paathukkonga!', 'Oh! Batting? The ball will come fast, watch out!'],
      ['பேட்டிங்கா பவுலிங்கா? ஒண்ணு சொல்லுங்க.', 'Battingaa bowlingaa? Onnu sollunga.', 'Batting or bowling? Say one.']),
    S('ready', ['இந்தா பேட்! ரெடியா? பால் வருது!', 'Indhaa bat! Readyaa? Baal varudhu!', 'Here is the bat! Ready? The ball is coming!'],
      'Say you are ready.', ['Naan ready, podunga!', 'நான் ரெடி, போடுங்க!'],
      ['naan ready podunga', 'ready podunga', 'naan ready thambi', 'ready ready podu', 'naan thayaar podunga', 'நான் ரெடி போடுங்க', 'ரெடி போடு'],
      'say_ready_to_bat', ['Tell him you are ready.', '"Ready" works. "Podunga" = bowl it.', 'Say: "Naan ready, podunga!"'],
      ['ஹே! சிக்ஸ்! மீரா அக்கா சூப்பர்!', 'Hey! Six! Meera akka super!', 'Hey! Six! Meera akka is super!'],
      ['ரெடியா இல்லையா? பால் கைல இருக்கு!', 'Readyaa illaiyaa? Baal kaila irukku!', 'Ready or not? The ball is in my hand!']),
  ],
  outro: ['நீங்க நல்லா ஆடுறீங்க அக்கா! நாளைக்கும் வாங்க.', 'Neenga nallaa aadureenga akka! Naalaikkum vaanga.', 'You play well, akka! Come tomorrow too.'],
  learned: [['naanum vilayaadalaamaa?', 'can I play too?'], ['naan batting pannuren', 'I will bat'], ['naan ready', 'I am ready']],
  again: ['அக்கா, இன்னொரு ஓவர் ஆடலாமா?', 'Akka, innoru over aadalaamaa?', 'Akka, shall we play another over?'],
});

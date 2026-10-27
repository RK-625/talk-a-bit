// Temple priest (shanthi) at the Kerala temple door.
import { dialogue as D, step as S } from './kit.js';

export default D('priest', {
  name: 'Narayanan Namboothiri', role: 'temple priest', site: 'Kerala temple door, copper-roof shrine', diff: 3,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Calm priest in a gold-bordered mundu with sandal paste on his forehead; he explains the temple customs in slow Malayalam.',
  goal: 'Greet him respectfully, ask when the festival is, and ask for prasadam.',
  steps: [
    S('greet', ['നമസ്കാരം. ക്ഷേത്രത്തിലേക്ക് സ്വാഗതം.', 'Namaskaaram. Kshethrathilekku swaagatham.', 'Greetings. Welcome to the temple.'],
      'Greet him respectfully.', ['Namaskaaram thirumeni.', 'നമസ്കാരം തിരുമേനി.'],
      ['namaskaram thirumeni', 'namaskaram saare', 'namaskaaram', 'namaste thirumeni', 'thirumeni namaskaram', 'നമസ്കാരം'],
      'greet_the_priest', ['Greet him with folded hands.', '"Namaskaaram" + "thirumeni" (respectful title).'],
      ['ഹരി ഓം. മലയാളം പഠിക്കുന്ന കുട്ടിയാണല്ലേ, നന്നായി.', 'Hari om. Malayalam padikkunna kuttiyaanalle, nannayi.', 'Hari om. You are the girl learning Malayalam, good.'],
      ['ഒന്നൂടെ നമസ്കരിക്കൂ കുട്ടീ.', 'Onnoode namaskarikkoo kutti.', 'Greet once more, child.']),
    S('festival', ['ഇത് ദീപസ്തംഭമാണ്. ഉത്സവത്തിന് തെളിക്കും.', 'Ithu deepasthambhamaanu. Utsavathinu thelikkum.', 'This is the deepastambham. We light it at the festival.'],
      'Ask when the festival is.', ['Utsavam eppozhaanu thirumeni?', 'ഉത്സവം എപ്പോഴാണ് തിരുമേനി?'],
      ['utsavam eppol', 'ethra divasam utsavam', 'utsavam eppozhaa', 'aaghosham eppol thirumeni', 'utsavam ennaanu', 'ഉത്സവം എന്നാണ്'],
      'ask_festival_date', ['Ask when the festival is.', '"Eppozhaanu?" = when is it?'],
      ['അടുത്ത മാസം, ഏഴ് ദിവസം. ആനയും വാദ്യവും ഉണ്ടാകും.', 'Aduttha maasam, ezhu divasam. Aanayum vaadyavum undaakum.', 'Next month, seven days. There will be elephants and music.'],
      ['ഉത്സവത്തെ കുറിച്ചാണോ ചോദിച്ചത്?', 'Utsavathe kurichaano chodichathu?', 'Did you ask about the festival?']),
    S('prasadam', ['ദീപാരാധന കഴിഞ്ഞു. പ്രസാദം വേണോ?', 'Deepaaraadhana kazhinju. Prasaadam veno?', 'The lamp offering is done. Do you want prasadam?'],
      'Ask for prasadam.', ['Prasaadam tharamo thirumeni?', 'പ്രസാദം തരാമോ തിരുമേനി?'],
      ['prasadam venam', 'oru prasadam tharoo', 'prasaadam kittumo', 'thirumeni prasadam tharamo', 'prasadam thaa', 'പ്രസാദം വേണം'],
      'ask_for_prasadam', ['Ask for the blessed offering.', '"Prasaadam" = temple offering.'],
      ['ഇതാ, ചന്ദനവും പ്രസാദവും. ഭഗവാൻ അനുഗ്രഹിക്കട്ടെ.', 'Ithaa, chandanavum prasaadavum. Bhagavaan anugrahikkatte.', 'Here, sandal paste and prasadam. May God bless you.'],
      ['പ്രസാദം വേണോ കുട്ടീ?', 'Prasaadam veno kutti?', 'Want prasadam, child?']),
  ],
  outro: ['ചെരുപ്പ് പുറത്ത് ഇട്ടോളൂ, കേട്ടോ. ശുഭയാത്ര!', 'Cheruppu purath ittoloo, kettoo. Shubhayaathra!', 'Leave your sandals outside, okay. Safe travels!'],
  learned: [['namaskaaram thirumeni', 'greetings, thirumeni'], ['utsavam eppozhaanu?', 'when is the festival?'], ['prasaadam tharamo?', 'may I have prasadam?']],
  again: ['ദീപാരാധനയ്ക്ക് വീണ്ടും വരൂ കുട്ടീ.', 'Deepaaraadhanaykku veendum varoo kutti.', 'Come again for the lamp offering, child.'],
});

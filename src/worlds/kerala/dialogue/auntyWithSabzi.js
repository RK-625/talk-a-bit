// Chechi walking home from the market with fish and vegetables, Fort Kochi footpath.
import { dialogue as D, step as S } from './kit.js';

export default D('auntyWithSabzi', {
  name: 'Leelamma Chechi', role: 'chechi with fish and vegetables', site: 'Fort Kochi footpath by the Chinese nets', diff: 2,
  voice: { rate: 0.95, pitch: 1.15 },
  persona: 'Round, motherly chechi in a set-saree, humming on her way home from the market; she loves giving advice and feeding newcomers.',
  goal: 'Offer to carry her bag, tell her your name, and say you are from Jaipur.',
  steps: [
    S('bag', ['ഹൊ, ഈ സഞ്ചി ഭയങ്കര ഭാരം!', 'Ho, ee sanchi bhayankara bhaaram!', 'Oof, this bag is terribly heavy!'],
      'Offer to carry her bag.', ['Chechi, njaan sanchi pidikkatte?', 'ചേച്ചി, ഞാൻ സഞ്ചി പിടിക്കട്ടെ?'],
      ['chechi bag njaan edukkaam', 'njaan pidikkaam chechi', 'sanchi tharoo chechi njaan edukkaam', 'chechi njaan sahayikkatte', 'bhaaram njaan edukkaam chechi', 'ചേച്ചി ഞാൻ എടുക്കാം'],
      'offer_to_carry_bag', ['Offer to hold the bag.', '"Njaan" = I. "Pidikkatte?" = shall I hold?'],
      ['ആഹാ, നല്ല കുട്ടി! ഇന്ന് മീനും ഉണ്ട്, സൂക്ഷിക്കണേ.', 'Aahaa, nalla kutti! Innu meenum undu, sookshikkane.', 'Oh, good girl! There is fish today too, careful.'],
      ['എന്താ മോളേ? കേട്ടില്ല.', 'Enthaa mole? Kettilla.', 'What, dear? I did not hear.']),
    S('name', ['മോളുടെ പേരെന്താ? ഇവിടെ പുതിയതാണോ?', 'Molude perentha? Ivide puthiyathaano?', 'What is your name, dear? Are you new here?'],
      'Tell her your name.', ['Ente peru Ananya.', 'എന്റെ പേര് അനന്യ.'],
      ['ente peru ananya chechi', 'ente peru ananya aanu', 'njaan ananya', 'ananya aanu chechi', 'peru ananya', 'എന്റെ പേര് അനന്യ ചേച്ചി'],
      'tell_name', ['Say your name.', '"Ente peru" = my name is.'],
      ['അനന്യ! നല്ല പേര്. നമ്മുടെ വീട്ടിലെ കുട്ടിയെപ്പോലെ.', 'Ananya! Nalla peru. Nammude veettile kuttiyeppole.', 'Ananya! Lovely name. Like a girl from our home.'],
      ['പേര് പറഞ്ഞില്ലല്ലോ മോളേ.', 'Peru paranjillallo mole.', 'You have not told me your name, dear.']),
    S('home', ['എവിടെ നിന്നാ വരുന്നത്? ഇവിടെ എന്താ?', 'Evide ninnaa varunnathu? Ivide enthaa?', 'Where have you come from? What brings you here?'],
      'Say you are from Jaipur.', ['Njaan Jaipur-il ninnaanu.', 'ഞാൻ ജയ്പൂരിൽ നിന്നാണ്.'],
      ['njaan jaipur ninnaanu chechi', 'jaipur-il ninnaanu', 'ente naadu jaipur', 'jaipur aanu chechi', 'njaan jaipurkaariyaanu', 'ജയ്പൂരിൽ നിന്നാണ് ചേച്ചി'],
      'say_from_jaipur', ['Say where you are from.', '"Ninnaanu" = I am from.'],
      ['ജയ്പൂരോ! ദൂരെ നിന്നാണല്ലോ. എന്നാൽ ഇന്ന് ഊണ് ഇവിടെ.', 'Jaipuro! Doore ninnaanallo. Ennaal innu oonu ivide.', 'Jaipur! From so far. Then have your meal here today.'],
      ['എവിടെ നിന്നാണെന്ന് പറഞ്ഞില്ലല്ലോ.', 'Evide ninnaanennu paranjillallo.', 'You have not said where you are from.']),
  ],
  outro: ['മീൻ കറി കൂട്ടി ഊണ് കഴിക്കണം, കേട്ടോ മോളേ!', 'Meen curry kootti oonu kazhikkanam, kettoo mole!', 'Have your meal with fish curry, dear!'],
  learned: [['njaan pidikkatte?', 'shall I hold it?'], ['ente peru Ananya', 'my name is Ananya'], ['Jaipur-il ninnaanu', 'I am from Jaipur']],
  again: ['മോളേ, ഇന്ന് മീൻ വാങ്ങുന്നുണ്ടോ?', 'Mole, innu meen vaangunnundo?', 'Dear, are you buying fish today?'],
});

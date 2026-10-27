// Football kid (striker) on the football patch next to the chaya kada.
import { dialogue as D, step as S } from './kit.js';

export default D('cricketKid', {
  name: 'Appu', role: 'football kid', site: 'Chaya kada square, football patch', diff: 2,
  voice: { rate: 1.15, pitch: 1.5 },
  persona: 'Bossy football kid in a sky-blue striped jersey, swinging his foot at the ball; he dreams of playing for a big club and wants Ananya on his team.',
  goal: 'Ask to join the game, choose to be the goalkeeper, and say you are ready.',
  steps: [
    S('join', ['ചേച്ചി, ഞങ്ങൾക്ക് ഒരാൾ കുറവാണ്. കളിക്കുന്നോ?', 'Chechi, njangalkku oraal kuravaanu. Kalikkunno?', 'Chechi, we are one short. Will you play?'],
      'Say you will play too.', ['Njaanum kalikkaam.', 'ഞാനും കളിക്കാം.'],
      ['njaanum kalikkatte', 'njaan koodi kalikkaam', 'enikkum kalikkanam', 'njaan kalikkaam mone', 'kalikkaam njaanum', 'ഞാനും കളിക്കട്ടെ'],
      'join_the_game', ['Say you will join.', '"Kalikkaam" = I will play.'],
      ['യെ! ചേച്ചി ഞങ്ങളുടെ ടീമിൽ!', 'Ye! Chechi njangalude teamil!', 'Yay! Chechi is on our team!'],
      ['കളിക്കുന്നുണ്ടോ ഇല്ലയോ ചേച്ചീ?', 'Kalikkunnundo illayo chechi?', 'Are you playing or not, chechi?']),
    S('position', ['ചേച്ചി എവിടെ നിൽക്കും, അറ്റാക്കിലോ ഗോളിലോ?', 'Chechi evide nilkkum, attackilo goalilo?', 'Where will you stand, chechi, attack or goal?'],
      'Choose to stand in goal.', ['Njaan goalil nilkkaam.', 'ഞാൻ ഗോളിൽ നിൽക്കാം.'],
      ['njaan goalil nilkkam', 'goalkeeper aakaam', 'goal keeper njaan', 'goalil nilkkaam mone', 'njaan goalie', 'ഞാൻ ഗോൾ കീപ്പർ'],
      'choose_goalkeeper', ['Say you will stand in goal.', '"Goalil nilkkaam" = I will stand in goal.'],
      ['ശരി! ചേച്ചി പിടിച്ചാൽ ഒരു ചായ ഞങ്ങൾ വാങ്ങിത്തരാം.', 'Shari! Chechi pidichaal oru chaya njangal vaangitharaam.', 'Okay! If you save it, we will buy you a tea.'],
      ['ഗോളിലോ അറ്റാക്കിലോ?', 'Goalilo attackilo?', 'Goal or attack?']),
    S('ready', ['റെഡിയാണോ ചേച്ചീ? ഞാൻ കിക്ക് ചെയ്യാൻ പോകുന്നു!', 'Readyaano chechi? Njaan kick cheyyaan pokunnu!', 'Ready, chechi? I am going to kick!'],
      'Say you are ready.', ['Njaan ready aanu, adicholoo!', 'ഞാൻ റെഡിയാണ്, അടിച്ചോളൂ!'],
      ['ready aanu mone', 'njaan ready', 'adicholoo njaan ready', 'ready aanu adikku', 'ready aanu', 'ഞാൻ റെഡി'],
      'say_ready', ['Say you are ready.', '"Ready aanu" = I am ready.'],
      ['ഗോൾ! ഇല്ല, ചേച്ചി പിടിച്ചു! സൂപ്പർ!', 'Goal! Illa, chechi pidichu! Super!', 'Goal! No, chechi saved it! Super!'],
      ['റെഡിയാണോ അല്ലയോ?', 'Readyaano allayo?', 'Ready or not?']),
  ],
  outro: ['ചേച്ചി ഞങ്ങളുടെ സ്ഥിരം ഗോളിയാകണം, കേട്ടോ!', 'Chechi njangalude sthiram goaliyaakanam, kettoo!', 'Chechi must be our regular goalie, okay!'],
  learned: [['njaanum kalikkaam', 'I will play too'], ['goalil nilkkaam', 'I will stand in goal'], ['ready aanu', 'I am ready']],
  again: ['ചേച്ചി, ഒരു കളി കൂടി?', 'Chechi, oru kali koodi?', 'Chechi, one more game?'],
});

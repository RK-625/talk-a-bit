// Ulsoor Lake promenade, the jetty and the lake-island temple stalls.
import { dialogue as D, step as S } from '../kit.js';

export const walkStudent = D('marine-walk-student', {
  name: 'Chetan', role: 'college student (walker)', site: 'Ulsoor Lake promenade', diff: 2,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'College student strolling along the lake bund with earphones, friendly once you wave.',
  goal: 'Agree the lake is calm and say you like Kannada songs.',
  steps: [
    S('lake', ['ಹಾಯ್! ಈ ಲೇಕ್ ಎಷ್ಟು ಶಾಂತವಾಗಿದೆ ಅಲ್ವಾ?', 'Hai! Ee lake eshtu shaantavaagide alva?', 'Hi! This lake is so calm, isn\'t it?'],
      'Agree that the lake is calm.', ['Haudu, ee lake tumba shaanta ide.', 'ಹೌದು, ಈ ಲೇಕ್ ತುಂಬಾ ಶಾಂತ ಇದೆ.'],
      ['haudu ee lake tumba shaanta ide', 'ee lake tumba shaanta ide', 'haudu lake shaantavaagide', 'lake tumba chennagide', 'ಹೌದು ಈ ಲೇಕ್ ತುಂಬಾ ಶಾಂತ ಇದೆ', 'ಈ ಲೇಕ್ ತುಂಬಾ ಶಾಂತ', 'haudu lake tumba shaanta'],
      'agree_lake_calm', ['Agree with him.', '"Shaanta" = calm.', 'Say: "Haudu, ee lake tumba shaanta ide."'],
      ['ಹೌದು! ಇಲ್ಲಿಗೆ ಬಂದ್ರೆ ಎಲ್ಲಾ ಟೆನ್ಷನ್ ಮರೆತು ಹೋಗುತ್ತೆ.', 'Haudu! Illige bandre ella tension marethu hogutte.', 'Yes! Coming here, all tension is forgotten.'],
      ['ಲೇಕ್ ಹೇಗಿದೆ ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Lake hegide anta heli saar.', 'Tell me how the lake is, sir.']),
    S('songs', ['ನಾನು ಕನ್ನಡ ಹಾಡು ಕೇಳ್ತಿದ್ದೆ. ನೀವು ಏನು ಕೇಳ್ತೀರಾ?', 'Naanu Kannada haadu keltidde. Neevu enu kelteera?', 'I was listening to a Kannada song. What do you listen to?'],
      'Say you like Kannada songs.', ['Nange Kannada haadu ishta.', 'ನನಗೆ ಕನ್ನಡ ಹಾಡು ಇಷ್ಟ.'],
      ['nange kannada haadu ishta', 'nange kannada haadugalu ishta', 'kannada haadu ishta', 'naanu kannada haadu keltini', 'ನನಗೆ ಕನ್ನಡ ಹಾಡು ಇಷ್ಟ', 'ಕನ್ನಡ ಹಾಡು ಇಷ್ಟ', 'nange Kannada songs ishta'],
      'like_kannada_songs', ['Say you enjoy Kannada songs.', '"Nange ishta" = I like it.', 'Say: "Nange Kannada haadu ishta."'],
      ['ಸೂಪರ್! ನಾನು ನಿಮಗೆ ಒಂದು ಪ್ಲೇಲಿಸ್ಟ್ ಕಳಿಸ್ತೀನಿ.', 'Super! Naanu nimage ondu playlist kalisteeni.', 'Super! I will send you a playlist.'],
      ['ಯಾವ ಹಾಡು ಇಷ್ಟ ಅಂತ ಹೇಳಿ.', 'Yaava haadu ishta anta heli.', 'Tell me which songs you like.']),
  ],
  outro: ['ಪ್ಲೇಲಿಸ್ಟ್ ಬಂದ ಮೇಲೆ ಕೇಳಿ. ಬೈ ರೋಹನ್!', 'Playlist banda mele keli. Bye Rohan!', 'Listen once the playlist arrives. Bye Rohan!'],
  learned: [['ee lake tumba shaanta ide', 'this lake is very calm'], ['nange Kannada haadu ishta', 'I like Kannada songs']],
  again: ['ರೋಹನ್, ಹಾಡು ಕೇಳಿದ್ರಾ?', 'Rohan, haadu kelidra?', 'Rohan, did you listen to the songs?'],
});

export const benchMan = D('marine-bench-man', {
  name: 'Narayana Rao', role: 'man on a lake bench', site: 'Ulsoor Lake promenade, bench', diff: 1,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Thin man with a folded newspaper, watching the ducks and the pedal boats.',
  goal: 'Agree that the ducks are lovely.',
  steps: [
    S('ducks', ['ಆ ಬಾತುಕೋಳಿ ನೋಡಿ, ಎಷ್ಟು ಚೆನ್ನಾಗಿ ಈಜ್ತಿದೆ!', 'Aa baatukoli nodi, eshtu chennagi eejtide!', 'Look at that duck, how nicely it swims!'],
      'Say the ducks are lovely.', ['Haudu, baatukoligalu chennagive.', 'ಹೌದು, ಬಾತುಕೋಳಿಗಳು ಚೆನ್ನಾಗಿವೆ.'],
      ['haudu baatukoligalu chennagive', 'baatukoligalu chennagive', 'haudu baatukoli chennagide', 'baatukoli tumba chennagide', 'ಹೌದು ಬಾತುಕೋಳಿಗಳು ಚೆನ್ನಾಗಿವೆ', 'ಬಾತುಕೋಳಿಗಳು ಚೆನ್ನಾಗಿವೆ', 'haudu ducks chennagive'],
      'say_ducks_lovely', ['Agree about the ducks.', '"Baatukoli" = duck.', 'Say: "Haudu, baatukoligalu chennagive."'],
      ['ಹೌದಲ್ವಾ! ದಿನಾ ಬಂದು ಇವುಗಳನ್ನ ನೋಡ್ತೀನಿ.', 'Haudalva! Dina bandu ivugalanna nodteeni.', 'Right! I come every day to watch them.'],
      ['ಬಾತುಕೋಳಿ ನೋಡಿದ್ರಾ ಇಲ್ವಾ?', 'Baatukoli nodidra ilva?', 'Did you see the duck or not?']),
  ],
  outro: ['ಒಳ್ಳೆ ದಿನ ಆಗ್ಲಿ ರೋಹನ್.', 'Olle dina aagli Rohan.', 'Have a good day, Rohan.'],
  learned: [['baatukoligalu chennagive', 'the ducks are lovely']],
  again: ['ಬನ್ನಿ ರೋಹನ್, ಬೆಂಚ್ ಮೇಲೆ ಕೂತ್ಕೊಳ್ಳಿ.', 'Banni Rohan, bench mele kutkolli.', 'Come Rohan, sit on the bench.'],
});

export const lakeCouple = D('marine-couple', {
  name: 'Suma and Ravi', role: 'seated couple (tech-park colleagues)', site: 'Ulsoor Lake promenade, lake wall', diff: 2,
  voice: { rate: 1.05, pitch: 1.05 },
  persona: 'Young tech-park colleagues sharing a phone on the lake wall, curious about the new intern.',
  goal: 'Say you are a new intern and that you are visiting Lalbagh at the weekend.',
  steps: [
    S('work', ['ನಾವು ಟೆಕ್ ಪಾರ್ಕ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡ್ತೀವಿ. ನೀವು?', 'Naavu tech park-alli kelasa maadteevi. Neevu?', 'We work in the tech park. And you?'],
      'Say you are a new intern.', ['Naanu intern, hosa joiner.', 'ನಾನು ಇಂಟರ್ನ್, ಹೊಸ ಜಾಯಿನರ್.'],
      ['naanu intern hosa joiner', 'naanu intern', 'naanu hosa intern, joiner', 'naanu intern aagi bandidini', 'ನಾನು ಇಂಟರ್ನ್ ಹೊಸ ಜಾಯಿನರ್', 'ನಾನು ಇಂಟರ್ನ್', 'naanu intern hosadaagi'],
      'say_new_intern_to_couple', ['Tell them your job.', '"Intern" and "joiner" are used in Kannada too.', 'Say: "Naanu intern, hosa joiner."'],
      ['ವೆಲ್ಕಮ್ ಟು ಟೀಮ್! ಏನಾದ್ರೂ ಹೆಲ್ಪ್ ಬೇಕಾದ್ರೆ ಹೇಳಿ.', 'Welcome to team! Enaadru help bekadre heli.', 'Welcome to the team! Tell us if you need any help.'],
      ['ಏನು ಕೆಲಸ ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Enu kelasa anta heli saar.', 'Tell us what job, sir.']),
    S('weekend', ['ವೀಕೆಂಡ್ ಏನು ಪ್ಲಾನ್ ರೋಹನ್?', 'Weekend enu plan Rohan?', 'What is your weekend plan, Rohan?'],
      'Say you will visit Lalbagh.', ['Lalbagh nodoke hogteeni.', 'ಲಾಲ್‌ಬಾಗ್ ನೋಡೋಕೆ ಹೋಗ್ತೀನಿ.'],
      ['lalbagh nodoke hogteeni', 'lalbagh ge hogteeni', 'naanu lalbagh nodoke hogteeni', 'weekend lalbagh ge hogteeni', 'ಲಾಲ್‌ಬಾಗ್ ನೋಡೋಕೆ ಹೋಗ್ತೀನಿ', 'ಲಾಲ್‌ಬಾಗ್‌ಗೆ ಹೋಗ್ತೀನಿ', 'Lalbagh nodoke hogtini'],
      'say_weekend_lalbagh', ['Share your plan.', '"Nodoke hogteeni" = I will go to see.', 'Say: "Lalbagh nodoke hogteeni."'],
      ['ಸೂಪರ್! ಫ್ಲವರ್ ಶೋ ಇದೆ, ಮಿಸ್ ಮಾಡ್ಬೇಡಿ.', 'Super! Flower show ide, miss maadbedi.', 'Super! There is a flower show, do not miss it.'],
      ['ಎಲ್ಲಿಗೆ ಹೋಗ್ತೀರಿ ಅಂತ ಹೇಳಿ.', 'Ellige hogteeri anta heli.', 'Tell us where you are going.']),
  ],
  outro: ['ಸೋಮವಾರ ಆಫೀಸ್‌ನಲ್ಲಿ ಸಿಗೋಣ ರೋಹನ್.', 'Somavaara office-nalli sigona Rohan.', 'See you at the office on Monday, Rohan.'],
  learned: [['naanu intern', 'I am an intern'], ['Lalbagh nodoke hogteeni', 'I will go to see Lalbagh']],
  again: ['ರೋಹನ್, ಕಾಫಿಗೆ ಬರ್ತೀರಾ ನಮ್ಮ ಜೊತೆ?', 'Rohan, coffee ge barteera namma jote?', 'Rohan, will you join us for coffee?'],
});

export const chanaSeller = D('marine-chana-seller', {
  name: 'Mallesh', role: 'boiled-groundnut (kadlekai) seller', site: 'Ulsoor Lake promenade', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Thin seller in a Gandhi cap scooping boiled groundnuts into paper cones, calling "kadlekai, kadlekai!".',
  goal: 'Order a cone of kadlekai and ask for less salt.',
  steps: [
    S('order', ['ಕಡಲೆಕಾಯಿ ಕಡಲೆಕಾಯಿ! ಬಿಸಿ ಕಡಲೆಕಾಯಿ!', 'Kadlekai kadlekai! Bisi kadlekai!', 'Groundnuts, groundnuts! Hot groundnuts!'],
      'Order one cone of groundnuts.', ['Ondu kadlekai kodi.', 'ಒಂದು ಕಡಲೆಕಾಯಿ ಕೊಡಿ.'],
      ['ondu kadlekai kodi', 'ondu cone kadlekai kodi', 'kadlekai kodi anna', 'ondu kadlekai beku', 'ಒಂದು ಕಡಲೆಕಾಯಿ ಕೊಡಿ', 'ಕಡಲೆಕಾಯಿ ಕೊಡಿ ಅಣ್ಣ', 'one kadlekai kodi'],
      'order_kadlekai', ['Ask for a cone of groundnuts.', '"Kadlekai" = groundnuts.', 'Say: "Ondu kadlekai kodi."'],
      ['ತಗೊಳ್ಳಿ, ಬಿಸಿ ಇದೆ ಹುಷಾರು.', 'Tagolli, bisi ide hushaaru.', 'Here, they are hot, careful.'],
      ['ಏನು ಬೇಕು ಸಾರ್? ಕಡಲೆಕಾಯಿನಾ?', 'Enu beku saar? Kadlekaina?', 'What do you want, sir? Groundnuts?']),
    S('salt', ['ಉಪ್ಪು ಖಾರ ಹಾಕ್ಲಾ ಸಾರ್?', 'Uppu khaara haakla saar?', 'Shall I add salt and chilli, sir?'],
      'Ask for less salt.', ['Uppu kadime haaki.', 'ಉಪ್ಪು ಕಡಿಮೆ ಹಾಕಿ.'],
      ['uppu kadime haaki', 'uppu swalpa haaki', 'uppu kadime saaku', 'uppu jaasti beda', 'ಉಪ್ಪು ಕಡಿಮೆ ಹಾಕಿ', 'ಉಪ್ಪು ಜಾಸ್ತಿ ಬೇಡ', 'less uppu haaki anna'],
      'ask_less_salt', ['Ask him to go easy on the salt.', '"Uppu" = salt.', 'Say: "Uppu kadime haaki."'],
      ['ಸರಿ ಸಾರ್, ಸ್ವಲ್ಪವೇ ಹಾಕ್ತೀನಿ.', 'Sari saar, swalpave haakteeni.', 'Okay sir, I will add just a little.'],
      ['ಉಪ್ಪು ಜಾಸ್ತಿನಾ ಕಡಿಮೆನಾ?', 'Uppu jaastina kadimena?', 'More salt or less?']),
  ],
  outro: ['ಕಡಲೆಕಾಯಿ ತಿಂತಾ ಲೇಕ್ ನೋಡಿ, ಮಜಾ!', 'Kadlekai tinta lake nodi, maja!', 'Eat groundnuts while watching the lake, fun!'],
  learned: [['ondu kadlekai kodi', 'give me a cone of groundnuts'], ['uppu kadime haaki', 'less salt please']],
  again: ['ಸಾರ್, ಇನ್ನೊಂದು ಕೋನ್ ಕಡಲೆಕಾಯಿ?', 'Saar, innondu cone kadlekai?', 'Sir, another cone of groundnuts?'],
});

export const jogger = D('marine-jogger', {
  name: 'Naveen', role: 'lake jogger (walker)', site: 'Ulsoor Lake promenade', diff: 1,
  voice: { rate: 1.2, pitch: 1.0 },
  persona: 'Jogger in a headband breathing hard after a round of the lake.',
  goal: 'Say you only walk, you do not jog.',
  steps: [
    S('jog', ['ಓಹ್, ಒಂದು ರೌಂಡ್ ಮುಗೀತು! ನೀವೂ ಜಾಗಿಂಗ್ ಮಾಡ್ತೀರಾ?', 'Oh, ondu round mugitu! Neevoo jogging maadteera?', 'Oh, one round done! Do you jog too?'],
      'Say you only walk.', ['Illa, naanu walk maatra maadteeni.', 'ಇಲ್ಲ, ನಾನು ವಾಕ್ ಮಾತ್ರ ಮಾಡ್ತೀನಿ.'],
      ['illa naanu walk maatra maadteeni', 'naanu walk maatra maadteeni', 'illa walk maatra', 'naanu jogging maadalla', 'ಇಲ್ಲ ನಾನು ವಾಕ್ ಮಾತ್ರ ಮಾಡ್ತೀನಿ', 'ನಾನು ವಾಕ್ ಮಾತ್ರ ಮಾಡ್ತೀನಿ', 'illa naanu jogging maadalla'],
      'say_only_walk', ['Say you do not jog, you walk.', '"Maatra" = only.', 'Say: "Illa, naanu walk maatra maadteeni."'],
      ['ಪರವಾಗಿಲ್ಲ, ವಾಕ್ ಕೂಡ ಒಳ್ಳೇದು. ನಾಳೆ ಜಾಗಿಂಗ್ ಟ್ರೈ ಮಾಡಿ!', 'Paravagilla, walk kooda olledu. Naale jogging try maadi!', 'No problem, walking is good too. Try jogging tomorrow!'],
      ['ಜಾಗಿಂಗ್ ಮಾಡ್ತೀರಾ ಇಲ್ವಾ ಅಂತ ಹೇಳಿ.', 'Jogging maadteera ilva anta heli.', 'Tell me whether you jog or not.']),
  ],
  outro: ['ಸರಿ, ನನ್ನ ಇನ್ನೊಂದು ರೌಂಡ್ ಶುರು! ಬೈ!', 'Sari, nanna innondu round shuru! Bye!', 'Okay, my next round begins! Bye!'],
  learned: [['walk maatra maadteeni', 'I only walk']],
  again: ['ರೋಹನ್, ಒಂದು ರೌಂಡ್ ಬರ್ತೀರಾ?', 'Rohan, ondu round barteera?', 'Rohan, will you come for a round?'],
});

export const benchAunty = D('marine-bench-aunty', {
  name: 'Leelavathi', role: 'aunty on a lake bench', site: 'Ulsoor Lake promenade, bench', diff: 1,
  voice: { rate: 0.9, pitch: 1.1 },
  persona: 'Grey-haired aunty resting on a bench with a shopping bag, watching the lake.',
  goal: 'Ask if you may sit down.',
  steps: [
    S('sit', ['ಈ ಲೇಕ್ ನೋಡ್ತಾ ಕೂತ್ರೆ ಮನಸ್ಸಿಗೆ ಶಾಂತಿ.', 'Ee lake nodta kootre manassige shaanti.', 'Sitting and watching this lake brings peace to the mind.'],
      'Ask if you may sit.', ['Swalpa kootkolla, aunty?', 'ಸ್ವಲ್ಪ ಕೂತ್ಕೊಳ್ಳಲಾ, ಆಂಟಿ?'],
      ['swalpa kootkolla aunty', 'kootkolla aunty', 'illi kootkollabahuda aunty', 'swalpa koorla aunty', 'ಸ್ವಲ್ಪ ಕೂತ್ಕೊಳ್ಳಲಾ ಆಂಟಿ', 'ಕೂತ್ಕೊಳ್ಳಲಾ ಆಂಟಿ', 'illi kutkolla aunty'],
      'ask_to_sit_on_bench', ['Ask if you can sit down.', '"Kootkolla" = may I sit?', 'Say: "Swalpa kootkolla, aunty?"'],
      ['ಕೂತ್ಕೊಳ್ಳಪ್ಪ, ಜಾಗ ಇದೆ.', 'Kootkolappa, jaaga ide.', 'Sit, dear, there is space.'],
      ['ಏನಂದೆ ಮಗ? ಕೂತ್ಕೋಬೇಕಾ?', 'Enande maga? Kootkobeka?', 'What did you say, child? Want to sit?']),
  ],
  outro: ['ಇಲ್ಲಿ ಕೂತ್ರೆ ಕಾಲ ಹೋಗೋದೇ ಗೊತ್ತಾಗಲ್ಲ.', 'Illi kootre kaala hogode gottagalla.', 'Sitting here you do not notice time pass.'],
  learned: [['kootkolla?', 'may I sit?']],
  again: ['ಬಾ ಮಗ, ಇಲ್ಲೇ ಕೂತ್ಕೋ.', 'Baa maga, ille kootko.', 'Come child, sit right here.'],
});

export const benchReader = D('marine-bench-reader', {
  name: 'Krishnamurthy', role: 'old man with newspaper', site: 'Ulsoor Lake promenade, same bench', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Bald old man in specs reading the paper, who has no watch.',
  goal: 'Tell him it is ten o\'clock.',
  steps: [
    S('time', ['ಸಾರ್, ಈಗ ಸಮಯ ಎಷ್ಟು ಅಂತ ಹೇಳ್ತೀರಾ?', 'Saar, iga samaya eshtu anta helteera?', 'Sir, could you tell me what time it is?'],
      'Tell him it is ten o\'clock.', ['Iga hattu gante aytu.', 'ಈಗ ಹತ್ತು ಗಂಟೆ ಆಯ್ತು.'],
      ['iga hattu gante aytu', 'hattu gante aytu', 'iga hattu gante', 'hattu gante thatha', 'ಈಗ ಹತ್ತು ಗಂಟೆ ಆಯ್ತು', 'ಹತ್ತು ಗಂಟೆ ಆಯ್ತು', 'iga ten gante aytu'],
      'tell_time_ten', ['Say the time.', '"Gante" = hour/o\'clock.', 'Say: "Iga hattu gante aytu."'],
      ['ಹತ್ತೂ ಆಯ್ತಾ! ಇನ್ನು ಮನೆಗೆ ಹೋಗಬೇಕು.', 'Hattoo aytha! Innu manege hogabeku.', 'Already ten! Time to go home.'],
      ['ಟೈಮ್ ಎಷ್ಟು ಅಂತ ಹೇಳಿ ಮಗು.', 'Time eshtu anta heli magu.', 'Tell me what time it is, child.']),
  ],
  outro: ['ಥ್ಯಾಂಕ್ಸ್ ಮಗು. ಪೇಪರ್ ಓದಿ ಮುಗಿಸ್ತೀನಿ.', 'Thanks magu. Paper odi mugisteeni.', 'Thanks, child. I will finish the paper.'],
  learned: [['iga hattu gante aytu', 'it is ten o\'clock now']],
  again: ['ಮತ್ತೆ ಬಂದ್ರಾ? ಇವತ್ತಿನ ಸುದ್ದಿ ಕೇಳ್ತೀರಾ?', 'Matte bandra? Ivattina suddi kelteera?', 'Back again? Want to hear today\'s news?'],
});

export const lakeCouple2 = D('marine-couple-2', {
  name: 'Kiran and Pooja', role: 'seated couple', site: 'Ulsoor Lake promenade, lake wall', diff: 1,
  voice: { rate: 1.0, pitch: 1.0 },
  persona: 'Young couple chatting on the wall, one glancing at the phone, wanting a picture together.',
  goal: 'Agree to take their photo.',
  steps: [
    S('photo', ['ಎಕ್ಸ್‌ಕ್ಯೂಸ್ ಮೀ, ನಮ್ಮ ಒಂದು ಫೋಟೋ ತೆಗೀತೀರಾ?', 'Excuse me, namma ondu photo tegeeteera?', 'Excuse me, could you take a photo of us?'],
      'Agree to take their photo.', ['Haudu, khanditha tegeeteeni.', 'ಹೌದು, ಖಂಡಿತ ತೆಗೀತೀನಿ.'],
      ['haudu khanditha tegeeteeni', 'khanditha tegeeteeni', 'sari photo tegeeteeni', 'haudu tegeeteeni', 'ಹೌದು ಖಂಡಿತ ತೆಗೀತೀನಿ', 'ಖಂಡಿತ ತೆಗೀತೀನಿ', 'sari naanu photo tegeeteeni'],
      'agree_to_take_photo', ['Say yes.', '"Khanditha" = certainly.', 'Say: "Haudu, khanditha tegeeteeni."'],
      ['ಥ್ಯಾಂಕ್ಯು! ಲೇಕ್ ಬ್ಯಾಕ್‌ಗ್ರೌಂಡ್‌ನಲ್ಲಿ ಬರಲಿ.', 'Thank you! Lake background-alli barali.', 'Thank you! Please get the lake in the background.'],
      ['ಹೌದಾ ಇಲ್ವಾ ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Haudaa ilva anta heli saar.', 'Please tell us yes or no, sir.']),
  ],
  outro: ['ಸೂಪರ್ ಫೋಟೋ! ಬಹಳ ಧನ್ಯವಾದ ರೋಹನ್.', 'Super photo! Bahala dhanyavaada Rohan.', 'Super photo! Many thanks, Rohan.'],
  learned: [['khanditha tegeeteeni', 'certainly, I will take it']],
  again: ['ಇನ್ನೊಂದು ಫೋಟೋ ತೆಗೀತೀರಾ?', 'Innondu photo tegeeteera?', 'Will you take one more photo?'],
});

export const jogger2 = D('marine-jogger-2', {
  name: 'Suresh', role: 'lake jogger (walker)', site: 'Ulsoor Lake promenade, the opposite way', diff: 1,
  voice: { rate: 1.2, pitch: 0.95 },
  persona: 'Jogger running the opposite way round the lake who needs the path clear.',
  goal: 'Say you will move to the right.',
  steps: [
    S('path', ['ರೈಟ್ ಸೈಡ್ ಬನ್ನಿ ಸಾರ್, ನಾನು ಓಡ್ತಿದ್ದೀನಿ!', 'Right side banni saar, naanu odtiddini!', 'Please come to the right, sir, I am running!'],
      'Say you will move to the right.', ['Sari, naanu balakke hogteeni.', 'ಸರಿ, ನಾನು ಬಲಕ್ಕೆ ಹೋಗ್ತೀನಿ.'],
      ['sari naanu balakke hogteeni', 'balakke hogteeni', 'sari balakke barteeni', 'sari right ge hogteeni', 'ಸರಿ ನಾನು ಬಲಕ್ಕೆ ಹೋಗ್ತೀನಿ', 'ಬಲಕ್ಕೆ ಹೋಗ್ತೀನಿ', 'sari right side barteeni'],
      'move_to_right', ['Say you will step to the right.', '"Balakke" = to the right.', 'Say: "Sari, naanu balakke hogteeni."'],
      ['ಥ್ಯಾಂಕ್ಸ್! ಸ್ಟಾಮಿನಾ ಜಾಸ್ತಿ ಬೇಕಲ್ವಾ!', 'Thanks! Stamina jaasti bekalva!', 'Thanks! One needs a lot of stamina, right!'],
      ['ಎಲ್ಲಿ ಹೋಗ್ತೀರಾ ಸಾರ್? ಎಡಕ್ಕಾ ಬಲಕ್ಕಾ?', 'Elli hogteera saar? Edakkaa balakkaa?', 'Where are you going, sir? Left or right?']),
  ],
  outro: ['ಬೈ! ಇನ್ನೊಂದು ರೌಂಡ್ ಮಾಡ್ತೀನಿ.', 'Bye! Innondu round maadteeni.', 'Bye! I will do another round.'],
  learned: [['balakke', 'to the right']],
  again: ['ಸಾರ್, ಈ ಕಡೆ ಬನ್ನಿ, ಬಲಕ್ಕೆ!', 'Saar, ee kade banni, balakke!', 'Sir, come this way, to the right!'],
});

export const morningWalker = D('marine-morning-walker', {
  name: 'Nanjundappa', role: 'elderly morning walker', site: 'Ulsoor Lake promenade', diff: 2,
  voice: { rate: 0.85, pitch: 0.85 },
  persona: 'Elderly walker with an umbrella and white shoes, enjoying the morning air and the birds.',
  goal: 'Say it is your first morning walk here and that you can hear the birds.',
  steps: [
    S('first', ['ಬೆಳಿಗ್ಗೆ ವಾಕ್ ಒಳ್ಳೇದು. ನೀವು ದಿನಾ ಬರ್ತೀರಾ?', 'Beligge walk olledu. Neevu dina barteera?', 'A morning walk is good. Do you come every day?'],
      'Say it is your first time today.', ['Illa, ivattu modala sala.', 'ಇಲ್ಲ, ಇವತ್ತು ಮೊದಲ ಸಲ.'],
      ['illa ivattu modala sala', 'ivattu modala sala', 'illa modala sala thatha', 'ivattu modalu bande', 'ಇಲ್ಲ ಇವತ್ತು ಮೊದಲ ಸಲ', 'ಇವತ್ತು ಮೊದಲ ಸಲ', 'illa ivattu first time'],
      'say_first_morning_walk', ['Say it is your first time here.', '"Ivattu" = today.', 'Say: "Illa, ivattu modala sala."'],
      ['ಹೌದಾ! ಹಾಗಾದ್ರೆ ದಿನಾ ಬನ್ನಿ, ಆರೋಗ್ಯ ಚೆನ್ನಾಗಿರುತ್ತೆ.', 'Haudaa! Haagaadre dina banni, aarogya chennagirutte.', 'Is it! Then come daily, your health will be good.'],
      ['ದಿನಾ ಬರ್ತೀರಾ ಇಲ್ವಾ? ಹೇಳಿ.', 'Dina barteera ilva? Heli.', 'Do you come daily or not? Tell me.']),
    S('birds', ['ಕೇಳಿ, ಹಕ್ಕಿಗಳ ಹಾಡು! ಕೇಳಿಸ್ತಾ?', 'Keli, hakkigala haadu! Kelistaa?', 'Listen, the birds are singing! Can you hear?'],
      'Say you can hear the birds.', ['Haudu, hakkigala haadu kelistide.', 'ಹೌದು, ಹಕ್ಕಿಗಳ ಹಾಡು ಕೇಳಿಸ್ತಿದೆ.'],
      ['haudu hakkigala haadu kelistide', 'hakkigala haadu kelistide', 'haudu kelistide', 'hakki haadu kelistide thatha', 'ಹೌದು ಹಕ್ಕಿಗಳ ಹಾಡು ಕೇಳಿಸ್ತಿದೆ', 'ಹಕ್ಕಿಗಳ ಹಾಡು ಕೇಳಿಸ್ತಿದೆ', 'haudu birds haadu kelistide'],
      'say_hear_birds', ['Say you hear them.', '"Hakki" = bird. "Kelistide" = I can hear.', 'Say: "Haudu, hakkigala haadu kelistide."'],
      ['ಈ ಶಬ್ದ ಕೇಳಿ ಬೆಳಿಗ್ಗೆ ಶುರು ಮಾಡೋದೇ ಚೆನ್ನ.', 'Ee shabda keli beligge shuru maadode chenna.', 'Starting the morning with this sound is lovely.'],
      ['ಕೇಳಿಸ್ತಿದೆ ಅಂದ್ರೆ ಹೇಳಿ.', 'Kelistide andre heli.', 'Tell me if you can hear it.']),
  ],
  outro: ['ನಾಳೆ ಬೆಳಿಗ್ಗೆ ಮತ್ತೆ ಸಿಗೋಣ.', 'Naale beligge matte sigona.', 'Let us meet again tomorrow morning.'],
  learned: [['ivattu modala sala', 'today is my first time'], ['hakkigala haadu kelistide', 'I can hear the birds']],
  again: ['ಅರೆ, ಇವತ್ತೂ ಬಂದ್ರಾ? ಒಳ್ಳೆದು!', 'Are, ivattoo bandra? Olledu!', 'Oh, you came today too? Good!'],
});

export const boatman = D('gateway-boatman', {
  name: 'Mohan', role: 'pedal-boat attendant', site: 'Ulsoor Lake jetty, pedal boats', diff: 2,
  voice: { rate: 1.05, pitch: 0.95 },
  persona: 'Attendant in an orange cap waving to visitors, offering rides on the pedal boats.',
  goal: 'Ask the price of a ride and book one boat for two.',
  steps: [
    S('price', ['ಪೆಡಲ್ ಬೋಟ್! ಲೇಕ್‌ನಲ್ಲಿ ಒಂದು ರೌಂಡ್ ಬೇಕಾ?', 'Pedal boat! Lake-nalli ondu round beka?', 'Pedal boat! Want a round on the lake?'],
      'Ask the price of a ride.', ['Ondu ridege eshtu?', 'ಒಂದು ರೈಡ್‌ಗೆ ಎಷ್ಟು?'],
      ['ondu ridege eshtu', 'ride ge eshtu', 'ondu ride eshtu anna', 'boat ge eshtu', 'ಒಂದು ರೈಡ್‌ಗೆ ಎಷ್ಟು', 'ರೈಡ್‌ಗೆ ಎಷ್ಟು', 'boat ride eshtu anna'],
      'ask_boat_ride_price', ['Ask how much a ride is.', '"Ridege" = for a ride.', 'Say: "Ondu ridege eshtu?"'],
      ['ಅರ್ಧ ಗಂಟೆಗೆ ಇನ್ನೂರು ರೂಪಾಯಿ ಸಾರ್.', 'Ardha gantege innooru rupayi saar.', 'Two hundred rupees for half an hour, sir.'],
      ['ರೈಡ್ ಬಗ್ಗೆ ಕೇಳ್ತಿದ್ದೀರಾ ಸಾರ್?', 'Ride bagge keltiddira saar?', 'Are you asking about the ride, sir?']),
    S('book', ['ಎಷ್ಟು ಜನ ಬರ್ತೀರಿ? ಬೋಟ್ ಎರಡು ಜನಕ್ಕೆ.', 'Eshtu jana barteeri? Boat eradu janakke.', 'How many are coming? A boat is for two.'],
      'Ask for one boat for two people.', ['Ibbarige ondu boat kodi.', 'ಇಬ್ಬರಿಗೆ ಒಂದು ಬೋಟ್ ಕೊಡಿ.'],
      ['ibbarige ondu boat kodi', 'ondu boat kodi ibbarige', 'eradu janakke ondu boat', 'ibbarige boat beku', 'ಇಬ್ಬರಿಗೆ ಒಂದು ಬೋಟ್ ಕೊಡಿ', 'ಇಬ್ಬರಿಗೆ ಬೋಟ್ ಬೇಕು', 'two jana ge ondu boat kodi'],
      'book_boat_for_two', ['Ask for a boat for two.', '"Ibbarige" = for two people.', 'Say: "Ibbarige ondu boat kodi."'],
      ['ಸರಿ, ಲೈಫ್ ಜಾಕೆಟ್ ಹಾಕ್ಕೊಂಡು ಬನ್ನಿ.', 'Sari, life jacket haakkondu banni.', 'Okay, wear the life jacket and come.'],
      ['ಎಷ್ಟು ಜನ ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Eshtu jana anta heli saar.', 'Tell me how many people, sir.']),
  ],
  outro: ['ನಿಧಾನಕ್ಕೆ ತುಳೀರಿ ಸಾರ್, ಎಂಜಾಯ್ ಮಾಡಿ!', 'Nidhaanakke tuliri saar, enjoy maadi!', 'Pedal slowly, sir, enjoy!'],
  learned: [['ondu ridege eshtu?', 'how much for one ride?'], ['ibbarige ondu boat kodi', 'give me one boat for two']],
  again: ['ಸಾರ್, ಇನ್ನೊಂದು ರೌಂಡ್ ಹೋಗ್ತೀರಾ?', 'Saar, innondu round hogteera?', 'Sir, going for another round?'],
});

export const hajiFlowerWoman = D('haji-chadar-seller', {
  name: 'Gowramma', role: 'coconut-and-flower stall woman', site: 'Lake-island temple, offering stall', diff: 1,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Woman arranging garlands and coconuts for devotees, calling "hoovu, tengina kai".',
  goal: 'Ask for a coconut.',
  steps: [
    S('coconut', ['ಹೂವು, ತೆಂಗಿನ ಕಾಯಿ! ದೇವರಿಗೆ ಬೇಕಾ?', 'Hoovu, tengina kaayi! Devarige beka?', 'Flowers, coconuts! Need some for God?'],
      'Ask for one coconut.', ['Ondu tengina kaayi kodi.', 'ಒಂದು ತೆಂಗಿನ ಕಾಯಿ ಕೊಡಿ.'],
      ['ondu tengina kaayi kodi', 'tengina kaayi kodi', 'ondu tengina kai kodi amma', 'ondu coconut kodi', 'ಒಂದು ತೆಂಗಿನ ಕಾಯಿ ಕೊಡಿ', 'ತೆಂಗಿನ ಕಾಯಿ ಕೊಡಿ', 'ondu coconut kodi amma'],
      'ask_coconut', ['Ask for a coconut.', '"Tengina kaayi" = coconut.', 'Say: "Ondu tengina kaayi kodi."'],
      ['ತಗೊಳ್ಳಿ, ದೇವರಿಗೆ ಒಡೆಸಿ.', 'Tagolli, devarige odesi.', 'Here, get it broken for God.'],
      ['ತೆಂಗಿನ ಕಾಯಿ ಬೇಕಾ ಸಾರ್?', 'Tengina kaayi beka saar?', 'Do you want a coconut, sir?']),
  ],
  outro: ['ದೇವರಿಗೆ ನಮಸ್ಕಾರ ಮಾಡಿ, ಒಳ್ಳೇದಾಗುತ್ತೆ.', 'Devarige namaskara maadi, olledaagutte.', 'Bow to God and good will come.'],
  learned: [['ondu tengina kaayi kodi', 'give me one coconut']],
  again: ['ಸಾರ್, ಹೂವು ಬೇಕಾ ಜೊತೆಗೆ?', 'Saar, hoovu beka jotege?', 'Sir, do you also want flowers?'],
});

export const juiceMan = D('haji-juice-man', {
  name: 'Raghu', role: 'sugarcane-juice man', site: 'Lakeside, sugarcane-juice stall', diff: 2,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Man pressing sugarcane through the roller and pouring green juice with ginger and lemon.',
  goal: 'Ask for ginger and lemon and choose a small glass.',
  steps: [
    S('flavour', ['ಕಬ್ಬಿನ ಹಾಲು! ಶುಂಠಿ, ನಿಂಬೆ ಹಾಕ್ಲಾ?', 'Kabbina haalu! Shunti, nimbe haakla?', 'Sugarcane juice! Shall I add ginger and lemon?'],
      'Say yes to ginger and lemon.', ['Haudu, shunti nimbe haaki.', 'ಹೌದು, ಶುಂಠಿ ನಿಂಬೆ ಹಾಕಿ.'],
      ['haudu shunti nimbe haaki', 'shunti nimbe haaki', 'haudu shunti nimbe beku', 'shunti haaki nimbe haaki', 'ಹೌದು ಶುಂಠಿ ನಿಂಬೆ ಹಾಕಿ', 'ಶುಂಠಿ ನಿಂಬೆ ಹಾಕಿ', 'haudu ginger nimbe haaki'],
      'say_yes_ginger_lemon', ['Say yes to both.', '"Shunti" = ginger. "Nimbe" = lemon.', 'Say: "Haudu, shunti nimbe haaki."'],
      ['ಸರಿ, ಫ್ರೆಶ್ ಆಗಿ ಹಿಂಡ್ತೀನಿ.', 'Sari, fresh aagi hindteeni.', 'Okay, pressing it fresh.'],
      ['ಶುಂಠಿ ನಿಂಬೆ ಬೇಕಾ ಅಂತ ಕೇಳ್ದೆ, ಹೇಳಿ.', 'Shunti nimbe beka anta kelde, heli.', 'I asked if you want ginger and lemon, tell me.']),
    S('size', ['ದೊಡ್ಡ ಗ್ಲಾಸ್ ಬೇಕಾ, ಚಿಕ್ಕದಾ?', 'Dodda glass beka, chikkadaa?', 'A big glass or a small one?'],
      'Ask for a small glass.', ['Chikka glass saaku.', 'ಚಿಕ್ಕ ಗ್ಲಾಸ್ ಸಾಕು.'],
      ['chikka glass saaku', 'chikka glass kodi', 'chikkadu saaku', 'chikka glass beku', 'ಚಿಕ್ಕ ಗ್ಲಾಸ್ ಸಾಕು', 'ಚಿಕ್ಕ ಗ್ಲಾಸ್ ಕೊಡಿ', 'small glass saaku anna'],
      'ask_small_glass', ['Choose the small size.', '"Chikka" = small. "Saaku" = enough.', 'Say: "Chikka glass saaku."'],
      ['ತಗೊಳ್ಳಿ, ತಂಪಾಗಿದೆ. ಇಪ್ಪತ್ತು ರೂಪಾಯಿ.', 'Tagolli, tampaagide. Ippattu rupayi.', 'Here, it is cool. Twenty rupees.'],
      ['ದೊಡ್ಡದಾ ಚಿಕ್ಕದಾ ಅಂತ ಹೇಳಿ ಸಾರ್.', 'Doddadaa chikkadaa anta heli saar.', 'Tell me big or small, sir.']),
  ],
  outro: ['ಕುಡಿದು ನೋಡಿ ಸಾರ್, ಬೆಂಗಳೂರಲ್ಲಿ ಇದಕ್ಕಿಂತ ಒಳ್ಳೇದು ಸಿಗಲ್ಲ.', 'Kudidu nodi saar, Bengalurinalli idakkinta olledu sigalla.', 'Taste it, sir, nowhere in Bengaluru beats this.'],
  learned: [['shunti nimbe haaki', 'add ginger and lemon'], ['chikka glass saaku', 'a small glass is enough']],
  again: ['ಸಾರ್, ಇನ್ನೊಂದು ಗ್ಲಾಸ್ ಕಬ್ಬಿನ ಹಾಲು?', 'Saar, innondu glass kabbina haalu?', 'Sir, another glass of sugarcane juice?'],
});

export const hajiFlowerMan = D('haji-chadar-seller-2', {
  name: 'Mahadev', role: 'coconut and flower stall man', site: 'Lake-island temple, second offering stall', diff: 2,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Man with a red tilak and saffron towel selling coconuts and flowers to devotees.',
  goal: 'Ask the price of an archana basket.',
  steps: [
    S('basket', ['ಅರ್ಚನೆ ಬುಟ್ಟಿ ಬೇಕಾ ಸಾರ್? ಎಲ್ಲಾ ಇದೆ.', 'Archane butti beka saar? Ella ide.', 'Need an archana basket, sir? Everything is in it.'],
      'Ask the price of the archana basket.', ['Archane butti eshtu?', 'ಅರ್ಚನೆ ಬುಟ್ಟಿ ಎಷ್ಟು?'],
      ['archane butti eshtu', 'archane butti eshtu anna', 'butti eshtu', 'ondu archane butti eshtu', 'ಅರ್ಚನೆ ಬುಟ್ಟಿ ಎಷ್ಟು', 'ಬುಟ್ಟಿ ಎಷ್ಟು ಅಣ್ಣ', 'archana basket eshtu'],
      'ask_archana_basket_price', ['Ask how much the basket costs.', '"Butti" = basket.', 'Say: "Archane butti eshtu?"'],
      ['ಐವತ್ತು ರೂಪಾಯಿ ಸಾರ್. ತೆಂಗಿನ ಕಾಯಿ, ಹೂವು, ಬಾಳೆಹಣ್ಣು ಇದೆ.', 'Aivattu rupayi saar. Tengina kaayi, hoovu, baalehannu ide.', 'Fifty rupees sir. It has a coconut, flowers and a banana.'],
      ['ಬುಟ್ಟಿ ಬೇಕಾ ಸಾರ್? ರೇಟ್ ಕೇಳಿ.', 'Butti beka saar? Rate keli.', 'Want the basket, sir? Ask the rate.']),
  ],
  outro: ['ದೇವರ ದರ್ಶನ ಚೆನ್ನಾಗಿ ಆಗ್ಲಿ ಸಾರ್.', 'Devara darshana chennagi aagli saar.', 'May your darshan go well, sir.'],
  learned: [['archane butti eshtu?', 'how much is the archana basket?']],
  again: ['ಸಾರ್, ಬುಟ್ಟಿ ರೆಡಿ ಇದೆ!', 'Saar, butti ready ide!', 'Sir, the basket is ready!'],
});

export const juiceCustomer = D('haji-juice-customer', {
  name: 'Shobha', role: 'woman at the sugarcane-juice stall', site: 'Lakeside, sugarcane-juice stall', diff: 1,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Woman waiting for her sugarcane juice, who says this stall is the most famous on the lake.',
  goal: 'Say you will try the juice too.',
  steps: [
    S('try', ['ಇಲ್ಲಿ ಕಬ್ಬಿನ ಹಾಲು ತುಂಬಾ ಫೇಮಸ್, ಗೊತ್ತಾ?', 'Illi kabbina haalu tumba famous, gottaa?', 'Sugarcane juice is very famous here, did you know?'],
      'Say you will try it too.', ['Haudaa? Naanu try maadteeni.', 'ಹೌದಾ? ನಾನು ಟ್ರೈ ಮಾಡ್ತೀನಿ.'],
      ['haudaa naanu try maadteeni', 'naanu try maadteeni', 'haudaa try maadteeni', 'naanoo try maadteeni', 'ಹೌದಾ ನಾನು ಟ್ರೈ ಮಾಡ್ತೀನಿ', 'ನಾನು ಟ್ರೈ ಮಾಡ್ತೀನಿ', 'haudaa naanoo try maadteeni'],
      'say_will_try_juice', ['Say you will try it.', '"Try maadteeni" = I will try.', 'Say: "Haudaa? Naanu try maadteeni."'],
      ['ಟ್ರೈ ಮಾಡಿ, ನಿಮಗೆ ಇಷ್ಟ ಆಗುತ್ತೆ!', 'Try maadi, nimage ishta aagutte!', 'Do try it, you will like it!'],
      ['ಟ್ರೈ ಮಾಡ್ತೀರಾ ಇಲ್ವಾ ಅಂತ ಹೇಳಿ.', 'Try maadteera ilva anta heli.', 'Tell me whether you will try it.']),
  ],
  outro: ['ನನ್ನ ಜ್ಯೂಸ್ ಬಂತು! ಬೈ.', 'Nanna juice bantu! Bye.', 'My juice is here! Bye.'],
  learned: [['naanu try maadteeni', 'I will try it']],
  again: ['ಜ್ಯೂಸ್ ಹೇಗಿತ್ತು ಅಂತ ಹೇಳ್ತೀರಾ?', 'Juice hegittu anta helteera?', 'Will you tell me how the juice was?'],
});

export const hajiElder = D('haji-pilgrim-2', {
  name: 'Subbanna', role: 'elderly devotee', site: 'Lake-island temple, near the gate', diff: 1,
  voice: { rate: 0.8, pitch: 0.8 },
  persona: 'Thin old man standing with raised hands in quiet prayer, gently asking for silence.',
  goal: 'Promise to speak softly.',
  steps: [
    S('quiet', ['ಶ್… ಇಲ್ಲಿ ಮೆಲ್ಲಗೆ ಮಾತಾಡಿ, ದೇವರ ಮುಂದೆ ಇದ್ದೀವಿ.', 'Shh… illi mellage maataadi, devara munde iddivi.', 'Shh… speak softly here, we are before God.'],
      'Promise to speak softly.', ['Kshamisi, mellage maataadteeni.', 'ಕ್ಷಮಿಸಿ, ಮೆಲ್ಲಗೆ ಮಾತಾಡ್ತೀನಿ.'],
      ['kshamisi mellage maataadteeni', 'mellage maataadteeni', 'sari mellage maataadteeni', 'kshamisi thatha mellage maataadteeni', 'ಕ್ಷಮಿಸಿ ಮೆಲ್ಲಗೆ ಮಾತಾಡ್ತೀನಿ', 'ಮೆಲ್ಲಗೆ ಮಾತಾಡ್ತೀನಿ', 'sari mellage'],
      'promise_speak_softly', ['Say you will talk softly.', '"Mellage" = softly.', 'Say: "Kshamisi, mellage maataadteeni."'],
      ['ಒಳ್ಳೇದು ಮಗು. ದೇವರ ಆಶೀರ್ವಾದ ಇರಲಿ.', 'Olledu magu. Devara aashirvaada irali.', 'Good, child. May God bless you.'],
      ['ಮೆಲ್ಲಗೆ ಹೇಳಿ ಮಗು.', 'Mellage heli magu.', 'Say it softly, child.']),
  ],
  outro: ['ಓಂ ಶಾಂತಿ. ಹೋಗಿ ಬನ್ನಿ.', 'Om shaanti. Hogi banni.', 'Om peace. Go and come again.'],
  learned: [['mellage maataadteeni', 'I will speak softly']],
  again: ['ಮಗು, ಒಳಗೆ ದರ್ಶನ ಆಯ್ತಾ?', 'Magu, olage darshana aytha?', 'Child, did you have darshan inside?'],
});

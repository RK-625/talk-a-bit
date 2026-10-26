// Tutorial: the easiest conversation. Keyed by role `chaiwalaUncle` (Shankar Anna at the filter-coffee darshini, the spawn spot).
import { dialogue as D, step as S } from './kit.js';

export default D('chaiwalaUncle', {
  name: 'Shankar Anna', role: 'darshini owner', site: 'Darshini square, filter-coffee darshini (spawn)', diff: 1, tutorial: true, place: 'darshini',
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Kind, slightly gruff darshini owner who treats Rohan, the new intern learning Kannada, like a nephew. Speaks simply and slowly.',
  goal: 'Order one filter coffee from Shankar Anna (tutorial).',
  steps: [
    S('order', ['ಬನ್ನಿ ರೋಹನ್! ಏನು ಬೇಕು, ಕಾಫಿ ಕೊಡಲಾ?', 'Banni Rohan! Enu beku, coffee kodala?', 'Come Rohan! What do you want, shall I give you coffee?'],
      'Order one filter coffee.', ['Anna, ondu coffee kodi.', 'ಅಣ್ಣ, ಒಂದು ಕಾಫಿ ಕೊಡಿ.'],
      ['ondu coffee kodi', 'anna ondu coffee kodi', 'ondu filter coffee kodi', 'ondu coffee beku anna', 'ಒಂದು ಕಾಫಿ ಕೊಡಿ', 'ಅಣ್ಣ ಒಂದು ಕಾಫಿ ಬೇಕು', 'anna one coffee kodi'],
      'order_one_filter_coffee', ['Say "one coffee" and "please give".', 'One = "ondu". Please give = "kodi".', 'Say: "Anna, ondu coffee kodi."'],
      ['ತಗೊಳ್ಳಿ, ಬಿಸಿ ಇದೆ. ಹುಷಾರು.', 'Tagolli, bisi ide. Hushaaru.', 'Here, it is hot. Careful.'],
      ['ಏನಂದ್ರಿ? ಸ್ವಲ್ಪ ಜೋರಾಗಿ ಹೇಳಿ.', 'Enandri? Swalpa joragi heli.', 'What did you say? Say it a bit louder.']),
    S('idli', ['ಜೊತೆಗೆ ಇಡ್ಲಿ ವಡೆ ಬೇಕಾ?', 'Jotege idli vade beka?', 'Do you want idli-vada with it?'],
      'Say yes or no to idli-vada.', ['Haudu anna, ondu plate kodi.', 'ಹೌದು ಅಣ್ಣ, ಒಂದು ಪ್ಲೇಟ್ ಕೊಡಿ.'],
      ['haudu anna ondu plate kodi', 'haudu', 'haudu idli vade kodi', 'beda anna', 'beda saaku anna', 'ಹೌದು ಅಣ್ಣ', 'ಬೇಡ ಅಣ್ಣ', 'illa anna beda'],
      'answer_idli_vada_yes_or_no', ['Answer with a simple yes or no.', 'Yes = "haudu". No = "beda".', 'Say: "Haudu anna, ondu plate kodi." or "Beda anna."'],
      ['ಸರಿ, ಬಿಸಿಬಿಸಿ ಬರ್ತಿದೆ.', 'Sari, bisibisi bartide.', 'Okay, it is coming piping hot.'],
      ['ಹೌದಾ, ಬೇಡವಾ? ಬೇಗ ಹೇಳಿ.', 'Haudaa, bedava? Bega heli.', 'Yes or no? Tell me quickly.']),
    S('thanks', ['ಕಾಫಿ ಕುಡಿರಿ, ಆಫೀಸ್‌ಗೆ ಲೇಟ್ ಆಗುತ್ತೆ.', 'Coffee kudiri, office ge late aagutte.', 'Drink your coffee, you will be late for office.'],
      'Say thank you to Shankar Anna.', ['Dhanyavaada anna!', 'ಧನ್ಯವಾದ ಅಣ್ಣ!'],
      ['dhanyavaada anna', 'tumba dhanyavaada anna', 'dhanyavaadagalu', 'thanks anna', 'ಧನ್ಯವಾದ ಅಣ್ಣ', 'ತುಂಬಾ ಧನ್ಯವಾದ', 'ಥ್ಯಾಂಕ್ಸ್ ಅಣ್ಣ'],
      'say_thanks', ['Thank him in Kannada.', 'Thank you = "dhanyavaada".', 'Say: "Dhanyavaada anna!"'],
      ['ಅಯ್ಯೋ, ಇದಕ್ಕೆಲ್ಲ ಥ್ಯಾಂಕ್ಸ್ ಯಾಕೆ! ಹೋಗಿ, ಚೆನ್ನಾಗಿರಿ.', 'Ayyo, idakkella thanks yaake! Hogi, chennagiri.', 'Oh, no thanks needed for this! Go, take care.'],
      ['ಏನೂ ಹೇಳಲ್ವಾ? ಅಣ್ಣನಿಗೆ ಥ್ಯಾಂಕ್ಸ್ ಇಲ್ವಾ?', 'Enu helalva? Annanige thanks illva?', 'Nothing to say? No thanks for your Anna?']),
  ],
  outro: ['ಶಹಬ್ಬಾಸ್ ರೋಹನ್! ಈಗ ಇಡೀ ಬೆಂಗಳೂರು ಸುತ್ತಿ ಬನ್ನಿ.', 'Shabbas Rohan! Iga idi Bengaluru sutti banni.', 'Well done, Rohan! Now go explore all of Bengaluru.'],
  learned: [['ondu coffee kodi', 'give me one coffee'], ['haudu / beda', 'yes / no'], ['dhanyavaada', 'thank you']],
  again: ['ರೋಹನ್, ಮತ್ತೆ ಬಂದ್ರಾ? ಇನ್ನೊಂದು ಕಾಫಿ ಬೇಕಾ?', 'Rohan, matte bandra? Innondu coffee beka?', 'Rohan, back again? Want another coffee?'],
});

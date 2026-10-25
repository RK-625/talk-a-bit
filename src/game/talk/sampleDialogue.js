/** Dev-only stand-in dialogue (used when src/worlds/<world>/dialogue/ does not supply the id). Schema: docs/DIALOGUE.md. */
export default {
  chaiwalaUncle: {
    id: 'chaiwalaUncle', name: 'Raju Chacha', role: 'chaiwalaUncle', lang: 'hi', voice: { rate: 0.95, pitch: 0.8 },
    persona: 'Gruff but kind tapri owner, has known Chotu forever.',
    goal: 'Ask Raju Chacha for two cutting chai.',
    steps: [
      {
        id: 'greet',
        npc: { text: 'अरे छोटू! आज देर से आया? क्या चाहिए?', roman: 'Arre Chotu! Aaj der se aaya? Kya chahiye?', en: 'Hey Chotu! Late today? What do you need?' },
        instruction: 'Say sorry for being late and ask for two cutting chai.',
        suggest: { roman: 'Sorry chacha, do cutting dena.', text: 'सॉरी चाचा, दो कटिंग देना।' },
        accept: ['do cutting dena', 'do cutting chai chahiye', 'chacha do chai', 'two cutting please', 'दो कटिंग देना'],
        intent: 'apologise_and_order_two_cutting',
        hints: ['Start with "sorry".', 'Two = "do". Cutting chai = "cutting".', 'Say: "Sorry chacha, do cutting dena."'],
        onValid: { text: 'चल ठीक है, बैठ।', roman: 'Chal theek hai, baith.', en: 'Okay fine, sit.' },
        onRetry: { text: 'क्या? ज़ोर से बोल।', roman: 'Kya? Zor se bol.', en: 'What? Say it louder.' },
      },
      {
        id: 'thanks',
        npc: { text: 'ले, गरम चाय। पैसे बाद में दे देना।', roman: 'Le, garam chai. Paise baad mein de dena.', en: 'Here, hot chai. Pay me later.' },
        instruction: 'Thank him.',
        suggest: { roman: 'Shukriya chacha!', text: 'शुक्रिया चाचा!' },
        accept: ['shukriya', 'thanks chacha', 'dhanyavad', 'thank you chacha'],
        intent: 'thank_the_chaiwala',
        hints: ['A one-word thank you is enough.', 'Hindi for thanks starts with "shuk".', 'Say: "Shukriya chacha!"'],
        onValid: { text: 'अरे, कोई बात नहीं!', roman: 'Arre, koi baat nahi!', en: 'Arre, no problem!' },
        onRetry: { text: 'हैं? कुछ बोला?', roman: 'Hain? Kuch bola?', en: 'Huh? Did you say something?' },
      },
    ],
    outro: { text: 'जा, मौज कर, छोटू!', roman: 'Ja, mauj kar, Chotu!', en: 'Go, enjoy, Chotu!' },
    learned: [{ roman: 'do cutting dena', en: 'give me two cutting chai', text: 'दो कटिंग देना' }, { roman: 'shukriya', en: 'thank you', text: 'शुक्रिया' }],
  },
};

/** short spoken greetings for ambient citizens who have no dialogue */
export const GREETINGS = [
  { text: 'नमस्ते!', roman: 'Namaste!', en: 'Hello!' },
  { text: 'अरे छोटू!', roman: 'Arre Chotu!', en: 'Hey Chotu!' },
  { text: 'क्या हाल है?', roman: 'Kya haal hai?', en: 'How are you?' },
  { text: 'बोल भाई!', roman: 'Bol bhai!', en: 'Tell me, brother!' },
  { text: 'सब बढ़िया?', roman: 'Sab badhiya?', en: 'All good?' },
];
export const GREETINGS_EN = [{ text: 'Hello there!', roman: '', en: '' }, { text: 'Oh, hi!', roman: '', en: '' }];

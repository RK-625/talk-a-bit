// Delivery rider with a scooter at the Red Fort auto stand.
import { dialogue as D, step as S } from './kit.js';

export default D('dabbawala', {
  name: 'Manoj', role: 'delivery rider', site: 'Red Fort auto stand, delivery scooter', diff: 2,
  voice: 'q',
  persona: 'Always-late food-delivery rider in a red T-shirt, grumbling about wrong addresses and missing tips but friendly to anyone who listens.',
  goal: 'Ask what is wrong with the address, tell him to call the customer, and cheer him up.',
  steps: [
    S('problem', ['ये पता मिल ही नहीं रहा! लोकेशन गड़बड़ है।', 'Ye pata mil hi nahi raha! Location gadbad hai.', 'I cannot find this address! The location is wrong.'],
      'Ask what is wrong with the address.', ['Kya hua bhaiya, address nahi mil raha?', 'क्या हुआ भैया, एड्रेस नहीं मिल रहा?'],
      ['kya hua bhaiya address nahi mil raha', 'address mein kya problem hai bhaiya', 'oye kya hua address kahaan ka hai', 'paaji kya gadbad hai address mein', 'bhaiya address kyun nahi mil raha', 'kahaan ka address hai bhaiya', 'क्या हुआ एड्रेस नहीं मिल रहा'],
      ['Ask him what happened.', 'What happened = "kya hua". Not found = "nahi mil raha".'],
      ['फ्लैट नंबर लिखा है पर गली का नाम ग़लत है!', 'Flat number likha hai par gali ka naam galat hai!', 'The flat number is written but the lane name is wrong!'],
      ['क्या पूछा? मैं फ़ोन में घुसा था।', 'Kya puchha? Main phone mein ghusa tha.', 'What did you ask? I was buried in my phone.']),
    S('call', ['कस्टमर को फ़ोन करूँ क्या? पिछली बार गाली दी थी।', 'Customer ko phone karun kya? Pichhli baar gaali di thi.', 'Shall I call the customer? Last time one scolded me.'],
      'Tell him to call the customer.', ['Haan bhaiya, customer ko call kar lo.', 'हाँ भैया, कस्टमर को कॉल कर लो।'],
      ['haan customer ko call kar lo', 'bhaiya call kar ke puchh lo', 'customer ko phone laga lo bhaiya', 'paaji ek baar call kar lo', 'call kar lo yaar address puchh lo', 'haan bhaiya phone kar lo', 'हाँ भैया कस्टमर को फ़ोन कर लो'],
      ['Suggest calling him.', 'Call = "call kar lo". Customer = "customer".'],
      ['चल, लगा देता हूँ। तू कहता है तो सही होगा।', 'Chal, laga deta hoon. Tu kehta hai toh sahi hoga.', 'Okay, I will ring. If you say so, it must be right.'],
      ['फ़ोन करूँ या नहीं? बता न यार।', 'Phone karun ya nahi? Bata na yaar.', 'Should I call or not? Tell me, yaar.']),
    S('cheer', ['टिप भी कोई नहीं देता, पूरे दिन भाग-भाग के थक गया।', 'Tip bhi koi nahi deta, poore din bhaag-bhaag ke thak gaya.', 'Nobody tips either, I am tired of running all day.'],
      'Cheer him up: do not take tension, all will be fine.', ['Tension mat lo bhaiya, sab theek ho jaayega.', 'टेंशन मत लो भैया, सब ठीक हो जाएगा।'],
      ['tension mat lo bhaiya sab theek ho jaayega', 'koi na bhaiya sab theek hoga', 'oye tension nahi lene ka sab badhiya', 'paaji chinta mat karo sab theek ho jaayega', 'sab theek ho jaayega tension mat lo', 'himmat rakho bhaiya', 'टेंशन मत लो भैया सब ठीक हो जाएगा'],
      ['Say do not worry.', 'Do not take tension = "tension mat lo". All fine = "sab theek".'],
      ['सही बोला भाई! चल मैं निकलता हूँ, तू भी पढ़ाई कर।', 'Sahi bola bhai! Chal main nikalta hoon, tu bhi padhai kar.', 'Well said, brother! I am off, you go study too.'],
      ['कुछ अच्छा सा बोल दे, थोड़ा हौसला मिल जाए।', 'Kuch accha sa bol de, thoda hausla mil jaaye.', 'Say something kind, I need some courage.']),
  ],
  outro: ['थैंक्स भाई, मूड ठीक हो गया! ऑर्डर पहुँचाकर आता हूँ।', 'Thanks bhai, mood theek ho gaya! Order pahunchakar aata hoon.', 'Thanks brother, my mood is fixed! I will deliver the order and be back.'],
  learned: [['kya hua, address nahi mil raha?', 'what happened, cannot find the address?'], ['call kar lo', 'go ahead and call'], ['tension mat lo, sab theek ho jaayega', 'do not worry, all will be fine']],
  again: ['अरे वही भाई! आज का ऑर्डर टाइम पर पहुँचा।', 'Arre wahi bhai! Aaj ka order time par pahuncha.', 'Oh it is you! Today\'s order arrived on time.'],
});

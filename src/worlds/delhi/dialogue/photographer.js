// India Gate photographer with a tripod.
import { dialogue as D, step as S } from './kit.js';

export default D('photographer', {
  name: 'Tinku', role: 'India Gate photographer', site: 'India Gate plaza, photo tripod', diff: 2,
  voice: { rate: 1.0, pitch: 0.95 },
  persona: 'Friendly photographer with a press badge and instant prints, always framing India Gate with the pigeons.',
  goal: 'Ask for a photo with India Gate behind you, ask the price, and ask when the print will be ready.',
  steps: [
    S('photo', ['फ़ोटो खिंचवाओगे? इंडिया गेट के सामने बढ़िया आएगी!', 'Photo khinchwaoge? India Gate ke saamne badhiya aayegi!', 'Want a photo? It will look great in front of India Gate!'],
      'Ask him to take your photo with India Gate behind you.', ['Haan bhaiya, India Gate ke saath ek photo kheench do.', 'हाँ भैया, इंडिया गेट के साथ एक फ़ोटो खींच दो।'],
      ['india gate ke saath ek photo kheench do', 'bhaiya ek photo india gate ke saamne', 'paaji ek photo kheench do gate ke saath', 'mera photo india gate ke saath lo', 'haan ji photo kheench dijiye', 'ek photo chahiye india gate ke saath', 'इंडिया गेट के साथ एक फ़ोटो खींचो'],
      ['Say yes and ask for the photo.', 'Pull a photo = "photo kheench do". With = "ke saath".'],
      ['चलो, यहाँ खड़े हो जाओ। कबूतर भी फ़्रेम में आ जाएँगे!', 'Chalo, yahan khade ho jao. Kabootar bhi frame mein aa jaayenge!', 'Come, stand here. The pigeons will come into the frame too!'],
      ['फ़ोटो चाहिए या नहीं? ज़रा साफ़ बोलो।', 'Photo chahiye ya nahi? Zara saaf bolo.', 'Do you want a photo or not? Say it clearly.']),
    S('price', ['प्रिंट भी निकाल दूँ क्या? हाथों-हाथ मिल जाएगा।', 'Print bhi nikaal dun kya? Haathon-haath mil jaayega.', 'Shall I print it too? You will get it in hand.'],
      'Ask how much the print costs.', ['Print ke kitne paise lagenge?', 'प्रिंट के कितने पैसे लगेंगे?'],
      ['print ke kitne paise lagenge', 'bhaiya print kitne ka hai', 'ek photo ka kitna loge', 'paaji print da kya rate hai', 'kitne rupaye lagenge print ke', 'photo print ka rate bata do', 'प्रिंट के कितने पैसे लगेंगे'],
      ['Ask about the cost.', 'How much money = "kitne paise". Will it take = "lagenge".'],
      ['सौ रुपये का एक। तुम्हारे लिए कोई जल्दी नहीं, आराम से सोचो।', 'Sau rupaye ka ek. Tumhare liye koi jaldi nahi, aaram se socho.', 'A hundred each. No hurry, think calmly.'],
      ['प्रिंट का दाम पूछ रहे हो ना? फिर से बोलो।', 'Print ka daam puchh rahe ho na? Phir se bolo.', 'You are asking the print price, right? Say it again.']),
    S('time', ['सौ रुपये का है, मंज़ूर? चलो खींच देता हूँ।', 'Sau rupaye ka hai, manzoor? Chalo kheench deta hoon.', 'It is a hundred, agreed? Let me click.'],
      'Ask how long the print will take.', ['Kitni der mein mil jaayegi?', 'कितनी देर में मिल जाएगी?'],
      ['kitni der mein mil jaayegi', 'bhaiya print kab tak milegi', 'paaji kitna time lagega print mein', 'kitne minute mein taiyaar hogi', 'jaldi mil jaayegi na bhaiya', 'photo kab tak aa jaayegi', 'कितनी देर में मिल जाएगी'],
      ['Ask about the wait.', 'In how long = "kitni der mein". Will I get = "mil jaayegi".'],
      ['बस पाँच मिनट। तब तक पास में चाय पी आओ।', 'Bas paanch minute. Tab tak paas mein chai pi aao.', 'Just five minutes. Have a chai nearby till then.'],
      ['कितनी देर, पूछ रहे हो? फिर से कहो।', 'Kitni der, puchh rahe ho? Phir se kaho.', 'You are asking how long? Say it again.']),
  ],
  outro: ['बढ़िया फ़ोटो आएगी! अफ़सर बनो तो इसी फ़ोटो पर ऑटोग्राफ़ देना।', 'Badhiya photo aayegi! Afsar bano toh isi photo par autograph dena.', 'The photo will be great! When you become an officer, sign this very photo.'],
  learned: [['ek photo kheench do', 'take a photo of me'], ['print ke kitne paise lagenge?', 'how much for the print?'], ['kitni der mein mil jaayegi?', 'how soon will I get it?']],
  again: ['अरे फिर आए? एक और क्लिक हो जाए!', 'Arre phir aaye? Ek aur click ho jaaye!', 'You again? Let us do one more click!'],
});

// The two India Gate souvenir stalls (ids kept from the bangle stalls of the template city).
import { P, step as S } from '../kit.js';

export const bangleA = P('laad-bangle-seller-bangleA', 'Chacha Ghanshyam', 'India Gate souvenir seller', 'India Gate souvenir stall A', 'o', 'Buy a mini India Gate for your mother.', [
  S('mini', ['छोटा-सा इंडिया गेट ले लो बेटा, घर की शोभा बढ़ाएगा।', 'Chhota-sa India Gate le lo beta, ghar ki shobha badhayega.', 'Take a little India Gate, beta, it will beautify your home.'],
    'Say you will take one for your mother.', ['Ye mini India Gate main maa ke liye le jaunga.', 'ये मिनी इंडिया गेट मैं माँ के लिए ले जाऊँगा।'],
    ['maa ke liye ek mini gate dijiye', 'ghar bhejne ke liye ek dena', 'chacha ek chhota India Gate pack karo', 'maa ko pasand aayega le leta hoon'],
    ['Say who it is for.', 'For my mother = "maa ke liye". I will take = "le jaunga".'],
    ['वाह! माँ को ख़ुशी होगी। ये लो, काग़ज़ में लपेट देता हूँ।', 'Wah! Maa ko khushi hogi. Ye lo, kaagaz mein lapet deta hoon.', 'Wow! Your mother will be happy. Here, I wrap it in paper.'],
    ['ऊँचा बोल बेटा, भीड़ बहुत है।', 'Ooncha bol beta, bheed bahut hai.', 'Speak up, beta, it is crowded.']),
], ['जा बेटा, माँ को मेरा नमस्ते कहना।', 'Ja beta, maa ko mera namaste kehna.', 'Go, beta, give your mother my namaste.'],
  [['maa ke liye le jaunga', 'I will take it for my mother']], ['बेटा, आज और छोटे वाले आए हैं।', 'Beta, aaj aur chhote wale aaye hain.', 'Beta, even smaller ones have come today.'], 1);

export const bangleB = P('laad-bangle-seller-bangleB', 'Kiran', 'India Gate souvenir seller', 'India Gate souvenir stall B', 'f', 'Buy a keyring with a tricolour flag.', [
  S('keyring', ['इंडिया गेट की-रिंग, बीस रुपये! बैग पर लगाओगे?', 'India Gate key-ring, bees rupaye! Bag par lagaoge?', 'India Gate keyring, twenty rupees! Will you hook it on your bag?'],
    'Ask for one keyring.', ['Ek keyring dena, bag mein laga do.', 'एक की-रिंग देना, बैग में लगा दो।'],
    ['ek keyring de do didi', 'bag par laga do keyring', 'paaji ek keyring dena', 'bees ki ek keyring chahiye'],
    ['Buy a keyring.', 'One keyring = "ek keyring". Put it on = "laga do".'],
    ['लो, ज़िप पर टाँग दी। तुम्हारे झोले पर बहुत जँचेगी!', 'Lo, zip par taang di. Tumhare jhole par bahut jachegi!', 'Here, hung on the zip. It will suit your jhola well!'],
    ['की-रिंग चाहिए या झंडा? साफ़ बोलो।', 'Key-ring chahiye ya jhanda? Saaf bolo.', 'Keyring or flag? Say clearly.']),
  S('style', ['तिरंगे वाली लगाऊँ या मीनार वाली?', 'Tiranga wali lagaun ya minar wali?', 'Shall I put the tricolour one or the tower one?'],
    'Ask for the tricolour one.', ['Tiranga wali laga do.', 'तिरंगे वाली लगा दो।'],
    ['tiranga wali hi dena', 'tiranga wali keyring lagao', 'didi tiranga wali pa do', 'mujhe tiranga pasand hai'],
    ['Pick the flag.', 'Tricolour = "tiranga". The one with = "wali".'],
    ['वाह, देशभक्त! ये लो, और ऊपर से एक छोटा झंडा मुफ़्त।', 'Wah, deshbhakt! Ye lo, aur upar se ek chhota jhanda muft.', 'Wow, a patriot! Here, plus a small flag free.'],
    ['तिरंगा या मीनार? एक बोलो।', 'Tiranga ya minar? Ek bolo.', 'Tricolour or tower? Say one.']),
], ['जाओ भैया, तिरंगा हमेशा ऊँचा रखना।', 'Jao bhaiya, tiranga hamesha ooncha rakhna.', 'Go brother, always keep the tricolour high.'],
  [['ek keyring dena, bag mein laga do', 'one keyring, hook it on my bag'], ['tiranga wali laga do', 'put on the tricolour one']], ['भैया, कल की-रिंग बहुत बिकीं!', 'Bhaiya, kal key-ring bahut bikeen!', 'Brother, lots of keyrings sold yesterday!'], 2);

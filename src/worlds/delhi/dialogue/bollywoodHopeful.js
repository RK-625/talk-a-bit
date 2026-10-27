// Reel-making influencer in front of the coaching hoardings.
import { dialogue as D, step as S } from './kit.js';

export default D('bollywoodHopeful', {
  name: 'Simran', role: 'reel-making influencer', site: "Bittu Bhaiya's chai-stall square, coaching hoardings wall", diff: 2,
  voice: 'f',
  persona: 'Cheerful influencer who re-shoots the same ten seconds, talks about views and followers, and thinks Rahul should film UPSC life reels.',
  goal: 'Compliment her reel, wish her views, and say you will clear UPSC before making reels.',
  steps: [
    S('compliment', ['हाय! ये रील कैसी लग रही है? पोज़ सही है ना?', 'Hi! Ye reel kaisi lag rahi hai? Pose sahi hai na?', 'Hi! How does this reel look? The pose is right, no?'],
      'Compliment her pose and reel.', ['Aapka pose bahut mast lag raha hai.', 'आपका पोज़ बहुत मस्त लग रहा है।'],
      ['aapka pose bahut mast hai', 'reel bahut badhiya lag rahi hai', 'bahut accha pose hai aapka', 'oye kya pose hai mast', 'aap toh kamaal ki lag rahi ho', 'aapki reel zabardast hai', 'आपका पोज़ बहुत मस्त है'],
      ['Say something nice about the pose.', 'Your pose = "aapka pose". Very nice = "bahut mast".'],
      ['थैंक्यू थैंक्यू! तुमने तो मेरा दिन बना दिया।', 'Thank you thank you! Tumne toh mera din bana diya.', 'Thank you, thank you! You made my day.'],
      ['सॉरी, शोर में सुनाई नहीं दिया। फिर से बोलो?', 'Sorry, shor mein sunai nahi diya. Phir se bolo?', 'Sorry, I could not hear in the noise. Say again?']),
    S('views', ['बस, दो हज़ार व्यूज़ का सपना है। विश कर दो ना!', 'Bas, do hazaar views ka sapna hai. Wish kar do na!', 'My dream is just two thousand views. Wish me luck, please!'],
      'Wish her lots of views.', ['Aapko bahut saare views milein!', 'आपको बहुत सारे व्यूज़ मिलें!'],
      ['aapko bahut saare views milein', 'views zaroor milenge aapko', 'all the best views ke liye', 'oye chak de views aa jayenge', 'mera aashirwad hai views badhenge', 'bahut saare views mil jayenge', 'आपको बहुत सारे व्यूज़ मिलें'],
      ['Wish her success.', 'Many = "bahut saare". May you get = "milein".'],
      ['आमीन! तुम्हारी दुआ से वायरल हो ही जाएगी।', 'Aameen! Tumhari dua se viral ho hi jaaungi.', 'Amen! With your blessing I will go viral.'],
      ['व्यूज़ के लिए कुछ तो अच्छा बोलो।', 'Views ke liye kuch toh accha bolo.', 'Say something nice for my views.']),
    S('upsc', ['तुम भी पढ़ाकू वाली रील बनाओ ना! "यूपीएससी लाइफ़"।', 'Tum bhi padhaku wali reel banao na! "UPSC life".', 'You make a studious reel too! "UPSC life".'],
      'Say you will clear UPSC first and make reels later.', ['Pehle UPSC clear kar loon, phir reel banaunga.', 'पहले यूपीएससी क्लियर कर लूँ, फिर रील बनाऊँगा।'],
      ['pehle upsc clear kar loon phir reel banaunga', 'abhi padhai karni hai reel baad mein', 'upsc ke baad reel banaunga pakka', 'paaji pehle exam phir reel', 'pehle selection fir reel', 'reel exam ke baad banaunga', 'पहले यूपीएससी क्लियर कर लूँ फिर रील'],
      ['Say exam first, reel later.', 'First = "pehle". Then = "phir".'],
      ['हा हा! ठीक है, अफ़सर बनकर आना, पहला वीडियो मेरे साथ!', 'Ha ha! Theek hai, afsar bankar aana, pehla video mere saath!', 'Ha ha! Fine, come as an officer, first video with me!'],
      ['रील बनाओगे या नहीं? हाँ-ना बोलो।', 'Reel banaoge ya nahi? Haan-na bolo.', 'Will you make a reel or not? Say yes or no.']),
  ],
  outro: ['ऑल द बेस्ट राहुल! और हाँ, मुझे फ़ॉलो ज़रूर करना।', 'All the best Rahul! Aur haan, mujhe follow zaroor karna.', 'All the best, Rahul! And yes, do follow me.'],
  learned: [['aapka pose bahut mast hai', 'your pose is very cool'], ['aapko bahut saare views milein', 'may you get lots of views'], ['pehle UPSC, phir reel', 'first UPSC, then reels']],
  again: ['अरे वापस आ गए? ये वाला टेक देखो!', 'Arre waapas aa gaye? Ye wala take dekho!', 'Back again? Look at this take!'],
});

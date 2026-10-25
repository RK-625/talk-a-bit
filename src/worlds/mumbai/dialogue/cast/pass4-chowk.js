// Pass 4: the chowk, the chawls, the temple stalls and the railway station (15 new people).
import { dialogue as D, step as S } from './kit.js';

export const chowkVadaCustomer = D('chowk-vada-customer', {
  name: 'Sandeep', role: 'schoolboy at the vada stall', site: 'Customer side of the vada pav stall, the chowk', diff: 2,
  voice: { rate: 1.1, pitch: 1.3 },
  persona: 'Teen in school uniform with just a little pocket money, staring hungrily at the kadhai.',
  goal: 'Tell him the price of one vada and agree to share a vada pav.',
  steps: [
    S('price', ['भैया, एक वड़ा कितने का है? मेरे पास दस रुपये हैं।', 'Bhaiya, ek vada kitne ka hai? Mere paas das rupaye hain.', 'Brother, how much is one vada? I have only ten rupees.'],
      'Tell him one vada costs fifteen rupees.', ['Ek vada pandrah rupaye ka hai.', 'एक वड़ा पंद्रह रुपये का है।'],
      ['ek vada pandrah rupaye ka hai', 'pandrah rupaye ka hai', 'vada pandrah ka hai', 'ek vada pandrah rupaye', 'एक वड़ा पंद्रह रुपये का है', 'पंद्रह रुपये का', 'it is fifteen rupees', 'vada pandrah rupaye ka'],
      'tell_price_fifteen', ['Tell him the price.', '"pandrah" = fifteen; "rupaye" = rupees.', 'Say: "Ek vada pandrah rupaye ka hai."'],
      ['अरे यार, पाँच रुपये कम पड़ रहे हैं!', 'Arre yaar, paanch rupaye kam pad rahe hain!', 'Oh man, I am five rupees short!'],
      ['कितने का है? ठीक से बता ना।', 'Kitne ka hai? Theek se bata na.', 'How much is it? Tell me properly.']),
    S('share', ['तू मेरे साथ आधा-आधा खाएगा क्या?', 'Tu mere saath aadha-aadha khayega kya?', 'Will you share it half and half with me?'],
      'Say yes, you will share it half and half.', ['Haan, aadha-aadha kha lete hain.', 'हाँ, आधा-आधा खा लेते हैं।'],
      ['haan aadha aadha kha lete hain', 'aadha aadha khate hain', 'haan chalo aadha aadha', 'theek hai aadha aadha', 'हाँ आधा-आधा खा लेते हैं', 'आधा आधा खाते हैं', 'yes lets share half half', 'chalo baant lete hain'],
      'agree_to_share_vada', ['Say yes to sharing.', '"aadha-aadha" = half and half.', 'Say: "Haan, aadha-aadha kha lete hain."'],
      ['वाह, तू तो पक्का दोस्त निकला!', 'Wah, tu toh pakka dost nikla!', 'Wow, you turned out a true friend!'],
      ['आधा-आधा या नहीं? बोल ना!', 'Aadha-aadha ya nahi? Bol na!', 'Half and half or not? Say it!']),
  ],
  outro: ['थैंक्स रे! कल मैं तुझे खिलाऊँगा।', 'Thanks re! Kal main tujhe khilaunga.', 'Thanks! Tomorrow I will treat you.'],
  learned: [['ek vada pandrah rupaye ka hai', 'one vada costs fifteen rupees'], ['aadha-aadha kha lete hain', 'let us eat half and half']],
  again: ['अरे, फिर आया? वड़ा अभी गरम है!', 'Arre, phir aaya? Vada abhi garam hai!', 'Oh, back again? The vada is still hot!'],
});

export const chowkFruitSeller = D('chowk-fruit-seller', {
  name: 'Shobha Tai', role: 'fruit seller', site: 'Fruit stall, the chowk', diff: 2,
  voice: { rate: 1.1, pitch: 1.15 },
  persona: 'Loud, jolly fruit hawker with a flower in her hair who gives a free slice to anyone who smiles.',
  goal: 'Buy half a dozen bananas from her.',
  steps: [
    S('banana', ['केले ले लो, केले! ताज़े केले! कितने दूँ?', 'Kele le lo, kele! Taaze kele! Kitne doon?', 'Buy bananas! Fresh bananas! How many shall I give?'],
      'Ask for half a dozen bananas.', ['Aadha darjan kele dena.', 'आधा दर्जन केले देना।'],
      ['aadha darjan kele dena', 'chhe kele dena', 'aadha darjan kele chahiye', 'chhe kele dijiye', 'आधा दर्जन केले देना', 'छे केले दीजिए', 'half a dozen bananas', 'six bananas please'],
      'order_half_dozen_bananas', ['Say how many bananas you want.', '"aadha darjan" = half a dozen = six.', 'Say: "Aadha darjan kele dena."'],
      ['ये ले बेटा, एक एक्स्ट्रा मेरी तरफ़ से!', 'Ye le beta, ek extra meri taraf se!', 'Here, child, one extra from me!'],
      ['कितने केले चाहिए? गिनके बोल।', 'Kitne kele chahiye? Ginke bol.', 'How many bananas do you want? Count and say.']),
  ],
  outro: ['फल खाया कर, छोटू, ताक़त आएगी!', 'Phal khaya kar, Chotu, taaqat aayegi!', 'Eat fruit, Chotu, you will get strong!'],
  learned: [['aadha darjan kele dena', 'give me half a dozen bananas']],
  again: ['फिर आया? आज संतरे भी मीठे हैं!', 'Phir aaya? Aaj santre bhi meethe hain!', 'Back again? The oranges are sweet today too!'],
});

export const chowkMarigoldSeller = D('chowk-marigold-seller', {
  name: 'Kamal Tai', role: 'flower garland seller', site: 'Marigold stall, the chowk', diff: 3,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Gentle garland maker whose fingers smell of marigold, busy before the Ganpati festival.',
  goal: 'Buy a garland for Ganpati Bappa and ask her to tie it neatly.',
  steps: [
    S('haar', ['गणपति बप्पा के लिए हार चाहिए क्या?', 'Ganpati Bappa ke liye haar chahiye kya?', 'Do you need a garland for Ganpati Bappa?'],
      'Say you want one garland for Ganpati.', ['Haan, Ganpati ke liye ek haar dena.', 'हाँ, गणपति के लिए एक हार देना।'],
      ['haan ganpati ke liye ek haar dena', 'ek haar dena', 'ganpati bappa ke liye haar chahiye', 'mujhe ek haar chahiye', 'हाँ गणपति के लिए एक हार देना', 'एक हार देना', 'one garland for ganpati', 'haan haar dijiye'],
      'ask_garland_for_ganpati', ['Say yes and ask for a garland.', '"haar" = garland.', 'Say: "Haan, Ganpati ke liye ek haar dena."'],
      ['ये लो, बिलकुल ताज़े गेंदे के फूल हैं।', 'Ye lo, bilkul taaze genda ke phool hain.', 'Here, these are completely fresh marigolds.'],
      ['हार चाहिए या नहीं, बेटा?', 'Haar chahiye ya nahi, beta?', 'Do you want a garland or not, child?']),
    S('baandh', ['इसे लपेट दूँ या गले में पहनाने वाला दूँ?', 'Ise lapet doon ya gale mein pehnane wala doon?', 'Shall I wrap it, or give one to put around the neck?'],
      'Ask her to tie it nicely.', ['Zara achhe se baandh dena.', 'ज़रा अच्छे से बाँध देना।'],
      ['zara achhe se baandh dena', 'achhe se baandh dijiye', 'achhe se lapet dena', 'sundar baandh dena', 'ज़रा अच्छे से बाँध देना', 'अच्छे से बाँध दीजिए', 'tie it nicely please', 'achhe se pack kar dena'],
      'ask_tie_garland_nicely', ['Ask her to tie or wrap it well.', '"baandh" = tie; "achhe se" = nicely.', 'Say: "Zara achhe se baandh dena."'],
      ['ले, एकदम सुंदर बाँध दिया।', 'Le, ekdum sundar baandh diya.', 'There, tied beautifully.'],
      ['कैसे बाँधूँ? बता तो सही।', 'Kaise baandhun? Bata toh sahi.', 'How should I tie it? Do tell.']),
  ],
  outro: ['बप्पा तेरी सब मनोकामना पूरी करें।', 'Bappa teri sab manokamna poori karein.', 'May Bappa fulfil all your wishes.'],
  learned: [['ek haar dena', 'give me one garland'], ['zara achhe se baandh dena', 'please tie it nicely']],
  again: ['अरे वापस आया? आज गेंदा सस्ता है!', 'Arre wapas aaya? Aaj genda sasta hai!', 'Oh, you are back? Marigold is cheap today!'],
});

export const chowkNewsReader = D('chowk-news-reader', {
  name: 'Bhide Kaka', role: 'retired newspaper reader', site: 'Newspaper stand, the chowk', diff: 3,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Retired clerk who reads the paper standing at the stall and never buys it. Loves to chat about the old days.',
  goal: 'Tell him you do not read the newspaper every day.',
  steps: [
    S('read', ['बेटा, तू रोज़ अख़बार पढ़ता है क्या?', 'Beta, tu roz akhbaar padhta hai kya?', 'Child, do you read the newspaper every day?'],
      'Say no, you read it only sometimes.', ['Nahi kaka, kabhi kabhi padhta hoon.', 'नहीं काका, कभी कभी पढ़ता हूँ।'],
      ['nahi kaka kabhi kabhi padhta hoon', 'kabhi kabhi padhta hoon', 'roz nahi padhta kaka', 'kabhi kabhar padhta hoon', 'नहीं काका कभी कभी पढ़ता हूँ', 'कभी कभी पढ़ता हूँ', 'no uncle only sometimes', 'nahi kabhi kabhi'],
      'say_read_paper_sometimes', ['Say how often you read it.', '"kabhi kabhi" = sometimes.', 'Say: "Nahi kaka, kabhi kabhi padhta hoon."'],
      ['अरे, रोज़ पढ़ा कर। अक़्ल बढ़ती है!', 'Arre, roz padha kar. Aql badhti hai!', 'Hey, read it daily. It makes you smarter!'],
      ['रोज़ पढ़ता है या कभी-कभी? बता।', 'Roz padhta hai ya kabhi-kabhi? Bata.', 'Daily or sometimes? Tell me.']),
  ],
  outro: ['हमारे ज़माने में रेडियो पर ख़बर सुनते थे।', 'Hamare zamane mein radio par khabar sunte the.', 'In our time we heard the news on the radio.'],
  learned: [['kabhi kabhi padhta hoon', 'I read sometimes']],
  again: ['अच्छा, आज की हेडलाइन सुनेगा?', 'Achha, aaj ki headline sunega?', 'Okay, will you hear today\'s headline?'],
});

export const chowkRangoliGirl = D('chowk-rangoli-girl', {
  name: 'Anu', role: 'rangoli girl', site: 'Beside the rangoli, the chowk', diff: 1,
  voice: { rate: 1.1, pitch: 1.55 },
  persona: 'Tiny perfectionist who guards her rangoli from every passing foot. Talks very fast when excited.',
  goal: 'Pick a colour for her rangoli and say it looks beautiful.',
  steps: [
    S('colour', ['छोटू, इस फूल में कौन सा रंग भरूँ?', 'Chotu, is phool mein kaun sa rang bharun?', 'Chotu, which colour shall I fill in this flower?'],
      'Choose red for the flower.', ['Laal rang bharo.', 'लाल रंग भरो।'],
      ['laal rang bharo', 'laal bharo', 'laal rang', 'laal color bharo', 'लाल रंग भरो', 'लाल भरो', 'fill it red', 'red rang bharo'],
      'choose_red_colour', ['Pick a colour for the flower.', '"laal" = red; "rang" = colour.', 'Say: "Laal rang bharo."'],
      ['वाह, लाल तो बहुत जँचेगा!', 'Wah, laal toh bahut jachega!', 'Wow, red will look great!'],
      ['कौन सा रंग? लाल, पीला या नीला?', 'Kaun sa rang? Laal, peela ya neela?', 'Which colour? Red, yellow or blue?']),
    S('sundar', ['देख, पूरी बन गई! कैसी लगी?', 'Dekh, poori ban gayi! Kaisi lagi?', 'Look, it is finished! How does it look?'],
      'Say it is very beautiful.', ['Bahut sundar bani hai.', 'बहुत सुंदर बनी है।'],
      ['bahut sundar bani hai', 'bahut sundar hai', 'bahut achhi bani hai', 'kitni sundar hai', 'बहुत सुंदर बनी है', 'बहुत सुंदर है', 'it is very beautiful', 'wah bahut sundar'],
      'praise_rangoli', ['Tell her what you think of it.', '"sundar" = beautiful.', 'Say: "Bahut sundar bani hai."'],
      ['हीही! सबको दिखाना, पर पैर मत रखना!', 'Hihi! Sabko dikhana, par pair mat rakhna!', 'Hehe! Show everyone, but do not step on it!'],
      ['कैसी लगी? अच्छी या बुरी?', 'Kaisi lagi? Achhi ya buri?', 'How does it look? Good or bad?']),
  ],
  outro: ['कल मैं और बड़ी रंगोली बनाऊँगी!', 'Kal main aur badi rangoli banaungi!', 'Tomorrow I will make an even bigger rangoli!'],
  learned: [['laal rang bharo', 'fill it with red'], ['bahut sundar bani hai', 'it has come out very beautiful']],
  again: ['अरे, देखना, पैर बचाकर!', 'Arre, dekhna, pair bachakar!', 'Hey, watch it, mind your feet!'],
});

export const chowkGanpatiDevotee = D('chowk-ganpati-devotee', {
  name: 'Sulochana Tai', role: 'devotee at the Ganpati poster', site: 'Ganpati poster, the chowk', diff: 2,
  voice: { rate: 0.95, pitch: 1.05 },
  persona: 'Devout neighbour who starts her day with a prayer to Ganpati and wants everyone to chant with her.',
  goal: 'Join her chant of Ganpati Bappa Morya.',
  steps: [
    S('chant', ['आ बेटा, हाथ जोड़। मेरे साथ बोल, गणपति बप्पा...', 'Aa beta, haath jod. Mere saath bol, Ganpati Bappa...', 'Come child, join your hands. Say with me, Ganpati Bappa...'],
      'Finish the chant: Ganpati Bappa Morya.', ['Ganpati Bappa Morya!', 'गणपति बप्पा मोरया!'],
      ['ganpati bappa morya', 'bappa morya', 'morya', 'ganpati bappa morya morya', 'गणपति बप्पा मोरया', 'मोरया', 'ganpati bappa morya!', 'morya re'],
      'chant_ganpati_bappa_morya', ['Complete her chant.', 'The answer to "Ganpati Bappa" is "Morya".', 'Say: "Ganpati Bappa Morya!"'],
      ['शाबाश! बप्पा बहुत ख़ुश हुए।', 'Shabash! Bappa bahut khush hue.', 'Well done! Bappa is very happy.'],
      ['बप्पा... आगे क्या? ज़ोर से बोल!', 'Bappa... aage kya? Zor se bol!', 'Bappa... what comes next? Say it loudly!']),
  ],
  outro: ['ले, ये लड्डू का प्रसाद ले जा।', 'Le, ye laddoo ka prasaad le ja.', 'Here, take this laddoo as prasad.'],
  learned: [['Ganpati Bappa Morya', 'the festival chant to Lord Ganesha']],
  again: ['फिर से बोल, एक बार और, गणपति बप्पा...', 'Phir se bol, ek baar aur, Ganpati Bappa...', 'Say it again, once more, Ganpati Bappa...'],
});

export const chowkTagKid1 = D('chowk-tag-kid-1', {
  name: 'Golu', role: 'kid playing tag', site: 'Open ground east of the tapri, the chowk', diff: 2,
  voice: { rate: 1.25, pitch: 1.35 },
  persona: 'Panting, sweaty boy who is nearly caught in tag and talks in short gasps.',
  goal: 'Tell him to hide behind you.',
  steps: [
    S('hide', ['छोटू! वो मुझे पकड़ लेगी! कहाँ छुपूँ?', 'Chotu! Wo mujhe pakad legi! Kahan chhupun?', 'Chotu! She will catch me! Where do I hide?'],
      'Tell him to hide behind you.', ['Mere peeche chhup ja.', 'मेरे पीछे छुप जा।'],
      ['mere peeche chhup ja', 'mere peeche chhup jao', 'peeche chhup ja', 'mere peeche aa ja', 'मेरे पीछे छुप जा', 'पीछे छुप जा', 'hide behind me', 'chhup ja mere peeche'],
      'tell_hide_behind_me', ['Tell him where to hide.', '"peeche" = behind; "chhup" = hide.', 'Say: "Mere peeche chhup ja."'],
      ['शश्श! वो इधर ही आ रही है!', 'Shhh! Wo idhar hi aa rahi hai!', 'Shhh! She is coming this way!'],
      ['जल्दी बोल, कहाँ छुपूँ?', 'Jaldi bol, kahan chhupun?', 'Say quickly, where do I hide?']),
  ],
  outro: ['हाँफ़-हाँफ़... तू तो बड़ा काम का दोस्त है!', 'Haanf-haanf... tu toh bada kaam ka dost hai!', 'Pant-pant... you are a very useful friend!'],
  learned: [['mere peeche chhup ja', 'hide behind me']],
  again: ['वो गई क्या? मैं फिर छुप जाऊँ?', 'Wo gayi kya? Main phir chhup jaun?', 'Has she gone? Shall I hide again?'],
});

export const chowkTagKid2 = D('chowk-tag-kid-2', {
  name: 'Mini', role: 'kid playing tag', site: 'Open ground east of the tapri, the chowk', diff: 1,
  voice: { rate: 1.2, pitch: 1.6 },
  persona: 'Fast little runner who is always the chaser and loves a new player.',
  goal: 'Join her game of tag.',
  steps: [
    S('join', ['छोटू, पकड़म-पकड़ाई खेलेगा? मैं चोर हूँ!', 'Chotu, pakdam-pakdai khelega? Main chor hoon!', 'Chotu, will you play tag? I am the chaser!'],
      'Say yes, you will play tag.', ['Haan, chalo pakdam-pakdai khelte hain.', 'हाँ, चलो पकड़म-पकड़ाई खेलते हैं।'],
      ['haan chalo pakdam pakdai khelte hain', 'haan main khelunga', 'chalo khelte hain', 'haan khelta hoon', 'हाँ चलो पकड़म-पकड़ाई खेलते हैं', 'हाँ मैं खेलूँगा', 'yes lets play tag', 'ok main khelta hoon'],
      'agree_to_play_tag', ['Say yes to her game.', '"khelte hain" = let us play.', 'Say: "Haan, chalo pakdam-pakdai khelte hain."'],
      ['यय! भाग छोटू, मैं आ रही हूँ!', 'Yay! Bhaag Chotu, main aa rahi hoon!', 'Yay! Run Chotu, I am coming!'],
      ['खेलेगा कि नहीं? हाँ बोल!', 'Khelega ki nahi? Haan bol!', 'Will you play or not? Say yes!']),
  ],
  outro: ['तू बहुत तेज़ भागता है, मज़ा आया!', 'Tu bahut tez bhaagta hai, maza aaya!', 'You run very fast, that was fun!'],
  learned: [['chalo khelte hain', 'let us play']],
  again: ['चल, एक और बार! इस बार तू चोर!', 'Chal, ek aur baar! Is baar tu chor!', 'Come, one more round! This time you are the chaser!'],
});

export const chawlGrandma = D('chawl-grandma-doorstep', {
  name: 'Shanta Aaji', role: 'chawl grandmother', site: 'Doorstep of the third chawl', diff: 3,
  voice: { rate: 0.9, pitch: 1.0 },
  persona: 'Sweet old grandmother who sits on her step all day, knows everyone, and complains about her knees.',
  goal: 'Tell her to rest her aching knees, then fetch her a glass of water.',
  steps: [
    S('knees', ['बेटा, आज घुटने बहुत दुख रहे हैं।', 'Beta, aaj ghutne bahut dukh rahe hain.', 'Child, my knees are hurting a lot today.'],
      'Tell her to rest.', ['Aap aaraam kijiye, aaji.', 'आप आराम कीजिए, आजी।'],
      ['aap aaraam kijiye aaji', 'aaji aaraam kijiye', 'aap aaraam karo', 'aaraam kar lijiye', 'आप आराम कीजिए आजी', 'आजी आराम कीजिए', 'please rest grandma', 'aaji aap baith jaiye aur aaraam kijiye'],
      'tell_grandma_to_rest', ['Show concern and tell her to rest.', '"aaraam" = rest; "kijiye" is the polite "do".', 'Say: "Aap aaraam kijiye, aaji."'],
      ['जीता रह बेटा, तू बड़ा समझदार है।', 'Jeeta rah beta, tu bada samajhdar hai.', 'Bless you, child, you are very sensible.'],
      ['क्या बोला? आराम करूँ क्या?', 'Kya bola? Aaraam karun kya?', 'What did you say? Should I rest?']),
    S('paani', ['एक गिलास पानी ला दे ना, बेटा।', 'Ek gilaas paani la de na, beta.', 'Bring me a glass of water, child.'],
      'Say you will bring the water right now.', ['Haan aaji, abhi laata hoon.', 'हाँ आजी, अभी लाता हूँ।'],
      ['haan aaji abhi laata hoon', 'abhi laata hoon aaji', 'main paani laata hoon', 'abhi lekar aata hoon', 'हाँ आजी अभी लाता हूँ', 'अभी लाता हूँ', 'yes grandma bringing it now', 'ji aaji abhi laya'],
      'promise_bring_water', ['Say you will fetch it.', '"abhi" = right now; "laata hoon" = I bring.', 'Say: "Haan aaji, abhi laata hoon."'],
      ['ये ले बेटा, एक पेड़ा खा ले।', 'Ye le beta, ek peda kha le.', 'Here child, have a peda.'],
      ['पानी लाएगा न? हाँ बोल।', 'Paani layega na? Haan bol.', 'You will bring water, won\'t you? Say yes.']),
  ],
  outro: ['भगवान तुझे सुखी रखे, मेरे लाल।', 'Bhagwan tujhe sukhi rakhe, mere lal.', 'May God keep you happy, my dear.'],
  learned: [['aap aaraam kijiye', 'please rest'], ['abhi laata hoon', 'I will bring it right now']],
  again: ['आ बेटा, बैठ मेरे पास, कहानी सुनेगा?', 'Aa beta, baith mere paas, kahani sunega?', 'Come child, sit by me, will you hear a story?'],
});

export const chawlLaneSweeper = D('chawl-lane-sweeper', {
  name: 'Bimla Tai', role: 'lane sweeper', site: 'Chawl lanes under the laundry line', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Tireless early-morning sweeper who is proud of her spotless lane and has no patience for footprints.',
  goal: 'Step aside so she can sweep.',
  steps: [
    S('side', ['ज़रा साइड हो जा, झाड़ू लगानी है।', 'Zara side ho ja, jhaadu lagani hai.', 'Step aside a little, I have to sweep.'],
      'Say you are stepping aside.', ['Ji tai, main side ho jaata hoon.', 'जी ताई, मैं साइड हो जाता हूँ।'],
      ['ji tai main side ho jaata hoon', 'main side ho jaata hoon', 'ji side ho gaya', 'theek hai tai hat jaata hoon', 'जी ताई मैं साइड हो जाता हूँ', 'मैं हट जाता हूँ', 'okay i will move aside', 'ji tai hat gaya'],
      'step_aside_for_sweeper', ['Tell her you will move.', '"side ho jaata hoon" = I step aside.', 'Say: "Ji tai, main side ho jaata hoon."'],
      ['शाबाश, अब गली चमक जाएगी।', 'Shabash, ab gali chamak jayegi.', 'Good, now the lane will shine.'],
      ['हट ना बेटा! रास्ता दे!', 'Hat na beta! Rasta de!', 'Move child! Give way!']),
  ],
  outro: ['ऐसे ही गली साफ़ रखना, ठीक है?', 'Aise hi gali saaf rakhna, theek hai?', 'Keep the lane clean like this, okay?'],
  learned: [['main side ho jaata hoon', 'I will step aside']],
  again: ['अरे फिर बीच में आ गया! हट!', 'Arre phir beech mein aa gaya! Hat!', 'Oh, you are in the middle again! Move!'],
});

export const templeFlowerSeller = D('temple-flower-seller', {
  name: 'Lakshmi Amma', role: 'flower and coconut seller', site: 'Offering stall, the temple', diff: 3,
  voice: { rate: 1.05, pitch: 1.0 },
  persona: 'South-Indian-born seller who has run the temple stall for thirty years and mixes Hindi with a little Tamil.',
  goal: 'Buy a coconut and flowers for the temple and have the coconut cracked.',
  steps: [
    S('buy', ['फूल, नारियल! दर्शन के लिए क्या दूँ?', 'Phool, naariyal! Darshan ke liye kya doon?', 'Flowers, coconut! What shall I give for darshan?'],
      'Ask for one coconut and some flowers.', ['Ek naariyal aur phool dena.', 'एक नारियल और फूल देना।'],
      ['ek naariyal aur phool dena', 'naariyal aur phool chahiye', 'ek naariyal aur thode phool', 'naariyal aur phool dijiye', 'एक नारियल और फूल देना', 'नारियल और फूल दीजिए', 'one coconut and flowers', 'phool aur naariyal dena'],
      'buy_coconut_and_flowers', ['Say what offering you want.', '"naariyal" = coconut; "phool" = flowers.', 'Say: "Ek naariyal aur phool dena."'],
      ['ये लो, पूजा की थाली तैयार है।', 'Ye lo, pooja ki thaali taiyaar hai.', 'Here, the prayer plate is ready.'],
      ['क्या चाहिए, नारियल या फूल?', 'Kya chahiye, naariyal ya phool?', 'What do you want, coconut or flowers?']),
    S('phodna', ['नारियल फोड़ दूँ क्या?', 'Naariyal phod doon kya?', 'Shall I crack the coconut?'],
      'Say yes, please crack it.', ['Haan, phod dijiye.', 'हाँ, फोड़ दीजिए।'],
      ['haan phod dijiye', 'haan phod do', 'phod dijiye please', 'ji phod dena', 'हाँ फोड़ दीजिए', 'फोड़ दीजिए', 'yes please crack it', 'haan tod dijiye'],
      'ask_to_crack_coconut', ['Say yes.', '"phod dijiye" = please crack it.', 'Say: "Haan, phod dijiye."'],
      ['ठक! देख, एक बार में फूट गया!', 'Thak! Dekh, ek baar mein phoot gaya!', 'Crack! See, it broke in one hit!'],
      ['फोड़ूँ या ऐसे ही दूँ?', 'Phodun ya aise hi doon?', 'Shall I crack it or give it as it is?']),
  ],
  outro: ['भगवान तुम्हारा भला करे, बेटा।', 'Bhagwan tumhara bhala kare, beta.', 'May God do good to you, child.'],
  learned: [['ek naariyal aur phool dena', 'give me a coconut and flowers'], ['haan, phod dijiye', 'yes, please crack it']],
  again: ['आज फिर दर्शन करने आया? बहुत अच्छा।', 'Aaj phir darshan karne aaya? Bahut achha.', 'Back for darshan today? Very good.'],
});

export const templeShoeKeeper = D('temple-shoe-keeper', {
  name: 'Tukaram Baba', role: 'shoe keeper', site: 'Chappal stand, the temple', diff: 3,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Wise old keeper of hundreds of chappals who has never once lost a pair.',
  goal: 'Leave your chappals with him and take the token.',
  steps: [
    S('token', ['चप्पल यहाँ रख दे, बेटा। टोकन ले जा।', 'Chappal yahan rakh de, beta. Token le ja.', 'Leave your chappals here, child. Take the token.'],
      'Say you are leaving your chappals and ask for the token.', ['Meri chappal rakh raha hoon, token dijiye.', 'मेरी चप्पल रख रहा हूँ, टोकन दीजिए।'],
      ['meri chappal rakh raha hoon token dijiye', 'chappal rakh raha hoon token dena', 'ye meri chappal hai token dijiye', 'token dijiye chappal rakh di', 'मेरी चप्पल रख रहा हूँ टोकन दीजिए', 'टोकन दीजिए', 'leaving my slippers give token', 'meri chappal yahan rakhta hoon token dena'],
      'leave_chappals_get_token', ['Say you are leaving them and need the token.', '"chappal" = slippers; "token dijiye" = please give a token.', 'Say: "Meri chappal rakh raha hoon, token dijiye."'],
      ['ले, नंबर बारह। संभालकर रखना।', 'Le, number baarah. Sambhalkar rakhna.', 'Here, number twelve. Keep it safe.'],
      ['चप्पल रखनी है तो टोकन माँग।', 'Chappal rakhni hai toh token maang.', 'If you are leaving chappals, ask for the token.']),
  ],
  outro: ['दर्शन करके आ, तेरी चप्पल यहीं मिलेगी।', 'Darshan karke aa, teri chappal yahin milegi.', 'Go for darshan, you will find your chappals right here.'],
  learned: [['token dijiye', 'please give me a token']],
  again: ['टोकन खो तो नहीं दिया ना?', 'Token kho toh nahi diya na?', 'You have not lost the token, have you?'],
});

export const stationBenchElder = D('station-bench-elder', {
  name: 'Apte Kaka', role: 'elderly passenger', site: 'Platform bench, the station', diff: 3,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Gentle retired schoolteacher who takes the slow local every Saturday and worries about missing his stop.',
  goal: 'Promise to tell him when Dadar comes.',
  steps: [
    S('dadar', ['बेटा, मुझे दादर उतरना है। बता देगा?', 'Beta, mujhe Dadar utarna hai. Bata dega?', 'Child, I have to get off at Dadar. Will you tell me?'],
      'Promise to tell him when Dadar comes.', ['Theek hai kaka, Dadar aane par bata dunga.', 'ठीक है काका, दादर आने पर बता दूँगा।'],
      ['theek hai kaka dadar aane par bata dunga', 'dadar aane par bata dunga', 'haan kaka bata dunga', 'main bata dunga kaka', 'ठीक है काका दादर आने पर बता दूँगा', 'दादर आने पर बता दूँगा', 'ok uncle i will tell you at dadar', 'bata dunga kaka chinta mat kijiye'],
      'promise_tell_dadar', ['Promise to help him.', '"bata dunga" = I will tell you.', 'Say: "Theek hai kaka, Dadar aane par bata dunga."'],
      ['भला हो तेरा, बेटा। मेरी आँखें कमज़ोर हैं।', 'Bhala ho tera, beta. Meri aankhein kamzor hain.', 'God bless you, child. My eyes are weak.'],
      ['दादर पर बताएगा न? हाँ बोल।', 'Dadar par batayega na? Haan bol.', 'You will tell me at Dadar, won\'t you? Say yes.']),
  ],
  outro: ['बैठ जा, गाड़ी आती ही होगी।', 'Baith ja, gaadi aati hi hogi.', 'Sit down, the train must be coming soon.'],
  learned: [['dadar aane par bata dunga', 'I will tell you when Dadar comes']],
  again: ['अरे, याद है ना, दादर पर उतारना है मुझे?', 'Arre, yaad hai na, Dadar par utarna hai mujhe?', 'Remember, I have to get off at Dadar?'],
});

export const stationCommuter2 = D('station-commuter-2', {
  name: 'Suresh Sir', role: 'office-goer', site: 'Platform near the fast/slow board', diff: 3,
  voice: { rate: 1.15, pitch: 0.95 },
  persona: 'Always-late accountant who stares at his wristwatch and says "ufff" every thirty seconds.',
  goal: 'Reassure him that the 9:12 has not left yet.',
  steps: [
    S('late', ['भाई, नौ बारह की गाड़ी निकल गई क्या?', 'Bhai, nau baarah ki gaadi nikal gayi kya?', 'Brother, has the nine-twelve train left?'],
      'Say it has not left yet; it is coming.', ['Nahi sahab, abhi nahi gayi, aa rahi hai.', 'नहीं साहब, अभी नहीं गई, आ रही है।'],
      ['nahi sahab abhi nahi gayi aa rahi hai', 'abhi nahi gayi sahab', 'gaadi abhi aa rahi hai', 'nahi gayi abhi aayegi', 'नहीं साहब अभी नहीं गई आ रही है', 'अभी नहीं गई', 'no sir it has not left yet', 'nahi nikli abhi aa rahi hai'],
      'say_train_not_left', ['Tell him the train has not gone.', '"abhi nahi gayi" = it has not gone yet.', 'Say: "Nahi sahab, abhi nahi gayi, aa rahi hai."'],
      ['ओह, शुक्र है! मेरी तो जान में जान आई।', 'Oh, shukr hai! Meri toh jaan mein jaan aayi.', 'Oh thank God! I can breathe again.'],
      ['गई या नहीं? जल्दी बता यार!', 'Gayi ya nahi? Jaldi bata yaar!', 'Has it gone or not? Tell me quickly!']),
  ],
  outro: ['मीटिंग है आज, लेट हुआ तो साहब नाराज़।', 'Meeting hai aaj, late hua toh saahab naaraz.', 'I have a meeting today; if I am late the boss is angry.'],
  learned: [['abhi nahi gayi, aa rahi hai', 'it has not gone yet, it is coming']],
  again: ['अब कितने बजे हैं? घड़ी रुकी तो नहीं?', 'Ab kitne baje hain? Ghadi ruki toh nahi?', 'What time is it now? My watch has not stopped, has it?'],
});

export const stationTicketClerk = D('station-ticket-clerk', {
  name: 'Gaikwad Babu', role: 'ticket clerk', site: 'Ticket window, the station', diff: 3,
  voice: { rate: 1.15, pitch: 0.9 },
  persona: 'Brisk clerk behind glass who hands out tickets at lightning speed and hates dawdlers in the queue.',
  goal: 'Buy a return ticket to Dadar.',
  steps: [
    S('dest', ['अगला! कहाँ का टिकट चाहिए?', 'Agla! Kahan ka ticket chahiye?', 'Next! Ticket to where?'],
      'Ask for a ticket to Dadar.', ['Dadar ka ticket dena.', 'दादर का टिकट देना।'],
      ['dadar ka ticket dena', 'ek ticket dadar ka', 'dadar ka ticket chahiye', 'dadar ka dijiye', 'दादर का टिकट देना', 'एक टिकट दादर का', 'one ticket to dadar', 'dadar ka ticket dijiye'],
      'ask_ticket_dadar', ['Say where you want to go.', '"ka ticket" = ticket to.', 'Say: "Dadar ka ticket dena."'],
      ['दादर, ठीक है। जल्दी बोल, पीछे लाइन है।', 'Dadar, theek hai. Jaldi bol, peeche line hai.', 'Dadar, okay. Be quick, there is a queue behind you.'],
      ['कहाँ का? नाम बोल स्टेशन का!', 'Kahan ka? Naam bol station ka!', 'To where? Say the name of the station!']),
    S('return', ['सिंगल या रिटर्न?', 'Single ya return?', 'Single or return?'],
      'Say you want a return ticket.', ['Return ticket dena.', 'रिटर्न टिकट देना।'],
      ['return ticket dena', 'return dijiye', 'return chahiye', 'aane jaane ka dena', 'रिटर्न टिकट देना', 'रिटर्न दीजिए', 'a return ticket please', 'return wala dena'],
      'ask_return_ticket', ['Choose single or return.', '"return" is the same word in Hindi.', 'Say: "Return ticket dena."'],
      ['ये ले, रिटर्न। खुले पैसे दे!', 'Ye le, return. Khule paise de!', 'Here, return. Give exact change!'],
      ['सिंगल या रिटर्न? एक बोल!', 'Single ya return? Ek bol!', 'Single or return? Say one!']),
  ],
  outro: ['अगला! हटो, पीछे वाले को आने दो।', 'Agla! Hato, peeche wale ko aane do.', 'Next! Move, let the one behind come.'],
  learned: [['Dadar ka ticket dena', 'give me a ticket to Dadar'], ['return ticket dena', 'give me a return ticket']],
  again: ['अरे, फिर से टिकट? पिछला कहाँ गया?', 'Arre, phir se ticket? Pichla kahan gaya?', 'Oh, a ticket again? Where did the last one go?'],
});

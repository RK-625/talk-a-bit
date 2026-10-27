// The chai-stall square (cricket gully, news stand, fruit and flower stalls, rangoli) and the Old Delhi haveli lanes.
import { P, step as S } from '../kit.js';

export const bowler = P('chowk-cricket-bowler', 'Mintu', 'gully cricket bowler', "chai-stall square, cricket gully", 'k', 'Praise his fast bowling and give him a tip.', [
  S('speed', ['भैया, देखा मेरी गेंद? कितनी तेज़ थी!', 'Bhaiya, dekha meri gend? Kitni tez thi!', 'Brother, did you see my ball? How fast it was!'],
    'Praise his fast bowling.', ['Wah, bahut tez gend thi!', 'वाह, बहुत तेज़ गेंद थी!'],
    ['kya gend phenki yaar', 'oye kamaal ki bowling', 'tu toh fast bowler hai', 'zabardast bowling mintu'],
    ['Praise his bowling.', 'Fast = "tez". Ball = "gend".'],
    ['हे हे! अब चिंटू को आउट करके दिखाऊँगा।', 'He he! Ab Chintu ko out karke dikhaunga.', 'He he! Now I will get Chintu out and show you.'],
    ['क्या बोले भैया? मैं रन-अप में था।', 'Kya bole bhaiya? Main run-up mein tha.', 'What did you say, brother? I was in my run-up.']),
  S('tip', ['पर लाइन-लेंथ बिगड़ जाती है। कोई टिप दो ना!', 'Par line-length bigad jaati hai. Koi tip do na!', 'But my line and length go wrong. Give me a tip!'],
    'Tell him to keep his eye on the stumps.', ['Bas stump par nazar rakho.', 'बस स्टंप पर नज़र रखो।'],
    ['nazar stump par rakh', 'seedha stump ko dekho', 'oye bas stump pe nazar rakh', 'dhyaan se stump dekho'],
    ['Give a simple tip.', 'Stump = "stump". Eyes on it = "nazar rakho".'],
    ['अच्छा! अब पक्का सीधी जाएगी, देखना।', 'Accha! Ab pakka seedhi jaayegi, dekhna.', 'Okay! Now it will go straight for sure, watch.'],
    ['टिप बोलो ना, सिर्फ़ हँसो मत।', 'Tip bolo na, sirf hanso mat.', 'Say the tip, do not just laugh.']),
], ['चलो, अगली बॉल पर विकेट पक्का!', 'Chalo, agli ball par wicket pakka!', 'Come on, a wicket on the next ball for sure!'],
  [['bahut tez gend thi', 'that was a very fast ball'], ['stump par nazar rakho', 'keep your eye on the stumps']], ['भैया, एक ओवर और डालूँ क्या?', 'Bhaiya, ek over aur daalun kya?', 'Brother, shall I bowl one more over?'], 1);

export const newsVendor = P('chowk-newspaper-vendor', 'Hari Prasad', 'newspaper vendor', 'chai-stall square, news stand', 'o', 'Ask for the Hindi paper and ask about the coaching gossip.', [
  S('paper', ['अख़बार ले लो, ताज़ा ख़बर! हिंदी या अंग्रेज़ी?', 'Akhbaar le lo, taaza khabar! Hindi ya angrezi?', 'Papers, fresh news! Hindi or English?'],
    'Ask for today\'s Hindi newspaper.', ['Bhaiya, aaj ka Hindi akhbaar dena.', 'भैया, आज का हिंदी अख़बार देना।'],
    ['ek hindi akhbaar dena', 'aaj ka hindi paper chahiye', 'paaji hindi akhbaar de do', 'hindi wala akhbaar dijiye'],
    ['Ask for the paper in Hindi.', 'Newspaper = "akhbaar". Today\'s = "aaj ka".'],
    ['ये लो, पहले पन्ने पर परीक्षा की ख़बर है। ग़ौर से पढ़ना!', 'Ye lo, pehle panne par pariksha ki khabar hai. Gaur se padhna!', 'Here, the front page has exam news. Read it carefully!'],
    ['कौन-सा अख़बार, भाई? ज़ोर से बोलो।', 'Kaun-sa akhbaar, bhai? Zor se bolo.', 'Which paper, brother? Speak up.']),
  S('gossip', ['सुना है इस बार नई बैच आई है कोचिंग में।', 'Suna hai is baar nayi batch aayi hai coaching mein.', 'I hear a new batch has come to the coaching centre this time.'],
    'Ask which coaching centre has the best teachers.', ['Kaun si coaching mein sabse achhe teacher hain?', 'कौन सी कोचिंग में सबसे अच्छे टीचर हैं?'],
    ['kaunsi coaching sabse achhi hai', 'bhaiya best coaching kaun si hai', 'paaji coaching ka kuch pata hai', 'kaun sa institute sahi hai'],
    ['Ask about the best coaching.', 'Which coaching = "kaun si coaching". Teachers = "teacher".'],
    ['सबके अपने दावे हैं बेटा। असली गुरु तो मेहनत है!', 'Sabke apne daave hain beta. Asli guru toh mehnat hai!', 'Everyone has claims, beta. The real teacher is hard work!'],
    ['कोचिंग का पूछ रहे हो? धीरे बोलो।', 'Coaching ka puchh rahe ho? Dheere bolo.', 'Asking about coaching? Speak slowly.']),
], ['अख़बार पढ़ते रहो, सामान्य ज्ञान बढ़ेगा।', 'Akhbaar padhte raho, saamaanya gyaan badhega.', 'Keep reading the paper, your general knowledge will grow.'],
  [['aaj ka Hindi akhbaar dena', 'give me today\'s Hindi paper'], ['kaun si coaching sabse achhi hai?', 'which coaching is best?']], ['आ गए, बेटा? आज की सुर्ख़ियाँ सुनाऊँ?', 'Aa gaye, beta? Aaj ki surkhiyaan sunaun?', 'You are here, beta? Shall I read today\'s headlines?'], 2);

export const skipGirl = P('chowk-skip-girl', 'Pinki', 'skipping girl', 'open ground by the chole kulche cart', 'k', 'Count her skips and cheer her on.', [
  S('count', ['भैया, गिनती करो! मैं बिना रुके कूदूँगी!', 'Bhaiya, ginti karo! Main bina ruke koodungi!', 'Brother, count for me! I will jump without stopping!'],
    'Count the skips out loud.', ['Ek, do, teen, chaar, paanch, chhe!', 'एक, दो, तीन, चार, पाँच, छह!'],
    ['ek do teen chaar', 'gino ek do teen chaar paanch', 'chal ek do teen chaar paanch', 'oye ek do teen chaar paanch chhe', 'ek do teen'],
    ['Count from one.', 'One two three = "ek, do, teen".'],
    ['सात, आठ, नौ... वाह! आज मेरा रिकॉर्ड बन गया!', 'Saat, aath, nau... Wah! Aaj mera record ban gaya!', 'Seven, eight, nine... Wow! I made a record today!'],
    ['गिनती करो ना भैया, एक से शुरू करो!', 'Ginti karo na bhaiya, ek se shuru karo!', 'Count, brother, start from one!'],
  ),
], ['थैंक्यू भैया! कल सौ तक कूदूँगी।', 'Thank you bhaiya! Kal sau tak koodungi.', 'Thank you, brother! Tomorrow I will jump up to a hundred.'],
  [['ek, do, teen, chaar, paanch', 'one, two, three, four, five']], ['फिर से गिनोगे भैया? रस्सी तैयार है!', 'Phir se ginoge bhaiya? Rassi taiyaar hai!', 'Will you count again, brother? The rope is ready!'], 1);

export const kiteBoy = P('chowk-kite-boy', 'Bunty', 'kite-flying boy', 'lane south of the chai stall', 'k', 'Warn him about the wires and wish his kite luck.', [
  S('wires', ['भैया, पतंग तारों में फँस न जाए! डर लग रहा है।', 'Bhaiya, patang taaron mein phans na jaaye! Dar lag raha hai.', 'Brother, I hope the kite does not get stuck in the wires! I am scared.'],
    'Tell him to keep the kite away from the wires.', ['Tension mat le, tareon se door rakhna.', 'टेंशन मत ले, तारों से दूर रखना।'],
    ['tareon se door rakho patang', 'oye wires se bacha ke udao', 'patang taaron se door rakho', 'dhyaan se udao tension nahi'],
    ['Reassure him and warn him.', 'Wires = "taar". Keep away = "door rakhna".'],
    ['सही बोला! ढील दूँगा, ऊँची जाएगी।', 'Sahi bola! Dheel dunga, oonchi jaayegi.', 'Well said! I will loosen the string, it will go high.'],
    ['तारों का सुना क्या? फिर से बोलो।', 'Taaron ka suna kya? Phir se bolo.', 'Did you hear about the wires? Say again.']),
], ['वो काटा! नहीं नहीं, मेरी पतंग सलामत है!', 'Wo kaata! Nahi nahi, meri patang salaamat hai!', 'Cut! No no, my kite is safe!'],
  [['tareon se door rakhna', 'keep it away from the wires']], ['भैया, ढील और दूँ क्या?', 'Bhaiya, dheel aur dun kya?', 'Brother, shall I give more string?'], 1);

export const carromMan = P('chawl-carrom-man', 'Lalit Uncle', 'carrom player', 'haveli balcony, carrom board', 'm', 'Ask about the game and wish him a good shot.', [
  S('game', ['अरे आ गया पढ़ाकू! कैरम खेलेगा क्या, बेटा?', 'Arre aa gaya padhaku! Carrom khelega kya, beta?', 'Oh the bookworm is here! Will you play carrom, beta?'],
    'Say you will watch the game for a minute.', ['Nahi uncle, bas thodi der dekhunga.', 'नहीं अंकल, बस थोड़ी देर देखूँगा।'],
    ['bas thodi der dekhunga uncle', 'nahi uncle abhi padhna hai', 'main bas dekhta hoon', 'thodi der khel dekh lunga'],
    ['Politely decline and say you will watch.', 'I will watch = "dekhunga". A little while = "thodi der".'],
    ['ठीक है, देख ले। पर पहले मेरी रानी जेब में जाएगी!', 'Theek hai, dekh le. Par pehle meri raani jeb mein jaayegi!', 'Fine, watch. But my queen will go in the pocket first!'],
    ['खेलेगा या नहीं? जल्दी बता, मेरी बारी है।', 'Khelega ya nahi? Jaldi bata, meri baari hai.', 'Will you play or not? Say quickly, it is my turn.']),
  S('shot', ['देख, ये शॉट लगाता हूँ। सीधा कोने में!', 'Dekh, ye shot lagata hoon. Seedha kone mein!', 'Watch, I take this shot. Straight into the corner!'],
    'Wish him luck for the shot.', ['Aapka nishana pakka lage, uncle!', 'आपका निशाना पक्का लगे, अंकल!'],
    ['aapka shot lag jaaye uncle', 'all the best uncle', 'oye chak de uncle', 'zabardast shot lagao'],
    ['Wish him luck.', 'Your aim = "aapka nishana". May it hit = "lage".'],
    ['अरे रे! अंगुली फिसल गई। ख़ैर, अगली बार पक्का!', 'Are re! Ungli phisal gayi. Khair, agli baar pakka!', 'Oh no! My finger slipped. Anyway, next time for sure!'],
    ['शुभकामना दे ना बेटा, नज़र मत लगा।', 'Shubhkamna de na beta, nazar mat laga.', 'Wish me luck, beta, do not give an evil eye.']),
], ['चल बेटा, पढ़ाई कर। शाम को हारने आ जाना!', 'Chal beta, padhai kar. Shaam ko haarne aa jaana!', 'Go beta, study. Come in the evening to lose!'],
  [['bas thodi der dekhunga', 'I will just watch for a bit'], ['aapka nishana pakka lage', 'may your aim be true']], ['बेटा, एक बाज़ी हो जाए?', 'Beta, ek baazi ho jaaye?', 'Beta, how about one game?'], 2);

export const carromElder = P('chawl-carrom-elder', 'Dadaji', 'elder carrom player', 'haveli balcony, carrom board', 'o', 'Ask what the neighbourhood was like before.', [
  S('before', ['हम्म, ये गली पहले बहुत शांत थी बेटा।', 'Hmm, ye gali pehle bahut shaant thi beta.', 'Hmm, this lane used to be very quiet, beta.'],
    'Ask how the old city was before.', ['Dadaji, pehle yahan kaisa tha?', 'दादाजी, पहले यहाँ कैसा था?'],
    ['dadaji pehle kaisa tha sab', 'purani dilli pehle kaisi thi', 'pehle ki baatein bataiye dadaji', 'dadaji ji pehle yahan kya tha'],
    ['Ask about the past.', 'Before = "pehle". How was it = "kaisa tha".'],
    ['तब ताँगे चलते थे, बेटा, और हर घर में ढोलक बजती थी।', 'Tab taange chalte the, beta, aur har ghar mein dholak bajti thi.', 'Back then tongas ran, beta, and every house had a dholak playing.'],
    ['क्या कहा? ज़रा पास आकर बोल।', 'Kya kaha? Zara paas aakar bol.', 'What did you say? Come closer and speak.']),
], ['अब जा, किताबें इंतज़ार कर रही हैं।', 'Ab ja, kitaabein intezaar kar rahi hain.', 'Now go, the books are waiting.'],
  [['pehle yahan kaisa tha?', 'how was it here before?']], ['आ गया बेटा? एक क़िस्सा और सुन!', 'Aa gaya beta? Ek qissa aur sun!', 'You are here, beta? Listen to one more tale!'], 1);

export const tapWoman = P('chawl-tap-woman', 'Kamla Devi', 'woman at the common tap', 'haveli lane, common tap', 'f', 'Ask about the water timing and sympathise about the bill.', [
  S('water', ['पानी का टाइम सुबह छह बजे का है, फिर भी लाइन लंबी!', 'Paani ka time subah chhe baje ka hai, phir bhi line lambi!', 'Water time is six in the morning, still the line is long!'],
    'Ask what time the water comes.', ['Aunty, paani kitne baje aata hai?', 'आंटी, पानी कितने बजे आता है?'],
    ['paani kab aata hai aunty', 'aunty ji paani ka time kya hai', 'paani kitne baje aayega', 'paani subah kitne baje aata hai'],
    ['Ask the water timing.', 'What time = "kitne baje". Water comes = "paani aata hai".'],
    ['सुबह छह बजे और शाम को पाँच बजे, बस आधा घंटा।', 'Subah chhe baje aur shaam ko paanch baje, bas aadha ghanta.', 'At six in the morning and five in the evening, only half an hour.'],
    ['पानी का टाइम पूछा क्या? फिर बोलो बेटा।', 'Paani ka time puchha kya? Phir bolo beta.', 'Did you ask the water timing? Say again, beta.']),
  S('bill', ['और ऊपर से बिजली का बिल भी आसमान छू रहा है!', 'Aur upar se bijli ka bill bhi aasmaan chhu raha hai!', 'And on top of it the electricity bill is touching the sky!'],
    'Sympathise: say it is true, everything is expensive.', ['Sahi kehti hain aunty, sab mehnga ho gaya.', 'सही कहती हैं आंटी, सब महँगा हो गया।'],
    ['sach kehti hain aunty mehngai bahut hai', 'sahi baat hai aunty sab mehnga hai', 'haan aunty bill bahut aa raha hai', 'bijli ka bill toh sach mein zyada hai'],
    ['Agree with her.', 'You are right = "sahi kehti hain". Expensive = "mehnga".'],
    ['तू समझदार बच्चा है! चाय पी के जाना हमारे घर।', 'Tu samajhdaar bachcha hai! Chai pi ke jaana hamare ghar.', 'You are a sensible child! Come have chai at our house.'],
    ['मेरी बात पर कुछ तो बोलो बेटा।', 'Meri baat par kuch toh bolo beta.', 'Say something about what I said, beta.']),
], ['चलो, मेरी बारी आ गई। पानी भरना है!', 'Chalo, meri baari aa gayi. Paani bharna hai!', 'Come, my turn has come. I have to fill water!'],
  [['paani kitne baje aata hai?', 'what time does the water come?'], ['sahi kehti hain aunty', 'you are right, aunty']], ['अरे बेटा! आज पानी जल्दी आ गया।', 'Arre beta! Aaj paani jaldi aa gaya.', 'Oh beta! The water came early today.'], 2);

export const vadaCustomer = P('chowk-vada-customer', 'Aryan', 'school boy waiting for chole kulche', 'chole kulche cart, customer side', 'k', 'Ask if the chole kulche is worth waiting for.', [
  S('wait', ['भैया, ये बहुत देर लगा रहा है! पर पॉकेट मनी इसी की है।', 'Bhaiya, ye bahut der laga raha hai! Par pocket money isi ki hai.', 'Brother, he is taking so long! But my pocket money is for this.'],
    'Tell him it is worth waiting for.', ['Intezaar ka phal meetha hota hai!', 'इंतज़ार का फल मीठा होता है!'],
    ['wait karo mazedaar hoga', 'thoda ruko sab theek hoga', 'sabr ka phal meetha hota hai', 'oye ruk ja chole bahut tasty hain'],
    ['Say patience pays.', 'Waiting = "intezaar". Sweet fruit = "phal meetha".'],
    ['सही! आप भी तो पढ़ाई के बाद ही अफ़सर बनोगे ना?', 'Sahi! Aap bhi toh padhai ke baad hi afsar banoge na?', 'True! You too will become an officer only after studying, right?'],
    ['क्या बोले? मेरा ध्यान तो प्लेट पर है।', 'Kya bole? Mera dhyaan toh plate par hai.', 'What did you say? My focus is on the plate.']),
], ['मेरी प्लेट आ गई! थैंक्यू भैया।', 'Meri plate aa gayi! Thank you bhaiya.', 'My plate has come! Thank you, brother.'],
  [['intezaar ka phal meetha hota hai', 'patience has a sweet reward']], ['भैया, आज भी वही लाइन है!', 'Bhaiya, aaj bhi wahi line hai!', 'Brother, the same line again today!'], 1);

export const fruitSeller = P('chowk-fruit-seller', 'Pushpa', 'fruit seller', 'chai-stall square, fruit cart', 'f', 'Ask for pomegranate and ask for a little extra.', [
  S('fruit', ['सेब, केले, अनार, ताज़ा! बोलो भैया, क्या दूँ?', 'Seb, kele, anaar, taaza! Bolo bhaiya, kya dun?', 'Apples, bananas, pomegranates, fresh! Tell me, brother, what shall I give?'],
    'Ask for half a kilo of pomegranate.', ['Didi, aadha kilo anaar dena.', 'दीदी, आधा किलो अनार देना।'],
    ['aadha kilo anaar de do', 'ek aadha kilo anaar chahiye', 'didi ji aadha kilo anaar tol do', 'paaji aadha kilo anaar dena'],
    ['Name the fruit and the weight.', 'Half a kilo = "aadha kilo". Pomegranate = "anaar".'],
    ['लो, दाने लाल हैं। दिमाग़ तेज़ करेगा ये!', 'Lo, daane laal hain. Dimaag tez karega ye!', 'Here, the seeds are red. This will sharpen your brain!'],
    ['कौन-सा फल बोला? गाड़ी का शोर है, फिर बोलो।', 'Kaun-sa phal bola? Gaadi ka shor hai, phir bolo.', 'Which fruit did you say? Traffic noise, say again.']),
  S('extra', ['आधा किलो हो गया। और कुछ?', 'Aadha kilo ho gaya. Aur kuch?', 'Half a kilo done. Anything else?'],
    'Ask her to add a few extra pieces.', ['Thode aur daal do didi, extra.', 'थोड़े और डाल दो दीदी, एक्स्ट्रा।'],
    ['thoda aur daal do didi', 'thoda sa extra de do na', 'ek do daane aur pa do', 'extra daal do bhaiya ke liye'],
    ['Ask for a little more.', 'A bit more = "thoda aur". Put in = "daal do".'],
    ['चल, पढ़ने वाले के लिए दो अनार और। ख़ुश रह!', 'Chal, padhne wale ke liye do anaar aur. Khush reh!', 'Fine, two more pomegranates for the student. Stay happy!'],
    ['और क्या चाहिए, साफ़ साफ़ बोलो भैया।', 'Aur kya chahiye, saaf saaf bolo bhaiya.', 'What else do you want, say it plainly, brother.']),
], ['फिर आना भैया, फल हमेशा ताज़ा मिलेगा।', 'Phir aana bhaiya, phal hamesha taaza milega.', 'Come again, brother, you will always get fresh fruit.'],
  [['aadha kilo anaar dena', 'give me half a kilo of pomegranate'], ['thode aur daal do', 'add a few more']], ['आओ आओ! आज अंगूर भी हैं!', 'Aao aao! Aaj angoor bhi hain!', 'Come, come! There are grapes today too!'], 2);

export const flowerSeller = P('chowk-marigold-seller', 'Radha Devi', 'marigold garland seller', 'chai-stall square, flower stall', 'f', 'Buy a marigold garland for the gurudwara.', [
  S('garland', ['गेंदे की माला ले लो! गुरुद्वारे के लिए, दिवाली के लिए!', 'Gende ki maala le lo! Gurudware ke liye, Diwali ke liye!', 'Marigold garlands! For the gurudwara, for Diwali!'],
    'Ask for one marigold garland.', ['Ek gende ki maala dena.', 'एक गेंदे की माला देना।'],
    ['ek maala dena didi', 'ek gende ki maala chahiye', 'paaji ek maala pa do', 'ek maala de do mataji'],
    ['Ask for one garland.', 'Marigold = "gendaa". Garland = "maala".'],
    ['ये लो, ताज़ी है। भगवान आपके पेपर में मदद करें।', 'Ye lo, taaza hai. Bhagwan aapke paper mein madad karein.', 'Here, it is fresh. May God help you in your paper.'],
    ['माला चाहिए तो साफ़ बोलो बेटा।', 'Maala chahiye toh saaf bolo beta.', 'If you want a garland, say it clearly, beta.']),
], ['जाओ बेटा, सब अच्छा होगा।', 'Jao beta, sab accha hoga.', 'Go, beta, all will be well.'],
  [['ek gende ki maala dena', 'give me one marigold garland']], ['आ गए? आज की माला सबसे ताज़ी है।', 'Aa gaye? Aaj ki maala sabse taaza hai.', 'You are here? Today\'s garlands are the freshest.'], 1);

export const newsReader = P('chowk-news-reader', 'Tiwari Ji', 'elderly newspaper reader', 'news stand, customer side', 'o', 'Agree with his opinion on the headlines and ask about the exam news.', [
  S('news', ['आजकल की राजनीति देखी? हर रोज़ वही हंगामा!', 'Aajkal ki rajneeti dekhi? Har roz wahi hungama!', 'Seen today\'s politics? The same fuss every day!'],
    'Say you agree, only exams matter to you right now.', ['Haan ji, mujhe toh abhi sirf padhai dikhti hai.', 'हाँ जी, मुझे तो अभी सिर्फ़ पढ़ाई दिखती है।'],
    ['sach kehte hain tiwari ji', 'ji meri nazar toh kitaab par hai', 'haan ji padhai hi sab kuch hai', 'tiwari ji main toh bas padhai dekh raha hoon'],
    ['Agree politely and mention your studies.', 'Only = "sirf". Studies = "padhai".'],
    ['बहुत अच्छे! नेता लोग तो आते-जाते रहेंगे, अफ़सर टिकता है।', 'Bahut achhe! Neta log toh aate-jaate rahenge, afsar tikta hai.', 'Very good! Leaders come and go, an officer stays.'],
    ['चश्मा ठीक करते-करते सुना नहीं। फिर कहो।', 'Chashma theek karte-karte suna nahi. Phir kaho.', 'I was fixing my glasses and missed it. Say again.']),
  S('exam', ['किस विषय में दिक़्क़त है? इतिहास में?', 'Kis vishay mein dikkat hai? Itihaas mein?', 'Which subject is the trouble? History?'],
    'Say history is fun, geography is the hard one.', ['Itihaas mazedaar hai, bhoogol mushkil hai.', 'इतिहास मज़ेदार है, भूगोल मुश्किल है।'],
    ['itihaas accha hai bhoogol kathin hai', 'history theek hai geography mushkil hai', 'bhoogol mein dikkat hai ji', 'itihaas mast hai bhoogol bhaari hai'],
    ['Say which subject is hard.', 'History = "itihaas". Geography = "bhoogol".'],
    ['नक़्शा रोज़ देख बेटा, दिन में दस मिनट, भूगोल सीधा हो जाएगा।', 'Naqsha roz dekh beta, din mein das minute, bhoogol seedha ho jaayega.', 'Look at the map daily, ten minutes, geography will straighten out.'],
    ['विषय बताओ बेटा, कौन-सा कठिन है?', 'Vishay batao beta, kaun-sa kathin hai?', 'Tell me the subject, beta, which is hard?']),
], ['जाओ, नक़्शा खोलो और अख़बार के साथ मिलाओ।', 'Jao, naqsha kholo aur akhbaar ke saath milao.', 'Go, open a map and match it with the paper.'],
  [['mujhe abhi sirf padhai dikhti hai', 'right now I only see studies'], ['bhoogol mushkil hai', 'geography is hard']], ['अरे आओ! आज का संपादकीय पढ़ा?', 'Arre aao! Aaj ka sampaadkeey padha?', 'Come! Did you read today\'s editorial?'], 2);

export const rangoliGirl = P('chowk-rangoli-girl', 'Gudiya', 'little girl drawing rangoli', 'beside the rangoli', 'k', 'Praise her rangoli.', [
  S('design', ['भैया, देखो मैंने रंगोली में कमल बनाया!', 'Bhaiya, dekho maine rangoli mein kamal banaya!', 'Brother, look, I made a lotus in the rangoli!'],
    'Tell her the rangoli is very pretty.', ['Tumhari rangoli bahut sundar hai!', 'तुम्हारी रंगोली बहुत सुंदर है!'],
    ['rangoli bahut sundar hai', 'kitni pyaari rangoli banayi', 'wah kya rangoli hai gudiya', 'bahut badhiya bani hai rangoli'],
    ['Praise her work.', 'Rangoli = "rangoli". Very pretty = "bahut sundar".'],
    ['सच में? अब पीले रंग से बीच में भरूँगी!', 'Sach mein? Ab peele rang se beech mein bharungi!', 'Really? Now I will fill the middle with yellow!'],
    ['क्या बोला भैया? मैं रंग में खोई थी।', 'Kya bola bhaiya? Main rang mein khoi thi.', 'What did you say, brother? I was lost in the colours.']),
], ['दिवाली पर फिर आना, और बड़ी बनाऊँगी!', 'Diwali par phir aana, aur badi banaungi!', 'Come again at Diwali, I will make a bigger one!'],
  [['tumhari rangoli bahut sundar hai', 'your rangoli is very beautiful']], ['भैया, नया रंग लाई हूँ, देखोगे?', 'Bhaiya, naya rang laayi hoon, dekhoge?', 'Brother, I brought a new colour, want to see?'], 1);

export const flagDevotee = P('chowk-ganpati-devotee', 'Meena Ji', 'woman at the festival poster', 'Diwali and Durga Puja poster', 'f', 'Wish her a happy Diwali.', [
  S('wish', ['दिवाली आने वाली है, पोस्टर देखकर मन भर आता है।', 'Diwali aane wali hai, poster dekhkar man bhar aata hai.', 'Diwali is coming, my heart fills seeing the poster.'],
    'Wish her a happy Diwali.', ['Aapko Diwali ki bahut shubhkaamnaayein!', 'आपको दिवाली की बहुत शुभकामनाएँ!'],
    ['happy diwali aunty ji', 'diwali mubarak ho aapko', 'aapko diwali ki badhai', 'shubh diwali aunty'],
    ['Say a Diwali wish.', 'Diwali wishes = "Diwali ki shubhkaamnaayein".'],
    ['तुम्हें भी बेटा! पेपर में लक्ष्मी जी की कृपा रहे।', 'Tumhe bhi beta! Paper mein Lakshmi ji ki kripa rahe.', 'To you too, beta! May Lakshmi ji bless your paper.'],
    ['बेटा, पूजा में हूँ। धीरे से बोलो।', 'Beta, pooja mein hoon. Dheere se bolo.', 'Beta, I am in prayer. Speak softly.']),
], ['ये लो, एक फूल तुम्हारे लिए भी।', 'Ye lo, ek phool tumhare liye bhi.', 'Here, one flower for you too.'],
  [['Diwali ki shubhkaamnaayein', 'Diwali greetings']], ['आओ बेटा, पोस्टर के आगे हाथ जोड़ लो।', 'Aao beta, poster ke aage haath jod lo.', 'Come, beta, fold your hands before the poster.'], 1);

export const tagKid1 = P('chowk-tag-kid-1', 'Raju', 'playing kid', 'open ground east of the stall', 'k', 'Tell him he is the catcher now.', [
  S('tag', ['हाँफ गया मैं! अब कौन पकड़ेगा?', 'Haanf gaya main! Ab kaun pakdega?', 'I am out of breath! Who will catch now?'],
    'Say it is his turn to be the catcher.', ['Ab teri baari hai, tu pakad!', 'अब तेरी बारी है, तू पकड़!'],
    ['teri baari hai raju', 'ab tu pakdega', 'oye ab tu pakad', 'tu pakad ab mujhe'],
    ['Tell him it is his turn.', 'Your turn = "teri baari". Catch = "pakad".'],
    ['ठीक है! गिनती करता हूँ, भागो सब!', 'Theek hai! Ginti karta hoon, bhaago sab!', 'Okay! I will count, everyone run!'],
    ['क्या कहा? जल्दी बोलो, वो भाग रही है!', 'Kya kaha? Jaldi bolo, wo bhaag rahi hai!', 'What did you say? Quickly, she is running!']),
], ['पकड़ लिया! अब तुम भी भागो भैया!', 'Pakad liya! Ab tum bhi bhaago bhaiya!', 'Caught! Now you run too, brother!'],
  [['ab teri baari hai', 'now it is your turn']], ['भैया, फिर से खेलें?', 'Bhaiya, phir se khelen?', 'Brother, shall we play again?'], 1);

export const tagKid2 = P('chowk-tag-kid-2', 'Muskaan', 'playing kid', 'open ground east of the stall', 'k', 'Cheer her for catching.', [
  S('cheer', ['पकड़ लिया पकड़ लिया! मैंने राजू को पकड़ा!', 'Pakad liya pakad liya! Maine Raju ko pakda!', 'Caught him, caught him! I caught Raju!'],
    'Cheer her for catching Raju.', ['Shabaash, tum toh bahut tez ho!', 'शाबाश, तुम तो बहुत तेज़ हो!'],
    ['wah kya baat hai muskaan', 'bahut badhiya pakda', 'oye chak de muskaan', 'tum toh sabse tez ho'],
    ['Give her a cheer.', 'Well done = "shabaash". Very fast = "bahut tez".'],
    ['हे हे! अब बारी बदल गई, राजू पकड़ेगा!', 'He he! Ab baari badal gayi, Raju pakdega!', 'He he! The turn has changed, Raju will catch!'],
    ['तालियाँ तो बजाओ भैया, कुछ बोलो!', 'Taaliyaan toh bajao bhaiya, kuch bolo!', 'Clap, brother, say something!']),
], ['चलो फिर भागते हैं! पकड़ सको तो पकड़ो!', 'Chalo phir bhaagte hain! Pakad sako toh pakdo!', 'Let us run again! Catch me if you can!'],
  [['shabaash, tum bahut tez ho', 'well done, you are very fast']], ['भैया, इस बार तुम पकड़ो ना!', 'Bhaiya, is baar tum pakdo na!', 'Brother, you catch this time!'], 1);

export const grandma = P('chawl-grandma-doorstep', 'Dadi Maa', 'old-city grandmother', 'haveli doorstep', 'o', 'Greet her and tell her where your parents are.', [
  S('parents', ['आ बेटा, बैठ। तेरे माँ-बाप कहाँ हैं? खाना खाया?', 'Aa beta, baith. Tere maa-baap kahaan hain? Khaana khaya?', 'Come, beta, sit. Where are your parents? Have you eaten?'],
    'Say your parents are in Patna.', ['Mere mummy-papa Patna mein rehte hain.', 'मेरे मम्मी-पापा पटना में रहते हैं।'],
    ['mummy papa patna mein hain dadi', 'mere ghar wale patna mein hain', 'dadi ji mere parents patna mein rehte hain', 'main patna se hoon wahin hain sab'],
    ['Say where your parents live.', 'My parents = "mere mummy-papa". Live = "rehte hain".'],
    ['अच्छा, पटना! तभी इतने सीधे हो। ले, ये पराँठा खा।', 'Accha, Patna! Tabhi itne seedhe ho. Le, ye paranthaa kha.', 'Oh, Patna! That is why you are so simple. Here, eat this paratha.'],
    ['क्या कहा? कान में तकलीफ़ है। ज़ोर से बोल।', 'Kya kaha? Kaan mein takleef hai. Zor se bol.', 'What did you say? My ears trouble me. Speak up.']),
  S('eat', ['पराँठा ठंडा न होने दे, फटाफट खा ले।', 'Paranthaa thanda na hone de, fatafat kha le.', 'Do not let the paratha go cold, eat quickly.'],
    'Thank her and say the paratha is delicious.', ['Dadi, ye paranthaa bahut swaadisht hai.', 'दादी, ये पराँठा बहुत स्वादिष्ट है।'],
    ['bahut swaadisht hai dadi', 'dadi ji paranthaa mast bana hai', 'shukriya dadi bahut tasty', 'oye dadi kya kamaal paranthaa'],
    ['Compliment the food.', 'Delicious = "swaadisht". Paratha = "paranthaa".'],
    ['जीता रह बेटा! ज़्यादा पढ़ मत, आराम भी कर।', 'Jeeta reh beta! Zyada padh mat, aaram bhi kar.', 'God bless you, beta! Do not over-study, rest too.'],
    ['खाने की तारीफ़ कर, चुप क्यों बैठा है?', 'Khaane ki taareef kar, chup kyun baitha hai?', 'Praise the food, why are you sitting silent?']),
], ['अब जा, कल फिर आना। माँ को फ़ोन ज़रूर करना!', 'Ab ja, kal phir aana. Maa ko phone zaroor karna!', 'Now go, come again tomorrow. Do call your mother!'],
  [['mere mummy-papa Patna mein rehte hain', 'my parents live in Patna'], ['ye paranthaa bahut swaadisht hai', 'this paratha is delicious']], ['आ गया मेरा राजा बेटा! पराँठा तैयार है।', 'Aa gaya mera raja beta! Paranthaa taiyaar hai.', 'My prince has come! The paratha is ready.'], 2);

export const laneSweeper = P('chawl-lane-sweeper', 'Shanti', 'lane sweeper', 'haveli lane', 'f', 'Thank her for keeping the lane clean and ask when she starts.', [
  S('clean', ['सुबह चार बजे से झाड़ू लगा रही हूँ, भैया।', 'Subah chaar baje se jhaadu laga rahi hoon, bhaiya.', 'I have been sweeping since four in the morning, brother.'],
    'Thank her for keeping the lane clean.', ['Aap gali itni saaf rakhti hain, shukriya!', 'आप गली इतनी साफ़ रखती हैं, शुक्रिया!'],
    ['gali kitni saaf hai shukriya', 'aapka kaam bahut accha hai', 'aap bahut mehnat karti hain didi', 'saaf gali ke liye shukriya'],
    ['Thank her.', 'Clean = "saaf". Thanks = "shukriya".'],
    ['अरे, तुमने कहा तो दिल ख़ुश हो गया। कोई बोलता नहीं।', 'Arre, tumne kaha toh dil khush ho gaya. Koi bolta nahi.', 'Oh, hearing that made me happy. Nobody says it.'],
    ['झाड़ू की आवाज़ में सुना नहीं। फिर बोलो।', 'Jhaadu ki awaaz mein suna nahi. Phir bolo.', 'I could not hear over the broom. Say again.']),
], ['ज़रा किनारे से जाना, भैया। पूरा साफ़ करना है।', 'Zara kinaare se jaana, bhaiya. Poora saaf karna hai.', 'Please go along the edge, brother. I have to finish cleaning.'],
  [['aap gali itni saaf rakhti hain', 'you keep the lane so clean']], ['अरे भैया, आज भी जल्दी निकले?', 'Arre bhaiya, aaj bhi jaldi nikle?', 'Oh brother, left early again today?'], 1);

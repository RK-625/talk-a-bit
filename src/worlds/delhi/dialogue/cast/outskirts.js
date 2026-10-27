// People out on the open ground around the city: the metro viaduct, the east road, the bridge road, the fields.
import { P, step as S } from '../kit.js';

export const railKiteKid = P('rail-kite-kid', 'Sonu', 'kite-flying kid', 'open ground beside the metro viaduct', 'k', 'Praise how high his kite flies.', [
  S('high', ['ऊपर मेट्रो जा रही है, देखो मेरी पतंग उससे भी ऊँची है!', 'Upar metro ja rahi hai, dekho meri patang usse bhi oonchi hai!', 'The metro is going up there, look, my kite is even higher!'],
    'Say his kite is the highest of all.', ['Wah, tumhari patang sabse oonchi hai!', 'वाह, तुम्हारी पतंग सबसे ऊँची है!'],
    ['kitni oonchi udi hai patang', 'bahut oonchi gayi hai tumhari patang', 'oye kya patang hai', 'sabse upar hai teri patang'],
    ['Praise the kite.', 'Highest = "sabse oonchi". Kite = "patang".'],
    ['हाँ! अब ढील दूँगा और बादलों तक भेज दूँगा!', 'Haan! Ab dheel dunga aur baadalon tak bhej dunga!', 'Yes! Now I will give more string and send it to the clouds!'],
    ['मेट्रो के शोर में सुना नहीं, फिर बोलो!', 'Metro ke shor mein suna nahi, phir bolo!', 'I could not hear over the metro noise, say again!']),
], ['वो काटा भी नहीं! मैं सबसे ऊँचा हूँ!', 'Wo kaata bhi nahi! Main sabse ooncha hoon!', 'It was not even cut! I am the highest!'],
  [['tumhari patang sabse oonchi hai', 'your kite is the highest']], ['भैया, आज हवा तेज़ है, पतंग उड़ेगी!', 'Bhaiya, aaj hawa tez hai, patang udegi!', 'Brother, the wind is strong today, the kite will fly!'], 1);

export const laneGossip = P('lane-aunty-gossip', 'Bimla', 'gossiping woman', 'open ground by an old haveli block', 'f', 'Congratulate her on the neighbour\'s news.', [
  S('news', ['पता है, शर्मा जी की बेटी की शादी तय हो गई!', 'Pata hai, Sharma ji ki beti ki shaadi tay ho gayi!', 'Do you know, Sharma ji\'s daughter\'s wedding is fixed!'],
    'Congratulate them and ask for mithai.', ['Wah, badhai ho! Mithai kab khilayengi?', 'वाह, बधाई हो! मिठाई कब खिलाएँगी?'],
    ['bahut badhai ho aunty', 'mithai khilaiye aunty ji', 'oye vadhaiyan ji mithai', 'wah kya khabar hai badhai ho'],
    ['Say congratulations.', 'Congratulations = "badhai ho". Sweets = "mithai".'],
    ['हा हा हा! तेरी शादी में खिलाऊँगी बेटा, पहले अफ़सर तो बन!', 'Ha ha ha! Teri shaadi mein khilaungi beta, pehle afsar toh ban!', 'Ha ha ha! I will feed you at your wedding, become an officer first!'],
    ['क्या कहा बेटा? तेज़ बोल, आजकल कम सुनती हूँ।', 'Kya kaha beta? Tez bol, aajkal kam sunti hoon.', 'What did you say, beta? Speak up, I hear less these days.']),
], ['अच्छा चलूँ, और पड़ोसियों को भी बताना है।', 'Accha chalun, aur padosiyon ko bhi batana hai.', 'Well I go, I have to tell the other neighbours too.'],
  [['badhai ho! mithai kab khilayengi?', 'congratulations! when will you give sweets?']], ['अरे बेटा! एक और ख़बर सुन!', 'Arre beta! Ek aur khabar sun!', 'Oh beta! Listen to one more piece of news!'], 1);

export const schoolgirl = P('east-schoolgirl', 'Aanya', 'schoolgirl', 'open ground near the east road', 'k', 'Ask how her test went and encourage her.', [
  S('test', ['नमस्ते भैया! आज स्कूल में गणित का टेस्ट था।', 'Namaste bhaiya! Aaj school mein ganit ka test tha.', 'Namaste, brother! We had a maths test at school today.'],
    'Ask how her test went.', ['Test kaisa gaya, Aanya?', 'टेस्ट कैसा गया, आन्या?'],
    ['aaj ka test kaisa gaya', 'test accha hua kya', 'oye test kaisa raha', 'maths ka test kaisa tha'],
    ['Ask about her test.', 'How did it go = "kaisa gaya". Test = "test".'],
    ['थोड़ा मुश्किल था, पर मैंने सब हल कर दिए!', 'Thoda mushkil tha, par maine sab hal kar diye!', 'It was a bit hard, but I solved everything!'],
    ['क्या पूछा भैया? मैं बैग संभाल रही थी।', 'Kya puchha bhaiya? Main bag sambhal rahi thi.', 'What did you ask, brother? I was adjusting my bag.']),
  S('result', ['अगर नंबर कम आए तो मम्मी डाँटेंगी!', 'Agar number kam aaye toh mummy daantengi!', 'If my marks are low, mummy will scold me!'],
    'Say do not worry, you did your best.', ['Tension mat lo, tumne mehnat ki hai.', 'टेंशन मत लो, तुमने मेहनत की है।'],
    ['chinta mat karo accha hi hoga', 'tumne mehnat ki hai na', 'oye koi na sab theek hoga', 'himmat rakho aanya'],
    ['Encourage her.', 'Do not worry = "tension mat lo". You worked hard = "tumne mehnat ki hai".'],
    ['सच भैया? थैंक्यू! आप भी पेपर में ऐसे ही मेहनत करना।', 'Sach bhaiya? Thank you! Aap bhi paper mein aise hi mehnat karna.', 'Really, brother? Thank you! You work hard like that in your paper too.'],
    ['कुछ तो बोलो भैया, डर लग रहा है।', 'Kuch toh bolo bhaiya, dar lag raha hai.', 'Say something, brother, I am scared.']),
], ['बाय भैया! मैं घर जाकर होमवर्क करती हूँ।', 'Bye bhaiya! Main ghar jaakar homework karti hoon.', 'Bye, brother! I am going home to do my homework.'],
  [['test kaisa gaya?', 'how did the test go?'], ['tension mat lo, tumne mehnat ki hai', 'do not worry, you worked hard']], ['भैया, मुझे पूरे नंबर मिले!', 'Bhaiya, mujhe poore number mile!', 'Brother, I got full marks!'], 2);

export const scrubElder = P('scrub-elder-umbrella', 'Baba Hukum', 'elderly man with an umbrella', 'open scrubland, far from the sites', 'o', 'Accept his offer to sit in the shade.', [
  S('shade', ['ज़रा छाँव में बैठ जाओ बेटा, धूप बहुत तेज़ है।', 'Zara chhaanv mein baith jao beta, dhoop bahut tez hai.', 'Sit in the shade a while, beta, the sun is strong.'],
    'Thank him and sit down.', ['Shukriya baba, main yahin baith jaata hoon.', 'शुक्रिया बाबा, मैं यहीं बैठ जाता हूँ।'],
    ['baba ji thodi der baithta hoon', 'dhanyavaad baba chhaanv mein baith gaya', 'paaji shukriya baith jata hoon', 'accha baba yahin baith jaun'],
    ['Accept kindly.', 'Shade = "chhaanv". I sit = "baith jaata hoon".'],
    ['ये ले मेरी छतरी का सहारा भी। इस उम्र में बस छाया ही सब कुछ है।', 'Ye le meri chhatri ka sahaara bhi. Is umra mein bas chhaaya hi sab kuch hai.', 'Take the support of my umbrella too. At this age shade is everything.'],
    ['ऊँचा बोल बेटा, कान कमज़ोर हैं।', 'Ooncha bol beta, kaan kamzor hain.', 'Speak louder, beta, my ears are weak.']),
], ['अच्छा बेटा, अब चलता हूँ। तुम भी सावधानी से जाना।', 'Accha beta, ab chalta hoon. Tum bhi saavdhaani se jaana.', 'Well beta, I go now. You also go carefully.'],
  [['shukriya baba, main yahin baith jaata hoon', 'thanks baba, I will sit here']], ['बेटा, फिर आ गए? छाँव अब भी है।', 'Beta, phir aa gaye? Chhaanv ab bhi hai.', 'Beta, you came again? The shade is still here.'], 1);

export const selfieTeen = P('seaview-selfie-teen', 'Ishaan', 'teen taking selfies', 'open ground with a view of the Signature Bridge', 'q', 'Agree the bridge looks great.', [
  S('bridge', ['भैया, ये सिग्नेचर ब्रिज कितना ऊँचा है ना! वाह!', 'Bhaiya, ye Signature Bridge kitna ooncha hai na! Wah!', 'Brother, how tall this Signature Bridge is! Wow!'],
    'Say the bridge looks beautiful.', ['Haan, ye bridge bahut sundar lagta hai.', 'हाँ, ये ब्रिज बहुत सुंदर लगता है।'],
    ['bridge sach mein kamaal ka hai', 'bahut oonchi aur sundar bridge hai', 'oye kya baat hai pul ki', 'dekhne mein mast lagta hai'],
    ['Agree with him.', 'Bridge = "bridge". Looks beautiful = "sundar lagta hai".'],
    ['हाँ! इसके साथ एक बढ़िया सेल्फ़ी खींचता हूँ, देखना!', 'Haan! Iske saath ek badhiya selfie kheenchta hoon, dekhna!', 'Yes! I will take a great selfie with it, watch!'],
    ['क्या बोले भैया? हवा में आवाज़ उड़ गई।', 'Kya bole bhaiya? Hawa mein awaaz ud gayi.', 'What did you say, brother? The wind took your voice.']),
], ['थैंक्स भैया! सेल्फ़ी रेडी!', 'Thanks bhaiya! Selfie ready!', 'Thanks, brother! Selfie ready!'],
  [['ye bridge bahut sundar lagta hai', 'this bridge looks very beautiful']], ['भैया, इस बार लाइट के साथ सेल्फ़ी लूँगा!', 'Bhaiya, is baar light ke saath selfie lunga!', 'Brother, I will take a selfie with the lights this time!'], 1);

export const ballKid = P('east-field-ball-kid', 'Dabbu', 'kid with a ball', 'open ground east', 'k', 'Offer to play with him for a bit.', [
  S('play', ['भैया, मेरे दोस्त आए ही नहीं। कोई मेरे साथ खेलेगा?', 'Bhaiya, mere dost aaye hi nahi. Koi mere saath khelega?', 'Brother, my friends did not come at all. Will anyone play with me?'],
    'Offer to play with him for a bit.', ['Chal, thodi der main tere saath khel leta hoon.', 'चल, थोड़ी देर मैं तेरे साथ खेल लेता हूँ।'],
    ['chal main khelta hoon thodi der', 'oye theek hai gend phenk', 'zaroor thodi der khelte hain', 'ek do minute khel lete hain'],
    ['Offer to join him.', 'I will play = "khel leta hoon". With you = "tere saath".'],
    ['वाह भैया! ये ले गेंद, पहले तुम फेंको!', 'Wah bhaiya! Ye le gend, pehle tum phenko!', 'Wow brother! Here, ball, you throw first!'],
    ['खेलोगे या नहीं? ज़ोर से बोलो!', 'Khelonge ya nahi? Zor se bolo!', 'Will you play or not? Say it loudly!']),
], ['मज़ा आया भैया! कल अपने दोस्तों को भी लाऊँगा।', 'Maza aaya bhaiya! Kal apne doston ko bhi launga.', 'That was fun, brother! Tomorrow I will bring my friends too.'],
  [['thodi der main tere saath khel leta hoon', 'I will play with you for a while']], ['भैया, आज दोस्त आए हैं, तुम भी आओ!', 'Bhaiya, aaj dost aaye hain, tum bhi aao!', 'Brother, my friends are here today, you come too!'], 1);

export const phoneWoman = P('field-phone-woman', 'Shilpa', 'woman on the phone', 'open ground', 'f', 'Offer to help her find the way.', [
  S('lost', ['हैलो? नहीं... मैं रास्ता भटक गई हूँ... रुको ज़रा।', 'Hello? Nahi... main raasta bhatak gayi hoon... Ruko zara.', 'Hello? No... I am lost... wait a second.'],
    'Ask if you can help her find the way.', ['Madam, kya main aapki madad kar sakta hoon?', 'मैडम, क्या मैं आपकी मदद कर सकता हूँ?'],
    ['kya main madad kar sakta hoon madam', 'aapko raasta chahiye kya', 'didi koi madad chahiye', 'raasta dhoondh rahi hain kya'],
    ['Offer help.', 'Can I help = "madad kar sakta hoon". Madam = "madam".'],
    ['अरे हाँ, आप जानते हैं मेट्रो का रास्ता? बस वही चाहिए।', 'Arre haan, aap jaante hain metro ka raasta? Bas wahi chahiye.', 'Oh yes, do you know the way to the metro? That is all I need.'],
    ['माफ़ कीजिए, फ़ोन पर थी। फिर से कहिए।', 'Maaf kijiye, phone par thi. Phir se kahiye.', 'Sorry, I was on the phone. Please say again.']),
], ['धन्यवाद! आप जैसे लोग हों तो डर नहीं लगता।', 'Dhanyavaad! Aap jaise log hon toh dar nahi lagta.', 'Thank you! With people like you there is no fear.'],
  [['kya main aapki madad kar sakta hoon?', 'can I help you?']], ['अरे आप! उस दिन के लिए फिर शुक्रिया।', 'Arre aap! Us din ke liye phir shukriya.', 'Oh you! Thanks again for that day.'], 1);

export const backpackerTeen = P('north-field-backpacker-teen', 'Rohit Kumar', 'teen with a backpack', 'open ground north of the city', 'q', 'Recommend Qutub Minar and tell him how to go.', [
  S('see', ['यार, यहाँ कुछ देखने लायक़ है क्या? बोर हो रहा हूँ।', 'Yaar, yahan kuch dekhne laayak hai kya? Bore ho raha hoon.', 'Man, is there anything worth seeing here? I am bored.'],
    'Recommend Qutub Minar.', ['Qutub Minar zaroor dekho, bahut oonchi hai.', 'क़ुतुब मीनार ज़रूर देखो, बहुत ऊँची है।'],
    ['qutub minar dekhne jao yaar', 'qutub minar bahut mast hai', 'oye qutub minar chale jao', 'qutub minar ja kar dekho'],
    ['Suggest a place.', 'You must see = "zaroor dekho". Very tall = "bahut oonchi".'],
    ['अच्छा आइडिया! एक लाल मीनार... कैसे जाऊँ वहाँ?', 'Accha idea! Ek laal minar... Kaise jaun wahan?', 'Good idea! A red tower... how do I get there?'],
    ['क्या सुझाया? ठीक से बताओ यार।', 'Kya sujhaya? Theek se batao yaar.', 'What did you suggest? Tell me properly, man.']),
  S('how', ['वाह! तो वहाँ पहुँचूँ कैसे?', 'Wah! Toh wahan pahunchun kaise?', 'Wow! So how do I get there?'],
    'Say take the metro to Qutub Minar station.', ['Metro se Qutub Minar station utar jao.', 'मेट्रो से क़ुतुब मीनार स्टेशन उतर जाओ।'],
    ['metro pakdo qutub minar station tak', 'metro se seedha qutub minar jao', 'paaji metro le lo qutub minar ke liye', 'qutub minar metro station par utar jana'],
    ['Say how to get there.', 'By metro = "metro se". Get off = "utar jao".'],
    ['थैंक्स! कल सुबह जाता हूँ। तुम भी चलोगे?', 'Thanks! Kal subah jaata hoon. Tum bhi chaloge?', 'Thanks! I will go tomorrow morning. Will you come too?'],
    ['कैसे जाऊँ? एक बार और बताओ।', 'Kaise jaun? Ek baar aur batao.', 'How do I go? Tell me one more time.']),
], ['ठीक है भाई, ऑल द बेस्ट तुम्हारी पढ़ाई के लिए!', 'Theek hai bhai, all the best tumhari padhai ke liye!', 'All right brother, all the best for your studies!'],
  [['Qutub Minar zaroor dekho', 'you must see Qutub Minar'], ['metro se Qutub Minar utar jao', 'take the metro to Qutub Minar']], ['अरे भाई! मैं क़ुतुब मीनार देख आया!', 'Arre bhai! Main Qutub Minar dekh aaya!', 'Hey brother! I went and saw Qutub Minar!'], 2);

export const rickshawDriver = P('east-road-rickshaw-driver', 'Bablu', 'auto driver', 'by the east road', 'm', 'Ask about the shared e-rickshaw to the metro.', [
  S('share', ['बेटा, मेट्रो जाना है? ऑटो सौ रुपये का पड़ेगा।', 'Beta, metro jaana hai? Auto sau rupaye ka padega.', 'Beta, going to the metro? The auto will cost a hundred.'],
    'Ask how much the shared e-rickshaw costs.', ['Share e-rickshaw mein kitna lagta hai?', 'शेयर ई-रिक्शा में कितना लगता है?'],
    ['share wale e-rickshaw ka kitna hai', 'e-rickshaw mein kitna kiraya hai', 'paaji share ka kya rate hai', 'e-rickshaw se kitne mein jaun'],
    ['Ask about the shared ride.', 'Shared = "share". How much does it take = "kitna lagta hai".'],
    ['दस रुपये प्रति सवारी। पर पीछे वाली सीट पर भीड़ मिलेगी।', 'Das rupaye prati sawaari. Par peeche wali seat par bheed milegi.', 'Ten rupees a head. But you will get a crowded back seat.'],
    ['क्या पूछा? फ़ोन में उलझा था।', 'Kya puchha? Phone mein uljha tha.', 'What did you ask? I was stuck in my phone.']),
  S('choose', ['तो ऑटो से जाओगे या ई-रिक्शा से?', 'Toh auto se jaoge ya e-rickshaw se?', 'So will you go by auto or by e-rickshaw?'],
    'Say you will take the e-rickshaw.', ['Main e-rickshaw se hi jaunga.', 'मैं ई-रिक्शा से ही जाऊँगा।'],
    ['e-rickshaw hi theek hai', 'main share se chala jaunga', 'oye e-rickshaw se jaana hai', 'e-rickshaw mein baith jaunga'],
    ['Choose the cheaper ride.', 'I will go by e-rickshaw = "e-rickshaw se jaunga".'],
    ['समझदार हो! पैसे बचाओ, किताबें ख़रीदो। वो रहा खड़ा।', 'Samajhdaar ho! Paise bachao, kitaabein kharido. Wo raha khada.', 'Smart! Save money, buy books. There it stands.'],
    ['ऑटो या ई-रिक्शा? एक चुन लो।', 'Auto ya e-rickshaw? Ek chun lo.', 'Auto or e-rickshaw? Pick one.']),
], ['जाओ बेटा, पैसे संभालकर रखना।', 'Jao beta, paise sambhalkar rakhna.', 'Go beta, keep your money safe.'],
  [['share e-rickshaw mein kitna lagta hai?', 'how much does the shared e-rickshaw cost?'], ['main e-rickshaw se hi jaunga', 'I will go by e-rickshaw']], ['अरे बेटा, आज भी भीड़ है मेट्रो पर!', 'Arre beta, aaj bhi bheed hai metro par!', 'Hey beta, a crowd at the metro today too!'], 2);

export const shopper = P('bridge-road-shopper', 'Reena', 'woman with shopping', 'open ground near the bridge west road', 'f', 'Offer to check the bus on your phone.', [
  S('bus', ['थक गई हूँ, बस का नामोनिशान नहीं है!', 'Thak gayi hoon, bus ka naamonishaan nahi hai!', 'I am tired, there is no sign of a bus!'],
    'Offer to check the bus on your phone app.', ['Bus number batayiye, main app par dekh leta hoon.', 'बस नंबर बताइए, मैं ऐप पर देख लेता हूँ।'],
    ['bus ka number batao app par dekhta hoon', 'aap bataiye kaun si bus main app dekhta hoon', 'phone par bus dekh leta hoon aunty', 'main track kar deta hoon bus'],
    ['Offer to look it up.', 'Bus number = "bus number". I will look = "dekh leta hoon".'],
    ['अरे वाह, तुम पढ़े-लिखे लोग कितने काम के हो! मेरी बस चार सौ बीस।', 'Arre wah, tum padhe-likhe log kitne kaam ke ho! Meri bus chaar sau bees.', 'Oh wow, you educated folks are so useful! My bus is four-twenty.'],
    ['ऐप की बात कर रहे हो? ज़रा धीरे समझाओ।', 'App ki baat kar rahe ho? Zara dheere samjhao.', 'Talking about an app? Explain slowly.']),
  S('minutes', ['तो बताओ, कितने मिनट में आएगी?', 'Toh batao, kitne minute mein aayegi?', 'So tell me, in how many minutes will it come?'],
    'Say it will come in ten minutes.', ['Bus das minute mein aa jaayegi.', 'बस दस मिनट में आ जाएगी।'],
    ['das minute mein aayegi', 'bas das minute aur', 'aunty das minute mein pahunch jaayegi', 'thodi der mein aa rahi hai bus'],
    ['Give the wait time.', 'In ten minutes = "das minute mein". It will come = "aa jaayegi".'],
    ['चलो, तब तक थैले पर बैठ जाती हूँ। शुक्रिया बेटा!', 'Chalo, tab tak thaile par baith jaati hoon. Shukriya beta!', 'Okay, till then I sit on my bags. Thank you beta!'],
    ['कितने मिनट? सही से बताओ बेटा।', 'Kitne minute? Sahi se batao beta.', 'How many minutes? Tell me properly, beta.']),
], ['जीते रहो बेटा, तैयारी में पक्का सफल होगे।', 'Jeete raho beta, taiyaari mein pakka safal hoge.', 'God bless you, beta, you will surely succeed in your preparation.'],
  [['bus number batayiye, main app par dekh leta hoon', 'tell me the bus number, I will check the app'], ['bus das minute mein aa jaayegi', 'the bus will come in ten minutes']], ['बेटा, बस समय पर आ गई थी, शुक्रिया!', 'Beta, bus samay par aa gayi thi, shukriya!', 'Beta, the bus came on time, thanks!'], 2);

export const vegWoman = P('chawl-lane-vegetable-woman', 'Santosh', 'vegetable woman', 'lane near an old haveli block', 'f', 'Ask how to pick good tomatoes.', [
  S('tomato', ['सब्ज़ी इतनी महँगी है, भैया! टमाटर साठ रुपये किलो!', 'Sabzi itni mehngi hai, bhaiya! Tamatar saath rupaye kilo!', 'Vegetables are so expensive, brother! Tomatoes sixty a kilo!'],
    'Ask how to pick good tomatoes.', ['Achhe tamatar kaise pehchante hain?', 'अच्छे टमाटर कैसे पहचानते हैं?'],
    ['accha tamatar kaise chunte hain', 'tamatar kaise dekhte hain aunty', 'aunty ji sahi tamatar kaun sa hota hai', 'good tamatar ki pehchaan kya hai'],
    ['Ask for a tip.', 'Good tomatoes = "achhe tamatar". How to recognise = "kaise pehchante hain".'],
    ['लाल और सख़्त, दबाओ तो ज़्यादा पिचके नहीं। अब आगे से ख़ुद चुनना!', 'Laal aur sakht, dabao toh zyada pichke nahi. Ab aage se khud chunna!', 'Red and firm, they should not squish much. Choose yourself from now!'],
    ['टमाटर के बारे में पूछा क्या? ज़रा ऊँचा बोलो।', 'Tamatar ke baare mein puchha kya? Zara ooncha bolo.', 'Did you ask about tomatoes? Speak a bit louder.']),
], ['ले जाओ बेटा, बिना केमिकल की सब्ज़ी है।', 'Le jao beta, bina chemical ki sabzi hai.', 'Take it, beta, these vegetables are chemical-free.'],
  [['achhe tamatar kaise pehchante hain?', 'how do you recognise good tomatoes?']], ['बेटा, आज भिंडी ताज़ी आई है!', 'Beta, aaj bhindi taazi aayi hai!', 'Beta, fresh okra came today!'], 1);

export const milkman = P('chawl-lane-milkman', 'Ramesh Doodhwala', 'milkman', 'lane near an old haveli block', 'm', 'Say you have been studying since four.', [
  S('early', ['सुबह-सुबह दूध पहुँचाना पड़ता है, बेटा। तुम जल्दी उठ गए?', 'Subah-subah doodh pahunchana padta hai, beta. Tum jaldi uth gaye?', 'I have to deliver milk early morning, beta. You woke up early?'],
    'Say you have been studying since four.', ['Haan, main chaar baje se padh raha hoon.', 'हाँ, मैं चार बजे से पढ़ रहा हूँ।'],
    ['chaar baje se padh raha hoon', 'subah chaar baje utha tha padhne', 'paaji chaar baje se kitaab khol rakhi hai', 'main toh chaar baje se jaga hoon'],
    ['Say when you started.', 'Since four = "chaar baje se". I am studying = "padh raha hoon".'],
    ['शाबाश! हम दोनों सुबह के साथी हैं। एक कप दूध पी जा।', 'Shabaash! Hum dono subah ke saathi hain. Ek cup doodh pi ja.', 'Well done! We are both morning companions. Drink a cup of milk.'],
    ['क्या कहा? डिब्बे की आवाज़ में सुना नहीं।', 'Kya kaha? Dibbe ki awaaz mein suna nahi.', 'What did you say? I could not hear over the milk can.']),
], ['चलता हूँ बेटा, अगला घर बाक़ी है।', 'Chalta hoon beta, agla ghar baaki hai.', 'I am off, beta, the next house is pending.'],
  [['main chaar baje se padh raha hoon', 'I have been studying since four']], ['बेटा, आज भी जल्दी उठे?', 'Beta, aaj bhi jaldi uthe?', 'Beta, up early again today?'], 1);

export const battingUncle = P('field-batting-uncle', 'Rajesh Uncle', 'uncle practising cricket', 'open field', 'm', 'Admire his stance and bowl him one ball.', [
  S('stance', ['मेरा स्टांस देखा? कॉलेज की टीम में खेलता था मैं।', 'Mera stance dekha? College ki team mein khelta tha main.', 'Did you see my stance? I used to play in the college team.'],
    'Praise his stance.', ['Waah uncle, aapka stance ekdum professional hai.', 'वाह अंकल, आपका स्टांस एकदम प्रोफ़ेशनल है।'],
    ['uncle aapka stance kamaal ka hai', 'kya baat hai uncle ji', 'oye stance toh mast hai', 'professional lag rahe ho uncle'],
    ['Compliment him.', 'Professional = "professional". Your stance = "aapka stance".'],
    ['हा हा! बस अब घुटने साथ नहीं देते, वरना शतक बना देता!', 'Ha ha! Bas ab ghutne saath nahi dete, warna shatak bana deta!', 'Ha ha! My knees do not support now, otherwise I would score a century!'],
    ['क्या बोला बेटा? बैट घुमा रहा था।', 'Kya bola beta? Bat ghuma raha tha.', 'What did you say, beta? I was swinging the bat.']),
  S('ball', ['एक गेंद फेंक दो ज़रा, देखें हाथ चलता है कि नहीं।', 'Ek gend phenk do zara, dekhen haath chalta hai ki nahi.', 'Throw me one ball, let us see if my hands still work.'],
    'Say yes, you will throw one ball.', ['Theek hai, ek gend phenk deta hoon.', 'ठीक है, एक गेंद फेंक देता हूँ।'],
    ['zaroor uncle ek gend phenkta hoon', 'chaliye ek ball daalta hoon', 'oye ye lo phenk diya', 'theek hai ek ball le lijiye'],
    ['Agree to bowl.', 'I will throw = "phenk deta hoon". One ball = "ek gend".'],
    ['वाह! ये तो सीधा बाउंड्री पार! अब तुम पढ़ाई पर जाओ।', 'Wah! Ye toh seedha boundary paar! Ab tum padhai par jao.', 'Wow! Straight over the boundary! Now you go back to studying.'],
    ['फेंकोगे कि नहीं? मैं तैयार हूँ।', 'Phenkoge ki nahi? Main taiyaar hoon.', 'Will you throw or not? I am ready.']),
], ['अब जाओ बेटा, कल शाम फिर खेलेंगे।', 'Ab jao beta, kal shaam phir khelenge.', 'Go now, beta, we will play again tomorrow evening.'],
  [['aapka stance ekdum professional hai', 'your stance looks professional'], ['ek gend phenk deta hoon', 'I will throw one ball']], ['आओ बेटा, आज घुटना ठीक है!', 'Aao beta, aaj ghutna theek hai!', 'Come, beta, my knee is fine today!'], 2);

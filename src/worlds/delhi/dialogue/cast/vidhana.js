// Red Fort bus stop and gate, the India Gate steps and the boat-club booth.
import { P, step as S } from '../kit.js';

export const busWaiter1 = P('fort-bus-waiter-1', 'Sunanda', 'woman waiting for a bus', 'Red Fort DTC bus stop', 'f', 'Suggest asking the conductor about the Connaught Place bus.', [
  S('bus', ['कनॉट प्लेस वाली हरी बस कब आएगी, पता है?', 'Connaught Place wali hari bus kab aayegi, pata hai?', 'Do you know when the green Connaught Place bus will come?'],
    'Suggest asking the conductor.', ['Mujhe pata nahi, conductor se puchh lete hain.', 'मुझे पता नहीं, कंडक्टर से पूछ लेते हैं।'],
    ['conductor se puchh lijiye', 'mujhe nahi pata puchh lete hain', 'oye conductor bhaiya se pucho', 'wo khade hain unse puchhiye'],
    ['Suggest asking someone.', 'Conductor = "conductor". Let us ask = "puchh lete hain".'],
    ['अच्छा आइडिया! देखती हूँ, वो वहीं खड़े हैं।', 'Accha idea! Dekhti hoon, wo wahin khade hain.', 'Good idea! I will see, he is standing right there.'],
    ['सुना नहीं, फिर से कहो बेटा।', 'Suna nahi, phir se kaho beta.', 'I did not hear, say again beta.']),
  S('wait', ['तब तक छाँव में खड़े हो जाओ, धूप तेज़ है।', 'Tab tak chhaanv mein khade ho jao, dhoop tez hai.', 'Till then stand in the shade, the sun is strong.'],
    'Say you will wait in the shade with her.', ['Theek hai, main bhi chhaanv mein ruk jaata hoon.', 'ठीक है, मैं भी छाँव में रुक जाता हूँ।'],
    ['main bhi chhaanv mein khada hota hoon', 'haan chhaanv mein ruk jaate hain', 'oye aap bhi aao chhaanv mein', 'theek hai shed ke neeche khade hote hain'],
    ['Wait together.', 'In the shade = "chhaanv mein". I will wait = "ruk jaata hoon".'],
    ['लो, थोड़ा खिसक जाओ। मेरी छतरी भी साथ ले लो।', 'Lo, thoda khisak jao. Meri chhatri bhi saath le lo.', 'Come, move over a bit. Take my umbrella too.'],
    ['छाँव में या धूप में? बताओ।', 'Chhaanv mein ya dhoop mein? Batao.', 'Shade or sun? Tell me.']),
], ['अरे बस आ गई! चलो चढ़ें।', 'Arre bus aa gayi! Chalo chadhen.', 'Oh the bus has come! Let us board.'],
  [['conductor se puchh lete hain', 'let us ask the conductor'], ['main bhi chhaanv mein ruk jaata hoon', 'I will wait in the shade too']], ['अरे बेटा! तुम्हारी वजह से बस मिल गई थी।', 'Arre beta! Tumhari wajah se bus mil gayi thi.', 'Oh beta! Thanks to you I got the bus.'], 2);

export const busWaiter2 = P('fort-bus-waiter-2', 'Aditya', 'young man waiting for a bus', 'Red Fort DTC bus stop', 'q', 'Advise him to wait a bit more.', [
  S('app', ['ऐप में दो मिनट दिख रहा था, पर बस आई ही नहीं!', 'App mein do minute dikh raha tha, par bus aayi hi nahi!', 'The app showed two minutes, but the bus has not come!'],
    'Say the app is sometimes wrong.', ['App kabhi kabhi galat dikhata hai.', 'ऐप कभी कभी ग़लत दिखाता है।'],
    ['app kabhi kabhi galat hota hai', 'ye app theek nahi chalta', 'oye app ka bharosa mat kar', 'tracking kabhi gadbad ho jaati hai'],
    ['Explain the app.', 'Sometimes = "kabhi kabhi". Shows wrong = "galat dikhata hai".'],
    ['हाँ यार, दिल्ली की बसों का भरोसा नहीं। ऑटो ले लूँ?', 'Haan yaar, Dilli ki bason ka bharosa nahi. Auto le lun?', 'Yes man, you cannot trust Delhi buses. Shall I take an auto?'],
    ['क्या बोले? नेटवर्क देख रहा था।', 'Kya bole? Network dekh raha tha.', 'What did you say? I was checking the network.']),
  S('stay', ['तो क्या करूँ, रुकूँ या ऑटो लूँ?', 'Toh kya karun, rukun ya auto lun?', 'So what do I do, wait or take an auto?'],
    'Advise him to wait a little more.', ['Thodi der aur ruk jaiye, bus aati hi hogi.', 'थोड़ी देर और रुक जाइए, बस आती ही होगी।'],
    ['thoda aur ruk lo yaar', 'bus aa hi rahi hogi', 'oye sabr kar le bus aayegi', 'paanch minute aur wait karo'],
    ['Suggest waiting.', 'A bit more = "thodi der aur". It must be coming = "aati hi hogi".'],
    ['ठीक है भाई, पाँच मिनट और। वो देखो, आगे से आ रही है!', 'Theek hai bhai, paanch minute aur. Wo dekho, aage se aa rahi hai!', 'Okay brother, five more minutes. Look, it is coming from ahead!'],
    ['रुकूँ या जाऊँ? एक बोलो।', 'Rukun ya jaun? Ek bolo.', 'Wait or go? Say one.']),
], ['थैंक्स! आज तो तुम्हारी वजह से बस मिल गई।', 'Thanks! Aaj toh tumhari wajah se bus mil gayi.', 'Thanks! I got the bus because of you today.'],
  [['app kabhi kabhi galat dikhata hai', 'the app sometimes shows wrong'], ['thodi der aur ruk jaiye', 'wait a little longer']], ['भाई, आज बस टाइम पर आ गई!', 'Bhai, aaj bus time par aa gayi!', 'Bro, the bus came on time today!'], 2);

export const deliveryWalker = P('fort-dabbawala-walker', 'Sandeep Rider', 'delivery rider on foot', 'Red Fort Road footpath', 'q', 'Point him towards the second lane.', [
  S('number', ['मकान नंबर सैंतालीस किधर है, भैया? घर नहीं मिल रहा।', 'Makaan number saintaalis kidhar hai, bhaiya? Ghar nahi mil raha.', 'Where is house number forty-seven, brother? I cannot find it.'],
    'Tell him to try the second lane ahead.', ['Seedhe jaakar doosri gali mein dekhiye.', 'सीधे जाकर दूसरी गली में देखिए।'],
    ['doosri gali mein dekho', 'aage jaake doosre mod par', 'oye aage doosri gali mein', 'seedha jao phir doosri gali'],
    ['Point him the way.', 'Second lane = "doosri gali". Go straight = "seedhe jaakar".'],
    ['थैंक्स! मेरा ऑर्डर ठंडा हो रहा है, भागता हूँ।', 'Thanks! Mera order thanda ho raha hai, bhaagta hoon.', 'Thanks! My order is getting cold, I run.'],
    ['फ़ोन पर नक़्शा देख रहा था, फिर बोलो।', 'Phone par naqsha dekh raha tha, phir bolo.', 'I was looking at the map on my phone, say again.']),
], ['अब मैं पहुँच जाऊँगा। बाय!', 'Ab main pahunch jaunga. Bye!', 'Now I will reach. Bye!'],
  [['seedhe jaakar doosri gali mein dekhiye', 'go straight and look in the second lane']], ['भाई, घर मिल गया था, थैंक्स!', 'Bhai, ghar mil gaya tha, thanks!', 'Bro, I found the house, thanks!'], 1);

export const boatClerk = P('gateway-ferry-clerk', 'Suresh Babu', 'paddle-boat booth clerk', 'Yamuna boat-club paddle-boat booth', 'm', 'Book a two-seater paddle boat and pay two hundred.', [
  S('ticket', ['टिकट? कितने लोग जा रहे हैं?', 'Ticket? Kitne log ja rahe hain?', 'Tickets? How many people are going?'],
    'Ask for a two-seater paddle boat ticket.', ['Do seat wali paddle boat ka ticket dena.', 'दो सीट वाली पैडल बोट का टिकट देना।'],
    ['do seat wali paddle boat ka ticket', 'ek paddle boat do logon ke liye', 'paaji do seat wali boat chahiye', 'two seater boat ka ticket dena'],
    ['Book the boat.', 'Two-seater = "do seat wali". Ticket = "ticket".'],
    ['ये लो पर्ची। आधा घंटा मिलेगा, समय पूरा होने पर घंटी बजेगी।', 'Ye lo parchi. Aadha ghanta milega, samay poora hone par ghanti bajegi.', 'Here is the slip. You get half an hour, a bell rings when time is up.'],
    ['खिड़की के पार से सुनाई नहीं दिया।', 'Khidki ke paar se sunai nahi diya.', 'I could not hear through the window.']),
  S('pay', ['दो सौ रुपये हुए। खुले पैसे देना।', 'Do sau rupaye hue. Khule paise dena.', 'That is two hundred rupees. Give exact change.'],
    'Pay two hundred rupees.', ['Ye lijiye, do sau rupaye.', 'ये लीजिए, दो सौ रुपये।'],
    ['ye lo do sau rupaye', 'do sau rupaye ye rahe', 'bhaiya do sau ka note ye lijiye', 'paaji do sau rupaye ye lo'],
    ['Pay the amount.', 'Two hundred = "do sau". Here you are = "ye lijiye".'],
    ['सही! जाओ, पानी में आराम से पैडल मारना।', 'Sahi! Jao, paani mein aaram se paddle marna.', 'Right! Go, pedal gently on the water.'],
    ['कितने दिए? एक बार गिन लो।', 'Kitne diye? Ek baar gin lo.', 'How much did you give? Count once.']),
], ['अगला! अगली बारी बीस मिनट बाद।', 'Agla! Agli baari bees minute baad.', 'Next! The next turn is after twenty minutes.'],
  [['do seat wali paddle boat ka ticket dena', 'give me a two-seater paddle boat ticket'], ['ye lijiye, do sau rupaye', 'here you go, two hundred rupees']], ['अरे आप फिर? आज नाव ख़ाली है।', 'Arre aap phir? Aaj naav khaali hai.', 'You again? The boats are empty today.'], 2);

export const palaceDoorman = P('taj-doorman', 'Rajender Singh', 'Red Fort gate guard', 'Red Fort, Lahori Gate entrance', 'm', 'Open your bag for the check and show your ticket.', [
  S('bag', ['बैग खोलिए, चेकिंग होगी। लाल क़िले में सुरक्षा ज़रूरी है।', 'Bag kholiye, checking hogi. Laal Qile mein suraksha zaroori hai.', 'Open your bag, it will be checked. Security matters at the Red Fort.'],
    'Hand over your bag politely.', ['Ji sir, ye lijiye mera bag.', 'जी सर, ये लीजिए मेरा बैग।'],
    ['ji sir ye mera bag hai', 'bag khol deta hoon sir', 'paaji ye bag dekh lijiye', 'theek hai sir check kar lijiye'],
    ['Cooperate with the check.', 'Here is my bag = "ye mera bag hai". Sir = "sir".'],
    ['ठीक है, सब ठीक निकला। किताबें ही किताबें, अफ़सरी की तैयारी?', 'Theek hai, sab theek nikla. Kitaabein hi kitaabein, afsari ki taiyaari?', 'Fine, all in order. Books and books, preparing to be an officer?'],
    ['बैग खोलिए, सिर्फ़ बोलना काफ़ी नहीं।', 'Bag kholiye, sirf bolna kaafi nahi.', 'Open the bag, speaking is not enough.']),
  S('ticket', ['अब टिकट दिखाइए। बिना टिकट अंदर नहीं।', 'Ab ticket dikhaiye. Bina ticket andar nahi.', 'Now show your ticket. No entry without one.'],
    'Show your ticket.', ['Ye raha mera ticket, sir.', 'ये रहा मेरा टिकट, सर।'],
    ['ye lijiye ticket', 'sir ye mera ticket hai', 'paaji ticket ye raha', 'ticket dikha raha hoon sir'],
    ['Show the ticket.', 'Here is my ticket = "ye raha mera ticket".'],
    ['ठीक है, अंदर जाइए। दीवान-ए-आम सीधे हाथ पर है।', 'Theek hai, andar jaiye. Diwan-i-Aam seedhe haath par hai.', 'Okay, go in. The Diwan-i-Aam is on the right.'],
    ['टिकट दिखाइए सर, ज़रा जल्दी।', 'Ticket dikhaiye sir, zara jaldi.', 'Show the ticket, sir, a little quickly.']),
], ['जाइए, शाम को लाइट-एंड-साउंड भी देखिए।', 'Jaiye, shaam ko light-and-sound bhi dekhiye.', 'Go in, do see the light-and-sound show in the evening too.'],
  [['ji sir, ye lijiye mera bag', 'yes sir, here is my bag'], ['ye raha mera ticket, sir', 'here is my ticket, sir']], ['सर, फिर आए? इस बार टिकट रख लिया?', 'Sir, phir aaye? Is baar ticket rakh liya?', 'Sir, back again? Did you keep your ticket this time?'], 2);

export const palaceUsher = P('taj-bellboy', 'Mushtaq Guide', 'Red Fort licensed guide', 'Red Fort, Lahori Gate entrance', 'm', 'Bargain his fee and ask about Lahori Gate.', [
  S('fee', ['हिस्ट्री सिर्फ़ तीन सौ रुपये में, सर! पूरा क़िला दिखाऊँगा।', 'History sirf teen sau rupaye mein, sir! Poora qila dikhaunga.', 'History for only three hundred, sir! I will show the whole fort.'],
    'Say three hundred is too much, ask for less.', ['Teen sau bahut zyada hai, kam kijiye.', 'तीन सौ बहुत ज़्यादा है, कम कीजिए।'],
    ['teen sau zyada hai kuch kam karo', 'guide ka rate kam kijiye sir', 'paaji teen sau bahut hai kam karo', 'dedh sau mein ho jaaye kya'],
    ['Bargain politely.', 'Too much = "bahut zyada". Reduce = "kam kijiye".'],
    ['अच्छा, पढ़ने वाले हो। दो सौ पचास, आख़िरी रेट।', 'Accha, padhne wale ho. Do sau pachaas, aakhiri rate.', 'Alright, you are a student. Two-fifty, final rate.'],
    ['रेट की बात है ना? फिर से बोलिए।', 'Rate ki baat hai na? Phir se boliye.', 'About the rate, right? Say it again.']),
  S('gate', ['चलिए, बताइए, सबसे पहले क्या जानना चाहेंगे?', 'Chaliye, bataiye, sabse pehle kya jaanna chahenge?', 'Come, tell me, what would you like to know first?'],
    'Say you want to know about Lahori Gate.', ['Mujhe Lahori Gate ke baare mein jaanna hai.', 'मुझे लाहौरी गेट के बारे में जानना है।'],
    ['lahori gate ka itihaas bataiye', 'lahori gate ke baare mein batao', 'sir pehle lahori gate dikhaiye', 'mujhe is gate ki kahani sunao'],
    ['Pick a topic.', 'I want to know = "jaanna hai". About = "ke baare mein".'],
    ['बढ़िया चुना! ये गेट लाहौर की तरफ़ मुँह किए खड़ा है, इसीलिए ये नाम।', 'Badhiya chuna! Ye gate Lahore ki taraf munh kiye khada hai, isiliye ye naam.', 'Good pick! This gate faces Lahore, hence the name.'],
    ['कौन-सा गेट? साफ़ बोलिए।', 'Kaun-sa gate? Saaf boliye.', 'Which gate? Say clearly.']),
], ['तो चलिए, हिस्ट्री का सफ़र शुरू करें!', 'Toh chaliye, history ka safar shuru karen!', 'So let us begin the journey through history!'],
  [['teen sau bahut zyada hai, kam kijiye', 'three hundred is too much, reduce it'], ['mujhe Lahori Gate ke baare mein jaanna hai', 'I want to know about Lahori Gate']], ['सर, आज पूरा क़िला दिखा दूँ?', 'Sir, aaj poora qila dikha dun?', 'Sir, shall I show you the whole fort today?'], 2);

export const touristA = P('gateway-tourist-a', 'Tom', 'foreign tourist', 'India Gate steps, by the arch', 'm', 'Tell him what India Gate is.', [
  S('arch', 'Hi! Could you tell me what this big arch is for?',
    'Explain that it is a war memorial.', 'It is a war memorial built to remember soldiers.',
    ['it is a war memorial', 'the arch remembers soldiers', 'it honours soldiers who died', 'a memorial for soldiers', 'It is a memorial for soldiers'],
    ['Say what it is.', 'It is a war memorial.'],
    'Ah, that is moving. Thank you for telling me.', 'Sorry, I did not catch that. What is it?'),
], 'Thanks, that really helps. Enjoy your day!', [['it is a war memorial', 'explaining a landmark in English']], 'Hello again! I took lots of photos of the arch.', 1, 'en');

export const touristB = P('gateway-tourist-b', 'Frank', 'foreign tourist', 'India Gate steps, by the arch', 'm', 'Tell him how to reach the boat club.', [
  S('boats', 'Excuse me, which way to the boat club? I want a paddle boat.',
    'Say to walk straight past the lawns to the water.', 'Walk straight past the lawns, you will see the water.',
    ['walk straight past the lawns', 'go straight to the water', 'the boat club is past the lawns', 'follow the path to the jetty', 'Walk straight to the water'],
    ['Give directions.', 'Straight past the lawns to the water.'],
    'Great, thanks very much, I will go there now!', 'Sorry, could you repeat the directions?'),
], 'Cheers, you have been very kind!', [['walk straight past the lawns', 'giving directions in English']], 'Hi again! The paddle boat was great fun.', 1, 'en');

export const danaSeller = P('gateway-dana-seller', 'Kamla', 'bird-feed (dana) seller', 'India Gate steps, pigeon-feeding mat', 'f', 'Buy a bowl of dana and feed the pigeons.', [
  S('dana', ['दाना, दाना! पक्षियों को खिलाओ, पुण्य कमाओ।', 'Dana, dana! Pakshiyon ko khilao, punya kamao.', 'Bird feed, bird feed! Feed the pigeons, earn some merit.'],
    'Ask for a bowl of dana for ten rupees.', ['Ek katori dana dena, das rupaye ka.', 'एक कटोरी दाना देना, दस रुपये का।'],
    ['das rupaye ka dana dena', 'ek katori dana de do', 'mataji dana dijiye', 'dana chahiye kabootaron ke liye'],
    ['Buy bird feed.', 'A bowl = "ek katori". Ten rupees worth = "das rupaye ka".'],
    ['लो बेटा, बिखेर दो। देखो कैसे उतर आए सारे!', 'Lo beta, bikher do. Dekho kaise utar aaye saare!', 'Take it beta, scatter it. See how they all come down!'],
    ['कितने का दाना? ज़ोर से बोलो बेटा।', 'Kitne ka dana? Zor se bolo beta.', 'Worth how much? Speak up, beta.']),
  S('feed', ['हाथ फैलाकर रखो तो कबूतर हथेली पर आ जाएँगे।', 'Haath phailakar rakho toh kabootar hatheli par aa jaayenge.', 'Hold out your hand and the pigeons will land on your palm.'],
    'Say you are a little scared but will try.', ['Thoda darr lagta hai, par koshish karunga.', 'थोड़ा डर लगता है, पर कोशिश करूँगा।'],
    ['thoda dar lag raha hai par karunga', 'koshish karta hoon mataji', 'main haath phailata hoon dar toh hai', 'dar lagta hai par try karunga'],
    ['Be honest and brave.', 'A little scared = "thoda darr". I will try = "koshish karunga".'],
    ['शाबाश! देखो, एक आ गया हथेली पर। गुदगुदी हुई ना?', 'Shabaash! Dekho, ek aa gaya hatheli par. Gudgudi hui na?', 'Well done! Look, one landed on your palm. Ticklish, right?'],
    ['डरो मत, बोलो न क्या हुआ?', 'Daro mat, bolo na kya hua?', 'Do not be scared, tell me what happened?']),
], ['जाओ बेटा, भगवान तुम्हें सफलता दें।', 'Jao beta, Bhagwan tumhe safalta den.', 'Go beta, may God grant you success.'],
  [['ek katori dana dena, das rupaye ka', 'give me a bowl of dana worth ten rupees'], ['thoda darr lagta hai, par koshish karunga', 'I am a little scared but will try']], ['बेटा, कबूतर तुम्हें याद कर रहे थे!', 'Beta, kabootar tumhe yaad kar rahe the!', 'Beta, the pigeons were missing you!'], 2);

export const roadTourist = P('gateway-road-tourist', 'Ingrid', 'foreign tourist', 'India Gate Road, on the way to the river', 'f', 'Tell her the river is a short walk ahead.', [
  S('river', 'Excuse me, is it far to the river from here?',
    'Say it is a ten-minute walk straight ahead.', 'No, it is a ten-minute walk straight ahead.',
    ['it is a ten minute walk', 'not far, just straight ahead', 'go straight for ten minutes', 'the river is close by', 'It is ten minutes straight ahead'],
    ['Tell her the distance.', 'Say ten minutes, straight ahead.'],
    'Wonderful, thank you! I will walk then.', 'Sorry, how far did you say?'),
], 'Thank you so much, have a great day!', [['it is a ten-minute walk straight ahead', 'giving distance in English']], 'Hello again! I found the river, it was lovely.', 1, 'en');

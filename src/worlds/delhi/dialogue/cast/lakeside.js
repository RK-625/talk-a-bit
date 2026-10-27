// The India Gate lawns: golgappe stall, corn and coconut carts, the horse ride, the rangoli patch, the families by the water.
import { P, step as S } from '../kit.js';

export const corn = P('juhu-pavbhaji-cook', 'Chhotu Bhaiya', 'golgappe stall cook', 'India Gate lawns, golgappe stall', 'q', 'Try his mint water and praise it.', [
  S('try', ['आज ख़ास पुदीने का पानी बनाया है। चखोगे?', 'Aaj khaas pudine ka paani banaya hai. Chakhoge?', 'I made special mint water today. Will you taste it?'],
    'Say yes, you will taste it.', ['Haan bhaiya, thoda chakh ke dekhta hoon.', 'हाँ भैया, थोड़ा चख के देखता हूँ।'],
    ['haan chakhta hoon bhaiya', 'zaroor pudine wala paani dena', 'oye haan ek puri dena chakhne ko', 'thoda sa chakh lete hain'],
    ['Say yes to tasting.', 'I will taste = "chakh ke dekhta hoon". A little = "thoda".'],
    ['ये ले पहली! पूरी मुँह में डाल, बीच में मत तोड़ना।', 'Ye le pehli! Poori munh mein daal, beech mein mat todna.', 'Here is the first! Put it whole in your mouth, do not break it.'],
    ['चखेगा या नहीं? पानी ख़त्म हो रहा है।', 'Chakhega ya nahi? Paani khatam ho raha hai.', 'Will you taste or not? The water is running out.']),
  S('praise', ['कैसा लगा पुदीने का पानी?', 'Kaisa laga pudine ka paani?', 'How did you like the mint water?'],
    'Praise it, it is very tangy.', ['Bahut zabardast hai, ekdum chatpata!', 'बहुत ज़बरदस्त है, एकदम चटपटा!'],
    ['kamaal ka hai bhaiya chatpata', 'bahut tasty hai pudine wala', 'oye kya swaad hai', 'ekdum mast hai ye paani'],
    ['Say it tastes great.', 'Awesome = "zabardast". Tangy = "chatpata".'],
    ['हे हे! पेपर के बाद सबसे पहले मेरे यहाँ आना, पार्टी!', 'He he! Paper ke baad sabse pehle mere yahan aana, party!', 'He he! After the exam come to me first, party!'],
    ['स्वाद बता भाई, मुँह मत बना।', 'Swaad bata bhai, munh mat bana.', 'Tell me the taste, brother, do not make faces.']),
], ['अगली बार इमली का पानी भी चखाऊँगा।', 'Agli baar imli ka paani bhi chakhaunga.', 'Next time I will let you taste tamarind water too.'],
  [['thoda chakh ke dekhta hoon', 'I will taste a little'], ['bahut zabardast hai, chatpata', 'very awesome and tangy']], ['आ गया चखने वाला! पानी तैयार है।', 'Aa gaya chakhne wala! Paani taiyaar hai.', 'The taster has come! The water is ready.'], 2);

export const bhutta = P('juhu-bhutta-seller', 'Mohan', 'roasted-corn seller', 'India Gate lawns, corn cart', 'm', 'Ask for corn with salt, chilli and lemon.', [
  S('masala', ['भुट्टा नमक-मिर्च लगाऊँ या सिर्फ़ नींबू?', 'Bhutta namak-mirch lagaun ya sirf nimbu?', 'Shall I rub salt and chilli on the corn, or only lemon?'],
    'Ask for salt, chilli and lemon.', ['Namak, mirch aur nimbu, teeno laga do.', 'नमक, मिर्च और नींबू, तीनों लगा दो।'],
    ['teeno laga do bhaiya', 'namak mirch nimbu sab daal do', 'paaji teeno pa do', 'sab kuch laga do bhutte par'],
    ['Say what to put on.', 'Salt = "namak", chilli = "mirch", lemon = "nimbu".'],
    ['वाह! सारे मसाले, देखना कैसा चटकारा आएगा!', 'Wah! Saare masale, dekhna kaisa chatkaara aayega!', 'Wow! All the spices, see what a zing it gives!'],
    ['क्या लगाऊँ भुट्टे पर? धुएँ में सुनाई नहीं दिया।', 'Kya lagaun bhutte par? Dhuein mein sunai nahi diya.', 'What shall I put on it? I could not hear in the smoke.']),
], ['गरम गरम खाओ, ठंडा हो जाए तो मज़ा नहीं।', 'Garam garam khao, thanda ho jaaye toh maza nahi.', 'Eat it piping hot, it is no fun when cold.'],
  [['namak, mirch aur nimbu laga do', 'put on salt, chilli and lemon']], ['अरे भैया, आज भुट्टा बहुत मीठा है!', 'Arre bhaiya, aaj bhutta bahut meetha hai!', 'Hey brother, the corn is very sweet today!'], 1);

export const coconutCart = P('juhu-coconut-seller', 'Babu Lal', 'coconut-water seller', 'India Gate lawns, coconut cart', 'm', 'Order a coconut with malai and a straw.', [
  S('order', ['नारियल पानी! सीधे पेड़ से, बिल्कुल ताज़ा!', 'Nariyal paani! Seedhe ped se, bilkul taaza!', 'Coconut water! Straight from the tree, totally fresh!'],
    'Ask for a coconut with soft malai.', ['Bhaiya, malai wala nariyal dena.', 'भैया, मलाई वाला नारियल देना।'],
    ['malai wala nariyal dena bhaiya', 'ek nariyal pani malai ke saath', 'paaji malai wala nariyal de do', 'ek nariyal chahiye malai wala'],
    ['Ask for a coconut and say malai.', 'Coconut = "nariyal". With cream = "malai wala".'],
    ['लो, एक चॉप में खोल दिया! अंदर मलाई मोटी है।', 'Lo, ek chop mein khol diya! Andar malai moti hai.', 'Here, opened with one chop! The cream inside is thick.'],
    ['कौन-सा नारियल, भैया? शोर बहुत है।', 'Kaun-sa nariyal, bhaiya? Shor bahut hai.', 'Which coconut, brother? It is very noisy.']),
  S('straw', ['स्ट्रॉ डालूँ या सीधे मुँह से पियोगे?', 'Straw daalun ya seedhe munh se piyoge?', 'Shall I put in a straw or will you drink directly?'],
    'Ask for a straw.', ['Straw laga do, aaram se peeta hoon.', 'स्ट्रॉ लगा दो, आराम से पीता हूँ।'],
    ['straw daal do bhaiya', 'oye straw laga do', 'paaji ek straw pa do', 'straw de do aaram se piunga'],
    ['Ask for a straw.', 'Straw = "straw". Put it in = "laga do".'],
    ['ये लो नली। ठंडा-ठंडा पी जाओ, गला तर हो जाएगा।', 'Ye lo nali. Thanda-thanda pi jao, gala tar ho jaayega.', 'Here is the straw. Drink it cool, your throat will be soothed.'],
    ['स्ट्रॉ या सीधे? बोलो भैया।', 'Straw ya seedhe? Bolo bhaiya.', 'Straw or direct? Say, brother.']),
], ['खाली नारियल यहीं छोड़ देना, मैं रख लूँगा।', 'Khaali nariyal yahin chhod dena, main rakh lunga.', 'Leave the empty coconut here, I will keep it.'],
  [['malai wala nariyal dena', 'give me a malai coconut'], ['straw laga do', 'put in a straw']], ['भैया, आज नारियल बहुत बड़े आए हैं!', 'Bhaiya, aaj nariyal bahut bade aaye hain!', 'Brother, the coconuts came very big today!'], 2);

export const cartKid = P('juhu-horse-rider-kid', 'Golu', 'kid on the horse ride', 'India Gate lawns, horse ride', 'k', 'Praise his riding.', [
  S('ride', ['भैया, देखो! मैं घोड़े पर बैठा हूँ, बिल्कुल नहीं डरा!', 'Bhaiya, dekho! Main ghode par baitha hoon, bilkul nahi dara!', 'Brother, look! I sit on a horse and I am not scared at all!'],
    'Tell him he is a real horse rider.', ['Wah chhote, tum toh asli sawaar ho!', 'वाह छोटे, तुम तो असली सवार हो!'],
    ['shabaash tum toh bahut bahadur ho', 'kya baat hai chhote ghudsawar', 'oye chak de golu', 'bahut himmat wala bachcha hai'],
    ['Praise his courage.', 'Real rider = "asli sawaar". You are = "tum ho".'],
    ['हाँ! बड़ा होकर मैं भी पुलिस वाला बनूँगा, घोड़े पर!', 'Haan! Bada hokar main bhi police wala banunga, ghode par!', 'Yes! When I grow up I will be a policeman on a horse!'],
    ['क्या कहा भैया? घोड़ा हिनहिना रहा है!', 'Kya kaha bhaiya? Ghoda hinhina raha hai!', 'What did you say, brother? The horse is neighing!']),
], ['टाटा भैया! घोड़ा मेरा दोस्त है।', 'Tata bhaiya! Ghoda mera dost hai.', 'Bye, brother! The horse is my friend.'],
  [['tum toh asli sawaar ho', 'you are a real rider']], ['भैया, चलो साथ में सवारी करें!', 'Bhaiya, chalo saath mein sawaari karein!', 'Brother, let us ride together!'], 1);

export const rangoliArtist = P('juhu-sand-artist', 'Anita', 'rangoli artist', 'India Gate lawns, rangoli patch', 'f', 'Admire the rangoli and suggest a colour.', [
  S('admire', ['दिवाली की बड़ी रंगोली बना रही हूँ। कैसी लग रही है?', 'Diwali ki badi rangoli bana rahi hoon. Kaisi lag rahi hai?', 'I am making a big Diwali rangoli. How does it look?'],
    'Say the colours are lovely.', ['Bahut sundar hai, rang kitne chamakdaar hain!', 'बहुत सुंदर है, रंग कितने चमकदार हैं!'],
    ['rang bahut chamakdaar hain didi', 'rangoli kamaal ki hai', 'oye kya baat hai kitni sundar', 'aapne bahut mehnat ki hai'],
    ['Admire the work.', 'Lovely = "sundar". Bright = "chamakdaar".'],
    ['धन्यवाद! घंटों लगे हैं। देखो, ये फूल अभी बाक़ी है।', 'Dhanyavaad! Ghanton lage hain. Dekho, ye phool abhi baaki hai.', 'Thank you! It took hours. Look, this flower is still left.'],
    ['रंग में डूबी थी, फिर से बोलो।', 'Rang mein doobi thi, phir se bolo.', 'I was lost in the colours, say again.']),
  S('colour', ['बीच में कौन-सा रंग भरूँ? पीला या लाल?', 'Beech mein kaun-sa rang bharun? Peela ya laal?', 'Which colour for the centre? Yellow or red?'],
    'Suggest red for the centre.', ['Beech mein laal rang bharo.', 'बीच में लाल रंग भरो।'],
    ['beech mein laal theek rahega', 'laal bhar do didi', 'paaji laal rang pa do', 'lal rang achha lagega'],
    ['Pick a colour.', 'Centre = "beech". Red = "laal".'],
    ['ठीक कहते हो, लाल से कमल दमकेगा। हाथ चलाती हूँ!', 'Theek kehte ho, laal se kamal damkega. Haath chalati hoon!', 'You are right, red will make the lotus glow. Let me start!'],
    ['पीला या लाल, एक चुनिए।', 'Peela ya laal, ek chuniye.', 'Yellow or red, choose one.']),
], ['जाओ भैया, रंगोली पर पैर मत रखना!', 'Jao bhaiya, rangoli par pair mat rakhna!', 'Go, brother, do not step on the rangoli!'],
  [['bahut sundar hai, rang chamakdaar hain', 'it is lovely, bright colours'], ['beech mein laal rang bharo', 'fill red in the centre']], ['आइए, आज रंगोली पूरी हो गई!', 'Aaiye, aaj rangoli poori ho gayi!', 'Come, today the rangoli is complete!'], 2);

export const lakesideKid = P('juhu-gola-kid', 'Tanu', 'lawn kid', 'India Gate lawns, near the stalls', 'k', 'Cheer her jump.', [
  S('jump', ['भैया, देखो मैं कितना ऊँचा कूदी! ऊँऽऽ!', 'Bhaiya, dekho main kitna ooncha koodi! Oonn!', 'Brother, see how high I jumped! Hup!'],
    'Say she is a champion.', ['Wah Tanu, tum toh champion ho!', 'वाह तनु, तुम तो चैंपियन हो!'],
    ['shabaash tanu bahut ooncha kooda', 'kamaal kar diya tanu', 'oye chak de beta', 'tum toh sabse upar kood gayi'],
    ['Cheer her.', 'Champion = "champion". You are = "tum ho".'],
    ['हे हे! अब मैं और ऊँचा कूदूँगी, गिनो!', 'He he! Ab main aur ooncha koodungi, gino!', 'He he! Now I will jump higher, count!'],
    ['ताली बजाओ ना भैया! कुछ बोलो!', 'Taali bajao na bhaiya! Kuch bolo!', 'Clap, brother! Say something!']),
], ['बाय बाय भैया! मैं घास पर भागती हूँ।', 'Bye bye bhaiya! Main ghaas par bhaagti hoon.', 'Bye bye, brother! I am off to run on the grass.'],
  [['tum toh champion ho', 'you are a champion']], ['भैया, देखो आज और ऊँचा कूदी!', 'Bhaiya, dekho aaj aur ooncha koodi!', 'Brother, look, I jumped even higher today!'], 1);

export const cornDiner = P('juhu-pavbhaji-diner-1', 'Sumit', 'man eating golgappe', 'India Gate lawns, golgappe stool', 'q', 'Hand him water because the golgappe is too spicy.', [
  S('spicy', ['आह! बहुत तीखा! आँखों में पानी आ गया!', 'Aah! Bahut teekha! Aankhon mein paani aa gaya!', 'Aah! So spicy! Tears have come to my eyes!'],
    'Offer him water and tell him to go slow.', ['Ye lijiye paani, aaram se khaiye.', 'ये लीजिए पानी, आराम से खाइए।'],
    ['ye lo paani aaram se khao', 'paani pi lo bhai', 'oye paani pi le pehle', 'thoda meetha khaa lo'],
    ['Be kind, offer water.', 'Here you are = "ye lijiye". Slowly = "aaram se".'],
    ['थैंक्स भाई! तू तो बच्चा-सा सीधा निकला, एक पूरी तू भी खा!', 'Thanks bhai! Tu toh bachche-sa seedha nikla, ek poori tu bhi kha!', 'Thanks bro! You are so sweet, have one puri too!'],
    ['आँसू पोंछ रहा हूँ, फिर से बोलो।', 'Aansoo ponchh raha hoon, phir se bolo.', 'I am wiping my tears, say again.']),
], ['अब मैं मीठी पूरी खाऊँगा, तीखी से तौबा!', 'Ab main meethi poori khaunga, teekhi se tauba!', 'Now I will have a sweet puri, no more spicy ones!'],
  [['ye lijiye paani, aaram se khaiye', 'here is water, eat slowly']], ['अरे भाई, आज मीठा खाया है मैंने!', 'Arre bhai, aaj meetha khaya hai maine!', 'Hey bro, I ate sweet today!'], 1);

export const cartman = P('juhu-horse-handler', 'Sardar Jaspal Singh', 'horse handler', 'India Gate lawns, horse ride', 'o', 'Tell him you are not scared and ask him to go slow.', [
  S('slow', ['घोड़ा बहुत सीधा है, पुत्तर। बैठो, डरना नहीं।', 'Ghoda bahut seedha hai, puttar. Baitho, darna nahi.', 'The horse is very gentle, puttar. Sit, do not be scared.'],
    'Say you are not scared, but ask him to go slow.', ['Mujhe dar nahi lagta, bas dheere chalana.', 'मुझे डर नहीं लगता, बस धीरे चलाना।'],
    ['dar nahi lagta paaji dheere chalana', 'bas hole hole le jaana', 'paaji main nahi darta slow chalao', 'dheere chalana ji bas'],
    ['Say you are brave but want slow.', 'I am not scared = "mujhe dar nahi lagta". Slowly = "dheere".'],
    ['शाबाश शेरा! ले, लगाम पकड़ और सीधा बैठ।', 'Shabaash shera! Le, lagaam pakad aur seedha baith.', 'Well done, lion! Take the reins and sit straight.'],
    ['घोड़ा तो नहीं डरता, तू डरता है? साफ़ बोल।', 'Ghoda toh nahi darta, tu darta hai? Saaf bol.', 'The horse is not afraid, are you? Say it clearly.']),
], ['चक्कर पूरा हुआ। नीचे उतर जा पुत्तर।', 'Chakkar poora hua. Neeche utar ja puttar.', 'The round is complete. Get down, puttar.'],
  [['mujhe dar nahi lagta, bas dheere chalana', 'I am not scared, just go slow']], ['आ जा शेरा, घोड़ा तेरा इंतज़ार कर रहा था!', 'Aa ja shera, ghoda tera intezaar kar raha tha!', 'Come lion, the horse was waiting for you!'], 1);

export const familyMom = P('juhu-family-mom', 'Poonam', 'mother, lawn family', 'India Gate lawns, near the water', 'f', 'Point her to water and snacks.', [
  S('snack', ['बच्चे को भूख लगी है। यहाँ कुछ खाने को मिलेगा?', 'Bachche ko bhookh lagi hai. Yahan kuch khaane ko milega?', 'The child is hungry. Will we find something to eat here?'],
    'Tell her golgappe and corn are nearby.', ['Haan, paas mein golgappe aur bhutta milte hain.', 'हाँ, पास में गोलगप्पे और भुट्टा मिलते हैं।'],
    ['wahan golgappe aur bhutta hai', 'aunty paas mein stall hain', 'paaji sab kuch paas milta hai', 'bhutta aur golgappe wahan milenge'],
    ['Point her to snacks.', 'Nearby = "paas mein". You get = "milte hain".'],
    ['अच्छा, थैंक्स बेटा! बच्चे को भुट्टा ही दिलाऊँगी।', 'Accha, thanks beta! Bachche ko bhutta hi dilaungi.', 'Good, thanks beta! I will get the child corn.'],
    ['कहाँ मिलेगा? ज़रा सही से बताओ।', 'Kahaan milega? Zara sahi se batao.', 'Where will we get it? Tell me properly.']),
  S('water', ['और पीने का ठंडा पानी कहाँ से लें?', 'Aur peene ka thanda paani kahaan se len?', 'And where do we get cold drinking water?'],
    'Say the stall by the gate has cold bottles.', ['Gate ke paas wale stall par thandi bottle milti hai.', 'गेट के पास वाले स्टॉल पर ठंडी बोतल मिलती है।'],
    ['gate ke paas thandi bottle milegi', 'wahan stall par thanda paani hai', 'paaji udhar pani ki bottle milegi', 'gate ke stall se le lijiye'],
    ['Direct her to the water stall.', 'Cold bottle = "thandi bottle". Near the gate = "gate ke paas".'],
    ['वाह, बहुत शुक्रिया! तुम तो बड़े मददगार हो।', 'Wah, bahut shukriya! Tum toh bade madadgaar ho.', 'Great, many thanks! You are very helpful.'],
    ['पानी कहाँ से मिलेगा? फिर बताओ।', 'Paani kahaan se milega? Phir batao.', 'Where do we get water? Tell me again.']),
], ['चलो बच्चे, भुट्टा खाते हैं। थैंक्स भैया!', 'Chalo bachche, bhutta khaate hain. Thanks bhaiya!', 'Come child, let us have corn. Thanks brother!'],
  [['paas mein golgappe aur bhutta milte hain', 'golgappe and corn are nearby'], ['thandi bottle milti hai', 'cold bottles are available']], ['अरे भैया, आपने तो बहुत मदद की थी!', 'Arre bhaiya, aapne toh bahut madad ki thi!', 'Oh brother, you helped us a lot!'], 2);

export const familyDad = P('juhu-family-dad', 'Naresh', 'father, lawn family', 'India Gate lawns, near the water', 'm', 'Suggest what his family should eat.', [
  S('eat', ['क्या खाएँ, समझ नहीं आ रहा। आप ही बताओ ना?', 'Kya khaayein, samajh nahi aa raha. Aap hi batao na?', 'We cannot decide what to eat. You tell us, will you?'],
    'Suggest chole kulche and kulfi.', ['Chole kulche aur kulfi zaroor khaiye.', 'छोले कुलचे और कुल्फ़ी ज़रूर खाइए।'],
    ['chole kulche aur kulfi khao', 'aap chole kulche lijiye', 'paaji chole kulche te kulfi', 'kulfi aur chole kulche try karo'],
    ['Recommend something.', 'You must eat = "zaroor khaiye". And = "aur".'],
    ['बढ़िया सुझाव! बच्चे ख़ुश हो जाएँगे। थैंक्स भाई।', 'Badhiya sujhaav! Bachche khush ho jaayenge. Thanks bhai.', 'Great suggestion! The kids will be happy. Thanks brother.'],
    ['क्या खाएँ, यही तो पूछा है। बताइए!', 'Kya khaayein, yahi toh puchha hai. Bataiye!', 'What to eat, that is what I asked. Tell me!']),
], ['चलो परिवार, आज दावत है!', 'Chalo parivaar, aaj daawat hai!', 'Come family, it is a feast today!'],
  [['chole kulche aur kulfi zaroor khaiye', 'do eat chole kulche and kulfi']], ['भाई साहब, आपकी बात पर चले थे, मज़ा आया!', 'Bhai sahab, aapki baat par chale the, maza aaya!', 'Brother, we followed your advice and had fun!'], 1);

export const familyKid = P('juhu-family-kid', 'Nikhil', 'child, lawn family', 'India Gate lawns, near the water', 'k', 'Help him look for the lost ball.', [
  S('ball', ['भैया, मेरी गेंद घास में गुम हो गई! ढूँढ दो ना।', 'Bhaiya, meri gend ghaas mein gum ho gayi! Dhoondh do na.', 'Brother, my ball got lost in the grass! Help me find it.'],
    'Say you will search for the ball together.', ['Chalo, saath mein dhoondhte hain.', 'चलो, साथ में ढूँढते हैं।'],
    ['chalo gend dhoondhte hain', 'tension mat le mil jaayegi', 'oye chal saath chal dhoondh lete hain', 'main bhi dhoondhta hoon'],
    ['Offer to help.', 'Let us search = "dhoondhte hain". Together = "saath mein".'],
    ['ये रही! झाड़ी के पीछे थी। थैंक्यू भैया!', 'Ye rahi! Jhaadi ke peeche thi. Thank you bhaiya!', 'Here it is! It was behind the bush. Thank you, brother!'],
    ['मदद करोगे या नहीं? गेंद खो गई है!', 'Madad karoge ya nahi? Gend kho gayi hai!', 'Will you help or not? The ball is lost!']),
], ['अब मैं गेंद पकड़कर रखूँगा, कभी नहीं खोऊँगा!', 'Ab main gend pakadkar rakhunga, kabhi nahi khounga!', 'Now I will hold the ball tight, never lose it!'],
  [['chalo, saath mein dhoondhte hain', 'come, let us search together']], ['भैया, इस बार गेंद ऊपर गई!', 'Bhaiya, is baar gend upar gayi!', 'Brother, this time the ball went up!'], 1);

export const lifeguard = P('juhu-lifeguard', 'Sher Singh', 'boat-club safety guard', 'India Gate lawns, water\'s edge', 'm', 'Promise to keep safe near the water.', [
  S('edge', ['किनारे से आगे मत जाना, गहरा पानी है, भाई।', 'Kinaare se aage mat jaana, gehra paani hai, bhai.', 'Do not go past the edge, the water is deep, brother.'],
    'Promise to stay near the edge.', ['Theek hai, main kinaare par hi rahunga.', 'ठीक है, मैं किनारे पर ही रहूँगा।'],
    ['main kinaare par hi rahunga', 'ji sir aage nahi jaunga', 'paaji main door hi rahunga', 'theek hai kinaare ke paas hoon'],
    ['Promise to stay safe.', 'I will stay at the edge = "kinaare par rahunga".'],
    ['शाबाश! और बच्चों को भी पानी से दूर रखना।', 'Shabaash! Aur bachchon ko bhi paani se door rakhna.', 'Well done! And keep the children away from the water too.'],
    ['सीटी की आवाज़ में सुना नहीं, फिर से कहो।', 'Seeti ki awaaz mein suna nahi, phir se kaho.', 'I could not hear over the whistle, say again.']),
  S('whistle', ['और जब मैं सीटी बजाऊँ, फ़ौरन बाहर आ जाना।', 'Aur jab main seeti bajaun, fauran bahar aa jaana.', 'And when I blow the whistle, come out at once.'],
    'Promise to come out when he whistles.', ['Haan, seeti sunte hi bahar aa jaunga.', 'हाँ, सीटी सुनते ही बाहर आ जाऊँगा।'],
    ['seeti sunte hi bahar aaunga', 'ji sir seeti par nikal jaunga', 'haan paaji seeti bajte hi aa jaunga', 'pakka seeti sunkar bahar aa jaunga'],
    ['Promise to listen.', 'As soon as I hear the whistle = "seeti sunte hi".'],
    ['वाह! ऐसे ही सब लोग सुन लें तो मेरी छुट्टी हो जाए!', 'Wah! Aise hi sab log sun lein toh meri chhutti ho jaaye!', 'Wow! If everybody listened like this I could go on leave!'],
    ['पक्का वादा करो, बस सिर मत हिलाओ।', 'Pakka vaada karo, bas sir mat hilao.', 'Make a firm promise, do not just nod.']),
], ['जाओ भाई, मौज करो पर सँभलकर।', 'Jao bhai, mauj karo par sambhalkar.', 'Go brother, enjoy but carefully.'],
  [['main kinaare par hi rahunga', 'I will stay at the edge'], ['seeti sunte hi bahar aa jaunga', 'I will come out when I hear the whistle']], ['अरे भाई, वापस आ गए? आज पानी शांत है।', 'Arre bhai, waapas aa gaye? Aaj paani shaant hai.', 'Hey brother, you are back? The water is calm today.'], 2);

export const ballTeen = P('juhu-road-ball-teen', 'Kartik', 'teen with a football', 'road to the lawns', 'q', 'Say you will play tomorrow as you have to study now.', [
  S('play', ['भैया, फ़ुटबॉल खेलोगे? टीम पूरी नहीं हो रही।', 'Bhaiya, football khelonge? Team poori nahi ho rahi.', 'Brother, will you play football? We are short of a player.'],
    'Say you must study now but will play tomorrow.', ['Abhi padhna hai, kal zaroor khelunga.', 'अभी पढ़ना है, कल ज़रूर खेलूँगा।'],
    ['abhi padhna hai kal pakka', 'kal khelunga bhai abhi nahi', 'oye abhi nahi kal pakka', 'aaj padhai hai kal aaunga'],
    ['Decline and promise tomorrow.', 'Now = "abhi". Tomorrow = "kal".'],
    ['ठीक है भैया, कोई बात नहीं। कल पक्का, बिना बहाने के!', 'Theek hai bhaiya, koi baat nahi. Kal pakka, bina bahaane ke!', 'Okay brother, no problem. Tomorrow for sure, no excuses!'],
    ['खेलोगे या नहीं? हाँ-ना बोलो भैया।', 'Khelonge ya nahi? Haan-na bolo bhaiya.', 'Will you play or not? Say yes or no, brother.']),
], ['मैं तब तक किक की प्रैक्टिस करता हूँ।', 'Main tab tak kick ki practice karta hoon.', 'Meanwhile I will practise my kicks.'],
  [['abhi padhna hai, kal zaroor khelunga', 'I have to study now, I will play tomorrow']], ['भैया, आज तो खेलोगे ना?', 'Bhaiya, aaj toh khelonge na?', 'Brother, will you play today?'], 1);

export const peanutRoad = P('beach-road-peanut-seller', 'Kishan', 'groundnut (moongphali) seller', 'road to the lawns', 'o', 'Buy a packet of peanuts and promise to bin the shells.', [
  S('buy', ['गरम मूँगफली! दस रुपये की एक पुड़िया!', 'Garam moongphali! Das rupaye ki ek pudiya!', 'Hot groundnuts! One packet for ten rupees!'],
    'Ask for one packet with extra salt.', ['Ek pudiya dena, namak zyada.', 'एक पुड़िया देना, नमक ज़्यादा।'],
    ['ek pudiya moongphali dena', 'namak zyada daalna chacha', 'paaji ik pudiya dena', 'das ki moongphali dena'],
    ['Ask for one packet.', 'A packet = "ek pudiya". More salt = "namak zyada".'],
    ['ये ले, गरम है। नमक का चटकारा आएगा!', 'Ye le, garam hai. Namak ka chatkaara aayega!', 'Here, it is hot. It will have a salty zing!'],
    ['कितनी पुड़िया? धुएँ में सुनाई नहीं दिया।', 'Kitni pudiya? Dhuein mein sunai nahi diya.', 'How many packets? I could not hear in the smoke.']),
  S('shells', ['छिलके कहीं भी मत फेंकना, बेटा।', 'Chhilke kahin bhi mat phenkna, beta.', 'Do not throw the shells anywhere, beta.'],
    'Promise to put the shells in the bin.', ['Chhilke kachre ke dabbe mein daalunga.', 'छिलके कचरे के डिब्बे में डालूँगा।'],
    ['dabbe mein hi daalunga chhilke', 'ji chacha kachra phenkunga nahi', 'paaji dustbin mein dalunga', 'haan chhilke bin mein daalunga'],
    ['Promise to be clean.', 'Shells = "chhilke". In the dustbin = "kachre ke dabbe mein".'],
    ['शाबाश! सब तुम्हारे जैसे हों तो दिल्ली चमक जाए।', 'Shabaash! Sab tumhare jaise hon toh Dilli chamak jaaye.', 'Well done! If everyone were like you Delhi would shine.'],
    ['बोलो पक्का, कचरा कहाँ डालोगे?', 'Bolo pakka, kachra kahaan daaloge?', 'Say it firmly, where will you put the waste?']),
], ['चल बेटा, मूँगफली चबाता जा।', 'Chal beta, moongphali chabata ja.', 'Go beta, munch your peanuts.'],
  [['ek pudiya dena, namak zyada', 'one packet, more salt'], ['chhilke kachre ke dabbe mein daalunga', 'I will put the shells in the bin']], ['आ गया बेटा? आज और गरम है!', 'Aa gaya beta? Aaj aur garam hai!', 'You are here, beta? It is even hotter today!'], 2);

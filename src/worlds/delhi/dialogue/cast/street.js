// The ten ordinary Dilli-walas standing about on the open ground.
import { P, step as S } from '../kit.js';

export const street1 = P('street-1', 'Vishal', 'Dilliwala waiting for a friend', 'open ground', 'q', 'Calm him down and share a chai.', [
  S('late', ['यार, दोस्त आधे घंटे से लेट है! फ़ोन भी नहीं उठा रहा।', 'Yaar, dost aadhe ghante se late hai! Phone bhi nahi utha raha.', 'Man, my friend is half an hour late! He is not picking up the phone.'],
    'Tell him not to worry, the friend will come.', ['Tension mat lo, wo aa hi raha hoga.', 'टेंशन मत लो, वो आ ही रहा होगा।'],
    ['tension mat le aa jaayega', 'koi na yaar thodi der aur ruk', 'oye aa raha hoga wo', 'sabr kar lo wo pahunch jaayega'],
    ['Reassure him.', 'Do not worry = "tension mat lo". He must be coming = "aa raha hoga".'],
    ['सही कहा! वैसे तुम्हारे पास टाइम है तो चाय चलेगी?', 'Sahi kaha! Waise tumhare paas time hai toh chai chalegi?', 'Well said! If you have time, shall we have a chai?'],
    ['माफ़ करना, मैं फ़ोन देख रहा था।', 'Maaf karna, main phone dekh raha tha.', 'Sorry, I was looking at my phone.']),
  S('chai', ['बिट्टू भैया की चाय पिएँ? मेरी तरफ़ से।', 'Bittu bhaiya ki chai piyen? Meri taraf se.', 'Shall we have Bittu bhaiya\'s chai? On me.'],
    'Say yes, you will join him for chai.', ['Chalo, main bhi saath chai pi leta hoon.', 'चलो, मैं भी साथ चाय पी लेता हूँ।'],
    ['haan chalo chai peete hain', 'zaroor main bhi chalta hoon', 'oye chalo adrak wali chai', 'theek hai ek chai ho jaaye'],
    ['Accept the invitation.', 'Let us go = "chalo". I will drink with you = "saath chai pi leta hoon".'],
    ['ये हुई बात! चल, दो अदरक वाली बोलते हैं।', 'Ye hui baat! Chal, do adrak wali bolte hain.', 'That is the spirit! Come, let us order two ginger chais.'],
    ['चाय के लिए हाँ है या ना? बता दो।', 'Chai ke liye haan hai ya na? Bata do.', 'Yes or no to chai? Let me know.']),
], ['चल, दोस्त का इंतज़ार चाय के साथ आसान हो गया।', 'Chal, dost ka intezaar chai ke saath aasaan ho gaya.', 'Waiting for my friend got easier with chai.'],
  [['tension mat lo, wo aa hi raha hoga', 'do not worry, he must be coming'], ['main bhi saath chai pi leta hoon', 'I will have chai along with you']], ['अरे भाई! दोस्त आ गया, थैंक्स।', 'Arre bhai! Dost aa gaya, thanks.', 'Hey brother! My friend came, thanks.'], 2);

export const street2 = P('street-2', 'Pooja', 'Dilliwali watching the world go by', 'open ground', 'f', 'Agree that Delhi has changed.', [
  S('change', ['दिल्ली कितनी बदल गई है ना? हर तरफ़ मेट्रो!', 'Dilli kitni badal gayi hai na? Har taraf metro!', 'Delhi has changed so much, right? Metro everywhere!'],
    'Agree, the metro made travel easy.', ['Haan, metro ne safar aasaan kar diya.', 'हाँ, मेट्रो ने सफ़र आसान कर दिया।'],
    ['sach hai metro ne sab aasaan kiya', 'haan ji ab har jagah metro hai', 'oye metro toh kamaal hai', 'bilkul metro se safar mast hai'],
    ['Agree with her.', 'The metro made it easy = "metro ne aasaan kar diya".'],
    ['सही कहा। पहले बस के धक्के खाने पड़ते थे, अब आराम से बैठकर पढ़ सकते हो।', 'Sahi kaha. Pehle bus ke dhakke khaane padte the, ab aaram se baithkar padh sakte ho.', 'True. Earlier we endured bus jostles, now you can sit and read.'],
    ['धीरे बोलिए, मैं भीड़ देख रही थी।', 'Dheere boliye, main bheed dekh rahi thi.', 'Speak slowly, I was watching the crowd.']),
], ['ठीक है, मैं यहीं खड़ी होकर दिल्ली देखती हूँ।', 'Theek hai, main yahin khadi hokar Dilli dekhti hoon.', 'Okay, I will stand here and watch Delhi.'],
  [['metro ne safar aasaan kar diya', 'the metro made travel easy']], ['आप फिर आए? आज भी वही भीड़!', 'Aap phir aaye? Aaj bhi wahi bheed!', 'You came again? The same crowd today!'], 1);

export const street3 = P('street-3', 'Armaan', 'Dilliwala teen telling a story', 'open ground', 'k', 'React with surprise to his phone story.', [
  S('phone', ['भैया, कल मेरा मोबाइल बस में गिर गया था!', 'Bhaiya, kal mera mobile bus mein gir gaya tha!', 'Brother, my mobile fell in the bus yesterday!'],
    'Ask if he got it back.', ['Arre, phir mila ya nahi?', 'अरे, फिर मिला या नहीं?'],
    ['mila ya nahi phir', 'phone wapas mila kya', 'oye phir kya hua', 'toh mil gaya kya phone'],
    ['Ask what happened.', 'Did you get it = "mila ya nahi". Then = "phir".'],
    ['हाँ! कंडक्टर भैया ने अगले स्टॉप पर लौटा दिया।', 'Haan! Conductor bhaiya ne agle stop par lauta diya.', 'Yes! The conductor brother returned it at the next stop.'],
    ['क्या पूछा? मैं हाथ हिला-हिलाकर कहानी सुना रहा था।', 'Kya puchha? Main haath hila-hilakar kahaani suna raha tha.', 'What did you ask? I was waving my hands telling the story.']),
  S('moral', ['देखा, दिल्ली में अच्छे लोग भी हैं!', 'Dekha, Dilli mein achhe log bhi hain!', 'See, there are good people in Delhi too!'],
    'Agree: good people are still around.', ['Sahi kaha, achhe log abhi bhi hain.', 'सही कहा, अच्छे लोग अभी भी हैं।'],
    ['haan achhe log bhi hain duniya mein', 'bilkul insaaniyat abhi zinda hai', 'oye sahi baat hai bhai', 'sach hai achhe log hain'],
    ['Agree warmly.', 'Good people = "achhe log". Still = "abhi bhi".'],
    ['हाँ ना! मैं भी बड़ा होकर कंडक्टर वाला काम करूँगा!', 'Haan na! Main bhi bada hokar conductor wala kaam karunga!', 'Yes! When I grow up I will do the conductor\'s job too!'],
    ['मेरी बात पर कुछ तो बोलो भैया।', 'Meri baat par kuch toh bolo bhaiya.', 'Say something on what I said, brother.']),
], ['अब मैं दोस्तों को ये कहानी सुनाता हूँ। बाय!', 'Ab main doston ko ye kahaani sunata hoon. Bye!', 'Now I will tell this story to my friends. Bye!'],
  [['phir mila ya nahi?', 'did you get it back?'], ['achhe log abhi bhi hain', 'there are still good people']], ['भैया, आज फिर नई कहानी सुनोगे?', 'Bhaiya, aaj phir nayi kahaani sunoge?', 'Brother, will you hear a new story today?'], 2);

export const street4 = P('street-4', 'Mehta Ji', 'Dilliwala elder reading the paper', 'open ground', 'o', 'Agree that talking beats staring at phones.', [
  S('phones', ['आजकल सब फ़ोन में खोए हैं। हमारे ज़माने में लोग बातें करते थे।', 'Aajkal sab phone mein khoye hain. Hamare zamaane mein log baatein karte the.', 'These days everyone is lost in phones. In our time people talked.'],
    'Agree that talking is much nicer.', ['Aap sahi kehte hain, baat karne ka maza alag hai.', 'आप सही कहते हैं, बात करने का मज़ा अलग है।'],
    ['sach hai uncle baatein hi accha hai', 'haan ji baat karna zyada achha lagta hai', 'bilkul sahi kaha aapne', 'baat karne mein hi maza hai'],
    ['Agree with him.', 'You are right = "aap sahi kehte hain". The fun of talking = "baat karne ka maza".'],
    ['वाह! तुम तो समझदार निकले। चलो, बैठकर कुछ बातें करें।', 'Wah! Tum toh samajhdaar nikle. Chalo, baithkar kuch baatein karen.', 'Wow! You turned out wise. Come, let us sit and talk.'],
    ['ज़रा तेज़ बोलो, पेपर की सरसराहट है।', 'Zara tez bolo, paper ki sarsaraahat hai.', 'Speak up, the newspaper is rustling.']),
], ['ठीक है, अब पेपर निपटाता हूँ। तुम अपनी पढ़ाई देखो।', 'Theek hai, ab paper niptata hoon. Tum apni padhai dekho.', 'All right, I finish my paper now. You look to your studies.'],
  [['aap sahi kehte hain, baat karne ka maza alag hai', 'you are right, talking is more fun']], ['आओ बेटा, आज अख़बार में कुछ नया नहीं।', 'Aao beta, aaj akhbaar mein kuch naya nahi.', 'Come, beta, nothing new in the paper today.'], 1);

export const street5 = P('street-5', 'Sachin Mishra', 'Dilliwala waiting for a cab', 'open ground', 'm', 'Suggest an auto and tell him to ask for the meter.', [
  S('cab', ['कैब वाला हर बार कैंसिल कर देता है! पंद्रह मिनट हो गए।', 'Cab wala har baar cancel kar deta hai! Pandrah minute ho gaye.', 'The cab driver cancels every time! Fifteen minutes gone.'],
    'Suggest taking an auto instead.', ['Auto le lijiye, jaldi mil jaayega.', 'ऑटो ले लीजिए, जल्दी मिल जाएगा।'],
    ['auto kar lo bhaiya jaldi milega', 'cab chhodo auto pakdo', 'paaji auto le lo seedha', 'auto mein chale jaiye'],
    ['Suggest an option.', 'Take an auto = "auto le lijiye". Quickly = "jaldi".'],
    ['सही आइडिया है, कैब का इंतज़ार बेकार है। पर किराया ज़्यादा माँगेंगे।', 'Sahi idea hai, cab ka intezaar bekaar hai. Par kiraya zyada maangenge.', 'Good idea, waiting for the cab is useless. But they will ask more fare.'],
    ['फ़ोन में गुम था, फिर से कहिए।', 'Phone mein gum tha, phir se kahiye.', 'I was lost in the phone, say again.']),
  S('meter', ['ऑटो वाले तो मीटर ही नहीं डालते। क्या करूँ?', 'Auto wale toh meter hi nahi daalte. Kya karun?', 'Auto drivers do not even use the meter. What shall I do?'],
    'Tell him to insist on the meter first.', ['Pehle meter ka bol dena, na maane toh doosra auto.', 'पहले मीटर का बोल देना, न माने तो दूसरा ऑटो।'],
    ['pehle meter bolna na maane toh doosra', 'meter ka zor dena bhaiya', 'oye meter se hi chalo bol dena', 'meter nahi toh doosra auto'],
    ['Give him a tip.', 'Say meter first = "pehle meter ka bol dena". Another = "doosra".'],
    ['वाह भाई, तुमने तो ट्रिक सिखा दी। थैंक्स!', 'Wah bhai, tumne toh trick sikha di. Thanks!', 'Wow brother, you taught me a trick. Thanks!'],
    ['मीटर पर क्या बोलूँ? जल्दी बताओ।', 'Meter par kya bolun? Jaldi batao.', 'What do I say on the meter? Tell me quickly.']),
], ['अब ऑटो रोकता हूँ। बाय!', 'Ab auto rokta hoon. Bye!', 'Now I flag an auto. Bye!'],
  [['auto le lijiye, jaldi mil jaayega', 'take an auto, you will get it quickly'], ['pehle meter ka bol dena', 'ask for the meter first']], ['भाई, ऑटो मीटर से मिल गया था!', 'Bhai, auto meter se mil gaya tha!', 'Bro, I got an auto on the meter!'], 2);

export const street6 = P('street-6', 'Anjali', 'Dilliwali smiling at her screen', 'open ground', 'f', 'Congratulate her on her daughter\'s cycle ride.', [
  S('cycle', ['भैया, देखो! मेरी बेटी ने पहली बार साइकिल चलाई!', 'Bhaiya, dekho! Meri beti ne pehli baar cycle chalayi!', 'Brother, look! My daughter rode a cycle for the first time!'],
    'Congratulate her daughter.', ['Wah, bahut badhai! Unhe meri taraf se shabaash.', 'वाह, बहुत बधाई! उन्हें मेरी तरफ़ से शाबाश।'],
    ['bahut badhai ho aapki beti ko', 'wah kya baat hai shabaash', 'oye chak de beti', 'beti ko meri taraf se badhai'],
    ['Congratulate her.', 'Congratulations = "badhai". From my side = "meri taraf se".'],
    ['थैंक्यू भैया! अब वो कहती है कि बड़ी होकर अफ़सर बनेगी, आपकी तरह।', 'Thank you bhaiya! Ab wo kehti hai ki badi hokar afsar banegi, aapki tarah.', 'Thank you, brother! Now she says she will become an officer like you.'],
    ['क्या कहा भैया? मैं वीडियो देख रही थी।', 'Kya kaha bhaiya? Main video dekh rahi thi.', 'What did you say, brother? I was watching the video.']),
], ['अब मैं ये वीडियो दादी को भेजती हूँ!', 'Ab main ye video dadi ko bhejti hoon!', 'Now I send this video to grandma!'],
  [['bahut badhai! shabaash', 'many congratulations, well done']], ['भैया, आज बेटी ने दो चक्कर लगाए!', 'Bhaiya, aaj beti ne do chakkar lagaye!', 'Brother, my daughter did two rounds today!'], 1);

export const street7 = P('street-7', 'Bhagat Ram', 'Dilliwala elder in the neem shade', 'open ground', 'o', 'Agree that neem shade is the coolest.', [
  S('neem', ['नीम की छाँव में बैठो बेटा, इससे बड़ा कूलर नहीं।', 'Neem ki chhaanv mein baitho beta, isse bada cooler nahi.', 'Sit in the neem shade, beta, no cooler is bigger than this.'],
    'Agree that neem shade is the best.', ['Sahi kaha baba, neem ki chhaanv sabse thandi.', 'सही कहा बाबा, नीम की छाँव सबसे ठंडी।'],
    ['neem ki chhaanv sabse thandi hai', 'baba ji neem ke neeche sukoon hai', 'bilkul baba cooler se behtar', 'neem ka ped toh kamaal hai'],
    ['Agree with him.', 'Neem shade = "neem ki chhaanv". Coolest = "sabse thandi".'],
    ['हाँ! और इसके पत्ते चबाओ तो कड़वाहट भी मीठी लगे। बीमारी भागती है।', 'Haan! Aur iske patte chabao toh kadwahat bhi meethi lage. Bimaari bhaagti hai.', 'Yes! And chew its leaves, even the bitterness feels sweet. Illness runs away.'],
    ['ऊँचा बोल बेटा, पंखा नहीं है यहाँ।', 'Ooncha bol beta, pankha nahi hai yahan.', 'Speak up, beta, there is no fan here.']),
], ['बैठा रह बेटा, पढ़ाई कल कर लेना।', 'Baitha reh beta, padhai kal kar lena.', 'Keep sitting, beta, you can study tomorrow.'],
  [['neem ki chhaanv sabse thandi', 'neem shade is the coolest']], ['अरे बेटा! नीम के नीचे आजा।', 'Arre beta! Neem ke neeche aaja.', 'Oh beta! Come under the neem.'], 1);

export const street8 = P('street-8', 'Harsh', 'Dilliwala teen scrolling his phone', 'open ground', 'k', 'Encourage him to start reading a short book.', [
  S('bored', ['बोर हो रहा हूँ, भैया। कुछ करने को नहीं।', 'Bore ho raha hoon, bhaiya. Kuch karne ko nahi.', 'I am bored, brother. Nothing to do.'],
    'Suggest reading a book or going for a walk.', ['Chal, ek kitaab padh ya bahar ghoom aa.', 'चल, एक किताब पढ़ या बाहर घूम आ।'],
    ['phone chhod kitaab padh', 'bahar ghoom aao thoda', 'oye chal bahar chalte hain', 'koi achhi kitaab padh le'],
    ['Give him an idea.', 'Read a book = "kitaab padh". Go for a walk = "ghoom aa".'],
    ['हम्म... किताब? वो तो बोरिंग लगती है, भैया।', 'Hmm... kitaab? Wo toh boring lagti hai, bhaiya.', 'Hmm... a book? That sounds boring, brother.'],
    ['क्या बोले? मैं गेम में था, फिर बोलो।', 'Kya bole? Main game mein tha, phir bolo.', 'What did you say? I was in a game, say again.']),
  S('boring', ['किताबें तो बहुत बोरिंग होती हैं।', 'Kitaabein toh bahut boring hoti hain.', 'Books are very boring.'],
    'Tell him to start with a small one, it will get fun.', ['Chhoti se shuru karo, maza aane lagega.', 'छोटी से शुरू करो, मज़ा आने लगेगा।'],
    ['ek chhoti kitaab se shuru karo', 'dheere dheere maza aayega', 'oye pehle chhoti padh ke dekh', 'shuru toh karo maza aayega'],
    ['Encourage him.', 'Start with a small one = "chhoti se shuru karo". Fun = "maza".'],
    ['ठीक है भैया, कोशिश करूँगा। आप जैसे बनने के लिए!', 'Theek hai bhaiya, koshish karunga. Aap jaise banne ke liye!', 'Okay brother, I will try. To become like you!'],
    ['बोलो ना, कोई तरीक़ा बताओ!', 'Bolo na, koi tareeqa batao!', 'Say it, tell me a way!']),
], ['अब मैं कॉमिक्स पढ़ता हूँ, पहला क़दम!', 'Ab main comics padhta hoon, pehla qadam!', 'Now I read comics, first step!'],
  [['ek kitaab padh ya bahar ghoom aa', 'read a book or go for a walk'], ['chhoti se shuru karo, maza aane lagega', 'start small, you will begin to enjoy it']], ['भैया, मैंने पूरी कॉमिक्स पढ़ ली!', 'Bhaiya, maine poori comics padh li!', 'Brother, I read the whole comic!'], 2);

export const street9 = P('street-9', 'Sardar Gurpreet Singh', 'Sikh Dilliwala chatting about cricket', 'open ground', 'm', 'Chat about last night\'s cricket match.', [
  S('match', ['ओए, कल का मैच देखा? क्या मैच था!', 'Oye, kal ka match dekha? Kya match tha!', 'Oye, did you watch last night\'s match? What a match!'],
    'Agree, it was a great match.', ['Haan paaji, kamaal ka match tha.', 'हाँ पाजी, कमाल का मैच था।'],
    ['haan paaji kya match tha', 'bahut mast match tha', 'oye kamaal ka match', 'zabardast khela tha kal'],
    ['Agree about the match.', 'Great = "kamaal ka". Match = "match".'],
    ['चक दे फट्टे! आख़िरी ओवर में तो साँस रुक गई थी।', 'Chak de phatte! Aakhiri over mein toh saans ruk gayi thi.', 'Chak de phatte! My breath stopped in the last over.'],
    ['की गल? ज़रा ऊँचा बोल पुत्तर।', 'Ki gal? Zara ooncha bol puttar.', 'What was that? Speak up, puttar.']),
  S('six', ['वो आख़िरी छक्का! सीधा स्टैंड में!', 'Wo aakhiri chhakka! Seedha stand mein!', 'That last six! Straight into the stands!'],
    'Cheer: what a six it was.', ['Chak de phatte, kya chhakka tha!', 'चक दे फट्टे, क्या छक्का था!'],
    ['kya chhakka tha paaji', 'wah wah chhakka mast tha', 'oye chhakka kya maara', 'zabardast chhakka tha'],
    ['Cheer with him.', 'Six = "chhakka". What a six = "kya chhakka tha".'],
    ['वाह पुत्तर! तू तो पक्का पंजाबी निकला! चल, लस्सी मेरी तरफ़ से।', 'Wah puttar! Tu toh pakka Punjabi nikla! Chal, lassi meri taraf se.', 'Wow puttar! You are a true Punjabi! Come, lassi on me.'],
    ['जोश में बोल ओए, फीका क्यों है?', 'Josh mein bol oye, pheeka kyun hai?', 'Say it with energy, why so dull?']),
], ['चल पुत्तर, मैं घर चलता हूँ। मैच दोबारा देखना है!', 'Chal puttar, main ghar chalta hoon. Match dobaara dekhna hai!', 'Go on puttar, I head home. I want to watch the match again!'],
  [['kamaal ka match tha, paaji', 'it was a great match, paaji'], ['kya chhakka tha!', 'what a six!']], ['ओए शेरा, आज का मैच देखेगा?', 'Oye shera, aaj ka match dekhega?', 'Oye lion, will you watch today\'s match?'], 2);

export const street10 = P('street-10', 'Savita', 'Dilliwali with shopping', 'open ground', 'f', 'Ask what she bought at the market.', [
  S('shop', ['सरोजिनी से आ रही हूँ, सब कुछ सस्ता मिल गया!', 'Sarojini se aa rahi hoon, sab kuch sasta mil gaya!', 'I am coming from Sarojini, got everything cheap!'],
    'Ask what she bought.', ['Wah aunty, kya kya kharida?', 'वाह आंटी, क्या क्या ख़रीदा?'],
    ['kya kya liya aunty', 'aunty ji kya kharida aapne', 'paaji kya kya laaye', 'dikhaiye kya liya'],
    ['Ask what she got.', 'What did you buy = "kya kharida". Everything = "kya kya".'],
    ['तीन कुर्ते, दो दुपट्टे, एक झोला। सौ रुपये बच गए अलग!', 'Teen kurte, do dupatte, ek jhola. Sau rupaye bach gaye alag!', 'Three kurtas, two dupattas, a bag. And a hundred rupees saved!'],
    ['थैलों में उलझी हूँ, फिर से पूछो।', 'Thailon mein uljhi hoon, phir se puchho.', 'I am tangled in bags, ask again.']),
], ['चलो बेटा, अब घर जाकर सब निकालती हूँ।', 'Chalo beta, ab ghar jaakar sab nikaalti hoon.', 'Right beta, now I go home and unpack.'],
  [['wah aunty, kya kya kharida?', 'wow aunty, what did you buy?']], ['बेटा, अगली बार तू भी चल सरोजिनी!', 'Beta, agli baar tu bhi chal Sarojini!', 'Beta, come to Sarojini with me next time!'], 1);

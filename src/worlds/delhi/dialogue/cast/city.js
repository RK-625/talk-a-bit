// Old Delhi railway station, Connaught Place, Qutub Minar and Jantar Mantar.
import { P, step as S } from '../kit.js';

export const sorter1 = P('cst-tiffin-sorter', 'Ganesh', 'delivery rider sorting parcels', 'Old Delhi station, delivery scooters', 'q', 'Help him find whose parcel it is.', [
  S('sort', ['ये पार्सल किसका है? नाम मिट गया है, बहुत ऑर्डर हैं!', 'Ye parcel kiska hai? Naam mit gaya hai, bahut order hain!', 'Whose parcel is this? The name has smudged, so many orders!'],
    'Tell him to check the phone number on the parcel.', ['Parcel par phone number dekho na.', 'पार्सल पर फ़ोन नंबर देखो न।'],
    ['phone number dekh lo bhaiya', 'parcel ke upar number hoga', 'paaji number dekh lo parcel par', 'bhaiya sticker par number check karo'],
    ['Give him a tip.', 'Phone number = "phone number". Look at = "dekho".'],
    ['अरे हाँ! ये रहा नंबर। थैंक्स भाई, पढ़ाकू होने का फ़ायदा!', 'Arre haan! Ye raha number. Thanks bhai, padhaku hone ka faayda!', 'Oh yes! Here is the number. Thanks brother, the benefit of being a bookworm!'],
    ['क्या बोला भाई? स्कूटर का हॉर्न बजा था।', 'Kya bola bhai? Scooter ka horn baja tha.', 'What did you say brother? A scooter horn went off.']),
], ['चलता हूँ, अगली डिलीवरी बुला रही है!', 'Chalta hoon, agli delivery bula rahi hai!', 'I am off, the next delivery is calling!'],
  [['parcel par phone number dekho', 'check the phone number on the parcel']], ['भाई, आज पार्सल कम हैं, शुक्र है।', 'Bhai, aaj parcel kam hain, shukr hai.', 'Brother, fewer parcels today, thank goodness.'], 2);

export const sorter2 = P('cst-tiffin-sorter-2', 'Praveen', 'delivery rider sorting parcels', 'Old Delhi station, delivery scooters', 'q', 'Console him about bad ratings.', [
  S('rating', ['कस्टमर एक स्टार दे देते हैं, चाहे मैं कितना भी भागूँ!', 'Customer ek star de dete hain, chaahe main kitna bhi bhaagun!', 'Customers give one star, no matter how hard I run!'],
    'Tell him not to worry, his hard work shows.', ['Koi na bhaiya, mehnat sab dekhte hain.', 'कोई ना भैया, मेहनत सब देखते हैं।'],
    ['tension mat lo bhaiya mehnat dikhti hai', 'koi na bhai rating se kya hota hai', 'oye himmat rakh bhaiya', 'paaji mehnat ka phal milega'],
    ['Comfort him.', 'It is okay = "koi na". Hard work = "mehnat".'],
    ['तू ठीक कहता है भाई। चल, एक और ऑर्डर निपटाता हूँ।', 'Tu theek kehta hai bhai. Chal, ek aur order niptata hoon.', 'You are right, brother. I will finish one more order.'],
    ['स्टार की बात सुनी क्या? फिर से बोल।', 'Star ki baat suni kya? Phir se bol.', 'Did you hear about the stars? Say again.']),
], ['थैंक्स भाई, मूड बन गया!', 'Thanks bhai, mood ban gaya!', 'Thanks bro, I feel better!'],
  [['koi na bhaiya, mehnat sab dekhte hain', 'it is okay, brother, everyone sees the effort']], ['भाई, आज पाँच स्टार मिला!', 'Bhai, aaj paanch star mila!', 'Brother, I got five stars today!'], 1);

export const officegoer1 = P('cst-officegoer', 'Anil', 'office-goer hurrying to work', 'Old Delhi station forecourt', 'q', 'Reassure him he can still catch the metro.', [
  S('late', ['लेट हो गया! आज बॉस ग़ुस्सा होगा, मेट्रो पकड़नी है।', 'Late ho gaya! Aaj boss gussa hoga, metro pakadni hai.', 'I am late! The boss will be angry today, I have to catch the metro.'],
    'Tell him to run and not take tension.', ['Tension mat lo, bhaag ke pakad lo.', 'टेंशन मत लो, भाग के पकड़ लो।'],
    ['tension mat le bhaag ja', 'jaldi jao metro mil jaayegi', 'oye daud ke pakad le metro', 'koi na bhaiya jao jaldi'],
    ['Reassure him.', 'Do not take tension = "tension mat lo". Run = "bhaag".'],
    ['सही बोला! चलता हूँ, शाम को चाय मेरी तरफ़ से।', 'Sahi bola! Chalta hoon, shaam ko chai meri taraf se.', 'Well said! I am off, evening chai on me.'],
    ['क्या कहा? मेरा ध्यान घड़ी पर है।', 'Kya kaha? Mera dhyaan ghadi par hai.', 'What did you say? My eyes are on the watch.']),
], ['मेट्रो आ गई! भागता हूँ, बाय!', 'Metro aa gayi! Bhaagta hoon, bye!', 'The metro has come! I am running, bye!'],
  [['tension mat lo, bhaag ke pakad lo', 'do not worry, run and catch it']], ['आज तो टाइम पर पहुँचा, देखा?', 'Aaj toh time par pahuncha, dekha?', 'I reached on time today, see?'], 1);

export const officegoer2 = P('cst-officegoer-2', 'Dinesh', 'office-goer hurrying to work', 'Old Delhi station forecourt, front lane', 'q', 'Tell him the time.', [
  S('time', ['भाई साहब, टाइम क्या हुआ है? मेरी घड़ी बंद है।', 'Bhai sahab, time kya hua hai? Meri ghadi band hai.', 'Brother, what is the time? My watch has stopped.'],
    'Tell him it is half past nine.', ['Abhi nau bajkar tees minute hue hain.', 'अभी नौ बजकर तीस मिनट हुए हैं।'],
    ['bhaiya saade nau hue hain', 'abhi nau tees ho rahe hain', 'paaji saade nau ho gaye', 'nau bajkar tees minute'],
    ['Say the time.', 'Half past nine = "saade nau". O\'clock = "baje".'],
    ['अरे बाप रे, देर हो गई! थैंक्स भैया, भागता हूँ।', 'Are baap re, der ho gayi! Thanks bhaiya, bhaagta hoon.', 'Oh dear, I am late! Thanks brother, I am running.'],
    ['टाइम बताओ भैया, जल्दी में हूँ!', 'Time batao bhaiya, jaldi mein hoon!', 'Tell me the time, brother, I am in a hurry!']),
], ['ऑफ़िस पहुँचकर सबसे पहले चाय पिऊँगा।', 'Office pahunchkar sabse pehle chai piunga.', 'I will have chai first thing at the office.'],
  [['nau bajkar tees minute hue hain', 'it is half past nine now']], ['भैया, इस बार घड़ी चल रही है!', 'Bhaiya, is baar ghadi chal rahi hai!', 'Brother, my watch is working this time!'], 1);

export const coolie2 = P('cst-coolie-2', 'Shankar', 'station porter', 'Old Delhi station forecourt, east end', 'm', 'Offer him a chai as there are no passengers.', [
  S('empty', ['सुबह से कोई सवारी नहीं मिली, बाबू। जेब ख़ाली है।', 'Subah se koi sawaari nahi mili, babu. Jeb khaali hai.', 'No passenger since morning, babu. My pocket is empty.'],
    'Offer to buy him a chai.', ['Chaliye bhaiya, ek chai meri taraf se.', 'चलिए भैया, एक चाय मेरी तरफ़ से।'],
    ['bhaiya chai meri taraf se', 'chalo ek chai pilata hoon', 'paaji chai pi lo meri taraf se', 'ek chai mere saath pi lijiye'],
    ['Offer him chai.', 'From me = "meri taraf se". Chai = "chai".'],
    ['अरे, भगवान तुम्हारा भला करे बाबू! अफ़सर बनोगे ज़रूर।', 'Arre, Bhagwan tumhara bhala kare babu! Afsar banoge zaroor.', 'Oh, God bless you babu! You will surely become an officer.'],
    ['चाय की बात है क्या? ज़रा फिर से कहो।', 'Chai ki baat hai kya? Zara phir se kaho.', 'Is it about chai? Say that again.']),
], ['चलो, चाय के बाद फिर कोशिश करूँगा।', 'Chalo, chai ke baad phir koshish karunga.', 'Come on, I will try again after the chai.'],
  [['chaliye bhaiya, ek chai meri taraf se', 'come brother, a chai from me']], ['बाबू, आज थोड़ी कमाई हुई।', 'Babu, aaj thodi kamai hui.', 'Babu, I earned a little today.'], 1);

export const bullTourist = P('bse-bull-tourist', 'Lucas', 'foreign tourist taking a selfie', 'Connaught Place colonnade, giant charkha', 'm', 'Tell him what the charkha is and where to shop.', [
  S('charkha', 'Hello! What is this huge wheel in the middle of a shopping circle?',
    'Explain that it is a charkha, a spinning wheel.', 'It is a charkha, a spinning wheel for making thread by hand.',
    ['it is a charkha for making cotton thread', 'a spinning wheel for thread', 'it is an old spinning wheel', 'people used it to spin cotton by hand', 'It is a charkha, a spinning wheel'],
    ['Say what it is.', 'It is a charkha, a spinning wheel.'],
    'Oh, a spinning wheel! That is wonderful, thank you.', 'Sorry, what is it called?'),
  S('shop', 'Where can I buy some souvenirs around here?',
    'Say to try the shops under the white colonnade.', 'Try the shops under the white colonnade.',
    ['look in the shops under the arches', 'try the white colonnade shops', 'the arcade shops sell souvenirs', 'go under the white arches', 'Try the colonnade shops'],
    ['Point him to the arcade.', 'The shops are under the white colonnade.'],
    'Perfect, I will go there now. Thanks!', 'Sorry, where did you say?'),
], 'Great, thank you for your help!', [['it is a charkha, a spinning wheel', 'explaining something in English'], ['try the shops under the colonnade', 'giving shopping directions']], 'Hi again! I bought a tiny charkha, look!', 2, 'en');

export const ubGuard = P('bse-guard', 'Suresh', 'Connaught Place security guard', 'Connaught Place colonnade, arcade entrance', 'm', 'Ask the way to the Rajiv Chowk metro gate and repeat it back.', [
  S('gate', ['कुछ चाहिए, सर? ये कनॉट प्लेस का इनर सर्कल है।', 'Kuch chahiye, sir? Ye Connaught Place ka inner circle hai.', 'Need anything, sir? This is the inner circle of Connaught Place.'],
    'Ask where the Rajiv Chowk metro gate is.', ['Bhaiya, Rajiv Chowk metro ka gate kidhar hai?', 'भैया, राजीव चौक मेट्रो का गेट किधर है?'],
    ['rajiv chowk metro ka gate kahaan hai', 'sir metro gate kidhar hai', 'paaji metro ka gate bata do', 'rajiv chowk metro kis taraf hai'],
    ['Ask for the metro gate.', 'Gate = "gate". Where = "kidhar".'],
    ['सीधे जाइए, गोल चक्कर के बीच में सीढ़ियाँ मिलेंगी।', 'Seedhe jaaiye, gol chakkar ke beech mein seedhiyaan milengi.', 'Go straight, you will find stairs in the middle of the circle.'],
    ['आवाज़ दबी हुई है, ज़रा ऊँचा बोलिए।', 'Awaaz dabi hui hai, zara ooncha boliye.', 'Your voice is muffled, speak up a bit.']),
  S('repeat', ['सीधे जाकर बाएँ मुड़ना, फिर सीढ़ियाँ। समझ आया?', 'Seedhe jaakar baayen mudna, phir seedhiyaan. Samajh aaya?', 'Go straight, turn left, then the stairs. Got it?'],
    'Repeat: go straight, turn left, then stairs.', ['Seedha jaakar baayen mudunga, phir seedhiyaan.', 'सीधा जाकर बाएँ मुड़ूँगा, फिर सीढ़ियाँ।'],
    ['seedha jaakar baayen mudna phir seedhiyaan', 'samajh gaya seedha phir left phir stairs', 'theek hai seedha jaake baayen jaunga', 'ji samajh gaya sir'],
    ['Repeat the route.', 'Straight = "seedha". Left = "baayen". Stairs = "seedhiyaan".'],
    ['वाह! बिल्कुल सही। ऑल द बेस्ट सर।', 'Wah! Bilkul sahi. All the best sir.', 'Wow! Exactly right. All the best, sir.'],
    ['दोबारा दोहराओ, कहाँ मुड़ना है?', 'Dobara dohrao, kahaan mudna hai?', 'Repeat it once more, where do you turn?']),
], ['जाइए, भीड़ में सामान संभालकर रखना।', 'Jaiye, bheed mein saaman sambhalkar rakhna.', 'Go, keep your belongings safe in the crowd.'],
  [['Rajiv Chowk metro ka gate kidhar hai?', 'where is the Rajiv Chowk metro gate?'], ['seedha jaakar baayen mudunga', 'I will go straight and turn left']], ['सर, फिर आए? इस बार गेट मिल गया ना?', 'Sir, phir aaye? Is baar gate mil gaya na?', 'Sir, back again? You found the gate this time, right?'], 2);

export const broker = P('bse-broker', 'Mayank', 'job-seeker on a phone call', 'Connaught Place colonnade, near the charkha', 'q', 'Calm him and tell him to go to the Cyber Hub walk-in.', [
  S('slot', ['यार इंटरव्यू स्लॉट ही नहीं मिल रहा! डेडलाइन आज है।', 'Yaar interview slot hi nahi mil raha! Deadline aaj hai.', 'Man, I cannot get an interview slot! The deadline is today.'],
    'Tell him to mail the company again, no tension.', ['Tension mat lo, company ko ek baar aur mail karo.', 'टेंशन मत लो, कंपनी को एक बार और मेल करो।'],
    ['tension mat le ek baar mail kar de', 'company ko dobara mail daal do', 'paaji ek baar aur likh do', 'koi na mail kar do phir se'],
    ['Calm him down with a tip.', 'Do not take tension = "tension mat lo". Mail = "mail".'],
    ['हाँ यार, सही आइडिया है। तू तो पक्का आईएएस बनेगा।', 'Haan yaar, sahi idea hai. Tu toh pakka IAS banega.', 'Yes man, good idea. You will surely become an IAS.'],
    ['क्या बोला? नेटवर्क कट गया था।', 'Kya bola? Network kat gaya tha.', 'What did you say? The network dropped.']),
  S('walkin', ['सुना है साइबर हब में वॉक-इन चल रहे हैं। जाऊँ?', 'Suna hai Cyber Hub mein walk-in chal rahe hain. Jaun?', 'I heard walk-ins are on at Cyber Hub. Shall I go?'],
    'Tell him to go straight with his resume.', ['Haan, resume leke seedha chale jao.', 'हाँ, रिज़्यूमे लेके सीधा चले जाओ।'],
    ['haan resume lekar seedha jao', 'zaroor jao resume saath rakho', 'oye chale jao pakka kuch hoga', 'jaldi jao aur resume le jao'],
    ['Encourage him.', 'Resume = "resume". Go straight = "seedha chale jao".'],
    ['पक्का! चलता हूँ मेट्रो पकड़ने। थैंक्स भाई!', 'Pakka! Chalta hoon metro pakadne. Thanks bhai!', 'Sure! I am off to catch the metro. Thanks bro!'],
    ['जाऊँ या न जाऊँ, साफ़ बोल।', 'Jaun ya na jaun, saaf bol.', 'Should I go or not, say clearly.']),
], ['ऑल द बेस्ट मुझे और तुम्हें, दोनों को!', 'All the best mujhe aur tumhe, dono ko!', 'All the best to me and to you, both!'],
  [['tension mat lo, ek baar aur mail karo', 'do not worry, mail once more'], ['resume leke seedha chale jao', 'take your resume and go straight']], ['अरे भाई! इंटरव्यू अच्छा गया!', 'Arre bhai! Interview accha gaya!', 'Hey brother! The interview went well!'], 2);

export const bookSeller = P('rajabai-book-seller', 'Pandey Ji', 'second-hand book seller', 'Qutub Minar ticket-gate book stall', 'o', 'Ask for a good polity book and bargain.', [
  S('book', ['पुरानी एनसीईआरटी, यूपीएससी गाइड, गाइडबुक, सब मिलेगा।', 'Purani NCERT, UPSC guide, guidebook, sab milega.', 'Old NCERTs, UPSC guides, guidebooks, you will get everything.'],
    'Ask for a good polity book.', ['Mujhe polity ki ek achhi kitaab dikhaiye.', 'मुझे पॉलिटी की एक अच्छी किताब दिखाइए।'],
    ['polity ki achhi kitaab chahiye', 'polity ka koi guide dikhao', 'paaji polity ki book dikhao', 'mujhe polity ki book chahiye'],
    ['Ask for a subject book.', 'Polity = "polity". A good book = "ek achhi kitaab".'],
    ['ये लो, पाँच-छह साल पुरानी है पर अंदर सब ठीक है।', 'Ye lo, paanch-chhe saal purani hai par andar sab theek hai.', 'Here, five-six years old but all fine inside.'],
    ['कौन-सा विषय बोला? ज़रा साफ़ बोल बेटा।', 'Kaun-sa vishay bola? Zara saaf bol beta.', 'Which subject did you say? Speak clearly, beta.']),
  S('bargain', ['सत्तर रुपये की है, बेटा। कम नहीं होगा।', 'Sattar rupaye ki hai, beta. Kam nahi hoga.', 'It is seventy rupees, beta. It will not go lower.'],
    'Bargain for fifty rupees.', ['Pachaas mein de do, main regular grahak hoon.', 'पचास में दे दो, मैं रेगुलर ग्राहक हूँ।'],
    ['pachaas mein de do chacha', 'thoda kam karo pachaas lagao', 'paaji pachaas mein pakka karo', 'pachaas rupaye mein de do'],
    ['Ask for a lower price.', 'In fifty = "pachaas mein". Regular customer = "regular grahak".'],
    ['चल, तू तो रोज़ आता है। साठ में ले जा, आख़िरी।', 'Chal, tu toh roz aata hai. Saath mein le ja, aakhiri.', 'Fine, you come daily. Take it for sixty, final.'],
    ['कितने में लेगा, दाम बोल बेटा।', 'Kitne mein lega, daam bol beta.', 'For how much will you take it, name a price, beta.']),
], ['पढ़कर लौटाना मत, अपने पास रखना।', 'Padhkar lautana mat, apne paas rakhna.', 'Do not return it after reading, keep it.'],
  [['polity ki achhi kitaab dikhaiye', 'show me a good polity book'], ['pachaas mein de do', 'give it for fifty']], ['अरे आ गया हमारा रेगुलर! नई किताबें आई हैं।', 'Arre aa gaya hamara regular! Nayi kitaabein aayi hain.', 'Our regular has come! New books have arrived.'], 2);

export const studentA = P('rajabai-student-a', 'Karan', 'coaching student', 'Qutub Minar, book-stall steps', 'q', 'Console him about the mock test and give a study tip.', [
  S('mock', ['भाई, मॉक में कट-ऑफ़ से बीस नंबर कम आए! पूरा दिन ख़राब।', 'Bhai, mock mein cut-off se bees number kam aaye! Poora din kharab.', 'Bro, I scored twenty below the cut-off in the mock! Day ruined.'],
    'Tell him it is okay, next time he will clear it.', ['Koi na bhai, agli baar pakka nikal jaayega.', 'कोई ना भाई, अगली बार पक्का निकल जाएगा।'],
    ['koi na yaar agli baar ho jaayega', 'tension mat le agla mock accha hoga', 'oye himmat rakh pakka nikalega', 'paaji agli baar zaroor nikalega'],
    ['Console him.', 'It is okay = "koi na". Next time = "agli baar".'],
    ['थैंक्स यार! तू भी पेपर देता है ना, तेरा कैसा चल रहा?', 'Thanks yaar! Tu bhi paper deta hai na, tera kaisa chal raha?', 'Thanks man! You are also giving the paper, how is yours going?'],
    ['सुन नहीं पाया भाई। फिर बोल।', 'Sun nahi paya bhai. Phir bol.', 'I could not hear, brother. Say again.']),
  S('tip', ['यार, कोई स्टडी टिप दे। मैं ग़लतियाँ दोहराता हूँ।', 'Yaar, koi study tip de. Main galtiyaan dohrata hoon.', 'Give me a study tip, man. I keep repeating mistakes.'],
    'Suggest he note down every mistake.', ['Har galti ko copy mein likh lo.', 'हर ग़लती को कॉपी में लिख लो।'],
    ['galtiyaan notebook mein likho', 'har galat jawaab likh ke rakho', 'paaji har galti likh lo', 'ek mistake copy bana lo'],
    ['Give a study tip.', 'Every mistake = "har galti". Write = "likh lo".'],
    ['सही है! आज से ग़लती की डायरी बनाता हूँ। थैंक्स भाई!', 'Sahi hai! Aaj se galti ki diary banata hoon. Thanks bhai!', 'Good one! From today I make a mistake diary. Thanks bro!'],
    ['टिप बोल ना भाई, सोच क्या रहा है।', 'Tip bol na bhai, soch kya raha hai.', 'Say the tip, brother, what are you thinking.']),
], ['चल भाई, क्लास का टाइम हो गया। बाय!', 'Chal bhai, class ka time ho gaya. Bye!', 'Come on brother, class time. Bye!'],
  [['agli baar pakka nikal jaayega', 'you will surely clear it next time'], ['har galti ko copy mein likh lo', 'write every mistake in a notebook']], ['भाई, इस बार मॉक में ठीक नंबर आए!', 'Bhai, is baar mock mein theek number aaye!', 'Bro, this time I got decent marks in the mock!'], 2);

export const bookBrowser = P('rajabai-book-browser', 'Yash', 'student browsing books', 'Qutub Minar ticket-gate book stall', 'k', 'Recommend him the history book.', [
  S('pick', ['ये हेरिटेज वाली किताब लूँ या स्केच वाली? कन्फ़्यूज़ हूँ!', 'Ye heritage wali kitaab lun ya sketch wali? Confuse hoon!', 'Shall I take this heritage book or the sketch one? I am confused!'],
    'Tell him the history book is better.', ['Ye history wali kitaab zyada achhi hai.', 'ये हिस्ट्री वाली किताब ज़्यादा अच्छी है।'],
    ['history wali le lo yaar', 'ye history ki kitaab sahi hai', 'oye history wali better hai', 'paaji history wali pakad lo'],
    ['Pick one for him.', 'History = "history". Better = "zyada achhi".'],
    ['ठीक है भाई, यही लेता हूँ। एग्ज़ाम में काम आएगी।', 'Theek hai bhai, yahi leta hoon. Exam mein kaam aayegi.', 'Okay brother, I will take this one. It will help in the exam.'],
    ['कौन-सी लूँ? बोलो ना भाई।', 'Kaun-si lun? Bolo na bhai.', 'Which one shall I take? Say, brother.']),
], ['थैंक्स भाई, किताब लेकर चलता हूँ!', 'Thanks bhai, kitaab lekar chalta hoon!', 'Thanks brother, I will go with the book!'],
  [['ye history wali kitaab zyada achhi hai', 'the history book is better']], ['भाई, वो किताब बहुत काम आई!', 'Bhai, wo kitaab bahut kaam aayi!', 'Brother, that book helped a lot!'], 1);

export const ledgeReader = P('flora-ledge-reader', 'Ritika', 'college girl on the ledge', 'Jantar Mantar, ledge', 'f', 'Chat about the quiet place and the big sundial.', [
  S('quiet', ['यहाँ धूप में पढ़ना कितना अच्छा लगता है!', 'Yahan dhoop mein padhna kitna accha lagta hai!', 'How nice it is to study here in the sun!'],
    'Say this place is very peaceful.', ['Haan, ye jagah bahut shaant hai.', 'हाँ, ये जगह बहुत शांत है।'],
    ['sach mein yahan sukoon hai', 'ye jagah bahut peaceful hai', 'haan ji yahan padhai mast hoti hai', 'kitni shaant jagah hai'],
    ['Agree about the place.', 'Peaceful = "shaant". This place = "ye jagah".'],
    ['हाँ! और ये लाल-सफ़ेद यंत्र देखो, बहुत अलग लगते हैं।', 'Haan! Aur ye laal-safed yantra dekho, bahut alag lagte hain.', 'Yes! And look at these red and white instruments, so different.'],
    ['धीरे बोलो, यहाँ सब पढ़ रहे हैं।', 'Dheere bolo, yahan sab padh rahe hain.', 'Speak softly, everyone is reading here.']),
  S('sundial', ['पता है, ये बड़ा यंत्र समय कैसे बताता है?', 'Pata hai, ye bada yantra samay kaise batata hai?', 'Do you know how this big instrument tells time?'],
    'Say it works with the sun\'s shadow.', ['Dhoop ki parchhai se, ghadi ki tarah.', 'धूप की परछाई से, घड़ी की तरह।'],
    ['sooraj ki parchhai se samay batata hai', 'shadow dekhkar time pata chalta hai', 'parchhai ghadi jaisi kaam karti hai', 'suraj ki chaaya se'],
    ['Explain the sundial.', 'Shadow = "parchhai". Sun = "dhoop" or "sooraj".'],
    ['सही! तुम तो इतिहास के भी पक्के निकले। ऑल द बेस्ट!', 'Sahi! Tum toh itihaas ke bhi pakke nikle. All the best!', 'Right! You are also strong in history. All the best!'],
    ['कैसे बताता है? एक बार और बोलो।', 'Kaise batata hai? Ek baar aur bolo.', 'How does it tell? Say once more.']),
], ['अब मैं पढ़ाई करती हूँ, डिस्टर्ब मत करना!', 'Ab main padhai karti hoon, disturb mat karna!', 'Now I study, do not disturb!'],
  [['ye jagah bahut shaant hai', 'this place is very peaceful'], ['dhoop ki parchhai se, ghadi ki tarah', 'by the sun\'s shadow, like a clock']], ['अरे आप फिर आ गए? आज यहाँ और शांति है।', 'Arre aap phir aa gaye? Aaj yahan aur shaanti hai.', 'Oh you came again? It is even calmer here today.'], 2);

export const ledgeSketcher = P('flora-ledge-sketcher', 'Dev', 'teen sketching on the ledge', 'Jantar Mantar, ledge', 'k', 'Encourage his sketch.', [
  S('sketch', ['ये बड़ी धूपघड़ी बनाना कितना मुश्किल है, यार!', 'Ye badi dhoopghadi banana kitna mushkil hai, yaar!', 'This big sundial is so hard to draw, man!'],
    'Tell him to go slowly, the sketch is nice.', ['Dheere dheere banao, tumhara sketch sundar hai.', 'धीरे-धीरे बनाओ, तुम्हारा स्केच सुंदर है।'],
    ['dheere dheere banao accha lag raha hai', 'tumhara sketch bahut badhiya hai', 'oye himmat rakh sundar ban raha hai', 'dhyaan se banao mast aa raha hai'],
    ['Encourage him.', 'Slowly = "dheere dheere". Beautiful = "sundar".'],
    ['सच में? थैंक्स! चलो, अब छाया डालता हूँ।', 'Sach mein? Thanks! Chalo, ab chhaya daalta hoon.', 'Really? Thanks! Now I will add the shadow.'],
    ['क्या कहा? मैं पेंसिल में खोया था।', 'Kya kaha? Main pencil mein khoya tha.', 'What did you say? I was lost in the pencil.']),
], ['अब बस, मेरी पेंसिल घिस गई!', 'Ab bas, meri pencil ghis gayi!', 'That is enough, my pencil is worn!'],
  [['tumhara sketch sundar hai', 'your sketch is beautiful']], ['देखो, तुम्हारी वजह से ये पूरा हो गया!', 'Dekho, tumhari wajah se ye poora ho gaya!', 'Look, because of you this is complete!'], 1);

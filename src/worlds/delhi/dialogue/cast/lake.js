// The Yamuna boat-club promenade and the Lotus Temple causeway.
import { P, step as S } from '../kit.js';

export const walkStudent = P('marine-walk-student', 'Akash', 'DU student on a walk', 'Yamuna boat-club promenade', 'q', 'Advise him about attendance and say you are preparing for UPSC.', [
  S('attendance', ['यार, अटेंडेंस सत्तर से नीचे चली गई। प्रोफ़ेसर नहीं छोड़ेंगे!', 'Yaar, attendance sattar se neeche chali gayi. Professor nahi chhodenge!', 'Man, my attendance dropped below seventy. The professor will not let me off!'],
    'Advise him to talk to the professor.', ['Professor se ek baar baat kar lo yaar.', 'प्रोफ़ेसर से एक बार बात कर लो यार।'],
    ['professor se baat kar lo yaar', 'sir se ek baar mil lo', 'oye professor ko samjha do', 'ek baar sir se request kar lo'],
    ['Give him a simple suggestion.', 'Talk = "baat kar lo". Professor = "professor".'],
    ['हाँ यार, कोशिश करता हूँ। तू तो बड़ा समझदार निकला।', 'Haan yaar, koshish karta hoon. Tu toh bada samajhdaar nikla.', 'Yes man, I will try. You turned out quite wise.'],
    ['क्या? इयरफ़ोन लगा था, फिर से बोल।', 'Kya? Earphone laga tha, phir se bol.', 'What? I had earphones on, say again.']),
  S('you', ['वैसे तू किस कॉलेज में है?', 'Waise tu kis college mein hai?', 'By the way, which college are you in?'],
    'Say you are not in college, you are preparing for UPSC.', ['Main college mein nahi, UPSC ki taiyaari kar raha hoon.', 'मैं कॉलेज में नहीं, यूपीएससी की तैयारी कर रहा हूँ।'],
    ['main upsc ki taiyaari karta hoon', 'college nahi upsc kar raha hoon', 'bhai main upsc aspirant hoon', 'main toh bas upsc de raha hoon'],
    ['Say what you do.', 'I am preparing = "taiyaari kar raha hoon".'],
    ['ओहो, यूपीएससी! भाई, तू तो हमारा हीरो है। ऑल द बेस्ट!', 'Oho, UPSC! Bhai, tu toh hamara hero hai. All the best!', 'Oho, UPSC! Brother, you are our hero. All the best!'],
    ['कॉलेज या कुछ और? ठीक से बता।', 'College ya kuch aur? Theek se bata.', 'College or something else? Tell me properly.']),
], ['चल, मेरी क्लास का टाइम हो गया। बाय!', 'Chal, meri class ka time ho gaya. Bye!', 'Come on, class time. Bye!'],
  [['professor se baat kar lo', 'talk to the professor'], ['main UPSC ki taiyaari kar raha hoon', 'I am preparing for UPSC']], ['अरे वही भाई! अटेंडेंस पूरी हुई।', 'Arre wahi bhai! Attendance poori hui.', 'Oh the same brother! My attendance is complete.'], 2);

export const benchMan = P('marine-bench-man', 'Mathur Saheb', 'man on a promenade bench', 'Yamuna boat-club promenade, bench', 'o', 'Sit with him and agree the boats are calming.', [
  S('boats', ['नावें देखना सुकून देता है। तुम भी बैठो, बेटा।', 'Naavein dekhna sukoon deta hai. Tum bhi baitho, beta.', 'Watching boats is calming. You sit too, beta.'],
    'Say you will sit for a while.', ['Theek hai uncle, thodi der baith jaata hoon.', 'ठीक है अंकल, थोड़ी देर बैठ जाता हूँ।'],
    ['haan uncle thodi der baithta hoon', 'zaroor uncle ji baith jaata hoon', 'paaji thodi der yahin baith jaun', 'theek hai thoda aaram kar leta hoon'],
    ['Accept his invitation.', 'I will sit = "baith jaata hoon". A little while = "thodi der".'],
    ['वाह! देखो वो लाल वाली नाव कैसे लहरों पर थिरक रही है।', 'Wah! Dekho wo laal wali naav kaise lehron par thirak rahi hai.', 'Wow! Look how that red boat dances on the waves.'],
    ['बैठोगे कि नहीं बेटा? धूप चढ़ रही है।', 'Baithoge ki nahi beta? Dhoop chadh rahi hai.', 'Will you sit or not, beta? The sun is rising.']),
], ['अच्छा, जाओ। तैयारी में मन लगाना।', 'Accha, jao. Taiyaari mein man lagana.', 'All right, go. Keep your mind in your preparation.'],
  [['thodi der baith jaata hoon', 'I will sit for a little while']], ['आओ बेटा, आज नावें ज़्यादा हैं!', 'Aao beta, aaj naavein zyada hain!', 'Come, beta, there are more boats today!'], 1);

export const lakeCouple = P('marine-couple', 'Rohan and Isha', 'seated couple, DU friends', 'Yamuna boat-club river wall', 'q', 'Offer to take their photo and say it came out perfect.', [
  S('photo', ['भैया, एक फ़ोटो खींच दोगे? यमुना के साथ!', 'Bhaiya, ek photo kheench doge? Yamuna ke saath!', 'Brother, will you take a photo? With the Yamuna!'],
    'Say yes, give me the phone.', ['Haan haan, phone do, main kheench deta hoon.', 'हाँ हाँ, फ़ोन दो, मैं खींच देता हूँ।'],
    ['haan phone do main photo leta hoon', 'zaroor bhai phone idhar do', 'oye haan haan photo kheench dunga', 'phone do ek photo le leta hoon'],
    ['Offer to take it.', 'Give the phone = "phone do". I will pull a photo = "kheench deta hoon".'],
    ['थैंक्यू भैया! पीछे नदी भी आनी चाहिए, ठीक से!', 'Thank you bhaiya! Peeche nadi bhi aani chahiye, theek se!', 'Thank you, brother! The river must be in the back, properly!'],
    ['फ़ोटो खींचोगे या नहीं? हम इंतज़ार कर रहे हैं।', 'Photo kheenchoge ya nahi? Hum intezaar kar rahe hain.', 'Will you take the photo or not? We are waiting.']),
  S('check', ['वाह, कैसी आई? ज़रा दिखाओ!', 'Wah, kaisi aayi? Zara dikhao!', 'Wow, how did it come? Show it!'],
    'Say it came out perfect.', ['Ekdum perfect aayi hai, dekh lo.', 'एकदम परफ़ेक्ट आई है, देख लो।'],
    ['ye toh ekdum mast aayi hai', 'bahut badhiya aayi hai photo', 'oye kya kamaal photo aayi hai', 'dekh lo ekdum sahi aayi'],
    ['Say the photo is good.', 'Perfect = "perfect". It came = "aayi hai".'],
    ['सुपर! तुम्हारे हाथ में जादू है। ये रहा एक चॉकलेट!', 'Super! Tumhare haath mein jaadu hai. Ye raha ek chocolate!', 'Super! You have magic in your hands. Here is a chocolate!'],
    ['अरे बोलो ना, फ़ोटो ठीक आई?', 'Arre bolo na, photo theek aayi?', 'Say, did the photo come out well?']),
], ['चलो, अब इंस्टा पर डालते हैं। थैंक्स!', 'Chalo, ab insta par daalte hain. Thanks!', 'Right, now to put it up online. Thanks!'],
  [['main photo kheench deta hoon', 'I will take the photo'], ['ekdum perfect aayi hai', 'it came out perfect']], ['अरे भैया, एक और फ़ोटो चलेगी?', 'Arre bhaiya, ek aur photo chalegi?', 'Oh brother, will you take one more photo?'], 2);

export const chanaSeller = P('marine-chana-seller', 'Gopal Chacha', 'chana jor garam seller', 'Yamuna boat-club promenade', 'o', 'Order chana jor garam and ask for more masala.', [
  S('order', ['चना जोर गरम, गरम गरम! कितने का दूँ?', 'Chana jor garam, garam garam! Kitne ka dun?', 'Chana jor garam, hot hot! How much shall I give?'],
    'Ask for ten rupees worth of chana.', ['Chacha, das rupaye ka chana dena.', 'चाचा, दस रुपये का चना देना।'],
    ['das rupaye ka chana dena', 'chacha das ka chana jor garam', 'paaji das rupaye da chana', 'bas das rupaye ka dena'],
    ['Say the amount you want.', 'Ten rupees worth = "das rupaye ka". Chana = "chana".'],
    ['ले बेटा, गरमा-गरम। नदी किनारे इसका मज़ा ही अलग है!', 'Le beta, garma-garam. Nadi kinaare iska maza hi alag hai!', 'Take it, beta, piping hot. It tastes different by the river!'],
    ['कितने का? रुपया बोल बेटा।', 'Kitne ka? Rupaya bol beta.', 'Worth how much? Say the rupees, beta.']),
  S('masala', ['मसाला डालूँ तीखा या हल्का?', 'Masala daalun teekha ya halka?', 'Shall I add spicy masala or mild?'],
    'Ask for more masala and some lemon.', ['Masala thoda zyada, aur nimbu bhi.', 'मसाला थोड़ा ज़्यादा, और नींबू भी।'],
    ['masala zyada aur nimbu nichod do', 'thoda aur masala daal do chacha', 'oye masala zyada nimbu bhi', 'nimbu aur masala zyada dena'],
    ['Ask for extra spice.', 'More = "zyada". Lemon = "nimbu".'],
    ['लो, पूरा चटपटा! पढ़ते-पढ़ते नींद नहीं आएगी।', 'Lo, poora chatpata! Padhte-padhte neend nahi aayegi.', 'Here, fully tangy! You will not sleep while studying.'],
    ['तीखा या हल्का, एक तो बोल।', 'Teekha ya halka, ek toh bol.', 'Spicy or mild, say one at least.']),
], ['जा बेटा, नदी देख और चबाता रह।', 'Ja beta, nadi dekh aur chabata reh.', 'Go, beta, watch the river and keep munching.'],
  [['das rupaye ka chana dena', 'give ten rupees of chana'], ['masala thoda zyada', 'a bit more masala']], ['आ गया? आज चना और कुरकुरा है।', 'Aa gaya? Aaj chana aur kurkura hai.', 'You are here? Today the chana is extra crisp.'], 2);

export const jogger = P('marine-jogger', 'Vikram', 'river-side jogger', 'Yamuna boat-club promenade', 'q', 'Praise his fitness.', [
  S('fit', ['हाँफ रहा हूँ! सुबह की धुंध में दौड़ना मुश्किल है।', 'Haanf raha hoon! Subah ki dhundh mein daudna mushkil hai.', 'I am panting! Running in the morning haze is hard.'],
    'Tell him he is very fit.', ['Aap toh bahut fit ho, bhaiya!', 'आप तो बहुत फ़िट हो, भैया!'],
    ['aap roz daudte ho kya bahut fit ho', 'bahut fit lag rahe ho', 'oye kya stamina hai', 'zabardast fitness hai bhaiya'],
    ['Praise his fitness.', 'Very fit = "bahut fit". You are = "aap ho".'],
    ['थैंक्स भाई! तू भी सुबह आ, दिमाग़ तेज़ होगा।', 'Thanks bhai! Tu bhi subah aa, dimaag tez hoga.', 'Thanks bro! You come in the morning too, your mind will sharpen.'],
    ['साँस फूल रही है, फिर से बोल भाई।', 'Saans phool rahi hai, phir se bol bhai.', 'I am out of breath, say it again, brother.']),
], ['चलता हूँ, अगला चक्कर बाक़ी है!', 'Chalta hoon, agla chakkar baaki hai!', 'I am off, the next lap is pending!'],
  [['aap toh bahut fit ho', 'you are really fit']], ['अरे भाई, कल सुबह आना!', 'Arre bhai, kal subah aana!', 'Hey brother, come tomorrow morning!'], 1);

export const benchAunty = P('marine-bench-aunty', 'Kaushalya Aunty', 'aunty on a promenade bench', 'Yamuna boat-club promenade, bench', 'f', 'Chat about the river and decline her chai politely.', [
  S('river', ['ये यमुना पहले कितनी साफ़ हुआ करती थी, बेटा।', 'Ye Yamuna pehle kitni saaf hua karti thi, beta.', 'This Yamuna used to be so clean, beta.'],
    'Say it is true and it should be cleaned.', ['Sahi kehti hain aunty, ise saaf karna chahiye.', 'सही कहती हैं आंटी, इसे साफ़ करना चाहिए।'],
    ['haan aunty nadi saaf honi chahiye', 'sach mein aunty ji safai zaroori hai', 'aap theek keh rahi hain nadi ko saaf karo', 'bilkul aunty ise saaf karna chahiye'],
    ['Agree and say it should be cleaned.', 'Should be cleaned = "saaf karna chahiye".'],
    ['तू बच्चा है पर समझदार है। ये जिम्मेदारी तुम सबकी है।', 'Tu bachcha hai par samajhdaar hai. Ye zimmedaari tum sabki hai.', 'You are young but wise. This is all your responsibility.'],
    ['अरे, धीरे बोल। मेरी सुनने की मशीन लगी नहीं।', 'Arre, dheere bol. Meri sunne ki machine lagi nahi.', 'Oh, speak softly. My hearing aid is not on.']),
  S('chai', ['थर्मस में चाय लाई हूँ। पिएगा बेटा?', 'Thermos mein chai laayi hoon. Piyega beta?', 'I have brought chai in a flask. Will you have some, beta?'],
    'Politely decline: you just had chai.', ['Nahi aunty, abhi chai pi chuka hoon.', 'नहीं आंटी, अभी चाय पी चुका हूँ।'],
    ['shukriya aunty abhi chai pi li', 'aunty ji abhi nahi pi li hai', 'nahi aunty bittu bhaiya ne pilayi', 'maaf kijiye aunty abhi chai pi li'],
    ['Say no politely.', 'I have already had = "pi chuka hoon". Just now = "abhi".'],
    ['अच्छा अच्छा, बिट्टू के यहाँ पी होगी। कोई बात नहीं।', 'Accha accha, Bittu ke yahan pi hogi. Koi baat nahi.', 'Okay okay, you must have had it at Bittu\'s. No problem.'],
    ['हाँ या ना? चाय ठंडी हो रही है।', 'Haan ya na? Chai thandi ho rahi hai.', 'Yes or no? The chai is getting cold.']),
], ['ठीक है बेटा, ध्यान रखना अपना।', 'Theek hai beta, dhyaan rakhna apna.', 'All right beta, take care of yourself.'],
  [['ise saaf karna chahiye', 'it should be cleaned'], ['abhi chai pi chuka hoon', 'I have just had chai']], ['बेटा, आज चाय में अदरक है!', 'Beta, aaj chai mein adrak hai!', 'Beta, there is ginger in the chai today!'], 2);

export const benchReader = P('marine-bench-reader', 'Gupta Ji', 'old man with newspaper', 'Yamuna boat-club promenade, same bench', 'o', 'Ask how the weather will be today.', [
  S('weather', ['पेपर में लिखा है आज धुंध रहेगी, फिर साफ़ होगी।', 'Paper mein likha hai aaj dhundh rahegi, phir saaf hogi.', 'The paper says it will be hazy today, then clear.'],
    'Ask how the weather will be in the evening.', ['Aur shaam ko mausam kaisa rahega, uncle?', 'और शाम को मौसम कैसा रहेगा, अंकल?'],
    ['shaam ko mausam kaisa rahega', 'uncle shaam tak saaf ho jaayega kya', 'aaj shaam ko barish hogi kya', 'aur raat ko kaisa mausam hoga'],
    ['Ask about the evening weather.', 'In the evening = "shaam ko". How will it be = "kaisa rahega".'],
    ['शाम को खुला रहेगा। इंडिया गेट पर टहलने जाना।', 'Shaam ko khula rahega. India Gate par tehalne jaana.', 'It will be clear in the evening. Go for a walk at India Gate.'],
    ['मौसम का पूछा क्या? चश्मा ढूँढ रहा था।', 'Mausam ka puchha kya? Chashma dhoondh raha tha.', 'Did you ask about the weather? I was hunting for my glasses.']),
], ['हाँ, पेपर पढ़ो, बेटा। सब पता चलता है।', 'Haan, paper padho, beta. Sab pata chalta hai.', 'Yes, read the paper, beta. You learn everything.'],
  [['shaam ko mausam kaisa rahega?', 'how will the weather be in the evening?']], ['आओ बेटा! आज की सुर्ख़ी सुनो।', 'Aao beta! Aaj ki surkhi suno.', 'Come, beta! Hear today\'s headline.'], 1);

export const lakeCouple2 = P('marine-couple-2', 'Kabir and Tanya', 'seated couple', 'Yamuna boat-club river wall', 'q', 'Suggest a cheap PG in Mukherjee Nagar.', [
  S('pg', ['हम नए हैं, कोई सस्ता पीजी बता सकते हो?', 'Hum naye hain, koi sasta PG bata sakte ho?', 'We are new here, can you suggest a cheap PG?'],
    'Suggest looking in Mukherjee Nagar.', ['Mukherjee Nagar mein sasta PG mil jaayega.', 'मुखर्जी नगर में सस्ता पीजी मिल जाएगा।'],
    ['mukherjee nagar mein dekho pg milega', 'sasta pg mukherjee nagar mein hai', 'paaji mukherjee nagar chale jao', 'wahan sasta pg mil jaayega'],
    ['Name a neighbourhood.', 'Cheap PG = "sasta PG". You will get = "mil jaayega".'],
    ['थैंक्यू! वहाँ तो सब अफ़सर बनने वाले रहते हैं, है ना?', 'Thank you! Wahan toh sab afsar banne wale rehte hain, hai na?', 'Thank you! All future officers live there, right?'],
    ['पीजी के बारे में बताओ, ठीक से सुनाई नहीं दिया।', 'PG ke baare mein batao, theek se sunai nahi diya.', 'Tell us about the PG, we did not hear properly.']),
], ['चलो, कल जाकर देखते हैं। थैंक्स!', 'Chalo, kal jaakar dekhte hain. Thanks!', 'Okay, we will go see tomorrow. Thanks!'],
  [['Mukherjee Nagar mein sasta PG mil jaayega', 'you will find a cheap PG in Mukherjee Nagar']], ['अरे वही भैया! पीजी मिल गया!', 'Arre wahi bhaiya! PG mil gaya!', 'Hey, the same brother! We found a PG!'], 1);

export const jogger2 = P('marine-jogger-2', 'Sandeep', 'river-side jogger', 'Yamuna boat-club promenade, opposite way', 'q', 'Say you will start jogging from tomorrow.', [
  S('join', ['पीछे आओ, साथ दौड़ते हैं! पाँच चक्कर बाक़ी हैं।', 'Peeche aao, saath daudte hain! Paanch chakkar baaki hain.', 'Come behind me, let us run together! Five laps left.'],
    'Say you will start running from tomorrow.', ['Kal se main bhi daudna shuru karunga.', 'कल से मैं भी दौड़ना शुरू करूँगा।'],
    ['kal se main bhi daudunga', 'aaj nahi kal se pakka', 'oye kal subah se aata hoon', 'kal se main bhi saath doudunga'],
    ['Promise to start tomorrow.', 'From tomorrow = "kal se". I will start = "shuru karunga".'],
    ['हा हा! सब यही कहते हैं। पर तू आएगा, मुझे यक़ीन है।', 'Ha ha! Sab yahi kehte hain. Par tu aayega, mujhe yaqeen hai.', 'Ha ha! Everyone says that. But you will come, I am sure.'],
    ['कल से या आज से? साफ़ बोल।', 'Kal se ya aaj se? Saaf bol.', 'From tomorrow or today? Say clearly.']),
], ['चल मैं निकलता हूँ, चौथा चक्कर है।', 'Chal main nikalta hoon, chautha chakkar hai.', 'I am off, it is the fourth lap.'],
  [['kal se main bhi daudna shuru karunga', 'I will start running tomorrow too']], ['भाई, आज दौड़ेगा क्या?', 'Bhai, aaj daudega kya?', 'Brother, will you run today?'], 1);

export const morningWalker = P('marine-morning-walker', 'Sethi Saab', 'elderly morning walker', 'Yamuna boat-club promenade', 'o', 'Admire the morning and promise to walk daily.', [
  S('birds', ['धुंध छँट गई, बेटा। चिड़ियों की आवाज़ सुनो।', 'Dhundh chhant gayi, beta. Chidiyon ki awaaz suno.', 'The haze has lifted, beta. Listen to the birds.'],
    'Say it is a beautiful morning.', ['Haan dadaji, bahut sundar subah hai.', 'हाँ दादाजी, बहुत सुंदर सुबह है।'],
    ['kitni pyaari subah hai', 'sach mein sundar subah hai', 'dadaji ji bahut sukoon hai', 'subah kitni suhaani hai'],
    ['Admire the morning.', 'Beautiful = "sundar". Morning = "subah".'],
    ['यही तो असली दौलत है। पैसे से ये नहीं मिलती।', 'Yahi toh asli daulat hai. Paise se ye nahi milti.', 'This is the real wealth. Money cannot buy it.'],
    ['धीरे से कहो बेटा, चिड़ियाँ डर जाएँगी।', 'Dheere se kaho beta, chidiyaan dar jaayengi.', 'Say it softly, beta, the birds will get scared.']),
  S('walk', ['रोज़ सैर किया कर, दिमाग़ भी तेज़ रहेगा।', 'Roz sair kiya kar, dimaag bhi tez rahega.', 'Walk daily, your mind will stay sharp too.'],
    'Promise to walk here every morning.', ['Ji, main bhi roz subah sair karunga.', 'जी, मैं भी रोज़ सुबह सैर करूँगा।'],
    ['roz subah yahan aaunga', 'ji pakka roz tehalne aaunga', 'main bhi roz sair karunga', 'haan ji subah-subah aaya karunga'],
    ['Promise to walk daily.', 'Every morning = "roz subah". I will walk = "sair karunga".'],
    ['शाबाश! मैं तो तीस साल से रोज़ आ रहा हूँ।', 'Shabaash! Main toh tees saal se roz aa raha hoon.', 'Well done! I have been coming daily for thirty years.'],
    ['वादा करो बेटा, बस हाँ मत कहो।', 'Vaada karo beta, bas haan mat kaho.', 'Make a promise, beta, do not just say yes.']),
], ['अच्छा, अब मेरा चक्कर पूरा हुआ। चलो।', 'Accha, ab mera chakkar poora hua. Chalo.', 'Well, my round is done now. Let us go.'],
  [['bahut sundar subah hai', 'it is a very beautiful morning'], ['main roz subah sair karunga', 'I will walk every morning']], ['आ गए बेटा! आज चिड़ियाँ ज़्यादा हैं।', 'Aa gaye beta! Aaj chidiyaan zyada hain.', 'You are here, beta! More birds today.'], 2);

export const boatman = P('gateway-boatman', 'Raju Mallah', 'paddle-boat attendant', 'Yamuna boat-club jetty', 'm', 'Ask the paddle-boat fare and ask for a life jacket.', [
  S('fare', ['पैडल बोट चलाओगे भैया? बीस मिनट की सैर!', 'Paddle boat chalaoge bhaiya? Bees minute ki sair!', 'Will you ride a paddle boat, brother? A twenty-minute trip!'],
    'Ask how much the paddle boat costs.', ['Paddle boat ka kitna kiraya hai?', 'पैडल बोट का कितना किराया है?'],
    ['paddle boat ke kitne paise lagenge', 'kiraya kitna hai bhaiya', 'paaji ek boat ka rate kya hai', 'bhaiya boat ka kitna loge'],
    ['Ask the fare.', 'How much = "kitna". Fare = "kiraya".'],
    ['दो सीट वाली दो सौ की, चार सीट वाली तीन सौ की।', 'Do seat wali do sau ki, chaar seat wali teen sau ki.', 'Two-seater is two hundred, four-seater three hundred.'],
    ['किराया पूछ रहे हो? फिर से बोलो।', 'Kiraya puchh rahe ho? Phir se bolo.', 'You are asking the fare? Say it again.']),
  S('jacket', ['ठीक है, चलो। पहले ज़रूरी बात।', 'Theek hai, chalo. Pehle zaroori baat.', 'All right, come on. First, an important thing.'],
    'Ask for a life jacket.', ['Mujhe life jacket chahiye, bhaiya.', 'मुझे लाइफ़ जैकेट चाहिए, भैया।'],
    ['life jacket kahaan hai bhaiya', 'pehle life jacket de do', 'oye life jacket dena paaji', 'bhaiya ek life jacket dijiye'],
    ['Ask for safety gear.', 'Life jacket = "life jacket". I need = "chahiye".'],
    ['समझदार हो! लो, पहन लो। पानी में डर नहीं लगेगा।', 'Samajhdaar ho! Lo, pehen lo. Paani mein dar nahi lagega.', 'You are sensible! Here, wear it. You will not be scared in water.'],
    ['जैकेट चाहिए या नहीं? साफ़ बोलो।', 'Jacket chahiye ya nahi? Saaf bolo.', 'Do you want a jacket or not? Say it clearly.']),
], ['जाओ, आराम से पैडल मारना। किनारे से दूर नहीं जाना!', 'Jao, aaram se paddle marna. Kinaare se door nahi jaana!', 'Go, pedal slowly. Do not go far from the edge!'],
  [['paddle boat ka kitna kiraya hai?', 'how much is the paddle boat?'], ['mujhe life jacket chahiye', 'I need a life jacket']], ['आओ भैया, आज नाव ख़ाली है!', 'Aao bhaiya, aaj naav khaali hai!', 'Come, brother, boats are empty today!'], 2);

export const hajiFlowerWoman = P('haji-chadar-seller', 'Sarla', 'flower stall woman', 'Lotus Temple causeway, flower stall', 'f', 'Ask where to leave your shoes and whether the queue is long.', [
  S('shoes', ['कमल मंदिर देखने आए हो? जूते यहीं उतारिए।', 'Kamal Mandir dekhne aaye ho? Joote yahin utaariye.', 'Come to see the Lotus Temple? Take off your shoes right here.'],
    'Ask where to leave your shoes.', ['Joote kahaan rakh doon, didi?', 'जूते कहाँ रख दूँ, दीदी?'],
    ['joote kidhar rakhne hain didi', 'didi ji shoes kahaan chhodun', 'chappal kahaan rakhni hai', 'paaji joote rakhne ki jagah kahaan hai'],
    ['Ask where your shoes go.', 'Shoes = "joote". Where shall I keep = "kahaan rakh doon".'],
    ['वो रहा स्टैंड, टोकन ले लीजिए। पाँच रुपये लगेंगे।', 'Wo raha stand, token le lijiye. Paanch rupaye lagenge.', 'There is the stand, take a token. It costs five rupees.'],
    ['जूते की बात है ना? साफ़ बोलिए।', 'Joote ki baat hai na? Saaf boliye.', 'It is about shoes, right? Speak clearly.']),
  S('queue', ['आगे लाइन है, पर तेज़ चलती है।', 'Aage line hai, par tez chalti hai.', 'There is a line ahead, but it moves fast.'],
    'Ask if the queue is long today.', ['Aaj line lambi hai kya?', 'आज लाइन लंबी है क्या?'],
    ['kya aaj bahut bheed hai', 'line mein kitni der lagegi', 'didi aaj queue kitni lambi hai', 'bheed zyada hai kya aaj'],
    ['Ask about the queue.', 'Is the line long = "line lambi hai kya".'],
    ['नहीं, आज बस दस मिनट। जाइए, शांति से देख आइए।', 'Nahi, aaj bas das minute. Jaiye, shaanti se dekh aaiye.', 'No, only ten minutes today. Go, see it in peace.'],
    ['लाइन का पूछा? फिर बोलिए, धुँधला सुना।', 'Line ka puchha? Phir boliye, dhundhla suna.', 'You asked about the line? Say again, I heard faintly.']),
], ['जाइए, अंदर मोबाइल बंद रखना। चुप रहना!', 'Jaiye, andar mobile band rakhna. Chup rehna!', 'Go, keep the mobile off inside. Stay quiet!'],
  [['joote kahaan rakh doon?', 'where should I leave my shoes?'], ['aaj line lambi hai kya?', 'is the line long today?']], ['अरे भैया, वापस आ गए? फूल लोगे?', 'Arre bhaiya, waapas aa gaye? Phool loge?', 'Oh brother, you are back? Want flowers?'], 2);

export const juiceMan = P('haji-juice-man', 'Dilbagh', 'shikanji stall man', 'Lotus Temple causeway, shikanji stall', 'm', 'Order a shikanji and ask for ice.', [
  S('order', ['ठंडा शिकंजी, ठंडा शिकंजी! एक गिलास दस रुपये!', 'Thanda shikanji, thanda shikanji! Ek glass das rupaye!', 'Cold shikanji! One glass for ten rupees!'],
    'Order one shikanji with less sugar.', ['Ek shikanji dena, cheeni kam.', 'एक शिकंजी देना, चीनी कम।'],
    ['bhaiya ek shikanji kam meetha', 'ek shikanji dena thodi cheeni', 'paaji ek shikanji pa do', 'ek nimbu pani dena kam cheeni'],
    ['Order one glass, less sugar.', 'Shikanji = "shikanji". Less sugar = "cheeni kam".'],
    ['लो, ताज़ा नींबू का। धूप में जान आ जाएगी!', 'Lo, taaza nimbu ka. Dhoop mein jaan aa jaayegi!', 'Here, fresh lemon. It will revive you in the sun!'],
    ['कितने गिलास बोला? नींबू की आवाज़ में सुना नहीं।', 'Kitne glass bola? Nimbu ki awaaz mein suna nahi.', 'How many glasses? I could not hear over the squeezing.']),
  S('ice', ['बर्फ़ डालूँ? थोड़ी या ज़्यादा?', 'Barf daalun? Thodi ya zyada?', 'Shall I add ice? A little or a lot?'],
    'Ask for a little ice.', ['Haan, thodi si barf daal do.', 'हाँ, थोड़ी सी बर्फ़ डाल दो।'],
    ['thodi barf daalna bhaiya', 'barf kam rakhna', 'paaji thodi barf pa do', 'haan thodi sa ice'],
    ['Say a little ice.', 'Ice = "barf". A little = "thodi si".'],
    ['लो भैया, ठंडा भी, कम बर्फ़ भी। पी जाओ!', 'Lo bhaiya, thanda bhi, kam barf bhi. Pi jao!', 'Here, cold and with little ice. Drink up!'],
    ['थोड़ी बर्फ़ या ज़्यादा? बता दो।', 'Thodi barf ya zyada? Bata do.', 'A little or a lot of ice? Tell me.']),
], ['गिलास वापस दे देना, भैया।', 'Glass waapas de dena, bhaiya.', 'Return the glass, brother.'],
  [['ek shikanji dena, cheeni kam', 'one shikanji, less sugar'], ['thodi si barf daal do', 'put a little ice']], ['आ गए भैया? आज नींबू एकदम ताज़े हैं।', 'Aa gaye bhaiya? Aaj nimbu ekdum taaze hain.', 'You are here, brother? Lemons are very fresh today.'], 2);

export const hajiFlowerMan = P('haji-chadar-seller-2', 'Bhola', 'flower and prasad stall man', 'Lotus Temple causeway, second stall', 'm', 'Buy a rose for ten rupees.', [
  S('rose', ['गुलाब ले लो, गुलाब! बस दस रुपये का एक!', 'Gulaab le lo, gulaab! Bas das rupaye ka ek!', 'Roses, get roses! Just ten rupees each!'],
    'Buy one rose for ten rupees.', ['Bas ek gulaab dena, das rupaye wala.', 'बस एक गुलाब देना, दस रुपये वाला।'],
    ['ek gulaab dena bhaiya', 'das rupaye ka ek gulaab', 'paaji ek gulaab de do', 'ek gulab chahiye bas'],
    ['Ask for one rose.', 'Rose = "gulaab". One = "ek".'],
    ['ये लो, ताज़ा लाल। सफ़ेद मंदिर पर लाल फूल, क्या बात है!', 'Ye lo, taaza laal. Safed mandir par laal phool, kya baat hai!', 'Here, fresh red. A red flower at the white temple, what a sight!'],
    ['कितने गुलाब? साफ़ साफ़ बोलो भैया।', 'Kitne gulaab? Saaf saaf bolo bhaiya.', 'How many roses? Say it plainly, brother.']),
], ['जाओ, मंदिर देखो। फूल सँभालकर रखना।', 'Jao, mandir dekho. Phool sambhalkar rakhna.', 'Go, see the temple. Keep the flower safe.'],
  [['ek gulaab dena', 'give me one rose']], ['वापस आ गए? गुलाब तैयार हैं!', 'Waapas aa gaye? Gulaab taiyaar hain!', 'Back again? The roses are ready!'], 1);

export const juiceCustomer = P('haji-juice-customer', 'Rekha', 'woman at the shikanji stall', 'Lotus Temple causeway, shikanji stall', 'f', 'Tell her the shikanji will be ready in a minute.', [
  S('wait', ['धूप बहुत तेज़ है! शिकंजी कब बनेगी?', 'Dhoop bahut tez hai! Shikanji kab banegi?', 'The sun is so strong! When will the shikanji be ready?'],
    'Tell her it will be ready in a minute.', ['Bas ek minute, bhaiya nimbu nichod rahe hain.', 'बस एक मिनट, भैया नींबू निचोड़ रहे हैं।'],
    ['ek minute aur didi', 'bas aa hi rahi hai shikanji', 'thoda sabr karo bas ek minute', 'paaji nimbu nichod rahe hain'],
    ['Reassure her.', 'One minute = "ek minute". They are squeezing = "nichod rahe hain".'],
    ['चलो, मैं पल्लू से पंखा झलती हूँ। थैंक्स बेटा।', 'Chalo, main pallu se pankha jhalti hoon. Thanks beta.', 'Okay, I will fan myself with my pallu. Thanks beta.'],
    ['क्या बोला बेटा? गर्मी में दिमाग़ चकरा रहा है।', 'Kya bola beta? Garmi mein dimaag chakra raha hai.', 'What did you say, beta? The heat has my head spinning.']),
], ['अरे, मेरा गिलास आ गया! बहुत ठंडा है।', 'Arre, mera glass aa gaya! Bahut thanda hai.', 'Oh, my glass has come! It is very cold.'],
  [['bas ek minute', 'just one minute']], ['बेटा, आज भी वही गर्मी!', 'Beta, aaj bhi wahi garmi!', 'Beta, the same heat again today!'], 1);

export const hajiElder = P('haji-pilgrim-2', 'Dwarka Das', 'elderly visitor', 'Lotus Temple causeway, near the gate', 'o', 'Say it feels peaceful here.', [
  S('peace', ['देखो बेटा, कमल की पंखुड़ियाँ... कितनी शांति है यहाँ।', 'Dekho beta, kamal ki pankhudiyaan... Kitni shaanti hai yahan.', 'Look, beta, the lotus petals... What peace there is here.'],
    'Say it really feels peaceful.', ['Haan dadaji, yahan sach mein sukoon hai.', 'हाँ दादाजी, यहाँ सच में सुकून है।'],
    ['bahut shaanti hai yahan', 'sach mein sukoon milta hai', 'dadaji yahan sab shaant hai', 'man ko chain mil raha hai'],
    ['Agree softly.', 'Peace = "sukoon". Really = "sach mein".'],
    ['हाँ बेटा। इम्तिहान की चिंता यहाँ छोड़ जाना।', 'Haan beta. Imtihaan ki chinta yahan chhod jaana.', 'Yes beta. Leave your exam worries here.'],
    ['धीरे बोलो बेटा, ये शांति की जगह है।', 'Dheere bolo beta, ye shaanti ki jagah hai.', 'Speak softly, beta, this is a place of peace.']),
], ['अब मैं थोड़ी देर आँखें बंद करूँगा।', 'Ab main thodi der aankhen band karunga.', 'Now I will close my eyes for a while.'],
  [['yahan sach mein sukoon hai', 'there is real peace here']], ['आओ बेटा, यहाँ चुपचाप बैठो।', 'Aao beta, yahan chupchaap baitho.', 'Come, beta, sit here quietly.'], 1);

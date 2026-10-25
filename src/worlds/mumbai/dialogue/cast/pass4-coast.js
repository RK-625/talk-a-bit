// Pass 4: Marine Drive, Haji Ali, Antilia, Juhu beach and the Sea Link toll (17 new people).
import { dialogue as D, step as S } from './kit.js';

export const marineBenchAunty = D('marine-bench-aunty', {
  name: 'Usha Aunty', role: 'aunty on a bench', site: 'Marine Drive bench', diff: 3,
  voice: { rate: 0.95, pitch: 1.05 },
  persona: 'Gossipy retired aunty with a shopping bag, who rests on the same bench every evening and quizzes every child.',
  goal: 'Tell her where you live and what time the sun sets.',
  steps: [
    S('rehna', ['बेटा, तू कहाँ रहता है? माँ-बाप कहाँ हैं?', 'Beta, tu kahan rehta hai? Maa-baap kahan hain?', 'Child, where do you live? Where are your parents?'],
      'Say you live in a chawl in Mumbai.', ['Main Mumbai mein, ek chawl mein rehta hoon.', 'मैं मुंबई में, एक चॉल में रहता हूँ।'],
      ['main mumbai mein ek chawl mein rehta hoon', 'main chawl mein rehta hoon', 'main yahin mumbai mein rehta hoon', 'chawl mein rehta hoon aunty', 'मैं मुंबई में एक चॉल में रहता हूँ', 'मैं चॉल में रहता हूँ', 'i live in a chawl in mumbai', 'main yahin chawl mein rehta hoon'],
      'say_you_live_in_chawl', ['Tell her where you live.', '"rehta hoon" = I live; "chawl" = tenement block.', 'Say: "Main Mumbai mein, ek chawl mein rehta hoon."'],
      ['अच्छा-अच्छा, चॉल में तो सब अपने होते हैं।', 'Achha-achha, chawl mein toh sab apne hote hain.', 'I see, in a chawl everyone is family.'],
      ['कहाँ रहता है, बता ना?', 'Kahan rehta hai, bata na?', 'Where do you live, tell me?']),
    S('suraj', ['सूरज कब डूबेगा? छह बजे या सात?', 'Suraj kab doobega? Chhe baje ya saat?', 'When will the sun set? At six or seven?'],
      'Say the sun sets around six thirty.', ['Suraj saadhe chhe baje doobta hai.', 'सूरज साढ़े छह बजे डूबता है।'],
      ['suraj saadhe chhe baje doobta hai', 'saadhe chhe baje', 'shaam ko saadhe chhe baje', 'chhe baje ke baad', 'सूरज साढ़े छह बजे डूबता है', 'साढ़े छह बजे', 'sun sets at half past six', 'saadhe chhe ke aas paas'],
      'say_sunset_time', ['Give a time.', '"saadhe chhe" = half past six.', 'Say: "Suraj saadhe chhe baje doobta hai."'],
      ['वाह, तुझे तो सब पता है!', 'Wah, tujhe toh sab pata hai!', 'Wow, you know everything!'],
      ['कितने बजे? छह या सात?', 'Kitne baje? Chhe ya saat?', 'At what time? Six or seven?']),
  ],
  outro: ['सुंदर शाम है। जा बेटा, खेल।', 'Sundar shaam hai. Ja beta, khel.', 'A lovely evening. Go play, child.'],
  learned: [['main chawl mein rehta hoon', 'I live in a chawl'], ['saadhe chhe baje', 'at half past six']],
  again: ['आ, बैठ, आज भी सूरज लाल होगा।', 'Aa, baith, aaj bhi suraj laal hoga.', 'Come, sit, the sun will be red again today.'],
});

export const marineBenchReader = D('marine-bench-reader', {
  name: 'Gokhale Kaka', role: 'old man with newspaper', site: 'Marine Drive bench', diff: 3,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Retired professor who solves the crossword on the bench and asks anyone nearby for the last clue.',
  goal: 'Help him with a crossword clue: another word for the sea.',
  steps: [
    S('crossword', ['बेटा, समंदर का दूसरा नाम? तीन अक्षर का शब्द है।', 'Beta, samandar ka doosra naam? Teen akshar ka shabd hai.', 'Child, another name for the sea? A three-letter word.'],
      'Answer the clue: Sagar.', ['Jawab hai Sagar.', 'जवाब है सागर।'],
      ['jawab hai sagar', 'sagar', 'saagar', 'sagar hai', 'जवाब है सागर', 'सागर', 'the answer is sagar', 'sagar kaka'],
      'answer_crossword_sagar', ['Think of a Hindi word for the sea.', 'It starts with "sa" and ends with "r".', 'Say: "Jawab hai Sagar."'],
      ['शाबाश! एकदम सही, S-A-G-A-R!', 'Shabash! Ekdum sahi, S-A-G-A-R!', 'Well done! Exactly right, S-A-G-A-R!'],
      ['सोच ज़रा, समंदर को और क्या कहते हैं?', 'Soch zara, samandar ko aur kya kehte hain?', 'Think a bit, what else do they call the sea?']),
  ],
  outro: ['अब अगला सवाल: चाँद का दूसरा नाम?', 'Ab agla sawaal: chaand ka doosra naam?', 'Now the next clue: another name for the moon?'],
  learned: [['jawab hai Sagar', 'the answer is Sagar (sea)']],
  again: ['आ जा, आज की पहेली और मुश्किल है।', 'Aa ja, aaj ki paheli aur mushkil hai.', 'Come, today\'s puzzle is even harder.'],
});

export const marineCouple2 = D('marine-couple-2', {
  name: 'Varun aur Tanya', role: 'seated couple', site: 'Marine Drive sea wall', diff: 3,
  voice: { rate: 1.05, pitch: 1.15 },
  persona: 'College sweethearts on the sea wall who tease each other and ask a local kid to settle their little bets.',
  goal: 'Explain why Marine Drive is called the Queen\'s Necklace.',
  steps: [
    S('necklace', ['छोटू, इसे क्वीन्स नेकलेस क्यों कहते हैं? हम शर्त लगा रहे हैं।', 'Chotu, ise Queen\'s Necklace kyun kehte hain? Hum shart laga rahe hain.', 'Chotu, why is this called the Queen\'s Necklace? We are betting.'],
      'Explain: at night the lights look like a necklace.', ['Raat ko battiyaan haar jaisi dikhti hain.', 'रात को बत्तियाँ हार जैसी दिखती हैं।'],
      ['raat ko battiyaan haar jaisi dikhti hain', 'raat ko lights haar jaisi dikhti hain', 'battiyaan haar jaisi lagti hain', 'raat mein roshni haar jaisi hai', 'रात को बत्तियाँ हार जैसी दिखती हैं', 'बत्तियाँ हार जैसी लगती हैं', 'at night the lights look like a necklace', 'raat ko lights necklace jaisi dikhti hain'],
      'explain_queens_necklace', ['Say why it has that name.', '"batti" = light; "haar" = necklace.', 'Say: "Raat ko battiyaan haar jaisi dikhti hain."'],
      ['अरे वाह! मैं जीत गई, तुम हारे!', 'Arre wah! Main jeet gayi, tum haare!', 'Oh wow! I won, you lost!'],
      ['कारण बता ना! बत्तियाँ किसके जैसी हैं?', 'Kaaran bata na! Battiyaan kiske jaisi hain?', 'Tell us why! The lights look like what?']),
  ],
  outro: ['ठीक है, मैं इसे आइसक्रीम खिलाऊँगा। शर्त हार गया!', 'Theek hai, main isse ice cream khilaunga. Shart haar gaya!', 'Fine, I will treat her to ice cream. I lost the bet!'],
  learned: [['battiyaan haar jaisi dikhti hain', 'the lights look like a necklace']],
  again: ['अरे छोटू! नई शर्त: हवा कितने बजे ठंडी होगी?', 'Arre Chotu! Nayi shart: hawa kitne baje thandi hogi?', 'Chotu! New bet: at what time will the wind turn cold?'],
});

export const marineJogger2 = D('marine-jogger-2', {
  name: 'Faiz', role: 'jogger', site: 'Marine Drive promenade', diff: 3,
  voice: { rate: 1.15, pitch: 1.0 },
  persona: 'Dedicated early-morning runner who counts every lap and brags about his fitness routine.',
  goal: 'Tell him what time you wake up in the morning.',
  steps: [
    S('uthna', ['तू सुबह कितने बजे उठता है? मैं पाँच बजे उठता हूँ।', 'Tu subah kitne baje uthta hai? Main paanch baje uthta hoon.', 'What time do you wake up? I get up at five.'],
      'Say you wake up at five too.', ['Main bhi subah paanch baje uthta hoon.', 'मैं भी सुबह पाँच बजे उठता हूँ।'],
      ['main bhi subah paanch baje uthta hoon', 'main paanch baje uthta hoon', 'subah paanch baje uthta hoon', 'main bhi paanch baje uthta hoon', 'मैं भी सुबह पाँच बजे उठता हूँ', 'मैं पाँच बजे उठता हूँ', 'i also wake up at five', 'main bhi paanch baje'],
      'say_wake_up_time', ['Tell him your wake-up time.', '"uthta hoon" = I get up.', 'Say: "Main bhi subah paanch baje uthta hoon."'],
      ['वाह, तू तो पक्का एथलीट बनेगा!', 'Wah, tu toh pakka athlete banega!', 'Wow, you will surely become an athlete!'],
      ['कितने बजे उठता है तू?', 'Kitne baje uthta hai tu?', 'At what time do you get up?']),
  ],
  outro: ['चल, मैं एक और लैप मारता हूँ!', 'Chal, main ek aur lap marta hoon!', 'Okay, I will do one more lap!'],
  learned: [['main paanch baje uthta hoon', 'I wake up at five']],
  again: ['आज मैंने दस लैप मारे! तूने?', 'Aaj maine das lap maare! Tune?', 'Today I ran ten laps! And you?'],
});

export const marineMorningWalker = D('marine-morning-walker', {
  name: 'Kamat Dada', role: 'elderly morning walker', site: 'Marine Drive promenade', diff: 3,
  voice: { rate: 0.85, pitch: 0.8 },
  persona: 'Courteous old gentleman with a folded umbrella who greets every stranger with a formal good-morning.',
  goal: 'Return his greeting politely and ask how he is.',
  steps: [
    S('suprabhat', ['सुप्रभात, बेटा! आज की सुबह कितनी सुंदर है।', 'Suprabhat, beta! Aaj ki subah kitni sundar hai.', 'Good morning, child! What a lovely morning today.'],
      'Greet him back and ask how he is (polite).', ['Suprabhat dada, aap kaise hain?', 'सुप्रभात दादा, आप कैसे हैं?'],
      ['suprabhat dada aap kaise hain', 'suprabhat dada', 'namaste dada aap kaise hain', 'dada aap kaise hain', 'सुप्रभात दादा आप कैसे हैं', 'दादा आप कैसे हैं', 'good morning dada how are you', 'suprabhat aap kaise hain'],
      'greet_and_ask_how_are_you', ['Greet him and ask about him.', '"aap kaise hain" = how are you (polite).', 'Say: "Suprabhat dada, aap kaise hain?"'],
      ['मैं बिलकुल ठीक हूँ, समंदर की हवा दवा है।', 'Main bilkul theek hoon, samandar ki hawa dawa hai.', 'I am perfectly fine, the sea breeze is medicine.'],
      ['सुप्रभात कहो, और हाल पूछो।', 'Suprabhat kaho, aur haal poocho.', 'Say good morning, and ask how I am.']),
  ],
  outro: ['रोज़ सुबह टहला करो, सेहत बनी रहती है।', 'Roz subah tehla karo, sehat bani rehti hai.', 'Walk every morning, your health stays good.'],
  learned: [['Suprabhat, aap kaise hain?', 'good morning, how are you? (polite)']],
  again: ['सुप्रभात फिर से! बड़ा अच्छा लगा तुझे देखकर।', 'Suprabhat phir se! Bada achha laga tujhe dekhkar.', 'Good morning again! It was nice to see you.'],
});

export const hajiChadarSeller2 = D('haji-chadar-seller-2', {
  name: 'Rafiq Bhai', role: 'chadar seller', site: 'Second stall, Haji Ali island', diff: 3,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Soft-spoken stall owner in a green kurta who guides first-time visitors through the customs of the dargah.',
  goal: 'Cover your head as a mark of respect and buy a packet of incense.',
  steps: [
    S('sar', ['अंदर जाने से पहले सिर ढक लो, बेटा।', 'Andar jaane se pehle sir dhak lo, beta.', 'Cover your head before going inside, child.'],
      'Say you will cover your head.', ['Ji, main sir dhak leta hoon.', 'जी, मैं सिर ढक लेता हूँ।'],
      ['ji main sir dhak leta hoon', 'main sir dhak leta hoon', 'sir dhak leta hoon', 'ji sir dhak lunga', 'जी मैं सिर ढक लेता हूँ', 'सिर ढक लेता हूँ', 'yes i will cover my head', 'ji dhak leta hoon'],
      'agree_to_cover_head', ['Say you will cover your head.', '"sir dhak" = cover the head.', 'Say: "Ji, main sir dhak leta hoon."'],
      ['शाबाश! ये रुमाल ले लो, सिर पर बाँध लो।', 'Shabash! Ye rumaal le lo, sir par baandh lo.', 'Well done! Take this scarf and tie it on your head.'],
      ['सिर ढकोगे कि नहीं, बेटा?', 'Sir dhakoge ki nahi, beta?', 'Will you cover your head or not, child?']),
    S('agarbatti', ['अगरबत्ती चाहिए क्या दुआ के लिए?', 'Agarbatti chahiye kya dua ke liye?', 'Do you want incense for the prayer?'],
      'Ask for one packet of incense.', ['Ek agarbatti ka packet dena.', 'एक अगरबत्ती का पैकेट देना।'],
      ['ek agarbatti ka packet dena', 'agarbatti ka packet dijiye', 'ek packet agarbatti', 'haan agarbatti dena', 'एक अगरबत्ती का पैकेट देना', 'अगरबत्ती दीजिए', 'one packet of incense', 'haan ek agarbatti dijiye'],
      'ask_incense_packet', ['Ask for the incense.', '"agarbatti" = incense sticks.', 'Say: "Ek agarbatti ka packet dena."'],
      ['ये लो, ख़ुशबू से मन शांत होगा।', 'Ye lo, khushboo se man shaant hoga.', 'Here, the fragrance will calm the mind.'],
      ['अगरबत्ती चाहिए या नहीं?', 'Agarbatti chahiye ya nahi?', 'Do you want incense or not?']),
  ],
  outro: ['अल्लाह तुम्हारी हर दुआ क़बूल करे।', 'Allah tumhari har dua qabool kare.', 'May Allah accept every prayer of yours.'],
  learned: [['main sir dhak leta hoon', 'I cover my head'], ['ek agarbatti ka packet dena', 'give me a packet of incense']],
  again: ['आओ बेटा, आज भीड़ कम है।', 'Aao beta, aaj bheed kam hai.', 'Come child, there is less crowd today.'],
});

export const hajiJuiceCustomer = D('haji-juice-customer', {
  name: 'Zainab Baji', role: 'woman at the juice centre', site: 'Juice centre, Haji Ali shore', diff: 3,
  voice: { rate: 1.0, pitch: 1.2 },
  persona: 'Thirsty visitor who has been waiting for her juice and is losing patience, but is kind to children.',
  goal: 'Tell her to be patient; the juice will come soon.',
  steps: [
    S('sabr', ['इतनी देर हो गई, मेरा जूस अभी तक नहीं आया!', 'Itni der ho gayi, mera juice abhi tak nahi aaya!', 'It has been so long, my juice has not come yet!'],
      'Tell her to be patient, it will come soon.', ['Thoda sabr kijiye, abhi aa jayega.', 'थोड़ा सब्र कीजिए, अभी आ जाएगा।'],
      ['thoda sabr kijiye abhi aa jayega', 'thoda sabr kijiye', 'abhi aa jayega baji', 'baji thoda ruk jaiye', 'थोड़ा सब्र कीजिए अभी आ जाएगा', 'थोड़ा सब्र कीजिए', 'please be patient it will come soon', 'thoda intezaar kijiye abhi aayega'],
      'tell_to_be_patient', ['Calm her down.', '"sabr" = patience; "aa jayega" = it will come.', 'Say: "Thoda sabr kijiye, abhi aa jayega."'],
      ['सही कह रहे हो, बेटा। सब्र का फल मीठा।', 'Sahi keh rahe ho, beta. Sabr ka phal meetha.', 'You are right, child. Patience bears sweet fruit.'],
      ['क्या बोला? मेरा जूस कब आएगा?', 'Kya bola? Mera juice kab aayega?', 'What did you say? When will my juice come?']),
  ],
  outro: ['देखो, वो रहा! बनने वाला है मेरा जूस।', 'Dekho, wo raha! Banne wala hai mera juice.', 'Look, there it is! My juice is about to be made.'],
  learned: [['thoda sabr kijiye', 'please be a little patient']],
  again: ['अब तो ग्लास भर गया है, देख!', 'Ab toh glass bhar gaya hai, dekh!', 'Now the glass is full, look!'],
});

export const hajiPilgrim2 = D('haji-pilgrim-2', {
  name: 'Abdul Chacha', role: 'elderly pilgrim', site: 'Haji Ali island gate', diff: 4,
  voice: { rate: 0.85, pitch: 0.75 },
  persona: 'Quiet old pilgrim with raised hands who has visited the dargah every Thursday for fifty years.',
  goal: 'Tell him your wish: that everybody stays happy.',
  steps: [
    S('dua', ['बेटा, तेरी क्या दुआ है? ऊपरवाले से माँग ले।', 'Beta, teri kya dua hai? Ooparwale se maang le.', 'Child, what is your prayer? Ask the One above.'],
      'Say your wish is that everybody stays happy.', ['Meri dua hai ki sab khush rahein.', 'मेरी दुआ है कि सब ख़ुश रहें।'],
      ['meri dua hai ki sab khush rahein', 'sab khush rahein', 'meri dua hai sab khush rahein', 'main chahta hoon sab khush rahein', 'मेरी दुआ है कि सब ख़ुश रहें', 'सब ख़ुश रहें', 'my wish is that everyone is happy', 'sab log khush rahein'],
      'share_wish_everyone_happy', ['Share a kind wish.', '"dua" = prayer; "khush rahein" = stay happy.', 'Say: "Meri dua hai ki sab khush rahein."'],
      ['आमीन! तेरे दिल में बड़ी रोशनी है।', 'Aameen! Tere dil mein badi roshni hai.', 'Aameen! Your heart is full of light.'],
      ['क्या माँगा तूने? ज़ोर से बोल।', 'Kya manga tune? Zor se bol.', 'What did you ask for? Say it loudly.']),
  ],
  outro: ['अल्लाह ख़ैर करे, बेटा।', 'Allah khair kare, beta.', 'May Allah keep you safe, child.'],
  learned: [['meri dua hai ki sab khush rahein', 'my wish is that all stay happy']],
  again: ['बैठ, चुपचाप दुआ कर ले।', 'Baith, chupchaap dua kar le.', 'Sit, offer your prayer quietly.'],
});

export const antiliaChauffeur = D('antilia-chauffeur', {
  name: 'Pradeep Driver', role: 'chauffeur', site: 'Beside the vintage car, Antilia', diff: 3,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Proud chauffeur who polishes a 1930s car every morning and loves it more than his own scooter.',
  goal: 'Admire the vintage car and say your hands are clean before touching it.',
  steps: [
    S('gaadi', ['ये देख, 1930 की गाड़ी है। पसंद आई?', 'Ye dekh, 1930 ki gaadi hai. Pasand aayi?', 'Look, a 1930 car. Do you like it?'],
      'Say the car is very old and beautiful.', ['Gaadi bahut purani aur sundar hai.', 'गाड़ी बहुत पुरानी और सुंदर है।'],
      ['gaadi bahut purani aur sundar hai', 'bahut sundar gaadi hai', 'gaadi purani aur sundar hai', 'kitni sundar gaadi hai', 'गाड़ी बहुत पुरानी और सुंदर है', 'बहुत सुंदर गाड़ी है', 'the car is very old and beautiful', 'wah gaadi bahut sundar hai'],
      'admire_vintage_car', ['Praise the car.', '"purani" = old; "sundar" = beautiful.', 'Say: "Gaadi bahut purani aur sundar hai."'],
      ['सही पहचाना! रोज़ चमकाता हूँ इसे।', 'Sahi pehchana! Roz chamkata hoon ise.', 'You noticed right! I polish it every day.'],
      ['पसंद आई कि नहीं? बोल ना!', 'Pasand aayi ki nahi? Bol na!', 'Do you like it or not? Say it!']),
    S('haath', ['छूना है? पहले बता, तेरे हाथ साफ़ हैं?', 'Chhoona hai? Pehle bata, tere haath saaf hain?', 'Want to touch it? First tell me, are your hands clean?'],
      'Say yes, your hands are clean.', ['Haan, mere haath saaf hain.', 'हाँ, मेरे हाथ साफ़ हैं।'],
      ['haan mere haath saaf hain', 'mere haath saaf hain', 'haath saaf hain', 'haan saaf hain', 'हाँ मेरे हाथ साफ़ हैं', 'हाथ साफ़ हैं', 'yes my hands are clean', 'haan maine haath dhoye hain'],
      'say_hands_are_clean', ['Answer about your hands.', '"haath saaf hain" = hands are clean.', 'Say: "Haan, mere haath saaf hain."'],
      ['ठीक है, बस एक उँगली से छू ले।', 'Theek hai, bas ek ungli se chhoo le.', 'Okay, touch it with just one finger.'],
      ['हाथ साफ़ हैं या गंदे? सच बता।', 'Haath saaf hain ya gande? Sach bata.', 'Are the hands clean or dirty? Tell the truth.']),
  ],
  outro: ['देखा? ये गाड़ी साहब की जान है।', 'Dekha? Ye gaadi saahab ki jaan hai.', 'See? This car is the boss\'s pride.'],
  learned: [['gaadi bahut purani aur sundar hai', 'the car is very old and beautiful'], ['mere haath saaf hain', 'my hands are clean']],
  again: ['अरे, फिर से देखने आया? आज इंजन भी चालू करूँ?', 'Arre, phir se dekhne aaya? Aaj engine bhi chalu karun?', 'Back to look again? Shall I start the engine today?'],
});

export const antiliaDeliveryBoy = D('antilia-delivery-boy', {
  name: 'Arman', role: 'delivery boy', site: 'Outside the gate, Antilia', diff: 3,
  voice: { rate: 1.15, pitch: 1.05 },
  persona: 'Young food-delivery rider with a red cap who is stuck at the gate while the biryani gets cold.',
  goal: 'Advise him to phone the customer.',
  steps: [
    S('order', ['गार्ड अंदर नहीं जाने दे रहा। ऑर्डर ठंडा हो रहा है!', 'Guard andar nahi jaane de raha. Order thanda ho raha hai!', 'The guard will not let me in. The order is getting cold!'],
      'Tell him to phone the customer.', ['Customer ko phone kar lo, bhai.', 'कस्टमर को फ़ोन कर लो, भाई।'],
      ['customer ko phone kar lo bhai', 'customer ko phone karo', 'unko phone kar lo', 'phone kar lo bhai', 'कस्टमर को फ़ोन कर लो भाई', 'कस्टमर को फ़ोन करो', 'call the customer brother', 'bhai customer ko call kar lo'],
      'advise_phone_customer', ['Give him a useful idea.', '"phone kar lo" = call him.', 'Say: "Customer ko phone kar lo, bhai."'],
      ['अरे हाँ, यही करता हूँ! तू बड़ा समझदार है।', 'Arre haan, yahi karta hoon! Tu bada samajhdar hai.', 'Oh yes, I will do that! You are very sensible.'],
      ['क्या करूँ? जल्दी बता ना!', 'Kya karun? Jaldi bata na!', 'What should I do? Tell me quickly!']),
  ],
  outro: ['थैंक्स भाई, अब बिरयानी गरम पहुँचेगी।', 'Thanks bhai, ab biryani garam pahunchegi.', 'Thanks brother, now the biryani will arrive hot.'],
  learned: [['customer ko phone kar lo', 'call the customer']],
  again: ['अब भी गेट पे हूँ, भाई। फ़ोन उठा ही नहीं रहे!', 'Ab bhi gate pe hoon, bhai. Phone utha hi nahi rahe!', 'Still at the gate, brother. They are not picking up!'],
});

export const juhuPavbhajiDiner = D('juhu-pavbhaji-diner-1', {
  name: 'Tarun', role: 'man eating pav bhaji', site: 'Pav bhaji stall stool, Juhu', diff: 2,
  voice: { rate: 1.1, pitch: 1.0 },
  persona: 'Sweaty young man in a yellow shirt who ordered "extra spicy" and now regrets everything.',
  goal: 'Suggest cold water or lassi to cool his tongue.',
  steps: [
    S('tikha', ['आह! बहुत तीखा है! अब क्या करूँ?', 'Aah! Bahut teekha hai! Ab kya karun?', 'Ah! It is so spicy! What do I do now?'],
      'Suggest he drinks cold water or lassi.', ['Thanda paani ya lassi pi lo.', 'ठंडा पानी या लस्सी पी लो।'],
      ['thanda paani ya lassi pi lo', 'lassi pi lo bhai', 'thanda paani pi lo', 'thoda dahi kha lo', 'ठंडा पानी या लस्सी पी लो', 'लस्सी पी लो', 'drink cold water or lassi', 'paani ya lassi pi lijiye'],
      'suggest_water_or_lassi', ['Give him a quick fix.', '"thanda paani" = cold water; "pi lo" = drink.', 'Say: "Thanda paani ya lassi pi lo."'],
      ['हाँ यार, लस्सी ही मँगवाता हूँ। आह!', 'Haan yaar, lassi hi mangwata hoon. Aah!', 'Yes man, I will order a lassi. Ah!'],
      ['तीखा लग रहा है! कुछ बता ना!', 'Teekha lag raha hai! Kuch bata na!', 'It is burning! Say something helpful!']),
  ],
  outro: ['अगली बार "कम तीखा" बोलूँगा, पक्का।', 'Agli baar "kam teekha" bolunga, pakka.', 'Next time I will say "less spicy", for sure.'],
  learned: [['thanda paani ya lassi pi lo', 'drink cold water or lassi']],
  again: ['अभी भी जल रही है जीभ! पूछ मत!', 'Abhi bhi jal rahi hai jeebh! Poochh mat!', 'My tongue is still burning! Do not ask!'],
});

export const juhuHorseHandler = D('juhu-horse-handler', {
  name: 'Bhikhu', role: 'horse handler', site: 'Horse ride, Juhu beach', diff: 2,
  voice: { rate: 1.05, pitch: 0.85 },
  persona: 'Handlebar-moustache horse handler who talks to his horse more than to customers.',
  goal: 'Say you will feed the horse a carrot.',
  steps: [
    S('gajar', ['मेरे घोड़े को गाजर खिलाएगा क्या? बहुत प्यार करता है।', 'Mere ghode ko gaajar khilayega kya? Bahut pyaar karta hai.', 'Will you feed my horse a carrot? He loves them.'],
      'Say yes, you will feed the horse a carrot.', ['Haan, main ghode ko gaajar khilaunga.', 'हाँ, मैं घोड़े को गाजर खिलाऊँगा।'],
      ['haan main ghode ko gaajar khilaunga', 'main gaajar khilaunga', 'ghode ko gaajar dunga', 'haan khilaunga', 'हाँ मैं घोड़े को गाजर खिलाऊँगा', 'मैं गाजर खिलाऊँगा', 'yes i will feed the horse a carrot', 'haan gaajar khilata hoon'],
      'agree_feed_horse_carrot', ['Say yes.', '"ghoda" = horse; "gaajar" = carrot.', 'Say: "Haan, main ghode ko gaajar khilaunga."'],
      ['शाबाश! हथेली खोल के रख, काटेगा नहीं।', 'Shabash! Hatheli khol ke rakh, katega nahi.', 'Well done! Keep your palm open, he will not bite.'],
      ['खिलाएगा कि नहीं? घोड़ा भूखा है।', 'Khilayega ki nahi? Ghoda bhookha hai.', 'Will you feed him or not? The horse is hungry.']),
  ],
  outro: ['देख, कैसे पूँछ हिला रहा है! ख़ुश है!', 'Dekh, kaise poonchh hila raha hai! Khush hai!', 'See how he wags his tail! He is happy!'],
  learned: [['main ghode ko gaajar khilaunga', 'I will feed the horse a carrot']],
  again: ['आज घोड़ा तुझे याद कर रहा था।', 'Aaj ghoda tujhe yaad kar raha tha.', 'The horse was missing you today.'],
});

export const juhuFamilyMom = D('juhu-family-mom', {
  name: 'Pallavi Madam', role: 'mother (beach family)', site: 'Juhu beach, near the shore', diff: 3,
  voice: { rate: 1.05, pitch: 1.15 },
  persona: 'Phone-scrolling mother who suddenly realises her son is not by her side.',
  goal: 'Tell her where her son is playing.',
  steps: [
    S('beta', ['मेरा बेटा कहीं दिखा? हरी शर्ट में, गेंद के साथ।', 'Mera beta kahin dikha? Hari shirt mein, gend ke saath.', 'Have you seen my son? Green shirt, with a ball.'],
      'Tell her he is playing with the ball on the sand.', ['Haan madam, wo wahan ret par ball khel raha hai.', 'हाँ मैडम, वो वहाँ रेत पर बॉल खेल रहा है।'],
      ['haan madam wo wahan ret par ball khel raha hai', 'wo wahan ret par khel raha hai', 'haan wo wahan ball se khel raha hai', 'madam wo udhar khel raha hai', 'हाँ मैडम वो वहाँ रेत पर बॉल खेल रहा है', 'वो वहाँ रेत पर खेल रहा है', 'yes he is playing with a ball over there', 'haan madam udhar ret par hai'],
      'tell_where_son_is', ['Say where you saw him.', '"wahan" = there; "ret" = sand.', 'Say: "Haan madam, wo wahan ret par ball khel raha hai."'],
      ['अरे हाँ, वो रहा! थैंक यू बेटा!', 'Arre haan, wo raha! Thank you beta!', 'Oh yes, there he is! Thank you, child!'],
      ['कहाँ है वो? जल्दी बता!', 'Kahan hai wo? Jaldi bata!', 'Where is he? Tell me quickly!']),
  ],
  outro: ['फ़ोन में ऐसी खोई कि बेटा ही भूल गई!', 'Phone mein aisi khoyi ki beta hi bhool gayi!', 'I got so lost in my phone that I forgot my son!'],
  learned: [['wo wahan ret par khel raha hai', 'he is playing there on the sand']],
  again: ['अब तो हाथ पकड़ के रखा है उसका!', 'Ab toh haath pakad ke rakha hai uska!', 'Now I am holding his hand firmly!'],
});

export const juhuFamilyDad = D('juhu-family-dad', {
  name: 'Sanjay Bhai', role: 'father (beach family)', site: 'Juhu beach, near the shore', diff: 3,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Easy-going dad with a camera who cannot decide what to eat and asks every local.',
  goal: 'Recommend bhel puri and say it is not too spicy.',
  steps: [
    S('khana', ['यार, भेल, पाव भाजी या गोला? क्या खाऊँ?', 'Yaar, bhel, pav bhaji ya gola? Kya khaun?', 'Man, bhel, pav bhaji or gola? What should I eat?'],
      'Recommend bhel puri.', ['Aap bhel khaiye, wo mashhoor hai.', 'आप भेल खाइए, वो मशहूर है।'],
      ['aap bhel khaiye wo mashhoor hai', 'bhel khaiye', 'bhel khao wo mashhoor hai', 'main bhel kahunga', 'आप भेल खाइए वो मशहूर है', 'भेल खाइए', 'eat the bhel it is famous', 'bhel khaiye bahut achhi hai'],
      'recommend_bhel_puri', ['Pick one dish for him.', '"khaiye" = please eat; "mashhoor" = famous.', 'Say: "Aap bhel khaiye, wo mashhoor hai."'],
      ['ठीक है, भेल ही खाता हूँ। तू सही लग रहा है।', 'Theek hai, bhel hi khata hoon. Tu sahi lag raha hai.', 'Okay, I will have bhel. You seem right.'],
      ['तू ही बता, क्या खाऊँ?', 'Tu hi bata, kya khaun?', 'You tell me, what should I eat?']),
    S('tikha', ['ज़्यादा तीखा तो नहीं होगा ना?', 'Zyaada teekha toh nahi hoga na?', 'It will not be too spicy, will it?'],
      'Say it is not too spicy.', ['Nahi, zyaada teekha nahi hota.', 'नहीं, ज़्यादा तीखा नहीं होता।'],
      ['nahi zyaada teekha nahi hota', 'zyaada teekha nahi hota', 'nahi teekha nahi hai', 'bilkul teekha nahi hai', 'नहीं ज़्यादा तीखा नहीं होता', 'ज़्यादा तीखा नहीं होता', 'no it is not too spicy', 'nahi bahut teekha nahi hai'],
      'say_not_too_spicy', ['Reassure him.', '"teekha" = spicy.', 'Say: "Nahi, zyaada teekha nahi hota."'],
      ['चलो, तो बच्चों के लिए भी ले लूँगा।', 'Chalo, toh bachchon ke liye bhi le lunga.', 'Good, then I will get some for the kids too.'],
      ['तीखा होगा या नहीं? बता ना।', 'Teekha hoga ya nahi? Bata na.', 'Will it be spicy or not? Tell me.']),
  ],
  outro: ['थैंक्स, बेटा। आज की बीच ट्रिप बन गई।', 'Thanks, beta. Aaj ki beach trip ban gayi.', 'Thanks, child. Today\'s beach trip is made.'],
  learned: [['aap bhel khaiye', 'please have the bhel'], ['zyaada teekha nahi hota', 'it is not too spicy']],
  again: ['अरे वाह, भेल सच में मज़ेदार थी!', 'Arre wah, bhel sach mein mazedaar thi!', 'Wow, the bhel was really tasty!'],
});

export const juhuFamilyKid = D('juhu-family-kid', {
  name: 'Aarav', role: 'child (beach family)', site: 'Juhu beach, near the shore', diff: 1,
  voice: { rate: 1.2, pitch: 1.5 },
  persona: 'Hyper little boy with a ball who wants a catching partner right now.',
  goal: 'Accept a game of catch.',
  steps: [
    S('catch', ['भैया, कैच-कैच खेलेगा? मैं बॉल फेंकूँगा!', 'Bhaiya, catch-catch khelega? Main ball phenkunga!', 'Brother, will you play catch? I will throw the ball!'],
      'Say yes, throw the ball and you will catch it.', ['Haan, ball phenko, main pakadta hoon.', 'हाँ, बॉल फेंको, मैं पकड़ता हूँ।'],
      ['haan ball phenko main pakadta hoon', 'ball phenko main pakadunga', 'phenko main pakad lunga', 'haan phenko', 'हाँ बॉल फेंको मैं पकड़ता हूँ', 'बॉल फेंको मैं पकड़ूँगा', 'yes throw the ball i will catch', 'haan chalo ball phenko'],
      'accept_game_of_catch', ['Say yes and ask him to throw.', '"phenko" = throw; "pakadta hoon" = I catch.', 'Say: "Haan, ball phenko, main pakadta hoon."'],
      ['ये ले! ज़ोर से आ रही है!', 'Ye le! Zor se aa rahi hai!', 'Here! It is coming hard!'],
      ['बोल ना भैया, खेलेगा कि नहीं?', 'Bol na bhaiya, khelega ki nahi?', 'Say it, brother, will you play or not?']),
  ],
  outro: ['वाह भैया! तू तो एकदम फ़ील्डर है!', 'Wah bhaiya! Tu toh ekdum fielder hai!', 'Wow brother! You are a real fielder!'],
  learned: [['ball phenko, main pakadta hoon', 'throw the ball, I will catch it']],
  again: ['भैया, एक और बार? मैं और ज़ोर से फेंकूँगा!', 'Bhaiya, ek aur baar? Main aur zor se phenkunga!', 'Brother, one more time? I will throw harder!'],
});

export const juhuLifeguard = D('juhu-lifeguard', {
  name: 'Santosh', role: 'lifeguard', site: 'Shoreline, Juhu beach', diff: 3,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Serious lifeguard in a red shirt who watches the waves like a hawk and blows his whistle at the slightest risk.',
  goal: 'Promise to stay near the shore and to call him if anyone is in trouble.',
  steps: [
    S('kinara', ['गहरे पानी में मत जाना! लहरें बहुत तेज़ हैं!', 'Gehre paani mein mat jaana! Lehrein bahut tez hain!', 'Do not go into deep water! The waves are very strong!'],
      'Promise to stay near the shore.', ['Theek hai bhaiya, main kinare par hi rahunga.', 'ठीक है भैया, मैं किनारे पर ही रहूँगा।'],
      ['theek hai bhaiya main kinare par hi rahunga', 'main kinare par hi rahunga', 'kinare par rahunga bhaiya', 'main gehre paani mein nahi jaunga', 'ठीक है भैया मैं किनारे पर ही रहूँगा', 'किनारे पर ही रहूँगा', 'ok brother i will stay at the shore', 'main kinare pe hi rahunga'],
      'promise_stay_near_shore', ['Promise to stay safe.', '"kinare par" = at the shore.', 'Say: "Theek hai bhaiya, main kinare par hi rahunga."'],
      ['शाबाश, समझदार बच्चे हैं आप।', 'Shabash, samajhdar bachche hain aap.', 'Well done, you are a sensible child.'],
      ['कहाँ रहोगे? किनारे पर या गहरे में?', 'Kahan rahoge? Kinare par ya gehre mein?', 'Where will you stay? At the shore or in the deep?']),
    S('madad', ['अगर कोई डूबता दिखे तो क्या करोगे?', 'Agar koi doobta dikhe toh kya karoge?', 'If you see someone drowning, what will you do?'],
      'Say you will call him immediately.', ['Main turant aapko bulaunga.', 'मैं तुरंत आपको बुलाऊँगा।'],
      ['main turant aapko bulaunga', 'turant bulaunga', 'main aapko turant bulaunga', 'main madad ke liye chillaunga', 'मैं तुरंत आपको बुलाऊँगा', 'तुरंत बुलाऊँगा', 'i will call you immediately', 'main fauran aapko bulata hoon'],
      'promise_call_lifeguard', ['Say what you will do.', '"turant" = immediately; "bulaunga" = I will call.', 'Say: "Main turant aapko bulaunga."'],
      ['बिलकुल सही! सीटी बजाकर आ जाऊँगा।', 'Bilkul sahi! Seeti bajakar aa jaunga.', 'Exactly right! I will come blowing the whistle.'],
      ['क्या करोगे? ख़ुद कूदोगे?', 'Kya karoge? Khud kudoge?', 'What will you do? Jump in yourself?']),
  ],
  outro: ['सुरक्षित रहो, मज़ा करो।', 'Surakshit raho, maza karo.', 'Stay safe, have fun.'],
  learned: [['main kinare par hi rahunga', 'I will stay near the shore'], ['main turant aapko bulaunga', 'I will call you at once']],
  again: ['सीटी सुनी? चलो, किनारे की तरफ़।', 'Seeti suni? Chalo, kinare ki taraf.', 'Heard the whistle? Come, towards the shore.'],
});

export const tollCollector = D('toll-collector', {
  name: 'Chaudhary Kaka', role: 'toll collector', site: 'Toll booth, Sea Link', diff: 3,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Grey-haired toll booth veteran who works the night shift with only a torch for company.',
  goal: 'Tell him you are not afraid of the dark.',
  steps: [
    S('andhera', ['रात को टॉर्च ही मेरा साथी है। तू अँधेरे से डरता है?', 'Raat ko torch hi mera saathi hai. Tu andhere se darta hai?', 'At night the torch is my only companion. Are you afraid of the dark?'],
      'Say no, you are not afraid of the dark.', ['Nahi kaka, mujhe andhere se dar nahi lagta.', 'नहीं काका, मुझे अँधेरे से डर नहीं लगता।'],
      ['nahi kaka mujhe andhere se dar nahi lagta', 'mujhe andhere se dar nahi lagta', 'andhere se dar nahi lagta', 'nahi kaka main nahi darta', 'नहीं काका मुझे अँधेरे से डर नहीं लगता', 'मुझे अँधेरे से डर नहीं लगता', 'no uncle i am not afraid of the dark', 'nahi kaka dar nahi lagta'],
      'say_not_afraid_of_dark', ['Answer his question.', '"dar nahi lagta" = I am not scared.', 'Say: "Nahi kaka, mujhe andhere se dar nahi lagta."'],
      ['शाबाश! बहादुर बच्चा है तू।', 'Shabash! Bahadur bachcha hai tu.', 'Well done! You are a brave child.'],
      ['डरता है या नहीं? सच बोल!', 'Darta hai ya nahi? Sach bol!', 'Are you afraid or not? Tell the truth!']),
  ],
  outro: ['ये ले, टॉर्च की रोशनी में पुल कितना सुंदर लगता है।', 'Ye le, torch ki roshni mein pul kitna sundar lagta hai.', 'See how beautiful the bridge looks in torchlight.'],
  learned: [['mujhe andhere se dar nahi lagta', 'I am not afraid of the dark']],
  again: ['रात हो गई, टॉर्च जला दूँ?', 'Raat ho gayi, torch jala doon?', 'It is night, shall I switch on the torch?'],
});

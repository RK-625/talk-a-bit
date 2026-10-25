// Pass 4: Fort (bus stops, CST, Rajabai, Flora, BSE), the Taj and the Gateway plaza (15 new people).
import { dialogue as D, step as S } from './kit.js';

export const fortBusWaiter1 = D('fort-bus-waiter-1', {
  name: 'Nisha Madam', role: 'woman waiting for a bus', site: 'Bus stop, Fort', diff: 2,
  voice: { rate: 1.05, pitch: 1.2 },
  persona: 'Neat office worker with a lilac umbrella who never trusts the weather and always shares it.',
  goal: 'Accept shelter under her umbrella.',
  steps: [
    S('chhatri', ['बारिश आने वाली है। मेरी छतरी के नीचे आ जा।', 'Baarish aane wali hai. Meri chhatri ke neeche aa ja.', 'It is about to rain. Come under my umbrella.'],
      'Say thanks and that you are coming under it.', ['Shukriya didi, main chhatri ke neeche aata hoon.', 'शुक्रिया दीदी, मैं छतरी के नीचे आता हूँ।'],
      ['shukriya didi main chhatri ke neeche aata hoon', 'shukriya didi aata hoon', 'thank you didi main aata hoon', 'chhatri ke neeche aa gaya didi', 'शुक्रिया दीदी मैं छतरी के नीचे आता हूँ', 'शुक्रिया दीदी', 'thanks didi coming under it', 'ji didi aa gaya'],
      'accept_umbrella_shelter', ['Thank her and step under.', '"chhatri" = umbrella; "neeche" = under.', 'Say: "Shukriya didi, main chhatri ke neeche aata hoon."'],
      ['ये हुई न बात! देख, बूँदें शुरू हो गईं।', 'Ye hui na baat! Dekh, boondein shuru ho gayin.', 'That is the way! Look, the drops have started.'],
      ['भीग जाएगा, छतरी के नीचे आ ना!', 'Bheeg jayega, chhatri ke neeche aa na!', 'You will get wet, come under the umbrella!']),
  ],
  outro: ['बस आएगी तो साथ ही चढ़ेंगे।', 'Bus aayegi toh saath hi chadhenge.', 'When the bus comes we will board together.'],
  learned: [['main chhatri ke neeche aata hoon', 'I am coming under the umbrella']],
  again: ['अब भी बादल हैं, यहीं खड़ा रह।', 'Ab bhi baadal hain, yahin khada rah.', 'There are still clouds, stay right here.'],
});

export const fortBusWaiter2 = D('fort-bus-waiter-2', {
  name: 'Kunal', role: 'young man waiting for a bus', site: 'Bus stop, Fort', diff: 3,
  voice: { rate: 1.15, pitch: 1.0 },
  persona: 'Phone-addicted young engineer whose battery is always about to die.',
  goal: 'Say you have no phone and that he should ask the conductor about the bus.',
  steps: [
    S('charge', ['यार, मेरा फ़ोन दो परसेंट पे है। तेरे पास चार्जर है?', 'Yaar, mera phone do percent pe hai. Tere paas charger hai?', 'Man, my phone is at two percent. Do you have a charger?'],
      'Say you do not have a phone or charger.', ['Nahi bhai, mere paas phone nahi hai.', 'नहीं भाई, मेरे पास फ़ोन नहीं है।'],
      ['nahi bhai mere paas phone nahi hai', 'mere paas phone nahi hai', 'nahi bhai charger nahi hai', 'mere paas charger nahi hai', 'नहीं भाई मेरे पास फ़ोन नहीं है', 'मेरे पास फ़ोन नहीं है', 'no brother i dont have a phone', 'nahi bhai nahi hai'],
      'say_no_phone_or_charger', ['Tell him you cannot help.', '"mere paas ... nahi hai" = I do not have ...', 'Say: "Nahi bhai, mere paas phone nahi hai."'],
      ['अरे यार, चल कोई बात नहीं।', 'Arre yaar, chal koi baat nahi.', 'Oh man, never mind.'],
      ['चार्जर है कि नहीं? हाँ या ना?', 'Charger hai ki nahi? Haan ya na?', 'Do you have a charger or not? Yes or no?']),
    S('bus', ['तो बस कब आएगी, कुछ पता है?', 'Toh bus kab aayegi, kuch pata hai?', 'So when will the bus come, do you know anything?'],
      'Say you do not know; ask the conductor.', ['Mujhe nahi pata, kaka se poochho.', 'मुझे नहीं पता, काका से पूछो।'],
      ['mujhe nahi pata kaka se poochho', 'mujhe nahi pata conductor se poochho', 'pata nahi kaka se poochho', 'conductor kaka se pooch lo', 'मुझे नहीं पता काका से पूछो', 'पता नहीं कंडक्टर से पूछो', 'i dont know ask the conductor', 'mujhe nahi pata unse poochho'],
      'say_dont_know_ask_conductor', ['Say you are not sure and point him to someone else.', '"mujhe nahi pata" = I do not know; "poochho" = ask.', 'Say: "Mujhe nahi pata, kaka se poochho."'],
      ['ठीक है, उन्हीं से पूछता हूँ। थैंक्स!', 'Theek hai, unhi se poochta hoon. Thanks!', 'Okay, I will ask him. Thanks!'],
      ['पता है कि नहीं? किससे पूछूँ?', 'Pata hai ki nahi? Kisse poochun?', 'Do you know or not? Whom do I ask?']),
  ],
  outro: ['चल, बैटरी बचाने के लिए फ़ोन बंद करता हूँ।', 'Chal, battery bachane ke liye phone band karta hoon.', 'Okay, I will switch off the phone to save battery.'],
  learned: [['mere paas phone nahi hai', 'I do not have a phone'], ['mujhe nahi pata, poochho', 'I do not know, ask']],
  again: ['अब बैटरी एक परसेंट है! भाई!', 'Ab battery ek percent hai! Bhai!', 'The battery is at one percent now! Brother!'],
});

export const fortDabbawalaWalker = D('fort-dabbawala-walker', {
  name: 'Vitthal Mama', role: 'dabbawala on his round', site: 'Great Road footpath, Fort to Gateway', diff: 3,
  voice: { rate: 1.2, pitch: 0.9 },
  persona: 'Brisk dabbawala who walks as if the tiffins are late by one minute, which is a crime.',
  goal: 'Make way and wish him a good round.',
  steps: [
    S('way', ['छोटू, रास्ता दे! टिफ़िन लेट हो रहा है!', 'Chotu, rasta de! Tiffin late ho raha hai!', 'Chotu, make way! The tiffin is getting late!'],
      'Tell him to go ahead quickly.', ['Jaiye mama, aap jaldi jaiye.', 'जाइए मामा, आप जल्दी जाइए।'],
      ['jaiye mama aap jaldi jaiye', 'jaiye mama jaldi jaiye', 'mama aap jaiye', 'aap jaldi jao mama', 'जाइए मामा आप जल्दी जाइए', 'मामा जल्दी जाइए', 'go quickly uncle', 'jaldi jaiye mama'],
      'let_dabbawala_pass', ['Let him pass.', '"jaldi jaiye" = go quickly.', 'Say: "Jaiye mama, aap jaldi jaiye."'],
      ['शाबाश! समय की क़द्र करता है तू।', 'Shabash! Samay ki kadar karta hai tu.', 'Well done! You respect time.'],
      ['अरे, रास्ता दे ना! देर हो रही है!', 'Arre, rasta de na! Der ho rahi hai!', 'Hey, give way! I am getting late!']),
  ],
  outro: ['समय पर टिफ़िन, यही हमारा धर्म है।', 'Samay par tiffin, yahi hamara dharm hai.', 'Tiffin on time, that is our duty.'],
  learned: [['aap jaldi jaiye', 'please go quickly']],
  again: ['फिर से सामने? ज़रा किनारे चल!', 'Phir se saamne? Zara kinaare chal!', 'In front of me again? Go to the side!'],
});

export const cstCoolie2 = D('cst-coolie-2', {
  name: 'Pandu Kaka', role: 'coolie', site: 'CST forecourt, east end', diff: 3,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Grey-streaked coolie with strong shoulders who waits patiently for heavy bags and sharp bargains.',
  goal: 'Promise to call him if you see a passenger with luggage.',
  steps: [
    S('call', ['छोटू, कोई सामान वाला दिखे तो मुझे बुला लेना।', 'Chotu, koi saaman wala dikhe toh mujhe bula lena.', 'Chotu, if you see a passenger with luggage, call me.'],
      'Promise to call him.', ['Theek hai kaka, aaye toh bula lunga.', 'ठीक है काका, आए तो बुला लूँगा।'],
      ['theek hai kaka aaye toh bula lunga', 'bula lunga kaka', 'haan kaka bula lunga', 'koi aaya toh bula dunga', 'ठीक है काका आए तो बुला लूँगा', 'बुला लूँगा काका', 'ok uncle i will call you', 'ji kaka bula lunga'],
      'promise_to_call_coolie', ['Say you will call him.', '"bula lunga" = I will call you.', 'Say: "Theek hai kaka, aaye toh bula lunga."'],
      ['वाह! तेरा नाम भी कमीशन में लिख दूँगा।', 'Wah! Tera naam bhi commission mein likh dunga.', 'Great! I will write your name in the commission too.'],
      ['बुलाएगा न? हाँ बोल।', 'Bulayega na? Haan bol.', 'You will call me, won\'t you? Say yes.']),
  ],
  outro: ['मेहनत की कमाई सबसे मीठी होती है।', 'Mehnat ki kamai sabse meethi hoti hai.', 'Hard-earned money is the sweetest.'],
  learned: [['aaye toh bula lunga', 'if one comes, I will call you']],
  again: ['कोई सवारी दिखी क्या? नहीं दिखी ना?', 'Koi sawari dikhi kya? Nahi dikhi na?', 'Did you see a passenger? You didn\'t, did you?'],
});

export const cstTiffinSorter2 = D('cst-tiffin-sorter-2', {
  name: 'Namdev Dada', role: 'dabbawala sorting tiffins', site: 'Tiffin pile, CST', diff: 4,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Sharp-eyed sorter who reads painted tiffin codes like a book and trusts nobody to count.',
  goal: 'Read out a tiffin code and say which line to put the crate in.',
  steps: [
    S('code', ['छोटू, इस डिब्बे पे कौन सा कोड है? पढ़ के बता।', 'Chotu, is dabbe pe kaun sa code hai? Padh ke bata.', 'Chotu, what code is on this box? Read it out.'],
      'Read the code: green five.', ['Hara paanch.', 'हरा पाँच।'],
      ['hara paanch', 'hara 5', 'code hara paanch hai', 'dabbe par hara paanch likha hai', 'हरा पाँच', 'हरा पाँच है', 'green five', 'hara panch'],
      'read_code_green_five', ['Say the colour and the number.', '"hara" = green; "paanch" = five.', 'Say: "Hara paanch."'],
      ['सही! आँख तेज़ है तेरी।', 'Sahi! Aankh tez hai teri.', 'Correct! Your eyes are sharp.'],
      ['रंग और नंबर बोल, भाई।', 'Rang aur number bol, bhai.', 'Say the colour and the number, brother.']),
    S('line', ['अब इसे किस लाइन में रखूँ? बाएँ या दाएँ?', 'Ab ise kis line mein rakhun? Baayein ya daayein?', 'Which line do I put it in? Left or right?'],
      'Tell him to put it in the right line.', ['Daayein line mein rakho.', 'दाएँ लाइन में रखो।'],
      ['daayein line mein rakho', 'daayein rakho', 'daayi taraf rakho', 'right wali line mein rakho', 'दाएँ लाइन में रखो', 'दाएँ रखो', 'put it on the right', 'daayein wali line'],
      'tell_put_in_right_line', ['Choose left or right.', '"daayein" = right; "baayein" = left.', 'Say: "Daayein line mein rakho."'],
      ['बढ़िया! डिब्बा सही जगह पहुँचेगा।', 'Badhiya! Dabba sahi jagah pahunchega.', 'Great! The box will reach the right place.'],
      ['बाएँ या दाएँ? एक चुन!', 'Baayein ya daayein? Ek chun!', 'Left or right? Pick one!']),
  ],
  outro: ['एक डिब्बा गलत गया तो पूरा दिन ख़राब।', 'Ek dabba galat gaya toh poora din kharab.', 'One wrong box and the whole day is spoiled.'],
  learned: [['hara paanch', 'green five'], ['daayein line mein rakho', 'put it in the right line']],
  again: ['चल, अगला डिब्बा! इसका रंग लाल है।', 'Chal, agla dabba! Iska rang laal hai.', 'Come, next box! This one is red.'],
});

export const cstOfficegoer2 = D('cst-officegoer-2', {
  name: 'Mr. Kapoor', role: 'office-goer', site: 'CST forecourt, front lane', diff: 3,
  voice: { rate: 1.15, pitch: 0.95 },
  persona: 'Stressed manager who sleepwalks to work and has completely lost track of the days.',
  goal: 'Tell him what day of the week it is.',
  steps: [
    S('din', ['अरे भाई, आज कौन सा दिन है? दिमाग़ चकरा गया।', 'Arre bhai, aaj kaun sa din hai? Dimaag chakra gaya.', 'Hey brother, what day is today? My head is spinning.'],
      'Tell him today is Monday (or any weekday).', ['Aaj Somvaar hai.', 'आज सोमवार है।'],
      ['aaj somvaar hai', 'aaj somvar hai', 'somvaar hai', 'aaj monday hai', 'आज सोमवार है', 'सोमवार है', 'today is monday', 'aaj mangalvaar hai'],
      'say_day_of_week', ['Name a day of the week.', 'Days: Somvaar (Mon), Mangalvaar (Tue)...', 'Say: "Aaj Somvaar hai."'],
      ['ओह, सोमवार! एक और लंबा हफ़्ता।', 'Oh, Somvaar! Ek aur lamba hafta.', 'Oh, Monday! Another long week.'],
      ['कौन सा दिन? सोमवार, मंगलवार?', 'Kaun sa din? Somvaar, Mangalvaar?', 'Which day? Monday, Tuesday?']),
  ],
  outro: ['चलता हूँ, ऑफ़िस में बॉस इंतज़ार कर रहा होगा।', 'Chalta hoon, office mein boss intezaar kar raha hoga.', 'I am off, the boss must be waiting at the office.'],
  learned: [['aaj Somvaar hai', 'today is Monday']],
  again: ['अरे वाह, तुझे तो दिन याद रहते हैं!', 'Arre wah, tujhe toh din yaad rehte hain!', 'Oh wow, you remember the days!'],
});

export const rajabaiBookBrowser = D('rajabai-book-browser', {
  name: 'Akshay', role: 'college student', site: 'Second-hand book stall, Rajabai tower', diff: 3,
  voice: { rate: 1.1, pitch: 1.05 },
  persona: 'Spectacled exam-week student carrying three guidebooks and complaining about all of them.',
  goal: 'Tell him which subject you find hardest.',
  steps: [
    S('subject', ['यार, कल एग्ज़ाम है। तुझे कौन सा सब्जेक्ट सबसे मुश्किल लगता है?', 'Yaar, kal exam hai. Tujhe kaun sa subject sabse mushkil lagta hai?', 'Man, exam tomorrow. Which subject do you find hardest?'],
      'Say maths is the hardest for you.', ['Mujhe ganit sabse mushkil lagta hai.', 'मुझे गणित सबसे मुश्किल लगता है।'],
      ['mujhe ganit sabse mushkil lagta hai', 'ganit sabse mushkil hai', 'mujhe maths mushkil lagta hai', 'mujhe ganit mushkil lagta hai', 'मुझे गणित सबसे मुश्किल लगता है', 'गणित मुश्किल है', 'maths is the hardest for me', 'mujhe maths sabse mushkil lagta hai'],
      'say_hardest_subject_maths', ['Name a subject you find hard.', '"ganit" = maths; "mushkil" = difficult.', 'Say: "Mujhe ganit sabse mushkil lagta hai."'],
      ['हा हा, मेरा भी यही हाल है!', 'Ha ha, mera bhi yahi haal hai!', 'Ha ha, I am in the same state!'],
      ['कौन सा सब्जेक्ट? गणित, इतिहास?', 'Kaun sa subject? Ganit, itihaas?', 'Which subject? Maths, history?']),
  ],
  outro: ['चल, मैं पुरानी गाइड ढूँढता हूँ।', 'Chal, main purani guide dhoondhta hoon.', 'Well, I will go hunt for an old guidebook.'],
  learned: [['mujhe ganit mushkil lagta hai', 'I find maths difficult']],
  again: ['फिर आया? ये किताब सस्ती मिल गई मुझे!', 'Phir aaya? Ye kitaab sasti mil gayi mujhe!', 'Back again? I found this book cheap!'],
});

export const floraLedgeReader = D('flora-ledge-reader', {
  name: 'Ishita', role: 'college girl reading', site: 'Flora fountain ledge', diff: 2,
  voice: { rate: 1.0, pitch: 1.3 },
  persona: 'Dreamy bookworm in spectacles who reads on the fountain ledge every afternoon and loves stories.',
  goal: 'Say you like stories, and name Panchtantra as your favourite.',
  steps: [
    S('kahani', ['छोटू, तुझे कहानियाँ पसंद हैं क्या?', 'Chotu, tujhe kahaniyaan pasand hain kya?', 'Chotu, do you like stories?'],
      'Say yes, you like stories.', ['Haan didi, mujhe kahaniyaan pasand hain.', 'हाँ दीदी, मुझे कहानियाँ पसंद हैं।'],
      ['haan didi mujhe kahaniyaan pasand hain', 'mujhe kahaniyaan pasand hain', 'haan didi pasand hain', 'haan mujhe kahani pasand hai', 'हाँ दीदी मुझे कहानियाँ पसंद हैं', 'मुझे कहानियाँ पसंद हैं', 'yes sister i like stories', 'haan bahut pasand hain'],
      'say_like_stories', ['Answer her question.', '"pasand hain" = I like (plural).', 'Say: "Haan didi, mujhe kahaniyaan pasand hain."'],
      ['अरे वाह, तू तो मेरे जैसा निकला!', 'Arre wah, tu toh mere jaisa nikla!', 'Oh wow, you turned out like me!'],
      ['पसंद हैं या नहीं? हाँ या ना?', 'Pasand hain ya nahi? Haan ya na?', 'Do you like them or not? Yes or no?']),
    S('fav', ['तेरी सबसे पसंदीदा कहानी कौन सी है?', 'Teri sabse pasandida kahani kaun si hai?', 'Which is your favourite story?'],
      'Say your favourite is the Panchtantra stories.', ['Mujhe Panchtantra ki kahaniyaan pasand hain.', 'मुझे पंचतंत्र की कहानियाँ पसंद हैं।'],
      ['mujhe panchtantra ki kahaniyaan pasand hain', 'panchtantra ki kahaniyaan', 'mujhe panchtantra pasand hai', 'meri favourite panchtantra hai', 'मुझे पंचतंत्र की कहानियाँ पसंद हैं', 'पंचतंत्र की कहानियाँ', 'my favourite is panchtantra', 'mujhe panchtantra sabse pasand hai'],
      'name_favourite_panchtantra', ['Name a story you love.', 'Panchtantra = old animal fables.', 'Say: "Mujhe Panchtantra ki kahaniyaan pasand hain."'],
      ['वाह! चालाक लोमड़ी वाली कहानी मेरी भी फ़ेवरेट है।', 'Wah! Chaalak lomdi wali kahani meri bhi favourite hai.', 'Wow! The clever fox story is my favourite too.'],
      ['कौन सी कहानी? नाम तो बता।', 'Kaun si kahani? Naam toh bata.', 'Which story? Tell me the name.']),
  ],
  outro: ['अगली बार तुझे अपनी किताब उधार दूँगी।', 'Agli baar tujhe apni kitaab udhaar dungi.', 'Next time I will lend you my book.'],
  learned: [['mujhe kahaniyaan pasand hain', 'I like stories'], ['Panchtantra ki kahaniyaan', 'Panchtantra stories']],
  again: ['सुन, आज मैं नई कहानी पढ़ रही हूँ। बैठ!', 'Sun, aaj main nayi kahani padh rahi hoon. Baith!', 'Listen, today I am reading a new story. Sit!'],
});

export const floraLedgeSketcher = D('flora-ledge-sketcher', {
  name: 'Dev', role: 'bored teen on the ledge', site: 'Flora fountain ledge', diff: 2,
  voice: { rate: 1.1, pitch: 1.15 },
  persona: 'Cap-wearing teenager who sits on the ledge all afternoon people-watching and loves to chat.',
  goal: 'Tell him what you do: you sell chai at a tapri.',
  steps: [
    S('kaam', ['तू यहाँ क्या करता है, छोटू? मैं तो बोर हो रहा हूँ।', 'Tu yahan kya karta hai, Chotu? Main toh bore ho raha hoon.', 'What do you do here, Chotu? I am bored.'],
      'Say you sell chai at the tapri.', ['Main tapri par chai bechta hoon.', 'मैं टपरी पर चाय बेचता हूँ।'],
      ['main tapri par chai bechta hoon', 'tapri par chai bechta hoon', 'main chai bechta hoon', 'main tapri pe kaam karta hoon', 'मैं टपरी पर चाय बेचता हूँ', 'चाय बेचता हूँ', 'i sell chai at the tapri', 'main chai wala hoon'],
      'say_you_sell_chai', ['Tell him your job.', '"bechta hoon" = I sell.', 'Say: "Main tapri par chai bechta hoon."'],
      ['अच्छा! तो तू मेहनती है, मेरे जैसा नहीं।', 'Achha! Toh tu mehnati hai, mere jaisa nahi.', 'Oh! So you are hardworking, unlike me.'],
      ['तू क्या काम करता है? बता ना!', 'Tu kya kaam karta hai? Bata na!', 'What work do you do? Tell me!']),
  ],
  outro: ['अगली बार तेरी चाय पीने आऊँगा।', 'Agli baar teri chai peene aaunga.', 'Next time I will come to drink your tea.'],
  learned: [['main tapri par chai bechta hoon', 'I sell tea at the tapri']],
  again: ['चल बैठ, आज मैं भी बोर नहीं हूँ।', 'Chal baith, aaj main bhi bore nahi hoon.', 'Come sit, I am not bored today either.'],
});

export const bseBroker = D('bse-broker', {
  name: 'Jhaveri Sahab', role: 'stock broker', site: 'Near the stock ticker, BSE', diff: 4,
  voice: { rate: 1.3, pitch: 1.0 },
  persona: 'Loud broker who is permanently on two phones and treats every minute as money.',
  goal: 'Say his line to the caller: Jhaveri sahab is busy, please call later.',
  steps: [
    S('phone', ['अरे छोटू, ये फ़ोन पकड़! बोल देना कि मैं बिज़ी हूँ।', 'Arre Chotu, ye phone pakad! Bol dena ki main busy hoon.', 'Chotu, hold this phone! Tell the caller I am busy.'],
      'Say into the phone: Jhaveri Sahab is busy, call later.', ['Jhaveri Sahab abhi busy hain, thodi der baad call kijiye.', 'झवेरी साहब अभी बिज़ी हैं, थोड़ी देर बाद कॉल कीजिए।'],
      ['jhaveri sahab abhi busy hain thodi der baad call kijiye', 'sahab busy hain baad mein call kijiye', 'abhi busy hain thodi der baad call karein', 'sahab abhi busy hain', 'झवेरी साहब अभी बिज़ी हैं थोड़ी देर बाद कॉल कीजिए', 'साहब अभी बिज़ी हैं', 'sir is busy please call later', 'jhaveri sahab busy hain baad mein phone kijiye'],
      'take_message_busy_call_later', ['Tell the caller he is busy.', '"busy hain" = is busy; "baad mein call kijiye" = call later.', 'Say: "Jhaveri Sahab abhi busy hain, thodi der baad call kijiye."'],
      ['शाबाश! तू तो पक्का सेक्रेटरी है।', 'Shabash! Tu toh pakka secretary hai.', 'Well done! You are a proper secretary.'],
      ['फ़ोन पर बोल ना, मैं बिज़ी हूँ!', 'Phone par bol na, main busy hoon!', 'Say it on the phone, I am busy!']),
  ],
  outro: ['अब फ़ोन दे, भाव गिर रहे हैं!', 'Ab phone de, bhaav gir rahe hain!', 'Now give me the phone, prices are falling!'],
  learned: [['thodi der baad call kijiye', 'please call after a while']],
  again: ['फिर से फ़ोन बज रहा है! बोल दे वही!', 'Phir se phone baj raha hai! Bol de wahi!', 'The phone is ringing again! Say the same thing!'],
});

export const tajBellboy = D('taj-bellboy', {
  name: 'Mohan', role: 'Taj bellboy', site: 'Taj Mahal Palace entrance', diff: 3,
  voice: { rate: 1.0, pitch: 1.0 },
  persona: 'Polished young bellboy in a periwinkle sherwani who greets everyone like a guest, even a chai boy.',
  goal: 'Tell him you only came to see the Taj.',
  steps: [
    S('welcome', ['नमस्ते! ताज में आपका स्वागत है। किससे मिलना है?', 'Namaste! Taj mein aapka swagat hai. Kisse milna hai?', 'Namaste! Welcome to the Taj. Whom do you want to meet?'],
      'Say you only came to look at the Taj.', ['Main sirf Taj dekhne aaya hoon.', 'मैं सिर्फ़ ताज देखने आया हूँ।'],
      ['main sirf taj dekhne aaya hoon', 'sirf taj dekhne aaya hoon', 'main taj dekhne aaya hoon', 'bas taj dekhne aaya hoon', 'मैं सिर्फ़ ताज देखने आया हूँ', 'सिर्फ़ ताज देखने आया हूँ', 'i only came to see the taj', 'main bas dekhne aaya hoon'],
      'say_only_here_to_look', ['Tell him why you are here.', '"sirf ... dekhne aaya hoon" = I only came to see.', 'Say: "Main sirf Taj dekhne aaya hoon."'],
      ['बिलकुल! बाहर से देखिए, फ़ोटो भी लीजिए।', 'Bilkul! Bahar se dekhiye, photo bhi lijiye.', 'Of course! Look from outside, take photos too.'],
      ['किससे मिलना है, या सिर्फ़ देखना है?', 'Kisse milna hai, ya sirf dekhna hai?', 'Do you want to meet someone, or just look?']),
  ],
  outro: ['ज़रूर आइए, यह इमारत सौ साल से ज़्यादा पुरानी है।', 'Zaroor aaiye, yeh imaarat sau saal se zyaada purani hai.', 'Please do, this building is over a hundred years old.'],
  learned: [['main sirf dekhne aaya hoon', 'I came only to look']],
  again: ['आइए आइए, फिर से स्वागत है!', 'Aaiye aaiye, phir se swagat hai!', 'Come in, come in, welcome again!'],
});

export const gatewayTouristA = D('gateway-tourist-a', {
  name: 'Linda', role: 'tourist', lang: 'en', site: 'Gateway plaza, by the arch', diff: 4,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Cheerful retired schoolteacher from Australia with a sun hat, curious about everything but cautious about her stomach.',
  goal: 'Advise her about drinking water and the best time to visit.',
  steps: [
    S('water', ['Hello! Is the tap water safe to drink here? I fear a sick stomach.', 'Hello! Is the tap water safe to drink here? I fear a sick stomach.', 'Hello! Is the tap water safe to drink here? I fear a sick stomach.'],
      'Tell her to drink bottled water, not tap water.', ['Please drink bottled water, not tap water.', 'Please drink bottled water, not tap water.'],
      ['please drink bottled water', 'drink bottled water not tap water', 'bottled water is safer', 'no, buy a sealed bottle', 'do not drink tap water', 'get bottled water', 'it is better to buy bottled water', 'tap water is not safe, drink bottled'],
      'advise_bottled_water', ['Answer her question about the water.', 'Say tap water is not safe; bottled is better.', 'Say: "Please drink bottled water, not tap water."'],
      ['Oh good tip, thank you, young man!', 'Oh good tip, thank you, young man!', 'Oh good tip, thank you, young man!'],
      ['Sorry, was that a yes or a no for the tap water?', 'Sorry, was that a yes or a no for the tap water?', 'Sorry, was that a yes or a no for the tap water?']),
    S('time', ['And when is the best time to see the arch, morning or evening?', 'And when is the best time to see the arch, morning or evening?', 'And when is the best time to see the arch, morning or evening?'],
      'Suggest the evening because it is cooler.', ['Evening is best, it is cooler then.', 'Evening is best, it is cooler then.'],
      ['evening is best', 'come in the evening it is cooler', 'evening is nicer, less hot', 'i think evening', 'evening, because it is cooler', 'the evening is better', 'morning is too hot, come in the evening', 'evening, the light is beautiful'],
      'suggest_visit_time_evening', ['Choose morning or evening and say why.', 'You can say evening is cooler or prettier.', 'Say: "Evening is best, it is cooler then."'],
      ['Lovely, I shall come back at sunset.', 'Lovely, I shall come back at sunset.', 'Lovely, I shall come back at sunset.'],
      ['Morning or evening? What do you think?', 'Morning or evening? What do you think?', 'Morning or evening? What do you think?']),
  ],
  outro: ['You have been so helpful. Take care now!', 'You have been so helpful. Take care now!', 'You have been so helpful. Take care now!'],
  learned: [['Please drink bottled water', 'a useful tip for tourists'], ['Evening is best', 'a time recommendation']],
  again: ['Hello again! Still trying to get the perfect photo of the arch.', 'Hello again! Still trying to get the perfect photo of the arch.', 'Hello again! Still trying to get the perfect photo of the arch.'],
});

export const gatewayTouristB = D('gateway-tourist-b', {
  name: 'Mark', role: 'tourist', lang: 'en', site: 'Gateway plaza, by the arch', diff: 4,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Backpacker from Canada in a red cap with a battered guidebook, hunting for the Colaba Causeway market.',
  goal: 'Tell him how to reach Colaba Causeway and say it is a short walk.',
  steps: [
    S('way', ['Hey there! How do I get to Colaba Causeway market from here?', 'Hey there! How do I get to Colaba Causeway market from here?', 'Hey there! How do I get to Colaba Causeway market from here?'],
      'Tell him to walk straight and turn left at the Taj.', ['Walk straight and turn left at the Taj.', 'Walk straight and turn left at the Taj.'],
      ['walk straight and turn left at the taj', 'go straight then turn left at the taj', 'straight ahead, then left at the taj', 'walk straight, left after the taj', 'go straight and take a left at the taj', 'keep walking straight and turn left', 'straight and then left by the taj hotel', 'it is straight, then left near the taj'],
      'give_directions_causeway', ['Give him simple directions.', 'Use "straight" and "left" with the Taj as a landmark.', 'Say: "Walk straight and turn left at the Taj."'],
      ['Great, straight then left. Got it!', 'Great, straight then left. Got it!', 'Great, straight then left. Got it!'],
      ['Sorry, I did not catch the directions.', 'Sorry, I did not catch the directions.', 'Sorry, I did not catch the directions.']),
    S('far', ['Is it far? Should I take a taxi?', 'Is it far? Should I take a taxi?', 'Is it far? Should I take a taxi?'],
      'Tell him it is a short walk, no taxi needed.', ['No, it is a ten minute walk.', 'No, it is a ten minute walk.'],
      ['no it is a ten minute walk', 'not far, just a short walk', 'it is close, no taxi needed', 'only ten minutes on foot', 'you can walk, it is near', 'no need for a taxi, it is a short walk', 'it is about ten minutes walking', 'not far at all'],
      'say_short_walk_no_taxi', ['Say whether it is far.', 'It is close: a short walk.', 'Say: "No, it is a ten minute walk."'],
      ['Perfect, I will walk and enjoy the street.', 'Perfect, I will walk and enjoy the street.', 'Perfect, I will walk and enjoy the street.'],
      ['Is it far, or can I just walk?', 'Is it far, or can I just walk?', 'Is it far, or can I just walk?']),
  ],
  outro: ['Thanks a lot, buddy. You saved me a taxi fare!', 'Thanks a lot, buddy. You saved me a taxi fare!', 'Thanks a lot, buddy. You saved me a taxi fare!'],
  learned: [['Walk straight and turn left', 'simple directions in English'], ['It is a ten minute walk', 'how far something is']],
  again: ['Hey again! Was it straight then left? I keep forgetting.', 'Hey again! Was it straight then left? I keep forgetting.', 'Hey again! Was it straight then left? I keep forgetting.'],
});

export const gatewayDanaSeller = D('gateway-dana-seller', {
  name: 'Parvati Bai', role: 'bird-feed seller', site: 'Pigeon-feeding mat, Gateway plaza', diff: 2,
  voice: { rate: 1.1, pitch: 1.15 },
  persona: 'Cheery dana seller who is surrounded by pigeons all day and talks to them as if they were her children.',
  goal: 'Buy a packet of dana to feed the pigeons.',
  steps: [
    S('dana', ['दाना, दाना! कबूतरों को खिलाओ, पुण्य मिलेगा!', 'Dana, dana! Kabootaron ko khilao, punya milega!', 'Dana, dana! Feed the pigeons, you will earn merit!'],
      'Ask for a ten rupee packet of dana.', ['Das ka dana dena, kabootar ko khilaunga.', 'दस का दाना देना, कबूतर को खिलाऊँगा।'],
      ['das ka dana dena kabootar ko khilaunga', 'das ka dana dena', 'ek packet dana dena', 'dana chahiye kabootar ke liye', 'दस का दाना देना कबूतर को खिलाऊँगा', 'दस का दाना देना', 'ten rupees of dana please', 'kabootar ke liye dana dena'],
      'buy_dana_for_pigeons', ['Ask for the bird feed.', '"das ka" = for ten rupees; "kabootar" = pigeon.', 'Say: "Das ka dana dena, kabootar ko khilaunga."'],
      ['ये ले, हाथ फैलाकर खड़ा रह!', 'Ye le, haath failakar khada rah!', 'Here, stand with your hand stretched out!'],
      ['कितने का दाना चाहिए, बेटा?', 'Kitne ka dana chahiye, beta?', 'How much dana do you want, child?']),
  ],
  outro: ['देख, कितने कबूतर आ गए तेरे पास!', 'Dekh, kitne kabootar aa gaye tere paas!', 'Look how many pigeons have come to you!'],
  learned: [['das ka dana dena', 'give me ten rupees of dana']],
  again: ['आ, आज भी कबूतर भूखे हैं।', 'Aa, aaj bhi kabootar bhookhe hain.', 'Come, the pigeons are hungry again today.'],
});

export const gatewayBoatman = D('gateway-boatman', {
  name: 'Ismail Bhai', role: 'boatman', site: 'Jetty edge, Gateway', diff: 3,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Broad-shouldered boatman in a teal turban who calls out to every passer-by and swears the sea is calm.',
  goal: 'Ask how long the boat ride is and say you cannot swim.',
  steps: [
    S('long', ['चलो भाई, समंदर की सैर! एक चक्कर सिर्फ़ सौ रुपये!', 'Chalo bhai, samandar ki sair! Ek chakkar sirf sau rupaye!', 'Come brother, a sea trip! One round for just a hundred rupees!'],
      'Ask how long the ride is.', ['Kitni der ka chakkar hai?', 'कितनी देर का चक्कर है?'],
      ['kitni der ka chakkar hai', 'kitni der ka hai', 'chakkar kitni der ka hai', 'kitna time lagega', 'कितनी देर का चक्कर है', 'कितनी देर का है', 'how long is the ride', 'kitni der lagegi'],
      'ask_boat_ride_duration', ['Ask about the duration.', '"kitni der" = how long.', 'Say: "Kitni der ka chakkar hai?"'],
      ['बस आधे घंटे का, मज़ा आ जाएगा।', 'Bas aadhe ghante ka, maza aa jayega.', 'Just half an hour, you will enjoy it.'],
      ['पूछ तो सही कितनी देर का है!', 'Poochh toh sahi kitni der ka hai!', 'Just ask how long it is!']),
    S('swim', ['डर लगता है क्या? तैरना आता है?', 'Dar lagta hai kya? Tairna aata hai?', 'Are you scared? Do you know how to swim?'],
      'Say no, you cannot swim.', ['Nahi, mujhe tairna nahi aata.', 'नहीं, मुझे तैरना नहीं आता।'],
      ['nahi mujhe tairna nahi aata', 'mujhe tairna nahi aata', 'tairna nahi aata', 'nahi aata tairna', 'नहीं मुझे तैरना नहीं आता', 'मुझे तैरना नहीं आता', 'no i cannot swim', 'mujhe swimming nahi aati'],
      'say_cannot_swim', ['Answer honestly.', '"tairna" = swimming; "nahi aata" = do not know how.', 'Say: "Nahi, mujhe tairna nahi aata."'],
      ['कोई बात नहीं, लाइफ़ जैकेट पहन लेना।', 'Koi baat nahi, life jacket pehen lena.', 'No problem, just wear a life jacket.'],
      ['तैरना आता है कि नहीं? सच बोल।', 'Tairna aata hai ki nahi? Sach bol.', 'Can you swim or not? Tell the truth.']),
  ],
  outro: ['जब हिम्मत आए, तब आना। लहरें इंतज़ार करेंगी।', 'Jab himmat aaye, tab aana. Lehrein intezaar karengi.', 'Come when you feel brave. The waves will wait.'],
  learned: [['kitni der ka chakkar hai', 'how long is the ride'], ['mujhe tairna nahi aata', 'I cannot swim']],
  again: ['अरे, आज हिम्मत आई? चलेगा नाव में?', 'Arre, aaj himmat aayi? Chalega naav mein?', 'Oh, did you find courage today? Will you come in the boat?'],
});

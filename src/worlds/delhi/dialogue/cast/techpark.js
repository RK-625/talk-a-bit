// The Cyber Hub tower garden, gate and cab line, and the quiet lanes near it.
import { P, step as S } from '../kit.js';

export const gateWatchman = P('antilia-gate-watchman', 'Bhim Singh', 'second gate guard', 'Cyber Hub tower gate', 'm', 'Respect his long duty and ask about the night rounds.', [
  S('duty', ['सुबह छह बजे से ड्यूटी पर हूँ, बेटा। पैर दुखने लगे।', 'Subah chhe baje se duty par hoon, beta. Pair dukhne lage.', 'I have been on duty since six, beta. My feet ache.'],
    'Tell him he works very hard.', ['Aap bahut mehnat karte ho, salaam hai.', 'आप बहुत मेहनत करते हो, सलाम है।'],
    ['aapki duty bahut lambi hai', 'bahut mehnat karte ho uncle', 'paaji aapko salaam', 'aap thak jaate honge'],
    ['Respect his work.', 'You work hard = "aap mehnat karte ho". Salute = "salaam".'],
    ['तुम जैसे बच्चों की बात से ही थकान उतर जाती है।', 'Tum jaise bachchon ki baat se hi thakaan utar jaati hai.', 'Words from kids like you wash away the tiredness.'],
    ['धीरे बोलो, गाड़ियों का हॉर्न बज रहा है।', 'Dheere bolo, gaadiyon ka horn baj raha hai.', 'Speak slowly, car horns are blaring.']),
  S('night', ['रात की ड्यूटी में टॉर्च लेकर गश्त लगाता हूँ।', 'Raat ki duty mein torch lekar gasht lagata hoon.', 'On night duty I patrol with a torch.'],
    'Ask if he is scared at night.', ['Raat ko aapko darr nahi lagta?', 'रात को आपको डर नहीं लगता?'],
    ['raat mein darr nahi lagta', 'andhere mein akele dar nahi lagta kya', 'paaji raat ko ghabrahat nahi hoti', 'raat ki duty mein kaisa lagta hai'],
    ['Ask about night duty.', 'Fear = "darr". At night = "raat ko".'],
    ['नहीं बेटा, वर्दी पहनकर डर कहाँ! बस ठंड लगती है।', 'Nahi beta, vardi pehenkar darr kahaan! Bas thand lagti hai.', 'No beta, who is scared in uniform! Only the cold gets me.'],
    ['रात का पूछ रहे हो? फिर से कहो।', 'Raat ka puchh rahe ho? Phir se kaho.', 'Asking about the night? Say it again.']),
], ['जाओ बेटा, नौकरी मिल जाए तो मिठाई ज़रूर लाना।', 'Jao beta, naukri mil jaaye toh mithai zaroor lana.', 'Go beta, bring sweets if you get the job.'],
  [['aap bahut mehnat karte ho, salaam hai', 'you work hard, I salute you'], ['raat ko aapko darr nahi lagta?', 'are you not scared at night?']], ['आओ बेटा, आज रात ठंडी रहेगी!', 'Aao beta, aaj raat thandi rahegi!', 'Come beta, tonight will be cold!'], 2);

export const mali = P('antilia-mali', 'Phoolwati', 'campus gardener and sweeper', 'Cyber Hub tower garden', 'f', 'Admire the garden despite the falling petals.', [
  S('petals', ['गुलमोहर की पंखुड़ियाँ रोज़ झाड़ती हूँ, फिर गिर जाती हैं।', 'Gulmohar ki pankhudiyaan roz jhaadti hoon, phir gir jaati hain.', 'I sweep the gulmohar petals daily, they fall again.'],
    'Say the garden looks lovely anyway.', ['Phir bhi bagiche mein bahut sundar lagta hai.', 'फिर भी बगीचे में बहुत सुंदर लगता है।'],
    ['bagicha bahut sundar hai', 'laal phool bahut pyaare lagte hain', 'aap ne bahut accha rakha hai bagicha', 'garden ek dum mast hai'],
    ['Compliment the garden.', 'Garden = "bagicha". Still lovely = "phir bhi sundar".'],
    ['सच? तुम्हारे जैसे कद्र करने वाले कम हैं। चलो, एक फूल उठा लो।', 'Sach? Tumhare jaise qadr karne wale kam hain. Chalo, ek phool utha lo.', 'Really? Few appreciate like you. Come, pick up a flower.'],
    ['झाड़ू की खड़खड़ में सुना नहीं।', 'Jhaadu ki khadkhad mein suna nahi.', 'I could not hear over the broom rattle.']),
], ['ले जाओ, पर पौधों को हाथ मत लगाना!', 'Le jao, par paudhon ko haath mat lagana!', 'Take it, but do not touch the plants!'],
  [['phir bhi bagiche mein bahut sundar lagta hai', 'still the garden looks lovely']], ['अरे आप? पेड़ आज फिर लाल हो गया!', 'Arre aap? Ped aaj phir laal ho gaya!', 'Oh you? The tree has turned red again today!'], 1);

export const chauffeur = P('antilia-chauffeur', 'Sardar Mohan Singh', 'cab driver', 'Cyber Hub tower, white cab line', 'o', 'Admire his clean car and politely decline a ride.', [
  S('car', ['पुत्तर, मेरी गाड़ी देखी? शीशे जैसी चमकती है!', 'Puttar, meri gaadi dekhi? Sheeshe jaisi chamakti hai!', 'Puttar, see my car? It shines like a mirror!'],
    'Say his car is spotless.', ['Waah paaji, gaadi ekdum chamak rahi hai.', 'वाह पाजी, गाड़ी एकदम चमक रही है।'],
    ['gaadi bahut saaf hai paaji', 'oye kya chamak hai', 'zabardast rakhi hai gaadi', 'bahut sundar car hai aapki'],
    ['Praise the car.', 'Your car shines = "gaadi chamak rahi hai". Spotless = "ekdum".'],
    ['रोज़ सुबह अपने हाथ से पोंछता हूँ। गाड़ी भी माँ की तरह है।', 'Roz subah apne haath se ponchhta hoon. Gaadi bhi maa ki tarah hai.', 'I wipe it by hand every morning. A car is like a mother.'],
    ['की बोलेया? ज़रा ऊँचा बोल पुत्तर।', 'Ki boleya? Zara ooncha bol puttar.', 'What did you say? Speak up, puttar.']),
  S('ride', ['चल बैठ पुत्तर, कहीं छोड़ दूँ? मेट्रो तक मुफ़्त!', 'Chal baith puttar, kahin chhod dun? Metro tak muft!', 'Come sit, puttar, shall I drop you somewhere? Free till the metro!'],
    'Politely decline, you will take the metro.', ['Abhi nahi paaji, main metro se chala jaunga.', 'अभी नहीं पाजी, मैं मेट्रो से चला जाऊँगा।'],
    ['nahi paaji shukriya main metro se jaunga', 'abhi nahi main chala jaunga', 'shukriya paaji metro hi theek hai', 'meherbani paaji metro se ho jaayega'],
    ['Say no politely.', 'Not now = "abhi nahi". By metro = "metro se".'],
    ['चल ठीक है शेरा, जैसी तेरी मर्ज़ी। कभी ज़रूरत हो तो बुला लेना।', 'Chal theek hai shera, jaisi teri marzi. Kabhi zaroorat ho toh bula lena.', 'Okay lion, as you wish. Call me if you ever need.'],
    ['हाँ या ना पुत्तर? बता दे।', 'Haan ya na puttar? Bata de.', 'Yes or no, puttar? Tell me.']),
], ['जा पुत्तर, रब राखा। पढ़ाई में कमाल करना।', 'Ja puttar, rab rakha. Padhai mein kamaal karna.', 'Go puttar, God protect you. Do wonders in your studies.'],
  [['gaadi ekdum chamak rahi hai', 'the car is shining'], ['main metro se chala jaunga', 'I will go by metro']], ['ओए शेरा! गाड़ी अब भी चमक रही है!', 'Oye shera! Gaadi ab bhi chamak rahi hai!', 'Oye lion! The car is still shining!'], 2);

export const deliveryBoy = P('antilia-delivery-boy', 'Rinku', 'delivery rider', 'Cyber Hub tower, outside the gate', 'q', 'Encourage him to climb the stairs.', [
  S('stairs', ['चौथी मंज़िल पर लिफ़्ट बंद है! सीढ़ियाँ चढ़नी पड़ेंगी।', 'Chauthi manzil par lift band hai! Seedhiyaan chadhni padengi.', 'The lift on the fourth floor is shut! I have to climb the stairs.'],
    'Joke that it is good exercise.', ['Himmat rakho, achhi exercise ho jaayegi.', 'हिम्मत रखो, अच्छी एक्सरसाइज़ हो जाएगी।'],
    ['himmat rakh bhaiya exercise ho jaayegi', 'koi na stairs se tez ho jaoge', 'oye chadh jao fit rahoge', 'bhaiya kasrat ho jaayegi'],
    ['Cheer him up.', 'Good exercise = "achhi exercise". Keep courage = "himmat rakho".'],
    ['हा हा! तुम सही हो। चलो, हर मंज़िल पर एक गहरी साँस।', 'Ha ha! Tum sahi ho. Chalo, har manzil par ek gehri saans.', 'Ha ha! You are right. Fine, a deep breath on each floor.'],
    ['क्या बोला? सीढ़ियाँ गिन रहा था।', 'Kya bola? Seedhiyaan gin raha tha.', 'What did you say? I was counting steps.']),
  S('lunch', ['खाना गरम पहुँचाना है वरना रेटिंग गिर जाएगी।', 'Khaana garam pahunchana hai warna rating gir jaayegi.', 'I must deliver the food hot or the rating will drop.'],
    'Tell him to hurry before the food cools.', ['Jaldi jao, khaana thanda ho jaayega.', 'जल्दी जाओ, खाना ठंडा हो जाएगा।'],
    ['jaldi jao bhaiya khaana thanda hoga', 'bhaag lo khaana garam rahega', 'oye jaa jaldi', 'der mat karo khaana thanda ho jaayega'],
    ['Urge him on.', 'Hurry = "jaldi jao". It will go cold = "thanda ho jaayega".'],
    ['सही कहा! चल मैं निकलता हूँ, तू भी पढ़ाई पर लौट!', 'Sahi kaha! Chal main nikalta hoon, tu bhi padhai par laut!', 'Right! I am off, you get back to studies too!'],
    ['क्या बोला भाई? मैं आर्डर चेक कर रहा था।', 'Kya bola bhai? Main order check kar raha tha.', 'What did you say bro? I was checking the order.']),
], ['चलता हूँ भाई, अगली डिलीवरी बाक़ी है!', 'Chalta hoon bhai, agli delivery baaki hai!', 'I am off, brother, the next delivery is pending!'],
  [['himmat rakho, achhi exercise ho jaayegi', 'keep heart, it is good exercise'], ['jaldi jao, khaana thanda ho jaayega', 'hurry, the food will go cold']], ['भाई, आज लिफ़्ट चल रही थी!', 'Bhai, aaj lift chal rahi thi!', 'Bro, the lift was working today!'], 2);

export const laneWalker = P('antilia-lane-walker', 'Kapoor Saab', 'elderly man on a morning walk', 'quiet lane near the Cyber Hub tower', 'o', 'Praise his habit of walking and reading.', [
  S('habit', ['सुबह की सैर के साथ पेपर पढ़ना, यही मेरा नियम है।', 'Subah ki sair ke saath paper padhna, yahi mera niyam hai.', 'A morning walk with the paper, that is my routine.'],
    'Say this is a great routine.', ['Aapka niyam bahut accha hai, main bhi apnaunga.', 'आपका नियम बहुत अच्छा है, मैं भी अपनाऊँगा।'],
    ['ye niyam toh kamaal ka hai', 'main bhi yahi karunga uncle', 'aapka routine mast hai', 'sach mein achha habit hai'],
    ['Appreciate his routine.', 'Your routine = "aapka niyam". I will adopt = "apnaunga".'],
    ['शाबाश बेटा! अनुशासन से ही अफ़सर बनते हैं।', 'Shabaash beta! Anushasan se hi afsar bante hain.', 'Well done beta! Officers are made by discipline.'],
    ['धीरे बोल बेटा, मैं चश्मा ठीक कर रहा था।', 'Dheere bol beta, main chashma theek kar raha tha.', 'Speak slowly beta, I was fixing my glasses.']),
], ['चल बेटा, मेरा आख़िरी चक्कर है।', 'Chal beta, mera aakhiri chakkar hai.', 'Come on beta, my last round.'],
  [['aapka niyam bahut accha hai', 'your routine is very good']], ['सुबह मिलना बेटा, पेपर साथ पढ़ेंगे।', 'Subah milna beta, paper saath padhenge.', 'Meet in the morning, beta, we will read the paper together.'], 1);

export const decoOffice = P('deco-office-woman', 'Priyanka', 'office-going woman', 'near the Cyber Hub side', 'f', 'Give her directions to Cyber Hub.', [
  S('way', ['देर हो रही है! साइबर हब का रास्ता किधर से है?', 'Der ho rahi hai! Cyber Hub ka raasta kidhar se hai?', 'I am late! Which way to Cyber Hub?'],
    'Tell her to go straight and turn right at the signal.', ['Seedhe jaakar signal se daayen mudiye.', 'सीधे जाकर सिग्नल से दाएँ मुड़िए।'],
    ['seedha jaake signal par daayen mudo', 'signal se daayen jaiye', 'madam seedha chalo phir right', 'seedhe jaakar daayen ho jaiye'],
    ['Give directions.', 'Go straight = "seedhe jaakar". Turn right = "daayen mudiye".'],
    ['थैंक्स! मेरी मीटिंग दस बजे की है, बस पहुँच ही जाऊँगी।', 'Thanks! Meri meeting das baje ki hai, bas pahunch hi jaungi.', 'Thanks! My meeting is at ten, I will just make it.'],
    ['सुना नहीं, फिर से बताइए।', 'Suna nahi, phir se bataiye.', 'I did not catch it, tell me again.']),
  S('far', ['और कितनी दूर होगा? पैदल कितना टाइम?', 'Aur kitni door hoga? Paidal kitna time?', 'And how far will it be? How long on foot?'],
    'Say it is a ten-minute walk.', ['Das minute ka raasta hai.', 'दस मिनट का रास्ता है।'],
    ['bas das minute lagenge', 'das minute paidal hai madam', 'zyada door nahi hai das minute', 'madam das minute mein pahunch jaayengi'],
    ['Give the time.', 'Ten minutes = "das minute". The way = "raasta".'],
    ['वाह, तब तो टाइम से पहुँच जाऊँगी! ऑल द बेस्ट आपकी तैयारी को।', 'Wah, tab toh time se pahunch jaungi! All the best aapki taiyaari ko.', 'Great, then I will reach on time! All the best for your preparation.'],
    ['कितना टाइम? दोबारा बोलिए।', 'Kitna time? Dobara boliye.', 'How much time? Please say again.']),
], ['बाय! मैं भागती हूँ, लिफ़्ट पकड़नी है।', 'Bye! Main bhaagti hoon, lift pakadni hai.', 'Bye! I am running, I need to catch the lift.'],
  [['seedhe jaakar signal se daayen mudiye', 'go straight and turn right at the signal'], ['das minute ka raasta hai', 'it is a ten-minute walk']], ['अरे आप! रास्ता सही था, पहुँच गई!', 'Arre aap! Raasta sahi tha, pahunch gayi!', 'Oh you! The route was right, I reached!'], 2);

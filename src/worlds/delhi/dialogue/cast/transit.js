// Delhi Metro station platform and the Signature Bridge toll plaza.
import { P, step as S } from '../kit.js';

export const stationCoffee = P('station-chaiwala', 'Lakhan', 'platform chai seller', 'Delhi Metro station, platform chai stall', 'q', 'Order a strong chai and drink it on the platform.', [
  S('order', ['चाय, चाय गरम! मेट्रो आने से पहले एक कप?', 'Chai, chai garam! Metro aane se pehle ek cup?', 'Chai, hot chai! A cup before the metro comes?'],
    'Order one strong chai with less sugar.', ['Ek kadak chai dena, cheeni kam.', 'एक कड़क चाय देना, चीनी कम।'],
    ['ek kadak chai cheeni kam', 'bhaiya ek strong chai dena', 'paaji ik kadak chai pa do', 'ek chai kam meethi dena'],
    ['Order a chai.', 'Strong = "kadak". Less sugar = "cheeni kam".'],
    ['ये लो गरमा-गरम। छोटे कप में पूरी जान है!', 'Ye lo garma-garam. Chhote cup mein poori jaan hai!', 'Here it is steaming. Full strength in a small cup!'],
    ['कितनी चाय बोला? शोर में समझ नहीं आया।', 'Kitni chai bola? Shor mein samajh nahi aaya.', 'How many chais did you say? Could not catch it in the noise.']),
  S('rule', ['ट्रेन में चाय पीना मना है, यहीं प्लेटफ़ॉर्म पर पी लो।', 'Train mein chai peena mana hai, yahin platform par pi lo.', 'Drinking chai in the train is not allowed, drink it right here.'],
    'Say you will finish it on the platform.', ['Theek hai bhaiya, yahin platform par pi leta hoon.', 'ठीक है भैया, यहीं प्लेटफ़ॉर्म पर पी लेता हूँ।'],
    ['yahin pi leta hoon bhaiya', 'train mein nahi platform par hi', 'oye theek hai yahin khatam karta hoon', 'platform par hi chai pi lunga'],
    ['Agree to the rule.', 'Right here = "yahin". I will drink = "pi leta hoon".'],
    ['अच्छे बच्चे! नियम मानने वाले ही अफ़सर बनते हैं।', 'Achhe bachche! Niyam maanne wale hi afsar bante hain.', 'Good boy! Only rule-followers become officers.'],
    ['यहीं पियोगे कि नहीं? ट्रेन आ रही है।', 'Yahin piyoge ki nahi? Train aa rahi hai.', 'Will you drink here or not? The train is coming.']),
], ['कप यहीं डस्टबिन में डाल देना।', 'Cup yahin dustbin mein daal dena.', 'Drop the cup in the dustbin here.'],
  [['ek kadak chai dena, cheeni kam', 'one strong chai, less sugar'], ['yahin platform par pi leta hoon', 'I will drink it here on the platform']], ['अरे भाई, आज चाय में इलायची है!', 'Arre bhai, aaj chai mein elaichi hai!', 'Hey brother, there is cardamom in the chai today!'], 2);

export const womenCoach = P('station-ladies-a', 'Komal', 'women\'s-coach commuter', 'Delhi Metro platform, women\'s coach marker', 'f', 'Apologise and say you will use another coach.', [
  S('coach', ['ये महिलाओं का डिब्बा है, पहला वाला।', 'Ye mahilaon ka dibba hai, pehla wala.', 'This is the women\'s coach, the first one.'],
    'Apologise and move to another coach.', ['Maaf kijiye, main doosre dibbe mein chala jaata hoon.', 'माफ़ कीजिए, मैं दूसरे डिब्बे में चला जाता हूँ।'],
    ['sorry madam main doosre coach mein jaata hoon', 'maaf kijiye main agle dibbe mein jaunga', 'oh sorry didi main hat jaata hoon', 'galti ho gayi doosre dibbe mein jaata hoon'],
    ['Apologise and move.', 'Another coach = "doosra dibba". I go = "chala jaata hoon".'],
    ['धन्यवाद! चौथा डिब्बा सबसे अच्छा है, वहाँ भीड़ कम होती है।', 'Dhanyavaad! Chautha dibba sabse accha hai, wahan bheed kam hoti hai.', 'Thanks! The fourth coach is best, there is less crowd.'],
    ['क्या कहा? आवाज़ नहीं आई।', 'Kya kaha? Awaaz nahi aayi.', 'What did you say? I could not hear you.']),
  S('which', ['अच्छा, आप कौन-से स्टेशन उतरोगे?', 'Accha, aap kaun-se station utroge?', 'By the way, which station will you get off at?'],
    'Say you get off at Rajiv Chowk.', ['Main Rajiv Chowk par utroonga.', 'मैं राजीव चौक पर उतरूँगा।'],
    ['rajiv chowk par utarna hai', 'main rajiv chowk jaa raha hoon', 'didi mera stop rajiv chowk hai', 'rajiv chowk utar jaunga'],
    ['Say your stop.', 'I will get off = "utroonga". At = "par".'],
    ['वही मेरा भी स्टेशन है! पर आप उधर पीछे वाले दरवाज़े से चढ़िए।', 'Wahi mera bhi station hai! Par aap udhar peeche wale darwaze se chadhiye.', 'That is my station too! But board from the rear door over there.'],
    ['स्टेशन का नाम बोलिए, मैं तैयार हूँ।', 'Station ka naam boliye, main taiyaar hoon.', 'Say the station name, I am ready.']),
], ['अच्छा, ट्रेन आ गई। बाय!', 'Accha, train aa gayi. Bye!', 'Well, the train has come. Bye!'],
  [['maaf kijiye, main doosre dibbe mein chala jaata hoon', 'sorry, I will go to another coach'], ['main Rajiv Chowk par utroonga', 'I will get off at Rajiv Chowk']], ['अरे! आप फिर? इस बार सही डिब्बे में आना।', 'Arre! Aap phir? Is baar sahi dibbe mein aana.', 'Oh! You again? Come to the right coach this time.'], 2);

export const benchElder = P('station-bench-elder', 'Sardar Teja Singh', 'elderly Sikh passenger', 'Delhi Metro station platform bench', 'o', 'Greet him and read out the arrival time for Dwarka.', [
  S('greet', ['सत श्री अकाल पुत्तर! तू बैठ यहाँ, थोड़ा सुस्ता ले।', 'Sat Sri Akal puttar! Tu baith yahan, thoda susta le.', 'Sat Sri Akal puttar! Sit here, rest a little.'],
    'Greet him back and sit.', ['Sat Sri Akal baba ji, thodi der baith jaata hoon.', 'सत श्री अकाल बाबा जी, थोड़ी देर बैठ जाता हूँ।'],
    ['sat sri akal baba ji', 'sat sri akal ji main baith jaata hoon', 'sat sri akal paaji dhanyavaad', 'sat sri akal baith jaun'],
    ['Greet him respectfully.', '"Sat Sri Akal baba ji" is the greeting.'],
    ['जीता रह पुत्तर। सारा दिन खड़े-खड़े पढ़ेगा क्या?', 'Jeeta reh puttar. Saara din khade-khade padhega kya?', 'Live long puttar. Will you study standing all day?'],
    ['की बोलेया पुत्तर? कान ठीक नहीं।', 'Ki boleya puttar? Kaan theek nahi.', 'What did you say, puttar? My ears are not good.']),
  S('time', ['द्वारका वाली मेट्रो कब आएगी? मुझे बोर्ड दिखता नहीं।', 'Dwarka wali metro kab aayegi? Mujhe board dikhta nahi.', 'When will the Dwarka metro come? I cannot see the board.'],
    'Read the board: it comes in five minutes.', ['Baba ji, Dwarka wali metro paanch minute mein aayegi.', 'बाबा जी, द्वारका वाली मेट्रो पाँच मिनट में आएगी।'],
    ['paanch minute mein aayegi baba ji', 'board par paanch minute likha hai', 'paaji paanch minute aur', 'dwarka ki metro paanch minute mein aa rahi hai'],
    ['Read the time for him.', 'In five minutes = "paanch minute mein". It will come = "aayegi".'],
    ['शाबाश पुत्तर! अब चैन से बैठूँगा। रब तुझे अफ़सर बनाए।', 'Shabaash puttar! Ab chain se baithunga. Rab tujhe afsar banaye.', 'Well done puttar! Now I will sit in peace. May God make you an officer.'],
    ['कितने मिनट? फिर से पढ़ पुत्तर।', 'Kitne minute? Phir se padh puttar.', 'How many minutes? Read again, puttar.']),
], ['चल पुत्तर, अपनी गाड़ी का ध्यान रख।', 'Chal puttar, apni gaadi ka dhyaan rakh.', 'Go puttar, keep an eye on your train.'],
  [['Sat Sri Akal baba ji', 'the Sikh greeting'], ['Dwarka wali metro paanch minute mein aayegi', 'the Dwarka metro comes in five minutes']], ['ओए पुत्तर, आ गया फिर? बैठ!', 'Oye puttar, aa gaya phir? Baith!', 'Oye puttar, back again? Sit!'], 2);

export const lateCommuter = P('station-commuter-2', 'Nikhil Verma', 'office-goer late for stand-up', 'Delhi Metro platform, near the map board', 'q', 'Advise him to board from the rear door where there is less crowd.', [
  S('door', ['भैया, पीछे वाले दरवाज़े से चढ़ूँ या आगे वाले से?', 'Bhaiya, peeche wale darwaze se chadhun ya aage wale se?', 'Brother, should I board from the rear door or the front one?'],
    'Advise the rear door, it is less crowded.', ['Peeche wale gate se chadhiye, wahan bheed kam hai.', 'पीछे वाले गेट से चढ़िए, वहाँ भीड़ कम है।'],
    ['peeche wale darwaze se chadho', 'peeche bheed kam hoti hai', 'oye peeche se chadh jao', 'rear wale gate se chale jaiye'],
    ['Give advice.', 'Rear gate = "peeche wala gate". Less crowd = "bheed kam".'],
    ['शुक्रिया! ऑफ़िस में स्टैंड-अप के बाद चाय आपके नाम की!', 'Shukriya! Office mein stand-up ke baad chai aapke naam ki!', 'Thanks! After the stand-up at the office, a chai in your name!'],
    ['क्या बोले? घड़ी देख रहा था।', 'Kya bole? Ghadi dekh raha tha.', 'What did you say? I was looking at my watch.']),
], ['चलिए, ट्रेन आ गई। भागता हूँ!', 'Chaliye, train aa gayi. Bhaagta hoon!', 'Here comes the train. I am running!'],
  [['peeche wale gate se chadhiye, wahan bheed kam hai', 'board from the rear gate, there is less crowd']], ['भैया, आपकी सलाह काम आई!', 'Bhaiya, aapki salaah kaam aayi!', 'Brother, your advice worked!'], 1);

export const ticketClerk = P('station-ticket-clerk', 'Tripathi', 'metro ticket clerk', 'Delhi Metro station, ticket window', 'm', 'Buy a token to Rajiv Chowk and pay thirty rupees.', [
  S('token', ['अगला! कहाँ जाना है?', 'Agla! Kahaan jaana hai?', 'Next! Where to?'],
    'Ask for one token to Rajiv Chowk.', ['Mujhe Rajiv Chowk ka ek token chahiye.', 'मुझे राजीव चौक का एक टोकन चाहिए।'],
    ['rajiv chowk ka ek token dena', 'ek token rajiv chowk tak', 'bhaiya rajiv chowk ka token', 'ek ticket rajiv chowk ki dena'],
    ['Ask for the token.', 'One token = "ek token". To Rajiv Chowk = "Rajiv Chowk ka".'],
    ['ये लो टोकन। तीस रुपये हुए।', 'Ye lo token. Tees rupaye hue.', 'Here is the token. That is thirty rupees.'],
    ['खिड़की के शीशे से सुनाई नहीं दिया, फिर बोलो।', 'Khidki ke sheeshe se sunai nahi diya, phir bolo.', 'Cannot hear through the window glass, say again.']),
  S('pay', ['जल्दी करो भाई, पीछे लाइन लगी है।', 'Jaldi karo bhai, peeche line lagi hai.', 'Hurry brother, a line has formed behind you.'],
    'Hand over thirty rupees.', ['Ye lijiye, tees rupaye.', 'ये लीजिए, तीस रुपये।'],
    ['ye lo tees rupaye', 'tees rupaye ye rahe', 'bhaiya tees ka note ye lijiye', 'ye lijiye tees rupaye bhaiya'],
    ['Pay the fare.', 'Thirty = "tees". Here you are = "ye lijiye".'],
    ['ठीक है। टोकन गेट पर टैप करना और सँभालकर रखना।', 'Theek hai. Token gate par tap karna aur sambhalkar rakhna.', 'Fine. Tap the token at the gate and keep it safe.'],
    ['कितने दिए? गिनकर दो।', 'Kitne diye? Ginkar do.', 'How much did you give? Count properly.']),
], ['अगला! बेटा, सीधे जाना, बाएँ मत मुड़ना।', 'Agla! Beta, seedhe jaana, baayen mat mudna.', 'Next! Beta, go straight, do not turn left.'],
  [['mujhe Rajiv Chowk ka ek token chahiye', 'I need a token to Rajiv Chowk'], ['ye lijiye, tees rupaye', 'here, thirty rupees']], ['अरे, फिर टोकन? स्मार्ट कार्ड बनवा लो!', 'Arre, phir token? Smart card banwa lo!', 'Another token? Get a smart card made!'], 2);

export const tollAttendant = P('toll-attendant', 'Jagdish', 'toll attendant', 'Signature Bridge toll plaza', 'm', 'Take his advice to use the bus instead.', [
  S('walk', ['सिग्नेचर ब्रिज पर पैदल जाना मना है, भैया।', 'Signature Bridge par paidal jaana mana hai, bhaiya.', 'Walking on the Signature Bridge is not allowed, brother.'],
    'Say you will go by bus instead.', ['Achha ji, phir main bus se chala jaunga.', 'अच्छा जी, फिर मैं बस से चला जाऊँगा।'],
    ['theek hai bus se chala jaata hoon', 'achha toh main bus le lunga', 'paaji bus se chale jaate hain', 'koi na bus pakad leta hoon'],
    ['Accept the rule.', 'By bus = "bus se". I will go = "chala jaunga".'],
    ['सही है। बस स्टॉप उधर है, सीधे जाकर दाएँ।', 'Sahi hai. Bus stop udhar hai, seedhe jaakar daayen.', 'Good. The bus stop is over there, straight then right.'],
    ['गाड़ियों के शोर में नहीं सुना, फिर बोलो।', 'Gaadiyon ke shor mein nahi suna, phir bolo.', 'Could not hear over the traffic, say again.']),
], ['जाओ भैया, सड़क किनारे ध्यान से चलना।', 'Jao bhaiya, sadak kinaare dhyaan se chalna.', 'Go brother, walk carefully along the road.'],
  [['phir main bus se chala jaunga', 'then I will go by bus']], ['भैया, पुल पर आज बहुत गाड़ियाँ हैं।', 'Bhaiya, pul par aaj bahut gaadiyaan hain.', 'Brother, lots of cars on the bridge today.'], 1);

export const tollCollector = P('toll-collector', 'Satpal', 'toll collector', 'Signature Bridge toll plaza booth', 'm', 'Chat about the bridge and the view.', [
  S('visit', ['सिग्नेचर ब्रिज देखने आए हो? दूर-दूर से लोग आते हैं।', 'Signature Bridge dekhne aaye ho? Door-door se log aate hain.', 'Came to see the Signature Bridge? People come from far.'],
    'Say yes, you had heard a lot about it.', ['Haan, iske baare mein bahut suna tha.', 'हाँ, इसके बारे में बहुत सुना था।'],
    ['haan ji bahut suna tha is bridge ke baare mein', 'dekhne hi aaya hoon bhaiya', 'paaji sunke aaya tha', 'haan bahut famous hai ye'],
    ['Say why you came.', 'I had heard a lot = "bahut suna tha". About it = "iske baare mein".'],
    ['सही! शाम को लाइटें जलती हैं, तब और सुंदर लगता है।', 'Sahi! Shaam ko lights jalti hain, tab aur sundar lagta hai.', 'True! The lights come on in the evening, it looks even better then.'],
    ['भोंपू की आवाज़ में सुना नहीं।', 'Bhompu ki awaaz mein suna nahi.', 'Could not hear over the horn.']),
  S('light', ['पर शाम को आना, दिन में तो धूप बहुत है।', 'Par shaam ko aana, din mein toh dhoop bahut hai.', 'But come in the evening, there is too much sun by day.'],
    'Promise to come in the evening.', ['Theek hai, main shaam ko aaunga.', 'ठीक है, मैं शाम को आऊँगा।'],
    ['shaam ko pakka aaunga', 'main sham ko wapas aata hoon', 'oye shaam ko aa jaunga', 'evening mein zaroor aaunga'],
    ['Promise to return.', 'In the evening = "shaam ko". I will come = "aaunga".'],
    ['बढ़िया! और साथ में पढ़ाई की किताबें मत लाना, मज़ा करना!', 'Badhiya! Aur saath mein padhai ki kitaabein mat lana, maza karna!', 'Great! And do not bring your study books, enjoy yourself!'],
    ['शाम को या अभी? साफ़ बोलो भाई।', 'Shaam ko ya abhi? Saaf bolo bhai.', 'In the evening or now? Say clearly, brother.']),
], ['अच्छा, मेरी गाड़ियाँ आ रही हैं। चलो!', 'Accha, meri gaadiyaan aa rahi hain. Chalo!', 'Well, my cars are coming. Off you go!'],
  [['iske baare mein bahut suna tha', 'I had heard a lot about it'], ['main shaam ko aaunga', 'I will come in the evening']], ['अरे भाई! शाम को आए थे क्या?', 'Arre bhai! Shaam ko aaye the kya?', 'Hey brother! Did you come in the evening?'], 2);

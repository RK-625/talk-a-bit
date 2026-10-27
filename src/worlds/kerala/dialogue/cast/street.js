// The ten Kochiites on the open ground in the quiet stretches of the city.
import { dialogue as D, step as S } from '../kit.js';

export const street1 = D('street-1', {
  name: 'Sanoj', role: 'Kochiite on the phone', site: 'Open ground, an empty stretch of the city', diff: 1,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Man in a teal T-shirt with a green office lanyard, thumbs scrolling on his phone.',
  goal: 'Ask where the nearest chaya kada is.',
  steps: [
    S('kada', ['ഫോണിൽ ഒരു വീഡിയോ കാണുകയായിരുന്നു. ചേച്ചിക്ക് എന്താ വേണ്ടത്?', 'Phonil oru video kaanukayaayirunnu. Chechikku enthaa vendathu?', 'I was watching a video. What do you need, chechi?'],
      'Ask if there is a chaya kada nearby.', ['Ivide aduthu oru chayakkada undo?', 'ഇവിടെ അടുത്ത് ഒരു ചായക്കട ഉണ്ടോ?'],
      ['chayakkada evide', 'aduthu chaya kittumo', 'chaya kada evideyaa', 'oru chayakkada parayamo', 'chetta chayakkada evide', 'ചായക്കട എവിടെ'],
      'ask_nearest_chaya_kada', ['Ask for a tea shop.', '"Chayakkada" = tea shop.'],
      ['ഉണ്ട്! ആ വളവിൽ കുട്ടൻ ചേട്ടന്റെ കട.', 'Undu! Aa valavil Kuttan Chettante kada.', 'Yes! The shop of Kuttan Chettan at that bend.'],
      ['എന്താ വേണ്ടത്?', 'Enthaa vendathu?', 'What do you need?']),
  ],
  outro: ['ചായ കുടിച്ചിട്ട് തിരിച്ച് വരൂ, നമുക്ക് സംസാരിക്കാം.', 'Chaya kudichittu thirichu varoo, namukku samsaarikkaam.', 'Have your tea and come back, we can talk.'],
  learned: [['aduthu oru chayakkada undo?', 'is there a tea shop nearby?']],
  again: ['ചായ കുടിച്ചോ ചേച്ചീ?', 'Chaya kudicho chechee?', 'Did you have your tea, chechi?'],
});

export const street2 = D('street-2', {
  name: 'Prabha Chechi', role: 'Kochiite woman', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Woman in a cream set-saree with jasmine in her bun and a teal jhola, standing idle and watching the street.',
  goal: 'Ask where to get a good meal, then say you will go and see.',
  steps: [
    S('ask', ['വരൂ മോളേ, എന്താ തിരയുന്നത്?', 'Varoo mole, enthaa thirayunnathu?', 'Come dear, what are you looking for?'],
      'Ask where you can get a good meal.', ['Ivide nalla oonu evide kittum chechi?', 'ഇവിടെ നല്ല ഊണ് എവിടെ കിട്ടും ചേച്ചി?'],
      ['nalla oonu kittumo', 'meals evide kittum', 'oonu evide kittum chechi', 'nalla hotel evide', 'chechi oonu evide', 'നല്ല ഊണ് എവിടെ'],
      'ask_where_good_meal', ['Ask about food.', '"Oonu" = meals.'],
      ['ആ തെരുവിൽ ഒരു ഊണ് ഹോട്ടൽ ഉണ്ട്, വാഴയിലയിൽ!', 'Aa theruvil oru oonu hotel undu, vaazhayilayil!', 'There is a meals hotel on that street, on a banana leaf!'],
      ['എന്താ ചോദിച്ചത് മോളേ?', 'Enthaa chodichathu mole?', 'What did you ask, dear?']),
    S('go', ['മീൻ കറിയും തോരനും പപ്പടവും ഉണ്ട്. പോയി നോക്ക്.', 'Meen curryum thoranum pappadavum undu. Poyi nokku.', 'Fish curry, thoran and pappadam. Go and see.'],
      'Say you will go and see.', ['Njaan poyi nokkaam chechi.', 'ഞാൻ പോയി നോക്കാം ചേച്ചി.'],
      ['poyi nokkaam', 'njaan pokaam chechi', 'shari poyi nokkaam', 'nanni njaan pokunnu', 'pokaam chechi', 'പോയി നോക്കാം'],
      'say_will_go_and_see', ['Say you will check it out.', '"Poyi nokkaam" = I will go and see.'],
      ['പോയിട്ട് വാ. ആദ്യം വെള്ളം തരും, കുടിച്ചോ.', 'Poyittu vaa. Aadyam vellam tharum, kudicho.', 'Go on. They give water first, have it.'],
      ['പോകുന്നോ ഇല്ലയോ?', 'Pokunno illayo?', 'Will you go or not?']),
  ],
  outro: ['ഊണ് കഴിഞ്ഞ് ഒരു ചായ കൂടി!', 'Oonu kazhinju oru chaya koodi!', 'After the meal, one more tea!'],
  learned: [['nalla oonu evide kittum?', 'where can I get a good meal?'], ['njaan poyi nokkaam', 'I will go and see']],
  again: ['ഊണിന് ഇപ്പൊ നല്ല തിരക്കായിരിക്കും.', 'Oonin ippo nalla thirakkaayirikkum.', 'There will be a rush for meals now.'],
});

export const street3 = D('street-3', {
  name: 'Rishad', role: 'Kochiite teen', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.15, pitch: 1.3 },
  persona: 'Teen in a lilac T-shirt and denim with a backpack and white sneakers, chatting with friends.',
  goal: 'Tell him you bought your bag in Jaipur.',
  steps: [
    S('bag', ['ചേച്ചി, നിങ്ങളുടെ ബാഗ് കൊള്ളാം! എവിടെ നിന്ന് വാങ്ങി?', 'Chechi, ningalude bag kollaam! Evide ninnu vaangi?', 'Chechi, nice bag! Where did you buy it?'],
      'Say you bought it in Jaipur.', ['Njaan ithu Jaipur-il ninnu vaangi.', 'ഞാൻ ഇത് ജയ്പൂരിൽ നിന്ന് വാങ്ങി.'],
      ['jaipurilninnu vaangi', 'jaipur-il aanu vaangiyathu', 'ithu jaipur bag aanu', 'ente naattil ninnu', 'jaipur-il ninnaanu', 'ജയ്പൂരിൽ നിന്ന്'],
      'say_bag_from_jaipur', ['Say where you bought it.', '"Vaangi" = bought.'],
      ['ജയ്പൂർ! ഞാൻ പോകണം എന്നാ ആഗ്രഹം.', 'Jaipur! Njaan pokanam ennaa aagraham.', 'Jaipur! I wish to go there.'],
      ['എവിടെ നിന്നാ?', 'Evide ninnaa?', 'From where?']),
  ],
  outro: ['ഒരു ദിവസം ജയ്പൂർ കാണണം!', 'Oru divasam Jaipur kaananam!', 'One day I must see Jaipur!'],
  learned: [['njaan ithu Jaipur-il ninnu vaangi', 'I bought this in Jaipur']],
  again: ['ചേച്ചി, ആ ബാഗ് ഒന്ന് കാണട്ടെ.', 'Chechi, aa bag onnu kaanatte.', 'Chechi, let me see that bag once.'],
});

export const street4 = D('street-4', {
  name: 'Narayanan Nair', role: 'Kochiite elder', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Elder in a cream shirt and white mundu with a black umbrella, reading the news.',
  goal: 'Say you have no umbrella, then say you love the rain in Kerala.',
  steps: [
    S('umbrella', ['മഴ വരുമെന്ന് പത്രത്തിൽ ഉണ്ട്. കുട എടുത്തോ?', 'Mazha varumennu pathrathil undu. Kuda edutho?', 'The paper says rain is coming. Did you take an umbrella?'],
      'Say no, you do not have an umbrella.', ['Illa, enikku kuda illa.', 'ഇല്ല, എനിക്ക് കുട ഇല്ല.'],
      ['kuda illa', 'njaan kuda edutthilla', 'kuda venam', 'ente kayyil kuda illa', 'illa kuda illa', 'എനിക്ക് കുടയില്ല'],
      'say_no_umbrella', ['Say you have none.', '"Kuda" = umbrella.'],
      ['എങ്കിൽ ആ കടയിൽ നിന്ന് ഒരു കുട വാങ്ങിക്കോ.', 'Enkil aa kadayil ninnu oru kuda vaangikko.', 'Then buy an umbrella from that shop.'],
      ['കുട ഉണ്ടോ?', 'Kuda undo?', 'Do you have an umbrella?']),
    S('rain', ['മഴയത്ത് ഇവിടെ ഒരു പ്രത്യേക ഭംഗിയാ. ഇഷ്ടമാണോ?', 'Mazhayathu ivide oru prathyeka bhangiyaa. Ishtamaano?', 'The rain has a special beauty here. Do you like it?'],
      'Say you love the rain in Kerala.', ['Enikku Keralathile mazha valare ishtam.', 'എനിക്ക് കേരളത്തിലെ മഴ വളരെ ഇഷ്ടം.'],
      ['mazha ishtamaanu', 'njaan mazha ishtappedunnu', 'mazha nalla rasam', 'keralathile mazha super', 'mazha kaanaan ishtam', 'മഴ ഇഷ്ടമാണ്'],
      'say_love_the_rain', ['Say you like the rain.', '"Mazha" = rain.'],
      ['മിടുക്കി! നീ ഒരു യഥാർത്ഥ മലയാളിയായി.', 'Midukki! Nee oru yathaarththa malayaaliyaayi.', 'Clever girl! You have become a true Malayali.'],
      ['മഴ ഇഷ്ടമാണോ?', 'Mazha ishtamaano?', 'Do you like rain?']),
  ],
  outro: ['മഴയത്ത് ചൂട് ചായ കുടിക്കണം.', 'Mazhayathu choodu chaya kudikkanam.', 'Have a hot tea in the rain.'],
  learned: [['enikku kuda illa', 'I do not have an umbrella'], ['enikku mazha valare ishtam', 'I like the rain very much']],
  again: ['മഴ ഇപ്പൊ തുടങ്ങും, കുട തുറന്നോ!', 'Mazha ippo thudangum, kuda thurannoo!', 'The rain will start now, open the umbrella!'],
});

export const street5 = D('street-5', {
  name: 'Suresh', role: 'Kochiite man', site: 'Open ground, an empty stretch of the city', diff: 1,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Man in a butter striped shirt with a red lanyard and backpack, standing idle with a thick moustache.',
  goal: 'Tell him not to worry, the person will come soon.',
  steps: [
    S('wait', ['ഞാൻ ഇവിടെ ഒരാളെ കാത്തു നിൽക്കുകയാ. വൈകുന്നു.', 'Njaan ivide oraale kaathu nilkkukayaa. Vaikunnu.', 'I am waiting for someone here. They are late.'],
      'Tell him not to worry, they will come soon.', ['Vishamikkanda, avar ippo varum.', 'വിഷമിക്കണ്ട, അവർ ഇപ്പൊ വരും.'],
      ['vishamikkanda chetta', 'ippo varum', 'samayam undu', 'nokkoo avar varum', 'chetta kaathirikkoo', 'വിഷമിക്കണ്ട ചേട്ടാ'],
      'reassure_waiting_man', ['Tell him not to worry.', '"Ippo varum" = will come soon.'],
      ['ശരിയാ, ക്ഷമയാണ് ഏറ്റവും വലിയ ഗുണം.', 'Shariyaa, kshamayaanu ettavum valiya gunam.', 'True, patience is the greatest virtue.'],
      ['ഏ? ആര് വരും?', 'Ae? Aaru varum?', 'Eh? Who will come?']),
  ],
  outro: ['കാത്തിരുന്നാൽ ഒരു ചായ കുടിക്കാം.', 'Kaathirunnaal oru chaya kudikkaam.', 'While waiting we can have tea.'],
  learned: [['avar ippo varum', 'they will come soon']],
  again: ['ഇപ്പോഴും വന്നില്ല!', 'Ippozhum vannilla!', 'Still not here!'],
});

export const street6 = D('street-6', {
  name: 'Lekha', role: 'Kochiite woman', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.1, pitch: 1.2 },
  persona: 'Woman in a mint churidar top with a plait and specs, on a phone call.',
  goal: 'Say take your time, then ask what time it is.',
  steps: [
    S('call', ['ക്ഷമിക്കണം, ഒരു കോൾ ആണ്. ഒരു മിനിറ്റ്!', 'Kshamikkanam, oru call aanu. Oru minute!', 'Sorry, I am on a call. One minute!'],
      'Say take your time, no hurry.', ['Thirakkilla, njaan kaathirikkaam.', 'തിരക്കില്ല, ഞാൻ കാത്തിരിക്കാം.'],
      ['samayam edutholoo', 'njaan kaathirikkaam', 'thirakkilla chechi', 'kaathirikkaam', 'dhrithi illa chechi', 'തിരക്കില്ല'],
      'say_no_hurry', ['Tell her there is no hurry.', '"Thirakkilla" = no rush.'],
      ['താങ്ക്സ്! അമ്മയാ വിളിക്കുന്നത്, നിർത്താൻ പറ്റില്ല.', 'Thanks! Ammayaa vilikkunnathu, nirtthaan pattilla.', 'Thanks! It is my mother calling, I cannot cut it.'],
      ['ഒരു മിനിറ്റ് കൂടി...', 'Oru minute koodi...', 'One more minute...']),
    S('time', ['ഹാ, കഴിഞ്ഞു. ചേച്ചി എന്താ ചോദിക്കാൻ വന്നത്?', 'Haa, kazhinju. Chechi enthaa chodikkaan vannathu?', 'Done. What did you come to ask, chechi?'],
      'Ask what time it is.', ['Ippol samayam ethrayaayi?', 'ഇപ്പോൾ സമയം എത്രയായി?'],
      ['samayam ethra', 'time ethrayaayi', 'ethra mani aayi', 'ippol ethra mani', 'chechi samayam ethra', 'സമയം എത്ര'],
      'ask_the_time', ['Ask the time.', '"Samayam ethra?" = what time?'],
      ['പത്തരയായി. ബസ് ഇപ്പൊ വരും.', 'Pathharayaayi. Bus ippo varum.', 'It is half past ten. The bus will come now.'],
      ['സമയം ആണോ ചോദിച്ചത്?', 'Samayam aano chodichathu?', 'Did you ask the time?']),
  ],
  outro: ['സമയം ശ്രദ്ധിച്ച് യാത്ര ചെയ്യൂ.', 'Samayam shraddhichu yaathra cheyyoo.', 'Travel keeping an eye on the time.'],
  learned: [['thirakkilla', 'no hurry'], ['ippol samayam ethrayaayi?', 'what time is it now?']],
  again: ['അമ്മ വീണ്ടും വിളിക്കുന്നു!', 'Amma veendum vilikkunnu!', 'Mother is calling again!'],
});

export const street7 = D('street-7', {
  name: 'Hamza', role: 'Kochiite elder', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Bald elder in a white shirt and butter lungi with a towel on his shoulder, standing idle.',
  goal: 'Offer to buy him a tea, then ask where the best fish meal is.',
  steps: [
    S('tea', ['രാവിലെ മുതൽ നിൽക്കുന്നു. ഒരു കട്ടൻ ചായ കിട്ടിയെങ്കിൽ!', 'Raavile muthal nilkkunnu. Oru kattan chaya kittiyenkil!', 'Standing since morning. If only I could get a black tea!'],
      'Offer to buy him a tea.', ['Njaan oru chaya vaangi tharaam.', 'ഞാൻ ഒരു ചായ വാങ്ങി തരാം.'],
      ['chaya vaangi tharaam chetta', 'njaan chaya tharaam', 'oru chaya vaangikkaam', 'ningalkku chaya venamo', 'chaya kudikkaan varoo', 'ഒരു ചായ വാങ്ങി തരട്ടെ'],
      'offer_to_buy_tea', ['Offer a tea.', '"Vaangi tharaam" = I will buy for you.'],
      ['അയ്യോ വേണ്ട, നീ കുട്ടിയാ! പക്ഷേ നന്ദി.', 'Ayyo venda, nee kuttiyaa! Pakshe nanni.', 'Oh no, you are just a child! But thanks.'],
      ['ചായയോ?', 'Chayayo?', 'Tea?']),
    S('fish', ['അൻപത് വർഷമായി ഞാൻ ഈ തെരുവിലുണ്ട്. എന്തെങ്കിലും ചോദിക്കൂ!', 'Anpathu varshamaayi njaan ee theruvilundu. Enthenkilum chodikkoo!', 'I have been on this street fifty years. Ask me anything!'],
      'Ask where the best fish meal is.', ['Ivide nalla meen oonu evide kittum?', 'ഇവിടെ നല്ല മീൻ ഊണ് എവിടെ കിട്ടും?'],
      ['meen oonu evide', 'nalla meen kari evide', 'meen curry evide kittum', 'meals evide kittum', 'saare meen oonu evide', 'മീൻ ഊണ് എവിടെ'],
      'ask_best_fish_meal', ['Ask about fish meals.', '"Meen oonu" = fish meal.'],
      ['കായൽ കരയിലെ ആ ചെറിയ ഹോട്ടൽ, കരിമീൻ പൊള്ളിച്ചത്!', 'Kaayal karayile aa cheriya hotel, karimeen pollichathu!', 'That small hotel by the backwater, karimeen pollichathu!'],
      ['എന്താ ചോദിച്ചത്, കേട്ടില്ല.', 'Enthaa chodichathu, kettilla.', 'What did you ask, I did not hear.']),
  ],
  outro: ['കരിമീൻ കഴിച്ചാൽ കേരളം അറിയാം.', 'Karimeen kazhichaal Keralam ariyaam.', 'Eat karimeen and you know Kerala.'],
  learned: [['njaan oru chaya vaangi tharaam', 'I will buy you a tea'], ['nalla meen oonu evide kittum?', 'where is a good fish meal?']],
  again: ['ചായ കിട്ടിയോ മോളേ?', 'Chaya kittiyo mole?', 'Did you get your tea, dear?'],
});

export const street8 = D('street-8', {
  name: 'Ashiq', role: 'Kochiite teen', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.2, pitch: 1.3 },
  persona: 'Teen in a yellow tee with red vertical stripes and a teal cap, texting.',
  goal: 'Ask him which place in Kochi is best to see.',
  steps: [
    S('place', ['ഒരു മെസേജ് അയച്ചോട്ടെ... എന്താ ചേച്ചീ?', 'Oru message ayachotte... enthaa chechee?', 'Let me send a message... what is it, chechi?'],
      'Ask which place is best to see in Kochi.', ['Kochiyil kaanaan ethu sthalam nallathu?', 'കൊച്ചിയിൽ കാണാൻ ഏത് സ്ഥലം നല്ലത്?'],
      ['kochiyil enthu kaanam', 'kaanaan nalla sthalam ethaa', 'oru sthalam parayamo', 'ethu sthalam poyi kaanam', 'kochiyile nalla sthalam', 'കാണാൻ നല്ല സ്ഥലം ഏത്'],
      'ask_best_place_kochi', ['Ask for a place to visit.', '"Sthalam" = place.'],
      ['ഫോർട്ട് കൊച്ചി, ചൈനീസ് വല, പിന്നെ മട്ടാഞ്ചേരി!', 'Fort Kochi, Chinese vala, pinne Mattancherry!', 'Fort Kochi, the Chinese nets, and Mattancherry!'],
      ['ഏത് സ്ഥലം?', 'Ethu sthalam?', 'Which place?']),
  ],
  outro: ['ഫോണിൽ ഒരു ഫോട്ടോ എടുക്കണം, കേട്ടോ!', 'Phonil oru photo edukkanam, kettoo!', 'Take a photo on your phone, okay!'],
  learned: [['kaanaan ethu sthalam nallathu?', 'which place is good to see?']],
  again: ['ചേച്ചി, ഒരു സ്ഥലം കൂടി പറയട്ടെ?', 'Chechi, oru sthalam koodi parayatte?', 'Chechi, shall I name one more place?'],
});

export const street9 = D('street-9', {
  name: 'Moideen', role: 'Kochiite man', site: 'Open ground, an empty stretch of the city', diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Man in a sand shirt and a mundu folded to the knee with a handlebar moustache and a white towel, chatting.',
  goal: 'Say you are from Rajasthan, then say you tried puttu.',
  steps: [
    S('from', ['ഇന്ന് വെയിൽ കൂടുതലാ അല്ലേ? ചേച്ചി എവിടെ നിന്നാ?', 'Innu veyil kooduthalaa alle? Chechi evide ninnaa?', 'The sun is strong today, right? Where are you from, chechi?'],
      'Say you are from Jaipur, Rajasthan.', ['Njaan Rajasthaanile Jaipur-il ninnaanu.', 'ഞാൻ രാജസ്ഥാനിലെ ജയ്പൂരിൽ നിന്നാണ്.'],
      ['jaipur-il ninnaanu', 'rajasthaan aanu ente naadu', 'njaan jaipurkaari', 'jaipur aanu ente naadu', 'rajasthaanil ninnaanu', 'രാജസ്ഥാനിൽ നിന്നാണ്'],
      'say_from_rajasthan', ['Say your home.', '"Ninnaanu" = I am from.'],
      ['രാജസ്ഥാൻ! മരുഭൂമിയിൽ നിന്ന് കായലിലേക്ക്!', 'Rajasthaan! Marubhoomiyil ninnu kaayalilekku!', 'Rajasthan! From the desert to the backwaters!'],
      ['ഏത് നാട്?', 'Ethu naadu?', 'Which land?']),
    S('puttu', ['ഇവിടെ പുട്ടും കടലയും കഴിച്ചോ?', 'Ivide puttum kadalayum kazhicho?', 'Have you tried puttu and kadala here?'],
      'Say yes, you tried puttu and it was tasty.', ['Athe, puttu kazhichu, nalla ruchiyaayirunnu.', 'അതെ, പുട്ട് കഴിച്ചു, നല്ല രുചിയായിരുന്നു.'],
      ['puttu kazhichu ruchiyundu', 'athe kazhichu chetta', 'puttu super aayirunnu', 'kazhichu nalla ruchi', 'puttum kadalayum nannaayi', 'പുട്ട് കഴിച്ചു'],
      'say_tried_puttu', ['Say you ate it.', '"Kazhichu" = I ate.'],
      ['ശരി! ഇനി അപ്പവും സ്റ്റ്യൂവും കൂടി!', 'Shari! Ini appavum stewvum koodi!', 'Good! Now appam and stew too!'],
      ['പുട്ട് കഴിച്ചോ?', 'Puttu kazhicho?', 'Did you eat puttu?']),
  ],
  outro: ['കേരളത്തിലെ ഭക്ഷണം ഒരു ലോകമാ.', 'Keralathile bhakshanam oru lokamaa.', 'Kerala food is a whole world.'],
  learned: [['Rajasthaanile Jaipur-il ninnaanu', 'I am from Jaipur in Rajasthan'], ['puttu kazhichu', 'I ate puttu']],
  again: ['വെയിൽ കൊണ്ട് നിൽക്കല്ലേ, തണലിൽ വരൂ.', 'Veyil kondu nilkkalle, thanalil varoo.', 'Do not stand in the sun, come into the shade.'],
});

export const street10 = D('street-10', {
  name: 'Latha', role: 'Kochiite woman', site: 'Open ground, an empty stretch of the city', diff: 1,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Woman in a pink churidar with a bun and bindi, carrying a cloth vegetable bag and standing idle.',
  goal: 'Ask where the market is.',
  steps: [
    S('market', ['ഇന്ന് ചന്തയിൽ നല്ല തിരക്കായിരുന്നു.', 'Innu chanthayil nalla thirakkaayirunnu.', 'The market was very crowded today.'],
      'Ask where the market is.', ['Chantha evideyaanu chechi?', 'ചന്ത എവിടെയാണ് ചേച്ചി?'],
      ['chantha evide', 'market evide chechi', 'chanthayilekku vazhi', 'aduthu market undo', 'chantha ethu vazhi', 'ചന്ത എവിടെ'],
      'ask_where_market', ['Ask for the market.', '"Chantha" = market.'],
      ['ആ പാലം കഴിഞ്ഞ് ഇടത്തോട്ട്. രാവിലെ പോകണം, മീൻ കിട്ടും.', 'Aa paalam kazhinju idatthottu. Raavile pokanam, meen kittum.', 'Past that bridge, left. Go in the morning, there is fish.'],
      ['ഏത് ചന്ത?', 'Ethu chantha?', 'Which market?']),
  ],
  outro: ['ചന്തയിൽ പോയാൽ ഒരുപാട് കാണാനുണ്ട്.', 'Chanthayil poyaal orupaadu kaanaanundu.', 'There is a lot to see at the market.'],
  learned: [['chantha evideyaanu?', 'where is the market?']],
  again: ['സഞ്ചി നിറഞ്ഞു, ഇനി വീട്ടിൽ പോകണം.', 'Sanchi niranju, ini veettil pokanam.', 'The bag is full, now I must go home.'],
});

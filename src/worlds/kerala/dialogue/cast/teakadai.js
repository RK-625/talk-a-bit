// Chaya kada square: the football patch, the news stand, the fruit and jasmine stalls, the pookalam and the film poster wall.
import { dialogue as D, step as S } from '../kit.js';

export const bowler = D('chowk-cricket-bowler', {
  name: 'Vinu', role: 'football kid (thrower)', site: 'Chaya kada square, football patch', diff: 2,
  voice: { rate: 1.15, pitch: 1.45 },
  persona: 'Kid in a yellow jersey, ball in hand for a throw-in, arguing with the striker about the last goal.',
  goal: 'Agree it was a foul, then give him the throw-in.',
  steps: [
    S('foul', ['ചേച്ചി, ഇത് ഫൗൾ അല്ലേ? അപ്പു കൈ കൊണ്ട് തൊട്ടു!', 'Chechi, ithu foul alle? Appu kai kondu thottu!', 'Chechi, that is a foul, right? Appu touched it with his hand!'],
      'Say yes, it was a foul.', ['Athe, ithu foul aanu.', 'അതെ, ഇത് ഫൗൾ ആണ്.'],
      ['foul thanne', 'ithu foul aanu mone', 'athe foul aanu', 'foul aanu tto', 'yes foul thanne', 'ഫൗൾ തന്നെ'],
      'agree_it_was_foul', ['Agree it was a foul.', '"Athe" = yes.'],
      ['കണ്ടോ അപ്പൂ! ചേച്ചി പറഞ്ഞു!', 'Kando Appu! Chechi paranju!', 'See Appu! Chechi said so!'],
      ['ഫൗൾ ആണോ അല്ലയോ?', 'Foul aano allayo?', 'Foul or not?']),
    S('throw', ['എന്നാൽ ത്രോ-ഇൻ എനിക്ക്, ശരിയല്ലേ?', 'Ennaal throw-in enikku, shariyalle?', 'Then the throw-in is mine, right?'],
      'Say okay, the throw-in is his.', ['Shari, throw-in ninte aanu.', 'ശരി, ത്രോ-ഇൻ നിന്റേതാണ്.'],
      ['shari throw-in ninakku', 'throw-in ninte', 'shari nee edutholoo', 'throw-in eduthoo', 'okay throw-in ninakku', 'ശരി ത്രോ-ഇൻ നിനക്ക്'],
      'give_throw_in', ['Give him the throw-in.', '"Ninte" = yours.'],
      ['യെ! ഇനി ഞാൻ ഗോളടിക്കും!', 'Ye! Ini njaan goaladikkum!', 'Yes! Now I will score!'],
      ['ത്രോ-ഇൻ ആർക്ക്?', 'Throw-in aarkku?', 'Whose throw-in?']),
  ],
  outro: ['ചേച്ചി റഫറിയാകണം, കേട്ടോ!', 'Chechi referiyaakanam, kettoo!', 'Chechi should be the referee, okay!'],
  learned: [['ithu foul aanu', 'this is a foul'], ['ninte aanu', 'it is yours']],
  again: ['ചേച്ചി, അടുത്ത ഫൗൾ വിളിക്കണേ!', 'Chechi, adutha foul vilikkane!', 'Chechi, call the next foul too!'],
});

export const paperMan = D('chowk-newspaper-vendor', {
  name: 'Vasu Chettan', role: 'newspaper vendor', site: 'Chaya kada square, news stand', diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Thin old man with specs holding up the morning paper and calling headlines; he knows every bit of street gossip.',
  goal: 'Ask for a Malayalam newspaper and pay five rupees.',
  steps: [
    S('paper', ['പത്രം, പത്രം! ഇന്നത്തെ വാർത്ത വായിക്കൂ!', 'Pathram, pathram! Innathe vaartha vaayikkoo!', 'Newspaper! Read the news of today!'],
      'Ask for a Malayalam newspaper.', ['Oru malayalam pathram tharoo chetta.', 'ഒരു മലയാളം പത്രം തരൂ ചേട്ടാ.'],
      ['oru pathram venam', 'pathram tharamo chetta', 'oru paper tharoo', 'malayalam pathram venam', 'chetta oru pathram', 'ഒരു പത്രം വേണം'],
      'ask_for_newspaper', ['Ask for the paper.', '"Pathram" = newspaper.'],
      ['ഇതാ, പത്രം. തലക്കെട്ട് വായിച്ചാൽ മലയാളം പഠിക്കാം.', 'Ithaa, pathram. Thalakkettu vaayichaal Malayalam padikkaam.', 'Here is the paper. Reading headlines will teach you Malayalam.'],
      ['ഏത് പത്രം വേണം?', 'Ethu pathram venam?', 'Which paper do you want?']),
    S('pay', ['അഞ്ച് രൂപ മോളേ. ചില്ലറ ഉണ്ടോ?', 'Anchu roopa mole. Chillara undo?', 'Five rupees, dear. Do you have change?'],
      'Say you have change, here is five rupees.', ['Undu chetta, ithaa anchu roopa.', 'ഉണ്ട് ചേട്ടാ, ഇതാ അഞ്ച് രൂപ.'],
      ['chillara undu chetta', 'ithaa anchu roopa', 'anchu roopa ithaa', 'undu ithaa chetta', 'ithaa chetta chillara', 'ഇതാ അഞ്ച് രൂപ'],
      'pay_five_rupees', ['Say you have it.', '"Undu" = I have. "Anchu" = five.'],
      ['കൃത്യം! വായിച്ചിട്ട് എന്നോട് അഭിപ്രായം പറയണം.', 'Kruthyam! Vaayichittu ennodu abhipraayam parayanam.', 'Exact! Tell me your opinion after reading.'],
      ['ചില്ലറ ഉണ്ടോ ഇല്ലയോ?', 'Chillara undo illayo?', 'Do you have change or not?']),
  ],
  outro: ['വാർത്തയാണ് നാടിന്റെ ശബ്ദം, മോളേ.', 'Vaarthayaanu naadinte shabdam, mole.', 'News is the voice of the land, dear.'],
  learned: [['oru pathram tharoo', 'give me a newspaper'], ['ithaa anchu roopa', 'here is five rupees']],
  again: ['ഇന്നത്തെ പത്രം വായിച്ചോ മോളേ?', 'Innathe pathram vaayicho mole?', 'Did you read today\'s paper, dear?'],
});

export const skipGirl = D('chowk-skip-girl', {
  name: 'Minnu', role: 'skipping girl', site: 'Chaya kada square, open ground by the puttu cart', diff: 1,
  voice: { rate: 1.1, pitch: 1.6 },
  persona: 'Little girl in a pink churidar top with a jasmine strand in her plait, counting her skips out loud in Malayalam.',
  goal: 'Count along with her: say ten.',
  steps: [
    S('count', ['ഒന്ന്, രണ്ട്, മൂന്ന്... ചേച്ചി, പത്ത് വരെ എണ്ണൂ!', 'Onnu, randu, moonnu... Chechi, pathu vare ennoo!', 'One, two, three... Chechi, count up to ten!'],
      'Count to ten in Malayalam.', ['Onnu, randu, moonnu, naalu, anchu, aaru, ezhu, ettu, onpathu, pathu.', 'ഒന്ന്, രണ്ട്, മൂന്ന്, നാല്, അഞ്ച്, ആറ്, ഏഴ്, എട്ട്, ഒൻപത്, പത്ത്.'],
      ['onnu randu moonnu naalu anchu aaru ezhu ettu onpathu pathu', 'onnu randu moonnu naalu anchu', 'ennu pathu vare onnu randu moonnu', 'onnu mudal pathu vare', 'pathu vare ennaam mole', 'ഒന്ന് രണ്ട് മൂന്ന് നാല് അഞ്ച്'],
      'count_to_ten', ['Count from one to ten.', 'One = onnu, two = randu, three = moonnu.'],
      ['ഹായ്! ചേച്ചിക്ക് മലയാളം അറിയാം!', 'Haai! Chechikku Malayalam ariyam!', 'Hey! Chechi knows Malayalam!'],
      ['ഒന്ന് രണ്ട് മൂന്ന്... വീണ്ടും എണ്ണൂ!', 'Onnu randu moonnu... veendum ennoo!', 'One two three... count again!']),
  ],
  outro: ['ഇനി ഞാൻ ഇരുപത് വരെ ചാടും!', 'Ini njaan irupathu vare chaadum!', 'Now I will skip up to twenty!'],
  learned: [['onnu randu moonnu', 'one two three'], ['pathu vare ennaam', 'let us count to ten']],
  again: ['ചേച്ചി, വീണ്ടും എണ്ണാമോ?', 'Chechi, veendum ennaamo?', 'Chechi, shall we count again?'],
});

export const kiteBoy = D('chowk-kite-boy', {
  name: 'Adil', role: 'kite-flying boy', site: 'Chaya kada square, lane south of the chaya kada', diff: 2,
  voice: { rate: 1.1, pitch: 1.4 },
  persona: 'Boy in a sky-blue tee, head tipped back, reeling in his kite string and worried about the electric wires.',
  goal: 'Warn him about the wires, then ask him to let you hold the string.',
  steps: [
    S('wires', ['ചേച്ചീ, പട്ടം ഇപ്പൊ കമ്പിയിൽ കുടുങ്ങും!', 'Chechee, pattam ippo kambiyil kudungum!', 'Chechi, the kite will get stuck in the wires!'],
      'Warn him to be careful of the wires.', ['Kambi sookshikkanam mone.', 'കമ്പി സൂക്ഷിക്കണം മോനേ.'],
      ['kambi sookshikku', 'sookshikkane mone kambi', 'kambiyil kudungum sookshikku', 'wire sookshikkanam', 'sookshikku mone', 'കമ്പി സൂക്ഷിക്കൂ'],
      'warn_about_wires', ['Tell him to be careful.', '"Sookshikkanam" = you must be careful.'],
      ['ശരി ചേച്ചി, ഞാൻ ഇടത്തോട്ട് വലിക്കാം.', 'Shari chechi, njaan idatthottu valikkaam.', 'Okay chechi, I will pull it to the left.'],
      ['കമ്പിയോ? എന്താ പറഞ്ഞത്?', 'Kambiyo? Enthaa paranjathu?', 'The wires? What did you say?']),
    S('hold', ['ഇപ്പൊ സുരക്ഷിതം. ചേച്ചിക്കും പറത്തണോ?', 'Ippo surakshitham. Chechikkum parathano?', 'Safe now. Do you want to fly it too?'],
      'Ask if you can hold the string.', ['Njaan onnu pidichotte?', 'ഞാൻ ഒന്ന് പിടിച്ചോട്ടെ?'],
      ['njaanum pidikkatte', 'onnu tharamo mone', 'njaan parathatte', 'string onnu tharoo', 'enikkum parathanam', 'ഞാനും പിടിക്കട്ടെ'],
      'ask_to_hold_kite', ['Ask to hold it.', '"Pidichotte?" = may I hold?'],
      ['ഇതാ! മുറുകെ പിടിച്ചോ, കാറ്റ് ഉണ്ട്.', 'Ithaa! Murukke pidicho, kaattu undu.', 'Here! Hold tight, there is wind.'],
      ['പിടിക്കണോ വേണ്ടയോ?', 'Pidikkano vendayo?', 'Hold it or not?']),
  ],
  outro: ['പട്ടം പറത്തി ചേച്ചി ഞങ്ങളുടെ കൂട്ടുകാരിയായി!', 'Pattam parathi chechi njangalude koottukaariyaayi!', 'Flying the kite made you our friend, chechi!'],
  learned: [['sookshikkane', 'be careful'], ['njaan onnu pidichotte?', 'may I hold it once?']],
  again: ['പട്ടം ഇപ്പൊ വളരെ ഉയരത്തിലാ!', 'Pattam ippo valare uyarathilaa!', 'The kite is very high now!'],
});

export const schoolCustomer = D('chowk-vada-customer', {
  name: 'Arjun', role: 'schoolboy', site: 'Chaya kada square, customer side of the puttu cart', diff: 1,
  voice: { rate: 1.1, pitch: 1.3 },
  persona: 'Schoolboy with pocket money waiting for his appam from the puttu cart.',
  goal: 'Ask him what he is waiting for.',
  steps: [
    S('wait', ['ചേച്ചി, ഞാൻ അപ്പത്തിനായി കാത്തു നിൽക്കുവാ.', 'Chechi, njaan appathinaayi kaathu nilkkuvaa.', 'Chechi, I am waiting for my appam.'],
      'Ask if the appam is tasty.', ['Appam nalla ruchiyaanoo?', 'അപ്പം നല്ല രുചിയാണോ?'],
      ['appam ruchiyundo', 'appam nannaayirikkumo', 'appam super aanoo', 'ivide appam ruchiyaano', 'appam ishtamaano', 'അപ്പം രുചിയുണ്ടോ'],
      'ask_if_appam_tasty', ['Ask if the appam is good.', '"Ruchi" = taste.'],
      ['പിന്നെ! സ്കൂൾ വിട്ടിട്ട് എന്നും ഇവിടെയാ.', 'Pinne! School vittittu ennum ivideyaa.', 'Of course! I come here every day after school.'],
      ['ഏ? അപ്പത്തെ പറ്റിയാണോ?', 'Ae? Appathe pattiyaano?', 'Eh? About the appam?']),
  ],
  outro: ['ചേച്ചിയും ഒരു അപ്പം കഴിച്ച് നോക്കൂ!', 'Chechiyum oru appam kazhichu nokkoo!', 'Chechi, try an appam too!'],
  learned: [['appam ruchiyaano?', 'is the appam tasty?']],
  again: ['എന്റെ അപ്പം ഇപ്പൊ വരും.', 'Ente appam ippo varum.', 'My appam will come now.'],
});

export const fruitSeller = D('chowk-fruit-seller', {
  name: 'Saraswathi Chechi', role: 'banana and fruit seller', site: 'Chaya kada square, fruit stall', diff: 2,
  voice: { rate: 1.1, pitch: 1.15 },
  persona: 'Woman in a magenta saree with arms out like a hawker, calling out her bananas and fruit.',
  goal: 'Ask the price of a kilo of nendran bananas and buy a kilo.',
  steps: [
    S('price', ['പഴം, പഴം! നേന്ത്രപ്പഴം, ഞാലിപ്പൂവൻ!', 'Pazham, pazham! Nenthrappazham, njaalippoovan!', 'Bananas! Nendran, njalipoovan!'],
      'Ask the price of nendran bananas.', ['Nenthrappazham kilo ethrayaa chechi?', 'നേന്ത്രപ്പഴം കിലോ എത്രയാ ചേച്ചി?'],
      ['nendran kilo ethra', 'pazham kilo ethra chechi', 'nenthrappazham vila', 'pazhathinu ethra roopa', 'chechi pazham ethra', 'നേന്ത്രപ്പഴം എത്രയാ'],
      'ask_banana_price', ['Ask the price per kilo.', '"Pazham" = banana.'],
      ['അറുപത് രൂപ, മോളേ. നല്ല പഴുത്തതാ.', 'Arupathu roopa, mole. Nalla pazhuthathaa.', 'Sixty rupees, dear. Nicely ripe.'],
      ['ഏത് പഴമാ വേണ്ടത്?', 'Ethu pazhamaa vendathu?', 'Which banana do you want?']),
    S('buy', ['എത്ര വേണം മോളേ?', 'Ethra venam mole?', 'How much do you want, dear?'],
      'Say one kilo, please.', ['Oru kilo tharoo chechi.', 'ഒരു കിലോ തരൂ ചേച്ചി.'],
      ['oru kilo venam chechi', 'oru kilo mathi', 'oru kilo pazham tharoo', 'chechi oru kilo', 'oru kilo tharamo', 'ഒരു കിലോ വേണം'],
      'buy_one_kilo_bananas', ['Say how much.', '"Oru kilo" = one kilo.'],
      ['ഇതാ, ബാഗിൽ വെച്ചോ. ബസിൽ കഴിക്കാം.', 'Ithaa, baagil vecho. Basil kazhikkaam.', 'Here, put them in your bag. Eat them on the bus.'],
      ['എത്ര കിലോ?', 'Ethra kilo?', 'How many kilos?']),
  ],
  outro: ['പഴം തിന്നാൽ ക്ഷീണം മാറും, കേട്ടോ.', 'Pazham thinnaal ksheenam maarum, kettoo.', 'Eating bananas removes tiredness, you know.'],
  learned: [['pazham kilo ethra?', 'how much is a kilo of bananas?'], ['oru kilo tharoo', 'give me one kilo']],
  again: ['പഴം തീർന്നില്ല, വേറെ വേണോ?', 'Pazham theernnilla, vere veno?', 'The bananas are not finished, want more?'],
});

export const jasmineSeller = D('chowk-marigold-seller', {
  name: 'Kamalamma', role: 'jasmine garland seller', site: 'Chaya kada square, flower stall', diff: 2,
  voice: { rate: 1.05, pitch: 1.2 },
  persona: 'Woman in a marigold-yellow saree with a basket of jasmine strings, selling mulla for hair and for the temple.',
  goal: 'Ask for a strand of jasmine for your hair and pay ten rupees.',
  steps: [
    S('jasmine', ['മുല്ലപ്പൂ, മുല്ലപ്പൂ! മോൾക്ക് മുടിയിൽ വെക്കാൻ വേണോ?', 'Mullappoo, mullappoo! Molkku mudiyil vekkaan veno?', 'Jasmine! Want some to wear in your hair, dear?'],
      'Ask for one strand of jasmine.', ['Oru muzham mullappoo tharoo chechi.', 'ഒരു മുഴം മുല്ലപ്പൂ തരൂ ചേച്ചി.'],
      ['oru muzham poovu venam', 'mullappoo tharamo chechi', 'oru muzham mulla', 'chechi oru muzham', 'mullappoo venam', 'ഒരു മുഴം മുല്ലപ്പൂ വേണം'],
      'ask_for_jasmine', ['Ask for jasmine.', '"Muzham" = a forearm length of flowers.'],
      ['ഇതാ, ഒരു മുഴം. നല്ല മണമുണ്ട്, അല്ലേ?', 'Ithaa, oru muzham. Nalla manamundu, alle?', 'Here, one muzham. Lovely smell, no?'],
      ['എന്താ വേണ്ടത് മോളേ?', 'Enthaa vendathu mole?', 'What do you need, dear?']),
    S('pay', ['പത്ത് രൂപ മോളേ.', 'Pathu roopa mole.', 'Ten rupees, dear.'],
      'Pay ten rupees.', ['Ithaa chechi, pathu roopa.', 'ഇതാ ചേച്ചി, പത്ത് രൂപ.'],
      ['pathu roopa ithaa', 'ithaa pathu roopa', 'pathu roopa tharam chechi', 'nanni chechi ithaa', 'ithaa chechi kaash', 'ഇതാ പത്ത് രൂപ'],
      'pay_ten_rupees', ['Hand over the money.', '"Pathu" = ten.'],
      ['നന്ദി മോളേ! അമ്പലത്തിലും പോയി വരൂ.', 'Nanni mole! Ambalathilum poyi varoo.', 'Thanks dear! Go to the temple too.'],
      ['പത്ത് രൂപ തരണം.', 'Pathu roopa tharanam.', 'Ten rupees, please.']),
  ],
  outro: ['മുടിയിൽ മുല്ലപ്പൂ ചൂടിയപ്പോൾ അസ്സൽ മലയാളി!', 'Mudiyil mullappoo choodiyappol assal malayali!', 'With jasmine in your hair, you look like a real Malayali!'],
  learned: [['oru muzham mullappoo', 'one muzham of jasmine'], ['ithaa pathu roopa', 'here is ten rupees']],
  again: ['മുല്ലപ്പൂ ഇനിയും വേണോ?', 'Mullappoo iniyum veno?', 'Want more jasmine?'],
});

export const newsReader = D('chowk-news-reader', {
  name: 'Gopalan Master', role: 'elderly newspaper reader', site: 'Chaya kada square, by the news stand', diff: 3,
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Retired master in a gold-bordered mundu reading an open Malayalam daily and commenting on the politics.',
  goal: 'Ask what the big news is today.',
  steps: [
    S('news', ['ഹും, ഇന്നും അതേ രാഷ്ട്രീയം!', 'Hum, innum athe raashtreeyam!', 'Hmm, the same politics again today!'],
      'Ask what the big news is.', ['Innathe pradhaana vaartha enthaanu saare?', 'ഇന്നത്തെ പ്രധാന വാർത്ത എന്താണ് സാറേ?'],
      ['innathe vaartha enthaa', 'pradhaana vaartha enthaa', 'ennaa vaartha master', 'enthaa innu vaartha', 'saare innathe vaartha', 'ഇന്നത്തെ വാർത്ത എന്താ'],
      'ask_todays_news', ['Ask about today news.', '"Vaartha" = news.'],
      ['മഴയും ബസ് സമരവും! നിങ്ങൾ യാത്ര സൂക്ഷിക്കണം.', 'Mazhayum bus samaravum! Ningal yaathra sookshikkanam.', 'Rain and a bus strike! You should plan your travel carefully.'],
      ['വാർത്തയാണോ ചോദിച്ചത്?', 'Vaarthayaano chodichathu?', 'Did you ask about the news?']),
  ],
  outro: ['പത്രം വായിക്കുന്നത് മലയാളം പഠിക്കാനും നല്ലതാ.', 'Pathram vaayikkunnathu Malayalam padikkaanum nallathaa.', 'Reading the paper is good for learning Malayalam too.'],
  learned: [['innathe vaartha enthaa?', 'what is today\'s news?']],
  again: ['വിധാൻസഭ വാർത്ത കേട്ടോ?', 'Vidhaansabha vaartha kettoo?', 'Did you hear the assembly news?'],
});

export const kolamGirl = D('chowk-rangoli-girl', {
  name: 'Devika', role: 'little girl making a pookalam', site: 'Chaya kada square, beside the Onam pookalam', diff: 1,
  voice: { rate: 1.0, pitch: 1.6 },
  persona: 'Little girl crouched over the pookalam, arranging marigold and tulsi petals in rings.',
  goal: 'Tell her the pookalam is beautiful.',
  steps: [
    S('pookalam', ['ചേച്ചീ, ഞാൻ ഓണത്തിന് പൂക്കളം ഇടുവാ!', 'Chechee, njaan onathinu pookkalam iduvaa!', 'Chechi, I am making a pookalam for Onam!'],
      'Tell her the pookalam is beautiful.', ['Pookalam valare bhangiyaayittundu.', 'പൂക്കളം വളരെ ഭംഗിയായിട്ടുണ്ട്.'],
      ['pookalam bhangiyundu', 'nalla bhangi mole', 'pookalam super aanu', 'pookalam kollaam', 'valare bhangiyundu', 'പൂക്കളം ഭംഗിയുണ്ട്'],
      'praise_the_pookalam', ['Say it looks beautiful.', '"Bhangi" = beauty.'],
      ['താങ്ക്യൂ ചേച്ചീ! ഇനി നടുവിൽ മഞ്ഞ ഇടണം.', 'Thankyou chechee! Ini naduvil manja idanam.', 'Thank you chechi! Now I must put yellow in the middle.'],
      ['ഭംഗിയുണ്ടോ ചേച്ചീ?', 'Bhangiyundo chechee?', 'Is it pretty, chechi?']),
  ],
  outro: ['ഓണത്തിന് ചേച്ചിയും വരണം, സദ്യ ഉണ്ട്!', 'Onathinu chechiyum varanam, sadya undu!', 'Come at Onam too, chechi, there is a feast!'],
  learned: [['pookalam bhangiyundu', 'the pookalam is beautiful']],
  again: ['ഇനി ഏത് പൂവ് ഇടണം?', 'Ini ethu poovu idanam?', 'Which flower should I put next?'],
});

export const pongalDevotee = D('chowk-ganpati-devotee', {
  name: 'Sarojini Amma', role: 'woman devotee at the Onam poster', site: 'Chaya kada square, in front of the pookalam poster', diff: 2,
  voice: { rate: 0.95, pitch: 1.1 },
  persona: 'Woman in a cream set-saree praying with hands joined in front of the Onam poster.',
  goal: 'Wish her a happy Onam.',
  steps: [
    S('onam', ['മോളേ, ഓണം വരുന്നു. പ്രാർത്ഥിക്കുകയാ.', 'Mole, onam varunnu. Praarthikkukayaa.', 'Dear, Onam is coming. I am praying.'],
      'Wish her a happy Onam.', ['Onashamsakal amme!', 'ഓണാശംസകൾ അമ്മേ!'],
      ['happy onam amme', 'onam aashamsakal', 'onashamsakal', 'amme happy onam', 'ellaa nanmakalum amme', 'ഓണാശംസകൾ'],
      'wish_happy_onam', ['Wish her for the festival.', '"Onashamsakal" = Onam greetings.'],
      ['ആശംസകൾ മോളേ! സദ്യക്ക് വരണേ.', 'Aashamsakal mole! Sadyakku varane.', 'Greetings dear! Do come for the feast.'],
      ['എന്താ മോളേ പറഞ്ഞത്?', 'Enthaa mole paranjathu?', 'What did you say, dear?']),
  ],
  outro: ['പൂക്കളം കാണാൻ രാവിലെ വരൂ.', 'Pookalam kaanaan raavile varoo.', 'Come in the morning to see the pookalam.'],
  learned: [['onashamsakal', 'happy Onam']],
  again: ['ഓണത്തിന് ഇനി എത്ര ദിവസം?', 'Onathinu ini ethra divasam?', 'How many days are left for Onam?'],
});

export const tagBoy = D('chowk-tag-kid-1', {
  name: 'Kichu', role: 'playing kid (boy)', site: 'Chaya kada square, open ground east of the chaya kada', diff: 1,
  voice: { rate: 1.2, pitch: 1.5 },
  persona: 'Boy in a mint shirt playing tag, running in short bursts.',
  goal: 'Ask him what the game is called.',
  steps: [
    S('game', ['ഓടിക്കോ ചേച്ചീ, ഞാൻ പിടിക്കും!', 'Odikko chechee, njaan pidikkum!', 'Run, chechi, I will catch you!'],
      'Ask what the game is.', ['Ithu ethu kali aanu?', 'ഇത് ഏത് കളിയാണ്?'],
      ['ethu kali ithu', 'ithinte peru enthaa', 'ithu enthu kali aanu mone', 'kali ethaanu', 'ee kaliyude peru', 'ഇത് ഏത് കളി'],
      'ask_game_name', ['Ask what game it is.', '"Kali" = game.'],
      ['തൊട്ടുകളി! തൊട്ടാൽ നീ ആളാകും!', 'Thottukali! Thottaal nee aalaakum!', 'Tag! If I touch you, you are it!'],
      ['ഏത് കളിയെന്ന് ചോദിക്ക്!', 'Ethu kaliyennu chodikku!', 'Ask what game it is!']),
  ],
  outro: ['ഇനി ചേച്ചി ഓടിക്കോ!', 'Ini chechi odikko!', 'Now you run, chechi!'],
  learned: [['ithu ethu kali aanu?', 'which game is this?']],
  again: ['ചേച്ചി, ഓടാൻ നോക്ക്!', 'Chechi, odaan nokku!', 'Chechi, try to run!'],
});

export const tagGirl = D('chowk-tag-kid-2', {
  name: 'Ammu', role: 'playing kid (girl)', site: 'Chaya kada square, open ground east of the chaya kada', diff: 1,
  voice: { rate: 1.15, pitch: 1.6 },
  persona: 'Girl in a lilac top with a ball, chasing her friend in a game of tag.',
  goal: 'Tell her you cannot run because of the rucksack.',
  steps: [
    S('run', ['ചേച്ചീ, വാ ഓടാം! ഞങ്ങളുടെ കൂടെ കൂടൂ!', 'Chechee, vaa odaam! Njangalude koode koodoo!', 'Come on chechi, let us run! Join us!'],
      'Say you cannot run with the rucksack.', ['Ente bagge bhaaram aanu, odaan pattilla.', 'എന്റെ ബാഗ് ഭാരമാണ്, ഓടാൻ പറ്റില്ല.'],
      ['bag bhaaram aanu odaan pattilla', 'odaan pattilla mole', 'ente bag bhaaramaanu', 'rucksack bhaaram aanu', 'bhaaram kondu odaan pattilla', 'ഓടാൻ പറ്റില്ല മോളേ'],
      'say_cannot_run', ['Say your bag is heavy.', '"Bhaaram" = heavy. "Pattilla" = cannot.'],
      ['ഹ ഹ! എന്നാൽ ബാഗ് ഇവിടെ വെച്ചോ, ഞാൻ നോക്കാം.', 'Ha ha! Ennaal bag ivide vecho, njaan nokkaam.', 'Ha ha! Then leave your bag here, I will watch it.'],
      ['എന്താ പറഞ്ഞത് ചേച്ചീ?', 'Enthaa paranjathu chechee?', 'What did you say, chechi?']),
  ],
  outro: ['അടുത്ത തവണ ബാഗ് ഇല്ലാതെ വരണം!', 'Aduttha thavana bag illaathe varanam!', 'Next time come without the bag!'],
  learned: [['odaan pattilla', 'I cannot run']],
  again: ['ചേച്ചി, ഒരു റൗണ്ട് കൂടി?', 'Chechi, oru round koodi?', 'Chechi, one more round?'],
});

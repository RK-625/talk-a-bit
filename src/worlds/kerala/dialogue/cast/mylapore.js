// Kerala tiled houses and the flats lanes: thinnai verandahs, the street tap, the doorstep with the nilavilakku.
import { dialogue as D, step as S } from '../kit.js';

export const carromMan = D('chawl-carrom-man', {
  name: 'Sunil Chettan', role: 'carrom player', site: 'Kerala tiled house ch1, verandah', diff: 2,
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Man in a sleeveless vest and a folded mundu flicking the striker with one finger; he loves teaching the game.',
  goal: 'Say you do not know carrom, then try one shot.',
  steps: [
    S('know', ['ചേച്ചി, കാരംസ് കളിക്കാനറിയാമോ?', 'Chechi, carroms kalikkaanariyamo?', 'Chechi, do you know how to play carrom?'],
      'Say you do not know it, but want to learn.', ['Ariyilla chetta, padikkanam.', 'അറിയില്ല ചേട്ടാ, പഠിക്കണം.'],
      ['ariyilla padippichu tharamo', 'enikku ariyilla chetta', 'padikkaan ishtamaanu', 'kurachu ariyaam', 'ariyilla chetta onnu padippikkoo', 'അറിയില്ല ചേട്ടാ'],
      'say_cannot_play_carrom', ['Say you do not know it.', '"Ariyilla" = I do not know.'],
      ['എങ്കിൽ ഇരിക്ക്, ആദ്യം സ്ട്രൈക്കർ പിടിക്കാൻ പഠിക്കാം.', 'Enkil irikku, aadyam striker pidikkaan padikkaam.', 'Then sit, first learn to hold the striker.'],
      ['കളിക്കാനറിയാമോ ഇല്ലയോ?', 'Kalikkaanariyamo illayo?', 'Do you know how to play or not?']),
    S('shot', ['ഇതാ സ്ട്രൈക്കർ. ഒരു ഷോട്ട് അടിച്ചോ.', 'Ithaa striker. Oru shot adicho.', 'Here is the striker. Take a shot.'],
      'Say you will try one shot.', ['Njaan oru shot nokkatte.', 'ഞാൻ ഒരു ഷോട്ട് നോക്കട്ടെ.'],
      ['oru shot adikkatte', 'njaan try cheyyaam', 'oru thavana nokkatte', 'njaan kalikkaam chetta', 'shot adikkaam', 'ഞാൻ ഒരു ഷോട്ട് അടിക്കട്ടെ'],
      'try_one_shot', ['Say you will try.', '"Nokkatte" = let me try.'],
      ['കൊള്ളാം! പക്ഷേ കോയിൻ പോക്കറ്റിൽ വീണില്ല.', 'Kollaam! Pakshe coin pocketil veenilla.', 'Nice! But the coin did not drop in the pocket.'],
      ['ഒരു ഷോട്ട് അടിക്കുന്നോ?', 'Oru shot adikkunno?', 'Will you take a shot?']),
  ],
  outro: ['പിന്നെ വരൂ, ഒരു മത്സരം ആകാം!', 'Pinne varoo, oru mathsaram aakaam!', 'Come again, we can have a match!'],
  learned: [['ariyilla, padikkanam', 'I do not know, I want to learn'], ['njaan oru shot nokkatte', 'let me try one shot']],
  again: ['ചേച്ചി, ഒരു റൗണ്ട് കൂടി കളിക്കാം?', 'Chechi, oru round koodi kalikkaam?', 'Chechi, shall we play one more round?'],
});

export const carromElder = D('chawl-carrom-elder', {
  name: 'Kunjunni Appooppan', role: 'elder carrom player', site: 'Kerala tiled house ch1, verandah', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Old man in round specs playing slowly and teasing his opponent across the board.',
  goal: 'Wish him luck in the match.',
  steps: [
    S('luck', ['ഞാൻ ഇവനെ തോൽപ്പിക്കും, നോക്കിക്കോ!', 'Njaan ivane tholppikkum, nokkikko!', 'I will beat him, just watch!'],
      'Wish him luck.', ['Appooppanu jayam undaakatte.', 'അപ്പൂപ്പന് ജയം ഉണ്ടാകട്ടെ.'],
      ['jayikkatte appooppa', 'all the best appooppa', 'appooppan jayikkum', 'nannaayi kalikku appooppa', 'jayam undaakatte', 'ജയിക്കട്ടെ അപ്പൂപ്പാ'],
      'wish_the_elder_luck', ['Wish him to win.', '"Jayam" = victory.'],
      ['ആഹാ, പെണ്ണ് കൊള്ളാം! നിന്റെ ആശംസ ഫലിക്കട്ടെ.', 'Aahaa, pennu kollaam! Ninte aashamsa phalikkatte.', 'Ah, nice girl! May your wish come true.'],
      ['ആരെയാ ആശംസിച്ചത്?', 'Aareyaa aashamsichathu?', 'Whom did you wish?']),
  ],
  outro: ['പിന്നെ ഒരു കളി കളിക്കാം, മോളേ.', 'Pinne oru kali kalikkaam, mole.', 'We will play a game later, dear.'],
  learned: [['jayam undaakatte', 'may you win']],
  again: ['എന്റെ ഊഴം കഴിഞ്ഞില്ല.', 'Ente oozham kazhinjilla.', 'My turn is not over.'],
});

export const tapWoman = D('chawl-tap-woman', {
  name: 'Radha Chechi', role: 'woman at the street tap', site: 'Kerala flats ch2, common tap', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Woman in a set-saree waiting in the water queue with steel and plastic pots, idly chatting about the water timing.',
  goal: 'Ask what time the water comes, then say where you are staying.',
  steps: [
    S('time', ['ഇന്നും വെള്ളം വൈകി! പൈപ്പ് എപ്പോൾ വരും?', 'Innum vellam vaiki! Pipe eppol varum?', 'Water is late again today! When will it come?'],
      'Ask what time the water comes.', ['Vellam eppozhaanu varunnathu chechi?', 'വെള്ളം എപ്പോഴാണ് വരുന്നത് ചേച്ചി?'],
      ['vellam eppol varum', 'eppozhaa vellam varunnathu', 'water eppo varum chechi', 'vellam ethra manikku', 'chechi vellam eppol', 'വെള്ളം എപ്പോൾ വരും'],
      'ask_water_time', ['Ask when the water comes.', '"Vellam" = water.'],
      ['രാവിലെ ആറിന്. ഇന്ന് പത്ത് മിനിറ്റ് വൈകി.', 'Raavile aarinu. Innu pathu minute vaiki.', 'At six in the morning. Ten minutes late today.'],
      ['വെള്ളത്തെ പറ്റിയാണോ?', 'Vellathe pattiyaano?', 'About the water?']),
    S('stay', ['മോൾ എവിടെയാ താമസിക്കുന്നത്? ഈ ഫ്ലാറ്റിലാണോ?', 'Mol evideyaa thaamasikkunnathu? Ee flatilaano?', 'Where are you staying, dear? In this flat?'],
      'Say you are staying at a hostel in Fort Kochi.', ['Njaan Fort Kochiyil oru hostelil aanu.', 'ഞാൻ ഫോർട്ട് കൊച്ചിയിൽ ഒരു ഹോസ്റ്റലിലാണ്.'],
      ['hostelil thaamasikkunnu', 'fort kochiyil aanu', 'njaan hostelil aanu chechi', 'ente hostel fort kochiyil', 'fort kochiyil thaamasam', 'ഹോസ്റ്റലിലാണ് ചേച്ചി'],
      'say_where_staying', ['Say where you stay.', '"Hostelil aanu" = I am at a hostel.'],
      ['ഓ, നല്ല സ്ഥലം. കടൽക്കാറ്റും ഉണ്ട്.', 'O, nalla sthalam. Kadalkkaattum undu.', 'Oh, a nice place. With the sea breeze too.'],
      ['എവിടെയാ താമസം?', 'Evideyaa thaamasam?', 'Where are you staying?']),
  ],
  outro: ['ഇവിടെ വരുമ്പോൾ ഒരു കുടം വെള്ളം പിടിച്ച് തരണേ!', 'Ivide varumbol oru kudam vellam pidichu tharane!', 'When you come here, hold a pot of water for me!'],
  learned: [['vellam eppozhaanu varunnathu?', 'when does the water come?'], ['njaan hostelil aanu', 'I am staying at a hostel']],
  again: ['പൈപ്പ് തുറന്നു, വരൂ ക്യൂവിൽ.', 'Pipe thurannu, varoo queuevil.', 'The tap is open, join the queue.'],
});

export const grandmaStep = D('chawl-grandma-doorstep', {
  name: 'Muthassi Janaki', role: 'grandmother on the doorstep', site: 'Kerala tiled house ch3, verandah step', diff: 2,
  voice: { rate: 0.85, pitch: 1.1 },
  persona: 'Tiny muthassi in a cream set-saree seated on the step, watching the lane; a brass nilavilakku glows behind her.',
  goal: 'Greet her respectfully.',
  steps: [
    S('greet', ['ആരാ ഇത്? ഒരു പുതിയ മുഖം!', 'Aaraa ithu? Oru puthiya mukham!', 'Who is this? A new face!'],
      'Greet her respectfully as muthassi.', ['Namaskaaram muthassi, sukhamaano?', 'നമസ്കാരം മുത്തശ്ശീ, സുഖമാണോ?'],
      ['namaskaram muthassi', 'muthassi sukhamaano', 'muthassi ente peru ananya', 'hello muthassi', 'sukhamaano muthassi', 'മുത്തശ്ശീ സുഖമാണോ'],
      'greet_the_muthassi', ['Greet her as grandmother.', '"Muthassi" = grandmother.'],
      ['സുഖം മോളേ. വിളക്ക് കത്തിക്കാൻ നേരമായി.', 'Sukham mole. Vilakku kathikkaan neramaayi.', 'Fine dear. It is time to light the lamp.'],
      ['കേട്ടില്ല മോളേ, ഉറക്കെ പറയൂ.', 'Kettilla mole, urakke parayoo.', 'I did not hear, dear, say it louder.']),
  ],
  outro: ['ഇരിക്ക് മോളേ, ഒരു കഥ പറയാം.', 'Irikku mole, oru katha parayaam.', 'Sit, dear, I will tell you a story.'],
  learned: [['muthassi, sukhamaano?', 'grandmother, how are you?']],
  again: ['മോൾ ഇനിയും വരണം.', 'Mol iniyum varanam.', 'You must come again, dear.'],
});

export const laneSweeper = D('chawl-lane-sweeper', {
  name: 'Bhargavi', role: 'lane sweeper', site: 'Kerala tiled-house lanes, under the laundry line', diff: 1,
  voice: { rate: 1.0, pitch: 1.1 },
  persona: 'Woman in a green saree with a marigold pallu, sweeping the lane with a long broom.',
  goal: 'Offer to help her sweep.',
  steps: [
    S('sweep', ['ഇന്ന് ഇല ഒരുപാട് വീണു.', 'Innu ila orupaadu veenu.', 'So many leaves fell today.'],
      'Offer to help her sweep.', ['Njaan sahaayikkatte chechi?', 'ഞാൻ സഹായിക്കട്ടെ ചേച്ചി?'],
      ['njaan koodi adichotte', 'sahaayam venamo chechi', 'njaan help cheyyatte', 'njaanum adikkaam', 'chechi help venamo', 'സഹായം വേണോ ചേച്ചി'],
      'offer_to_help_sweep', ['Offer help.', '"Sahaayikkatte?" = shall I help?'],
      ['വേണ്ട മോളേ, നീ വിഷമിക്കണ്ട. നല്ല മനസ്സ്!', 'Venda mole, nee vishamikkanda. Nalla manassu!', 'No need, dear, do not trouble yourself. A kind heart!'],
      ['ഏ? ഒന്നൂടെ പറയൂ ചേച്ചി.', 'Ae? Onnoode parayoo chechi.', 'Eh? Say it again, chechi.']),
  ],
  outro: ['മുറ്റം വൃത്തിയായാൽ മനസ്സും വൃത്തി.', 'Muttam vrutthiyaayaal manassum vrutthi.', 'A clean yard makes a clean mind.'],
  learned: [['njaan sahaayikkatte?', 'shall I help?']],
  again: ['ഇനി ഇലകൾ ഒഴിഞ്ഞു.', 'Ini ilakal ozhinju.', 'The leaves are cleared now.'],
});

export const gossipAunty = D('lane-aunty-gossip', {
  name: 'Beena Chechi', role: 'gossiping chechi', site: 'Open ground by a flats block', diff: 2,
  voice: { rate: 1.15, pitch: 1.2 },
  persona: 'Chechi in a rose blouse with jasmine in her bun, gesturing as she tells a story to anyone who stops.',
  goal: 'Ask who the newcomer is, then say you like Kochi very much.',
  steps: [
    S('who', ['അറിഞ്ഞോ? ആ കോണിലെ വീട്ടിൽ പുതിയ ആള് വന്നു!', 'Arinjo? Aa konile veettil puthiya aal vannu!', 'Have you heard? A new person came to the house at the corner!'],
      'Ask who it is.', ['Aaraanu athu chechi?', 'ആരാണ് അത് ചേച്ചി?'],
      ['aaraa athu', 'aarenkilum vannoo chechi', 'aarude veedu aanu', 'ethu veedu chechi', 'aaraa chechi puthiya aal', 'ആരാ അത്'],
      'ask_who_is_new', ['Ask who it is.', '"Aaraanu?" = who is it?'],
      ['ഒരു ടീച്ചർ! തിരുവനന്തപുരത്ത് നിന്ന്.', 'Oru teacher! Thiruvananthapurath ninnu.', 'A teacher! From Thiruvananthapuram.'],
      ['ആരെ പറ്റിയാ ചോദിക്കുന്നത്?', 'Aare pattiyaa chodikkunnathu?', 'About whom are you asking?']),
    S('like', ['നീ ഈ നാട്ടിൽ പുതിയതല്ലേ? ഇഷ്ടമായോ?', 'Nee ee naattil puthiyathalle? Ishtamaayo?', 'You are new to this place, right? Do you like it?'],
      'Say you like Kochi very much.', ['Enikku Kochi valare ishtamaayi.', 'എനിക്ക് കൊച്ചി വളരെ ഇഷ്ടമായി.'],
      ['kochi ishtamaayi chechi', 'enikku ishtamaayi', 'kochi nalla sthalam', 'kochi valare nannayittundu', 'ishtamaayi chechi', 'കൊച്ചി ഇഷ്ടമായി'],
      'say_you_like_kochi', ['Say you like it here.', '"Ishtamaayi" = I liked it.'],
      ['അത് പറഞ്ഞാൽ മതി! ഇനി ചായ കുടിച്ചിട്ട് പോകാം.', 'Athu paranjaal mathi! Ini chaya kudichittu pokaam.', 'That is what I like to hear! Now have tea before you go.'],
      ['ഇഷ്ടമായോ ഇല്ലയോ?', 'Ishtamaayo illayo?', 'Did you like it or not?']),
  ],
  outro: ['കഥകൾ ഇനിയും ഉണ്ട്, നാളെ വരൂ!', 'Kathakal iniyum undu, naale varoo!', 'There are more stories, come tomorrow!'],
  learned: [['aaraanu athu?', 'who is that?'], ['enikku Kochi ishtamaayi', 'I like Kochi']],
  again: ['ഒരു കാര്യം പറയാൻ മറന്നു!', 'Oru kaaryam parayaan marannu!', 'I forgot to tell you one thing!'],
});

export const vegWoman = D('chawl-lane-vegetable-woman', {
  name: 'Thresiamma', role: 'vegetable woman', site: 'Lane near a flats block', diff: 2,
  voice: { rate: 1.1, pitch: 1.1 },
  persona: 'Gossipy woman in a butter-yellow blouse standing with her bag of fresh vegetables.',
  goal: 'Ask the price of okra and buy half a kilo.',
  steps: [
    S('price', ['ഹാ, മോളേ! പച്ചക്കറി വേണോ? നല്ല വെണ്ടയ്ക്ക ഉണ്ട്.', 'Haa, mole! Pachakkari veno? Nalla vendakka undu.', 'Ah dear! Want vegetables? There is good okra.'],
      'Ask how much the okra is.', ['Vendakka kilo ethra chechi?', 'വെണ്ടയ്ക്ക കിലോ എത്ര ചേച്ചി?'],
      ['vendakka ethra roopa', 'vendakka kilo ethrayaa', 'chechi vendakka vila', 'vendakkaykku ethra', 'ethra roopa vendakka', 'വെണ്ടയ്ക്ക എത്രയാ'],
      'ask_okra_price', ['Ask the price of okra.', '"Vendakka" = okra.'],
      ['നാല്പത് രൂപ. തോട്ടത്തിൽ നിന്ന് ഇന്ന് പറിച്ചതാ.', 'Naalpathu roopa. Thottathil ninnu innu parichathaa.', 'Forty rupees. Plucked from the garden today.'],
      ['ഏത് പച്ചക്കറി?', 'Ethu pachakkari?', 'Which vegetable?']),
    S('half', ['അര കിലോ മതിയോ?', 'Ara kilo mathiyo?', 'Is half a kilo enough?'],
      'Say yes, half a kilo is enough.', ['Athe, ara kilo mathi.', 'അതെ, അര കിലോ മതി.'],
      ['ara kilo mathi chechi', 'ara kilo tharoo', 'ara kilo venam', 'athe mathi', 'mathi chechi ara kilo', 'അര കിലോ മതി'],
      'buy_half_kilo_okra', ['Say yes.', '"Ara kilo" = half a kilo.'],
      ['ഇതാ. ഹോസ്റ്റലിൽ പാചകം ചെയ്യുമോ?', 'Ithaa. Hostelil paachakam cheyyumo?', 'Here. Will you cook at the hostel?'],
      ['അര കിലോ വേണോ?', 'Ara kilo veno?', 'Do you want half a kilo?']),
  ],
  outro: ['വെണ്ടയ്ക്ക മെഴുക്കുപുരട്ടി ഉണ്ടാക്കി നോക്ക്!', 'Vendakka mezhukkupuratti undaakki nokku!', 'Try making okra mezhukkupuratti!'],
  learned: [['vendakka kilo ethra?', 'how much is a kilo of okra?'], ['ara kilo mathi', 'half a kilo is enough']],
  again: ['പച്ചക്കറി തീർന്നിട്ടില്ല മോളേ.', 'Pachakkari theernnittilla mole.', 'The vegetables are not finished, dear.'],
});

export const milkman = D('chawl-lane-milkman', {
  name: 'Sreekumar', role: 'milkman', site: 'Lane near a flats block', diff: 1,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Milkman in a folded mundu with a metal can, finishing his morning round and waving at everyone.',
  goal: 'Politely say you do not need milk today.',
  steps: [
    S('milk', ['പാല്! പാല് വേണോ ചേച്ചീ? ഇപ്പൊ കറന്നതാ!', 'Paal! Paal veno chechee? Ippo karannathaa!', 'Milk! Want milk, chechi? Just milked!'],
      'Say no thanks, you can get tea at the hostel.', ['Venda chetta, hostelil chaya kittum.', 'വേണ്ട ചേട്ടാ, ഹോസ്റ്റലിൽ ചായ കിട്ടും.'],
      ['venda chetta nanni', 'ippol venda', 'venda chetta', 'innu venda chetta', 'paal venda', 'വേണ്ട ചേട്ടാ'],
      'decline_milk', ['Say no politely.', '"Venda" = not needed.'],
      ['ശരി ശരി. നാളെ വേണമെങ്കിൽ പറഞ്ഞാൽ മതി.', 'Shari shari. Naale venamenkil paranjaal mathi.', 'Okay okay. If you want some tomorrow, just say.'],
      ['പാല് വേണോ വേണ്ടയോ?', 'Paal veno vendayo?', 'Milk, yes or no?']),
  ],
  outro: ['രാവിലെ അഞ്ചിന് ഞാൻ ഇവിടെ ഉണ്ടാകും.', 'Raavile anchinu njaan ivide undaakum.', 'I will be here at five in the morning.'],
  learned: [['venda chetta', 'no thanks, brother']],
  again: ['പാല് ബാക്കിയുണ്ട്, വേണോ?', 'Paal baakkiyundu, veno?', 'There is milk left, want some?'],
});

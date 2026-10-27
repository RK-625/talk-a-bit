// Kochi Metro station platform (tea stall, women's coach marker, bench, timetable, ticket window) and the Goshree bridge checkpost.
import { dialogue as D, step as S } from '../kit.js';

export const stationTea = D('station-chaiwala', {
  name: 'Hari Chettan', role: 'station tea seller', site: 'Kochi Metro station platform, tea stall', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Thin tea seller in a folded mundu pouring chaya from a kettle for waiting passengers.',
  goal: 'Order a strong tea and decline the vada.',
  steps: [
    S('tea', ['ചായ, ചായ! ചൂട് ചായ!', 'Chaya, chaya! Choodu chaya!', 'Tea, tea! Hot tea!'],
      'Ask for a strong black tea (kadum chaya).', ['Oru kadum chaya tharamo?', 'ഒരു കടുംചായ തരാമോ?'],
      ['oru kadum chaya venam', 'kadum chaya tharoo chetta', 'oru chaya kadum aayi', 'chetta kadum chaya', 'oru kadum chaya please', 'ഒരു കടുംചായ വേണം'],
      'order_strong_tea', ['Ask for strong tea.', '"Kadum chaya" = strong black tea.'],
      ['ഇതാ, ഇഞ്ചി ഇട്ട ചായ. ട്രെയിൻ വരുന്നതിനു മുൻപ് കുടിച്ചോ.', 'Ithaa, inchi itta chaya. Train varunnathinu munpu kudicho.', 'Here, ginger tea. Drink it before the train comes.'],
      ['ഏത് ചായ വേണം?', 'Ethu chaya venam?', 'Which tea do you want?']),
    S('vada', ['പത്ത് രൂപ മോളേ. കൂടെ ഒരു ഉഴുന്നുവട വേണോ?', 'Pathu roopa mole. Koode oru uzhunnuvada veno?', 'Ten rupees, dear. Want an uzhunnu vada with it?'],
      'Say no thanks and pay ten rupees.', ['Venda chetta, ithaa pathu roopa.', 'വേണ്ട ചേട്ടാ, ഇതാ പത്ത് രൂപ.'],
      ['vada venda ithaa pathu roopa', 'pathu roopa ithaa chetta', 'venda chetta nanni', 'chaya mathi chetta', 'vada venda', 'വേണ്ട ചേട്ടാ'],
      'decline_vada_and_pay', ['Say no and pay.', '"Venda" = not needed.'],
      ['ശരി, നന്ദി. ട്രെയിൻ ഇപ്പൊ വരും.', 'Shari, nanni. Train ippo varum.', 'Okay, thanks. The train will come soon.'],
      ['വട വേണോ?', 'Vada veno?', 'Want a vada?']),
  ],
  outro: ['നല്ല യാത്ര, മോളേ!', 'Nalla yaathra, mole!', 'Safe journey, dear!'],
  learned: [['oru kadum chaya tharamo?', 'may I have a strong tea?'], ['venda chetta', 'no thanks']],
  again: ['ഒരു ചായ കൂടി പകരട്ടെ?', 'Oru chaya koodi pakaratte?', 'Shall I pour one more tea?'],
});

export const ladiesA = D('station-ladies-a', {
  name: 'Sreeja', role: 'women-coach commuter', site: 'Kochi Metro station platform edge, women coach marker', diff: 1,
  voice: { rate: 1.0, pitch: 1.2 },
  persona: 'Woman in a churidar with a metro card, waiting exactly where the women coach stops.',
  goal: 'Thank her and say you will stand there.',
  steps: [
    S('stand', ['ഇവിടെ നിൽക്കൂ, ഇവിടെയാ സ്ത്രീകളുടെ കോച്ച് നിൽക്കുന്നത്.', 'Ivide nilkkoo, ivideyaa sthreekalude coach nilkkunnathu.', 'Stand here, this is where the women coach stops.'],
      'Thank her and say you will stand there.', ['Nanni chechi, njaan ivide nilkkaam.', 'നന്ദി ചേച്ചി, ഞാൻ ഇവിടെ നിൽക്കാം.'],
      ['ivide nilkkaam chechi', 'nanni chechi', 'shari chechi ivide', 'okay chechi nilkkaam', 'thanks chechi njaan ivide', 'ഇവിടെ നിൽക്കാം ചേച്ചി'],
      'stand_at_ladies_marker', ['Thank her.', '"Nilkkaam" = I will stand.'],
      ['അതെ, ട്രെയിൻ വന്നാൽ തിരക്ക് കൂടും, കൈ പിടിച്ചോ.', 'Athe, train vannaal thirakku koodum, kai pidicho.', 'Yes, there will be a rush when the train comes, hold on.'],
      ['ഇവിടെ നിൽക്കുന്നോ?', 'Ivide nilkkunno?', 'Will you stand here?']),
  ],
  outro: ['ഇറങ്ങേണ്ടപ്പോൾ ഇറങ്ങാൻ മറക്കല്ലേ!', 'Irangendappol irangaan marakkalle!', 'Do not forget to get off when it is time!'],
  learned: [['njaan ivide nilkkaam', 'I will stand here']],
  again: ['ട്രെയിൻ വരാറായി.', 'Train varaaraayi.', 'The train is about to arrive.'],
});

export const stationElder = D('station-bench-elder', {
  name: 'Madhavan Master', role: 'elderly passenger', site: 'Kochi Metro station platform, bench', diff: 2,
  voice: { rate: 0.9, pitch: 0.8 },
  persona: 'Elderly retired master in a white mundu and cap, waiting on the bench for the next train.',
  goal: 'Ask him where he is going.',
  steps: [
    S('where', ['ഒരു കാലത്ത് ഇവിടെ റെയിൽവേ മാത്രമായിരുന്നു.', 'Oru kaalathu ivide railway maathramaayirunnu.', 'Once, only the railway used to be here.'],
      'Ask him where he is going.', ['Saare, evideykkaa pokunnathu?', 'സാറേ, എവിടേക്കാ പോകുന്നത്?'],
      ['evideykkaanu yaathra', 'evide pokunnu saare', 'ethra dooram pokunnu', 'saare evideykkaa', 'yaathra evideykkaanu', 'എവിടേക്കാ യാത്ര'],
      'ask_where_going', ['Ask his destination.', '"Evideykkaa?" = to where?'],
      ['ആലുവയിൽ മകളുടെ വീട്ടിലേക്ക്. ഓരോ ആഴ്ചയും.', 'Aaluvayil makalude veettilekku. Oro aazhchayum.', 'To my daughter\'s house in Aluva. Every week.'],
      ['എന്താ ചോദിച്ചത്?', 'Enthaa chodichathu?', 'What did you ask?']),
  ],
  outro: ['യാത്രകൾ മനസ്സിന് നല്ലതാ.', 'Yaathrakal manassinu nallathaa.', 'Travel is good for the mind.'],
  learned: [['evideykkaa pokunnathu?', 'where are you going?']],
  again: ['മെട്രോ വന്നാൽ പറയണേ.', 'Metro vannaal parayane.', 'Tell me when the metro comes.'],
});

export const stationOffice = D('station-commuter-2', {
  name: 'Rahul', role: 'office-goer', site: 'Kochi Metro station platform, near the timetable', diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Office-goer with a lanyard and wristwatch, checking his watch for the train.',
  goal: 'Reassure him that the train will come soon.',
  steps: [
    S('late', ['ഒൻപത് പന്ത്രണ്ടിന്റെ ട്രെയിൻ മിസ്സായാൽ ഓഫീസിൽ താമസിക്കും!', 'Onpathu panthrandinte train missaayaal officil thaamasikkum!', 'If I miss the nine-twelve train, I will be late to office!'],
      'Tell him the train will come soon, do not worry.', ['Train ippo varum, pedikkanda.', 'ട്രെയിൻ ഇപ്പൊ വരും, പേടിക്കണ്ട.'],
      ['train varum chetta', 'pedikkanda chetta', 'ippo varum', 'samayam undu chetta', 'vegam varum', 'ട്രെയിൻ ഉടൻ വരും'],
      'reassure_train_coming', ['Tell him not to worry.', '"Pedikkanda" = do not worry.'],
      ['ശരിയാ, അഞ്ച് മിനിറ്റ് കൂടി. നന്ദി!', 'Shariyaa, anchu minute koodi. Nanni!', 'True, five more minutes. Thanks!'],
      ['ഏ? വീണ്ടും പറയൂ.', 'Ae? Veendum parayoo.', 'Eh? Say again.']),
  ],
  outro: ['ഇന്ന് ലേറ്റാകില്ല എന്ന് തോന്നുന്നു.', 'Innu latakilla ennu thonnunnu.', 'I think I will not be late today.'],
  learned: [['pedikkanda', 'do not worry']],
  again: ['ട്രെയിൻ എത്തിയോ?', 'Train etthiyo?', 'Has the train arrived?'],
});

export const ticketClerk = D('station-ticket-clerk', {
  name: 'Jaya Chechi', role: 'ticket clerk', site: 'Kochi Metro station platform, ticket window', diff: 2,
  voice: { rate: 1.05, pitch: 1.1 },
  persona: 'Clerk with specs and a teal lanyard at the window, calling "next!" and issuing tokens.',
  goal: 'Ask for a ticket to Aluva and thank her.',
  steps: [
    S('ticket', ['അടുത്തത്! എവിടേക്കാണ് ടിക്കറ്റ്?', 'Adutthathu! Evidekkaanu ticket?', 'Next! Ticket to where?'],
      'Ask for a ticket to Aluva.', ['Oru Aluva ticket tharoo chechi.', 'ഒരു ആലുവ ടിക്കറ്റ് തരൂ ചേച്ചി.'],
      ['aluvaykku oru ticket', 'oru ticket aluva', 'aluva ticket venam', 'chechi oru aluva ticket', 'oru ticket tharamo aluva', 'ആലുവയ്ക്ക് ഒരു ടിക്കറ്റ്'],
      'ask_ticket_to_aluva', ['Ask for a ticket and name the place.', '"Oru ticket" = one ticket.'],
      ['ആലുവ... നാല്പത് രൂപ.', 'Aaluva... naalpathu roopa.', 'Aluva... forty rupees.'],
      ['എവിടേക്ക്?', 'Evidekku?', 'To where?']),
    S('thanks', ['ഇതാ ടോക്കൺ. തിരിച്ച് ഗേറ്റിൽ കാണിക്കണം.', 'Ithaa token. Thirichu gate-il kaanikkanam.', 'Here is the token. Show it at the gate.'],
      'Thank her.', ['Nanni chechi, valare upakaaram.', 'നന്ദി ചേച്ചി, വളരെ ഉപകാരം.'],
      ['nanni chechi', 'upakaaram chechi', 'thanks chechi', 'valare nanni chechi', 'shari chechi nanni', 'നന്ദി ചേച്ചി'],
      'thank_the_clerk', ['Say thanks.', '"Upakaaram" = helpful, thanks.'],
      ['ശരി, നല്ല യാത്ര.', 'Shari, nalla yaathra.', 'Okay, have a good journey.'],
      ['ടോക്കൺ എടുത്തോ?', 'Token eduthoo?', 'Did you take the token?']),
  ],
  outro: ['ആലുവ പുഴയിലെ ശിവരാത്രി മണപ്പുറം കാണണേ!', 'Aaluva puzhayile Shivarathri manappuram kaanane!', 'Do see the Shivarathri riverbank in Aluva!'],
  learned: [['oru Aluva ticket tharoo', 'give me a ticket to Aluva'], ['valare upakaaram', 'thanks, very helpful']],
  again: ['അടുത്തത്! ടിക്കറ്റ് വേണോ?', 'Adutthathu! Ticket veno?', 'Next! Do you want a ticket?'],
});

export const toll1 = D('toll-attendant', {
  name: 'Antony', role: 'checkpost attendant', site: 'Goshree bridge checkpost booth', diff: 2,
  voice: { rate: 1.0, pitch: 0.85 },
  persona: 'Man in an orange hi-vis shirt beside the barrier post, waving vehicles through.',
  goal: 'Ask which bridge this is.',
  steps: [
    S('bridge', ['വണ്ടികൾ വരുന്നു, ഒതുങ്ങി നിൽക്കൂ.', 'Vandikal varunnu, othungi nilkkoo.', 'Vehicles are coming, step aside.'],
      'Ask which bridge this is.', ['Ithu ethu paalamaanu chetta?', 'ഇത് ഏത് പാലമാണ് ചേട്ടാ?'],
      ['ee paalam ethaanu', 'ithu ethu paalam', 'paalathinte peru enthaa', 'ee paalathinte peru', 'chetta ithu ethu paalam', 'ഇത് ഏത് പാലം'],
      'ask_bridge_name', ['Ask the bridge name.', '"Paalam" = bridge.'],
      ['ഗോശ്രീ പാലം! ദ്വീപുകളെ കരയുമായി ബന്ധിപ്പിക്കുന്നു.', 'Goshree paalam! Dweepukale karayumaayi bandhippikkunnu.', 'Goshree bridge! It joins the islands to the mainland.'],
      ['ഏത് പാലമെന്നാണോ?', 'Ethu paalamennaano?', 'Which bridge, you mean?']),
  ],
  outro: ['ഇവിടെ നിന്ന് ചെറായി ബീച്ചിലേക്ക് പോകാം.', 'Ivide ninnu Cherai beachilekku pokaam.', 'You can go to Cherai beach from here.'],
  learned: [['ithu ethu paalam?', 'which bridge is this?']],
  again: ['വണ്ടികൾ നിരന്നു, ഒതുങ്ങൂ.', 'Vandikal nirannu, othungoo.', 'Vehicles are lined up, step aside.'],
});

export const toll2 = D('toll-collector', {
  name: 'Chacko', role: 'checkpost guard', site: 'Goshree bridge checkpost, in the booth', diff: 2,
  voice: { rate: 0.95, pitch: 0.8 },
  persona: 'Grey-haired guard with a torch and a towel on his shoulder, standing in the booth.',
  goal: 'Ask if you may walk across the bridge.',
  steps: [
    S('walk', ['കാറുകൾ ഇടത്തേക്ക്, ബസുകൾ വലത്തേക്ക്!', 'Kaarukal idatthekku, busukal valatthekku!', 'Cars to the left, buses to the right!'],
      'Ask if you may walk across the bridge.', ['Paalam nadannu kadakkaamo?', 'പാലം നടന്ന് കടക്കാമോ?'],
      ['nadannu pokaamo chetta', 'paalathil nadakkaamo', 'nadannu kadakkaan pattumo', 'saare nadannu pokaamo', 'paalam nadakkaamo', 'പാലത്തിലൂടെ നടക്കാമോ'],
      'ask_to_walk_bridge', ['Ask permission to walk.', '"Nadannu" = on foot.'],
      ['നടക്കാം, വശത്തുകൂടി. വാഹനങ്ങൾ സൂക്ഷിക്കണം.', 'Nadakkaam, vashathukoodi. Vaahanangal sookshikkanam.', 'You can walk, along the side. Watch the vehicles.'],
      ['നടക്കാനാണോ?', 'Nadakkaanaano?', 'To walk, is it?']),
  ],
  outro: ['കായലിലെ കാറ്റ് ആസ്വദിക്കൂ!', 'Kaayalile kaattu aaswadikkoo!', 'Enjoy the breeze off the backwater!'],
  learned: [['paalam nadannu kadakkaamo?', 'may I walk across the bridge?']],
  again: ['സൂക്ഷിച്ച് നടക്കൂ.', 'Sookshichu nadakkoo.', 'Walk carefully.'],
});

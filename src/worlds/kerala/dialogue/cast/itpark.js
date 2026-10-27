// Infopark: the second gate guard, the gardener, the call-taxi line, the delivery bay and the lane outside.
import { dialogue as D, step as S } from '../kit.js';

export const gateWatchman = D('antilia-gate-watchman', {
  name: 'Sukumaran', role: 'second gate guard', site: 'Infopark gate', diff: 2,
  voice: { rate: 1.0, pitch: 0.8 },
  persona: 'Guard in a khaki uniform with a torch, waving at passers-by and keeping an eye on the cabs.',
  goal: 'Ask what the tall glass building is.',
  steps: [
    S('tower', ['ഒതുങ്ങി നിൽക്കൂ, ക്യാബ് വരുന്നുണ്ട്.', 'Othungi nilkkoo, cab varunnundu.', 'Step aside, a cab is coming.'],
      'Ask what the tall glass building is.', ['Aa valiya building enthaanu saare?', 'ആ വലിയ ബിൽഡിംഗ് എന്താണ് സാറേ?'],
      ['aa kettidam enthaa', 'ee tower enthaanu', 'aa building ethaanu', 'saare aa tower', 'ithu enthu sthalam', 'ആ കെട്ടിടം എന്താ'],
      'ask_what_building', ['Ask about the building.', '"Valiya" = big.'],
      ['അത് ഇൻഫോപാർക്ക്. ഐടി കമ്പനികൾ ഒരുപാടുണ്ട്.', 'Athu Infopark. IT companykal orupaadundu.', 'That is Infopark. Many IT companies are there.'],
      ['ഏത് കെട്ടിടം?', 'Ethu kettidam?', 'Which building?']),
  ],
  outro: ['ഇവിടെ ജോലി തേടി ഒരുപാട് പേർ വരുന്നു.', 'Ivide joli thedi orupaadu per varunnu.', 'Many people come here looking for jobs.'],
  learned: [['aa valiya building enthaanu?', 'what is that big building?']],
  again: ['ക്യാബ് വരുന്നു, വഴി തരൂ.', 'Cab varunnu, vazhi tharoo.', 'A cab is coming, give way.'],
});

export const gardener = D('antilia-mali', {
  name: 'Lalitha', role: 'campus gardener', site: 'Infopark garden', diff: 1,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Woman in a teal saree with a broom, sweeping fallen leaves from the garden path.',
  goal: 'Praise the garden.',
  steps: [
    S('garden', ['ഈ ചെടികൾ ഞാൻ വളർത്തിയതാ.', 'Ee chedikal njaan valarthiyathaa.', 'I grew these plants.'],
      'Praise the garden.', ['Thottam valare bhangiyundu chechi.', 'തോട്ടം വളരെ ഭംഗിയുണ്ട് ചേച്ചി.'],
      ['chedikal nannaayittundu', 'thottam super aanu', 'nalla thottam chechi', 'bhangiyundu chechi', 'chedikal bhangiyaanu', 'തോട്ടം ഭംഗിയുണ്ട്'],
      'praise_the_garden', ['Say the garden is lovely.', '"Thottam" = garden.'],
      ['ഹൊ, സന്തോഷം! ദിവസവും വെള്ളമൊഴിക്കും.', 'Ho, santhosham! Divasavum vellamozhikkum.', 'Oh, happy to hear! I water them daily.'],
      ['ഏത് ചെടി?', 'Ethu chedi?', 'Which plant?']),
  ],
  outro: ['ഐടി കെട്ടിടങ്ങൾക്കിടയിൽ പച്ചപ്പ് വേണ്ടേ?', 'IT kettidangalkkidayil pachappu vende?', 'Do we not need greenery between IT buildings?'],
  learned: [['thottam bhangiyundu', 'the garden is beautiful']],
  again: ['ഇല വീണ്ടും വീണു!', 'Ila veendum veenu!', 'The leaves fell again!'],
});

export const cabDriver = D('antilia-chauffeur', {
  name: 'Faisal', role: 'cab driver', site: 'Infopark, beside the white call taxis', diff: 2,
  voice: { rate: 1.05, pitch: 0.9 },
  persona: 'Cab driver in a white shirt and cap who waves at passers-by while waiting beside his white cab.',
  goal: 'Ask the cab fare to Fort Kochi, then decide to take the bus.',
  steps: [
    S('fare', ['മാഡം, ക്യാബ് വേണോ? എവിടേക്കാ?', 'Madam, cab veno? Evidekkaa?', 'Madam, need a cab? To where?'],
      'Ask the fare to Fort Kochi.', ['Fort Kochiyilekku ethra aakum?', 'ഫോർട്ട് കൊച്ചിയിലേക്ക് എത്ര ആകും?'],
      ['fort kochi ethra roopa', 'fort kochi fare ethra', 'chetta fort kochi ethra', 'kochiyilekku ethra aakum', 'fort kochi pokaan ethra', 'ഫോർട്ട് കൊച്ചി എത്ര'],
      'ask_cab_fare', ['Ask how much to Fort Kochi.', '"Ethra aakum?" = how much will it be?'],
      ['എ സി ഇട്ട് ഇരുനൂറ്റമ്പത് രൂപ.', 'AC ittu irunootti ambathu roopa.', 'With AC, two hundred and fifty rupees.'],
      ['എവിടേക്കെന്ന് പറഞ്ഞില്ല.', 'Evidekkennu paranjilla.', 'You did not say where to.']),
    S('bus', ['ബസിൽ പോകുന്നതാ വിലക്കുറവ്. ക്യാബ് വേണോ?', 'Basil pokunnathaa vilakkuravu. Cab veno?', 'The bus is cheaper. Do you want the cab?'],
      'Say you will take the bus, thanks.', ['Njaan bus-il pokaam, nanni.', 'ഞാൻ ബസിൽ പോകാം, നന്ദി.'],
      ['bus-il pokaam chetta', 'bus mathi chetta', 'cab venda nanni', 'njaan bus edukkaam', 'nanni bus pokaam', 'ബസ് മതി ചേട്ടാ'],
      'choose_the_bus', ['Say you prefer the bus.', '"Bus-il pokaam" = I will go by bus.'],
      ['ശരി മാഡം, ബസ് സ്റ്റോപ്പ് ആ വശത്ത്.', 'Shari madam, bus stop aa vashathu.', 'Okay madam, the bus stop is on that side.'],
      ['ബസോ ക്യാബോ?', 'Basoo caboo?', 'Bus or cab?']),
  ],
  outro: ['വീണ്ടും വരുമ്പോൾ എന്നെ വിളിച്ചോ.', 'Veendum varumbol enne vilicho.', 'Call me when you come again.'],
  learned: [['Fort Kochiyilekku ethra aakum?', 'how much to Fort Kochi?'], ['njaan bus-il pokaam', 'I will go by bus']],
  again: ['ക്യാബ് റെഡിയാണ് മാഡം.', 'Cab readyaanu madam.', 'The cab is ready, madam.'],
});

export const deliveryBoy = D('antilia-delivery-boy', {
  name: 'Akhil', role: 'delivery boy', site: 'Infopark, outside the gate', diff: 2,
  voice: { rate: 1.15, pitch: 1.1 },
  persona: 'Delivery boy in an orange shirt idling by the gate with his bag and phone, waiting to be let in.',
  goal: 'Wish him luck with the delivery.',
  steps: [
    S('luck', ['ഗേറ്റ് തുറക്കാൻ കാത്തിരിക്കുകയാ, ഓർഡർ ലേറ്റാ!', 'Gate thurakkaan kaathirikkukayaa, order latea!', 'Waiting for the gate to open, the order is late!'],
      'Wish him a quick delivery.', ['Vegam delivery cheyyaan pattatte.', 'വേഗം ഡെലിവറി ചെയ്യാൻ പറ്റട്ടെ.'],
      ['all the best mone', 'vegam pokaan pattatte', 'delivery nannaayi nadakkatte', 'sookshichu pokoo', 'nannaayi varatte', 'വേഗം പോകാൻ പറ്റട്ടെ'],
      'wish_quick_delivery', ['Wish him well.', '"Vegam" = quickly.'],
      ['താങ്ക്യൂ ചേച്ചീ! ഇന്ന് ടിപ്പ് കിട്ടിയാൽ ചായ വാങ്ങിത്തരാം.', 'Thankyou chechee! Innu tip kittiyaal chaya vaangittharaam.', 'Thank you chechi! If I get a tip today, I will buy you tea.'],
      ['ഏ? കേട്ടില്ല.', 'Ae? Kettilla.', 'Eh? I did not hear.']),
  ],
  outro: ['ഗേറ്റ് തുറന്നു, ഞാൻ ഓടി!', 'Gate thurannu, njaan odi!', 'The gate opened, I am off!'],
  learned: [['vegam delivery cheyyaan pattatte', 'may the delivery go quickly']],
  again: ['ഓർഡർ വൈകുന്നു ചേച്ചീ!', 'Order vaikunnu chechee!', 'The order is getting late, chechi!'],
});

export const laneWalker = D('antilia-lane-walker', {
  name: 'Mathai Chettan', role: 'elderly morning walker', site: 'Lane near Infopark', diff: 2,
  voice: { rate: 0.9, pitch: 0.85 },
  persona: 'Elderly man in white shoes reading the newspaper as he strolls.',
  goal: 'Ask if he walks here every morning.',
  steps: [
    S('walk', ['പത്രം വായിച്ചുകൊണ്ട് നടക്കുന്നത് എന്റെ ശീലമാ.', 'Pathram vaayichukondu nadakkunnathu ente sheelamaa.', 'Walking while reading the paper is my habit.'],
      'Ask if he walks here every morning.', ['Ningal ellaa raavilum ivide nadakkumo?', 'നിങ്ങൾ എല്ലാ രാവിലെയും ഇവിടെ നടക്കുമോ?'],
      ['ellaa divasavum nadakkumo', 'daily ivide nadakkumo', 'raavile nadakkal undo', 'ningal daily nadakkumo', 'ellaa raavilum nadakkumo chetta', 'എല്ലാ ദിവസവും നടക്കുമോ'],
      'ask_daily_walk', ['Ask if it is daily.', '"Ellaa raavilum" = every morning.'],
      ['പത്ത് വർഷമായി. ആരോഗ്യത്തിന് അതാ നല്ലത്.', 'Pathu varshamaayi. Aarogyathinu athaa nallathu.', 'For ten years. It is the best thing for health.'],
      ['എപ്പോഴാ നടക്കുന്നതെന്ന് ചോദിച്ചോ?', 'Eppozhaa nadakkunnathennu chodicho?', 'Did you ask when I walk?']),
  ],
  outro: ['ഒരു ദിവസം നമ്മൾ ഒരുമിച്ച് നടക്കാം.', 'Oru divasam nammal orumichu nadakkaam.', 'One day we can walk together.'],
  learned: [['ellaa raavilum nadakkumo?', 'do you walk every morning?']],
  again: ['പത്രം ഇനിയും ബാക്കിയുണ്ട്.', 'Pathram iniyum baakkiyundu.', 'There is still more of the paper.'],
});

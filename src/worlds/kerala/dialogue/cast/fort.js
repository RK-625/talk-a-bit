// Fort Kochi by the Chinese nets: the water-metro booth and jetty, the pigeon-feeding mat, the bus stop, the footpath; Mattancherry Palace gate.
import { dialogue as D, step as S } from '../kit.js';

export const ferryClerk = D('gateway-ferry-clerk', {
  name: 'Ratheesh', role: 'water-metro ticket clerk', site: 'Fort Kochi, water-metro ticket booth', diff: 2,
  voice: { rate: 1.1, pitch: 0.9 },
  persona: 'Thin clerk behind the booth window, tearing tickets and announcing the next boat.',
  goal: 'Buy a ticket to Vypin and ask when the boat comes.',
  steps: [
    S('ticket', ['അടുത്ത ബോട്ട് പത്ത് മിനിറ്റിൽ. ടിക്കറ്റ് വേണോ?', 'Adutha boat pathu minuttil. Ticket veno?', 'The next boat is in ten minutes. Want a ticket?'],
      'Ask for one ticket to Vypin island.', ['Oru Vypin ticket tharoo chetta.', 'ഒരു വൈപ്പിൻ ടിക്കറ്റ് തരൂ ചേട്ടാ.'],
      ['vypinilekku oru ticket', 'oru ticket vypin', 'vypin ticket venam', 'chetta oru vypin ticket', 'vypin boat ticket tharamo', 'വൈപ്പിനിലേക്ക് ഒരു ടിക്കറ്റ്'],
      'buy_vypin_ticket', ['Ask for a ticket and name the island.', '"Oru ticket" = one ticket.'],
      ['വൈപ്പിൻ, മുപ്പത് രൂപ. ഇതാ ടിക്കറ്റ്.', 'Vypin, muppathu roopa. Ithaa ticket.', 'Vypin, thirty rupees. Here is the ticket.'],
      ['എവിടേക്കാ ടിക്കറ്റ്?', 'Evidekkaa ticket?', 'Ticket to where?']),
    S('when', ['ബോട്ട് ആ ജെട്ടിയിൽ വരും. വരിയിൽ നിൽക്കൂ.', 'Boat aa jettiyil varum. Variyil nilkkoo.', 'The boat will come at that jetty. Stand in the line.'],
      'Ask when the boat comes.', ['Boat eppol varum chetta?', 'ബോട്ട് എപ്പോൾ വരും ചേട്ടാ?'],
      ['boat eppozhaa varunnathu', 'ethra neram kaathirikkanam', 'boat varaan ethra minute', 'adutha boat eppol', 'chetta boat eppol', 'ബോട്ട് എപ്പോൾ വരും'],
      'ask_when_boat_comes', ['Ask about the boat time.', '"Eppol varum?" = when will it come?'],
      ['ദാ വരുന്നു! ബോട്ട് കണ്ടോ?', 'Daa varunnu! Boat kando?', 'Here it comes! Can you see the boat?'],
      ['ബോട്ടിനെ പറ്റിയാണോ?', 'Boatine pattiyaano?', 'About the boat?']),
  ],
  outro: ['കായലിലൂടെ പോകുമ്പോൾ ചൈനീസ് വല ഒന്നുകൂടി നോക്കണേ!', 'Kaayalilude pokumbol Chineese vala onnukoodi nokkane!', 'As you cross the backwater, look at the Chinese nets once more!'],
  learned: [['oru Vypin ticket tharoo', 'give me a ticket to Vypin'], ['boat eppol varum?', 'when will the boat come?']],
  again: ['ബോട്ട് ഇപ്പൊ വരും, ടിക്കറ്റ് എടുത്തോ?', 'Boat ippo varum, ticket eduthoo?', 'The boat is coming, did you take a ticket?'],
});

export const palaceDoorman = D('taj-doorman', {
  name: 'Rajan Chettan', role: 'palace gate attendant', site: 'Mattancherry (Dutch) Palace entrance', diff: 3,
  voice: { rate: 0.95, pitch: 0.85 },
  persona: 'Tall man in a gold-bordered mundu who greets visitors with a little bow, asks them to take off their shoes and points to the ticket window.',
  goal: 'Ask what there is to see inside, and agree not to take photos.',
  steps: [
    S('inside', ['ചെരുപ്പ് ഇവിടെ അഴിച്ചോളൂ. ടിക്കറ്റ് ആ ജനലിൽ.', 'Cheruppu ivide azhichholoo. Ticket aa janalil.', 'Take off your sandals here. Tickets are at that window.'],
      'Ask what there is to see inside.', ['Kottaarathinullil enthaanu kaanaan?', 'കൊട്ടാരത്തിനുള്ളിൽ എന്താണ് കാണാൻ?'],
      ['ullil enthundu', 'palace-il enthaa kaanaan', 'kottaaram ullil enthaa', 'ullil enthaanu chetta', 'enthokke kaanaam', 'അകത്ത് എന്താണ്'],
      'ask_what_inside_palace', ['Ask what is inside.', '"Ullil" = inside.'],
      ['പഴയ ചുവർചിത്രങ്ങൾ! രാമായണ കഥകളുണ്ട്.', 'Pazhaya chuvarchithrangal! Ramayana kathakalundu.', 'Old mural paintings! They tell Ramayana stories.'],
      ['അകത്തെ കാര്യമാണോ?', 'Akatthe kaaryamaano?', 'About the inside?']),
    S('photo', ['ഫോട്ടോ എടുക്കരുത്, ചുവർചിത്രങ്ങൾ മങ്ങും.', 'Photo edukkaruthu, chuvarchithrangal mangum.', 'No photos, the murals will fade.'],
      'Say okay, you will not take photos.', ['Shari, photo edukkilla.', 'ശരി, ഫോട്ടോ എടുക്കില്ല.'],
      ['photo edukkilla chetta', 'okay photo venda', 'njaan edukkilla', 'shari chetta', 'photo edukkilla saare', 'ഫോട്ടോ എടുക്കില്ല'],
      'agree_no_photos', ['Agree politely.', '"Edukkilla" = I will not take.'],
      ['നല്ല കുട്ടി. ഇനി അകത്തേക്ക് പൊയ്ക്കോളൂ.', 'Nalla kutti. Ini akattekku poykkoloo.', 'Good girl. Now go inside.'],
      ['ഫോട്ടോ എടുക്കുമോ ഇല്ലയോ?', 'Photo edukkumo illayo?', 'Will you take photos or not?']),
  ],
  outro: ['പുറത്തിറങ്ങുമ്പോൾ ജൂത തെരുവും കാണണം.', 'Purathirangumbol Jootha theruvum kaananam.', 'When you come out, see Jew Town too.'],
  learned: [['kottaarathinullil enthaanu kaanaan?', 'what is there to see inside the palace?'], ['photo edukkilla', 'I will not take photos']],
  again: ['ചെരുപ്പ് അഴിച്ചോ മോളേ?', 'Cheruppu azhichho mole?', 'Did you take off your sandals, dear?'],
});

export const palaceBellboy = D('taj-bellboy', {
  name: 'Rajeev', role: 'palace guide', site: 'Mattancherry Palace entrance', diff: 2,
  voice: { rate: 1.0, pitch: 0.95 },
  persona: 'Guide in a cream shirt and gold-bordered mundu, waiting to show visitors the murals with a little bow.',
  goal: 'Say yes to the guided tour of the murals.',
  steps: [
    S('tour', ['ചുവർചിത്രങ്ങൾ കാണിച്ചു തരട്ടെ? ഞാൻ ഗൈഡാണ്.', 'Chuvarchithrangal kaanichu tharatte? Njaan guideaanu.', 'Shall I show you the murals? I am a guide.'],
      'Say yes, please show them.', ['Athe chetta, kaanichu tharoo.', 'അതെ ചേട്ടാ, കാണിച്ചു തരൂ.'],
      ['kaanichu tharamo chetta', 'venam chetta', 'athe kaanikkoo', 'murals kaananam', 'chetta kaanichu tharoo', 'കാണിച്ചു തരൂ ചേട്ടാ'],
      'accept_guided_tour', ['Say yes.', '"Kaanichu tharoo" = please show me.'],
      ['വരൂ, ആദ്യം പള്ളിയറ കാണാം.', 'Varoo, aadyam palliyara kaanaam.', 'Come, first the royal bedchamber.'],
      ['ഗൈഡ് വേണോ?', 'Guide veno?', 'Do you want a guide?']),
  ],
  outro: ['ഓരോ ചിത്രത്തിനും ഒരു കഥയുണ്ട്.', 'Oro chithrathinum oru kathayundu.', 'Every painting has a story.'],
  learned: [['kaanichu tharoo', 'please show me']],
  again: ['ചിത്രങ്ങൾ കാണാൻ വരൂ.', 'Chithrangal kaanaan varoo.', 'Come and see the paintings.'],
});

export const touristA = D('gateway-tourist-a', {
  name: 'Lucy', role: 'foreign tourist', site: 'Fort Kochi, by the old tree near the Chinese nets', diff: 4, lang: 'en',
  voice: { rate: 1.0, pitch: 1.2 },
  persona: 'Tourist in a pink floral shirt and white cap, photographing the nets and the sunset. Speaks only English.',
  goal: 'Recommend a sunset spot and tell her it is safe after dark.',
  steps: [
    S('spot', 'Excuse me, where is the best place to watch the sunset?',
      'Suggest the beach next to the Chinese nets.', ['Try the beach next to the Chinese nets.', 'Try the beach next to the Chinese nets.'],
      ['try the beach near the chinese nets', 'the beach by the chinese nets is best', 'go to the beach next to the nets', 'the nets at the beach are lovely at sunset', 'i suggest the beach near the chinese nets', 'you can watch it from the beach by the nets'],
      'recommend_sunset_spot', ['Name a place for the sunset.', 'Say: the beach next to the nets.'],
      'Brilliant, I will go there tonight!', 'Sorry, where did you say I should watch it?'),
    S('safe', 'Is it safe to walk there after dark?',
      'Say yes, it is safe and busy.', ['Yes, it is safe and there are many people.', 'Yes, it is safe and there are many people.'],
      ['yes it is safe and there are many people', 'yes it is safe and busy', 'it is safe there are lots of people around', 'yes there is always a crowd so it is safe', 'it is safe and full of people', 'yes safe and many people there'],
      'say_it_is_safe', ['Reassure her.', 'Say: safe, and many people.'],
      'Lovely, that is good to know.', 'Sorry, is it safe or not?'),
  ],
  outro: 'Thanks a lot, enjoy your trip!',
  learned: [['try the beach next to the nets', 'recommending a sunset spot'], ['it is safe', 'reassuring a traveller']],
  again: 'Hello again, I forgot something!',
});

export const touristB = D('gateway-tourist-b', {
  name: 'Daniel', role: 'foreign tourist', site: 'Fort Kochi, by the old tree near the Chinese nets', diff: 4, lang: 'en',
  voice: { rate: 1.0, pitch: 0.9 },
  persona: 'Tourist in a sky-blue striped shirt and a red cap, taking photos and wanting directions to a boat ride. Speaks only English.',
  goal: 'Point him to the ferry booth and tell him roughly what a ticket costs.',
  steps: [
    S('way', 'Hello! Which way is the ferry to Vypin island?',
      'Tell him to go straight to the booth on the left.', ['Go straight, the booth is on the left.', 'Go straight, the booth is on the left.'],
      ['go straight the booth is on the left', 'straight ahead and the booth is on your left', 'walk straight and you will see the booth on the left', 'the ferry booth is straight on the left', 'just go straight the ticket booth is on the left', 'keep going straight it is on the left'],
      'direct_to_ferry_booth', ['Give directions.', 'Say: straight, then the booth on the left.'],
      'Great, thank you!', 'Sorry, which way did you say?'),
    S('cost', 'And roughly how much is a ticket?',
      'Tell him it is about thirty rupees.', ['It is about thirty rupees.', 'It is about thirty rupees.'],
      ['it is about thirty rupees', 'around thirty rupees', 'thirty rupees i think', 'roughly thirty rupees', 'it costs about thirty rupees', 'about thirty rupees only'],
      'tell_ticket_cost', ['Say a price.', 'Say: about thirty rupees.'],
      'That is cheap, wonderful!', 'Sorry, how much was it?'),
  ],
  outro: 'Cheers, see you on the water!',
  learned: [['go straight, the booth is on the left', 'giving directions'], ['about thirty rupees', 'a rough price']],
  again: 'Hi again, is that the right way?',
});

export const danaSeller = D('gateway-dana-seller', {
  name: 'Ammini', role: 'bird-feed seller', site: 'Fort Kochi, crow and pigeon feeding mat', diff: 1,
  voice: { rate: 1.1, pitch: 1.2 },
  persona: 'Woman in a teal saree with a small bag, calling out so that tourists feed the pigeons.',
  goal: 'Buy a packet of bird feed.',
  steps: [
    S('feed', ['പ്രാവുകൾക്ക് തീറ്റ കൊടുക്കൂ! പത്ത് രൂപ!', 'Praavukalkku theetta kodukkoo! Pathu roopa!', 'Feed the pigeons! Ten rupees!'],
      'Buy a packet of bird feed.', ['Oru packet theetta tharoo chechi.', 'ഒരു പാക്കറ്റ് തീറ്റ തരൂ ചേച്ചി.'],
      ['theetta venam chechi', 'oru packet theetta', 'praavinu theetta tharoo', 'chechi oru packet', 'theetta tharamo', 'ഒരു പാക്കറ്റ് തീറ്റ വേണം'],
      'buy_bird_feed', ['Ask for the feed.', '"Theetta" = feed.'],
      ['ഇതാ, ചിതറിയിട്ടാൽ പ്രാവുകൾ ഓടി വരും.', 'Ithaa, chitharittaal praavukal odi varum.', 'Here, scatter it and the pigeons will rush over.'],
      ['തീറ്റ വേണോ?', 'Theetta veno?', 'Want some feed?']),
  ],
  outro: ['ഇനി പ്രാവുകൾ നിന്റെ കൂട്ടുകാർ!', 'Ini praavukal ninte koottukaar!', 'Now the pigeons are your friends!'],
  learned: [['oru packet theetta tharoo', 'give me a packet of feed']],
  again: ['പ്രാവുകൾ കാത്തിരിക്കുന്നു!', 'Praavukal kaathirikkunnu!', 'The pigeons are waiting!'],
});

export const boatman = D('gateway-boatman', {
  name: 'Kunjappan', role: 'boatman', site: 'Fort Kochi, boat jetty edge', diff: 3,
  voice: { rate: 1.05, pitch: 0.85 },
  persona: 'Boatman in a folded mundu with a towel, waving to tourists and offering rides to the backwaters.',
  goal: 'Ask the price of a boat ride and say you will come tomorrow morning.',
  steps: [
    S('price', ['ബോട്ട് സവാരി വേണോ? കായലിലൂടെ ഒരു ചുറ്റൽ!', 'Boat savaari veno? Kaayalilude oru chuttal!', 'Want a boat ride? A round on the backwater!'],
      'Ask how much a boat ride costs.', ['Boat savaarikku ethra roopa?', 'ബോട്ട് സവാരിക്ക് എത്ര രൂപ?'],
      ['savaari ethra roopa', 'boat ride ethrayaa', 'chetta boat ethra', 'oru round ethra roopa', 'boatinu ethra aakum', 'ബോട്ട് സവാരി എത്ര'],
      'ask_boat_ride_price', ['Ask the price.', '"Savaari" = ride.'],
      ['ഒരാൾക്ക് നൂറ് രൂപ, അര മണിക്കൂർ.', 'Oraalkku nooru roopa, ara manikkoor.', 'A hundred rupees per person, half an hour.'],
      ['സവാരി വേണോ?', 'Savaari veno?', 'Want a ride?']),
    S('tomorrow', ['കായലിൽ പൊന്മാനെയും കാണാം. പോരുന്നോ?', 'Kaayalil ponmaaneyum kaanaam. Porunno?', 'You can see kingfishers on the backwater. Coming?'],
      'Say you will come tomorrow morning.', ['Naale raavile varaam chetta.', 'നാളെ രാവിലെ വരാം ചേട്ടാ.'],
      ['naale varaam', 'naale raavile pokaam', 'innu venda naale varaam', 'naale vannaal mathiyo', 'naale morning varaam', 'നാളെ വരാം'],
      'plan_tomorrow_morning', ['Say you will come tomorrow.', '"Naale" = tomorrow.'],
      ['ശരി, ആറ് മണിക്ക് വന്നോ, അപ്പോൾ നല്ല വെളിച്ചമാ.', 'Shari, aaru manikku vanno, appol nalla velichamaa.', 'Okay, come at six, the light is lovely then.'],
      ['ഇന്നാണോ നാളെയാണോ?', 'Innaano naaleyaano?', 'Today or tomorrow?']),
  ],
  outro: ['കായൽ കാണാൻ പോയാൽ തിരിച്ച് വരാൻ തോന്നില്ല!', 'Kaayal kaanaan poyaal thirichu varaan thonnilla!', 'Once you see the backwater, you will not want to return!'],
  learned: [['boat savaarikku ethra roopa?', 'how much for a boat ride?'], ['naale raavile varaam', 'I will come tomorrow morning']],
  again: ['ബോട്ട് റെഡിയാണ്, പോരുന്നോ?', 'Boat readyaanu, porunno?', 'The boat is ready, coming?'],
});

export const busWaiter1 = D('fort-bus-waiter-1', {
  name: 'Anitha', role: 'woman waiting for a bus', site: 'Fort Kochi bus stop by the Chinese nets', diff: 1,
  voice: { rate: 1.0, pitch: 1.15 },
  persona: 'Woman in a lilac churidar top with a black umbrella, glancing down the road for the Ernakulam bus.',
  goal: 'Say you are also waiting for the bus.',
  steps: [
    S('wait', ['എറണാകുളം ബസ് ഇതുവരെ വന്നില്ല.', 'Ernakulam bus ithuvare vannilla.', 'The Ernakulam bus has not come yet.'],
      'Say you are also waiting for the bus.', ['Njaanum bus-inu vendi kaathirikkunnu.', 'ഞാനും ബസിനു വേണ്ടി കാത്തിരിക്കുന്നു.'],
      ['njaanum kaathirikkunnu', 'enikkum bus venam', 'njaanum bus nokkunnu', 'njaanum ernakulam bus nokkunnu', 'enikkum athe bus', 'ഞാനും കാത്തിരിക്കുന്നു'],
      'say_also_waiting', ['Say you are waiting too.', '"Njaanum" = me too.'],
      ['എങ്കിൽ ഒരുമിച്ച് കയറാം. ഇതാണ് ബസ് സ്റ്റോപ്പ്.', 'Enkil orumichu kayaraam. Ithaanu bus stop.', 'Then let us board together. This is the bus stop.'],
      ['ബസ് കാത്തിരിക്കുന്നോ?', 'Bus kaathirikkunno?', 'Are you waiting for the bus?']),
  ],
  outro: ['ബസ് വന്നാൽ ഓടി കയറണം, നിർത്തില്ല!', 'Bus vannaal odi kayaranam, nirtthilla!', 'When the bus comes, run and board, it does not wait!'],
  learned: [['njaanum kaathirikkunnu', 'I am waiting too']],
  again: ['ബസ് വരുന്നുണ്ടോ നോക്കൂ.', 'Bus varunnundo nokkoo.', 'See if the bus is coming.'],
});

export const busWaiter2 = D('fort-bus-waiter-2', {
  name: 'Nikhil', role: 'young man waiting for a bus', site: 'Fort Kochi bus stop by the Chinese nets', diff: 2,
  voice: { rate: 1.1, pitch: 0.95 },
  persona: 'Young man in a pink tee texting on his phone while waiting for the bus.',
  goal: 'Ask which bus goes to Cherai beach.',
  steps: [
    S('bus', ['ഒരു മെസ്സേജ് അയക്കട്ടെ, ബസ് വരട്ടെ.', 'Oru message ayakkatte, bus varatte.', 'Let me send a message while the bus comes.'],
      'Ask which bus goes to Cherai beach.', ['Beachilekku ethu bus aanu pokunnathu?', 'ബീച്ചിലേക്ക് ഏത് ബസാണ് പോകുന്നത്?'],
      ['beach bus ethaanu', 'cherai bus ethaa', 'beachilekku bus undo', 'ethu bus beachil pokum', 'chetta beach bus ethaa', 'ബീച്ച് ബസ് ഏതാ'],
      'ask_bus_to_beach', ['Ask about the beach bus.', '"Ethu bus?" = which bus?'],
      ['ചെറായി ബീച്ചിലേക്ക് നീല ബസ്, നാനൂറ്റി പത്ത്.', 'Cherai beachilekku neela bus, naanootti pathu.', 'The blue bus, four-ten, goes to Cherai beach.'],
      ['ഏത് ബീച്ചാ?', 'Ethu beachaa?', 'Which beach?']),
  ],
  outro: ['ചെറായിയിൽ സൂര്യാസ്തമയം കാണാൻ മറക്കല്ലേ.', 'Cherayil sooryaasthamayam kaanaan marakkalle.', 'Do not forget to see the sunset at Cherai.'],
  learned: [['beachilekku ethu bus?', 'which bus goes to the beach?']],
  again: ['ബസ് വന്നോ എന്ന് നോക്കട്ടെ.', 'Bus vannoo ennu nokkatte.', 'Let me see if the bus has come.'],
});

export const riderWalker = D('fort-dabbawala-walker', {
  name: 'Dileep', role: 'delivery rider on his round', site: 'Fort Kochi footpath by the Chinese nets', diff: 2,
  voice: { rate: 1.2, pitch: 0.95 },
  persona: 'Rider in an orange T-shirt and cap with an insulated bag, walking his round at a brisk pace.',
  goal: 'Tell him to be careful on the road.',
  steps: [
    S('careful', ['വേഗം, ഓർഡർ തണുക്കും!', 'Vegam, order thanukkum!', 'Quick, the order will go cold!'],
      'Tell him to be careful on the road.', ['Road sookshichu pokoo chetta.', 'റോഡ് സൂക്ഷിച്ച് പോകൂ ചേട്ടാ.'],
      ['sookshichu pokoo chetta', 'vegam kurakkoo chetta', 'road nokki pokoo', 'ottum vegam venda chetta', 'sookshikkane chetta', 'സൂക്ഷിച്ച് പോകൂ ചേട്ടാ'],
      'tell_him_be_careful', ['Tell him to take care.', '"Sookshichu" = carefully.'],
      ['ശരി ചേച്ചി, സൂക്ഷിക്കാം. പിന്നെ കാണാം!', 'Shari chechi, sookshikkaam. Pinne kaanaam!', 'Okay chechi, I will be careful. See you later!'],
      ['ഏ? ഓടട്ടെ ഞാൻ!', 'Ae? Odatte njaan!', 'Eh? Let me run!']),
  ],
  outro: ['ഓർഡർ എത്തിച്ചിട്ട് വരാം.', 'Order etthichittu varaam.', 'I will deliver the order and come back.'],
  learned: [['sookshichu pokoo', 'go carefully']],
  again: ['ഓർഡർ ലേറ്റാകും ചേച്ചീ!', 'Order lateaakum chechee!', 'The order will be late, chechi!'],
});

export const roadTourist = D('gateway-road-tourist', {
  name: 'Sophie', role: 'foreign tourist', site: 'Road to Fort Kochi', diff: 4, lang: 'en',
  voice: { rate: 1.0, pitch: 1.25 },
  persona: 'Tourist in a mint floral shirt and a butter-yellow cap, taking photos along the road and a little lost. Speaks only English.',
  goal: 'Tell her she is on the right road to Fort Kochi.',
  steps: [
    S('road', 'Hi, am I on the right road to Fort Kochi? My map is confusing.',
      'Tell her yes, keep going straight, about ten minutes.', ['Yes, keep going straight, it is about ten minutes.', 'Yes, keep going straight, it is about ten minutes.'],
      ['yes keep going straight it is about ten minutes', 'yes you are on the right road about ten minutes', 'keep walking straight ten minutes more', 'right road just ten minutes straight', 'yes straight ahead about ten minutes', 'you are going the right way ten minutes to go'],
      'confirm_road_to_fort_kochi', ['Confirm the road.', 'Say: yes, straight, ten minutes.'],
      'Oh good, thank you! Wonderful.', 'Sorry, is this the right road or not?'),
  ],
  outro: 'Thanks, you are a lifesaver!',
  learned: [['keep going straight', 'giving simple directions']],
  again: 'Hi again, still going the right way?',
});

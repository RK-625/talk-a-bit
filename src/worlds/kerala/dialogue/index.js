/**
 * Kerala (Kochi) dialogues, written in Malayalam; the five foreign tourists speak English. Default export is keyed by NPC ROLE for the 20 multi-step
 * top-level files and by explicit placement id for everyone else (see ./cast/). docs/KERALA_CAST.md lists all 130 ids.
 *
 * id (= role)        site                                          steps  goal
 * ------------------ --------------------------------------------- ------ ---------------------------------------------------------------
 * chaiwalaUncle      Chaya kada (spawn)  [TUTORIAL, Kuttan Chettan]  3    order one tea, say yes to pazham pori, praise the tea
 * vadaPavWala        Puttu and appam cart                            3    order puttu and kadala, less spice, pay Rs 30
 * taxiDriver         Auto stand, Fort Kochi                          4    ask for Mattancherry, ask for the meter, ask the fare, pay
 * busConductor       Private-bus stop, Fort Kochi                    4    ask if it goes to Infopark, ticket price, buy a ticket, ask to be told the stop
 * trafficCop         Road junction                                   3    ask the way to Mattancherry Palace, ask if far, thank him
 * auntyWithSabzi     Fort Kochi footpath (chechi)                    3    offer to carry her bag, give name, say you are from Jaipur
 * cricketKid         Football patch, chaya kada square               3    ask to join, choose goalkeeper, say ready
 * koliFisherwoman    Quay by the Chinese nets                        3    ask sardine price per kilo, bargain, buy half a kilo
 * dabbawala          Delivery scooter (food-delivery rider)          3    ask for a minute, ask how he is so fast, praise
 * bollywoodHopeful   Malayalam film poster and cut-out wall          3    compliment his pose, ask which film, wish luck
 * bhelWala           Banana-chips cart, Cherai beach                 3    order 2 packets of upperi, taste jaggery chips, pay Rs 40
 * golaWala           Tender-coconut stall                            3    order karikku, add kulukki sarbath, pay Rs 50
 * balloonSeller      Steps by the Chinese nets                       3    ask the price, buy a red balloon, say it is for a child
 * photographer       Photo tripod facing the nets                    3    ask for a photo, ask the price, ask when ready
 * priest             Temple priest                                   3    greet, ask the festival, ask for prasadam
 * pilgrim            Island chapel gate, Bolgatty                    4    greet, ask closing time, ask where to light a candle, thank
 * coolie             Ernakulam Junction                              4    ask the platform, where it is, the charge, pay and thank
 * commuter           Metro platform                                  4    ask if it goes to Aluva, next train, women coach, where to buy a ticket
 * tourist  (EN)      Water-metro queue                               4    confirm the queue, ride time, food, say you are new too
 * securityGuard      Infopark gate booth                             4    say whom you meet, show ID, where to sign, the lift
 *
 * The other 110 people are keyed by their explicit id (collected from ./cast/*.js). Roles with no dialogue say a GREETINGS line.
 * Extra fields beyond DIALOGUE.md: `site`, `difficulty` (1-5), `tutorial: true` + `place` on chaiwalaUncle.
 */
import chaiwalaUncle from './chaiwalaUncle.js';
import vadaPavWala from './vadaPavWala.js';
import taxiDriver from './taxiDriver.js';
import busConductor from './busConductor.js';
import trafficCop from './trafficCop.js';
import auntyWithSabzi from './auntyWithSabzi.js';
import cricketKid from './cricketKid.js';
import koliFisherwoman from './koliFisherwoman.js';
import dabbawala from './dabbawala.js';
import bollywoodHopeful from './bollywoodHopeful.js';
import bhelWala from './bhelWala.js';
import golaWala from './golaWala.js';
import balloonSeller from './balloonSeller.js';
import photographer from './photographer.js';
import priest from './priest.js';
import pilgrim from './pilgrim.js';
import coolie from './coolie.js';
import commuter from './commuter.js';
import tourist from './tourist.js';
import securityGuard from './securityGuard.js';
import * as teakadai from './cast/teakadai.js';
import * as mylapore from './cast/mylapore.js';
import * as temple from './cast/temple.js';
import * as transit from './cast/transit.js';
import * as city from './cast/city.js';
import * as fort from './cast/fort.js';
import * as marina from './cast/marina.js';
import * as santhome from './cast/santhome.js';
import * as itpark from './cast/itpark.js';
import * as elliots from './cast/elliots.js';
import * as street from './cast/street.js';
import * as outskirts from './cast/outskirts.js';

// Every other talkable person (docs/KERALA_CAST.md) has a dialogue keyed by their explicit placement id, collected from ./cast/*.js.
const CAST = Object.fromEntries([teakadai, mylapore, temple, transit, city, fort, marina, santhome, itpark, elliots, street, outskirts]
  .flatMap((m) => Object.values(m)).map((d) => [d.id, d]));

export const GREETINGS = [
  { text: 'നമസ്കാരം അനന്യ!', roman: 'Namaskaram Ananya!', en: 'Hello, Ananya!' },
  { text: 'എന്താ അനന്യേ, സുഖമാണോ?', roman: 'Enthaa Ananye, sukhamaano?', en: 'So Ananya, how are you?' },
  { text: 'എവിടെ പോകുന്നു?', roman: 'Evide pokunnu?', en: 'Where are you going?' },
  { text: 'ഇപ്പോൾ കുറച്ച് തിരക്കിലാണ്, പിന്നെ സംസാരിക്കാം.', roman: 'Ippol kurachu thirakkilaanu, pinne samsaarikkaam.', en: 'A bit busy now, we can talk later.' },
  { text: 'ഇന്ന് നല്ല മഴക്കോളുണ്ട്, അല്ലേ?', roman: 'Innu nalla mazhakkolundu, alle?', en: 'Looks like rain today, doesn\'t it?' },
  { text: 'എല്ലാം സുഖമല്ലേ?', roman: 'Ellaam sukhamalle?', en: 'All well?' },
  { text: 'ചായ കുടിച്ചോ?', roman: 'Chaaya kudicho?', en: 'Had your tea yet?' },
  { text: 'ആഹാ, അനന്യ വന്നല്ലോ!', roman: 'Aahaa, Ananya vannallo!', en: 'Oh, Ananya has come!' },
  { text: 'ഇപ്പോൾ സമയമില്ല, പിന്നെ കാണാം.', roman: 'Ippol samayamilla, pinne kaanaam.', en: 'No time right now, see you later.' },
  { text: 'ഒന്ന് വഴി തരൂ.', roman: 'Onnu vazhi tharoo.', en: 'Please give a little way.' },
  { text: 'സൂക്ഷിച്ച് പോകൂ, നല്ല തിരക്കാണ്.', roman: 'Sookshichu pokoo, nalla thirakkaanu.', en: 'Go carefully, it is very crowded.' },
  { text: 'പറയൂ, എന്താ വേണ്ടത്?', roman: 'Parayoo, enthaa venddathu?', en: 'Tell me, what do you need?' },
  { text: 'ഞാൻ പോയിട്ട് വരാം, പിന്നെ കാണാം.', roman: 'Njaan poyittu varaam, pinne kaanaam.', en: 'I am off, see you later.' },
];

export default {
  chaiwalaUncle, vadaPavWala, taxiDriver, busConductor, trafficCop, auntyWithSabzi, cricketKid, koliFisherwoman,
  dabbawala, bollywoodHopeful, bhelWala, golaWala, balloonSeller, photographer, priest, pilgrim, coolie, commuter,
  tourist, securityGuard,
  ...CAST,
};

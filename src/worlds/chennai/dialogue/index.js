/**
 * Chennai dialogues (Tamil; the foreign tourists speak English). Default export is keyed by NPC ROLE for the 20 multi-step
 * top-level files and by explicit placement id for everyone else (see ./cast/). docs/CHENNAI_CAST.md lists all 130 ids.
 *
 * id (= role)        site                                          steps  goal
 * ------------------ --------------------------------------------- ------ ---------------------------------------------------------------
 * chaiwalaUncle      Tea kadai (spawn)  [TUTORIAL, Murugan Anna]    3    order one filter coffee, decline the biscuit, praise the coffee
 * vadaPavWala        Sundal and murukku cart                         3    order 2 sundal, less spice, pay Rs 30
 * taxiDriver         Auto stand, Fort St. George                     4    ask for Central, ask for the meter, ask the fare, pay
 * busConductor       MTC bus stop                                    4    ask the route, buy a ticket, ask the day pass, ask to be told the stop
 * trafficCop         Road junction                                   3    ask the way to Santhome, ask if far, thank him
 * auntyWithSabzi     Fort road footpath (paati)                      3    offer to carry her bag, give name, say you are from Pune
 * cricketKid         Gully cricket, tea-kadai square                 3    ask to join, choose to bat, say ready
 * koliFisherwoman    Quay by the kattumarams                         3    ask fish price per kilo, bargain, buy half a kilo
 * dabbawala          Delivery scooter (food-delivery rider)          3    ask permission, ask how he delivers fast, praise
 * bollywoodHopeful   Tamil film poster and cut-out wall              3    compliment his pose, ask which film, wish luck
 * bhelWala           Molaga bajji cart, Elliot's Beach               3    order 2 molaga bajji, coconut chutney, pay Rs 40
 * golaWala           Ilaneer (tender coconut) stall                  3    order ilaneer, ask for vazhukkai, pay Rs 50
 * balloonSeller      Fort St. George steps                           3    ask the price, buy a red balloon, say it is for a child
 * photographer       Photo tripod, Fort St. George                   3    ask for a photo, ask the price, ask when ready
 * priest             Temple gurukkal                                 3    greet, ask the festival, ask for prasadam
 * pilgrim            Santhome Basilica gate                          4    greet, ask closing time, ask where to light a candle, thank
 * coolie             Chennai Central                                 4    ask the Coimbatore platform, where it is, the charge, pay and thank
 * commuter           Suburban station platform                       4    ask if it goes to Beach, platform, next train, where to buy a ticket
 * tourist  (EN)      Boat-ride queue                                 4    confirm the queue, ride time, food, say you are new too
 * securityGuard      IT-park gate booth                              4    say whom you meet, show ID, where to sign, the lift
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

// Every other talkable person (docs/CHENNAI_CAST.md) has a dialogue keyed by their explicit placement id, collected from ./cast/*.js.
const CAST = Object.fromEntries([teakadai, mylapore, temple, transit, city, fort, marina, santhome, itpark, elliots, street, outskirts]
  .flatMap((m) => Object.values(m)).map((d) => [d.id, d]));

export const GREETINGS = [
  { text: 'வணக்கம் மீரா!', roman: 'Vanakkam Meera!', en: 'Hello, Meera!' },
  { text: 'என்ன மீரா, எப்படி இருக்கீங்க?', roman: 'Enna Meera, eppadi irukkinga?', en: 'So Meera, how are you?' },
  { text: 'எங்க போறீங்க?', roman: 'Enga poreenga?', en: 'Where are you going?' },
  { text: 'இப்போ கொஞ்சம் அவசரம், அப்புறம் பேசலாம்.', roman: 'Ippo konjam avasaram, appuram pesalaam.', en: 'In a bit of a hurry now, we can talk later.' },
  { text: 'இன்னைக்கு வெயில் ரொம்ப ஜாஸ்தி, இல்லையா?', roman: 'Innaikku veyil romba jaasthi, illaiya?', en: 'The sun is really strong today, isn\'t it?' },
  { text: 'எல்லாம் நல்லா இருக்கா?', roman: 'Ellaam nallaa irukkaa?', en: 'All good?' },
  { text: 'காபி குடிச்சாச்சா?', roman: 'Coffee kudichaachaa?', en: 'Had your coffee yet?' },
  { text: 'அட, மீரா வந்துட்டாங்க!', roman: 'Ada, Meera vandhuttaanga!', en: 'Oh, Meera is here!' },
  { text: 'இப்போ நேரம் இல்ல, அப்புறம் பார்க்கலாம்.', roman: 'Ippo neram illa, appuram paarkkalaam.', en: 'No time right now, see you later.' },
  { text: 'கொஞ்சம் வழி விடுங்க.', roman: 'Konjam vazhi vidunga.', en: 'Please give a little way.' },
  { text: 'பார்த்து போங்க, ரொம்ப கூட்டம்.', roman: 'Paarthu ponga, romba koottam.', en: 'Go carefully, it is very crowded.' },
  { text: 'சொல்லுங்க, என்ன வேணும்?', roman: 'Sollunga, enna venum?', en: 'Tell me, what do you need?' },
  { text: 'வரேன், அப்புறம் பார்க்கலாம்.', roman: 'Varen, appuram paarkkalaam.', en: 'I am off, see you later.' },
];

export default {
  chaiwalaUncle, vadaPavWala, taxiDriver, busConductor, trafficCop, auntyWithSabzi, cricketKid, koliFisherwoman,
  dabbawala, bollywoodHopeful, bhelWala, golaWala, balloonSeller, photographer, priest, pilgrim, coolie, commuter,
  tourist, securityGuard,
  ...CAST,
};

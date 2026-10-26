/**
 * Bengaluru dialogues (Kannada; the foreign tourists speak English). Default export is keyed by NPC ROLE for the 20 multi-step
 * top-level files and by explicit placement id for everyone else (see ./cast/). docs/BENGALURU_CAST.md lists all 130 ids.
 *
 * id (= role)        site                                          steps  goal
 * ------------------ --------------------------------------------- ------ ---------------------------------------------------------------
 * chaiwalaUncle      Darshini (spawn)  [TUTORIAL, Shankar Anna]      3    order one filter coffee, answer idli-vada, say thanks
 * vadaPavWala        Masala dosa cart                                3    order 2 masala dosas, less spicy chutney, pay Rs 100
 * taxiDriver         Auto stand, Vidhana Soudha                      4    ask for Majestic, ask for the meter, ask the fare, pay
 * busConductor       BMTC bus stop                                   4    ask the route, buy a ticket, ask the day pass, ask to be told the stop
 * trafficCop         Road junction                                   3    ask the way to Lalbagh, ask if far, thank him
 * auntyWithSabzi     Vidhana Soudha Road footpath                    3    offer to carry her bag, give name, say you are from Delhi
 * cricketKid         Gully cricket, darshini square                  3    ask to join, choose to bat, say ready
 * koliFisherwoman    Ulsoor jetty (mallige seller)                   3    ask mallige price per molam, bargain, buy two molam
 * dabbawala          Delivery scooter (food-delivery rider)          3    ask permission, ask how he delivers fast, praise
 * bollywoodHopeful   Kannada film poster wall                        3    compliment his pose, ask which film, wish luck
 * bhelWala           Churumuri cart, lakeside park                   3    order churumuri, less spice no onion, pay Rs 30
 * golaWala           Tender-coconut stall                            3    order elaneeru, ask for malai, pay Rs 50
 * balloonSeller      Vidhana Soudha steps                            3    ask the price, buy a red balloon, say it is for a child
 * photographer       Photo tripod, Vidhana Soudha                    3    ask for a photo, ask the price, ask when ready
 * priest             Temple (archaka)                                3    greet, ask the festival, ask for prasada
 * pilgrim            Lake-island temple gate                         4    greet, ask closing time, ask where chappals go, thank
 * coolie             KSR station                                     4    ask the Mysuru platform, where it is, the charge, thank
 * commuter           Namma Metro MG Road station                     4    ask if it goes to Majestic, platform, next train, smart card
 * tourist  (EN)      Pedal-boat queue                                4    help find the boats, ride time, food, say you are new too
 * securityGuard      Tech-park gate booth                            4    say you are the new intern, show ID, where to sign, the lift
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
import * as darshini from './cast/darshini.js';
import * as lake from './cast/lake.js';
import * as lakeside from './cast/lakeside.js';
import * as temple from './cast/temple.js';
import * as transit from './cast/transit.js';
import * as street from './cast/street.js';
import * as vidhana from './cast/vidhana.js';
import * as city from './cast/city.js';
import * as techpark from './cast/techpark.js';
import * as outskirts from './cast/outskirts.js';
import * as laad from './cast/laad.js';

// Every other talkable person (docs/BENGALURU_CAST.md) has a dialogue keyed by their explicit placement id, collected from ./cast/*.js.
const CAST = Object.fromEntries([darshini, lake, lakeside, temple, transit, street, vidhana, city, techpark, outskirts, laad]
  .flatMap((m) => Object.values(m)).map((d) => [d.id, d]));

export const GREETINGS = [
  { text: 'ఏం సమీర్, ఎలా ఉన్నావ్?', roman: 'Em Sameer, ela unnav?', en: 'Hey Sameer, how are you?' },
  { text: 'నమస్తే సమీర్!', roman: 'Namaste Sameer!', en: 'Hello, Sameer!' },
  { text: 'ఎక్కడికి వెళ్తున్నావ్?', roman: 'Ekkadiki veltunnav?', en: 'Where are you going?' },
  { text: 'ఇప్పుడు కొంచెం హడావుడిగా ఉంది, తర్వాత కలుద్దాం.', roman: 'Ippudu konchem hadavudiga undi, tarvata kaluddam.', en: 'In a bit of a hurry now, see you later.' },
  { text: 'ఈ రోజు వాతావరణం బాగుంది కదా?', roman: 'Ee roju vatavaranam bagundi kada?', en: 'Nice weather today, isn\'t it?' },
  { text: 'అంతా బాగానే ఉందా?', roman: 'Antha baganey unda?', en: 'All good?' },
  { text: 'ఛాయ్ తాగావా?', roman: 'Chai tagava?', en: 'Had your chai yet?' },
  { text: 'అరే, సమీర్ వచ్చాడు!', roman: 'Are, Sameer vachadu!', en: 'Oh, Sameer is here!' },
  { text: 'ఇప్పుడు టైమ్ లేదు, తర్వాత మాట్లాడదాం.', roman: 'Ippudu time ledu, tarvata matladadam.', en: 'No time right now, let\'s talk later.' },
  { text: 'కొంచెం పక్కకు జరగండి.', roman: 'Konchem pakkaku jaragandi.', en: 'Give a little space, please.' },
  { text: 'జాగ్రత్తగా వెళ్ళు, ట్రాఫిక్ చాలా ఉంది.', roman: 'Jagrattaga vellu, traffic chala undi.', en: 'Go carefully, there is a lot of traffic.' },
  { text: 'చెప్పు, ఏం కావాలి?', roman: 'Cheppu, em kavali?', en: 'Tell me, what do you need?' },
  { text: 'ఉద్యోగం వెతుకుతున్నావా? ఆల్ ది బెస్ట్!', roman: 'Udyogam vetukutunnava? All the best!', en: 'Looking for a job? All the best!' },
];

export default {
  chaiwalaUncle, vadaPavWala, taxiDriver, busConductor, trafficCop, auntyWithSabzi, cricketKid, koliFisherwoman,
  dabbawala, bollywoodHopeful, bhelWala, golaWala, balloonSeller, photographer, priest, pilgrim, coolie, commuter,
  tourist, securityGuard,
  ...CAST,
};

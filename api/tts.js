/**
 * Vercel serverless function: GET /api/tts?id=<lineId> -> live Sarvam Bulbul audio for one known NPC line (see server/tts.js).
 * DEPLOYMENT: set SARVAM_API_KEY in the Vercel project settings (Environment Variables). It is read only here, on the server, and never reaches the browser.
 * Without the key, or on a static host with no /api route, nothing breaks: the game falls back to the browser's own voice.
 */
import { createTtsHandler } from '../server/tts.js';

export default createTtsHandler({ getKey: () => process.env.SARVAM_API_KEY });

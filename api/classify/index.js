/**
 * Vercel serverless function: POST /api/classify judges the player's reply with Jev (TypeSafe AI); see server/classify.js.
 * DEPLOYMENT: set JEV_API_KEY (and optionally JEV_MODEL) in the Vercel project settings (Environment Variables). It is read only
 * here, on the server, and never reaches the browser. Without it the game falls back to its offline answer matcher.
 */
import { createClassifyHandler } from '../../server/classify.js';

export default createClassifyHandler({ getKey: () => process.env.JEV_API_KEY, getModel: () => process.env.JEV_MODEL || 'jev-latest' });

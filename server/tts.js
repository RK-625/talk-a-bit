/**
 * server/tts.js: the live NPC voice endpoint, GET /api/tts?id=<lineId>. Shared by the Vite dev middleware (vite.config.js) and the Vercel
 * function (api/tts.js). Node only.
 *   - The id must be a known line (server/voices.js buildLines); the text, speaker, model and pace come from the server, never from the client.
 *   - The key (SARVAM_API_KEY) is read through getKey() and goes only into the `api-subscription-key` header of https://api.sarvam.ai. It is never
 *     logged, returned or echoed. Upstream error bodies are never passed on.
 *   - Every response carries `X-TTS: 1` so the client can tell this endpoint's own 404 (unknown line) from a missing route (static host).
 *   - Success: audio/mpeg with a one-year immutable Cache-Control, so a CDN and the browser keep each line (a line costs credits about once).
 *   - Credits gone (402 / 403 / a credit-quota message): 503 { error: 'unavailable' } and the endpoint stays off for ~10 minutes.
 */
import { lineInfo, LANG_CODE, SAMPLE_RATE } from './voices.js';

const API = 'https://api.sarvam.ai/text-to-speech';
const TIMEOUT_MS = 8000, OFF_MS = 10 * 60 * 1000, LRU_MAX = 300, RATE_PER_MIN = 60;
const lru = new Map(); // lineId -> Buffer (most recent last)
const inflight = new Map(); // lineId -> Promise<Buffer>
const hits = new Map(); // ip -> { n, reset }
let offUntil = 0;

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('X-TTS', '1'); res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};
const clientIp = (req) => String(req.headers?.['x-forwarded-for'] ?? req.socket?.remoteAddress ?? '?').split(',')[0].trim();
function limited(ip) {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const h = hits.get(ip);
  if (!h || h.reset < now) { hits.set(ip, { n: 1, reset: now + 60000 }); return false; }
  return ++h.n > RATE_PER_MIN;
}
class Unavailable extends Error {}

async function synth(info, key) {
  let res;
  try {
    res = await fetch(API, {
      method: 'POST',
      headers: { 'api-subscription-key': key, 'content-type': 'application/json' },
      body: JSON.stringify({ text: info.text, language_code: LANG_CODE[info.lang], model: info.model, speaker: info.speaker, pace: info.pace, speech_sample_rate: SAMPLE_RATE, output_audio_codec: 'mp3' }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch { throw new Error('upstream unreachable'); }
  if (!res.ok) {
    const body = (await res.text().catch(() => '')).slice(0, 300);
    if ([401, 402, 403].includes(res.status) || /credit|quota|balance|insufficient|exhaust/i.test(body)) { offUntil = Date.now() + OFF_MS; throw new Unavailable('credits or key'); }
    throw new Error(`upstream ${res.status}`);
  }
  const b64 = (await res.json().catch(() => null))?.audios?.[0];
  if (!b64) throw new Error('upstream gave no audio');
  return Buffer.from(b64, 'base64');
}

/** @param {{ getKey: () => string | undefined }} opts */
export function createTtsHandler({ getKey }) {
  return async function handle(req, res) {
    try {
      if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'method' });
      const id = new URL(req.url, 'http://x').searchParams.get('id');
      const info = lineInfo(id);
      if (!info) return json(res, 404, { error: 'unknown line' });
      let buf = lru.get(id);
      if (buf) { lru.delete(id); lru.set(id, buf); } // refresh
      else {
        if (limited(clientIp(req))) { res.setHeader('Retry-After', '30'); return json(res, 429, { error: 'slow down' }); }
        const key = getKey();
        if (!key || Date.now() < offUntil) return json(res, 503, { error: 'unavailable' });
        let p = inflight.get(id);
        if (!p) { p = synth(info, key).finally(() => inflight.delete(id)); inflight.set(id, p); }
        buf = await p;
        lru.set(id, buf);
        if (lru.size > LRU_MAX) lru.delete(lru.keys().next().value);
      }
      res.statusCode = 200;
      res.setHeader('X-TTS', '1'); res.setHeader('Content-Type', 'audio/mpeg'); res.setHeader('Content-Length', buf.length);
      res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
      res.end(req.method === 'HEAD' ? undefined : buf);
    } catch (e) {
      if (res.writableEnded) return;
      if (e instanceof Unavailable) return json(res, 503, { error: 'unavailable' });
      json(res, 502, { error: 'voice service failed' });
    }
  };
}

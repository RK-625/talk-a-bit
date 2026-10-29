/**
 * server/classify.js: the HTTP handler that judges the player's reply with Jev (server/jev.js). SERVER ONLY.
 * Shared by the Vite dev middleware (vite.config.js) and the Vercel functions api/classify/index.js + api/classify/status.js.
 *
 *   createClassifyHandler({ getKey, getModel }) -> (req, res) handler (Node http / Connect / Vercel)
 *     GET            -> { hasKey, model }                     (the client's /api/classify/status probe)
 *     POST {payload} -> { verdict, confidence, reason, model, answers }
 *     no key: 501 (the client falls back to its offline mock)   bad body: 400   too many requests: 429   Jev failed: 502
 * The key is read through getKey() on the server and never sent back. Best-effort per-IP rate limit (per instance).
 */
const MAX_BODY = 16 * 1024, MAX_REPLY = 400, RATE = 30, WINDOW_MS = 60_000;

export function createClassifyHandler({ getKey, getModel = () => 'jev-latest' }) {
  let jev = null, jevKey = null;
  const hits = new Map(); // ip -> [timestamps]
  const getJev = async (key) => {
    if (!jev || jevKey !== key) { jev = (await import('./jev.js')).createJev({ apiKey: key, model: getModel() }); jevKey = key; }
    return jev;
  };
  const limited = (ip) => {
    const now = Date.now(), list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    list.push(now); hits.set(ip, list);
    if (hits.size > 5000) hits.clear();
    return list.length > RATE;
  };
  const send = (res, status, obj) => { if (res.writableEnded) return; res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(obj)); };
  /** the JSON body: Vercel may have parsed it already (req.body); otherwise read the stream, capped at MAX_BODY */
  const readBody = (req) => new Promise((resolve, reject) => {
    if (req.body !== undefined) return resolve(typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {});
    const chunks = []; let size = 0;
    req.on('data', (c) => { size += c.length; if (size > MAX_BODY) { reject(Object.assign(new Error('body too large'), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString() || '{}')); } catch { reject(Object.assign(new Error('bad json'), { status: 400 })); } });
    req.on('error', reject);
  });

  return async function handler(req, res) {
    const key = getKey(), model = getModel();
    if (req.method === 'GET') return send(res, 200, { hasKey: !!key, model });
    if (req.method !== 'POST') return send(res, 405, {});
    if (!key) return send(res, 501, { error: 'JEV_API_KEY not set' });
    const ip = String(req.headers?.['x-forwarded-for'] ?? req.socket?.remoteAddress ?? '?').split(',')[0].trim();
    if (limited(ip)) return send(res, 429, { error: 'too many requests' });
    const ac = new AbortController();
    res.on?.('close', () => { if (!res.writableFinished) ac.abort(); }); // the browser cancelled (Esc / timeout)
    try {
      const payload = await readBody(req);
      if (!payload || typeof payload !== 'object' || typeof payload.reply !== 'string' || payload.reply.length > MAX_REPLY) return send(res, 400, { error: 'bad request' });
      const { verdict, confidence, reason, model: used, answers } = await (await getJev(key)).classify(payload, { signal: ac.signal });
      send(res, 200, { verdict, confidence, reason, model: used, answers });
    } catch (e) {
      if (ac.signal.aborted) return;
      send(res, e?.status ?? 502, { error: String(e?.message ?? e).slice(0, 200) });
    }
  };
}

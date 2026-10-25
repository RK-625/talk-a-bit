import { defineConfig, loadEnv } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// Dev only: POST /__shot?name=foo with a PNG body saves docs/screens/foo.png (used by window.__mumbai.shot in the dev tools).
const shotPlugin = () => ({
  name: 'dev-screenshot-saver',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/__shot', (req, res) => {
      const name = (new URL(req.url, 'http://x').searchParams.get('name') || 'shot').replace(/[^\w.-]/g, '_');
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => {
        const dir = path.resolve('docs/screens');
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, name.endsWith('.png') ? name : name + '.png');
        fs.writeFileSync(file, Buffer.concat(chunks));
        res.end(file);
      });
    });
  },
});

// Dev only: the classifier proxy. POST /api/classify forwards to Jev (TypeSafe AI) with the key from .env.local (git-ignored), so the
// key never ships to the browser. GET /api/classify/status -> { hasKey }. Without a key: 501 and the client falls back to the mock.
const classifyPlugin = (env) => ({
  name: 'dev-classifier-proxy',
  apply: 'serve',
  configureServer(server) {
    const key = env.JEV_API_KEY, url = env.JEV_API_URL;
    server.middlewares.use('/api/classify', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      if (req.method === 'GET') return res.end(JSON.stringify({ hasKey: !!(key && url) }));
      if (req.method !== 'POST') { res.statusCode = 405; return res.end('{}'); }
      if (!key || !url) { res.statusCode = 501; return res.end(JSON.stringify({ error: 'JEV_API_KEY / JEV_API_URL not set in .env.local' })); }
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', async () => {
        try {
          const payload = JSON.parse(Buffer.concat(chunks).toString() || '{}');
          // TODO(jev): we do not have Jev's API docs yet. Map our payload to Jev's request format here (auth header, field names,
          // how the step intent/examples are passed) and map its answer back to { verdict: 'valid' | 'retry', confidence?, reason? }.
          const jevRequest = payload; // TODO: replace with the real Jev request body
          const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify(jevRequest) });
          if (!r.ok) throw new Error('Jev HTTP ' + r.status);
          const jev = await r.json();
          const result = { verdict: jev.verdict === 'valid' ? 'valid' : 'retry', confidence: jev.confidence, reason: jev.reason }; // TODO: replace with the real Jev response mapping
          res.end(JSON.stringify(result));
        } catch (e) { res.statusCode = 502; res.end(JSON.stringify({ error: String(e?.message ?? e) })); }
      });
    });
  },
});

// three.js alone is ~600 kB minified; that's expected for this project.
// Multi-page: the game plus two dev-only lab turntables.
export default defineConfig(({ mode }) => ({
  plugins: [shotPlugin(), classifyPlugin(loadEnv(mode, process.cwd(), ''))],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      input: {
        main: 'index.html',
        people: 'lab/people.html',
        landmarks: 'lab/landmarks.html',
      },
    },
  },
}));

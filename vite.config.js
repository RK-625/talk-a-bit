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

// Dev only: the classifier proxy. POST /api/classify judges the player's reply with Jev (TypeSafe AI) via server/jev.js, with the
// key from the project-root .env (JEV_API_KEY, optional JEV_MODEL), so the key never ships to the browser.
// GET /api/classify/status -> { hasKey, model }. Without a key: 501 and the client falls back to the mock.
const classifyPlugin = (env) => ({
  name: 'dev-classifier-proxy',
  apply: 'serve',
  configureServer(server) {
    const key = env.JEV_API_KEY, model = env.JEV_MODEL || 'jev-latest';
    let jev = null;
    const getJev = async () => (jev ??= (await import('./server/jev.js')).createJev({ apiKey: key, model }));
    server.middlewares.use('/api/classify', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      if (req.method === 'GET') return res.end(JSON.stringify({ hasKey: !!key, model }));
      if (req.method !== 'POST') { res.statusCode = 405; return res.end('{}'); }
      if (!key) { res.statusCode = 501; return res.end(JSON.stringify({ error: 'JEV_API_KEY not set in .env' })); }
      const chunks = [];
      const ac = new AbortController();
      res.on('close', () => { if (!res.writableFinished) ac.abort(); }); // the browser cancelled (Esc / timeout)
      req.on('data', (c) => chunks.push(c));
      req.on('end', async () => {
        try {
          const payload = JSON.parse(Buffer.concat(chunks).toString() || '{}');
          const out = await (await getJev()).classify(payload, { signal: ac.signal });
          const { verdict, confidence, reason, model: used, answers } = out;
          if (!res.writableEnded) res.end(JSON.stringify({ verdict, confidence, reason, model: used, answers }));
        } catch (e) {
          if (ac.signal.aborted || res.writableEnded) return;
          res.statusCode = 502; res.end(JSON.stringify({ error: String(e?.message ?? e).slice(0, 200) }));
        }
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

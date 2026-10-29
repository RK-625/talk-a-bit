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

// Dev only: the classifier proxy. POST /api/classify judges the player's reply with Jev (TypeSafe AI) through server/classify.js
// (the same handler as the Vercel function api/classify/), with the key from the project-root .env (JEV_API_KEY, optional JEV_MODEL),
// so the key never ships to the browser. GET /api/classify/status -> { hasKey, model }. Without a key: 501 and the client uses the mock.
const classifyPlugin = (env) => ({
  name: 'dev-classifier-proxy',
  apply: 'serve',
  configureServer(server) {
    let handler = null;
    server.middlewares.use('/api/classify', async (req, res) => {
      handler ??= (await import('./server/classify.js')).createClassifyHandler({ getKey: () => env.JEV_API_KEY, getModel: () => env.JEV_MODEL || 'jev-latest' });
      handler(req, res);
    });
  },
});

// Dev only: GET /api/tts?id=<lineId> -> live Sarvam Bulbul audio (server/tts.js, same handler as the Vercel function api/tts.js). The key comes from
// the project-root .env (SARVAM_API_KEY) and never reaches the browser. No key: 503 and the game uses the browser voice.
const ttsPlugin = (env) => ({
  name: 'dev-tts-proxy',
  apply: 'serve',
  configureServer(server) {
    let handler = null;
    server.middlewares.use('/api/tts', async (req, res) => {
      handler ??= (await import('./server/tts.js')).createTtsHandler({ getKey: () => env.SARVAM_API_KEY });
      req.url = '/api/tts' + (req.url ?? '');
      handler(req, res);
    });
  },
});

// three.js alone is ~600 kB minified; that's expected for this project.
// Multi-page: the game plus two dev-only lab turntables.
export default defineConfig(({ mode }) => ({
  plugins: [shotPlugin(), classifyPlugin(loadEnv(mode, process.cwd(), '')), ttsPlugin(loadEnv(mode, process.cwd(), ''))],
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

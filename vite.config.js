import { defineConfig } from 'vite';
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

// three.js alone is ~600 kB minified; that's expected for this project.
// Multi-page: the game plus two dev-only lab turntables.
export default defineConfig({
  plugins: [shotPlugin()],
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
});

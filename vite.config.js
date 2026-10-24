import { defineConfig } from 'vite';

// three.js alone is ~600 kB minified; that's expected for this project.
// Multi-page: the game plus two dev-only lab turntables.
export default defineConfig({
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

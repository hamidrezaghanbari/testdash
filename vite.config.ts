import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

import packageJson from './package.json';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1024,
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  envPrefix: 'INTRACK_',
  define: {
    VERSION: JSON.stringify(packageJson.version),
    BASE_URL: JSON.stringify('/api/web'),
  },
  server: {
    proxy: {
      '/api/web': { changeOrigin: true, target: 'https://stage.intrack.ir' },
    },
  },
});

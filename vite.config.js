import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/shared/config/site.ts';

const dynmap = new URL(site.dynmapUrl);

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [react()],
  server: {
    proxy: {
      [dynmap.pathname]: { target: dynmap.origin, changeOrigin: true },
    },
  },
});

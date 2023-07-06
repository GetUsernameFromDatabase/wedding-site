import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';
import { basePath } from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [vue(), vuetify({ autoImport: true }), svgLoader({ svgo: false })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});

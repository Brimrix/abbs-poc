import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/static/',
  build: {
    manifest: 'manifest.json',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'frontend/main.jsx'),
      },
      output:{
        dir:path.resolve(__dirname, 'staticfiles'),
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend'),
    },
  },
});

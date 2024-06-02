import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/static/',
  build: {
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'frontend/main.jsx'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend'),
      '@styles': path.resolve(__dirname, 'frontend/assets/styles'),
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3005,
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      events: 'events',
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});

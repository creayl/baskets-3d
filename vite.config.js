import { defineConfig } from 'vite';

export default defineConfig({
  base: '/baskets-3d/',  // GitHub Pages base path (repository name)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three']  // Separate Three.js into its own chunk
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});

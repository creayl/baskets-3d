import { defineConfig } from 'vite';

export default defineConfig({
  base: './',  // Use relative paths for assets (critical for deployment)
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

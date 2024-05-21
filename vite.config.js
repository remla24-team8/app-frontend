import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,  // Ensure this port is not in use
    proxy: {
      '/api': {
        target: 'http://app-backend:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});

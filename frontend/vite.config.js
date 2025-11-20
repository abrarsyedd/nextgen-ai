import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, 
    proxy: {
      '/api': {
        // [SMART FIX] 
        // Checks for an environment variable first (for Docker).
        // Falls back to 'localhost' for local development.
        target: process.env.VITE_API_TARGET || 'http://localhost:5000', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
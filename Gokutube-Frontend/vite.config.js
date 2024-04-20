import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
          target: String(import.meta.env.API_URL),
          changeOrigin: true,
          secure: false,      
      }
    }
  },
  plugins: [react()],
})

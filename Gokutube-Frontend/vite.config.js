import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
          target: String(process.env.API_URL),
          changeOrigin: true,
          secure: false,      
          ws: true,
      }
    }
  },
  plugins: [react()],
})

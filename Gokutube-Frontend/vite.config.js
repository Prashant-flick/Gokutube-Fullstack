import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://gokutube-fullstack-backend-ezkg1tvwy.vercel.app/'
    }
  },
  plugins: [react()],
})

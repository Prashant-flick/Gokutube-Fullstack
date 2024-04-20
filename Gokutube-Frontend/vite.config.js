import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/': String(process.env.API_URL)
    }
  },
  plugins: [react()],
})

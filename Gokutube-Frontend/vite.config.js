import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// const env = loadEnv()

// console.log(env.VITE_API_URL);

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//           target: 'abc/ba',
//           changeOrigin: true,
//           secure: false,      
//       }
//     }
//   },
//   plugins: [react()],
// })

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    server: {
        proxy: {
          '/api': {
              target: String(process.env.VITE_API_URL),
              changeOrigin: true,
              secure: false,      
          },
        }
      },
      plugins: [react()],
  });
}

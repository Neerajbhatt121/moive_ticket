import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
  proxy: {
      // '/api': {
      //   target: 'https://moive-ticket-1.onrender.com',
      //   changeOrigin: true,
      //   secure: true, // set to false if using HTTP or invalid cert
      //   rewrite: (path) => path.replace(/^\/api/, '/api'),
      // }
    }
}

})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/app-weather/',
  server: {
    proxy: {
      // все запросы к /api будут проксироваться на Open-Meteo
      '/api': {
        target: 'https://geocoding-api.open-meteo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

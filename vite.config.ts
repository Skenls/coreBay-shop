import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,
    headers: {
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  },
  preview: {
    host: true,
    headers: {
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  },
})

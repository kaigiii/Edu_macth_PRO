import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Edu_macth_PRO/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Edu_macth_PRO/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          charts: ['recharts'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    },
    // 優化構建性能
    minify: 'esbuild'
  },
  // 開發服務器優化
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
})

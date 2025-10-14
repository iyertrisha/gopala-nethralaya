import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    })
  ],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/, // This includes both .js and .jsx files
    exclude: []
  },
  optimizeDeps: {
    include: ['gsap', 'lenis']
  }
})
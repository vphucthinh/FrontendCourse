import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import path from 'path'
import dotenv from 'dotenv';


dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
     proxy: {
      '/api': {
        target: process.env.VITE_REACT_APP_SERVER_URL,
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/image': {
        target: process.env.VITE_REACT_APP_BASE_IMG_URL,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/image/, ''),
      }
    },
      headers: {
          "max-http-header-size": "16384"
      }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
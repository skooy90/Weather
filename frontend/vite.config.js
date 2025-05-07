import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// 환경 변수 스키마 정의
const envSchema = {
  VITE_API_URL: String,
  VITE_APP_TITLE: String,
  VITE_APP_DESCRIPTION: String,
  VITE_APP_VERSION: String,
  VITE_APP_ENV: String
};

export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify(command === 'serve' 
        ? 'http://localhost:10000/api'
        : 'https://weather-backend-knii.onrender.com/api'),
      VITE_APP_TITLE: JSON.stringify('Weather App'),
      VITE_APP_DESCRIPTION: JSON.stringify('Weather information application'),
      VITE_APP_VERSION: JSON.stringify('1.0.0'),
      VITE_APP_ENV: JSON.stringify(command === 'serve' ? 'development' : 'production')
    }
  }
})); 
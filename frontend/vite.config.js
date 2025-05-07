import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
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
        target: 'https://weather-backend-knii.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  define: {
    'import.meta.env': {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
      VITE_APP_TITLE: JSON.stringify('Weather App'),
      VITE_APP_DESCRIPTION: JSON.stringify('Weather information application'),
      VITE_APP_VERSION: JSON.stringify('1.0.0'),
      VITE_APP_ENV: JSON.stringify('production')
    }
  }
}); 
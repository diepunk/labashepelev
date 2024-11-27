import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve('./src/components'),
      '@pages': path.resolve('./src/pages'),
      '@store': path.resolve('./src/store'),
      '@img': path.resolve('./src/assets'),
      '@api': path.resolve('./src/api'),
      '@global': path.resolve('./src/global'),
    }
  }
})



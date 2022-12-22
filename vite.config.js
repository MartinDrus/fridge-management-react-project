import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';



// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],

  root: path.resolve(__dirname, ''),
  resolve: {
      alias: {
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        '~bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),
      }

  },

  build: {
      outDir: '../dist'
  }

});

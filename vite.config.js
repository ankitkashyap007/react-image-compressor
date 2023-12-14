import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  moduleContext: {
    './node_modules/pdfmake/build/vfs_fonts.js': 'window',
  },  
})

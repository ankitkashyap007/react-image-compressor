import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Tech2radar AI",
    short_name: "Tech2radarAI",
    description: "Empower your creativity with free AI tools! AI Toolbox offers a suite of powerful artificial intelligence tools to enhance your projects. From image recognition to natural language processing, unleash the potential of AI without any cost.",
    icons: [{
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
      purpose: 'apple touch icon',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    }
    ],
    splash_screen: {
      show: true,
      image: "/android-chrome-512x512.png",
      sizes: "512x512",
      background_color: "#ffffff"
    },
    theme_color: '#6366f1',
    background_color: '#ffffff',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
  // devOptions: {
  //   enabled: true
  //   /* other options */
  // }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  moduleContext: {
    './node_modules/pdfmake/build/vfs_fonts.js': 'window',
  },
})

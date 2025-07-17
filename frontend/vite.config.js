import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5173, // Set development server port
  },
  preview: {
    port: 5173, // Set preview server port
  }
})

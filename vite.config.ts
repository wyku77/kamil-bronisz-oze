import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Ścieżki względne — działa zarówno pod adresem GitHub Pages
  // (https://uzytkownik.github.io/repo/) jak i na domenie własnej (https://kamilbronisz.pl/).
  base: './',
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
  },
})

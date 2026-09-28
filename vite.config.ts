import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  // Ścieżki względne — działa zarówno pod adresem GitHub Pages
  // (https://uzytkownik.github.io/repo/) jak i na domenie własnej (https://kamilbronisz.pl/).
  base: './',
  plugins: [react()],
  build: {
    // Dwie strony w jednej aplikacji: strona główna (magazyny energii) i podstrona Czyste Powietrze.
    // Wspólne komponenty (nawigacja, stopka, formularze) trafiają do wspólnego pliku JS.
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        cp: fileURLToPath(new URL('./czyste-powietrze.html', import.meta.url)),
      },
    },
  },
  server: {
    port: 5174,
    open: true,
  },
})

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Strona jest prerenderowana (statyczny HTML w dist/index.html — patrz
// scripts/prerender.mjs), dzięki czemu roboty Google/Bing/AI od razu widzą pełną
// treść. React renderuje aplikację na tej treści (czysto, bez ostrzeżeń hydracji —
// część danych, np. odliczanie do naboru, zależy od czasu wczytania).
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

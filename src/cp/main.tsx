import React from 'react'
import { createRoot } from 'react-dom/client'
import CpApp from './CpApp'
import '../index.css'
import { initClickTracking } from '../lib/trackClicks'
import { site } from '../data/content'
import { cpWhatsappText } from '../data/cp'

// Na tej podstronie wiadomość WhatsApp dotyczy Czystego Powietrza (pasek na dole, przyciski, dymek).
site.whatsappText = cpWhatsappText

// Jak strona główna: podstrona jest prerenderowana (scripts/prerender.mjs → dist/czyste-powietrze.html),
// a React renderuje ją od nowa przez createRoot (nie hydrateRoot — patrz src/main.tsx).
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CpApp />
  </React.StrictMode>,
)

initClickTracking()

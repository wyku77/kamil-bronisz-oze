import { track } from './analytics'

/**
 * Globalne śledzenie kliknięć w „Zadzwoń" (tel:) i WhatsApp.
 * Łapie WSZYSTKIE takie linki na stronie (również dodane w przyszłości),
 * więc każdy sygnał kontaktu „na telefon" trafia do GA4/Pixela jako konwersja.
 * Źródło = id najbliższej sekcji (np. "kontakt", "kalkulator"), do analizy w GA4.
 */
export function initClickTracking(): void {
  if (typeof document === 'undefined') return
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    const link = target?.closest('a')
    if (!link) return
    const href = link.getAttribute('href') || ''
    const source = link.closest('[id]')?.id || 'strona'
    if (/^tel:/i.test(href)) track.callClick(source)
    else if (/wa\.me|api\.whatsapp|whatsapp\.com/i.test(href)) track.whatsappClick(source)
  })
}

/**
 * Lekka warstwa analityki oparta o dataLayer (GTM / Google Ads / Meta Pixel).
 * Jeśli na stronie wpięty jest Google Tag Manager albo Meta Pixel, te zdarzenia
 * można wykorzystać jako konwersje w kampaniach Meta Ads i Google Ads.
 */

type DataLayerEvent = Record<string, unknown> & { event: string }

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[]
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

// Konwersja Google Ads (gdy wpinasz Ads bezpośrednio, bez GTM).
const GADS_ID = import.meta.env.VITE_GADS_ID as string | undefined
const GADS_CONVERSION_LABEL = import.meta.env.VITE_GADS_CONVERSION_LABEL as string | undefined

export function pushEvent(event: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })

  // GA4 (gtag) — przekaż zdarzenie jako event GA4 (jeśli gtag wczytany po zgodzie).
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload)
  }

  // Jeśli wpięty jest Meta Pixel — przekaż też tam kluczowe zdarzenia.
  if (typeof window.fbq === 'function') {
    if (event === 'lead_submit') window.fbq('track', 'Lead', payload)
    if (event === 'calculator_complete') window.fbq('track', 'CompleteRegistration', payload)
    if (event === 'call_click' || event === 'whatsapp_click') window.fbq('track', 'Contact', payload)
  }

  // Konwersja Google Ads na pozyskaniu leada (gdy Ads wpięty bezpośrednio).
  if (
    event === 'lead_submit' &&
    typeof window.gtag === 'function' &&
    GADS_ID &&
    GADS_CONVERSION_LABEL
  ) {
    window.gtag('event', 'conversion', { send_to: `${GADS_ID}/${GADS_CONVERSION_LABEL}` })
  }
}

export const track = {
  calculatorStart: () => pushEvent('calculator_start'),
  calculatorComplete: (payload: Record<string, unknown>) =>
    pushEvent('calculator_complete', payload),
  leadSubmit: (payload: Record<string, unknown>) => pushEvent('lead_submit', payload),
  ctaClick: (label: string) => pushEvent('cta_click', { cta_label: label }),
  /** Kliknięcie „Zadzwoń" (tel:) — kluczowa konwersja przy strategii „na telefon". */
  callClick: (source: string) => pushEvent('call_click', { source }),
  /** Kliknięcie WhatsApp — sygnał kontaktu. */
  whatsappClick: (source: string) => pushEvent('whatsapp_click', { source }),
}

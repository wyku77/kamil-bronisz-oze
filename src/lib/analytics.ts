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
  }
}

export function pushEvent(event: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })

  // Jeśli wpięty jest Meta Pixel — przekaż też tam kluczowe zdarzenia.
  if (typeof window.fbq === 'function') {
    if (event === 'lead_submit') window.fbq('track', 'Lead', payload)
    if (event === 'calculator_complete') window.fbq('track', 'CompleteRegistration', payload)
  }
}

export const track = {
  calculatorStart: () => pushEvent('calculator_start'),
  calculatorComplete: (payload: Record<string, unknown>) =>
    pushEvent('calculator_complete', payload),
  leadSubmit: (payload: Record<string, unknown>) => pushEvent('lead_submit', payload),
  ctaClick: (label: string) => pushEvent('cta_click', { cta_label: label }),
}

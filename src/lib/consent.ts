/**
 * Zarządzanie zgodą na cookies (analityka/marketing).
 * Narzędzia śledzące ładują się DOPIERO po zgodzie — zgodnie z RODO.
 */
export type ConsentValue = 'granted' | 'denied'

const KEY = 'kb_cookie_consent'

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  const v = localStorage.getItem(KEY)
  return v === 'granted' || v === 'denied' ? v : null
}

export function setConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* brak dostępu do localStorage — ignorujemy */
  }
}

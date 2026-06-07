/**
 * Warstwa wysyłki leadów — przygotowana pod łatwą integrację z n8n / Make,
 * a dalej z Airtable, Google Sheets, CRM, SMS/e-mail.
 *
 * Działanie:
 *  1. Jeśli ustawiono VITE_LEAD_WEBHOOK_URL (np. webhook n8n/Make) — wysyła tam
 *     payload metodą POST (application/json). To jest docelowy tryb produkcyjny.
 *  2. Jeśli zmiennej brak — zapisuje lead w localStorage i loguje w konsoli
 *     (tryb deweloperski, nic nie ginie).
 *
 * Struktura `LeadPayload` jest „płaska", więc bez przeróbek mapuje się 1:1 na
 * kolumny w Airtable / Google Sheets (patrz README → Integracje).
 */

import type { CalcInput, CalcResult } from './calc'

export type LeadContact = {
  name: string
  phone: string
  email: string
  postalCode: string
  consent: boolean
}

export type LeadPayload = {
  // Dane kontaktowe (lead magnet)
  name: string
  phone: string
  email: string
  postalCode: string
  consent: boolean

  // Parametry z kalkulatora
  objectType: string
  voivodeship: string
  monthlyBill: number
  annualConsumption: number
  heatPump: boolean
  ev: boolean
  ac: boolean
  dynamicTariff: boolean

  // Wyniki kalkulatora
  pvPowerKwp: number
  storageKwh: number
  selfConsumptionPct: number
  annualSavings: number
  savings10y: number
  savings20y: number
  paybackYears: number
  investmentNet: number
  subsidy: number
  co2PerYear: number

  // Metadane (atrybucja kampanii + źródło)
  source: string
  submittedAt: string
  pageUrl: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string

  // Punktacja leada (wstępny lead scoring po stronie klienta)
  leadScore: number
  leadTemperature: 'goracy' | 'cieply' | 'zimny'
}

const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined
const STORAGE_KEY = 'kb_leads'

function getUTM() {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utmSource: p.get('utm_source') ?? '',
    utmMedium: p.get('utm_medium') ?? '',
    utmCampaign: p.get('utm_campaign') ?? '',
    utmTerm: p.get('utm_term') ?? '',
    utmContent: p.get('utm_content') ?? '',
  }
}

/**
 * Wstępny lead scoring (0–100) + temperatura.
 * Wyższy rachunek, własny dom/firma i gotowość (taryfa dynamiczna, pełne dane)
 * podnoszą priorytet. Docelowy scoring i tak liczony jest w CRM/n8n — to jest
 * szybka kwalifikacja po stronie strony.
 */
function scoreLead(contact: LeadContact, input: CalcInput, result: CalcResult): {
  score: number
  temperature: LeadPayload['leadTemperature']
} {
  let score = 0
  if (input.monthlyBill >= 600 || input.annualConsumption >= 6000) score += 35
  else if (input.monthlyBill >= 300 || input.annualConsumption >= 3000) score += 22
  else score += 10

  if (result.annualSavings >= 5000) score += 25
  else if (result.annualSavings >= 2500) score += 15
  else score += 6

  if (input.objectType === 'firma') score += 12
  if (input.dynamicTariff) score += 8
  if (input.heatPump || input.ev) score += 8
  if (contact.phone.trim()) score += 12

  score = Math.min(score, 100)
  const temperature = score >= 70 ? 'goracy' : score >= 45 ? 'cieply' : 'zimny'
  return { score, temperature }
}

export function buildLeadPayload(
  contact: LeadContact,
  input: CalcInput,
  result: CalcResult,
  source = 'kalkulator',
): LeadPayload {
  const { score, temperature } = scoreLead(contact, input, result)
  return {
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    email: contact.email.trim(),
    postalCode: contact.postalCode.trim(),
    consent: contact.consent,

    objectType: input.objectType,
    voivodeship: input.voivodeship,
    monthlyBill: input.monthlyBill,
    annualConsumption: input.annualConsumption,
    heatPump: input.heatPump,
    ev: input.ev,
    ac: input.ac,
    dynamicTariff: input.dynamicTariff,

    pvPowerKwp: result.pvPowerKwp,
    storageKwh: result.storageKwh,
    selfConsumptionPct: Math.round(result.selfConsumption * 100),
    annualSavings: result.annualSavings,
    savings10y: result.savings10y,
    savings20y: result.savings20y,
    paybackYears: result.paybackYears,
    investmentNet: result.investmentNet,
    subsidy: result.subsidy,
    co2PerYear: result.co2PerYear,

    source,
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    ...{
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
    },
    ...getUTM(),

    leadScore: score,
    leadTemperature: temperature,
  }
}

export type SubmitResult = { ok: boolean; mode: 'webhook' | 'local' }

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  // Tryb produkcyjny: wyślij na webhook (n8n / Make / własny endpoint)
  if (WEBHOOK_URL) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) return { ok: true, mode: 'webhook' }
    } catch (err) {
      // sieć padła — zapisz lokalnie, by nie stracić leada
      console.error('[leads] Błąd wysyłki na webhook, zapisuję lokalnie:', err)
    }
  }

  // Fallback: zapis lokalny (deweloperski lub awaryjny)
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const list: LeadPayload[] = raw ? JSON.parse(raw) : []
    list.push(payload)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (err) {
    console.error('[leads] Nie udało się zapisać leada lokalnie:', err)
    return { ok: false, mode: 'local' }
  }

  if (!WEBHOOK_URL) {
    console.info(
      '%c[leads] Lead zapisany lokalnie (brak VITE_LEAD_WEBHOOK_URL).',
      'color:#d4a017;font-weight:bold',
      payload,
    )
  }
  return { ok: true, mode: 'local' }
}

/** Eksport zebranych lokalnie leadów (np. do ręcznego wgrania do Airtable). */
export function exportLocalLeads(): LeadPayload[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

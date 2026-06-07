/**
 * Silnik kalkulatora oszczędności OZE.
 * ──────────────────────────────────────────────────────────────────────────
 * Wszystkie założenia są zebrane w stałych poniżej i oparte na realiach rynku
 * polskiego w 2026 r. (net-billing, RCEm ~0,13 zł/kWh, taryfy dynamiczne
 * dostępne (15-min interwały rozliczeń od 2026), dotacja na magazyn energii do 16 000 zł).
 *
 * Wyniki są ORIENTACYJNE — dokładne wyliczenie powstaje na bezpłatnej analizie.
 * Aby dostroić model, zmieniaj wyłącznie wartości w sekcji STAŁE.
 */

// ─────────────────────────────────────────────────────────────
// STAŁE (parametry modelu — łatwe do aktualizacji)
// ─────────────────────────────────────────────────────────────

export type ObjectType = 'dom' | 'firma' | 'rolne'

/** Cena energii brutto (zł/kWh, „all-in" 2026) wg typu obiektu. */
const PRICE: Record<ObjectType, number> = {
  dom: 1.1,
  firma: 0.95,
  rolne: 1.0,
}

/** Uzysk z 1 kWp instalacji PV (kWh/rok) wg województwa. */
export const VOIVODESHIPS: { value: string; label: string; yield: number }[] = [
  { value: 'dolnoslaskie', label: 'dolnośląskie', yield: 1000 },
  { value: 'kujawsko-pomorskie', label: 'kujawsko-pomorskie', yield: 1000 },
  { value: 'lubelskie', label: 'lubelskie', yield: 1030 },
  { value: 'lubuskie', label: 'lubuskie', yield: 1010 },
  { value: 'lodzkie', label: 'łódzkie', yield: 1000 },
  { value: 'malopolskie', label: 'małopolskie', yield: 1020 },
  { value: 'mazowieckie', label: 'mazowieckie', yield: 1010 },
  { value: 'opolskie', label: 'opolskie', yield: 1020 },
  { value: 'podkarpackie', label: 'podkarpackie', yield: 1040 },
  { value: 'podlaskie', label: 'podlaskie', yield: 1010 },
  { value: 'pomorskie', label: 'pomorskie', yield: 990 },
  { value: 'slaskie', label: 'śląskie', yield: 1010 },
  { value: 'swietokrzyskie', label: 'świętokrzyskie', yield: 1020 },
  { value: 'warminsko-mazurskie', label: 'warmińsko-mazurskie', yield: 990 },
  { value: 'wielkopolskie', label: 'wielkopolskie', yield: 1010 },
  { value: 'zachodniopomorskie', label: 'zachodniopomorskie', yield: 990 },
]

const DEFAULT_YIELD = 1010

/** Dodatkowe roczne zużycie energii (kWh/rok) z tytułu dodatkowych urządzeń. */
const LOAD_HEAT_PUMP = 4000
const LOAD_EV = 2500
const LOAD_AC = 700

/** Net-billing: cena odkupu nadwyżek (RCEm 2026) z uwzględnieniem rozliczenia. */
const EXPORT_PRICE = 0.13
const EXPORT_SETTLEMENT = 0.8 // część nadwyżki realnie rozliczana

/** Autokonsumpcja (udział produkcji zużytej na miejscu). */
const SELF_BASE_WITH_STORAGE = 0.78
const SELF_BONUS_DYNAMIC = 0.08
const SELF_BONUS_EV = 0.03
const SELF_BONUS_HEAT_PUMP = 0.03
const SELF_MAX = 0.92

/** Stały zysk z inteligentnego zarządzania energią (AI/HEMS) — optymalizacja zużycia. */
const SMART_MANAGEMENT_UPLIFT = 0.05

/**
 * Taryfy dynamiczne: dodatkowy zysk z arbitrażu (ładuj tanio / korzystaj drogo).
 * Zakładamy korzystanie z taryfy dynamicznej i obecny, bardzo duży spread cenowy
 * na rynku (RDN 2026) — stąd niemal codzienny arbitraż i szeroki spread.
 */
const ARBITRAGE_CYCLES = 300 // efektywne cykle/rok (niemal codzienny arbitraż)
const ARBITRAGE_SPREAD = 0.5 // zł/kWh różnicy cen (duży spread cenowy 2026)

/** Inteligentne ładowanie EV / hybrydy plug-in w najtańszych godzinach taryfy dynamicznej. */
const EV_SMART_CHARGE_SHARE = 0.8 // udział ładowania przesuniętego w tanie godziny

/** Koszty inwestycji (brutto z montażem, ceny rynkowe 2026). */
const PV_COST_PER_KWP = 3000
const STORAGE_COST_PER_KWH = 2200
const SYSTEM_BASE_COST = 3000 // HEMS, osprzęt, integracja

/**
 * Dofinansowanie — zapowiedziany program „Przydomowe Magazyny Energii" (2026).
 * Dotacja dotyczy wyłącznie MAGAZYNU ENERGII, maksymalnie 16 000 zł.
 * Program NIE przewiduje dofinansowania do paneli fotowoltaicznych (PV).
 */
export const SUBSIDY_PROGRAM = 'Przydomowe Magazyny Energii'
const STORAGE_SUBSIDY_RATE = 0.65
const STORAGE_SUBSIDY_CAP = 16000

/** Wzrost cen energii rok do roku (do projekcji 10/20 lat). */
const ENERGY_INFLATION = 0.05

/** Emisyjność sieci (kg CO₂ na kWh, PL 2026). */
const GRID_CO2 = 0.65
const PANEL_DEGRADATION_20Y = 0.9 // uśredniony współczynnik produkcji w 20 lat

/** Dostępne (modułowe) pojemności magazynu energii (kWh). */
const STORAGE_MODULES = [5, 8, 10, 12, 16, 20, 24, 30, 40, 48]

/** Widełki mocy PV wg typu obiektu (kWp). */
const PV_RANGE: Record<ObjectType, { min: number; max: number }> = {
  dom: { min: 3, max: 20 },
  firma: { min: 5, max: 100 },
  rolne: { min: 5, max: 50 },
}

// ─────────────────────────────────────────────────────────────
// TYPY
// ─────────────────────────────────────────────────────────────

export type CalcInput = {
  monthlyBill: number // zł/mc
  annualConsumption: number // kWh/rok (0 = wylicz z rachunku)
  voivodeship: string
  objectType: ObjectType
  heatPump: boolean
  ev: boolean
  ac: boolean
  dynamicTariff: boolean
}

export type CalcResult = {
  /** Przyjęte całkowite roczne zużycie (z dodatkowymi urządzeniami). */
  totalConsumption: number
  /** Rekomendowana moc instalacji PV (kWp). */
  pvPowerKwp: number
  /** Sugerowana pojemność magazynu energii (kWh). */
  storageKwh: number
  /** Przewidywana autokonsumpcja (0–1). */
  selfConsumption: number
  /** Roczna produkcja PV (kWh). */
  pvProduction: number
  /** Roczne oszczędności (zł). */
  annualSavings: number
  /** Udział oszczędności w obecnym rachunku (0–1). */
  billReduction: number
  /** Skumulowane oszczędności w 10 i 20 lat (zł). */
  savings10y: number
  savings20y: number
  /** Orientacyjny czas zwrotu inwestycji (lata). */
  paybackYears: number
  /** Szacunkowy nakład brutto i po dotacji (zł). */
  investmentGross: number
  investmentNet: number
  subsidy: number
  /** Redukcja emisji CO₂ (kg/rok oraz w 20 lat). */
  co2PerYear: number
  co2Over20y: number
  /** Czy uwzględniono samochód elektryczny / hybrydę plug-in (do komunikatów na wynikach). */
  ev: boolean
}

// ─────────────────────────────────────────────────────────────
// POMOCNICZE
// ─────────────────────────────────────────────────────────────

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

function snapStorage(raw: number): number {
  if (raw <= STORAGE_MODULES[0]) return STORAGE_MODULES[0]
  const last = STORAGE_MODULES[STORAGE_MODULES.length - 1]
  if (raw >= last) return last
  // najbliższy moduł >= raw
  return STORAGE_MODULES.find((m) => m >= raw) ?? last
}

function getYield(voivodeship: string): number {
  return VOIVODESHIPS.find((v) => v.value === voivodeship)?.yield ?? DEFAULT_YIELD
}

/** Suma szeregu geometrycznego oszczędności z indeksacją cen energii. */
function cumulativeSavings(annual: number, years: number): number {
  const r = 1 + ENERGY_INFLATION
  return annual * ((Math.pow(r, years) - 1) / ENERGY_INFLATION)
}

// ─────────────────────────────────────────────────────────────
// GŁÓWNA FUNKCJA
// ─────────────────────────────────────────────────────────────

export function calculate(input: CalcInput): CalcResult {
  const price = PRICE[input.objectType]
  const yieldPerKwp = getYield(input.voivodeship)

  // 1. Bazowe zużycie roczne
  const baseConsumption =
    input.annualConsumption > 0 ? input.annualConsumption : (input.monthlyBill * 12) / price

  // 2. Dodatkowe odbiory (planowane lub istniejące)
  const loads =
    (input.heatPump ? LOAD_HEAT_PUMP : 0) + (input.ev ? LOAD_EV : 0) + (input.ac ? LOAD_AC : 0)

  const totalConsumption = baseConsumption + loads
  const referenceAnnualCost = totalConsumption * price // koszt całości energii z sieci

  // 3. Dobór mocy PV (pokrycie zużycia z niewielkim zapasem)
  const range = PV_RANGE[input.objectType]
  const pvRaw = (totalConsumption / yieldPerKwp) * 1.05
  const pvPowerKwp = clamp(Math.round(pvRaw * 2) / 2, range.min, range.max) // krok 0,5 kWp
  const pvProduction = pvPowerKwp * yieldPerKwp

  // 4. Dobór magazynu (pokrycie zużycia wieczorno-nocnego)
  const dailyConsumption = totalConsumption / 365
  const storageRaw = dailyConsumption * 0.6
  const storageKwh = snapStorage(storageRaw)

  // 5. Autokonsumpcja
  let selfConsumption = SELF_BASE_WITH_STORAGE
  if (input.dynamicTariff) selfConsumption += SELF_BONUS_DYNAMIC
  if (input.ev) selfConsumption += SELF_BONUS_EV
  if (input.heatPump) selfConsumption += SELF_BONUS_HEAT_PUMP
  selfConsumption = clamp(selfConsumption, 0, SELF_MAX)

  // 6. Oszczędności roczne
  const selfUsed = Math.min(pvProduction * selfConsumption, totalConsumption)
  const avoidedPurchase = selfUsed * price
  const exportKwh = Math.max(pvProduction - selfUsed, 0)
  const exportRevenue = exportKwh * EXPORT_PRICE * EXPORT_SETTLEMENT
  const arbitrage = input.dynamicTariff ? storageKwh * ARBITRAGE_CYCLES * ARBITRAGE_SPREAD : 0

  // EV / hybryda plug-in ładowana w najtańszych godzinach taryfy dynamicznej = dodatkowy zysk.
  const evArbitrage =
    input.ev && input.dynamicTariff ? LOAD_EV * EV_SMART_CHARGE_SHARE * ARBITRAGE_SPREAD : 0

  // Inteligentne zarządzanie (AI/HEMS) dokłada stały zysk z optymalizacji zużycia.
  const annualSavings =
    Math.round(
      ((avoidedPurchase + exportRevenue + arbitrage + evArbitrage) * (1 + SMART_MANAGEMENT_UPLIFT)) / 10,
    ) * 10
  const billReduction = clamp(annualSavings / referenceAnnualCost, 0, 0.95)

  // 7. Projekcja 10 / 20 lat (z indeksacją cen energii)
  const savings10y = Math.round(cumulativeSavings(annualSavings, 10) / 100) * 100
  const savings20y = Math.round(cumulativeSavings(annualSavings, 20) / 100) * 100

  // 8. Inwestycja, dofinansowanie („Przydomowe Magazyny Energii"), zwrot
  const pvCost = pvPowerKwp * PV_COST_PER_KWP
  const storageCost = storageKwh * STORAGE_COST_PER_KWH
  const investmentGross = Math.round((pvCost + storageCost + SYSTEM_BASE_COST) / 100) * 100

  // Dotacja wyłącznie na magazyn energii, maks. 16 000 zł (bez dofinansowania do PV)
  const subsidy = Math.round(Math.min(storageCost * STORAGE_SUBSIDY_RATE, STORAGE_SUBSIDY_CAP) / 100) * 100

  // Zwrot liczony PO odjęciu dofinansowania
  const investmentNet = investmentGross - subsidy
  const paybackYears = clamp(investmentNet / annualSavings, 2, 15)

  // 9. Redukcja emisji CO₂
  const co2PerYear = Math.round(pvProduction * GRID_CO2)
  const co2Over20y = Math.round(co2PerYear * 20 * PANEL_DEGRADATION_20Y)

  return {
    totalConsumption: Math.round(totalConsumption),
    pvPowerKwp,
    storageKwh,
    selfConsumption,
    pvProduction: Math.round(pvProduction),
    annualSavings,
    billReduction,
    savings10y,
    savings20y,
    paybackYears: Math.round(paybackYears * 10) / 10,
    investmentGross,
    investmentNet,
    subsidy,
    co2PerYear,
    co2Over20y,
    ev: input.ev,
  }
}

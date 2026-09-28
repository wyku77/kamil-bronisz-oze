/** Pomocnicze funkcje formatujące liczby w polskim formacie. */

export function formatPLN(value: number, decimals = 0): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/** Kwota do tekstu: „4 560 zł" — grupowanie także dla 4 cyfr (jak w licznikach) i twarda spacja przed „zł". */
export function formatZl(value: number): string {
  const n = new Intl.NumberFormat('pl-PL', {
    maximumFractionDigits: 0,
    useGrouping: 'always',
  } as unknown as Intl.NumberFormatOptions).format(value)
  return `${n} zł`
}

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

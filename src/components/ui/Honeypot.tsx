/**
 * Honeypot — najprostsza, skuteczna ochrona formularzy przed botami.
 *
 * Pole jest wyprowadzone poza ekran (klasa `.hp` w index.css), pominięte w
 * nawigacji klawiaturą i ukryte dla czytników ekranu, więc człowiek go nie
 * wypełni. Boty wypełniają wszystko, co znajdą w DOM — niepuste pole = bot.
 *
 * Nazwa pola (`botcheck`) jest zgodna z konwencją Web3Forms i z podstroną
 * „Czyste Powietrze”, żeby oba światy zachowywały się identycznie.
 *
 * Uwaga: to ochrona po stronie klienta. Pełne zabezpieczenie (rate limiting,
 * walidacja serwerowa) wymaga endpointu — patrz docs/LEAD_SYSTEM.md.
 */
export const HONEYPOT_NAME = 'botcheck'

export function Honeypot() {
  return (
    <input
      type="text"
      name={HONEYPOT_NAME}
      className="hp"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  )
}

/** Czy formularz wypełnił bot (niepuste pole-pułapka). */
export function isBotSubmit(form: EventTarget | null): boolean {
  const el = form instanceof HTMLFormElement ? form.elements.namedItem(HONEYPOT_NAME) : null
  return el instanceof HTMLInputElement && el.value.trim() !== ''
}

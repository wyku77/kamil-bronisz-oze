import { ArrowRight, Building2, Car, Gauge, Home, Snowflake, ThermometerSun, Tractor } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CalcInput, ObjectType } from '../../lib/calc'
import { VOIVODESHIPS } from '../../lib/calc'
import { formatNumber } from '../../lib/format'

type Props = {
  value: CalcInput
  onChange: (next: CalcInput) => void
  onSubmit: () => void
}

const objectTypes: { value: ObjectType; label: string; icon: LucideIcon }[] = [
  { value: 'dom', label: 'Dom', icon: Home },
  { value: 'firma', label: 'Firma', icon: Building2 },
  { value: 'rolne', label: 'Gospodarstwo', icon: Tractor },
]

const toggles: { key: keyof Pick<CalcInput, 'heatPump' | 'ev' | 'ac' | 'dynamicTariff'>; label: string; icon: LucideIcon }[] = [
  { key: 'heatPump', label: 'Pompa ciepła', icon: ThermometerSun },
  { key: 'ev', label: 'Samochód elektryczny / hybryda plug-in', icon: Car },
  { key: 'ac', label: 'Klimatyzacja', icon: Snowflake },
  { key: 'dynamicTariff', label: 'Taryfa dynamiczna', icon: Gauge },
]

export function CalculatorForm({ value, onChange, onSubmit }: Props) {
  const set = <K extends keyof CalcInput>(key: K, v: CalcInput[K]) => onChange({ ...value, [key]: v })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-7"
    >
      {/* Typ obiektu */}
      <div>
        <p className="field-label">Rodzaj obiektu</p>
        <div className="grid grid-cols-3 gap-2.5">
          {objectTypes.map((o) => {
            const active = value.objectType === o.value
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => set('objectType', o.value)}
                className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-sm font-medium transition-all ${
                  active
                    ? 'border-gold-400 bg-gold-400/10 text-gold-200 shadow-glow-gold'
                    : 'border-white/12 bg-white/[0.03] text-white/70 hover:border-white/30'
                }`}
              >
                <o.icon className="h-6 w-6" strokeWidth={1.75} />
                {o.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Rachunek miesięczny — suwak */}
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="bill" className="field-label mb-0">
            Miesięczny rachunek za prąd
          </label>
          <span className="font-display text-lg font-bold text-gold-300">
            {formatNumber(value.monthlyBill)} zł
          </span>
        </div>
        <input
          id="bill"
          type="range"
          min={50}
          max={3000}
          step={10}
          value={value.monthlyBill}
          onChange={(e) => set('monthlyBill', Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-gold-400"
        />
        <div className="mt-1 flex justify-between text-[11px] text-white/60">
          <span>50 zł</span>
          <span>3000 zł</span>
        </div>
      </div>

      {/* Roczne zużycie (opcjonalnie) + województwo */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="consumption" className="field-label">
            Roczne zużycie energii
            <span className="ml-1 font-normal text-white/60">(jeśli znasz)</span>
          </label>
          <div className="relative">
            <input
              id="consumption"
              type="number"
              min={0}
              inputMode="numeric"
              className="field pr-12"
              placeholder="np. 5000"
              value={value.annualConsumption || ''}
              onChange={(e) => set('annualConsumption', Number(e.target.value) || 0)}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/60">
              kWh
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="voivodeship" className="field-label">
            Województwo
          </label>
          <select
            id="voivodeship"
            className="field"
            value={value.voivodeship}
            onChange={(e) => set('voivodeship', e.target.value)}
          >
            {VOIVODESHIPS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dodatkowe odbiory */}
      <div>
        <p className="field-label">Co posiadasz lub planujesz? (opcjonalnie)</p>
        <div className="grid grid-cols-2 gap-2.5">
          {toggles.map((t) => {
            const active = value[t.key]
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => set(t.key, !active)}
                aria-pressed={active}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? 'border-gold-400 bg-gold-400/10 text-gold-200'
                    : 'border-white/12 bg-white/[0.03] text-white/70 hover:border-white/30'
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                    active ? 'bg-gold-400 text-ink-950' : 'bg-white/5 text-white/60'
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                </span>
                <span className="text-left leading-tight">{t.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <button type="submit" className="btn-primary group w-full">
        Oblicz oszczędności
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="text-center text-xs text-white/60">
        Wyniki są orientacyjne. Dokładne wyliczenie przygotuję podczas bezpłatnej analizy.
      </p>
    </form>
  )
}

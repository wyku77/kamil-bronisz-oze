import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calculator as CalcIcon } from 'lucide-react'
import { calculate, type CalcInput, type CalcResult } from '../../lib/calc'
import { buildLeadPayload, submitLead, type LeadContact } from '../../lib/leads'
import { track } from '../../lib/analytics'
import { Reveal } from '../ui/Reveal'
import { CalculatorForm } from './CalculatorForm'
import { LeadGate } from './LeadGate'
import { Results } from './Results'

type Stage = 'form' | 'gate' | 'results'

const defaultInput: CalcInput = {
  monthlyBill: 400,
  annualConsumption: 0,
  voivodeship: 'slaskie',
  objectType: 'dom',
  heatPump: false,
  ev: false,
  ac: false,
  dynamicTariff: true, // zakładamy z góry korzystanie z taryfy dynamicznej
}

export function Calculator() {
  const [input, setInput] = useState<CalcInput>(defaultInput)
  const [result, setResult] = useState<CalcResult | null>(null)
  const [stage, setStage] = useState<Stage>('form')
  const panelRef = useRef<HTMLDivElement>(null)

  const scrollToPanel = () => {
    // delikatne wyśrodkowanie panelu po zmianie kroku
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleCalculate = () => {
    const r = calculate(input)
    setResult(r)
    track.calculatorComplete({
      objectType: input.objectType,
      monthlyBill: input.monthlyBill,
      annualSavings: r.annualSavings,
      pvPowerKwp: r.pvPowerKwp,
      storageKwh: r.storageKwh,
    })
    setStage('gate')
    scrollToPanel()
  }

  const handleUnlock = async (contact: LeadContact) => {
    if (!result) return
    const payload = buildLeadPayload(contact, input, result, 'kalkulator')
    await submitLead(payload)
    track.leadSubmit({
      source: 'kalkulator',
      leadScore: payload.leadScore,
      leadTemperature: payload.leadTemperature,
      annualSavings: result.annualSavings,
    })
    setStage('results')
    scrollToPanel()
  }

  const handleRecalculate = () => {
    setStage('form')
    scrollToPanel()
  }

  return (
    <section id="kalkulator" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-50" />
      <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <CalcIcon className="h-3.5 w-3.5" /> Kalkulator oszczędności
          </span>
          <h2 className="mt-5 h-section text-white">Sprawdź, ile zaoszczędzisz w 60 sekund</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            Podaj kilka informacji o swoim obiekcie, a kalkulator dobierze instalację, magazyn energii i policzy Twoje
            oszczędności oraz czas zwrotu inwestycji.
          </p>
        </Reveal>

        <div ref={panelRef} className="mx-auto mt-12 max-w-5xl scroll-mt-28">
          <div className="rounded-[2rem] border border-white/10 bg-ink-950/60 p-6 shadow-card backdrop-blur-sm sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {stage === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="mx-auto max-w-2xl"
                >
                  <CalculatorForm value={input} onChange={setInput} onSubmit={handleCalculate} />
                </motion.div>
              )}

              {stage === 'gate' && result && (
                <motion.div
                  key="gate"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <LeadGate result={result} onUnlock={handleUnlock} onBack={handleRecalculate} />
                </motion.div>
              )}

              {stage === 'results' && result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <Results result={result} onRecalculate={handleRecalculate} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

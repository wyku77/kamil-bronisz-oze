import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calculator as CalcIcon } from 'lucide-react'
import { calculate, type CalcInput, type CalcResult } from '../../lib/calc'
import { buildLeadPayload, submitLead, type LeadContact, type LeadPayload } from '../../lib/leads'
import { track } from '../../lib/analytics'
import { Reveal } from '../ui/Reveal'
import { CalculatorForm } from './CalculatorForm'
import { LeadGate } from './LeadGate'
import { Results } from './Results'
import { SendFailure } from '../ui/SendFailure'

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
  const [leadName, setLeadName] = useState('')
  // Zgłoszenie z bramki, które nie dotarło — wyniki i tak pokazujemy, ale z komunikatem i ponowieniem.
  const [failedPayload, setFailedPayload] = useState<LeadPayload | null>(null)
  const [retrying, setRetrying] = useState(false)
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
    setLeadName(contact.name)
    const payload = buildLeadPayload(contact, input, result, 'kalkulator')
    const res = await submitLead(payload)
    reportSend(res.ok, payload)
    // Wyniki pokazujemy także przy błędzie wysyłki — klient podał dane i nie może na tym stracić.
    setStage('results')
    scrollToPanel()
  }

  const reportSend = (ok: boolean, payload: LeadPayload) => {
    if (ok) {
      track.leadSubmit({
        source: 'kalkulator',
        leadScore: payload.leadScore,
        leadTemperature: payload.leadTemperature,
        annualSavings: payload.annualSavings,
      })
      setFailedPayload(null)
    } else {
      track.leadError('kalkulator')
      setFailedPayload(payload)
    }
  }

  const retrySend = async () => {
    if (!failedPayload) return
    setRetrying(true)
    const res = await submitLead(failedPayload)
    setRetrying(false)
    reportSend(res.ok, failedPayload)
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
                  {failedPayload && (
                    <div className="mb-6">
                      <SendFailure
                        source="kalkulator"
                        message="Twoje wyniki są poniżej, ale Twój numer do mnie nie dotarł. Zadzwoń albo napisz — omówię je z Tobą."
                        onRetry={retrySend}
                        retrying={retrying}
                      />
                    </div>
                  )}
                  <Results result={result} input={input} name={leadName} onRecalculate={handleRecalculate} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

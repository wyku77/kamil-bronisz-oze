import { useState } from 'react'
import { ClipboardCheck, Zap } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Brands } from '../components/Brands'
import { FAQ } from '../components/FAQ'
import { Footer } from '../components/Footer'
import { FloatingActions } from '../components/FloatingActions'
import { ConsentBanner } from '../components/ConsentBanner'
import { MobileCTA } from '../components/MobileCTA'
import { DesktopCTA } from '../components/DesktopCTA'
import { cpFaq, cpFooter, cpNav, cpProducers } from '../data/cp'
import type { CpAnswers } from '../lib/leads'
import { CpHero } from './CpHero'
import { Quiz } from './Quiz'
import { Financing, Levels, CpProcess, Sources } from './Sections'
import { Realizacje } from './Realizacje'
import { CpAbout } from './CpAbout'
import { CpContact } from './CpContact'

const empty: CpAnswers = { owner: null, heat: null, insul: null, newsrc: null, when: null }

/**
 * Podstrona Czyste Powietrze — te same komponenty co strona główna (nawigacja, pasek marek, FAQ,
 * stopka, pasek kontaktu na telefonie, zgoda na cookies) + sekcje specyficzne dla programu.
 */
export default function CpApp() {
  // Odpowiedzi z quizu są wspólne z formularzem na dole strony (termin wymiany + kontekst leada).
  const [answers, setAnswers] = useState<CpAnswers>(empty)
  const setAnswer = (key: keyof CpAnswers, value: string) => setAnswers((a) => ({ ...a, [key]: value }))

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
      >
        Przejdź do treści
      </a>
      <Navbar
        items={cpNav.items}
        mobileItems={cpNav.mobileItems}
        pill={{
          href: './',
          label: 'Magazyny energii',
          mobileLabel: 'Magazyny energii — strona główna',
          icon: Zap,
          track: 'cp_navbar_magazyny',
        }}
        logoHref="./"
      />
      <main>
        <CpHero />
        <Brands id="producenci" label={cpProducers.label} items={cpProducers.items} />
        <Quiz answers={answers} setAnswer={setAnswer} />
        <Financing />
        <Sources />
        <Levels />
        <CpProcess />
        <Realizacje />
        <CpAbout />
        <FAQ data={cpFaq} />
        <CpContact answers={answers} setAnswer={setAnswer} />
      </main>
      <Footer
        about={cpFooter.about}
        items={cpNav.items}
        crossLink={{ label: 'Magazyny energii — strona główna', href: './' }}
        logoHref="./"
        disclaimer={cpFooter.disclaimer}
      />
      <FloatingActions />
      <ConsentBanner />
      <MobileCTA
        secondary={{ href: '#kwalifikacja', label: 'Sprawdź dotację', icon: ClipboardCheck, track: 'cp_mobilebar_quiz' }}
      />
      <DesktopCTA />
    </>
  )
}

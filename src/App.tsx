import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { SectionCTA } from './components/SectionCTA'
import { EnergyStorage } from './components/EnergyStorage'
import { Process } from './components/Process'
import { About } from './components/About'
import { ServiceArea } from './components/ServiceArea'
import { Approach } from './components/Approach'
import { Calculator } from './components/calculator/Calculator'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { LeadMagnet } from './components/LeadMagnet'
import { FinalCTA } from './components/FinalCTA'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { FloatingActions } from './components/FloatingActions'
import { ExitIntent } from './components/ExitIntent'
import { ConsentBanner } from './components/ConsentBanner'
import { MobileCTA } from './components/MobileCTA'
import { SubsidyDeadline } from './components/SubsidyDeadline'
import { Brands } from './components/Brands'
import { sectionCtas } from './data/content'

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
      >
        Przejdź do treści
      </a>
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <SubsidyDeadline />
        <Benefits />
        <SectionCTA {...sectionCtas.afterBenefits} />
        <EnergyStorage />
        <Process />
        <About />
        <ServiceArea />
        <Approach />
        <Calculator />
        <Testimonials />
        <SectionCTA {...sectionCtas.afterTestimonials} />
        <FAQ />
        <LeadMagnet />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <ExitIntent />
      <ConsentBanner />
      <MobileCTA />
    </>
  )
}

import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { SectionCTA } from './components/SectionCTA'
import { EnergyStorage } from './components/EnergyStorage'
import { Process } from './components/Process'
import { About } from './components/About'
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
import { sectionCtas } from './data/content'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <SectionCTA {...sectionCtas.afterBenefits} />
        <EnergyStorage />
        <Process />
        <About />
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
    </>
  )
}

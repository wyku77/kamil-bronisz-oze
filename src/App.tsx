import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { Process } from './components/Process'
import { About } from './components/About'
import { Calculator } from './components/calculator/Calculator'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { FloatingActions } from './components/FloatingActions'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Process />
        <About />
        <Calculator />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}

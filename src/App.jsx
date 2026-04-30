import { useEffect, useState } from 'react'
import AgeGate from './components/AgeGate.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Diagnostic from './components/Diagnostic.jsx'
import Testimonials from './components/Testimonials.jsx'
import Method from './components/Method.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

const AGE_KEY = 'sschopp:age-verified'

export default function App() {
  const [verified, setVerified] = useState(false)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(AGE_KEY) === '1') setVerified(true)
  }, [])

  const handleConfirm = () => {
    localStorage.setItem(AGE_KEY, '1')
    setVerified(true)
  }

  const handleDeny = () => setDenied(true)

  if (denied) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-lg">
          <p className="label-eyebrow justify-center">Acesso restrito</p>
          <h1 className="display text-5xl md:text-6xl text-foam-50 mt-4">
            Volte quando completar 18 anos.
          </h1>
          <p className="mt-6 text-foam-50/60 leading-relaxed">
            A venda de bebidas alcoólicas é proibida para menores de 18 anos
            (Lei nº 13.106/2015). Se beber, não dirija.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {!verified && <AgeGate onConfirm={handleConfirm} onDeny={handleDeny} />}
      <div aria-hidden={!verified} className={!verified ? 'pointer-events-none blur-sm' : ''}>
        <Header />
        <main>
          <Hero />
          <About />
          <Diagnostic />
          <Testimonials />
          <Method />
          <ContactForm />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}

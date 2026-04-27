import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { buildWhatsAppUrl } from '../lib/constants.js'

const NAV = [
  { href: '#sobre', label: 'Quem Somos' },
  { href: '#diagnostico', label: 'Como Ajudamos' },
  { href: '#depoimentos', label: 'Clientes' },
  { href: '#metodo', label: 'Como Funciona' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/85 backdrop-blur-md border-b border-amber-400/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between py-5">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="SS Chopp" className="h-10 w-auto" />
          <span className="hidden sm:block display text-xl tracking-wide text-foam-50 group-hover:text-amber-300 transition-colors">
            SS CHOPP
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-foam-50/70 hover:text-amber-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary py-3 px-5 text-xs">
            Pedir Orçamento
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-foam-50"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink-900 border-t border-amber-400/10">
          <nav className="container-wide flex flex-col py-6 gap-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-foam-50/80 hover:text-amber-300 py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3"
            >
              Pedir Orçamento
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

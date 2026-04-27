import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS, buildWhatsAppUrl } from '../lib/constants.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-ink-950 border-t border-foam-50/10 grain-overlay">
      <div className="container-wide py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="SS Chopp" className="h-12 w-auto" />
              <span className="display text-2xl text-foam-50">SS CHOPP</span>
            </div>
            <p className="mt-5 text-foam-50/60 text-sm leading-relaxed max-w-md">
              Chopeiras de última geração e barris premium entregues na sua
              porta. Da reunião entre amigos à festa inesquecível, a SS Chopp
              cuida de tudo.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 flex items-center justify-center border border-foam-50/15 text-foam-50/70 hover:border-amber-300 hover:text-amber-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="h-11 w-11 flex items-center justify-center border border-foam-50/15 text-foam-50/70 hover:border-amber-300 hover:text-amber-300 transition-colors"
                aria-label="E-mail"
              >
                <Mail size={17} />
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 flex items-center justify-center border border-foam-50/15 text-foam-50/70 hover:border-amber-300 hover:text-amber-300 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={17} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300 font-bold mb-5">
              Navegação
            </p>
            <ul className="space-y-3 text-sm text-foam-50/70">
              <li><a href="#sobre" className="hover:text-amber-300 transition">Quem Somos</a></li>
              <li><a href="#diagnostico" className="hover:text-amber-300 transition">Como Ajudamos</a></li>
              <li><a href="#depoimentos" className="hover:text-amber-300 transition">Cases</a></li>
              <li><a href="#metodo" className="hover:text-amber-300 transition">Como Funciona</a></li>
              <li><a href="#contato" className="hover:text-amber-300 transition">Pedir Orçamento</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300 font-bold mb-5">
              Contato
            </p>
            <ul className="space-y-4 text-sm text-foam-50/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-300 mt-0.5 shrink-0" />
                {BUSINESS.city}
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-amber-300 mt-0.5 shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-amber-300">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-amber-300 mt-0.5 shrink-0" />
                <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">
                  WhatsApp · Atendimento rápido
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-foam-50/10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.22em] text-foam-50/40 text-center md:text-left">
            © {year} {BUSINESS.name} · Todos os direitos reservados
          </p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber-300/70 font-bold text-center md:text-right">
            Beba com moderação · Proibida a venda para menores de 18 anos
          </p>
        </div>
      </div>
    </footer>
  )
}

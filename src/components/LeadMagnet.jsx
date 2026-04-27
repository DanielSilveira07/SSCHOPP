import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Check, BookOpen, Percent } from 'lucide-react'
import { asset } from '../lib/assets.js'

const PERKS = [
  { icon: Percent, label: '10% OFF na primeira contratação' },
  { icon: BookOpen, label: 'Guia: "Quanto Chopp por Pessoa?"' },
  { icon: Gift, label: 'Brinde surpresa no dia da entrega' },
]

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: integrar com seu CRM / serviço de email (Mailchimp, RD Station, etc.)
    console.log('Lead capturado:', email)
    setDone(true)
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Photo backdrop with heavy overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset('/photos/photo-5.jpg')})` }}
        />
        <div className="absolute inset-0 bg-ink-950/85" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(212,136,31,0.3), transparent 70%)',
          }}
        />
      </div>

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-10 items-center bg-ink-900/85 backdrop-blur-md border border-amber-300/20 grain-overlay p-8 md:p-14"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-300/30 px-3 py-1.5 mb-6">
              <Gift size={14} className="text-amber-300" />
              <span className="text-[10px] uppercase tracking-[0.24em] text-amber-300 font-bold">
                Oferta exclusiva · Por tempo limitado
              </span>
            </div>

            <h2 className="display text-4xl md:text-6xl text-foam-50 leading-[0.92]">
              Ganhe <span className="text-amber-300">10% OFF</span>
              <br />
              + brindes na sua
              <br />
              primeira festa.
            </h2>

            <p className="mt-6 text-foam-50/70 leading-relaxed max-w-md">
              Deixe seu e-mail e enviamos o cupom + um guia prático para
              calcular a quantidade certa de chopp na sua próxima comemoração.
            </p>

            <ul className="mt-7 space-y-3">
              {PERKS.map((perk, i) => {
                const Icon = perk.icon
                return (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 flex items-center justify-center bg-amber-400 text-ink-950">
                      <Icon size={14} strokeWidth={2.4} />
                    </div>
                    <span className="text-sm text-foam-50/85">{perk.label}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="lg:col-span-5">
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-amber-400/10 border border-amber-300/40 p-8 text-center"
              >
                <div className="mx-auto h-14 w-14 rounded-full bg-amber-400 flex items-center justify-center text-ink-950">
                  <Check size={26} strokeWidth={3} />
                </div>
                <h3 className="display text-3xl text-foam-50 mt-5">Pronto!</h3>
                <p className="mt-3 text-foam-50/70 text-sm">
                  Seu cupom de 10% OFF e o guia foram enviados para
                  <span className="text-amber-300 font-semibold"> {email}</span>.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="bg-ink-800/60 border border-foam-50/10 p-7 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.24em] text-foam-50/55 mb-6">
                  É rápido — só seu e-mail
                </p>
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field-input text-base"
                />
                <button type="submit" className="btn-primary w-full mt-6">
                  Quero Meu Cupom
                </button>
                <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-foam-50/40 text-center">
                  Sem spam. Cancele quando quiser.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

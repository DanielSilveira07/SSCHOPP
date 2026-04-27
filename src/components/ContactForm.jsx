import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Send } from 'lucide-react'
import { buildWhatsAppUrl } from '../lib/constants.js'
import { asset } from '../lib/assets.js'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    neighborhood: '',
    when: '',
  })
  const [done, setDone] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: integrar com backend / serviço de email
    console.log('Lead orçamento:', form)
    setDone(true)
  }

  return (
    <section id="contato" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset('/photos/photo-7.jpg')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/95 to-ink-950" />
      </div>

      <div className="container-wide relative grid lg:grid-cols-12 gap-12 items-start">
        {/* LEFT: copy */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <p className="label-eyebrow">Vamos juntos</p>
          <h2 className="display mt-4 text-5xl md:text-7xl text-foam-50 leading-[0.92]">
            Bora trazer
            <br />
            <span className="text-amber-300">chopp de qualidade</span>
            <br />
            pra sua festa?
          </h2>
          <p className="mt-6 text-foam-50/65 leading-relaxed max-w-md">
            Preencha seus dados e entraremos em contato em até{' '}
            <span className="text-amber-300 font-semibold">24 horas</span> com
            as melhores opções para sua festa.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Comprar pelo WhatsApp
            </a>
            <p className="text-[11px] uppercase tracking-[0.22em] text-foam-50/40 text-center">
              Prefere falar direto? A gente atende rapidinho.
            </p>
          </div>
        </div>

        {/* RIGHT: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          {done ? (
            <div className="bg-ink-900 border border-amber-300/30 grain-overlay p-12 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-amber-400 flex items-center justify-center text-ink-950">
                <Check size={36} strokeWidth={3} />
              </div>
              <h3 className="display text-4xl md:text-5xl text-foam-50 mt-6">
                Recebemos seu pedido!
              </h3>
              <p className="mt-4 text-foam-50/70 leading-relaxed max-w-md mx-auto">
                Em até 24 horas você receberá nossa proposta personalizada em{' '}
                <span className="text-amber-300">{form.email}</span>. Enquanto
                isso, que tal já entrar no nosso WhatsApp?
              </p>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-8"
              >
                Falar agora
              </a>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-ink-900/80 backdrop-blur-md border border-foam-50/10 grain-overlay p-8 md:p-12"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300 font-bold mb-2">
                Formulário · Orçamento gratuito
              </p>
              <h3 className="display text-3xl md:text-4xl text-foam-50">
                Conte sobre sua festa
              </h3>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="field-label">Seu Nome</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Como podemos te chamar?"
                    value={form.name}
                    onChange={update('name')}
                    className="field-input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="field-label">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={update('email')}
                    className="field-input"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="field-label">Telefone / WhatsApp</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={form.phone}
                    onChange={update('phone')}
                    className="field-input"
                  />
                </div>

                <div>
                  <label htmlFor="neighborhood" className="field-label">Bairro</label>
                  <input
                    id="neighborhood"
                    type="text"
                    required
                    placeholder="Onde será a festa?"
                    value={form.neighborhood}
                    onChange={update('neighborhood')}
                    className="field-input"
                  />
                </div>

                <div>
                  <label htmlFor="when" className="field-label">Quando precisa?</label>
                  <input
                    id="when"
                    type="text"
                    required
                    placeholder="Ex.: 15/05/2026 às 18h"
                    value={form.when}
                    onChange={update('when')}
                    className="field-input"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary mt-10 w-full md:w-auto group">
                Enviar pedido
                <Send size={15} className="transition-transform group-hover:translate-x-1" />
              </button>

              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-foam-50/40">
                Resposta em até 24h · Suas informações ficam só com a gente
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

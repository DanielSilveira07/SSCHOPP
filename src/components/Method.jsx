import { motion } from 'framer-motion'
import { MessageSquare, ClipboardCheck, Truck, Beer } from 'lucide-react'

const STEPS = [
  {
    icon: MessageSquare,
    title: 'Você Pede',
    body: 'Conte sobre sua festa pelo WhatsApp ou formulário. Em até 24h, mandamos a melhor proposta.',
  },
  {
    icon: ClipboardCheck,
    title: 'A Gente Cuida',
    body: 'Confirmamos data, horário e quantidade. Você relaxa enquanto preparamos tudo nos mínimos detalhes.',
  },
  {
    icon: Truck,
    title: 'Nós Entregamos',
    body: 'Chopeira moderna + barril gelado entregues e instalados no horário combinado. Pontualidade britânica.',
  },
  {
    icon: Beer,
    title: 'Você Aproveita',
    body: 'Seus convidados elogiam a qualidade. Você curte sua festa. A SS Chopp recolhe quando acabar.',
  },
]

export default function Method() {
  return (
    <section
      id="metodo"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #08070a 0%, #1a1410 50%, #08070a 100%)',
      }}
    >
      <div className="absolute inset-0 grain-overlay opacity-50 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(212,136,31,0.15), transparent 60%)',
        }}
      />

      <div className="container-wide relative">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="label-eyebrow justify-center">Método SS Chopp</p>
          <h2 className="display mt-4 text-5xl md:text-7xl text-foam-50">
            Em <span className="text-amber-300">4 passos</span>,
            <br />
            seu chopp tá na festa.
          </h2>
          <p className="mt-6 text-foam-50/65 leading-relaxed">
            Um processo enxuto, sem burocracia, pensado para que você só precise
            se preocupar em chamar os amigos.
          </p>
        </div>

        {/* Connecting line */}
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative text-center"
                >
                  {/* Numbered circle */}
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-amber-400/20 blur-xl" />
                    <div className="relative h-24 w-24 rounded-full bg-ink-900 border border-amber-300/30 flex items-center justify-center mx-auto group hover:border-amber-300 transition-colors">
                      <Icon size={28} className="text-amber-300" strokeWidth={1.6} />
                      <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-amber-400 text-ink-950 flex items-center justify-center text-xs font-black">
                        0{i + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="display text-3xl md:text-4xl text-foam-50 mt-7">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-foam-50/65 text-sm leading-relaxed max-w-[260px] mx-auto">
                    {step.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

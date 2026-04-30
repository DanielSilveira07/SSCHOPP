import { motion } from 'framer-motion'
import { Truck, Snowflake, PartyPopper } from 'lucide-react'
import { asset } from '../lib/assets.js'

const CARDS = [
  {
    icon: Truck,
    title: 'Chega Rapidinho',
    body: 'Receba sua chopeira e barril no prazo combinado. Sem atrasos, sem surpresas.',
    photo: asset('/photos/photo-5.jpg'),
  },
  {
    icon: Snowflake,
    title: 'Sempre Gelado e Fresco',
    body: 'Barris de primeira qualidade e equipamentos de última geração para o melhor sabor.',
    photo: asset('/photos/photo-6.jpg'),
  },
  {
    icon: PartyPopper,
    title: 'Você Aproveita a Festa',
    body: 'Tudo chega pronto e seguro. Aproveite seu momento — a gente cuida da logística.',
    photo: asset('/photos/photo-7.jpg'),
  },
]

export default function About() {
  return (
    <section id="sobre" className="relative py-16 sm:py-28 md:py-36 grain-overlay">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-7">
            <p className="label-eyebrow">O que somos</p>
            <h2 className="display mt-4 text-3xl sm:text-5xl md:text-7xl text-foam-50 leading-[0.92]">
              A SS Chopp <span className="text-amber-300">cuida de tudo</span>
              <br />
              para sua festa.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="text-foam-50/65 leading-relaxed">
              Trazemos a melhor experiência de chopp até você. Desde uma reunião
              entre amigos até uma festa inesquecível, contamos com chopeiras
              modernas e barris sempre frescos. Aproveite o conforto de não se
              preocupar com nada — a gente cuida de tudo.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative overflow-hidden border border-foam-50/10 hover:border-amber-300/40 transition-all duration-500 bg-ink-900"
              >
                {/* Photo top */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${card.photo})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                  <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center bg-amber-400 text-ink-950 transition-transform group-hover:rotate-12">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <div className="absolute bottom-4 left-4 display text-3xl text-foam-50">
                    0{i + 1}
                  </div>
                </div>

                <div className="p-7 md:p-8">
                  <h3 className="display text-2xl md:text-3xl text-foam-50 group-hover:text-amber-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-foam-50/65 text-sm leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

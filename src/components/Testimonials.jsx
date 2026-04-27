import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { asset } from '../lib/assets.js'

const REVIEWS = [
  {
    quote:
      'Meus amigos pediram o contato de vocês. Recomendo demais! O chopp estava sempre gelado, perfeito do começo ao fim da festa.',
    name: 'Paulo Henrique',
    role: 'Aniversário 30 anos',
    photo: asset('/photos/photo-1.jpg'),
  },
  {
    quote:
      'Simples, confiável e delicioso. Voltaria a contratar mil vezes! A equipe chegou no horário e montou tudo num piscar de olhos.',
    name: 'Mariana Costa',
    role: 'Confraternização da empresa',
    photo: asset('/photos/photo-4.jpg'),
  },
  {
    quote:
      'Vocês transformaram nossa formatura em algo inesquecível! Chopeira moderna, barris caprichados, atendimento de outro nível.',
    name: 'Lucas Almeida',
    role: 'Formatura · 22 anos',
    photo: asset('/photos/photo-8.jpg'),
  },
  {
    quote:
      'Atendimento impecável e qualidade incrível. Foi a primeira vez que eu não me preocupei com nada na minha festa.',
    name: 'Rafaela Souza',
    role: 'Casamento ao ar livre',
    photo: asset('/photos/photo-3.jpg'),
  },
  {
    quote:
      'O chopp ficou na temperatura perfeita o evento todo. Já marcamos o próximo. Indispensável.',
    name: 'Bruno Tavares',
    role: 'Churrasco corporativo',
    photo: asset('/photos/photo-6.jpg'),
  },
  {
    quote:
      'Profissionalismo do início ao fim. A chopeira fez sucesso e os convidados não pararam de elogiar a qualidade.',
    name: 'Juliana Mendes',
    role: 'Reunião de família',
    photo: asset('/photos/photo-9.jpg'),
  },
]

const Stars = ({ size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} className="fill-amber-300 text-amber-300" />
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-28 md:py-36 grain-overlay">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <p className="label-eyebrow">Cases · Quem viveu, conta</p>
            <h2 className="display mt-4 text-5xl md:text-7xl text-foam-50 leading-[0.92]">
              Festas que viraram
              <br />
              <span className="text-amber-300">memórias inesquecíveis.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <div className="flex items-center gap-4">
              <div className="display text-7xl md:text-8xl text-amber-300">5.0</div>
              <div>
                <Stars size={18} />
                <p className="mt-1.5 text-xs uppercase tracking-[0.22em] text-foam-50/55">
                  Média baseada em<br />+500 eventos atendidos
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="relative bg-ink-900 border border-foam-50/10 hover:border-amber-300/40 p-7 md:p-8 transition-all duration-500 group"
            >
              <Quote
                size={28}
                className="text-amber-300/30 group-hover:text-amber-300/60 transition-colors mb-4"
              />
              <Stars />
              <blockquote className="mt-4 text-foam-50/85 leading-relaxed text-[15px]">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-7 pt-5 border-t border-foam-50/10 flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-full bg-cover bg-center border border-amber-300/20"
                  style={{ backgroundImage: `url(${r.photo})` }}
                />
                <div>
                  <p className="text-sm font-bold text-foam-50">{r.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-foam-50/45 mt-0.5">
                    {r.role}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ITEMS = [
  {
    problem: 'Montar estrutura de chopp é chato e estraga a diversão',
    solution: 'A gente monta e gerencia tudo pra você só aproveitar',
  },
  {
    problem: 'Chopp quente ou de má qualidade estraga a festa',
    solution: 'Equipamentos de última geração + barris premium = festa garantida',
  },
  {
    problem: 'Medo de atrasos ou falta de produto na hora H',
    solution: 'Entrega no dia/horário combinado + suporte em tempo real',
  },
]

export default function Diagnostic() {
  return (
    <section
      id="diagnostico"
      className="relative py-28 md:py-36 bg-ink-900 grain-overlay overflow-hidden"
    >
      {/* Decorative typographic backdrop */}
      <div
        aria-hidden
        className="absolute -top-10 left-0 right-0 display text-foam-50/[0.025] text-[clamp(8rem,18vw,16rem)] leading-none whitespace-nowrap select-none pointer-events-none"
      >
        ANTES & DEPOIS
      </div>

      <div className="container-narrow relative">
        <div className="text-center mb-20">
          <p className="label-eyebrow justify-center">Diagnóstico</p>
          <h2 className="display mt-4 text-5xl md:text-7xl text-foam-50">
            O que <span className="text-amber-300">resolvemos</span>
            <br />
            para você.
          </h2>
        </div>

        <ul className="space-y-6 md:space-y-8">
          {ITEMS.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grid md:grid-cols-[auto_1fr_auto_1fr] gap-4 md:gap-8 items-stretch md:items-center group"
            >
              {/* Number */}
              <div className="display text-4xl md:text-6xl text-amber-300/30 group-hover:text-amber-300 transition-colors w-16 md:w-20">
                0{i + 1}
              </div>

              {/* Problem */}
              <div className="border-l-2 border-burgundy-500 pl-5 md:pl-7 py-3">
                <p className="text-[10px] uppercase tracking-[0.28em] text-burgundy-500 font-bold mb-2">
                  Problema
                </p>
                <p className="text-base md:text-lg text-foam-50/80 leading-snug">
                  {item.problem}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-amber-400">
                <ArrowRight size={32} strokeWidth={1.5} />
              </div>

              {/* Solution */}
              <div className="border-l-2 border-amber-400 pl-5 md:pl-7 py-3 bg-gradient-to-r from-amber-400/[0.04] to-transparent">
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-300 font-bold mb-2">
                  Como resolvemos
                </p>
                <p className="text-base md:text-lg text-foam-50 leading-snug font-medium">
                  {item.solution}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

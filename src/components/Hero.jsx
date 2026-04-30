import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { buildWhatsAppUrl } from '../lib/constants.js'
import { asset } from '../lib/assets.js'

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden grain-overlay">
      {/* Atmospheric backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset('/photos/photo-2.jpg')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse at 70% 50%, rgba(212,136,31,0.2), transparent 60%)',
          }}
        />
      </div>

      <div className="container-wide relative z-10 grid lg:grid-cols-12 gap-10 items-center min-h-[calc(100vh-7rem)]">
        {/* LEFT: copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="label-eyebrow">SS Chopp · Eventos & Festas</span>
            </div>

            <h1 className="display text-[clamp(2rem,8vw,7.5rem)] text-foam-50 leading-[0.9]">
              Chopp gelado
              <br />
              <span className="text-amber-300">na sua porta,</span>
              <br />
              <span className="text-foam-50/90">sem preocupações.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg text-foam-50/70 leading-relaxed"
            >
              Chopeiras de última geração e barris premium entregues no horário
              combinado. Da reunião entre amigos à festa inesquecível —{' '}
              <span className="text-amber-200">a gente cuida de tudo.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a href="#contato" className="btn-primary group">
                Pedir orçamento
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
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
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 flex items-center gap-5 border-t border-foam-50/10 pt-6"
            >
              <div className="flex">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-ink-950 -ml-2 first:ml-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${asset(`/photos/photo-${i + 4}.jpg`)})`,
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-300 text-amber-300" />
                  ))}
                  <span className="ml-1.5 text-xs font-bold text-foam-50">5.0</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-foam-50/55 mt-0.5">
                  +5000 eventos atendidos
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT: floating product card */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-tr from-amber-400/30 to-transparent blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden border border-amber-300/20">
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${asset('/photos/photo-1.jpg')})`,
                  backgroundSize: '200%', // ← altere: 100% normal, 120% zoom +20%, 150% zoom +50%
                  backgroundPosition: '55% bottom', // ← posição: 'center top', 'center 50%', '50% 30%'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              {/* Sticker */}
              <div className="absolute top-5 left-5 bg-amber-400 text-ink-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em]">
                Premium
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="display text-3xl text-foam-50">Chopeiras &<br />Barris Premium</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-foam-50/60">
                  10L · 20L · 30L · 50L
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

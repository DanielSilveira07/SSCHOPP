import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { asset } from '../lib/assets.js'

export default function AgeGate({ onConfirm, onDeny }) {
  return (
    <AnimatePresence>
      <motion.div
        key="age-gate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-6"
        aria-modal="true"
        role="dialog"
        aria-labelledby="age-title"
      >
        {/* Backdrop with photo + amber gradient mesh */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${asset('/photos/photo-3.jpg')})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/90 via-ink-950/85 to-ink-950/95" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(212,136,31,0.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(139,30,43,0.2), transparent 50%)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 w-full max-w-xl bg-ink-900 border border-amber-400/15 grain-overlay"
        >
          {/* Top amber stripe */}
          <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

          <div className="px-8 md:px-12 py-10 md:py-14">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10 border border-amber-400/30">
                <AlertTriangle className="h-7 w-7 text-amber-300" strokeWidth={1.6} />
              </div>

              <p className="label-eyebrow">Verificação de idade</p>

              <h2 id="age-title" className="display mt-4 text-4xl md:text-5xl text-foam-50">
                Você tem mais de
                <br />
                <span className="text-amber-300">18 anos?</span>
              </h2>

              <p className="mt-5 max-w-md text-sm md:text-base text-foam-50/65 leading-relaxed">
                Este site oferece bebidas alcoólicas. A venda é proibida para
                menores de 18 anos (Lei nº 13.106/2015).
              </p>

              <div className="mt-9 flex w-full flex-col-reverse sm:flex-row gap-3 justify-center">
                <button
                  onClick={onDeny}
                  className="btn-ghost flex-1 sm:flex-none sm:px-10"
                >
                  Não, sou menor
                </button>
                <button
                  onClick={onConfirm}
                  className="btn-primary flex-1 sm:flex-none sm:px-10"
                >
                  Sim, tenho 18+
                </button>
              </div>

              <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-foam-50/40">
                Beba com moderação · Se beber, não dirija
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

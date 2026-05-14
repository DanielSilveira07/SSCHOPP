import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, Play, Pause, Mic } from 'lucide-react'
import { asset } from '../lib/assets.js'

const Stars = ({ size = 14, rating = 5 }) => {
  const full = Math.floor(rating)
  const fraction = rating - full
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i < full)
          return <Star key={i} size={size} className="fill-amber-300 text-amber-300" />
        if (i === full && fraction > 0)
          return (
            <div key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="text-amber-300/25 absolute inset-0" />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fraction * 100}%` }}>
                <Star size={size} className="fill-amber-300 text-amber-300 block" />
              </div>
            </div>
          )
        return <Star key={i} size={size} className="text-amber-300/25" />
      })}
    </div>
  )
}

const fmtTime = (s) => {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

function AudioFeedback({ src, name, role, delay = 0, startAt = 0 }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCurrent(a.currentTime)
    const onMeta = () => {
      setDuration(a.duration || 0)
      if (startAt > 0 && a.currentTime < startAt) {
        a.currentTime = startAt
        setCurrent(startAt)
      }
    }
    const onEnd = () => setIsPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnd)
    }
  }, [startAt])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (isPlaying) {
      a.pause()
      setIsPlaying(false)
    } else {
      if (a.currentTime < startAt || a.ended) a.currentTime = startAt
      a.play()
      setIsPlaying(true)
    }
  }

  // Trecho visível = (duration - startAt). Posição lógica = (current - startAt).
  const visibleDuration = Math.max(0, duration - startAt)
  const visibleCurrent = Math.max(0, current - startAt)

  const seek = (e) => {
    const a = audioRef.current
    if (!a || !visibleDuration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    a.currentTime = startAt + pct * visibleDuration
    setCurrent(a.currentTime)
  }

  const progress = visibleDuration ? (visibleCurrent / visibleDuration) * 100 : 0

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-ink-900 border border-foam-50/10 hover:border-amber-300/40 hover:-translate-y-2 hover:shadow-[0_16px_40px_-12px_rgba(245,203,25,0.15)] p-7 md:p-8 transition-all duration-500 group flex flex-col"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-9 w-9 rounded-full bg-amber-300/10 border border-amber-300/30 flex items-center justify-center">
          <Mic size={15} className="text-amber-300" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-amber-300">
          Áudio · Cliente
        </span>
      </div>

      <Stars />

      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Player customizado */}
      <div className="mt-5 relative bg-gradient-to-br from-ink-950/80 via-ink-950/60 to-ink-950/30 border border-foam-50/[0.07] p-4 overflow-hidden">
        {/* Glow ambiente atrás do botão play — intensifica enquanto toca */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-amber-400/30 blur-3xl transition-opacity duration-700 ${
            isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
          }`}
        />

        <div className="relative flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            className={`shrink-0 relative h-12 w-12 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 text-ink-950 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_6px_18px_-4px_rgba(245,203,25,0.55),inset_0_1px_0_rgba(255,255,255,0.4)] ${
              isPlaying ? 'animate-pulse-amber' : ''
            }`}
          >
            {isPlaying
              ? <Pause size={18} fill="currentColor" strokeWidth={0} />
              : <Play size={18} fill="currentColor" strokeWidth={0} className="ml-0.5" />}
          </button>

          <div className="flex-1 min-w-0">
            {/* Waveform com pills — bordas totalmente arredondadas */}
            <div
              onClick={seek}
              className="relative h-10 flex items-center gap-[3px] cursor-pointer group/wave"
              role="slider"
              aria-label="Linha do tempo"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {[...Array(28)].map((_, i) => {
                const barProgress = ((i + 1) / 28) * 100
                const active = barProgress <= progress
                const heights = [40, 65, 30, 80, 55, 45, 90, 35, 60, 50, 75, 40, 55, 70, 45, 85, 60, 30, 70, 50, 65, 40, 55, 80, 45, 60, 35, 70]
                const h = heights[i] || 50
                return (
                  <div
                    key={i}
                    className={`relative flex-1 rounded-full transition-[background,box-shadow] duration-500 ${
                      active
                        ? 'bg-gradient-to-t from-amber-400 via-amber-300 to-amber-200 shadow-[0_0_10px_-2px_rgba(245,203,25,0.45)]'
                        : 'bg-foam-50/15 group-hover/wave:bg-foam-50/25'
                    } ${isPlaying && active ? 'animate-wave-pulse' : ''}`}
                    style={{
                      height: `${h}%`,
                      animationDelay: isPlaying && active ? `${i * 0.045}s` : undefined,
                    }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-2 text-[10px] uppercase tracking-[0.2em] font-semibold tabular-nums">
              <span className={`transition-colors duration-300 ${isPlaying ? 'text-amber-300' : 'text-foam-50/55'}`}>
                {fmtTime(visibleCurrent)}
              </span>
              <span className="text-foam-50/35">{fmtTime(visibleDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-7 pt-5 border-t border-foam-50/10">
        <p className="text-sm font-bold text-foam-50">{name}</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-foam-50/45 mt-0.5">
          {role}
        </p>
      </figcaption>
    </motion.figure>
  )
}

function TextFeedback({ name, role, quote, delay = 0 }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-ink-900 border border-foam-50/10 hover:border-amber-300/40 hover:-translate-y-2 hover:shadow-[0_16px_40px_-12px_rgba(245,203,25,0.15)] p-7 md:p-8 transition-all duration-500 group flex flex-col"
    >
      <Quote
        size={28}
        className="text-amber-300/30 group-hover:text-amber-300/60 transition-colors mb-4"
      />
      <Stars />
      <blockquote className="mt-4 text-foam-50/85 leading-relaxed text-[15px]">
        “{quote}”
      </blockquote>
      <figcaption className="mt-7 pt-5 border-t border-foam-50/10">
        <p className="text-sm font-bold text-foam-50">{name}</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-foam-50/45 mt-0.5">
          {role}
        </p>
      </figcaption>
    </motion.figure>
  )
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-16 sm:py-28 md:py-36 grain-overlay">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <p className="label-eyebrow">Cases · Quem viveu, conta</p>
            <h2 className="display mt-4 text-3xl sm:text-5xl md:text-7xl text-foam-50 leading-[0.92]">
              Festas que viraram
              <br />
              <span className="text-amber-300">memórias inesquecíveis.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <div className="flex items-center gap-4">
              <div className="display text-5xl sm:text-7xl md:text-8xl text-amber-300">4.8</div>
              <div>
                <Stars size={18} rating={4.8} />
                <p className="mt-1.5 text-xs uppercase tracking-[0.22em] text-foam-50/55">
                  +5000 eventos<br />atendidos
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AudioFeedback
            src={asset('/feedbacks/feedback-audio-1.ogg')}
            name="Cliente verificado"
            role="Áudio enviado no WhatsApp"
            delay={0}
          />
          <AudioFeedback
            src={asset('/feedbacks/feedback-audio-2.ogg')}
            name="Cliente verificado"
            role="Áudio enviado no WhatsApp"
            delay={0.1}
            startAt={16}
          />
          <TextFeedback
            name="Jonatas"
            role="Conversa no WhatsApp"
            quote="Sem palavras, como sempre. Vocês são os melhores, muito obrigado!"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}

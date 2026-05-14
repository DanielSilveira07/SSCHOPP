import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Send, Loader2, MapPin } from 'lucide-react'
import { buildWhatsAppUrl } from '../lib/constants.js'
import { asset } from '../lib/assets.js'

const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzbr41nBVRdJpkXLlggldr24PAqM3OYQndhJjOAJghjZPXDK3eSRMAk2yGUaxH3cj8E/exec'

const onlyDigits = (s) => s.replace(/\D/g, '')

const formatCep = (raw) => {
  const d = onlyDigits(raw).slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

const formatPhone = (raw) => {
  const d = onlyDigits(raw).slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

// Converte "2026-05-15" -> "15/05/2026"
const formatDateBR = (iso) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return y && m && d ? `${d}/${m}/${y}` : ''
}

// Converte "18:00" -> "18h"  |  "18:30" -> "18h30"
const formatTimeBR = (t) => {
  if (!t) return ''
  const [h, m] = t.split(':')
  if (!h) return ''
  return m === '00' || !m ? `${h}h` : `${h}h${m}`
}

export default function ContactForm() {
  const formRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [done, setDone] = useState(false)
  const [doneEmail, setDoneEmail] = useState('')

  const [cep, setCep] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [cepLoading, setCepLoading] = useState(false)
  const [cepError, setCepError] = useState('')

  const lookupCep = async () => {
    const digits = onlyDigits(cep)
    if (digits.length !== 8) return
    setCepLoading(true)
    setCepError('')
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      const data = await res.json()
      if (data.erro) {
        setCepError('CEP não encontrado.')
        return
      }
      setStreet(data.logradouro || '')
      setNeighborhood(data.bairro || '')
      setCity(data.localidade || '')
      setState(data.uf || '')
    } catch {
      setCepError('Erro ao buscar CEP. Preencha manualmente.')
    } finally {
      setCepLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    setMessageType(null)

    try {
      const formData = new FormData(e.target)

      const urlParams = new URLSearchParams(window.location.search)
      const utms = {
        utm_source:   urlParams.get('utm_source')   || '',
        utm_medium:   urlParams.get('utm_medium')   || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term:     urlParams.get('utm_term')     || '',
        utm_content:  urlParams.get('utm_content')  || '',
      }

      const telefone = String(formData.get('telefone') || '')
      const whenDate = String(formData.get('when_date') || '')
      const whenTime = String(formData.get('when_time') || '')
      const dateBR = formatDateBR(whenDate)
      const timeBR = formatTimeBR(whenTime)
      const quando_precisa = [dateBR, timeBR && `às ${timeBR}`].filter(Boolean).join(' ')

      const data = {
        nome:           formData.get('nome'),
        email:          formData.get('email'),
        telefone,
        telefone_digits: onlyDigits(telefone),
        cep:            formData.get('cep'),
        rua:            formData.get('rua'),
        numero:         formData.get('numero'),
        complemento:    formData.get('complemento') || '—',
        bairro:         formData.get('bairro'),
        cidade:         formData.get('cidade'),
        uf:             String(formData.get('uf') || '').toUpperCase(),
        quando_precisa,
        data_envio:     new Date().toLocaleString('pt-BR'),
        origem:         'Site SS Chopp',
        pagina:         window.location.href,
        ...utms,
      }

      // Salva o lead na planilha via Apps Script.
      // Usamos fetch (não sendBeacon) pra conseguir detectar bloqueio do adblock.
      const beaconData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        beaconData.append(k, String(v ?? ''))
      })
      await fetch(SHEETS_WEB_APP_URL, {
        method: 'POST',
        body: beaconData,
        mode: 'no-cors',
      })

      setDoneEmail(String(data.email || ''))
      setDone(true)
      formRef.current?.reset()
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      // ERR_BLOCKED_BY_CLIENT / Failed to fetch → quase sempre é adblock
      const isBlocked = /failed to fetch|blocked|networkerror/i.test(
        String(error?.message || error)
      )
      setMessage(
        isBlocked
          ? 'O envio foi bloqueado pelo seu bloqueador de anúncios (AdBlock, uBlock ou similar). Desative-o neste site OU fale com a gente pelo WhatsApp logo abaixo.'
          : 'Erro ao enviar. Tente novamente ou fale no WhatsApp.'
      )
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contato" className="relative py-16 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset('/photos/photo-7.jpg')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/95 to-ink-950" />
      </div>

      <div className="container-wide relative grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <p className="label-eyebrow">Vamos juntos</p>
          <h2 className="display mt-4 text-3xl sm:text-5xl md:text-7xl text-foam-50 leading-[0.92]">
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
                <span className="text-amber-300">{doneEmail}</span>. Enquanto
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
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-ink-900/80 backdrop-blur-md border border-foam-50/10 grain-overlay p-4 sm:p-8 md:p-12"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300 font-bold mb-2">
                Formulário · Orçamento gratuito
              </p>
              <h3 className="display text-2xl sm:text-3xl md:text-4xl text-foam-50">
                Conte sobre sua festa
              </h3>

              <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className="field-label">Seu Nome</label>
                  <input id="nome" name="nome" type="text" required placeholder="Como podemos te chamar?"
                    className="field-input" autoComplete="name" maxLength={100} disabled={isLoading} />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">E-mail</label>
                  <input id="email" name="email" type="email" required placeholder="seu@email.com"
                    className="field-input" autoComplete="email" maxLength={120} disabled={isLoading} />
                </div>
                <div>
                  <label htmlFor="telefone" className="field-label">Telefone / WhatsApp</label>
                  <input id="telefone" name="telefone" type="tel" required placeholder="(11) 99999-9999"
                    value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
                    className="field-input" autoComplete="tel" maxLength={16} disabled={isLoading} />
                </div>
              </div>

              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-foam-50/10">
                <div className="flex items-center gap-2 mb-5 sm:mb-6">
                  <MapPin size={15} className="text-amber-300 shrink-0" />
                  <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300 font-bold">
                    Endereço da festa
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8">
                  <div className="col-span-1 md:col-span-2">
                    <label htmlFor="cep" className="field-label">CEP</label>
                    <div className="relative">
                      <input id="cep" name="cep" type="text" inputMode="numeric" required
                        placeholder="00000-000" value={cep}
                        onChange={(e) => { setCep(formatCep(e.target.value)); setCepError('') }}
                        onBlur={lookupCep} maxLength={9}
                        className="field-input pr-7" autoComplete="postal-code" disabled={isLoading} />
                      {cepLoading && (
                        <Loader2 size={14} className="absolute right-0 top-3.5 text-amber-300 animate-spin" />
                      )}
                    </div>
                    {cepError
                      ? <p className="mt-1.5 text-[11px] text-red-400">{cepError}</p>
                      : <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-foam-50/35">Auto-preenche</p>
                    }
                  </div>

                  <div className="col-span-1 md:col-span-1">
                    <label htmlFor="numero" className="field-label">Nº</label>
                    <input id="numero" name="numero" type="text" required placeholder="123"
                      className="field-input" maxLength={10} disabled={isLoading} />
                  </div>

                  <div className="col-span-2 md:col-span-3">
                    <label htmlFor="rua" className="field-label">Rua / Logradouro</label>
                    <input id="rua" name="rua" type="text" placeholder="Preenchido pelo CEP"
                      value={street} onChange={(e) => setStreet(e.target.value)}
                      className="field-input" autoComplete="address-line1" maxLength={150} disabled={isLoading} />
                  </div>

                  <div className="col-span-2 md:col-span-3">
                    <label htmlFor="bairro" className="field-label">Bairro</label>
                    <input id="bairro" name="bairro" type="text" required placeholder="Preenchido pelo CEP"
                      value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}
                      className="field-input" maxLength={100} disabled={isLoading} />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label htmlFor="cidade" className="field-label">Cidade</label>
                    <input id="cidade" name="cidade" type="text" required placeholder="Preenchida"
                      value={city} onChange={(e) => setCity(e.target.value)}
                      className="field-input" autoComplete="address-level2" maxLength={80} disabled={isLoading} />
                  </div>

                  <div className="col-span-1 md:col-span-1">
                    <label htmlFor="uf" className="field-label">UF</label>
                    <input id="uf" name="uf" type="text" required maxLength={2} placeholder="SP"
                      value={state} onChange={(e) => setState(e.target.value.toUpperCase())}
                      className="field-input uppercase" autoComplete="address-level1" disabled={isLoading} />
                  </div>

                  <div className="col-span-2 md:col-span-6">
                    <label htmlFor="complemento" className="field-label">
                      Complemento <span className="text-foam-50/40 normal-case tracking-normal">(opcional)</span>
                    </label>
                    <input id="complemento" name="complemento" type="text" placeholder="Apto, bloco, referência..."
                      className="field-input" maxLength={150} disabled={isLoading} />
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-foam-50/10">
                <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300 font-bold mb-5">
                  Quando precisa?
                </p>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="when_date" className="field-label">Data</label>
                    <input
                      id="when_date"
                      name="when_date"
                      type="date"
                      required
                      disabled={isLoading}
                      className="field-input"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="when_time" className="field-label">Horário</label>
                    <input
                      id="when_time"
                      name="when_time"
                      type="time"
                      required
                      disabled={isLoading}
                      className="field-input"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
              </div>

              {message && messageType === 'error' && (
                <div className="mt-6 bg-red-500/10 border border-red-500/30 px-4 py-3">
                  <p className="text-sm text-red-300 leading-relaxed">{message}</p>
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#25D366] hover:text-[#1ebe57] transition-colors"
                  >
                    Falar pelo WhatsApp →
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary mt-8 sm:mt-10 w-full sm:w-auto group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>Enviando... <Loader2 size={15} className="animate-spin" /></>
                ) : (
                  <>Enviar pedido <Send size={15} className="transition-transform group-hover:translate-x-1" /></>
                )}
              </button>

              <p className="mt-4 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-foam-50/40">
                Resposta em até 24h · Suas informações ficam só com a gente
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

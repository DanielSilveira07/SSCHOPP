# SS Chopp — Landing Page

Base do projeto em React + Vite + Tailwind, com:

- Verificação de idade 18+ (modal bloqueante, persistido em `sessionStorage`)
- Hero impactante com foto de produto e copy direto
- Seções: O que somos · Diagnóstico · Cases (5 estrelas) · Método · Lead magnet · Formulário completo
- Botão flutuante "Comprar pelo WhatsApp" + CTAs WhatsApp em pontos estratégicos
- Captação de e-mail com incentivo (10% OFF + guia + brinde)
- Tipografia Anton + Poppins (fontes locais em `/public/fonts`)
- Animações com Framer Motion, grain texture, paleta âmbar/cobre

## Como rodar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Onde editar

- **WhatsApp / e-mail / Instagram**: `src/lib/constants.js`
- **Conteúdo das seções**: cada seção é um arquivo em `src/components/`
- **Cores / fontes**: `tailwind.config.js` + `src/index.css`
- **Imagens**: trocar arquivos em `public/photos/` e `public/brand/`

## Integrações pendentes (TODO)

Os formulários (`LeadMagnet.jsx` e `ContactForm.jsx`) hoje só fazem `console.log`. Plugue o seu serviço:

- E-mail marketing: Mailchimp / RD Station / Brevo
- CRM / planilha: Google Sheets via webhook, HubSpot, Pipedrive
- Backend próprio: substitua o `console.log` por `fetch('/api/lead', { method: 'POST', body: JSON.stringify(form) })`

## Estrutura

```
public/
  logo.png
  photos/        # 9 fotos (FOTOS/)
  brand/         # logos secundários (Carioca Chopp, Chopprio)
  fonts/         # Anton + Poppins
src/
  components/
    AgeGate.jsx
    Header.jsx
    Hero.jsx
    About.jsx
    Diagnostic.jsx
    Testimonials.jsx
    Method.jsx
    LeadMagnet.jsx
    ContactForm.jsx
    Footer.jsx
    WhatsAppFloat.jsx
  lib/constants.js
  App.jsx
  main.jsx
  index.css
```

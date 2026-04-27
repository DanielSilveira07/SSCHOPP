// Edite estas constantes com os dados reais do negócio.
export const BUSINESS = {
  name: 'SS Chopp',
  tagline: 'Chopp gelado na sua porta, sem preocupações',
  whatsapp: '5511999999999', // formato internacional, sem '+', sem espaços
  whatsappMessage: 'Olá! Quero um orçamento de chopp para minha festa.',
  email: 'contato@sschopp.com.br',
  instagram: 'https://instagram.com/sschopp',
  city: 'São Paulo / SP',
}

export const buildWhatsAppUrl = (msg = BUSINESS.whatsappMessage) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`

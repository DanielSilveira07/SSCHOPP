// Edite estas constantes com os dados reais do negócio.
export const BUSINESS = {
  name: 'SS Chopp',
  tagline: 'Chopp gelado na sua porta, sem preocupações',
  whatsapp: '5521968462709', // formato internacional, sem '+', sem espaços
  whatsappMessage: 'Olá! Quero um orçamento de chopp para minha festa.',
  email: 'sschoppexpresso@gmail.com',
  instagram: 'https://www.instagram.com/ss_chopp/',
  city: 'Rio de Janeiro / RJ',
}

export const buildWhatsAppUrl = (msg = BUSINESS.whatsappMessage) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`

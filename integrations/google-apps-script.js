/**
 * SS CHOPP — Lead Capture (Sheets + Email)
 *
 * COMO USAR
 * 1. Crie uma planilha nova no Google Sheets (Drive)
 * 2. Extensões → Apps Script → cole esse código inteiro
 * 3. Salve (Ctrl+S). Nome do projeto: "SS Chopp Leads"
 * 4. Executar → "setup" → autoriza quando pedir (cria a aba + cabeçalho)
 * 5. Implementar → Nova implementação:
 *    - Tipo: App da web
 *    - Executar como: Eu
 *    - Quem tem acesso: Qualquer pessoa
 * 6. Copie a URL (.../exec) e cole em src/components/ContactForm.jsx
 */

const SHEET_NAME = 'Leads'
const NOTIFY_EMAIL = 'sschoppexpresso@gmail.com'

const HEADERS = [
  'Data', 'Nome', 'Telefone',
  'Endereço', 'Quando precisa', 'Origem', 'Página', 'UTM',
]

// Executar manualmente uma vez para criar a aba e o cabeçalho
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#08070a')
      .setFontColor('#f5cb19')
    sheet.setFrozenRows(1)
    sheet.setColumnWidth(1, 140)  // Data
    sheet.setColumnWidth(2, 180)  // Nome
    sheet.setColumnWidth(3, 140)  // Telefone
    sheet.setColumnWidth(4, 320)  // Endereço
    sheet.setColumnWidth(5, 160)  // Quando precisa
    sheet.setColumnWidth(6, 130)  // Origem
    sheet.setColumnWidth(7, 220)  // Página
    sheet.setColumnWidth(8, 260)  // UTM
  }
}

// Sanitização: só trim + limite de tamanho. Preserva espaços e acentos.
function sanitize_(value) {
  return String(value == null ? '' : value).trim().slice(0, 500)
}

function formatEndereco_(data) {
  const rua = sanitize_(data.rua)
  const numero = sanitize_(data.numero)
  const complemento = sanitize_(data.complemento)
  const bairro = sanitize_(data.bairro)
  const cidade = sanitize_(data.cidade)
  const uf = sanitize_(data.uf)
  const cep = sanitize_(data.cep)

  const linha1 = [rua, numero].filter(Boolean).join(', ')
  const linha2Parts = []
  if (complemento && complemento !== '—') linha2Parts.push(complemento)
  if (bairro) linha2Parts.push(bairro)
  const linha2 = linha2Parts.join(' · ')
  const linha3 = [cidade && uf ? cidade + '/' + uf : cidade || uf, cep && 'CEP ' + cep]
    .filter(Boolean)
    .join(' · ')

  return [linha1, linha2, linha3].filter(Boolean).join('\n')
}

function formatUtms_(data) {
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  const lines = keys
    .map(function (k) {
      const v = sanitize_(data[k])
      return v && v !== '—' ? k.replace('utm_', '') + ': ' + v : null
    })
    .filter(Boolean)
  return lines.length ? lines.join('\n') : '—'
}

// ─────────────────────────────────────────────────────────────────────────
// HTML do email — edite à vontade. CSS deve ser INLINE (style="...")
// porque clientes de email (Gmail, Outlook) ignoram <style>.
// ─────────────────────────────────────────────────────────────────────────

// Paleta — altere aqui pra mudar a identidade do email
const COLORS = {
  bg:        '#08070a',  // fundo escuro
  card:      '#0f0d12',  // fundo do card central
  accent:    '#f5cb19',  // amarelo SS Chopp (títulos, labels, links)
  accent2:   '#d4881f',  // amarelo escuro (gradiente)
  text:      '#fbf8ee',  // texto claro
  textDim:   'rgba(251,248,238,0.55)',
  textFaint: 'rgba(251,248,238,0.4)',
  border:    'rgba(245,203,25,0.15)',
  whatsapp:  '#25D366',
}

// Estilos reutilizáveis
const S = {
  body:       'margin:0;padding:0;background:' + COLORS.bg + ';font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:' + COLORS.text,
  wrap:       'background:' + COLORS.bg + ';padding:40px 16px',
  card:       'max-width:600px;width:100%;background:' + COLORS.card + ';border:1px solid ' + COLORS.border,
  topStripe:  'height:4px;background:linear-gradient(90deg,' + COLORS.accent2 + ' 0%,' + COLORS.accent + ' 50%,' + COLORS.accent2 + ' 100%)',
  header:     'padding:36px 40px 24px;text-align:center;border-bottom:1px solid rgba(251,248,238,0.08)',
  eyebrow:    'margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:' + COLORS.accent,
  h1:         'margin:0;font-size:28px;font-weight:800;color:' + COLORS.text + ';line-height:1.15',
  sectionPad: 'padding:24px 40px 8px',
  label:      'margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:' + COLORS.accent,
  fieldLabel: 'margin:0 0 4px;font-size:11px;color:rgba(251,248,238,0.5);letter-spacing:0.06em;text-transform:uppercase',
  fieldValue: 'margin:0;font-size:16px;color:' + COLORS.text + ';font-weight:600',
  divider:    'padding:14px 0;border-bottom:1px solid rgba(251,248,238,0.06)',
  addrBox:    'background:rgba(245,203,25,0.04);border-left:2px solid ' + COLORS.accent,
  highlight:  'margin:0;font-size:18px;font-weight:700;color:' + COLORS.text + ';background:rgba(245,203,25,0.08);padding:14px 18px;border:1px solid rgba(245,203,25,0.2)',
  btnWpp:     'display:inline-block;background:' + COLORS.whatsapp + ';color:' + COLORS.bg + ';padding:14px 28px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none',
  footer:     'padding:20px 40px 28px;text-align:center;border-top:1px solid rgba(251,248,238,0.08)',
}

// Constrói o HTML do email a partir dos dados do lead
function buildEmailHtml_(data) {
  const d = {
    nome:      sanitize_(data.nome),
    telefone:  sanitize_(data.telefone),
    fone:      sanitize_(data.telefone_digits) || sanitize_(data.telefone).replace(/\D/g, ''),
    cidade:    sanitize_(data.cidade),
    uf:        sanitize_(data.uf),
    rua:       sanitize_(data.rua),
    numero:    sanitize_(data.numero),
    comp:      sanitize_(data.complemento),
    bairro:    sanitize_(data.bairro),
    cep:       sanitize_(data.cep),
    quando:    sanitize_(data.quando_precisa),
    pagina:    sanitize_(data.pagina),
    dataEnvio: sanitize_(data.data_envio) || new Date().toLocaleString('pt-BR'),
    src:       sanitize_(data.utm_source)   || '—',
    med:       sanitize_(data.utm_medium)   || '—',
    cmp:       sanitize_(data.utm_campaign) || '—',
  }
  const compHtml = d.comp && d.comp !== '—' ? d.comp + '<br>' : ''

  return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="${S.body}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${S.wrap}">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="${S.card}">

  <tr><td style="${S.topStripe}"></td></tr>

  <tr><td style="${S.header}">
    <p style="${S.eyebrow}">Novo lead recebido</p>
    <h1 style="${S.h1}">Pedido de orçamento<br><span style="color:${COLORS.accent}">SS Chopp</span></h1>
    <p style="margin:14px 0 0;font-size:13px;color:${COLORS.textDim};line-height:1.5">Recebido em ${d.dataEnvio}</p>
  </td></tr>

  <tr><td style="padding:32px 40px 8px">
    <p style="${S.label}">— Contato</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(251,248,238,0.06)">
        <p style="${S.fieldLabel}">Nome</p>
        <p style="${S.fieldValue}">${d.nome}</p>
      </td></tr>
      <tr><td style="padding:14px 0">
        <p style="${S.fieldLabel}">Telefone / WhatsApp</p>
        <p style="margin:0;font-size:15px;color:${COLORS.text};font-weight:500">${d.telefone}</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="${S.sectionPad}">
    <p style="${S.label}">— Endereço da festa</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${S.addrBox}">
      <tr><td style="padding:18px 20px">
        <p style="margin:0;font-size:15px;line-height:1.7;color:${COLORS.text}">
          <strong style="color:${COLORS.accent};font-weight:600">${d.rua}, ${d.numero}</strong><br>
          ${compHtml}${d.bairro} — ${d.cidade}/${d.uf}<br>
          <span style="font-size:13px;color:rgba(251,248,238,0.6)">CEP: ${d.cep}</span>
        </p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="${S.sectionPad}">
    <p style="${S.label}">— Quando precisa</p>
    <p style="${S.highlight}">${d.quando}</p>
  </td></tr>

  <tr><td style="padding:32px 40px;text-align:center">
    <a href="https://wa.me/55${d.fone}" style="${S.btnWpp}">Responder no WhatsApp</a>
  </td></tr>

  <tr><td style="padding:0 40px 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.02);border:1px dashed rgba(251,248,238,0.1)">
      <tr><td style="padding:14px 18px">
        <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${COLORS.textFaint}">Origem / Tracking</p>
        <p style="margin:0;font-size:12px;color:rgba(251,248,238,0.65);line-height:1.65;font-family:monospace">
          Página: ${d.pagina}<br>
          Source: ${d.src} · Medium: ${d.med}<br>
          Campaign: ${d.cmp}
        </p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="${S.footer}">
    <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(251,248,238,0.35)">SS Chopp · Eventos & Festas</p>
    <p style="margin:8px 0 0;font-size:10px;color:rgba(251,248,238,0.25)">Email gerado automaticamente pelo formulário de contato.</p>
  </td></tr>

</table></td></tr></table></body></html>`
}

function doPost(e) {
  try {
    if (!e || !e.parameter) {
      return jsonResponse_({ ok: false, error: 'missing_body' })
    }

    const data = e.parameter

    if (data.origem !== 'Site SS Chopp') {
      return jsonResponse_({ ok: false, error: 'invalid_origin' })
    }
    if (!data.nome || !data.telefone) {
      return jsonResponse_({ ok: false, error: 'missing_fields' })
    }

    // 1) Grava na planilha
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    let sheet = ss.getSheetByName(SHEET_NAME)
    if (!sheet) {
      setup()
      sheet = ss.getSheetByName(SHEET_NAME)
    }

    sheet.appendRow([
      new Date(),
      sanitize_(data.nome),
      sanitize_(data.telefone),
      formatEndereco_(data),
      sanitize_(data.quando_precisa),
      sanitize_(data.origem),
      sanitize_(data.pagina),
      formatUtms_(data),
    ])

    const lastRow = sheet.getLastRow()
    sheet.getRange(lastRow, 1, 1, HEADERS.length).setWrap(true).setVerticalAlignment('top')

    // 2) Manda email de notificação
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: '🍺 Novo lead - ' + sanitize_(data.nome) + ' (' + sanitize_(data.cidade) + ')',
        htmlBody: buildEmailHtml_(data),
        name: 'SS Chopp Site',
      })
    } catch (mailErr) {
      console.log('Email falhou (mas planilha salvou):', mailErr)
    }

    return jsonResponse_({ ok: true })
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) })
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: 'SS Chopp Leads', method: 'use POST' })
}

// Rode manualmente uma vez para autorizar o envio de email
// e testar o template sem precisar enviar o formulário
function testEmail() {
  const fakeData = {
    nome: 'Daniel Teste',
    telefone: '(21) 96846-2709',
    telefone_digits: '21968462709',
    cep: '01310-100',
    rua: 'Av Paulista',
    numero: '1000',
    complemento: 'Apto 101',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    uf: 'SP',
    quando_precisa: '15/06/2026 às 18h',
    data_envio: new Date().toLocaleString('pt-BR'),
    origem: 'Site SS Chopp',
    pagina: 'https://sschopp.com/teste',
    utm_source: 'instagram',
    utm_medium: 'social',
    utm_campaign: 'verao2026',
  }
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '🍺 [TESTE] Novo lead - ' + fakeData.nome + ' (' + fakeData.cidade + ')',
    htmlBody: buildEmailHtml_(fakeData),
    name: 'SS Chopp Site',
  })
  console.log('✅ Email de teste enviado para', NOTIFY_EMAIL)
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}

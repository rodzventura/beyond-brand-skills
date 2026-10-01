// Modelo de apresentação Aurora — deck executivo do case Atria, Ciclo 01 (16:9, 1920×1080).
// Uma fonte de layout, três destinos (regras em aurora-brand → Apresentação):
//   node gerar.js static → saida/deck-static.html (Britti Sans; vira o PDF com pdf.js)
//   node gerar.js pptx   → saida/deck.pptx (Geist, editável)
//   node gerar.js live   → saida/deck.html (HTML único com micro animações e textura viva)
// Para um deck novo: copie esta pasta, troque o conteúdo (CAPS e as chamadas page/opener)
// e gere as texturas das células no aurora. ASCII Studio (receitas em texturas.json).
const fs = require('fs');
const os = require('os');
const path = require('path');
const DIR = path.join(__dirname, 'assets');
const OUT = path.join(__dirname, 'saida');
fs.mkdirSync(OUT, { recursive: true });

const W = 1920, H = 1080, M = 48, CW = 320, RH = 135;
const C = {
  canvas: '#EDEDED', black: '#101011', ink2: '#515154', ink3: '#69696D',
  line: '#97979D', lineDark: '#515154', subtle: '#D7D7D8',
  orange: '#FA6E30',      // sinal: marcador, ponto, contador
  orangeCell: '#D05E2E',  // orange/600: célula com texto (branco 3.95:1)
  gray300: '#C1C1C4', gray600: '#69696D', white: '#FFFFFF', gray: '#97979D', dim: '#313133',
};
// escala de slide (px no canvas 1920): corpo ≥ 20, rótulo ≥ 16
const S = { display: 160, chapter: 240, title: 64, kpi: 64, sub: 40, h3: 32, h4: 28, lead: 24, body: 20, label: 18, labelSm: 16 };

// ---------- primitivas ----------
const T = (x, y, w, h, text, o = {}) => ({ t: 'text', x, y, w, h, text, ...o });
const lbl = (x, y, w, text, o = {}) => T(x, y, w, 22, text, { font: 'mono', weight: 500, size: S.label, upper: true, ls: 0.04, color: C.ink3, ...o });
const lblSm = (x, y, w, text, o = {}) => T(x, y, w, 20, text, { font: 'mono', weight: 500, size: S.labelSm, upper: true, ls: 0.04, color: C.ink3, ...o });
const body = (x, y, w, h, text, o = {}) => T(x, y, w, h, text, { size: S.body, weight: 400, lh: 1.4, color: C.ink2, ...o });
const R = (x, y, w, h, fill, o = {}) => ({ t: 'rect', x, y, w, h, fill, ...o });
const HL = (y, x0 = 0, x1 = W, o = {}) => ({ t: 'h', y, x0, x1, ...o });
const VL = (x, y0 = 0, y1 = H, o = {}) => ({ t: 'v', x, y0, y1, ...o });
const IMG = (file, x, y, w, h, o = {}) => ({ t: 'img', file, x, y, w, h, ...o });
const LOGO_AR = 797 / 136;

function title(text, long = false, o = {}) {
  return T(M, 222, o.w || 1400, o.h || (long ? 150 : 80), text,
    { size: S.title, weight: long ? 400 : 500, ls: -0.025, lh: 1.05, color: o.color || C.black, role: 'title' });
}
function kpi(x, y, w, value, label, o = {}) {
  return [
    T(x, y, w, 70, value, { size: S.kpi, weight: 500, ls: -0.03, lh: 1, color: o.color || C.black, role: 'kpi' }),
    T(x, y + 84, w, 60, label, { size: S.body, weight: o.color ? 500 : 400, lh: 1.4, color: o.sub || C.ink2 }),
  ];
}

// receitas de textura (as mesmas do Studio; o PNG é o quadro t=0, o HTML anima)
const TEX = {
  capa: { png: 'tex-deck-capa.png', gen: 'campo.dissolucao', seed: 20261004, params: { ang: 90, soft: 1, grain: 14, mix: 0.85 } },
  contra: { png: 'tex-deck-contra.png', gen: 'campo.dissolucao', seed: 20261005, params: { ang: 270, soft: 1, grain: 14, mix: 0.85 } },
};
for (let i = 1; i <= 5; i++) TEX['cap' + i] = { png: `tex-deck-cap${i}.png`, gen: 'campo.ruido', seed: 20261010 + i, params: { scale: 2.6, oct: 4, gain: 0.5, warp: 0.9, cont: 0.35 } };
const TEXIMG = (key, x, y, w, h) => ({ t: 'img', file: TEX[key].png, x, y, w, h, tex: key });

// ---------- conteúdo ----------
const CAPS = [
  { n: '01', t: 'O problema', lead: 'Onde se perde o tempo da primeira leitura de um contrato.' },
  { n: '02', t: 'A hipótese', lead: 'Uma pergunta e o sistema construído para testá-la.' },
  { n: '03', t: 'O ciclo', lead: '90 dias, três fases e uma decisão no fim.' },
  { n: '04', t: 'Resultado', lead: 'O que mudou na triagem e quanto isso devolve.' },
  { n: '05', t: 'Decisão', lead: 'O que o Ciclo 02 precisa provar.' },
];
const slides = [];
const page = (cap, t, notes, els) => slides.push({ cap, n: CAPS[cap].n, t, notes, els });
const opener = cap => slides.push({ opener: cap, dark: true, notes: `Abertura do capítulo ${CAPS[cap].n}: ${CAPS[cap].t}. ${CAPS[cap].lead}`, els: [] });

// CAPA
slides.push({
  dark: true, cover: true,
  notes: 'Abertura. Atria é o primeiro ciclo do programa na frente jurídica: 90 dias para testar se a primeira leitura de contratos pode ser feita com apoio de IA sem tirar a decisão do jurista. Este deck leva ao conselho a evidência do ciclo e a decisão que ela pede.',
  els: [
    TEXIMG('capa', 1601, 136, 319, 944),
    HL(135), VL(1600),
    T(M, 34, 400, 81, 'LegalTech\nCiclo 01\n90 dias', { font: 'mono', weight: 500, size: S.label, upper: true, ls: 0.04, lh: 1.5, color: C.white }),
    lbl(M, 290, 900, 'Deck executivo · conselho', { color: C.gray }),
    T(M, 330, 1400, 170, 'Atria', { size: S.display, weight: 500, ls: -0.035, lh: 1, color: C.white, role: 'title' }),
    T(M, 540, 1400, 50, 'Uma pergunta. Um sistema em teste.', { size: S.sub, weight: 500, ls: -0.01, lh: 1.15, color: C.white }),
    T(M, 610, 1000, 70, 'Como a triagem contratual assistida por IA saiu de hipótese para operação piloto em 90 dias.', { size: S.lead, weight: 400, lh: 1.45, color: C.gray }),
    lblSm(M, 952, 900, 'Case fictício · dados simulados para teste', { color: C.gray }),
    IMG('Logo_light.png', M, 994, 40 * LOGO_AR, 40),
  ],
});

// 01 · O PROBLEMA
opener(0);
page(0, 'O problema',
  'O ponto de partida foi medir, não construir. Na amostra de 186 contratos simulados, a triagem levava 47 minutos por documento. Um terço desse tempo era só busca de cláusula, dois terços dos contratos eram de baixo risco e um em cada cinco voltava ao solicitante por falta de informação.', [
    lbl(M, 183, 1200, 'Diagnóstico · 186 contratos simulados'),
    title('47 minutos para entender um contrato.'),
    T(M, 330, 1000, 80, 'Em departamentos jurídicos, a primeira leitura ainda é um gargalo invisível — e acontece antes de qualquer decisão.', { size: S.lead, weight: 400, lh: 1.45, color: C.ink2 }),
    HL(675), VL(640, 675, 945), VL(1280, 675, 945),
    lblSm(M, 715, 560, 'Só localizando cláusulas'), ...kpi(M, 751, 560, '31%', 'Cerca de 15 minutos por contrato em busca, não em análise.'),
    lblSm(688, 715, 560, 'Contratos de baixo risco'), ...kpi(688, 751, 560, '68%', 'Cerca de 126 contratos que não pediam análise profunda.'),
    lblSm(1328, 715, 560, 'Retrabalho por falta de dado'), ...kpi(1328, 751, 560, '22%', 'Cerca de 41 contratos voltaram ao solicitante.'),
  ]);
page(0, 'Onde está o tempo',
  'Somando, foram cerca de 146 horas de primeira leitura na amostra, e 68% dos contratos eram de baixo risco. A conclusão do diagnóstico, validada com o jurídico no dia 21: o gargalo não estava no parecer, estava na operação antes dele.', [
    lbl(M, 183, 1200, 'Carga de primeira leitura na amostra'),
    title('O tempo não estava na decisão. Estava antes dela.', true, { w: 940 }),
    T(M, 400, 1200, 44, 'O problema não era jurídico. Era operacional.', { size: S.h3, weight: 500, ls: -0.01, lh: 1.15, color: C.black }),
    HL(540), VL(640, 540, 945),
    lblSm(M, 588, 560, 'Primeira leitura'), ...kpi(M, 624, 560, '146 h', '186 contratos × 47 minutos, antes de qualquer decisão.'),
    lblSm(688, 588, 1184, 'Distribuição de risco · 186 contratos'),
    R(688, 640, 1184 * 0.68 - 2, 64, C.gray300, { role: 'bar' }),
    R(688 + 1184 * 0.68, 640, 1184 * 0.24 - 2, 64, C.gray600, { role: 'bar' }),
    R(688 + 1184 * 0.92, 640, 1184 * 0.08, 64, C.orange, { role: 'bar' }),
    T(688, 728, 300, 40, '68%', { size: S.h3, weight: 500, ls: -0.015, color: C.black }),
    lblSm(688, 776, 400, 'Baixo · 126 contratos'),
    T(688 + 1184 * 0.68, 728, 200, 40, '24%', { size: S.h3, weight: 500, ls: -0.015, color: C.black }),
    lblSm(688 + 1184 * 0.68, 776, 200, 'Médio · 45'),
    T(1872 - 120, 728, 120, 40, '8%', { size: S.h3, weight: 500, ls: -0.015, color: C.black, align: 'right' }),
    lblSm(1872 - 160, 776, 160, 'Alto · 15', { align: 'right' }),
    body(688, 836, 1100, 30, 'Mais de dois terços dos contratos pediam organização, não parecer.'),
  ]);

// 02 · A HIPÓTESE
opener(1);
const princ = [
  ['P-01', 'Humano decide.', 'A IA nunca aprova nem rejeita contrato.'],
  ['P-02', 'Rastreável.', 'Toda informação extraída aponta para a página e o trecho de origem.'],
  ['P-03', 'Fila por risco.', 'Baixo risco passa por validação rápida; alto risco vai direto ao jurista sênior.'],
  ['P-04', 'Pergunta antes de travar.', 'Se falta informação, o sistema pede ao solicitante na hora.'],
];
page(1, 'A hipótese',
  'A hipótese do ciclo, em uma pergunta. Os quatro princípios definem o que o sistema não pode fazer tanto quanto o que ele faz: a decisão sobre o risco nunca sai das mãos do jurista.', [
    lbl(M, 183, 1200, 'Pergunta do ciclo'),
    title('E se a primeira leitura pudesse ser feita com apoio de IA, sem perder o controle humano sobre o risco?', true, { w: 1500 }),
    HL(540), VL(960, 540, 945),
    ...princ.flatMap(([c, h, b], i) => {
      const x = i % 2 ? 1008 : M, y = 588 + Math.floor(i / 2) * 170;
      return [lblSm(x, y, 400, c), T(x, y + 32, 860, 36, h, { size: S.h4, weight: 500, ls: -0.01, lh: 1.2, color: C.black }),
        body(x, y + 76, 860, 60, b)];
    }),
  ]);
const camadas = [
  ['01', 'Leitura', 'Extrai partes, vigência, valores, obrigações, penalidades e foro.', 'Ficha do contrato'],
  ['02', 'Classificação', 'Pontua o risco por cláusula e por contrato: baixo, médio ou alto.', 'Score + motivos'],
  ['03', 'Encaminhamento', 'Roteia para validação rápida, jurista pleno ou sênior. Pede o que falta.', 'Fila priorizada'],
];
const passos = ['Upload', 'Leitura', 'Classificação de risco', 'Checagem de lacunas', 'Fila humana', 'Decisão do jurista'];
page(1, 'A solução',
  'A Atria é um sistema de triagem em três camadas. Os cinco primeiros passos do fluxo preparam o contrato; o sexto é o único que decide, e continua humano.', [
    lbl(M, 183, 1200, 'Atria · triagem contratual assistida por IA'),
    title('Três camadas antes do jurista.'),
    HL(405), HL(675), VL(640, 405, 675), VL(1280, 405, 675),
    ...camadas.flatMap(([n, h, b, o], i) => {
      const x = i * 640 + M;
      return [lblSm(x, 441, 200, n), T(x, 471, 540, 40, h, { size: S.h3, weight: 500, ls: -0.01, lh: 1.15, color: C.black }),
        body(x, 521, 540, 60, b), lblSm(x, 611, 540, '→ ' + o, { color: C.black })];
    }),
    lblSm(M, 711, 400, 'Fluxo'),
    R(M + 6, 771, 5 * CW, 1, C.line, { role: 'bar' }),
    R(M + 4 * CW + 6, 770, CW, 3, C.orange, { role: 'bar' }),
    ...passos.flatMap((p, i) => [
      R(M + i * CW, 766, 12, 12, i === 5 ? C.orange : C.black),
      lblSm(M + i * CW, 798, 200, String(i + 1).padStart(2, '0'), { color: i === 5 ? C.orange : C.ink3 }),
      T(M + i * CW, 828, 280, 60, p, { size: S.body + 2, weight: 400, lh: 1.3, color: C.black }),
    ]),
  ]);

// 03 · O CICLO
opener(2);
const BX = M, BW = W - 2 * M, dx = d => BX + BW * d / 90;
const marcos = [[21, 'Dia 21', 'Diagnóstico validado'], [45, 'Dia 45', 'Extração com 80% de precisão'], [63, 'Dia 63', 'MVP congelado'], [90, 'Dia 90', 'Go / No-go']];
const fases = [['Dias 1–21', 'Discovery', 'Medir o problema real.', '186 contratos, mapa do fluxo, 14 entrevistas.'],
  ['Dias 22–63', 'Build', 'Construir e calibrar o MVP.', 'Extração, matriz de risco, fila, 3 calibrações.'],
  ['Dias 64–90', 'Scale', 'Validar com operação real.', 'Piloto em 2 áreas e plano de expansão.']];
page(2, 'Jornada de 90 dias',
  'Três fases, cada uma com um objetivo. Discovery mediu o problema, Build calibrou o MVP com quem decide e Scale levou o sistema para duas áreas reais. O ciclo termina numa decisão de Go ou No-go, que é o que este deck pede.', [
    lbl(M, 183, 1200, 'Discovery → Build → Scale'),
    title('Da pergunta ao sistema em teste, em 90 dias.', true, { w: 1500, h: 80 }),
    R(BX, 360, BW * 21 / 90 - 2, 40, C.black, { role: 'bar' }), R(dx(21), 360, BW * 42 / 90 - 2, 40, C.gray600, { role: 'bar' }), R(dx(63), 360, BW * 27 / 90, 40, C.gray300, { role: 'bar' }),
    R(BX, 430, BW, 1, C.line, { role: 'bar' }),
    ...marcos.flatMap(([d, a, b]) => {
      const last = d === 90, x = last ? dx(d) - 12 : dx(d) - 6;
      return [R(x, 424, 12, 12, last ? C.orange : C.black, last ? { role: 'blink' } : {}),
        lblSm(last ? dx(d) - 280 : dx(d) - 6, 456, 280, a, { color: last ? C.orange : C.black, align: last ? 'right' : 'left' }),
        body(last ? dx(d) - 280 : dx(d) - 6, 484, 280, 60, b, { align: last ? 'right' : 'left' })];
    }),
    HL(675), VL(640, 675, 945), VL(1280, 675, 945),
    ...fases.flatMap(([d, n, o, e], i) => {
      const x = i * 640 + M;
      return [lblSm(x, 711, 300, d), T(x, 739, 540, 40, n, { size: S.h3, weight: 500, ls: -0.01, lh: 1.15, color: C.black }),
        body(x, 788, 540, 30, o, { weight: 500, color: C.black }),
        body(x, 822, 540, 60, e)];
    }),
  ]);

// 04 · RESULTADO
opener(3);
const serie = [['Base', 47], ['S4', 41], ['S6', 33], ['S8', 24], ['S10', 18], ['S12', 14], ['S13', 12]];
page(3, 'Resultado',
  'A triagem caiu de 47 para 12 minutos por contrato ao longo do ciclo, uma redução de 74%. Na amostra, isso libera cerca de 109 horas; projetado para 2.200 contratos por ano, cerca de 1.290 horas voltam para trabalho analítico. A precisão de extração fechou em 94% e 100% das decisões de risco continuaram com o jurista.', [
    lbl(M, 183, 1100, 'Tempo médio por contrato, em minutos'),
    title('De 47 para 12 minutos.', false, { w: 1150 }),
    body(M, 312, 1184, 30, 'Precisão de extração em 94%. 100% das decisões de risco continuaram com o jurista.'),
    { t: 'chart', x: M, y: 380, w: 1184, h: 520, serie },
    R(1281, 406, 639, 269, C.orangeCell, { role: 'cell' }),
    HL(405, 1280, W), VL(1280, 405, 945),
    lblSm(1328, 445, 540, 'Tempo de triagem', { color: C.white }),
    ...kpi(1328, 481, 540, '−74%', 'De 47 para 12 minutos por contrato.', { color: C.white, sub: C.white }),
    lblSm(1328, 715, 540, 'Horas liberadas na amostra'),
    ...kpi(1328, 751, 540, '109 h', 'Cerca de 1.290 horas por ano, com 2.200 contratos.'),
  ]);
page(3, 'Investimento e retorno',
  'Valores fictícios. O cálculo usa só as horas de triagem liberadas, a 180 reais a hora jurídica; ganhos de retrabalho e de prazo ficam fora da conta. Com 240 mil de investimento e cerca de 232 mil recuperados por ano, o payback estimado é de 12 meses.', [
    lbl(M, 183, 1200, 'Valores fictícios · projeção anual'),
    title('Payback estimado em 12 meses.'),
    T(M, 330, 1100, 40, 'O cálculo usa só as horas de triagem liberadas. Retrabalho e prazo ficam fora da conta.', { size: S.lead, weight: 400, lh: 1.45, color: C.ink2 }),
    HL(540), VL(480, 540, 945), VL(960, 540, 945), VL(1440, 540, 945),
    lblSm(M, 588, 400, 'Investimento Ciclo 01'), ...kpi(M, 624, 400, 'R$ 240 mil', 'Equipe de 6 pessoas, 90 dias.'),
    lblSm(528, 588, 400, 'Horas liberadas por ano'), ...kpi(528, 624, 400, '~1.290 h', '2.200 contratos × 35 min.'),
    lblSm(1008, 588, 400, 'Valor anual recuperado'), ...kpi(1008, 624, 400, '~R$ 232 mil', '1.290 h × R$ 180 a hora.'),
    lblSm(1488, 588, 400, 'Payback estimado'), ...kpi(1488, 624, 400, '~12 meses', 'Investimento ÷ valor anual.'),
  ]);

// 05 · DECISÃO
opener(4);
const passos2 = ['Expandir o piloto de 2 para 6 áreas.', 'Elevar a precisão em limitação de responsabilidade para 93% ou mais.',
  'Integrar com o repositório contratual e a assinatura eletrônica.', 'Testar aditivos e contratos em inglês.', 'Definir o modelo comercial: licença por usuário ou por volume.'];
const estados = ['Identificada', 'Em avaliação', 'Em teste', 'Com sinal encontrado', 'Validada', 'Em pivot', 'Encerrada', 'Em handover'];
page(4, 'Próximo passo',
  'A hipótese está com sinal encontrado, não validada: o ciclo produziu evidência, e o Ciclo 02 existe para confirmá-la com seis áreas e meta de 93% na cláusula mais difícil. A decisão que pedimos ao conselho é Go para o Ciclo 02, com orçamento próprio. O valor desse orçamento não está neste material e precisa ser apresentado junto com o pedido.', [
    lbl(M, 183, 1200, 'Ciclo 02'),
    title('De 2 para 6 áreas.'),
    ...passos2.flatMap((p, i) => [
      R(M, 324 + i * 66, 1184, 1, i ? C.subtle : C.black, { role: 'bar' }),
      T(M, 342 + i * 66, 60, 28, String(i + 1).padStart(2, '0'), { font: 'mono', weight: 400, size: S.body, lh: 1.4, color: C.black }),
      T(M + 72, 340 + i * 66, 1100, 32, p, { size: S.body + 2, weight: 400, lh: 1.35, color: C.black }),
    ]),
    HL(675), VL(1280, 675, 945),
    R(1281, 676, 639, 269, C.orangeCell, { role: 'cell' }),
    lblSm(M, 711, 600, 'Estado da hipótese Atria'),
    ...estados.flatMap((e, i) => {
      const x = M + i * 150, s = i < 3 ? 'done' : i === 3 ? 'cur' : 'pend';
      return [s === 'pend' ? R(x, 757, 12, 12, null, { stroke: C.line }) : R(x, 757, 12, 12, s === 'cur' ? C.orange : C.black, s === 'cur' ? { role: 'blink' } : {}),
        lblSm(x, 789, 140, e, { h: 46, lh: 1.4, color: s === 'cur' ? C.orange : C.ink3 })];
    }),
    body(M, 866, 1100, 30, 'Sinal encontrado no Ciclo 01. A validação depende do Ciclo 02.'),
    lblSm(1328, 711, 540, 'Decisão esperada do conselho', { color: C.white }),
    T(1328, 749, 544, 90, 'Go para escala,\ncom orçamento do Ciclo 02.', { size: 36, weight: 500, ls: -0.01, lh: 1.15, color: C.white }),
  ]);

// CONTRACAPA
slides.push({
  dark: true, cover: true,
  notes: 'Encerramento. Retomar o pedido: Go para o Ciclo 02, com seis áreas e meta de 93% na cláusula mais difícil. Quem quiser checar cada número encontra a evidência completa no relatório de case Atria — Ciclo 01.',
  els: [
    TEXIMG('contra', 0, 0, 319, 944),
    VL(320), HL(945),
    lblSm(368, 183, 900, 'Case Atria · Ciclo 01 · 90 dias', { color: C.gray }),
    T(368, 222, 1400, 50, 'A próxima decisão é do conselho.', { size: S.sub, weight: 500, ls: -0.01, lh: 1.15, color: C.white, role: 'title' }),
    T(368, 292, 1100, 70, 'O relatório completo do ciclo reúne a evidência: o que foi testado, o que mudou e o que segue em aberto.', { size: S.lead, weight: 400, lh: 1.45, color: C.gray }),
    IMG('Logo_light.png', 368, 760, 120 * LOGO_AR, 120),
    lblSm(368, 1001, 600, 'Um programa Beyond Co.', { color: C.gray }),
    lblSm(1272, 1001, 600, 'Case fictício · dados simulados', { color: C.gray, align: 'right' }),
  ],
});

// ---------- aberturas, header, footer, marcadores ----------
const TOTAL = slides.length;
const footer = (i, dark) => [
  HL(945, 0, W, { chrome: true }),
  lblSm(M, 1001, 400, 'Atria', { chrome: true, color: dark ? C.gray : C.ink3 }),
  T(1072, 1001, 800, 20, [
    { text: 'LEGALTECH     CICLO 01     90 DIAS     ', o: {} },
    { text: String(i + 1).padStart(2, '0') + '/' + TOTAL, o: { color: C.orange } },
  ], { font: 'mono', weight: 500, size: S.labelSm, ls: 0.04, color: dark ? C.gray : C.ink3, align: 'right', chrome: true }),
];
slides.forEach((s, i) => {
  if (s.opener !== undefined) {
    const c = CAPS[s.opener];
    const pags = slides.map((p, j) => ({ p, j })).filter(({ p }) => p.cap === s.opener && p.opener === undefined);
    s.els.push(
      TEXIMG('cap' + (s.opener + 1), 1281, 0, 639, 674),
      VL(1280), HL(675),
      lbl(M, 48, 600, 'Capítulo', { color: C.gray }),
      T(M, 387, 1100, 240, c.n, { size: S.chapter, weight: 500, ls: -0.04, lh: 1, color: C.white, role: 'kpi' }),
      T(M, 723, 1180, 80, c.t, { size: S.title, weight: 500, ls: -0.025, lh: 1.05, color: C.white, role: 'title' }),
      T(M, 811, 1180, 40, c.lead, { size: S.lead, weight: 400, lh: 1.45, color: C.gray }),
      lblSm(1328, 723, 544, 'Neste capítulo', { color: C.gray }),
      ...pags.map(({ p, j }, k) => lblSm(1328, 761 + k * 32, 544, String(j + 1).padStart(2, '0') + ' · ' + p.t, { color: C.white })),
      ...footer(i, true),
    );
    return;
  }
  if (s.cover) return;
  s.els.push(
    HL(RH, 0, W, { chrome: true }), VL(CW, 0, RH, { chrome: true }),
    T(0, 0, CW, RH, s.n, { size: 88, weight: 500, ls: -0.01, lh: 1, align: 'center', valign: 'middle', color: C.black, chrome: true }),
    lbl(368, 56, 900, s.t, { color: C.black, chrome: true }),
    IMG('Logo_dark.png', W - M - 28 * LOGO_AR, 53, 28 * LOGO_AR, 28, { chrome: true }),
    ...footer(i, false),
  );
});
slides.forEach(s => {
  // marcador de 5px só onde uma horizontal encontra uma vertical (cruzamento ou T)
  const hs = s.els.filter(e => e.t === 'h'), vs = s.els.filter(e => e.t === 'v'), seen = new Set();
  for (const v of vs) for (const h of hs) {
    if (h.y <= 0 || h.y >= H) continue;
    if (h.y < v.y0 - 1 || h.y > v.y1 + 1) continue;
    if (v.x < h.x0 - 1 || v.x > h.x1 + 1) continue;
    const k = v.x + ',' + h.y; if (seen.has(k)) continue; seen.add(k);
    s.els.push({ t: 'x', x: v.x, y: h.y, chrome: !!(h.chrome && v.chrome) });
  }
});

// ---------- HTML ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function chartSVG(e, live) {
  const { x, y, w, h, serie } = e, pl = 48, pb = 40, ih = h - pb - 10, iw = w - pl - 24;
  const sy = v => 10 + ih - v / 50 * ih, sx = i => pl + 24 + i * (iw - 24) / (serie.length - 1);
  const grid = [0, 10, 20, 30, 40, 50].map(v => `<line x1="${pl}" x2="${w}" y1="${sy(v)}" y2="${sy(v)}" stroke="${v ? C.subtle : C.line}"/><text x="${pl - 12}" y="${sy(v) + 6}" text-anchor="end" font-size="16" fill="${C.ink3}">${v}</text>`).join('');
  const pts = serie.map(([, v], i) => `${sx(i)},${sy(v)}`).join(' ');
  const last = serie.length - 1;
  const dots = serie.map(([, v], i) => i === last ? `<rect class="cd" x="${sx(i) - 7}" y="${sy(v) - 7}" width="14" height="14" fill="${C.orange}"/>` : `<rect class="cd" x="${sx(i) - 5}" y="${sy(v) - 5}" width="10" height="10" fill="${C.black}"/>`).join('');
  const cats = serie.map(([c], i) => `<text x="${sx(i)}" y="${h - 8}" text-anchor="middle" font-size="16" fill="${C.ink3}">${c.toUpperCase()}</text>`).join('');
  const vals = `<text class="cd" x="${sx(0) + 16}" y="${sy(47) - 10}" font-size="20" fill="${C.black}">47</text><text class="cd" x="${sx(last)}" y="${sy(12) - 20}" text-anchor="middle" font-size="20" fill="${C.black}">12</text>`;
  return `<svg class="chart" style="left:${x}px;top:${y}px" width="${w}" height="${h}" font-family="var(--mono)">${grid}<polyline ${live ? 'pathLength="1" class="cl"' : ''} fill="none" stroke="${C.black}" stroke-width="3" points="${pts}"/>${dots}${cats}${vals}</svg>`;
}
function slideHTML(s, live) {
  const ln = s.dark ? C.lineDark : C.line, sq = s.dark ? C.gray : C.black;
  let r = 0; // ordem de entrada
  const delay = e => e.chrome ? '' : `--i:${r++};`;
  return s.els.map(e => {
    const ch = e.chrome ? ' data-chrome' : '';
    switch (e.t) {
      case 'h': return `<div class="ln lh"${ch} style="left:${e.x0}px;top:${e.y}px;width:${e.x1 - e.x0}px;background:${ln}"></div>`;
      case 'v': return `<div class="ln lv"${ch} style="left:${e.x}px;top:${e.y0}px;height:${e.y1 - e.y0}px;background:${ln}"></div>`;
      case 'x': return `<div class="mk"${ch} style="left:${e.x - 2}px;top:${e.y - 2}px;background:${sq}"></div>`;
      case 'rect': {
        const cls = e.role === 'bar' ? 'bar' : e.role === 'cell' ? 'cell' : e.role === 'blink' ? 'blink rv' : 'rv';
        return `<div class="${cls}" style="${delay(e)}left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;${e.fill ? 'background:' + e.fill : ''};${e.stroke ? 'border:1px solid ' + e.stroke : ''}"></div>`;
      }
      case 'img':
        if (live && e.tex) {
          const tx = TEX[e.tex];
          return `<canvas class="tex" data-tex='${JSON.stringify({ gen: tx.gen, seed: tx.seed, params: tx.params })}' style="left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px" width="${e.w}" height="${e.h}"></canvas>`;
        }
        return `<img${ch} src="${live ? 'data:image/png;base64,' + fs.readFileSync(path.join(DIR, e.file)).toString('base64') : '../assets/' + e.file}" style="left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px" alt="${e.file.startsWith('Logo') ? 'aurora.' : ''}">`;
      case 'chart': return chartSVG(e, live);
      case 'text': {
        const runs = Array.isArray(e.text) ? e.text : [{ text: e.text, o: {} }];
        const plain = runs.map(r => r.text).join('');
        let inner;
        if (live && e.role === 'title' && !e.chrome) {
          let k = 0;
          inner = plain.split('\n').map(line => line.split(' ').map(wd => `<span class="tw"><span style="--w:${k++}">${esc(wd)}</span></span>`).join(' ')).join('<br>');
        } else {
          inner = runs.map(r => `<span style="${r.o.color ? 'color:' + r.o.color : ''}">${esc(r.text).replace(/ {2,}/g, m => '&nbsp;'.repeat(m.length))}</span>`).join('');
        }
        const flex = e.valign === 'middle' ? 'display:flex;align-items:center;justify-content:center;' : '';
        const cls = e.chrome ? 'tx' : e.role === 'title' && live ? 'tx tt' : e.role === 'kpi' && live ? 'tx rv kp' : 'tx rv';
        const aria = live && e.role === 'title' && !e.chrome ? ` aria-label="${esc(plain)}"` : '';
        return `<div class="${cls}"${ch}${aria} style="${e.chrome ? '' : delay(e)}${flex}left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;font-family:var(--${e.font === 'mono' ? 'mono' : 'sans'});font-weight:${e.weight || 400};font-size:${e.size}px;line-height:${e.lh || 1.2};letter-spacing:${e.ls || 0}em;color:${e.color};text-align:${e.align || 'left'};${e.upper ? 'text-transform:uppercase;' : ''}">${inner}</div>`;
      }
    }
  }).join('\n');
}

function renderStatic() {
  const F = 'file://' + path.join(os.homedir(), 'Library/Fonts') + '/'; // Britti instalada (máquina licenciada)
  const css = `
@font-face{font-family:"S";src:url("${F}Britti-Sans-Regular.otf");font-weight:400}
@font-face{font-family:"S";src:url("${F}Britti-Sans-Medium.otf");font-weight:500}
@font-face{font-family:"Mo";src:url("${F}JetBrainsMono-Regular.ttf");font-weight:400}
@font-face{font-family:"Mo";src:url("${F}JetBrainsMono-Medium.ttf");font-weight:500}
:root{--sans:"S";--mono:"Mo"}
@page{size:${W}px ${H}px;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{-webkit-font-smoothing:antialiased}
section{width:${W}px;height:${H}px;position:relative;overflow:hidden;break-after:page}
section>*{position:absolute}
.ln.lh{height:1px}.ln.lv{width:1px}.mk{width:5px;height:5px}
.tx{white-space:pre-line}`;
  const body = slides.map(s => `<section style="background:${s.dark ? C.black : C.canvas}">${slideHTML(s, false)}</section>`).join('\n');
  fs.writeFileSync(path.join(OUT, 'deck-static.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Atria — deck executivo</title><style>${css}</style></head><body>${body}</body></html>`);
}

function renderLive() {
  const kernel = fs.readFileSync(path.join(__dirname, '../../aurora-web/kit/src/texture/studio.generated.js'), 'utf8')
    .replace(/^export \{[^}]*\};?\s*$/m, '');
  const workerSrc = kernel + `
// campo.ts (kit aurora-web), em JS
function criarCampo(r, cols, rows, ar){
  const g = genById(r.gen); const params = { loopR: 1.4 };
  for (const c of g.controls) params[c.k] = c.d; Object.assign(params, r.params);
  const fn = g.make(params, r.seed, null); const levels = 10, n = cols * rows, val = new Float32Array(n);
  return function(t){
    for (let y = 0; y < rows; y++){ const v = (y + .5) / rows; for (let x = 0; x < cols; x++) val[y*cols+x] = fn((x+.5)/cols, v, t, ar); }
    const idx = new Uint8Array(n), col = new Uint8Array(n);
    quantize(val, idx, col, cols, rows, levels, false, 'accent', 0.97);
    for (let i = 0; i < n; i++){ if (col[i] !== 2) continue; let h = Math.imul(i + 1, 0x9e3779b1); h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; if ((h >>> 0) / 4294967296 >= 0.4) col[i] = 0; }
    return { idx, col };
  };
}
const campos = {};
onmessage = e => { const m = e.data;
  if (m.tipo === 'config'){ campos[m.id] = criarCampo(m.receita, m.cols, m.rows, m.ar); return; }
  const f = campos[m.id]; if (!f) return; const q = f(m.t);
  postMessage({ id: m.id, t: m.t, idx: q.idx, col: q.col }, [q.idx.buffer, q.col.buffer]);
};`;
  const css = `
:root{--sans:"Britti Sans","Geist",sans-serif;--mono:"JetBrains Mono",monospace;--ease:cubic-bezier(0.625,0.05,0,1)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:${C.black};overflow:hidden}
body{-webkit-font-smoothing:antialiased;font-family:var(--sans)}
#stage{position:absolute;left:50%;top:50%;width:${W}px;height:${H}px;transform-origin:0 0}
.slide{position:absolute;inset:0;width:${W}px;height:${H}px;overflow:clip;visibility:hidden}
.slide.active{visibility:visible}
.slide>*{position:absolute}
.ln.lh{height:1px}.ln.lv{width:1px}.mk{width:5px;height:5px}
.tx{white-space:pre-line}
.tw{display:inline-block;overflow:clip;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em}
.tw>span{display:inline-block}
/* entrada */
.on .rv{animation:rise .7s var(--ease) both;animation-delay:calc(var(--i,0)*45ms + 150ms)}
.on .tt .tw>span{animation:word .8s var(--ease) both;animation-delay:calc(var(--w)*40ms + 80ms)}
.on .ln.lh:not([data-chrome]){transform-origin:0 50%;animation:drawx .9s var(--ease) both .1s}
.on .ln.lv:not([data-chrome]){transform-origin:50% 0;animation:drawy .9s var(--ease) both .1s}
.on .mk:not([data-chrome]){animation:fade .3s linear both .7s}
.on .bar{transform-origin:0 50%;animation:drawx 1s var(--ease) both;animation-delay:calc(var(--i,0)*45ms + 250ms)}
.on .cell{animation:wipe .9s var(--ease) both .25s}
.on .chart .cl{stroke-dasharray:1;animation:line 1.6s var(--ease) both .5s}
.on .chart .cd{animation:fade .3s linear both;animation-delay:1.7s}
.blink{animation:blink 1.1s steps(1,end) infinite}
.on .blink.rv{animation:rise .7s var(--ease) both,blink 1.1s steps(1,end) infinite 1s}
@keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes word{from{transform:translateY(105%)}to{transform:none}}
@keyframes drawx{from{transform:scaleX(0)}to{transform:none}}
@keyframes drawy{from{transform:scaleY(0)}to{transform:none}}
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}
@keyframes line{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes blink{0%{opacity:1}50%{opacity:0}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important}}
#au-loader{position:fixed;inset:0;z-index:10;pointer-events:none}
#hud{position:fixed;right:16px;bottom:12px;font:500 12px/1 var(--mono);letter-spacing:.04em;color:${C.gray};opacity:0;transition:opacity .3s}
body:hover #hud{opacity:1}`;
  const sections = slides.map((s, i) => `<section class="slide" data-n="${i + 1}" aria-label="Slide ${i + 1} de ${TOTAL}" style="background:${s.dark ? C.black : C.canvas}">\n${slideHTML(s, true)}\n<template class="notes">${esc(s.notes || '')}</template>\n</section>`).join('\n');
  const js = `
const W=${W},H=${H},TOTAL=${TOTAL};
const reduz=matchMedia('(prefers-reduced-motion: reduce)').matches;
const stage=document.getElementById('stage'),slides=[...document.querySelectorAll('.slide')];
function fit(){const s=Math.min(innerWidth/W,innerHeight/H);stage.style.transform='scale('+s+') translate(-50%,-50%)';}
addEventListener('resize',fit);fit();
// textura viva: cálculo no worker, desenho por atlas de glifos, 12 qps, só no slide visível
const worker=new Worker(URL.createObjectURL(new Blob([document.getElementById('kernel').textContent],{type:'text/javascript'})));
const RAMP=' .:-=+*#%@',GW=12,GH=20,CORES=['${C.gray}','${C.dim}','${C.orange}'],DPR=Math.min(2,devicePixelRatio||1);
let atlas=null;
function montaAtlas(){atlas=document.createElement('canvas');atlas.width=RAMP.length*GW*DPR;atlas.height=3*GH*DPR;const x=atlas.getContext('2d');x.scale(DPR,DPR);x.font='400 20px "JetBrains Mono", monospace';x.textBaseline='middle';x.textAlign='center';
 CORES.forEach((c,ci)=>{x.fillStyle=c;for(let k=0;k<RAMP.length;k++)x.fillText(RAMP[k],k*GW+GW/2,ci*GH+GH/2+1);});}
const texs=[...document.querySelectorAll('canvas.tex')].map((cv,id)=>{const r=JSON.parse(cv.dataset.tex);const w=cv.width,h=cv.height;cv.width=w*DPR;cv.height=h*DPR;
 const cols=Math.round(w/GW),rows=Math.round(h/GH);worker.postMessage({tipo:'config',id,receita:r,cols,rows,ar:w/h});return {id,cv,cols,rows,w,h,ctx:cv.getContext('2d'),slide:cv.closest('.slide')};});
worker.onmessage=e=>{const m=e.data,T=texs[m.id];if(!T||!atlas)return;const {ctx,cols,rows,w,h}=T;const cw=w/cols,chh=h/rows;ctx.clearRect(0,0,T.cv.width,T.cv.height);
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const i=y*cols+x,k=m.idx[i];if(!k)continue;ctx.drawImage(atlas,k*GW*DPR,m.col[i]*GH*DPR,GW*DPR,GH*DPR,x*cw*DPR,y*chh*DPR,cw*DPR,chh*DPR);}};
let t0=performance.now(),ultimo=0;
function tick(now){requestAnimationFrame(tick);if(document.hidden||!atlas)return;if(now-ultimo<1000/12)return;ultimo=now;
 const t=reduz?0:((now-t0)/1000/14)%1;texs.forEach(T=>{if(T.slide.classList.contains('active'))worker.postMessage({tipo:'quadro',id:T.id,t});});
 if(reduz)ultimo=Infinity;}
document.fonts.ready.then(()=>{montaAtlas();requestAnimationFrame(tick);});
// número que conta de 0 ao valor (1.6s)
function conta(el){const alvo=el.dataset.final||(el.dataset.final=el.textContent);const m=alvo.match(/^(\\D*?)(\\d[\\d.]*)(.*)$/);if(!m||reduz){el.textContent=alvo;return;}
 const n=parseInt(m[2].replace(/\\./g,''),10),fmt=v=>m[2].includes('.')?v.toLocaleString('pt-BR'):(m[2][0]==='0'?String(v).padStart(m[2].length,'0'):String(v));const ini=performance.now();
 (function f(now){const p=Math.min(1,(now-ini)/1600),e=1-Math.pow(1-p,3);el.textContent=m[1]+fmt(Math.round(n*e))+m[3];if(p<1)requestAnimationFrame(f);})(ini);}
// navegação
let atual=-1;
function vai(i){i=Math.max(0,Math.min(TOTAL-1,i));if(i===atual)return;if(atual>=0)slides[atual].classList.remove('active','on');atual=i;const s=slides[i];s.classList.add('active');void s.offsetWidth;s.classList.add('on');
 s.querySelectorAll('.kp').forEach(conta);history.replaceState(null,'','#'+(i+1));document.getElementById('hud').textContent=String(i+1).padStart(2,'0')+'/'+TOTAL;}
addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();vai(atual+1);}else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){e.preventDefault();vai(atual-1);}
 else if(e.key==='Home')vai(0);else if(e.key==='End')vai(TOTAL-1);else if(e.key==='f'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}});
addEventListener('click',e=>{vai(atual+(e.clientX>innerWidth/2?1:-1));});
vai((parseInt(location.hash.slice(1),10)||1)-1);
// cortina laranja que se desfaz em quadrados — só ao abrir o deck
(function(){const cv=document.getElementById('au-loader');if(reduz){cv.remove();return;}const x=cv.getContext('2d');const w=innerWidth,h=innerHeight;cv.width=w*DPR;cv.height=h*DPR;x.scale(DPR,DPR);
 const cols=24,lado=w/cols,rows=Math.ceil(h/lado),q=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)q.push({c,r,s:.15+Math.random()*.4});
 const ini=performance.now();setTimeout(()=>cv.remove(),4000);
 (function f(now){const t=(now-ini)/1000;x.clearRect(0,0,w,h);x.fillStyle='${C.orange}';let vivos=0;
  for(const p of q){const k=1-Math.min(1,Math.max(0,(t-p.s)/.1));if(k<=0)continue;vivos++;const l=lado*k;x.fillRect(p.c*lado+(lado-l)/2,p.r*lado+(lado-l)/2,Math.ceil(l),Math.ceil(l));}
  if(vivos)requestAnimationFrame(f);else cv.remove();})(ini);})();
`;
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Atria — deck executivo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<!-- aurora. · deck executivo Atria — Ciclo 01. Slides de ${W}×${H} em <section class="slide">; ← → navegam, F tela cheia.
     Fonte: Britti Sans quando instalada; sem ela, Geist (Google Fonts). Notas do apresentador em <template class="notes">. -->
<canvas id="au-loader" style="background:${C.orange}"></canvas>
<main id="stage">
${sections}
</main>
<div id="hud" aria-hidden="true"></div>
<script id="kernel" type="text/plain">${workerSrc.replace(/<\/script/g, '<\\/script')}</script>
<script>${js}</script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT, 'deck.html'), html);
}

// ---------- PPTX ----------
async function renderPPTX() {
  const pptxgen = require('pptxgenjs');
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.title = 'Atria — Ciclo 01 · deck executivo';
  pres.author = 'aurora.';
  const IN = px => px / 144, PT = px => px / 2;
  const hex = c => c.replace('#', '');
  const face = (font, wt) => font === 'mono' ? (wt >= 500 ? 'JetBrains Mono Medium' : 'JetBrains Mono') : (wt === 300 ? 'Geist Light' : wt >= 500 ? 'Geist Medium' : 'Geist');
  for (const s of slides) {
    const sl = pres.addSlide();
    sl.background = { color: hex(s.dark ? C.black : C.canvas) };
    const ln = hex(s.dark ? C.lineDark : C.line), sq = hex(s.dark ? C.gray : C.black);
    for (const e of s.els) {
      if (e.t === 'h') sl.addShape(pres.shapes.RECTANGLE, { x: IN(e.x0), y: IN(e.y), w: IN(e.x1 - e.x0), h: IN(1), fill: { color: ln }, line: { type: 'none' } });
      else if (e.t === 'v') sl.addShape(pres.shapes.RECTANGLE, { x: IN(e.x), y: IN(e.y0), w: IN(1), h: IN(e.y1 - e.y0), fill: { color: ln }, line: { type: 'none' } });
      else if (e.t === 'x') sl.addShape(pres.shapes.RECTANGLE, { x: IN(e.x - 2), y: IN(e.y - 2), w: IN(5), h: IN(5), fill: { color: sq }, line: { type: 'none' } });
      else if (e.t === 'rect') sl.addShape(pres.shapes.RECTANGLE, { x: IN(e.x), y: IN(e.y), w: IN(e.w), h: IN(e.h), fill: e.fill ? { color: hex(e.fill) } : { type: 'none' }, line: e.stroke ? { color: hex(e.stroke), width: 0.75 } : { type: 'none' } });
      else if (e.t === 'img') sl.addImage({ path: path.join(DIR, e.file), x: IN(e.x), y: IN(e.y), w: IN(e.w), h: IN(e.h) });
      else if (e.t === 'chart') {
        const labels = e.serie.map(r => r[0].toUpperCase()), last = e.serie.length - 1;
        sl.addChart(pres.charts.LINE, [
          { name: 'Minutos por contrato', labels, values: e.serie.map(r => r[1]) },
          { name: 'Fim do ciclo', labels, values: e.serie.map((r, i) => i === last ? r[1] : null) },
        ], {
          x: IN(e.x), y: IN(e.y), w: IN(e.w), h: IN(e.h),
          chartColors: [hex(C.black), hex(C.orange)], lineSize: 2, lineDataSymbol: 'square', lineDataSymbolSize: 9,
          showLegend: false, showTitle: false, showValue: false, displayBlanksAs: 'gap',
          valAxisMinVal: 0, valAxisMaxVal: 50, valAxisMajorUnit: 10,
          valAxisLabelFontFace: 'JetBrains Mono', catAxisLabelFontFace: 'JetBrains Mono', valAxisLabelFontSize: 8, catAxisLabelFontSize: 8,
          valAxisLabelColor: hex(C.ink3), catAxisLabelColor: hex(C.ink3),
          valGridLine: { color: hex(C.subtle), size: 0.5 }, catGridLine: { style: 'none' },
          catAxisLineShow: true, catAxisLineColor: hex(C.line), valAxisLineShow: false,
        });
      } else if (e.t === 'text') {
        const base = { fontFace: face(e.font, e.weight || 400), fontSize: PT(e.size), color: hex(e.color), charSpacing: e.ls ? PT(e.size) * e.ls : 0 };
        const up = t => e.upper ? t.toUpperCase() : t;
        const runs = Array.isArray(e.text) ? e.text.map(r => ({ text: up(r.text), options: { ...base, ...(r.o.color ? { color: hex(r.o.color) } : {}) } })) : up(e.text);
        sl.addText(runs, { ...base, isTextBox: true, margin: 0, wrap: true, x: IN(e.x), y: IN(e.y), w: IN(e.w), h: IN(e.h), align: e.align || 'left', valign: e.valign || 'top', lineSpacingMultiple: e.lh || 1.2, fit: 'none' });
      }
    }
    if (s.notes) sl.addNotes(s.notes);
  }
  await pres.writeFile({ fileName: path.join(OUT, 'deck.pptx') });
}

(async () => {
  const mode = process.argv[2] || 'static';
  if (mode === 'static') renderStatic(); else if (mode === 'live') renderLive(); else await renderPPTX();
  console.log('ok', mode, slides.length, 'slides');
})();

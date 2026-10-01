---
description: Monta uma apresentação da marca Aurora (16:9) em PDF, PPTX editável e HTML animado, em Opus 5
model: opus
argument-hint: [material de origem] [público e decisão que o deck pede]
---

Monte uma apresentação da marca Aurora. Argumentos recebidos: $ARGUMENTS

## Antes de desenhar

Carregue as duas skills — elas são a regra, não sugestão:

- `aurora-brand` — sobretudo a seção **Apresentação** (grid 16:9, sequência, aberturas de
  capítulo, escala de slide, laranja no slide, três saídas, movimento do HTML).
- `aurora-verbal` — todo o texto dos slides e das notas do apresentador.

O modelo de referência é `~/beyond-brand-skills/aurora/modelos/deck-atria/`: um layout em
`gerar.js` que produz as três saídas. Parta dele — copie a pasta para o trabalho e troque o
conteúdo — em vez de reescrever o gerador.

Se não estiver claro, pergunte antes de começar: para quem é o deck e **que decisão** ele
pede. Formato é sempre 16:9.

## Roteiro antes do desenho

Escreva e mostre o roteiro antes de gerar qualquer slide:

1. Capítulos (de 3 a 6), cada um com nome e a frase da abertura.
2. Páginas de cada capítulo: título, tipo de slide (KPIs em células, gráfico com célula de
   evidência, lista, linha do tempo, decisão) e a evidência que ela carrega.
3. O pedido do slide de decisão — escopo e valor. Se o valor não estiver no material, diga
   que falta; não invente número.

Siga a lógica da `aurora-verbal`: hipótese → ação → evidência → decisão.

## Gerar

- **Fonte:** confira se a Britti Sans está instalada nesta máquina. O PDF sai em Britti só
  se estiver; sem ela, o PDF também sai em Geist e a entrega diz isso. O PPTX sai sempre em
  Geist. O HTML usa a pilha `"Britti Sans", "Geist"`.
- **Texturas:** uma receita do aurora. ASCII Studio por célula (capa, contracapa, uma por
  abertura), registradas em `texturas.json`.
- Rode as três saídas e zere a lista de textos estourados que o `pdf.js` imprime.

## Ao entregar

Passe o PDF (um PNG por slide) pelo `aurora-revisor`. Depois verifique, item a item, e
relate:

- [ ] 16:9 em 1920 × 1080, grid de 320 × 135, margem de 48px
- [ ] Sequência capa → (abertura de capítulo → páginas) → contracapa; capa, aberturas e
      contracapa escuras, páginas claras
- [ ] Header com número do capítulo em 88px centralizado no módulo; footer com contador
      laranja
- [ ] Corpo com pelo menos 20px e rótulo com pelo menos 16px no canvas de 1920
- [ ] Britti Sans (ou Geist) só em Light, Regular e Medium; título longo em Regular; mono só
      em rótulo, dado, estado e navegação
- [ ] No máximo uma célula laranja por slide, em laranja 600 `#D05E2E`, com texto branco
      Medium; série de gráfico em preto, laranja só no ponto final
- [ ] Textura em uma célula por slide; marcador de 5px só em cruzamento
- [ ] Título sem palavra órfã; nenhum texto estourando a caixa
- [ ] Evidência principal no slide; nota do apresentador em toda página, sem contradizer o
      slide; decisão com pedido explícito
- [ ] HTML: animações só ao entrar no slide, header e footer parados, textura viva só no
      slide visível, tudo parado com "reduzir movimento"
- [ ] Texto passa no teste da `aurora-verbal` — se a Beyond poderia dizer a mesma frase,
      reescreva
- [ ] Fonte usada em cada saída declarada; aviso de que o PPTX precisa da Geist e da
      JetBrains Mono instaladas

Onde a regra não existir — fotografia, escala de social e impresso, importação no Claude
Design —, **sinalize como pendência**. Não invente regra que o sistema não tem.

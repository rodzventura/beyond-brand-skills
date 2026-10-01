---
description: Cria ou revisa uma peça visual da marca Aurora, em Opus 5
model: opus
argument-hint: [formato 1:1|4:5|3:4|16:9|9:16] [o que a peça precisa comunicar]
---

Crie uma peça da marca Aurora. Argumentos recebidos: $ARGUMENTS

## Antes de desenhar

Carregue as duas skills — elas são a regra, não sugestão:

- `aurora-brand` — grid, tipografia, cor, logotipo, cards, textura.
- `aurora-verbal` — todo o texto da peça: headline, body, CTA.

A fonte canônica é `~/beyond-brand-skills/aurora/canonico/aurora-identidade-visual.pdf`.
Consulte-a quando a skill não cobrir o caso. A única exceção à precedência do canônico é
a hachura, registrada em `aurora-open-questions`.

Se o pedido for uma **apresentação** (deck, slides), use `/aurora-apresentacao`.

Antes de renderizar, confira se a Britti Sans está instalada nesta máquina. Se não estiver,
use a Geist do Google Fonts como substituta (regra em `aurora-brand` → Fonte substituta).

Se o formato não vier nos argumentos, pergunte antes de começar: 1:1, 4:5, 3:4, 16:9 ou
9:16 são os únicos válidos.

## Ao entregar

Verifique explicitamente, item a item, e relate o resultado:

- [ ] Formato é 1:1, 4:5, 3:4, 16:9 ou 9:16; margem mínima de 48px respeitada
- [ ] Grid de 6 × 8 aplicado
- [ ] Britti Sans só em Regular, Medium ou Light — **nunca Semibold nem Bold**; Light apenas em
      parágrafo extenso
- [ ] Fonte usada declarada: Britti Sans (instalada nesta máquina) ou Geist (substituta, sem
      Britti licenciada) — mesmas regras de peso; arquivos da Britti nunca embutidos ou enviados
- [ ] JetBrains Mono só em legenda, tag, estado, dado, label, código, data ou navegação —
      KPI em destaque vai em Britti Sans Medium (estilos KPI/*)
- [ ] Título curto em Medium, título longo (mais de 2 linhas) em Regular
- [ ] Texto sobre laranja em branco e peso Medium; texto secundário/terciário com contraste AA
- [ ] Fundo é `#EDEDED` ou `#101011` — nunca `#FFFFFF` como fundo de peça
- [ ] Laranja `#FA6E30` é sinal, não território: até 10% da área, nunca fundo dominante
- [ ] Wordmark "aurora." minúsculo, ponto final laranja, antes de Beyond/Volund/Extreme
- [ ] Sem hachura diagonal
- [ ] Textura do Studio, com receita registrada, ocupando **uma única célula** delimitada por
      trilho e régua (ou a faixa do rodapé) — nunca a peça inteira
- [ ] Marcador quadrado de 5px só onde horizontal encontra vertical; linha sozinha sem marcador
- [ ] Laranja em célula inteira só para evidência principal ou decisão, no máximo uma por página
- [ ] Se for case ou relatório: capa e contracapa escuras, header e footer conforme
      `aurora-brand` → Estrutura de case, texto denso com medida de até ~560px
- [ ] Máximo de 3 cards por coluna, se houver cards
- [ ] Texto passa no teste de qualidade da `aurora-verbal` — sobretudo a décima pergunta:
      se a Beyond poderia dizer a mesma frase, reescreva

Onde a regra não existir — tratamento fotográfico, critério de uso de foto, sequência de
feed, escala tipográfica —, **sinalize como pendência**. Não invente regra que o sistema
não tem.

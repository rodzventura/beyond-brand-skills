---
description: Cria ou revisa uma peça visual da marca Aurora, em Opus 5
model: opus
argument-hint: [formato 1:1|4:5|16:9] [o que a peça precisa comunicar]
---

Crie uma peça da marca Aurora. Argumentos recebidos: $ARGUMENTS

## Antes de desenhar

Carregue as duas skills — elas são a regra, não sugestão:

- `aurora-brand` — grid, tipografia, cor, logotipo, cards, textura.
- `aurora-verbal` — todo o texto da peça: headline, body, CTA.

A fonte canônica é `~/beyond-brand-skills/aurora/canonico/aurora-identidade-visual.pdf`.
Consulte-a quando a skill não cobrir o caso. A única exceção à precedência do canônico é
a hachura, registrada em `aurora-open-questions`.

Se o formato não vier nos argumentos, pergunte antes de começar: 1:1, 4:5 ou 16:9 são os
únicos válidos.

## Ao entregar

Verifique explicitamente, item a item, e relate o resultado:

- [ ] Formato é 1:1, 4:5 ou 16:9; margem mínima de 48px respeitada
- [ ] Grid de 6 × 8 aplicado
- [ ] Britti Sans só em Regular, Semibold ou Light — **nunca Bold**; Light apenas em
      parágrafo extenso
- [ ] JetBrains Mono só em legenda, tag, estado, dado, label, código, data, KPI ou navegação
- [ ] Fundo é `#EDEDED` ou `#101011` — nunca `#FFFFFF` como fundo de peça
- [ ] Laranja `#FA6E30` é sinal, não território: até 10% da área, nunca fundo dominante
- [ ] Wordmark "aurora." minúsculo, ponto final laranja, antes de Beyond/Volund/Extreme
- [ ] Sem hachura diagonal
- [ ] Máximo de 3 cards por coluna, se houver cards
- [ ] Texto passa no teste de qualidade da `aurora-verbal` — sobretudo a décima pergunta:
      se a Beyond poderia dizer a mesma frase, reescreva

Onde a regra não existir — tratamento fotográfico, critério de uso de foto, sequência de
feed, escala tipográfica —, **sinalize como pendência**. Não invente regra que o sistema
não tem.

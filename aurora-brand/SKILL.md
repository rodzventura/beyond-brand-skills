---
name: "aurora-brand"
description: "Use esta skill sempre que for criar, revisar ou avaliar peças de comunicação, apresentações ou materiais visuais da marca Aurora."
---

# Aurora — Sistema de Marca

Aurora é a marca do programa de open innovation e venture building da Beyond Co.
Esta skill contém as regras verificáveis do sistema visual. Para pontos ainda em
julgamento, consulte a skill `aurora-open-questions` (`../aurora-open-questions/SKILL.md`).
Para valores brutos (hex, medidas), consulte `aurora-tokens.json`, nesta mesma pasta.

## Grid e formatos

- Grid modular de 6 colunas × 8 linhas, aplicado igualmente nos três formatos oficiais.
- Formatos válidos: 1:1, 4:5, 16:9. Não usar formatos fora desses três sem aprovação.
- Margem mínima: 48px em qualquer formato.

## Tipografia

- **Britti Sans** — uso geral: títulos, subtítulos, textos longos.
- **JetBrains Mono** — uso restrito: legendas, tags, infográficos, informação numérica.
- Nunca usar JetBrains Mono para texto corrido ou título principal.
- Nunca usar Britti Sans para tag ou marcador de status.

## Cor

- Paleta base (neutros): ver `aurora-tokens.json`.
- Accent laranja: máximo de 10% da área total da peça. Nunca usar como cor de fundo dominante.
- Se uma peça ultrapassar 10% de laranja, ela está fora do sistema — reduzir a área ou redistribuir.

## Logotipo

- Wordmark sempre minúsculo: "aurora." com ponto final laranja.
- Duas variantes: clara sobre fundo escuro, escura sobre fundo claro. Escolha do fundo é
  julgamento do designer — ver `../aurora-open-questions/SKILL.md`.
- Variação monocromática (preto e branco) é a única alteração de cor permitida no logotipo.
  Nunca alterar a cor do logotipo fora dessas variantes.
- Altura mínima de uso: 12px (valor provisório, sujeito a revisão).
- Assinatura conjunta: "aurora." sempre aparece antes de Beyond, Volund ou Extreme Group,
  nunca depois.

## Cards de status (módulos e estados)

Estrutura fixa por card:
- Código identificador (ex. `OPP-0148`)
- Tipo (ex. OPORTUNIDADE, HIPÓTESE, EVIDÊNCIA)
- Marcador de cor por status
- Corpo de texto
- Linha de próxima ação

Limite: máximo de 3 cards por coluna em qualquer composição.

## Estrutura de case

Sequência fixa: capa → páginas numeradas.
Cada página carrega header (número da seção + título) e footer (nome do produto +
categoria + ciclo + contador de dias) de forma consistente.

## Textura

Não usar hachura diagonal — removida do sistema. Textura oficial em desenvolvimento
(gerador modular ASCII). Até a substituição estar pronta, peças podem ser produzidas
sem textura.

## Fora do escopo desta skill

- Direção de tratamento fotográfico — ainda placeholder.
- Critério de quando usar fotografia — classificação solta, não decidida.
- Sequenciamento de peças na grade de feed.

Se a tarefa exigir decisão sobre esses pontos, sinalizar como pendência, não improvisar
uma regra que não existe.
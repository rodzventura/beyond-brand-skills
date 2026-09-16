---
name: "aurora-brand"
description: "Use esta skill sempre que for criar, revisar ou avaliar peças de comunicação, apresentações ou materiais visuais da marca Aurora."
---

# Aurora — Sistema de Marca

Aurora é a marca do programa de open innovation e venture building da Beyond Co.
Esta skill contém as regras verificáveis do sistema visual.

- **Fonte canônica:** `../canonico/aurora-identidade-visual.pdf` (Beyond, 30/ago). As
  referências de página abaixo apontam para ele. Em caso de dúvida, o PDF manda — com a
  exceção registrada em Textura.
- **Valores brutos** (hex, medidas, limites): `aurora-tokens.json`, nesta mesma pasta.
- **Pontos ainda em julgamento:** `../aurora-open-questions/SKILL.md`.
- **Texto e copy:** não é escopo desta skill — ver `../aurora-verbal/SKILL.md`.

## Grid e formatos

- Grid modular de 6 colunas × 8 linhas, aplicado igualmente nos três formatos oficiais.
- Formatos válidos: 1:1, 4:5, 16:9. Não usar formatos fora desses três sem aprovação.
- Margem mínima: 48px em qualquer formato.
- A posição do módulo muda entre formatos; a regra permanece (p. 36).

## Tipografia

- **Britti Sans** — uso geral: títulos, subtítulos, textos longos, formatos grandes.
- **JetBrains Mono** — camada técnica e operacional: legendas, tags, infográficos,
  informação numérica, estados, dados, labels, códigos, datas, KPIs e navegação (p. 29).
- Nunca usar JetBrains Mono para texto corrido ou título principal.
- Nunca usar Britti Sans para tag ou marcador de status.

### Pesos

- A Britti Sans usa três pesos: **Regular** e **Semibold** em títulos e formatos grandes,
  **Light** em parágrafos extensos.
- **Bold não entra no sistema** — mesmo estando disponível na família. Essa restrição é
  decisão do time, mais estrita que o canônico, que lista Bold como peso da fonte (p. 30).
- A JetBrains Mono mantém a gama completa do canônico: Light, Regular, Medium, Semibold,
  Bold e Extrabold (p. 31). A restrição acima vale só para a Britti Sans.

## Cor

- Paleta base (neutros): ver `aurora-tokens.json`.
- Fundos oficiais: escuro `#101011` (black) e claro `#EDEDED` (lightGray). São os dois
  únicos fundos dominantes válidos — `#FFFFFF` é cor de elemento, não de fundo de peça.
  Qual dos dois usar em cada peça continua sendo julgamento do designer.
- **O laranja é sinal, não território.** Não entra como campo visual dominante. Ele
  aparece onde existe função — pode indicar ação, estado, ponto de atenção, progresso,
  decisão ou evidência (p. 32).
- Máximo de 10% da área total da peça. Se uma peça ultrapassar, ela está fora do sistema —
  reduzir a área ou redistribuir. (O percentual não consta do canônico; é regra local.)

## Logotipo

- Wordmark sempre minúsculo: "aurora." com ponto final laranja.
- É tipográfico e direto: sem símbolo literal, sem aurora boreal, sem metáfora
  tecnológica (p. 23).
- **O ponto final é um sinal de sistema, não um encerramento** — funciona como estado, uma
  presença discreta e proprietária dentro da identidade.
- Duas variantes: clara sobre fundo escuro, escura sobre fundo claro. Escolha do fundo é
  julgamento do designer — ver `../aurora-open-questions/SKILL.md`.
- Variação monocromática (preto e branco) é a única alteração de cor permitida no logotipo.
  Nunca alterar a cor do logotipo fora dessas variantes.
- Monograma **"a."** para ícone de app e favicon (p. 28).
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

**Estados** que uma hipótese pode ter (p. 34): identificada, em avaliação, em teste, com
sinal encontrado, validada, em pivot, encerrada, em handover.

**Marcador:** sequência de quadrados — laranja marca a posição corrente, preto o
percorrido, vazio o pendente (p. 35).

Os módulos organizam informação; os estados mostram que alguma coisa está acontecendo. A
marca passa a mostrar visualmente aquilo que a Aurora faz operacionalmente.

## Estrutura de case

Sequência fixa: capa → páginas numeradas.
Cada página carrega header (número da seção + título) e footer (nome do produto +
categoria + ciclo + contador de dias) de forma consistente.

## Textura

Não usar hachura diagonal — removida do sistema. Textura oficial em desenvolvimento
(gerador modular ASCII). Até a substituição estar pronta, peças podem ser produzidas
sem textura.

> **Conflito conhecido com o canônico.** O PDF ainda mostra hachura diagonal em uso — case
> Atria (p. 39), peças de comunicação (p. 42) e hero do site (p. 43). A remoção foi
> decidida depois que o PDF foi fechado, então **a skill prevalece neste ponto**. É a única
> exceção à precedência do canônico.

## Fora do escopo desta skill

- Direção de tratamento fotográfico — ainda placeholder.
- Critério de quando usar fotografia — classificação solta, não decidida.
- Sequenciamento de peças na grade de feed.
- Texto, copy e tom de voz — ver `../aurora-verbal/SKILL.md`.

Se a tarefa exigir decisão sobre esses pontos, sinalizar como pendência, não improvisar
uma regra que não existe.

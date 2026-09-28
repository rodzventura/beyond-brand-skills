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
- **Design system no Figma:** arquivo *Aurora | Identidade da Marca*, página Style Guide —
  variáveis, estilos de texto e de grid espelham `aurora-tokens.json`.
- **Texto e copy:** não é escopo desta skill — ver `../aurora-verbal/SKILL.md`.

## Grid e formatos

- Grid modular de 6 colunas × 8 linhas, aplicado igualmente nos formatos oficiais.
- Formatos válidos: 1:1, 4:5, 3:4, 16:9 e 9:16. Não usar formatos fora desses cinco sem aprovação.
- **3:4 (1080×1440)** é o formato de carrossel de feed do Instagram. Não consta do canônico —
  incluído por decisão do time em 24/set, para casar com os frames de social já em produção.
  No 3:4 o módulo do grid 6 × 8 é quadrado (180 × 180).
- Margem mínima: 48px em qualquer formato.
- A posição do módulo muda entre formatos; a regra permanece (p. 36).

### Web

- Na web vale o grid de mercado: **12 colunas** no desktop (gutter 24, margem 80, conteúdo
  até 1280), **8** no tablet (gutter 24, margem 40) e **4** no mobile (gutter 16, margem 20).
- O modular 6 × 8 entra só em momentos específicos (abertura, dados, manifesto), como 6
  colunas com a mesma margem e gutter do desktop — 1 coluna Aurora = 2 colunas web.
- A variante modular de borda a borda (células sem margem) não está adotada.

## Espaçamento

- Base 4px: 0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160.
- Cantos retos (raio 0) — a Aurora é ortogonal.

## Tipografia

- **Britti Sans** — uso geral: títulos, subtítulos, textos longos, formatos grandes.
- **JetBrains Mono** — camada técnica e operacional: legendas, tags, infográficos,
  informação numérica em tabela, estados, dados, labels, códigos, datas e navegação (p. 29).
- **KPI em destaque** (o número grande de uma faixa de indicadores, card ou coluna) usa
  **Britti Sans Medium** — estilos KPI/XL, KPI/LG e KPI/MD. Decisão do time (28/set); o
  canônico põe KPIs na mono. O rótulo do número segue em mono (Label/SM).
- Nunca usar JetBrains Mono para texto corrido ou título principal.
- Nunca usar Britti Sans para tag ou marcador de status.

### Pesos

- A Britti Sans usa três pesos: **Medium** em títulos, **Regular** em títulos longos e texto,
  **Light** em parágrafos extensos.
- **Título longo** — mais de 2 linhas ou ~8 palavras ou mais — usa o mesmo tamanho do
  nível em Regular (estilos Heading/H1 Long, Heading/H2 Long). Título curto segue em Medium.
- **Semibold e Bold não entram no sistema** — mesmo estando disponíveis na família. O
  canônico lista Light, Regular, Semibold e Bold (p. 30) e não traz Medium: a troca de
  Semibold por Medium é decisão do time (24/set), registrada em `aurora-open-questions`.
- A JetBrains Mono mantém a gama completa do canônico: Light, Regular, Medium, Semibold,
  Bold e Extrabold (p. 31). A restrição acima vale só para a Britti Sans.

### Escala

Base 16px, passos de 4px, tamanhos próprios para desktop e mobile. Valores completos em
`aurora-tokens.json` → `tipografia.escala`. Resumo (desktop · mobile):

| Grupo | Estilos |
|---|---|
| Display | XL 96·56 · LG 80·48 · MD 64·40 |
| Heading | H1 56·40 · H2 48·36 · H3 40·32 · H4 32·28 · H5 24·22 · H6 20·18 |
| KPI | XL 64·40 · LG 40·32 · MD 28·24 |
| Body | LG 20·18 · MD 16 · SM 14 · Long (Light) 18·17 · Caption 12 · Button/MD 16 (Medium) |
| Mono | Label LG 16·14 · MD 14·12 · SM 12·11 (caixa alta, +4%) · Data 16·14 |

Um Display por tela ou peça. A escala vale para web e interface; **peças de formato fixo**
(social, slides, impresso) ainda não têm escala própria — sinalizar como pendência.

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

### Cores por função

Nas peças e na interface, usar os tokens por função (`cor.por_funcao` no JSON), nunca a
primitiva direto. Cada um tem valor para o modo claro e o escuro: fundo (`bg/canvas`,
`bg/surface`, `bg/inverse`), texto (`primary`, `secondary`, `tertiary`, `accent`,
`on-accent`), borda, sinal, estados do marcador e foco. As escalas completas de neutros e
laranja estão em `cor.primitivas` — as cores oficiais são âncoras fixas dentro delas.

### Contraste

- Alvo: WCAG AA. `text/primary`, `text/secondary` e `text/tertiary` passam nos dois modos.
- **Texto sobre laranja é branco, sempre em peso Medium** (estilo Button/MD ou Label mono).
  Concessão (28/set): 2.9:1, abaixo do AA — o peso compensa parte da leitura. Preto daria 6.6:1.
- O cinza oficial `#97979D` só funciona como texto no escuro. No claro, texto de apoio usa
  `text/secondary` (neutral/700).
- **Concessão (28/set):** o laranja oficial é usado como texto também no claro, onde dá
  2.4:1. Só em rótulos, tags e links curtos — nunca texto corrido. Registrado em
  `aurora-open-questions` para reavaliação.
- No escuro, o marcador "percorrido" usa cinza (neutral/500) — preto some no fundo escuro.

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
- **Arquivos** em `assets/`: `Logo_dark.svg` (escuro, para fundo claro), `Logo_light.svg`
  (claro, para fundo escuro), `Logo_mono_black.svg` e `Logo_mono_white.svg`. Usar esses
  arquivos — não redesenhar nem recolorir o wordmark.
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

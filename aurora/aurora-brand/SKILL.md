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
- **Marcador de cruzamento:** quadrado de 5px **só** onde uma linha horizontal encontra uma
  vertical — cruzamento ou encontro em T (ex.: trilho que termina na régua do rodapé). Linha
  sozinha não leva marcador, nem no meio nem na ponta (decisão de 01/out). No escuro, o
  marcador é cinza (neutral/500).
- **Marcador de cruzamento ≠ marcador de estado.** O quadrado de 12px de estado (fluxo,
  marco de linha do tempo, ponto de gráfico, card de status) pode ficar sobre uma linha
  sozinha — ele marca uma posição, não um encontro de linhas.

### Web

- Na web vale o grid de mercado: **12 colunas** no desktop (gutter 24, margem 80, conteúdo
  até 1280), **8** no tablet (gutter 24, margem 40) e **4** no mobile (gutter 16, margem 20).
- O modular 6 × 8 entra só em momentos específicos (abertura, dados, manifesto), como 6
  colunas com a mesma margem e gutter do desktop — 1 coluna Aurora = 2 colunas web.
- A variante modular de borda a borda (células sem margem) não está adotada.
- **Trilhos e réguas:** linhas de 1px — verticais no meio da margem, horizontais entre elas,
  com marcador quadrado de 5px no cruzamento. Seções alternam modo claro e escuro.
- Regras completas de página, tela de tarefa, formulário, movimento e kit de componentes:
  `../aurora-web/SKILL.md`.

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

### Fonte substituta — Geist

A Britti Sans é licenciada por máquina (YouWorkForThem). Para gerar peças sem depender da
licença (decisão de 01/out):

- **Com a Britti Sans instalada** no computador de quem gera a peça, usar a Britti Sans.
- **Sem acesso à Britti Sans licenciada** (outra máquina, agente na API, servidor), usar a
  **Geist** (Vercel, Google Fonts, licença SIL OFL 1.1 —
  https://fonts.google.com/specimen/Geist). Ela substitui a Britti Sans em todos os papéis,
  com as **mesmas regras de peso**: Light, Regular e Medium; nunca Semibold nem Bold.
- A JetBrains Mono não muda: já é livre (OFL) e está no Google Fonts.
- **Nunca embutir nem enviar os arquivos da Britti Sans** para fazer a peça funcionar fora
  de uma máquina licenciada — é exatamente o caso que a Geist resolve. Exceção: o
  subconjunto que o próprio PDF embute ao ser exportado numa máquina licenciada (decisão de
  01/out: deck e relatório em PDF saem em Britti). A permissão de embutir está pendente de
  confirmação com a YWFT — ver `aurora-open-questions`.
- **Saída editável** (PPTX, Google Slides, Keynote) sai **sempre em Geist** — o arquivo
  circula e é aberto em máquinas sem a Britti.
- Pilha de fontes: `"Britti Sans", "Geist", sans-serif`. Em HTML, carregar a Geist do Google
  Fonts e, antes de exportar, conferir qual das duas carregou de fato
  (`document.fonts.check`).
- **Declarar na entrega** qual fonte foi usada. Peça em Geist é válida para revisão e uso
  interno; se a peça final precisar da Britti Sans, regenerar numa máquina licenciada.
- As métricas não são iguais: a troca de fonte pode mudar quebras de linha e alturas de
  bloco. Conferir títulos e texto denso depois de renderizar.
- O site publicado continua na Britti Sans, com os `.woff` da licença web — ver
  `../aurora-web/SKILL.md`.

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

Um Display por tela ou peça. A escala vale para web e interface. **Slides** têm escala
própria (ver Apresentação). **Social e impresso** ainda não têm — sinalizar como pendência.

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
- **Laranja em célula** (01/out): o laranja pode preencher uma célula inteira do grid quando
  marca a **evidência principal** ou uma **decisão** — no máximo uma célula por página, com
  texto branco em Medium, contando nos 10% (uma célula de 3 × 1 módulos no 3:4 dá ~6%). É a
  forma de dar presença ao laranja sem virar território; peça muito monocromática pede uma
  célula com função, não mais rótulos laranja.
- **Célula com texto usa o laranja 600 `#D05E2E`** (01/out): branco sobre ele dá 3.95:1 —
  passa no AA para texto grande (KPI, título) — contra 2.86:1 do laranja oficial. O laranja
  oficial `#FA6E30` segue em todo o resto: marcador, ponto de gráfico, contador, rótulo,
  segmento de atenção. Os rótulos pequenos dentro da célula ficam abaixo do AA (concessão).

### Cores por função

Nas peças e na interface, usar os tokens por função (`cor.por_funcao` no JSON), nunca a
primitiva direto. Cada um tem valor para o modo claro e o escuro: fundo (`bg/canvas`,
`bg/surface`, `bg/inverse`), texto (`primary`, `secondary`, `tertiary`, `accent`,
`on-accent`), borda, sinal, estados do marcador e foco. As escalas completas de neutros e
laranja estão em `cor.primitivas` — as cores oficiais são âncoras fixas dentro delas.

### Contraste

- Alvo: WCAG AA. `text/primary`, `text/secondary` e `text/tertiary` passam nos dois modos.
- **Texto sobre laranja é branco, sempre em peso Medium** (estilo Button/MD ou Label mono).
  Concessão (28/set): 2.9:1 no laranja oficial, abaixo do AA — o peso compensa parte da
  leitura. Preto daria 6.6:1. Em célula de peça e slide, o fundo é o laranja 600 (3.95:1).
- O cinza oficial `#97979D` só funciona como texto no escuro. No claro, texto de apoio usa
  `text/secondary` (neutral/700).
- **Concessão (28/set):** o laranja oficial é usado como texto também no claro, onde dá
  2.4:1. Só em rótulos, tags e links curtos — nunca texto corrido. Registrado em
  `aurora-open-questions` para reavaliação.
- No escuro, o marcador "percorrido" usa cinza (neutral/500) — preto some no fundo escuro.
- **`text/tertiary` não serve sobre `bg/surface` no escuro** (3.97:1, reprova no AA). Em
  painel e card escuro, texto de apoio usa `text/secondary`. Sobre `bg/canvas` o terciário
  continua valendo (30/set, telas do app).

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
percorrido, vazio o pendente (p. 35). Na web, o quadrado corrente **pisca** (liga e desliga,
sem fade, 1.1s), em todo marcador (decisão de 29/set); com movimento reduzido, fica parado.
Marcador é sempre quadrado — também no status "aberta" de uma chamada, onde o protótipo do
app usava círculo.

Os módulos organizam informação; os estados mostram que alguma coisa está acontecendo. A
marca passa a mostrar visualmente aquilo que a Aurora faz operacionalmente.

## Ícones

- Família: **Material Symbols · Sharp, peso 300, em linha** (Google, Apache 2.0) — cantos
  retos, coerente com a ortogonalidade da marca. Escolhida em 29/set, sem biblioteca premium
  por ora (ver `aurora-open-questions`).
- Tamanhos usuais: 16px em botão e link, 20px em lista e campo, 24px em card.
- Cor: a do texto em volta; laranja só quando o ícone marca estado ou ação (ex.: hover de
  célula de benefício).
- O menu de celular usa duas linhas (`drag_handle`), não três.
- Os caminhos prontos e a licença estão no kit da `aurora-web`.

## Estrutura de case

Sequência fixa: capa → páginas numeradas → contracapa.
Cada página carrega header (número da seção + título) e footer (nome do produto +
categoria + ciclo + contador de dias) de forma consistente.

Fechado no relatório do case Atria (01/out), para o 3:4:

- **Capa e contracapa em fundo escuro.** A textura entra numa única célula (ver Textura).
  A contracapa traz o wordmark grande e, depois dele, "Um programa Beyond Co.".
- **Header:** número da seção em Britti Sans Medium **88px**, centralizado no módulo de
  180 × 180 do canto; trilho vertical em x = 180 até a régua; título da seção em Label/MD
  mono à direita do trilho; wordmark à direita com **23,8px** de altura.
- **Footer:** na faixa da linha 8, em Label/SM mono; o contador de página fica em laranja
  (navegação, posição corrente).
- **Texto denso:** Body/Long (Light 18/160%), medida de até **~560px** (~75 caracteres) —
  ou duas colunas de 444px com o trilho entre elas. Notas de margem em mono, do outro lado
  do trilho, alinhadas à primeira linha do parágrafo.
- Valores em `aurora-tokens.json` → `case`.

## Apresentação

Fechado no deck executivo do case Atria (01/out). Comando: `/aurora-apresentacao`. Modelo
de referência (gerador das três saídas): `../modelos/deck-atria/`. Valores em
`aurora-tokens.json` → `apresentacao`.

**Formato e grid.** 16:9 em 1920 × 1080; módulo do grid 6 × 8 de 320 × 135; margem 48.

**Sequência:** capa → (abertura de capítulo → páginas) × capítulos → contracapa. Capa,
aberturas e contracapa em fundo escuro; páginas em fundo claro. Um capítulo agrupa uma ou
mais páginas; o deck não vai direto do sumário para o conteúdo.

- **Abertura de capítulo:** trilho em x = 1280 e régua em y = 675. Acima da régua, o número
  do capítulo em Britti Medium 240px e a textura na célula à direita do trilho. Abaixo, o
  nome do capítulo (64px Medium) e uma frase do que vem (24px), e, na célula da direita, a
  lista "Neste capítulo" com o número de cada página, em mono.
- **Header de página:** número do capítulo em Medium 88px, centralizado no módulo de
  320 × 135; título da página em Label mono 18px à direita do trilho; wordmark com 28px.
- **Footer:** régua em y = 945; Label mono 16px; contador de página (conta todos os slides,
  capa incluída) em laranja.

**Escala de slide** (px no canvas de 1920; no PPTX, pt = px ÷ 2): número de capítulo 240 ·
display 160 · número do header 88 · título 64 (longo em Regular) · KPI 64 · subtítulo 40 ·
H3 32 · H4 28 · lead 24 · **corpo 20 (mínimo)** · rótulo 18 · **rótulo 16 (mínimo)**.

**Tipos de slide:** capa, abertura de capítulo, KPIs em células, gráfico com célula de
evidência, lista, linha do tempo, decisão, contracapa. Variar o tipo entre páginas
seguidas.

**Conteúdo:**

- Uma ideia por slide. A evidência principal fica no slide, nunca só na nota.
- Toda página tem nota do apresentador; a nota não contradiz o slide.
- O slide de decisão traz o pedido explícito — escopo e valor. Se o valor não estiver no
  material, a nota diz que ele falta; não inventar número.
- A contracapa retoma a decisão, com wordmark e "Um programa Beyond Co." depois dele.
- Case fictício avisa na capa e na contracapa.
- Título sem palavra órfã: dimensionar a caixa para a quebra cair numa frase inteira.

**Laranja no slide:** no máximo uma célula (laranja 600) por slide. Fora dela, só sinais
pontuais em laranja oficial: marcador corrente, ponto final do gráfico, contador, segmento
de atenção. **Série de gráfico em preto**, com o laranja só no ponto final — no PPTX, uma
segunda série de um ponto, para o gráfico seguir nativo e editável.

**Três saídas possíveis, do mesmo layout.** Perguntar logo no início qual delas o
solicitante quer e gerar **só as pedidas** — cada saída a mais custa tempo e tokens sem
necessidade (decisão de 01/out).

| Saída | Fonte | Uso |
|---|---|---|
| PDF | Britti Sans (máquina licenciada) | Referência visual e envio |
| PPTX | Geist + JetBrains Mono (precisam estar instaladas em quem abre — avisar na entrega) | Edição |
| HTML | Pilha `"Britti Sans", "Geist"` (Geist do Google Fonts) | Apresentar no navegador e importar no Claude Design |

**HTML de apresentação** — arquivo único, sem build; cada slide é uma
`<section class="slide">` de 1920 × 1080 escalada para a janela; notas em
`<template class="notes">`; setas, clique e F (tela cheia). Micro animações da `aurora-web`,
ao entrar em cada slide: título palavra a palavra por trás de máscara, blocos subindo 24px
em sequência, réguas e trilhos se desenhando, números contando até o valor (1.6s), barras
crescendo, célula laranja abrindo da esquerda, linha do gráfico se desenhando, marcador
corrente piscando (1.1s, sem fade). Header e footer não animam. Textura viva com o núcleo do
Studio (kit da `aurora-web`) num Web Worker, desenho por atlas de glifos, 12 quadros por
segundo, só no slide visível. Cortina laranja em quadrados só ao abrir o deck. Tudo para com
"reduzir movimento". Curva padrão `cubic-bezier(0.625, 0.05, 0, 1)`.

## Textura

- **Textura oficial: ASCII**, gerada no **aurora. ASCII Studio**
  (https://aurora-ascii-studio.vercel.app), oficializada em 30/set a partir do uso na LP.
- **Receitas:** cada uso tem uma receita (gerador, seed, parâmetros), reproduzível no Studio.
  Não desenhar textura à mão nem com outro gerador.
- **Cor:** glifos no cinza do modo; o laranja aparece só em picos raros — nunca como mancha
  ou campo, e conta no teto de 10%.
- **Opacidade:** até 20% atrás de título e texto; cerca de 30% atrás do wordmark, sem
  máscara ou sombra em volta da marca.
- **Contato com a estrutura:** pode encostar em trilhos, réguas e bordas. Só texto e
  números precisam de respiro.
- **Confinamento (01/out):** em peça de formato fixo, a textura ocupa **uma única célula**
  delimitada por trilho e régua — nunca a peça inteira. **Célula** é a área fechada por
  trilhos e réguas, não um módulo do grid: pode somar vários módulos. A exceção é a faixa do rodapé, onde
  pode ficar atrás do texto do rodapé, dentro do teto de opacidade. Numa célula sem texto,
  a textura entra com opacidade cheia.
- **Modo sinal:** os picos laranja têm de ser raros. Se o laranja virar mancha na ponta de um
  gradiente, ajustar a receita (suavidade e ruído) em vez de aceitar a mancha.
- **Na web:** regras de desempenho e posições em `../aurora-web/SKILL.md`.
- **Fora dela:** peças de formato fixo exportam do Studio (PNG/SVG/texto).
- **Hachura diagonal:** não usar — removida do sistema.

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

---
name: "aurora-web"
description: "Use esta skill sempre que for criar, revisar ou avaliar páginas web, landing pages ou telas de aplicativo da marca Aurora (site, login, formulários, listas, painéis). Traz as regras de web e interface e um kit de componentes pronto em React + Tailwind."
---

# Aurora — Web e interface

Regras e padrões que saíram da construção da LP nova da Aurora (28–30/set/2026) e das telas
do app (login, chamadas, candidatura). Complementa as outras skills; não repete o que já está
nelas.

- **Sistema visual** (cor, tipo, logo, grid de peça): `../aurora-brand/SKILL.md`. Esta skill
  só acrescenta o que é específico de web.
- **Texto de interface:** `../aurora-verbal/SKILL.md`, seção "Interface".
- **Pendências:** `../aurora-open-questions/SKILL.md`. O que está lá é julgamento, não falha.
- **Código de referência:** o projeto da LP (`~/aurora-lp`, espelho no HD em
  `BEYOND/AURORA/LANDING PAGE/aurora-lp.git`). O `kit/` desta pasta é uma cópia das peças
  reutilizáveis dele — ver `kit/README.md`.

## Stack

React 18 + TypeScript + Vite + Tailwind 3, igual ao app Aurora (Lovable + Supabase), para
qualquer página poder viver sozinha ou dentro do app.

- **Tokens:** `tokens.css` é gerado de `aurora-tokens.json` (`scripts/build-tokens.mjs`), com
  os mesmos nomes das variáveis do Figma. Nunca editar `tokens.css` à mão.
- **Tailwind só estende o tema:**
  - cores por função com prefixo `au-` (`bg-au-bg-canvas`, `text-au-text-secondary`);
  - texto por estilo (`type-heading-h1`, `type-label-sm`);
  - espaço só na escala 4px (`p-1` … `p-40`);
  - nada de `rounded-*`.
- **Britti Sans:** fora do git. A licença web cobre o site publicado, não o repositório. Os
  `.woff/.woff2` vão direto no deploy ou num CDN próprio. `britti-sans.css` mantém os
  cabeçalhos de licença intactos.
- **Ícones:** Material Symbols · Sharp, peso 300, embutidos como caminhos em `icones.ts`. A
  licença Apache 2.0 acompanha o código.

## Estrutura de página

- **Grade de 12 / 8 / 4 colunas:** margem 80 / 40 / 20, conteúdo até 1280.
- **Trilhos:** linhas verticais de 1px no **meio da margem** (`--rail-inset`), para o texto
  ficar na grade e a linha ter respiro. No celular não há trilho, só réguas.
- **Réguas:** horizontais de 1px entre os trilhos, com um marcador quadrado de 5px onde cruzam
  o trilho. Empilhadas, as seções formam uma linha contínua.
- **Seções alternam modo claro e escuro** (`data-theme` na seção):
  - o cabeçalho fixo segue a seção que passa por baixo dele;
  - um card em destaque dentro da seção recebe o modo oposto (`data-theme` no próprio card).
- **Faixa texturizada:** uma abertura de seção pode ficar sobre uma faixa de trilho a trilho
  com a textura a 20%. Use `overflow: clip`, não `hidden` (ver Armadilhas).
- **Abertura de seção:**
  - desktop: rótulo mono `[01 · Nome]` nas 4 primeiras colunas, título e texto nas 8
    seguintes;
  - tablet e celular: empilha.
- **Rodapé:** wordmark e nome por extenso (Label/SM com entrelinha 150%), colunas de links e
  uma linha final com copyright e cidades.

## Hierarquia de telas de tarefa (formulário, login, lista)

A lição central das telas do app: **uma grade de caixas com o mesmo peso deixa a tela confusa**.
Tela de tarefa tem três níveis, nesta ordem:

1. **Um ponto de entrada:** título grande ou marca.
2. **Uma zona de tarefa única:** o formulário ou a lista como um objeto só, lido de cima para
   baixo.
3. **Uma ação evidente no fim:** um botão primário, com o que acontece depois escrito ao lado.

Informação de apoio fica recuada, menor, em linhas de rótulo mono e valor. Dois modelos
cobrem os casos:

- **Contexto + painel** (candidatura, página e lista de chamadas):
  - contexto à esquerda (5 colunas), preso ao rolar;
  - a tarefa num painel à direita (7 colunas): superfície um tom acima, fio de 1px, cantos
    retos, título com quadrado laranja;
  - no celular, o contexto encolhe para o essencial e o painel vai de borda a borda;
  - se a ação ficar no fim de um texto longo, entra uma barra fixa embaixo com prazo e botão.
- **Duas colunas de acesso** (login, criar conta, recuperar senha):
  - à esquerda, só a textura e o wordmark;
  - à direita, título numa linha na largura exata do formulário (`TituloNaLargura`),
    subtítulo, seletor Entrar / Criar conta, campos, botão e as entradas sociais;
  - a vista vai na URL (`?view=`) e `?next=` diz para onde voltar, **só caminhos internos**.

Não usar a grade de células com fio entre todas (a Etapa A reprovada de 29–30/set).

## Formulários

- **Campo:**
  - rótulo em mono (Label/SM) **acima**, no cinza secundário;
  - caixa de 1px, altura 48, sem raio;
  - asterisco laranja para obrigatório, e o leitor de tela lê "obrigatório".
- **Estados:**
  - **foco:** a caixa fica laranja;
  - **erro:** a borda fica laranja e a mensagem aparece logo abaixo, com um quadradinho
    laranja. A marca não tem cor de erro: o laranja de sinal faz esse papel, sempre com texto.
    No envio, o foco vai para o primeiro campo com erro;
  - **texto de apoio** (dica, regra): no cinza **secundário**. O terciário sobre o painel
    escuro dá 3.97:1 e reprova.
- **Escolha curta (3–5 opções):** botões em colunas iguais de 52px de altura, não uma lista
  suspensa. O selecionado fica laranja com texto branco.
- **Anexo:**
  - área tracejada para soltar ou escolher (no celular, só "Escolha o arquivo");
  - valida quantidade, tamanho e formato antes de aceitar, e diz o motivo quando recusa;
  - as regras ficam em mono embaixo.
- **Grupos:** num formulário longo, grupos numerados (`01 · Sobre a startup`) em mono laranja,
  separados por um fio, na mesma página. Evite avançar etapa por etapa.
- **Progresso:** o marcador de quadrados mostra os grupos completos. O próximo pisca; com
  todos completos, nenhum pisca.
- **Rascunho:** salvar só quando algo mudou (depois de 600ms parado) e mostrar o horário.
  Apagar depois do envio.
- **Envio:** o botão diz "Enviando…" e fica ocupado. Depois, o painel vira a confirmação,
  com um quadrado laranja no título.

## Movimento

Tudo respeita "reduzir movimento": sem animação, com o estado final à mostra.

| Onde | Como |
|---|---|
| Botão e célula clicável | Dissolução em pixels: sprite de 20 quadros, `steps(19)`, 580ms; texto e ícone rolam em 480ms. Primário vai do laranja para o inverso; secundário vai do contorno para o cinza, nunca para o laranja |
| Entrada na rolagem | `data-reveal` no bloco e `data-reveal-item` nos filhos: sobe 24px e aparece, 80ms entre itens. Grade com fresta de 1px entra inteira |
| Título | Palavra a palavra, cada uma subindo de trás de uma máscara, 40ms entre palavras, com `aria-label` na frase inteira |
| Texto de apoio | Preenche palavra a palavra com a rolagem (`animation-timeline: view()`); sem suporte, aparece pronto |
| Número em destaque | Conta de 0 ao valor quando entra na tela (1.6s); o valor final reserva a largura |
| Régua | Desenha da esquerda para a direita |
| Marcador de status | O quadrado corrente pisca (liga e desliga, sem fade, 1.1s) |
| Curva padrão | `cubic-bezier(0.625, 0.05, 0, 1)` |

## Textura ASCII

A textura oficial é a do **aurora. ASCII Studio** (ver `../aurora-brand/SKILL.md`, Textura).
Na web:

- **Receitas:** cada posição tem uma receita (gerador, seed, parâmetros), em `receitas.ts`. O
  núcleo vem do Studio por `npm run textura:sync`; não reescrever o algoritmo.
- **Laranja:** só em picos raros (`acentoRaro`), nunca como mancha.
- **Faixa atrás de título:** até 20% de opacidade.
- **Atrás do wordmark:** cerca de 30%, sem máscara, que faz uma sombra em volta da marca.
- **Contato com a estrutura:** a textura pode encostar em trilho e régua. Só texto e números
  precisam de respiro.
- **Desempenho (obrigatório):**
  - o cálculo do quadro roda num Web Worker;
  - o desenho usa um atlas de glifos (`drawImage`), não `fillText` por célula;
  - pausa fora da tela e com a aba oculta;
  - área grande em movimento lento a 12 quadros por segundo.

  Sem isso, uma faixa larga custa cerca de 37ms por quadro e trava a rolagem.

## Celular e tablet (decisões da LP)

- **Hero:** abaixo de 1280, sai o que não é essencial (o módulo de status) e o texto de apoio
  sobe para baixo do título. O primeiro botão tem que caber na primeira tela.
- **Hover:** onde o desktop depende de hover, o toque troca pela rolagem. O card que cruza o
  meio da tela fica ativo.
- **Lista presa ao lado de painéis:** vira sanfona abaixo de 1280.
- **Logos de empresa:** 75% do tamanho no celular.
- **Grade de 4 colunas com domínio ou legenda:** fica em 2 colunas até 1024.
- **Palavra longa em célula estreita:** hifenizar (`hyphens: auto`, `lang="pt-BR"`). Termo
  com hífen que não pode quebrar usa o hífen inseparável (U+2011).

## Acessibilidade (checklist)

- **axe-core sem violações**, exceto as duas concessões de contraste registradas em
  `aurora-open-questions` (laranja como texto no claro; branco sobre laranja).
- **Landmarks:** o `<header>` e o `<main>` da página não podem estar dentro de uma `<section>`,
  senão deixam de ser landmarks. O rodapé usa `<footer>` como raiz da seção.
- **Foco:**
  - visível em tudo, e "Pular para o conteúdo" no topo;
  - em grade com fresta de 1px, o contorno vai **por dentro** (`outline-offset: -2px`), senão as
    células vizinhas o cobrem.
- **Estrutura:** um `<dl>` só aceita `dt`/`dd` ou `div` com eles como filhos diretos; painel
  que abre e fecha fica fora dele. Os títulos seguem a ordem H1 → H2 → H3.
- **Redirecionamento:** `?next=` e qualquer destino vindo da URL aceitam só caminhos internos
  (`/^\/(?!\/)/`).

## Armadilhas já encontradas

- **`overflow: hidden` cria contêiner de rolagem** e prende `animation-timeline: view()` dentro
  dele: o texto nunca termina de preencher. Use `overflow: clip`.
- **Régua que atravessa a página** (`border-image` com `100vmax`) corta painéis em layouts de
  duas colunas. Nesse caso, a régua fica só na largura da coluna.
- **Rascunho no StrictMode:** o efeito roda duas vezes; salvar só se o conteúdo mudou.
- **Animação guiada por IntersectionObserver** não roda com a aba oculta. Para testar, deixe o
  navegador visível.

## Entrega e publicação

- **Guia de entrega:** o `ENTREGA.md` da LP é o modelo — fontes, formas de publicar (sozinha
  ou incorporada ao app), rotas, conteúdo, favicon, imagem de compartilhamento (1200×630),
  licenças e checklist.
- **Versão de aprovação na Vercel:**
  - `npm run build:aprovacao` com `SITE=` gera `noindex`, as tags de compartilhamento com o
    endereço de aprovação e um `vercel.json`;
  - publique a pasta `dist/` com `env -u VERCEL_TOKEN vercel deploy --prod --scope
    aurora-beyond`;
  - o endereço limpo tem que ser **domínio do projeto** (`vercel domains add`); um alias
    feito à mão cai no login da Vercel.
- **Publicar em produção:** só com aprovação do time de marca. Quem publica é o Rodrigo.

## Kit

`kit/` tem as peças reutilizáveis prontas: base (tokens, layout, componentes, movimento,
telas do app), componentes de interface e de formulário, textura, hooks, scripts, favicon e
wordmark. Instruções de uso e de atualização em `kit/README.md`.

# Modelo de apresentação — deck executivo Atria

Gerador de referência das regras de `aurora-brand` → **Apresentação**. Um único layout em
`gerar.js` produz as três saídas do sistema:

| Comando | Saída | Fonte |
|---|---|---|
| `npm run pdf` | `saida/deck.pdf` | Britti Sans — só numa máquina com a fonte licenciada instalada |
| `npm run pptx` | `saida/deck.pptx` | Geist + JetBrains Mono (precisam estar instaladas em quem abre) |
| `npm run html` | `saida/deck.html` | `"Britti Sans", "Geist"` — Geist vem do Google Fonts |

`npm install` uma vez antes (puppeteer baixa um Chrome headless).

## Para um deck novo

1. Copie esta pasta.
2. Troque o conteúdo em `gerar.js`: `CAPS` (capítulos) e as chamadas `page(...)` e
   `opener(...)`. As coordenadas são px no canvas de 1920 × 1080, no grid de 320 × 135.
3. Gere as texturas das células no [aurora. ASCII Studio](https://aurora-ascii-studio.vercel.app)
   a partir das receitas em `texturas.json` (mesmo gerador e seed reproduzem a textura). O
   HTML anima a mesma receita ao vivo, com o núcleo do Studio que está no kit da `aurora-web`.
4. Rode `npm run tudo`, confira o PDF e passe pelo `aurora-revisor`.

`pdf.js` lista os textos que estouram a própria caixa — rodar e zerar a lista antes de
entregar.

## O que não vai no repositório

Os arquivos da Britti Sans. O gerador lê a fonte de `~/Library/Fonts`, onde ela já está
instalada numa máquina licenciada.

# Kit aurora-web

Peças reutilizáveis da LP da Aurora, prontas para copiar para outro projeto React + Vite +
Tailwind 3 (inclusive o app Lovable). As regras de uso estão em `../SKILL.md`.

**Fonte da verdade do código:** o projeto da LP (`~/aurora-lp`). Este kit é uma cópia gerada por
`atualizar.sh`: não editar os arquivos aqui. Mudou algo na LP? Rode o script de novo.

```bash
aurora/aurora-web/kit/atualizar.sh                 # a partir de ~/aurora-lp
AURORA_LP=/outro/caminho aurora/aurora-web/kit/atualizar.sh
```

Os tokens (`src/design/aurora-tokens.json`) vêm sempre de `../../aurora-brand/`, não da LP.

## O que tem

| Pasta | O quê |
|---|---|
| `src/styles/` | `layout.css` (container, trilhos, réguas, cabeçalho), `components.css` (dissolução, botão, link, tag, marcador), `motion.css` (entrada na rolagem, palavras, réguas, preenchimento, sanfona), `app.css` (campos, opções, anexo, seletor, lista) |
| `src/index.css` | Base: importa os estilos e o Tailwind, fonte e fundo do `body`, foco |
| `src/components/ui/` | `Button`, `ArrowLink`, `Tag`, `Eyebrow`, `SectionHeading`, `Palavras` (título palavra a palavra, texto que preenche), `Kpi` + `Contador`, `StatusMarker`, `Icon` + `icones.ts`, `TextureSlot` |
| `src/components/layout/` | `Section` (modo claro/escuro), `Container`, `Rule`, `FaixaTexturada`, `GridOverlay` (tecla G em dev) |
| `src/components/brand/` | `Wordmark` (arquivos oficiais), `Logo` (SVG inline com `currentColor`) |
| `src/components/app/` | `AppShell`, `Campo` (`CampoTexto`, `CampoArea`, `Opcoes`, `CampoArquivo`), `Seletor`, `StatusChamada`, `TituloNaLargura` |
| `src/hooks/` | `useDissolve`, `useScrollReveal`, `useInView`, `useMediaQuery`, `useThemeUnder` |
| `src/texture/` | `AsciiTexture` (canvas + atlas), `campo.ts` + `texture.worker.ts`, `receitas.ts`, núcleo do Studio (gerado) |
| `scripts/` | `build-tokens.mjs`, `sync-tokens.mjs`, `build-pixel-mask.mjs`, `sync-ascii-kernel.mjs`, `build-aprovacao.mjs` |
| `config/` | `tailwind.config.ts`, `vite.config.ts`, `tsconfig*`, `postcss.config.js`, `index.html` e `env.exemplo` — referência |
| `public/` | `favicon.svg` (segue o tema do navegador), `favicon.ico`, `apple-touch-icon.png`, `fonts/britti-sans.css` |
| `licenses/` | Licença da Material Symbols (Apache 2.0), que acompanha o código |

**Não tem:**
- as seções e telas da LP (hero, portfólio, jornada, login, candidatura…): estão no
  `aurora-lp`, como exemplo de uso;
- o conteúdo (`src/content/`);
- **os arquivos da Britti Sans.** A licença não cobre repositório nem skill, e o script para com
  erro se encontrar um arquivo de fonte no kit.

## Como usar num projeto novo

1. Crie o projeto Vite + React + TS e instale: `react-router-dom`, `@fontsource/jetbrains-mono`,
   `tailwindcss@3`, `postcss`, `autoprefixer`, `@vitejs/plugin-react-swc`.
2. Copie `src/`, `scripts/` e `public/` do kit para o projeto. Use `config/` como base para
   `tailwind.config.ts`, `vite.config.ts` (alias `@/` → `src/`), `tsconfig*` e `index.html`.
   Copie `config/env.exemplo` como `.env`, com o endereço do site.
3. No `package.json`: `"tokens": "node scripts/build-tokens.mjs"` e
   `"build": "npm run tokens && tsc -b && vite build"`.
4. Coloque os seis arquivos da Britti em `public/fonts/`, fora do git (ver `ENTREGA.md` da LP).
5. Importe `src/index.css` no `main.tsx`, junto com `@fontsource/jetbrains-mono/400.css` e
   `500.css`.

## Como usar dentro do app Aurora (Lovable)

Mesmo caminho, com três cuidados:
- **Tailwind:** junte só o `theme.extend` do `tailwind.config.ts`.
- **Nomes:** o shadcn também usa `components/ui/` (`Button`…). Em caso de conflito, mova os do
  kit para `components/aurora/` e ajuste os imports.
- **CSS global:** o `index.css` e o `motion.css` aplicam estilos no `body` e em `[id]`.
  Restrinja-os às páginas da Aurora para não mudar as outras telas.

Testado em 30/09/2026: um projeto vazio só com este kit compila (`tsc` + `vite build`) e mostra
textura, botões, entrada na rolagem, contagem e campos.

#!/usr/bin/env bash
# Monta (ou atualiza) o kit da skill aurora-web a partir do projeto da LP.
# A LP (~/aurora-lp) é a fonte da verdade do código; o kit é uma cópia só das peças
# reutilizáveis — sem as seções da LP, sem conteúdo e SEM os arquivos da Britti Sans.
# Uso: aurora/aurora-web/kit/atualizar.sh            (padrão: ~/aurora-lp)
#      AURORA_LP=/outro/caminho aurora/aurora-web/kit/atualizar.sh
set -euo pipefail

ORIGEM="${AURORA_LP:-$HOME/aurora-lp}"
KIT="$(cd "$(dirname "$0")" && pwd)"
MARCA="$(cd "$KIT/../../aurora-brand" && pwd)"

[ -d "$ORIGEM/src" ] || { echo "Não encontrei $ORIGEM/src. Defina AURORA_LP." >&2; exit 1; }

copiar() { # copiar <caminho relativo à LP> [destino relativo ao kit]
  local de="$ORIGEM/$1" para="$KIT/${2:-$1}"
  mkdir -p "$(dirname "$para")"
  cp "$de" "$para"
}

# Limpa o que o script gera (mantém README.md e este script).
rm -rf "$KIT/src" "$KIT/scripts" "$KIT/public" "$KIT/licenses" "$KIT/config"

# Configuração (referência para projeto novo; num projeto existente, mesclar).
for f in tailwind.config.ts postcss.config.js vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html; do
  copiar "$f" "config/$f"
done
# index.html usa VITE_SITE_URL e VITE_ROBOTS (tags de compartilhamento e indexação).
cp "$ORIGEM/.env" "$KIT/config/env.exemplo"

# Scripts: tokens, sprite da dissolução, núcleo da textura, versão de aprovação.
for f in build-tokens.mjs sync-tokens.mjs build-pixel-mask.mjs sync-ascii-kernel.mjs build-aprovacao.mjs; do
  copiar "scripts/$f"
done

# Tokens: sempre os da skill de marca (fonte da verdade), não a cópia da LP.
mkdir -p "$KIT/src/design"
cp "$MARCA/aurora-tokens.json" "$KIT/src/design/aurora-tokens.json"

# Estilos reutilizáveis (tokens.css é gerado por build-tokens.mjs; sections.css é da LP).
for f in layout.css components.css motion.css app.css; do copiar "src/styles/$f"; done
sed '/sections\.css/d' "$ORIGEM/src/index.css" > "$KIT/src/index.css"
copiar src/vite-env.d.ts

# Componentes: tudo de ui/, brand/ e app/; de layout/, só o que não depende de conteúdo da LP.
for pasta in ui brand app; do
  mkdir -p "$KIT/src/components/$pasta"
  cp "$ORIGEM"/src/components/$pasta/*.tsx "$KIT/src/components/$pasta/" 2>/dev/null || true
  cp "$ORIGEM"/src/components/$pasta/*.ts "$KIT/src/components/$pasta/" 2>/dev/null || true
done
for f in Section Container Rule FaixaTexturada GridOverlay; do copiar "src/components/layout/$f.tsx"; done

# Hooks, textura, utilitários e arquivos visuais.
mkdir -p "$KIT/src/hooks" "$KIT/src/texture" "$KIT/src/lib" "$KIT/src/assets/brand"
cp "$ORIGEM"/src/hooks/*.ts "$KIT/src/hooks/"
cp "$ORIGEM"/src/texture/* "$KIT/src/texture/"
copiar src/lib/cn.ts
cp "$ORIGEM"/src/assets/pixel-mask*.svg "$KIT/src/assets/"
cp "$ORIGEM"/src/assets/brand/*.svg "$KIT/src/assets/brand/"

# Public: CSS da Britti (com os cabeçalhos de licença, sem os arquivos), favicon.
mkdir -p "$KIT/public/fonts"
copiar public/fonts/britti-sans.css
for f in favicon.svg favicon.ico apple-touch-icon.png; do copiar "public/$f"; done

# Licenças de terceiros que acompanham o código.
copiar licenses/material-symbols-LICENSE

# Nunca levar fonte licenciada.
if find "$KIT" -name "*.woff*" -o -name "*.otf" -o -name "*.ttf" | grep -q .; then
  echo "ERRO: arquivo de fonte no kit — remover antes de versionar." >&2; exit 1
fi

echo "Kit atualizado a partir de $ORIGEM ($(cd "$ORIGEM" && git log --oneline -1 2>/dev/null || echo 'sem git'))."

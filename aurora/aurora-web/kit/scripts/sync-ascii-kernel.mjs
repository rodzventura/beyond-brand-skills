// Extrai do aurora. ASCII Studio o núcleo de cálculo e os geradores e grava
// src/texture/studio.generated.js. O Studio é a fonte da verdade da textura; este arquivo
// só existe para a LP não depender dele no build.
// Uso: AURORA_STUDIO=/caminho/index.html npm run textura:sync  (padrão: ~/aurora-ascii-studio)
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = process.env.AURORA_STUDIO ?? path.join(os.homedir(), "aurora-ascii-studio/index.html");
if (!existsSync(src)) {
  console.error(`Não encontrei ${src}. Defina AURORA_STUDIO.`);
  process.exit(1);
}
const html = readFileSync(src, "utf8");

const INICIO = "/* ====================== KERNEL";
const FIM = "/* ====================== RAMPAS & PALETA";
const i = html.indexOf(INICIO);
const j = html.indexOf(FIM);
if (i < 0 || j < 0 || j < i) {
  console.error("Marcadores KERNEL / RAMPAS & PALETA não encontrados no Studio — a estrutura mudou.");
  process.exit(1);
}
const trecho = html.slice(i, j).trimEnd();
const EXPORTS = ["mulberry32", "makeNoise4", "fbm", "curve", "phaseCurve", "equalize", "bayerMatrix", "ditherPass", "quantize", "GENS", "genById"];
for (const nome of EXPORTS) {
  if (!new RegExp(`(function|const)\\s+${nome}\\b`).test(trecho)) {
    console.error(`"${nome}" não está mais no trecho extraído do Studio.`);
    process.exit(1);
  }
}
const hash = createHash("sha256").update(html).digest("hex").slice(0, 12);

const saida = `/* eslint-disable */
// @ts-nocheck
// GERADO por scripts/sync-ascii-kernel.mjs a partir do aurora. ASCII Studio
// (index.html sha256:${hash}). Não editar — mude o Studio e rode \`npm run textura:sync\`.

const TAU = 6.283185307179586;

${trecho}

export { ${EXPORTS.join(", ")} };
`;
writeFileSync(path.join(root, "src/texture/studio.generated.js"), saida);
console.log(`studio.generated.js · ${EXPORTS.length} exportações · Studio sha256:${hash}`);

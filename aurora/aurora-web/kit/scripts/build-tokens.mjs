// Gera src/styles/tokens.css a partir de src/design/aurora-tokens.json.
// Os nomes seguem as variáveis do Figma ("Aurora | Identidade da Marca"):
//   --aurora-neutral-500, --color-text-secondary, --font-size-heading-h1, --space-24
// Não edite tokens.css à mão: mude o JSON (npm run tokens:sync) e rode `npm run tokens`.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const t = JSON.parse(readFileSync(path.join(root, "src/design/aurora-tokens.json"), "utf8"));

const slug = (s) => s.toLowerCase().replace(/[\/\s]+/g, "-");
const out = [];
const line = (s = "") => out.push(s);

// --- primitivas -----------------------------------------------------------
const prim = t.cor.primitivas;
const primVar = (ref) => {
  const [scale, step] = ref.split("/");
  if (!prim[scale]?.[step]) throw new Error(`Primitiva inexistente: ${ref}`);
  return `var(--aurora-${scale}-${step})`;
};

// --- tipografia ---------------------------------------------------------------
const estilos = t.tipografia.escala.estilos;
// Estilos que reaproveitam o tamanho de outro, como no Figma
// ("Heading/H1 Long" usa --font-size-heading-h1; "Button/MD" usa --font-size-body-md).
const sizeKey = (nome) => {
  if (nome === "Button/MD") return "body-md";
  return slug(nome.replace(/ Long$/, ""));
};
const sizes = {};
for (const [nome, e] of Object.entries(estilos)) {
  const k = sizeKey(nome);
  const prev = sizes[k];
  if (prev && (prev.d !== e.desktop_px || prev.m !== e.mobile_px)) {
    throw new Error(`${nome} diverge do tamanho de --font-size-${k}`);
  }
  sizes[k] = { d: e.desktop_px, m: e.mobile_px };
}
const familias = {
  "Britti Sans": "var(--font-family-sans)",
  "JetBrains Mono": "var(--font-family-mono)",
};
const pesos = { Light: 300, Regular: 400, Medium: 500 };

const bp = t.grid.web.breakpoints;
const tabletMin = bp.tablet.design_px; // 768
const desktopMin = parseInt(bp.desktop.faixa, 10); // 1280

line(`/* GERADO por scripts/build-tokens.mjs — não editar à mão.`);
line(`   Fonte: src/design/aurora-tokens.json v${t.meta.versao} (${t.meta.figma.arquivo}). */`);
line();
line(`:root {`);
for (const scale of ["neutral", "orange"]) {
  for (const [step, hex] of Object.entries(prim[scale])) line(`  --aurora-${scale}-${step}: ${hex};`);
}
line();
for (const px of t.espacamento.escala) line(`  --space-${px}: ${px}px;`);
line(`  --radius-none: ${t.espacamento.raio.none}px;`);
line();
line(`  --font-family-sans: "Britti Sans", "Helvetica Neue", Arial, sans-serif;`);
line(`  --font-family-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;`);
line(`  --font-weight-light: 300;`);
line(`  --font-weight-regular: 400;`);
line(`  --font-weight-medium: 500;`);
line();
line(`  /* mobile primeiro; desktop a partir de ${tabletMin}px (o Figma só tem os modos Desktop e Mobile) */`);
for (const [k, v] of Object.entries(sizes)) line(`  --font-size-${k}: ${v.m}px;`);
line();
line(`  --grid-columns: ${bp.mobile.colunas};`);
line(`  --grid-gutter: ${bp.mobile.gutter}px;`);
line(`  --grid-margin: ${bp.mobile.margem}px;`);
line(`  --content-max: ${bp.desktop.conteudo_max}px;`);
line(`}`);
line();
line(`@media (min-width: ${tabletMin}px) {`);
line(`  :root {`);
for (const [k, v] of Object.entries(sizes)) if (v.d !== v.m) line(`    --font-size-${k}: ${v.d}px;`);
line(`    --grid-columns: ${bp.tablet.colunas};`);
line(`    --grid-gutter: ${bp.tablet.gutter}px;`);
line(`    --grid-margin: ${bp.tablet.margem}px;`);
line(`  }`);
line(`}`);
line();
line(`@media (min-width: ${desktopMin}px) {`);
line(`  :root {`);
line(`    --grid-columns: ${bp.desktop.colunas};`);
line(`    --grid-gutter: ${bp.desktop.gutter}px;`);
line(`    --grid-margin: ${bp.desktop.margem}px;`);
line(`  }`);
line(`}`);
line();

// --- cor por função, por modo --------------------------------------------
const funcoes = Object.entries(t.cor.por_funcao);
for (const [modo, sel] of [
  ["claro", `:root,\n[data-theme="light"]`],
  ["escuro", `[data-theme="dark"]`],
]) {
  line(`${sel} {`);
  line(`  color-scheme: ${modo === "claro" ? "light" : "dark"};`);
  for (const [nome, f] of funcoes) line(`  --color-${slug(nome)}: ${primVar(f[modo])};`);
  line(`}`);
  line();
}

// --- estilos de texto ------------------------------------------------------
line(`/* Estilos de texto: .type-<grupo>-<nome>, espelhando os text styles do Figma. */`);
for (const [nome, e] of Object.entries(estilos)) {
  const peso = pesos[e.peso];
  if (!peso && e.familia === "Britti Sans") throw new Error(`Peso fora do sistema em ${nome}: ${e.peso}`);
  line(`.type-${slug(nome)} {`);
  line(`  font-family: ${familias[e.familia]};`);
  line(`  font-weight: ${peso ?? 500};`);
  line(`  font-size: var(--font-size-${sizeKey(nome)});`);
  line(`  line-height: ${e.entrelinha_pct / 100};`);
  line(`  letter-spacing: ${e.tracking_pct === 0 ? 0 : `${e.tracking_pct / 100}em`};`);
  if (e.caixa === "UPPER") line(`  text-transform: uppercase;`);
  line(`}`);
}

writeFileSync(path.join(root, "src/styles/tokens.css"), out.join("\n") + "\n");
console.log(`tokens.css gerado · v${t.meta.versao} · ${funcoes.length} cores por função · ${Object.keys(estilos).length} estilos de texto`);

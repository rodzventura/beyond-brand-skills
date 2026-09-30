// Gera os sprites de 20 quadros da dissolução em pixels, um por formato de elemento,
// para as células ficarem sempre quadradas e de tamanho parecido:
//   pixel-mask.svg         24 × 6  (4:1)  botões e células de benefício
//   pixel-mask-row.svg     48 × 4  (12:1) linhas largas (verticais)
//   pixel-mask-square.svg  12 × 12 (1:1)  células altas (empresas)
// O preenchimento avança da esquerda para a direita com borda pontilhada; o último quadro
// é cheio. Uso no CSS: mask-size 2000% 100%, animado de 0% a 100% com steps(19).
// Semente fixa: o desenho é sempre o mesmo. Rode `node scripts/build-pixel-mask.mjs`.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const FRAMES = 20;
const SEED = 20260928;
const VARIANTES = [
  { arquivo: "pixel-mask.svg", COLS: 24, ROWS: 6 },
  { arquivo: "pixel-mask-row.svg", COLS: 48, ROWS: 4 },
  { arquivo: "pixel-mask-square.svg", COLS: 12, ROWS: 12 },
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const { arquivo, COLS, ROWS } of VARIANTES) {
  // mulberry32
  let s = SEED;
  const rand = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // Limiar de cada célula: 60% posição na linha, 40% ruído. Sempre < 1.
  const limiar = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, (_, c) => 0.6 * (c / (COLS - 1)) + 0.4 * rand() * 0.999),
  );

  const paths = [];
  for (let f = 0; f < FRAMES; f++) {
    const t = f / (FRAMES - 1);
    let d = "";
    const cheia = (r, c) => f === FRAMES - 1 || (f > 0 && limiar[r][c] < t);
    for (let r = 0; r < ROWS; r++) {
      // Células vizinhas cheias viram um retângulo só.
      for (let c = 0; c < COLS; c++) {
        if (!cheia(r, c)) continue;
        let n = 1;
        while (c + n < COLS && cheia(r, c + n)) n++;
        d += `M${f * COLS + c} ${r}h${n}v1h-${n}z`;
        c += n - 1;
      }
    }
    if (d) paths.push(`<path d="${d}"/>`);
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${FRAMES * COLS} ${ROWS}" ` +
    `preserveAspectRatio="none" shape-rendering="crispEdges"><g fill="#fff">${paths.join("")}</g></svg>\n`;

  writeFileSync(path.join(root, "src/assets", arquivo), svg);
  console.log(`${arquivo} · ${FRAMES} quadros de ${COLS}×${ROWS} · ${svg.length} bytes`);
}

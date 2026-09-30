import type { Config } from "tailwindcss";
import tokens from "./src/design/aurora-tokens.json";

// Só estende o tema padrão (não substitui), para a LP poder ser incorporada ao app
// Aurora (Lovable/shadcn) sem quebrar os componentes de lá.
// Cores por função:  bg-au-bg-canvas · text-au-text-secondary · border-au-border-subtle
// Primitivas:        bg-au-neutral-900 · text-au-orange-500
// Espaçamento: a escala Aurora (4, 8, 12 … 160px) já existe no padrão do Tailwind
// (p-1 = 4px, p-6 = 24px, p-20 = 80px, p-40 = 160px). Use só esses passos.
// Cantos: a Aurora é ortogonal — não use rounded-*.
const slug = (s: string) => s.toLowerCase().replace(/[/\s]+/g, "-");

const porFuncao = Object.fromEntries(
  Object.keys(tokens.cor.por_funcao).map((nome) => [slug(nome), `var(--color-${slug(nome)})`]),
);
const primitivas = Object.fromEntries(
  (["neutral", "orange"] as const).flatMap((escala) =>
    Object.keys(tokens.cor.primitivas[escala]).map((passo) => [
      `${escala}-${passo}`,
      `var(--aurora-${escala}-${passo})`,
    ]),
  ),
);

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { au: { ...porFuncao, ...primitivas } },
      fontFamily: {
        "au-sans": ["var(--font-family-sans)"],
        "au-mono": ["var(--font-family-mono)"],
      },
      maxWidth: { "au-content": "var(--content-max)" },
    },
  },
  plugins: [],
} satisfies Config;

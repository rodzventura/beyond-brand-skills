// Receitas de textura por posição na LP (marcações em estudos/marcacoes-textura.html).
// Mesmo vocabulário do aurora. ASCII Studio: gerador + seed + parâmetros reproduzem a
// textura idêntica em qualquer máquina. Para ajustar, abra a receita no Studio.
//
// Posições em uso (revisão do usuário no Figma, 28/set — página "LP · v2 (código)"):
// - T1: módulo "Ciclo aberto" do hero.
// - FAIXA: fundo das aberturas do Ecossistema e da Jornada, de trilho a trilho, a 20% de
//   opacidade (export aurora-textura-campo-fluxo-20260921 do Studio).
// - T5: faixa abaixo do CTA, mesmo padrão do T1 com cinza mais claro (29/set; antes, campo.dissolucao cinza).
// T2 (coluna do rótulo), T3 (8ª célula das empresas) e T4 (abaixo das fases) saíram.

export type Receita = {
  gen: string;
  seed: number;
  params?: Record<string, number | string | boolean>;
  /** Altura da célula em px CSS (o glifo). */
  cellPx: number;
  cellAspect?: number;
  ramp?: string;
  colorMode?: "mono" | "duo" | "accent";
  /** No modo "accent": a partir de que nível (0–1) o glifo fica laranja. */
  accentAt?: number;
  anim?: boolean;
  /** Duração de uma volta, em segundos. */
  period?: number;
  loopR?: number;
  fps?: number;
  curva?: "linear" | "suave" | "pulso";
  curvaAmt?: number;
  varia?: number;
  dither?: "none" | "fs" | "bayer2" | "bayer4" | "bayer8";
  invert?: boolean;
  /** Opacidade da camada inteira. */
  opacity?: number;
  /** Densidade base (-1 a 1): negativo abre espaço vazio. Soma com a densidade da posição. */
  densidade?: number;
  /** Tom dos glifos neutros: "secundaria" (padrão) ou "terciaria", mais recuada. */
  tinta?: "secundaria" | "terciaria";
  /** Cor principal a partir de uma variável CSS (ex.: "--color-accent-signal"). Tem prioridade sobre `tinta`. */
  cor?: string;
  /**
   * Fração (0–1) das células elegíveis a laranja que ficam laranja, escolhidas por hash fixo.
   * Mantém o laranja como pico isolado, sem manchas contínuas. Padrão 1 (todas).
   */
  acentoRaro?: number;
  /** Largura (0–0.5, fração do lado) em que a textura se dissolve nas bordas. 0 = corte reto. */
  borda?: number;
};

/** T1 · hero, módulo "Ciclo aberto" — principal. Ruído com distorção, laranja nos picos. */
export const T1: Receita = {
  gen: "campo.ruido",
  seed: 20260928,
  params: { scale: 2.6, oct: 4, gain: 0.5, warp: 0.9, cont: 0.35 },
  cellPx: 12,
  colorMode: "accent",
  accentAt: 0.8,
  acentoRaro: 0.5,
  anim: true,
  period: 14,
  loopR: 1.2,
  varia: 0.6,
};

/**
 * FAIXA · fundo das aberturas do Ecossistema e da Jornada. Campo de fluxo em laranja, recuado
 * a 20% para o texto passar por cima com contraste. Células quadradas de 7px (≈ as 192 colunas
 * do export em 1360px de largura; fixar a célula mantém a textura legível no mobile).
 */
export const FAIXA: Receita = {
  gen: "campo.fluxo",
  seed: 20260921,
  params: { scale: 2.6, steps: 9, len: 0.028, cont: 0.35 },
  cellPx: 7,
  cellAspect: 1,
  cor: "--color-accent-signal",
  colorMode: "mono",
  anim: true,
  period: 30,
  loopR: 1.4,
  // Movimento lento (volta de 30s) e área grande: 12 quadros/s bastam e custam metade (Fase 7).
  fps: 12,
  varia: 0.65,
  opacity: 0.2,
};

/**
 * T5 · faixa abaixo do CTA, no rodapé. Mesmo padrão do T1 do hero — ruído com picos laranja
 * (pedido do usuário, 29/set) —, mas com o cinza clareado (#ACACB0) para a seção clara: no
 * modo claro a tinta padrão seria quase preta. Semente própria para o desenho não repetir o hero.
 */
export const T5: Receita = {
  ...T1,
  seed: 20260929,
  cor: "--aurora-neutral-400",
};

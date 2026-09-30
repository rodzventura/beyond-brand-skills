import { equalize, ditherPass, genById, phaseCurve, quantize, type FieldFn } from "@/texture/studio.generated";
import type { Receita } from "@/texture/receitas";

export type Quadro = { idx: Uint8Array; col: Uint8Array };

/**
 * Cálculo de um quadro da textura (campo → equalização → densidade → borda → dither →
 * quantização → laranja raro). Sem DOM: roda no worker (texture.worker.ts) ou, sem worker,
 * na thread principal. Devolve arrays novos a cada quadro (o worker os transfere).
 */
export function criarCampo(r: Receita, cols: number, rows: number, ar: number) {
  const g = genById(r.gen);
  const params: Record<string, unknown> = { loopR: r.loopR ?? 1.4 };
  for (const c of g.controls) params[c.k] = c.d;
  Object.assign(params, r.params);
  const fn: FieldFn = g.make(params, r.seed, null);
  const levels = (r.ramp ?? " .:-=+*#%@").length;
  const n = cols * rows;
  const val = new Float32Array(n);

  return (t: number, densidade: number): Quadro => {
    const tc = phaseCurve(t, r.curva ?? "linear", r.curvaAmt ?? 0.5);
    for (let y = 0; y < rows; y++) {
      const v = (y + 0.5) / rows;
      for (let x = 0; x < cols; x++) val[y * cols + x] = fn((x + 0.5) / cols, v, tc, ar);
    }
    equalize(val, n, r.varia ?? 0);
    // densidade entra depois da equalização, que senão a desfaria
    const vies = (densidade + (r.densidade ?? 0)) * 0.35;
    if (vies !== 0) for (let i = 0; i < n; i++) val[i] += vies;
    // bordas que se dissolvem: o valor cai perto dos lados, sem corte reto
    const borda = r.borda ?? 0;
    if (borda > 0) {
      for (let y = 0; y < rows; y++) {
        const dy = Math.min((y + 0.5) / rows, 1 - (y + 0.5) / rows);
        for (let x = 0; x < cols; x++) {
          const dx = Math.min((x + 0.5) / cols, 1 - (x + 0.5) / cols);
          const f = Math.min(1, Math.min(dx, dy) / borda);
          if (f < 1) val[y * cols + x] *= f;
        }
      }
    }
    ditherPass(val, cols, rows, levels, r.dither ?? "none");
    const idx = new Uint8Array(n);
    const col = new Uint8Array(n);
    quantize(val, idx, col, cols, rows, levels, r.invert ?? false, r.colorMode ?? "mono", r.accentAt ?? 0.9);
    // laranja raro: só uma fração fixa das células elegíveis continua laranja
    const raro = r.acentoRaro ?? 1;
    if (raro < 1) {
      for (let i = 0; i < n; i++) {
        if (col[i] !== 2) continue;
        let h = Math.imul(i + 1, 0x9e3779b1);
        h ^= h >>> 16;
        h = Math.imul(h, 0x85ebca6b);
        h ^= h >>> 13;
        if ((h >>> 0) / 4294967296 >= raro) col[i] = 0;
      }
    }
    return { idx, col };
  };
}

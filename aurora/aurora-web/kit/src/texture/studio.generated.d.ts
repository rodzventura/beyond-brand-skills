// Tipos mínimos do módulo gerado a partir do aurora. ASCII Studio.
export type FieldFn = (u: number, v: number, t: number, ar: number) => number;
export type Gerador = {
  id: string;
  fam: "campo" | "geo" | "imagem" | "tipo";
  label: string;
  controls: Array<{ k: string; d: unknown }>;
  make: (P: Record<string, unknown>, seed: number, A?: unknown) => FieldFn;
};
export const GENS: Gerador[];
export function genById(id: string): Gerador;
export function phaseCurve(t: number, mode: string, amt: number): number;
export function equalize(val: Float32Array, n: number, amount: number): void;
export function ditherPass(val: Float32Array, cols: number, rows: number, levels: number, mode: string): void;
export function quantize(
  val: Float32Array, idx: Uint8Array, col: Uint8Array, cols: number, rows: number,
  levels: number, invert: boolean, colorMode: string, accentAt: number,
): void;

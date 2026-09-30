import { useMemo } from "react";
import { AsciiTexture } from "@/texture/AsciiTexture";
import { FAIXA, T1, T5, type Receita } from "@/texture/receitas";
import { cn } from "@/lib/cn";

const RECEITAS: Record<string, Receita> = { T1, FAIXA, T5 };

type TextureSlotProps = {
  /** Posição da textura (T1, FAIXA, T5), que escolhe a receita. */
  id: keyof typeof RECEITAS | string;
  /** Deslocamento de densidade, -1 a 1 (ver AsciiTexture). */
  densidade?: number;
  /** Soma à semente da receita: mesma textura, desenho diferente (ex.: uma por seção). */
  variacao?: number;
  className?: string;
  "data-reveal-item"?: boolean;
};

/** Área de textura ASCII numa das posições em uso (ver src/texture/receitas.ts). */
export function TextureSlot({ id, densidade, variacao = 0, className, ...rest }: TextureSlotProps) {
  const base = RECEITAS[id];
  const receita = useMemo(() => (base && variacao ? { ...base, seed: base.seed + variacao } : base), [base, variacao]);
  // Quem chama pode posicionar a área (ex.: absolute); senão ela é relativa ao fluxo.
  const posicionada = /\b(absolute|fixed|sticky)\b/.test(className ?? "");
  return (
    <div {...rest} aria-hidden="true" data-texture={id} className={cn(!posicionada && "relative", "overflow-hidden", className)}>
      {receita && <AsciiTexture receita={receita} densidade={densidade} className="absolute inset-0" />}
    </div>
  );
}

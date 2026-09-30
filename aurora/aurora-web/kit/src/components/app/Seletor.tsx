import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type SeletorProps = {
  itens: readonly { id: string; rotulo: string }[];
  ativo: string;
  onChange: (id: string) => void;
  rotulo: string;
  /** id do painel que as abas controlam. */
  painel: string;
};

/**
 * Entrar / Criar conta (referência Firecrawl): duas metades; a ativa fica no texto primário,
 * sobre a superfície, com o traço laranja embaixo. Setas ←/→ trocam.
 */
export function Seletor({ itens, ativo, onChange, rotulo, painel }: SeletorProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const teclas = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + itens.length) % itens.length;
    refs.current[n]?.focus();
    onChange(itens[n].id);
  };
  return (
    <div role="tablist" aria-label={rotulo} className="grid" style={{ gridTemplateColumns: `repeat(${itens.length}, minmax(0, 1fr))` }}>
      {itens.map((item, i) => {
        const on = item.id === ativo;
        return (
          <button
            key={item.id}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`aba-${item.id}`}
            aria-selected={on}
            aria-controls={painel}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => teclas(e, i)}
            className={cn("au-seletor type-label-md", i > 0 && "border-l border-au-border-subtle")}
            data-ativo={on || undefined}
          >
            {item.rotulo}
          </button>
        );
      })}
    </div>
  );
}

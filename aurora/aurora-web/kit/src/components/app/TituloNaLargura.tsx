import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const BASE = 100; // mede em 100px e escala: a largura do texto é proporcional ao tamanho

/**
 * Título em uma linha só, na largura exata do contêiner (pedido de 30/set: o título do login
 * com a mesma largura do formulário). O tamanho da fonte se ajusta ao texto e à largura
 * disponível, com teto em `max` para títulos curtos não ficarem enormes.
 */
export function TituloNaLargura({ children, max = 64, className }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const pai = el?.parentElement;
    if (!el || !pai) return;
    const ajustar = () => {
      el.style.fontSize = `${BASE}px`;
      const largura = el.scrollWidth;
      const disponivel = pai.clientWidth - parseFloat(getComputedStyle(pai).paddingLeft) - parseFloat(getComputedStyle(pai).paddingRight);
      el.style.fontSize = `${Math.min(max, (BASE * disponivel) / largura)}px`;
    };
    ajustar();
    const ro = new ResizeObserver(ajustar);
    ro.observe(pai);
    document.fonts?.ready.then(ajustar);
    return () => ro.disconnect();
  }, [children, max]);

  return (
    <h1 ref={ref} className={cn("type-heading-h3 w-max whitespace-nowrap !leading-[1.1]", className)}>
      {children}
    </h1>
  );
}

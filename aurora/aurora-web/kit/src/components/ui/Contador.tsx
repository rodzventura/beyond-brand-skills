import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const DURACAO = 1600;
// Desacelera forte no fim: os últimos dígitos assentam devagar.
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/** Separa "+R$ 53 mi" em prefixo "+R$ ", número 53 e sufixo " mi" (número em pt-BR). */
function partes(valor: string) {
  const m = valor.match(/^(\D*?)(\d[\d.]*(?:,\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefixo, numero, sufixo] = m;
  const casas = numero.includes(",") ? numero.split(",")[1].length : 0;
  const alvo = Number(numero.replace(/\./g, "").replace(",", "."));
  return { prefixo, sufixo, alvo, casas };
}

/**
 * Número que conta de 0 até o valor quando aparece na tela (proposta Fase 4). O valor final
 * reserva a largura (sem o texto ao lado pular) e é o que o leitor de tela lê.
 */
export function Contador({ valor }: { valor: string }) {
  const { ref, visto } = useInView<HTMLSpanElement>(0.6);
  const p = partes(valor);
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!visto || !p) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setAtual(p.alvo);
    let quadro = 0;
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / DURACAO);
      setAtual(p.alvo * easeOutExpo(t));
      if (t < 1) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visto, valor]);

  if (!p) return <>{valor}</>;
  const numero = atual.toLocaleString("pt-BR", { minimumFractionDigits: p.casas, maximumFractionDigits: p.casas });
  return (
    <span ref={ref} className="inline-grid">
      <span className="invisible col-start-1 row-start-1">{valor}</span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {p.prefixo}
        {numero}
        {p.sufixo}
      </span>
      <span className="sr-only">{valor}</span>
    </span>
  );
}

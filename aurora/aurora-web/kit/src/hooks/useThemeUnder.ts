import { useEffect, useState, type RefObject } from "react";
import type { Theme } from "@/components/layout/Section";

/**
 * Modo da seção (`data-section`) que está logo abaixo do elemento (ex.: o cabeçalho fixo).
 * Ignora o próprio elemento e os destaques em modo oposto dentro da seção.
 */
export function useThemeUnder(ref: RefObject<HTMLElement>, fallback: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(fallback);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      // Ponto logo abaixo da borda inferior do elemento.
      const y = Math.min(window.innerHeight - 1, el.getBoundingClientRect().bottom + 1);
      const alvo = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((node) => !el.contains(node) && node.closest("[data-section]"));
      const found = alvo?.closest<HTMLElement>("[data-section]")?.dataset.theme;
      if (found === "light" || found === "dark") setTheme(found);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  return theme;
}

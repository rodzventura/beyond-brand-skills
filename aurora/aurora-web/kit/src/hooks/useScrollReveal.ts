import { useEffect } from "react";

/**
 * Entrada dos textos conforme a rolagem (Fase 4 · movimento). Marque no JSX:
 * - `data-reveal` num bloco: ele entra quando cruza a tela;
 * - `data-reveal-item` em descendentes do bloco: entram um depois do outro (80ms), na ordem
 *   do documento. Sem itens, o próprio bloco entra.
 * Grades com fundo nas frestas (gap-px) entram inteiras: célula a célula mostraria a fresta.
 * Só liga com JS e sem "reduzir movimento"; antes disso nada fica escondido.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raiz = document.documentElement;
    const preparar = (bloco: HTMLElement) => {
      const itens = Array.from(bloco.querySelectorAll<HTMLElement>("[data-reveal-item]"));
      if (!itens.length) bloco.setAttribute("data-reveal-self", "");
      (itens.length ? itens : [bloco]).forEach((el, i) => el.style.setProperty("--reveal-i", String(Math.min(i, 8))));
    };
    const blocos = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    blocos.forEach(preparar);
    raiz.dataset.reveal = "on";

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-revealed", "");
          io.unobserve(e.target);
        }
      },
      // Entra um pouco antes do fim da tela, para o texto já estar assentado ao ser lido.
      { rootMargin: "0px 0px -10% 0px" },
    );
    blocos.forEach((b) => io.observe(b));

    // Blocos que entram depois (ex.: a Jornada troca de sanfona para rolagem ao alargar a tela).
    const mo = new MutationObserver((mudancas) => {
      for (const m of mudancas)
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          const novos = [...(n.matches("[data-reveal]") ? [n] : []), ...n.querySelectorAll<HTMLElement>("[data-reveal]")];
          novos.forEach((b) => {
            preparar(b);
            io.observe(b);
          });
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
      delete raiz.dataset.reveal;
    };
  }, []);
}

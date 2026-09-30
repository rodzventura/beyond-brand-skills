import { useEffect, useState } from "react";

const EVENT = "au:toggle-grid";

/** Liga/desliga a sobreposição da grade de colunas. */
export const toggleGrid = () => window.dispatchEvent(new Event(EVENT));

/** Grade de colunas do breakpoint atual. Tecla G em desenvolvimento; botão na /_design. */
export function GridOverlay() {
  const [on, setOn] = useState(false);
  const [columns, setColumns] = useState(12);

  useEffect(() => {
    const flip = () => setOn((v) => !v);
    const onKey = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement;
      if (alvo.closest("input, textarea, select, [contenteditable]")) return;
      if (import.meta.env.DEV && e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey) flip();
    };
    window.addEventListener(EVENT, flip);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVENT, flip);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const read = () =>
      setColumns(Number(getComputedStyle(document.documentElement).getPropertyValue("--grid-columns")) || 12);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, [on]);

  if (!on) return null;
  return (
    <div className="au-grid-overlay" aria-hidden="true">
      <div className="au-container">
        <div className="au-grid">
          {Array.from({ length: columns }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

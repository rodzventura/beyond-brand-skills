import type { ReactNode } from "react";

const separar = (texto: string) => texto.trim().split(/\s+/);

/**
 * Título que entra palavra a palavra, cada uma subindo de trás de uma máscara (Fase 4).
 * Quem dispara é o bloco `data-reveal` em volta (ver useScrollReveal). `fim` vai colado à
 * última palavra (ex.: o ponto laranja).
 */
export function TituloPalavras({ texto, fim }: { texto: string; fim?: ReactNode }) {
  const palavras = separar(texto);
  return (
    <>
      {palavras.map((p, i) => (
        <span key={i}>
          <span className="au-w" style={{ "--w": i } as React.CSSProperties}>
            <span>
              {p}
              {i === palavras.length - 1 && fim}
            </span>
          </span>
          {i < palavras.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

/**
 * Texto que se preenche palavra a palavra conforme a rolagem (Fase 4): as palavras começam
 * no tom terciário e passam ao tom do texto enquanto o parágrafo atravessa a tela. Usa
 * animação ligada à rolagem do CSS; onde o navegador não tem, o texto já aparece pronto.
 */
export function TextoPreenche({ texto }: { texto: string }) {
  const palavras = separar(texto);
  return (
    <span className="au-fill" style={{ "--n": palavras.length } as React.CSSProperties}>
      {palavras.map((p, i) => (
        <span key={i}>
          <span style={{ "--w": i } as React.CSSProperties}>{p}</span>
          {i < palavras.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

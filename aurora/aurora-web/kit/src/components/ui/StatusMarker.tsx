type StatusMarkerProps = {
  total: number;
  /** Posição corrente, começando em 0. As anteriores aparecem como percorridas. */
  current: number;
  label?: string;
  /** Sem "percorrido": para estados que não formam uma sequência linear. */
  apenasCorrente?: boolean;
};

/** Marcador de status: quadrados em sequência (canônico p. 35). */
export function StatusMarker({ total, current, label, apenasCorrente = false }: StatusMarkerProps) {
  return (
    <span className="au-marker" role="img" aria-label={label ?? `Etapa ${current + 1} de ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} data-state={i === current ? "current" : i < current && !apenasCorrente ? "done" : "pending"} />
      ))}
    </span>
  );
}

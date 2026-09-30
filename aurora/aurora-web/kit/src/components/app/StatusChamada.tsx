import { cn } from "@/lib/cn";

type StatusChamadaProps = {
  aberta: boolean;
  tags?: readonly string[];
  className?: string;
};

/**
 * Linha de status da chamada: "■ Aberta" em laranja (quadrado, como o marcador de status da
 * marca — o print usa círculo) e as categorias em mono.
 */
export function StatusChamada({ aberta, tags = [], className }: StatusChamadaProps) {
  return (
    <p className={cn("type-label-sm flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      <span className={cn("inline-flex items-center gap-2", aberta ? "text-au-text-accent" : "text-au-text-tertiary")}>
        <span aria-hidden="true" className={cn("h-2 w-2", aberta ? "bg-au-accent-signal" : "border border-au-border-default")} />
        {aberta ? "Aberta" : "Encerrada"}
      </span>
      {/* Secundário, não terciário: sobre a superfície do painel o terciário fica abaixo de 4,5:1. */}
      {tags.map((t) => (
        <span key={t} className="text-au-text-secondary">
          {t}
        </span>
      ))}
    </p>
  );
}

import { cn } from "@/lib/cn";

type RuleProps = {
  /** Estende a linha até as bordas da tela. */
  bleed?: boolean;
  /** Marcadores quadrados onde a régua cruza os trilhos. */
  ticks?: boolean;
  className?: string;
};

/** Régua horizontal de 1px entre os trilhos. Use dentro de um <Container>. Na LP, se desenha da esquerda ao entrar na tela. */
export function Rule({ bleed = false, ticks = true, className }: RuleProps) {
  return (
    <div
      role="presentation"
      data-reveal
      className={cn("au-rule", bleed && "au-rule--bleed", ticks && "au-rule--ticks", className)}
    />
  );
}

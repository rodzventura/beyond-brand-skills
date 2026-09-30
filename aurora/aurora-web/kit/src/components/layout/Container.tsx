import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** Desenha os trilhos verticais. Empilhados entre seções, formam uma linha contínua. */
  rails?: boolean;
};

/** Conteúdo até 1280px, com a margem do breakpoint (80 · 40 · 20). */
export function Container({ rails = false, className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn("au-container", rails && "au-rails", className)} {...rest}>
      {children}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  tone?: "default" | "accent";
  /** Quadrado de sinal antes do texto (ex.: chamada aberta). */
  dot?: boolean;
  className?: string;
};

/** Tag com contorno, em mono (Label/SM). Nunca em Britti Sans. */
export function Tag({ children, tone = "default", dot, className }: TagProps) {
  return (
    <span className={cn("au-tag type-label-sm", tone === "accent" && "au-tag--accent", className)}>
      {dot && <span className="au-tag__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

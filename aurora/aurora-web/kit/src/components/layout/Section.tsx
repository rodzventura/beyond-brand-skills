import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type Theme = "light" | "dark";

type SectionProps = HTMLAttributes<HTMLElement> & {
  theme: Theme;
  /** Elemento da faixa. O rodapé usa "footer" para ser o landmark de rodapé da página. */
  as?: "section" | "footer";
};

/**
 * Faixa da página em um dos dois modos. O cabeçalho segue o `data-theme` das seções
 * (`data-section`), não o de cards em destaque dentro delas.
 */
export function Section({ theme, as: Tag = "section", className, children, ...rest }: SectionProps) {
  return (
    <Tag
      data-theme={theme}
      data-section
      className={cn("relative bg-au-bg-canvas text-au-text-primary", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

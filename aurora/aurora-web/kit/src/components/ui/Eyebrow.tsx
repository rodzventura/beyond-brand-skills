import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Rótulo entre colchetes em mono (ex.: "[01 · O ecossistema]"). */
type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & { tone?: "accent" | "muted" };

export function Eyebrow({ children, tone = "accent", className, ...rest }: EyebrowProps) {
  return (
    <p {...rest} className={cn("type-label-sm", tone === "accent" ? "text-au-text-accent" : "text-au-text-tertiary", className)}>
      [{children}]
    </p>
  );
}

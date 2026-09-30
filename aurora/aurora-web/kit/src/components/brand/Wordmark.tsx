import logoLight from "@/assets/brand/Logo_light.svg";
import logoDark from "@/assets/brand/Logo_dark.svg";
import type { Theme } from "@/components/layout/Section";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  /** Modo do fundo em que o wordmark está. Usa o arquivo oficial correspondente. */
  theme: Theme;
  className?: string;
};

// Arquivos oficiais de aurora-brand/assets — não redesenhar nem recolorir.
// Logo_light = claro, para fundo escuro · Logo_dark = escuro, para fundo claro.
export function Wordmark({ theme, className }: WordmarkProps) {
  return (
    <img
      src={theme === "dark" ? logoLight : logoDark}
      alt="aurora."
      width={797}
      height={136}
      className={cn("block h-auto", className)}
    />
  );
}

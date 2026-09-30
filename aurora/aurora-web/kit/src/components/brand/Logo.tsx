import { cn } from "@/lib/cn";

type LogoProps = {
  /** Conteúdo do SVG (importado com ?raw). As cores são currentColor: seguem o texto. */
  svg: string;
  /** Rótulo acessível (nome da empresa). */
  label: string;
  /** Largura em px no desktop (no mobile, 75% — ver .au-logo); a altura sai do viewBox. */
  largura: number;
  className?: string;
};

/** Logo de empresa do grupo, inline para herdar a cor do modo da seção. */
export function Logo({ svg, label, largura, className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("au-logo", className)}
      style={{ "--logo-w": largura } as React.CSSProperties}
      // SVG local, versionado no repositório (src/assets/logos) — não vem de fora.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

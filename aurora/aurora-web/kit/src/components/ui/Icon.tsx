import type { SVGProps } from "react";
import { ICONES } from "@/components/ui/icones";

// Família de ícones da Aurora: Material Symbols · Sharp, peso 300, em linha (Fase 6, 29/set).
// Cantos retos, como o resto do sistema. Os desenhos ficam em icones.ts.

export type IconName = keyof typeof ICONES;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number | string };

export function Icon({ name, size = "1em", ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={ICONES[name]} />
    </svg>
  );
}

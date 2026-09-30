import type { ReactNode } from "react";
import { TextureSlot } from "@/components/ui/TextureSlot";
import { cn } from "@/lib/cn";

/**
 * Faixa de trilho a trilho com a textura FAIXA ao fundo (revisão do usuário no Figma, 28/set:
 * aberturas do Ecossistema e da Jornada). A textura fica a 20% de opacidade, atrás do conteúdo.
 */
export function FaixaTexturada({ children, className }: { children: ReactNode; className?: string }) {
  return (
    // overflow-clip e não overflow-hidden: "hidden" vira contêiner de rolagem e prende a animação
    // de preenchimento do texto (animation-timeline: view()) dentro da faixa, que não rola.
    <div className={cn("au-entre-trilhos relative isolate overflow-clip", className)}>
      <TextureSlot id="FAIXA" className="absolute inset-0 -z-10" />
      {children}
    </div>
  );
}

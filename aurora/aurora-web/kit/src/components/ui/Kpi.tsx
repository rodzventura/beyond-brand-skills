import type { ReactNode } from "react";
import { Contador } from "@/components/ui/Contador";
import { cn } from "@/lib/cn";

type KpiProps = {
  value: string;
  label: ReactNode;
  /** xl = faixa de indicadores · lg = número em célula/card · md = número em lista/coluna */
  size?: "xl" | "lg" | "md";
  /** O rótulo curto vai em mono (Label/SM); frase completa vai em Body/SM. */
  labelStyle?: "mono" | "body";
  /** Conta de 0 até o valor quando aparece na tela. */
  contar?: boolean;
  className?: string;
};

/** KPI em destaque: número em Britti Sans Medium (KPI/*), rótulo em mono. */
export function Kpi({ value, label, size = "lg", labelStyle = "mono", contar = false, className }: KpiProps) {
  return (
    <div className={className}>
      <p className={`type-kpi-${size}`}>{contar ? <Contador valor={value} /> : value}</p>
      <p
        className={cn(
          labelStyle === "mono" ? "type-label-sm text-au-text-tertiary" : "type-body-sm max-w-[26ch] text-au-text-secondary",
          size === "xl" ? "mt-8" : "mt-3",
        )}
      >
        {label}
      </p>
    </div>
  );
}

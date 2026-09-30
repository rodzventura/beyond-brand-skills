import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const NUDGE: Partial<Record<IconName, CSSProperties>> = {
  "arrow-up-right": { "--nudge-x": 1, "--nudge-y": -1 } as CSSProperties,
  "arrow-right": { "--nudge-x": 1 } as CSSProperties,
  "arrow-down": { "--nudge-y": 1 } as CSSProperties,
  "arrow-left": { "--nudge-x": -1 } as CSSProperties,
};

type ArrowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  icon?: IconName;
  tone?: "accent" | "quiet";
  /** Seta antes do texto (ex.: "← Voltar"). */
  iconFirst?: boolean;
  children: ReactNode;
};

/** Link curto em mono com seta. Links externos abrem em nova aba. */
export function ArrowLink({ href, icon = "arrow-up-right", tone = "accent", iconFirst = false, children, className, ...rest }: ArrowLinkProps) {
  const externo = /^https?:\/\//.test(href);
  const seta = (
    <span className="au-link__icon" style={NUDGE[icon]} aria-hidden="true">
      <Icon name={icon} />
    </span>
  );
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn("au-link type-label-sm", tone === "quiet" && "au-link--quiet", className)}
      {...rest}
    >
      {iconFirst && seta}
      <span className="au-link__text">{children}</span>
      {!iconFirst && seta}
      {externo && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

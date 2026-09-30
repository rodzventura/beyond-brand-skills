import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useDissolve } from "@/hooks/useDissolve";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

// Direção em que o ícone rola no hover (ver .au-roll em components.css).
const ROLL: Partial<Record<IconName, CSSProperties>> = {
  "arrow-up-right": { "--roll-x": 1, "--roll-y": 1 } as CSSProperties,
  "arrow-right": { "--roll-x": 1, "--roll-y": 0 } as CSSProperties,
  "arrow-down": { "--roll-x": 0, "--roll-y": -1 } as CSSProperties,
};

type Common = {
  variant?: Variant;
  icon?: IconName;
  block?: boolean;
  children: ReactNode;
  className?: string;
};
type AsLink = Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common> & { href: string };
type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & { href?: undefined };

/**
 * Botão Aurora (Button/MD). Hover e foco pelo teclado: dissolução em pixels + texto e ícone rolando.
 * primary = laranja → inverso · secondary = contorno → cinza.
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", icon, block, children, className, ...rest } = props;
  const { state, handlers } = useDissolve();

  const classes = cn("au-dz au-btn type-button-md", `au-btn--${variant}`, block && "au-btn--block", className);
  const inner = (
    <>
      <span className="au-dz__px" aria-hidden="true" />
      <span className="au-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon && (
        <span className="au-roll au-btn__icon" style={ROLL[icon]} aria-hidden="true">
          <Icon name={icon} />
          <Icon name={icon} />
        </span>
      )}
    </>
  );

  if (rest.href !== undefined) {
    const anchor = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchor} {...handlers} data-dissolve={state} className={classes}>
        {inner}
      </a>
    );
  }
  const button = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...button} {...handlers} data-dissolve={state} className={classes}>
      {inner}
    </button>
  );
}

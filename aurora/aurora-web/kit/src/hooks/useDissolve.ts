import { useCallback, useRef, useState, type AnimationEvent, type FocusEvent, type PointerEvent } from "react";

/**
 * Estados da dissolução em pixels (referência: Heron AI).
 * idle → entering (pixels preenchem) → entered → exiting (pixels devolvem a cor de repouso) → idle.
 * Se o ponteiro sai durante a entrada, a saída espera a entrada terminar.
 */
export type DissolveState = "idle" | "entering" | "entered" | "exiting";

// A camada de pixels precisa da altura real para cobrir o elemento com células quadradas.
const medir = (el: HTMLElement) => el.style.setProperty("--dz-min-height", `${el.offsetHeight}px`);

const reduzMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useDissolve() {
  const [state, setState] = useState<DissolveState>("idle");
  const dentro = useRef(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  const entrar = useCallback((el: HTMLElement) => {
    medir(el);
    dentro.current = true;
    const atual = stateRef.current;
    if (atual === "idle" || atual === "exiting") setState(reduzMovimento() ? "entered" : "entering");
  }, []);

  const sair = useCallback((el: HTMLElement) => {
    medir(el);
    dentro.current = false;
    if (stateRef.current === "entered") setState(reduzMovimento() ? "idle" : "exiting");
    // "entering": onAnimationEnd decide.
  }, []);

  const onAnimationEnd = useCallback((e: AnimationEvent) => {
    const atual = stateRef.current;
    if (e.animationName === "au-dissolve-in" && atual === "entering") {
      setState(dentro.current ? "entered" : "exiting");
    } else if (e.animationName === "au-dissolve-out" && atual === "exiting") {
      setState(dentro.current ? "entering" : "idle");
    }
  }, []);

  const handlers = {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => e.pointerType !== "touch" && entrar(e.currentTarget),
    onPointerLeave: (e: PointerEvent<HTMLElement>) => e.pointerType !== "touch" && sair(e.currentTarget),
    onFocus: (e: FocusEvent<HTMLElement>) => (e.target as HTMLElement).matches(":focus-visible") && entrar(e.currentTarget),
    onBlur: (e: FocusEvent<HTMLElement>) => sair(e.currentTarget),
    onAnimationEnd,
  };

  return { state, handlers };
}

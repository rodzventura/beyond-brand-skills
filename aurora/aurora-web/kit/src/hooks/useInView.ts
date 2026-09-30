import { useEffect, useRef, useState } from "react";

/** true na primeira vez que o elemento aparece na tela (e continua true). */
export function useInView<T extends Element>(limiar = 0.5) {
  const ref = useRef<T>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visto) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisto(true);
          io.disconnect();
        }
      },
      { threshold: limiar },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [limiar, visto]);
  return { ref, visto };
}

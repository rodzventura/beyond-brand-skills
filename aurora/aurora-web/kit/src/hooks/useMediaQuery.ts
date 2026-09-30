import { useEffect, useState } from "react";

/** true enquanto a media query casar. */
export function useMediaQuery(query: string) {
  const [casa, setCasa] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setCasa(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return casa;
}

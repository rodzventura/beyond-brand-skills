import { useEffect, useRef } from "react";
import { criarCampo, type Quadro } from "@/texture/campo";
import type { Receita } from "@/texture/receitas";
import { cn } from "@/lib/cn";

type AsciiTextureProps = {
  receita: Receita;
  /**
   * Desloca a densidade (-1 a 1): negativo = mais espaço vazio, positivo = mais glifos.
   * Muda com transição suave — usado na Jornada para a densidade acompanhar a fase.
   */
  densidade?: number;
  className?: string;
};

const DPR_MAX = 2;

/**
 * Textura ASCII da Aurora, desenhada em canvas com o núcleo do aurora. ASCII Studio.
 * Fundo transparente; as cores vêm dos tokens do modo da seção (texto secundário e terciário,
 * e o laranja de sinal quando a receita pede). Anima só quando está na tela; com movimento
 * reduzido, desenha um quadro parado. Decorativa: fica fora da árvore de acessibilidade.
 */
export function AsciiTexture({ receita, densidade = 0, className }: AsciiTextureProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const alvo = useRef(densidade);
  const acordarRef = useRef<() => void>();
  alvo.current = densidade;

  // Densidade mudou por fora (ex.: fase da jornada): acorda o loop para a transição.
  useEffect(() => acordarRef.current?.(), [densidade]);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const r = receita;
    const ramp = r.ramp ?? " .:-=+*#%@";
    const levels = ramp.length;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anima = (r.anim ?? true) && !reduz;
    const intervalo = 1000 / (r.fps ?? 24);

    let cols = 0, rows = 0, cw = 0, ch = 0, W = 0, H = 0;
    let quadro: Quadro | null = null;
    let tinta: string[] = [];
    // Atlas de glifos (Fase 7, desempenho): cada glifo em cada cor é desenhado uma vez num canvas
    // fora da tela e copiado com drawImage — ~15 mil fillText por quadro custavam ~15ms.
    let atlas: HTMLCanvasElement | null = null;
    let gw = 0, gh = 0;
    let atual = alvo.current;
    let visivel = false, raf = 0, ultimo = 0;
    const t0 = performance.now();

    // O cálculo do quadro vai para um worker; sem worker (navegador antigo), roda aqui mesmo.
    let worker: Worker | null = null;
    try {
      worker = new Worker(new URL("./texture.worker.ts", import.meta.url), { type: "module" });
    } catch {
      worker = null;
    }
    let geracao = 0, ocupado = false;
    let local: ((t: number, d: number) => Quadro) | null = null;

    const lerCores = () => {
      const cs = getComputedStyle(cv);
      const v = (nome: string) => cs.getPropertyValue(nome).trim();
      // mesma ordem do Studio: [principal, apoio, acento]
      const principal = r.cor
        ? v(r.cor)
        : r.tinta === "terciaria" ? v("--color-text-tertiary") : v("--color-text-secondary");
      tinta = [principal, v("--color-text-tertiary"), v("--color-accent-signal")];
    };

    const montarAtlas = () => {
      gw = Math.ceil(cw) + 2;
      gh = Math.ceil(ch) + 2;
      atlas ??= document.createElement("canvas");
      atlas.width = gw * levels;
      atlas.height = gh * tinta.length;
      const a = atlas.getContext("2d");
      if (!a) return;
      a.clearRect(0, 0, atlas.width, atlas.height);
      a.textAlign = "center";
      a.textBaseline = "middle";
      a.font = `${(ch * 0.92).toFixed(2)}px "JetBrains Mono", ui-monospace, monospace`;
      for (let c = 0; c < tinta.length; c++) {
        a.fillStyle = tinta[c];
        for (let k = 0; k < levels; k++) a.fillText(ramp[k], k * gw + gw / 2, c * gh + gh / 2);
      }
    };

    const setup = () => {
      const dpr = Math.min(DPR_MAX, window.devicePixelRatio || 1);
      const { width, height } = cv.getBoundingClientRect();
      W = Math.max(1, Math.round(width * dpr));
      H = Math.max(1, Math.round(height * dpr));
      cv.width = W;
      cv.height = H;
      const alturaCelula = r.cellPx * dpr;
      rows = Math.max(1, Math.floor(H / alturaCelula));
      cols = Math.max(1, Math.floor(W / (alturaCelula * (r.cellAspect ?? 0.6))));
      cw = W / cols;
      ch = H / rows;
      quadro = null;
      geracao++;
      ocupado = false;
      if (worker) worker.postMessage({ tipo: "config", geracao, receita: r, cols, rows, ar: W / H });
      else local = criarCampo(r, cols, rows, W / H);
      lerCores();
      montarAtlas();
    };

    const pintar = () => {
      ctx.clearRect(0, 0, W, H);
      if (!atlas || !quadro || quadro.idx.length !== cols * rows) return;
      const { idx, col } = quadro;
      ctx.globalAlpha = r.opacity ?? 1;
      const vazio = ramp[0] === " ";
      for (let i = 0; i < cols * rows; i++) {
        const k = idx[i];
        if (k === 0 && vazio) continue;
        const x = Math.round(((i % cols) + 0.5) * cw - gw / 2);
        const y = Math.round((Math.floor(i / cols) + 0.5) * ch - gh / 2);
        ctx.drawImage(atlas, k * gw, col[i] * gh, gw, gh, x, y, gw, gh);
      }
    };

    if (worker)
      worker.onmessage = (e: MessageEvent<Quadro & { geracao: number }>) => {
        ocupado = false;
        if (e.data.geracao !== geracao) return;
        quadro = { idx: e.data.idx, col: e.data.col };
        pintar();
      };

    const desenhar = (agora: number) => {
      if (!cols) return;
      const t = anima ? (((agora - t0) / 1000 / (r.period ?? 12)) % 1) : 0;
      // densidade: aproxima do alvo aos poucos (transição sem pular)
      atual += (alvo.current - atual) * (reduz ? 1 : 0.12);
      if (worker) {
        // Um quadro por vez: se o worker ainda está calculando, este é pulado.
        if (ocupado) return;
        ocupado = true;
        worker.postMessage({ tipo: "quadro", geracao, t, densidade: atual });
      } else if (local) {
        quadro = local(t, atual);
        pintar();
      }
    };

    const loop = (agora: number) => {
      raf = 0;
      if (!visivel || document.hidden) return;
      if (agora - ultimo >= intervalo) {
        ultimo = agora;
        desenhar(agora);
      }
      if (anima || Math.abs(alvo.current - atual) > 0.002) raf = requestAnimationFrame(loop);
    };
    const acordar = () => {
      if (!raf && visivel) raf = requestAnimationFrame(loop);
    };
    acordarRef.current = acordar;

    setup();
    desenhar(performance.now());
    const ro = new ResizeObserver(() => {
      setup();
      desenhar(performance.now());
    });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) acordar();
    });
    io.observe(cv);
    const onVis = () => !document.hidden && acordar();
    document.addEventListener("visibilitychange", onVis);
    // A fonte pode chegar depois do primeiro quadro: refaz o atlas com a JetBrains.
    document.fonts?.ready.then(() => {
      montarAtlas();
      pintar();
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      worker?.terminate();
      document.removeEventListener("visibilitychange", onVis);
      acordarRef.current = undefined;
    };
  }, [receita]);

  return <canvas ref={ref} aria-hidden="true" className={cn("block h-full w-full", className)} />;
}

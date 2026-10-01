// Loading da página em quadrados laranja (30/set; referência: legencymedia.com).
//
// Entrada: a cortina laranja (#au-loader, já pintada pelo index.html) vira uma grade de quadrados
// que somem um a um, em ordem aleatória — 24 colunas no desktop, 16 no tablet, 6 e 4 no celular.
// Depois do login: os quadrados voltam em ordem aleatória, cobrem a tela, a página troca por
// baixo e eles se desfazem de novo (transicaoDePagina). Só nesses dois momentos (01/out).
// Desenhado num canvas (um retângulo por quadrado), não em mil <div>s.
// Com movimento reduzido, nada disso roda: o CSS do index.html esconde a cortina.

const COR = "#FA6E30"; // --color-accent-signal (fixo: roda antes do CSS da página carregar)
const ATRASO = 150; // ms parado antes de começar a desfazer
const SEQUENCIA_ENTRADA = 400; // ms entre o primeiro e o último quadrado que some
const SEQUENCIA_SAIDA = 250; // ms entre o primeiro e o último quadrado que aparece (pós-login)
const FADE = 100; // ms de cada quadrado
const ESPERA_MAX = 1200; // ms: não segura a página mais que isso esperando as fontes

const reduzMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// 01/out: quadrados maiores que a referência (40 colunas): 24 no desktop = 2 por coluna da grade
// de 12; 16 entre 768 e 1279; 6 e 4 no celular.
const colunas = (w: number) => (w <= 479 ? 4 : w <= 767 ? 6 : w <= 1279 ? 16 : 24);

// Bordas de cada coluna e linha em pixels do aparelho, inteiros: quadrados vizinhos se encostam
// sem fresta (em frações de pixel o antialias desenhava uma grade de linhas no laranja cheio).
type Grade = { ctx: CanvasRenderingContext2D; xs: number[]; ys: number[]; cols: number; ordem: number[]; W: number; H: number };

function montarGrade(el: HTMLElement): Grade | null {
  let cv = el.querySelector("canvas");
  if (!cv) {
    cv = document.createElement("canvas");
    el.appendChild(cv);
  }
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = window.innerWidth;
  const H = window.innerHeight;
  cv.width = Math.round(W * dpr);
  cv.height = Math.round(H * dpr);
  const cols = colunas(W);
  const lado = (W / cols) * dpr;
  const rows = Math.ceil(cv.height / lado);
  const xs = Array.from({ length: cols + 1 }, (_, i) => Math.round(i * lado));
  const ys = Array.from({ length: rows + 1 }, (_, i) => Math.round(i * lado));
  // Ordem aleatória (Fisher–Yates): posição na fila → momento em que o quadrado muda.
  const ordem = Array.from({ length: cols * rows }, (_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  return { ctx, xs, ys, cols, ordem, W: cv.width, H: cv.height };
}

/** Anima de `de` a `para` (opacidade de cada quadrado) e resolve no fim. */
function animar(g: Grade, de: 0 | 1, para: 0 | 1, atraso: number, sequencia: number, fator = 1) {
  const { ctx, xs, ys, cols, ordem, W, H } = g;
  const total = ordem.length;
  const inicio = new Array<number>(total);
  ordem.forEach((celula, fila) => (inicio[celula] = (atraso + (fila / Math.max(1, total - 1)) * sequencia) * fator));
  const fade = FADE * fator;
  const fim = (atraso + sequencia + FADE) * fator;
  return new Promise<void>((resolver) => {
    const t0 = performance.now();
    const quadro = (agora: number) => {
      const t = agora - t0;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = COR;
      for (let c = 0; c < total; c++) {
        const p = Math.min(1, Math.max(0, (t - inicio[c]) / fade));
        const a = de + (para - de) * p;
        if (a <= 0) continue;
        ctx.globalAlpha = a;
        const x = c % cols;
        const y = Math.floor(c / cols);
        ctx.fillRect(xs[x], ys[y], xs[x + 1] - xs[x], ys[y + 1] - ys[y]);
      }
      ctx.globalAlpha = 1;
      if (t < fim) requestAnimationFrame(quadro);
      else resolver();
    };
    requestAnimationFrame(quadro);
  });
}

async function entrada(el: HTMLElement, fator = 1) {
  // Espera as fontes (a página aparece já com a Britti), com teto para não travar.
  await Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, ESPERA_MAX))]);
  const g = montarGrade(el);
  if (!g) {
    el.style.display = "none";
    return;
  }
  // Grade cheia desenhada antes de tirar o fundo: nenhum quadro fica sem cobertura.
  g.ctx.fillStyle = COR;
  g.ctx.fillRect(0, 0, g.W, g.H);
  el.style.background = "transparent"; // a partir daqui quem pinta é o canvas
  await animar(g, 1, 0, ATRASO, SEQUENCIA_ENTRADA, fator);
  el.style.display = "none";
}

/** Marca, antes de um redirecionamento externo de login (ex.: Google), que a próxima carga é
 *  "depois do login": a página de destino abre com o efeito. */
export const MARCA_POS_LOGIN = "aurora-pos-login";

/**
 * Transição depois do login (01/out): os quadrados fecham a tela, `navegar` troca de página
 * (navegação do React, sem recarregar) e os quadrados abrem já na página de destino.
 * Com movimento reduzido ou sem a cortina, só navega.
 */
export async function transicaoDePagina(navegar: () => void) {
  const el = document.getElementById("au-loader");
  if (!el || reduzMovimento()) {
    navegar();
    return;
  }
  el.style.display = "block";
  el.style.background = "transparent";
  const g = montarGrade(el);
  if (!g) {
    el.style.display = "none";
    navegar();
    return;
  }
  await animar(g, 0, 1, 0, SEQUENCIA_SAIDA);
  navegar();
  // Dois quadros: o React pinta a página nova por baixo antes de a cortina abrir.
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await entrada(el);
}

/**
 * Efeito só em dois momentos (01/out): ao abrir a página inicial (/) e depois do login.
 * Nas outras telas a cortina já é escondida pelo index.html antes da primeira pintura.
 */
export function iniciarLoader() {
  const el = document.getElementById("au-loader");
  if (!el) return;
  if (reduzMovimento()) {
    el.remove();
    return;
  }
  let posLogin = false;
  try {
    posLogin = sessionStorage.getItem(MARCA_POS_LOGIN) === "1";
    sessionStorage.removeItem(MARCA_POS_LOGIN);
  } catch {
    /* sem sessionStorage: segue sem o efeito pós-login */
  }
  if (location.pathname === "/" || posLogin) entrada(el);
  else el.style.display = "none";
  // Voltar pelo histórico com a página em cache: a cortina não pode ficar fechada.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) el.style.display = "none";
  });
  // Só em desenvolvimento: repetir a entrada mais devagar para conferir (ex.: 8x).
  if (import.meta.env.DEV)
    Object.assign(window, {
      __auroraLoader: (fator = 8) => {
        el.style.display = "block";
        el.style.background = COR;
        return entrada(el, fator);
      },
    });
}

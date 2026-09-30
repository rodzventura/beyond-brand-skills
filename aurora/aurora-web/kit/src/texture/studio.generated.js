/* eslint-disable */
// @ts-nocheck
// GERADO por scripts/sync-ascii-kernel.mjs a partir do aurora. ASCII Studio
// (index.html sha256:95201c135d43). Não editar — mude o Studio e rode `npm run textura:sync`.

const TAU = 6.283185307179586;

/* ====================== KERNEL (serializado no snippet) ================ */

function mulberry32(a){
  return function(){
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise4(rand){
  const perm = new Uint8Array(256);
  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 255; i > 0; i--){
    const j = (rand() * (i + 1)) | 0;
    const t = perm[i]; perm[i] = perm[j]; perm[j] = t;
  }
  const p = new Uint16Array(512);
  for (let i = 0; i < 512; i++) p[i] = perm[i & 255];

  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + t * (b - a);
  function grad4(h, x, y, z, w){
    h &= 31;
    let a = y, b = z, c = w;
    switch (h >> 3){
      case 1: a = w; b = x; c = y; break;
      case 2: a = z; b = w; c = x; break;
      case 3: a = y; b = z; c = w; break;
    }
    return ((h & 4) === 0 ? -a : a) + ((h & 2) === 0 ? -b : b) + ((h & 1) === 0 ? -c : c);
  }
  return function(x, y, z, w){
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255, W = Math.floor(w) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z); w -= Math.floor(w);
    const u = fade(x), v = fade(y), t = fade(z), s = fade(w);
    const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z;
    const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
    const AAA = p[AA] + W, AAB = p[AA + 1] + W, ABA = p[AB] + W, ABB = p[AB + 1] + W;
    const BAA = p[BA] + W, BAB = p[BA + 1] + W, BBA = p[BB] + W, BBB = p[BB + 1] + W;
    return lerp(
      lerp(
        lerp(lerp(grad4(p[AAA], x, y, z, w),         grad4(p[BAA], x-1, y, z, w), u),
             lerp(grad4(p[ABA], x, y-1, z, w),       grad4(p[BBA], x-1, y-1, z, w), u), v),
        lerp(lerp(grad4(p[AAB], x, y, z-1, w),       grad4(p[BAB], x-1, y, z-1, w), u),
             lerp(grad4(p[ABB], x, y-1, z-1, w),     grad4(p[BBB], x-1, y-1, z-1, w), u), v), t),
      lerp(
        lerp(lerp(grad4(p[AAA+1], x, y, z, w-1),     grad4(p[BAA+1], x-1, y, z, w-1), u),
             lerp(grad4(p[ABA+1], x, y-1, z, w-1),   grad4(p[BBA+1], x-1, y-1, z, w-1), u), v),
        lerp(lerp(grad4(p[AAB+1], x, y, z-1, w-1),   grad4(p[BAB+1], x-1, y, z-1, w-1), u),
             lerp(grad4(p[ABB+1], x, y-1, z-1, w-1), grad4(p[BBB+1], x-1, y-1, z-1, w-1), u), v), t),
      s);
  };
}

function fbm(n4, x, y, z, w, oct, gain){
  let sum = 0, amp = 1, norm = 0, f = 1;
  for (let i = 0; i < oct; i++){
    sum += amp * n4(x * f, y * f, z * f, w * f);
    norm += amp; amp *= gain; f *= 2;
  }
  return norm > 0 ? sum / norm : 0;
}

function curve(v, c){
  if (v < 0) v = 0; else if (v > 1) v = 1;
  if (c === 0) return v;
  if (c > 0){
    const k = 1 + c * 6;
    return 1 / (1 + Math.exp(-k * (v - 0.5)));
  }
  const k = 1 + (-c) * 3;
  return 0.5 + (v - 0.5) / k;
}

function bayerMatrix(n){
  if (n <= 1) return [[0]];
  const s = bayerMatrix(n >> 1), h = n >> 1;
  const m = [];
  for (let y = 0; y < n; y++) m.push(new Array(n).fill(0));
  for (let y = 0; y < h; y++) for (let x = 0; x < h; x++){
    const v = s[y][x] * 4;
    m[y][x] = v; m[y][x + h] = v + 2; m[y + h][x] = v + 3; m[y + h][x + h] = v + 1;
  }
  return m;
}

function phaseCurve(t, mode, amt){
  // precisa valer curve(0)=0 e curve(1)=1, senao o loop deixa de fechar
  if (mode === 'suave')  return t - (amt / 6.283185307179586) * Math.sin(6.283185307179586 * t);
  if (mode === 'pulso')  return t + (amt / 6.283185307179586) * Math.sin(6.283185307179586 * t);
  return t;
}

function equalize(val, n, amount){
  // o fbm normaliza pela soma das amplitudes e devolve uma faixa estreita
  // (~0.24..0.76): so os niveis do meio da rampa sao usados. Aqui a
  // distribuicao e achatada por CDF de 256 bins — O(n), sem ordenar.
  if (amount <= 0.001 || n < 2) return;
  let mn = Infinity, mx = -Infinity;
  for (let i = 0; i < n; i++){ const v = val[i]; if (v < mn) mn = v; if (v > mx) mx = v; }
  const span = mx - mn;
  if (span < 1e-6) return;
  const B = 256, hist = new Uint32Array(B), cdf = new Float32Array(B);
  const sc = (B - 1) / span;
  for (let i = 0; i < n; i++) hist[((val[i] - mn) * sc) | 0]++;
  let acc = 0;
  for (let b = 0; b < B; b++){ acc += hist[b]; cdf[b] = acc / n; }
  for (let i = 0; i < n; i++){
    const v = val[i];
    const eq = cdf[((v - mn) * sc) | 0];
    val[i] = v + (eq - v) * amount;
  }
}

function ditherPass(val, cols, rows, levels, mode){
  if (mode === 'none' || levels < 2) return;
  const step = 1 / (levels - 1);
  if (mode === 'fs'){
    for (let y = 0; y < rows; y++){
      for (let x = 0; x < cols; x++){
        const i = y * cols + x;
        const old = val[i];
        const nv = Math.round(old / step) * step;
        val[i] = nv;
        const err = old - nv;
        if (x + 1 < cols)                val[i + 1]           += err * 0.4375;
        if (y + 1 < rows){
          if (x > 0)                     val[i + cols - 1]    += err * 0.1875;
                                         val[i + cols]        += err * 0.3125;
          if (x + 1 < cols)              val[i + cols + 1]    += err * 0.0625;
        }
      }
    }
    return;
  }
  const n = mode === 'bayer2' ? 2 : mode === 'bayer4' ? 4 : 8;
  const m = bayerMatrix(n), den = n * n;
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      const i = y * cols + x;
      val[i] += ((m[y % n][x % n] + 0.5) / den - 0.5) * step;
    }
  }
}

function quantize(val, idx, col, cols, rows, levels, invert, colorMode, accentAt){
  const n = cols * rows, last = levels - 1;
  for (let i = 0; i < n; i++){
    let v = val[i];
    if (v < 0) v = 0; else if (v > 1) v = 1;
    if (invert) v = 1 - v;
    let k = Math.round(v * last);
    if (k < 0) k = 0; else if (k > last) k = last;
    idx[i] = k;
    if (colorMode === 'mono')      col[i] = 0;
    else if (colorMode === 'duo')  col[i] = (k / last) < 0.5 ? 1 : 0;
    else                            col[i] = (k / last) >= accentAt ? 2 : ((k / last) < 0.34 ? 1 : 0);
  }
}

/* ====================== GERADORES ====================== */
/* Cada make(P, seed, A) devolve FieldFn: (u, v, t, ar) -> 0..1
   u,v normalizados na composição · t fase 0..1 · ar = largura/altura  */

const GENS = [
{
  id:'campo.ruido', fam:'campo', label:'Ruído fractal',
  controls:[
    {k:'scale', l:'Escala',    t:'range', min:0.5, max:14,  step:0.1, d:3.4},
    {k:'oct',   l:'Oitavas',   t:'range', min:1,   max:6,   step:1,   d:4},
    {k:'gain',  l:'Ganho',     t:'range', min:0.2, max:0.8, step:0.01,d:0.5},
    {k:'warp',  l:'Distorção', t:'range', min:0,   max:2.5, step:0.05,d:0.45},
    {k:'cont',  l:'Contraste', t:'range', min:-1,  max:1,   step:0.02,d:0.25}
  ],
  make(P, seed){
    const n4 = makeNoise4(mulberry32(seed));
    return function(u, v, t, ar){
      const cz = P.loopR * Math.cos(TAU * t), cw = P.loopR * Math.sin(TAU * t);
      let x = u * P.scale * ar, y = v * P.scale;
      if (P.warp > 0){
        const wx = fbm(n4, x + 11.3, y + 7.7, cz, cw, 2, 0.5);
        const wy = fbm(n4, x - 5.1, y + 3.3, cz, cw, 2, 0.5);
        x += wx * P.warp; y += wy * P.warp;
      }
      return curve(fbm(n4, x, y, cz, cw, P.oct, P.gain) * 0.85 + 0.5, P.cont);
    };
  }
},
{
  id:'campo.ondas', fam:'campo', label:'Ondas',
  controls:[
    {k:'fx',   l:'Frequência X', t:'range', min:0, max:24, step:0.5, d:5},
    {k:'fy',   l:'Frequência Y', t:'range', min:0, max:24, step:0.5, d:3},
    {k:'harm', l:'Harmônico',    t:'range', min:1, max:5,  step:1,   d:2},
    {k:'cyc',  l:'Ciclos/volta', t:'range', min:0, max:4,  step:1,   d:1},
    {k:'cont', l:'Contraste',    t:'range', min:-1,max:1,  step:0.02,d:0.3}
  ],
  make(P){
    return function(u, v, t, ar){
      const a = Math.sin(TAU * (u * P.fx * ar + v * P.fy + P.cyc * t));
      const b = Math.sin(TAU * (u * P.fx * P.harm * 0.37 - v * P.fy * 0.61 - P.cyc * t));
      return curve((a * 0.6 + b * 0.4) * 0.5 + 0.5, P.cont);
    };
  }
},
{
  id:'campo.fluxo', fam:'campo', label:'Campo de fluxo',
  controls:[
    {k:'scale', l:'Escala',    t:'range', min:0.5, max:10, step:0.1, d:2.6},
    {k:'steps', l:'Passos',    t:'range', min:2,   max:18, step:1,   d:9},
    {k:'len',   l:'Avanço',    t:'range', min:0.005,max:0.09,step:0.002,d:0.028},
    {k:'cont',  l:'Contraste', t:'range', min:-1,  max:1,  step:0.02,d:0.35}
  ],
  make(P, seed){
    const n4 = makeNoise4(mulberry32(seed));
    return function(u, v, t, ar){
      const cz = P.loopR * Math.cos(TAU * t), cw = P.loopR * Math.sin(TAU * t);
      let x = u, y = v, acc = 0;
      for (let i = 0; i < P.steps; i++){
        const ang = n4(x * P.scale * ar, y * P.scale, cz, cw) * TAU * 2;
        x += Math.cos(ang) * P.len;
        y += Math.sin(ang) * P.len;
        acc += n4(x * P.scale * ar * 1.7, y * P.scale * 1.7, cz, cw);
      }
      return curve(acc / P.steps * 1.1 + 0.5, P.cont);
    };
  }
},
{
  id:'campo.interferencia', fam:'campo', label:'Interferência',
  controls:[
    {k:'srcs', l:'Fontes',     t:'range', min:2,  max:9,  step:1,   d:4},
    {k:'freq', l:'Frequência', t:'range', min:2,  max:40, step:0.5, d:14},
    {k:'decay',l:'Queda',      t:'range', min:0,  max:3,  step:0.05,d:0.8},
    {k:'cyc',  l:'Ciclos/volta',t:'range',min:0,  max:4,  step:1,   d:1},
    {k:'cont', l:'Contraste',  t:'range', min:-1, max:1,  step:0.02,d:0.2}
  ],
  make(P, seed){
    const r = mulberry32(seed), pts = [];
    for (let i = 0; i < 9; i++) pts.push([r(), r(), r()]);
    return function(u, v, t, ar){
      let s = 0;
      for (let i = 0; i < P.srcs; i++){
        const dx = (u - pts[i][0]) * ar, dy = v - pts[i][1];
        const d = Math.sqrt(dx * dx + dy * dy);
        s += Math.sin(TAU * (d * P.freq - P.cyc * t + pts[i][2])) * Math.exp(-d * P.decay);
      }
      return curve(s / P.srcs * 0.9 + 0.5, P.cont);
    };
  }
},
{
  id:'campo.dissolucao', fam:'campo', label:'Dissolução',
  controls:[
    {k:'ang',  l:'Ângulo',     t:'range', min:0,   max:360,step:1,   d:90},
    {k:'soft', l:'Suavidade',  t:'range', min:0.02,max:1,  step:0.01,d:0.5},
    {k:'grain',l:'Grão',       t:'range', min:0.5, max:24, step:0.5, d:9},
    {k:'mix',  l:'Ruído',      t:'range', min:0,   max:1,  step:0.02,d:0.6}
  ],
  make(P, seed){
    const n4 = makeNoise4(mulberry32(seed));
    return function(u, v, t, ar){
      const a = P.ang * Math.PI / 180;
      const g = (u - 0.5) * Math.cos(a) + (v - 0.5) * Math.sin(a) + 0.5;
      const cz = P.loopR * Math.cos(TAU * t), cw = P.loopR * Math.sin(TAU * t);
      const n = n4(u * P.grain * ar, v * P.grain, cz, cw) * 0.5 + 0.5;
      const e = (g - 0.5) / Math.max(P.soft, 0.02) + 0.5;
      return Math.max(0, Math.min(1, e * (1 - P.mix) + (e * 0.5 + n * 0.5) * P.mix));
    };
  }
},

{
  id:'geo.listras', fam:'geo', label:'Listras',
  controls:[
    {k:'freq', l:'Frequência', t:'range', min:1, max:60, step:1,   d:14},
    {k:'ang',  l:'Ângulo',     t:'range', min:0, max:180,step:1,   d:0},
    {k:'duty', l:'Espessura',  t:'range', min:0.05,max:0.95,step:0.01,d:0.5},
    {k:'soft', l:'Suavidade',  t:'range', min:0, max:1,  step:0.02,d:0.35}
  ],
  make(P){
    return function(u, v, t, ar){
      const a = P.ang * Math.PI / 180;
      const s = (u * ar * Math.cos(a) + v * Math.sin(a)) * P.freq;
      const f = s - Math.floor(s);
      const d = Math.abs(f - P.duty);
      if (P.soft <= 0.001) return f < P.duty ? 1 : 0;
      return Math.max(0, Math.min(1, 1 - d / P.soft));
    };
  }
},
{
  id:'geo.xadrez', fam:'geo', label:'Xadrez',
  controls:[
    {k:'nx',  l:'Colunas',  t:'range', min:1, max:40, step:1,   d:8},
    {k:'ny',  l:'Linhas',   t:'range', min:1, max:40, step:1,   d:10},
    {k:'bias',l:'Peso',     t:'range', min:0, max:1,  step:0.02,d:0.5},
    {k:'soft',l:'Suavidade',t:'range', min:0, max:1,  step:0.02,d:0}
  ],
  make(P){
    return function(u, v){
      const gx = Math.floor(u * P.nx), gy = Math.floor(v * P.ny);
      const on = ((gx + gy) & 1) === 0 ? 1 : 0;
      if (P.soft <= 0.001) return on ? P.bias + 0.5 * (1 - P.bias) : P.bias * 0.5;
      const fx = u * P.nx - gx, fy = v * P.ny - gy;
      const e = Math.min(fx, 1 - fx, fy, 1 - fy) / Math.max(P.soft * 0.5, 0.01);
      const m = Math.max(0, Math.min(1, e));
      return on ? 0.5 + 0.5 * m : 0.5 - 0.5 * m;
    };
  }
},
{
  id:'geo.halftone', fam:'geo', label:'Halftone',
  controls:[
    {k:'freq', l:'Frequência', t:'range', min:2, max:50, step:1,   d:16},
    {k:'ang',  l:'Ângulo',     t:'range', min:0, max:180,step:1,   d:45},
    {k:'grad', l:'Gradiente',  t:'range', min:0, max:1,  step:0.02,d:0.7},
    {k:'gang', l:'Eixo',       t:'range', min:0, max:360,step:1,   d:90}
  ],
  make(P){
    return function(u, v, t, ar){
      const a = P.ang * Math.PI / 180;
      const x = (u * ar * Math.cos(a) - v * Math.sin(a)) * P.freq;
      const y = (u * ar * Math.sin(a) + v * Math.cos(a)) * P.freq;
      const fx = x - Math.floor(x) - 0.5, fy = y - Math.floor(y) - 0.5;
      const d = Math.sqrt(fx * fx + fy * fy) * 2;
      const ga = P.gang * Math.PI / 180;
      const g = (u - 0.5) * Math.cos(ga) + (v - 0.5) * Math.sin(ga) + 0.5;
      const target = 1 - (g * P.grad + (1 - P.grad) * 0.5);
      return Math.max(0, Math.min(1, 1 - (d - target) * 3));
    };
  }
},
{
  id:'geo.moire', fam:'geo', label:'Moiré',
  controls:[
    {k:'freq', l:'Frequência', t:'range', min:2, max:60, step:1,   d:22},
    {k:'a1',   l:'Ângulo A',   t:'range', min:0, max:180,step:1,   d:0},
    {k:'a2',   l:'Ângulo B',   t:'range', min:0, max:180,step:1,   d:7},
    {k:'ratio',l:'Razão',      t:'range', min:0.8,max:1.25,step:0.005,d:1},
    {k:'cyc',  l:'Ciclos/volta',t:'range',min:0, max:4,  step:1,   d:1}
  ],
  make(P){
    return function(u, v, t, ar){
      const r1 = P.a1 * Math.PI / 180, r2 = P.a2 * Math.PI / 180;
      const s1 = Math.sin(TAU * ((u * ar * Math.cos(r1) + v * Math.sin(r1)) * P.freq + P.cyc * t));
      const s2 = Math.sin(TAU * ((u * ar * Math.cos(r2) + v * Math.sin(r2)) * P.freq * P.ratio - P.cyc * t));
      return Math.max(0, Math.min(1, (s1 * s2) * 0.5 + 0.5));
    };
  }
},
{
  id:'geo.grade', fam:'geo', label:'Grade',
  controls:[
    {k:'nx',   l:'Colunas',   t:'range', min:1, max:48, step:1,   d:12},
    {k:'ny',   l:'Linhas',    t:'range', min:1, max:48, step:1,   d:15},
    {k:'th',   l:'Espessura', t:'range', min:0.02,max:0.9,step:0.01,d:0.22},
    {k:'fill', l:'Preenche',  t:'range', min:0, max:1,  step:0.02,d:0}
  ],
  make(P){
    // perfil continuo em vez de limiar duro: uma linha mais fina que o passo
    // de amostragem cairia entre duas celulas e sumiria por completo
    return function(u, v){
      const fx = u * P.nx - Math.floor(u * P.nx), fy = v * P.ny - Math.floor(v * P.ny);
      const dx = Math.min(fx, 1 - fx) * 2, dy = Math.min(fy, 1 - fy) * 2;
      const sharp = 1 / Math.max(P.th, 0.02);
      const m = Math.max(Math.pow(Math.max(0, 1 - dx), sharp),
                         Math.pow(Math.max(0, 1 - dy), sharp));
      return Math.max(0, Math.min(1, Math.max(P.fill, m)));
    };
  }
},

{
  id:'imagem.ascii', fam:'imagem', label:'Imagem → ASCII',
  controls:[
    {k:'bri',  l:'Brilho',    t:'range', min:-0.6,max:0.6, step:0.02,d:0},
    {k:'cont', l:'Contraste', t:'range', min:-1,  max:1,   step:0.02,d:0.15},
    {k:'gam',  l:'Gama',      t:'range', min:0.3, max:2.6, step:0.05,d:1},
    {k:'edge', l:'Bordas',    t:'range', min:0,   max:1,   step:0.02,d:0},
    {k:'fit',  l:'Ajuste',    t:'select', opts:[['cover','Preencher'],['contain','Conter']], d:'cover'}
  ],
  make(P, seed, A){
    const lum = A && A.lum, cols = A ? A.cols : 1, rows = A ? A.rows : 1;
    return function(u, v){
      if (!lum) return 0;
      let x = Math.floor(u * cols); if (x < 0) x = 0; else if (x >= cols) x = cols - 1;
      let y = Math.floor(v * rows); if (y < 0) y = 0; else if (y >= rows) y = rows - 1;
      const i = y * cols + x;
      let g = lum[i];
      if (P.edge > 0){
        const xr = x + 1 < cols ? lum[i + 1] : g;
        const yd = y + 1 < rows ? lum[i + cols] : g;
        g = g * (1 - P.edge) + Math.min(1, Math.abs(g - xr) * 4 + Math.abs(g - yd) * 4) * P.edge;
      }
      g = Math.pow(Math.max(0, Math.min(1, g + P.bri)), P.gam);
      return curve(g, P.cont);
    };
  }
},

{
  id:'tipo.mascara', fam:'tipo', label:'Tipografia',
  controls:[
    {k:'word',  l:'Palavra',  t:'text',   d:'aurora.'},
    {k:'wmark', l:'Wordmark oficial', t:'toggle', d:false, hint:'Usa o SVG versionado da marca como máscara. Não redesenha nem recolore.'},
    {k:'weight',l:'Peso',     t:'range',  min:100, max:800, step:100, d:600},
    {k:'track', l:'Tracking', t:'range',  min:-0.08,max:0.5, step:0.005, d:0},
    {k:'fill',  l:'Ocupação', t:'range',  min:0.3, max:1,   step:0.01, d:0.86},
    {k:'inner', l:'Textura interna', t:'gen', d:'campo.ruido'},
    {k:'where', l:'Aplicar em', t:'select', opts:[['dentro','Dentro'],['fora','Fora'],['ambos','Ambos']], d:'dentro'},
    {k:'floor', l:'Piso',     t:'range',  min:0, max:1, step:0.02, d:0}
  ],
  make(P, seed, A){
    const mask = A && A.mask, cols = A ? A.cols : 1, rows = A ? A.rows : 1;
    const innerFn = A && A.innerFn;
    return function(u, v, t, ar){
      let m = 0;
      if (mask){
        let x = Math.floor(u * cols); if (x < 0) x = 0; else if (x >= cols) x = cols - 1;
        let y = Math.floor(v * rows); if (y < 0) y = 0; else if (y >= rows) y = rows - 1;
        m = mask[y * cols + x];
      }
      if (P.where === 'fora') m = 1 - m;
      else if (P.where === 'ambos') m = 1;
      const tex = innerFn ? innerFn(u, v, t, ar) : 1;
      return Math.max(0, Math.min(1, m * tex + (1 - m) * P.floor));
    };
  }
}
];

function genById(id){ return GENS.find(g => g.id === id) || GENS[0]; }

export { mulberry32, makeNoise4, fbm, curve, phaseCurve, equalize, bayerMatrix, ditherPass, quantize, GENS, genById };

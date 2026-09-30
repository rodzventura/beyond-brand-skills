/// <reference lib="webworker" />
// Calcula os quadros da textura fora da thread principal (Fase 7, desempenho): o campo de fluxo
// da faixa custava ~37ms por quadro e travava a rolagem. A página só desenha o resultado.
import { criarCampo, type Quadro } from "@/texture/campo";
import type { Receita } from "@/texture/receitas";

type Msg =
  | { tipo: "config"; geracao: number; receita: Receita; cols: number; rows: number; ar: number }
  | { tipo: "quadro"; geracao: number; t: number; densidade: number };

let campo: ((t: number, d: number) => Quadro) | null = null;
let geracaoAtual = -1;

self.onmessage = (e: MessageEvent<Msg>) => {
  const m = e.data;
  if (m.tipo === "config") {
    campo = criarCampo(m.receita, m.cols, m.rows, m.ar);
    geracaoAtual = m.geracao;
    return;
  }
  if (!campo || m.geracao !== geracaoAtual) return;
  const q = campo(m.t, m.densidade);
  (self as unknown as DedicatedWorkerGlobalScope).postMessage({ geracao: m.geracao, ...q }, [q.idx.buffer, q.col.buffer]);
};

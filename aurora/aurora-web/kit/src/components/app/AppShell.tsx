import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/layout/Container";

/**
 * Moldura das telas do app com contexto (candidatura, chamadas): modo escuro, topo simples com
 * o wordmark e um link à direita. O login usa a própria moldura (coluna central, ver Acesso).
 */
export function AppShell({ topo, children }: { topo?: ReactNode; children: ReactNode }) {
  return (
    // div e não <section>: dentro de uma section o <header> deixa de ser o cabeçalho da página.
    <div data-theme="dark" className="au-app min-h-screen bg-au-bg-canvas text-au-text-primary">
      <PularConteudo />
      <header className="border-b border-au-border-subtle">
        <Container className="flex h-[var(--header-height)] items-center justify-between gap-6">
          <a href="/" aria-label="aurora. — página inicial" className="shrink-0">
            <Wordmark theme="dark" className="w-[120px] md:w-[150px]" />
          </a>
          <div className="text-right">{topo}</div>
        </Container>
      </header>
      <main id="conteudo">{children}</main>
    </div>
  );
}

export function PularConteudo() {
  return (
    <a
      href="#conteudo"
      className="type-label-sm sr-only z-[60] bg-au-accent-signal px-4 py-3 text-au-text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Pular para o conteúdo
    </a>
  );
}

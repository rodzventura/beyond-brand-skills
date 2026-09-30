import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextoPreenche, TituloPalavras } from "@/components/ui/Palavras";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  index?: string;
  label: string;
  title: string;
  lead?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

const palavras = (titulo: string) => titulo.trim().split(/\s+/).length;

/**
 * Regra da marca: título longo — mais de 2 linhas OU ~8 palavras ou mais — usa o mesmo
 * tamanho em Regular (Heading/H1 Long). As linhas são medidas no estilo Medium; quando a
 * largura muda, mede de novo (no mobile um título curto pode passar de 2 linhas).
 */
function useTituloLongo(titulo: string) {
  const ref = useRef<HTMLHeadingElement>(null);
  const porPalavras = palavras(titulo) >= 8;
  const [porLinhas, setPorLinhas] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || porPalavras) return;
    let largura = -1;
    const medir = () => {
      if (el.clientWidth === largura) return;
      largura = el.clientWidth;
      // Mede sempre na versão Medium, para não oscilar entre os dois estilos.
      el.classList.replace("type-heading-h1-long", "type-heading-h1");
      const linhas = Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
      setPorLinhas(linhas > 2);
      if (linhas > 2) el.classList.replace("type-heading-h1", "type-heading-h1-long");
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [titulo, porPalavras]);

  return { ref, longo: porPalavras || porLinhas };
}

/**
 * Abertura de seção: rótulo mono nas 4 primeiras colunas, título e texto nas 8 seguintes
 * (desktop). No tablet e mobile, empilha.
 */
export function SectionHeading({ index, label, title, lead, as: Tag = "h2", className }: SectionHeadingProps) {
  const { ref, longo } = useTituloLongo(title);
  return (
    <div data-reveal className={cn("au-grid gap-y-6", className)}>
      <Eyebrow data-reveal-item className="col-span-full xl:col-span-4 xl:pt-4">{index ? `${index} · ${label}` : label}</Eyebrow>
      <div className="col-span-full xl:col-span-8">
        <Tag
          ref={ref}
          data-reveal-item
          aria-label={title}
          className={cn("au-words", longo ? "type-heading-h1-long" : "type-heading-h1")}
          data-longo={longo || undefined}
        >
          <TituloPalavras texto={title} />
        </Tag>
        {/* Texto em string se preenche com a rolagem; outro conteúdo só entra com o bloco. */}
        {lead && (
          <div data-reveal-item={typeof lead === "string" ? undefined : ""} className="type-body-lg mt-6 max-w-[56ch] text-au-text-secondary">
            {typeof lead === "string" ? <TextoPreenche texto={lead} /> : lead}
          </div>
        )}
      </div>
    </div>
  );
}

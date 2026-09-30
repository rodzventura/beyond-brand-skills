import { useId, useRef, useState, type DragEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { Icon } from "@/components/ui/Icon";

// Campos das telas do app (30/set, referências Firecrawl e Axiom): rótulo em mono acima,
// caixa de 1px com cantos retos, contorno laranja no foco, mensagem de erro logo abaixo.
// A marca não tem cor de erro: o laranja de sinal faz esse papel, sempre com texto.
// Texto de apoio no secundário: o terciário sobre a superfície do painel fica em 3,97:1 (axe).

type Rotulado = {
  rotulo: string;
  obrigatorio?: boolean;
  erro?: string;
  /** Apoio abaixo da caixa (formato esperado, regra). */
  dica?: ReactNode;
  className?: string;
};

function Rotulo({ htmlFor, id, rotulo, obrigatorio }: { htmlFor?: string; id?: string; rotulo: string; obrigatorio?: boolean }) {
  const Tag = htmlFor ? "label" : "p";
  return (
    <Tag htmlFor={htmlFor} id={id} className="type-label-sm mb-2 block text-au-text-secondary">
      {rotulo}
      {obrigatorio && (
        <>
          <span aria-hidden="true" className="ml-1 text-au-text-accent">
            *
          </span>
          <span className="sr-only"> (obrigatório)</span>
        </>
      )}
    </Tag>
  );
}

function Rodape({ id, erro, dica }: { id: string; erro?: string; dica?: ReactNode }) {
  return (
    <>
      {dica && (
        <p id={`${id}-dica`} className="type-body-sm mt-2 text-au-text-secondary">
          {dica}
        </p>
      )}
      {erro && (
        <p id={`${id}-erro`} className="type-body-sm mt-2 flex items-start gap-2 text-au-text-accent">
          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-au-accent-signal" />
          {erro}
        </p>
      )}
    </>
  );
}

const descrito = (id: string, erro?: string, dica?: ReactNode) =>
  [erro && `${id}-erro`, dica && `${id}-dica`].filter(Boolean).join(" ") || undefined;

type CampoTextoProps = Rotulado &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
    /** Texto fixo antes do valor, dentro da caixa (ex.: "R$"). */
    prefixo?: string;
  };

export function CampoTexto({ rotulo, obrigatorio, erro, dica, className, prefixo, id: idProp, ...input }: CampoTextoProps) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <div className={className}>
      <Rotulo htmlFor={id} rotulo={rotulo} obrigatorio={obrigatorio} />
      <div className="au-caixa" data-erro={erro ? "" : undefined}>
        {prefixo && (
          <span aria-hidden="true" className="type-body-md pl-4 text-au-text-tertiary">
            {prefixo}
          </span>
        )}
        <input
          id={id}
          type="text"
          required={obrigatorio}
          aria-invalid={erro ? true : undefined}
          aria-describedby={descrito(id, erro, dica)}
          className="au-caixa__valor type-body-md"
          {...input}
        />
      </div>
      <Rodape id={id} erro={erro} dica={dica} />
    </div>
  );
}

type CampoAreaProps = Rotulado & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

export function CampoArea({ rotulo, obrigatorio, erro, dica, className, id: idProp, rows = 5, ...area }: CampoAreaProps) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <div className={className}>
      <Rotulo htmlFor={id} rotulo={rotulo} obrigatorio={obrigatorio} />
      <div className="au-caixa au-caixa--area" data-erro={erro ? "" : undefined}>
        <textarea
          id={id}
          rows={rows}
          required={obrigatorio}
          aria-invalid={erro ? true : undefined}
          aria-describedby={descrito(id, erro, dica)}
          className="au-caixa__valor type-body-md"
          {...area}
        />
      </div>
      <Rodape id={id} erro={erro} dica={dica} />
    </div>
  );
}

type OpcoesProps = Rotulado & {
  nome: string;
  opcoes: readonly string[];
  valor: string;
  onChange: (v: string) => void;
};

/** Escolha única em botões (referência Axiom): mais rápido que uma lista para 3–5 opções. */
export function Opcoes({ rotulo, obrigatorio, erro, dica, className, nome, opcoes, valor, onChange }: OpcoesProps) {
  const id = useId();
  return (
    <fieldset className={className} aria-describedby={descrito(id, erro, dica)} aria-invalid={erro ? true : undefined}>
      <legend className="contents">
        <Rotulo rotulo={rotulo} obrigatorio={obrigatorio} />
      </legend>
      {/* Opções em colunas iguais, na altura dos botões (52px): alvo grande para a escolha. */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {opcoes.map((o) => (
          <label key={o} className="au-opcao">
            <input type="radio" name={nome} value={o} checked={valor === o} onChange={() => onChange(o)} className="sr-only" />
            <span className="type-body-md">{o}</span>
          </label>
        ))}
      </div>
      <Rodape id={id} erro={erro} dica={dica} />
    </fieldset>
  );
}

type CampoArquivoProps = Rotulado & {
  arquivos: File[];
  onChange: (arquivos: File[]) => void;
  maximo?: number;
  mbMax?: number;
  extensoes?: readonly string[];
};

const tamanho = (b: number) =>
  b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;

/** Anexos: área para soltar ou escolher; valida quantidade, tamanho e formato antes de aceitar. */
export function CampoArquivo({ rotulo, obrigatorio, erro, className, arquivos, onChange, maximo = 3, mbMax = 10, extensoes = ["pdf", "doc", "ppt", "xls", "png", "jpg"] }: CampoArquivoProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [aviso, setAviso] = useState<string>();
  const [sobre, setSobre] = useState(false);
  const aceitas = extensoes.flatMap((e) => (["doc", "ppt", "xls"].includes(e) ? [e, `${e}x`] : e === "jpg" ? ["jpg", "jpeg"] : [e]));
  const cheio = arquivos.length >= maximo;
  const mensagem = erro ?? aviso;

  const adicionar = (lista: FileList | null) => {
    if (!lista) return;
    const novos: File[] = [];
    const recusados: string[] = [];
    for (const f of Array.from(lista)) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!aceitas.includes(ext)) recusados.push(`${f.name}: formato não aceito`);
      else if (f.size > mbMax * 1024 * 1024) recusados.push(`${f.name}: passa de ${mbMax} MB`);
      else novos.push(f);
    }
    const total = [...arquivos, ...novos];
    if (total.length > maximo) recusados.push(`máximo de ${maximo} arquivos`);
    onChange(total.slice(0, maximo));
    setAviso(recusados.length ? recusados.join(" · ") : undefined);
    if (input.current) input.current.value = "";
  };

  return (
    <div className={className}>
      <Rotulo id={`${id}-rotulo`} rotulo={rotulo} obrigatorio={obrigatorio} />
      {!cheio && (
        <div
          className="au-soltar"
          data-sobre={sobre || undefined}
          data-erro={mensagem ? "" : undefined}
          onDragOver={(e: DragEvent) => {
            e.preventDefault();
            setSobre(true);
          }}
          onDragLeave={() => setSobre(false)}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            setSobre(false);
            adicionar(e.dataTransfer.files);
          }}
        >
          <input
            ref={input}
            id={id}
            type="file"
            multiple
            accept={aceitas.map((e) => `.${e}`).join(",")}
            className="sr-only"
            aria-labelledby={`${id}-rotulo`}
            aria-describedby={`${id}-regras${mensagem ? ` ${id}-erro` : ""}`}
            onChange={(e) => adicionar(e.target.files)}
          />
          <label htmlFor={id} className="au-soltar__alvo">
            <Icon name="attach" size={20} />
            <span className="type-body-md">
              {/* No toque não há arrastar: o texto vira só "Escolha o arquivo". */}
              <span className="hidden md:inline">Arraste aqui ou </span>
              <span className="text-au-text-primary underline underline-offset-4">
                <span className="md:hidden">E</span>
                <span className="hidden md:inline">e</span>scolha o arquivo
              </span>
            </span>
          </label>
        </div>
      )}
      {arquivos.length > 0 && (
        <ul className="mt-3 divide-y divide-au-border-subtle border border-au-border-subtle">
          {arquivos.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-3 px-4 py-3">
              <Icon name="check" size={16} className="shrink-0 text-au-text-accent" />
              <span className="type-body-sm min-w-0 flex-1 truncate">{f.name}</span>
              <span className="type-label-sm shrink-0 text-au-text-secondary">{tamanho(f.size)}</span>
              <button
                type="button"
                onClick={() => onChange(arquivos.filter((_, j) => j !== i))}
                className="shrink-0 text-au-text-tertiary hover:text-au-text-primary"
                aria-label={`Remover ${f.name}`}
              >
                <Icon name="close" size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <p id={`${id}-regras`} className="type-label-sm mt-3 text-au-text-secondary">
        {arquivos.length} de {maximo} · até {mbMax} MB por arquivo · {extensoes.join(" · ")}
      </p>
      {mensagem && (
        <p id={`${id}-erro`} role="alert" className="type-body-sm mt-2 flex items-start gap-2 text-au-text-accent">
          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-au-accent-signal" />
          {mensagem}
        </p>
      )}
    </div>
  );
}

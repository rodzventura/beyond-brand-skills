# Aurora — skills de marca

Aurora é a marca do programa de open innovation e venture building da Beyond Co.
Estas skills traduzem o sistema de marca em regras consultáveis pelo Claude Code.

## Skills

| Skill | O que é |
|---|---|
| [`aurora-brand`](aurora-brand/SKILL.md) | Sistema visual — grid, tipografia, cor, logotipo, cards de status, estrutura de case. Regras verificáveis, operacionais. |
| [`aurora-verbal`](aurora-verbal/SKILL.md) | Identidade verbal — tom, léxico, formatos de copy e o teste de qualidade de texto. |
| [`aurora-open-questions`](aurora-open-questions/SKILL.md) | Pendências de julgamento e divergências com o canônico. Referência, não skill operacional. |

## Comando

| Comando | O que faz |
|---|---|
| [`/aurora-peca`](commands/aurora-peca.md) | Cria ou revisa uma peça visual, **em Opus 5**, carregando `aurora-brand` e `aurora-verbal` e fechando com um checklist de conformidade. |

O modelo é fixado no frontmatter do comando (`model: opus`) porque **skills não aceitam
`model`** — o frontmatter de `SKILL.md` só reconhece `name`, `description`, `version`,
`allowed-tools`, `user-invocable`, `disable-model-invocation` e `argument-hint`. Um
`model:` dentro de uma skill seria ignorado em silêncio. Slash commands e subagents aceitam.

## Hierarquia das fontes

**O documento canônico vence as skills.**
[`canonico/aurora-identidade-visual.pdf`](canonico/aurora-identidade-visual.pdf) (Beyond,
30/ago, 46 páginas) é o brand book completo — estratégia, identidade verbal e visual. As
skills são a destilação operável dele; quando divergirem, o PDF manda.

Há exatamente **uma exceção**, datada e justificada: a hachura diagonal, removida do
sistema depois que o PDF foi fechado. Toda divergência viva está registrada na tabela final
de [`aurora-open-questions`](aurora-open-questions/SKILL.md) — nenhuma fica implícita.

`aurora-verbal/identidade-verbal.md` é o detalhamento verbal completo (392 linhas), do qual
a `aurora-verbal` é a síntese acionável.

## Instalação

As skills precisam estar em `~/.claude/skills/` para o Claude Code encontrá-las.
Este repositório é a fonte da verdade; `~/.claude/skills/` aponta pra cá via symlink:

```bash
git clone git@github.com:rodzventura/beyond-brand-skills.git ~/beyond-brand-skills
ln -s ~/beyond-brand-skills/aurora/aurora-brand          ~/.claude/skills/aurora-brand
ln -s ~/beyond-brand-skills/aurora/aurora-verbal         ~/.claude/skills/aurora-verbal
ln -s ~/beyond-brand-skills/aurora/aurora-open-questions ~/.claude/skills/aurora-open-questions

mkdir -p ~/.claude/commands
ln -s ~/beyond-brand-skills/aurora/commands/aurora-peca.md ~/.claude/commands/aurora-peca.md
```

O symlink tem que apontar para a pasta da skill em si: `~/.claude/skills/` só reconhece
skills como filhas diretas, então a pasta `aurora/` do repositório não pode ser linkada
inteira — é um link por skill.

Editar os arquivos aqui já reflete nas skills ativas — não é preciso copiar nada.

## Tokens

`aurora-brand/aurora-tokens.json` guarda os valores brutos (hex, medidas, limites).
Campos com valor `null` **ainda não foram definidos** — não preencher por inferência.
Campos com `_origem` ou `_nota` marcam regras que não vêm do canônico, ou que o
contradizem de propósito.

Hoje estão pendentes:

- `tipografia.escala` — escala tipográfica
- `cor.fundo.gatilho_de_escolha` — o par claro/escuro já está fixado; falta o critério
  de quando usar cada um
- `textura.oficial` — o gerador modular ASCII ainda está em desenvolvimento
- `fotografia.tratamento` / `fotografia.criterio_de_uso`

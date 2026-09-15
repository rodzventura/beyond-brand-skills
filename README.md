# beyond-brand-skills

Skills de marca da Beyond Co. para uso com Claude Code / Claude Desktop.

## Skills

| Skill | O que é |
|---|---|
| [`aurora-brand`](aurora-brand/SKILL.md) | Sistema de marca do Aurora — grid, tipografia, cor, logotipo, cards de status, estrutura de case. Regras verificáveis, operacionais. |
| [`aurora-open-questions`](aurora-open-questions/SKILL.md) | Pendências de julgamento do Aurora ainda não convertidas em regra. Referência, não skill operacional. |

Aurora é a marca do programa de open innovation e venture building da Beyond Co.

## Instalação

As skills precisam estar em `~/.claude/skills/` para o Claude Code encontrá-las.
Este repositório é a fonte da verdade; `~/.claude/skills/` aponta pra cá via symlink:

```bash
git clone git@github.com:rodzventura/beyond-brand-skills.git ~/beyond-brand-skills
ln -s ~/beyond-brand-skills/aurora-brand          ~/.claude/skills/aurora-brand
ln -s ~/beyond-brand-skills/aurora-open-questions ~/.claude/skills/aurora-open-questions
```

Editar os arquivos aqui já reflete nas skills ativas — não é preciso copiar nada.

## Pendências conhecidas

`aurora-brand/SKILL.md` referencia dois arquivos que ainda não existem neste repositório:

- `aurora-tokens.json` — valores brutos da paleta e das medidas
- `aurora-open-questions.md` — hoje é a skill `aurora-open-questions/SKILL.md`; as
  referências no texto ainda apontam para o nome antigo de arquivo

---
name: "aurora-open-questions"
description: "Pendências de julgamento da marca Aurora ainda não convertidas em regra. Não é skill operacional — referência para quem for decidir ou revisar."
---

# Aurora — Pendências

Itens que hoje dependem de julgamento do designer, não de regra escrita. Revisar
periodicamente: alguns podem virar regra dura assim que houver volume suficiente
de casos reais para enxergar o padrão.

| Item | Estado |
|---|---|
| Fotografia por tema (quente vs. técnico/frio) | Classificação solta — os temas ainda não mapeiam em nenhum campo estruturado do sistema (ex. tipo de card). Revisitar quando o time de comunicação tiver volume de produção real. |
| Escolha entre variante clara/escura de fundo | O par está fixado nos tokens (escuro `#101011`, claro `#EDEDED`), mas o gatilho de quando usar cada um segue indefinido. |
| Densidade de linha além do limite de 3 cards por coluna | Depende do espaço disponível — sem número fixo. |
| Sequência de peças na grade de feed | Feito por inspeção visual, sem critério escrito. |
| Tratamento de imagem (cor, contraste, grão) | Ainda placeholder — não decidido. |
| Escala tipográfica de peça | A escala de web/interface está fechada (26–28/set) e a de **slide** também (01/out, ver `aurora-brand` → Apresentação). **Social e impresso** ainda não têm escala própria. Valores já usados no relatório do case Atria (3:4), como referência: nome do produto na capa 144px, número do capítulo 88px, wordmark da contracapa 100px de altura. |
| Contador de dias no rodapé do case | O canônico (p. 39) mostra "90 DIAS" fixo; a skill pede "contador de dias". No case Atria ficou a duração fixa mais o contador de página. Decidir se o rodapé acompanha a fase (ex.: "DIAS 22–63"). |
| Entrelinha do Label/SM | O Figma usa 1.5; `aurora-tokens.json` usa 1.2. O código segue o JSON; a LP abre exceção de 1.5 no nome por extenso do rodapé (29/set). Decidir um valor e alinhar os dois. |
| Hover do botão secundário | Dissolve para o cinza oficial do modo (`#313133` no escuro, `#97979D` no claro), direto na primitiva. Falta um token por função para esse cinza — o componente do Figma usa `border/default`. |
| Britti Sans embutida em PDF | Decisão do time (01/out): deck e relatório em PDF saem em Britti, com o subconjunto que o PDF embute ao exportar. Falta a YWFT confirmar que a licença permite embutir em PDF que circula. Se não permitir, o PDF também passa para Geist. |
| HTML de apresentação no Claude Design | O formato (arquivo único, `<section>` por slide, animação e textura em JavaScript) não foi testado na importação do Claude Design. Confirmar se scripts e o Web Worker sobrevivem; se não, definir uma variante sem script. |
| Biblioteca de ícones | Material Symbols Sharp adotada em 29/set por não haver acesso a biblioteca premium. Se vier uma premium com cantos retos e traço fino, reavaliar. |
| Grafia do nome da marca em texto corrido | O canônico grafa "AURORA" em caixa alta no corpo do texto; o wordmark é "aurora." minúsculo. São coisas diferentes — logotipo vs. menção em copy — e a regra para copy não existe. |

## Divergências com o documento canônico

O `../canonico/aurora-identidade-visual.pdf` é a fonte da verdade do sistema. Onde estas
skills divergem dele, a divergência fica registrada aqui — com data e motivo.

| Ponto | Divergência | Quem prevalece |
|---|---|---|
| **Hachura diagonal** | O PDF (30/ago) usa hachura no case Atria (p. 39), nas peças de comunicação (p. 42) e no hero do site (p. 43). A `aurora-brand` diz que foi removida do sistema. | **A skill.** A remoção foi decidida depois do fechamento do PDF, e a textura ASCII do Studio foi oficializada como substituta em 30/set. Atualizar as p. 39, 42 e 43 do canônico e apagar esta linha. |
| **Teto de 10% de laranja** | O PDF não fixa percentual — diz apenas que o laranja não entra como território visual dominante (p. 32). O número é regra local. | **Ambos.** A formulação do PDF explica o porquê; os 10% dão o critério verificável. |
| **Bold da Britti Sans** | O PDF lista Bold como peso disponível da família (p. 30). O sistema não o usa. | **A skill**, que é mais restritiva de propósito. |
| **Medium no lugar de Semibold** | O PDF lista Light, Regular, Semibold e Bold (p. 30). O sistema troca Semibold por Medium em títulos e formatos grandes (24/set) — Medium não aparece no PDF. | **A skill.** Decisão do time a partir das peças de social já em produção. Atualizar a p. 30 do canônico na próxima revisão. |
| **Formato 3:4 (1080×1440)** | O PDF traz 1:1, 4:5 e 16:9 (p. 36). O sistema inclui 3:4 para carrossel de feed (24/set), além do 9:16 de story (17/set). | **A skill.** Atualizar a p. 36 do canônico na próxima revisão. |
| **KPI em Britti Sans** | O PDF põe KPIs na camada mono (p. 29). O sistema usa Britti Sans Medium para KPI em destaque (estilos KPI/*), mantendo a mono para número em tabela (28/set). | **A skill.** Atualizar a p. 29 do canônico na próxima revisão. |
| **Tons intermediários de cor** | O PDF traz 5 neutros e o laranja (p. 32). O sistema estende em escalas (neutral 0–950, orange 50–950) com as cores oficiais como âncoras, para contraste e estados de interface (26/set). | **Ambos.** As âncoras são as do PDF; os intermediários são regra local. |
| **Laranja como texto no fundo claro** | Concessão do time (28/set): o laranja oficial é usado como texto no claro, com 2.4:1 — abaixo do WCAG AA. Não é divergência com o PDF, e sim com a meta de acessibilidade do próprio sistema. | **A concessão.** Restrita a rótulos, tags e links curtos. Mantida pelo time em 29/set para a LP (alternativa avaliada e recusada: laranja 700 `#A74F2B`, 4.7:1). Reavaliar na próxima revisão do sistema. |
| **Branco sobre laranja 600 em célula** | Concessão do time (01/out): células com texto usam o laranja 600 `#D05E2E` — 3.95:1, AA para texto grande. Rótulos pequenos dentro da célula seguem abaixo do AA. | **A concessão.** Reavaliar junto com as demais concessões de laranja. |
| **Branco sobre laranja** | Concessão do time (28/set): texto sobre laranja em branco, 2.9:1 — abaixo do AA. Compensação: rótulo sempre em peso Medium (Button/MD ou Label mono). Preto daria 6.6:1. | **A concessão.** Mantida pelo time em 29/set para a LP. Reavaliar junto com o laranja como texto na próxima revisão do sistema. |
| **Laranja em tela cheia no loading** | O loading da web (cortina laranja que se desfaz em quadrados, < 1s, só na página inicial e depois do login) ocupa a tela inteira com laranja — acima do teto de 10%. | **A exceção.** Aprovada pelo time em 01/10/2026: é passageira e é o próprio sinal se desfazendo. Não vale como precedente para laranja em área grande parada. |

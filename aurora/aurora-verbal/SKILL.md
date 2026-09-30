---
name: "aurora-verbal"
description: "Use esta skill sempre que for escrever, revisar ou avaliar qualquer texto da marca Aurora — headline, body copy, CTA, chamada aberta, abordagem de scouting, case ou comunicação interna."
---

# Aurora — Identidade Verbal

Aurora é a marca do programa de open innovation e venture building da Beyond Co.
Esta skill contém as regras operáveis de escrita.

- **Detalhamento completo:** `identidade-verbal.md`, nesta mesma pasta — exemplos
  fraco/mais-Aurora, listas completas e o prompt de geração de copy.
- **Fonte canônica:** `../canonico/aurora-identidade-visual.pdf`, seção 03 (p. 13–14).
- **Sistema visual:** não é escopo desta skill — ver `../aurora-brand/SKILL.md`.

## Essência

A Aurora fala como uma organização que sabe colocar inovação para funcionar.

Não promete futuro. Constrói evidência.
Não celebra ideias abstratas. Testa hipóteses na realidade.

## Tom

Seis pares, cada um com seu limite:

| Deve soar | Sem ser |
|---|---|
| precisa | sentenciosa |
| curiosa | ingênua |
| técnica | hermética |
| convicta | fingindo certeza |
| experimental | parecendo improvisada |
| institucional | parecendo burocrática |

## Lógica de mensagem

Uma boa mensagem tende a percorrer:

**hipótese → ação → evidência → decisão**

ou: oportunidade → capacidade mobilizada → construção → realidade → aprendizado.

## Posição dos atores

- **A Aurora aparece como estrutura.** O founder e a oportunidade são protagonistas.
- Não infantilizar founder: nada de "pegar pela mão", "ensinar o caminho", "preparar
  empreendedores" como centro, nem tom professoral.
- Preferir co-construção, parceria, capacidade mobilizada, responsabilidade compartilhada,
  execução conjunta.
- Ao falar de si, evitar "nós somos", "nós acreditamos", "nós revolucionamos". Mostrar
  processo, método, capacidade, construção, evidência e decisão.

## Incerteza, falha e encerramento

- Incerteza não é falha — é matéria de trabalho. Usar hipótese, sinal, teste, evidência,
  aprendizado, estado, próximo passo.
- Evitar certeza exagerada, promessa de sucesso, garantia de resultado.
- Uma hipótese encerrada não é derrota: gera aprendizado, documentação, evidência
  negativa, reaproveitamento, decisão consciente.
- Não romantizar fracasso. O valor está em descobrir cedo o que não deve continuar.

## Léxico

**Usar com frequência:** oportunidade, hipótese, construir, testar, validar, evidência,
decisão, processo, método, estrutura, capacidade, experimento, sinal, estado, aprendizado,
descoberta, configuração, integração, produto, mercado, ciclo, próximo passo, escalar,
pivotar, avançar, encerrar, mobilizar, construir junto.

**Usar com cautela** — não devem ser o centro do discurso: seleção, filtro, aprovação,
reprovação, aceleração, chancela, corte, peneira, incubação, investimento, B2G, escala.

**Evitar como linguagem de marca:** construir o futuro, transformar ideias em realidade,
inovação sem limites, jornada empreendedora, potencial infinito, acelerar sonhos, próximo
unicórnio, ecossistema vibrante, disruptivo, revolucionário, ideias brilhantes, grandes
mentes, transformar o mundo.

## Formatos

**Headline** — faz uma destas cinco coisas: torna uma hipótese explícita, mostra uma ação,
expõe uma tensão, mostra processo ou produz consequência. Referências de comportamento, não
slogans obrigatórios:

> Sua hipótese funciona fora do deck?
> Uma boa ideia ainda não é evidência.
> Da hipótese ao primeiro sinal.

**Body copy** — explica, materializa, nomeia capacidade, mostra método, evita hype.
Estrutura: situação → ação → capacidade → resultado esperado.

**CTA** — concreto e verificável: Submeter uma oportunidade, Conhecer o processo, Ver os
critérios, Explorar as etapas, Acompanhar a chamada, Conhecer a tese, Ver como funciona.
Nunca: Descubra o futuro, Transforme sua jornada, Revolucione agora, Acelere seu sonho.

**Chamada aberta** — comunica oportunidade, critério, construção conjunta, capacidade
disponível, processo, expectativa e seleção. Não vende sucesso garantido, exclusividade
vazia, glamour ou aceleração genérica.

**Scouting** — específico, informado, direto, interessado. Nunca spam, recrutamento em
massa, elogio genérico ou "vimos potencial incrível" sem substância.

**Comunicação interna** — oportunidades podem vir de dentro, inovação é prática,
colaboração é execução, aprendizado é compartilhado. Sem "mande sua ideia genial", sem
concurso de criatividade, sem gamificação infantil.

**Case** — mostra hipótese inicial, o que foi construído, o que foi testado, o que mudou,
evidência produzida e decisão tomada. Nunca apenas o resultado final.

## Interface

Texto de tela (site, login, formulário, lista). Veio das telas do app construídas em 30/set;
exemplos completos em `../aurora-web/SKILL.md`.

- **Título de tela** — frase curta com ponto final, dizendo o que a pessoa faz ali:
  "Encontre sua oportunidade.", "Acesse o portal de inovação.", "Crie sua conta na Aurora.".
- **Botão** — verbo + o que acontece, sem ambiguidade: "Enviar candidatura", "Entrar e
  continuar", "Acessar plataforma", "Ver todas as chamadas". Nunca "OK", "Enviar" sozinho,
  "Clique aqui".
- **Mensagem de erro** — uma frase: o que falta e como resolver, sem "Erro:" e sem culpar:
  "Informe o nome da startup.", "Confira o e-mail: falta algo no endereço.", "As senhas não
  são iguais.", "A senha precisa de pelo menos 10 caracteres."
- **Estado vazio** — nomeia a situação e oferece o próximo passo: "Nenhuma chamada
  encontrada." + "Ver todas as chamadas".
- **Confirmação** — o estado numa frase curta ("Candidatura enviada.") e, logo abaixo, o que
  acontece depois, como processo: triagem → avaliação → retorno pela plataforma. Não
  promete resultado.
- **Contexto de retorno** — quando o fluxo leva a pessoa para outro lugar, dizer para onde
  ela volta: "Depois de entrar, você volta para a candidatura da Chamada Mercado 2026."
- **Nada técnico na tela** — rota (`/login?next=…`), código de erro ou nome de campo do banco
  não aparecem para quem usa. Usar rótulos para pessoas ("← Voltar para a chamada").
- **Recuperação de senha** — não revelar se o e-mail tem conta: "Se houver uma conta com …,
  o link chega em alguns minutos."

## Teste de qualidade

Antes de aprovar qualquer texto:

1. Parece Aurora ou poderia ser qualquer aceleradora?
2. Há ação concreta?
3. Há método?
4. Há evidência ou caminho para evidência?
5. O founder continua protagonista?
6. A Aurora aparece como estrutura?
7. Existe excesso de certeza?
8. A colaboração parece prática?
9. Há hype?
10. **A Beyond poderia falar exatamente a mesma frase?**

Se a resposta à décima for sim, revisar. Beyond impacta; Aurora revela (p. 26).

## Fora do escopo desta skill

Grid, cor, tipografia, logotipo, cards e qualquer decisão de layout — ver
`../aurora-brand/SKILL.md`.

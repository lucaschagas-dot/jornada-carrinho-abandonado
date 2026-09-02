# Jornada Carrinho Abandonado

Protótipo navegável em código, reproduzindo a jornada de compra do Plano
Odontológico Unimed desenhada no arquivo Figma **"Jornada Carrinho
Abandonado"**. Cada frame numerado no Figma vira uma rota navegável aqui —
dá para clicar o fluxo real (Continuar / Voltar) ou pular direto para
qualquer tela pelo menu flutuante "Telas" no canto inferior esquerdo.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [react-router-dom](https://reactrouter.com) (`HashRouter`, para funcionar em qualquer host estático sem configurar rewrites — inclusive GitHub Pages)
- CSS puro com [CSS Modules](https://vitejs.dev/guide/features.html#css-modules) — sem Tailwind, sem UI kit
- Sem backend: os formulários existem visualmente, mas não validam nem enviam dados

## Rodando localmente

```bash
npm install
npm run dev
```

```bash
npm run build    # gera dist/ (build de produção)
npm run preview  # serve o build de produção localmente
```

## Estrutura

```
src/
  tokens.css          # design tokens do DSU (Design System Unimed) — cores, espaçamento, tipografia
  routes.ts            # telas da jornada + etapa e tela anterior de cada uma — fonte única de verdade
  jornadas.ts          # etapas de cada jornada (Odonto 5, Residencial 5, Vida 10)
  App.tsx              # <HashRouter> + rotas, cada uma envolvida em <PageShell>
  components/
    Header, Footer, WhatsAppWidget, PageShell  — layout comum a todas as telas
    TopoEtapa           — faixa de topo: botão "Voltar" + indicador de etapas
    StepBreadcrumb      — trilha de bolinhas numeradas da jornada
    FormasPagamento     — seleção de forma de pagamento, comum às três jornadas
    CarrosselBeneficios — benefícios do plano girando no hero da Odonto 1
    PrototypeNav        — menu flutuante "Telas" (não existe no Figma; é só ferramenta de revisão)
    ComparePlanosModal  — comparativo "Compare nossos planos", aberto pela Odonto 1
    RedeCredenciadaModal — busca de dentistas, aberta pela Odonto 1
    SeletorPessoas      — "Para quantas pessoas?" (proposta da pesquisa)
    icons.tsx           — ícones SVG usados no projeto
  demoUser.ts          # persona fictícia usada nas telas pré-preenchidas
  jornada.tsx          # estado compartilhado (nº de pessoas, plano escolhido, carrinho)
  redeCredenciada.ts   # dentistas fictícios + especialidades da busca de rede
  pages/
    Start.tsx, Odonto1.tsx, Odonto2.tsx, Odonto2_1.tsx, Odonto2_3.tsx,
    Odonto3.tsx, Odonto3_1.tsx, Odonto3_2.tsx, Odonto3_3.tsx, Odonto4.tsx,
    OdontoLogin.tsx, Odonto5.tsx
  assets/images/        # imagens extraídas do Figma
```

Cada arquivo em `src/pages/` corresponde a um frame de nível principal da
página "Page 1" do arquivo Figma, com o mesmo nome/numeração usado lá (ver
`figmaFrame` em `routes.ts`). A exceção é `Odonto5.tsx` (Pagamento), que foi
levantada direto da loja em produção e por isso não tem `figmaFrame`.

## Propostas da pesquisa de carrinho abandonado

Além de replicar a loja, o protótipo materializa as recomendações da pesquisa
apresentada em **07/08/2026** ("Resultado Pesquisa — Carrinho Abandonado"),
para que possam ser defendidas com algo navegável em vez de slides. O que é
proposta e o que é réplica da loja:

| Proposta | Onde está | Origem na pesquisa |
| --- | --- | --- |
| Perguntar o **nº de pessoas no início**, com o total do plano já visível na cotação (o destaque do card segue sendo o valor por pessoa, que é o que se compara entre planos) | `SeletorPessoas` em Odonto 2.3 e Odonto 3; dependentes previstos em Odonto 4; total em Odonto 5 | "se eu já começasse perguntando quantas pessoas... ele nem viu os 33, ficaria menos frustrado" |
| **Carrinho de cotações visível sem login** | `Header` (botão "Minhas cotações" + "Retomar cotação") | "essa coisa do carrinho é universal... e a gente não tem isso" |
| **Selo de corretora parceira** mantendo a marca principal | `Header` | "manter a marca da Seguros... com um selo menor, em vez de substituir o logo" |
| **Login como etapa com URL própria**, sem "x" e sem senha | `OdontoLogin` (`/odonto-login`) | "hoje o login é um popup... não consegui medir quem trava no login" |
| **Indicador de etapas e botão "Voltar"** em toda a jornada | `TopoEtapa` + `StepBreadcrumb`, montados pelo `PageShell` | quem não sabe quanto falta desiste no meio, e sem saída visível a única alternativa é fechar a aba |
| **Cartão de crédito primeiro e já aberto** no pagamento | `FormasPagamento`, usado pelas três jornadas | forma de pagamento que o negócio quer priorizar |

O estado que liga essas telas fica em `src/jornada.tsx`.

Fora do escopo deste protótipo (a pesquisa também tratou de vida, residencial
e de temas de back-office): assistências marcadas por padrão, coberturas
default, DPS antes do pagamento, lista de profissões, resgate por WhatsApp e
internalização de tecnologia.

## Jornadas Residencial e Vida

Levantadas da loja em produção em 24/08/2026, com a mesma estrutura de etapas.

**Residencial (5 etapas)** — Cotação, Coberturas, Identificação, Pagamento, Confirmação.
Os 3 combos têm a composição e os valores reais (`src/residencial.ts`).

**Vida (10 etapas)** — cotacao, produto, assistencia, composicao, cadastro,
endereco, beneficiario, dps, pagamento, confirmacao. O protótipo implementa as
quatro em que a pesquisa mexe (Cotação, Assistências, DPS e Pagamento); as
demais existem na loja mas não foram construídas aqui.

### Ajustes da pesquisa nessas jornadas

| Ajuste | Onde | Origem na pesquisa |
| --- | --- | --- |
| Coberturas essenciais **marcadas por padrão**, com selo "Recomendado" | `ResidencialCoberturas` (personalização) | "Por que que a gente já não deixa tudo marcado? [...] se a pessoa quiser, ela desmarca" |
| Alerta contextual de tubulação para quem mora em **apartamento** | `ResidencialCoberturas` | "você que mora em apartamento [...] mas se quiser tirar, tá tudo bem" |
| **Combos em evidência**: "personalizar" virou link discreto **depois** do Continuar | `ResidencialCoberturas` | "o botão de personalizar tá acima do de seguir [...] deixaria menos em evidência" |
| Assistências de uso amplo **marcadas por padrão** | `VidaAssistencias` | "aquilo que tá marcado, elas vão ter menos vontade de deselecionar" |
| Assistências de perfil (pet/auto) só aparecem se o **perfil bater**, coletado na cotação | `VidaCotacao` + `VidaAssistencias` | "ele me sugeria assistência para cachorro [...] mas em nenhum momento disse que eu tinha cachorro" |
| **Saída para profissão não listada** (sugestão de similar ou "Outros") | `VidaCotacao` | "a plataforma não fala nada, fica em silêncio [...] não tem seguro de vida para essa pessoa" |
| **"Responder depois"** na DPS, com a consequência explícita | `VidaDps` | "já paga aqui e depois você termina de preencher [...] se não preencher, não vai receber a apólice" |

Um achado da navegação que reforça a pesquisa: **"Rompimento de tubulação" só
existe no Combo 3**, o mais caro (R$ 92,00/mês). Nos combos de entrada ela não
vem — exatamente o que o Bruno descreveu, porque incluí-la derrubaria a
comunicação de "a partir de R$ 15".

## Hero da Odonto 1

O topo da página foi refeito a partir de uma referência de layout trazida pelo
time: título grande, preço e CTA à esquerda, e um **card flutuante à direita**
sobre um fundo com faixas diagonais suaves.

No lugar da foto (e do mockup de cartão de crédito que a referência traz), o
card é um **carrossel dos quatro principais benefícios** — Atendimento
Nacional, Rede credenciada, Teleorientação Médica 24h e Desconto em farmácias.
Eles estavam numa grade no meio da página, onde só chegava quem rolava; essa
grade **deixou de existir**. No hero eles ficam ao lado do preço, que é o par
de informações que pesa na decisão.

Detalhes:

- O avanço é automático a cada 6s, mas **pausa no hover e no foco** e não
  acontece para quem pediu menos movimento no sistema
  (`prefers-reduced-motion`). Setas e bolinhas continuam funcionando sempre.
- O texto da **Teleorientação foi condensado**: o da loja tem ~400 caracteres
  (um parágrafo inteiro) e deixaria os outros três cards com um vazio embaixo.
  O texto integral está preservado em `TELEORIENTACAO_TEXTO_LOJA`, em
  `Odonto1.tsx`, caso o time queira o card longo de volta.
- A foto `hero-mae-filha-sorrindo.png` continua em `src/assets/images`, sem uso,
  se for preciso reverter.
- O **balão do WhatsApp desceu para o rodapé da janela**. Na loja ele fica
  colado no topo da lateral direita; ali ele cobria a trilha de etapas e depois
  o card do carrossel — qualquer conteúdo nos 250 px da direita ficava atrás
  dele. No rodapé nunca disputa espaço, e é onde a versão mobile já o punha.

## Faixa de topo: "Voltar" + indicador de etapas

Toda tela de jornada abre com a mesma faixa: **"Voltar"** à esquerda e a
**trilha de bolinhas numeradas** ao centro (`TopoEtapa`). Ela é montada pelo
`PageShell` a partir de `jornada`, `etapa` e `anterior` em `routes.ts` — não é
repetida em cada página, então nenhuma tela nova nasce sem saída e sem
progresso.

Detalhes que valem saber:

- **Etapa vencida** aparece com check, a **atual** com o número num anel ciano,
  as **futuras** em cinza.
- A trilha mostra a jornada **inteira**, inclusive etapas que existem na loja
  mas não foram construídas aqui (Vida tem 10 etapas e 4 telas). Encurtar a
  trilha esconderia justamente o que a pesquisa apontou.
- Em jornadas com mais de 6 etapas, só a etapa atual mantém o rótulo visível —
  10 nomes lado a lado ficam ilegíveis. Abaixo de 640px nenhum rótulo aparece:
  quem informa a posição é a linha "· etapa 4 de 5" e o título da tela. Os
  nomes continuam no HTML para leitor de tela.
- O `Voltar` usa paths fixos (`anterior` em `routes.ts`), não o histórico do
  navegador — assim funciona igual para quem pulou direto pelo menu "Telas".
  Na Vida, o `Voltar` da DPS cai em Assistências, porque as etapas 4 a 7 não
  existem no protótipo.

## Pagamento

As três jornadas usam o mesmo bloco (`FormasPagamento`), inspirado numa
referência de checkout trazida pelo time:

- **Cartão de crédito é a primeira opção e já vem aberta**, com os campos à
  vista — é a forma que o negócio quer priorizar, e deixá-la selecionada poupa
  um clique e mostra de cara o que vai ser pedido.
- O botão traz o **valor final dentro dele** ("Pagar R$ 33,50/mês").
- **O aceite dos termos não vem marcado.** A referência de design traz o
  checkbox pré-marcado; consentimento pré-marcado não é consentimento, então
  aqui o "Pagar" só habilita depois do aceite explícito.
- O botão usa `--cyan-700` e não o ciano da marca: branco sobre `#009EDB` dá
  2,4:1, e a ação principal da etapa de pagamento não pode ser o texto menos
  legível da tela. Assim fica 6,6:1 (e 5,3:1 desabilitado).
- As bandeiras são **chips de texto**, não a arte oficial — são marcas de
  terceiros.

## Onde a jornada termina

O fluxo clicável vai de `/` até `/odonto-5` (Pagamento 4/5) e **para no momento
da confirmação do pagamento**: os campos de cartão existem visualmente, mas são
inertes — não há back-end, nada é validado nem enviado, o `autoComplete="off"`
evita que o navegador despeje um cartão real num protótipo público, e o botão
"Pagar" não tem ação.

Na Odonto 1, o botão "Compare os planos" de cada card abre o comparativo
"Compare nossos planos" — um modal na própria página, sem mudar de rota (é
assim na loja também). A tabela tem os 23 procedimentos com a cobertura de
cada plano, cabeçalho fixo ao rolar, rótulos longos cortados em 25 caracteres
com o texto completo num tooltip, e "Contratar" leva para a cotação.

Ainda na Odonto 1, "Busque a rede credenciada" abre a busca de dentistas —
outro modal na própria página, com quatro telas encadeadas: busca simples,
busca avançada, resultados (lista + pins no mapa) e refinar busca, mais o
painel de detalhe do dentista. Duas diferenças conscientes em relação à loja:

- **O mapa é ilustrativo.** A loja usa Google Maps, que exige chave de API e
  chamada externa — nada disso cabe num protótipo estático e público. Aqui o
  mapa é um painel estilizado com os pins nas posições certas, rotulado como
  "Mapa ilustrativo".
- **Os dentistas são fictícios** (`src/redeCredenciada.ts`). A busca real
  devolve profissionais de verdade, com nome, CRO e telefone — dados de
  terceiros que não podem ir para um repositório público. As especialidades,
  os campos e as regras (só habilita "Buscar" com localização **e**
  especialidade) são as da loja.

As telas `3.1`, `3.2` e `3.3` são estados do modal "Características Gerais",
não etapas do fluxo. No caminho clicável, "Escolher plano" leva de
`/odonto-3` para `/odonto-login` (e de lá para `/odonto-4`), e é o link
"Ver mais sobre coberturas e
carências" que abre o modal. As três continuam acessíveis pelo menu "Telas"
como referência dos frames do Figma.

## Como adicionar uma tela nova

Quando uma tela nova for desenhada no Figma:

1. Adicione uma entrada em `src/routes.ts` (`ROUTES`) na posição correta da
   jornada — path, label, nome do frame no Figma e nodeId, mais `jornada`,
   `etapa` e `anterior` (é o que faz a tela nascer já com indicador de etapas
   e botão "Voltar").
2. Crie `src/pages/NomeDaTela.tsx` (siga o padrão dos arquivos existentes:
   só o conteúdo único da tela, sem Header/Footer — isso já vem do
   `PageShell` em `App.tsx`).
3. Registre o import em `App.tsx` no mapa `PAGES`. Se esquecer este passo,
   `npm run build` falha apontando o path que ficou sem componente — o mapa
   é tipado a partir de `ROUTES`, então a divergência não passa despercebida.

Os botões "Continuar"/"Voltar" de cada tela usam paths fixos (não índices
calculados), então ao inserir uma tela no meio do fluxo também é preciso
ajustar o `<Link to="...">` da tela anterior e da nova tela para apontar
uma para a outra.

## Deploy (GitHub Pages)

Já vem com um workflow em `.github/workflows/deploy.yml` que builda e
publica em GitHub Pages a cada push em `main`. Para ativar, depois de subir
o repositório:

1. GitHub → **Settings → Pages → Source** → escolha **GitHub Actions**.
2. Dê push em `main` (ou rode o workflow manualmente em **Actions**).
3. O site fica em `https://<seu-usuario>.github.io/<nome-do-repo>/`.

Não precisa ajustar `base` no `vite.config.ts` — já está como `'./'`
(caminhos relativos), e o `HashRouter` evita o problema clássico de rotas
quebrando em GitHub Pages (não depende de rewrite no servidor).

## Decisões de fidelidade ao Figma

- **Cores/espaçamento/tipografia**: extraídos do Design System Unimed
  (`dsu-tokens`) e replicados como variáveis CSS em `src/tokens.css`. Não há
  dependência dos pacotes internos `@unimed/dsu-*` (são privados e vêm como
  `.tgz` local) — só os valores de tokens foram copiados, para o projeto
  ficar autocontido e publicável.
- **Fonte "Unimed Sans"**: `tokens.css` já referencia `'Unimed Sans'` com
  fallback para fontes de sistema. Os arquivos da fonte não foram copiados
  para cá (estão em `dsu-wc/src/fonts` no projeto `dsu-demo`, mas são um
  asset licenciado). Se quiser tipografia pixel-perfect, copie os arquivos
  `.woff2`/`.ttf` para `src/assets/fonts` e adicione um `@font-face` no topo
  de `tokens.css`.
- **Ícones**: o Figma usa a fonte Font Awesome Pro (proprietária) para
  ícones. Em vez disso, os ícones foram redesenhados como SVG simples
  (`src/components/icons.tsx` + alguns inline por tela) — visualmente
  equivalentes, sem depender de fonte licenciada.
- **Dados pré-preenchidos**: a tela de Identificação (Odonto 4) chega em
  estado logado, com os campos já preenchidos. Esses valores ficam em
  `src/demoUser.ts` e são **fictícios de propósito** — o repositório é
  público e o protótipo fica no ar, então CPF, celular e e-mail reais não
  entram no código (uma vez commitados, permanecem no histórico do git mesmo
  se removidos depois). Para demonstrar com outra persona, edite só esse
  arquivo.
- **Imagens**: baixadas do servidor local do Figma Desktop (disponível
  enquanto o app está aberto) e commitadas em `src/assets/images` — o
  protótipo funciona offline e após publicado, sem depender do Figma.

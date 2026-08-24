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
  routes.ts            # ordem das telas da jornada — fonte única de verdade para navegação
  App.tsx              # <HashRouter> + rotas, cada uma envolvida em <PageShell>
  components/
    Header, Footer, WhatsAppWidget, PageShell, StepBreadcrumb  — layout comum a todas as telas
    PrototypeNav        — menu flutuante "Telas" (não existe no Figma; é só ferramenta de revisão)
    ComparePlanosModal  — comparativo "Compare nossos planos", aberto pela Odonto 1
    icons.tsx           — ícones SVG usados no projeto
  demoUser.ts          # persona fictícia usada nas telas pré-preenchidas
  pages/
    Start.tsx, Odonto1.tsx, Odonto2.tsx, Odonto2_1.tsx, Odonto2_3.tsx,
    Odonto3.tsx, Odonto3_1.tsx, Odonto3_2.tsx, Odonto3_3.tsx, Odonto4.tsx,
    Odonto5.tsx
  assets/images/        # imagens extraídas do Figma
```

Cada arquivo em `src/pages/` corresponde a um frame de nível principal da
página "Page 1" do arquivo Figma, com o mesmo nome/numeração usado lá (ver
`figmaFrame` em `routes.ts`). A exceção é `Odonto5.tsx` (Pagamento), que foi
levantada direto da loja em produção e por isso não tem `figmaFrame`.

## Onde a jornada termina

O fluxo clicável vai de `/` até `/odonto-5` (Pagamento 4/5) e **para no momento
em que os dados de pagamento são solicitados**: a tela mostra a escolha entre
Cartão de Crédito e Pix, mas não há formulário de cartão nem QR de Pix, e o
botão "Pagar" não tem ação.

Na Odonto 1, o botão "Compare os planos" de cada card abre o comparativo
"Compare nossos planos" — um modal na própria página, sem mudar de rota (é
assim na loja também). A tabela tem os 23 procedimentos com a cobertura de
cada plano, cabeçalho fixo ao rolar, rótulos longos cortados em 25 caracteres
com o texto completo num tooltip, e "Contratar" leva para a cotação.

As telas `3.1`, `3.2` e `3.3` são estados do modal "Características Gerais",
não etapas do fluxo. No caminho clicável, "Escolher plano" vai direto de
`/odonto-3` para `/odonto-4`, e é o link "Ver mais sobre coberturas e
carências" que abre o modal. As três continuam acessíveis pelo menu "Telas"
como referência dos frames do Figma.

## Como adicionar uma tela nova

Quando uma tela nova for desenhada no Figma:

1. Adicione uma entrada em `src/routes.ts` (`ROUTES`) na posição correta da
   jornada — path, label, nome do frame no Figma e nodeId.
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

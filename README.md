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
    icons.tsx           — ícones SVG usados no projeto
  pages/
    Start.tsx, Odonto1.tsx, Odonto2.tsx, Odonto2_1.tsx, Odonto2_3.tsx,
    Odonto3.tsx, Odonto3_1.tsx, Odonto3_2.tsx, Odonto3_3.tsx, Odonto4.tsx
  assets/images/        # imagens extraídas do Figma
```

Cada arquivo em `src/pages/` corresponde a exatamente um frame de nível
principal da página "Page 1" do arquivo Figma, com o mesmo nome/numeração
usado lá (ver `figmaFrame` em `routes.ts`).

## Como adicionar uma tela nova

Quando uma tela nova for desenhada no Figma:

1. Adicione uma entrada em `src/routes.ts` (`ROUTES`) na posição correta da
   jornada — path, label, nome do frame no Figma e nodeId.
2. Crie `src/pages/NomeDaTela.tsx` (siga o padrão dos arquivos existentes:
   só o conteúdo único da tela, sem Header/Footer — isso já vem do
   `PageShell` em `App.tsx`).
3. Registre o import em `App.tsx` no mapa `PAGES`.

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
- **Imagens**: baixadas do servidor local do Figma Desktop (disponível
  enquanto o app está aberto) e commitadas em `src/assets/images` — o
  protótipo funciona offline e após publicado, sem depender do Figma.

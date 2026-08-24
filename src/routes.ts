export type RouteDef = {
  path: string;
  label: string;
  /** Frame de origem no Figma. Ausente em telas levantadas direto da loja em produção. */
  figmaFrame?: string;
  figmaNodeId?: string;
  /** Telas em que o cabeçalho aparece logado ("Olá, {nome}" em vez de "Entrar"). */
  loggedIn?: boolean;
};

/**
 * Fonte única de verdade das telas da jornada.
 * Espelha os frames de nível principal da página "Page 1" do arquivo
 * Figma "Jornada Carrinho Abandonado" (mesmos nomes/numeração usados lá).
 *
 * Esta lista alimenta o registro de rotas (`App.tsx`) e o menu "Telas"
 * (`PrototypeNav`). Ela NÃO define a navegação: os links "Continuar"/"Voltar"
 * de cada página usam paths fixos, porque a ordem daqui inclui as telas de
 * modal (3.1/3.2/3.3), que não são etapas do fluxo. Ao inserir uma tela nova
 * no meio da jornada, ajuste também o `<Link to="...">` da tela anterior.
 */
export const ROUTES = [
  { path: '/', label: 'Start', figmaFrame: 'start', figmaNodeId: '1:2' },
  { path: '/odonto-1', label: 'Odonto 1', figmaFrame: 'odonto 1', figmaNodeId: '1:1021' },
  { path: '/odonto-2', label: 'Odonto 2 - Faça uma cotação', figmaFrame: 'odonto 2 - faça uma cotação', figmaNodeId: '1:1497' },
  { path: '/odonto-2-1', label: 'Odonto 2.1 - Faça uma cotação', figmaFrame: 'odonto 2.1 - faça uma cotação', figmaNodeId: '1:2085' },
  { path: '/odonto-2-3', label: 'Odonto 2.3 - Faça uma cotação', figmaFrame: 'odonto 2.3 - faça uma cotação', figmaNodeId: '1:2405' },
  { path: '/odonto-3', label: 'Odonto 3 - Cotação', figmaFrame: 'Odonto 3 Cotação', figmaNodeId: '1:2763' },
  { path: '/odonto-3-1', label: 'Odonto 3.1 - Coberturas e carências', figmaFrame: 'Odonto 3.1 - Ver mais sobre coberturas e carencias', figmaNodeId: '1:3417' },
  { path: '/odonto-3-2', label: 'Odonto 3.2 - Coberturas e carências', figmaFrame: 'Odonto 3.2 - Ver mais sobre coberturas e carencias', figmaNodeId: '2:4165' },
  { path: '/odonto-3-3', label: 'Odonto 3.3 - Coberturas e carências', figmaFrame: 'Odonto 3.3 - Ver mais sobre coberturas e carencias', figmaNodeId: '2:5789' },
  { path: '/odonto-4', label: 'Odonto 4 - Selecionou plano', figmaFrame: 'Odonto 4 - Selecionou plano', figmaNodeId: '2:6775', loggedIn: true },
  // Proposta da pesquisa: login como etapa com URL própria (hoje é um popup
  // com "x", o que gera atrito e impede medir o abandono só do login).
  { path: '/odonto-login', label: 'Odonto 3.5 - Login (proposta)' },
  // Levantada da loja em produção (loja.segurosunimed.com.br), não do Figma.
  // Última tela do protótipo: para no momento em que o pagamento é solicitado.
  { path: '/odonto-5', label: 'Odonto 5 - Pagamento', loggedIn: true },
] as const satisfies readonly RouteDef[];

/**
 * Paths existentes, derivados de ROUTES. O mapa `PAGES` em `App.tsx` é tipado
 * com isto, então esquecer o componente de uma tela nova quebra o `npm run
 * build` em vez de virar tela branca em produção.
 */
export type RoutePath = (typeof ROUTES)[number]['path'];

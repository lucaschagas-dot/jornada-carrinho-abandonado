export type RouteDef = {
  path: string;
  label: string;
  figmaFrame: string;
  figmaNodeId: string;
  /** Telas em que o cabeçalho aparece logado ("Olá, {nome}" em vez de "Entrar"). */
  loggedIn?: boolean;
};

/**
 * Fonte única de verdade para a ordem das telas da jornada.
 * Espelha os frames de nível principal da página "Page 1" do arquivo
 * Figma "Jornada Carrinho Abandonado" (mesmos nomes/numeração usados lá).
 * Ao adicionar uma tela nova no Figma, adicione uma entrada aqui na posição
 * correta — os links "Continuar"/"Voltar" de cada página usam esta ordem.
 */
export const ROUTES: RouteDef[] = [
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
];

export function getRouteIndex(path: string): number {
  return ROUTES.findIndex((r) => r.path === path);
}

export function getNextPath(path: string): string | null {
  const i = getRouteIndex(path);
  if (i === -1 || i === ROUTES.length - 1) return null;
  return ROUTES[i + 1].path;
}

export function getPrevPath(path: string): string | null {
  const i = getRouteIndex(path);
  if (i <= 0) return null;
  return ROUTES[i - 1].path;
}

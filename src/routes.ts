import type { JornadaId } from './jornadas';

export type RouteDef = {
  path: string;
  label: string;
  /** Frame de origem no Figma. Ausente em telas levantadas direto da loja em produção. */
  figmaFrame?: string;
  figmaNodeId?: string;
  /** Telas em que o cabeçalho aparece logado ("Olá, {nome}" em vez de "Entrar"). */
  loggedIn?: boolean;
  /** Jornada a que a tela pertence e posição dela — alimentam o indicador do topo. */
  jornada?: JornadaId;
  etapa?: number;
  /** Para onde o botão "Voltar" leva. Ausente só na home. */
  anterior?: string;
};

/**
 * Fonte única de verdade das telas da jornada.
 * Espelha os frames de nível principal da página "Page 1" do arquivo
 * Figma "Jornada Carrinho Abandonado" (mesmos nomes/numeração usados lá).
 *
 * Esta lista alimenta o registro de rotas (`App.tsx`), o menu "Telas"
 * (`PrototypeNav`) e a faixa de topo com "Voltar" + indicador de etapas
 * (`TopoEtapa`, montada pelo `PageShell`). Ela NÃO define o "Continuar": os
 * links de avanço de cada página usam paths fixos, porque a ordem daqui inclui
 * as telas de modal (3.1/3.2/3.3), que não são etapas do fluxo. Ao inserir uma
 * tela nova no meio da jornada, ajuste o `<Link to="...">` da tela anterior e o
 * `anterior` da tela seguinte.
 */
export const ROUTES = [
  { path: '/', label: 'Start', figmaFrame: 'start', figmaNodeId: '1:2' },
  { path: '/odonto-1', label: 'Odonto 1', figmaFrame: 'odonto 1', figmaNodeId: '1:1021', anterior: '/' },
  { path: '/odonto-2', label: 'Odonto 2 - Faça uma cotação', figmaFrame: 'odonto 2 - faça uma cotação', figmaNodeId: '1:1497', jornada: 'odonto', etapa: 1, anterior: '/odonto-1' },
  { path: '/odonto-2-1', label: 'Odonto 2.1 - Faça uma cotação', figmaFrame: 'odonto 2.1 - faça uma cotação', figmaNodeId: '1:2085', jornada: 'odonto', etapa: 1, anterior: '/odonto-2' },
  { path: '/odonto-2-3', label: 'Odonto 2.3 - Faça uma cotação', figmaFrame: 'odonto 2.3 - faça uma cotação', figmaNodeId: '1:2405', jornada: 'odonto', etapa: 1, anterior: '/odonto-2-1' },
  { path: '/odonto-3', label: 'Odonto 3 - Cotação', figmaFrame: 'Odonto 3 Cotação', figmaNodeId: '1:2763', jornada: 'odonto', etapa: 2, anterior: '/odonto-2-3' },
  // As 3.x são estados do modal "Características Gerais": o Voltar delas
  // devolve para a tela de produtos, que é de onde o modal é aberto.
  { path: '/odonto-3-1', label: 'Odonto 3.1 - Coberturas e carências', figmaFrame: 'Odonto 3.1 - Ver mais sobre coberturas e carencias', figmaNodeId: '1:3417', jornada: 'odonto', etapa: 2, anterior: '/odonto-3' },
  { path: '/odonto-3-2', label: 'Odonto 3.2 - Coberturas e carências', figmaFrame: 'Odonto 3.2 - Ver mais sobre coberturas e carencias', figmaNodeId: '2:4165', jornada: 'odonto', etapa: 2, anterior: '/odonto-3' },
  { path: '/odonto-3-3', label: 'Odonto 3.3 - Coberturas e carências', figmaFrame: 'Odonto 3.3 - Ver mais sobre coberturas e carencias', figmaNodeId: '2:5789', jornada: 'odonto', etapa: 2, anterior: '/odonto-3' },
  { path: '/odonto-4', label: 'Odonto 4 - Selecionou plano', figmaFrame: 'Odonto 4 - Selecionou plano', figmaNodeId: '2:6775', loggedIn: true, jornada: 'odonto', etapa: 3, anterior: '/odonto-login' },
  // Proposta da pesquisa: login como etapa com URL própria (hoje é um popup
  // com "x", o que gera atrito e impede medir o abandono só do login).
  { path: '/odonto-login', label: 'Odonto 3.5 - Login (proposta)', jornada: 'odonto', etapa: 3, anterior: '/odonto-3' },
  // Levantada da loja em produção (loja.segurosunimed.com.br), não do Figma.
  // Última tela do protótipo: para no momento em que o pagamento é confirmado.
  { path: '/odonto-5', label: 'Odonto 5 - Pagamento', loggedIn: true, jornada: 'odonto', etapa: 4, anterior: '/odonto-4' },

  // ---------- Seguro Residencial (levantado da loja em 24/08/2026) ----------
  { path: '/residencial-cotacao', label: 'Residencial 1 - Cotação', jornada: 'residencial', etapa: 1, anterior: '/' },
  { path: '/residencial-coberturas', label: 'Residencial 2 - Coberturas (combos)', jornada: 'residencial', etapa: 2, anterior: '/residencial-cotacao' },
  { path: '/residencial-identificacao', label: 'Residencial 3 - Identificação', jornada: 'residencial', etapa: 3, anterior: '/residencial-coberturas' },
  { path: '/residencial-pagamento', label: 'Residencial 4 - Pagamento', jornada: 'residencial', etapa: 4, anterior: '/residencial-identificacao' },

  // ---------- Seguro de Vida (jornada completa, 10 etapas) ----------
  // Levantada da loja em 08/09/2026. As etapas 6 a 10 ficam atrás da criação
  // de conta na loja real; foram reconstruídas a partir do modelo de dados da
  // simulação (ver o cabeçalho de src/vida.ts).
  { path: '/vida-1', label: 'Vida 1 - Página do produto', anterior: '/' },
  { path: '/vida-cotacao', label: 'Vida 2 - Cotação', jornada: 'vida', etapa: 1, anterior: '/vida-1' },
  { path: '/vida-produto', label: 'Vida 3 - Coberturas', jornada: 'vida', etapa: 2, anterior: '/vida-cotacao' },
  { path: '/vida-assistencias', label: 'Vida 4 - Benefícios e assistências', jornada: 'vida', etapa: 3, anterior: '/vida-produto' },
  { path: '/vida-composicao', label: 'Vida 5 - Composição', jornada: 'vida', etapa: 4, anterior: '/vida-assistencias' },
  // Proposta da pesquisa, igual ao Odonto: o login vira etapa com URL própria.
  // Na loja ele não existe — a conta é criada em silêncio ao sair da
  // Identificação ("uma conta será criada com os dados informados").
  { path: '/vida-login', label: 'Vida 5.5 - Login (proposta)', jornada: 'vida', etapa: 5, anterior: '/vida-composicao' },
  { path: '/vida-cadastro', label: 'Vida 6 - Identificação', loggedIn: true, jornada: 'vida', etapa: 5, anterior: '/vida-login' },
  { path: '/vida-endereco', label: 'Vida 7 - Endereço', loggedIn: true, jornada: 'vida', etapa: 6, anterior: '/vida-cadastro' },
  { path: '/vida-beneficiario', label: 'Vida 8 - Beneficiário', loggedIn: true, jornada: 'vida', etapa: 7, anterior: '/vida-endereco' },
  { path: '/vida-dps', label: 'Vida 9 - Declaração de Saúde', loggedIn: true, jornada: 'vida', etapa: 8, anterior: '/vida-beneficiario' },
  { path: '/vida-pagamento', label: 'Vida 10 - Pagamento', loggedIn: true, jornada: 'vida', etapa: 9, anterior: '/vida-dps' },
  { path: '/vida-confirmacao', label: 'Vida 11 - Conclusão', loggedIn: true, jornada: 'vida', etapa: 10, anterior: '/vida-pagamento' },
] as const satisfies readonly RouteDef[];

/**
 * Paths existentes, derivados de ROUTES. O mapa `PAGES` em `App.tsx` é tipado
 * com isto, então esquecer o componente de uma tela nova quebra o `npm run
 * build` em vez de virar tela branca em produção.
 */
export type RoutePath = (typeof ROUTES)[number]['path'];

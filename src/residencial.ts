/**
 * Dados do Seguro Residencial, levantados da loja em produção
 * (loja.segurosunimed.com.br/residencial) em 24/08/2026.
 *
 * Códigos, títulos, composição e valores dos combos são os reais.
 */

export type Cobertura = {
  codigo: string;
  titulo: string;
  /** "obrigatoria" = sempre presente; as demais são opcionais na personalização. */
  obrigatoria: boolean;
  /** Capital mínimo segurável, em reais. */
  limiteMinimo: number;
};

/** As 12 coberturas do produto, na ordem da loja. */
export const COBERTURAS: Cobertura[] = [
  { codigo: 'coberturaIncendio', titulo: 'Incêndio, queda de raio, explosão, queda de aeronave', obrigatoria: true, limiteMinimo: 150000 },
  { codigo: 'coberturaRoubo', titulo: 'Roubo e subtração de bens com vestígios', obrigatoria: false, limiteMinimo: 3000 },
  { codigo: 'coberturaAluguel', titulo: 'Aluguel garantido', obrigatoria: false, limiteMinimo: 2000 },
  { codigo: 'coberturaRcf', titulo: 'Responsabilidade civil familiar', obrigatoria: false, limiteMinimo: 15000 },
  { codigo: 'coberturaRompimentoTubulacao', titulo: 'Rompimento de tubulação', obrigatoria: false, limiteMinimo: 1500 },
  { codigo: 'coberturaImpactoVeiculos', titulo: 'Impacto de veículos terrestres', obrigatoria: false, limiteMinimo: 2000 },
  { codigo: 'coberturaDanosEletricos', titulo: 'Danos elétricos', obrigatoria: true, limiteMinimo: 2000 },
  { codigo: 'coberturaQuebraVidros', titulo: 'Quebra de vidros', obrigatoria: false, limiteMinimo: 3000 },
  { codigo: 'coberturaEscritorioResidencia', titulo: 'Escritório na residência', obrigatoria: false, limiteMinimo: 1500 },
  { codigo: 'coberturaVendaval', titulo: 'Vendaval, Furacão, Ciclone, Tornado, Queda de Granizo e Neve', obrigatoria: false, limiteMinimo: 2000 },
  { codigo: 'coberturaRecomposicaoDocumentos', titulo: 'Recomposição de documentos', obrigatoria: false, limiteMinimo: 1500 },
  { codigo: 'coberturaTumultos', titulo: 'Tumultos, greves e lockouts', obrigatoria: false, limiteMinimo: 1500 },
];

export const ASSISTENCIAS = [
  'Serviços de Manutenção',
  'Inspeção Domiciliar',
  'Serviços Emergenciais',
  'Cuidados para você e sua família',
  'Sustentabilidade',
  'Assistência Animais PET',
];

export type Combo = {
  id: number;
  nome: string;
  /** Parcela mensal, em reais. */
  mensal: number;
  parcelas: number;
  anual: number;
  /** codigo da cobertura -> capital segurado */
  coberturas: Record<string, number>;
};

/**
 * Os 3 combos, com a composição exata da loja.
 *
 * Repare que "coberturaRompimentoTubulacao" só existe no Combo 3 — é o ponto
 * levantado na pesquisa: uma das coberturas mais básicas de um residencial não
 * vem nos combos de entrada, porque incluí-la derrubaria o "a partir de R$ 15".
 */
export const COMBOS: Combo[] = [
  {
    id: 1,
    nome: 'Combo 1',
    mensal: 30.44,
    parcelas: 9,
    anual: 273.4,
    coberturas: {
      coberturaIncendio: 300000,
      coberturaDanosEletricos: 7000,
      coberturaRecomposicaoDocumentos: 10000,
      coberturaQuebraVidros: 6000,
      coberturaRcf: 30000,
      coberturaVendaval: 7000,
      coberturaRoubo: 3000,
    },
  },
  {
    id: 2,
    nome: 'Combo 2',
    mensal: 49.09,
    parcelas: 10,
    anual: 490.72,
    coberturas: {
      coberturaIncendio: 600000,
      coberturaDanosEletricos: 12000,
      coberturaRecomposicaoDocumentos: 15000,
      coberturaImpactoVeiculos: 15000,
      coberturaAluguel: 20000,
      coberturaQuebraVidros: 12000,
      coberturaRcf: 60000,
      coberturaVendaval: 15000,
      coberturaRoubo: 15000,
    },
  },
  {
    id: 3,
    nome: 'Combo 3',
    mensal: 92,
    parcelas: 10,
    anual: 920,
    coberturas: {
      coberturaIncendio: 1000000,
      coberturaDanosEletricos: 20000,
      coberturaRecomposicaoDocumentos: 30000,
      coberturaImpactoVeiculos: 30000,
      coberturaAluguel: 60000,
      coberturaQuebraVidros: 20000,
      coberturaRcf: 100000,
      coberturaVendaval: 30000,
      coberturaRoubo: 30000,
      coberturaRompimentoTubulacao: 30000,
    },
  },
];

/**
 * PROPOSTA DA PESQUISA (07/08/2026) — coberturas essenciais marcadas por padrão.
 *
 * "Por que que a gente já não deixa tudo marcado? [...] se a pessoa quiser, ela
 * desmarca" — Gabriela. Hoje tubulação vem desmarcada e o cliente descobre que
 * não tem cobertura só no sinistro (o Gustavo chega a corrigir apólice na mão).
 * Estas são as que passam a vir marcadas na personalização.
 */
export const RECOMENDADAS_POR_PADRAO = [
  'coberturaRompimentoTubulacao',
  'coberturaRoubo',
  'coberturaRcf',
  'coberturaQuebraVidros',
  'coberturaVendaval',
  'coberturaRecomposicaoDocumentos',
];

/** Alerta contextual da proposta, para quem mora em apartamento. */
export const ALERTA_APARTAMENTO: Record<string, string> = {
  coberturaRompimentoTubulacao:
    'Em apartamento, o rompimento de tubulação costuma ser coberto pelo condomínio. Se for o seu caso, pode desmarcar.',
};

export function formatarCapital(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

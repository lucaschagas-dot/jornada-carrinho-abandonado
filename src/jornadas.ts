/**
 * Etapas de cada jornada de compra, para o indicador de progresso do topo.
 *
 * Fica separado de `routes.ts` porque nem toda etapa vira tela no protótipo
 * (a jornada de Vida tem 10 etapas na loja e 4 construídas aqui): o indicador
 * mostra a jornada inteira, inclusive as etapas que ainda não existem como
 * rota, senão o número de passos que o cliente enxerga ficaria menor do que o
 * real — justamente o que a pesquisa apontou como problema.
 */
export const JORNADAS = {
  odonto: {
    nome: 'Plano Odontológico',
    etapas: ['Cotação', 'Produtos', 'Identificação', 'Pagamento', 'Conclusão'],
  },
  residencial: {
    nome: 'Seguro Residencial',
    etapas: ['Cotação', 'Coberturas', 'Identificação', 'Pagamento', 'Conclusão'],
  },
  vida: {
    nome: 'Seguro de vida',
    etapas: [
      'Cotação',
      'Produto',
      'Assistências',
      'Composição',
      'Cadastro',
      'Endereço',
      'Beneficiário',
      'Declaração de Saúde',
      'Pagamento',
      'Conclusão',
    ],
  },
} as const satisfies Record<string, { nome: string; etapas: readonly string[] }>;

export type JornadaId = keyof typeof JORNADAS;

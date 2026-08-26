/**
 * Dados do Seguro de Vida, levantados da loja em produção
 * (loja.segurosunimed.com.br/vida) em 24/08/2026.
 *
 * A jornada real tem 10 etapas: cotacao, produto, assistencia, composicao,
 * cadastro, endereco, beneficiario, dps, pagamento, confirmacao.
 */

export const ETAPAS_VIDA = [
  'cotacao',
  'produto',
  'assistencia',
  'composicao',
  'cadastro',
  'endereco',
  'beneficiario',
  'dps',
  'pagamento',
  'confirmacao',
] as const;

export type CoberturaVida = {
  codigo: string;
  titulo: string;
  opcional: boolean;
};

/** As 5 coberturas do produto (3 base + 2 opcionais). */
export const COBERTURAS_VIDA: CoberturaVida[] = [
  { codigo: 'coberturaMorte', titulo: 'Morte', opcional: false },
  { codigo: 'coberturaInvalidez', titulo: 'Invalidez Permanente Total ou Parcial por Acidente', opcional: false },
  { codigo: 'coberturaFuneral', titulo: 'Garantia Funeral Familiar', opcional: false },
  { codigo: 'coberturaCancer', titulo: 'Diagnóstico de Câncer Masculino ou Feminino', opcional: true },
  { codigo: 'coberturaMorteAcidental', titulo: 'Indenização Especial por Morte Acidental', opcional: true },
];

/** Benefícios inclusos, sem custo adicional. */
export const BENEFICIOS_VIDA = [
  { codigo: 'beneficioTelemedicina', titulo: 'Telemedicina' },
  { codigo: 'beneficioOrientacaoVidaSaudavel', titulo: 'Orientação Vida Saudável' },
  { codigo: 'beneficioOrientacaoFinanceira', titulo: 'Orientação Financeira' },
];

export type Assistencia = {
  codigo: string;
  titulo: string;
  descricao: string;
  precoMensal: number;
  /**
   * PROPOSTA DA PESQUISA: assistências de uso amplo passam a vir MARCADAS; as
   * de perfil específico (pet, auto, acessibilidade) continuam desmarcadas.
   * "aquilo que tá marcado, as pessoas vão ter menos vontade de deselecionar" —
   * Gabriela. Hoje todas vêm desmarcadas.
   */
  marcadaPorPadrao: boolean;
  /** Quando definido, só é sugerida se o perfil informado bater. */
  dependeDePerfil?: 'pet' | 'auto';
};

export const ASSISTENCIAS_VIDA: Assistencia[] = [
  {
    codigo: 'assistenciaResidencial',
    titulo: 'Assistência Residencial',
    descricao: 'Encanador, eletricista, chaveiro e vidraceiro em emergências na sua casa.',
    precoMensal: 4.9,
    marcadaPorPadrao: true,
  },
  {
    codigo: 'assistenciaFuneralFamiliar',
    titulo: 'Assistência Funeral Familiar',
    descricao: 'Apoio completo à família, incluindo traslado e documentação.',
    precoMensal: 6.5,
    marcadaPorPadrao: true,
  },
  {
    codigo: 'assistenciaNutricional',
    titulo: 'Orientação Nutricional',
    descricao: 'Consultas com nutricionista por telefone ou vídeo.',
    precoMensal: 3.2,
    marcadaPorPadrao: true,
  },
  {
    codigo: 'assistenciaPet',
    titulo: 'Assistência Pet',
    descricao: 'Consulta veterinária de urgência e hospedagem do animal.',
    precoMensal: 5.4,
    marcadaPorPadrao: false,
    dependeDePerfil: 'pet',
  },
  {
    codigo: 'assistenciaAuto',
    titulo: 'Assistência Automotiva',
    descricao: 'Reboque, chaveiro e troca de pneu para o seu veículo.',
    precoMensal: 7.8,
    marcadaPorPadrao: false,
    dependeDePerfil: 'auto',
  },
  {
    codigo: 'assistenciaAcessibilidade',
    titulo: 'Assistência Acessibilidade',
    descricao: 'Adaptações e apoio para pessoas com mobilidade reduzida.',
    precoMensal: 4.1,
    marcadaPorPadrao: false,
  },
];

/** As 5 perguntas da Declaração Pessoal de Saúde, como estão na loja. */
export const DPS_PERGUNTAS = [
  'Realiza ou realizou tratamento (cirurgia, medicamento) para controle de doença como: doenças vasculares, arteriais, diabetes, hipertensão arterial, cardiopatias, hérnias, AIDS ou outras?',
  'Pratica com regularidade algum esporte em nível de competição ou passatempos perigosos, tais como: automobilismo, motociclismo, esportes náuticos, mergulho, voo livre, montanhismo, paraquedismo ou algum outro?',
  'Pratica algum desses esportes de forma profissional?',
  'Qual o seu histórico com seguro de vida individual? Possui seguro vigente ou vencido?',
  'Você teve alguma outra doença, sequela ou tratamento não considerado nas questões anteriores? Se sim, favor esclarecer abaixo.',
];

export const GRAUS_PARENTESCO = [
  'Dependente',
  'Filho',
  'Filha',
  'Cônjuge',
  'Agregado',
  'Pai',
  'Mãe',
  'Enteado',
  'Enteada',
  'Maior Curatelado',
  'Menor Sobre Guarda',
  'Irmão',
  'Irmã',
  'Neto',
  'Neta',
];

/**
 * A loja tem 3.873 profissões. Aqui vai uma amostra representativa — o que
 * importa no protótipo é a PROPOSTA DA PESQUISA: quando a profissão não está
 * na lista, hoje a plataforma fica em silêncio e a pessoa desiste. Passa a
 * existir uma saída (ver `SUGESTOES_PROFISSAO`).
 */
export const PROFISSOES = [
  'Abastecedor de Linha de Produção',
  'Administrador',
  'Advogado',
  'Analista de Sistemas',
  'Arquiteto',
  'Auxiliar Administrativo',
  'Contador',
  'Dentista',
  'Designer',
  'Empresário',
  'Enfermeiro',
  'Engenheiro Civil',
  'Estudante',
  'Farmacêutico',
  'Fisioterapeuta',
  'Jornalista',
  'Médico',
  'Motorista',
  'Nutricionista',
  'Pedagogo',
  'Professor',
  'Programador',
  'Psicólogo',
  'Publicitário',
  'Vendedor',
];

/**
 * PROPOSTA DA PESQUISA: para profissões que não constam na lista (as "novas
 * profissões" — influenciador, streamer, motorista de app), sugerir a mais
 * próxima em vez de deixar a pessoa sem saída.
 */
export const SUGESTOES_PROFISSAO: Record<string, string[]> = {
  influenciador: ['Publicitário', 'Jornalista', 'Designer'],
  influencer: ['Publicitário', 'Jornalista', 'Designer'],
  streamer: ['Publicitário', 'Designer'],
  youtuber: ['Publicitário', 'Jornalista'],
  'social media': ['Publicitário', 'Designer'],
  'motorista de aplicativo': ['Motorista'],
  uber: ['Motorista'],
  'desenvolvedor': ['Programador', 'Analista de Sistemas'],
  dev: ['Programador', 'Analista de Sistemas'],
};

/**
 * Dados do Seguro de Vida, levantados da loja em produção
 * (loja.segurosunimed.com.br/vida) em 08/09/2026, direto do modelo AngularJS
 * da simulação — não transcritos da tela.
 *
 * A jornada real tem 10 etapas. Foi possível percorrer as quatro primeiras
 * (cotação, produto, assistência, composição) e ver a quinta (cadastro). Da
 * sexta em diante a loja exige criar conta ("*Ao clicar em continuar uma conta
 * será criada com os dados informados"), então endereço, beneficiário, DPS,
 * pagamento e confirmação foram reconstruídos a partir do modelo de dados
 * (`simulacao`) e das listas que o controller já carrega — que é de onde a
 * própria loja monta esses formulários.
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

/* ------------------------------------------------------------------ *
 * Coberturas
 * ------------------------------------------------------------------ */

export type CoberturaVida = {
  codigo: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  opcional: boolean;
  /** Como o valor da cobertura deriva do capital segurado. */
  valor: 'capital' | 'fixo10k' | 'dezPorCentoDoCapital' | 'capitalEmDobro';
};

export const COBERTURAS_VIDA: CoberturaVida[] = [
  {
    codigo: 'coberturaMorte',
    titulo: 'Morte',
    subtitulo: 'Pagamento de indenização para os seus beneficiários',
    descricao:
      'Seus herdeiros legais (ou quem você deixar determinado) receberão o valor que você contratou, caso você venha a falecer por causa naturais ou acidentais.',
    opcional: false,
    valor: 'capital',
  },
  {
    codigo: 'coberturaInvalidez',
    titulo: 'Invalidez Permanente Total ou Parcial por Acidente',
    subtitulo: 'Indenização para você em caso de acidente',
    descricao:
      'Ao sofrer um acidente que cause a perda total ou parcial de um membro ou órgão, você receberá uma indenização conforme grau da lesão em atestado médico.',
    opcional: false,
    valor: 'capital',
  },
  {
    codigo: 'coberturaFuneral',
    titulo: 'Garantia Funeral Familiar',
    subtitulo: 'Realização do serviço de funeral ou reembolso das despesas',
    descricao:
      'Realização do serviço de funeral ou a seguradora reembolsará o valor das despesas limitado ao valor contratado.',
    opcional: false,
    valor: 'fixo10k',
  },
  {
    codigo: 'coberturaCancer',
    titulo: 'Diagnóstico de Câncer Masculino ou Feminino',
    subtitulo: 'Você será indenizado caso seja diagnosticado com câncer',
    descricao:
      'Você receberá o valor que contratou caso seja diagnosticado com câncer, conforme as condições da apólice.',
    opcional: true,
    valor: 'dezPorCentoDoCapital',
  },
  {
    codigo: 'coberturaMorteAcidental',
    titulo: 'Indenização Especial por Morte Acidental',
    subtitulo: 'Indenização em dobro no caso de morte acidental do titular',
    descricao:
      'Seus herdeiros legais (ou quem você deixar determinado) receberão o valor que você contratou em dobro, caso você venha a falecer em um acidente.',
    opcional: true,
    valor: 'capitalEmDobro',
  },
];

export const FUNERAL_CAPITAL_FIXO = 10000;

/* ------------------------------------------------------------------ *
 * Benefícios inclusos (sem custo)
 * ------------------------------------------------------------------ */

export const BENEFICIOS_VIDA = [
  {
    codigo: 'beneficioTelemedicina',
    titulo: 'Telemedicina',
    descricao: 'Pronto Atendimento Digital com clínicos gerais, 24 horas por dia, 7 dias por semana.',
  },
  {
    codigo: 'beneficioOrientacaoVidaSaudavel',
    titulo: 'Orientação Vida Saudável',
    descricao:
      'Orientação por telefone auxiliando na prática consciente de exercícios físicos e hábitos mais saudáveis.',
  },
  {
    codigo: 'beneficioOrientacaoFinanceira',
    titulo: 'Orientação Financeira',
    descricao: 'Orientação por telefone para elaboração de orçamento pessoal e planejamento financeiro.',
  },
];

/* ------------------------------------------------------------------ *
 * Assistências opcionais
 * ------------------------------------------------------------------ */

export type Assistencia = {
  codigo: string;
  titulo: string;
  descricao: string;
  /** Mensalidade — ilustrativa, ver PRECOS_OBSERVADOS. */
  precoMensal: number;
  /** Perfil que a torna de fato relevante (usado pela proposta da pesquisa). */
  dependeDePerfil?: 'pet' | 'auto';
};

/** As 10 assistências opcionais do produto, com os textos da loja. */
export const ASSISTENCIAS_VIDA: Assistencia[] = [
  {
    codigo: 'assistenciaFarma',
    titulo: 'Farma Assist',
    descricao: 'Até 80% de desconto em medicamentos em farmácias conveniadas.',
    precoMensal: 6.5,
  },
  {
    codigo: 'assistenciaOrientacaoPsi',
    titulo: 'Orientação Psicológica',
    descricao:
      'Orientação por telefone com dicas de saúde mental, identificação de gatilhos, acolhimento, entre outros.',
    precoMensal: 5.9,
  },
  {
    codigo: 'assistenciaNutricional',
    titulo: 'Nutricional',
    descricao: 'Orientação nutricional para as questões relacionadas à alimentação saudável.',
    precoMensal: 3.2,
  },
  {
    codigo: 'assistenciaHelpDesk',
    titulo: 'Help Desk',
    descricao: 'Orientação por telefone para soluções de problema com computadores, telefones e periféricos.',
    precoMensal: 3.9,
  },
  {
    codigo: 'assistenciaAuto',
    titulo: 'Auto 24h',
    descricao: 'Assistência Emergencial de reparo e atendimento ao Veículo Assistido.',
    precoMensal: 7.8,
    dependeDePerfil: 'auto',
  },
  {
    codigo: 'assistenciaResidencial',
    titulo: 'Residencial',
    descricao: 'Serviço de assistência residencial.',
    precoMensal: 4.9,
  },
  {
    codigo: 'assistenciaAssesProf',
    titulo: 'Assessoria Profissional',
    descricao: 'Serviço de assessoria para sua recolocação no mercado de trabalho.',
    precoMensal: 4.4,
  },
  {
    codigo: 'assistenciaPet',
    titulo: 'Pet Premium',
    descricao: 'Assistência emergencial e não emergencial de cuidados com o pet.',
    precoMensal: 5.4,
    dependeDePerfil: 'pet',
  },
  {
    codigo: 'assistenciaKids',
    titulo: 'Kids',
    descricao: 'Serviços de suporte e ações no ambiente residencial para ajudar com crianças.',
    precoMensal: 4.1,
  },
  {
    codigo: 'assistenciaAcessibilidade',
    titulo: 'Acessibilidade',
    descricao: 'Instalações e adaptações na residência, como fitas antiderrapantes e barras de apoio.',
    precoMensal: 4.1,
  },
];

/**
 * Recomendação por IA — ACHADO NOVO, não é proposta nossa.
 *
 * A loja passou a ordenar as assistências por relevância, com um score em % e
 * uma justificativa escrita para o perfil da pessoa ("Tecnologia de
 * recomendação por IA. Powered by Google Gemini"). Os textos abaixo são os que
 * a loja gerou em 08/09/2026 para o perfil usado no mapeamento: homem, 31
 * anos, Analista de Sistemas, renda R$ 8.000, não fumante.
 *
 * Isso responde em parte à pesquisa de carrinho abandonado — que reclamava de
 * assistência sugerida sem lastro no perfil. Repare, porém, que Pet e Kids
 * continuam na lista dizendo "caso você tenha": a loja recomenda melhor, mas
 * ainda não PERGUNTA. É aí que a nossa proposta continua de pé.
 */
export const RECOMENDACAO_IA: Record<string, { score: number; justificativa: string }> = {
  assistenciaFarma: {
    score: 80,
    justificativa:
      'Com sua renda, você tem condições de arcar com despesas médicas. No entanto, os descontos em farmácia e a orientação sobre medicamentos podem gerar uma economia significativa no seu orçamento.',
  },
  assistenciaOrientacaoPsi: {
    score: 70,
    justificativa:
      'Como Analista de Sistemas, você pode lidar com pressões no trabalho. Essa orientação pode ajudar a gerenciar o estresse e manter seu bem-estar mental.',
  },
  assistenciaNutricional: {
    score: 60,
    justificativa:
      'Manter uma alimentação saudável é importante para sua saúde geral e pode prevenir problemas futuros. Essa orientação pode ser útil para otimizar sua dieta.',
  },
  assistenciaHelpDesk: {
    score: 50,
    justificativa:
      'Como Analista de Sistemas, você provavelmente tem conhecimento técnico. No entanto, em momentos de urgência ou para problemas complexos com seus dispositivos, essa assistência pode oferecer um suporte rápido e prático.',
  },
  assistenciaAuto: {
    score: 40,
    justificativa:
      'Se você possui um veículo, essa assistência oferece suporte em emergências mecânicas. A relevância dependerá do seu uso e da sua necessidade de cobertura para o carro.',
  },
  assistenciaResidencial: {
    score: 40,
    justificativa:
      'Serviços de assistência residencial cobrem imprevistos do dia a dia em casa, como problemas hidráulicos e elétricos.',
  },
  assistenciaAssesProf: {
    score: 30,
    justificativa:
      'Sua profissão e renda sugerem estabilidade, mas imprevistos podem acontecer. Essa assistência pode ser útil caso você precise de suporte para recolocação profissional no futuro.',
  },
  assistenciaPet: {
    score: 20,
    justificativa:
      'Essa assistência é para quem tem pets. Caso você tenha um animal de estimação, a relevância pode aumentar.',
  },
  assistenciaKids: {
    score: 10,
    justificativa:
      'Esta assistência é para quem tem filhos pequenos. Se você tem crianças em casa, ela pode oferecer suporte com serviços residenciais.',
  },
  assistenciaAcessibilidade: {
    score: 10,
    justificativa:
      'Essa assistência é voltada para adaptações residenciais. Sua relevância é baixa neste momento, a menos que haja alguma necessidade específica.',
  },
};

/* ------------------------------------------------------------------ *
 * Preço
 * ------------------------------------------------------------------ */

/**
 * Os dois únicos totais REAIS observados na loja, para o perfil do mapeamento
 * (capital R$ 288.000):
 *
 * - R$ 52,51/mês — só as 3 coberturas base
 * - R$ 69,39/mês — + Câncer + Morte Acidental + Farma Assist
 *
 * O preço da loja é calculado no servidor e não foi possível isolar o valor de
 * cada item. As mensalidades por item aqui são ILUSTRATIVAS: foram calibradas
 * para reproduzir esses dois totais. Servem para a tela reagir de forma
 * coerente na demonstração, não para cotar de verdade.
 */
export const PRECOS_OBSERVADOS = { base: 52.51, comOpcionaisEFarma: 69.39, capitalDeReferencia: 288000 };

/** Taxa mensal por R$ 1.000 de capital, derivada do total base observado. */
export const TAXA_POR_MIL = PRECOS_OBSERVADOS.base / (PRECOS_OBSERVADOS.capitalDeReferencia / 1000);

export const PRECO_COBERTURA_OPCIONAL: Record<string, number> = {
  coberturaCancer: 6.2,
  coberturaMorteAcidental: 4.18,
};

/* ------------------------------------------------------------------ *
 * Capital segurado
 * ------------------------------------------------------------------ */

export const CAPITAL_MINIMO = 50000;
export const CAPITAL_PASSO = 1000;
/** A loja sugere 36x a renda mensal, limitado ao teto da profissão. */
export const MULTIPLICADOR_RENDA = 36;

/* ------------------------------------------------------------------ *
 * Profissões
 * ------------------------------------------------------------------ */

export type Profissao = {
  codigo: string;
  descricao: string;
  /** Teto de capital segurado permitido para a profissão. */
  limiteVida: number;
};

/**
 * A loja tem 3.873 profissões, cada uma com o próprio teto de capital
 * (`limiteVida`) — é ele que define o máximo do slider da etapa 2. Abaixo,
 * uma amostra com os limites reais de duas delas e limites plausíveis para as
 * demais; o que o protótipo precisa demonstrar é a mecânica, não a tabela.
 */
export const PROFISSOES: Profissao[] = [
  { codigo: '2750', descricao: 'Abastecedor de Linha de Produção', limiteVida: 250000 },
  { codigo: '503', descricao: 'Analista de Sistemas', limiteVida: 400000 },
  { codigo: '101', descricao: 'Administrador', limiteVida: 400000 },
  { codigo: '102', descricao: 'Advogado', limiteVida: 500000 },
  { codigo: '103', descricao: 'Arquiteto', limiteVida: 400000 },
  { codigo: '104', descricao: 'Auxiliar Administrativo', limiteVida: 250000 },
  { codigo: '105', descricao: 'Contador', limiteVida: 400000 },
  { codigo: '106', descricao: 'Dentista', limiteVida: 500000 },
  { codigo: '107', descricao: 'Designer', limiteVida: 300000 },
  { codigo: '108', descricao: 'Empresário', limiteVida: 500000 },
  { codigo: '109', descricao: 'Enfermeiro', limiteVida: 300000 },
  { codigo: '110', descricao: 'Engenheiro Civil', limiteVida: 400000 },
  { codigo: '111', descricao: 'Estudante', limiteVida: 150000 },
  { codigo: '112', descricao: 'Farmacêutico', limiteVida: 400000 },
  { codigo: '113', descricao: 'Fisioterapeuta', limiteVida: 300000 },
  { codigo: '114', descricao: 'Jornalista', limiteVida: 300000 },
  { codigo: '115', descricao: 'Médico', limiteVida: 500000 },
  { codigo: '116', descricao: 'Motorista', limiteVida: 200000 },
  { codigo: '117', descricao: 'Nutricionista', limiteVida: 300000 },
  { codigo: '118', descricao: 'Pedagogo', limiteVida: 250000 },
  { codigo: '119', descricao: 'Professor', limiteVida: 300000 },
  { codigo: '120', descricao: 'Programador', limiteVida: 400000 },
  { codigo: '121', descricao: 'Psicólogo', limiteVida: 400000 },
  { codigo: '122', descricao: 'Publicitário', limiteVida: 300000 },
  { codigo: '123', descricao: 'Vendedor', limiteVida: 200000 },
];

/** Teto usado quando a pessoa segue como "Outros" (proposta da pesquisa). */
export const LIMITE_PROFISSAO_OUTROS = 200000;

/**
 * PROPOSTA DA PESQUISA: para profissões que não constam na lista (as "novas
 * profissões" — influenciador, streamer, motorista de app), sugerir a mais
 * próxima em vez de deixar a pessoa sem saída. Hoje a loja não responde nada.
 */
export const SUGESTOES_PROFISSAO: Record<string, string[]> = {
  influenciador: ['Publicitário', 'Jornalista', 'Designer'],
  influencer: ['Publicitário', 'Jornalista', 'Designer'],
  streamer: ['Publicitário', 'Designer'],
  youtuber: ['Publicitário', 'Jornalista'],
  'social media': ['Publicitário', 'Designer'],
  'motorista de aplicativo': ['Motorista'],
  uber: ['Motorista'],
  desenvolvedor: ['Programador', 'Analista de Sistemas'],
  dev: ['Programador', 'Analista de Sistemas'],
};

/* ------------------------------------------------------------------ *
 * Listas do cadastro / beneficiários / endereço
 * ------------------------------------------------------------------ */

export const RELACOES_CIGARRO = ['Fumante', 'Ex-fumante', 'Nunca fumei'] as const;
export type RelacaoCigarro = (typeof RELACOES_CIGARRO)[number];

export const ESTADOS_CIVIS = [
  'Casado',
  'Solteiro',
  'Separado',
  'União Estável',
  'Viúvo',
  'Divorciado',
  'Amasiado',
  'Convivente',
  'Desquitado',
  'Marital',
];

/** Opções do PEP (Pessoa Exposta Politicamente) na etapa de Identificação. */
export const OPCOES_PEP = ['Não', 'Sim', 'Relação Próxima'];

export const TEXTO_PEP =
  'Consideram-se nesta classificação, agentes públicos que desempenham ou que tenham desempenhado, nos últimos 5 (cinco) anos, no Brasil ou no exterior, cargos, empregos ou funções públicas relevantes.';

/** Os 11 graus de parentesco aceitos para beneficiário. */
export const GRAUS_BENEFICIARIO = [
  'Avó/Avô',
  'Cônjuge',
  'Filho(a)',
  'Irmã(o)',
  'Mãe',
  'Neto(a)',
  'Outros',
  'Pai',
  'Sobrinho(a)',
  'Tio(a)',
  'Companheiro(a)',
];

export const UFS = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA',
  'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',
];

/* ------------------------------------------------------------------ *
 * Declaração Pessoal de Saúde
 * ------------------------------------------------------------------ */

export type PerguntaDps = {
  id: number;
  pergunta: string;
  /** Itens listados na pergunta, quando ela traz uma lista. */
  itens?: string[];
};

/** As 5 perguntas da DPS, com o texto integral da loja. */
export const DPS_PERGUNTAS: PerguntaDps[] = [
  {
    id: 1,
    pergunta: 'Realiza ou realizou tratamento (cirurgia, medicamento) para controle de doença como:',
    itens: [
      'Doenças vasculares',
      'Arteriais',
      'Diabetes',
      'Hipertensão Arterial',
      'Cardiopatias',
      'Hérnias',
      'AIDS ou HIV',
      'Doenças Osteomusculares',
      'Doenças respiratórias ou pulmonares',
      'Doenças neurológicas',
      'Doenças genéticas ou hereditárias',
      'Câncer (mesmo há mais de 5 anos)',
      'Quimioterapia, iodoterapia e/ou radioterapia',
      'Terapias imunobiológicas',
      'Terapias psicológicas ou psiquiátricas',
      'Outras doenças ou deficiências preexistentes',
    ],
  },
  {
    id: 2,
    pergunta:
      'Pratica com regularidade algum esporte em nível de competição ou passatempos perigosos, tais como: automobilismo, motociclismo, esportes náuticos, mergulho, vôo livre, montanhismo, paraquedismo ou algum outro esporte de risco?',
  },
  { id: 3, pergunta: 'Pratica algum desses esportes de forma profissional?' },
  { id: 4, pergunta: 'Qual o seu histórico com seguro de vida individual? Possui seguro vigente ou vencido?' },
  {
    id: 5,
    pergunta:
      'Você teve alguma outra doença, sequela ou tratamento não considerado nas questões anteriores? Se sim, favor esclarecer abaixo.',
  },
];

/* ------------------------------------------------------------------ *
 * Formas de pagamento
 * ------------------------------------------------------------------ */

/**
 * ACHADO: no Seguro de Vida, a única forma de pagamento aberta ao cliente é
 * cartão de crédito. No `produtoConfiguracao` da loja:
 * cartaoCredito "Ativo", boleto e débito automático "Administrativo" (só o
 * corretor aciona) e pix "Desativado".
 *
 * Ou seja: aqui "cartão primeiro e já aberto" não é só prioridade comercial —
 * é a única opção que existe, e mesmo assim a loja a apresenta como uma
 * escolha entre várias.
 */
export const PAGAMENTO_VIDA = {
  cartaoCredito: 'Ativo',
  debitoAutomatico: 'Administrativo',
  boleto: 'Administrativo',
  pix: 'Desativado',
} as const;

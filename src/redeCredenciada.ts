/**
 * Dentistas usados no protótipo da busca de rede credenciada.
 *
 * São TODOS FICTÍCIOS. A busca real devolve profissionais de verdade, com nome,
 * CRO e telefone reais — dados de terceiros que não podem entrar num
 * repositório público. Nomes, CROs e telefones aqui são inventados (telefones
 * no padrão 5555-xxxx, que não existe em uso comercial); só os logradouros são
 * ruas públicas conhecidas, para o mapa fazer sentido.
 */

export const ESPECIALIDADES = [
  'Alinhador',
  'CIRURGIA',
  'CLÍNICA GERAL',
  'DENTÍSTICA',
  'ENDODONTIA',
  'ESTOMATOLOGIA',
  'Implantodontia',
  'ODONTOGERIATRIA',
  'Odontologia Estética Clareamento',
  'ODONTOPEDIATRIA',
  'ORTODONTIA',
  'PACIENTES ESPECIAIS',
  'PERIODONTIA',
  'PRÓTESE',
  'RADIOLOGIA',
  'Radiologia com Tomografia',
  'Urgência (Horário Comercial)',
  'Urgência (24 horas)',
] as const;

export const UFS = ['SP', 'RJ', 'MG', 'PR', 'RS', 'SC', 'BA', 'GO', 'DF'] as const;

export const PLANOS_REDE = ['Essencial', 'Essencial Plus', 'Pleno', 'Pleno Ortodontia'] as const;

export type Dentista = {
  id: string;
  nome: string;
  especialidade: string;
  enderecoLinha1: string;
  enderecoLinha2: string;
  distanciaKm: number;
  distanciaLabel: string;
  planos: string[];
  cro: string;
  telefones: string[];
  /** Posição do pin no mapa ilustrativo, em % do container. */
  pin: { x: number; y: number };
};

const TODOS = [...PLANOS_REDE];

export const DENTISTAS: Dentista[] = [
  {
    id: 'd1',
    nome: 'Ana Beatriz Ferreira Lima',
    especialidade: 'CLÍNICA GERAL',
    enderecoLinha1: 'AVENIDA PAULISTA, 1500 SALA 402 CEP 01310200',
    enderecoLinha2: 'BELA VISTA, SÃO PAULO, SP',
    distanciaKm: 0.4,
    distanciaLabel: 'Menos de 1km',
    planos: TODOS,
    cro: '10001-SP',
    telefones: ['(11) 5555-0101', '(11) 5555-0102'],
    pin: { x: 38, y: 42 },
  },
  {
    id: 'd2',
    nome: 'Carlos Henrique Nogueira',
    especialidade: 'CLÍNICA GERAL',
    enderecoLinha1: 'RUA AUGUSTA, 2100 CONJUNTO 91 CEP 01412100',
    enderecoLinha2: 'CONSOLAÇÃO, SÃO PAULO, SP',
    distanciaKm: 0.9,
    distanciaLabel: 'Menos de 1km',
    planos: TODOS,
    cro: '10002-SP',
    telefones: ['(11) 5555-0203'],
    pin: { x: 52, y: 30 },
  },
  {
    id: 'd3',
    nome: 'Mariana Torres Albuquerque',
    especialidade: 'ORTODONTIA',
    enderecoLinha1: 'ALAMEDA SANTOS, 900 SALA 1204 CEP 01418100',
    enderecoLinha2: 'JARDIM PAULISTA, SÃO PAULO, SP',
    distanciaKm: 1.2,
    distanciaLabel: '1,2 km',
    planos: ['Pleno Ortodontia'],
    cro: '10003-SP',
    telefones: ['(11) 5555-0304', '(11) 5555-0305'],
    pin: { x: 30, y: 58 },
  },
  {
    id: 'd4',
    nome: 'Rafael Monteiro Cardoso',
    especialidade: 'ENDODONTIA',
    enderecoLinha1: 'RUA HADDOCK LOBO, 400 SALA 22 CEP 01414000',
    enderecoLinha2: 'CERQUEIRA CÉSAR, SÃO PAULO, SP',
    distanciaKm: 1.5,
    distanciaLabel: '1,5 km',
    planos: TODOS,
    cro: '10004-SP',
    telefones: ['(11) 5555-0406'],
    pin: { x: 64, y: 52 },
  },
  {
    id: 'd5',
    nome: 'Juliana Prado Vasconcelos',
    especialidade: 'ODONTOPEDIATRIA',
    enderecoLinha1: 'RUA OSCAR FREIRE, 1200 CEP 01426001',
    enderecoLinha2: 'JARDINS, SÃO PAULO, SP',
    distanciaKm: 2.1,
    distanciaLabel: '2,1 km',
    planos: ['Essencial Plus', 'Pleno', 'Pleno Ortodontia'],
    cro: '10005-SP',
    telefones: ['(11) 5555-0507'],
    pin: { x: 22, y: 34 },
  },
  {
    id: 'd6',
    nome: 'Pedro Ivo Sampaio Rocha',
    especialidade: 'PERIODONTIA',
    enderecoLinha1: 'AVENIDA REBOUÇAS, 3000 SALA 15 CEP 05402600',
    enderecoLinha2: 'PINHEIROS, SÃO PAULO, SP',
    distanciaKm: 2.8,
    distanciaLabel: '2,8 km',
    planos: ['Essencial Plus', 'Pleno', 'Pleno Ortodontia'],
    cro: '10006-SP',
    telefones: ['(11) 5555-0608', '(11) 5555-0609'],
    pin: { x: 48, y: 68 },
  },
  {
    id: 'd7',
    nome: 'Fernanda Quintela Barros',
    especialidade: 'PRÓTESE',
    enderecoLinha1: 'RUA DA CONSOLAÇÃO, 2500 CONJUNTO 71 CEP 01301100',
    enderecoLinha2: 'CONSOLAÇÃO, SÃO PAULO, SP',
    distanciaKm: 3.4,
    distanciaLabel: '3,4 km',
    planos: ['Pleno', 'Pleno Ortodontia'],
    cro: '10007-SP',
    telefones: ['(11) 5555-0710'],
    pin: { x: 72, y: 24 },
  },
  {
    id: 'd8',
    nome: 'Gustavo Andrade Peixoto',
    especialidade: 'CIRURGIA',
    enderecoLinha1: 'AVENIDA BRIGADEIRO LUÍS ANTÔNIO, 2000 CEP 01318002',
    enderecoLinha2: 'BELA VISTA, SÃO PAULO, SP',
    distanciaKm: 3.9,
    distanciaLabel: '3,9 km',
    planos: TODOS,
    cro: '10008-SP',
    telefones: ['(11) 5555-0811'],
    pin: { x: 58, y: 78 },
  },
  {
    id: 'd9',
    nome: 'Larissa Fontoura Machado',
    especialidade: 'Urgência (24 horas)',
    enderecoLinha1: 'RUA VERGUEIRO, 1500 TÉRREO CEP 01504000',
    enderecoLinha2: 'PARAÍSO, SÃO PAULO, SP',
    distanciaKm: 4.6,
    distanciaLabel: '4,6 km',
    planos: TODOS,
    cro: '10009-SP',
    telefones: ['(11) 5555-0912'],
    pin: { x: 80, y: 62 },
  },
  {
    id: 'd10',
    nome: 'Thiago Bastos Rezende',
    especialidade: 'Implantodontia',
    enderecoLinha1: 'AVENIDA ANGÉLICA, 1800 SALA 33 CEP 01228200',
    enderecoLinha2: 'HIGIENÓPOLIS, SÃO PAULO, SP',
    distanciaKm: 5.2,
    distanciaLabel: '5,2 km',
    planos: ['Pleno', 'Pleno Ortodontia'],
    cro: '10010-SP',
    telefones: ['(11) 5555-1013'],
    pin: { x: 16, y: 72 },
  },
];

/** "Essencial, Essencial Plus, Pleno e Pleno Ortodontia" */
export function listarPlanos(planos: string[]): string {
  if (planos.length <= 1) return planos.join('');
  return `${planos.slice(0, -1).join(', ')} e ${planos[planos.length - 1]}`;
}

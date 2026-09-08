import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  ASSISTENCIAS_VIDA,
  CAPITAL_MINIMO,
  LIMITE_PROFISSAO_OUTROS,
  MULTIPLICADOR_RENDA,
  PRECO_COBERTURA_OPCIONAL,
  TAXA_POR_MIL,
  type Profissao,
  type RelacaoCigarro,
} from './vida';

export type Beneficiario = {
  nome: string;
  grau: string;
  /** Participação no capital, em %. A soma dos beneficiários tem que dar 100. */
  percentual: number;
};

export type RespostaDps = 'sim' | 'nao' | null;

/**
 * Espelha o objeto `simulacao` que a loja carrega no AngularJS e vai
 * preenchendo etapa a etapa — é ele que alimenta o resumo lateral em todas as
 * telas da jornada.
 */
export type SimulacaoVida = {
  sexo: 'Masculino' | 'Feminino' | null;
  dataNascimento: string;
  profissao: Profissao | null;
  /** Preenchido quando a pessoa segue como "Outros" (proposta da pesquisa). */
  profissaoLivre: string;
  rendaMensal: number | null;
  altura: number | null;
  peso: number | null;
  relacaoCigarro: RelacaoCigarro | null;
  /** Propostas da pesquisa: perfil coletado para a recomendação de assistências. */
  temPet: boolean | null;
  temVeiculo: boolean | null;

  capitalSegurado: number;
  coberturaCancer: boolean;
  coberturaMorteAcidental: boolean;
  assistencias: Record<string, boolean>;

  beneficiarios: Beneficiario[];
  dpsRespostas: RespostaDps[];
  /** Texto livre da pergunta 5 da DPS. */
  dpsDetalhe: string;
  dpsAdiada: boolean;
};

const INICIAL: SimulacaoVida = {
  sexo: null,
  dataNascimento: '',
  profissao: null,
  profissaoLivre: '',
  rendaMensal: null,
  altura: null,
  peso: null,
  relacaoCigarro: null,
  temPet: null,
  temVeiculo: null,
  capitalSegurado: 0,
  coberturaCancer: false,
  coberturaMorteAcidental: false,
  assistencias: {},
  beneficiarios: [],
  dpsRespostas: [null, null, null, null, null],
  dpsDetalhe: '',
  dpsAdiada: false,
};

type VidaContexto = {
  sim: SimulacaoVida;
  atualizar: (mudanca: Partial<SimulacaoVida>) => void;
  alternarAssistencia: (codigo: string) => void;
  /** Teto de capital da profissão escolhida (ou o padrão de "Outros"). */
  limiteCapital: number;
  /** Capital sugerido pela loja: 36x a renda, limitado ao teto da profissão. */
  capitalSugerido: number;
  totalMensal: number;
  /** Protocolo da cotação — fixo, é um protótipo. */
  protocolo: string;
};

const Ctx = createContext<VidaContexto | null>(null);

export function VidaProvider({ children }: { children: ReactNode }) {
  const [sim, setSim] = useState<SimulacaoVida>(INICIAL);

  const valor = useMemo<VidaContexto>(() => {
    const limiteCapital = sim.profissao ? sim.profissao.limiteVida : LIMITE_PROFISSAO_OUTROS;

    const capitalSugerido = sim.rendaMensal
      ? Math.min(Math.max(sim.rendaMensal * MULTIPLICADOR_RENDA, CAPITAL_MINIMO), limiteCapital)
      : CAPITAL_MINIMO;

    const capital = sim.capitalSegurado || capitalSugerido;

    let total = (capital / 1000) * TAXA_POR_MIL;
    if (sim.coberturaCancer) total += PRECO_COBERTURA_OPCIONAL.coberturaCancer;
    if (sim.coberturaMorteAcidental) total += PRECO_COBERTURA_OPCIONAL.coberturaMorteAcidental;
    for (const a of ASSISTENCIAS_VIDA) {
      if (sim.assistencias[a.codigo]) total += a.precoMensal;
    }

    return {
      sim,
      atualizar: (mudanca) => setSim((atual) => ({ ...atual, ...mudanca })),
      alternarAssistencia: (codigo) =>
        setSim((atual) => ({
          ...atual,
          assistencias: { ...atual.assistencias, [codigo]: !atual.assistencias[codigo] },
        })),
      limiteCapital,
      capitalSugerido,
      totalMensal: total,
      protocolo: '139774',
    };
  }, [sim]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useVida(): VidaContexto {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useVida precisa estar dentro de <VidaProvider>');
  return ctx;
}

/** "R$ 288.000" — capital, sem centavos, como a loja mostra. */
export function formatarCapital(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

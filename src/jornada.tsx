import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Estado que atravessa a jornada do Odonto.
 *
 * Existe por causa de duas propostas da pesquisa de carrinho abandonado
 * (07/08/2026) — ver "Propostas da pesquisa" no README:
 *
 * 1. Perguntar o número de pessoas LOGO NO INÍCIO, para o preço exibido já ser
 *    o real. Hoje o usuário vê "R$ 33,50", se ancora nesse valor e só descobre
 *    o aumento na última etapa, ao adicionar dependentes.
 * 2. Manter a cotação em andamento acessível SEM depender de login, como o
 *    carrinho de um e-commerce.
 */

export type PlanoEscolhido = {
  nome: string;
  /** Mensalidade por pessoa, em reais. */
  precoPorPessoa: number;
  registro: string;
} | null;

type JornadaValor = {
  pessoas: number;
  setPessoas: (n: number) => void;
  planoEscolhido: PlanoEscolhido;
  escolherPlano: (plano: PlanoEscolhido) => void;
  /** Rota onde a cotação parou, para o "Retomar" do carrinho. */
  ultimaEtapa: string;
  registrarEtapa: (rota: string) => void;
  temCotacaoEmAndamento: boolean;
};

const MIN_PESSOAS = 1;
const MAX_PESSOAS = 10;

const JornadaContexto = createContext<JornadaValor | null>(null);

export function JornadaProvider({ children }: { children: ReactNode }) {
  const [pessoas, definirPessoas] = useState(1);
  const [planoEscolhido, setPlanoEscolhido] = useState<PlanoEscolhido>(null);
  const [ultimaEtapa, setUltimaEtapa] = useState('/odonto-2');

  const setPessoas = useCallback((n: number) => {
    definirPessoas(Math.min(MAX_PESSOAS, Math.max(MIN_PESSOAS, n)));
  }, []);

  const escolherPlano = useCallback((plano: PlanoEscolhido) => setPlanoEscolhido(plano), []);
  const registrarEtapa = useCallback((rota: string) => setUltimaEtapa(rota), []);

  const valor = useMemo<JornadaValor>(
    () => ({
      pessoas,
      setPessoas,
      planoEscolhido,
      escolherPlano,
      ultimaEtapa,
      registrarEtapa,
      temCotacaoEmAndamento: planoEscolhido !== null,
    }),
    [pessoas, setPessoas, planoEscolhido, escolherPlano, ultimaEtapa, registrarEtapa],
  );

  return <JornadaContexto.Provider value={valor}>{children}</JornadaContexto.Provider>;
}

export function useJornada(): JornadaValor {
  const ctx = useContext(JornadaContexto);
  if (!ctx) throw new Error('useJornada precisa estar dentro de <JornadaProvider>');
  return ctx;
}

export { MIN_PESSOAS, MAX_PESSOAS };

/** 33.5 -> "R$ 33,50" */
export function formatarBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** "1 pessoa" / "3 pessoas" */
export function rotuloPessoas(n: number): string {
  return n === 1 ? '1 pessoa' : `${n} pessoas`;
}

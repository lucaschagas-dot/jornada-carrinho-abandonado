import { useEffect, useMemo, useState } from 'react';
import { ResumoVida } from '../components/ResumoVida';
import { ChevronDownIcon, ChevronUpIcon } from '../components/icons';
import { formatarBRL } from '../jornada';
import { ASSISTENCIAS_VIDA, BENEFICIOS_VIDA, RECOMENDACAO_IA, type Assistencia } from '../vida';
import { useVida } from '../vidaEstado';
import s from './jornadaComum.module.css';
import p from './VidaAssistencias.module.css';

/**
 * Vida — Benefícios e assistências 3/10.
 *
 * Réplica da etapa da loja, inclusive da recomendação por IA (lista ordenada
 * por score, com justificativa e o crédito ao Gemini) e da primeira da lista
 * já marcada.
 *
 * Ajuste da pesquisa de carrinho abandonado: quando a cotação perguntou sobre
 * pet e veículo, o que a pessoa declarou substitui o palpite da IA — as
 * assistências correspondentes sobem com selo, e as que não batem com o perfil
 * saem da lista principal.
 */

const scoreDe = (codigo: string) => RECOMENDACAO_IA[codigo]?.score ?? 0;

const SELO_PERFIL: Record<string, string> = {
  pet: 'Você informou ter pet',
  auto: 'Você informou ter veículo',
};

const JUSTIFICATIVA_PERFIL: Record<string, string> = {
  pet: 'Você nos disse que tem um animal de estimação.',
  auto: 'Você nos disse que tem um veículo.',
};

export default function VidaAssistencias() {
  const { sim, atualizar, alternarAssistencia } = useVida();
  const [abertos, setAbertos] = useState<Record<string, boolean>>({});
  const [verOutras, setVerOutras] = useState(false);

  const alternarDetalhe = (codigo: string) => setAbertos((atual) => ({ ...atual, [codigo]: !atual[codigo] }));

  // Na loja, a assistência mais recomendada já chega marcada. Só vale para quem
  // ainda não mexeu na lista, para não remarcar o que a pessoa desmarcou.
  useEffect(() => {
    if (Object.keys(sim.assistencias).length > 0) return;
    const maisRecomendada = [...ASSISTENCIAS_VIDA].sort((a, b) => scoreDe(b.codigo) - scoreDe(a.codigo))[0];
    if (maisRecomendada) atualizar({ assistencias: { [maisRecomendada.codigo]: true } });
  }, []);

  const { principais, foraDoPerfil, confirmadasPorPerfil } = useMemo(() => {
    const respostaDoPerfil = (dependeDePerfil?: Assistencia['dependeDePerfil']) => {
      if (dependeDePerfil === 'pet') return sim.temPet;
      if (dependeDePerfil === 'auto') return sim.temVeiculo;
      return null;
    };

    // Perfil declarado vence palpite da IA: quem disse "sim" sobe com selo, quem
    // disse "não" sai da lista principal — a loja hoje só chuta ("caso você tenha").
    const confirmadas = ASSISTENCIAS_VIDA.filter((a) => respostaDoPerfil(a.dependeDePerfil) === true);
    const negadas = ASSISTENCIAS_VIDA.filter((a) => respostaDoPerfil(a.dependeDePerfil) === false);
    const neutras = ASSISTENCIAS_VIDA.filter((a) => respostaDoPerfil(a.dependeDePerfil) === null);

    const porScore = (a: Assistencia, b: Assistencia) => scoreDe(b.codigo) - scoreDe(a.codigo);

    return {
      principais: [...confirmadas.sort(porScore), ...neutras.sort(porScore)],
      foraDoPerfil: negadas.sort(porScore),
      confirmadasPorPerfil: new Set(confirmadas.map((a) => a.codigo)),
    };
  }, [sim.temPet, sim.temVeiculo]);

  const linhaAssistencia = (assistencia: Assistencia, comRelevancia: boolean) => {
    const { codigo, titulo, descricao, precoMensal, dependeDePerfil } = assistencia;
    const marcada = Boolean(sim.assistencias[codigo]);
    const aberta = Boolean(abertos[codigo]);
    const score = scoreDe(codigo);

    const perfilConfirmado = dependeDePerfil !== undefined && confirmadasPorPerfil.has(codigo);
    const justificativa =
      perfilConfirmado && dependeDePerfil
        ? JUSTIFICATIVA_PERFIL[dependeDePerfil]
        : RECOMENDACAO_IA[codigo]?.justificativa;

    return (
      <div className={`${s.checkRow} ${marcada ? s.checkRowMarcada : ''}`} key={codigo}>
        <input
          id={`assistencia-${codigo}`}
          type="checkbox"
          className={s.checkbox}
          checked={marcada}
          onChange={() => alternarAssistencia(codigo)}
        />
        <div className={p.conteudo}>
          <div className={p.linhaTitulo}>
            <label htmlFor={`assistencia-${codigo}`} className={s.checkTitulo}>
              {titulo}
            </label>
            {/* Quando o perfil foi declarado, o score da IA sai de cena: exibir
                "20% recomendado" ao lado de "Você informou ter pet" e o palpite
                desmentindo o fato que a pessoa acabou de contar. */}
            {comRelevancia && !perfilConfirmado && (
              <>
                <span className={p.barra} aria-hidden="true">
                  <span className={p.barraPreenchida} style={{ width: `${score}%` }} />
                </span>
                <span className={p.score}>{score}% recomendado</span>
              </>
            )}
            <span className={p.preco}>{formatarBRL(precoMensal)}/mês</span>
          </div>

          {perfilConfirmado && dependeDePerfil && <span className={s.selo}>{SELO_PERFIL[dependeDePerfil]}</span>}

          {comRelevancia && justificativa && <p className={p.justificativa}>{justificativa}</p>}

          <button
            type="button"
            className={p.maisDetalhes}
            aria-expanded={aberta}
            onClick={() => alternarDetalhe(codigo)}
          >
            mais detalhes
            {aberta ? <ChevronUpIcon size={10} /> : <ChevronDownIcon size={10} />}
          </button>

          {aberta && <p className={s.checkDescricao}>{descricao}</p>}
        </div>
      </div>
    );
  };

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Benefícios e assistências</h1>
          <p className={s.subtitle}>
            A Seguros Unimed oferece benefícios e assistências pra cada momento da sua vida.
          </p>

          <p className={s.pergunta}>Benefícios inclusos</p>
          <p className={p.avisoInclusos}>Já fazem parte do seu seguro, sem custo adicional.</p>
          <div className={s.card}>
            {BENEFICIOS_VIDA.map((beneficio) => {
              const aberto = Boolean(abertos[beneficio.codigo]);
              return (
                <div className={s.checkRow} key={beneficio.codigo}>
                  <span className={p.marcaInclusa} aria-hidden="true" />
                  <div className={p.conteudo}>
                    <div className={p.linhaTitulo}>
                      <span className={s.checkTitulo}>{beneficio.titulo}</span>
                      <span className={p.precoIncluso}>Incluso</span>
                    </div>
                    <button
                      type="button"
                      className={p.maisDetalhes}
                      aria-expanded={aberto}
                      onClick={() => alternarDetalhe(beneficio.codigo)}
                    >
                      mais detalhes
                      {aberto ? <ChevronUpIcon size={10} /> : <ChevronDownIcon size={10} />}
                    </button>
                    {aberto && <p className={s.checkDescricao}>{beneficio.descricao}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <p className={s.pergunta}>Assistências opcionais</p>
          <p className={p.avisoIa}>Esta lista foi organizada por relevância com base no seu perfil.</p>
          <p className={p.creditoIa}>Tecnologia de recomendação por IA. Powered by Google Gemini</p>

          <div className={s.card}>{principais.map((assistencia) => linhaAssistencia(assistencia, true))}</div>

          {foraDoPerfil.length > 0 && (
            <div className={p.outras}>
              <button
                type="button"
                className={p.outrasBotao}
                aria-expanded={verOutras}
                onClick={() => setVerOutras((v) => !v)}
              >
                Ver outras assistências ({foraDoPerfil.length})
                {verOutras ? <ChevronUpIcon size={12} /> : <ChevronDownIcon size={12} />}
              </button>

              {verOutras && (
                <div className={s.card}>
                  <p className={s.checkDescricao}>
                    Não recomendamos estas porque não combinam com o perfil que você informou, mas você pode incluir.
                  </p>
                  {foraDoPerfil.map((assistencia) => linhaAssistencia(assistencia, false))}
                </div>
              )}
            </div>
          )}

          <p className={s.legal}>
            As assistências são serviços prestados por empresas parceiras e podem ser canceladas a qualquer momento.
          </p>
        </div>

        <ResumoVida continuarPara="/vida-composicao" />
      </div>
    </section>
  );
}

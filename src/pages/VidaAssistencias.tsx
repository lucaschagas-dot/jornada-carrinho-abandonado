import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { formatarBRL } from '../jornada';
import { ASSISTENCIAS_VIDA, BENEFICIOS_VIDA, COBERTURAS_VIDA } from '../vida';
import s from './jornadaComum.module.css';

/**
 * Vida — Assistências 3/10.
 *
 * Dois ajustes da pesquisa de carrinho abandonado (07/08/2026):
 *
 * 1. As assistências de uso amplo chegam MARCADAS. Hoje todas vêm desmarcadas,
 *    e a inércia joga contra a contratação: "aquilo que tá marcado, as pessoas
 *    vão ter menos vontade de deselecionar".
 * 2. As de perfil específico (pet, automotiva) só são sugeridas se o perfil
 *    informado na cotação bater. Hoje a recomendação por IA sugere assistência
 *    para cachorro a quem nunca disse ter cachorro.
 */
export default function VidaAssistencias() {
  const { state } = useLocation() as { state: { temPet?: boolean; temVeiculo?: boolean } | null };
  const temPet = state?.temPet ?? false;
  const temVeiculo = state?.temVeiculo ?? false;

  const perfilAtende = (dependeDePerfil?: 'pet' | 'auto') => {
    if (dependeDePerfil === 'pet') return temPet;
    if (dependeDePerfil === 'auto') return temVeiculo;
    return true;
  };

  const [marcadas, setMarcadas] = useState<Set<string>>(
    () =>
      new Set(
        ASSISTENCIAS_VIDA.filter((a) => a.marcadaPorPadrao && perfilAtende(a.dependeDePerfil)).map((a) => a.codigo),
      ),
  );

  const alternar = (codigo: string) =>
    setMarcadas((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(codigo)) proximo.delete(codigo);
      else proximo.add(codigo);
      return proximo;
    });

  // Assistências de perfil só entram na lista se o perfil bater — o resto fica
  // num bloco separado, para quem quiser buscar.
  const sugeridas = ASSISTENCIAS_VIDA.filter((a) => perfilAtende(a.dependeDePerfil));
  const foraDoPerfil = ASSISTENCIAS_VIDA.filter((a) => !perfilAtende(a.dependeDePerfil));

  const totalAssistencias = useMemo(
    () => ASSISTENCIAS_VIDA.filter((a) => marcadas.has(a.codigo)).reduce((soma, a) => soma + a.precoMensal, 0),
    [marcadas],
  );

  const [mostrarOutras, setMostrarOutras] = useState(false);

  return (
    <section className={s.wrapper}>
      <StepBreadcrumb category="Seguro de vida" step="Assistências" current={3} total={10} />

      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Assistências</h1>
          <p className={s.subtitle}>
            Selecionamos as que costumam fazer sentido para o seu perfil — já vêm marcadas. Desmarque o que não quiser.
          </p>

          <div className={s.card}>
            {sugeridas.map((assistencia) => {
              const marcada = marcadas.has(assistencia.codigo);
              return (
                <label className={`${s.checkRow} ${marcada ? s.checkRowMarcada : ''}`} key={assistencia.codigo}>
                  <input
                    type="checkbox"
                    className={s.checkbox}
                    checked={marcada}
                    onChange={() => alternar(assistencia.codigo)}
                  />
                  <span className={s.checkTexto}>
                    <span className={s.checkTitulo}>
                      {assistencia.titulo} · {formatarBRL(assistencia.precoMensal)}/mês
                    </span>
                    <span className={s.checkDescricao}>{assistencia.descricao}</span>
                    {assistencia.dependeDePerfil === 'pet' && <span className={s.selo}>Você informou ter pet</span>}
                    {assistencia.dependeDePerfil === 'auto' && <span className={s.selo}>Você informou ter veículo</span>}
                  </span>
                </label>
              );
            })}
          </div>

          {foraDoPerfil.length > 0 && (
            <>
              {!mostrarOutras ? (
                <button type="button" className={s.linkDiscreto} onClick={() => setMostrarOutras(true)}>
                  Ver outras {foraDoPerfil.length} assistências disponíveis
                </button>
              ) : (
                <div className={s.card}>
                  <p className={s.checkDescricao}>
                    Estas não entraram na sugestão porque não combinam com o perfil que você informou, mas você pode
                    incluir.
                  </p>
                  {foraDoPerfil.map((assistencia) => {
                    const marcada = marcadas.has(assistencia.codigo);
                    return (
                      <label className={`${s.checkRow} ${marcada ? s.checkRowMarcada : ''}`} key={assistencia.codigo}>
                        <input
                          type="checkbox"
                          className={s.checkbox}
                          checked={marcada}
                          onChange={() => alternar(assistencia.codigo)}
                        />
                        <span className={s.checkTexto}>
                          <span className={s.checkTitulo}>
                            {assistencia.titulo} · {formatarBRL(assistencia.precoMensal)}/mês
                          </span>
                          <span className={s.checkDescricao}>{assistencia.descricao}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </>
          )}

          <p className={s.pergunta}>Já incluídos no seu plano, sem custo</p>
          <div className={s.card}>
            {BENEFICIOS_VIDA.map((beneficio) => (
              <p className={s.checkTitulo} key={beneficio.codigo}>
                {beneficio.titulo}
              </p>
            ))}
          </div>
        </div>

        <aside className={s.resumo}>
          <p className={s.resumoTitulo}>Sua compra</p>

          {COBERTURAS_VIDA.filter((c) => !c.opcional).map((c) => (
            <p className={s.resumoLinha} key={c.codigo}>
              <span>{c.titulo}</span>
              <span>Incluída</span>
            </p>
          ))}

          <p className={s.resumoLinha}>
            <span>Assistências</span>
            <span>{marcadas.size} selecionadas</span>
          </p>

          <p className={s.resumoTotal}>
            <span>Assistências/mês</span>
            <span>{formatarBRL(totalAssistencias)}</span>
          </p>

          <div className={s.acoes}>
            <Link to="/vida-dps" className={s.botaoPrimario}>
              Continuar
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

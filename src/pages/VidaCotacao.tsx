import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { DEMO_USER } from '../demoUser';
import { PROFISSOES, SUGESTOES_PROFISSAO } from '../vida';
import s from './jornadaComum.module.css';
import p from './VidaCotacao.module.css';

type Sexo = 'masculino' | 'feminino' | null;
type SimNao = 'sim' | 'nao' | null;

/**
 * Vida — Cotação 1/10.
 *
 * Réplica do formulário progressivo da loja (cada resposta revela a próxima
 * pergunta), com dois ajustes da pesquisa de carrinho abandonado:
 *
 * 1. Saída para profissão não listada. Hoje, quem não acha a própria profissão
 *    encontra só o silêncio e desiste — "a plataforma não fala nada, fica em
 *    silêncio, não aparece um texto".
 * 2. Coleta sutil de perfil (pet/veículo) já aqui, para a recomendação de
 *    assistências parar de sugerir item aleatório mais adiante.
 */
export default function VidaCotacao() {
  const [sexo, setSexo] = useState<Sexo>(null);
  const [nascimentoConfere, setNascimentoConfere] = useState<SimNao>(null);
  const [buscaProfissao, setBuscaProfissao] = useState('');
  const [profissao, setProfissao] = useState('');
  const [renda, setRenda] = useState('');
  const [temPet, setTemPet] = useState<SimNao>(null);
  const [temVeiculo, setTemVeiculo] = useState<SimNao>(null);

  const encontradas = useMemo(() => {
    const termo = buscaProfissao.trim().toLowerCase();
    if (!termo) return [];
    return PROFISSOES.filter((prof) => prof.toLowerCase().includes(termo)).slice(0, 6);
  }, [buscaProfissao]);

  const sugestoes = useMemo(() => {
    const termo = buscaProfissao.trim().toLowerCase();
    if (!termo || encontradas.length > 0) return [];
    const chave = Object.keys(SUGESTOES_PROFISSAO).find((k) => termo.includes(k) || k.includes(termo));
    return chave ? SUGESTOES_PROFISSAO[chave] : [];
  }, [buscaProfissao, encontradas]);

  const semResultado = buscaProfissao.trim().length > 2 && encontradas.length === 0;
  const podeContinuar = sexo !== null && nascimentoConfere !== null && profissao !== '' && renda.trim() !== '';

  return (
    <section className={s.wrapper}>
      <StepBreadcrumb category="Seguro de vida" step="Cotação" current={1} total={10} />

      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Cotação</h1>
          <p className={s.subtitle}>Encontre o melhor seguro para a sua vida.</p>

          <p className={s.pergunta}>Qual é o seu sexo?</p>
          <div className={s.toggleGrupo}>
            <button
              type="button"
              aria-pressed={sexo === 'masculino'}
              className={`${s.toggle} ${sexo === 'masculino' ? s.toggleAtivo : ''}`}
              onClick={() => setSexo('masculino')}
            >
              Masculino
            </button>
            <button
              type="button"
              aria-pressed={sexo === 'feminino'}
              className={`${s.toggle} ${sexo === 'feminino' ? s.toggleAtivo : ''}`}
              onClick={() => setSexo('feminino')}
            >
              Feminino
            </button>
          </div>

          {sexo && (
            <>
              <p className={s.pergunta}>Você nasceu em {DEMO_USER.dataNascimento}?</p>
              <div className={s.toggleGrupo}>
                <button
                  type="button"
                  aria-pressed={nascimentoConfere === 'nao'}
                  className={`${s.toggle} ${nascimentoConfere === 'nao' ? s.toggleAtivo : ''}`}
                  onClick={() => setNascimentoConfere('nao')}
                >
                  Não
                </button>
                <button
                  type="button"
                  aria-pressed={nascimentoConfere === 'sim'}
                  className={`${s.toggle} ${nascimentoConfere === 'sim' ? s.toggleAtivo : ''}`}
                  onClick={() => setNascimentoConfere('sim')}
                >
                  Sim
                </button>
              </div>
            </>
          )}

          {nascimentoConfere && (
            <>
              <p className={s.pergunta}>Qual a sua profissão?</p>
              <div className={p.buscaProfissao}>
                <input
                  className={s.input}
                  type="text"
                  placeholder="Digite para buscar"
                  value={profissao || buscaProfissao}
                  onChange={(e) => {
                    setBuscaProfissao(e.target.value);
                    setProfissao('');
                  }}
                />

                {encontradas.length > 0 && !profissao && (
                  <ul className={p.opcoes}>
                    {encontradas.map((prof) => (
                      <li key={prof}>
                        <button type="button" className={p.opcao} onClick={() => setProfissao(prof)}>
                          {prof}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Ajuste da pesquisa: em vez do silêncio, oferecer saída. */}
                {semResultado && !profissao && (
                  <div className={p.semResultado}>
                    <p className={p.semResultadoTitulo}>
                      Não encontramos {buscaProfissao.trim()} na nossa lista.
                    </p>

                    {sugestoes.length > 0 && (
                      <>
                        <p className={p.semResultadoTexto}>Alguma destas se aproxima do que você faz?</p>
                        <div className={p.sugestoes}>
                          {sugestoes.map((sug) => (
                            <button type="button" key={sug} className={p.sugestao} onClick={() => setProfissao(sug)}>
                              {sug}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    <p className={p.semResultadoTexto}>
                      Se nenhuma servir, você pode{' '}
                      <button type="button" className={p.linkInline} onClick={() => setProfissao('Outros')}>
                        seguir como Outros
                      </button>{' '}
                      — um corretor confirma a classificação antes da emissão, sem travar sua cotação.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {profissao && (
            <>
              <p className={s.pergunta}>Qual a sua renda mensal?</p>
              <input
                className={s.input}
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={renda}
                onChange={(e) => setRenda(e.target.value)}
              />

              {/* Coleta sutil para as assistências (proposta da pesquisa). */}
              <p className={s.pergunta}>Só mais duas perguntas rápidas</p>
              <p className={s.subtitle}>
                Servem para recomendarmos assistências que fazem sentido para você, em vez de uma lista genérica.
              </p>

              <p className={p.perguntaMenor}>Você tem animal de estimação?</p>
              <div className={s.toggleGrupo}>
                <button
                  type="button"
                  aria-pressed={temPet === 'sim'}
                  className={`${s.toggle} ${temPet === 'sim' ? s.toggleAtivo : ''}`}
                  onClick={() => setTemPet('sim')}
                >
                  Sim
                </button>
                <button
                  type="button"
                  aria-pressed={temPet === 'nao'}
                  className={`${s.toggle} ${temPet === 'nao' ? s.toggleAtivo : ''}`}
                  onClick={() => setTemPet('nao')}
                >
                  Não
                </button>
              </div>

              <p className={p.perguntaMenor}>Você tem veículo?</p>
              <div className={s.toggleGrupo}>
                <button
                  type="button"
                  aria-pressed={temVeiculo === 'sim'}
                  className={`${s.toggle} ${temVeiculo === 'sim' ? s.toggleAtivo : ''}`}
                  onClick={() => setTemVeiculo('sim')}
                >
                  Sim
                </button>
                <button
                  type="button"
                  aria-pressed={temVeiculo === 'nao'}
                  className={`${s.toggle} ${temVeiculo === 'nao' ? s.toggleAtivo : ''}`}
                  onClick={() => setTemVeiculo('nao')}
                >
                  Não
                </button>
              </div>
            </>
          )}
        </div>

        <aside className={s.resumo}>
          <p className={s.resumoTitulo}>Sua compra</p>
          {!podeContinuar ? (
            <p className={s.resumoVazio}>Todos os dados relativos à sua compra serão exibidos aqui.</p>
          ) : (
            <>
              <p className={s.resumoLinha}>
                <span>Profissão</span>
                <span>{profissao}</span>
              </p>
              <p className={s.resumoLinha}>
                <span>Renda informada</span>
                <span>{renda}</span>
              </p>
            </>
          )}

          <div className={s.acoes}>
            {podeContinuar ? (
              <Link
                to="/vida-assistencias"
                className={s.botaoPrimario}
                state={{ temPet: temPet === 'sim', temVeiculo: temVeiculo === 'sim' }}
              >
                Continuar
              </Link>
            ) : (
              <button type="button" className={s.botaoPrimario} disabled>
                Continuar
              </button>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

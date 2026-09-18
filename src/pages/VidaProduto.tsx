import { useEffect, useState, type CSSProperties } from 'react';
import { ResumoVida } from '../components/ResumoVida';
import { ChevronDownIcon } from '../components/icons';
import { formatarBRL } from '../jornada';
import { CAPITAL_MINIMO, CAPITAL_PASSO, COBERTURAS_VIDA, FUNERAL_CAPITAL_FIXO, TAXA_POR_MIL } from '../vida';
import { formatarCapital, useVida } from '../vidaEstado';
import s from './jornadaComum.module.css';
import p from './VidaProduto.module.css';

/**
 * Vida — Coberturas 2/10.
 *
 * A escolha do capital é feita em três cards, como nos combos do Residencial e
 * nos planos do Odonto: cada um mostra o valor coberto, a mensalidade e o que
 * já vem incluído, e o card inteiro é o alvo do clique.
 *
 * PROPOSTA: a loja resolve isso num slider contínuo de R$ 1.000 em R$ 1.000,
 * que obriga a pessoa a descobrir sozinha quanto contratar. Os três valores
 * saem do que a própria loja já calcula (36x a renda, dentro do teto da
 * profissão) — o do meio é a sugestão dela, marcada como recomendada. Quem
 * quiser outro valor continua podendo: o slider vive atrás de um link
 * discreto, no mesmo lugar em que o Residencial guarda a personalização.
 *
 * A lista de baixo não mudou: as três coberturas obrigatórias aparecem só com
 * o check, as duas opcionais têm caixa de seleção, e os valores acompanham o
 * capital escolhido.
 */
export default function VidaProduto() {
  const { sim, atualizar, limiteCapital, capitalSugerido } = useVida();
  const [detalhesAbertos, setDetalhesAbertos] = useState<string[]>([]);
  const [outroValor, setOutroValor] = useState(false);

  // Quem cai direto aqui pelo menu Telas não passou pela cotação e chegaria com
  // o capital zerado — o slider precisa de um ponto de partida. E se a pessoa
  // voltou e trocou de profissão, o teto pode ter caído abaixo do que ela já
  // tinha escolhido; sem isso o resumo lateral discordaria do slider.
  useEffect(() => {
    if (sim.capitalSegurado === 0) atualizar({ capitalSegurado: capitalSugerido });
    else if (sim.capitalSegurado > limiteCapital) atualizar({ capitalSegurado: limiteCapital });
  }, [sim.capitalSegurado, capitalSugerido, limiteCapital, atualizar]);

  const capital = Math.min(sim.capitalSegurado || capitalSugerido, limiteCapital);
  const faixa = Math.max(limiteCapital - CAPITAL_MINIMO, CAPITAL_PASSO);
  const preenchido = ((capital - CAPITAL_MINIMO) / faixa) * 100;

  const faixas = faixasDeCapital(capitalSugerido, limiteCapital);
  // A recomendada é a mais perto do que a loja sugere para a renda informada.
  const faixaRecomendada = faixas.reduce((melhor, atual) =>
    Math.abs(atual - capitalSugerido) < Math.abs(melhor - capitalSugerido) ? atual : melhor,
  );

  const alternarDetalhes = (codigo: string) =>
    setDetalhesAbertos((abertos) =>
      abertos.includes(codigo) ? abertos.filter((c) => c !== codigo) : [...abertos, codigo],
    );

  const opcionalMarcada = (codigo: string) =>
    codigo === 'coberturaCancer' ? sim.coberturaCancer : sim.coberturaMorteAcidental;

  const alternarOpcional = (codigo: string) => {
    if (codigo === 'coberturaCancer') atualizar({ coberturaCancer: !sim.coberturaCancer });
    if (codigo === 'coberturaMorteAcidental') atualizar({ coberturaMorteAcidental: !sim.coberturaMorteAcidental });
  };

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Coberturas</h1>
          <p className={s.pergunta}>Defina o valor do seu seguro</p>
          <p className={s.subtitle}>Este é o valor máximo que você estará coberto.</p>

          <div className={p.grid}>
            {faixas.map((valorFaixa, indice) => {
              const escolhida = capital === valorFaixa;
              const recomendada = valorFaixa === faixaRecomendada;
              return (
                <button
                  type="button"
                  key={valorFaixa}
                  aria-pressed={escolhida}
                  className={`${p.card} ${escolhida ? p.cardEscolhido : ''}`}
                  onClick={() => atualizar({ capitalSegurado: valorFaixa })}
                >
                  <span className={p.faixaTopo}>
                    <span className={p.faixaNome}>{NOMES_FAIXA[indice] ?? `Opção ${indice + 1}`}</span>
                    {recomendada && <span className={p.selo}>RECOMENDADO</span>}
                  </span>

                  <span className={p.faixaRotulo}>Capital segurado</span>
                  <span className={p.faixaCapital}>{formatarCapital(valorFaixa)}</span>
                  <span className={p.faixaMensal}>
                    {formatarBRL(mensalidadeDoCapital(valorFaixa))}
                    <span className={p.faixaPorMes}>/mês</span>
                  </span>

                  <span className={p.faixaCabecalho}>Já incluso</span>
                  <span className={p.faixaLista}>
                    {COBERTURAS_VIDA.filter((c) => !c.opcional).map((cobertura) => (
                      <span className={p.faixaItem} key={cobertura.codigo}>
                        <IconeCheck size={14} />
                        <span className={p.faixaItemTitulo}>{cobertura.titulo}</span>
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mesma saída que o Residencial dá para quem quer montar tudo à mão:
              um link discreto, sem a força do CTA, que devolve o controle
              contínuo da loja a quem realmente quiser outro valor. */}
          <div className={p.outroValorRodape}>
            <button type="button" className={s.linkDiscreto} onClick={() => setOutroValor((atual) => !atual)}>
              {outroValor ? 'Voltar para os valores sugeridos' : 'Prefiro definir outro valor'}
            </button>
          </div>

          {outroValor && (
            <div className={s.card}>
              <div className={p.painelCapital}>
                <label className={p.capitalRotulo} htmlFor="capital-segurado">
                  Capital segurado
                </label>
                <span className={p.capitalValor}>{formatarCapital(capital)}</span>

                <input
                  id="capital-segurado"
                  type="range"
                  className={p.slider}
                  min={CAPITAL_MINIMO}
                  max={limiteCapital}
                  step={CAPITAL_PASSO}
                  value={capital}
                  aria-valuetext={formatarCapital(capital)}
                  onChange={(evento) => atualizar({ capitalSegurado: Number(evento.target.value) })}
                  style={{ '--preenchido': `${preenchido}%` } as CSSProperties}
                />

                <div className={p.limites}>
                  <span>{emMil(CAPITAL_MINIMO)}</span>
                  <span>{emMil(limiteCapital)}</span>
                </div>
              </div>
            </div>
          )}

          <p className={s.pergunta}>O que está coberto</p>

          <div className={s.card}>
            <div className={p.lista}>
              {COBERTURAS_VIDA.map((cobertura) => {
                const marcada = cobertura.opcional && opcionalMarcada(cobertura.codigo);
                const ativa = !cobertura.opcional || marcada;
                const aberta = detalhesAbertos.includes(cobertura.codigo);

                return (
                  <div className={`${p.cobertura} ${ativa ? p.coberturaAtiva : ''}`} key={cobertura.codigo}>
                    <div className={p.linha}>
                      {cobertura.opcional ? (
                        <label className={p.controle}>
                          <input
                            type="checkbox"
                            className={p.checkboxNativo}
                            checked={marcada}
                            aria-label={`Incluir a cobertura ${cobertura.titulo}`}
                            onChange={() => alternarOpcional(cobertura.codigo)}
                          />
                          <span className={p.caixa} aria-hidden="true">
                            {marcada && <IconeCheck size={14} />}
                          </span>
                        </label>
                      ) : (
                        <span className={p.marca} title="Cobertura sempre incluída">
                          <IconeCheck size={18} />
                        </span>
                      )}

                      <div className={p.texto}>
                        <p className={p.tituloCobertura}>{cobertura.titulo}</p>
                        <p className={p.subtituloCobertura}>{cobertura.subtitulo}</p>
                      </div>

                      <span className={p.valor}>{valorDaCobertura(cobertura.valor, capital)}</span>

                      <button
                        type="button"
                        className={p.detalhes}
                        aria-expanded={aberta}
                        onClick={() => alternarDetalhes(cobertura.codigo)}
                      >
                        {aberta ? 'menos detalhes' : 'mais detalhes'}
                        <ChevronDownIcon size={10} className={aberta ? `${p.seta} ${p.setaAberta}` : p.seta} />
                      </button>
                    </div>

                    {aberta && <p className={p.descricao}>{cobertura.descricao}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ResumoVida continuarPara="/vida-assistencias" />
      </div>
    </section>
  );
}

const NOMES_FAIXA = ['Essencial', 'Equilibrado', 'Ampliado'];

/** Mensalidade só das coberturas base — opcionais e assistências entram depois. */
function mensalidadeDoCapital(capital: number): number {
  return (capital / 1000) * TAXA_POR_MIL;
}

/**
 * Os três valores oferecidos nos cards, sempre múltiplos do passo da loja e
 * dentro do piso do produto e do teto da profissão.
 *
 * Partem da sugestão que a própria loja calcula (36x a renda). Quando renda
 * baixa ou teto apertado achatam os três num valor só, abre-se a faixa inteira
 * — assim a tela nunca cai para um card sozinho sem necessidade.
 */
function faixasDeCapital(sugerido: number, teto: number): number[] {
  const limitar = (valor: number) =>
    Math.min(Math.max(Math.round(valor / CAPITAL_PASSO) * CAPITAL_PASSO, CAPITAL_MINIMO), teto);

  const naSugestao = [...new Set([sugerido * 0.6, sugerido, sugerido * 1.5].map(limitar))];
  if (naSugestao.length === 3) return naSugestao.sort((a, b) => a - b);

  return [...new Set([CAPITAL_MINIMO, (CAPITAL_MINIMO + teto) / 2, teto].map(limitar))].sort((a, b) => a - b);
}

/** O valor de cada cobertura deriva do capital — ver `valor` em COBERTURAS_VIDA. */
function valorDaCobertura(base: string, capital: number): string {
  if (base === 'fixo10k') return formatarCapital(FUNERAL_CAPITAL_FIXO);
  if (base === 'dezPorCentoDoCapital') return formatarCapital(capital * 0.1);
  if (base === 'capitalEmDobro') return `+${formatarCapital(capital)}`;
  return formatarCapital(capital);
}

/** 400000 -> "R$ 400 mil" */
function emMil(valor: number): string {
  return `R$ ${(valor / 1000).toLocaleString('pt-BR')} mil`;
}

function IconeCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8.5 6.4 12 13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

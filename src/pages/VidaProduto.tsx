import { useEffect, useState, type CSSProperties } from 'react';
import { ResumoVida } from '../components/ResumoVida';
import { ChevronDownIcon } from '../components/icons';
import { CAPITAL_MINIMO, CAPITAL_PASSO, COBERTURAS_VIDA, FUNERAL_CAPITAL_FIXO } from '../vida';
import { formatarCapital, useVida } from '../vidaEstado';
import s from './jornadaComum.module.css';
import p from './VidaProduto.module.css';

/**
 * Vida — Coberturas 2/10.
 *
 * O slider de capital manda na tela: o valor grande no topo e os valores das
 * cinco coberturas se movem junto com ele, para a pessoa ver o que está
 * comprando enquanto arrasta. As três coberturas obrigatórias aparecem só com
 * o check, sem controle; as duas opcionais têm caixa de seleção e o preço
 * reage no resumo lateral.
 */
export default function VidaProduto() {
  const { sim, atualizar, limiteCapital, capitalSugerido } = useVida();
  const [detalhesAbertos, setDetalhesAbertos] = useState<string[]>([]);

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

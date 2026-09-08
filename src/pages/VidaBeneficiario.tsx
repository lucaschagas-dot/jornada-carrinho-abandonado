import { ResumoVida } from '../components/ResumoVida';
import { ChevronDownIcon } from '../components/icons';
import { GRAUS_BENEFICIARIO } from '../vida';
import { formatarCapital, useVida, type Beneficiario } from '../vidaEstado';
import s from './jornadaComum.module.css';
import p from './VidaBeneficiario.module.css';

/**
 * Vida — Beneficiários 7/10.
 *
 * A loja exige que a soma das participações feche exatamente 100%. O ajuste da
 * pesquisa é o atalho "Dividir igualmente entre todos" e a barra de saldo, que
 * mostra o quanto falta sem esperar o erro aparecer no envio.
 */
export default function VidaBeneficiario() {
  const { sim, atualizar } = useVida();
  const lista = sim.beneficiarios;

  const editar = (indice: number, mudanca: Partial<Beneficiario>) =>
    atualizar({ beneficiarios: lista.map((b, i) => (i === indice ? { ...b, ...mudanca } : b)) });

  const adicionar = () => atualizar({ beneficiarios: [...lista, { nome: '', grau: '', percentual: 0 }] });

  const remover = (indice: number) => atualizar({ beneficiarios: lista.filter((_, i) => i !== indice) });

  // Fechar 100% na mão é conta chata no meio da compra, e é onde a pessoa erra e trava.
  const dividirIgualmente = () => {
    if (lista.length === 0) return;
    const base = Math.floor(100 / lista.length);
    const resto = 100 - base * lista.length;
    atualizar({ beneficiarios: lista.map((b, i) => ({ ...b, percentual: i === 0 ? base + resto : base })) });
  };

  const digitarPercentual = (indice: number, texto: string) => {
    const digitos = texto.replace(/\D/g, '');
    editar(indice, { percentual: digitos === '' ? 0 : Math.min(Number(digitos), 100) });
  };

  const soma = lista.reduce((total, b) => total + b.percentual, 0);
  const completo = soma === 100;
  // Só a soma não basta: dava para avançar com nome e grau em branco.
  const identificados = lista.every((b) => b.nome.trim() !== '' && b.grau !== '');
  const podeAvancar = lista.length === 0 || (completo && identificados);

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Beneficiários</h1>
          <p className={s.subtitle}>Quem recebe a indenização, e quanto cada um recebe.</p>

          {lista.length > 0 && (
            <div className={p.saldo}>
              <div className={p.saldoTopo}>
                <span className={p.saldoNumero}>{soma}% distribuído</span>
                {completo && <span className={s.selo}>Tudo certo: 100% distribuído.</span>}
              </div>

              <div className={p.barra} aria-hidden="true">
                <span
                  className={completo ? `${p.barraPreenchida} ${p.barraCompleta}` : p.barraPreenchida}
                  style={{ width: `${Math.min(soma, 100)}%` }}
                />
              </div>

              <div aria-live="polite">
                {soma < 100 && <p className={p.saldoTexto}>Falta distribuir {100 - soma}%.</p>}
                {soma > 100 && (
                  <p className={s.avisoAtencao}>Você distribuiu {soma}%. O total não pode passar de 100%.</p>
                )}
              </div>
            </div>
          )}

          {lista.length === 0 ? (
            <div className={p.vazio}>
              <p className={p.vazioTitulo}>Você ainda não indicou nenhum beneficiário.</p>
              <p className={p.vazioTexto}>
                Indicar é opcional. Sem indicação, a indenização é paga aos herdeiros legais, na forma da lei.
              </p>
              <button type="button" className={s.botaoSecundario} onClick={adicionar}>
                Adicionar beneficiário
              </button>
            </div>
          ) : (
            <>
              <div className={p.lista}>
                {lista.map((beneficiario, indice) => (
                  <div className={s.card} key={indice}>
                    <div className={p.cabecalho}>
                      <span className={p.cabecalhoTitulo}>Beneficiário {indice + 1}</span>
                      <button type="button" className={p.remover} onClick={() => remover(indice)}>
                        Remover
                      </button>
                    </div>

                    <div className={p.campos}>
                      <label className={s.campo}>
                        <span className={s.label}>Nome completo</span>
                        <input
                          type="text"
                          className={s.input}
                          placeholder="Nome do beneficiário"
                          value={beneficiario.nome}
                          onChange={(e) => editar(indice, { nome: e.target.value })}
                        />
                      </label>

                      <label className={s.campo}>
                        <span className={s.label}>Grau de parentesco</span>
                        <span className={s.selectWrap}>
                          <select
                            className={s.select}
                            value={beneficiario.grau}
                            onChange={(e) => editar(indice, { grau: e.target.value })}
                          >
                            <option value="">Selecione</option>
                            {GRAUS_BENEFICIARIO.map((grau) => (
                              <option value={grau} key={grau}>
                                {grau}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon size={12} className={s.selectIcon} />
                        </span>
                      </label>

                      <label className={s.campo}>
                        <span className={s.label}>Participação</span>
                        <span className={p.campoPercentual}>
                          <input
                            type="text"
                            inputMode="numeric"
                            className={s.input}
                            placeholder="0"
                            value={beneficiario.percentual === 0 ? '' : String(beneficiario.percentual)}
                            onChange={(e) => digitarPercentual(indice, e.target.value)}
                          />
                          <span className={p.sufixo}>%</span>
                        </span>
                        {beneficiario.percentual > 0 && sim.capitalSegurado > 0 && (
                          <span className={p.valorEmReais}>
                            {formatarCapital((sim.capitalSegurado * beneficiario.percentual) / 100)}
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className={s.acoes}>
                <button type="button" className={s.botaoSecundario} onClick={adicionar}>
                  Adicionar beneficiário
                </button>
                <button type="button" className={s.linkDiscreto} onClick={dividirIgualmente}>
                  Dividir igualmente entre todos
                </button>
              </div>
            </>
          )}

          <p className={s.legal}>
            Você pode alterar os beneficiários depois da contratação, a qualquer momento, pela central de atendimento.
          </p>
        </div>

        <ResumoVida continuarPara={podeAvancar ? '/vida-dps' : undefined} />
      </div>
    </section>
  );
}

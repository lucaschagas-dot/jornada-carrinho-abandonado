import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResumoVida } from '../components/ResumoVida';
import { useVida } from '../vidaEstado';
import { DPS_PERGUNTAS } from '../vida';
import s from './jornadaComum.module.css';
import p from './VidaDps.module.css';

/**
 * Vida — Declaração Pessoal de Saúde 8/10.
 *
 * As 5 perguntas são as da loja. O ajuste da pesquisa é o "responder depois":
 * a DPS é longa e é onde parte das pessoas abandona, então o protótipo mostra
 * as duas portas — preencher agora ou adiar — com a consequência de adiar
 * escrita na tela, já que a hipótese tem implicação regulatória.
 */
export default function VidaDps() {
  const { sim, atualizar } = useVida();
  const [adiando, setAdiando] = useState(sim.dpsAdiada);

  const responder = (indice: number, valor: 'sim' | 'nao') => {
    const novas = [...sim.dpsRespostas];
    novas[indice] = valor;
    atualizar({ dpsRespostas: novas });
  };

  const respondidas = sim.dpsRespostas.filter((r) => r !== null).length;
  const completa = respondidas === DPS_PERGUNTAS.length;

  // Enquanto o painel de adiar está aberto o "Continuar" do resumo fica travado:
  // a saída é a confirmação explícita, que é onde está a consequência.
  const podeAvancar = completa || sim.dpsAdiada;

  const confirmarAdiar = () => atualizar({ dpsAdiada: true });

  // Responder tudo depois de ter adiado limpa a pendência — sem isto a tela de
  // Conclusão seguia cobrando uma declaração que já foi preenchida.
  useEffect(() => {
    if (completa && sim.dpsAdiada) atualizar({ dpsAdiada: false });
  }, [completa, sim.dpsAdiada, atualizar]);

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Declaração Pessoal de Saúde</h1>
          <p className={s.subtitle}>
            São {DPS_PERGUNTAS.length} perguntas. As respostas definem a aceitação do seguro, então vale responder com
            calma.
          </p>

          {!adiando ? (
            <>
              <div className={p.lista}>
                {DPS_PERGUNTAS.map((item, i) => {
                  const resposta = sim.dpsRespostas[i];
                  const pedeDetalhe = item.id === 5 && resposta === 'sim';

                  return (
                    <div className={p.item} key={item.id}>
                      <p className={p.enunciado} id={`dps-${item.id}`}>
                        {i + 1}. {item.pergunta}
                      </p>

                      {item.itens && (
                        <ul className={p.itens}>
                          {item.itens.map((doenca) => (
                            <li key={doenca}>{doenca}</li>
                          ))}
                        </ul>
                      )}

                      <div className={s.toggleGrupo} role="group" aria-labelledby={`dps-${item.id}`}>
                        <button
                          type="button"
                          aria-pressed={resposta === 'nao'}
                          className={`${s.toggle} ${resposta === 'nao' ? s.toggleAtivo : ''}`}
                          onClick={() => responder(i, 'nao')}
                        >
                          Não
                        </button>
                        <button
                          type="button"
                          aria-pressed={resposta === 'sim'}
                          className={`${s.toggle} ${resposta === 'sim' ? s.toggleAtivo : ''}`}
                          onClick={() => responder(i, 'sim')}
                        >
                          Sim
                        </button>
                      </div>

                      {pedeDetalhe && (
                        <div className={p.detalhe}>
                          <label className={s.label} htmlFor="dps-detalhe">
                            Descreva
                          </label>
                          <textarea
                            id="dps-detalhe"
                            className={p.textarea}
                            rows={3}
                            placeholder="Conte o que aconteceu, quando foi e se houve tratamento."
                            value={sim.dpsDetalhe}
                            onChange={(e) => atualizar({ dpsDetalhe: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className={p.progresso}>
                {respondidas} de {DPS_PERGUNTAS.length} respondidas
              </p>

              {/* Proposta da pesquisa: dar a saída de adiar em vez de perder a venda. */}
              <div className={s.acoes}>
                <button type="button" className={s.botaoSecundario} onClick={() => setAdiando(true)}>
                  Responder depois
                </button>
              </div>
            </>
          ) : (
            <div className={p.adiar}>
              <p className={p.adiarTitulo}>Você pode concluir a compra e responder a declaração depois.</p>
              <p className={p.adiarTexto}>
                Enviaremos o formulário por e-mail e WhatsApp. <strong>A apólice só é emitida após as respostas</strong> —
                até lá a cobertura não está ativa, e você pode pedir o estorno a qualquer momento.
              </p>

              <div className={s.acoes}>
                <Link to="/vida-pagamento" className={s.botaoPrimario} onClick={confirmarAdiar}>
                  Entendi, ir para o pagamento
                </Link>
                <button type="button" className={s.botaoSecundario} onClick={() => setAdiando(false)}>
                  Prefiro responder agora
                </button>
              </div>
            </div>
          )}
        </div>

        <ResumoVida continuarPara={podeAvancar ? '/vida-pagamento' : undefined} />
      </div>
    </section>
  );
}

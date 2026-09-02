import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DPS_PERGUNTAS } from '../vida';
import s from './jornadaComum.module.css';
import p from './VidaDps.module.css';

/**
 * Vida — Declaração Pessoal de Saúde 8/10.
 *
 * As 5 perguntas são as da loja. O ajuste da pesquisa aqui é o "responder
 * depois": a DPS é longa e cheia de decisão, e é onde parte das pessoas
 * abandona. A proposta discutida foi deixar pagar primeiro e completar depois
 * ("já paga aqui e depois você termina de preencher... se não preencher, não
 * vai receber a apólice").
 *
 * Como é uma hipótese com implicação regulatória, o protótipo mostra as duas
 * portas — seguir preenchendo agora, ou adiar — deixando explícita a
 * consequência de adiar.
 */
export default function VidaDps() {
  const [respostas, setRespostas] = useState<Record<number, 'sim' | 'nao'>>({});
  const [adiando, setAdiando] = useState(false);

  const responder = (indice: number, valor: 'sim' | 'nao') =>
    setRespostas((atual) => ({ ...atual, [indice]: valor }));

  const respondidas = Object.keys(respostas).length;
  const completa = respondidas === DPS_PERGUNTAS.length;

  return (
    <section className={s.wrapper}>
      <h1 className={s.title}>Declaração Pessoal de Saúde</h1>
      <p className={s.subtitle}>
        São {DPS_PERGUNTAS.length} perguntas. As respostas definem a aceitação do seguro, então vale responder com calma.
      </p>

      {!adiando ? (
        <>
          <div className={p.lista}>
            {DPS_PERGUNTAS.map((pergunta, i) => (
              <div className={p.item} key={i}>
                <p className={p.enunciado}>
                  {i + 1}. {pergunta}
                </p>
                <div className={s.toggleGrupo}>
                  <button
                    type="button"
                    aria-pressed={respostas[i] === 'nao'}
                    className={`${s.toggle} ${respostas[i] === 'nao' ? s.toggleAtivo : ''}`}
                    onClick={() => responder(i, 'nao')}
                  >
                    Não
                  </button>
                  <button
                    type="button"
                    aria-pressed={respostas[i] === 'sim'}
                    className={`${s.toggle} ${respostas[i] === 'sim' ? s.toggleAtivo : ''}`}
                    onClick={() => responder(i, 'sim')}
                  >
                    Sim
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className={p.progresso}>
            {respondidas} de {DPS_PERGUNTAS.length} respondidas
          </p>

          <div className={s.acoes}>
            {completa ? (
              <Link to="/vida-pagamento" className={s.botaoPrimario}>
                Continuar
              </Link>
            ) : (
              <button type="button" className={s.botaoPrimario} disabled>
                Continuar
              </button>
            )}

            {/* Proposta da pesquisa: dar a saída de adiar em vez de perder a venda. */}
            <button type="button" className={s.botaoSecundario} onClick={() => setAdiando(true)}>
              Responder depois
            </button>
          </div>
        </>
      ) : (
        <div className={p.adiar}>
          <p className={p.adiarTitulo}>Você pode concluir a compra e responder a declaração depois.</p>
          <p className={p.adiarTexto}>
            Enviaremos o formulário por e-mail e WhatsApp. <strong>A apólice só é emitida após as respostas</strong> — até
            lá a cobertura não está ativa, e você pode pedir o estorno a qualquer momento.
          </p>

          <div className={s.acoes}>
            <Link to="/vida-pagamento" className={s.botaoPrimario}>
              Entendi, ir para o pagamento
            </Link>
            <button type="button" className={s.botaoSecundario} onClick={() => setAdiando(false)}>
              Prefiro responder agora
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

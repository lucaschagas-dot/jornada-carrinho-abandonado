import { useState } from 'react';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { formatarBRL } from '../jornada';
import { COBERTURAS_VIDA } from '../vida';
import s from './jornadaComum.module.css';

type Forma = 'cartao' | 'boleto' | 'pix' | null;

const FORMAS: Array<{ id: Exclude<Forma, null>; rotulo: string }> = [
  { id: 'cartao', rotulo: 'Cartão de Crédito' },
  { id: 'boleto', rotulo: 'Boleto' },
  { id: 'pix', rotulo: 'Pix' },
];

/**
 * Vida — Pagamento 9/10.
 * Como nas outras jornadas, o protótipo para no momento em que os dados de
 * pagamento são solicitados.
 */
export default function VidaPagamento() {
  const [forma, setForma] = useState<Forma>(null);

  return (
    <section className={s.wrapper}>
      <StepBreadcrumb category="Seguro de vida" step="Pagamento" current={9} total={10} />

      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Pagamento</h1>
          <p className={s.subtitle}>Escolha a forma de pagamento e adicione os dados financeiros.</p>

          <div className={s.toggleGrupo}>
            {FORMAS.map((f) => (
              <button
                type="button"
                key={f.id}
                aria-pressed={forma === f.id}
                className={`${s.toggle} ${forma === f.id ? s.toggleAtivo : ''}`}
                onClick={() => setForma(f.id)}
              >
                {f.rotulo}
              </button>
            ))}
          </div>

          <div className={s.acoes}>
            <button type="button" className={s.botaoPrimario} disabled={forma === null}>
              Pagar
            </button>
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
          <p className={s.resumoTotal}>
            <span>Total/mês</span>
            <span>{formatarBRL(35)}</span>
          </p>
        </aside>
      </div>
    </section>
  );
}

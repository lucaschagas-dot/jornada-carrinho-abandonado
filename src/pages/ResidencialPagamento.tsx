import { useState } from 'react';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { formatarBRL } from '../jornada';
import { COMBOS } from '../residencial';
import s from './jornadaComum.module.css';

type Forma = 'cartao' | 'boleto' | 'pix' | null;

const FORMAS: Array<{ id: Exclude<Forma, null>; rotulo: string }> = [
  { id: 'cartao', rotulo: 'Cartão de Crédito' },
  { id: 'boleto', rotulo: 'Boleto' },
  { id: 'pix', rotulo: 'Pix' },
];

/**
 * Residencial — Pagamento 4/5.
 * Como no Odonto, o protótipo para no momento em que os dados de pagamento são
 * solicitados: não há formulário de cartão nem QR de Pix.
 */
export default function ResidencialPagamento() {
  const [forma, setForma] = useState<Forma>(null);
  const combo = COMBOS[0];

  return (
    <section className={s.wrapper}>
      <StepBreadcrumb category="Seguro Residencial" step="Pagamento" current={4} total={5} />

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
          <p className={s.resumoTitulo}>Resumo</p>
          <p className={s.resumoLinha}>
            <span>{combo.nome}</span>
            <span>{Object.keys(combo.coberturas).length} coberturas</span>
          </p>
          <p className={s.resumoLinha}>
            <span>Vigência</span>
            <span>12 meses</span>
          </p>
          <p className={s.resumoLinha}>
            <span>Valor anual</span>
            <span>{formatarBRL(combo.anual)}</span>
          </p>
          <p className={s.resumoTotal}>
            <span>Em até {combo.parcelas}x</span>
            <span>{formatarBRL(combo.mensal)}</span>
          </p>
        </aside>
      </div>
    </section>
  );
}

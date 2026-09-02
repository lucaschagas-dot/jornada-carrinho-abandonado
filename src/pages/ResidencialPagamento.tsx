import { BoletoIcon, CartaoIcon, FormasPagamento, PixIcon, type OpcaoPagamento } from '../components/FormasPagamento';
import { formatarBRL } from '../jornada';
import { COMBOS } from '../residencial';
import s from './jornadaComum.module.css';

// Cartão de crédito em primeiro lugar e já aberto (ver FormasPagamento).
const OPCOES: OpcaoPagamento[] = [
  {
    id: 'cartao',
    rotulo: 'Cartão de Crédito',
    descricao: 'Pague com segurança usando seu cartão Visa, Mastercard, Elo ou Amex.',
    icone: <CartaoIcon />,
  },
  { id: 'pix', rotulo: 'Pix', descricao: 'Pagamento à vista, confirmado na hora.', icone: <PixIcon /> },
  { id: 'boleto', rotulo: 'Boleto bancário', descricao: 'Vence em 3 dias úteis.', icone: <BoletoIcon /> },
];

/**
 * Residencial — Pagamento 4/5.
 * Usa o mesmo bloco de pagamento das outras jornadas: cartão primeiro e aberto.
 * Nada é enviado nem cobrado — o botão "Pagar" não tem ação.
 */
export default function ResidencialPagamento() {
  const combo = COMBOS[0];

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Pagamento</h1>
          <p className={s.subtitle}>Escolha a forma de pagamento e adicione os dados financeiros.</p>

          <FormasPagamento opcoes={OPCOES} total={combo.mensal} periodicidade={`/mês em até ${combo.parcelas}x`} />
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

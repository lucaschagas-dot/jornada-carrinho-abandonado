import { BoletoIcon, CartaoIcon, FormasPagamento, PixIcon, type OpcaoPagamento } from '../components/FormasPagamento';
import { formatarBRL } from '../jornada';
import { COBERTURAS_VIDA } from '../vida';
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
 * Vida — Pagamento 9/10.
 * Usa o mesmo bloco de pagamento das outras jornadas: cartão primeiro e aberto.
 * Nada é enviado nem cobrado — o botão "Pagar" não tem ação.
 */
export default function VidaPagamento() {

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Pagamento</h1>
          <p className={s.subtitle}>Escolha a forma de pagamento e adicione os dados financeiros.</p>

          <FormasPagamento opcoes={OPCOES} total={35} periodicidade="/mês" />
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

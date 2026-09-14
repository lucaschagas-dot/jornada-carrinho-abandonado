import { useRef } from 'react';
import { BoletoIcon, CartaoIcon, FormasPagamento, PixIcon, type OpcaoPagamento } from '../components/FormasPagamento';
import { ResumoResidencial } from '../components/ResumoResidencial';
import { COMBOS } from '../residencial';
import b from './residencialBarra.module.css';
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
  const blocoPagamento = useRef<HTMLDivElement>(null);

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Pagamento</h1>
          <p className={s.subtitle}>Escolha a forma de pagamento e adicione os dados financeiros.</p>

          <div ref={blocoPagamento}>
            <FormasPagamento opcoes={OPCOES} total={combo.mensal} periodicidade={`/mês em até ${combo.parcelas}x`} />
          </div>
        </div>

        {/* O "Pagar" continua dentro do FormasPagamento, onde mora o aceite que
            o habilita — duplicá-lo aqui criaria um botão de pagar sem o aceite.
            A barra leva a pessoa até ele, que no celular fica fora da tela. */}
        <ResumoResidencial combo={combo}>
          <button
            type="button"
            className={`${s.botaoPrimario} ${b.cta}`}
            onClick={() => blocoPagamento.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Ir para o pagamento
          </button>
        </ResumoResidencial>
      </div>
    </section>
  );
}

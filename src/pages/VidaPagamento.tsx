import { BoletoIcon, CartaoIcon, FormasPagamento, PixIcon, type OpcaoPagamento } from '../components/FormasPagamento';
import { ResumoVida } from '../components/ResumoVida';
import { useVida } from '../vidaEstado';
import { PAGAMENTO_VIDA } from '../vida';
import s from './jornadaComum.module.css';

/** Uma entrada por forma prevista no produto, ativa ou não. */
const FORMAS: Record<keyof typeof PAGAMENTO_VIDA, OpcaoPagamento> = {
  cartaoCredito: {
    id: 'cartao',
    rotulo: 'Cartão de Crédito',
    descricao: 'Pague com segurança usando seu cartão Visa, Mastercard, Elo ou Amex.',
    icone: <CartaoIcon />,
  },
  debitoAutomatico: {
    id: 'debito',
    rotulo: 'Débito automático',
    descricao: 'Cobrança mensal direto na conta corrente.',
    icone: <CartaoIcon />,
  },
  boleto: { id: 'boleto', rotulo: 'Boleto bancário', descricao: 'Vence em 3 dias úteis.', icone: <BoletoIcon /> },
  pix: { id: 'pix', rotulo: 'Pix', descricao: 'Pagamento à vista, confirmado na hora.', icone: <PixIcon /> },
};

// Derivado de PAGAMENTO_VIDA para a tela não divergir do dado: "Administrativo"
// é exclusivo do corretor e "Desativado" não existe — nem um nem outro chega ao
// cliente. Hoje isso deixa só o cartão de crédito.
const OPCOES: OpcaoPagamento[] = (Object.keys(FORMAS) as (keyof typeof PAGAMENTO_VIDA)[])
  .filter((forma) => PAGAMENTO_VIDA[forma] === 'Ativo')
  .map((forma) => FORMAS[forma]);

/**
 * Vida — Pagamento 9/10.
 * No Seguro de Vida o cartão de crédito é a única forma aberta ao cliente, e
 * mesmo assim a loja a apresenta como uma escolha entre várias. Aqui ela vem
 * primeira e já aberta, com uma nota dizendo o que existe mas não está à mão.
 * Nada é enviado nem cobrado — o botão "Pagar" não tem ação.
 */
export default function VidaPagamento() {
  const { totalMensal } = useVida();

  return (
    <section className={s.wrapper}>
      <div className={s.colunas}>
        <div className={s.principal}>
          <h1 className={s.title}>Pagamento</h1>
          <p className={s.subtitle}>Escolha a forma de pagamento e adicione os dados financeiros.</p>

          <FormasPagamento opcoes={OPCOES} total={totalMensal} periodicidade="/mês" />

          <p className={s.legal}>
            Boleto e débito automático existem no produto, mas só podem ser acionados por um corretor. Pix não está
            disponível para o Seguro de Vida.
          </p>
        </div>

        <ResumoVida continuarPara="/vida-confirmacao" rotuloContinuar="Concluir compra" />
      </div>
    </section>
  );
}

import { useState, type ReactNode } from 'react';
import { formatarBRL } from '../jornada';
import styles from './FormasPagamento.module.css';

// Ícones das formas de pagamento (o site usa Font Awesome, que não faz parte
// do projeto — ver README, "Decisões de fidelidade ao Figma").
export function CartaoIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 5.8h20" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 11.2h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function PixIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 1.4 16.6 9 9 16.6 1.4 9 9 1.4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 6h1.6L12 10.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function BoletoIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <path
        d="M2 1v14M5 1v14M7.5 1v14M11 1v14M13.5 1v14M18 1v14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Bandeiras aceitas. Texto, e não a arte oficial: são marcas de terceiros. */
const BANDEIRAS = ['Visa', 'Mastercard', 'Elo', 'Amex'];

export type OpcaoPagamento = {
  id: string;
  rotulo: string;
  descricao?: string;
  icone: ReactNode;
};

type FormasPagamentoProps = {
  /** A primeira opção da lista é a que abre selecionada. */
  opcoes: OpcaoPagamento[];
  /** Valor cobrado, já somado. Aparece dentro do botão de pagar. */
  total: number;
  /** Texto sob o valor no botão, ex. "por mês". */
  periodicidade?: string;
};

/**
 * Seleção da forma de pagamento, compartilhada pelas três jornadas.
 *
 * Duas decisões deliberadas:
 *
 * 1. **Cartão de crédito vem primeiro e já aberto.** É a forma que o negócio
 *    quer priorizar; deixá-la selecionada por padrão poupa um clique e já
 *    mostra o que vai ser pedido, em vez de esconder atrás de um toggle.
 * 2. **O aceite dos termos NÃO vem marcado.** A referência de design que
 *    inspirou a tela traz o checkbox pré-marcado, mas consentimento
 *    pré-marcado não é consentimento — aqui o "Pagar" só habilita depois do
 *    aceite explícito.
 *
 * Os campos são inertes: o protótipo não tem back-end, nada é validado nem
 * enviado, e o `autoComplete="off"` evita que o navegador despeje um cartão
 * real dentro de um protótipo público.
 */
export function FormasPagamento({ opcoes, total, periodicidade }: FormasPagamentoProps) {
  const [forma, setForma] = useState(opcoes[0].id);
  const [aceitou, setAceitou] = useState(false);

  return (
    <div className={styles.bloco}>
      <h2 className={styles.titulo}>Selecione a forma de pagamento</h2>
      <p className={styles.subtitulo}>Todas as transações são seguras e criptografadas</p>

      <div className={styles.opcoes} role="radiogroup" aria-label="Forma de pagamento">
        {opcoes.map((opcao) => {
          const selecionada = forma === opcao.id;
          return (
            <div className={`${styles.opcao} ${selecionada ? styles.opcaoAtiva : ''}`} key={opcao.id}>
              <label className={styles.opcaoTopo}>
                <input
                  type="radio"
                  name="forma-pagamento"
                  className={styles.radio}
                  value={opcao.id}
                  checked={selecionada}
                  onChange={() => setForma(opcao.id)}
                />
                <span className={styles.opcaoTextos}>
                  <span className={styles.opcaoRotulo}>{opcao.rotulo}</span>
                  {opcao.descricao && selecionada && (
                    <span className={styles.opcaoDescricao}>{opcao.descricao}</span>
                  )}
                </span>
                <span className={styles.opcaoIcone}>{opcao.icone}</span>
              </label>

              {opcao.id === 'cartao' && selecionada && <CamposCartao />}

              {opcao.id === 'pix' && selecionada && (
                <p className={styles.avisoInterno}>
                  O QR Code é gerado na confirmação e vale por 30 minutos.
                </p>
              )}

              {opcao.id === 'boleto' && selecionada && (
                <p className={styles.avisoInterno}>
                  O boleto vence em 3 dias úteis e a apólice é emitida após a compensação.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <label className={styles.aceite}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={aceitou}
          onChange={(e) => setAceitou(e.target.checked)}
        />
        <span>
          Li e concordo com os <a href="#/">Termos e Condições</a> e a{' '}
          <a href="#/">Política de Privacidade</a> da Seguros Unimed.
        </span>
      </label>

      {/* O protótipo termina aqui de propósito: o botão mostra o valor final,
          mas não tem ação — nenhum dado é enviado nem cobrado. */}
      <button type="button" className={styles.pagar} disabled={!aceitou}>
        Pagar <span className={styles.pagarValor}>{formatarBRL(total)}</span>
        {periodicidade && <span className={styles.pagarPeriodo}>{periodicidade}</span>}
      </button>
    </div>
  );
}

function CamposCartao() {
  return (
    <div className={styles.cartao}>
      <div className={styles.bandeiras}>
        {BANDEIRAS.map((bandeira) => (
          <span className={styles.bandeira} key={bandeira}>
            {bandeira}
          </span>
        ))}
      </div>

      <div className={styles.campo}>
        <label className={styles.label} htmlFor="cartao-numero">
          Número do cartão
        </label>
        <div className={styles.inputComIcone}>
          <input
            id="cartao-numero"
            className={styles.input}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="1234 1234 1234 1234"
          />
          <span className={styles.inputIcone}>
            <CartaoIcon />
          </span>
        </div>
      </div>

      <div className={styles.linhaCampos}>
        <div className={styles.campo}>
          <label className={styles.label} htmlFor="cartao-nome">
            Nome impresso no cartão
          </label>
          <input id="cartao-nome" className={styles.input} type="text" autoComplete="off" placeholder="Nome como está no cartão" />
        </div>
        <div className={styles.campo}>
          <label className={styles.label} htmlFor="cartao-validade">
            Validade
          </label>
          <input id="cartao-validade" className={styles.input} type="text" inputMode="numeric" autoComplete="off" placeholder="MM / AA" />
        </div>
        <div className={styles.campo}>
          <label className={styles.label} htmlFor="cartao-cvv">
            CVV
          </label>
          <input id="cartao-cvv" className={styles.input} type="text" inputMode="numeric" autoComplete="off" placeholder="000" />
        </div>
      </div>
    </div>
  );
}

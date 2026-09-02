import { useState } from 'react';
import { CartaoIcon, FormasPagamento, PixIcon, type OpcaoPagamento } from '../components/FormasPagamento';
import { ChevronDownIcon } from '../components/icons';
import { DEMO_USER } from '../demoUser';
import { formatarBRL, rotuloPessoas, useJornada } from '../jornada';
import styles from './Odonto5.module.css';

// Ícones inline desta tela (o site usa Font Awesome, que não faz parte do projeto).
function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11 1.8 14.2 5 5.2 14H2v-3.2l9-9Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="13" height="16" viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <path
        d="M2 1h6l4 4v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8 1v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

// Cartão de crédito em primeiro lugar e já aberto: é a forma que o negócio
// quer priorizar (ver FormasPagamento).
const OPCOES: OpcaoPagamento[] = [
  {
    id: 'cartao',
    rotulo: 'Cartão de Crédito',
    descricao: 'Pague com segurança usando seu cartão Visa, Mastercard, Elo ou Amex.',
    icone: <CartaoIcon />,
  },
  { id: 'pix', rotulo: 'Pix', descricao: 'Pagamento à vista, confirmado na hora.', icone: <PixIcon /> },
];

const CARENCIAS = [
  'Urgência e diagnóstico - 24 horas',
  'Prevenção, radiologia, dentística e cirurgia - 60 dias',
  'Periodontia e endodontia - 90 dias',
  'Ortodontia, Próteses unitárias e demais procedimentos - 180 dias',
];

const TITULAR_CAMPOS: Array<[string, string]> = [
  ['CPF:', DEMO_USER.cpf],
  ['Nome completo:', DEMO_USER.nomeCompleto],
  ['E-mail:', DEMO_USER.email],
  ['Celular:', DEMO_USER.celular],
  ['Data de nascimento:', DEMO_USER.dataNascimento],
  ['Estado civil:', DEMO_USER.estadoCivilLabel],
  ['Sexo:', DEMO_USER.sexo],
  ['Nome da mãe:', DEMO_USER.nomeMae],
];

const GUIAS = ['Baixar Contrato', 'Baixar Manual de Contratação', 'Baixar Guia de Leitura Contratual'];

type SecaoResumo = 'plano' | 'titular' | 'guias';

export default function Odonto5() {
  const { pessoas, planoEscolhido } = useJornada();

  // Fallback para quem abre /odonto-5 direto pelo menu "Telas", sem ter
  // passado pela escolha de plano.
  const plano = planoEscolhido ?? { nome: 'Odonto Essencial', precoPorPessoa: 33.5, registro: 'Reg. 471.145/14-9' };
  const total = plano.precoPorPessoa * pessoas;
  const [abertas, setAbertas] = useState<Record<SecaoResumo, boolean>>({
    plano: false,
    titular: false,
    guias: false,
  });

  const alternar = (secao: SecaoResumo) => setAbertas((prev) => ({ ...prev, [secao]: !prev[secao] }));

  return (
    <section className={styles.wrapper}>
      <div className={styles.columns}>
        <div className={styles.main}>
          <h1 className={styles.title}>Pagamento</h1>
          <p className={styles.subtitle}>Escolha a forma de pagamento e adicione os dados financeiros.</p>

          <FormasPagamento opcoes={OPCOES} total={total} periodicidade="/mês" />
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.summaryBox}>
            <div className={styles.summaryHead}>
              <p className={styles.planQty}>
                {pessoas} x {plano.nome.replace('Odonto ', '')}
              </p>
              <p className={styles.planPrice}>
                {formatarBRL(total)}
                <span className={styles.planPriceUnit}>/mês</span>
              </p>
              {pessoas > 1 && (
                <p className={styles.planPorPessoa}>
                  {formatarBRL(plano.precoPorPessoa)} por pessoa · {rotuloPessoas(pessoas)}
                </p>
              )}
              <p className={styles.planReg}>{plano.registro}</p>
            </div>

            <div className={styles.summaryTitleRow}>
              <h2 className={styles.summaryTitle}>Resumo</h2>
              <span className={styles.protocolo}>Protocolo n° {DEMO_USER.protocolo}</span>
            </div>

            <div className={styles.accordion}>
              <div className={styles.accordionHeader}>
                <button
                  type="button"
                  aria-expanded={abertas.plano}
                  className={styles.accordionToggle}
                  onClick={() => alternar('plano')}
                >
                  <ChevronDownIcon
                    size={18}
                    className={abertas.plano ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
                  />
                  <span className={styles.accordionTitle}>Plano</span>
                </button>
                <button type="button" className={styles.editButton} aria-label="Editar plano">
                  <EditIcon />
                </button>
              </div>

              {abertas.plano && (
                <div className={styles.accordionBody}>
                  <p className={styles.bodyStrong}>{plano.nome}</p>
                  <button type="button" className={styles.coverageLink}>
                    Ver coberturas
                  </button>
                  <p className={styles.bodyLabel}>Carência</p>
                  {CARENCIAS.map((item) => (
                    <p className={styles.bodyLine} key={item}>
                      {item}
                    </p>
                  ))}
                  <p className={styles.bodyLine}>
                    <strong>Vigência:</strong> Contrato válido por 1 ano
                  </p>
                  <p className={styles.bodyLine}>Sem coparticipação</p>
                </div>
              )}
            </div>

            <div className={styles.accordion}>
              <div className={styles.accordionHeader}>
                <button
                  type="button"
                  aria-expanded={abertas.titular}
                  className={styles.accordionToggle}
                  onClick={() => alternar('titular')}
                >
                  <ChevronDownIcon
                    size={18}
                    className={abertas.titular ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
                  />
                  <span className={styles.accordionTitle}>Titular</span>
                </button>
                <button type="button" className={styles.editButton} aria-label="Editar dados do titular">
                  <EditIcon />
                </button>
              </div>

              {abertas.titular && (
                <div className={styles.accordionBody}>
                  {TITULAR_CAMPOS.map(([rotulo, valor]) => (
                    <p className={styles.bodyLine} key={rotulo}>
                      <strong>{rotulo}</strong> {valor}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.accordion}>
              <div className={styles.accordionHeader}>
                <button
                  type="button"
                  aria-expanded={abertas.guias}
                  className={styles.accordionToggle}
                  onClick={() => alternar('guias')}
                >
                  <ChevronDownIcon
                    size={18}
                    className={abertas.guias ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
                  />
                  <span className={styles.accordionTitle}>Guias e manuais</span>
                </button>
              </div>

              {abertas.guias && (
                <div className={styles.accordionBody}>
                  {GUIAS.map((label) => (
                    <button type="button" className={styles.guiaItem} key={label}>
                      <DocumentIcon />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

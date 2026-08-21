import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { ChevronDownIcon, ChevronRightIcon } from '../components/icons';
import styles from './Odonto3_1.module.css';

type Plan = {
  id: string;
  path: string;
  name: string;
  reg: string;
  price: string;
  highlight?: string;
  items: string[];
};

// Mesmos 3 planos exibidos na cotação (Odonto 3). Cada card linka seu
// "Ver mais sobre coberturas e carências" para a tela de detalhe daquele
// plano específico (3.1 = Essencial, 3.2 = Pleno, 3.3 = Pleno Ortodontia).
const PLANS: Plan[] = [
  {
    id: 'essencial',
    path: '/odonto-3-1',
    name: 'Odonto Essencial',
    reg: 'Reg. 471.145/14-9',
    price: '33,50',
    items: [
      'Consulta de urgência',
      'Extrações simples, semi inclusos e inclusos',
      'Restaurações em resina e amálgama',
      'Consulta Inicial',
      'Tratamento endodôntico unirradicular, birradicular, multirradicular',
      'Prevenção (orientação de higiene bucal, aplicação de flúor e selantes)',
      'Limpeza (Profilaxia)',
      'Raio-x periapical, oclusal e interproximal',
      'Prótese rol (coroa unitária provisória e definitiva, em cerômero para dentes anteriores e metálica para dentes posteriores)',
      'Radiografia Panorâmica',
    ],
  },
  {
    id: 'pleno',
    path: '/odonto-3-2',
    name: 'Odonto Pleno',
    reg: 'Reg. 471.143/14-2',
    price: '58,20',
    highlight: 'Todos do Essencial Plus + abaixo',
    items: [
      'Telerradiografia',
      'Coroa total acrílica prensada',
      'Coroa total metalo-plástica',
      'Restauração em cerômero inlay/onlay',
    ],
  },
  {
    id: 'pleno-ortodontia',
    path: '/odonto-3-3',
    name: 'Odonto Pleno Ortodontia',
    reg: 'Reg. 475.493/16-0',
    price: '141,50',
    highlight: 'Todos do Pleno + abaixo',
    items: [
      'Documentação ortodôntica',
      'Aparelho ortodôntico fixo metálico e removível',
      'Manutenção de aparelho ortodôntico (exclusivamente para os aparelhos fixos cobertos de acordo com o plano contratado)',
    ],
  },
];

// Plano cujo modal "Características Gerais" esta tela (3.1) exibe.
const ACTIVE_PLAN = PLANS[0];

const ACCORDION_SECTIONS = ['Carências', 'Termos e condições'];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7.3l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ícone "empilhado" para a linha de destaque "Todos do X + abaixo".
function StackIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
      <path d="M8 1l7 3.3L8 7.6 1 4.3 8 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M1 8.7L8 12l7-3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <path
        d="M2 1h6l4 4v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8 1v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.5 3.5l11 11M14.5 3.5l-11 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function Odonto3_1() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <section className={styles.wrapper}>
      <StepBreadcrumb category="Plano Odontológico" step="Produtos" current={2} total={5} />

      <h1 className={styles.title}>Produtos</h1>
      <p className={styles.subtitle}>Confira as opções de plano disponíveis para você</p>

      <div className={styles.grid}>
        {PLANS.map((plan) => (
          <div key={plan.id} className={styles.card}>
            <div>
              <div className={styles.cardHeader}>
                <h2 className={styles.planName}>{plan.name}</h2>
                <p className={styles.planReg}>{plan.reg}</p>
              </div>

              <div className={styles.priceBlock}>
                <p className={styles.priceRow}>
                  <span className={styles.currency}>R$</span>
                  <span className={styles.priceValue}>{plan.price}</span>
                </p>
                <p className={styles.vigencia}>Vigência de 1 Ano</p>
                <p className={styles.coparticipacao}>Mensais por pessoa sem coparticipação</p>
              </div>

              <ul className={styles.features}>
                {plan.highlight && (
                  <li className={styles.featureHighlight}>
                    <StackIcon />
                    <span>{plan.highlight}</span>
                  </li>
                )}
                {plan.items.map((item) => (
                  <li key={item} className={styles.featureItem}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.path} className={styles.moreLink}>
                Ver mais sobre coberturas e carências <ChevronRightIcon />
              </Link>
            </div>

            <Link to="/odonto-3-2" className={styles.chooseButton}>
              Escolher plano
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.overlay}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="odonto31-modal-title">
          <Link to="/odonto-3" className={styles.closeButton} aria-label="Fechar">
            <CloseIcon />
          </Link>

          <h2 id="odonto31-modal-title" className={styles.modalTitle}>
            Características Gerais
          </h2>
          <p className={styles.modalPlanName}>{ACTIVE_PLAN.name}</p>
          <p className={styles.modalDescription}>
            Veja as informações principais abaixo. Caso queira saber os limites, exclusões, valores e detalhes das
            coberturas, assistências e benefícios, faça o download das condições completas:
          </p>

          <div className={styles.downloadList}>
            <button type="button" className={styles.downloadItem}>
              <FileIcon /> Baixar Contrato
            </button>
            <button type="button" className={styles.downloadItem}>
              <FileIcon /> Baixar Manual de Contratação
            </button>
            <button type="button" className={styles.downloadItem}>
              <FileIcon /> Baixar Guia de Leitura Contratual
            </button>
          </div>

          {ACCORDION_SECTIONS.map((label) => {
            const isOpen = Boolean(openSections[label]);
            return (
              <div key={label} className={styles.accordion}>
                <button
                  type="button"
                  className={styles.accordionHeader}
                  aria-expanded={isOpen}
                  onClick={() => toggleSection(label)}
                >
                  <span className={styles.accordionTitle}>{label}</span>
                  <ChevronDownIcon
                    size={24}
                    className={isOpen ? `${styles.accordionIcon} ${styles.accordionIconOpen}` : styles.accordionIcon}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

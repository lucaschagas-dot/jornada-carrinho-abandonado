import { Link } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from '../components/icons';
import styles from './Odonto3_2.module.css';

function CheckIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M1 5l4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1.2l1.9 4.2 4.5.5-3.4 3 1 4.5L8 11.2 4 13.4l1-4.5-3.4-3 4.5-.5L8 1.2z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M2 1h6l4 4v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 1v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M4 9h6M4 12h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type Plan = {
  nome: string;
  reg: string;
  preco: string;
  highlight?: string;
  features: string[];
};

const PLANOS: Plan[] = [
  {
    nome: 'Odonto Essencial',
    reg: 'Reg. 471.145/14-9',
    preco: '33,50',
    features: [
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
    nome: 'Odonto Pleno',
    reg: 'Reg. 471.143/14-2',
    preco: '58,20',
    highlight: 'Todos do Essencial Plus + abaixo',
    features: ['Telerradiografia', 'Coroa total acrílica prensada', 'Coroa total metalo-plástica', 'Restauração em cerômero inlay/onlay'],
  },
  {
    nome: 'Odonto Pleno Ortodontia',
    reg: 'Reg. 475.493/16-0',
    preco: '141,50',
    highlight: 'Todos do Pleno + abaixo',
    features: [
      'Documentação ortodôntica',
      'Aparelho ortodôntico fixo metálico e removível',
      'Manutenção de aparelho ortodôntico (exclusivamente para os aparelhos fixos cobertos de acordo com o plano contratado)',
    ],
  },
];

const DOWNLOADS = ['Baixar Contrato', 'Baixar Manual de Contratação', 'Baixar Guia de Leitura Contratual'];

const CARENCIAS = [
  { label: 'Urgência e diagnóstico: ', valor: '24 horas' },
  { label: 'Prevenção, radiologia, dentística e cirurgia: ', valor: '60 dias' },
  { label: 'Periodontia e endodontia: ', valor: '90 dias' },
  { label: 'Ortodontia, Próteses unitárias e demais procedimentos: ', valor: '180 dias' },
];

export default function Odonto3_2() {
  return (
    <section className={styles.wrapper}>
      <StepBreadcrumb category="Plano Odontológico" step="Produtos" current={2} total={5} />

      <h1 className={styles.title}>Produtos</h1>
      <p className={styles.subtitle}>Confira as opções de plano disponíveis para você</p>

      <div className={styles.grid}>
        {PLANOS.map((plano) => (
          <div className={styles.card} key={plano.nome}>
            <div>
              <div className={styles.cardHeader}>
                <h2 className={styles.planName}>{plano.nome}</h2>
                <p className={styles.planReg}>{plano.reg}</p>
              </div>

              <div className={styles.priceBlock}>
                <p className={styles.priceRow}>
                  <span className={styles.currency}>R$</span>
                  <span className={styles.priceValue}>{plano.preco}</span>
                </p>
                <p className={styles.vigencia}>Vigência de 1 Ano</p>
                <p className={styles.coparticipacao}>Mensais por pessoa sem coparticipação</p>
              </div>

              <ul className={styles.features}>
                {plano.highlight && (
                  <li className={styles.featureHighlight}>
                    <StarIcon />
                    <span>{plano.highlight}</span>
                  </li>
                )}
                {plano.features.map((feature) => (
                  <li className={styles.featureItem} key={feature}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className={styles.moreLink}>
                Ver mais sobre coberturas e carências <ChevronRightIcon size={10} />
              </button>
            </div>

            <Link to="/odonto-login" className={styles.chooseButton}>
              Escolher plano
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.overlay}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
          <Link to="/odonto-3" className={styles.closeButton} aria-label="Fechar">
            <CloseIcon />
          </Link>

          <h2 id="modal-titulo" className={styles.modalTitle}>
            Características Gerais
          </h2>
          <p className={styles.modalPlanName}>Odonto Essencial</p>
          <p className={styles.modalDescription}>
            Veja as informações principais abaixo. Caso queira saber os limites, exclusões, valores e detalhes das coberturas,
            assistências e benefícios, faça o download das condições completas:
          </p>

          <div className={styles.downloadList}>
            {DOWNLOADS.map((label) => (
              <button type="button" className={styles.downloadItem} key={label}>
                <DocumentIcon />
                {label}
              </button>
            ))}
          </div>

          <div className={styles.accordion}>
            <div className={styles.accordionHeader}>
              <h3 className={styles.accordionTitle}>Carências</h3>
              <ChevronUpIcon size={20} className={styles.accordionIcon} />
            </div>
            <div className={styles.accordionBody}>
              {CARENCIAS.map((item) => (
                <p className={styles.accordionRow} key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.valor}</strong>
                </p>
              ))}
            </div>
          </div>

          <div className={styles.accordion}>
            <button type="button" className={styles.accordionHeader}>
              <h3 className={styles.accordionTitle}>Termos e condições</h3>
              <ChevronDownIcon size={20} className={styles.accordionIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

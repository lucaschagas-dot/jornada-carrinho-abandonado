import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { ChevronDownIcon, ChevronRightIcon } from '../components/icons';
import styles from './Odonto3_1.module.css';

type Plan = {
  id: string;
  name: string;
  reg: string;
  price: string;
  highlight?: string;
  items: string[];
};

// Mesmos 3 planos exibidos na cotação (Odonto 3), renderizados atrás do modal.
const PLANS: Plan[] = [
  {
    id: 'essencial',
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

// Conteúdo de referência das telas Odonto 3.2 (Carências) e Odonto 3.3
// (Termos e condições) — nesta tela os dois accordions abrem no lugar.
const CARENCIAS = [
  { label: 'Urgência e diagnóstico: ', valor: '24 horas' },
  { label: 'Prevenção, radiologia, dentística e cirurgia: ', valor: '60 dias' },
  { label: 'Periodontia e endodontia: ', valor: '90 dias' },
  { label: 'Ortodontia, Próteses unitárias e demais procedimentos: ', valor: '180 dias' },
];

const OPERADORA_ITEM =
  'A UNIMED SAÚDE E ODONTO, informa para os devidos fins que está registrada na Agência Nacional de Saúde Suplementar – ANS, sob o número 41.680-1, operando com produtos exclusivamente odontológicos.';

const CONTRATANTE_ITEMS = [
  'Declara que leu o Contrato e respectivos Anexos, de acordo com as características do(s) produto(s) contratado(s), conforme assinalados, não restando assim, dúvidas quanto ao conteúdo de suas cláusulas, especialmente aquelas relativas às coberturas contratadas.',
  'Declara que todas as informações prestadas são verdadeiras e completas e que não foram omitidas circunstâncias que possam influir na aceitação da referida proposta ou no valor da contraprestação pecuniária (mensalidade).',
  'Declara que leu e compreendeu o Manual de Orientação para Contratação dos Planos de Saúde (MPS).',
  'Declara que está ciente e de acordo que o Guia de Leitura Contratual (GLC) está disponível no site www.unimedodonto.com.br',
  'Declara ser responsável pela veracidade das informações e assume a responsabilidade pelas informações prestadas, ciente que a OPERADORA poderá exigir, a qualquer tempo documentos oficiais que comprovem a legitimidade da CONTRATANTE e de seus beneficiários e outros documentos que se fizerem necessários, por força da legislação vigente.',
  'Está ciente e concorda que deverá quitar a mensalidade pontualmente e de forma integral para evitar quaisquer prejuízos à utilização dos benefícios e serviços previstos no Contrato de Assistência Odontológica.',
  'Declara estar ciente que os prazos de carência estão previstos na cláusula VI – Períodos de carência conforme regras estabelecidas no Contrato/Condições Gerais.',
  'Declara ter ciência de que o Rol de Procedimentos Odontológicos tem sua atualização sob responsabilidade da Agência Nacional de Saúde Suplementar (ANS) e está disponível no site www.ans.gov.br.',
  'Declara que estar ciente que a renovação deste Contrato é automática e não implica em cobrança de qualquer taxa adicional.',
  'Está ciente que os Beneficiários Dependentes, deste contrato estão cadastrados no mesmo plano do Beneficiário Titular.',
  'Declara, ainda, ser responsável pela reparação de eventuais danos, prejuízos e/ou sanções administrativas/judiciais que por ventura seja causados à OPERADORA, em especial por àqueles impostos pela Agência Nacional de Saúde Suplementar (ANS), por qualquer órgão de defesa do consumidor ou mesmo Poder Judiciário, em virtude do não cumprimento das declarações firmadas no presente instrumento.',
  'Declara estar de acordo e ciente de que os comunicados/notificações realizados pela OPERADORA, através dos e-mails e contatos indicados, são plenamente válidos, para todos os efeitos legais, e assume a obrigação de mantê-lo atualizado, ciente de que a atualização deverá ser comunicada à OPERADORA.',
  'Declara ciência e concordância, por fim, que na hipótese do CONTRATANTE ser empresário individual que apresentará para a OPERADORA no ato da contratação e anualmente no mês de aniversário do contrato a documentação a seguir descrita: (i) comprovante de constituição como empresário individual extraído dos órgão oficiais (no ato da contratação deverá restar comprovada a constituição como empresário individual a, no mínimo, 06 (seis) meses antes da data da contratação); e (ii) comprovante de regularidade da situação cadastral do Cadastro Nacional da Pessoa Jurídica – CNPJ; (iii) sem prejuízo de outros que venham a substituí-los/complementá-los e que serão objeto de prévia solicitação pela OPERADORA, sob pena de cancelamento do contrato nos termos da regulamentação vigente, no caso de não apresentação da documentação ou a disponibilização da mesma de forma intempestiva, incompleta e/ou ilegível.',
];

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

              <Link to="/odonto-3-1" className={styles.moreLink}>
                Ver mais sobre coberturas e carências <ChevronRightIcon />
              </Link>
            </div>

            <Link to="/odonto-4" className={styles.chooseButton}>
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

          <div className={styles.accordion}>
            <button
              type="button"
              className={styles.accordionHeader}
              aria-expanded={Boolean(openSections['Carências'])}
              onClick={() => toggleSection('Carências')}
            >
              <span className={styles.accordionTitle}>Carências</span>
              <ChevronDownIcon
                size={24}
                className={
                  openSections['Carências'] ? `${styles.accordionIcon} ${styles.accordionIconOpen}` : styles.accordionIcon
                }
              />
            </button>
            {openSections['Carências'] && (
              <div className={styles.accordionBody}>
                {CARENCIAS.map((item) => (
                  <p className={styles.accordionRow} key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.valor}</strong>
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className={styles.accordion}>
            <button
              type="button"
              className={styles.accordionHeader}
              aria-expanded={Boolean(openSections['Termos e condições'])}
              onClick={() => toggleSection('Termos e condições')}
            >
              <span className={styles.accordionTitle}>Termos e condições</span>
              <ChevronDownIcon
                size={24}
                className={
                  openSections['Termos e condições']
                    ? `${styles.accordionIcon} ${styles.accordionIconOpen}`
                    : styles.accordionIcon
                }
              />
            </button>
            {openSections['Termos e condições'] && (
              <div className={styles.accordionBody}>
                <p className={styles.legalPlanTag}>Plano vendido por Seguros_Unimed</p>
                <p className={styles.legalDeclaration}>Declaração e termo de responsabilidade</p>

                <div className={styles.legalSection}>
                  <h3 className={styles.legalSectionTitle}>Operadora</h3>
                  <ol className={styles.legalList}>
                    <li className={styles.legalItem}>
                      <span className={styles.legalNumber}>1.</span>
                      <span className={styles.legalText}>{OPERADORA_ITEM}</span>
                    </li>
                  </ol>
                </div>

                <div className={styles.legalSection}>
                  <h3 className={styles.legalSectionTitle}>Contratante</h3>
                  <ol className={styles.legalList}>
                    {CONTRATANTE_ITEMS.map((texto, index) => (
                      <li className={styles.legalItem} key={index}>
                        <span className={styles.legalNumber}>{index + 1}.</span>
                        <span className={styles.legalText}>{texto}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

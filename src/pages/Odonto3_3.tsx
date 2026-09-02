import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '../components/icons';
import styles from './Odonto3_3.module.css';

function CheckIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M1 5l4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StackPlusIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
      <path d="M8 1l7 3.5L8 8 1 4.5 8 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M1 8.5 8 12l7-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <path d="M2 1h6l4 4v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 1v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M3.5 9.5h7M3.5 12h7M3.5 14.5h4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type Plano = {
  id: string;
  nome: string;
  reg: string;
  preco: string;
  destaque: string | null;
  features: string[];
};

const PLANOS: Plano[] = [
  {
    id: 'essencial',
    nome: 'Odonto Essencial',
    reg: 'Reg. 471.145/14-9',
    preco: '33,50',
    destaque: null,
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
    id: 'pleno',
    nome: 'Odonto Pleno',
    reg: 'Reg. 471.143/14-2',
    preco: '58,20',
    destaque: 'Todos do Essencial Plus + abaixo',
    features: ['Telerradiografia', 'Coroa total acrílica prensada', 'Coroa total metalo-plástica', 'Restauração em cerômero inlay/onlay'],
  },
  {
    id: 'ortodontia',
    nome: 'Odonto Pleno Ortodontia',
    reg: 'Reg. 475.493/16-0',
    preco: '141,50',
    destaque: 'Todos do Pleno + abaixo',
    features: [
      'Documentação ortodôntica',
      'Aparelho ortodôntico fixo metálico e removível',
      'Manutenção de aparelho ortodôntico (exclusivamente para os aparelhos fixos cobertos de acordo com o plano contratado)',
    ],
  },
];

const DOWNLOADS = ['Baixar Contrato', 'Baixar Manual de Contratação', 'Baixar Guia de Leitura Contratual'];

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

export default function Odonto3_3() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Produtos</h1>
      <p className={styles.subtitle}>Confira as opções de plano disponíveis para você</p>

      <div className={styles.cardsGrid}>
        {PLANOS.map((plano) => (
          <div className={styles.card} key={plano.id}>
            <div>
              <div className={styles.cardHead}>
                <h2 className={styles.planName}>{plano.nome}</h2>
                <p className={styles.regNumber}>{plano.reg}</p>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.priceRow}>
                  <span className={styles.priceCurrency}>R$</span>
                  <span className={styles.priceValue}>{plano.preco}</span>
                </span>
                <p className={styles.vigencia}>Vigência de 1 Ano</p>
                <p className={styles.planSubtitle}>Mensais por pessoa sem coparticipação</p>
              </div>

              <ul className={styles.featureList}>
                {plano.destaque && (
                  <li className={`${styles.featureItem} ${styles.featureDestaque}`}>
                    <StackPlusIcon />
                    <span>{plano.destaque}</span>
                  </li>
                )}
                {plano.features.map((feature) => (
                  <li className={styles.featureItem} key={feature}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className={styles.verMais}>
                Ver mais sobre coberturas e carências <ChevronRightIcon size={10} />
              </button>
            </div>

            <Link to="/odonto-login" className={styles.escolherButton}>
              Escolher plano
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.overlay}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Características Gerais">
          <Link to="/odonto-3" className={styles.closeButton} aria-label="Fechar">
            <CloseIcon />
          </Link>

          <h2 className={styles.modalTitle}>Características Gerais</h2>
          <p className={styles.modalPlanName}>Odonto Essencial</p>
          <p className={styles.modalParagraph}>
            Veja as informações principais abaixo. Caso queira saber os limites, exclusões, valores e detalhes das coberturas,
            assistências e benefícios, faça o download das condições completas:
          </p>

          <div className={styles.downloadList}>
            {DOWNLOADS.map((label) => (
              <button type="button" className={styles.downloadItem} key={label}>
                <DocumentIcon />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className={styles.accordion}>
            <div className={styles.accordionItem}>
              <button type="button" className={styles.accordionHeader}>
                <span className={styles.accordionHeaderTitle}>Carências</span>
                <ChevronDownIcon size={24} />
              </button>
            </div>

            <div className={styles.accordionItem}>
              <button type="button" className={styles.accordionHeader}>
                <span className={styles.accordionHeaderTitle}>Termos e condições</span>
                <ChevronUpIcon size={24} />
              </button>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

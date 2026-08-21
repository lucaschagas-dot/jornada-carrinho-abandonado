import { Link } from 'react-router-dom';
import styles from './Odonto1.module.css';
import { ChevronDownIcon, ChevronRightIcon } from '../components/icons';

import heroImage from '../assets/images/hero-mae-filha-sorrindo.png';
import iconAtendimentoNacional from '../assets/images/icon-atendimento-nacional.svg';
import iconRedeCredenciada from '../assets/images/icon-rede-credenciada.svg';
import iconTeleorientacaoMedica from '../assets/images/icon-teleorientacao-medica.svg';
import iconDescontoFarmacias from '../assets/images/icon-desconto-farmacias.svg';
import ilustracaoSaude from '../assets/images/ilustracao-saude.svg';
import ilustracaoAutoestima from '../assets/images/ilustracao-autoestima.svg';
import ilustracaoCuidadoBucal from '../assets/images/ilustracao-cuidado-bucal.svg';
import iconBuscaRedeCredenciada from '../assets/images/icon-busca-rede-credenciada.svg';
import appHomemCelular from '../assets/images/app-homem-celular.png';
import appTelaSuperapp from '../assets/images/app-tela-superapp.png';
import iconCarteirinhaOnline from '../assets/images/icon-carteirinha-online.svg';
import iconAtendimento24hApp from '../assets/images/icon-atendimento-24h-app.svg';
import iconVantagensDescontosApp from '../assets/images/icon-vantagens-descontos-app.svg';

function CheckIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M1 5l4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const VANTAGENS = [
  {
    icon: iconAtendimentoNacional,
    title: 'Atendimento Nacional',
    description: 'Ampla Rede Credenciada, com abrangência em todo País.',
  },
  {
    icon: iconRedeCredenciada,
    title: 'Rede credenciada',
    description: 'Acesso online, rápido e eficaz através do App Unimed, SMS, Site e Central de Relacionamento.',
  },
  {
    icon: iconTeleorientacaoMedica,
    title: 'Teleorientação Médica 24h',
    description:
      'Pronto atendimento médico a qualquer hora, nas especialidades de Clínica Geral e Pediatria, disponível pelo aplicativo. Permite esclarecer dúvidas, receber orientação e obter o direcionamento adequado com rapidez e praticidade, sem deslocamento, ampliando o cuidado além da saúde bucal com mais comodidade, segurança e valor ao plano odontológico.',
  },
  {
    icon: iconDescontoFarmacias,
    title: 'Desconto em farmácias',
    description:
      'Descontos a partir de 20% em medicamentos de marca tarjados e a partir de 30% em medicamentos genéricos tarjados.',
  },
];

const PLANOS_SUBTITLE = 'Valor mensal por pessoa, fixo e sem coparticipação';

const PLANOS = [
  {
    nome: 'Essencial',
    preco: 'R$ 33,50',
    recursos: ['Urgência e Emergência', 'Radiografia panorâmica', 'Tratamento de canal', 'Coroa unitária cerômero (dentes anteriores)'],
  },
  {
    nome: 'Essencial Plus',
    preco: 'R$ 43,80',
    recursos: [
      'Tratamento de gengiva',
      'Tratamento de crianças até 15 anos',
      'Mantenedor de espaço fixo e removível',
      'Extrações simples e dente do siso',
    ],
  },
  {
    nome: 'Pleno',
    preco: 'R$ 58,20',
    recursos: [
      'Restauração em cerômero inlay/onlay',
      'Faceta em Cerômero',
      'Telerradiografia',
      'Coroa unitária em cerômero para dentes anteriores',
    ],
  },
  {
    nome: 'Pleno Ortodontia',
    preco: 'R$ 141,50',
    recursos: [
      'Documentação ortodôntica',
      'Manutenção do aparelho ortodôntico',
      'Colocação de aparelho fixo metálico',
      'Colocação de aparelho removível',
    ],
  },
];

const PORQUE_TER = [
  {
    icon: ilustracaoSaude,
    title: 'Importância para sua saúde',
    description:
      'Existem muitas doenças e condições relacionadas a uma má condição de saúde bucal. Visitas frequentes ao dentista permitem identificá-las e tratá-las precocemente, contribuindo para uma boa saúde geral.',
  },
  {
    icon: ilustracaoAutoestima,
    title: 'Melhor autoestima',
    description:
      'O sorriso é o nosso cartão de visita. Muitas pessoas deixam de sorrir quando a saúde bucal está comprometida, afetando a autoestima, bem estar, vida pessoal e profissional.',
  },
  {
    icon: ilustracaoCuidadoBucal,
    title: 'Prevenção de problemas bucais',
    description: 'Com um plano odontológico, é possível fazer visitas periódicas ao dentista, garantindo um sorriso bonito e saudável.',
  },
];

const FAQ = [
  'Quanto custa um plano odontológico individual?',
  'Quais são as formas de pagamento?',
  'Onde encontro os dentistas da rede credenciada?',
  'O que o plano odontológico individual cobre?',
];

const APP_FEATURES = [
  { icon: iconCarteirinhaOnline, label: 'Carteirinha online' },
  { icon: iconAtendimento24hApp, label: 'Atendimento 24h na rede credenciada' },
  { icon: iconVantagensDescontosApp, label: 'Vantagens e descontos exclusivos' },
];

export default function Odonto1() {
  return (
    <section className={styles.page}>
      <div className={`${styles.hero} ${styles.bleed}`}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>PLANO ODONTOLÓGICO</p>
            <h1 className={styles.heroTitle}>Para cuidar do seu sorriso e da sua família</h1>
            <p className={styles.heroSubtitle}>
              Contrate um plano odontológico para você e sua família e tenha muito mais saúde e sorrisos na sua vida.
            </p>

            <div className={styles.priceCard}>
              <div className={styles.priceInfo}>
                <span className={styles.priceLabel}>a partir de</span>
                <span className={styles.priceRow}>
                  <span className={styles.priceValue}>R$ 33,50</span>
                  <span className={styles.pricePeriod}>/mês</span>
                </span>
              </div>
              <Link to="/odonto-2" className={styles.btnPrimary}>
                Faça uma cotação <ChevronRightIcon size={14} />
              </Link>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <img src={heroImage} alt="Mãe e filha sorrindo" className={styles.heroImage} />
          </div>
        </div>
      </div>

      <div className={styles.vantagens}>
        <div className={styles.vantagensInner}>
          <div>
            <p className={styles.eyebrow}>VANTAGENS</p>
            <h2 className={styles.vantagensTitle}>Principais benefícios do Plano Odontológico</h2>
          </div>

          <div className={styles.vantagensGrid}>
            {VANTAGENS.map((item) => (
              <div key={item.title}>
                <div className={styles.vantagemIconWrap}>
                  <img src={item.icon} alt="" className={styles.vantagemIcon} />
                </div>
                <h3 className={styles.vantagemTitle}>{item.title}</h3>
                <p className={styles.vantagemDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.banner} ${styles.bleed}`}>
        <div className={styles.bannerCard}>
          <h2 className={styles.bannerTitle}>
            Garanta <span className={styles.bannerHighlight}>15% de desconto</span> na compra do Plano Odontológico
          </h2>
          <p className={styles.bannerText}>
            Na compra do Plano Odontológico você recebe um desconto de 15% para adquirir um Seguro Residencial utilizando a mesma
            conta.
          </p>
        </div>
      </div>

      <div className={styles.plans}>
        <h2 className={styles.plansTitle}>Nossos Planos Odontológicos</h2>

        <div className={styles.plansGrid}>
          {PLANOS.map((plano) => (
            <div className={styles.planCard} key={plano.nome}>
              <div>
                <h3 className={styles.planName}>{plano.nome}</h3>
                <p className={styles.planPriceRow}>
                  <span className={styles.planPrice}>{plano.preco}</span>
                  <span className={styles.planPeriod}>/mês</span>
                </p>
                <p className={styles.planSubtitle}>{PLANOS_SUBTITLE}</p>

                <ul className={styles.planFeatures}>
                  {plano.recursos.map((recurso) => (
                    <li className={styles.planFeatureItem} key={recurso}>
                      <CheckIcon />
                      <span>{recurso}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.planButtons}>
                <Link to="/odonto-2" className={styles.btnPrimary}>
                  Contrate agora
                </Link>
                <button type="button" className={styles.btnSecondary}>
                  Compare os planos
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.plansDisclaimer}>*Verifique a disponibilidade do plano na sua região</p>
      </div>

      <div className={styles.why}>
        <h2 className={styles.whyTitle}>Por que ter um Plano Odontológico?</h2>

        <div className={styles.whyGrid}>
          {PORQUE_TER.map((item) => (
            <div className={styles.whyItem} key={item.title}>
              <img src={item.icon} alt="" className={styles.whyIcon} />
              <h3 className={styles.whyItemTitle}>{item.title}</h3>
              <p className={styles.whyItemDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.whyDots}>
          <span className={`${styles.dot} ${styles.dotActive}`} />
          <span className={styles.dot} />
        </div>

        <button type="button" className={styles.btnPrimary}>
          <img src={iconBuscaRedeCredenciada} alt="" width={16} height={16} />
          Busque a rede credenciada
        </button>
      </div>

      <div className={styles.faq}>
        <h2 className={styles.faqTitle}>As pessoas também perguntam</h2>

        <div className={styles.faqList}>
          {FAQ.map((pergunta) => (
            <button type="button" className={styles.faqItem} key={pergunta}>
              <span className={styles.faqQuestion}>{pergunta}</span>
              <ChevronDownIcon size={20} />
            </button>
          ))}
        </div>

        <div className={styles.appBanner}>
          <img src={appHomemCelular} alt="Homem sorrindo enquanto olha para o celular" className={styles.appBannerPhoto} />
          <div className={styles.appAccent} />
          <div className={styles.appContent}>
            <h3 className={styles.appHeading}>O Super App Unimed Odonto chegou para facilitar seu dia a dia</h3>

            <ul className={styles.appFeatureList}>
              {APP_FEATURES.map((feature) => (
                <li className={styles.appFeatureItem} key={feature.label}>
                  <img src={feature.icon} alt="" />
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>

            <p className={styles.appStoreText}>
              BAIXE O APP NA <strong>APP STORE</strong> OU <strong>PLAY STORE</strong>
            </p>
          </div>

          <img src={appTelaSuperapp} alt="Tela principal do Super App Unimed" className={styles.appPhoneImg} />
        </div>
      </div>
    </section>
  );
}

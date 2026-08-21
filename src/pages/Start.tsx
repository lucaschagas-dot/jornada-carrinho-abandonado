import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Start.module.css';
import { ChevronRightIcon, ChevronDownIcon } from '../components/icons';

import heroFamiliaSofa from '../assets/images/hero-familia-sofa.png';
import iconOdonto from '../assets/images/icon-produto-odonto.svg';
import iconResidencial from '../assets/images/icon-produto-residencial.svg';
import iconVida from '../assets/images/icon-produto-vida.svg';
import iconAcidentesPessoais from '../assets/images/icon-produto-acidentes-pessoais.svg';
import iconViagem from '../assets/images/icon-produto-viagem.svg';
import iconPrevidencia from '../assets/images/icon-produto-previdencia.svg';
import iconRenda from '../assets/images/icon-produto-renda.svg';
import empresasEquipeReuniao from '../assets/images/empresas-equipe-reuniao.png';
import bgBolinhasCinza from '../assets/images/bg-bolinhas-cinza.png';
import iconPassoCote from '../assets/images/icon-passo-cote.svg';
import iconPassoContrate from '../assets/images/icon-passo-contrate.svg';
import iconPassoPague from '../assets/images/icon-passo-pague.svg';
import iconPassoPronto from '../assets/images/icon-passo-pronto.svg';
import bgEstamosAqui from '../assets/images/bg-estamos-aqui.png';
import referenciaCuidarProfissionais from '../assets/images/referencia-cuidar-profissionais.png';

type Produto = {
  id: string;
  icon: string;
  eyebrow: string;
  nome: string;
  descricao: string;
  preco: string;
  periodo: string;
  to?: string;
};

const PRODUTOS: Produto[] = [
  {
    id: 'odonto',
    icon: iconOdonto,
    eyebrow: 'PLANO',
    nome: 'Odonto',
    descricao:
      'Um plano sem limites de utilização nas especialidades cobertas, com toda a experiência do sistema Unimed.',
    preco: 'R$ 33,50',
    periodo: '/mês',
    to: '/odonto-1',
  },
  {
    id: 'residencial',
    icon: iconResidencial,
    eyebrow: 'SEGURO',
    nome: 'Residencial',
    descricao:
      'Um seguro residencial completo que preserva o seu patrimônio contra os imprevistos do dia a dia.',
    preco: 'R$ 15,00',
    periodo: '/mês',
  },
  {
    id: 'vida',
    icon: iconVida,
    eyebrow: 'SEGURO',
    nome: 'Vida',
    descricao:
      'Um seguro completo para garantir a sua segurança e tranquilidade e também de quem você ama sem se preocupar.',
    preco: 'R$ 35,00',
    periodo: '/mês',
  },
  {
    id: 'acidentes-pessoais',
    icon: iconAcidentesPessoais,
    eyebrow: 'SEGURO',
    nome: 'Acidentes Pessoais',
    descricao:
      'Um seguro de acidentes pessoais com garantia funeral que se encaixa no seu orçamento e ainda dá prêmios em dinheiro.',
    preco: 'R$ 35,00',
    periodo: '/mês',
  },
  {
    id: 'viagem',
    icon: iconViagem,
    eyebrow: 'SEGURO',
    nome: 'Viagem',
    descricao:
      'Um seguro para você curtir, ir e voltar de suas viagens sem precisar se preocupar com situações inesperadas.',
    preco: 'R$ 30,00',
    periodo: '/dia',
  },
  {
    id: 'previdencia',
    icon: iconPrevidencia,
    eyebrow: 'PLANO',
    nome: 'Previdência',
    descricao: 'Um plano que ajuda você planejar hoje, as suas conquistas no futuro.',
    preco: 'R$ 100,00',
    periodo: '/mês',
  },
  {
    id: 'renda',
    icon: iconRenda,
    eyebrow: 'SEGURO',
    nome: 'Renda',
    descricao:
      'Um seguro de vida que oferece tranquilidade no trabalho e segurança de uma renda mensal.',
    preco: 'R$ 35,00',
    periodo: '/mês',
  },
];

const PASSOS = [
  { icon: iconPassoCote, label: 'Cote' },
  { icon: iconPassoContrate, label: 'Contrate' },
  { icon: iconPassoPague, label: 'Pague' },
  { icon: iconPassoPronto, label: 'Pronto!' },
];

type Testemunho = {
  iniciais: string;
  nome: string;
  produto: string;
  texto: string;
};

const TESTEMUNHOS: Testemunho[] = [
  {
    iniciais: 'DV',
    nome: 'Demian Veiga',
    produto: 'Seguro Residencial',
    texto:
      'Os atendentes me ajudaram a identificar um vazamento antigo em casa e, depois da compra das peças de reposição, fizeram a instalação, acabando com o problema que era insistente em pouco tempo.',
  },
  {
    iniciais: 'FH',
    nome: 'Fernando Hong',
    produto: 'Responsabilidade Civil',
    texto: 'Custo benefício excelente.',
  },
  {
    iniciais: 'NS',
    nome: 'Natalia de Souza',
    produto: 'Seguro de Vida',
    texto:
      'Me sinto segura. Além de ter um clube de vantagens com descontos que posso usar no meu dia a dia.',
  },
  {
    iniciais: 'BR',
    nome: 'Bruna Rodrigues',
    produto: 'Seguro Residencial',
    texto: 'Assistência muito boa! Atendimento rápido.',
  },
];

const FAQ_CATEGORIAS = [
  'SEGURO RESIDENCIAL',
  'RESPONSABILIDADE CIVIL PROFISSIONAL',
  'SEGURO DE VIDA',
  'SEGURO DE ACIDENTES PESSOAIS PREMIÁVEL',
  'SEGURO DE RENDA',
  'PREVIDÊNCIA PRIVADA',
];

const FAQ_PERGUNTAS = [
  'Quanto custa um plano odontológico individual?',
  'Quais são as formas de pagamento?',
  'Onde encontro os dentistas da rede credenciada?',
  'O que o plano odontológico individual cobre?',
];

export default function Start() {
  return (
    <section className={styles.page}>
      <div className={`${styles.bleed} ${styles.hero}`}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>SEGUROS UNIMED</p>
            <h1 className={styles.heroHeading}>
              Para você proteger
              <br />
              <span className={styles.heroHeadingUnderline}>sua viagem</span>
              <span className={styles.heroCursor} aria-hidden="true">
                |
              </span>
            </h1>
            <p className={styles.heroParagraph}>
              Seguros e planos para você, sua família e agora para sua empresa com cotação rápida
              e <span className={styles.heroBold}>compra 100% online!</span>
            </p>
          </div>
          <div className={styles.heroImageWrap}>
            <img src={heroFamiliaSofa} alt="Família reunida no sofá, sorrindo" className={styles.heroImage} />
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.produtosCard}>
          <div className={styles.produtosTabs}>
            <span className={styles.tabActive}>Para você</span>
            <span className={styles.tabDivider} />
            <span className={styles.tabMuted}>Profissional de saúde</span>
            <span className={styles.tabDivider} />
            <span className={styles.tabMuted}>Para sua empresa</span>
            <span className={styles.tabDivider} />
            <span className={styles.tabMuted}>Faculdade Unimed</span>
          </div>

          <div className={styles.produtosGrid}>
            {PRODUTOS.map((produto) => (
              <div className={styles.produtoCard} key={produto.id}>
                <div className={styles.produtoTop}>
                  <div className={styles.produtoHead}>
                    <img src={produto.icon} alt="" className={styles.produtoIcon} />
                    <div>
                      <p className={styles.produtoEyebrow}>{produto.eyebrow}</p>
                      <p className={styles.produtoNome}>{produto.nome}</p>
                    </div>
                  </div>
                  <p className={styles.produtoDescricao}>{produto.descricao}</p>
                  {produto.to ? (
                    <Link to={produto.to} className={styles.produtoSaibaMais}>
                      Saiba mais
                    </Link>
                  ) : (
                    <a href="#" className={styles.produtoSaibaMais}>
                      Saiba mais
                    </a>
                  )}
                </div>

                <div className={styles.produtoBottom}>
                  <p className={styles.produtoPreco}>
                    <span className={styles.precoLabel}>a partir de</span>
                    <span className={styles.precoValor}>{produto.preco}</span>
                    <span className={styles.precoPeriodo}>{produto.periodo}</span>
                  </p>
                  {produto.to ? (
                    <Link to={produto.to} className={styles.produtoCta}>
                      Faça sua cotação
                    </Link>
                  ) : (
                    <a href="#" className={styles.produtoCta}>
                      Faça sua cotação
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.duasColunas}>
          <div className={styles.colunaTexto}>
            <p className={styles.eyebrow}>PLANOS EMPRESARIAIS</p>
            <h2 className={styles.heading2}>Agora para empresas!</h2>
            <p className={styles.paragraph}>
              Confira nossos produtos especialmente pensados para Pequenas e Médias Empresas.
              Entenda nossos produtos, customize a cobertura de acordo com sua necessidade e
              proteja seus colaboradores de forma 100% digital.
            </p>
            <a href="#" className={styles.linkComIcone}>
              Conheça nossos planos para PMEs <ChevronRightIcon size={14} />
            </a>
          </div>
          <div className={styles.colunaImagem}>
            <img
              src={empresasEquipeReuniao}
              alt="Dois homens e duas mulheres, uma delas em cadeira de rodas, conversando em volta de uma mesa de trabalho com notebooks"
              className={styles.imagemGrande}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.bleed} ${styles.facilSection}`}>
        <img src={bgBolinhasCinza} alt="" className={styles.facilBg} aria-hidden="true" />
        <div className={styles.facilInner}>
          <div className={styles.passos}>
            {PASSOS.map((passo, i) => (
              <Fragment key={passo.label}>
                {i > 0 && <ChevronRightIcon size={16} className={styles.passoArrow} />}
                <div className={styles.passo}>
                  <img src={passo.icon} alt="" className={styles.passoIcon} />
                  <span className={styles.passoLabel}>{passo.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
          <div className={styles.facilTexto}>
            <p className={styles.eyebrow}>SEGUROS UNIMED</p>
            <h2 className={styles.heading2}>Fácil, seguro e 100% online</h2>
            <p className={styles.paragraph}>
              Contratar um seguro não precisa ser um processo demorado, difícil e burocrático.
              Para proporcionar um serviço excepcional para os seus clientes, a Unimed criou sua
              plataforma online. Aqui você faz tudo rápido, fácil e 100% online.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.estamosSection}>
        <img src={bgEstamosAqui} alt="" className={styles.estamosBg} aria-hidden="true" />
        <div className={styles.estamosContent}>
          <h2 className={styles.heading3Center}>Estamos aqui por você</h2>
          <p className={styles.paragraphCenter}>
            Sempre que houver dúvidas, acesse o nosso chat, consulte o nosso FAQ, ou ainda, entre
            em contato conosco.
          </p>
          <a href="#" className={styles.linkComIcone}>
            Central de Ajuda <ChevronRightIcon size={14} />
          </a>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.testemunhosSection}>
          <h2 className={styles.heading2}>O que nossos clientes têm a dizer</h2>
          <div className={styles.testemunhosGrid}>
            {TESTEMUNHOS.map((t) => (
              <div className={styles.testemunhoCard} key={t.iniciais}>
                <div className={styles.testemunhoHead}>
                  <span className={styles.testemunhoAvatar}>{t.iniciais}</span>
                  <div>
                    <p className={styles.testemunhoNome}>{t.nome}</p>
                    <p className={styles.testemunhoRole}>
                      cliente <strong>{t.produto}</strong>
                    </p>
                  </div>
                </div>
                <p className={styles.testemunhoTexto}>&ldquo;{t.texto}&rdquo;</p>
              </div>
            ))}
          </div>
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotActive}`} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>

        <div className={styles.faqSection}>
          <ul className={styles.faqSidebar}>
            <li className={styles.faqCategoriaAtiva}>PLANO ODONTOLÓGICO</li>
            {FAQ_CATEGORIAS.map((categoria) => (
              <li className={styles.faqCategoria} key={categoria}>
                {categoria}
              </li>
            ))}
          </ul>
          <div className={styles.faqLista}>
            {FAQ_PERGUNTAS.map((pergunta) => (
              <div className={styles.faqItem} key={pergunta}>
                <span>{pergunta}</span>
                <ChevronDownIcon size={16} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.duasColunas}>
          <div className={styles.colunaTexto}>
            <p className={styles.eyebrow}>SEGUROS UNIMED</p>
            <h2 className={styles.heading2}>Referência em cuidar</h2>
            <p className={styles.paragraph}>
              Há 30 anos no mercado, somos uma das maiores empresas do setor no Brasil. Nossa
              solidez inspira confiança. Conhecemos profundamente as necessidades do sistema
              Unimed, das cooperativas e do sistema de saúde.
            </p>
            <p className={styles.paragraph}>
              Nossa prioridade é atender as novas demandas do consumidor com produtos simples e
              customizados.
            </p>
          </div>
          <div className={styles.colunaImagem}>
            <img
              src={referenciaCuidarProfissionais}
              alt="Profissionais de saúde realizando envolvendo de cuidado"
              className={styles.imagemGrande}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

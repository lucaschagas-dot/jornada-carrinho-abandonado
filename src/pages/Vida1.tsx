import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Vida1.module.css';
import { ChevronDownIcon, ChevronRightIcon } from '../components/icons';
import { CarrosselBeneficios, type Beneficio } from '../components/CarrosselBeneficios';
import { ASSISTENCIAS_VIDA, BENEFICIOS_VIDA, COBERTURAS_VIDA } from '../vida';

import iconTeleorientacaoMedica from '../assets/images/icon-teleorientacao-medica.svg';
import iconDescontoFarmacias from '../assets/images/icon-desconto-farmacias.svg';
import iconPassoCote from '../assets/images/icon-passo-cote.svg';
import iconPassoPronto from '../assets/images/icon-passo-pronto.svg';

/**
 * Ícones do carrossel do hero. Nenhum ícone novo foi desenhado: são os SVGs que
 * já existem em assets/images, escolhidos pelo desenho (monitor, selo de
 * farmácia, moedas, círculo de confirmação) e não pelo nome do arquivo.
 */
const ICONES_HERO: Record<string, string> = {
  beneficioTelemedicina: iconTeleorientacaoMedica,
  beneficioOrientacaoVidaSaudavel: iconDescontoFarmacias,
  beneficioOrientacaoFinanceira: iconPassoCote,
};

/**
 * Os três benefícios inclusos mais a Garantia Funeral Familiar, que é a
 * cobertura que mais aparece na busca por seguro de vida e por isso sobe para o
 * hero em vez de ficar só na grade de coberturas.
 */
const VANTAGENS: Beneficio[] = [
  ...BENEFICIOS_VIDA.map((beneficio) => ({
    icon: ICONES_HERO[beneficio.codigo],
    title: beneficio.titulo,
    description: beneficio.descricao,
  })),
  {
    icon: iconPassoPronto,
    title: 'Garantia Funeral Familiar',
    description: COBERTURAS_VIDA.find((c) => c.codigo === 'coberturaFuneral')!.subtitulo,
  },
];

const PORQUE_TER = [
  {
    titulo: 'Estabilidade e prevenção contra imprevistos',
    descricao:
      'Garanta a tranquilidade da sua família caso você venha a faltar, oferecendo coberturas e assistências além de suporte financeiro.',
  },
  {
    titulo: 'Segurança e tranquilidade',
    descricao: 'Planejar no seu presente, pensando no futuro de sua família, sem a preocupação de adversidades da vida.',
  },
  {
    titulo: 'Cobertura de despesas com o funeral',
    descricao:
      'Será prestado toda a assistência e amparo que a sua família precisa nesse momento de fragilidade emocional.',
  },
];

/**
 * Na loja as respostas só aparecem ao expandir e não foram capturadas no
 * levantamento: os textos abaixo são PLACEHOLDER, escritos aqui a partir do que
 * o produto já define em src/vida.ts (capital mínimo, teto por profissão e
 * formas de pagamento). Precisam ser conferidos com o time do produto.
 */
const FAQ = [
  {
    pergunta: 'Qual é o valor de um seguro de vida por morte?',
    resposta:
      'A indenização é o capital segurado que você escolhe na simulação, a partir de R$ 50.000 e limitado ao teto da sua profissão. A mensalidade acompanha esse valor, a sua idade e as coberturas escolhidas.',
  },
  {
    pergunta: 'Quando posso acionar o seguro de vida?',
    resposta:
      'A partir do início de vigência da apólice. Os beneficiários — ou você mesmo, nas coberturas em vida, como invalidez e diagnóstico de câncer — acionam o seguro quando o evento previsto acontece, apresentando os documentos pedidos na análise.',
  },
  {
    pergunta: 'Como é feito o pagamento do seguro de vida?',
    resposta:
      'A contratação online é paga em mensalidades no cartão de crédito. Débito automático e boleto existem no produto, mas hoje só são liberados no atendimento com o corretor.',
  },
];

/**
 * Página do produto Seguro de Vida (/vida-1), a landing que antecede a jornada
 * de cotação. Espelha a estrutura da Odonto 1: hero com faixas diagonais, card
 * de preço à esquerda e carrossel de benefícios à direita.
 *
 * Ajuste vindo da pesquisa: os benefícios que a loja deixa numa grade no meio
 * da página sobem para o hero, ao lado do preço — o par de informações que pesa
 * na decisão fica visível sem rolagem.
 */
export default function Vida1() {
  const [faqAberta, setFaqAberta] = useState<number | null>(null);

  return (
    <section className={styles.page}>
      <div className={`${styles.hero} ${styles.bleed}`}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>SEGURO DE VIDA</p>
            <h1 className={styles.heroTitle}>Planejamento financeiro que protege você e quem você ama</h1>
            <p className={styles.heroSubtitle}>
              Proteja você e sua família em caso de imprevistos. Faça uma simulação rápida e contrate 100% online!
            </p>

            <div className={styles.priceCard}>
              <div className={styles.priceInfo}>
                <span className={styles.priceLabel}>planos a partir de</span>
                <span className={styles.priceRow}>
                  <span className={styles.priceValue}>R$ 35,00</span>
                  <span className={styles.pricePeriod}>/mês</span>
                </span>
              </div>
              <Link to="/vida-cotacao" className={styles.btnPrimary}>
                Faça uma cotação <ChevronRightIcon size={14} />
              </Link>
            </div>
          </div>

          <div className={styles.heroAside}>
            <CarrosselBeneficios beneficios={VANTAGENS} rotulo="Principais benefícios do Seguro de Vida" />
          </div>
        </div>
      </div>

      <div className={styles.secao}>
        <p className={styles.eyebrow}>COBERTURAS</p>
        <h2 className={styles.secaoTitulo}>Principais coberturas do seguro de vida</h2>

        <div className={styles.coberturasGrid}>
          {COBERTURAS_VIDA.map((cobertura) => (
            <div className={styles.coberturaCard} key={cobertura.codigo}>
              <div className={styles.coberturaCabeca}>
                <h3 className={styles.coberturaTitulo}>{cobertura.titulo}</h3>
                {cobertura.opcional && <span className={styles.selo}>Opcional</span>}
              </div>
              <p className={styles.texto}>{cobertura.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.faixa} ${styles.bleed}`}>
        <div className={styles.faixaInner}>
          <h2 className={styles.secaoTitulo}>Benefícios inclusos</h2>

          <div className={styles.beneficiosGrid}>
            {BENEFICIOS_VIDA.map((beneficio) => (
              <div className={styles.beneficioCard} key={beneficio.codigo}>
                <h3 className={styles.beneficioTitulo}>{beneficio.titulo}</h3>
                <p className={styles.texto}>{beneficio.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.secao}>
        <h2 className={styles.secaoTitulo}>Assistências opcionais</h2>

        <div className={styles.assistenciasGrid}>
          {ASSISTENCIAS_VIDA.map((assistencia) => (
            <div className={styles.assistenciaCard} key={assistencia.codigo}>
              <h3 className={styles.assistenciaTitulo}>{assistencia.titulo}</h3>
              <p className={styles.textoCompacto}>{assistencia.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.why}>
        <h2 className={styles.whyTitulo}>Por que devo ter este seguro?</h2>

        <div className={styles.whyGrid}>
          {PORQUE_TER.map((item) => (
            <div className={styles.whyItem} key={item.titulo}>
              <span className={styles.whyMarca} aria-hidden="true" />
              <h3 className={styles.whyItemTitulo}>{item.titulo}</h3>
              <p className={styles.texto}>{item.descricao}</p>
            </div>
          ))}
        </div>

        <Link to="/vida-cotacao" className={styles.btnPrimary}>
          Faça uma cotação <ChevronRightIcon size={14} />
        </Link>
      </div>

      <div className={styles.faq}>
        <h2 className={styles.secaoTitulo}>As pessoas também perguntam</h2>

        <div className={styles.faqList}>
          {FAQ.map((item, i) => {
            const aberta = faqAberta === i;

            return (
              <div className={styles.faqItem} key={item.pergunta}>
                <button
                  type="button"
                  className={styles.faqBotao}
                  aria-expanded={aberta}
                  aria-controls={`faq-resposta-${i}`}
                  onClick={() => setFaqAberta(aberta ? null : i)}
                >
                  <span className={styles.faqPergunta}>{item.pergunta}</span>
                  <span className={`${styles.faqIcone} ${aberta ? styles.faqIconeAberto : ''}`}>
                    <ChevronDownIcon size={20} />
                  </span>
                </button>

                {aberta && (
                  <p className={styles.faqResposta} id={`faq-resposta-${i}`}>
                    {item.resposta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className={styles.susep}>
        O registro desse seguro na Susep não implica, por parte dessa autarquia, incentivo ou recomendação para a sua
        comercialização.
      </p>
    </section>
  );
}

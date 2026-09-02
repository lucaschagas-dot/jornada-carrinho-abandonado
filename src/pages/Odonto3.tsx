import { Link } from 'react-router-dom';
import { SeletorPessoas } from '../components/SeletorPessoas';
import { ChevronRightIcon } from '../components/icons';
import { formatarBRL, rotuloPessoas, useJornada } from '../jornada';
import styles from './Odonto3.module.css';

function CheckIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className={styles.checkIcon} aria-hidden="true">
      <path d="M1 5.5l4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BundleIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" className={styles.bundleIcon} aria-hidden="true">
      <rect x="1" y="1" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 12.5h11a1 1 0 0 0 1-1v-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

type Plano = {
  nome: string;
  registro: string;
  /** Mensalidade por pessoa — é o valor em destaque no card. O total (preço x
   *  nº de pessoas) aparece logo abaixo, em segundo plano. */
  preco: number;
  destaque?: string;
  recursos: string[];
};

const PLANOS: Plano[] = [
  {
    nome: 'Odonto Essencial',
    registro: 'Reg. 471.145/14-9',
    preco: 33.5,
    recursos: [
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
    registro: 'Reg. 471.143/14-2',
    preco: 58.2,
    destaque: 'Todos do Essencial Plus + abaixo',
    recursos: ['Telerradiografia', 'Coroa total acrílica prensada', 'Coroa total metalo-plástica', 'Restauração em cerômero inlay/onlay'],
  },
  {
    nome: 'Odonto Pleno Ortodontia',
    registro: 'Reg. 475.493/16-0',
    preco: 141.5,
    destaque: 'Todos do Pleno + abaixo',
    recursos: [
      'Documentação ortodôntica',
      'Aparelho ortodôntico fixo metálico e removível',
      'Manutenção de aparelho ortodôntico (exclusivamente para os aparelhos fixos cobertos de acordo com o plano contratado)',
    ],
  },
];

export default function Odonto3() {
  const { pessoas, escolherPlano } = useJornada();

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Produtos</h1>
      <p className={styles.subtitle}>Confira as opções de plano disponíveis para você</p>

      {/* Proposta da pesquisa: manter o nº de pessoas visível e editável aqui,
          com o preço já somando todo mundo. */}
      <div className={styles.pessoasDestaque}>
        <SeletorPessoas variante="destaque" descricao="Cada card mostra o valor por pessoa e, abaixo, o total do plano." />
      </div>

      <div className={styles.grid}>
        {PLANOS.map((plano) => (
          <div className={styles.card} key={plano.nome}>
            <div className={styles.cardTop}>
              <div className={styles.cardHeader}>
                <h2 className={styles.planName}>{plano.nome}</h2>
                <p className={styles.planReg}>{plano.registro}</p>
              </div>

              {/* O número grande é sempre o valor por pessoa: é ele que a pessoa
                  compara entre os planos. O total do plano vem logo abaixo, para
                  não haver surpresa no fim — mas sem roubar o destaque. */}
              <div className={styles.priceBlock}>
                <p className={styles.priceRow}>
                  <span className={styles.currency}>R$</span>
                  <span className={styles.priceValue}>
                    {plano.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className={styles.priceUnit}>por pessoa</span>
                </p>
                {pessoas > 1 && (
                  <p className={styles.priceBreakdown}>
                    {formatarBRL(plano.preco * pessoas)} no total · {rotuloPessoas(pessoas)}
                  </p>
                )}
                <p className={styles.priceNote}>Vigência de 1 Ano</p>
                <p className={styles.priceNote}>Mensais por pessoa sem coparticipação</p>
              </div>

              <ul className={styles.features}>
                {plano.destaque && (
                  <li className={styles.highlightItem}>
                    <BundleIcon />
                    <span>{plano.destaque}</span>
                  </li>
                )}
                {plano.recursos.map((recurso) => (
                  <li className={styles.featureItem} key={recurso}>
                    <CheckIcon />
                    <span>{recurso}</span>
                  </li>
                ))}
              </ul>

              <Link to="/odonto-3-1" className={styles.moreLink}>
                <span className={styles.moreLinkText}>Ver mais sobre coberturas e carências</span>
                <ChevronRightIcon size={10} className={styles.moreLinkIcon} />
              </Link>
            </div>

            <Link
              to="/odonto-login"
              className={styles.chooseButton}
              onClick={() => escolherPlano({ nome: plano.nome, precoPorPessoa: plano.preco, registro: plano.registro })}
            >
              Escolher plano
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

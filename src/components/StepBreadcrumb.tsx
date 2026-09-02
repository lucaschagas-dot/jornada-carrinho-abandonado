import { JORNADAS, type JornadaId } from '../jornadas';
import styles from './StepBreadcrumb.module.css';

/** Acima deste número de etapas, só a etapa atual mantém o rótulo visível. */
const LIMITE_ROTULOS = 6;

function CheckIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
      <path d="M1 4.6 4 7.6 10 1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type StepBreadcrumbProps = {
  jornada: JornadaId;
  /** Etapa atual, começando em 1. */
  atual: number;
};

/**
 * Indicador de progresso da jornada: círculos numerados ligados por uma linha,
 * no lugar do antigo "Cotação 1 / 5" no canto.
 *
 * A pesquisa mostrou que as pessoas não sabem quanto falta para terminar, e é
 * nesse vazio que desistem — ver quantos passos existem e quantos já foram
 * vencidos é o que o indicador entrega.
 */
export function StepBreadcrumb({ jornada, atual }: StepBreadcrumbProps) {
  const { nome, etapas } = JORNADAS[jornada];
  const compacto = etapas.length > LIMITE_ROTULOS;

  return (
    <nav className={styles.barra} aria-label={`Etapas: ${nome}`}>
      <p className={styles.jornada}>
        {nome} <span className={styles.contador}>· etapa {atual} de {etapas.length}</span>
      </p>

      <ol className={`${styles.trilha} ${compacto ? styles.trilhaCompacta : ''}`}>
        {etapas.map((etapa, i) => {
          const numero = i + 1;
          const estado = numero < atual ? 'concluida' : numero === atual ? 'atual' : 'futura';
          return (
            <li
              className={`${styles.etapa} ${styles[estado]}`}
              key={etapa}
              aria-current={estado === 'atual' ? 'step' : undefined}
            >
              {i > 0 && <span className={styles.conector} aria-hidden="true" />}
              <span className={styles.marcador} aria-hidden="true">
                {estado === 'concluida' ? <CheckIcon /> : numero}
              </span>
              <span className={styles.rotulo}>{etapa}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

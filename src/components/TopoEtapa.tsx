import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from './icons';
import { StepBreadcrumb } from './StepBreadcrumb';
import type { JornadaId } from '../jornadas';
import styles from './TopoEtapa.module.css';

type TopoEtapaProps = {
  /** Rota da tela anterior. Ausente só na home. */
  anterior?: string;
  jornada?: JornadaId;
  etapa?: number;
};

/**
 * Faixa fixa no topo de cada tela: botão de voltar à esquerda e indicador de
 * progresso da jornada ao centro.
 *
 * Fica no `PageShell` e é montada a partir de `routes.ts`, e não repetida em
 * cada página, para que nenhuma tela nova nasça sem saída e sem progresso.
 */
export function TopoEtapa({ anterior, jornada, etapa }: TopoEtapaProps) {
  if (!anterior && !jornada) return null;

  return (
    <div className={styles.topo}>
      <div className={styles.ladoEsquerdo}>
        {anterior && (
          <Link to={anterior} className={styles.voltar}>
            <ChevronLeftIcon size={12} />
            <span>Voltar</span>
          </Link>
        )}
      </div>

      <div className={styles.centro}>
        {jornada && etapa !== undefined && <StepBreadcrumb jornada={jornada} atual={etapa} />}
      </div>

      {/* Coluna espelho da esquerda: mantém a trilha centralizada na tela. */}
      <div className={styles.ladoDireito} aria-hidden="true" />
    </div>
  );
}

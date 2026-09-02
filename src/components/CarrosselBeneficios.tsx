import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import styles from './CarrosselBeneficios.module.css';

/** Intervalo do avanço automático, em ms. */
const INTERVALO = 6000;

export type Beneficio = {
  icon: string;
  title: string;
  /** Texto curto, do tamanho de um card de hero. */
  description: string;
};

type CarrosselBeneficiosProps = {
  beneficios: Beneficio[];
};

/**
 * Carrossel dos principais benefícios do plano, no lado direito do hero.
 *
 * Ocupa o lugar em que a loja põe uma foto: os quatro benefícios estavam numa
 * grade no meio da página, onde só chegava quem rolava. No hero eles disputam
 * a atenção junto com o preço, que é o par de informações que a pesquisa
 * mostrou pesar na decisão.
 *
 * O avanço automático pausa no hover e no foco, e não acontece para quem pediu
 * menos movimento no sistema (`prefers-reduced-motion`) — carrossel que anda
 * sozinho embaixo do cursor tira o controle de quem está lendo.
 */
export function CarrosselBeneficios({ beneficios }: CarrosselBeneficiosProps) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const total = beneficios.length;
  const ir = (indice: number) => setAtual((indice + total) % total);

  useEffect(() => {
    if (pausado) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => setAtual((i) => (i + 1) % total), INTERVALO);
    return () => window.clearInterval(timer);
  }, [pausado, total]);

  const beneficio = beneficios[atual];

  return (
    <div
      className={styles.palco}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Principais benefícios do Plano Odontológico"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      {/* Cartas de trás: só profundidade, como no card empilhado da referência. */}
      <span className={styles.fantasma2} aria-hidden="true" />
      <span className={styles.fantasma1} aria-hidden="true" />

      <div className={styles.card}>
        <p className={styles.selo}>Benefício {atual + 1} de {total}</p>

        <div className={styles.corpo} aria-live="polite">
          <div className={styles.iconeCaixa}>
            <img src={beneficio.icon} alt="" className={styles.icone} />
          </div>
          <h3 className={styles.titulo}>{beneficio.title}</h3>
          <p className={styles.descricao}>{beneficio.description}</p>
        </div>

        <div className={styles.controles}>
          <div className={styles.pontos}>
            {beneficios.map((item, i) => (
              <button
                type="button"
                key={item.title}
                className={`${styles.ponto} ${i === atual ? styles.pontoAtivo : ''}`}
                aria-label={item.title}
                aria-current={i === atual ? 'true' : undefined}
                onClick={() => ir(i)}
              />
            ))}
          </div>

          <div className={styles.setas}>
            <button type="button" className={styles.seta} aria-label="Benefício anterior" onClick={() => ir(atual - 1)}>
              <ChevronLeftIcon size={12} />
            </button>
            <button type="button" className={styles.seta} aria-label="Próximo benefício" onClick={() => ir(atual + 1)}>
              <ChevronRightIcon size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

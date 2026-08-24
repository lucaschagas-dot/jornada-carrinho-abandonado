import { MAX_PESSOAS, MIN_PESSOAS, rotuloPessoas, useJornada } from '../jornada';
import styles from './SeletorPessoas.module.css';

function MinusIcon() {
  return (
    <svg width="14" height="2" viewBox="0 0 14 2" fill="none" aria-hidden="true">
      <path d="M1 1h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type SeletorPessoasProps = {
  /** `destaque` é a versão maior, usada na tela de Produtos. */
  variante?: 'campo' | 'destaque';
  descricao?: string;
};

/**
 * "Para quantas pessoas?" — proposta da pesquisa de carrinho abandonado:
 * perguntar isso no começo, para o preço mostrado já ser o total real.
 */
export function SeletorPessoas({ variante = 'campo', descricao }: SeletorPessoasProps) {
  const { pessoas, setPessoas } = useJornada();

  return (
    <div className={variante === 'destaque' ? styles.blocoDestaque : styles.bloco}>
      <div className={styles.textos}>
        <p className={styles.rotulo} id="seletor-pessoas-rotulo">
          Para quantas pessoas é o plano?
        </p>
        {descricao && <p className={styles.descricao}>{descricao}</p>}
      </div>

      <div className={styles.controle} role="group" aria-labelledby="seletor-pessoas-rotulo">
        <button
          type="button"
          className={styles.botao}
          onClick={() => setPessoas(pessoas - 1)}
          disabled={pessoas <= MIN_PESSOAS}
          aria-label="Remover uma pessoa"
        >
          <MinusIcon />
        </button>

        <span className={styles.valor} aria-live="polite">
          {rotuloPessoas(pessoas)}
        </span>

        <button
          type="button"
          className={styles.botao}
          onClick={() => setPessoas(pessoas + 1)}
          disabled={pessoas >= MAX_PESSOAS}
          aria-label="Adicionar uma pessoa"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import styles from './Odonto2.module.css';

export default function Odonto2() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Cotação</h1>

      <div className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="cep" className={styles.label}>
            Qual é o seu CEP?
          </label>

          <div className={styles.cepRow}>
            <input
              id="cep"
              name="cep"
              type="text"
              inputMode="numeric"
              placeholder="00000-000"
              autoComplete="postal-code"
              className={styles.input}
            />
            <button type="button" className={styles.cepHelper}>
              Não sei meu CEP
            </button>
          </div>
        </div>

        <p className={styles.legal}>
          Ao clicar em "Continuar", você está ciente de que a Seguros Unimed irá coletar e tratar
          seus dados pessoais de acordo com a{' '}
          <span className={styles.legalLink}>Política de Privacidade</span>
        </p>

        <Link to="/odonto-2-1" className={styles.continueButton}>
          Continuar
        </Link>
      </div>
    </section>
  );
}

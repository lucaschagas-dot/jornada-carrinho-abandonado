import { Link } from 'react-router-dom';
import styles from './Odonto2_1.module.css';

export default function Odonto2_1() {
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

          <p className={styles.addressConfirmation}>RUA FRANCA - JARDIM SÃO LUÍS, SANTANA DE PARNAÍBA - SP</p>
        </div>

        <div className={styles.nameRow}>
          <div className={styles.nameField}>
            <label htmlFor="nomeCompleto" className={styles.nameLabel}>
              Nome completo do titular
            </label>
            <input id="nomeCompleto" name="nomeCompleto" type="text" className={styles.nameInput} />
          </div>

          <div className={styles.nameField}>
            <label htmlFor="nomeSocial" className={styles.nameLabel}>
              Nome social
            </label>
            <input id="nomeSocial" name="nomeSocial" type="text" className={styles.nameInput} />
          </div>
        </div>

        <p className={styles.legal}>
          Ao clicar em "Continuar", você está ciente de que a Seguros Unimed irá coletar e tratar
          seus dados pessoais de acordo com a{' '}
          <span className={styles.legalLink}>Política de Privacidade</span>
        </p>

        <Link to="/odonto-2-3" className={styles.continueButton}>
          Continuar
        </Link>
      </div>
    </section>
  );
}

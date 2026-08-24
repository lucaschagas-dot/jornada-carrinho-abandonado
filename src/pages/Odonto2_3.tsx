import { Link } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { SeletorPessoas } from '../components/SeletorPessoas';
import styles from './Odonto2_3.module.css';

export default function Odonto2_3() {
  return (
    <section className={styles.wrapper}>
      <StepBreadcrumb category="Plano Odontológico" step="Cotação" current={1} total={5} />

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

          <p className={styles.addressConfirm}>
            RUA FRANCA - JARDIM SÃO LUÍS, SANTANA DE PARNAÍBA - SP
          </p>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldInline}>
            <label htmlFor="nomeTitular" className={styles.inlineLabel}>
              Nome completo do titular
            </label>
            <input
              id="nomeTitular"
              name="nomeTitular"
              type="text"
              autoComplete="name"
              className={styles.inlineInput}
            />
          </div>

          <div className={styles.fieldInline}>
            <label htmlFor="nomeSocial" className={styles.inlineLabel}>
              Nome social
            </label>
            <input
              id="nomeSocial"
              name="nomeSocial"
              type="text"
              className={styles.inlineInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldInline}>
            <label htmlFor="email" className={styles.inlineLabel}>
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={`${styles.inlineInput} ${styles.inputHighlight}`}
            />
          </div>

          <div className={styles.fieldInline}>
            <label htmlFor="celular" className={styles.inlineLabel}>
              Celular
            </label>
            <input
              id="celular"
              name="celular"
              type="tel"
              placeholder="(00) 00000-0000"
              autoComplete="tel"
              className={styles.inlineInput}
            />
          </div>
        </div>

        {/* Proposta da pesquisa: perguntar o número de pessoas AQUI, no início.
            Antes, o usuário via "R$ 33,50", se ancorava nesse valor e só descobria
            o aumento na última etapa, ao adicionar dependentes. */}
        <div className={styles.pessoasRow}>
          <SeletorPessoas descricao="Assim já mostramos o valor total, sem surpresa no fim." />
        </div>

        <label htmlFor="optIn" className={styles.checkboxRow}>
          <input id="optIn" name="optIn" type="checkbox" className={styles.checkbox} />
          <span>
            Tenho interesse em receber comunicação com condições especiais e ofertas de produtos
            da Seguros Unimed.
          </span>
        </label>

        <p className={styles.legal}>
          Ao clicar em "Continuar", você está ciente de que a Seguros Unimed irá coletar e tratar
          seus dados pessoais de acordo com a{' '}
          <span className={styles.legalLink}>Política de Privacidade</span>
        </p>

        <Link to="/odonto-3" className={styles.continueButton}>
          Continuar
        </Link>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StepBreadcrumb } from '../components/StepBreadcrumb';
import { DEMO_USER } from '../demoUser';
import styles from './OdontoLogin.module.css';

function MailIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="m1.6 2 7.4 5.4L16.4 2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Login como ETAPA da jornada, com URL própria — proposta da pesquisa de
 * carrinho abandonado (07/08/2026).
 *
 * Hoje o login é um popup com "x": gera atrito (quem esquece a senha cai numa
 * recuperação que costuma falhar e desiste) e, por não ter URL, impede separar
 * no funil quem abandonou no login de quem abandonou na identificação.
 * Aqui não há "x" — sair é uma escolha explícita, e a rota é mensurável.
 */
export default function OdontoLogin() {
  const [email, setEmail] = useState(DEMO_USER.email);
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  return (
    <section className={styles.wrapper}>
      <StepBreadcrumb category="Plano Odontológico" step="Identificação" current={3} total={5} />

      <h1 className={styles.title}>Identifique-se para continuar</h1>
      <p className={styles.subtitle}>
        Sua cotação já está salva. Entrar agora evita começar do zero se você voltar depois.
      </p>

      <div className={styles.card}>
        {!codigoEnviado ? (
          <>
            <div className={styles.field}>
              <label htmlFor="login-email" className={styles.label}>
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Sem senha: a pesquisa mostrou que a recuperação de senha é onde a
                jornada mais perde gente. O código por e-mail evita esse beco. */}
            <button type="button" className={styles.primaryButton} onClick={() => setCodigoEnviado(true)}>
              <MailIcon /> Receber código por e-mail
            </button>

            <p className={styles.hint}>Enviamos um código de acesso. Você não precisa lembrar de senha nenhuma.</p>
          </>
        ) : (
          <>
            <p className={styles.enviadoTexto}>
              Código enviado para <strong>{email}</strong>
            </p>

            <div className={styles.field}>
              <label htmlFor="login-codigo" className={styles.label}>
                Código de acesso
              </label>
              <input
                id="login-codigo"
                type="text"
                inputMode="numeric"
                placeholder="000000"
                autoComplete="one-time-code"
                className={styles.input}
              />
            </div>

            <Link to="/odonto-4" className={styles.primaryButtonLink}>
              Continuar
            </Link>

            <button type="button" className={styles.linkButton} onClick={() => setCodigoEnviado(false)}>
              Reenviar código ou trocar de e-mail
            </button>
          </>
        )}
      </div>

      <div className={styles.saidaRow}>
        <Link to="/odonto-4" className={styles.saidaLink}>
          Continuar sem entrar
        </Link>
        <p className={styles.saidaNota}>
          Você pode seguir sem entrar, mas a cotação não fica salva na sua conta.
        </p>
      </div>
    </section>
  );
}

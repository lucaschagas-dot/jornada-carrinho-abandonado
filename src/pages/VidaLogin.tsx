import { useState } from 'react';
import { Link } from 'react-router-dom';
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
 * carrinho abandonado (07/08/2026) aplicada a Vida.
 *
 * Em Vida a loja não tem etapa de login nenhuma: a conta é criada em silêncio
 * quando a pessoa sai da Identificação, avisada só na letra miúda ("Ao clicar
 * em continuar uma conta será criada com os dados informados"). Dá dois
 * problemas de uma vez: no funil não existe ponto de login para medir abandono,
 * e a pessoa vira titular de uma conta sem ter pedido.
 *
 * Tornar o login uma etapa explícita resolve os dois: vira rota mensurável e a
 * conta passa a ser uma escolha consciente. Sem "x" e sem atalho para pular —
 * identificar-se é obrigatório para comprar. O atrito atacado é a senha, não o
 * login: o código por e-mail evita o beco da recuperação de senha.
 */
export default function VidaLogin() {
  const [email, setEmail] = useState(DEMO_USER.email);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigo, setCodigo] = useState('');

  const emailValido = /^\S+@\S+\.\S+$/.test(email.trim());

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Identifique-se para continuar</h1>
      <p className={styles.subtitle}>
        Sua cotação de Seguro de Vida já está salva. Entrar agora evita começar do zero se você voltar
        depois.
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

            <button
              type="button"
              className={styles.primaryButton}
              disabled={!emailValido}
              onClick={() => setCodigoEnviado(true)}
            >
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
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>

            {codigo.trim().length >= 4 ? (
              <Link to="/vida-cadastro" className={styles.primaryButtonLink}>
                Continuar
              </Link>
            ) : (
              <button type="button" className={styles.primaryButton} disabled>
                Continuar
              </button>
            )}

            <button type="button" className={styles.linkButton} onClick={() => setCodigoEnviado(false)}>
              Reenviar código ou trocar de e-mail
            </button>
          </>
        )}
      </div>
    </section>
  );
}

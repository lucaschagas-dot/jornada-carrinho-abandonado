import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ChevronDownIcon, UserIcon } from './icons';
import { formatarBRL, rotuloPessoas, useJornada } from '../jornada';
import logoSegurosUnimed from '../assets/images/logo-seguros-unimed.png';

/**
 * Corretora parceira exibida no selo. Nome fictício de propósito: o repositório
 * é público e não deve carregar a marca de um parceiro real.
 */
const PARCEIRO = 'Corretora Aurora';

function CarrinhoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M1 1h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h7.6a1.5 1.5 0 0 0 1.5-1.2L17.4 5H4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="17" r="1.4" fill="currentColor" />
      <circle cx="14" cy="17" r="1.4" fill="currentColor" />
    </svg>
  );
}

type HeaderProps = {
  /** Quando definido, o cabeçalho mostra "Olá, {user}" no lugar de "Entrar". */
  user?: string;
};

export function Header({ user }: HeaderProps) {
  const { planoEscolhido, pessoas, ultimaEtapa, temCotacaoEmAndamento } = useJornada();
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoSegurosUnimed} alt="Seguros Unimed" className={styles.logo} />
        </Link>

        {/* Proposta da pesquisa: em jornada de parceiro, manter a marca principal
            e sinalizar a parceria com um selo, em vez de trocar o logo. */}
        <span className={styles.seloParceria}>
          <span className={styles.seloRotulo}>Corretora parceira</span>
          <span className={styles.seloNome}>{PARCEIRO}</span>
        </span>

        <nav className={styles.nav}>
          <button type="button" className={styles.navItem}>
            Para você <ChevronDownIcon />
          </button>
          <button type="button" className={styles.navItem}>
            Profissional de saúde <ChevronDownIcon />
          </button>
          <button type="button" className={styles.navItemPlain}>
            Central de ajuda
          </button>
        </nav>

        {/* Proposta da pesquisa: cotação em andamento visível SEM login. */}
        {temCotacaoEmAndamento && (
          <div className={styles.carrinhoWrap}>
            <button
              type="button"
              className={styles.carrinho}
              aria-expanded={carrinhoAberto}
              onClick={() => setCarrinhoAberto((v) => !v)}
            >
              <CarrinhoIcon />
              <span className={styles.carrinhoTexto}>Minhas cotações</span>
              <span className={styles.carrinhoBadge}>1</span>
            </button>

            {carrinhoAberto && planoEscolhido && (
              <div className={styles.carrinhoPainel}>
                <p className={styles.carrinhoTitulo}>Cotação em andamento</p>
                <p className={styles.carrinhoPlano}>{planoEscolhido.nome}</p>
                <p className={styles.carrinhoDetalhe}>
                  {rotuloPessoas(pessoas)} · {formatarBRL(planoEscolhido.precoPorPessoa * pessoas)}/mês
                </p>
                <Link to={ultimaEtapa} className={styles.carrinhoRetomar} onClick={() => setCarrinhoAberto(false)}>
                  Retomar cotação
                </Link>
              </div>
            )}
          </div>
        )}

        <button type="button" className={styles.login}>
          <UserIcon size={user ? 18 : 14} />
          {user ? (
            <>
              <span>
                Olá, <strong className={styles.userName}>{user}</strong>
              </span>
              <ChevronDownIcon />
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </div>
    </header>
  );
}

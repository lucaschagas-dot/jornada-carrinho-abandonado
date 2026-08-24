import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ChevronDownIcon, UserIcon } from './icons';
import logoSegurosUnimed from '../assets/images/logo-seguros-unimed.png';

type HeaderProps = {
  /** Quando definido, o cabeçalho mostra "Olá, {user}" no lugar de "Entrar". */
  user?: string;
};

export function Header({ user }: HeaderProps) {
  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoSegurosUnimed} alt="Seguros Unimed" className={styles.logo} />
        </Link>

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

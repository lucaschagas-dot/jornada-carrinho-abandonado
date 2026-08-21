import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ChevronDownIcon, UserIcon } from './icons';
import logoSegurosUnimed from '../assets/images/logo-seguros-unimed.png';

export function Header() {
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
          <UserIcon size={14} />
          Entrar
        </button>
      </div>
    </header>
  );
}

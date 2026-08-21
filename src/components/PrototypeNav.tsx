import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';
import styles from './PrototypeNav.module.css';

/**
 * Navegação auxiliar do protótipo (não faz parte do design do Figma).
 * Permite pular para qualquer tela da jornada durante uma revisão,
 * sem depender de clicar o fluxo inteiro do início.
 */
export function PrototypeNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className={styles.wrap}>
      {open && (
        <div className={styles.panel}>
          <p className={styles.title}>Telas do protótipo</p>
          <ul className={styles.list}>
            {ROUTES.map((route, i) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className={location.pathname === route.path ? styles.activeLink : styles.link}
                  onClick={() => setOpen(false)}
                >
                  {i + 1}. {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button type="button" className={styles.toggle} onClick={() => setOpen((v) => !v)}>
        {open ? 'Fechar' : 'Telas'}
      </button>
    </div>
  );
}

import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppWidget } from './WhatsAppWidget';
import { useJornada } from '../jornada';
import styles from './PageShell.module.css';

/** Etapas da cotação que o "Retomar" do carrinho pode restaurar. */
const ETAPAS_DA_COTACAO = ['/odonto-2', '/odonto-3', '/odonto-login', '/odonto-4', '/odonto-5'];

type PageShellProps = {
  children: ReactNode;
  /** Nome do usuário logado, repassado ao Header (ver `loggedIn` em routes.ts). */
  user?: string;
};

export function PageShell({ children, user }: PageShellProps) {
  const { registrarEtapa } = useJornada();
  const { pathname } = useLocation();

  useEffect(() => {
    if (ETAPAS_DA_COTACAO.some((etapa) => pathname.startsWith(etapa))) registrarEtapa(pathname);
  }, [pathname, registrarEtapa]);

  return (
    <div className={styles.page}>
      <Header user={user} />
      <main className={styles.main}>{children}</main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

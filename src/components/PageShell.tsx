import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppWidget } from './WhatsAppWidget';
import styles from './PageShell.module.css';

type PageShellProps = {
  children: ReactNode;
  /** Nome do usuário logado, repassado ao Header (ver `loggedIn` em routes.ts). */
  user?: string;
};

export function PageShell({ children, user }: PageShellProps) {
  return (
    <div className={styles.page}>
      <Header user={user} />
      <main className={styles.main}>{children}</main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

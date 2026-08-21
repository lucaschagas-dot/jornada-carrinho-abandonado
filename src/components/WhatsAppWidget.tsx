import styles from './WhatsAppWidget.module.css';
import { WhatsAppIcon } from './icons';

export function WhatsAppWidget() {
  return (
    <a
      className={styles.widget}
      href="https://wa.me/"
      target="_blank"
      rel="noreferrer"
    >
      <span className={styles.iconBubble}>
        <WhatsAppIcon size={24} className={styles.icon} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>Clique aqui para entrar em contato</span>
        <span className={styles.subtitle}>WhatsApp:</span>
      </span>
    </a>
  );
}

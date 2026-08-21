import styles from './StepBreadcrumb.module.css';

type StepBreadcrumbProps = {
  category: string;
  step: string;
  current: number;
  total: number;
};

export function StepBreadcrumb({ category, step, current, total }: StepBreadcrumbProps) {
  return (
    <div className={styles.breadcrumb}>
      <span className={styles.category}>{category}</span>
      <span className={styles.step}>
        {step} {current}
      </span>
      <span className={styles.total}>/ {total}</span>
    </div>
  );
}

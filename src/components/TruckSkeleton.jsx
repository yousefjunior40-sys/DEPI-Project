import styles from './TruckSkeleton.module.css';

export default function TruckSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={styles.row}>
          <div className={`${styles.line} ${styles.name}`} />
          <div className={`${styles.line} ${styles.rating}`} />
        </div>
        <div className={`${styles.line} ${styles.cuisine}`} />
        <div className={`${styles.line} ${styles.meta}`} />
      </div>
    </div>
  );
}

import styles from './TruckCard.module.css';

export default function TruckCard({ truck, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick?.(truck)}>

      <div className={styles.imageWrapper}>
        {truck.image ? (
          <img src={truck.image} alt={truck.name} className={styles.image} />
        ) : (
          <div className={styles.imageFallback}>{truck.name}</div>
        )}
        <span className={`${styles.badge} ${truck.isOpen ? styles.open : styles.closed}`}>
          {truck.isOpen ? 'Open' : 'Closed'}
        </span>
        <span className={styles.price}>{truck.priceRange}</span>
      </div>

      <div className={styles.info}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>{truck.name}</h3>
          <span className={styles.rating}>
            <span className={styles.star}>★</span>
            {truck.rating.toFixed(1)}
            <span className={styles.reviews}>({truck.reviewCount})</span>
          </span>
        </div>
        <p className={styles.cuisine}>{truck.cuisine}</p>
        <div className={styles.meta}>
          <span>🕐 {truck.hours}</span>
          <span>📍 {truck.distance}</span>
        </div>
      </div>

    </div>
  );
}

import { useState, useMemo } from 'react';
import TruckCard from './TruckCard';
import TruckSkeleton from './TruckSkeleton';
import styles from './TruckGrid.module.css';

const CATEGORIES = ['All', 'Burgers', 'Mexican', 'Fast Food', 'Desserts', 'Drinks'];

export default function TruckGrid({
  trucks = [],
  title = 'Featured Food Trucks',
  isLoading = false,
  onSeeAll,
  onCardClick,
}) {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');

  // Filter by search + category
  const filtered = useMemo(() => {
    return trucks.filter((truck) => {
      const matchesSearch =
        truck.name.toLowerCase().includes(search.toLowerCase()) ||
        truck.cuisine.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'All' || truck.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [trucks, search, category]);

  return (
    <section className={styles.section}>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {onSeeAll && (
          <button className={styles.seeAll} onClick={onSeeAll}>
            See all →
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by name or cuisine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => setSearch('')}>
            ✕
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className={styles.categories}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.catBtn} ${category === cat ? styles.catBtnActive : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <TruckSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Results */}
      {!isLoading && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              onClick={onCardClick}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filtered.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No trucks found</p>
          <p className={styles.emptySub}>Try a different search or category</p>
          <button
            className={styles.resetBtn}
            onClick={() => { setSearch(''); setCategory('All'); }}
          >
            Reset filters
          </button>
        </div>
      )}

    </section>
  );
}

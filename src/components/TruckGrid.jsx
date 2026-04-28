import { useState, useMemo } from 'react';
import TruckCard from './TruckCard';
import TruckSkeleton from './TruckSkeleton';
import styles from './TruckGrid.module.css';

const CATEGORIES = [
  { label: 'Burgers',  emoji: '🍔' },
  { label: 'Pizza',    emoji: '🍕' },
  { label: 'Crepes',   emoji: '🥐' },
  { label: 'Drinks',   emoji: '🥤' },
  { label: 'Tacos',    emoji: '🌮' },
  { label: 'Sushi',    emoji: '🍱' },
  { label: 'Desserts', emoji: '🍩' },
  { label: 'Healthy',  emoji: '🥗' },
];

const PRICE_RANGES = ['$', '$$', '$$$'];

export default function TruckGrid({
  trucks = [],
  title = 'Featured Food Trucks',
  isLoading = false,
  onSeeAll,
  onCardClick,
}) {
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Count active filters for badge
  const activeFilterCount = (category !== 'All' ? 1 : 0) + (priceRange !== 'All' ? 1 : 0);

  const filtered = useMemo(() => {
    return trucks.filter((truck) => {
      const matchesSearch =
        truck.name.toLowerCase().includes(search.toLowerCase()) ||
        truck.cuisine.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'All' || truck.category === category;

      const matchesPrice =
        priceRange === 'All' || truck.priceRange === priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [trucks, search, category, priceRange]);

  return (
    <section className={styles.section}>

      {/* Search bar + Filters button */}
      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search trucks or cuisine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')}>
              ✕
            </button>
          )}
        </div>

        <button
          className={`${styles.filtersBtn} ${showFilters ? styles.filtersBtnActive : ''}`}
          onClick={() => setShowFilters((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className={styles.filtersBadge}>{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className={styles.filterPanel}>
          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>Category</p>
            <div className={styles.chipRow}>
              {CATEGORIES.map(({ label, emoji }) => (
                <button
                  key={label}
                  className={`${styles.chip} ${category === label ? styles.chipActive : ''}`}
                  onClick={() => setCategory(category === label ? 'All' : label)}
                >
                  <span>{emoji}</span> {label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>Price Range</p>
            <div className={styles.chipRow}>
              {PRICE_RANGES.map((p) => (
                <button
                  key={p}
                  className={`${styles.chip} ${priceRange === p ? styles.chipActive : ''}`}
                  onClick={() => setPriceRange(priceRange === p ? 'All' : p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              className={styles.resetBtn}
              onClick={() => { setCategory('All'); setPriceRange('All'); }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

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
            onClick={() => { setSearch(''); setCategory('All'); setPriceRange('All'); }}
          >
            Reset filters
          </button>
        </div>
      )}

    </section>
  );
}
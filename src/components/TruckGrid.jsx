import { useState, useMemo } from 'react';
import TruckCard from './TruckCard';
import TruckSkeleton from './TruckSkeleton';
import styles from './TruckGrid.module.css';

const CATEGORIES = [
  { label: 'Burgers', emoji: '🍔' },
  { label: 'Pizza', emoji: '🍕' },
  { label: 'Crepes', emoji: '🥐' },
  { label: 'Drinks', emoji: '🥤' },
  { label: 'Tacos', emoji: '🌮' },
  { label: 'Sushi', emoji: '🍱' },
  { label: 'Desserts', emoji: '🍩' },
  { label: 'Healthy', emoji: '🥗' },
];

const PRICE_RANGES = ['$', '$$', '$$$'];

export default function TruckGrid({
  trucks = [],
  title = 'Featured Food Trucks',
  isLoading = false,
  onSeeAll,
  onCardClick,
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const searchTerm = search.toLowerCase();

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (category !== 'All') count++;
    if (priceRange !== 'All') count++;
    return count;
  }, [category, priceRange]);

  const filtered = useMemo(() => {
    return trucks.filter((truck) => {
      const matchesSearch =
        truck.name?.toLowerCase().includes(searchTerm) ||
        truck.cuisine?.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === 'All' ||
        truck.category?.toLowerCase() === category.toLowerCase();

      const matchesPrice =
        priceRange === 'All' ||
        truck.priceRange === priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [trucks, searchTerm, category, priceRange]);

  return (
    <section className={styles.section}>
      {/* Search + Filters */}
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
          className={`${styles.filtersBtn} ${
            showFilters ? styles.filtersBtnActive : ''
          }`}
          onClick={() => setShowFilters((v) => !v)}
        >
          <span>☰</span>
          Filters

          {activeFilterCount > 0 && (
            <span className={styles.filtersBadge}>
              {activeFilterCount}
            </span>
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
                  className={`${styles.chip} ${
                    category === label ? styles.chipActive : ''
                  }`}
                  onClick={() => setCategory(label)}
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
                  className={`${styles.chip} ${
                    priceRange === p ? styles.chipActive : ''
                  }`}
                  onClick={() => setPriceRange(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              className={styles.resetBtn}
              onClick={() => {
                setCategory('All');
                setPriceRange('All');
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Loading */}
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
          <p className={styles.emptySub}>
            Try a different search or category
          </p>

          <button
            className={styles.resetBtn}
            onClick={() => {
              setSearch('');
              setCategory('All');
              setPriceRange('All');
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
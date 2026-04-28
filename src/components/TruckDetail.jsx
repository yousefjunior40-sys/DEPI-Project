import { useState } from 'react';
import { useParams } from 'react-router-dom';
import trucks from './trucks';
import styles from './TruckDetail.module.css';

/* ── Mock data ─────────────────────────────────────────────────────────────── */
export const MOCK_TRUCK = {
  id: '1',
  name: "Smoky Joe's BBQ",
  cuisine: 'BBQ',
  priceRange: '$$',
  rating: 4.8,
  reviews: 342,
  isOpen: true,
  hours: '11:00 AM - 9:00 PM',
  location: 'Downtown Food Park',
  description:
    'Authentic smoked meats with homemade sauces. Our brisket has won 3 local awards.',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
  menu: [
    {
      category: 'Mains',
      emoji: '🍖',
      items: [
        {
          id: 'm1',
          name: 'Smoked Brisket Plate',
          description: '12-hour smoked brisket with coleslaw and cornbread',
          price: 14.99,
          popular: true,
          image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=200&q=80',
        },
        {
          id: 'm2',
          name: 'Pulled Pork Sandwich',
          description: 'Tender pulled pork with tangy BBQ sauce',
          price: 11.99,
          popular: false,
          image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=200&q=80',
        },
        {
          id: 'm3',
          name: 'BBQ Chicken Platter',
          description: 'Half chicken slow-smoked with hickory wood',
          price: 13.49,
          popular: false,
          image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=200&q=80',
        },
      ],
    },
    {
      category: 'Sides',
      emoji: '🥗',
      items: [
        {
          id: 's1',
          name: 'Loaded Fries',
          description: 'Fries topped with cheese, bacon, and jalapeños',
          price: 7.99,
          popular: true,
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=80',
        },
        {
          id: 's2',
          name: 'Cornbread Muffin',
          description: 'Sweet honey cornbread',
          price: 3.99,
          popular: false,
          image: 'https://images.unsplash.com/photo-1612548403247-aa2873e9422d?w=200&q=80',
        },
        {
          id: 's3',
          name: 'Mac & Cheese',
          description: 'Creamy smoked gouda mac and cheese',
          price: 6.49,
          popular: false,
          image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=200&q=80',
        },
      ],
    },
    {
      category: 'Drinks',
      emoji: '🥤',
      items: [
        {
          id: 'd1',
          name: 'Lemonade',
          description: 'Fresh-squeezed house lemonade',
          price: 3.49,
          popular: false,
          image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&q=80',
        },
        {
          id: 'd2',
          name: 'Sweet Tea',
          description: 'Southern-style sweet iced tea',
          price: 2.99,
          popular: true,
          image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80',
        },
      ],
    },
  ],
};

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function TruckDetail({ onBack }) {
  const { id } = useParams();
  const [cart, setCart] = useState({});

  // Find the truck from the data list and merge with MOCK_TRUCK for detailed fields
  const foundTruck = trucks.find(t => t.id.toString() === id);
  const truck = foundTruck ? { 
    ...MOCK_TRUCK, 
    ...foundTruck,
    image: foundTruck.image || MOCK_TRUCK.image 
  } : MOCK_TRUCK;

  const addToCart = (itemId) =>
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <img
          src={truck.image}
          alt={truck.name}
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />

        <button className={styles.backBtn} onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className={styles.heroInfo}>
          <h1 className={styles.heroName}>{truck.name}</h1>
          <div className={styles.heroBadges}>
            <span className={styles.heroMeta}>
              <span className={styles.star}>★</span>
              {truck.rating}
              <span className={styles.reviews}>({truck.reviewCount || truck.reviews})</span>
            </span>
            <span className={styles.dot}>·</span>
            <span className={styles.heroMeta}>{truck.cuisine}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.heroMeta}>{truck.priceRange}</span>
          </div>
        </div>
      </div>

      {/* ── Info bar ── */}
      <div className={styles.infoBar}>
        <div className={styles.infoItem}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="6.5" stroke="#236c75" strokeWidth="1.3"/>
            <path d="M7.5 4.5V8l2.5 1.5" stroke="#236c75" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          {truck.hours}
        </div>
        <div className={styles.infoItem}>
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
            <path d="M6.5 1C4.015 1 2 3.015 2 5.5c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5C11 3.015 8.985 1 6.5 1z" stroke="#236c75" strokeWidth="1.3"/>
            <circle cx="6.5" cy="5.5" r="1.5" stroke="#236c75" strokeWidth="1.3"/>
          </svg>
          {truck.location}
        </div>
        <span className={`${styles.openBadge} ${truck.isOpen ? styles.open : styles.closed}`}>
          {truck.isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        <p className={styles.description}>{truck.description}</p>

        <h2 className={styles.menuTitle}>Menu</h2>

        {truck.menu.map((section) => (
          <div key={section.category} className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>
              <span>{section.emoji}</span> {section.category}
            </h3>

            <div className={styles.itemsGrid}>
              {section.items.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImg}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemTop}>
                      <span className={styles.itemName}>{item.name}</span>
                      {item.popular && (
                        <span className={styles.popularBadge}>POPULAR</span>
                      )}
                    </div>
                    <p className={styles.itemDesc}>{item.description}</p>
                    <div className={styles.itemBottom}>
                      <span className={styles.itemPrice}>
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        className={`${styles.addBtn} ${cart[item.id] ? styles.addBtnActive : ''}`}
                        onClick={() => addToCart(item.id)}
                      >
                        {cart[item.id] ? (
                          <>✓ {cart[item.id]} added</>
                        ) : (
                          <>+ Add</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Cart FAB ── */}
      {totalItems > 0 && (
        <div className={styles.cartFab}>
          <span className={styles.cartCount}>{totalItems}</span>
          View Order
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 10L10 8 6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

    </div>
  );
}
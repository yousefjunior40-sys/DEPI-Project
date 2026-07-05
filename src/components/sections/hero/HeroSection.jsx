import { useRef } from "react";
import "./HeroSection.css";
import { FiMapPin, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const scrollRef = useRef(null);

  const categories = [
    { id: "burger", name: "Burgers", icon: "🍔" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "crepes", name: "Crepes", icon: "🥞" },
    { id: "drinks", name: "Drinks", icon: "🥤" },
    { id: "tacos", name: "Tacos", icon: "🌮" },
    { id: "sushi", name: "Sushi", icon: "🍣" },
    { id: "dessert", name: "Desserts", icon: "🍩" },
    { id: "healthy", name: "Healthy", icon: "🥗" },
    { id: "bbq", name: "BBQ", icon: "🍖" },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 250;

    if (direction === "right") {
      const isAtEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

      if (isAtEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      const isAtStart = container.scrollLeft <= 5;

      if (isAtStart) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <section className="hero">
        {/* badge */}
        <div className="hero-badge">
          <FiMapPin className="location-icon" />
          Food trucks near you
        </div>

        {/* title */}
        <h1 className="hero-title">
          Street Food, <span>Delivered</span> to <br /> You
        </h1>

        {/* desc */}
        <p className="hero-desc">
          Discover the best food trucks in your area. Order delicious
          <br /> street food and get it delivered fresh.
        </p>

        {/* search */}
        <div className="hero-search">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input placeholder="Find food trucks near you..." />
          </div>
          <button>Search</button>
        </div>

        {/* stats */}
        <div className="hero-stats">
          <span><b>500+</b> Food Trucks</span>
          <span><b>4.8</b> Avg Rating</span>
          <span><b>15min</b> Delivery</span>
        </div>

        {/* icons */}
        <div className="hero-icons">
          <span className="icon burger">🍔</span>
          <span className="icon pizza">🍕</span>
          <span className="icon taco">🌮</span>
          <span className="icon drink">🥤</span>
          <span className="icon donut">🍩</span>
        </div>
      </section>

      <section>
        {/* header */}
        <div className="categories-header">
          <h2>Browse by Category</h2>
          <span className="view-all">View all →</span>
        </div>

        {/* categories with scroll arrows */}
        <div className="categories-wrapper">
          <button className="scroll-btn left" onClick={() => scroll("left")}>
            <FiChevronLeft />
          </button>

          <div className="categories" ref={scrollRef}>
            {categories.map((cat) => (
              <Link to="/food-trucks" key={cat.id} style={{ textDecoration: "none" }}>
                <div className="category-card">
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-name">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>

          <button className="scroll-btn right" onClick={() => scroll("right")}>
            <FiChevronRight />
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
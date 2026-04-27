import "./HeroSection.css";
import { FiMapPin, FiSearch } from "react-icons/fi";

const HeroSection = () => {
  return (
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
        <br />street food and get it delivered fresh.
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
  );
};

export default HeroSection;

import "./AppSection.css";
import { Search, MapPin, ArrowRight, ChevronRight, Star, UtensilsCrossed, Heart, Play } from "lucide-react";
import mobileAppImage from "../assets/mobileapp.jpeg";

export default function AppSection() {
  return (
    <section className="app-section">
      <div className="app-container">

        <div className="app-text">
          <span className="tag">Mobile App</span>

          <h2>
            Take TruckSpot <span>Everywhere</span>
          </h2>

          <p className="desc">
            Download our app and never miss your favorite food truck again.
          </p>

          <ul className="features">
            <li>Discover nearby food trucks through an interactive map.</li>
            <li>Explore menus and read ratings before visiting.</li>
            <li>Food truck owners can register and share menus.</li>
            <li>Connect food lovers with the best street food.</li>
          </ul>

          <div className="buttons">
            <button className="app-btn">App Store</button>
            <button className="play-btn">Google Play</button>
          </div>
        </div>
        

        <div className="app-image">
          {<img src={mobileAppImage} alt="TruckSpot Mobile App"></img>}
        </div>

      </div>
    </section>
    
  );
}

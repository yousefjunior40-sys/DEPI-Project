import "./AppSection.css";
import {
  Search,
  MapPin,
  ArrowRight,
  ChevronRight,
  Star,
  UtensilsCrossed,
  Heart,
  Play,
} from "lucide-react";
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
            <div class="container">
              <div class="icon-box">
                <MapPin color="#55A5A0" size={20} />
              </div>
              <p>
                Truck Spot helps users easily discover nearby food trucks
                through an interactive map.
              </p>
            </div>
            <div class="container">
              <div class="icon-box">
                <Star color="#55A5A0" size={20} />
              </div>
              <p>
                Users can explore menus, view locations, and read ratings before
                visiting a food truck.
              </p>
            </div>
            <div class="container">
              <div class="icon-box">
                <UtensilsCrossed color="#55A5A0" size={20} />
              </div>
              <p>
                The platform also allows food truck owners to register their
                trucks and share their menus.
              </p>
            </div>
            <div class="container">
              <div class="icon-box">
                <Heart color="#55A5A0" size={20} />
              </div>
              <p>
                Our goal is to create a simple hub that connects food lovers
                with the best street food around them.
              </p>
            </div>
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

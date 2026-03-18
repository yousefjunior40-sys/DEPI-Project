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

          <div className="features">
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
          </div>

          <div className="buttons-container">
            <button className="store-btn">
              <svg className="icon" fill="white" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>

              <div className="text">
                <div className="small-text">Download on the</div>
                <div className="big-text">App Store</div>
              </div>
            </button>

            <button className="store-btn">
              <Play color="white" fill="white"/>
              <div className="text">
                <div className="small-text">Get it on</div>
                <div className="big-text">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        <div className="app-image">
          {<img src={mobileAppImage} alt="TruckSpot Mobile App"></img>}
        </div>
      </div>
    </section>
  );
}

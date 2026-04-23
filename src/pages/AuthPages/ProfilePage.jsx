import "./Profile.css";
import { Link } from "react-router-dom";
import { User, MapPin, Clock, ChevronRight, LogOut, Edit } from "lucide-react";
const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* User Info Card */}
        <div className="card user-card">
          <div className="avatar">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div className="user-details">
            <h2>John Doe</h2>
            <p>john@example.com</p>
          </div>
          <button className="edit-btn">
            <Edit className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Order History Section */}
        <h3 className="section-title">Order History</h3>

        <div className="card list-card">
          <div className="card-content">
            <div className="card-header">
              <h4>Smoky Joe's BBQ</h4>
              <span className="badge badge-delivered">delivered</span>
            </div>
            <p className="card-meta">2 items • $30.97 • 2026-03-07</p>
          </div>
          <div className="chevron">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        <div className="card list-card">
          <div className="card-content">
            <div className="card-header">
              <h4>Taco Libre</h4>
              <span className="badge badge-on-way">on the way</span>
            </div>
            <p className="card-meta">1 item • $19.98 • 2026-03-08</p>
          </div>
          <div className="chevron">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Saved Addresses Section */}
        <h3 className="section-title">Saved Addresses</h3>

        <div className="card list-card">
          <div className="icon-wrapper home-icon">
            <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
          </div>
          <div className="card-content address-content">
            <h4>Home</h4>
            <p className="card-meta">123 Main Street, Apt 4B, New York, NY</p>
          </div>
        </div>

        <div className="card list-card">
          <div className="icon-wrapper work-icon">
            <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
          </div>
          <div className="card-content address-content">
            <h4>Work</h4>
            <p className="card-meta">
              456 Business Ave, Floor 12, New York, NY
            </p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button className="sign-out-btn">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;

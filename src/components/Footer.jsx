import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
const Footer = () => <footer className="bg-primary text-primary-foreground mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-4 flex items-center">
            TruckSp<MapPin className="h-5 w-5 text-accent inline" />t
          </h3>
          <p className="text-sm opacity-80">
            Discover the best food trucks near you. Fresh, fast, and always on the move.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm opacity-80">
            <Link to="/trucks" className="block hover:opacity-100">Food Trucks</Link>
            <Link to="/cart" className="block hover:opacity-100">My Cart</Link>
            <Link to="/profile" className="block hover:opacity-100">Profile</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <div className="space-y-2 text-sm opacity-80">
            <p>FAQ</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm opacity-80">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Food Lane, NY</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> (555) 123-4567</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@truckspot.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60">
        © 2026 TruckSpot. All rights reserved.
      </div>
    </div>
  </footer>;
export default Footer;
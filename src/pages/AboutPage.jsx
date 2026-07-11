import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store, MapPin, Award } from "lucide-react";
import logo from "@/assets/logo-new.png";
const AboutPage = () => {
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/10 via-card to-accent/5">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <img src={logo} alt="TruckSpot" className="h-16 w-16 mx-auto mb-4 drop-shadow-sm" />
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Connecting Street Food Lovers
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            TruckSpot is Cairo's premier food truck discovery hub. We map local culinary vendors, coordinate deliveries, and bring delicious meals straight to your door.
          </p>
        </div>
      </section>

      {/* Core values */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-6 rounded-xl shadow-soft text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground">Dynamic Mapping</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Never lose track of your favorite mobile kitchen. We trace accurate distances, coordinates, and open operational statuses.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-xl shadow-soft text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Store className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground">Merchant Empowerment</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We empower food truck owners with custom analytics, full menu control, reviews management, and direct customer interactions.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-xl shadow-soft text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground">Vetted Quality</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All trucks undergo review approval by platform admins. Read customer ratings and leave reviews to ensure top food standards.
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <h2 className="font-display text-3xl font-bold text-center text-foreground">Our Story</h2>
          <p className="text-sm text-muted-foreground leading-relaxed font-sans text-center">
            TruckSpot was founded in 2026 to bridge the gap between hungry street food enthusiasts and mobile food trucks constantly shifting across Cairo's districts. From Nasr City to Sheikh Zayed, our platform provides unified menus, instant order tracking status, and direct vendor dispatch systems to deliver a flawless dining experience.
          </p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AboutPage;
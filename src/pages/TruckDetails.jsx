import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, ArrowLeft, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import ClearCartModal from "@/components/ClearCartModal";
import { useApp } from "@/contexts/AppContext";
import { useCart } from "@/contexts/CartContext";
const MenuItemCard = ({
  item,
  onAdd
}) => <div className={`flex gap-4 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow border ${item.available === false ? "opacity-60 border-muted-foreground/20" : "border-transparent"}`}>
    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" loading="lazy" />
    <div className="flex-1 min-w-0 flex flex-col justify-between">
      <div>
        <h4 className="font-semibold text-sm flex items-center gap-2">
          {item.name}
          {item.popular && <span className="px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded">POPULAR</span>}
          {item.available === false && <span className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded">OUT OF STOCK</span>}
        </h4>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold text-sm text-foreground">${item.price.toFixed(2)}</span>
        <button onClick={onAdd} disabled={item.available === false} className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50">
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </div>
  </div>;
const TruckDetails = () => {
  const {
    id
  } = useParams();
  const {
    getTruck,
    getTruckReviews
  } = useApp();
  const {
    addItem,
    totalItems
  } = useCart();
  const truck = id ? getTruck(id) : undefined;
  const reviews = id ? getTruckReviews(id) : [];
  if (!truck) {
    return <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-4xl mb-4">🚛</p>
          <h1 className="font-display text-2xl font-bold mb-2">Truck not found</h1>
          <Link to="/trucks" className="text-accent hover:underline">Browse all trucks</Link>
        </div>
      </div>;
  }
  const menuCategories = ["Mains", "Sides", "Drinks", "Desserts"];
  const handleAdd = item => {
    addItem(item, truck.id, truck.name);
    // Note: toast is fired on success inside App context/pages, but we fire one here for confirmation if no conflict
    toast.success(`${item.name} added to cart`);
  };
  return <div className="min-h-screen bg-background">
      <Navbar />

      {/* Conflicts modal for switching trucks */}
      <ClearCartModal />

      {/* Hero image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={truck.image} alt={truck.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto">
          <Link to="/trucks" className="inline-flex items-center gap-1 text-primary-foreground/80 text-sm mb-3 hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">{truck.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-primary-foreground/80 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" /> {truck.rating > 0 ? truck.rating.toFixed(1) : "0.0"} ({truck.reviewCount})
            </span>
            <span>{truck.cuisine}</span>
            <span>{truck.priceRange}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Info Box */}
        <div className="bg-card rounded-xl shadow-soft p-5 mb-8 flex flex-wrap gap-6 text-sm border border-border">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span>Hours: {truck.hours}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span>District: {truck.location}</span>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${truck.isOpen ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
            {truck.isOpen ? "Open Now" : "Closed"}
          </span>
          <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-semibold">
            Prep time: ~{truck.prepTime} min
          </span>
        </div>

        <p className="text-muted-foreground mb-8 font-sans">{truck.description}</p>

        {/* Menu */}
        <h2 className="font-display text-2xl font-bold mb-6">Menu</h2>
        {menuCategories.map(cat => {
        const items = truck.menu.filter(m => m.category === cat);
        if (items.length === 0) return null;
        return <div key={cat} className="mb-8 animate-fade-in">
              <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                {cat === "Mains" && "🍽️"} {cat === "Sides" && "🥗"} {cat === "Drinks" && "🥤"} {cat === "Desserts" && "🍰"} {cat}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => <MenuItemCard key={item.id} item={item} onAdd={() => handleAdd(item)} />)}
              </div>
            </div>;
      })}

        {/* Reviews Section */}
        <div className="border-t border-border pt-8 mt-12">
          <ReviewsSection reviews={reviews} rating={truck.rating} reviewCount={truck.reviewCount} />
        </div>
      </div>

      {/* Floating cart button */}
      {totalItems > 0 && <Link to="/cart" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground rounded-full shadow-elevated font-semibold hover:bg-accent/90 transition-colors">
          <ShoppingCart className="h-5 w-5" />
          View Cart ({totalItems})
        </Link>}

      <Footer />
    </div>;
};
export default TruckDetails;
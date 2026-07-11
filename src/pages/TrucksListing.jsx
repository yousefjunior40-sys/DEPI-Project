import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TruckCard from "@/components/TruckCard";
import { useApp } from "@/contexts/AppContext";
import { CAIRO_AREAS, calculateDistance, formatDistance } from "@/data/cairoLocations";
const TrucksListing = () => {
  const {
    data,
    currentUser
  } = useApp();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const [search, setSearch] = useState(initialSearch);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(() => {
    if (!initialCategory) return "";
    const activeCuisines = Array.from(new Set(data.trucks.map(t => t.cuisine)));
    const matched = activeCuisines.find(c => c.toLowerCase().includes(initialCategory.toLowerCase()) || initialCategory.toLowerCase().includes(c.toLowerCase()));
    return matched || "";
  });
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [showFilters, setShowFilters] = useState(false);

  // Get active user's coordinate or default to Nasr City coordinate
  const userAreaId = currentUser?.area || "nasr-city";
  const userArea = CAIRO_AREAS.find(a => a.id === userAreaId) || CAIRO_AREAS[0];
  const userCoordinates = currentUser?.coordinates || userArea.coordinates;

  // Filter food trucks
  const activeTrucks = data.trucks.filter(t => t.status === "active");
  const cuisinesList = Array.from(new Set(activeTrucks.map(t => t.cuisine)));

  // Map and calculate distance for active trucks
  const trucksWithDistance = activeTrucks.map(truck => {
    const distanceKm = calculateDistance(userCoordinates.lat, userCoordinates.lng, truck.coordinates.lat, truck.coordinates.lng);
    return {
      ...truck,
      distanceKm,
      distance: formatDistance(distanceKm)
    };
  });
  const filtered = trucksWithDistance.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.cuisine.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedArea && t.area !== selectedArea) return false;
    if (selectedCuisine && t.cuisine !== selectedCuisine) return false;
    if (selectedPrice && t.priceRange !== selectedPrice) return false;
    if (selectedRating && t.rating < parseFloat(selectedRating)) return false;
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "distance") {
      return a.distanceKm - b.distanceKm;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    if (sortBy === "price") {
      const priceMap = {
        "$": 1,
        "$$": 2,
        "$$$": 3
      };
      return priceMap[a.priceRange] - priceMap[b.priceRange];
    }
    return 0;
  });
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold">Food Trucks</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Calculating distances relative to <span className="font-semibold text-foreground">{userArea.name}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5" /> Sort By:
            </span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs outline-none focus:ring-1 focus:ring-ring font-medium">
              <option value="distance">Nearest Distance</option>
              <option value="rating">Highest Rating</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>
        </div>

        {/* Search & Filter bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center bg-card rounded-xl shadow-soft px-4 border border-border/40">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input type="text" placeholder="Search trucks or cuisine..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent border-0 outline-none px-3 py-3 text-sm" />
            {search && <button onClick={() => setSearch("")}><X className="h-4 w-4 text-muted-foreground" /></button>}
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 px-4 py-3 bg-card rounded-xl shadow-soft text-sm font-medium hover:bg-muted border border-border/40 transition-colors">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && <div className="bg-card rounded-xl shadow-soft p-5 mb-6 border border-border animate-fade-in space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Area filter */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">District / Area</label>
                <select value={selectedArea} onChange={e => setSelectedArea(e.target.value)} className="w-full px-3 py-2 bg-background border border-input rounded-lg text-xs outline-none focus:ring-1 focus:ring-ring">
                  <option value="">All Areas</option>
                  {CAIRO_AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              {/* Cuisine filter */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cuisine</label>
                <select value={selectedCuisine} onChange={e => setSelectedCuisine(e.target.value)} className="w-full px-3 py-2 bg-background border border-input rounded-lg text-xs outline-none focus:ring-1 focus:ring-ring">
                  <option value="">All Cuisines</option>
                  {cuisinesList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Price filter */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Price Range</label>
                <select value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)} className="w-full px-3 py-2 bg-background border border-input rounded-lg text-xs outline-none focus:ring-1 focus:ring-ring">
                  <option value="">All Prices</option>
                  <option value="$">$ (Inexpensive)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (Premium)</option>
                </select>
              </div>

              {/* Rating filter */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Min. Rating</label>
                <select value={selectedRating} onChange={e => setSelectedRating(e.target.value)} className="w-full px-3 py-2 bg-background border border-input rounded-lg text-xs outline-none focus:ring-1 focus:ring-ring">
                  <option value="">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(selectedArea || selectedCuisine || selectedPrice || selectedRating) && <div className="flex justify-end pt-2">
                <button onClick={() => {
            setSelectedArea("");
            setSelectedCuisine("");
            setSelectedPrice("");
            setSelectedRating("");
          }} className="text-xs text-destructive hover:underline font-semibold flex items-center gap-1">
                  <X className="h-3.5 w-3.5" /> Clear All Filters
                </button>
              </div>}
          </div>}

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">{sorted.length} active food trucks found</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((truck, i) => <div key={truck.id} className="animate-fade-in" style={{
          animationDelay: `${i * 80}ms`
        }}>
              <TruckCard truck={truck} />
            </div>)}
        </div>
        
        {sorted.length === 0 && <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-muted-foreground font-medium">No active trucks match your query</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Try resetting filters or checking another area</p>
          </div>}
      </div>
      <Footer />
    </div>;
};
export default TrucksListing;
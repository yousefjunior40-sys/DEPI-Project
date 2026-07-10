import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowRight, ChevronRight, ChevronLeft, ChevronDown, Star, UtensilsCrossed, Heart, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TruckCard from "@/components/TruckCard";
import { categories } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import mobileAppImage from "@/assets/mobile-app.png";
import useEmblaCarousel from "embla-carousel-react";
const Index = () => {
  const {
    data,
    currentUser
  } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true
  });
  const prev = () => emblaApi?.scrollPrev();
  const next = () => emblaApi?.scrollNext();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  // Show only active trucks, up to 6 featured
  const featuredTrucks = (data?.trucks || []).filter(t => t && t.status === 'active').slice(0, 6);
  const mobileAppRef = useRef(null);
  const [mobileAppVisible, setMobileAppVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setMobileAppVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    if (mobileAppRef.current) {
      observer.observe(mobileAppRef.current);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);
  return <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-slide-up opacity-0" style={{
            animationDelay: "0.1s"
          }}>
              <MapPin className="h-4 w-4" />
              <span>Food trucks near you</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-slide-up opacity-0" style={{
            animationDelay: "0.2s"
          }}>
              Street Food,{" "}
              <span className="text-accent relative">
                Delivered
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C30 3 70 2 100 5C130 8 170 7 198 3" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                </svg>
              </span>{" "}
              to You
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto animate-slide-up opacity-0" style={{
            animationDelay: "0.3s"
          }}>
              Discover the best food trucks in your area. Order delicious street food and get it delivered fresh.
            </p>



            {/* Search */}
            <form onSubmit={e => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/trucks?search=${encodeURIComponent(searchQuery.trim())}`);
            } else {
              navigate("/trucks");
            }
          }} className="flex items-center bg-card rounded-xl shadow-card p-2 max-w-lg mx-auto animate-slide-up opacity-0" style={{
            animationDelay: "0.4s"
          }}>
              <Search className="h-5 w-5 text-muted-foreground ml-3" />
              <input type="text" placeholder="Find food trucks near you..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1 bg-transparent border-0 outline-none px-3 py-2 text-sm placeholder:text-muted-foreground" />
              <button type="submit" className="px-5 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                Search
              </button>
            </form>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground animate-slide-up opacity-0" style={{
            animationDelay: "0.6s"
          }}>
              <span className="flex items-center gap-1.5">
                <span className="text-accent font-bold">500+</span> Food Trucks
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5">
                <span className="text-accent font-bold">4.8</span> Avg Rating
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5">
                <span className="text-accent font-bold">15min</span> Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Floating food emojis — smoother float animation */}
        <div className="absolute top-20 left-10 text-4xl opacity-15 animate-float pointer-events-none" style={{
        animationDelay: "0s"
      }}>🍔</div>
        <div className="absolute top-32 right-16 text-3xl opacity-15 animate-float pointer-events-none" style={{
        animationDelay: "1.5s"
      }}>🌮</div>
        <div className="absolute bottom-20 left-1/4 text-3xl opacity-15 animate-float pointer-events-none" style={{
        animationDelay: "3s"
      }}>🍕</div>
        <div className="absolute bottom-10 right-1/3 text-4xl opacity-15 animate-float pointer-events-none" style={{
        animationDelay: "4.5s"
      }}>🥤</div>
        <div className="absolute top-1/2 left-6 text-2xl opacity-10 animate-float pointer-events-none hidden md:block" style={{
        animationDelay: "2s"
      }}>🌯</div>
        <div className="absolute top-16 right-1/4 text-2xl opacity-10 animate-float pointer-events-none hidden md:block" style={{
        animationDelay: "3.5s"
      }}>🍩</div>
      </section>
      {showScrollIndicator && <a href="#categories" className="fixed right-6 bottom-10 z-50 animate-bounce">
          <div className="flex flex-col items-center gap-2">

            <div className="w-7 h-12 rounded-full border-2 border-orange-500 flex justify-center">

              <div className="w-1.5 h-3 bg-orange-500 rounded-full mt-2 animate-pulse"></div>

            </div>

            <ChevronDown className="w-5 h-5 text-orange-500" />

          </div>
        </a>}

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">

        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold">
            Browse by Category
          </h2>

          <div className="flex gap-2">

            <button onClick={prev} className="w-10 h-10 rounded-full bg-white shadow-lg border hover:bg-orange-500 hover:text-white transition">
              <ChevronLeft className="mx-auto h-5 w-5" />
            </button>

            <button onClick={next} className="w-10 h-10 rounded-full bg-white shadow-lg border hover:bg-orange-500 hover:text-white transition">
              <ChevronRight className="mx-auto h-5 w-5" />
            </button>

          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>

          <div className="flex">

            {categories.map(cat => <div key={cat.id} className="flex-[0_0_20%] px-2">

                <Link to={`/trucks?category=${cat.id}`} className="h-28 rounded-2xl bg-card shadow hover:shadow-xl transition flex flex-col justify-center items-center">

                  <div className="text-4xl">
                    {cat.icon}
                  </div>

                  <div className="mt-2 text-sm font-medium">
                    {cat.name}
                  </div>

                </Link>

              </div>)}

          </div>

        </div>

      </section>

      {/* Featured Trucks */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">Featured Food Trucks</h2>
          <Link to="/trucks" className="text-sm text-accent font-medium flex items-center gap-1 hover:underline">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrucks.map((truck, i) => <div key={truck.id} className="animate-fade-in opacity-0" style={{
          animationDelay: `${i * 100}ms`
        }}>
              <TruckCard truck={truck} />
            </div>)}
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold mb-6">Trucks Near You</h2>
        <div className="rounded-2xl overflow-hidden bg-card shadow-card h-72 flex items-center justify-center border border-border relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="text-center relative z-10">
            <MapPin className="h-12 w-12 text-accent mx-auto mb-3 animate-float" />
            <p className="text-muted-foreground font-medium">Interactive map coming soon</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Find food trucks around your location</p>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section ref={mobileAppRef} className="container mx-auto px-4 py-20 overflow-hidden">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transform ${mobileAppVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`} style={{
        transition: "all 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s"
      }}>
          {/* Left side: Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full items-center">
                Mobile App
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Take TruckSpot <span className="text-accent">Everywhere</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg">
                Download our app and never miss your favorite food truck again.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-sm">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <p className="text-muted-foreground pt-1.5 text-sm leading-relaxed max-w-md">
                  Truck Spot helps users easily discover nearby food trucks through an interactive map.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-sm">
                  <Star className="h-5 w-5 text-secondary" />
                </div>
                <p className="text-muted-foreground pt-1.5 text-sm leading-relaxed max-w-md">
                  Users can explore menus, view locations, and read ratings before visiting a food truck.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-sm">
                  <UtensilsCrossed className="h-5 w-5 text-secondary" />
                </div>
                <p className="text-muted-foreground pt-1.5 text-sm leading-relaxed max-w-md">
                  The platform also allows food truck owners to register their trucks and share their menus.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-sm">
                  <Heart className="h-5 w-5 text-secondary" />
                </div>
                <p className="text-muted-foreground pt-1.5 text-sm leading-relaxed max-w-md">
                  Our goal is to create a simple hub that connects food lovers with the best street food around them.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-3 bg-[#333] hover:bg-black text-white px-5 py-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 group">
                <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                <div className="text-left">
                  <div className="text-[10px] leading-[1.1] opacity-80">Download on the</div>
                  <div className="text-sm font-semibold leading-[1.1]">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-[#333] hover:bg-black text-white px-5 py-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 group">
                <Play className="h-6 w-6 fill-current group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] leading-[1.1] opacity-80">Get it on</div>
                  <div className="text-sm font-semibold leading-[1.1]">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-secondary/5 rounded-full blur-3xl transform -rotate-12 scale-110"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 rounded-full blur-2xl"></div>
            <div className="relative z-10 w-full max-w-xl mx-auto">
              <img src={mobileAppImage} alt="TruckSpot Mobile App" className="w-full shadow-2xl shadow-foreground/10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.25rem] hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA — hidden for authenticated users */}
      {!currentUser && <section className="container mx-auto px-4 py-12">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12 text-primary-foreground text-center relative overflow-hidden group">
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/3 rounded-full" />

            <h2 className="font-display text-3xl font-bold mb-3 relative z-10">Own a Food Truck?</h2>
            <p className="opacity-80 mb-6 max-w-md mx-auto relative z-10">
              Join TruckSpot and reach thousands of hungry customers. Start getting orders today.
            </p>
            <Link to="/register" className="inline-flex px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 relative z-10">
              Get Started
            </Link>
          </div>
        </section>}

      <Footer />
    </div>;
};
export default Index;
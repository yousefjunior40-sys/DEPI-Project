import { Link } from 'react-router-dom';
import { MapPin, Clock, Star } from 'lucide-react';
const TruckCard = ({
  truck
}) => <Link to={`/trucks/${truck.id}`} className="group block rounded-xl overflow-hidden bg-gray-50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5">
    <div className="relative h-44 overflow-hidden">
      <img src={truck.image} alt={truck.name} onError={() => console.log("Image Error:", truck.image)} onLoad={() => console.log("Loaded:", truck.image)} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {truck.isOpen ? <span className="absolute top-3 left-3 px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full shadow-sm">
          Open
        </span> : <span className="absolute top-3 left-3 px-2.5 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
          Closed
        </span>}
      <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#FFF8F1]/90 backdrop-blur-sm text-foreground text-xs font-semibold rounded-full">
        {truck.priceRange}
      </span>
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between">
        <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors duration-200">
          {truck.name}
        </h3>
        <div className="flex items-center gap-1 text-accent">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-semibold">{truck.rating}</span>
          <span className="text-xs text-muted-foreground">({truck.reviewCount})</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{truck.cuisine}</p>
      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {truck.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> ~{truck.prepTime} min
        </span>
      </div>
    </div>
  </Link>;
export default TruckCard;
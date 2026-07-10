import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { CAIRO_AREAS } from "@/data/cairoLocations";
import { Clock, MapPin, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
const MyTruck = () => {
  const {
    currentUser,
    getVendorTruck,
    updateTruck
  } = useApp();
  if (!currentUser) return null;
  const truck = getVendorTruck(currentUser.id);
  if (!truck) {
    return <div className="text-center py-12">
        <p className="text-muted-foreground font-medium">Truck profile not configured.</p>
      </div>;
  }
  const [name, setName] = useState(truck.name);
  const [description, setDescription] = useState(truck.description);
  const [cuisine, setCuisine] = useState(truck.cuisine);
  const [prepTime, setPrepTime] = useState(truck.prepTime);
  const [phone, setPhone] = useState(truck.phone ?? "");
  const [hours, setHours] = useState(truck.hours);
  const [image, setImage] = useState(truck.image);
  const [area, setArea] = useState(truck.area);
  const [address, setAddress] = useState(truck.address ?? "");
  const [latitude, setLatitude] = useState(truck.coordinates.lat.toString());
  const [longitude, setLongitude] = useState(truck.coordinates.lng.toString());
  const [loading, setLoading] = useState(false);
  const handleToggleOpen = () => {
    updateTruck(truck.id, {
      isOpen: !truck.isOpen
    });
    toast.success(`Food truck is now ${!truck.isOpen ? "OPEN" : "CLOSED"}`);
  };
  const handleSave = e => {
    e.preventDefault();
    if (!name.trim() || !cuisine.trim()) {
      toast.error("Truck Name and Cuisine are required.");
      return;
    }
    setLoading(true);
    const latVal = parseFloat(latitude) || 30.0444;
    const lngVal = parseFloat(longitude) || 31.2357;
    const matchedArea = CAIRO_AREAS.find(a => a.id === area);
    const locationName = matchedArea ? matchedArea.name : area;
    updateTruck(truck.id, {
      name: name.trim(),
      description: description.trim(),
      cuisine: cuisine.trim(),
      prepTime: Number(prepTime) || 20,
      phone: phone.trim(),
      hours: hours.trim(),
      image: image.trim(),
      area,
      location: locationName,
      address: address.trim(),
      coordinates: {
        lat: latVal,
        lng: lngVal
      }
    });
    setLoading(false);
    toast.success("Food truck profile updated successfully!");
  };
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        toast.success("Successfully fetched current GPS coordinates!");
      }, () => {
        toast.error("Unable to retrieve location. Please input coordinates manually.");
      });
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };
  return <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">My Truck</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your food truck details and availability status.</p>
        </div>
        <button onClick={handleToggleOpen} className={`px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all duration-300 ${truck.isOpen ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
          {truck.isOpen ? "Open Now" : "Closed"}
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-card rounded-xl shadow-soft p-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Truck Name *</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Cuisine Category *</label>
            <input type="text" required value={cuisine} onChange={e => setCuisine(e.target.value)} placeholder="e.g. Burgers, Pizza, Tacos" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell customers about your ingredients, specials, awards, or history..." className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Prep Time (Minutes) *</label>
            <input type="number" required min="5" max="90" value={prepTime} onChange={e => setPrepTime(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Business Hours</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={hours} onChange={e => setHours(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Banner Image URL</label>
            <input type="url" value={image} onChange={e => setImage(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="font-display font-semibold text-base mb-3 flex items-center gap-1.5 text-foreground">
            <MapPin className="h-4 w-4 text-accent" /> Location details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Cairo Area / District</label>
              <select value={area} onChange={e => setArea(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select Area</option>
                {CAIRO_AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Street Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Latitude</label>
              <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Longitude</label>
              <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <button type="button" onClick={handleGetLocation} className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline">
            <RefreshCw className="h-3 w-3" /> Fetch Current Location coordinates
          </button>
        </div>

        <div className="flex justify-end border-t border-border pt-4">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60">
            <Check className="h-4 w-4" /> Save Profile
          </button>
        </div>
      </form>
    </div>;
};
export default MyTruck;
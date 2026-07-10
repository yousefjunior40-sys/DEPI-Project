import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Bike, Phone, User, MapPin, X } from "lucide-react";
import { toast } from "sonner";
const statusStyles = {
  available: "bg-emerald-100 text-emerald-800",
  on_delivery: "bg-accent/10 text-accent font-semibold",
  offline: "bg-muted text-muted-foreground"
};
const PlatformDelivery = () => {
  const {
    data,
    addDriver
  } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("Motorbike");
  const [status, setStatus] = useState("available");
  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter driver name");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter driver phone number");
      return;
    }
    addDriver({
      name: name.trim(),
      phone: phone.trim(),
      status,
      vehicleType
    });
    toast.success("Driver added successfully!");
    setShowAddModal(false);
    setName("");
    setPhone("");
    setVehicleType("Motorbike");
    setStatus("available");
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold font-display">Delivery Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor drivers, dispatch status, vehicle details, and active order delivery logistics.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
          Add Driver
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Driver</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Vehicle Type</th>
                <th className="p-4">Assigned Order</th>
                <th className="p-4">Pickup Truck</th>
                <th className="p-4">Delivery Address</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {data.drivers.map(driver => {
              const activeOrder = data.orders.find(o => o.id === driver.currentOrderId);
              return <tr key={driver.id} className="hover:bg-background/40 transition-colors">
                    <td className="p-4 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{driver.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground/60" />
                        <span>{driver.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Bike className="h-3.5 w-3.5 text-muted-foreground/60" />
                        <span>{driver.vehicleType || "Motorbike"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {activeOrder ? <span className="font-semibold text-primary">{activeOrder.id}</span> : <span className="text-muted-foreground/50">None</span>}
                    </td>
                    <td className="p-4">
                      {activeOrder ? <span className="text-muted-foreground">{activeOrder.truckName}</span> : <span className="text-muted-foreground/30">—</span>}
                    </td>
                    <td className="p-4 max-w-xs truncate">
                      {activeOrder ? <span className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-accent flex-shrink-0" />
                          <span className="truncate">{activeOrder.deliveryAddress}</span>
                        </span> : <span className="text-muted-foreground/30">—</span>}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold capitalize ${statusStyles[driver.status]}`}>
                        {driver.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>;
            })}
              {data.drivers.length === 0 && <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground font-medium">
                    No drivers registered on the platform.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Driver Modal */}
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowAddModal(false)} />
          <form onSubmit={handleSubmit} className="relative bg-card rounded-2xl shadow-elevated border border-border w-full max-w-md p-6 space-y-4 animate-scale-in">
            <button type="button" onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>

            <h3 className="font-display font-bold text-lg text-foreground mb-4">Add Delivery Driver</h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Full Name *</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Aly Hassan" className="w-full p-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring font-sans" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Phone Number *</label>
              <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +20 100 234 5678" className="w-full p-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring font-sans" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Vehicle Type</label>
                <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="w-full p-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option value="Motorbike">Motorbike</option>
                  <option value="Car">Car</option>
                  <option value="Bicycle">Bicycle</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Initial Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring font-semibold">
                  <option value="available">Available</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-semibold hover:bg-muted/80 transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shadow-sm">
                Add Driver
              </button>
            </div>
          </form>
        </div>}
    </div>;
};
export default PlatformDelivery;
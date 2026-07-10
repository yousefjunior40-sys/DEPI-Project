import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { MapPin, User, Store, Bike, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
const allStatuses = ["pending", "accepted", "preparing", "ready", "out_for_delivery", "delivered", "cancelled"];
const statusStyles = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-blue-100 text-blue-800",
  preparing: "bg-primary/10 text-primary",
  ready: "bg-secondary/10 text-secondary font-semibold",
  out_for_delivery: "bg-accent/10 text-accent font-semibold",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-destructive/10 text-destructive"
};
const PlatformOrders = () => {
  const {
    data,
    updateOrderStatus,
    assignDriver
  } = useApp();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
    toast.success(`Order ${orderId} updated to ${status.replace("_", " ")}`);
  };
  const handleDriverChange = (orderId, driverId) => {
    assignDriver(orderId, driverId);
    toast.success(`Assigned driver to order ${orderId}`);
  };
  return <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold font-display">System-wide Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and track all customer orders, drivers, and delivery routing states.</p>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Food Truck</th>
                <th className="p-4">Driver</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {data.orders.map(order => {
              const isExpanded = expandedOrder === order.id;
              const activeDriver = data.drivers.find(d => d.id === order.assignedDriverId);
              const availableDrivers = data.drivers.filter(d => d.status === "available" || d.id === order.assignedDriverId);
              return <>
                    <tr key={order.id} className="hover:bg-background/40 transition-colors">
                      <td className="p-4 font-semibold font-display text-foreground">{order.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{order.customerName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Store className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{order.truckName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {order.orderType === 'pickup' ? <span className="text-xs text-muted-foreground font-medium italic">Pickup</span> : order.status === "cancelled" || order.status === "delivered" ? <span className="text-xs text-muted-foreground">{activeDriver?.name ?? "—"}</span> : <select value={order.assignedDriverId ?? ""} onChange={e => handleDriverChange(order.id, e.target.value)} className="px-2 py-1 bg-background border border-input rounded text-xs outline-none focus:ring-1 focus:ring-ring font-medium max-w-[120px]">
                            <option value="">Assign Driver</option>
                            {availableDrivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>}
                      </td>
                      <td className="p-4 text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                      </td>
                      <td className="p-4 font-semibold">${order.total.toFixed(2)}</td>
                      <td className="p-4">
                        <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value)} className={`px-2 py-1 rounded text-xs font-semibold outline-none border-0 appearance-none text-center cursor-pointer ${statusStyles[order.status]}`}>
                          {allStatuses.map(st => <option key={st} value={st} className="bg-card text-foreground">{st.replace("_", " ")}</option>)}
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="inline-flex p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && <tr className="bg-muted/10">
                        <td colSpan={8} className="p-4 border-b border-border">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted-foreground font-sans">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground text-sm font-display mb-1">Items Summary</h4>
                              {order.items.map((item, idx) => <div key={idx} className="flex justify-between max-w-sm">
                                  <span>{item.quantity}× {item.name}</span>
                                  <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>)}
                              <div className="flex justify-between max-w-sm pt-1.5 border-t border-border/80 font-bold text-foreground">
                                <span>Total (inc. fees)</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground text-sm font-display mb-1">Shipping & Payment</h4>
                              <p className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                                <span className="font-medium text-foreground">{order.deliveryAddress}</span>
                              </p>
                              <p>Payment Mode: <span className="uppercase font-semibold text-foreground">{order.paymentMethod}</span></p>
                              {activeDriver && <p className="flex items-center gap-1.5">
                                  <Bike className="h-3.5 w-3.5 text-secondary" />
                                  <span>Driver Phone: <span className="font-semibold text-foreground">{activeDriver.phone}</span></span>
                                </p>}
                            </div>
                          </div>
                        </td>
                      </tr>}
                  </>;
            })}
              {data.orders.length === 0 && <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground font-medium">
                    No orders placed in the system yet.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default PlatformOrders;
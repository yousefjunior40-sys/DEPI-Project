import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, MapPin, Package, Phone } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
const statusConfig = {
  pending: {
    label: "Pending Approval",
    color: "bg-amber-100 text-amber-800",
    nextLabel: "Accept Order",
    nextStatus: "accepted"
  },
  accepted: {
    label: "Accepted",
    color: "bg-blue-100 text-blue-800",
    nextLabel: "Start Preparing",
    nextStatus: "preparing"
  },
  preparing: {
    label: "Preparing",
    color: "bg-primary/10 text-primary",
    nextLabel: "Mark as Ready",
    nextStatus: "ready"
  },
  ready: {
    label: "Ready for Pickup",
    color: "bg-secondary/10 text-secondary",
    nextLabel: "Ship Order",
    nextStatus: "out_for_delivery"
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-accent/10 text-accent",
    nextLabel: "Mark Delivered",
    nextStatus: "delivered"
  },
  delivered: {
    label: "Delivered",
    color: "bg-muted text-muted-foreground",
    nextLabel: null,
    nextStatus: null
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-destructive/10 text-destructive",
    nextLabel: null,
    nextStatus: null
  }
};
const tabs = ["All", "Pending", "Accepted", "Preparing", "Ready", "On-the-way", "Delivered"];
const AdminOrders = () => {
  const {
    currentUser,
    getVendorTruck,
    getTruckOrders,
    updateOrderStatus
  } = useApp();
  const [activeTab, setActiveTab] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);
  if (!currentUser) return null;
  const truck = getVendorTruck(currentUser.id);
  if (!truck) {
    return <div className="text-center py-12">
        <p className="text-muted-foreground">Truck profile not configured. Please complete your profile configuration first.</p>
      </div>;
  }
  const orders = getTruckOrders(truck.id);
  const getFilteredOrders = () => {
    if (activeTab === "All") return orders;
    if (activeTab === "On-the-way") {
      return orders.filter(o => o.status === "out_for_delivery");
    }
    return orders.filter(o => o.status === activeTab.toLowerCase());
  };
  const filteredOrders = getFilteredOrders();
  const handleStatusUpdate = (orderId, nextStatus) => {
    updateOrderStatus(orderId, nextStatus);
    toast.success(`Order status updated to: ${statusConfig[nextStatus].label}`);
  };
  const handleCancelOrder = orderId => {
    if (confirm("Are you sure you want to cancel this order?")) {
      updateOrderStatus(orderId, "cancelled");
      toast.error("Order cancelled.");
    }
  };
  return <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {orders.filter(o => o.status === "pending").length} new ·{" "}
          {orders.filter(o => o.status === "preparing").length} preparing ·{" "}
          {orders.filter(o => o.status === "ready").length} ready for pickup
        </p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(tab => {
        let count = 0;
        if (tab === "All") {
          count = orders.length;
        } else if (tab === "On-the-way") {
          count = orders.filter(o => o.status === "out_for_delivery").length;
        } else {
          count = orders.filter(o => o.status === tab.toLowerCase()).length;
        }
        return <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === tab ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-foreground/70 hover:bg-muted/60"}`}>
              {tab}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-primary-foreground/20" : "bg-muted"}`}>
                {count}
              </span>
            </button>;
      })}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order, i) => {
        const config = statusConfig[order.status];
        const isExpanded = expandedOrder === order.id;
        return <div key={order.id} className="bg-card rounded-xl shadow-soft overflow-hidden animate-scale-in opacity-0 hover:shadow-card transition-shadow duration-300 border border-border" style={{
          animationDelay: `${i * 60}ms`
        }}>
              {/* Order Header */}
              <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-background/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm font-display text-foreground">{order.id}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${config?.color}`}>
                        {config?.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {order.customerName} · {order.items.length} items · ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                  </span>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && <div className="px-4 pb-4 border-t border-border animate-fade-in">
                  <div className="pt-4 space-y-3">
                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => <div key={idx} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.quantity}× {item.name}
                          </span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>)}
                      <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Address & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm pt-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                        <span className="truncate">{order.deliveryAddress}</span>
                      </div>
                      {order.customerPhone && <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                          <span>{order.customerPhone}</span>
                        </div>}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex gap-2">
                        {/* Only show manual Accept button for pending orders */}
                        {order.status === 'pending' && <button onClick={() => handleStatusUpdate(order.id, 'accepted')} className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shadow-sm">
                            <Package className="h-4 w-4" />
                            Accept Order
                          </button>}
                        
                        {order.status !== "delivered" && order.status !== "cancelled" && <button onClick={() => handleCancelOrder(order.id)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors">
                            Cancel Order
                          </button>}
                      </div>

                      {/* Auto-tracking info for orders past pending */}
                      {['accepted', 'preparing', 'ready', 'out_for_delivery'].includes(order.status) && <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/5 border border-secondary/20 text-secondary text-xs font-medium animate-fade-in">
                          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse flex-shrink-0" />
                          Auto-tracking active — order will progress through stages automatically
                        </div>}
                    </div>
                  </div>
                </div>}
            </div>;
      })}
      </div>

      {filteredOrders.length === 0 && <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-3xl mb-2">📦</p>
          <p className="text-muted-foreground font-medium">No orders found</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Orders will appear here when received</p>
        </div>}
    </div>;
};
export default AdminOrders;
import { useApp } from "@/contexts/AppContext";
import { DollarSign, ShoppingBag, Store, Users, Bike, Star, ClipboardList, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
const PlatformDashboard = () => {
  const {
    data
  } = useApp();
  const totalSales = data.orders.filter(o => o.status === "delivered").reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = data.orders.filter(o => !["delivered", "cancelled"].includes(o.status)).length;
  const ordersTodayCount = data.orders.filter(o => {
    const orderDate = new Date(o.createdAt).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  }).length;
  const outForDeliveryCount = data.orders.filter(o => o.status === "out_for_delivery").length;
  const totalFoodTrucksCount = data.trucks.length;
  const activeFoodTrucksCount = data.trucks.filter(t => t.status === "active").length;
  const totalUsersCount = data.users.length;

  // Calculate average rating of all active trucks
  const activeTrucks = data.trucks.filter(t => t.status === "active");
  const averageRating = activeTrucks.length > 0 ? activeTrucks.reduce((sum, t) => sum + t.rating, 0) / activeTrucks.length : 0;
  const stats = [{
    label: "Orders Today",
    value: ordersTodayCount.toString(),
    change: "Received today",
    icon: ClipboardList,
    color: "text-primary bg-primary/10"
  }, {
    label: "Active Orders",
    value: activeOrdersCount.toString(),
    change: "Currently processing",
    icon: ShoppingBag,
    color: "text-accent bg-accent/10"
  }, {
    label: "Total Sales",
    value: `$${totalSales.toFixed(2)}`,
    change: "Fulfillments total",
    icon: DollarSign,
    color: "text-accent bg-accent/10"
  }, {
    label: "Total Food Trucks",
    value: totalFoodTrucksCount.toString(),
    change: `${activeFoodTrucksCount} active listings`,
    icon: Store,
    color: "text-secondary bg-secondary/10"
  }, {
    label: "Out For Delivery",
    value: outForDeliveryCount.toString(),
    change: "On the road",
    icon: Bike,
    color: "text-primary bg-primary/10"
  }, {
    label: "Total Users",
    value: totalUsersCount.toString(),
    change: "Registered customers/vendors",
    icon: Users,
    color: "text-secondary bg-secondary/10"
  }, {
    label: "Average Rating",
    value: averageRating > 0 ? averageRating.toFixed(1) : "N/A",
    change: "Across active vendors",
    icon: Star,
    color: "text-accent bg-accent/10"
  }];
  return <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Platform Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time statistics across all users, listings, and order streams.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => <div key={stat.label} className="bg-card rounded-xl border border-border shadow-soft p-5 animate-scale-in opacity-0 hover:shadow-card transition-shadow duration-300" style={{
        animationDelay: `${i * 80}ms`
      }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-secondary" />
                Live
              </span>
            </div>
            <p className="text-2xl font-bold font-display">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-normal">{stat.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.change}</p>
          </div>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Platform Orders */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">System-wide Orders</h2>
            <Link to="/platform-admin/orders" className="text-xs text-accent font-medium flex items-center gap-0.5 hover:underline">
              View all manager <TrendingUp className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {data.orders.slice(0, 5).map(order => <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-background/60 hover:bg-background transition-colors border border-border/40">
                <div>
                  <p className="text-sm font-semibold">{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.customerName} → {order.truckName} · ${order.total.toFixed(2)}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${order.status === "delivered" ? "bg-secondary/10 text-secondary" : order.status === "out_for_delivery" ? "bg-accent/10 text-accent font-medium" : order.status === "preparing" ? "bg-primary/10 text-primary" : order.status === "pending" ? "bg-amber-100 text-amber-800" : order.status === "cancelled" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                  {order.status.replace("_", " ")}
                </span>
              </div>)}
            {data.orders.length === 0 && <p className="text-center py-6 text-sm text-muted-foreground">No orders in the system.</p>}
          </div>
        </div>

        {/* Pending Food Truck Approvals */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Pending Registrations</h2>
            <Link to="/platform-admin/trucks" className="text-xs text-accent font-medium flex items-center gap-0.5 hover:underline">
              Approve Vendors <TrendingUp className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {data.trucks.filter(t => t.status === "pending").slice(0, 5).map(truck => <div key={truck.id} className="flex items-center justify-between p-3 rounded-lg bg-background/60 hover:bg-background transition-colors border border-border/40">
                <div className="flex items-center gap-3">
                  <img src={truck.image} alt={truck.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{truck.name}</p>
                    <p className="text-xs text-muted-foreground">{truck.cuisine} · {truck.location}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  UNDER REVIEW
                </span>
              </div>)}
            {data.trucks.filter(t => t.status === "pending").length === 0 && <p className="text-center py-6 text-sm text-muted-foreground">No pending registrations to review.</p>}
          </div>
        </div>
      </div>
    </div>;
};
export default PlatformDashboard;
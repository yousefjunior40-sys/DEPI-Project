import { DollarSign, ShoppingBag, Star, UtensilsCrossed, ChevronRight, Store, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
const AdminDashboard = () => {
  const {
    currentUser,
    getVendorTruck,
    getTruckOrders,
    getTruckReviews
  } = useApp();
  if (!currentUser) return null;
  const truck = getVendorTruck(currentUser.id);
  if (!truck) {
    return <div className="bg-card rounded-xl p-6 text-center shadow-soft">
        <Store className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <h2 className="text-xl font-bold font-display">No Food Truck Found</h2>
        <p className="text-sm text-muted-foreground mt-1">Please register your food truck details.</p>
        <Link to="/vendor/my-truck" className="mt-4 inline-flex px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
          Create Truck Profile
        </Link>
      </div>;
  }
  const orders = getTruckOrders(truck.id);
  const reviews = getTruckReviews(truck.id);
  const pendingOrdersCount = orders.filter(o => o.status === "pending").length;
  const unrepliedReviewsCount = reviews.filter(r => !r.vendorReply).length;

  // Stats calculation
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === "delivered");
  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(o => !["delivered", "cancelled"].includes(o.status)).length;
  const stats = [{
    label: "Total Orders",
    value: totalOrders.toString(),
    change: `Active: ${activeOrders}`,
    icon: ShoppingBag,
    color: "text-primary bg-primary/10"
  }, {
    label: "Revenue",
    value: `$${totalRevenue.toFixed(2)}`,
    change: "Delivered sales",
    icon: DollarSign,
    color: "text-accent bg-accent/10"
  }, {
    label: "Menu Items",
    value: truck.menu.length.toString(),
    change: `${truck.menu.filter(m => m.popular).length} Popular`,
    icon: UtensilsCrossed,
    color: "text-secondary bg-secondary/10"
  }, {
    label: "Rating",
    value: truck.rating > 0 ? truck.rating.toFixed(1) : "N/A",
    change: `${truck.reviewCount} Reviews`,
    icon: Star,
    color: "text-accent bg-accent/10"
  }];

  // Recent activity logic
  const recentOrders = orders.slice(0, 3);
  const recentReviews = reviews.slice(0, 2);
  const activities = [...recentOrders.map(o => ({
    id: `ord-${o.id}`,
    text: `Order ${o.id} status is now ${o.status.replace("_", " ")}`,
    time: new Date(o.updatedAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }),
    type: "order",
    link: "/vendor/orders"
  })), ...recentReviews.map(r => ({
    id: `rev-${r.id}`,
    text: `New ${r.rating}-star review from ${r.customerName}`,
    time: new Date(r.createdAt).toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    }),
    type: "review",
    link: "/vendor/reviews"
  }))].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);
  return <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's your truck overview for <span className="font-semibold text-foreground">{truck.name}</span>.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${truck.isOpen ? 'bg-secondary animate-pulse' : 'bg-muted'}`} />
          <span className="text-sm font-medium text-muted-foreground">
            Status: {truck.isOpen ? "Open & Accepting Orders" : "Closed"}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => <div key={stat.label} className="bg-card rounded-xl shadow-soft p-5 animate-scale-in opacity-0 hover:shadow-card transition-shadow duration-300" style={{
        animationDelay: `${i * 100}ms`
      }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-card rounded-xl shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Recent Orders</h2>
            <Link to="/vendor/orders" className="text-xs text-accent font-medium flex items-center gap-0.5 hover:underline">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-background/60 hover:bg-background transition-colors">
                <div>
                  <p className="text-sm font-semibold">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.items.length} items · ${order.total.toFixed(2)}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${order.status === "delivered" ? "bg-secondary/10 text-secondary" : order.status === "out_for_delivery" ? "bg-accent/10 text-accent" : order.status === "preparing" ? "bg-primary/10 text-primary" : order.status === "ready" ? "bg-secondary/10 text-secondary font-bold" : order.status === "pending" ? "bg-accent/10 text-accent font-medium" : order.status === "accepted" ? "bg-primary/5 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {order.status.replace("_", " ")}
                </span>
              </div>)}
            {orders.length === 0 && <p className="text-center py-6 text-sm text-muted-foreground">No orders received yet.</p>}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-card rounded-xl shadow-soft p-5">
          <h2 className="font-display font-semibold text-lg mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map(item => <Link key={item.id} to={item.link} className="flex items-start gap-3 p-3 rounded-lg bg-background/60 hover:bg-background transition-colors block">
                <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${item.type === "order" ? "bg-accent" : item.type === "review" ? "bg-secondary" : "bg-primary"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              </Link>)}
            {activities.length === 0 && <p className="text-center py-6 text-sm text-muted-foreground">No recent activity.</p>}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/vendor/menu" className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Menu Management</p>
            <p className="text-xs text-muted-foreground">Add or update items</p>
          </div>
        </Link>
        <Link to="/vendor/orders" className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 group w-full">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
            <ShoppingBag className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">Manage Orders</p>
              {pendingOrdersCount > 0 && <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {pendingOrdersCount}
                </span>}
            </div>
            <p className="text-xs text-muted-foreground">Check incoming orders</p>
          </div>
        </Link>
        <Link to="/vendor/reviews" className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 group w-full">
          <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors flex-shrink-0">
            <Star className="h-5 w-5 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">Customer Reviews</p>
              {unrepliedReviewsCount > 0 && <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {unrepliedReviewsCount}
                </span>}
            </div>
            <p className="text-xs text-muted-foreground">Check & reply to feedback</p>
          </div>
        </Link>
      </div>
    </div>;
};
export default AdminDashboard;
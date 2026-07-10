import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, ClipboardList, Store, Star, BarChart3, Settings, ChevronLeft, MapPin, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import logo from "@/assets/logo-new.png";
import { toast } from "sonner";
const navItems = [{
  to: "/vendor",
  label: "Dashboard",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/vendor/orders",
  label: "Orders",
  icon: ClipboardList
}, {
  to: "/vendor/my-truck",
  label: "My Truck",
  icon: Store
}, {
  to: "/vendor/menu",
  label: "Menu Management",
  icon: UtensilsCrossed
}, {
  to: "/vendor/reviews",
  label: "Reviews",
  icon: Star
}, {
  to: "/vendor/analytics",
  label: "Analytics",
  icon: BarChart3
}, {
  to: "/vendor/settings",
  label: "Settings",
  icon: Settings
}];
const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentUser,
    getVendorTruck,
    getTruckOrders,
    getTruckReviews,
    logout
  } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Security guard for vendor layout
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (currentUser.role !== "vendor") {
      toast.error("Access denied. Vendors only.");
      navigate("/");
    } else if (currentUser.status === "pending_approval") {
      navigate("/pending-approval");
    }
  }, [currentUser, navigate]);
  if (!currentUser || currentUser.role !== "vendor" || currentUser.status === "pending_approval") {
    return null;
  }
  const truck = getVendorTruck(currentUser.id);
  const orders = truck ? getTruckOrders(truck.id) : [];
  const reviews = truck ? getTruckReviews(truck.id) : [];
  const initials = currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully");
    navigate("/");
  };
  const isLinkActive = item => {
    if (item.exact) {
      return location.pathname === item.to;
    }
    return location.pathname.startsWith(item.to);
  };
  return <div className="min-h-screen bg-background flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Logo */}
        <Link to="/vendor" className="flex items-center gap-2.5 px-5 py-4 border-b border-border hover:opacity-90">
          <img src={logo} alt="TruckSpot" className="h-8 w-8 object-contain rounded-full" />
          <span className="font-display font-bold text-lg text-primary flex items-center">
            TruckSp
            <MapPin className="h-4 w-4 text-accent inline -mx-0.5" />
            t
          </span>
          <span className="text-[10px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded ml-1">
            VENDOR
          </span>
        </Link>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
          const isActive = isLinkActive(item);

          // Compute badge counts for relevant sections
          let badgeCount = 0;
          if (truck) {
            if (item.to === "/vendor/orders") {
              badgeCount = orders.filter(o => o.status === "pending").length;
            } else if (item.to === "/vendor/reviews") {
              badgeCount = reviews.filter(r => !r.vendorReply).length;
            }
          }
          return <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-foreground hover:bg-muted/60"}`}>
                <item.icon className="h-4.5 w-4.5" />
                <span className="flex-1">{item.label}</span>
                {badgeCount > 0 && <span className={`ml-auto h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-destructive text-destructive-foreground animate-scale-in"}`}>
                    {badgeCount > 99 ? "99+" : badgeCount}
                  </span>}
              </Link>;
        })}
        </nav>

        {/* Logout & Back to site */}
        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/60 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors text-left">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border px-4 md:px-6 py-3 flex items-center justify-between">
          <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{truck ? truck.name : currentUser.name}</p>
              <p className="text-xs text-muted-foreground">Truck Owner</p>
            </div>
            {currentUser.avatar ? <img src={currentUser.avatar} alt={currentUser.name} className="h-9 w-9 rounded-full object-cover border border-border" /> : <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {initials}
              </div>}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default AdminLayout;
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Store, Users, Bike, BarChart3, ChevronLeft, MapPin, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import logo from "@/assets/logo-new.png";
import { toast } from "sonner";
const navItems = [{
  to: "/platform-admin",
  label: "Overview",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/platform-admin/orders",
  label: "Orders Manager",
  icon: ClipboardList
}, {
  to: "/platform-admin/trucks",
  label: "Food Trucks",
  icon: Store
}, {
  to: "/platform-admin/users",
  label: "Users List",
  icon: Users
}, {
  to: "/platform-admin/delivery",
  label: "Delivery Drivers",
  icon: Bike
}, {
  to: "/platform-admin/reports",
  label: "Financial Reports",
  icon: BarChart3
}];
const PlatformAdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentUser,
    logout
  } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Security guard for Platform Admin role
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (currentUser.role !== "admin") {
      toast.error("Access denied. Admins only.");
      navigate("/");
    }
  }, [currentUser, navigate]);
  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }
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
        <Link to="/platform-admin" className="flex items-center gap-2.5 px-5 py-4 border-b border-border hover:opacity-90">
          <img src={logo} alt="TruckSpot" className="h-8 w-8 object-contain rounded-full" />
          <span className="font-display font-bold text-lg text-primary flex items-center">
            TruckSp
            <MapPin className="h-4 w-4 text-accent inline -mx-0.5" />
            t
          </span>
          <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-1 uppercase">
            Admin
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
          const isActive = isLinkActive(item);
          return <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-foreground hover:bg-muted/60"}`}>
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
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
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">Platform Admin</p>
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
export default PlatformAdminLayout;
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';
import AvatarDropdown from '@/components/AvatarDropdown';
import NotificationCenter from '@/components/NotificationCenter';
import logo from '@/assets/logo-new.png';
const Navbar = () => {
  const {
    totalItems
  } = useCart();
  const {
    currentUser
  } = useApp();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  // Public links always shown
  const publicLinks = [{
    to: '/',
    label: 'Home'
  }, {
    to: '/trucks',
    label: 'Food Trucks'
  }];
  const isActive = to => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  const getHomeLink = () => {
    if (currentUser?.role === 'admin') return '/platform-admin';
    if (currentUser?.role === 'vendor') return '/vendor';
    return '/';
  };
  return <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to={getHomeLink()} className="flex items-center gap-2.5 group">
          <img src={logo} alt="TruckSpot" className="h-9 w-9 object-contain rounded-full drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
          <span className="font-display font-bold text-xl tracking-tight text-primary flex items-center">
            TruckSp
            <MapPin className="h-5 w-5 text-accent inline -mx-0.5 relative -top-px" />
            t
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {publicLinks.map(l => <Link key={l.to} to={l.to} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(l.to) ? 'text-primary' : 'text-foreground/70'}`}>
              {l.label}
            </Link>)}

          {/* Guest extra links */}
          {!currentUser && <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-foreground/70'}`}>
              About
            </Link>}

          {/* Customer: My Orders */}
          {currentUser?.role === 'customer' && <Link to="/orders" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/orders') ? 'text-primary' : 'text-foreground/70'}`}>
              My Orders
            </Link>}

          {/* Vendor: Dashboard */}
          {currentUser?.role === 'vendor' && <Link to="/vendor" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/vendor') ? 'text-primary' : 'text-foreground/70'}`}>
              Dashboard
            </Link>}

          {/* Admin: Dashboard */}
          {currentUser?.role === 'admin' && <Link to="/platform-admin" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/platform-admin') ? 'text-primary' : 'text-foreground/70'}`}>
              Dashboard
            </Link>}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Cart (always visible) */}
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted transition-colors" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold animate-scale-in">
                {totalItems}
              </span>}
          </Link>

          {/* Notifications */}
          {currentUser && <NotificationCenter />}

          {/* Authenticated: Avatar dropdown */}
          {currentUser ? <AvatarDropdown /> : <>
              <Link to="/login" className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Register
              </Link>
            </>}

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-full hover:bg-muted transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-1 animate-fade-in">
          {publicLinks.map(l => <Link key={l.to} to={l.to} onClick={close} className="block text-sm font-medium py-2.5 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors">
              {l.label}
            </Link>)}
          {!currentUser && <Link to="/about" onClick={close} className="block text-sm font-medium py-2.5 px-2 rounded-lg hover:bg-muted/60">
              About
            </Link>}
          {currentUser?.role === 'customer' && <Link to="/orders" onClick={close} className="block text-sm font-medium py-2.5 px-2 rounded-lg hover:bg-muted/60">
              My Orders
            </Link>}
          {currentUser?.role === 'vendor' && <Link to="/vendor" onClick={close} className="block text-sm font-medium py-2.5 px-2 rounded-lg hover:bg-muted/60">
              Dashboard
            </Link>}
          {currentUser?.role === 'admin' && <Link to="/platform-admin" onClick={close} className="block text-sm font-medium py-2.5 px-2 rounded-lg hover:bg-muted/60">
              Dashboard
            </Link>}
          {!currentUser && <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={close} className="flex-1 text-center py-2.5 rounded-lg border border-border text-sm font-medium">
                Sign In
              </Link>
              <Link to="/register" onClick={close} className="flex-1 text-center py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                Register
              </Link>
            </div>}
        </div>}
    </nav>;
};
export default Navbar;
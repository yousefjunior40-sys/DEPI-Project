import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LayoutDashboard, ClipboardList, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
const AvatarDropdown = () => {
  const {
    currentUser,
    logout
  } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  if (!currentUser) return null;
  const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/');
    setOpen(false);
  };

  // Role-based menu items
  const menuItems = () => {
    if (currentUser.role === 'customer') {
      return [{
        label: 'Profile',
        icon: User,
        to: '/profile'
      }, {
        label: 'Order History',
        icon: ClipboardList,
        to: '/orders'
      }, {
        label: 'Settings',
        icon: Settings,
        to: '/profile?tab=settings'
      }];
    }
    if (currentUser.role === 'vendor') {
      return [{
        label: 'Profile',
        icon: User,
        to: '/profile'
      }, {
        label: 'Dashboard',
        icon: LayoutDashboard,
        to: '/vendor'
      }, {
        label: 'Settings',
        icon: Settings,
        to: '/vendor/settings'
      }];
    }
    // admin
    return [{
      label: 'Profile',
      icon: User,
      to: '/profile'
    }, {
      label: 'Dashboard',
      icon: LayoutDashboard,
      to: '/platform-admin'
    }, {
      label: 'Settings',
      icon: Settings,
      to: '/profile?tab=settings'
    }];
  };
  return <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted transition-colors group" aria-label="User menu">
        {currentUser.avatar ? <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full object-cover" /> : <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            {initials}
          </div>}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 hidden md:block ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && <div className="absolute right-0 top-full mt-2 w-52 bg-card rounded-xl shadow-elevated border border-border z-50 overflow-hidden animate-scale-in">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent capitalize">
              {currentUser.role}
            </span>
          </div>

          {/* Menu items */}
          <div className="py-1">
            {menuItems().map(item => <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                {item.label}
              </Link>)}
          </div>

          {/* Logout */}
          <div className="border-t border-border py-1">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors w-full text-left">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>}
    </div>;
};
export default AvatarDropdown;
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Package, Star, Truck, Info } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
const typeIcons = {
  order: Package,
  review: Star,
  approval: Truck,
  system: Info
};
const NotificationCenter = () => {
  const {
    currentUser,
    getUserNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    getOrder,
    updateOrderStatus
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
  const notifications = getUserNotifications(currentUser.id);
  const unreadCount = notifications.filter(n => !n.read).length;
  const handleClick = n => {
    markNotificationRead(n.id);
    setOpen(false);
    if (n.link) {
      navigate(n.link);
    }
  };
  const timeAgo = iso => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };
  return <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className="relative p-2 rounded-full hover:bg-muted transition-colors" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold animate-scale-in">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>}
      </button>

      {open && <div className="absolute right-0 top-full mt-2 w-80 bg-card rounded-xl shadow-elevated border border-border z-50 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && <button onClick={() => markAllNotificationsRead(currentUser.id)} className="text-xs text-accent hover:underline flex items-center gap-1">
                <CheckCheck className="h-3 w-3" /> Mark all read
              </button>}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? <div className="p-6 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No notifications yet</p>
              </div> : notifications.slice(0, 20).map(n => {
          const Icon = typeIcons[n.type] || Info;
          const orderData = n.orderId ? getOrder(n.orderId) : null;
          const isOrderPending = orderData && orderData.status === 'pending';
          return <div key={n.id} onClick={() => handleClick(n)} className={`w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-muted/60 transition-colors border-b border-border/50 last:border-0 cursor-pointer ${!n.read ? 'bg-accent/5' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${!n.read ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-relaxed ${!n.read ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                        {n.message}
                      </p>
                      
                      {currentUser.role === 'admin' && isOrderPending && <div className="flex gap-2 mt-2" onClick={e => e.stopPropagation()}>
                          <button onClick={() => {
                  updateOrderStatus(n.orderId, 'accepted');
                  markNotificationRead(n.id);
                }} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-[10px] font-semibold rounded hover:bg-secondary/90 transition-colors">
                            Accept
                          </button>
                          <button onClick={() => {
                  updateOrderStatus(n.orderId, 'cancelled');
                  markNotificationRead(n.id);
                }} className="px-2.5 py-1 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded hover:bg-destructive/90 transition-colors">
                            Reject
                          </button>
                        </div>}

                      <span className="text-[10px] text-muted-foreground/60 mt-0.5 block">
                        {timeAgo(n.createdAt)}
                      </span>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />}
                  </div>;
        })}
          </div>
        </div>}
    </div>;
};
export default NotificationCenter;
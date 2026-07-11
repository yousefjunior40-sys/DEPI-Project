import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useApp } from '@/contexts/AppContext';
const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'bg-muted text-muted-foreground'
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-primary/10 text-primary'
  },
  preparing: {
    label: 'Preparing',
    color: 'bg-primary/10 text-primary'
  },
  ready: {
    label: 'Ready',
    color: 'bg-secondary/10 text-secondary'
  },
  out_for_delivery: {
    label: 'On the Way',
    color: 'bg-accent/10 text-accent'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-secondary/10 text-secondary'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-destructive/10 text-destructive'
  }
};
const MyOrdersPage = () => {
  const {
    currentUser,
    getCustomerOrders,
    getTruck
  } = useApp();
  if (!currentUser) {
    return <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-4xl mb-4">🔒</p>
          <h1 className="font-display text-2xl font-bold mb-2">Sign in to view orders</h1>
          <Link to="/login" className="text-accent hover:underline">Sign In</Link>
        </div>
      </div>;
  }
  const orders = getCustomerOrders(currentUser.id);
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">My Orders</h1>
            <p className="text-sm text-muted-foreground">{orders.length} total orders</p>
          </div>
        </div>

        {orders.length === 0 ? <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Discover amazing food trucks and place your first order!</p>
            <Link to="/trucks" className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Browse Trucks
            </Link>
          </div> : <div className="space-y-4">
            {orders.map((order, i) => {
          const truck = getTruck(order.truckId);
          const config = STATUS_CONFIG[order.status];
          const isActive = !['delivered', 'cancelled'].includes(order.status);
          return <Link key={order.id} to={`/order/${order.id}`} className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 animate-fade-in" style={{
            animationDelay: `${i * 60}ms`
          }}>
                  {truck && <img src={truck.image} alt={truck.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{order.truckName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${config.color}`}>
                        {config.label}
                      </span>
                      {isActive && <span className="flex items-center gap-0.5 text-[10px] text-accent font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Live
                        </span>}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} ·{' '}
                      ${order.total.toFixed(2)} · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {order.id}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </Link>;
        })}
          </div>}
      </div>
      <Footer />
    </div>;
};
export default MyOrdersPage;
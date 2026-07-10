import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WriteReviewModal from '@/components/WriteReviewModal';
import { useApp } from '@/contexts/AppContext';
const STATUS_STEPS = [{
  id: 'pending',
  label: 'Confirmed',
  emoji: '✅'
}, {
  id: 'accepted',
  label: 'Accepted',
  emoji: '👍'
}, {
  id: 'preparing',
  label: 'Preparing',
  emoji: '👨‍🍳'
}, {
  id: 'ready',
  label: 'Ready',
  emoji: '📦'
}, {
  id: 'out_for_delivery',
  label: 'On the Way',
  emoji: '🚚'
}, {
  id: 'delivered',
  label: 'Delivered',
  emoji: '🎉'
}];
const STATUS_INDEX = {
  pending: 0,
  accepted: 1,
  preparing: 2,
  ready: 3,
  out_for_delivery: 4,
  delivered: 5,
  cancelled: -1
};
const STATUS_MESSAGES = {
  pending: {
    title: 'Order received!',
    subtitle: 'Waiting for the vendor to accept.'
  },
  accepted: {
    title: 'Order accepted!',
    subtitle: 'The vendor is getting ready to cook.'
  },
  preparing: {
    title: 'Your food is being prepared',
    subtitle: `Estimated: 15-25 min`
  },
  ready: {
    title: 'Order is ready!',
    subtitle: 'Your food is packed and waiting for pickup.'
  },
  out_for_delivery: {
    title: 'On the way! 🚚',
    subtitle: 'Your order is heading to you.'
  },
  delivered: {
    title: 'Delivered! Enjoy! 🎉',
    subtitle: 'We hope you loved it. Leave a review!'
  },
  cancelled: {
    title: 'Order cancelled',
    subtitle: 'This order was cancelled.'
  }
};
const OrderTracking = () => {
  const {
    id
  } = useParams();
  const {
    getOrder,
    getTruck,
    getUserById,
    data
  } = useApp();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [percent, setPercent] = useState(0);
  const order = id ? getOrder(id) : undefined;
  const truck = order ? getTruck(order.truckId) : undefined;
  const driver = order?.assignedDriverId ? getUserById(order.assignedDriverId) : undefined;
  const hasReview = order ? data.reviews.some(r => r.orderId === order.id) : false;
  useEffect(() => {
    if (!order) return;
    const updateTimer = () => {
      if (['cancelled', 'delivered', 'pending'].includes(order.status)) {
        setTimeLeft("");
        setPercent(100);
        return;
      }
      if (order.orderType === 'pickup' && order.status === 'ready') {
        setTimeLeft("");
        setPercent(100);
        return;
      }
      const now = Date.now();
      const elapsed = now - new Date(order.updatedAt).getTime();
      const prepMs = (truck?.prepTime ?? 20) * 60 * 1000;
      let duration = 0;
      if (order.status === 'accepted') duration = 15000;else if (order.status === 'preparing') duration = prepMs;else if (order.status === 'ready') duration = 60000;else if (order.status === 'out_for_delivery') duration = 180000;
      if (duration > 0) {
        const remaining = Math.max(0, duration - elapsed);
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor(remaining % 60000 / 1000);
        if (mins > 0) {
          setTimeLeft(`${mins}m ${secs}s`);
        } else {
          setTimeLeft(`${secs}s`);
        }
        setPercent(Math.min(100, elapsed / duration * 100));
      } else {
        setTimeLeft("");
        setPercent(100);
      }
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [order?.status, order?.updatedAt, order?.orderType, truck?.prepTime]);
  if (!order) {
    return <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-4xl mb-4">📦</p>
          <h1 className="font-display text-2xl font-bold mb-2">Order not found</h1>
          <Link to="/orders" className="text-accent hover:underline">View all orders</Link>
        </div>
      </div>;
  }
  const steps = order.orderType === 'pickup' ? STATUS_STEPS.slice(0, 4).map(step => step.id === 'ready' ? {
    ...step,
    label: 'Ready for Pickup',
    emoji: '📦'
  } : step) : STATUS_STEPS;
  const rawIndex = STATUS_INDEX[order.status];
  const displayIndex = order.orderType === 'pickup' ? Math.min(rawIndex, 3) : rawIndex;
  const isCancelled = order.status === 'cancelled';
  const msg = order.status === 'ready' && order.orderType === 'pickup' ? {
    title: 'Ready for Pickup!',
    subtitle: 'Your food is fresh, hot, and waiting for you at the food truck.'
  } : STATUS_MESSAGES[order.status];
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/orders" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> My Orders
        </Link>
        <h1 className="font-display text-3xl font-bold mb-1">Order Tracking</h1>
        <p className="text-muted-foreground mb-8 text-sm">{order.id}</p>

        {/* Status Card */}
        <div className="bg-card rounded-xl shadow-card p-6 mb-6">
          {!isCancelled ? <>
              {/* Stepper */}
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
                {steps.map((step, i) => <div key={step.id} className="flex flex-col items-center flex-1 relative min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 transition-all duration-500 ${i <= displayIndex ? 'bg-accent text-accent-foreground shadow-md scale-110' : 'bg-muted text-muted-foreground'}`}>
                      {step.emoji}
                    </div>
                    <span className={`text-[10px] font-medium text-center leading-tight ${i <= displayIndex ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                    {i < steps.length - 1 && <div className={`absolute top-5 left-[55%] w-[90%] h-0.5 transition-colors duration-500 ${i < displayIndex ? 'bg-accent' : 'bg-muted'}`} />}
                  </div>)}
              </div>

              {/* Status message */}
              <div className="text-center p-5 bg-accent/5 rounded-xl space-y-3">
                <p className="text-3xl mb-1">{steps[displayIndex]?.emoji ?? '📦'}</p>
                <h3 className="font-display font-bold text-lg">{msg.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{msg.subtitle}</p>
                
                {/* Auto-advancing Countdown & Progress Bar */}
                {timeLeft && <div className="mt-3 pt-2 space-y-2.5 border-t border-accent/10">
                    <p className="text-xs text-muted-foreground font-semibold flex items-center justify-center gap-1">
                      ⏱ Estimated Remaining: <span className="text-accent font-bold animate-pulse font-mono text-sm">{timeLeft}</span>
                    </p>
                    
                    <div className="w-full max-w-xs mx-auto h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-1000 ease-linear" style={{
                  width: `${percent}%`
                }} />
                    </div>
                  </div>}
              </div>
            </> : <div className="text-center py-6">
              <p className="text-4xl mb-3">❌</p>
              <h3 className="font-display font-bold text-lg">Order Cancelled</h3>
              <p className="text-sm text-muted-foreground mt-1">This order was cancelled.</p>
            </div>}
        </div>

        {/* Order Details */}
        <div className="bg-card rounded-xl shadow-soft p-5 mb-6">
          <h2 className="font-semibold mb-4">Order Details</h2>
          <div className="space-y-2 mb-4">
            {order.items.map(item => <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.quantity}× {item.name}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>)}
          </div>
          <div className="border-t border-border pt-3 space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Delivery</span><span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-1 border-t border-border text-sm">
              <span>Total</span><span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Truck info */}
        {truck && <div className="bg-card rounded-xl shadow-soft p-4 mb-4 flex items-center gap-4">
            <img src={truck.image} alt={truck.name} className="w-14 h-14 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-sm">{truck.name}</p>
              <p className="text-xs text-muted-foreground">{truck.location}</p>
            </div>
            {truck.phone && <a href={`tel:${truck.phone}`} className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                <Phone className="h-4 w-4" />
              </a>}
          </div>}

        {/* Delivery address / Pickup location */}
        <div className="bg-card rounded-xl shadow-soft p-4 mb-6 flex items-start gap-3 animate-fade-in">
          <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">
              {order.orderType === 'pickup' ? 'Pickup Location' : 'Delivery Address'}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {order.orderType === 'pickup' && truck ? `${truck.name} - ${truck.address || truck.location}` : order.deliveryAddress}
            </p>
          </div>
        </div>

        {/* Review Banner */}
        {order.status === 'delivered' && <div className="bg-card rounded-xl shadow-soft p-5 border border-accent/20 bg-accent/5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">How was your meal?</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {hasReview ? "You left a review. Click to edit it." : "Share your feedback with others."}
              </p>
            </div>
            <button onClick={() => setReviewModalOpen(true)} className="px-4 py-2 bg-accent text-accent-foreground text-xs font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-sm">
              {hasReview ? "Edit Review" : "Write Review"}
            </button>
          </div>}
      </div>
      <WriteReviewModal orderId={order.id} truckId={order.truckId} isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} />
      <Footer />
    </div>;
};
export default OrderTracking;
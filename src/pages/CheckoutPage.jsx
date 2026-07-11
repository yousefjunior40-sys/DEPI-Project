import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote, MapPin, ShoppingBag, Truck } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useApp } from '@/contexts/AppContext';
const CheckoutPage = () => {
  const {
    items,
    subtotal,
    clearCart,
    cartTruckId
  } = useCart();
  const {
    currentUser,
    data,
    createOrder
  } = useApp();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState(currentUser?.address ?? '');
  const [loading, setLoading] = useState(false);
  const deliveryFee = orderType === 'pickup' ? 0.00 : 2.99;
  const serviceFee = 1.49;
  const total = subtotal + deliveryFee + serviceFee;
  const truck = cartTruckId ? data.trucks.find(t => t.id === cartTruckId) : null;
  const handleConfirm = () => {
    if (orderType === 'delivery' && !address.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }
    if (!currentUser) {
      toast.error('Please sign in to place an order');
      navigate('/login');
      return;
    }
    if (!truck) {
      toast.error('Truck not found');
      return;
    }
    setLoading(true);
    const order = createOrder({
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      truckId: truck.id,
      truckName: truck.name,
      vendorId: truck.ownerId,
      items,
      subtotal,
      deliveryFee,
      serviceFee,
      total,
      deliveryAddress: orderType === 'pickup' ? 'Pickup from Food Truck' : address.trim(),
      paymentMethod,
      orderType
    });
    clearCart();
    setLoading(false);
    toast.success('Order confirmed! 🎉');
    navigate(`/order/${order.id}`);
  };
  if (items.length === 0) {
    return <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-4xl mb-4">🛒</p>
          <h1 className="font-display text-2xl font-bold mb-2">Nothing to checkout</h1>
          <Link to="/trucks" className="text-accent hover:underline">Browse food trucks</Link>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </Link>
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        {truck && <div className="bg-card rounded-xl shadow-soft p-4 mb-6 flex items-center gap-3">
            <img src={truck.image} alt={truck.name} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p className="font-semibold text-sm">{truck.name}</p>
              <p className="text-xs text-muted-foreground">Estimated prep: ~{truck.prepTime} min</p>
            </div>
          </div>}

        {/* Order Type */}
        <div className="bg-card rounded-xl shadow-soft p-5 mb-6">
          <h2 className="font-semibold mb-3">Order Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {[['delivery', Truck, 'Delivery', 'Get it delivered'], ['pickup', ShoppingBag, 'Pickup', 'Take away yourself']].map(([val, Icon, label, desc]) => <button key={val} type="button" onClick={() => setOrderType(val)} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${orderType === val ? 'border-accent bg-accent/5' : 'border-border'}`}>
                  <Icon className="h-5 w-5 text-accent" />
                  <div className="text-left">
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </button>)}
          </div>
        </div>

        {/* Address */}
        {orderType === 'delivery' && <div className="bg-card rounded-xl shadow-soft p-5 mb-6 animate-fade-in">
            <h2 className="font-semibold flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-accent" /> Delivery Address
            </h2>
            <input type="text" placeholder="Enter your delivery address..." value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>}

        {/* Payment */}
        <div className="bg-card rounded-xl shadow-soft p-5 mb-6">
          <h2 className="font-semibold mb-3">Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">
            {[['card', CreditCard, 'Card', 'Debit or Credit'], ['cash', Banknote, 'Cash', 'Pay on delivery']].map(([val, Icon, label, desc]) => <button key={val} onClick={() => setPaymentMethod(val)} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${paymentMethod === val ? 'border-accent bg-accent/5' : 'border-border'}`}>
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </button>)}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-xl shadow-soft p-5">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map(item => <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}× {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>)}
          </div>
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Delivery</span><span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Service</span><span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-border">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={handleConfirm} disabled={loading} className="w-full mt-5 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-60">
            {loading ? 'Placing order…' : `Confirm Order — $${total.toFixed(2)}`}
          </button>
        </div>
      </div>
      <Footer />
    </div>;
};
export default CheckoutPage;
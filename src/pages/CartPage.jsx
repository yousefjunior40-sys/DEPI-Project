import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal
  } = useCart();
  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const serviceFee = items.length > 0 ? 1.49 : 0;
  const total = subtotal + deliveryFee + serviceFee;
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/trucks" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Continue browsing
        </Link>
        <h1 className="font-display text-3xl font-bold mb-6">Your Cart</h1>

        {items.length === 0 ? <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Discover amazing food trucks and add items</p>
            <Link to="/trucks" className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Browse Trucks
            </Link>
          </div> : <>
            <div className="space-y-3 mb-8">
              {items.map(item => <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl shadow-soft">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.truckName}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>

            {/* Summary */}
            <div className="bg-card rounded-xl shadow-soft p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="block w-full text-center py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors mt-4">
                Proceed to Checkout
              </Link>
            </div>
          </>}
      </div>
      <Footer />
    </div>;
};
export default CartPage;
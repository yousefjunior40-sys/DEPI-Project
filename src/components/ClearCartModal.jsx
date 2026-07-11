import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

/**
 * Rendered globally by TruckDetails (and any page that calls addItem).
 * Automatically appears when a user tries to add from a different truck.
 */
const ClearCartModal = () => {
  const {
    conflict,
    resolveConflict
  } = useCart();
  if (!conflict) return null;
  return <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => resolveConflict(false)} />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-card rounded-2xl shadow-elevated p-6 animate-scale-in">
        <button onClick={() => resolveConflict(false)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mx-auto mb-4">
          <ShoppingCart className="h-7 w-7 text-accent" />
        </div>

        <h2 className="font-display text-xl font-bold text-center mb-2">Start a new order?</h2>

        <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
          Your cart has items from{' '}
          <span className="font-semibold text-foreground">{conflict.currentTruckName}</span>.
          <br />
          Adding from{' '}
          <span className="font-semibold text-foreground">{conflict.pendingTruckName}</span>{' '}
          will clear your current cart.
        </p>

        <div className="flex gap-3">
          <button onClick={() => resolveConflict(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            Keep Current
          </button>
          <button onClick={() => resolveConflict(true)} className="flex-1 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors">
            Clear & Add
          </button>
        </div>
      </div>
    </div>;
};
export default ClearCartModal;
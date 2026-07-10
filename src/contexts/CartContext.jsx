import React, { createContext, useContext, useState, useCallback } from 'react';
const CartContext = createContext(undefined);
export const CartProvider = ({
  children
}) => {
  const [items, setItems] = useState([]);
  const [cartTruckId, setCartTruckId] = useState(null);
  const [cartTruckName, setCartTruckName] = useState(null);
  const [conflict, setConflict] = useState(null);
  const addItem = useCallback((item, truckId, truckName) => {
    // If cart is empty or same truck → just add
    if (!cartTruckId || cartTruckId === truckId) {
      setCartTruckId(truckId);
      setCartTruckName(truckName);
      setItems(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
          return prev.map(i => i.id === item.id ? {
            ...i,
            quantity: i.quantity + 1
          } : i);
        }
        return [...prev, {
          ...item,
          quantity: 1,
          truckId,
          truckName
        }];
      });
      return;
    }
    // Different truck — trigger conflict modal
    setConflict({
      pendingItem: item,
      pendingTruckId: truckId,
      pendingTruckName: truckName,
      currentTruckName: cartTruckName ?? 'your current truck'
    });
  }, [cartTruckId, cartTruckName]);
  const resolveConflict = useCallback(confirm => {
    if (confirm && conflict) {
      const {
        pendingItem,
        pendingTruckId,
        pendingTruckName
      } = conflict;
      setItems([{
        ...pendingItem,
        quantity: 1,
        truckId: pendingTruckId,
        truckName: pendingTruckName
      }]);
      setCartTruckId(pendingTruckId);
      setCartTruckName(pendingTruckName);
    }
    setConflict(null);
  }, [conflict]);
  const removeItem = useCallback(itemId => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== itemId);
      if (next.length === 0) {
        setCartTruckId(null);
        setCartTruckName(null);
      }
      return next;
    });
  }, []);
  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev => prev.map(i => i.id === itemId ? {
      ...i,
      quantity
    } : i));
  }, [removeItem]);
  const clearCart = useCallback(() => {
    setItems([]);
    setCartTruckId(null);
    setCartTruckName(null);
    setConflict(null);
  }, []);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return <CartContext.Provider value={{
    items,
    cartTruckId,
    cartTruckName,
    conflict,
    addItem,
    resolveConflict,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal
  }}>
      {children}
    </CartContext.Provider>;
};
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
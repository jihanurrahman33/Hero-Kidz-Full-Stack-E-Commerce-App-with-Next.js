"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  getCart,
  handleCart,
  deleteItemsFromCart,
  increaseItemDb,
  decreaseItemDb,
  clearCart as clearCartDb,
} from "@/features/cart/actions/cart.actions";
import useAuth from "@/hooks/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyRemoved, setRecentlyRemoved] = useState(null); // { item, timeoutId }

  const { user } = useAuth(); // Only fetch if user is logged in? Or for guest too? The server actions seem to require auth.

  const toggleCart = (isOpen) => {
    setIsCartOpen((prev) => (isOpen !== undefined ? isOpen : !prev));
  };

  const fetchCart = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await getCart();
      if (res.success) {
        setItems(res.cart || []);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId) => {
    // Open cart drawer immediately when adding
    setIsCartOpen(true);
    
    // We could do an optimistic add here if we had the full product object, 
    // but typically we just have the ID. So we fetch.
    const res = await handleCart(productId);
    if (res.success) {
      await fetchCart(); // Refresh cart to get updated quantity/items
    }
    return res;
  };

  const removeFromCart = async (id) => {
    const itemToRemove = items.find((item) => item._id.toString() === id);
    if (!itemToRemove) return { success: false };

    // Clear any existing undo timeout
    if (recentlyRemoved?.timeoutId) {
      clearTimeout(recentlyRemoved.timeoutId);
    }

    // Optimistic update
    const originalItems = [...items];
    setItems(items.filter((item) => item._id.toString() !== id));

    // Store for potential undo
    const timeoutId = setTimeout(() => {
      setRecentlyRemoved(null); // Clear undo option after 5 seconds
    }, 5000);
    
    setRecentlyRemoved({ item: itemToRemove, timeoutId });

    const res = await deleteItemsFromCart(id);
    if (!res.success) {
       // Revert on failure
       setItems(originalItems);
       setRecentlyRemoved(null);
    }
    return res;
  };

  const undoRemove = async () => {
    if (!recentlyRemoved?.item) return;

    // Clear timeout
    clearTimeout(recentlyRemoved.timeoutId);
    
    const { item } = recentlyRemoved;
    setRecentlyRemoved(null);

    // Optimistically add back to UI
    setItems((prev) => [...prev, item]);

    // Send back to server
    try {
      // Re-add the specific quantity that was removed
      for (let i = 0; i < item.quantity; i++) {
         await handleCart(item.productId);
      }
      await fetchCart(); // Ensure sync
    } catch (error) {
       console.error("Failed to undo", error);
       // We might want to handle failure by removing it again, but for now just fetch
       await fetchCart();
    }
  };

  const increaseQty = async (id, currentQty) => {
    // Optimistic update
    const originalItems = [...items];
    setItems(
      items.map((item) =>
        item._id.toString() === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    const res = await increaseItemDb(id, currentQty);
     if (!res.success) {
       // Revert on failure
       setItems(originalItems);
    }
    return res;
  };

  const decreaseQty = async (id, currentQty) => {
    // Optimistic update
     const originalItems = [...items];
    setItems(
      items.map((item) =>
        item._id.toString() === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );

    const res = await decreaseItemDb(id, currentQty);
     if (!res.success) {
       // Revert on failure
       setItems(originalItems);
    }
    return res;
  };

  const clearAllItems = async () => {
    setItems([]);
    await clearCartDb();
  };

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const cartTotal = useMemo(
      () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      [items]
  );


  const value = {
    items,
    loading,
    cartCount,
    cartTotal,
    isCartOpen,
    recentlyRemoved,
    toggleCart,
    fetchCart,
    addToCart,
    removeFromCart,
    undoRemove,
    increaseQty,
    decreaseQty,
    clearAllItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

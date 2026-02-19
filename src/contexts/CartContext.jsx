"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  getCart,
  handleCart,
  deleteItemsFromCart,
  increaseItemDb,
  decreaseItemDb,
  clearCart as clearCartDb,
} from "@/actions/server/cart";
import useAuth from "@/hooks/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Only fetch if user is logged in? Or for guest too? The server actions seem to require auth.

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
    const res = await handleCart(productId);
    if (res.success) {
      await fetchCart(); // Refresh cart to get updated quantity/items
    }
    return res;
  };

  const removeFromCart = async (id) => {
    // Optimistic update
    const originalItems = [...items];
    setItems(items.filter((item) => item._id.toString() !== id));

    const res = await deleteItemsFromCart(id);
    if (!res.success) {
       // Revert on failure
       setItems(originalItems);
    }
    return res;
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
    fetchCart,
    addToCart,
    removeFromCart,
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

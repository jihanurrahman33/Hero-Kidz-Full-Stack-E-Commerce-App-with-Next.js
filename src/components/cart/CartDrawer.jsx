"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import useAlert from "@/hooks/useAlert";

const CartDrawer = () => {
  const { 
    isCartOpen, 
    toggleCart, 
    items, 
    cartTotal, 
    cartCount, 
    removeFromCart, 
    increaseQty, 
    decreaseQty,
    recentlyRemoved,
    undoRemove
  } = useCart();

  const { showError } = useAlert();

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") toggleCart(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [toggleCart]);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  const handleIncrease = async (item) => {
    const res = await increaseQty(item._id.toString(), item.quantity);
    if (!res.success) showError("Failed", res.message || "Could not increase quantity");
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) {
      handleRemove(item._id.toString());
      return;
    }
    const res = await decreaseQty(item._id.toString(), item.quantity);
    if (!res.success) showError("Failed", res.message || "Could not decrease quantity");
  };

  const handleRemove = async (id) => {
    const res = await removeFromCart(id);
    if (!res.success) showError("Failed", res.message || "Could not remove item");
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-base-300/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-base-100 z-[9999] shadow-2xl flex flex-col transition-transform duration-300 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-base-200">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <FiShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Your Cart</h2>
              <p className="text-xs text-gray-500">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          <button 
            onClick={() => toggleCart(false)}
            className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-gray-800 hover:bg-base-200 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-base-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-2">
                <FiShoppingBag size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold">Your cart is empty</h3>
              <p className="text-sm text-gray-500 max-w-[200px]">Looks like you haven't added anything yet.</p>
              <button 
                onClick={() => {
                  toggleCart(false);
                }}
                className="btn btn-primary rounded-xl mt-4"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex gap-4 p-4 bg-base-100 rounded-2xl shadow-sm hover:shadow-md transition-all relative group">
                  
                  {/* Remove Button (appears on hover) */}
                  <button 
                    onClick={() => handleRemove(item._id.toString())}
                    className="absolute -top-2 -right-2 btn btn-sm btn-circle btn-error shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity z-10"
                    title="Remove item"
                  >
                    <FiX size={16} />
                  </button>

                  <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-base-200 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1 pr-2">
                    <div>
                      <h4 className="font-bold line-clamp-1">{item.title}</h4>
                      <p className="text-primary font-extrabold mt-1 text-lg">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                       {/* Quantity Controls */}
                       <div className="flex items-center bg-base-200 rounded-lg p-1">
                         <button 
                           onClick={() => handleDecrease(item)}
                           disabled={item.quantity <= 1}
                           className="w-8 h-8 rounded-md flex items-center justify-center bg-base-100 text-gray-600 shadow-sm hover:text-primary hover:bg-white disabled:opacity-50 disabled:hover:text-gray-600 transition-colors"
                         >
                           <FiMinus size={14} />
                         </button>
                         <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                         <button 
                           onClick={() => handleIncrease(item)}
                           className="w-8 h-8 rounded-md flex items-center justify-center bg-base-100 text-gray-600 shadow-sm hover:text-primary hover:bg-white transition-colors"
                         >
                           <FiPlus size={14} />
                         </button>
                       </div>
                       
                       <p className="text-xs text-gray-400 font-medium">৳{item.price.toLocaleString()} each</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Undo Toast */}
        <div className={`absolute bottom-[200px] left-0 right-0 px-6 transition-all duration-300 z-50 flex justify-center pointer-events-none ${recentlyRemoved ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <div className="bg-gray-800 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-4 pointer-events-auto">
            <span className="text-sm">Item removed from cart</span>
            <button 
              onClick={undoRemove}
              className="text-primary font-bold hover:text-primary-focus transition-colors"
            >
              UNDO
            </button>
          </div>
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="bg-base-100 border-t border-base-200 p-6 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500 font-medium text-lg">Subtotal</span>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-primary">৳{cartTotal.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">Shipping & taxes calculated at checkout</p>
              </div>
            </div>
            
            <Link href="/checkout" onClick={() => toggleCart(false)} className="w-full relative block">
              <button className="btn btn-primary w-full rounded-2xl shadow-primary/20 shadow-lg text-lg h-16 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Proceed to Checkout <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>

            <Link href="/cart" onClick={() => toggleCart(false)} className="block text-center mt-5">
              <span className="text-sm text-gray-500 hover:text-primary transition-colors font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-primary">
                View Full Cart Page
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

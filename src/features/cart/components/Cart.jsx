"use client";
import React from "react";
import CartItem from "./CartItem";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/features/products/components/ProductCard";

const Cart = ({ suggestedProducts = [] }) => {
    const { items, cartTotal, loading } = useCart();

  if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-500 font-medium animate-pulse">Loading your cart...</p>
        </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <p className="text-gray-500 mt-2">
          You have <span className="text-primary font-bold">{items.length}</span> items in your cart
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* CART ITEMS LISST */}
        <div className="w-full lg:w-2/3 space-y-4">
          {items.length ? (
            items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
              />
            ))
          ) : (
            <div className="space-y-8">
              <div className="bg-base-100 rounded-[2rem] p-12 text-center shadow-sm">
                <div className="bg-base-200/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                   <span className="text-4xl">🛒</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any educational toys yet.</p>
                <Link href="/products" className="btn btn-primary rounded-xl px-8 shadow-md">
                  Browse All Products
                </Link>
              </div>

              {/* Suggestions Grid */}
              {suggestedProducts.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">You might like these</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {suggestedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full lg:w-1/3">
          <div className="bg-base-100 rounded-[2rem] shadow-xl shadow-base-200/50 p-6 lg:p-8 lg:sticky lg:top-24 border border-transparent">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            {/* Item List (Soft borders) */}
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-gray-800">৳{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="h-px bg-base-200 w-full my-6" />

            {/* Totals */}
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Total Items</span>
                <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>

              <div className="flex justify-between items-end pt-2">
                <span className="text-gray-800 font-bold">Total Price</span>
                <span className="text-2xl font-black text-primary">৳{cartTotal}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              className={`btn btn-primary w-full rounded-2xl h-14 text-base shadow-md shadow-primary/20 ${
                !items.length && "btn-disabled bg-base-300 text-gray-400 border-none shadow-none"
              }`}
            >
              Checkout Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

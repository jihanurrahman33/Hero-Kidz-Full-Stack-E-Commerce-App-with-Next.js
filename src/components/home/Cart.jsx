"use client";
import React, { useMemo, useState } from "react";
import CartItem from "../CartItem";
import Link from "next/link";

const Cart = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <p className="px-4 py-3 text-sm sm:text-base">
        <span className="text-primary font-bold">{items.length}</span> Items
        Found in the Cart
      </p>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* CART ITEMS */}
        <div className="w-full lg:w-2/3 space-y-4">
          {items.length ? (
            items.map((item) => (
              <CartItem
                key={item._id.toString()}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              Your cart is empty
            </p>
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-md p-5 lg:sticky lg:top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Item List */}
            <div className="space-y-3 max-h-60 overflow-auto">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <div>
                    <p className="font-medium line-clamp-1">{item.title}</p>
                    <p className="text-gray-500">
                      Qty: {item.quantity} × ৳{item.price}
                    </p>
                  </div>
                  <p className="font-semibold">৳{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Total Price</span>
                <span>৳{totalPrice}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              className={`btn btn-primary w-full mt-5 ${
                !items.length && "btn-disabled"
              }`}
            >
              Confirm Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

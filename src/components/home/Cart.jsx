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
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div>
      <p className="px-4 py-3">
        <span className="text-primary font-bold">{items.length}</span> Items
        Found in the Cart
      </p>

      {/* MAIN LAYOUT */}
      <div className="flex gap-6 p-4">
        {/* LEFT SIDE — CART ITEMS */}
        <div className="w-2/3 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item._id.toString()}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>

        {/* RIGHT SIDE — SUMMARY */}
        <div className="w-1/3 bg-white rounded-xl shadow-md p-5 h-fit sticky top-4">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-500">
                    Qty: {item.quantity} × ৳{item.price}
                  </p>
                </div>
                <p className="font-semibold">৳{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

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

          <Link
            href={"/checkout"}
            className="btn btn-primary w-full mt-5"
            disabled={!items.length}
          >
            Confirm Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

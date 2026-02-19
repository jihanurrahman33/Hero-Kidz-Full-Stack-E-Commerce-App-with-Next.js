"use client";

import Cart from "@/components/home/Cart";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <div className="">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Cart
        </h2>
      </div>
      <Cart />
    </div>
  );
};

export default CartPage;

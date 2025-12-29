"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CartButton = ({ product }) => {
  const isLogin = false;
  const router = useRouter();
  const path = usePathname();
  const add2Cart = () => {
    if (isLogin) alert(`Added ${product.title} to cart`);
    else {
      router.push(`/login?callbackUrl=${path}`);
    }
  };
  return (
    <div className="w-full">
      <button onClick={add2Cart} className="btn btn-primary w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;

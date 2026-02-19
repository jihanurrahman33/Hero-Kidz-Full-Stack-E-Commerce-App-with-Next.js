"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import useAuth from "@/hooks/useAuth";
import useAlert from "@/hooks/useAlert";
import useAsync from "@/hooks/useAsync";


const CartButton = ({ product }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const { showSuccess, showError } = useAlert();
  const { execute, loading } = useAsync();

  const router = useRouter();
  const path = usePathname();

  const add2Cart = async () => {
    if (isAuthenticated) {
        await execute(async () => {
            const result = await addToCart(product._id);
            if (result.success) {
                showSuccess("Added to Cart", "Product has been added to your cart.");
            } else {
                showError("Add to Cart Failed", "Could not add product to cart. Please try again.");
            }
        });
    } else {
      router.push(`/login?callbackUrl=${path}`);
    }
  };

  return (
    <div className="w-full">
      <button
        disabled={loading || authLoading}
        onClick={add2Cart}
        className="btn btn-primary w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;

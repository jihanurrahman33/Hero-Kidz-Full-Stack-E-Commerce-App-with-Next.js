"use client";

import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const session = useSession();
  const isLogin = session?.status == "authenticated";
  const router = useRouter();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const add2Cart = async () => {
    setIsLoading(true);
    if (isLogin) {
      const result = await handleCart({ product, inc: true });
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: ("Added to Cart", product?.title),
          text: "Product has been added to your cart.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Add to Cart Failed",
          text: "Could not add product to cart. Please try again.",
        });
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <button
        disabled={isLoading || session.status === "loading"}
        onClick={add2Cart}
        className="btn btn-primary w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;

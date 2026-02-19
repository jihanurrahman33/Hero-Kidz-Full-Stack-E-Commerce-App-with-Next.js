import { Cart } from "@/features/cart";
import React from "react";

export const metadata = {
  title: "My Cart",
  description: "View and manage items in your cart",
};

const CartPage = () => {
  return <Cart />;
};

export default CartPage;

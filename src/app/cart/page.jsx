import { Cart } from "@/features/cart";
import { getFilteredProducts } from "@/features/products/actions/product.actions";
import React from "react";

export const metadata = {
  title: "My Cart",
  description: "View and manage items in your cart",
};

const CartPage = async () => {
  // Fetch a small list of highly rated products to suggest if the cart is empty
  const { products: suggestedProducts } = await getFilteredProducts({ sort: "rating", limit: 4 });

  return <Cart suggestedProducts={suggestedProducts} />;
};

export default CartPage;

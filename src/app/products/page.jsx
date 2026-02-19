import { ProductGrid } from "@/features/products";
import React from "react";

export const metadata = {
  title: {
    default: "All Products",
    template: "%s | Hero Kidz",
  },
  description: "An Online Toys Shop for Kids",
};
const ProductsPage = () => {
  return (
    <div>
      <ProductGrid />
    </div>
  );
};

export default ProductsPage;

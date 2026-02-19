import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../actions/product.actions";

const ProductGrid = async () => {
  const products = await getProducts();
  return (
    <div>
      <h2 className="text-center text-4xl font-bold mb-10">Our Products</h2>
      <div className="grid md:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard product={product} key={product.title}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

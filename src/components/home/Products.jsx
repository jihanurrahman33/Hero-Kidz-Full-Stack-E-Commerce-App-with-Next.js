import React from "react";
import ProductCard from "../cards/ProductCard";
import { getProducts } from "@/actions/server/product";
const Products = async () => {
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

export default Products;

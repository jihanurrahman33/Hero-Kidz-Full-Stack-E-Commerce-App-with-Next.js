import React from "react";
import ProductCard from "./ProductCard";
import { getFilteredProducts } from "../actions/product.actions";

const ProductGrid = async ({ filters = {} }) => {
  const products = await getFilteredProducts(filters);

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-semibold text-gray-400">No products found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{products.length} product{products.length !== 1 ? "s" : ""} found</p>
          <div className="grid md:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard product={product} key={product._id?.toString()} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;

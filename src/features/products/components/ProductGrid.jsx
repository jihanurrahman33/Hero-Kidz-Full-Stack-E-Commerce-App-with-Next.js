import React from "react";
import ProductCard from "./ProductCard";
import { getFilteredProducts } from "../actions/product.actions";
import Pagination from "@/components/ui/Pagination";

const ProductGrid = async ({ filters = {}, hidePagination = false }) => {
  const { products, total, page, totalPages } = await getFilteredProducts(filters);

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-semibold text-gray-400">No products found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          {!hidePagination && (
            <p className="text-sm text-gray-500 mb-4">
              {total} product{total !== 1 ? "s" : ""} found
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard product={product} key={product._id?.toString()} />
            ))}
          </div>
          {!hidePagination && (
             <Pagination currentPage={page} totalPages={totalPages} total={total} />
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;

import { ProductGrid, ProductSearch } from "@/features/products";
import { getCategories } from "@/features/products/actions/product.actions";
import React, { Suspense } from "react";

export const metadata = {
  title: {
    default: "All Products",
    template: "%s | Hero Kidz",
  },
  description: "An Online Toys Shop for Kids",
};

const ProductsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const categories = await getCategories();

  const filters = {
    search: params?.search || "",
    category: params?.category || "",
    minPrice: params?.minPrice || "",
    maxPrice: params?.maxPrice || "",
    sort: params?.sort || "",
  };

  return (
    <div>
      <h2 className="text-center text-4xl font-bold mb-6">Our Products</h2>
      <Suspense fallback={null}>
        <ProductSearch categories={categories} />
      </Suspense>
      <Suspense fallback={<div className="text-center py-10">Loading products...</div>}>
        <ProductGrid filters={filters} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;

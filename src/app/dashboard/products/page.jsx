import React from "react";
import { getAdminProducts } from "@/features/admin/actions/admin.actions";
import ProductsManager from "@/features/admin/components/ProductsManager";

export const metadata = { title: "Products | Dashboard" };

const ProductsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const data = await getAdminProducts(page);

  return <ProductsManager data={data} />;
};

export default ProductsPage;

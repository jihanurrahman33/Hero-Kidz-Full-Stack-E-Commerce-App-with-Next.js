import React from "react";
import { getAllOrders } from "@/features/admin/actions/admin.actions";
import OrdersManager from "@/features/admin/components/OrdersManager";

export const metadata = { title: "Orders | Dashboard" };

const OrdersPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const data = await getAllOrders(page);

  return <OrdersManager data={data} />;
};

export default OrdersPage;

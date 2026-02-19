import React from "react";
import { getUserOrders } from "@/features/checkout/actions/order.actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import OrdersPageClient from "@/features/checkout/components/OrdersPage";

export const metadata = {
  title: "My Orders | Hero Kidz",
  description: "View your order history",
};

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/orders");

  const orders = await getUserOrders();

  return <OrdersPageClient orders={orders} />;
};

export default OrdersPage;

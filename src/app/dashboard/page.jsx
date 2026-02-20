import React from "react";
import {
  getDashboardStats,
  getRecentOrders,
} from "@/features/admin/actions/admin.actions";
import DashboardOverview from "@/features/admin/components/DashboardOverview";

export const metadata = { title: "Dashboard | Hero Kidz" };

const DashboardPage = async () => {
  const stats = await getDashboardStats();
  const recentOrders = await getRecentOrders(5);

  return <DashboardOverview stats={stats} recentOrders={recentOrders} />;
};

export default DashboardPage;

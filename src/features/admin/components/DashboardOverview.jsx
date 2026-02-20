import React from "react";
import Link from "next/link";
import {
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

const statCards = [
  { key: "totalRevenue", label: "Total Revenue", icon: FiDollarSign, color: "text-green-500 bg-green-50", prefix: "৳" },
  { key: "orderCount", label: "Total Orders", icon: FiPackage, color: "text-blue-500 bg-blue-50" },
  { key: "productCount", label: "Products", icon: FiShoppingBag, color: "text-orange-500 bg-orange-50" },
  { key: "userCount", label: "Users", icon: FiUsers, color: "text-purple-500 bg-purple-50" },
];

const DashboardOverview = ({ stats, recentOrders }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats[card.key] || 0;
          return (
            <div
              key={card.key}
              className="bg-base-100 rounded-2xl p-5 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold">
                {card.prefix || ""}{value.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-base-100 rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm text-primary flex items-center gap-1 hover:underline"
          >
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr className="text-gray-400 text-xs">
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover">
                    <td className="font-mono text-xs">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="text-sm">{order.name || order.email || "—"}</td>
                    <td className="text-sm">{order.items?.length || 0}</td>
                    <td className="font-semibold">৳{order.totalPrice?.toLocaleString()}</td>
                    <td>
                      <span className="badge badge-sm badge-success badge-outline">
                        {order.status || "Confirmed"}
                      </span>
                    </td>
                    <td className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;

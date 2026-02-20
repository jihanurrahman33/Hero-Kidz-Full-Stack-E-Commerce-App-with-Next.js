import React from "react";
import Link from "next/link";
import {
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiArrowRight,
  FiAlertCircle,
  FiTool,
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

      {/* Actionable Insights */}
      <h2 className="text-lg font-bold mb-4 text-gray-700">Actionable Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        
        {/* Orders Needing Attention */}
        <div className="bg-error/10 border border-error/20 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-error/20 text-error flex items-center justify-center shrink-0">
            <FiAlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-error flex items-center gap-2">
              Orders Needing Attention
              <span className="badge badge-error badge-sm">{stats.ordersNeedingAttention || 0}</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Unfulfilled orders (Confirmed/Processing) older than 24 hours.
            </p>
            {stats.ordersNeedingAttention > 0 && (
              <Link href="/dashboard/orders" className="text-xs font-bold text-error hover:underline mt-2 inline-block">
                Review Orders →
              </Link>
            )}
          </div>
        </div>

        {/* Incomplete Products */}
        <div className="bg-warning/10 border border-warning/20 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-warning/20 text-warning-content flex items-center justify-center shrink-0">
            <FiTool size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-warning-content flex items-center gap-2">
              Products Missing Info
              <span className="badge badge-warning badge-sm">{stats.incompleteProductsCount || 0}</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Products that are missing an image or a description.
            </p>
            {stats.incompleteProductsCount > 0 && (
              <Link href="/dashboard/products" className="text-xs font-bold text-warning-content hover:underline mt-2 inline-block">
                Update Products →
              </Link>
            )}
          </div>
        </div>

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

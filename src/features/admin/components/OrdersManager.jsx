"use client";

import React, { useState, useTransition } from "react";
import { updateOrderStatus } from "@/features/admin/actions/admin.actions";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Swal from "sweetalert2";
import OrderTimeline from "./OrderTimeline";

const statusColors = {
  Confirmed: "bg-info/10 text-info border-info/20 font-semibold",
  Processing: "bg-warning/10 text-warning border-warning/20 font-semibold",
  Shipped: "bg-primary/10 text-primary border-primary/20 font-semibold",
  Delivered: "bg-success/10 text-success border-success/20 font-semibold",
};

const statusOptions = ["Confirmed", "Processing", "Shipped", "Delivered"];

const OrdersManager = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        text: `Order status has been changed to ${newStatus}.`,
        confirmButtonColor: "#10b981", // Success green
        timer: 2000,
        showConfirmButton: false
      });
      startTransition(() => router.refresh());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update the order status. Please try again.",
        confirmButtonColor: "#ef4444", // Error red
      });
    }
  };

  const goToPage = (p) => {
    router.push(`/dashboard/orders?page=${p}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

      <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-gray-400 text-xs bg-base-200/50">
                <th className="w-10"></th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="hover cursor-pointer" onClick={() => toggleOrderExpand(order._id)}>
                    <td className="text-gray-400">
                      {expandedOrders[order._id] ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </td>
                    <td className="font-mono text-xs">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td>
                      <div>
                        <p className="text-sm font-medium">{order.name || "—"}</p>
                        <p className="text-xs text-gray-400">{order.email}</p>
                      </div>
                    </td>
                    <td className="text-sm">{order.items?.length || 0}</td>
                    <td className="font-semibold">৳{order.totalPrice?.toLocaleString()}</td>
                    <td className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status || "Confirmed"}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        disabled={isPending}
                        className={`select select-sm select-bordered rounded-lg text-xs ${
                          statusColors[order.status] || statusColors["Confirmed"]
                        }`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s} className="bg-base-100 text-base-content font-medium">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  
                  {/* Expanded Timeline Row */}
                  {expandedOrders[order._id] && (
                    <tr className="bg-base-200/30">
                      <td colSpan="7" className="p-0 border-b-0">
                        <div className="p-4 sm:p-6 pb-2 animate-in fade-in slide-in-from-top-4 duration-300">
                           <OrderTimeline currentStatus={order.status} createdAt={order.createdAt} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-base-200">
            <p className="text-sm text-gray-400">
              Page {data.page} of {data.totalPages} ({data.total} orders)
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => goToPage(data.page - 1)}
                disabled={data.page <= 1}
                className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                onClick={() => goToPage(data.page + 1)}
                disabled={data.page >= data.totalPages}
                className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManager;

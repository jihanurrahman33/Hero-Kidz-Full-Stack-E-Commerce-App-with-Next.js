"use client";

import React, { useState, useTransition } from "react";
import { updateOrderStatus } from "@/features/admin/actions/admin.actions";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const statusOptions = ["Confirmed", "Processing", "Shipped", "Delivered"];

const OrdersManager = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    startTransition(() => router.refresh());
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
                <tr key={order._id} className="hover">
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
                  <td>
                    <select
                      value={order.status || "Confirmed"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={isPending}
                      className="select select-sm select-bordered rounded-lg text-xs"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
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

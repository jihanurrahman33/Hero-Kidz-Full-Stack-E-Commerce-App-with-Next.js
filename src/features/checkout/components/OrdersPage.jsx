"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiPackage,
  FiShoppingBag,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiChevronDown,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const ORDERS_PER_PAGE = 6;

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const itemCount = order.items?.length || 0;
  const firstItems = order.items?.slice(0, 3) || [];

  return (
    <div className="rounded-xl overflow-hidden bg-base-100 shadow-sm hover:shadow-md transition-all">
      {/* Clickable Summary Row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center gap-4 text-left hover:bg-base-200/50 transition-colors"
      >
        {/* Thumbnail Stack */}
        <div className="flex -space-x-3 shrink-0">
          {firstItems.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-lg overflow-hidden relative border-2 border-base-100 bg-base-300"
              style={{ zIndex: 3 - i }}
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title || ""}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
          {itemCount > 3 && (
            <div className="w-10 h-10 rounded-lg bg-base-300 border-2 border-base-100 flex items-center justify-center text-xs font-bold text-gray-500">
              +{itemCount - 3}
            </div>
          )}
        </div>

        {/* Order Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs bg-base-200 px-2 py-0.5 rounded">
              #{order._id.slice(-8).toUpperCase()}
            </span>
            <span className="badge badge-success badge-xs gap-0.5">
              <FiCheckCircle size={10} />
              Confirmed
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <FiCalendar size={11} />
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Total + Chevron */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-bold text-primary text-lg">
            ৳{order.totalPrice?.toLocaleString()}
          </span>
          <FiChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expandable Detail */}
      {open && (
        <div className="border-t border-base-200">
          {/* Delivery Info */}
          {(order.address || order.contact) && (
            <div className="px-4 py-3 bg-base-200/40 flex flex-wrap gap-4 text-xs text-gray-500">
              {order.contact && (
                <span className="flex items-center gap-1">
                  <FiPhone size={12} />
                  {order.contact}
                </span>
              )}
              {order.address && (
                <span className="flex items-center gap-1">
                  <FiMapPin size={12} />
                  {order.address}
                </span>
              )}
            </div>
          )}

          {/* Items Grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {order.items?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-base-200/40"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0 bg-base-300">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title || "Product"}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">
                      ৳{item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-sm shrink-0">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Instruction Note */}
          {order.instruction && (
            <div className="px-4 pb-3">
              <p className="text-xs text-gray-400 italic">
                📝 {order.instruction}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const OrdersPageClient = ({ orders }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (page - 1) * ORDERS_PER_PAGE,
    page * ORDERS_PER_PAGE
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiPackage className="text-primary" size={24} />
            My Orders
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
        <Link href="/products" className="btn btn-primary btn-sm">
          Shop More
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-2xl">
          <FiShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-400 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-400 mb-5">
            Your order history will appear here.
          </p>
          <Link href="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-base-200">
              <p className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
                >
                  <FiChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`btn btn-sm btn-circle ${
                        p === page ? "btn-primary" : "btn-ghost"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPageClient;

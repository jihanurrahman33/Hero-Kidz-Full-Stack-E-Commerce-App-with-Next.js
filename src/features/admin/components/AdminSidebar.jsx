"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBarChart2,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiArrowLeft,
} from "react-icons/fi";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: FiBarChart2, exact: true },
  { label: "Orders", href: "/dashboard/orders", icon: FiPackage },
  { label: "Products", href: "/dashboard/products", icon: FiShoppingBag },
  { label: "Users", href: "/dashboard/users", icon: FiUsers },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 bg-base-200/50 lg:min-h-screen p-4 lg:p-5 shrink-0 border-r border-base-200">
      <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FiBarChart2 className="text-primary" size={20} />
            Admin Panel
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 hidden lg:block border border-transparent">
            Manage your store
          </p>
        </div>

        {/* Mobile: horizontal scroll nav */}
        <Link
          href="/"
          className="btn btn-ghost btn-sm gap-1 lg:hidden rounded-xl"
        >
          <FiArrowLeft size={14} />
          Back
        </Link>
      </div>

      <nav className="flex lg:flex-col gap-2 mt-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide snap-x">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-[1rem] text-sm font-semibold transition-all snap-start whitespace-nowrap ${
                isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "text-gray-500 hover:bg-base-100 hover:text-base-content hover:shadow-sm"
              }`}
            >
              <item.icon size={18} className={`shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
              {item.label}
            </Link>
          );
        })}

        <div className="hidden lg:block mt-6 pt-6 border-t border-base-300">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-[1rem] text-sm font-medium hover:bg-base-100 transition-all text-gray-400 hover:text-base-content hover:shadow-sm"
          >
            <FiArrowLeft size={18} className="shrink-0" />
            Back to Store
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

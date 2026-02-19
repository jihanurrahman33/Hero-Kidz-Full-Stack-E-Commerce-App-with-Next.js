import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FiBarChart2,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiArrowLeft,
} from "react-icons/fi";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: FiBarChart2 },
  { label: "Orders", href: "/dashboard/orders", icon: FiPackage },
  { label: "Products", href: "/dashboard/products", icon: FiShoppingBag },
  { label: "Users", href: "/dashboard/users", icon: FiUsers },
];

const DashboardLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");
  if (session.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-base-200/50 lg:min-h-screen p-4 lg:p-5 shrink-0">
        <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-6">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FiBarChart2 className="text-primary" size={20} />
              Admin Panel
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 hidden lg:block">
              Manage your store
            </p>
          </div>

          {/* Mobile: horizontal scroll nav */}
          <Link
            href="/"
            className="btn btn-ghost btn-sm gap-1 lg:hidden"
          >
            <FiArrowLeft size={14} />
            Back
          </Link>
        </div>

        <nav className="flex lg:flex-col gap-1 mt-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-base-300 transition-colors whitespace-nowrap"
            >
              <item.icon size={18} className="text-gray-500 shrink-0" />
              {item.label}
            </Link>
          ))}

          <div className="hidden lg:block mt-4 pt-4 border-t border-base-300">
            <Link
              href="/"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-base-300 transition-colors text-gray-400"
            >
              <FiArrowLeft size={18} className="shrink-0" />
              Back to Store
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">{children}</main>
    </div>
  );
};

export default DashboardLayout;

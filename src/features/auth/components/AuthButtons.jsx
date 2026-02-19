"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import useAuth from "@/hooks/useAuth";
import {
  FiUser,
  FiLogOut,
  FiPackage,
  FiShoppingCart,
  FiHeart,
  FiBarChart2,
} from "react-icons/fi";

const AuthButtons = () => {
  const { isAuthenticated, user, isLoading, role } = useAuth();

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse" />;
  }

  if (!isAuthenticated) {
    return (
      <Link href="/login" className="btn btn-primary btn-sm">
        Login
      </Link>
    );
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const closeDropdown = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 h-10 rounded-full ring-2 ring-primary/30 overflow-hidden flex items-center justify-center bg-primary text-white">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold">{initials}</span>
          )}
        </div>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-3 w-72 rounded-2xl bg-base-100 shadow-xl"
      >
        {/* User Header */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/5 px-5 pt-5 pb-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-primary text-white shrink-0 shadow-md">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-base font-bold">{initials}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <div className="py-2 px-2">
          {role === "admin" && (
            <Link
              href="/dashboard"
              onClick={closeDropdown}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                <FiBarChart2 size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Dashboard</p>
                <p className="text-[11px] text-gray-400">Admin panel</p>
              </div>
            </Link>
          )}
          <Link
            href="/profile"
            onClick={closeDropdown}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
              <FiUser size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">My Profile</p>
              <p className="text-[11px] text-gray-400">Account settings</p>
            </div>
          </Link>

          <Link
            href="/orders"
            onClick={closeDropdown}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
              <FiPackage size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">My Orders</p>
              <p className="text-[11px] text-gray-400">Track your orders</p>
            </div>
          </Link>

          <Link
            href="/cart"
            onClick={closeDropdown}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center">
              <FiShoppingCart size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">My Cart</p>
              <p className="text-[11px] text-gray-400">View cart items</p>
            </div>
          </Link>

          <Link
            href="/products"
            onClick={closeDropdown}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center">
              <FiHeart size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">Browse Shop</p>
              <p className="text-[11px] text-gray-400">Discover new toys</p>
            </div>
          </Link>
        </div>

        {/* Logout */}
        <div className="px-2 pb-3">
          <button
            onClick={() => {
              signOut();
              closeDropdown();
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full hover:bg-red-50 transition-colors text-error"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <FiLogOut size={16} />
            </div>
            <p className="text-sm font-medium">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthButtons;

"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { FiUser, FiLogOut, FiShoppingBag } from "react-icons/fi";

const AuthButtons = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

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

  // Get initials for fallback avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden flex items-center justify-center bg-primary text-white">
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

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-10 w-56 p-3 shadow-lg mt-3 border"
      >
        {/* User Info */}
        <li className="pointer-events-none mb-2">
          <div className="flex flex-col items-start gap-0">
            <span className="font-semibold text-sm">{user?.name || "User"}</span>
            <span className="text-xs text-gray-400 truncate max-w-[180px]">
              {user?.email}
            </span>
          </div>
        </li>

        <div className="divider my-0" />

        {/* Menu Items */}
        <li>
          <Link href="/orders" className="flex items-center gap-2">
            <FiShoppingBag size={16} />
            My Orders
          </Link>
        </li>
        <li>
          <Link href="/profile" className="flex items-center gap-2">
            <FiUser size={16} />
            Profile
          </Link>
        </li>

        <div className="divider my-0" />

        <li>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-error hover:bg-error/10"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AuthButtons;

import React from "react";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiShield,
  FiPackage,
  FiShoppingCart,
  FiHeart,
  FiEdit3,
} from "react-icons/fi";

const ProfileDetails = ({ user, session }) => {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Profile Hero */}
      <div className="relative bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 rounded-3xl p-8 pb-20 mb-16">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 rounded-3xl opacity-5 bg-[radial-gradient(circle_at_30%_50%,_var(--color-primary)_0%,_transparent_50%)]" />

        <h1 className="text-2xl font-bold text-center relative">My Profile</h1>

        {/* Avatar — overlapping the card bottom */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-full ring-4 ring-base-100 overflow-hidden flex items-center justify-center bg-primary text-white shadow-lg">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold">{initials}</span>
            )}
          </div>
        </div>
      </div>

      {/* Name & Email */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
        <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
        <span className="badge badge-primary badge-sm mt-2 capitalize">
          {session?.role || "User"}
        </span>
      </div>

      {/* Account Information */}
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Account Information</h3>
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <FiUser size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Full Name</p>
            <p className="font-medium truncate">{user?.name || "Not set"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
            <FiMail size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Email Address</p>
            <p className="font-medium truncate">{user?.email || "Not set"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
            <FiShield size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Account Role</p>
            <p className="font-medium capitalize">
              {session?.role || "User"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Links</h3>
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/orders"
          className="flex items-center gap-3 p-4 bg-base-200/50 rounded-2xl hover:bg-base-200 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <FiPackage size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm">My Orders</p>
            <p className="text-xs text-gray-400">Track orders</p>
          </div>
        </Link>

        <Link
          href="/cart"
          className="flex items-center gap-3 p-4 bg-base-200/50 rounded-2xl hover:bg-base-200 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
            <FiShoppingCart size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm">My Cart</p>
            <p className="text-xs text-gray-400">View cart</p>
          </div>
        </Link>

        <Link
          href="/products"
          className="flex items-center gap-3 p-4 bg-base-200/50 rounded-2xl hover:bg-base-200 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
            <FiHeart size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm">Browse Shop</p>
            <p className="text-xs text-gray-400">Find toys</p>
          </div>
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-3 p-4 bg-base-200/50 rounded-2xl hover:bg-base-200 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
            <FiEdit3 size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm">Support</p>
            <p className="text-xs text-gray-400">Get help</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetails;

"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavLink from "../buttons/NavLink";
import { FiShoppingCart } from "react-icons/fi";
import { AuthButtons } from "@/features/auth";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const closeMenu = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const navItems = navLinks.map((link) => (
    <li key={link.href}>
      <NavLink href={link.href} onClick={closeMenu}>
        {link.label}
      </NavLink>
    </li>
  ));

  return (
    <div>
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((link) => (
                <li key={link.href}>
                <NavLink href={link.href}>
                    {link.label}
                </NavLink>
                </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end space-x-4">
          <Link href={"/cart"}>
            <div className="indicator">
                <button className="btn btn-primary">
                <FiShoppingCart size={24} />
                </button>
                {cartCount > 0 && (
                    <span className="badge badge-sm badge-secondary indicator-item">
                        {cartCount}
                    </span>
                )}
            </div>
          </Link>
          <AuthButtons></AuthButtons>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

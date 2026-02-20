"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children, ...props }) => {
  const path = usePathname();
  const isActive = href === "/" ? path === href : path.startsWith(href);
  return (
    <Link
      className={`transition-colors font-medium rounded-xl ${
        isActive 
          ? "bg-primary/10 text-primary font-bold hover:bg-primary/20" 
          : "hover:bg-base-200/50"
      }`}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;

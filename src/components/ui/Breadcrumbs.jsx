import React from "react";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="text-sm mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-gray-500">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <FiHome size={14} />
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="inline-flex items-center gap-1">
            <FiChevronRight size={14} className="text-gray-300" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 font-medium truncate max-w-[200px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

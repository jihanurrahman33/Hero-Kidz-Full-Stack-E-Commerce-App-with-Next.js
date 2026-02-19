"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, total }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", page);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(totalPages - 3, 2);
      }

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t">
      <p className="text-sm text-gray-500">
        Showing page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>{" "}
        <span className="text-gray-400">({total} products)</span>
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
        >
          <FiChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-1 text-gray-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`btn btn-sm btn-circle ${
                p === currentPage
                  ? "btn-primary"
                  : "btn-ghost"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

"use client";

import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiSearch, FiX, FiSliders } from "react-icons/fi";

const ProductSearch = ({ categories = [] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";

  const createQueryString = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      return params.toString();
    },
    [searchParams]
  );

  const updateFilters = (updates) => {
    const qs = createQueryString(updates);
    router.push(`${pathname}?${qs}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasFilters = search || category || minPrice || maxPrice || sort;
  const activeCount = [search, category, minPrice, maxPrice, sort].filter(Boolean).length;

  return (
    <div className="mb-8">
      {/* Search + Filter Toggle Row */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search toys..."
            defaultValue={search}
            onChange={(e) => {
              clearTimeout(window.__searchTimeout);
              window.__searchTimeout = setTimeout(() => {
                updateFilters({ search: e.target.value });
              }, 400);
            }}
            className="input input-bordered w-full pl-11 h-11 rounded-xl"
          />
        </div>

        {/* Mobile: Filter toggle button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline btn-sm h-11 px-3 rounded-xl lg:hidden relative"
        >
          <FiSliders size={18} />
          {activeCount > 0 && (
            <span className="badge badge-primary badge-xs absolute -top-1 -right-1">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters — always visible on desktop, toggled on mobile */}
      <div className={`${showFilters ? "grid" : "hidden"} lg:flex flex-wrap items-center gap-3`}>
        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium lg:hidden">Category</label>
          <select
            value={category}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="select select-bordered select-sm rounded-lg w-full lg:w-auto lg:min-w-[140px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium lg:hidden">Price Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min ৳"
              value={minPrice}
              min={0}
              onChange={(e) => updateFilters({ minPrice: e.target.value })}
              className="input input-bordered input-sm rounded-lg w-full lg:w-24 text-center"
            />
            <span className="text-gray-300">—</span>
            <input
              type="number"
              placeholder="Max ৳"
              value={maxPrice}
              min={0}
              onChange={(e) => updateFilters({ maxPrice: e.target.value })}
              className="input input-bordered input-sm rounded-lg w-full lg:w-24 text-center"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium lg:hidden">Sort By</label>
          <select
            value={sort}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            className="select select-bordered select-sm rounded-lg w-full lg:w-auto lg:min-w-[160px]"
          >
            <option value="">Sort: Default</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="sold">Best Selling</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAllFilters}
            className="btn btn-ghost btn-sm gap-1 text-error rounded-lg w-full lg:w-auto"
          >
            <FiX size={14} />
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;

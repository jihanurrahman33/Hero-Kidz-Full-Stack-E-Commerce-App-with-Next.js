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
    <div className="mb-8 bg-base-100 rounded-[2rem] shadow-sm border border-base-200/50 p-4 sm:p-6 transition-all duration-300">
      
      {/* Top Row: Search & Mobile Toggle */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search our catalog of amazing toys..."
            defaultValue={search}
            onChange={(e) => {
              clearTimeout(window.__searchTimeout);
              window.__searchTimeout = setTimeout(() => {
                updateFilters({ search: e.target.value });
              }, 400);
            }}
            className="input w-full pl-12 h-14 rounded-2xl bg-base-200/50 border-transparent focus:bg-base-100 focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base shadow-inner-sm"
          />
          {search && (
            <button 
              onClick={() => updateFilters({ search: "" })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-error transition-colors"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn lg:hidden h-14 px-4 rounded-2xl relative transition-all duration-300 ${showFilters ? 'bg-primary text-white shadow-lg shadow-primary/20 border-transparent' : 'bg-base-200/50 border-transparent hover:bg-base-200'}`}
        >
          <FiSliders size={20} />
          <span className="hidden sm:inline ml-2 font-medium">Filters</span>
          {activeCount > (search ? 1 : 0) && (
            <span className="badge badge-error badge-sm absolute -top-2 -right-2 font-bold shadow-sm">
              {activeCount - (search ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Expandable Filters Section */}
      <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 lg:grid-rows-[1fr] lg:opacity-100 lg:mt-6"}`}>
        <div className="overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-6 bg-base-200/30 p-4 rounded-2xl border border-base-200/50">
            
            {/* Category Dropdown */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block ml-1">Category</label>
              <select
                value={category}
                onChange={(e) => updateFilters({ category: e.target.value })}
                className="select w-full rounded-xl bg-base-100 border-transparent focus:ring-2 focus:ring-primary/20 shadow-sm font-medium"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex-1 min-w-[240px]">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block ml-1">Price Range</label>
               <div className="flex items-center gap-2">
                 <div className="relative flex-1">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">৳</span>
                   <input
                     type="number"
                     placeholder="Min"
                     value={minPrice}
                     min={0}
                     onChange={(e) => updateFilters({ minPrice: e.target.value })}
                     className="input w-full pl-8 rounded-xl bg-base-100 border-transparent focus:ring-2 focus:ring-primary/20 shadow-sm font-medium"
                   />
                 </div>
                 <span className="text-gray-300 font-bold">—</span>
                 <div className="relative flex-1">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">৳</span>
                   <input
                     type="number"
                     placeholder="Max"
                     value={maxPrice}
                     min={0}
                     onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                     className="input w-full pl-8 rounded-xl bg-base-100 border-transparent focus:ring-2 focus:ring-primary/20 shadow-sm font-medium"
                   />
                 </div>
               </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block ml-1">Sort By</label>
              <select
                value={sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="select w-full rounded-xl bg-base-100 border-transparent focus:ring-2 focus:ring-primary/20 shadow-sm font-medium"
              >
                <option value="">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

          </div>

          {/* Active Filters Row (Desktop & Mobile when expanded) */}
          {activeCount > 0 && (
            <div className="flex items-center justify-between mt-4 px-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-400 font-medium mr-1">Active:</span>
                
                {category && (
                  <span className="badge badge-primary badge-outline gap-1 p-3 rounded-lg bg-primary/5 border-primary/20">
                    {category}
                    <button onClick={() => updateFilters({ category: "" })} className="hover:text-error transition-colors ml-1"><FiX size={12}/></button>
                  </span>
                )}
                
                {(minPrice || maxPrice) && (
                  <span className="badge badge-secondary badge-outline gap-1 p-3 rounded-lg bg-secondary/5 border-secondary/20">
                    ৳{minPrice || "0"} - {maxPrice ? `৳${maxPrice}` : "Up"}
                    <button onClick={() => updateFilters({ minPrice: "", maxPrice: "" })} className="hover:text-error transition-colors ml-1"><FiX size={12}/></button>
                  </span>
                )}
                
                {sort && (
                  <span className="badge badge-accent badge-outline gap-1 p-3 rounded-lg bg-accent/5 border-accent/20">
                    {sort === 'price_asc' ? 'Low to High' : sort === 'price_desc' ? 'High to Low' : sort === 'rating' ? 'Top Rated' : 'Newest'}
                    <button onClick={() => updateFilters({ sort: "" })} className="hover:text-error transition-colors ml-1"><FiX size={12}/></button>
                  </span>
                )}
              </div>
              
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-error hover:underline transition-all"
              >
                Clear All
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductSearch;

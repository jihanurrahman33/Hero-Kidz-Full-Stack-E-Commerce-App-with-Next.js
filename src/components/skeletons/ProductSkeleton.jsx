import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-lg rounded-2xl">
      {/* Image Skeleton */}
      <div className="h-48 skeleton rounded-t-2xl"></div>

      <div className="card-body p-4 space-y-3">
        {/* Title */}
        <div className="h-4 skeleton w-full"></div>
        <div className="h-4 skeleton w-3/4"></div>

        {/* Rating */}
        <div className="h-3 skeleton w-1/2"></div>

        {/* Sold */}
        <div className="h-3 skeleton w-1/3"></div>

        {/* Price */}
        <div className="h-5 skeleton w-1/2"></div>

        {/* Button */}
        <div className="h-9 skeleton w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

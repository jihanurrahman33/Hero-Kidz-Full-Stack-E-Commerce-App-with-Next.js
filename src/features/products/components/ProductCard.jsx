"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { CartButton } from "@/features/cart";

const ProductCard = ({ product }) => {
  const { _id, title, image, price, discount, ratings, reviews, sold } = product;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] border border-base-200/50 overflow-hidden group flex flex-col h-full">
      {/* Image Area - Clickable */}
      <Link href={`/products/${_id}`} className="relative aspect-square w-full bg-base-200 overflow-hidden block">
        <Image
          fill
          src={image || "/placeholder.jpg"}
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {discount > 0 && (
          <span className="badge badge-error badge-sm sm:badge-md text-white absolute top-4 left-4 font-bold shadow-sm">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Title */}
        <Link href={`/products/${_id}`} className="hover:text-primary transition-colors mb-2">
          <h2 className="text-sm sm:text-base font-bold line-clamp-2 leading-tight min-h-[2.5rem]">
            {title}
          </h2>
        </Link>

        {/* Unified Meta: Rating & Sold */}
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
          <div className="flex items-center gap-1">
            <FaStar className="text-warning mb-[1px]" size={12} />
            <span className="text-gray-600">{ratings}</span>
            <span>({reviews})</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <span>{sold} Sold</span>
        </div>

        <div className="flex-1"></div> {/* Spacer to push bottom content down */}

        {/* Price Row */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-black text-primary">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="text-xs line-through text-gray-400 font-medium">৳{price}</span>
          )}
        </div>

        {/* Action Button */}
        <CartButton product={{ ...product, _id: _id.toString() }} />
      </div>
    </div>
  );
};

export default ProductCard;

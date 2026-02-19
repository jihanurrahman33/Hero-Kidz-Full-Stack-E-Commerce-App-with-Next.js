"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { CartButton } from "@/features/cart";

const ProductCard = ({ product }) => {
  const { _id, title, image, price, discount, ratings, reviews, sold } =
    product;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition rounded-2xl">
      {/* Image */}
      <figure className="relative h-48">
        <Image
          width={200}
          height={180}
          src={image}
          alt={title}
          className="object-cover rounded-t-2xl"
        />
        {discount > 0 && (
          <span className="badge badge-error text-white absolute top-3 left-3">
            -{discount}%
          </span>
        )}
      </figure>

      {/* Content */}
      <div className="card-body p-4">
        {/* Title */}
        <h2 className="card-title text-sm font-semibold line-clamp-2">
          {title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm mt-1">
          <FaStar className="text-warning" />
          <span className="font-medium">{ratings}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>

        {/* Sold */}
        <p className="text-xs text-gray-500 mt-1">{sold} sold</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Button */}
        {/* Note: In the original, CartButton was imported from '../buttons/CartButton' which is now @/features/cart */}
        {/* We use the barrel export from @/features/cart */}
        <CartButton product={{ ...product, _id: _id.toString() }}></CartButton>
        <Link
          href={`/products/${_id}`}
          className="btn btn-primary btn-sm mt-3 flex items-center gap-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

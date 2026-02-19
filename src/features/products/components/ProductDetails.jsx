"use client";
import React from "react";
import Image from "next/image";
import { FaStar, FaShoppingCart, FaTag } from "react-icons/fa";
import CartButton from "@/features/cart/components/CartButton";

const ProductDetails = ({ product }) => {
  const {
    title,
    category,
    image,
    price,
    discount,
    description,
    ratings,
    reviews,
    sold,
    ageRange,
    recommendationText,
  } = product;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="relative h-96 lg:h-[500px] w-full bg-base-100 rounded-2xl shadow-lg border p-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded-xl hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-error text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
            -{discount}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {category}
            </span>
            <span>{sold} sold</span>
            {ageRange && (
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold">
                    Age: {ageRange}
                </span>
            )}
          </div>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          <div className="flex text-warning">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.floor(ratings) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 font-medium">
            ({reviews} Reviews)
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-end gap-3">
          <p className="text-4xl font-bold text-primary">
            ৳{Math.ceil(price - (price * discount) / 100)}
          </p>
          {discount > 0 && (
            <p className="text-xl text-gray-400 line-through decoration-error">
              ৳{price}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
           <h3 className="font-semibold text-lg mb-2">Description</h3>
           <p className="text-gray-600 leading-relaxed text-base">
             {description}
           </p>
        </div>
        
        {/* Recommendation Text from ML */}
        {recommendationText && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                    <FaTag size={14} /> Why this is great
                </h4>
                <p className="text-green-700 text-sm">
                    {recommendationText}
                </p>
            </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="flex-1">
             <CartButton product={product} />
          </div>
          
          <button className="btn btn-outline btn-primary flex-1">
            Buy Now
          </button>
        </div>

        {/* Features / Assurance */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500 border-t pt-6">
            <div>
                <p className="font-bold text-gray-800 mb-1">Authentic</p>
                <p>100% Original</p>
            </div>
            <div className="border-x">
                <p className="font-bold text-gray-800 mb-1">Return</p>
                <p>7 Days Policy</p>
            </div>
             <div>
                <p className="font-bold text-gray-800 mb-1">Warranty</p>
                <p>Official Warranty</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

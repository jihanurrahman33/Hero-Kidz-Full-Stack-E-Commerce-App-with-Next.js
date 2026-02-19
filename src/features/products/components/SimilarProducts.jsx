"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getSimilarProducts } from "../actions/recommendation.actions";

const SimilarProducts = ({ id }) => {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      const products = await getSimilarProducts(id);
      setSimilarProducts(products);
    };
    if (id) fetchSimilar();
  }, [id]);

  if (!similarProducts.length) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">You May Also Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;

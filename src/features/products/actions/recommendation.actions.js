"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getRecommendations } from "@/lib/recommendation";
import { ObjectId } from "mongodb";

export const getSimilarProducts = async (currentProductId) => {
  try {
    if (!currentProductId) return [];

    const productsCollection = await dbConnect(collections.PRODUCTS);
    
    // Fetch all products needed for the corpus
    // Optimizing: We just pluck the fields we need for recommendation + display
    const allProducts = await productsCollection.find(
      {},
      {
        projection: {
          title: 1,
          category: 1,
          ageRange: 1,
          recommendationText: 1,
          description: 1, // Fallback if recommendationText missing
          image: 1,      // Needed for ProductCard
          price: 1,      // Needed for ProductCard
          discount: 1,   // Needed for ProductCard
          ratings: 1,    // Needed for ProductCard
          reviews: 1,    // Needed for ProductCard
          sold: 1        // Needed for ProductCard
        }
      }
    ).toArray();

    // Convert ObjectIds to strings for easier comparison/serialization
    const formattedProducts = allProducts.map(p => ({
      ...p,
      _id: p._id.toString()
    }));

    const currentProduct = formattedProducts.find(p => p._id === currentProductId);

    if (!currentProduct) return [];

    // Get recommendations
    const recommendations = getRecommendations(currentProduct, formattedProducts, 4);

    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// Helper to serialize MongoDB documents for client components
const serialize = (doc) => ({
  ...doc,
  _id: doc._id?.toString?.() || doc._id,
});

export const getProducts = async () => {
  const products = await (await dbConnect(collections.PRODUCTS)).find().toArray();
  return products.map(serialize);
};

export const getFilteredProducts = async (filters = {}) => {
  const { search, category, minPrice, maxPrice, sort } = filters;
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) * 2 };
  }

  const productsCollection = await dbConnect(collections.PRODUCTS);
  let cursor = productsCollection.find(query);

  if (sort === "price_asc") {
    cursor = cursor.sort({ price: 1 });
  } else if (sort === "price_desc") {
    cursor = cursor.sort({ price: -1 });
  } else if (sort === "rating") {
    cursor = cursor.sort({ ratings: -1 });
  } else if (sort === "newest") {
    cursor = cursor.sort({ _id: -1 });
  } else if (sort === "sold") {
    cursor = cursor.sort({ sold: -1 });
  }

  let products = await cursor.toArray();

  if (minPrice || maxPrice) {
    products = products.filter((p) => {
      const effectivePrice = p.discount
        ? Math.ceil(p.price - (p.price * p.discount) / 100)
        : p.price;
      if (minPrice && effectivePrice < Number(minPrice)) return false;
      if (maxPrice && effectivePrice > Number(maxPrice)) return false;
      return true;
    });
  }

  return products.map(serialize);
};

export const getCategories = async () => {
  const productsCollection = await dbConnect(collections.PRODUCTS);
  // Use aggregation instead of distinct() which isn't supported with apiStrict
  const result = await productsCollection
    .aggregate([
      { $group: { _id: "$category" } },
      { $sort: { _id: 1 } },
    ])
    .toArray();
  return result.map((r) => r._id).filter(Boolean);
};

export const getSingleProduct = async (id) => {
  if (id.length != 24) {
    return {};
  }
  const query = { _id: new ObjectId(id) };
  const product = await (await dbConnect(collections.PRODUCTS)).findOne(query);
  return { ...product, _id: product._id.toString() } || {};
};

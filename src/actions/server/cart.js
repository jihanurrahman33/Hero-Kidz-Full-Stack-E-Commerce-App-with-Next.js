"use server";

import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const { collections, dbConnect } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collections.CART);

export const handleCart = async ({ product, inc = true }) => {
  const user = await getServerSession(authOptions);
  if (!user) return { success: false };

  //getcart item
  const query = { email: user.email, productId: product?._id };
  const isAdded = await (await cartCollection).findOne(query);

  if (isAdded) {
    const updatedData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };

    const result = await (await cartCollection).updateOne(query, updatedData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product?.title,
      price: product?.price - (product?.price * product?.discount) / 100,
      quantity: 1,
      image: product?.image,
      username: user?.user.name,
    };
    const result = await (await cartCollection).insertOne(newData);
    return { success: result.acknowledged };
  }
};
export const getCart = cache(async () => {
  const user = await getServerSession(authOptions);
  if (!user) return { success: false, cart: [] };
  const query = { email: user.email };
  const cartItems = await (await cartCollection).find(query).toArray();

  return { success: true, cart: cartItems };
});

export const deleteItemsFromCart = async (productId) => {
  console.log("Deleting item with id:", productId);
  const user = await getServerSession(authOptions);
  if (!user) return { success: false };

  const query = { _id: new ObjectId(productId) };

  const result = await (await cartCollection).deleteOne(query);
  if (Boolean(result.deletedCount)) {
    revalidatePath("/cart");
  }
  return { success: Boolean(result.deletedCount) };
};

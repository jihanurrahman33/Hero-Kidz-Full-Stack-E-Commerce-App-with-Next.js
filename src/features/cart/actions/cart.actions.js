"use server";

import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cache } from "react";

const { collections, dbConnect } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collections.CART);

export const handleCart = async (productId) => {
  const user = await getServerSession(authOptions);
  if (!user) return { success: false };

  //getcart item
  const query = { email: user.email, productId: productId };
  const isAdded = await (await cartCollection).findOne(query);

  if (isAdded) {
    const updatedData = {
      $inc: {
        quantity: 1,
      },
    };

    const result = await (await cartCollection).updateOne(query, updatedData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    const product = await (
      await dbConnect(collections.PRODUCTS)
    ).findOne({
      _id: new ObjectId(productId),
    });

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

  // Serialize ObjectIds for client components
  const serializedCart = cartItems.map((item) => ({
    ...item,
    _id: item._id?.toString?.() || item._id,
    productId: item.productId?.toString?.() || item.productId,
  }));

  return { success: true, cart: serializedCart };
});

export const deleteItemsFromCart = async (productId) => {
  console.log("Deleting item with id:", productId);
  const user = await getServerSession(authOptions);
  if (!user) return { success: false };

  const query = { _id: new ObjectId(productId), email: user?.email };

  const result = await (await cartCollection).deleteOne(query);
  // if (Boolean(result.deletedCount)) {
  //   revalidatePath("/cart");
  // }
  return { success: Boolean(result.deletedCount) };
};

export const increaseItemDb = async (id, quantity) => {
  const user = await getServerSession(authOptions);
  if (!user) return { success: false };
  // Logic to increase item quantity in the database
  if (quantity >= 10) {
    return { success: false, message: "Maximum quantity reached" };
  }
  const query = { _id: new ObjectId(id), email: user?.email };
  const updatedData = {
    $inc: {
      quantity: 1,
    },
  };
  const result = await (await cartCollection).updateOne(query, updatedData);
  return { success: Boolean(result.modifiedCount) };
};
export const decreaseItemDb = async (id, quantity) => {
  const user = await getServerSession(authOptions);
  if (!user) return { success: false };
  // Logic to increase item quantity in the database
  if (quantity <= 1) {
    return { success: false, message: "Quantity can not be less than 1" };
  }
  const query = { _id: new ObjectId(id), email: user?.email };
  const updatedData = {
    $inc: {
      quantity: -1,
    },
  };
  const result = await (await cartCollection).updateOne(query, updatedData);
  return { success: Boolean(result.modifiedCount) };
};

export const clearCart = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return { success: false };

  const query = { email: user?.email };

  const result = await (await cartCollection).deleteMany(query);
  return { success: Boolean(result.deletedCount) };
};

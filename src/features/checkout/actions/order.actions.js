"use server";

import { getServerSession } from "next-auth";
import { clearCart, getCart } from "@/features/cart/actions/cart.actions";
import { authOptions } from "@/lib/authOptions";
import { sendEmail } from "@/lib/sendEmail";
import { invoiceTemplate } from "@/lib/orderInvoice";
import { ObjectId } from "mongodb";

const { dbConnect, collections } = require("@/lib/dbConnect");

const ordersCollection = dbConnect(collections.ORDERS);

export const createOrder = async (orderData) => {
  const { user } = await getServerSession(authOptions);
  if (!user) return { success: false };

  const cart = await getCart();
  if (cart.cart.length === 0) {
    return { success: false, message: "Cart is empty" };
  }

  // const products = cart.cart.map((item) => ({
  //   _id: new ObjectId(item.productId),
  //   quantity: item.quantity,
  // }));

  const total = cart.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart.cart,
    ...orderData,
    totalPrice: total,
  };
  const result = (await ordersCollection).insertOne(newOrder);

  if ((await result).insertedId) {
    // 🔹 Send Invoice Email (non-blocking — order still succeeds if email fails)
    try {
      await sendEmail({
        to: user.email,
        subject: "Your Order Invoice - Hero Kidz",
        html: invoiceTemplate({
          orderId: (await result).insertedId.toString(),
          items: cart.cart,
          total,
        }),
      });
    } catch (emailErr) {
      console.error("Invoice email failed (order still placed):", emailErr.message);
    }
    const clearResult = await clearCart();
    return { success: true, orderId: (await result).insertedId.toString() };
  }

  //   const result = await (await ordersCollection).insertOne(orderData);
  //   return { success: result.acknowledged, orderId: result.insertedId };
};

export const getUserOrders = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return [];

  const col = await dbConnect(collections.ORDERS);
  const orders = await col
    .find({ email: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return orders.map((order) => ({
    ...order,
    _id: order._id.toString(),
    items: order.items?.map((item) => ({
      ...item,
      _id: item._id?.toString?.() || item._id,
      productId: item.productId?.toString?.() || item.productId,
    })),
  }));
};

"use server";

import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { authOptions } from "@/lib/authOptions";
import { sendEmail } from "@/lib/sendEmail";
import { invoiceTemplate } from "@/lib/orderInvoice";

const { dbConnect, collections } = require("@/lib/dbConnect");

const ordersCollection = dbConnect(collections.ORDERS);

export const createOrder = async (orderData) => {
  const { user } = await getServerSession(authOptions);
  if (!user) return { success: false };

  const cart = await getCart();
  if (cart.cart.length === 0) {
    return { success: false, message: "Cart is empty" };
  }
  const total = cart.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart.cart,
    ...orderData,
  };
  const result = (await ordersCollection).insertOne(newOrder);

  if ((await result).insertedId) {
    // 🔹 Send Invoice Email
    await sendEmail({
      to: user.email,
      subject: "Your Order Invoice - Hero Kidz",
      html: invoiceTemplate({
        orderId: (await result).insertedId.toString(),
        items: cart.cart,
        total,
      }),
    });
    const clearResult = await clearCart();
    return { success: true, orderId: result.insertedId };
  }

  //   const result = await (await ordersCollection).insertOne(orderData);
  //   return { success: result.acknowledged, orderId: result.insertedId };
};

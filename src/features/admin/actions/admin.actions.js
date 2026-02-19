"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ── Helper: admin guard ──
const requireAdmin = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
};

// ── Dashboard Stats ──
export const getDashboardStats = async () => {
  await requireAdmin();

  const ordersCol = await dbConnect(collections.ORDERS);
  const productsCol = await dbConnect(collections.PRODUCTS);
  const usersCol = await dbConnect(collections.USERS);

  const [orders, productCount, userCount] = await Promise.all([
    ordersCol.find({}).toArray(),
    productsCol.countDocuments(),
    usersCol.countDocuments(),
  ]);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );

  return {
    totalRevenue,
    orderCount: orders.length,
    productCount,
    userCount,
  };
};

// ── Recent Orders ──
export const getRecentOrders = async (limit = 5) => {
  await requireAdmin();
  const col = await dbConnect(collections.ORDERS);
  const orders = await col.find({}).sort({ createdAt: -1 }).limit(limit).toArray();

  return orders.map((o) => ({
    ...o,
    _id: o._id.toString(),
    items: o.items?.map((item) => ({
      ...item,
      _id: item._id?.toString?.() || item._id,
      productId: item.productId?.toString?.() || item.productId,
    })),
  }));
};

// ── All Orders (paginated) ──
export const getAllOrders = async (page = 1, limit = 10) => {
  await requireAdmin();
  const col = await dbConnect(collections.ORDERS);
  const skip = (page - 1) * limit;
  const total = await col.countDocuments();
  const orders = await col
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    orders: orders.map((o) => ({
      ...o,
      _id: o._id.toString(),
      items: o.items?.map((item) => ({
        ...item,
        _id: item._id?.toString?.() || item._id,
        productId: item.productId?.toString?.() || item.productId,
      })),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

// ── Update Order Status ──
export const updateOrderStatus = async (orderId, status) => {
  await requireAdmin();
  const col = await dbConnect(collections.ORDERS);
  const result = await col.updateOne(
    { _id: new ObjectId(orderId) },
    { $set: { status } }
  );
  return { success: Boolean(result.modifiedCount) };
};

// ── All Products (paginated) ──
export const getAdminProducts = async (page = 1, limit = 10) => {
  await requireAdmin();
  const col = await dbConnect(collections.PRODUCTS);
  const skip = (page - 1) * limit;
  const total = await col.countDocuments();
  const products = await col
    .find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    products: products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

// ── Add Product ──
export const addProduct = async (productData) => {
  await requireAdmin();
  const col = await dbConnect(collections.PRODUCTS);
  const result = await col.insertOne({
    ...productData,
    price: Number(productData.price),
    discount: Number(productData.discount || 0),
    ratings: Number(productData.ratings || 0),
    sold: 0,
    createdAt: new Date().toISOString(),
  });
  return { success: result.acknowledged, productId: result.insertedId?.toString() };
};

// ── Delete Product ──
export const deleteProduct = async (productId) => {
  await requireAdmin();
  const col = await dbConnect(collections.PRODUCTS);
  const result = await col.deleteOne({ _id: new ObjectId(productId) });
  return { success: Boolean(result.deletedCount) };
};

// ── All Users (paginated) ──
export const getAllUsers = async (page = 1, limit = 10) => {
  await requireAdmin();
  const col = await dbConnect(collections.USERS);
  const skip = (page - 1) * limit;
  const total = await col.countDocuments();
  const users = await col
    .find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    users: users.map((u) => ({
      ...u,
      _id: u._id.toString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

// ── Update User Role ──
export const updateUserRole = async (userId, role) => {
  await requireAdmin();
  const col = await dbConnect(collections.USERS);
  const result = await col.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { role } }
  );
  return { success: Boolean(result.modifiedCount) };
};

"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
export const postUser = async (payload) => {
  const { email, password, name } = payload;
  //check payload
  if (!email || !password) return null;
  //check user
  const isExist = await (
    await dbConnect(collections.USERS)
  ).findOne({
    email,
  });
  if (isExist) return null;
  //create user
  const newUser = {
    providerId: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: "user",
  };
  //insert user

  const result = await (await dbConnect(collections.USERS)).insertOne(newUser);
  if (result.acknowledged) {
    return { ...result, insertedId: result.insertedId.toString() };
  }
};
export const loginUser = async (payload) => {
  const { email, password } = payload;
  //check payload
  if (!email || !password) return null;
  //check user
  const user = await (
    await dbConnect(collections.USERS)
  ).findOne({
    email,
  });
  if (!user) return null;
  //check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

"use server";

import connectDB from "@/lib/database";
import UserModel from "@/models/User";

export default async function getUserByEmail(email) {
  await connectDB();
  const user = await UserModel.findOne({ email });
  return user;
}

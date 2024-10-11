"use server";

import connectDB from "@/lib/database";
import UserModel from "@/models/User";

export default async function CreateUser(email, password) {
  try {
    await connectDB();
    await UserModel.create({ email, password });
  } catch (error) {
    return null;
  }
}

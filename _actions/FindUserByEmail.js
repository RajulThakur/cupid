"use server";

import { connectToDatabase } from "@/lib/database";
import UserModel from "@/models/User";

export default async function getUserByEmail(email) {
  await connectToDatabase()
  const user = await UserModel.findOne({ email:email });
  return user;
}

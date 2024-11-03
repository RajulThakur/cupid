'use server'
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./database";
import UserModel from "@/models/User";

export async function validation(email, password) {
  await connectToDatabase();
  const { password: userPassword, ...user } = await UserModel.findOne({
    email,
  }).select("+password");
  const { _doc: userDetails } = user;
  const compare = await bcrypt.compare(password, userPassword);
  return { userDetails, compare };
}

import UserModel from "@/models/User";
import { connectToDatabase } from "./database";

///GET USER
export async function getUserByEmail(email) {
  await connectToDatabase();
  const user = await UserModel.findOne({ email:email });
  if (!user) throw new Error("User Doesnot exists");
  return user;
}

//CREATE USER
export async function createUser(data) {
  try {
    await connectToDatabase();
    await UserModel.create(data);
  } catch (error) {
    console.error(error.message);
  }
}

//UPDATE USER

export async function AddInfo(id, data) {
  try {
    await connectToDatabase();
    await UserModel.findByIdAndUpdate(id, data);
  } catch (error) {
    console.error(error.message);
  }
}

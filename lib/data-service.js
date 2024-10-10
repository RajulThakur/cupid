import UserModel from "@/models/User";
import { connectToDatabase } from "./database";

///GET USER
export async function getUserByEmail(email) {
  await connectToDatabase();
  const user = await UserModel.findOne({ email: email });
  if (!user) throw new Error("User Doesnot exists");
  return user;
}

//GET USER ID BY EMAIL
export async function getUserIdByEmail(email) {
  await connectToDatabase();
  const user = await UserModel.findOne({ email: email });
  if (!user) throw new Error("User Doesnot exists");
  return user._id.toString();
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
    await connectToDatabase();
    await UserModel.findByIdAndUpdate(id, data);
}

//CHECK USERNAME IS PRESENT OR NAME

export async function CheckUsername(userna) {
  await connectToDatabase();
  const user = await UserModel.findOne({ username: userna });
  if (user) return true;
  return false;
}

'use server';

import { connectToDatabase } from "@/lib/database";
import UserModel from "@/models/User";

export async function uploadToDB(fileUrl,id) {
  console.log(fileUrl);  
  await connectToDatabase();
  await UserModel.findByIdAndUpdate(id, {
    profileImage: fileUrl,
  });
}

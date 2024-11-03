import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await auth();
  if(!session){
    return NextResponse.json({status: "error", message: "Unauthorized"});
  }
  try{
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await connectToDatabase();
    const image = await UserModel.findById(id).select("profileImage");
    if(!image){
    return NextResponse.json({status: "error", message: "Image not found"});
    }
    return NextResponse.json({ status: "success", image: image.profileImage });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }
}

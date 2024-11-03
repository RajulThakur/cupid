import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database";
import Friends from "@/models/Friends";
import { NextResponse } from "next/server";
import { getUserIdByEmail } from "@/lib/data-service";
import UserModel from "@/models/User";

export async function GET(req) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;
  await connectToDatabase();
  const userId = await getUserIdByEmail(email);
  const {friends} = await Friends.findOne({ userId });
  const friendData = await UserModel.find({_id:{$in:friends}}).select("username firstName lastName profileImage");
  return NextResponse.json({friends:friendData});
}

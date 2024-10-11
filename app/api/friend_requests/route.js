import { auth } from "@/auth";
import { getUserIdByEmail } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/database";
import FriendRequest from "@/models/FriendRequest";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;

  await connectToDatabase();
  const id = await getUserIdByEmail(email);
  const requests = await FriendRequest.find({
    receiver: id,
  });
  const senderData = await UserModel.find({ _id: { $in: requests.map((request) => request.sender) } }).select("username firstName lastName");
  return NextResponse.json({ senderData }, { status: 200 });
}

export async function POST(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;
  const { receiver } = await req.json();
  await connectToDatabase();
  const sender=await getUserIdByEmail(email);
  const requests = await FriendRequest.create({
    receiver,
    sender,
  });
  return NextResponse.json({ requests }, { status: 200 });
}
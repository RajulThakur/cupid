import { auth } from "@/auth";
import { getUserIdByEmail } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/database";
import FriendRequest from "@/models/FriendRequest";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  console.log("session", session);
  const { user } = session;
  const { email } = user;
  await connectToDatabase();
  const requests = await FriendRequest.find({
    receiver: email,
  });
  return NextResponse.json({ requests }, { status: 200 });
}
export async function POST(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;
  const { receiver } = await req.json();
  console.log("receiver", receiver);
  console.log("email", email);
  await connectToDatabase();
  const sender=await getUserIdByEmail(email);
  console.log("sender", sender);
  const requests = await FriendRequest.create({
    receiver,
    sender,
  });
  return NextResponse.json({ requests }, { status: 200 });
}
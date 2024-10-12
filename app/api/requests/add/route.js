import { auth } from "@/auth";
import { getUserIdByEmail } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/database";
import Friends from "@/models/Friends";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;
  const { sender } = await req.json();
  const receiver = await getUserIdByEmail(email);
  console.log("sender", sender);
  console.log("receiver", receiver);
  await connectToDatabase();
  
  const senderData = await Friends.findOneAndUpdate({ userId: sender }, { $push: { friends: receiver } }, { new: true });
  const receiverData = await Friends.findOneAndUpdate({ userId: receiver }, { $push: { friends: sender } }, { new: true });
  console.log("senderData", senderData);
  console.log("receiverData", receiverData);
  await Friends.updateOne({ userId: receiver }, { $pull: { requests: sender } });
  return NextResponse.json({ message: "Request added" }, { status: 200 });
}

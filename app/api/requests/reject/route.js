import { auth } from "@/auth";
import { getUserIdByEmail } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/database";
import Friends from "@/models/Friends";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { sender } = await req.json();
  const { user } = session;
  const { email } = user;
  const receiver = await getUserIdByEmail(email);
  await connectToDatabase();
  await Friends.updateOne({ userId: receiver }, { $pull: { requests: sender } });
  return NextResponse.json({ message: "Request rejected" }, { status: 200 });
}

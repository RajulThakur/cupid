import { auth } from "@/auth";
import { getUserIdByEmail } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/database";
import Friends from "@/models/Friends";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;
  const { receiver } = await req.json();
  console.log("receiver", receiver);
  console.log("email", email);

  await connectToDatabase();
  const sender = await getUserIdByEmail(email);

  // check if the user is already in the friends array
  const isAlreadyFriend = await Friends.findOne({ userId: receiver })
    .select("friends")
    .where("friends")
    .equals(sender);
  if (isAlreadyFriend)
    return NextResponse.json(
      { error: "Already Request sent" },
      { status: 400 },
    );
  const requests = await Friends.findOneAndUpdate(
    { userId: receiver },
    { $push: { requests: sender } },
    { new: true },
  ).select("requests");
  console.log("requests", requests);

  return NextResponse.json(
    { message: "Request sent", status: "success" },
    { status: 200 },
  );
}

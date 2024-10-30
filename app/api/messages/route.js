"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  let usernameA = searchParams.get("usernameA");
  let usernameB = searchParams.get("usernameB");
  let user1 = searchParams.get("user1");
  let user2 = searchParams.get("user2");

  await connectToDatabase();
  if (usernameA < usernameB) {
    const temp = user1;
    user1 = user2;
    user2 = temp;
  }
  const isExist = await Message.findOne({
    userA: user1,
    userB: user2,
  });
  const data = isExist.messages.slice(-10);
  return NextResponse.json({messages:data });
}

export async function POST(req) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await connectToDatabase();
  const body = await req.json();
  let { usernameA, usernameB, from,text, user1, user2, type } = body;
  // if (usernameA !== session.user.username || usernameB !== session.user.username)
  //   throw new Error("Unauthorized");
  // if (user1 !== session.user._id.toString() && user2 !== session.user._id.toString())
  //   throw new Error("Unauthorized");

  if (usernameA < usernameB) {
    const temp = user1;
    user1 = user2;
    user2 = temp;
  }

  const isExist = await Message.findOne({
    userA: user1,
    userB: user2,
  });
  if (!isExist) {
    const message = await Message.create({
      userA: user1,
      userB: user2,
      messages: [{ from, text, type }],
    });

  }
  isExist.messages.push({ from, text, type });
  await isExist.save();
  return NextResponse.json({ message: "Message sent" });
}

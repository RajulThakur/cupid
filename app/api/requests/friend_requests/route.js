"use server";

import { auth } from "@/auth";
import { getUserIdByEmail } from "@/lib/data-service";
import { connectToDatabase } from "@/lib/database";
import Friends from "@/models/Friends";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;

  await connectToDatabase();
  const id = await getUserIdByEmail(email);
  const requests = await Friends.findOne({ userId: id })?.select("requests");
  const senderData = await UserModel.find({ _id: { $in: requests?.requests } }).select("username firstName lastName avatar");
  return NextResponse.json({ senderData }, { status: 200 });
}


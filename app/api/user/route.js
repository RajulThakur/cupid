"use server";

import { connectToDatabase } from "@/lib/database";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { pin, id } = await req.json();
  await connectToDatabase();
  await UserModel.findByIdAndUpdate(id, { pin });
  return NextResponse.json({ message: "Pin updated" }, { status: 200 });
}
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  await connectToDatabase();
  const user = await UserModel.findOne({ email }).select(
    "profileImage firstName lastName username",
  );
  return NextResponse.json({ user }, { status: 200 });
}

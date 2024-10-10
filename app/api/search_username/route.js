import UserModel from "@/models/User";
import { connectToDatabase } from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username } = body;

    await connectToDatabase();

    const users = await UserModel.find({
      username: { $regex: `^${username}`, $options: "i" },
    })
      .select("firstName lastName username avatar")
      .limit(10);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error searching username:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

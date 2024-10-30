import { connectToDatabase } from "@/lib/database";
import User from "@/models/User"; // Assuming you have a User model
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // In Next.js App Router, you parse the request body like this
    const { username } = body;
    if (!username) {
      return NextResponse.json({ available: true }, { status: 200 });
    }
    await connectToDatabase();
    const user = await User.findOne({ username });

    if (user) {
      return NextResponse.json({ available: false }, { status: 200 });
    } else {
      return NextResponse.json({ available: true }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

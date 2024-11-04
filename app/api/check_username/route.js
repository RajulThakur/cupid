import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username } = body;
    
    if (!username) {
      return NextResponse.json({ available: true }, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { username }
    });

    return NextResponse.json({ available: !user }, { status: 200 });
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

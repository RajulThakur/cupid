import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username } = body;

    const users = await prisma.user.findMany({
      where: {
        username: {
          startsWith: username,
          mode: 'insensitive',
        },
      },
      select: {
        firstName: true,
        lastName: true,
        username: true,
        profileImage: true,
      },
      take: 10,
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error searching username:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

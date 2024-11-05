import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserIdByEmail } from "@/app/_lib/data-service";
export async function POST(req) {
  try {
    const body = await req.json();
    const { username } = body;
    const {user} = await auth();
    const currentUser = await getUserIdByEmail(user.email);

    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            username: {
              startsWith: username,
              mode: 'insensitive',
            }
          },
          {
            id: {
              not: currentUser
            }
          }
        ]
      },
      select: {
        firstName: true,
        lastName: true,
        username: true,
        profileImage: true,
        id: true
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

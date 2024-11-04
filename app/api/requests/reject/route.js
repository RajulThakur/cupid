import { auth } from "@/auth";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

  export async function POST(req) {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      
    const { sender } = await req.json();
    const { email } = session.user;

    // Update friend request using Prisma
    await prisma.friends.update({
      where: {
        userEmail: email
      },
      data: {
        requests: {
          set: {
            disconnect: sender
          }
        }
      }
    });

    return NextResponse.json({ message: "Request rejected" }, { status: 200 });
  }

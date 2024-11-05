"use server";

import { auth } from "@/auth";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await auth();
  const { user } = session;
  const { email } = user;

  const userData = await prisma.user.findUnique({
    where: { email },
    select: {
      friendRequests: {
        select: {
          sender: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  const senderData = userData?.friendRequests.map(request => request.sender) || [];
  return NextResponse.json({ senderData }, { status: 200 });
}

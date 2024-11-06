"use server";

import { auth } from "@/auth";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import { getUserIdByEmail } from "@/app/_lib/data-service";

export async function GET(req) {
  const session = await auth();
  const { user } = session;
  const { email } = user;

  const id = await getUserIdByEmail(email);
  const requests = await prisma.friends.findUnique({
    where: {
      userId: id,
    },
    select: {
      requests: true,
    },
  });

  const senderData = await prisma.user.findMany({
    where: {
      id: { in: requests.requests },
    },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      profileImage: true,
    },
  });
  return NextResponse.json({ senderData }, { status: 200 });
}

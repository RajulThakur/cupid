"use server";

import { auth } from "@/auth";
import { getUserIdByEmail } from "@/app/_lib/data-service";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;
  const { sender } = await req.json();
  const receiver = await getUserIdByEmail(email);

  const senderData = await prisma.friends.update({
    where: { userId: sender },
    data: { friends: { push: receiver } },
  });
  const receiverData = await prisma.friends.update({
    where: { userId: receiver },
    data: { friends: { push: sender } },
  });
  await prisma.friends.update({
    where: { userId: receiver },
    data: { requests: { pull: sender } },
  });
  return NextResponse.json({ message: "Request added" }, { status: 200 });
}

"use server";

import { auth } from "@/auth";
import prisma from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { user } = session;
  const { email } = user;
  const { receiver } = await req.json();

  const sender = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  });

  const isAlreadyFriend = await prisma.friendship.findFirst({
    where: {
      OR: [
        { senderId: sender.id, receiverId: receiver },
        { senderId: receiver, receiverId: sender.id }
      ],
      status: 'ACCEPTED'
    }
  });

  if (isAlreadyFriend) {
    return NextResponse.json(
      { error: "Already friends" },
      { status: 400 }
    );
  }

  const request = await prisma.friendship.create({
    data: {
      senderId: sender.id,
      receiverId: receiver,
      status: 'PENDING'
    }
  });

  return NextResponse.json(
    { message: "Request sent", status: "success" },
    { status: 200 }
  );
}
